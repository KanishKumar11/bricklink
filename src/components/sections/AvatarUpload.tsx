import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import { RiUploadLine } from "react-icons/ri";
import { avatarUpdate } from "@/app/actions";

interface AvatarUploadProps {
  user: any;
  userData: any;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
  isEditing: boolean;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  user,
  userData,
  setUserData,
  isEditing,
}) => {
  const [avatarUpload, setAvatarUpload] = useState<any>();

  useEffect(() => {
    const updateAvatar = async () => {
      if (avatarUpload) {
        await avatarUpdate({
          username: user?.username!,
          avatar: avatarUpload.url,
        });
      }
    };
    updateAvatar();
  }, [avatarUpload, user?.username]);

  return (
    <>
      {userData?.avatar ? (
        <div className="h-[96px] w-[96px]  flex flex-col items-center justify-center text-black rounded-xl mx-auto text-wrap text-lg leading-5 text-center gap-3 relative">
          <Image
            src={userData?.avatar}
            alt="User Image"
            width={96}
            height={96}
            className="rounded-xl"
          />
          {isEditing && (
            <div className="absolute inset-0 opacity-50 hover:opacity-80 z-30">
              <CldUploadButton
                signatureEndpoint="/api/sign-cloudinary-params"
                uploadPreset="ml_default"
                onSuccess={(result, { widget }) => {
                  setAvatarUpload(result?.info); // { public_id, secure_url, etc }
                  widget.close();
                }}
              >
                <div className="h-[96px] w-[96px] bg-[#F5F3F3] flex flex-col items-center justify-center text-black rounded-xl mx-auto text-wrap text-base leading-5 text-center gap-3">
                  <span className="bg-[#a0a4a8] text-[#F5F3F3] p-2 rounded-md text-lg">
                    <RiUploadLine />
                  </span>
                  upload
                  <br /> image
                </div>
              </CldUploadButton>
            </div>
          )}
        </div>
      ) : (
        <CldUploadButton
          signatureEndpoint="/api/sign-cloudinary-params"
          uploadPreset="ml_default"
          onSuccess={(result, { widget }) => {
            setAvatarUpload(result?.info);
            widget.close();
          }}
        >
          <div className="h-[96px] w-[96px] bg-[#F5F3F3] flex flex-col items-center justify-center text-black rounded-xl mx-auto text-wrap text-xs leading-5 text-center gap-3 p-2">
            <span className="bg-[#a0a4a8] text-[#F5F3F3] p-2 rounded-md text-sm">
              <RiUploadLine />
            </span>
            upload
          </div>
        </CldUploadButton>
      )}
    </>
  );
};

export default AvatarUpload;
