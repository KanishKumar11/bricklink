"use client";
import Navbar from "@/components/Navbar";
import TitleBtn from "@/components/TitleBtn";
import connectDb from "@/lib/connectDb";
import { useUser } from "@clerk/nextjs";
import { useDebounce } from "@uidotdev/usehooks";
import { Link2, PencilRuler } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, ChangeEvent } from "react";
import { createUser, checkUsername } from "./actions";
import { PulseLoader } from "react-spinners";

const Page = () => {
  const router = useRouter();
  const { user } = useUser();
  const [username, setUsername] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
    null
  );
  const debouncedSearch = useDebounce(username, 500);

  useEffect(() => {
    if (user?.username) {
      router.push("/error");
    }
    if (user?.firstName) {
      setUsername(user.firstName);
    }
  }, [user, router]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setUsernameAvailable(null); // Reset availability status on input change
  };

  useEffect(() => {
    setIsSearching(true);
    const checkUser = async () => {
      if (debouncedSearch.length > 2) {
        await connectDb();
        try {
          const existingUser = await checkUsername({
            username: debouncedSearch,
          });
          if (existingUser) {
            setUsernameAvailable(false);
          } else {
            setUsernameAvailable(true);
          }
        } catch (error) {
          console.error("Error checking username:", error);
        } finally {
          setIsSearching(false);
        }
      }
    };
    checkUser();
  }, [debouncedSearch]);

  const handleSubmit = async () => {
    if (usernameAvailable) {
      try {
        await createUser({
          username: username.toLowerCase(),
          user: {
            email: user?.emailAddresses[0].emailAddress,
            name: user?.fullName,
            avatar: user?.imageUrl,
            userId: user?.id,
          },
        });

        router.push("/");
      } catch (error) {
        console.error("Error creating user:", error);
      }
    }
  };

  return (
    <div className="w-full bg-[url('/images/5.svg')] min-h-screen bg-no-repeat bg-cover bg-center pb-10 ">
      <Navbar />
      <div className="max-w-5xl bg-[#F6F6F6]/[24%] mx-auto backdrop-blur-2xl flex flex-col items-center">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-2 my-[50px] p-[24px]">
          <h1 className="euclid text-3xl md:text-4xl text-[#050401]">
            Get your Link, Your keys of your home:)
          </h1>
          <p className="text-base text-[#637381] ">Claim your URL now </p>
        </div>
        <div className="flex bg-[#F4F6F8] px-6 rounded-lg items-center gap-1">
          <input
            className="bg-transparent outline-none"
            onChange={handleChange}
            value={username}
            placeholder="cap.com/"
          />
          <div
            onClick={handleSubmit}
            className="cursor-pointer bg-[#141300] my-4 text-[#F0E100] px-7 py-3 rounded-[12px] hover:scale-105 hover:shadow-lg transition-transform ease-in-out block md:hidden"
          >
            create
          </div>
          <div
            onClick={handleSubmit}
            className="cursor-pointer bg-[#141300] my-4 text-[#F0E100] px-7 py-3 rounded-[12px] hover:scale-105 hover:shadow-lg transition-transform ease-in-out hidden md:block"
          >
            create you&#39;re link
          </div>
        </div>
        {isSearching && (
          <div className="flex items-center justify-center mt-4">
            <PulseLoader color="#000" />
          </div>
        )}
        {!isSearching && usernameAvailable !== null && (
          <p
            className={`mt-4 ${
              usernameAvailable ? "text-green-500" : "text-red-500"
            }`}
          >
            {usernameAvailable
              ? "Username is available!"
              : "Opps ! This URL is already taken, try again. ."}
          </p>
        )}
        <div className="bg-[#f0f0f0] max-w-[638px] w-auto px-10 rounded-[16px] mx-auto flex flex-col items-center gap-5 py-10 my-10">
          <div className="h-16 w-16 bg-[#D9D9D9] rounded-[16px]"></div>
          <h2 className="euclid text-3xl text-[#050401]">
            {usernameAvailable ? debouncedSearch : "TRY AGAIN !"}
          </h2>
          <p className="text-[#637381] text-base">
            This is how you&#39;re page will appear{" "}
          </p>
          <div className="bg-[#011527] text-[#74B8FB] px-7 py-3 rounded-[16px]">
            Hello world
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
