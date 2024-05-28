"use client";
import { useUser } from "@clerk/nextjs";
import { ImageIcon, Link2, Plus, Save } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { IoMdColorPalette } from "react-icons/io";
import { BiSolidPencil } from "react-icons/bi";
import { RiUploadLine } from "react-icons/ri";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import { avatarUpdate, fetchUser, updateUser } from "@/app/actions";
import { z } from "zod";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";
const links = [
  {
    name: "Instagram",
    icon: "/images/2.svg",
    brand: "instagram",
    color: "#D62976",
    placeholder: "Add your insta link",
    link: "",
  },
];

const images = ["/images/4.png"];
const bioSchema = z
  .string()
  .min(1)
  .max(150 * 5, "Bio must be 150 words or less");

const Home = () => {
  const { user } = useUser();
  const [linksData, setLinksData] = useState(links);
  const [imagesData, setImagesData] = useState(images);
  const [avatarUpload, setAvatarUpload] = useState<any>();
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [bioError, setBioError] = useState<string | null>(null);
  const [tags, setTags] = useState<any>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const router = useRouter();

  const handleNewLink = useCallback(() => {
    setLinksData((prevLinksData) => [
      ...prevLinksData,
      {
        name: "Title",
        icon: "/images/3.svg",
        color: "#000",
        placeholder: "Add link URL",
        link: "",
        brand: "",
      },
    ]);
  }, []);

  const handleNewImage = useCallback(() => {
    setImagesData((prevImagesData) => [...prevImagesData, "/images/4.png"]);
  }, []);

  // useEffect(() => {
  //   const updateAvatar = async () => {
  //     if (avatarUpload) {
  //       await avatarUpdate({
  //         username: user?.username!,
  //         avatar: avatarUpload.url,
  //       });
  //     }
  //   };
  //   updateAvatar();
  // }, [avatarUpload]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (user?.username) {
  //       const response = await fetchUser({ username: user.username });
  //       setUserData(response);
  //       setName(response?.name || "");
  //       setBio(response?.bio || "bio");
  //       setTags(
  //         response?.tags || ["Add a tag that represents you ( ex: Founder )"]
  //       );
  //     }
  //     // setIsLoading(false);
  //   };
  //   fetchData();
  // }, [user?.username]);

  const handleEdit = useCallback(async () => {
    if (isEditing) {
      toast.loading("Updating...");
      await updateUser({
        username: user?.username!,
        update: {
          name,
          bio,
          tags,
        },
      });
      toast.dismiss();
      toast.success("Updated successfully");
      setIsEditing(false);
    } else setIsEditing(true);
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

  const handleNewTag = useCallback(() => {
    setTags((prevTags: any) => [
      ...prevTags,
      "Add a tag that represents you ( ex: Founder )",
    ]);
  }, []);

  const handleRemoveTag = useCallback((index: number) => {
    setTags((prevTags: any) =>
      prevTags.filter((_: string, i: number) => i !== index)
    );
  }, []);

  const handleTagChange = useCallback((index: number, value: string) => {
    setTags((prevTags: any) => {
      const newTags = [...prevTags];
      newTags[index] = value;
      return newTags;
    });
  }, []);

  // if (isLoading) return <DotLoader color="#36d7b7" />;

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
          <button className="bg-[#1300EE] text-xs px-7 py-3 text-white rounded-[16px] font-medium">
            Add CTA Link
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
        {userData?.avatar ? (
          <div className="h-[124px] w-[124px] bg-[#F5F3F3] flex flex-col items-center justify-center text-black rounded-xl mx-auto text-wrap text-lg leading-5 text-center gap-3 relative">
            <Image
              src={userData?.avatar}
              alt="User Image"
              width={124}
              height={124}
              className="rounded-xl"
            />
            {isEditing && (
              <div className="absolute inset-0 opacity-50 hover:opacity-80 z-30">
                <CldUploadButton
                  signatureEndpoint="/api/sign-cloudinary-params"
                  uploadPreset="ml_default"
                  onSuccess={(result, { widget }) => {
                    setAvatarUpload(result?.info); // { public_id, secure_url, etc }
                    widget.close();
                  }}
                >
                  <div className="h-[124px] w-[124px] bg-[#F5F3F3] flex flex-col items-center justify-center text-black rounded-xl mx-auto text-wrap text-lg leading-5 text-center gap-3">
                    <span className="bg-[#a0a4a8] text-[#F5F3F3] p-2 rounded-md text-xl">
                      <RiUploadLine />
                    </span>
                    upload
                    <br /> image
                  </div>
                </CldUploadButton>
              </div>
            )}
          </div>
        ) : (
          <CldUploadButton
            signatureEndpoint="/api/sign-cloudinary-params"
            uploadPreset="ml_default"
            onSuccess={(result, { widget }) => {
              setAvatarUpload(result?.info);
              widget.close();
            }}
          >
            <div className="h-[124px] w-[124px] bg-[#F5F3F3] flex flex-col items-center justify-center text-black rounded-xl mx-auto text-wrap text-lg leading-5 text-center gap-3">
              <span className="bg-[#a0a4a8] text-[#F5F3F3] p-2 rounded-md text-xl">
                <RiUploadLine />
              </span>
              upload
              <br /> image
            </div>
          </CldUploadButton>
        )}
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
        <div className="text-white euclid text-lg">
          {isEditing ? (
            <>
              <input
                className="bg-transparent outline-none"
                value={bio}
                onChange={handleBioChange}
              />
              {bioError && <p className="text-red-500">{bioError}</p>}
            </>
          ) : (
            <p>{userData?.bio || "Your Bio (150 words)"}</p>
          )}
        </div>

        <div className="flex flex-row gap-5">
          {tags?.map((item: string, index: number) => (
            <div
              className="bg-white rounded-[24px] px-[32px] text-[#0B0088] text-lg py-2 relative"
              key={index}
            >
              {isEditing ? (
                <>
                  <input
                    value={item}
                    placeholder="Add a tag that represents you ( ex: Founder )"
                    className="bg-transparent outline-none"
                    onChange={(e) => handleTagChange(index, e.target.value)}
                  />
                  <div
                    className="absolute right-0 -top-1 text-xs bg-red-600 text-white rounded-full p-1 cursor-pointer"
                    onClick={() => handleRemoveTag(index)}
                  >
                    <RxCross2 />
                  </div>
                </>
              ) : (
                item
              )}
            </div>
          ))}
          {tags?.length < 3 && (
            <div
              className="text-3xl text-black bg-white rounded-xl items-center flex justify-center p-2 cursor-pointer"
              onClick={handleNewTag}
            >
              <Plus />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-start self-start gap-5 my-10 p-5">
        <div className="text-4xl">{userData?.linkSectionTitle}</div>
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
        <div className="text-4xl">Add a title</div>
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
        <input placeholder={data.placeholder} className="outline-none" />
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

export default Home;
