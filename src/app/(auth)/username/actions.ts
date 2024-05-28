"use server";
import connectDb from "@/lib/connectDb";
import { User } from "@/models/user.models";
import { User as _user, clerkClient } from "@clerk/nextjs/server";

export const createUser = async ({
  username,
  user,
}: {
  username: string;
  user: any;
}) => {
  try {
    await connectDb();
    const newUser = await User.create({
      username,
      email: user?.email,
      name: user?.name,
      avatar: user?.avatar,
    });
    const userId = user?.userId;
    const response = clerkClient.users.updateUser(userId, { username });
    console.log(response);
    console.log(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

export const checkUsername = async ({ username }: { username: string }) => {
  try {
    await connectDb();
    const user = await User.findOne({ username });
    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw new Error("Some error occured!");
  }
};
