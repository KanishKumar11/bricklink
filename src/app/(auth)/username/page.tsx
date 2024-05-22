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
      if (debouncedSearch) {
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
    <div className="flex items-center justify-center flex-col w-auto max-w-7xl gap-7 mx-auto">
      <Navbar />
      <TitleBtn>
        <PencilRuler />
        Get your Link
      </TitleBtn>
      <h2 className="euclid text-[56px] text-center max-w-5xl leading-tight">
        Get your Link, Your keys of your home:)
      </h2>
      <p className="text-lg text-[#637381]">Claim your URL now</p>
      <div className="flex bg-[#F4F6F8] px-6 py-2 rounded-lg items-center gap-1">
        <div className="bg-white p-1 items-center justify-center flex rounded-md h-8">
          <Link2 />
        </div>
        <input
          className="bg-transparent outline-none"
          onChange={handleChange}
          value={username}
        />
        <button
          onClick={handleSubmit}
          className="text-white bg-gradient-to-r from-[#1300ee] to-[#0b0088] px-16 rounded-xl py-3"
        >
          Next
        </button>
      </div>
      {isSearching && (
        <div className="flex items-center justify-center mt-4">
          <PulseLoader color="#0b0088" />
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
      <Image src="/images/1.svg" alt="Illustration" width={1200} height={500} />
    </div>
  );
};

export default Page;
