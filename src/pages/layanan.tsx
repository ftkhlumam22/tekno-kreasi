import { Seo, SiteLayout } from "@components";
import { services, whatsappUrl } from "@/data/site";
import { CtaBand, PageHero, SectionHeading } from "@/modules/umkm-site/components";
import Link from "next/link";

export default function LayananPage() {
  return (
    <>
      <Seo
        title="Layanan Digital UMKM | Tekno Kreasi"
        description="Website UMKM, katalog online, aplikasi operasional sederhana, branding, dan digital marketing dengan cakupan kebutuhan realistis untuk bisnis kecil dan menengah."
        path="/layanan"
      />
      <SiteLayout>
        <PageHero
          eyebrow="Layanan digital terarah"
          title="Solusi digital yang dipilih berdasarkan prioritas UMKM."
          description="Kami tidak memaksa fitur kompleks. Setiap layanan dirancang agar bisnis bisa mulai cepat, terlihat profesional, dan tetap punya ruang berkembang."
          secondaryLabel="Bandingkan Paket"
          secondaryHref="/harga"
        />

        <section className="px-5 py-16 md:px-10">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Pilih kebutuhan"
              title="Dari website profil sampai sistem operasional ringan."
              description="Setiap layanan dapat disesuaikan dengan budget, target pelanggan, dan kesiapan konten bisnis Anda."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {services.map((service) => (
                <article key={service.slug} className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-orange-100">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#ED893E]">
                        {service.price}
                      </p>
                      <h2 className="mt-3 text-3xl font-bold text-[#172033]">{service.title}</h2>
                    </div>
                    <span className="w-fit rounded-full bg-green-50 px-4 py-2 text-sm font-bold text-[#28A16B]">
                      {service.timeline}
                    </span>
                  </div>
                  <p className="mt-5 text-lg leading-8 text-gray-600">{service.description}</p>
                  <ul className="mt-6 grid gap-3 text-sm text-gray-700">
                    {service.features.map((feature) => (
                      <li key={feature} className="rounded-xl bg-[#fffaf4] px-4 py-3">✓ {feature}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="mt-10 rounded-3xl bg-[#172033] p-8 text-white md:p-10">
              <h2 className="text-3xl font-bold text-white">Belum yakin layanan mana yang cocok?</h2>
              <p className="mt-4 max-w-2xl text-white/75">
                Mulai dari konsultasi singkat. Kami bantu rekomendasikan kebutuhan yang paling berdampak untuk bisnis Anda.
              </p>
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex rounded-xl bg-[#ED893E] px-6 py-4 text-sm font-bold text-white hover:bg-[#d17531] hover:text-white hover:no-underline"
              >
                Konsultasi Layanan
              </Link>
            </div>
          </div>
        </section>
        <CtaBand />
      </SiteLayout>
    </>
  );
}
