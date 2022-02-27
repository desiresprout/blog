import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { css, Global } from '@emotion/react';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/earlyaccess/notosanskr.css" rel="stylesheet" />
        <Head />
        <Global
          styles={css`
            * {
              box-sizing: border-box;
              padding: 0;
              margin: 0;
              font-size: 10px;
              font-family: notosanskr;
            }
            html {
              height: 100%;
            }
            body {
              height: 100%;
            }
          `}
        />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
