import Link from "next/link";
import { Seo, SiteLayout } from "@components";
import { FaHome, FaSearch, FaWhatsapp } from "react-icons/fa";

export default function Custom404() {
  return (
    <>
      <Seo
        title="Halaman Tidak Ditemukan | Tekno Kreasi"
        description="Halaman yang Anda cari tidak ditemukan. Kembali ke beranda atau hubungi kami untuk konsultasi."
      />
      <SiteLayout>
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,#fee9d2,transparent_34%),linear-gradient(135deg,#fffaf4_0%,#f4fff9_100%)] px-5 py-20 md:px-10 md:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-8xl font-black text-[#ED893E]/20 md:text-9xl">404</p>
            <h1 className="mt-4 text-3xl font-black text-[#172033] md:text-5xl">
              Halaman tidak ditemukan
            </h1>
            <p className="mt-5 text-base leading-8 text-gray-600 md:text-lg">
              Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau tidak pernah ada.
              Jangan khawatir, kami bantu Anda menemukan yang dibutuhkan.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ED893E] px-6 py-4 text-sm font-black text-[#172033] transition hover:bg-[#d17531] hover:text-[#172033] hover:no-underline"
              >
                <FaHome aria-hidden="true" />
                Kembali ke Beranda
              </Link>
              <Link
                href="https://api.whatsapp.com/send/?phone=6285157215288&text=Halo%20Tekno%20Kreasi%2C%20saya%20ingin%20konsultasi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F172A] px-6 py-4 text-sm font-black text-white transition hover:bg-[#172033] hover:text-white hover:no-underline"
              >
                <FaWhatsapp aria-hidden="true" />
                Chat WhatsApp
              </Link>
            </div>

            <div className="mt-16">
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-[#B45309]">
                Atau coba kunjungi
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { label: "Layanan", href: "/layanan", desc: "Website, katalog, dan aplikasi" },
                  { label: "Harga", href: "/harga", desc: "Paket dan estimasi biaya" },
                  { label: "Portfolio", href: "/portfolio", desc: "Hasil kerja kami" },
                  { label: "Kontak", href: "/kontak", desc: "Hubungi tim kami" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-orange-100 transition hover:ring-[#ED893E] hover:no-underline"
                  >
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#B45309]">
                      <FaSearch size={14} />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-[#172033]">{link.label}</span>
                      <span className="block text-xs text-gray-500">{link.desc}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </SiteLayout>
    </>
  );
}
