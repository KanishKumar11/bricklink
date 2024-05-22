import React, { ReactNode } from "react";

const TitleBtn = ({ children }: { children: ReactNode }) => {
  return (
    <div className="text-white bg-gradient-to-r from-[#1300ee] to-[#0b0088] px-8 rounded-[38px] flex items-center justify-center gap-3 p-4">
      {children}
    </div>
  );
};

export default TitleBtn;
