import React from "react";
import { RxCross2 } from "react-icons/rx";
import { Plus } from "lucide-react";

interface TagsProps {
  isEditing: boolean;
  tags: string[];
  handleNewTag: () => void;
  handleRemoveTag: (index: number) => void;
  handleTagChange: (index: number, value: string) => void;
}

const Tags: React.FC<TagsProps> = ({
  isEditing,
  tags,
  handleNewTag,
  handleRemoveTag,
  handleTagChange,
}) => {
  return (
    <div className="flex flex-row gap-5">
      {tags?.map((item: string, index: number) => (
        <div
          className="bg-white rounded-[24px] px-[32px] text-[#0B0088] text-lg py-2 relative"
          key={index}
        >
          {isEditing ? (
            <>
              <input
                value={item}
                placeholder="Add a tag that represents you ( ex: Founder )"
                className="bg-transparent outline-none"
                onChange={(e) => handleTagChange(index, e.target.value)}
              />
              <div
                className="absolute right-0 -top-1 text-xs bg-red-600 text-white rounded-full p-1 cursor-pointer"
                onClick={() => handleRemoveTag(index)}
              >
                <RxCross2 />
              </div>
            </>
          ) : (
            item
          )}
        </div>
      ))}
      {tags?.length < 3 && (
        <div
          className="text-3xl text-black bg-white rounded-xl items-center flex justify-center p-2 cursor-pointer"
          onClick={handleNewTag}
        >
          <Plus />
        </div>
      )}
    </div>
  );
};

export default Tags;
