import Head from "next/head";
import { faqs, ogImage, siteUrl } from "@/data/site";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

const Seo = ({ title, description, path = "", image }: SeoProps) => {
  const canonical = `${siteUrl}${path}`;
  const ogImageUrl = image ? `${siteUrl}${image}` : `${siteUrl}${ogImage}`;

  const localBusinessJson = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Tekno Kreasi",
    description: "Jasa pembuatan website UMKM, katalog online, aplikasi operasional, dan digital marketing.",
    url: siteUrl,
    logo: `${siteUrl}/new-logo.jpeg`,
    image: ogImageUrl,
    telephone: "+6285157215288",
    email: "it.teknokreasi@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cirebon",
      addressRegion: "Jawa Barat",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.7063,
      longitude: 108.5572,
    },
    sameAs: [
      "https://www.instagram.com/teknokreasi.digital/",
      "https://www.facebook.com/teknokreasidigital/",
    ],
    priceRange: "Rp1.500.000 - Rp5.000.000",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  };

  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beranda",
        item: siteUrl,
      },
      ...(path
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: title.replace(" | Tekno Kreasi", ""),
              item: canonical,
            },
          ]
        : []),
    ],
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#ED893E" />
      <meta name="author" content="Tekno Kreasi" />
      <link rel="canonical" href={canonical} />
      <link rel="icon" href="/new-logo.jpeg" />
      <link rel="apple-touch-icon" href="/new-logo.jpeg" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:site_name" content="Tekno Kreasi" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@teknokreasi" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      <link rel="alternate" hrefLang="id" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />
    </Head>
  );
};

export default Seo;
