"use server";

import connectDb from "@/lib/connectDb";
import { User } from "@/models/user.models";
import metaFetcher from "meta-fetcher";

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
    const user = (await User.findOne({ username })) as User;
    console.log(username);
    console.log(user);
    return {
      username: user.username,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      bio: user.bio,
      tags: user.tags,
      linkSectionTitle: user.linkSectionTitle,
      imagesSectionTitle: user.imagesSectionTitle,
      images: user.images,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const fetchLinks = async ({ username }: { username: string }) => {
  try {
    await connectDb();
    const user = (await User.findOne({ username })) as User;
    console.log(username);
    console.log(user);
    return { links: user.links };
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
