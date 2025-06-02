import Link from "next/link";
import React, { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useInView } from "framer-motion";

const SectionCallToAction = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="h-96 relative bg-left bg-cta bg-no-repeat md:mt-0 mt-24 overflow-hidden rounded-lg mx-4 md:mx-8 lg:mx-12"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
        }
        transition={{ duration: 0.7 }}
        className="absolute inset-0 bg-gradient-to-r from-blue-700/40 to-green-600/80 z-0"
      />

      <div className="mx-auto w-3/4 flex justify-center flex-col items-center h-full z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white md:text-[3rem] text-[2.2rem] text-center md:leading-[1.05] leading-[1.10] mb-10"
        >
          {t.cta.title.part1}{" "}
          <span className="font-bold">{t.cta.title.part2}</span>{" "}
          {t.cta.title.part3} <br />{" "}
          <span className="font-bold">{t.cta.title.part4} </span>
          {t.cta.title.part5}{" "}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="https://api.whatsapp.com/send/?phone=%2B6289505124994&text=Halo+permisi+saya+ingin+tanya"
            target="_blank"
            className="inline-block"
          >
            <button className="w-44 h-11 shadow-lg hover:shadow-xl transition-all duration-300">
              {t.cta.button}
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionCallToAction;
