"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { findUser } from "./actions";
import { useUser } from "@clerk/nextjs";
import { ImageIcon, Link, Link2, Plus } from "lucide-react";
import { IoMdColorPalette } from "react-icons/io";
import { BiSolidPencil } from "react-icons/bi";
import { RiUploadLine } from "react-icons/ri";
import Image from "next/image";
import { User } from "@/models/user.model";
import Error from "next/error";
const links = [
  {
    name: "Instagram",
    icon: "/images/2.svg",
    color: "#D62976",
    placeholder: "Add you're insta link",
    link: "",
  },
];
const images = ["/images/4.png"];
const Page = () => {
  const { username } = useParams();
  const [user, setUser] = useState<any>({
    found: true,
    username: "",
    email: "",
    name: "",
    avatar: "s",
  });
  useEffect(() => {
    const checkUser = async () => {
      const existingUser = await findUser({ username });
      console.log(existingUser);
      setUser(existingUser);
    };
    checkUser();
  }, [username]);

  const [linksData, setLinksData] = useState(links);
  const [imagesData, setImagesData] = useState(images);
  const handleNewLink = () => {
    setLinksData([
      ...linksData,
      {
        name: "Title",
        icon: "/images/3.svg",
        color: "#000",
        placeholder: "Add link URL",
        link: "",
      },
    ]);
  };
  const handleNewImage = () => {
    setImagesData([...imagesData, "/images/4.png"]);
  };
  if (!user.found) {
    return <Error statusCode={404} />;
  }
  return (
    <div className="max-w-7xl min-w-[1200px] mx-auto flex flex-col items-center justify-center">
      <div className="bg-[#F4F6F8] p-2 px-[100px] flex w-full flex-row items-center justify-between gap-5">
        <div></div>
        <div>
          <div className="flex bg-white px-8 py-2 rounded-xl items-center gap-3">
            <div className="bg-[#f4f6f8] p-1 items-center justify-center flex rounded-md h-8   text-[#0b0088] ">
              <Link2 />
            </div>
            <div className="euclid text-[#637381] text-xl">
              {user?.username}
            </div>
          </div>
        </div>
        <div>
          <button className="bg-[#1300EE] text-xs px-7 py-3 text-white rounded-[16px] font-medium">
            Add CTA Link
          </button>
        </div>
      </div>
      <div className="bg-[#030029] px-[80px] py-[80px] rounded-b-[40px] w-full flex flex-col items-center gap-5">
        <div className="flex items-center gap-5 self-end flex-row">
          <div className="bg-white text-[#030029] flex items-center justify-center h-[48px] w-[48px] rounded-[16px] text-2xl">
            <BiSolidPencil />
          </div>
          <div className="bg-white text-[#030029] flex items-center justify-center h-[48px] w-[48px] rounded-[16px] text-2xl">
            <IoMdColorPalette />
          </div>
        </div>
        <div className="h-[124px] w-[124px] bg-[#F5F3F3] flex flex-col items-center justify-center text-black rounded-xl mx-auto text-wrap text-lg leading-5 text-center gap-3">
          <span className="bg-[#a0a4a8] text-[#F5F3F3] p-2 rounded-md text-xl">
            <RiUploadLine />
          </span>
          upload
          <br /> image
        </div>
        <div className="text-white text-6xl">{user?.name}</div>
        <div className="text-white euclid text-lg">
          <p>You&#39;re Bio(150 words)</p>
        </div>
        <div className="flex flex-row gap-5">
          <div className="bg-white rounded-[24px] px-[32px] text-[#0B0088] text-lg  py-2">
            Add a tag that represents you ( ex: Founder ){" "}
          </div>
          <div className="text-3xl text-black bg-white rounded-xl items-center flex justify-center p-2 ">
            <Plus />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start self-start gap-5 my-10 p-5">
        <div className="text-4xl">Links</div>
        <div className="flex flex-row gap-5">
          {linksData.map((item, index) => (
            <LinkItem key={index} data={item} />
          ))}
          {linksData.length < 3 && (
            <div
              className="border-2 border-dashed p-3 flex flex-col items-center justify-center gap-5 w-[400px] rounded-[16px] px-7 border-[#C4CDD5] cursor-pointer"
              onClick={handleNewLink}
            >
              <div className="bg-gradient-to-r from-[#1300ee] to-[#0b0088] p-2 text-white rounded-md">
                <Link2 />
              </div>
              <div className="text-[32px]">Add Link</div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-start self-start gap-5 my-10 p-5">
        <div className="text-4xl">Add an title</div>
        <div className="flex flex-row gap-5">
          {imagesData.map((item, index) => (
            <div key={index}>
              <Image
                src={item}
                alt=""
                width={400}
                height={300}
                className="w-[400] h-auto"
              />
            </div>
          ))}
          {imagesData.length < 3 && (
            <div
              className="border-2 border-dashed p-3 flex flex-col items-center justify-center gap-5 w-[400px] rounded-[16px] px-7 border-[#C4CDD5] cursor-pointer"
              onClick={handleNewImage}
            >
              <div className="bg-gradient-to-r from-[#1300ee] to-[#0b0088] p-2 text-white rounded-md">
                <ImageIcon />
              </div>
              <div className="text-[32px]">Add Image</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const LinkItem = ({
  data,
}: {
  data: {
    name: string;
    icon: string;
    color: string;
    placeholder: string;
    link: string;
  };
}) => {
  return (
    <div
      className="border-2 border-dashed p-3 flex flex-col gap-5 w-[400px] rounded-[16px] px-7"
      style={{ borderColor: data.color }}
    >
      <Image src={data.icon} alt={data.name} width={96} height={96} />
      <div className="flex flex-col gap-2">
        <div className="text-3xl font-medium">{data.name}</div>
        <input placeholder={data.placeholder} className="outline-none" />{" "}
      </div>
      <button
        className="px-20 text-white py-3 text-xl w-max rounded-xl"
        style={{ backgroundColor: data.color }}
      >
        Add
      </button>
    </div>
  );
};

export default Page;
