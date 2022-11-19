import { getSSRClient, ssrCache } from '@mmmoli/shared/data';
import { getNhostSession } from '@nhost/nextjs';
import { GetServerSidePropsContext } from 'next';
import { Client } from 'urql';

const BACKEND_URL = 'https://nxlppvxwouvddpyfntil.nhost.run/';

export const prefetch = async (
  context: GetServerSidePropsContext,
  prefetches: (urqlClient: Client) => Promise<unknown>[]
) => {
  const nhostSession = await getNhostSession(BACKEND_URL, context);

  if (nhostSession) {
    const urqlClient = getSSRClient(nhostSession);
    await Promise.all(prefetches(urqlClient));
  }

  return {
    props: {
      nhostSession,
      urqlState: ssrCache.extractData(),
    },
  };
};
