import React from "react";
import { z } from "zod";

interface BioProps {
  isEditing: boolean;
  userData: any;
  bio: string;
  handleBioChange: (e: any) => void;
  bioError: string | null;
}

const Bio: React.FC<BioProps> = ({
  isEditing,
  userData,
  bio,
  handleBioChange,
  bioError,
}) => {
  return (
    <div className="text-white euclid text-lg">
      {isEditing ? (
        <>
          <input
            className="bg-transparent outline-none"
            value={bio}
            onChange={handleBioChange}
          />
          {bioError && <p className="text-red-500">{bioError}</p>}
        </>
      ) : (
        <p>{userData?.bio || "Your Bio (150 words)"}</p>
      )}
    </div>
  );
};

export default Bio;
