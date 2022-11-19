import { getUrqlClientOptions } from './getUrqlClientOptions';
import { initUrqlClient } from 'next-urql';
import { createClient } from '@urql/core';
import { ssrExchange } from 'urql';
import { GetServerSidePropsContext } from 'next';
import { getNhostSession } from '@nhost/nextjs';

const BACKEND_URL = 'https://nxlppvxwouvddpyfntil.nhost.run/';

export async function getSsrUrqlClient(context: GetServerSidePropsContext) {
  const nhostSession = await getNhostSession(BACKEND_URL, context);
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    getUrqlClientOptions({
      withAuth: true,
      accessToken: nhostSession?.accessToken,
    })(ssrCache),
    false // canEnableSuspense
  );

  return { client, ssrCache };
}

export function getBrowserUrqlClient() {
  const ssrCache = ssrExchange({ isClient: true });
  const client = createClient(
    getUrqlClientOptions({ withAuth: true })(ssrCache)
  );

  return { client, ssrCache };
}
