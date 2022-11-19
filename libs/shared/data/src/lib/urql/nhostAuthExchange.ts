import { AuthConfig, authExchange } from '@urql/exchange-auth';
import { makeOperation } from 'urql';
import produce from 'immer';
import { set } from 'lodash-es';
import { nhost } from '../provider/nhost';
import { NhostSession } from '@nhost/nextjs';

type AuthState = {
  token: string;
};

const nhostBaseAuthConfig: Omit<AuthConfig<AuthState>, 'getAuth'> = {
  addAuthToOperation: ({ authState, operation }) => {
    if (!authState?.token) {
      return operation;
    }
    const newContext = produce(operation.context, (context) => {
      set(context, 'fetchOptions.headers.Authorization', authState.token);
    });
    return makeOperation(operation.kind, operation, newContext);
  },
  // willAuthError: ({ authState }) => {
  //   try {
  //     const [, payload] = authState.token.split('.');
  //     const { exp } = JSON.parse(Buffer.from(payload, 'base64'));
  //     return exp * 1000 < Date.now();
  //   } catch (e) {
  //     return true;
  //   }
  // },
  didAuthError: ({ error }) =>
    error.graphQLErrors.some((e) => e.message === 'Unauthorized'),
};

const createClientAuthOptions = (): AuthConfig<AuthState> => ({
  ...nhostBaseAuthConfig,
  getAuth: async ({ authState }) => {
    return { token: 'haha' };
    // if (!nhost.auth.isAuthenticated()) {
    //   const token = nhost.auth.getAccessToken();
    //   if (token) {
    //     return { token };
    //   }
    //   return null;
    // }
    // return null;
  },
});

type CreateSSRAuthOptionsParams = {
  session: NhostSession;
};

const createSSRAuthOptions = ({
  session,
}: CreateSSRAuthOptionsParams): AuthConfig<AuthState> => ({
  ...nhostBaseAuthConfig,
  getAuth: async () => {
    return {
      token: session.accessToken,
    };
  },
});

export const createNhostClientAuthExchange = () =>
  authExchange<AuthState>(createClientAuthOptions());

export const createNhostSSRAuthExchange = (
  params: CreateSSRAuthOptionsParams
) => authExchange<AuthState>(createSSRAuthOptions(params));
