"use client";
import React from "react";
import { IImage } from "@/interfaces";
import Image from "next/image";

const ImageComponent: React.FC<IImage> = ({ imageUrl, height, width }) => (
  <div>
    <Image
      src={imageUrl}
      alt="User Image"
      width={width || 500}
      height={height || 500}
      style={{ width, height }}
    />
  </div>
);

export default ImageComponent;
