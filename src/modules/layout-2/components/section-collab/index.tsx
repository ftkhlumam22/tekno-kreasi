import {
  ImageCollab1,
  ImageCollab2,
  ImageCollab3,
  ImageCollab4,
  ImageCollabVertical1,
  ImageCollabVertical2,
} from "@/config/Images";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const SectionCollab = () => {
  const { t } = useLanguage();
  const [numIndex, setNumIndex] = useState(0);
  const imageArr_1 = [ImageCollab1, ImageCollab2];
  const imageArr_2 = [ImageCollab3, ImageCollab4];
  const imageArr_3 = [ImageCollabVertical1, ImageCollabVertical2];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (numIndex === 0) {
        setNumIndex(1);
      } else {
        setNumIndex(0);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [numIndex]);

  return (
    <section className="py-10 pb-28 relative" id="portfolio">
      <div className="mx-auto w-3/4">
        <div className="flex gap-x-3 md:mb-2 mb-4 ">
          <h1 className="relative text-xl text-[#e38421]">
            {t.portfolio.subtitle}
          </h1>
          <div className="md:w-20 w-10 h-[0.10rem] bg-[#e38421] self-end mb-1" />
        </div>
        <div className="text-black md:text-[3rem] tracking-wide text-[2.2rem] md:leading-[1.05] leading-[1.10] md:mb-20 mb-6 ">
          <span className="font-bold">{t.portfolio.title.part1}</span>{" "}
          {t.portfolio.title.part2} <br />
          {t.portfolio.title.part3}{" "}
          <span className="font-bold">{t.portfolio.title.part4}</span>{" "}
        </div>

        <main className="flex md:flex-row flex-col items-center h-[52rem] gap-x-7">
          <div className="flex flex-col gap-8 md:order-1 order-2">
            <Image
              src={imageArr_1[numIndex]}
              alt="Portfolio image 1"
              className="rounded-2xl transition-all"
            />
            <Image
              src={imageArr_2[numIndex]}
              alt="Portfolio image 2"
              className="rounded-2xl transition-all"
            />
          </div>
          <div className="md:mb-0 mb-8 order-1 md:order-2">
            <Image
              src={imageArr_3[numIndex]}
              alt="Portfolio image 3"
              className="rounded-2xl transition-all"
            />
          </div>
        </main>
      </div>
    </section>
  );
};

export default SectionCollab;
