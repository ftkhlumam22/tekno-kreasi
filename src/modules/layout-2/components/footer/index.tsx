import Image from "next/image";
import React from "react";
import { LogoTeknoBlack } from "@/config/Images";
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full py-12 flex justify-center items-center relative">
      <div className="flex-col justify-start items-center md:w-[65%] w-3/4">
        <div className="mb-5 pl-0 ml-0">
          <Image
            src={LogoTeknoBlack}
            alt="Tekno Kreasi Logo"
            className="object-cover pl-0 -ml-2"
          />
        </div>
        <div className="flex md:flex-row flex-col justify-evenly">
          <div className="md:w-[30%] w-full text-black md:mb-0 mb-7">
            <h2 className="text-xl text-black font-bold mb-4">
              {t.footer.office}
            </h2>
            <p className="mb-4 text-black font-light text-[17px] leading-tight">
              {t.footer.address}
            </p>
            <p className="font-light text-black text-[17px] leading-[1.35]">
              {t.footer.office}. 0818-240-707 <br /> {t.footer.email}.
              it.teknokreasi@gmail.com
            </p>
          </div>
          <div className="flex-[2] md:pl-10 pl-0 text-black">
            <h2 className="text-xl font-bold mb-4">{t.footer.information}</h2>
            <ul className="font-light text-[17px] leading-tight">
              <li>{t.footer.links.faq}</li>
              <li>{t.footer.links.contact}</li>
              <li>{t.footer.links.terms}</li>
              <li>{t.footer.links.privacy}</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
