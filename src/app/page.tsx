"use client";
import Navbar from "@/components/Navbar";
import Home from "@/components/pages/Home";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { user } = useUser();
  const router = useRouter();
  console.log(user);
  console.log(user?.username);
  useEffect(() => {
    if (user?.username === null) router.push("/username");
  });
  return (
    <div className="w-full">
      <Navbar />
      <Home />
    </div>
  );
};

export default Page;
