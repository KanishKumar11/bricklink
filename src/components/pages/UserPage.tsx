import React, { useCallback, useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import {
  IUserPage,
  IComponent,
  ILink,
  IImage,
  IText,
  IHeading,
  IPortfolio,
  IUser,
} from "@/interfaces";
import ImageComponent from "@/components/sections/ImageComponent";
import LinkComponent from "@/components/sections/LinkComponent";
import TextComponent from "@/components/sections/TextComponent";
import HeadingComponent from "@/components/sections/HeadingComponent";
import PortfolioComponent from "@/components/sections/PortfolioComponent";
import AvatarUpload from "../sections/AvatarUpload";
import { IoMdColorPalette } from "react-icons/io";
import { Save } from "lucide-react";
import { BiSolidPencil } from "react-icons/bi";
import { FaShareAlt } from "react-icons/fa";
import { fetchUser, updateUser } from "@/app/actions";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { z } from "zod";
import Bio from "../sections/Bio";
import Tags from "../sections/Tags";
import Image from "next/image";
import Link from "next/link";

interface UserPageProps {
  page: IUserPage;
  user: IUser;
}

const UserPage: React.FC<UserPageProps> = ({ page, user }) => {
  // const { user } = useUser();
  const [components, setComponents] = useState<IComponent[]>(page.components);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newComponentType, setNewComponentType] = useState<string>("");
  const [newComponentData, setNewComponentData] = useState<any>({});
  const [userData, setUserData] = useState<any>(user);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [bioError, setBioError] = useState<string | null>(null);
  const [tags, setTags] = useState<any>([]);
  const renderComponent = (component: IComponent, index: number) => {
    if (editIndex === index) {
      return renderEditForm(component, index);
    }

    switch (component.type) {
      case "Link":
        return <LinkComponent {...(component.data as ILink)} />;
      case "Image":
        return <ImageComponent {...(component.data as IImage)} />;
      case "Text":
        return <TextComponent {...(component.data as IText)} />;
      case "Heading":
        return <HeadingComponent {...(component.data as IHeading)} />;
      case "Portfolio":
        return <PortfolioComponent {...(component.data as IPortfolio)} />;
      default:
        return null;
    }
  };

  const handleAddComponent = () => {
    if (!newComponentType || !newComponentData) return;

    const newComponent: IComponent = {
      type: newComponentType as any,
      data: newComponentData,
    };

    setComponents([...components, newComponent]);
    setNewComponentType("");
    setNewComponentData({});
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedComponents = Array.from(components);
    const [removed] = reorderedComponents.splice(result.source.index, 1);
    reorderedComponents.splice(result.destination.index, 0, removed);

    setComponents(reorderedComponents);
  };

  const handleUpdateComponent = (index: number, updatedData: any) => {
    const updatedComponents = components.map((component, i) =>
      i === index ? { ...component, data: updatedData } : component
    );
    setComponents(updatedComponents);
    setEditIndex(null);
  };

  const renderEditForm = (component: IComponent, index: number) => {
    const { data } = component;
    const handleChange = (field: string, value: any) => {
      handleUpdateComponent(index, { ...data, [field]: value });
    };

    switch (component.type) {
      case "Link":
        return (
          <div>
            <input
              type="text"
              value={(data as ILink).name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <input
              type="text"
              value={(data as ILink).color}
              onChange={(e) => handleChange("color", e.target.value)}
            />
            <input
              type="text"
              value={(data as ILink).placeholder}
              onChange={(e) => handleChange("placeholder", e.target.value)}
            />
            <input
              type="text"
              value={(data as ILink).link}
              onChange={(e) => handleChange("link", e.target.value)}
            />
            <button onClick={() => setEditIndex(null)}>Save</button>
          </div>
        );
      case "Image":
        return (
          <div>
            <input
              type="text"
              value={(data as IImage).imageUrl}
              onChange={(e) => handleChange("imageUrl", e.target.value)}
            />
            <input
              type="number"
              value={(data as IImage).height}
              onChange={(e) => handleChange("height", Number(e.target.value))}
            />
            <input
              type="number"
              value={(data as IImage).width}
              onChange={(e) => handleChange("width", Number(e.target.value))}
            />
            <button onClick={() => setEditIndex(null)}>Save</button>
          </div>
        );
      case "Text":
        return (
          <div>
            <input
              type="text"
              value={(data as IText).text}
              onChange={(e) => handleChange("text", e.target.value)}
            />
            <input
              type="text"
              value={(data as IText).textColor}
              onChange={(e) => handleChange("textColor", e.target.value)}
            />
            <input
              type="text"
              value={(data as IText).bgColor}
              onChange={(e) => handleChange("bgColor", e.target.value)}
            />
            <button onClick={() => setEditIndex(null)}>Save</button>
          </div>
        );
      case "Heading":
        return (
          <div>
            <input
              type="text"
              value={(data as IHeading).heading}
              onChange={(e) => handleChange("heading", e.target.value)}
            />
            <input
              type="text"
              value={(data as IHeading).color}
              onChange={(e) => handleChange("color", e.target.value)}
            />
            <button onClick={() => setEditIndex(null)}>Save</button>
          </div>
        );
      case "Portfolio":
        return (
          <div>
            <input
              type="text"
              value={(data as IPortfolio).title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
            <input
              type="text"
              value={(data as IPortfolio).description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
            <input
              type="text"
              value={(data as IPortfolio).images.join(",")}
              onChange={(e) =>
                handleChange("images", e.target.value.split(","))
              }
            />
            <input
              type="text"
              value={(data as IPortfolio).subHeading}
              onChange={(e) => handleChange("subHeading", e.target.value)}
            />
            <input
              type="text"
              value={(data as IPortfolio).cta}
              onChange={(e) => handleChange("cta", e.target.value)}
            />
            <input
              type="text"
              value={(data as IPortfolio).link}
              onChange={(e) => handleChange("link", e.target.value)}
            />
            <button onClick={() => setEditIndex(null)}>Save</button>
          </div>
        );
      default:
        return null;
    }
  };
  // const fetchUserData = async (username: string) => {
  //   try {
  //     setLoading(true);
  //     const response = await fetchUser({ username });
  //     setUserData(response);
  //     setName(response?.name || "");
  //     setBio(response?.bio || "bio");
  //     setTags(
  //       response?.tags || ["Add a tag that represents you ( ex: Founder )"]
  //     );
  //     // setImagesData(response?.images);

  //     // const linksResponse = await axios.post("/api/fetchLinks", { username });
  //     // setLinksData(linksResponse.data.links);
  //   } catch (error) {
  //     console.error("Failed to fetch user data:", error);
  //     toast.error("Failed to fetch user data");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (user?.username && !userData) {
  //     fetchUserData(user.username);
  //   }
  // }, [user?.username, userData]);

  const handleEdit = useCallback(async () => {
    if (isEditing) {
      toast.loading("Updating...");
      try {
        await updateUser({
          username: user?.username!,
          update: { name, bio, tags },
        });
        toast.success("Updated successfully");
      } catch (error) {
        console.error("Failed to update user data:", error);
        toast.error("Failed to update user data");
      } finally {
        toast.dismiss();
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  }, [isEditing, name, bio, tags, user?.username]);
  const bioSchema = z
    .string()
    .min(1)
    .max(150 * 5, "Bio must be 150 words or less");
  const handleNewTag = useCallback(() => {
    setTags((prevTags: [string]) => [
      ...prevTags,
      "Add a tag that represents you ( ex: Founder )",
    ]);
  }, []);

  const handleRemoveTag = useCallback((index: number) => {
    setTags((prevTags: [string]) => prevTags.filter((_, i) => i !== index));
  }, []);

  const handleTagChange = useCallback((index: number, value: string) => {
    setTags((prevTags: [string]) => {
      const newTags = [...prevTags];
      newTags[index] = value;
      return newTags;
    });
  }, []);

  const handleBioChange = useCallback(
    (e: any) => {
      const newBio = e.target.value;
      setBio(newBio);
      const result = bioSchema.safeParse(newBio);

      if (!result.success) {
        setBioError(result.error.errors[0].message);
      } else {
        setBioError(null);
      }
    },
    [bioSchema]
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white  px-[80px] pt-[20px] pb-[80px] rounded-b-[40px] w-full flex flex-col items-center gap-5 max-w-5xl mx-auto">
        <div className="bg-[#F4F6F8] px-[56px] z-[15] fixed rounded-[16px] py-[16px] flex items-center justify-between mx-auto max-w-7xl w-full">
          <div className="flex gap-2 flex-row items-center">
            <Image
              src={userData?.avatar || "/images/4.png"}
              alt=""
              width={48}
              height={48}
              className="rounded-[8px]"
            />
            <span className="euclid text-2xl text-[#050401]">
              {" "}
              {userData?.username}
            </span>
            <span className="text-[#C4CDD5] text-[14px] cursor-pointer h-[15px] w-[15px] block">
              <FaShareAlt />
            </span>
          </div>
          <div>
            {" "}
            <Link href="#" className="md:block hidden">
              <div className="bg-[#050401] text-[#F0E100] hover:shadow-2xl px-5 py-2 rounded-[12px]">
                Add CTA Link
              </div>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-5 mt-20 self-end flex-row">
          {/* <div
            className="bg-gray-200/50 text-[#030029] flex items-center justify-center h-[32px] w-[32px] rounded-[16px] -my-10 text-lg cursor-pointer"
            onClick={handleEdit}
          >
            {isEditing ? <Save /> : <BiSolidPencil />}
          </div> */}
        </div>
        <AvatarUpload
          user={user}
          userData={userData}
          setUserData={setUserData}
          isEditing={isEditing}
        />
        <div className="text-[#050401] text-4xl">
          {isEditing ? (
            <input
              className="bg-transparent outline-none"
              value={userData?.name}
              onChange={(e) => setUserData((userData.name = e.target.value))}
            />
          ) : (
            user?.name || "Kanish Kumar"
          )}
        </div>
        <Bio
          isEditing={isEditing}
          userData={userData}
          bio={page.bio!}
          handleBioChange={handleBioChange}
          bioError={bioError}
        />
        <Tags
          isEditing={isEditing}
          tags={page.tags}
          handleNewTag={handleNewTag}
          handleRemoveTag={handleRemoveTag}
          handleTagChange={handleTagChange}
        />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="components">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex items-center gap-5 flex-row w-full justify-between flex-wrap max-w-5xl mx-auto"
            >
              {components.map((component, index) => (
                <Draggable
                  key={index}
                  draggableId={String(index)}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex items-center justify-between flex-row flex-wrap"
                    >
                      {renderComponent(component, index)}
                      {/* <button onClick={() => setEditIndex(index)}>Edit</button> */}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div>
        <h3>Add New Component</h3>
        <select
          value={newComponentType}
          onChange={(e) => setNewComponentType(e.target.value)}
        >
          <option value="">Select Component Type</option>
          <option value="Link">Link</option>
          <option value="Image">Image</option>
          <option value="Text">Text</option>
          <option value="Heading">Heading</option>
          <option value="Portfolio">Portfolio</option>
        </select>
        {newComponentType && (
          <div>
            {newComponentType === "Link" && (
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(e) =>
                    setNewComponentData({
                      ...newComponentData,
                      name: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Color"
                  onChange={(e) =>
                    setNewComponentData({
                      ...newComponentData,
                      color: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Placeholder"
                  onChange={(e) =>
                    setNewComponentData({
                      ...newComponentData,
                      placeholder: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Link"
                  onChange={(e) =>
                    setNewComponentData({
                      ...newComponentData,
                      link: e.target.value,
                    })
                  }
                />
              </div>
            )}
            {newComponentType === "Image" && (
              <div>
                <input
                  type="text"
                  placeholder="Image URL"
                  onChange={(e) =>
                    setNewComponentData({
                      ...newComponentData,
                      imageUrl: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Height"
                  onChange={(e) =>
                    setNewComponentData({
                      ...newComponentData,
                      height: Number(e.target.value),
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Width"
                  onChange={(e) =>
                    setNewComponentData({
                      ...newComponentData,
                      width: Number(e.target.value),
                    })
                  }
                />
              </div>
            )}
            {newComponentType === "Text" && (
              <div>
                <input
                  type="text"
                  placeholder="Text"
                  onChange={(e) =>
                    setNewComponentData({
                      ...newComponentData,
                      text: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Text Color"
                  onChange={(e) =>
                    setNewComponentData({
                      ...newComponentData,
                      textColor: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Background Color"
                  onChange={(e) =>
                    setNewComponentData({
                      ...newComponentData,
                      bgColor: e.target.value,
                    })
                  }
                />
              </div>
            )}
            {newComponentType === "Heading" && (
              <div>
                <input
                  type="text"
                  placeholder="Heading"
                  onChange={(e) =>
                    setNewComponentData({
                      ...newComponentData,
                      heading: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Color"
                  onChange={(e) =>
                    setNewComponentData({
                      ...newComponentData,
                      color: e.target.value,
                    })
                  }
                />
              </div>
            )}
            {newComponentType === "Portfolio" && (
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  onChange={(e) =>
                    setNewComponentData({
                      ...newComponentData,
                      title: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Description"
                  onChange={(e) =>
                    setNewComponentData({
                      ...newComponentData,
                      description: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Image URLs (comma-separated)"
                  onChange={(e) =>
                    setNewComponentData({
                      ...newComponentData,
                      images: e.target.value.split(","),
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Subheading"
                  onChange={(e) =>
                    setNewComponentData({
                      ...newComponentData,
                      subHeading: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="CTA"
                  onChange={(e) =>
                    setNewComponentData({
                      ...newComponentData,
                      cta: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Link"
                  onChange={(e) =>
                    setNewComponentData({
                      ...newComponentData,
                      link: e.target.value,
                    })
                  }
                />
              </div>
            )}
          </div>
        )}
        <button onClick={handleAddComponent}>Add Component</button>
      </div>
    </div>
  );
};

export default UserPage;
