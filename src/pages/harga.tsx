import Link from "next/link";
import { Seo, SiteLayout } from "@components";
import { faqs, packages, whatsappUrl } from "@/data/site";
import { CtaBand, PageHero, SectionHeading } from "@/modules/umkm-site/components";

export default function HargaPage() {
  return (
    <>
      <Seo
        title="Harga Website UMKM Terjangkau | Tekno Kreasi"
        description="Paket website dan digitalisasi UMKM mulai Rp1,5 jutaan dengan cakupan pekerjaan jelas, proses bertahap, dan opsi custom sesuai kebutuhan."
        path="/harga"
      />
      <SiteLayout>
        <PageHero
          eyebrow="Harga transparan"
          title="Mulai dari paket kecil, naik kelas saat bisnis siap."
          description="Kami menjaga cakupan pekerjaan tetap realistis agar biaya awal tidak membebani UMKM. Setiap paket bisa disesuaikan setelah kebutuhan dipetakan."
          secondaryLabel="Lihat Layanan"
          secondaryHref="/layanan"
        />

        <section className="px-5 py-16 md:px-10">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Paket UMKM"
              title="Harga masuk akal dengan hasil yang tetap profesional."
              description="Angka berikut adalah acuan awal. Estimasi final disesuaikan dengan jumlah halaman, konten, fitur, dan kebutuhan integrasi."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {packages.map((item) => (
                <article
                  key={item.name}
                  className={`rounded-3xl p-7 shadow-sm ${item.highlighted ? "bg-[#ED893E] text-white" : "bg-white text-[#172033] ring-1 ring-orange-100"}`}
                >
                  <h2 className={`text-2xl font-bold ${item.highlighted ? "text-white" : "text-[#172033]"}`}>{item.name}</h2>
                  <p className={`mt-5 text-4xl font-extrabold ${item.highlighted ? "text-white" : "text-[#ED893E]"}`}>{item.price}</p>
                  <p className={`mt-4 text-sm leading-7 ${item.highlighted ? "text-white/80" : "text-gray-600"}`}>{item.note}</p>
                  <ul className="mt-6 space-y-3 text-sm">
                    {item.items.map((feature) => (
                      <li key={feature}>✓ {feature}</li>
                    ))}
                  </ul>
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-7 inline-flex rounded-xl px-5 py-3 text-sm font-bold hover:no-underline ${item.highlighted ? "bg-white text-[#172033] hover:text-[#172033]" : "bg-[#172033] text-white hover:text-white"}`}
                  >
                    Tanya Paket Ini
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-16 md:px-10">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.9fr_1.1fr]">
            <SectionHeading
              eyebrow="Cara menekan biaya"
              title="Kami bantu pisahkan fitur wajib dan fitur nanti."
            />
            <div className="grid gap-4">
              {[
                "Mulai dari halaman yang langsung mendukung penjualan.",
                "Konten dapat menggunakan aset yang sudah dimiliki bisnis.",
                "Fitur custom dibuat bertahap lewat tahapan kerja kecil.",
                "Maintenance dan update dapat dipilih sesuai kebutuhan.",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-[#fffaf4] p-5 font-medium text-gray-700">✓ {item}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 md:px-10">
          <div className="mx-auto max-w-4xl">
            <SectionHeading eyebrow="FAQ harga" title="Yang perlu diketahui sebelum mulai." align="center" />
            <div className="mt-10 space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="rounded-2xl bg-white p-6 shadow-sm">
                  <summary className="cursor-pointer text-lg font-bold text-[#172033]">{faq.question}</summary>
                  <p className="mt-4 text-gray-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <CtaBand />
      </SiteLayout>
    </>
  );
}
