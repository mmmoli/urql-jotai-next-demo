import { NhostSession } from '@nhost/nextjs';
import { atom } from 'jotai';
import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  ssrExchange,
} from 'urql';
import { nhost } from '../provider/nhost';
import { isSSR } from '../utils/isSSR';
import { HTCHErrorExchange } from './errorExchange';
import {
  createNhostClientAuthExchange,
  createNhostSSRAuthExchange,
} from './nhostAuthExchange';

export const ssrCache = ssrExchange({ isClient: !isSSR });
const BACKEND_URL = nhost.graphql.getUrl();

export const getBrowserClient = () =>
  createClient({
    url: BACKEND_URL,
    exchanges: [
      dedupExchange,
      cacheExchange,
      ssrCache,
      createNhostClientAuthExchange(),
      HTCHErrorExchange,
      fetchExchange,
    ],
  });

export const getSSRClient = (session: NhostSession) =>
  createClient({
    url: BACKEND_URL,
    exchanges: [
      dedupExchange,
      cacheExchange,
      ssrCache,
      createNhostSSRAuthExchange({ session }),
      fetchExchange,
      HTCHErrorExchange,
    ],
  });
