import Image from "next/image";
import React, { useRef } from "react";
import cx from "classnames";
import { motion, useInView } from "framer-motion";

interface Props {
  img: any;
  title: string;
  desc: string;
  list: Array<string>;
  idx: number;
}

const Services: React.FC<Props> = ({ img, title, desc, list, idx }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Handle titles that may not have space for split function
  const titleParts = title.split(" ");
  const firstPart = titleParts.length > 1 ? titleParts[0] : "";
  const secondPart =
    titleParts.length > 1 ? titleParts.slice(1).join(" ") : title;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: idx * 0.2 }}
      className={cx(
        "flex md:flex-row flex-col md:px-14 px-7 py-5 mb-12 rounded-3xl transition-all",
        idx % 2 === 1 ? "bg-[#397751]" : "",
        list.length === 0 && "items-center"
      )}
    >
      {idx % 2 === 0 ? (
        <>
          <motion.div
            className="flex-1 md:mb-0 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image src={img} alt={title} />
          </motion.div>
          <div className="flex-1">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl mb-5"
            >
              {firstPart} <span className="font-bold">{secondPart}</span>{" "}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl mb-3"
            >
              {desc}
            </motion.p>
            {list.length > 0 && (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="list-disc text-white marker:text-[#ED893E] marker:text-2xl text-xl pl-5"
              >
                {list.map((item, idx) => {
                  return (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                      }
                      transition={{ duration: 0.3, delay: 0.4 + idx * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      {item}
                    </motion.li>
                  );
                })}
              </motion.ul>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 md:order-1 order-2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl mb-5"
            >
              {firstPart} <span className="font-bold">{secondPart}</span>{" "}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl mb-3"
            >
              {desc}
            </motion.p>
            {list.length > 0 && (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="list-disc text-white marker:text-[#ED893E] marker:text-2xl text-xl pl-5"
              >
                {list.map((item, idx) => {
                  return (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                      }
                      transition={{ duration: 0.3, delay: 0.4 + idx * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      {item}
                    </motion.li>
                  );
                })}
              </motion.ul>
            )}
          </div>
          <motion.div
            className="flex-1 flex justify-center md:order-2 order-1 md:mb-0 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image src={img} alt={title} />
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default Services;
