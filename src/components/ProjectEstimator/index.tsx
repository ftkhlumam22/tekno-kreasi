"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { whatsappUrl } from "@/data/site";

type Feature = {
  id: string;
  label: string;
  price: number;
  description: string;
};

const pageOptions: Feature[] = [
  { id: "home", label: "Halaman Utama", price: 500000, description: "Landing page dengan hero, profil, dan CTA" },
  { id: "about", label: "Tentang Kami", price: 300000, description: "Profil bisnis, visi misi, tim" },
  { id: "services", label: "Layanan/Produk", price: 400000, description: "Daftar layanan atau katalog produk" },
  { id: "portfolio", label: "Portfolio/Galeri", price: 350000, description: "Showcase project atau karya" },
  { id: "blog", label: "Blog/Artikel", price: 600000, description: "Halaman artikel dengan kategori" },
  { id: "contact", label: "Kontak", price: 250000, description: "Form kontak, maps, info kontak" },
];

const featureOptions: Feature[] = [
  { id: "responsive", label: "Desain Responsif", price: 0, description: "Mobile, tablet, desktop" },
  { id: "whatsapp", label: "Tombol WhatsApp", price: 0, description: "Integrasi chat langsung" },
  { id: "seo", label: "SEO Dasar", price: 200000, description: "Meta tags, sitemap, schema" },
  { id: "analytics", label: "Google Analytics", price: 150000, description: "Tracking visitor dan konversi" },
  { id: "cms", label: "CMS Sederhana", price: 800000, description: "Update konten sendiri" },
  { id: "multilang", label: "Multi Bahasa", price: 500000, description: "ID/EN atau lebih" },
  { id: "form", label: "Form Email", price: 300000, description: "Form kontak ke email" },
  { id: "maps", label: "Google Maps", price: 100000, description: "Lokasi bisnis di peta" },
];

const ProjectEstimator = () => {
  const [selectedPages, setSelectedPages] = useState<string[]>(["home"]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["responsive", "whatsapp"]);

  const togglePage = (id: string) => {
    setSelectedPages((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    const pagesTotal = selectedPages.reduce((sum, id) => {
      const page = pageOptions.find((p) => p.id === id);
      return sum + (page?.price || 0);
    }, 0);

    const featuresTotal = selectedFeatures.reduce((sum, id) => {
      const feature = featureOptions.find((f) => f.id === id);
      return sum + (feature?.price || 0);
    }, 0);

    return pagesTotal + featuresTotal;
  };

  const total = calculateTotal();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="bg-gradient-to-br from-[#0F172A] to-[#172033] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#FFB36B]">
            Estimasi Cepat
          </p>
          <h2 className="text-4xl font-black text-white md:text-5xl">
            Hitung estimasi project Anda
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Pilih halaman dan fitur yang dibutuhkan, dapatkan estimasi harga real-time.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            <div className="rounded-3xl bg-white/5 p-6 backdrop-blur ring-1 ring-white/10">
              <h3 className="mb-5 text-xl font-black text-white">Halaman yang Dibutuhkan</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {pageOptions.map((page) => (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => togglePage(page.id)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      selectedPages.includes(page.id)
                        ? "border-[#ED893E] bg-[#ED893E]/10"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-bold text-white">{page.label}</p>
                        <p className="mt-1 text-xs text-white/60">{page.description}</p>
                      </div>
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${
                          selectedPages.includes(page.id)
                            ? "bg-[#ED893E] text-white"
                            : "bg-white/10 text-white/40"
                        }`}
                      >
                        {selectedPages.includes(page.id) && (
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    {page.price > 0 && (
                      <p className="mt-2 text-sm font-bold text-[#FFB36B]">+{formatPrice(page.price)}</p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white/5 p-6 backdrop-blur ring-1 ring-white/10">
              <h3 className="mb-5 text-xl font-black text-white">Fitur Tambahan</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {featureOptions.map((feature) => (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => toggleFeature(feature.id)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      selectedFeatures.includes(feature.id)
                        ? "border-[#28A16B] bg-[#28A16B]/10"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-bold text-white">{feature.label}</p>
                        <p className="mt-1 text-xs text-white/60">{feature.description}</p>
                      </div>
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${
                          selectedFeatures.includes(feature.id)
                            ? "bg-[#28A16B] text-white"
                            : "bg-white/10 text-white/40"
                        }`}
                      >
                        {selectedFeatures.includes(feature.id) && (
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    {feature.price > 0 && (
                      <p className="mt-2 text-sm font-bold text-[#5BE49B]">+{formatPrice(feature.price)}</p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <motion.div
              layout
              className="rounded-3xl bg-white p-6 shadow-2xl"
            >
              <h3 className="text-lg font-black text-[#0F172A]">Estimasi Anda</h3>
              
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-[#F8FAFC] p-3">
                  <span className="text-sm font-semibold text-[#475569]">
                    {selectedPages.length} halaman
                  </span>
                  <span className="text-sm font-bold text-[#172033]">
                    {formatPrice(
                      selectedPages.reduce((sum, id) => {
                        const page = pageOptions.find((p) => p.id === id);
                        return sum + (page?.price || 0);
                      }, 0)
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[#F8FAFC] p-3">
                  <span className="text-sm font-semibold text-[#475569]">
                    {selectedFeatures.length} fitur
                  </span>
                  <span className="text-sm font-bold text-[#172033]">
                    {formatPrice(
                      selectedFeatures.reduce((sum, id) => {
                        const feature = featureOptions.find((f) => f.id === id);
                        return sum + (feature?.price || 0);
                      }, 0)
                    )}
                  </span>
                </div>
              </div>

              <div className="mt-5 border-t border-slate-200 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#475569]">Total Estimasi</span>
                  <motion.p
                    key={total}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-3xl font-black text-[#ED893E]"
                  >
                    {formatPrice(total)}
                  </motion.p>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  *Estimasi awal, final menyesuaikan kompleksitas
                </p>
              </div>

              <Link
                href={`${whatsappUrl}&text=${encodeURIComponent(
                  `Halo Tekno Kreasi, saya tertarik dengan estimasi ${formatPrice(total)} untuk project:\n\nHalaman: ${selectedPages.length}\nFitur: ${selectedFeatures.length}\n\nMohon info lebih lanjut.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full justify-center rounded-xl bg-[#ED893E] px-6 py-4 text-sm font-black text-white transition hover:bg-[#d17531] hover:text-white hover:no-underline"
              >
                Konsultasi Estimasi Ini
              </Link>

              <p className="mt-4 text-center text-xs text-gray-500">
                atau <Link href="/harga" className="font-bold text-[#ED893E] hover:underline">lihat paket lengkap</Link>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectEstimator;
