import React from "react";
import Logo from "./Logo";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="py-4 md:px-20 px-5 flex items-center justify-between flex-row w-full max-w-7xl mx-auto">
      <Logo />
      <div className="flex flex-row gap-[32px]">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <div className="bg-[#DFE3E8] cursor-pointer hover:shadow-2xl py-2 px-10 text-[#050401] rounded-[12px]">
            <SignInButton />
          </div>
          <Link href="/sign-up" className="md:block hidden">
            <div className="bg-[#050401] text-[#F0E100] hover:shadow-2xl px-5 py-2 rounded-[12px]">
              create account free
            </div>
          </Link>
        </SignedOut>
      </div>
    </div>
  );
};

export default Navbar;
