import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { caseStudies, companyStats, faqs, testimonials, whatsappUrl } from "@/data/site";
import {
  fadeUp,
  InteractivePricing,
  PageHero,
  ProcessTimeline,
  ProductExperience,
  SectionHeading,
  WhatsappConversationCta,
} from "./components";

const HomePage = () => {
  const featuredPortfolio = caseStudies[0];
  const segments = [
    "Kuliner dan cafe kecil",
    "Toko retail dan distributor lokal",
    "Jasa profesional dan layanan rumahan",
    "Brand produk lokal dan komunitas",
  ];

  return (
    <>
      <PageHero
        eyebrow="Jasa website dan aplikasi bisnis"
        title="Buat bisnis terlihat profesional, mudah dipercaya, dan siap menerima lebih banyak pelanggan."
        description="Tekno Kreasi membantu UMKM, instansi, dan brand lokal membangun website, katalog online, aplikasi operasional, serta sistem internal yang rapi, cepat dipakai, dan biayanya tetap masuk akal."
        primaryLabel="Konsultasi via WhatsApp"
        secondaryLabel="Lihat Portfolio"
        secondaryHref="/portfolio"
      />

      <section className="px-5 py-8 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-orange-100 md:grid-cols-[1.15fr_1.85fr] md:p-7">
          <div className="rounded-[1.5rem] bg-[#0F172A] p-6 text-white">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#FFB36B]">
              Dipercaya bisnis lokal
            </p>
            <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">20+ client dan project digital.</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Dari website promosi, sistem internal, aplikasi pemerintah, sampai ecommerce dan POS.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {companyStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                variants={fadeUp}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-[1.5rem] bg-[#fffaf4] p-6"
              >
                <p className="text-4xl font-black text-[#ED893E]">{stat.value}</p>
                <p className="mt-2 text-sm font-bold leading-6 text-[#475569]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProductExperience />

      <section className="px-5 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Segmentasi jelas"
            title="Dibuat untuk bisnis yang butuh hasil nyata, bukan fitur yang mubazir."
            description="Kami fokus pada kebutuhan UMKM: tampil profesional, mudah dihubungi, biaya bisa dikontrol, dan sistem bisa dikembangkan bertahap."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {segments.map((segment, index) => (
              <motion.div
                key={segment}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                variants={fadeUp}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm"
              >
                <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 font-bold text-[#ED893E]">
                  {index + 1}
                </span>
                <h3 className="text-lg font-bold text-[#172033]">{segment}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">
                  Solusi digital dipilih sesuai tahap bisnis, bukan disamaratakan.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Masalah UMKM"
            title="Banyak bisnis bagus kalah terlihat karena saluran onlinenya belum rapi."
            description="Website bukan sekadar pajangan. Untuk UMKM, website harus membuat pelanggan cepat paham, percaya, lalu mudah menghubungi atau membeli."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {[
              ["Profil bisnis kurang meyakinkan", "Kami rapikan pesan, tampilan, dan tombol WhatsApp agar terlihat profesional."],
              ["Promosi hanya bergantung media sosial", "Website menjadi aset utama yang bisa dikirim, diiklankan, dan dicari di Google."],
              ["Budget terbatas", "Prioritas pekerjaan dipilih agar biaya awal tidak membebani arus kas."],
              ["Operasional masih manual", "Sistem sederhana dibuat bertahap sesuai proses paling sering dipakai."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-2xl bg-[#fffaf4] p-6">
                <h3 className="text-xl font-bold text-[#172033]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InteractivePricing />

      <ProcessTimeline />

      <section className="bg-white px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Portfolio"
            title="Satu contoh hasil: sistem internal ekspedisi yang menyatukan transaksi, tracking, analytics, dan HR."
            description="Kami tidak hanya membuat tampilan. Produk digital dirancang agar proses kerja lebih mudah dipantau dan data operasional bisa dipakai untuk mengambil keputusan."
          />
          <div className="mt-10 overflow-hidden rounded-[2rem] bg-[#0F172A] shadow-2xl shadow-slate-200 lg:grid lg:grid-cols-[1.08fr_0.92fr]">
            <div className={`relative min-h-[340px] bg-gradient-to-br ${featuredPortfolio.accent} p-5 md:p-8`}>
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] bg-[size:42px_42px] opacity-25" />
              <div className="relative h-full min-h-[300px] rounded-[1.5rem] bg-white/10 backdrop-blur">
                <Image
                  src={featuredPortfolio.image}
                  alt={featuredPortfolio.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 54vw"
                  className="object-contain p-3 md:p-5"
                  priority
                />
              </div>
            </div>
            <div className="p-7 text-white md:p-10">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#FFB36B]">
                {featuredPortfolio.industry}
              </p>
              <h3 className="mt-4 text-4xl font-black text-white md:text-5xl">{featuredPortfolio.title}</h3>
              <p className="mt-5 text-lg leading-8 text-white/75">{featuredPortfolio.summary}</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {featuredPortfolio.features.map((feature) => (
                  <span key={feature} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-white">
                    {feature}
                  </span>
                ))}
              </div>
              <p className="mt-7 rounded-2xl bg-white p-5 text-sm font-semibold leading-7 text-[#172033]">
                {featuredPortfolio.result}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/portfolio"
                  className="inline-flex justify-center rounded-xl bg-[#ED893E] px-6 py-4 text-sm font-black text-white hover:bg-[#d17531] hover:text-white hover:no-underline"
                >
                  Lihat portfolio lain
                </Link>
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center rounded-xl bg-white px-6 py-4 text-sm font-black text-[#172033] hover:bg-orange-50 hover:text-[#172033] hover:no-underline"
                >
                  Diskusi project serupa
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Testimoni"
            title="Dipilih karena prosesnya jelas, hasilnya bisa dipakai, dan komunikasinya rapi."
            description="Kami menjaga setiap project tetap fokus pada manfaat bisnis: penjualan lebih mudah, data lebih rapi, dan operasional lebih terkendali."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial.name}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.28 }}
                variants={fadeUp}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="flex min-h-full flex-col justify-between rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-orange-100"
              >
                <div>
                  <div className="text-sm font-black uppercase tracking-[0.18em] text-[#ED893E]" aria-hidden="true">
                    Rating 5/5
                  </div>
                  <p className="mt-5 text-lg leading-8 text-[#475569]">&quot;{testimonial.quote}&quot;</p>
                </div>
                <div className="mt-8 border-t border-slate-100 pt-5">
                  <p className="font-black text-[#172033]">{testimonial.name}</p>
                  <p className="mt-1 text-sm font-semibold text-[#ED893E]">{testimonial.role}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="FAQ"
            title="Pertanyaan yang sering ditanyakan UMKM."
            align="center"
          />
          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-2xl bg-white p-6 shadow-sm">
                <summary className="cursor-pointer text-lg font-bold text-[#172033]">
                  {faq.question}
                </summary>
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <WhatsappConversationCta />
    </>
  );
};

export default HomePage;
