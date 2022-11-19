import type { AppProps } from 'next/app';
import Head from 'next/head';
import { nhostSessionAtom, Provider, ssrCache } from '@mmmoli/shared/data';
import { SSRData } from 'next-urql';
import { NhostSession } from '@nhost/nextjs';
import '../styles.css';
import { useHydrateAtoms } from 'jotai/utils';

type PageProps = {
  nhostSession?: NhostSession;
  urqlState?: SSRData;
};

export default function MyApp({ Component, pageProps }: AppProps<PageProps>) {
  useHydrateAtoms([[nhostSessionAtom, pageProps.nhostSession]]);
  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState);
  }

  return (
    <Provider nhostSession={pageProps.nhostSession}>
      <Head>
        <title>Welcome to web!</title>
      </Head>

      <main className="app">
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
