import {
  CodeIcon,
  MarketIcon,
  FrameJumbotronBanner,
  UserResearchIcon,
  WebinarIcon,
} from "@/config/Images";
import Image from "next/image";
import React from "react";
import Services from "./Services";
import { useLanguage } from "@/context/LanguageContext";

const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useLanguage();

  // Map the images to service items
  const images = [CodeIcon, MarketIcon, WebinarIcon, UserResearchIcon];

  const servicesDatas = t.services.items.map((item, idx) => {
    return {
      title: item.title,
      desc: item.desc,
      list: item.list || [],
      img: images[idx],
    };
  });

  return (
    <section className="bg-[#28A16B] pt-7 md:pb-7 pb-0 relative" id="services">
      <Image
        src={FrameJumbotronBanner}
        alt="skillup-frame"
        className="absolute right-0 top-0 md:block hidden"
      />
      <div className="md:w-4/5 mx-auto ">
        <div className="flex gap-x-3 md:mb-2 mb-4 px-7">
          <h1 className="md:text-2xl text-xl text-white">
            {t.services.subtitle}
          </h1>
          <div className="md:w-20 w-7 h-[0.10rem] bg-white self-end mb-1" />
        </div>
        <div className="text-white md:text-[3rem] px-7 tracking-wide text-[2.2rem] md:leading-[1.05] leading-[1.10] mb-10 ">
          {t.services.title.part1}
          <span className="font-bold"> {t.services.title.part2} </span> <br />
          {t.services.title.part3}
          <span className="font-bold"> {t.services.title.part4} </span> <br />
          {t.services.title.part5}
          <span className="font-bold"> </span>
        </div>

        {servicesDatas.map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              <Services
                title={item.title}
                desc={item.desc}
                img={item.img}
                list={item.list}
                idx={idx}
              />
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default index;
