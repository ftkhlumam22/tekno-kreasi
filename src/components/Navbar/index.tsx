import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LogoTekno } from "@config/Images";
import cx from "classnames";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const Navbar = () => {
  const { t } = useLanguage();
  const router = useRouter();

  const menuNavbar = [
    { name: t.navbar.home, link: "/" },
    { name: t.navbar.services, link: "/#services" },
    { name: t.navbar.portfolio, link: "/#portfolio" },
    {
      name: t.navbar.contact,
      link: "https://api.whatsapp.com/send/?phone=%2B6289505124994&text=Halo+permisi+saya+ingin+tanya",
    },
  ];

  const [blur, setBlur] = useState<boolean>(false);
  const [openHamburgerMenu, setOpenHamburgerMenu] = useState<boolean>(false);

  useEffect(() => {
    const handleBlur = () => {
      if (window.scrollY >= 90) {
        setBlur(true);
      } else {
        setBlur(false);
      }
    };
    window.addEventListener("scroll", handleBlur);

    return () => {
      window.removeEventListener("scroll", handleBlur);
    };
  }, []);

  // Lock scroll when sidebar is open
  useEffect(() => {
    if (openHamburgerMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openHamburgerMenu]);

  // Check if link is active
  const isActiveLink = (path: string) => {
    if (path === "/") return router.pathname === "/";
    if (path.startsWith("/#")) return false;
    return router.pathname.startsWith(path);
  };

  return (
    <header
      style={{
        zIndex: 999,
        backgroundColor: "white",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        borderBottom: "1px solid #eaeaea",
      }}
      className={cx(
        "w-full navbar-container",
        blur ? "shadow-md" : ""
      )}
    >
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {openHamburgerMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-[998]"
              onClick={() => setOpenHamburgerMenu(false)}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white z-[999] flex flex-col shadow-xl"
            >
              {/* Sidebar header */}
              <div className="flex items-center justify-between p-5 border-b">
                <Link href="/" className="flex-shrink-0">
                  <Image
                    src={LogoTekno}
                    alt="Tekno Kreasi Logo"
                    className="h-8 w-auto"
                    priority
                  />
                </Link>
                <button
                  onClick={() => setOpenHamburgerMenu(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all"
                  aria-label="Close sidebar"
                >
                  <FaTimes className="text-gray-800" size={18} />
                </button>
              </div>

              {/* Navigation links */}
              <div className="flex-1 overflow-y-auto py-3 px-3">
                <div className="space-y-1">
                  {menuNavbar?.map((item, idx) => {
                    const isActive = isActiveLink(item.link);
                    return (
                      <Link
                        key={idx}
                        href={item.link}
                        className={cx(
                          "block py-3 px-4 rounded-md transition-all",
                          item.name === t.navbar.contact
                            ? "bg-[#ED893E] text-white hover:bg-[#d17531]"
                            : isActive
                            ? "bg-orange-50 text-[#ED893E] font-medium"
                            : "text-black hover:bg-gray-50"
                        )}
                        onClick={() => setOpenHamburgerMenu(false)}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Footer with language switcher */}
              <div className="p-5 border-t">
                <LanguageSwitcher />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Navbar - menggunakan inline style untuk memastikan style diterapkan */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div style={{ flexShrink: 0 }}>
          <Link href="/">
            <Image
              src={LogoTekno}
              alt="Tekno Kreasi Logo"
              className="h-9 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              alignItems: "center",
              gap: "1.5rem",
            }}
            className="hidden md:flex"
          >
            {menuNavbar.map((item, idx) => {
              const isActive = isActiveLink(item.link);
              return (
                <Link
                  key={idx}
                  href={item.link}
                  className={cx(
                    "py-2 px-3 text-sm font-medium transition-colors rounded-md",
                    item.name === t.navbar.contact
                      ? "bg-[#ED893E] text-white hover:bg-[#d17531]"
                      : isActive
                      ? "text-[#ED893E]"
                      : "text-black hover:text-[#ED893E] hover:bg-orange-50/30"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="ml-2">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.5rem",
              borderRadius: "0.375rem",
              color: "#1f2937",
              backgroundColor: "transparent",
            }}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:bg-gray-100"
            onClick={() => setOpenHamburgerMenu(true)}
          >
            <span className="sr-only">Open main menu</span>
            <GiHamburgerMenu size={24} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
