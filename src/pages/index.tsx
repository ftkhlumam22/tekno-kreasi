import { Seo, SiteLayout } from "@components";
import HomePage from "@/modules/umkm-site/HomePage";

export default function Home() {
  return (
    <>
      <Seo
        title="Jasa Website, Katalog Online & Aplikasi UMKM | Tekno Kreasi"
        description="Tekno Kreasi membuat website UMKM, katalog online, aplikasi operasional, sistem internal, branding, dan digital marketing dengan harga terjangkau."
      />
      <SiteLayout>
        <HomePage />
      </SiteLayout>
    </>
  );
}
