import Link from "next/link";
import { Seo, SiteLayout, ContactForm } from "@components";
import { whatsappDisplay, whatsappUrl } from "@/data/site";
import { PageHero, SectionHeading } from "@/modules/umkm-site/components";

export default function KontakPage() {
  return (
    <>
      <Seo
        title="Kontak Tekno Kreasi | Konsultasi Website UMKM"
        description="Hubungi Tekno Kreasi untuk konsultasi website UMKM, katalog online, aplikasi operasional sederhana, branding, dan digital marketing."
        path="/kontak"
      />
      <SiteLayout>
        <PageHero
          eyebrow="Kontak"
          title="Ceritakan bisnis Anda, kami bantu pilih langkah digital yang tepat."
          description="Konsultasi awal bisa lewat WhatsApp atau form di bawah. Siapkan jenis bisnis, target pelanggan, contoh referensi, dan perkiraan budget agar rekomendasi lebih akurat."
          primaryLabel="Chat WhatsApp"
          secondaryLabel="Lihat Harga"
          secondaryHref="/harga"
        />
        <section className="px-5 py-16 md:px-10">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_1fr]">
            <div className="space-y-5">
              <SectionHeading
                eyebrow="Informasi kontak"
                title="Pilih cara yang paling nyaman untuk Anda."
              />
              <div className="rounded-3xl bg-white p-7 shadow-sm ring-2 ring-orange-100">
                <h2 className="text-2xl font-black text-[#0F172A]">WhatsApp</h2>
                <p className="mt-3 font-semibold text-[#0F172033]">Respons paling cepat untuk konsultasi kebutuhan website dan digitalisasi UMKM.</p>
                <p className="mt-2 text-lg font-black text-[#0F172A]">{whatsappDisplay}</p>
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex rounded-xl bg-[#ED893E] px-6 py-4 text-sm font-bold text-white hover:bg-[#d17531] hover:text-white hover:no-underline"
                >
                  Buka WhatsApp
                </Link>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-3xl bg-white p-7 shadow-sm ring-2 ring-orange-100">
                  <h2 className="text-xl font-black text-[#0F172A]">Email</h2>
                  <p className="mt-3 font-black text-[#0F172A]">it.teknokreasi@gmail.com</p>
                </div>
                <div className="rounded-3xl bg-white p-7 shadow-sm ring-2 ring-orange-100">
                  <h2 className="text-xl font-black text-[#0F172A]">Lokasi</h2>
                  <p className="mt-3 font-black text-[#0F172A]">Cirebon, Jawa Barat</p>
                </div>
              </div>
              <div className="rounded-3xl bg-[#172033] p-7 text-white">
                <h2 className="text-2xl font-bold text-white">Format brief singkat</h2>
                <ul className="mt-5 space-y-3 font-bold text-white">
                  <li>1. Jenis bisnis dan produk utama</li>
                  <li>2. Tujuan: profil, penjualan, katalog, atau sistem internal</li>
                  <li>3. Deadline dan perkiraan budget</li>
                  <li>4. Link referensi jika ada</li>
                </ul>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </SiteLayout>
    </>
  );
}
