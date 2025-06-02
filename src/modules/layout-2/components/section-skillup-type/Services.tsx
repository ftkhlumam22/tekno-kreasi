import Image from "next/image";
import React from "react";
import cx from "classnames";

interface Props {
  img: any;
  title: string;
  desc: string;
  list: Array<string>;
  idx: number;
}

const Services: React.FC<Props> = ({ img, title, desc, list, idx }) => {
  // Handle titles that may not have space for split function
  const titleParts = title.split(" ");
  const firstPart = titleParts.length > 1 ? titleParts[0] : "";
  const secondPart =
    titleParts.length > 1 ? titleParts.slice(1).join(" ") : title;

  return (
    <div
      className={cx(
        "flex md:flex-row flex-col md:px-14 px-7 py-5 mb-12",
        idx % 2 === 1 ? "bg-[#397751] md:rounded-3xl rounded-none" : "",
        list.length === 0 && "items-center"
      )}
    >
      {idx % 2 === 0 ? (
        <>
          <div className="flex-1 md:mb-0 mb-6">
            <Image src={img} alt={title} />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl mb-5">
              {firstPart} <span className="font-bold">{secondPart}</span>{" "}
            </h2>
            <p className="text-xl mb-3">{desc}</p>
            <ul className="list-disc text-white marker:text-[#ED893E] marker:text-2xl text-xl pl-5">
              {list.map((item, idx) => {
                return <li key={idx}>{item}</li>;
              })}
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 md:order-1 order-2">
            <h2 className="text-3xl mb-5">
              {firstPart} <span className="font-bold">{secondPart}</span>{" "}
            </h2>
            <p className="text-xl mb-3">{desc}</p>
            <ul className="list-disc text-white marker:text-[#ED893E] marker:text-2xl text-xl pl-5">
              {list.map((item, idx) => {
                return <li key={idx}>{item}</li>;
              })}
            </ul>
          </div>
          <div className="flex-1 flex justify-center md:order-2 order-1 md:mb-0 mb-6">
            <Image src={img} alt={title} />
          </div>
        </>
      )}
    </div>
  );
};

export default Services;
