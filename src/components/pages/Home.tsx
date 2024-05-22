"use client";
import { useUser } from "@clerk/nextjs";
import { ImageIcon, Link2, Save } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { IoMdColorPalette } from "react-icons/io";
import { BiSolidPencil } from "react-icons/bi";
import Image from "next/image";
import { fetchLinks, fetchUser, updateUser } from "@/app/actions";
import { toast } from "sonner";
import AvatarUpload from "@/components/sections/AvatarUpload";
import Bio from "@/components/sections/Bio";
import LinkItem from "@/components/sections/LinkItem";
import Tags from "@/components/sections/Tags";
import { z } from "zod";
import { HashLoader } from "react-spinners";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";

const links = [
  {
    name: "Instagram",
    icon: "/images/2.svg",
    brand: "instagram",
    color: "#D62976",
    placeholder: "Add your insta link",
    link: "",
    key: 1,
  },
];

const bioSchema = z
  .string()
  .min(1)
  .max(150 * 5, "Bio must be 150 words or less");

const images = ["/images/4.png"];

const Home = () => {
  const { user } = useUser();
  const [linksData, setLinksData] = useState<any>();
  const [imagesData, setImagesData] = useState<any>();
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [bioError, setBioError] = useState<string | null>(null);
  const [tags, setTags] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (username: string) => {
    try {
      setLoading(true);
      const response = await fetchUser({ username });
      setUserData(response);
      setName(response?.name || "");
      setBio(response?.bio || "bio");
      setTags(
        response?.tags || ["Add a tag that represents you ( ex: Founder )"]
      );
      setImagesData(response?.images);

      const linksResponse = await axios.post("/api/fetchLinks", { username });
      setLinksData(linksResponse.data.links);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      toast.error("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.username && !userData) {
      fetchUserData(user.username);
    }
  }, [user?.username, userData]);

  const handleEdit = useCallback(async () => {
    if (isEditing) {
      toast.loading("Updating...");
      try {
        await updateUser({
          username: user?.username!,
          update: { name, bio, tags },
        });
        toast.success("Updated successfully");
      } catch (error) {
        console.error("Failed to update user data:", error);
        toast.error("Failed to update user data");
      } finally {
        toast.dismiss();
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  }, [isEditing, name, bio, tags, user?.username]);

  const handleBioChange = useCallback((e: any) => {
    const newBio = e.target.value;
    setBio(newBio);
    const result = bioSchema.safeParse(newBio);

    if (!result.success) {
      setBioError(result.error.errors[0].message);
    } else {
      setBioError(null);
    }
  }, []);

  const handleNewLink = useCallback(() => {
    setLinksData((prevLinksData: any) => [
      ...prevLinksData,
      {
        name: "Title",
        icon: "/images/3.svg",
        color: "#000",
        placeholder: "Add link URL",
        link: "",
        brand: "",
        key: new Date().getTime(), // Ensure each link has a unique key
      },
    ]);
  }, []);

  const handleNewImage = useCallback((imgUrl: any) => {
    setImagesData((prevImagesData: any) => [...prevImagesData, imgUrl]);
  }, []);

  const handleNewTag = useCallback(() => {
    setTags((prevTags: [string]) => [
      ...prevTags,
      "Add a tag that represents you ( ex: Founder )",
    ]);
  }, []);

  const handleRemoveTag = useCallback((index: number) => {
    setTags((prevTags: [string]) => prevTags.filter((_, i) => i !== index));
  }, []);

  const handleTagChange = useCallback((index: number, value: string) => {
    setTags((prevTags: [string]) => {
      const newTags = [...prevTags];
      newTags[index] = value;
      return newTags;
    });
  }, []);

  const handleLinkUpdate = useCallback(
    async (updatedLinkData: any) => {
      console.log(updatedLinkData);

      setLinksData((prevLinksData: any) => {
        const existingLinkIndex = prevLinksData.findIndex(
          (link: any) => link.key === updatedLinkData.key
        );

        if (existingLinkIndex !== -1) {
          const newLinks = [...prevLinksData];
          newLinks[existingLinkIndex] = updatedLinkData;
          console.log("new", newLinks);
          return newLinks;
        } else {
          return [...prevLinksData, updatedLinkData];
        }
      });

      try {
        await updateUser({
          username: user?.username!,
          update: { links: linksData },
        });
        toast.success("Updated successfully");
      } catch (error) {
        console.error("Failed to link data:", error);
        toast.error("Failed to link data");
      } finally {
        toast.dismiss();
        setIsEditing(false);
      }
    },
    [user?.username, linksData]
  );

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <HashLoader color="#0b0088" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl min-w-[1200px] mx-auto flex flex-col items-center justify-center">
      <div className="bg-[#F4F6F8] p-2 px-[100px] flex w-full flex-row items-center justify-between gap-5">
        <div></div>
        <div>
          <div className="flex bg-white px-8 py-2 rounded-xl items-center gap-3">
            <div className="bg-[#f4f6f8] p-1 items-center justify-center flex rounded-md h-8 text-[#0b0088] ">
              <Link2 />
            </div>
            <div className="euclid text-[#637381] text-xl">
              {user?.username}
            </div>
          </div>
        </div>
        <div>
          <button className="bg-[#1300EE] text-xs px-5 py-3 text-white rounded-lg flex flex-row items-center justify-center">
            <div className="text-2xl font-medium">Get new link</div>
            <div className="self-center px-3">
              <Link2 />
            </div>
          </button>
        </div>
      </div>
      <div className="bg-[#030029] px-[80px] py-[80px] rounded-b-[40px] w-full flex flex-col items-center gap-5">
        <div className="flex items-center gap-5 self-end flex-row">
          <div
            className="bg-white text-[#030029] flex items-center justify-center h-[48px] w-[48px] rounded-[16px] text-2xl cursor-pointer"
            onClick={handleEdit}
          >
            {isEditing ? <Save /> : <BiSolidPencil />}
          </div>
          <div className="bg-white text-[#030029] flex items-center justify-center h-[48px] w-[48px] rounded-[16px] text-2xl cursor-pointer">
            <IoMdColorPalette />
          </div>
        </div>
        <AvatarUpload
          user={user}
          userData={userData}
          setUserData={setUserData}
          isEditing={isEditing}
        />
        <div className="text-white text-6xl">
          {isEditing ? (
            <input
              className="bg-transparent outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            userData?.name
          )}
        </div>
        <Bio
          isEditing={isEditing}
          userData={userData}
          bio={bio}
          handleBioChange={handleBioChange}
          bioError={bioError}
        />
        <Tags
          isEditing={isEditing}
          tags={tags}
          handleNewTag={handleNewTag}
          handleRemoveTag={handleRemoveTag}
          handleTagChange={handleTagChange}
        />
      </div>
      <div className="flex flex-col items-start self-start gap-5 my-10 p-5">
        <div className="text-4xl">{userData?.linkSectionTitle}</div>
        <div className="flex flex-row gap-5 flex-wrap">
          {linksData?.map((item: any, index: any) => (
            <LinkItem
              key={index}
              data={item}
              handleLinkUpdate={handleLinkUpdate}
            />
          ))}
          {linksData.length < 5 && (
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
        <div className="text-4xl">
          {userData?.imagesSectionTitle || "Images"}
        </div>
        <div className="flex flex-row gap-5">
          {imagesData.map((src: any, index: any) => (
            <Image
              key={index}
              src={src}
              alt="User uploaded image"
              width={400}
              className="rounded-[30px]"
              height={300}
            />
          ))}
          {imagesData.length < 3 && (
            <CldUploadButton
              signatureEndpoint="/api/sign-cloudinary-params"
              uploadPreset="ml_default"
              onSuccess={(result, { widget }) => {
                console.log(result);
                const newImg = (result as any).info.url;
                handleNewImage(newImg);
                widget.close();
              }}
            >
              <div
                className="border-2 border-dashed p-3 flex flex-col items-center justify-center gap-5 w-[400px] rounded-[16px] px-7 border-[#C4CDD5] cursor-pointer"
                // onClick={() => handleNewImage}
              >
                <div className="bg-gradient-to-r from-[#1300ee] to-[#0b0088] p-2 text-white rounded-md">
                  <ImageIcon />
                </div>
                <div className="text-[32px]">Add Image</div>
              </div>
            </CldUploadButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
