"use server";

import { IUser } from "@/interfaces";
import connectDb from "@/lib/connectDb";
import { User } from "@/models/user.models";
import metaFetcher from "meta-fetcher";
import { v2 as cloudinary } from "cloudinary";
export const updateUser = async ({
  username,
  update,
}: {
  username: string;
  update: {
    name?: string;
    bio?: string;
    tags?: [string];
    links?: any;
  };
}) => {
  try {
    await connectDb();
    // const { name, bio, tags } = update;
    const response = await User.findOneAndUpdate({ username }, { ...update });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};
export const avatarUpdate = async ({
  username,
  avatar,
}: {
  username: string;
  avatar: string;
}) => {
  try {
    await connectDb();
    const response = await User.findOneAndUpdate({ username }, { avatar });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export const fetchUser = async ({ username }: { username: string }) => {
  try {
    await connectDb();
    const user = (await User.findOne({ username })) as IUser;
    console.log(username);
    console.log(user);
    return {
      username: user.username,
      email: user.email,
      // name: user.name,
      // avatar: user.avatar,
      // bio: user.bio,
      // tags: user.tags,
      // linkSectionTitle: user.linkSectionTitle,
      // imagesSectionTitle: user.imagesSectionTitle,
      // images: user.images,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const fetchLinks = async ({ username }: { username: string }) => {
  try {
    await connectDb();
    const user = (await User.findOne({ username })) as IUser;
    console.log(username);
    console.log(user);
    return { links: "user.links" };
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const fetchMetaData = async (url: string) => {
  const result = await metaFetcher(url);
  console.log(result);
  return result;
};

export const cloudinaryUpload = async (file: File) => {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default");

  console.log(file);
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  console.log(data);
  return data;
};
