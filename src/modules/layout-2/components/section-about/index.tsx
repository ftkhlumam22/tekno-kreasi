import React from "react";
import Image from "next/image";
import {
  ImageSectionAbout,
  MobileImageSectionAbout,
  LampIcon,
  MechIcon,
  PhoneIcon,
} from "@/config/Images";
import { useLanguage } from "@/context/LanguageContext";

const SectionAbout = () => {
  const { t } = useLanguage();

  const cardCustom = (title: string, img: any) => {
    return (
      <div className="flex gap-x-4 mb-3 items-center">
        <Image src={img} alt={title} width={30} height={30} />
        <p className="text-black text-lg">{title}</p>
      </div>
    );
  };

  return (
    <section className="flex md:flex-row flex-col md:pt-20 pt-10 md:px-0 px-6">
      <div className="md:flex-1 flex md:justify-end justify-center md:pr-20 pt-8">
        <Image
          src={ImageSectionAbout}
          alt="Why Tekno Kreasi"
          className="object-cover md:block hidden"
        />
        <Image
          src={MobileImageSectionAbout}
          alt="Why Tekno Kreasi"
          className="w-96 block md:hidden"
        />
      </div>
      <main className="md:flex-1 md:mt-0 mt-12">
        <div className="flex gap-x-3 md:mb-0 mb-4">
          <h2 className="relative text-xl text-[#e38421]">
            {t.about.subtitle}
          </h2>
          <div className="md:w-20 w-10 h-[0.10rem] bg-[#e38421] self-end mb-1" />
        </div>
        <div className="text-black md:text-[3rem] tracking-wide text-[2.2rem] md:leading-[1.05] leading-[1.10] mb-9">
          <span className="font-bold">{t.about.title.part1}</span> <br />
          {t.about.title.part2}{" "}
          <span className="font-bold">{t.about.title.part3}</span> <br />
          <span className="font-bold">{t.about.title.part4}</span>
        </div>
        <p className="font-normal text-[#595959] mb-9 text-lg md:w-2/3 w-full tracking-wide">
          {t.about.paragraph1}
        </p>
        <p className="font-normal text-[#595959] mb-9 text-lg md:w-2/3 tracking-wide">
          {t.about.paragraph2}
        </p>
        <div className="md:w-2/3">
          {cardCustom(t.about.services.branding, LampIcon)}
          {cardCustom(t.about.services.website, MechIcon)}
          {cardCustom(t.about.services.app, PhoneIcon)}
        </div>
      </main>
    </section>
  );
};

export default SectionAbout;
