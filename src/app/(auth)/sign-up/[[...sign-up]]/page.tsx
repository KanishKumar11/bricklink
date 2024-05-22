import Navbar from "@/components/Navbar";
import TitleBtn from "@/components/TitleBtn";
import { SignUp } from "@clerk/nextjs";
import { PencilRuler } from "lucide-react";

export default function Page() {
  return (
    <div className="flex items-center justify-center flex-col w-auto max-w-7xl gap-7 mx-auto">
      <Navbar />
      <TitleBtn>
        <PencilRuler /> Welcome home
      </TitleBtn>
      <h2 className="euclid text-[56px] text-center max-w-5xl leading-tight">
        You’re place for you, portfolio, links & more Like a home :)
      </h2>
      <p className="text-lg text-[#637381]">
        An link in bio tool for freelancers, creators
      </p>
      <div className=" scale-125 mt-20">
        <SignUp path="/sign-up" forceRedirectUrl={`/username`} />
      </div>{" "}
    </div>
  );
}
