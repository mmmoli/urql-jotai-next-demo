import { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/layout/layout';
import '../styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>Welcome to web!</title>
      </Head>

      <main className="app">
        <Component {...pageProps} />
      </main>
    </Layout>
  );
}

export default CustomApp;
