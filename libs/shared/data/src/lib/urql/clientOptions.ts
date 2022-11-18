/* eslint-disable @typescript-eslint/no-explicit-any */
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from 'urql';
import { SSRExchange } from 'next-urql';
import { authExchange } from '@urql/exchange-auth';
import { devtoolsExchange } from '@urql/devtools';
import { makeOperation } from 'urql';
import { nhost } from '../provider/nhost';
import { isSSR } from '../utils/isSSR';

const addAuthToOperation = ({ authState, operation }: any) => {
  if (!authState || !authState.token) {
    return operation;
  }

  const fetchOptions =
    typeof operation.context.fetchOptions === 'function'
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};

  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        ...{
          Authorization: `Bearer ${authState.token}`,
        },
      },
    },
  });
};

const didAuthError = ({ error }: any) => {
  console.log({ error });
  return error.graphQLErrors.some(
    (e: any) => e.extensions?.code === 'FORBIDDEN'
  );
};

export type GetUrqlClientOptionsParams = {
  withAuth?: boolean;
  accessToken?: string;
  refreshToken?: string;
};

type AuthState = {
  token: string;
  refreshToken: string;
} | null;

export const getUrqlClientOptions =
  ({
    withAuth = true,
    accessToken,
    refreshToken,
  }: GetUrqlClientOptionsParams) =>
  (ssrCache: SSRExchange = ssrExchange({ isClient: true })) => ({
    url: nhost.graphql.getUrl(),
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      cacheExchange,
      // for some reason, authExchange cannot be used on any page that should be SSG'd
      ...(withAuth
        ? [
            authExchange<AuthState>({
              getAuth: async ({ authState }) => {
                if (isSSR) {
                  return {
                    token: accessToken || '',
                    refreshToken: refreshToken || '',
                  };
                }
                if (!nhost.auth.isAuthenticated()) {
                  const token = accessToken || nhost.auth.getAccessToken();
                  const refreshToken = localStorage.getItem('refresh_token');
                  if (token && refreshToken) {
                    return { token, refreshToken };
                  }
                  return null;
                }
                return null;
              },
              addAuthToOperation,
              didAuthError,
            }),
          ]
        : []),
      ssrCache,
      fetchExchange,
    ],
  });
