import Head from "next/head";
import { Inter } from "next/font/google";
import Layout from "@/modules/layout-2/screen";
import { useLanguage } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { t, language } = useLanguage();

  return (
    <>
      <Head>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta
          property="og:url"
          content={`https://teknokreasi.com${language === "en" ? "/en" : ""}`}
        />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <link rel="icon" href="/tekno-kreasi-logo.svg" />
        <link
          rel="alternate"
          hrefLang={language === "en" ? "id" : "en"}
          href={`https://teknokreasi.com${language === "en" ? "" : "/en"}`}
        />
      </Head>
      <Layout />
    </>
  );
}
