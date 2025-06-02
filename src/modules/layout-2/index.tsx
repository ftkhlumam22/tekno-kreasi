import React from "react";
import { Navbar } from "../../components";
import {
  Jumbotron,
  SectionAbout,
  SectionProses,
  SectionSkillupType,
  SectionCollab,
  SectionCallToAction,
  Footer,
} from "./components";
import Head from "next/head";
import { useLanguage } from "../../context/LanguageContext";
import { Container } from "../../components";

const Layout = () => {
  const { t, language } = useLanguage();

  // Structured data for organization
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tekno Kreasi",
    url: "https://teknokreasi.com",
    logo: "https://teknokreasi.com/tekno-kreasi-logo.svg",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-818-240-707",
      contactType: "customer service",
      availableLanguage: ["Indonesian", "English"],
    },
    sameAs: [
      "https://www.facebook.com/teknokreasi",
      "https://www.instagram.com/teknokreasi",
      "https://www.linkedin.com/company/teknokreasi",
    ],
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <Navbar />
      <main className="pt-16">
        <Container fullWidth>
          <Jumbotron />
        </Container>
        <Container>
          <SectionAbout />
          <SectionProses />
          <SectionSkillupType />
          <SectionCollab />
          <SectionCallToAction />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
