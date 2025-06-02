import Link from "next/link";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const SectionCallToAction = () => {
  const { t } = useLanguage();

  return (
    <section className="h-96 relative bg-left bg-cta bg-no-repeat md:mt-0 mt-24">
      <div className="mx-auto w-3/4 flex justify-center flex-col items-center h-full z-10">
        <div className="text-white md:text-[3rem] text-[2.2rem] text-center md:leading-[1.05] leading-[1.10] mb-10">
          {t.cta.title.part1}{" "}
          <span className="font-bold">{t.cta.title.part2}</span>{" "}
          {t.cta.title.part3} <br />{" "}
          <span className="font-bold">{t.cta.title.part4} </span>
          {t.cta.title.part5}{" "}
        </div>
        <Link
          href="https://api.whatsapp.com/send/?phone=%2B6289505124994&text=Halo+permisi+saya+ingin+tanya"
          target="_blank"
        >
          <button className="w-44 h-11">{t.cta.button}</button>
        </Link>
      </div>
    </section>
  );
};

export default SectionCallToAction;
