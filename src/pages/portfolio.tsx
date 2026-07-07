import Image from "next/image";
import { Seo, SiteLayout } from "@components";
import { caseStudies } from "@/data/site";
import { CtaBand, PageHero, SectionHeading } from "@/modules/umkm-site/components";

export default function PortfolioPage() {
  return (
    <>
      <Seo
        title="Portfolio Aplikasi, Website, dan Sistem Internal | Tekno Kreasi"
        description="Studi kasus produk digital Tekno Kreasi: web internal ekspedisi, aplikasi pengelolaan sampah, POS, ecommerce, dashboard, dan sistem operasional."
        path="/portfolio"
      />
      <SiteLayout>
        <PageHero
          eyebrow="Portfolio produk digital"
          title="Showcase aplikasi dan sistem yang dibuat untuk kebutuhan operasional nyata."
          description="Dari web internal ekspedisi internasional sampai aplikasi layanan pemerintah, setiap produk dirancang agar proses kerja lebih rapi, data lebih mudah dipantau, dan layanan lebih siap berkembang."
          secondaryLabel="Lihat Harga"
          secondaryHref="/harga"
        />
        <section className="px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Studi kasus"
              title="Produk digital yang membantu transaksi, layanan publik, dan sistem internal berjalan lebih tertata."
              description="Berikut contoh proyek yang menampilkan cakupan pekerjaan Tekno Kreasi: dashboard analytics, tracking, human resource, pengelolaan sampah, POS, ecommerce, dan panel internal."
            />
            <div className="mt-12 grid gap-10">
              {caseStudies.map((item, index) => (
                <article
                  key={item.title}
                  className="overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-slate-200/70 ring-1 ring-slate-200"
                >
                  <div className="grid items-stretch gap-0 lg:grid-cols-[1.12fr_0.88fr]">
                    <div className={`relative min-h-[360px] overflow-hidden bg-gradient-to-br ${item.accent} p-4 md:p-8`}>
                      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] bg-[size:42px_42px] opacity-25" />
                      <div className="relative flex h-full min-h-[320px] items-center justify-center rounded-[1.5rem] bg-white/10 p-3 backdrop-blur">
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 58vw"
                          className="object-contain p-2 md:p-4"
                          priority={index === 0}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-between p-7 md:p-10">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full bg-[#172033] px-4 py-2 text-sm font-black text-white">
                            0{index + 1}
                          </span>
                          <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-black text-[#B45309]">
                            {item.industry}
                          </span>
                        </div>
                        <h2 className="mt-6 text-4xl font-black leading-tight text-[#0F172A] md:text-5xl">
                          {item.title}
                        </h2>
                        <p className="mt-5 text-lg leading-8 text-[#475569]">
                          {item.summary}
                        </p>
                        <div className="mt-7 grid gap-3 sm:grid-cols-2">
                          {item.features.map((feature) => (
                            <span key={feature} className="rounded-2xl bg-[#F8FAFC] px-4 py-3 text-sm font-bold text-[#172033] ring-1 ring-slate-200">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-8 rounded-[1.5rem] bg-[#0F172A] p-5 text-white">
                        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#FFB36B]">
                          Dampak produk
                        </p>
                        <p className="mt-4 leading-7 text-white/75">{item.result}</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {item.metrics.map((metric) => (
                            <span key={metric} className="rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-white">
                              {metric}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <CtaBand />
      </SiteLayout>
    </>
  );
}
