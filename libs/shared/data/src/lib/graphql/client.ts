import { GraphQLClient } from 'graphql-request';
import { QueryClient } from '@tanstack/react-query';
import { nhost } from '../provider/provider';

const BACKEND_URL = 'https://nxlppvxwouvddpyfntil.nhost.run/v1/graphql';
// const BACKEND_URL = 'https://dog.com';

export const graphQLClient = new GraphQLClient(BACKEND_URL, {
  requestMiddleware(request) {
    const token = nhost.auth.getSession()?.accessToken;
    const authHeader = token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : null;
    return {
      ...request,
      headers: { ...request.headers, ...authHeader },
    };
  },
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});
