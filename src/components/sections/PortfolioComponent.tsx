"use client";
import React from "react";
import { IPortfolio } from "@/interfaces";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import LinkComponent from "./LinkComponent";

const PortfolioComponent: React.FC<IPortfolio> = ({
  title,
  description,
  images,
  subHeading,
  cta,
  link,
}) => {
  console.log(images.length);
  return (
    <div className="text-[#001122] flex gap-5 items-center text-center justify-center flex-col p-5">
      <div>
        {" "}
        <h2 className="euclid text-xl font-medium">{title}</h2>
        <p className="text-xs">{subHeading}</p>
      </div>{" "}
      <div className="flex mx-auto flex-row -mb-12   ">
        {" "}
        {images.map((image, index) => (
          <Image
            width="800"
            height="800"
            key={index}
            src={image}
            alt={`Portfolio ${index}`}
            className={`${
              images.length == 2
                ? index == 0
                  ? "-rotate-6 h-[305px] w-[286px]"
                  : "rotate-6 h-[220px] self-end w-[220px] -ml-20"
                : "rotate-0 w-[400px] h-[305px]"
            } drop-shadow-lg`}
          />
        ))}
      </div>
      {/* <h3>{subHeading}</h3> */}
      <Sheet>
        <SheetTrigger>
          <div className="bg-black text-white rounded-xl px-5 py-2 relative z-10">
            {cta || "Read more"}
          </div>
        </SheetTrigger>
        <SheetContent
          side={"bottom"}
          className="py-16 max-h-[85vh]  rounded-[24px] max-w-5xl mx-auto flex flex-col items-center justify-center text-center"
        >
          <ScrollArea className="h-[85vh] max-w-5xl">
            <SheetHeader className="flex flex-col items-center justify-center px-3">
              <SheetTitle className="text-center euclid text-4xl font-medium">
                {title}
              </SheetTitle>
              <p className="text-xs text-center">{subHeading}</p>
              <SheetDescription>
                <div className="flex flex-row -mb-12 mx-auto  max-w-max">
                  {" "}
                  {images.map((image, index) => (
                    <Image
                      width="800"
                      height="800"
                      key={index}
                      src={image}
                      alt={`Portfolio ${index}`}
                      className={`${
                        images.length == 2
                          ? index == 0
                            ? "-rotate-6 h-[305px] min-w-[286px] max-w-[420px]"
                            : "rotate-6 h-[220px] self-end min-w-[220px] max-w-[350px] -ml-20"
                          : "rotate-0 min-w-[400px] h-[305px] "
                      } drop-shadow-lg`}
                    />
                  ))}
                </div>
                <p className="text-lg text-center mt-10">{description}</p>
                <div className="my-5 self-center justify-center flex items-center">
                  <LinkComponent link={link} />
                </div>
              </SheetDescription>
            </SheetHeader>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PortfolioComponent;
