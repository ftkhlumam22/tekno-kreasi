import { CodeIcon, MarketIcon, FrameJumbotronBanner ,UserResearchIcon, WebinarIcon } from "@/config/Images";
import Image from "next/image";
import React from "react";
import Services from "./Services";

const index = () => {
  const servicesDatas = [
    {
      title: "Tekno Solution",
      desc: "Teknologi menjadi salah satu solusi untuk mengembangkan bisnis, menjangkau audiens lebih luas dan mengelola bisnis dengan lebih efisien. Pengembangan platform digital seperti software, website dan aplikasi dapat menunjang kebutuhan bisnis.",
      list: [
        "Pembuatan dan pengembangan aplikasi",
        "Pembuatan dan pengembangan website",
        "Konsultasi teknologi",
      ],
      img: CodeIcon,
    },
    {
      title: "Tekno Digital Marketing",
      desc: "Digital marketing memungkinkan Anda untuk membangun hubungan yang lebih erat dengan pelanggan Anda melalui media sosial, email marketing, dan konten yang menarik. Ini dapat meningkatkan loyalitas pelanggan dan membantu Anda mempertahankan pangsa pasar Anda.",
      list: [
        "Pembuatan logo produk dan perusahaan",
        "Perancangan branding produk",
        "Pengelolaan konten media sosial",
      ],
      img: MarketIcon,
    },
    {
      title: "Tekno Academy",
      desc: "Adalah sebuah program pelatihan kepada calon-calon talenta di luar sana, difasilitasi oleh mentor-mentor yang berpengalaman di bidangnya. Kami percaya bahwa setiap orang memiliki hak untuk tumbuh dan berkembang, lebih khusus lagi memiliki keterampilan yang dibutuhkan di industri pada saat ini.",
      list: [
        "Pelatihan web developer",
        "Pelatihan desain grafis",
        "Pelatihan digital marketing",
      ],
      img: WebinarIcon,
    },
    {
      title: "Tekno Talent",
      desc: "Layanan yang cocok bagi anda yang membutuhkan talenta-talenta di bidang yang anda butuhkan dalam bisnis anda. Kami menawarkan talenta yang terampil dalam bidangnya dan memudahkan anda dalam merekrut tim untuk bisnis anda.",
      img: UserResearchIcon,
    },
  ];
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
            Layanan yang  <span className="font-bold">Kami Tawarkan </span>
          </h1>
          <div className="md:w-20 w-7 h-[0.10rem] bg-white self-end mb-1" />
          
        </div>
        <div className="text-white md:text-[3rem] px-7 tracking-wide text-[2.2rem] md:leading-[1.05] leading-[1.10] mb-10 ">
          Pilihan
          <span className="font-bold"> Layanan </span> <br /> untuk
          <span className="font-bold"> Bisnis </span> <br /> yang
          <span className="font-bold"> Mapan </span>
        </div>

        {/* Skillup Solution */}
        {servicesDatas.map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              <Services
                title={item.title}
                desc={item.desc}
                img={item.img}
                list={item.list ?? []}
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
