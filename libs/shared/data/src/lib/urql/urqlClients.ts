import { Client, ssrExchange } from 'urql';
import { initUrqlClient, SSRExchange } from 'next-urql';
import { getUrqlClientOptions } from './clientOptions';
import { NhostSession } from '@nhost/nextjs';
import { atom } from 'jotai';

export type UrlClient = {
  client: Client | null;
  ssrCache: SSRExchange;
};

export function getSsrUrqlClient(nhostSession: NhostSession): UrlClient {
  const ssrCache = ssrExchange({ isClient: false });
  const clientOptions = getUrqlClientOptions({
    accessToken: nhostSession?.accessToken,
    refreshToken: nhostSession?.refreshToken,
  })(ssrCache);
  const client = initUrqlClient(
    clientOptions,
    false // canEnableSuspense
  );

  return { client, ssrCache };
}

export function getBrowserUrqlClient(): UrlClient {
  const ssrCache = ssrExchange({ isClient: true });
  const client = initUrqlClient(
    getUrqlClientOptions({ withAuth: true })(ssrCache),
    false // canEnableSuspense
  );

  return { client, ssrCache };
}

export const urqlClientAtom = atom(() => getBrowserUrqlClient().client);
