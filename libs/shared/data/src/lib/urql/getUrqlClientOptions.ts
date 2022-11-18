/* eslint-disable @typescript-eslint/no-explicit-any */
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from 'urql';
import { SSRExchange } from 'next-urql';
import { authExchange } from '@urql/exchange-auth';
import { devtoolsExchange } from '@urql/devtools';
import { makeOperation } from 'urql';
import { nhost } from '../provider/nhost';

const addAuthToOperation = ({ authState, operation }: any) => {
  if (!authState || !authState.token) {
    return operation;
  }

  const fetchOptions =
    typeof operation.context.fetchOptions === 'function'
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};

  const needsAuthorization = !operation.query.definitions.some(
    ({ name }: any) => ['Login', 'Register'].includes(name.value)
  );

  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        ...(needsAuthorization && {
          Authorization: `Bearer ${authState.token}`,
        }),
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

type GetUrqlClientOptionsParams = {
  withAuth?: boolean;
  accessToken?: string;
};

export const getUrqlClientOptions =
  ({ withAuth = true, accessToken }: GetUrqlClientOptionsParams) =>
  (ssrCache: SSRExchange = ssrExchange({ isClient: true })) => ({
    url: nhost.graphql.getUrl(),
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      cacheExchange,
      // for some reason, authExchange cannot be used on any page that should be SSG'd
      ...(withAuth
        ? [
            authExchange({
              getAuth: async ({ authState }) => {
                if (accessToken) {
                  return { token: accessToken };
                }
                // if (!(await nhost.auth.isAuthenticatedAsync())) {
                //   return { token: nhost.auth.getAccessToken() };
                // }
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
