import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from '@mmmoli/shared/data';
import '../styles.css';
import { NhostSession } from '@nhost/nextjs';

type PageProps = {
  nhostSession?: NhostSession;
};

export default function MyApp({ Component, pageProps }: AppProps<PageProps>) {
  const { nhostSession } = pageProps;
  return (
    <Provider nhostSession={nhostSession}>
      <Head>
        <title>Welcome to web!</title>
      </Head>

      <main className="app">
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
