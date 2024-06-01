import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();
    const file = body.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const uploadDir = path.join(process.cwd(), "public", "user");
    console.log(uploadDir);
    fs.mkdirSync(uploadDir, { recursive: true });

    const randomFileName = generateRandomFileName(file.name);
    console.log(randomFileName);
    const filePath = path.join(uploadDir, randomFileName);
    fs.writeFileSync(filePath, Buffer.from(bytes));

    // Upload file to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(filePath, {
      folder: "user",
    });

    // Delete the local file after upload
    try {
      await fs.promises.unlink(filePath);
      console.log(`File deleted: ${filePath}`);
    } catch (err) {
      console.error("Failed to delete file:", err);
      return NextResponse.json(
        { error: "Failed to delete file", filePath },
        { status: 500 }
      );
    }
    console.log(cloudinaryResponse);

    return NextResponse.json(
      {
        message: "File uploaded successfully",
        cloudinaryResponse,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

function generateRandomFileName(originalFileName: string) {
  const fileExtension = path.extname(originalFileName);
  const randomBytes = crypto.randomBytes(16).toString("hex");
  const randomFileName = `${randomBytes}${fileExtension}`;
  return randomFileName;
}
