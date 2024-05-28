"use client";
import Navbar from "@/components/Navbar";
import Landing from "@/components/pages/Landing";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const { user } = useUser();
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  console.log(user);
  console.log(user?.username);
  // if (isLoaded && user?.username === null) router.push("/username");
  // if (isLoaded && !isSignedIn) router.push("/sign-in");
  return (
    <div className="w-full bg-[url('/images/5.svg')] h-screen bg-no-repeat bg-cover bg-center">
      <Navbar />
      <Landing />
    </div>
  );
};

export default Page;
