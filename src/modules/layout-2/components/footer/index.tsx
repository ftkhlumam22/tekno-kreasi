import Image from "next/image";
import React from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { facebookUrl, instagramUrl, whatsappDisplay, whatsappUrl } from "@/data/site";

const pages = [
  { label: "Layanan", href: "/layanan" },
  { label: "Harga", href: "/harga" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Tentang", href: "/tentang" },
  { label: "Kontak", href: "/kontak" },
];

const services = ["Website UMKM", "Katalog online", "Aplikasi operasional", "POS & ecommerce", "Sistem internal"];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#08111F] px-5 py-14 text-white md:px-10 md:py-20">
      <div aria-hidden="true" className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#28A16B]/20 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#ED893E]/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur md:p-10 lg:grid-cols-[1.35fr_0.75fr_0.75fr_0.9fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-4 hover:no-underline">
              <span className="relative h-16 w-16 overflow-hidden rounded-full bg-white ring-1 ring-white/20">
                <Image src="/new-logo.jpeg" alt="Tekno Kreasi" fill sizes="64px" className="object-cover" />
              </span>
              <span>
                <span className="block text-2xl font-black text-white">Tekno Kreasi</span>
                <span className="block text-sm font-bold text-[#FFB36B]">Digital Product Studio</span>
              </span>
            </Link>
            <p className="mt-6 max-w-md text-base leading-8 text-white/70">
              Partner digital untuk bisnis yang butuh website, katalog, aplikasi, dan sistem internal yang terlihat profesional, mudah dipakai, dan siap dipromosikan.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#ED893E] px-5 py-3 text-sm font-black text-[#172033] hover:bg-[#d17531] hover:text-[#172033] hover:no-underline"
              >
                <FaWhatsapp aria-hidden="true" />
                Chat WhatsApp
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-black text-[#172033] hover:bg-orange-50 hover:text-[#172033] hover:no-underline"
              >
                Lihat Portfolio
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#FFB36B]">Halaman</h2>
            <ul className="mt-5 space-y-3 text-sm font-semibold text-white/70">
              {pages.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className="transition hover:text-[#FFB36B] hover:no-underline">
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#FFB36B]">Solusi</h2>
            <ul className="mt-5 space-y-3 text-sm font-semibold text-white/70">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] bg-white p-5 text-[#0F172A] shadow-xl shadow-black/20">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#B45309]">Kontak</h2>
            <div className="mt-5 space-y-3 text-sm font-black leading-7 text-[#0F172A]">
              <p className="rounded-2xl bg-[#FFF7ED] px-4 py-3 ring-1 ring-orange-100">Cirebon, Jawa Barat</p>
              <p className="rounded-2xl bg-[#FFF7ED] px-4 py-3 ring-1 ring-orange-100">{whatsappDisplay}</p>
              <p className="rounded-2xl bg-[#FFF7ED] px-4 py-3 ring-1 ring-orange-100">it.teknokreasi@gmail.com</p>
            </div>
            <div className="mt-6 flex gap-3">
              <Link
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Tekno Kreasi"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0F172A] text-white transition hover:bg-[#ED893E] hover:text-[#172033]"
              >
                <FaInstagram aria-hidden="true" />
              </Link>
              <Link
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Tekno Kreasi"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0F172A] text-white transition hover:bg-[#ED893E] hover:text-[#172033]"
              >
                <FaFacebookF aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-white/70">(c) {new Date().getFullYear()} Tekno Kreasi. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 text-sm text-white/70">
            <Link href="/privasi" className="transition hover:text-[#FFB36B] hover:no-underline">
              Kebijakan Privasi
            </Link>
            <Link href="/syarat-ketentuan" className="transition hover:text-[#FFB36B] hover:no-underline">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
