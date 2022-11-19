import { NhostSession } from '@nhost/nextjs';
import { atom } from 'jotai';
import {
  cacheExchange,
  Client,
  createClient,
  dedupExchange,
  fetchExchange,
  ssrExchange,
} from 'urql';
import { nhost } from '../provider/nhost';
import { isSSR } from '../utils/isSSR';
import { HTCHErrorExchange } from './errorExchange';

export const ssrCache = ssrExchange({ isClient: !isSSR });
const BACKEND_URL = nhost.graphql.getUrl();

export const urqlClientAtom = atom(() => {
  const session = nhost.auth.getSession();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  if (!session) return new Promise<Client>(() => {});

  return createClient({
    url: BACKEND_URL,
    exchanges: [
      dedupExchange,
      cacheExchange,
      ssrCache,
      HTCHErrorExchange,
      fetchExchange,
    ],
    fetchOptions: () => {
      return {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      };
    },
  });
});

export const getSSRClient = (session: NhostSession) =>
  createClient({
    url: BACKEND_URL,
    exchanges: [
      dedupExchange,
      cacheExchange,
      ssrCache,
      fetchExchange,
      HTCHErrorExchange,
    ],
    fetchOptions: () => {
      return {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      };
    },
  });
