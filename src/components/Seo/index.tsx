import Head from "next/head";
import { siteUrl } from "@/data/site";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
};

const Seo = ({ title, description, path = "" }: SeoProps) => {
  const canonical = `${siteUrl}${path}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={canonical} />
      <link rel="icon" href="/new-logo.jpeg" />
      <link rel="apple-touch-icon" href="/new-logo.jpeg" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Tekno Kreasi" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
};

export default Seo;
