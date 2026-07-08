import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="rdgqV0wSDgZw5XJAzxKX4JrL7UImxs5BtA9qWpuD3gU" />
        <link rel="preconnect" href="https://api.whatsapp.com" />
        <link rel="dns-prefetch" href="https://api.whatsapp.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
