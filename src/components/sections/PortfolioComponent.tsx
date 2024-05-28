"use client";
import React from "react";
import { IPortfolio } from "@/interfaces";
import Image from "next/image";

const PortfolioComponent: React.FC<IPortfolio> = ({
  title,
  description,
  images,
  subHeading,
  cta,
  link,
}) => (
  <div className="text-[#001122] flex gap-5 items-center text-center justify-center flex-col p-5">
    <div>
      {" "}
      <h2 className="euclid text-xl font-medium">{title}</h2>
      <p className="text-xs">{subHeading}</p>
    </div>
    <div className="flex flex-row -mb-12">
      {" "}
      {images.map((image, index) => (
        <Image
          width="400"
          height="400"
          key={index}
          src={image}
          alt={`Portfolio ${index}`}
          className={`${
            index == 0
              ? "-rotate-6 h-[305px] w-[380px]"
              : "rotate-6 h-[220px] self-end w-[320px] -ml-20"
          } w-[186px] h-[180px] drop-shadow-lg`}
        />
      ))}
    </div>
    {/* <h3>{subHeading}</h3> */}
    <button className="bg-black text-white rounded-xl px-5 py-2 relative z-10">
      {cta}
    </button>
  </div>
);

export default PortfolioComponent;
