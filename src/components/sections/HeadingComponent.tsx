"use client";
import React, { useState } from "react";
import { IHeading } from "@/interfaces";
import { Save } from "lucide-react";
import { BiSolidPencil } from "react-icons/bi";

const HeadingComponent: React.FC<IHeading> = ({
  heading,
  color = "#050401",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {};
  return (
    <div className="flex items-center my-4 justify-between w-full lg:min-w-[1024px] min-w-[80vw] mx-auto self-center">
      <h2 style={{ color }} className="text-3xl">
        {heading}
      </h2>{" "}
      {/* <div
        className="bg-gray-200/50 text-[#030029] flex items-center justify-center h-[32px] w-[32px] rounded-[16px] -my-10 text-lg cursor-pointer"
        onClick={handleEdit}
      >
        {isEditing ? <Save /> : <BiSolidPencil />}
      </div> */}
    </div>
  );
};

export default HeadingComponent;
