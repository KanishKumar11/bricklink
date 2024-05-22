import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";

interface LinkData {
  name: string;
  icon: string;
  color?: string;
  placeholder?: string;
  link?: string;
  key: number;
}

interface LinkItemProps {
  data: LinkData;
  handleLinkUpdate: (linkData: LinkData) => void;
}

// Expanded icon mapping for popular domains
const iconMapping: { [key: string]: string } = {
  instagram: "/images/2.svg",
  linkedin: "/images/linkedin.svg",
  facebook: "/images/facebook.svg",
  twitter: "/images/twitter.svg",
  youtube: "/images/youtube.svg",
  github: "/images/github.svg",
  reddit: "/images/reddit.svg",
  pinterest: "/images/pinterest.svg",
  snapchat: "/images/snapchat.svg",
  tiktok: "/images/tiktok.svg",
  medium: "/images/medium.svg",
  dribbble: "/images/dribbble.svg",
  behance: "/images/behance.svg",
  whatsapp: "/images/whatsapp.svg",
  spotify: "/images/spotify.svg",
  soundcloud: "/images/soundcloud.svg",
  twitch: "/images/twitch.svg",
  discord: "/images/discord.svg",
  slack: "/images/slack.svg",
  // Add more mappings as needed
};

const getIconForLink = (link: string) => {
  if (link.includes("instagram.com")) return iconMapping.instagram;
  if (link.includes("linkedin.com")) return iconMapping.linkedin;
  if (link.includes("facebook.com")) return iconMapping.facebook;
  if (link.includes("twitter.com")) return iconMapping.twitter;
  if (link.includes("youtube.com")) return iconMapping.youtube;
  if (link.includes("github.com")) return iconMapping.github;
  if (link.includes("reddit.com")) return iconMapping.reddit;
  if (link.includes("pinterest.com")) return iconMapping.pinterest;
  if (link.includes("snapchat.com")) return iconMapping.snapchat;
  if (link.includes("tiktok.com")) return iconMapping.tiktok;
  if (link.includes("medium.com")) return iconMapping.medium;
  if (link.includes("dribbble.com")) return iconMapping.dribbble;
  if (link.includes("behance.net")) return iconMapping.behance;
  if (link.includes("whatsapp.com")) return iconMapping.whatsapp;
  if (link.includes("spotify.com")) return iconMapping.spotify;
  if (link.includes("soundcloud.com")) return iconMapping.soundcloud;
  if (link.includes("twitch.tv")) return iconMapping.twitch;
  if (link.includes("discord.com")) return iconMapping.discord;
  if (link.includes("slack.com")) return iconMapping.slack;
  // Default icon
  return "/images/3.svg";
};

const LinkItem: React.FC<LinkItemProps> = ({ data, handleLinkUpdate }) => {
  const [title, setTitle] = useState<string>(data.name);
  const [link, setLink] = useState<string>(data.link || "");
  const [icon, setIcon] = useState<string>(data.icon);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    setIcon(getIconForLink(e.target.value));
  };

  const onAddClick = () => {
    handleLinkUpdate({ ...data, name: title, icon, link });
    toast.success("Link updated successfully!");
  };

  useEffect(() => {
    setTitle(data.name);
    setLink(data.link || "");
    setIcon(data.icon);
  }, [data]);

  return (
    <div
      className="border-2 border-dashed p-3 flex flex-col gap-5 w-[400px] rounded-[16px] px-7"
      style={{ borderColor: data.color }}
    >
      <Image src={icon} alt={title} width={96} height={96} />
      <div className="flex flex-col gap-2">
        <input
          value={title}
          onChange={onTitleChange}
          placeholder="Title"
          className="text-3xl font-medium outline-none bg-transparent"
        />
        <input
          value={link}
          onChange={onLinkChange}
          placeholder={data.placeholder}
          className="outline-none"
        />
      </div>
      <button
        className="px-20 text-white py-3 text-xl w-max rounded-xl"
        style={{ backgroundColor: data.color }}
        onClick={onAddClick}
      >
        {data.link ? "Update" : "Add"}
      </button>
    </div>
  );
};

export default LinkItem;
