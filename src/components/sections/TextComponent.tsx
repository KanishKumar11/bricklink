"use client";

import React from "react";
import { IText } from "@/interfaces";

const TextComponent: React.FC<IText> = ({
  text,
  textColor = "001122",
  bgColor = "#74B8FB",
}) => (
  <div
    style={{ color: textColor, backgroundColor: bgColor }}
    className="py-20 px-2 flex items-center justify-center text-center max-w-[300px]"
  >
    {text}
  </div>
);

export default TextComponent;
