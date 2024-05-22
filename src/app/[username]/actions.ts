"use server";
import connectDb from "@/lib/connectDb";
import { User } from "@/models/user.model";

export const findUser = async ({
  username,
}: {
  username: string | string[];
}) => {
  try {
    await connectDb();
    const user = await User.findOne({ username });
    if (user)
      return {
        found: true,
        username: user?.username,
        email: user?.email,
        name: user?.name,
        avatar: user?.avatar,
      };
    else return { found: false };
  } catch (err) {
    console.log(err);
    return { found: false };
  }
};
