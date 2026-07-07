import { Seo, SiteLayout } from "@components";
import { CtaBand, PageHero, SectionHeading } from "@/modules/umkm-site/components";

export default function TentangPage() {
  return (
    <>
      <Seo
        title="Tentang Tekno Kreasi | Partner Digital UMKM"
        description="Tekno Kreasi membantu UMKM Indonesia membangun website, katalog, branding, dan sistem digital yang realistis, profesional, dan terjangkau."
        path="/tentang"
      />
      <SiteLayout>
        <PageHero
          eyebrow="Tentang Tekno Kreasi"
          title="Kami membantu UMKM masuk digital dengan langkah yang realistis."
          description="Bagi kami, digitalisasi bukan soal membuat sistem paling mahal. Digitalisasi yang baik adalah solusi yang dipakai, dipahami, dan sesuai kemampuan bisnis."
          secondaryLabel="Lihat Layanan"
          secondaryHref="/layanan"
        />
        <section className="px-5 py-16 md:px-10">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
            <SectionHeading
              eyebrow="Prinsip kerja"
              title="Profesional, sederhana, dan bertahap."
              description="Kami menyeimbangkan desain, teknologi, SEO, dan biaya agar solusi yang dibuat benar-benar membantu bisnis berjalan."
            />
            <div className="grid gap-5">
              {[
                ["Tidak dibuat berlebihan", "Fitur dibuat sesuai kebutuhan nyata, bukan karena terlihat canggih."],
                ["Harga dijelaskan di awal", "Cakupan pekerjaan, asumsi, dan potensi biaya tambahan dibicarakan sebelum produksi."],
                ["Fokus konversi", "Setiap halaman diarahkan agar pelanggan mudah paham dan menghubungi bisnis."],
                ["Siap berkembang", "Struktur dibuat agar bisa ditambah fitur saat bisnis sudah siap."],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-orange-100">
                  <h2 className="text-xl font-bold text-[#172033]">{title}</h2>
                  <p className="mt-3 text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <CtaBand />
      </SiteLayout>
    </>
  );
}
