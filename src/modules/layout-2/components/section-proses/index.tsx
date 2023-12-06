import React from "react";
import Card from "./Card";
import { AskIcon, LampBrokenIcon, WritingIcon } from "@/config/Images";

const index = () => {
  const cardDatas = [
    {
      title: ["Diskusi", "Masalah"],
      desc: "Memahami keinginan mitra, menawarkan solusi, mewujudkan tujuan.",
      img: AskIcon,
    },
    {
      title: ["Olah Ide", "Solusi"],
      desc: "Menjabarkan tujuan, merancang inovasi untuk tahap produksi.",
      img: LampBrokenIcon,
    },
    {
      title: ["Eksekusi", "Produksi"],
      desc: "Menyerahkan draft rancangan, merevisi minor atau mayor.",
      img: WritingIcon,
    },
  ];

  return (
    <section className="mt-20 w-full px-3 mb-6">
      <div className="md:w-3/4 md:mx-auto">
        <div className="flex gap-x-3 md:mb-2 mb-4 ">
          <h1 className="relative text-xl text-[#e38421]">
            Proses yang <span className="font-bold">Kami Lakukan</span>
          </h1>
          <div className="md:w-20 w-10 h-[0.10rem] bg-[#e38421] self-end mb-1" />
        </div>
        <div className="text-black md:text-[3rem] tracking-wide text-[2.2rem] md:leading-[1.05] leading-[1.10] mb-9 ">
          <span className="font-bold">Proses Tepat</span> Hasilkan <br />{" "}
          <span className="font-bold">Target</span> yang{" "}
          <span className="font-bold">Akurat</span>
        </div>
        <div className="overflow-hidden w-full ">
          <div className="flex p-3 md:gap-x-3 gap-x-8 md:justify-around overflow-x-scroll scrollbar">
            {cardDatas.map((item, idx) => {
              return (
                <React.Fragment key={idx}>
                  <Card
                    title={item.title}
                    img={item.img}
                    order={idx + 1}
                    desc={item.desc}
                  />
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;
