import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { FaTimes } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { whatsappUrl } from "@/data/site";

const menuNavbar = [
  { name: "Beranda", link: "/" },
  { name: "Layanan", link: "/layanan" },
  { name: "Harga", link: "/harga" },
  { name: "Portfolio", link: "/portfolio" },
  { name: "Tentang", link: "/tentang" },
];

const Navbar = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY >= 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const isActiveLink = (path: string) => {
    if (path === "/") return router.pathname === "/";
    return router.pathname.startsWith(path);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[999] px-4 py-3 md:px-6">
      <div
        className={cx(
          "mx-auto flex max-w-7xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-300",
          isScrolled
            ? "border-white/70 bg-white/90 shadow-xl shadow-slate-200/70 backdrop-blur-xl"
            : "border-white/80 bg-white/75 shadow-sm backdrop-blur-md"
        )}
      >
        <Link href="/" className="flex items-center gap-3 rounded-full pr-3 hover:no-underline">
          <span className="relative h-11 w-11 overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-green-100">
            <Image
              src="/new-logo.jpeg"
              alt="Tekno Kreasi"
              fill
              sizes="44px"
              className="object-cover"
              priority
            />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-black tracking-tight text-[#172033]">Tekno Kreasi</span>
            <span className="block text-xs font-semibold text-[#B45309]">Digital Product Studio</span>
          </span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden items-center rounded-full bg-slate-100/75 p-1 md:flex">
          {menuNavbar.map((item) => {
            const isActive = isActiveLink(item.link);

            return (
              <Link
                key={item.link}
                href={item.link}
                className={cx(
                  "relative rounded-full px-4 py-2 text-sm font-bold transition-colors hover:no-underline",
                  isActive ? "text-[#172033]" : "text-slate-600 hover:text-[#ED893E]"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-slate-200"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#ED893E] px-5 py-3 text-sm font-black text-[#172033] shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-[#d17531] hover:text-[#172033] hover:no-underline"
          >
            Konsultasi Gratis
          </Link>
        </div>

        <button
          type="button"
          aria-label="Buka menu"
          aria-expanded={isMobileMenuOpen}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#172033] text-white shadow-lg shadow-slate-300 transition hover:bg-[#0F172A] md:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <GiHamburgerMenu size={20} aria-hidden="true" />
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <motion.button
              type="button"
              aria-label="Tutup menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-[998] bg-[#0F172A]/55 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="fixed bottom-0 right-0 top-0 z-[999] flex w-[88%] max-w-[360px] flex-col bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <Link href="/" className="flex items-center gap-3 hover:no-underline">
                  <span className="relative h-12 w-12 overflow-hidden rounded-full ring-1 ring-green-100">
                    <Image src="/new-logo.jpeg" alt="Tekno Kreasi" fill sizes="48px" className="object-cover" />
                  </span>
                  <span>
                    <span className="block text-base font-black text-[#172033]">Tekno Kreasi</span>
                    <span className="block text-xs font-bold text-[#B45309]">Digital Product Studio</span>
                  </span>
                </Link>
                <button
                  type="button"
                  aria-label="Tutup menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-[#172033] transition hover:bg-orange-50 hover:text-[#ED893E]"
                >
                  <FaTimes size={16} aria-hidden="true" />
                </button>
              </div>

              <nav aria-label="Navigasi mobile" className="flex-1 space-y-2 overflow-y-auto p-5">
                {menuNavbar.map((item) => {
                  const isActive = isActiveLink(item.link);

                  return (
                    <Link
                      key={item.link}
                      href={item.link}
                      className={cx(
                        "flex items-center justify-between rounded-2xl px-5 py-4 text-base font-black transition hover:no-underline",
                        isActive
                          ? "bg-orange-50 text-[#B45309] ring-1 ring-orange-100"
                          : "bg-slate-50 text-[#172033] hover:bg-green-50 hover:text-[#166534]"
                      )}
                    >
                      {item.name}
                      <span className="text-sm">→</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="border-t border-slate-100 p-5">
                <p className="text-sm leading-6 text-slate-600">
                  Website, aplikasi, dan sistem internal untuk bisnis yang ingin terlihat profesional dan siap tumbuh.
                </p>
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex justify-center rounded-2xl bg-[#ED893E] px-5 py-4 text-sm font-black text-[#172033] hover:bg-[#d17531] hover:text-[#172033] hover:no-underline"
                >
                  Konsultasi Gratis
                </Link>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
