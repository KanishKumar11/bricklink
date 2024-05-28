import Navbar from "@/components/Navbar";
import { SignUp } from "@clerk/nextjs";
import React from "react";

const Page = () => {
  return (
    <div className="w-full bg-[url('/images/5.svg')] min-h-screen bg-no-repeat bg-cover bg-center pb-20 ">
      <Navbar />
      <div className="max-w-5xl bg-[#F6F6F6]/[24%] mx-auto backdrop-blur-2xl flex flex-col items-center">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-2 my-[50px] p-[24px]">
          <h1 className="euclid text-3xl md:text-4xl text-[#050401]">
            Welcome home, let the magic begin.
          </h1>
          <p className="text-base text-[#637381] ">sign-up to get started</p>
        </div>
        <SignUp path="/sign-up" forceRedirectUrl={`/username`} />;
      </div>
    </div>
  );
};

export default Page;
