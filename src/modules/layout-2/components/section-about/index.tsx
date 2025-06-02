import React, { useRef } from "react";
import Image from "next/image";
import {
  ImageSectionAbout,
  MobileImageSectionAbout,
  LampIcon,
  MechIcon,
  PhoneIcon,
} from "@/config/Images";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useInView } from "framer-motion";

const SectionAbout = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const cardCustom = (title: string, img: any) => {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex gap-x-4 mb-3 items-center group hover:bg-gray-50 p-2 rounded-lg transition-all"
      >
        <motion.div
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ type: "spring" }}
        >
          <Image src={img} alt={title} width={30} height={30} />
        </motion.div>
        <p className="text-black text-lg group-hover:text-[#ED893E] transition-colors">
          {title}
        </p>
      </motion.div>
    );
  };

  return (
    <section
      ref={ref}
      className="flex md:flex-row flex-col md:pt-20 pt-10 md:px-0 px-6 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
        transition={{ duration: 0.7 }}
        className="md:flex-1 flex md:justify-end justify-center md:pr-20 pt-8"
      >
        <Image
          src={ImageSectionAbout}
          alt="Why Tekno Kreasi"
          className="object-cover md:block hidden hover:scale-105 transition-transform duration-700"
        />
        <Image
          src={MobileImageSectionAbout}
          alt="Why Tekno Kreasi"
          className="w-96 block md:hidden"
        />
      </motion.div>

      <motion.main
        className="md:flex-1 md:mt-0 mt-12"
        initial={{ opacity: 0, x: 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex gap-x-3 md:mb-0 mb-4">
          <motion.h2
            initial={{ opacity: 0, width: 0 }}
            animate={
              isInView
                ? { opacity: 1, width: "auto" }
                : { opacity: 0, width: 0 }
            }
            transition={{ duration: 0.5 }}
            className="relative text-xl text-[#e38421] overflow-hidden whitespace-nowrap"
          >
            {t.about.subtitle}
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "5rem" } : { width: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-[0.10rem] bg-[#e38421] self-end mb-1"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-black md:text-[3rem] tracking-wide text-[2.2rem] md:leading-[1.05] leading-[1.10] mb-9"
        >
          <span className="font-bold">{t.about.title.part1}</span> <br />
          {t.about.title.part2}{" "}
          <span className="font-bold">{t.about.title.part3}</span> <br />
          <span className="font-bold">{t.about.title.part4}</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-normal text-[#595959] mb-9 text-lg md:w-2/3 w-full tracking-wide"
        >
          {t.about.paragraph1}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="font-normal text-[#595959] mb-9 text-lg md:w-2/3 tracking-wide"
        >
          {t.about.paragraph2}
        </motion.p>

        <motion.div
          className="md:w-2/3"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {cardCustom(t.about.services.branding, LampIcon)}
          {cardCustom(t.about.services.website, MechIcon)}
          {cardCustom(t.about.services.app, PhoneIcon)}
        </motion.div>
      </motion.main>
    </section>
  );
};

export default SectionAbout;
