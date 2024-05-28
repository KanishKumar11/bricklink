import Link from "next/link";
import React from "react";

const Landing = () => {
  return (
    <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-2 my-[50px] p-[24px]">
      <h1 className="euclid text-3xl md:text-4xl text-[#050401]">
        From Links to Portfolio, All in One Place
      </h1>
      <p className="text-base text-[#637381] ">
        An link in bio tool for freelancers, creators, dreamers.
      </p>
      <Link href="#">
        <div className="bg-[#141300] my-4 text-[#F0E100] px-7 py-3 rounded-[12px] hover:scale-105 hover:shadow-lg transition-transform ease-in-out">
          Get early access
        </div>
      </Link>
    </div>
  );
};

export default Landing;
