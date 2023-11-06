import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script async src="https://cdn.jsdelivr.net/npm/theme-change@2.0.2/index.js"></script>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" /> 
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
