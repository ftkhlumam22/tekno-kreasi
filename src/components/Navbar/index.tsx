import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LogoTekno } from "@config/Images";
import cx from "classnames";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";

type NavbarIndex = [number, number, boolean];

const Navbar = () => {
  const menuNavbar: Array<{ name: string; link: string }> = [
    { name: "Beranda", link: "/" },
    { name: "Layanan", link: "/#services" },
    { name: "Portofolio", link: "/#portfolio" },
    { name: "Kontak Kami", link: "https://api.whatsapp.com/send/?phone=%2B6289505124994&text=Halo+permisi+saya+ingin+tanya" },
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
  }, []);

  const mobileSideMenu = (
    <div
      className={cx(
        openHamburgerMenu ? "left-0" : "-left-full",
        "fixed top-0 bottom-0 w-2/5 bg-white text-black shadow-lg z-[99] transition-all flex justify-center items-start py-20"
      )}
    >
      <div className="flex flex-col gap-y-6 items-center">
        {menuNavbar?.map((item, idx) => {
          return (
            <>
              <Link
                key={idx}
                href={item.link}
                className={cx(
                  item.name.includes("Kontak") &&
                    "px-4 py-[0.35rem] rounded-lg bg-[#ED893E] text-white",
                  "text-black text-sm"
                )}
              >
                {item.name}
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {mobileSideMenu}
      <nav
        className={cx(
          blur ? "backdrop-blur-md" : "backdrop-blur-sm",
          " bg-white py-3 bg-opacity-80 text-gray-800 fixed left-0 right-0 top-0 z-50"
        )}
      >
        <div className="items-center justify-around md:gap-x-16 gap-10 h-16 flex">
          <div className="flex items-center">
            <Link href="#" className="flex ">
              <Image
                src={LogoTekno}
                alt=""
                // height={40}
                width={100}
                className="object-cover"
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-baseline justify-around w-80 text-xs">
              {menuNavbar?.map((item, idx) => {
                return (
                  <>
                    <Link
                      key={idx}
                      href={item.link}
                      className={cx(
                        item.name.includes("Kontak") &&
                          "px-4 py-[0.35rem] rounded-lg bg-[#ED893E] text-white",
                        "text-black"
                      )}
                    >
                      {item.name}
                    </Link>
                  </>
                );
              })}
            </div>
          </div>
          {/* mobile view */}
          <div className="md:hidden block">
            {!openHamburgerMenu ? (
              <GiHamburgerMenu
                className="text-black"
                size={30}
                onClick={() => setOpenHamburgerMenu(true)}
              />
            ) : (
              <FaTimes
                className="text-black"
                size={30}
                onClick={() => setOpenHamburgerMenu(false)}
              />
            )}
          </div>
          {/* End Mobile */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
