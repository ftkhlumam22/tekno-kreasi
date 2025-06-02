import React from "react";
import {
  JumbotronBanner,
  FrameJumbotronBanner,
  MobileJumbotronBanner,
} from "@/config/Images";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const Jumbotron = () => {
  const { t } = useLanguage();

  return (
    <section className="grid md:grid-cols-2 grid-cols-1 relative">
      <Image
        src={FrameJumbotronBanner}
        alt="frame"
        className="absolute top-0 right-0 z-10 md:block hidden"
      />
      <div className="md:pt-28 pt-10 flex-col md:order-1 order-2 flex justify-center items-end">
        <div className="md:w-3/4 w-full md:pl-3 px-6 ">
          <h1 className="text-black md:text-[4.4rem] text-[2.8rem] leading-[1.05] mb-9">
            <span className="font-bold">{t.jumbotron.title.part1}</span>{" "}
            {t.jumbotron.title.part2} <br />
            {t.jumbotron.title.part3} <br />{" "}
            <span className="font-bold italic">{t.jumbotron.title.part4} </span>{" "}
            <br />
            <span className="font-bold"> {t.jumbotron.title.part5}</span>{" "}
            {t.jumbotron.title.part6}
          </h1>
          <p className="font-normal mb-9 text-lg text-[#595959]">
            {t.jumbotron.description}
          </p>
          <Link
            href="https://api.whatsapp.com/send/?phone=%2B6289505124994&text=Halo+permisi+saya+ingin+tanya"
            target="_blank"
          >
            <button className="md:w-40 w-full h-10">
              {t.jumbotron.button}
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-end relative md:order-2 order-1">
        <div>
          <Image
            src={JumbotronBanner}
            alt="Tekno Kreasi"
            className="object-cover md:block hidden"
          />
          <Image
            src={MobileJumbotronBanner}
            alt="Tekno Kreasi"
            className="object-cover md:hidden block"
          />
        </div>
      </div>
    </section>
  );
};

export default Jumbotron;
