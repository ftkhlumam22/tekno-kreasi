import React from "react";
import Image from "next/image";

interface CardProps {
  order: number;
  img: any;
  title: Array<string>;
  desc: string;
}

const Card: React.FC<CardProps>= ({ order, img, title, desc }) => {
  return (
    <div className="bg-[#FAFAFA] h-[28rem] md:w-80 min-w-[20rem] drop-shadow-lg shadow-neutral-600 rounded-2xl relative overflow-hidden box-border">
      <header className=" pl-10 after:h-60 after:w-60 after:bg-[#e38421] after:absolute after:-left-32 after:-top-32 after:rotate-45 after:z-10">
        <h1 className="text-[3.6rem] font-bold text-white stroke-white z-20 absolute left-8 top-1">
          {order}
        </h1>
      </header>
      <main className="flex items-end h-full pl-8">
        <div>
          <Image src={img} alt="Skillup" />
          <div className="text-4xl mt-2 mb-4">
            <span className="font-bold">{title[0]}</span> <br /> {title[1]}
          </div>
          <p className="font-normal mb-9 text-lg w-full tracking-wide leading-tight text-black">
            {desc}
          </p>
        </div>
      </main>
    </div>
  );
};

export default Card;
