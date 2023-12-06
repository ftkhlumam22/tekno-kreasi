import Image from "next/image";
import React from "react";
import { LogoTeknoBlack } from "@/config/Images";

const index = () => {
  return (
    <div className="w-full  py-12 flex justify-center items-center relative">
      <div className="flex-col justify-start items-center md:w-[65%] w-3/4">
        <div className="mb-5 pl-0 ml-0">
          <Image
            src={LogoTeknoBlack}
            alt="Logo-Skillup"
            className="object-cover pl-0 -ml-2"
          />
        </div>
        <div className="flex md:flex-row flex-col justify-evenly">
          <div className="md:w-[30%] w-full text-black md:mb-0 mb-7">
            <h2 className="text-xl text-black font-bold mb-4">Kantor Pusat</h2>
            <p className="mb-4 text-black font-light text-[17px] leading-tight">
            Jl. Taman Evakuasi Indah No.14, Sunyaragi, Kec. Kesambi, Kota Cirebon, Jawa Barat 45132, Indonesia
            </p>
            <p className="font-light text-black text-[17px] leading-[1.35]">Office. 0818-240-707 <br /> Email. it.teknokreasi@gmail.com</p>
          </div>
          <div className="flex-[2] md:pl-10 pl-0 text-black">
            <h2 className="text-xl font-bold mb-4">Informasi</h2>
            <ul className="font-light text-[17px] leading-tight">
              <li>FAQ</li>
              <li>Hubungi Kami</li>
              <li>Syarat & Ketentuan</li>
              <li>Kebijakan Privasi</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
