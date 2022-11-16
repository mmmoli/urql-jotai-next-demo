import { Hydrate } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/layout/layout';
import '../styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <title>Welcome to web!</title>
        </Head>

        <main className="app">
          <Component {...pageProps} />
        </main>
      </Hydrate>
    </Layout>
  );
}

export default CustomApp;
