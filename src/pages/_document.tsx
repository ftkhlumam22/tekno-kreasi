import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        <link rel="alternate" hrefLang="en" href="https://teknokreasi.com/en" />
        <link rel="alternate" hrefLang="id" href="https://teknokreasi.com" />
        <link rel="canonical" href="https://teknokreasi.com" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tekno Kreasi" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="google-site-verification" content="rdgqV0wSDgZw5XJAzxKX4JrL7UImxs5BtA9qWpuD3gU" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
