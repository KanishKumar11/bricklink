import React from "react";
import Image from "next/image";
import { Plus } from "lucide-react";

const Images = ({
  imagesData,
  handleNewImage,
}: {
  imagesData: string[];
  handleNewImage: () => void;
}) => (
  <div className="flex flex-row gap-5">
    {imagesData.map((item, index) => (
      <div key={index} className="w-[400px] h-[400px] bg-red-600 p-2">
        <Image
          src={item}
          alt=""
          width={400}
          height={300}
          className="w-[400px] h-auto"
        />
      </div>
    ))}
    {imagesData.length < 3 && (
      <div
        className="border-2 border-dashed p-3 flex flex-col items-center justify-center gap-5 w-[400px] rounded-[16px] px-7 border-[#C4CDD5] cursor-pointer"
        onClick={handleNewImage}
      >
        <div className="bg-gradient-to-r from-[#1300ee] to-[#0b0088] p-2 text-white rounded-md">
          <Plus />
        </div>
        <div className="text-[32px]">Add Image</div>
      </div>
    )}
  </div>
);

export default Images;
