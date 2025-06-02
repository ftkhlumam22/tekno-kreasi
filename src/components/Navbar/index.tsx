import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LogoTekno } from "@config/Images";
import cx from "classnames";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type NavbarIndex = [number, number, boolean];

const Navbar = () => {
  const { t } = useLanguage();

  const menuNavbar: Array<{ name: string; link: string }> = [
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
    const handleBlur = (): any => {
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

  const mobileSideMenu = (
    <nav
      className={cx(
        openHamburgerMenu ? "left-0" : "-left-full",
        "fixed top-0 bottom-0 w-2/5 bg-white text-black shadow-lg z-[99] transition-all flex justify-center items-start py-20"
      )}
      aria-label="Mobile Navigation"
    >
      <div className="flex flex-col gap-y-6 items-center">
        {menuNavbar?.map((item, idx) => {
          return (
            <Link
              key={idx}
              href={item.link}
              className={cx(
                item.name === t.navbar.contact &&
                  "px-4 py-[0.35rem] rounded-lg bg-[#ED893E] text-white",
                "text-black"
              )}
            >
              {item.name}
            </Link>
          );
        })}
        <LanguageSwitcher />
      </div>
    </nav>
  );

  return (
    <header
      className={cx(
        "w-full fixed z-[999]",
        blur ? "backdrop-blur-xl shadow-md bg-white/50" : ""
      )}
    >
      {mobileSideMenu}

      <div
        className={cx(
          "w-full mx-auto flex items-center justify-between md:py-4 py-3 md:px-12 px-8"
        )}
      >
        <div className="self-center">
          <Link href="/">
            <Image
              src={LogoTekno}
              className="md:h-12 h-7 w-auto"
              alt="Tekno Kreasi Logo"
              priority
            />
          </Link>
        </div>

        <div className="flex items-center">
          {/* desktop view */}
          <div className="md:block hidden">
            <div className="flex items-baseline justify-around w-80 text-xs">
              {menuNavbar?.map((item, idx) => {
                return (
                  <Link
                    key={idx}
                    href={item.link}
                    className={cx(
                      item.name === t.navbar.contact &&
                        "px-4 py-[0.35rem] rounded-lg bg-[#ED893E] text-white",
                      "text-black"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Desktop language switcher */}
          <div className="md:block hidden">
            <LanguageSwitcher />
          </div>

          {/* mobile view */}
          <div className="md:hidden block">
            {!openHamburgerMenu ? (
              <button
                aria-label="Open menu"
                onClick={() => setOpenHamburgerMenu(true)}
              >
                <GiHamburgerMenu className="text-black" size={30} />
              </button>
            ) : (
              <button
                aria-label="Close menu"
                onClick={() => setOpenHamburgerMenu(false)}
              >
                <FaTimes className="text-black" size={30} />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
