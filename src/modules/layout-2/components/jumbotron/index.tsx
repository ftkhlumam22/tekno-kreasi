import React, { useEffect, useRef } from "react";
import {
  JumbotronBanner,
  FrameJumbotronBanner,
  MobileJumbotronBanner,
} from "@/config/Images";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";

const Jumbotron = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

  return (
    <section
      ref={ref}
      className="grid md:grid-cols-2 grid-cols-1 relative min-h-screen overflow-hidden max-w-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute top-0 right-0 z-10 w-full h-full opacity-30 md:opacity-100 pointer-events-none"
      >
        <Image
          src={FrameJumbotronBanner}
          alt="frame"
          className="absolute top-0 right-0 z-10 md:block hidden"
          priority
        />
      </motion.div>

      {/* Konten sebelah kiri */}
      <motion.div
        style={{ y: textY }}
        className="md:pt-28 pt-32 flex-col md:order-1 order-2 flex justify-center md:pl-6 lg:pl-10 xl:pl-16 z-20"
      >
        <div className="md:w-full w-full px-6 md:px-0 md:pr-4 lg:pr-8">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-black md:text-[3.8rem] lg:text-[4.4rem] text-[2.8rem] leading-[1.05] mb-9"
          >
            <span className="font-bold">{t.jumbotron.title.part1}</span>{" "}
            {t.jumbotron.title.part2} <br />
            {t.jumbotron.title.part3} <br />{" "}
            <span className="font-bold italic">{t.jumbotron.title.part4} </span>{" "}
            <br />
            <span className="font-bold"> {t.jumbotron.title.part5}</span>{" "}
            {t.jumbotron.title.part6}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="font-normal mb-9 text-lg text-[#595959]"
          >
            {t.jumbotron.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <Link
              href="https://api.whatsapp.com/send/?phone=%2B6289505124994&text=Halo+permisi+saya+ingin+tanya"
              target="_blank"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="md:w-40 w-full h-10"
              >
                {t.jumbotron.button}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Gambar sebelah kanan */}
      <motion.div
        style={{ y: backgroundY }}
        className="flex justify-end relative md:order-2 order-1 h-full overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="w-full h-full relative"
        >
          <Image
            src={JumbotronBanner}
            alt="Tekno Kreasi"
            className="object-cover md:block hidden w-full h-screen object-right-top"
            priority
          />
          <Image
            src={MobileJumbotronBanner}
            alt="Tekno Kreasi"
            className="object-cover md:hidden block w-full h-[40vh]"
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Jumbotron;
