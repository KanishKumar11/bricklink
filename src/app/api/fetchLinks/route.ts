import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/lib/connectDb";
import { User } from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";

type Data = {
  links?: Array<any>;
  error?: string;
};

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method === "POST") {
    const reqBody = await req.json();
    const { username } = reqBody;

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    try {
      await connectDb();
      const user = await User.findOne({ username });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 400 });
      }

      return NextResponse.json({ links: user.links }, { status: 200 });
    } catch (err) {
      console.error("Failed to fetch user links:", err);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
}
