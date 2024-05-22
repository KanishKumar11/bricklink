import Navbar from "@/components/Navbar";
import TitleBtn from "@/components/TitleBtn";
import { SignIn } from "@clerk/nextjs";
import { PencilRuler } from "lucide-react";

export default function Page() {
  return (
    <div className="flex items-center justify-center flex-col w-auto max-w-7xl gap-7 mx-auto">
      <Navbar />
      <TitleBtn>
        <PencilRuler /> Welcome back
      </TitleBtn>
      <h2 className="euclid text-[56px] text-center max-w-5xl leading-tight">
        Happy to see you back
      </h2>
      <p className="text-lg text-[#637381]">
        Welcome back, log-in to see our new version{" "}
      </p>
      <div>
        <SignIn path="/sign-in" />
      </div>{" "}
    </div>
  );
}
