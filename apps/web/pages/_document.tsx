import { Provider } from '@mmmoli/shared/data';
import Document, { Head, Html, Main, NextScript } from 'next/document';

// see https://nextjs.org/docs/advanced-features/custom-document
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Provider>
        <Html lang="en">
          <Head>
            <meta
              name="description"
              content="A page to demonstrate NextJs and Urql working together"
            />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      </Provider>
    );
  }
}

export default MyDocument;
