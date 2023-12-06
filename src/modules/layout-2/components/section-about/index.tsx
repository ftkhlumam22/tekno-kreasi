import { ImageSectionAbout, LampIcon, MechIcon, MobileImageSectionAbout, PhoneIcon } from "@/config/Images";
import Image from "next/image";
import React from "react";

const index = () => {
  const cardCustom = (title:string, srcImage:any) => (
    <div
      className="w-full h-24 rounded-xl flex items-center justify-center gap-x-3 mb-6"
      style={{
        background:
          "radial-gradient(90.18% 407.7% at 0% -5.83%, #F6A652 0%, #E38421 100%), #D9D9D9",
      }}
    >
      <Image src={srcImage} alt="Skillup Icon" />
      <div className="font-bold text-white md:text-3xl text-2xl">
        {title.split(' ')[0]}
        <span className="font-normal ml-1">{title.split(' ')[1]}</span>
      </div>
    </div>
  );
  return (
    <section className="flex md:flex-row flex-col md:pt-20 pt-10 md:px-0 px-6">
      <div className="md:flex-1 flex md:justify-end justify-center md:pr-20 pt-8">
        <Image
          src={ImageSectionAbout}
          alt="Why Skillup"
          className="object-cover md:block hidden"
        />
        <Image
          src={MobileImageSectionAbout}
          alt="Why Skillup"
          className="w-96 block md:hidden"
        />
      </div>
      <main className="md:flex-1 md:mt-0 mt-12">
        <div className="flex gap-x-3 md:mb-0 mb-4">
          <h1 className="relative text-xl text-[#e38421]">
            Siapa <span className="font-bold">Sebenarnya Kami</span>
          </h1>
          <div className="md:w-20 w-10 h-[0.10rem] bg-[#e38421] self-end mb-1" />
        </div>
        <div className="text-black md:text-[3rem] tracking-wide text-[2.2rem] md:leading-[1.05] leading-[1.10] mb-9 ">
          <span className="font-bold">Layanan Terbaik</span> <br /> untuk{" "}
          <span className="font-bold ">Bisnis </span> yang <br />
          <span className="font-bold"> Lebih Baik</span>
        </div>
        <p className="font-normal text-[#595959] mb-9 text-lg md:w-2/3 w-full tracking-wide">
          Menjadi yang terbaik diantara yang lain adalah cita-cita yang selalu
          dimiliki setiap orang, begitu juga dengan pemilik usaha. Bisnis yang
          telah dibangun harus terus berkembang ke arah yang lebih baik.
        </p>
        <p className="font-normal text-[#595959] mb-9 text-lg md:w-2/3 tracking-wide">
          Kami berkomitmen membersamai pengembangan bisnis anda dengan layanan
          yang kami miliki untuk mewujudkan solusi tepat untuk bisnis anda.
        </p>
        <div className="md:w-2/3">
          {cardCustom("Branding Produk", LampIcon)}
          {cardCustom("Rancang Website", MechIcon)}
          {cardCustom("Custom Aplikasi", PhoneIcon)}
        </div>
      </main>
    </section>
  );
};

export default index;
