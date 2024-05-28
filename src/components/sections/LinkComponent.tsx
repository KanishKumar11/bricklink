"use client";
import React, { useState, useEffect } from "react";
import { ILink } from "@/interfaces";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
const platformMapping: {
  [key: string]: { icon: string; color: string; title: string };
} = {
  instagram: { icon: "/images/2.svg", color: "#E1306C", title: "Instagram" },
  linkedin: {
    icon: "/images/linkedin.svg",
    color: "#0077B5",
    title: "LinkedIn",
  },
  facebook: {
    icon: "/images/facebook.svg",
    color: "#1877F2",
    title: "Facebook",
  },
  twitter: { icon: "/images/twitter.svg", color: "#1DA1F2", title: "Twitter" },
  youtube: { icon: "/images/youtube.svg", color: "#FF0000", title: "YouTube" },
  github: { icon: "/images/github.svg", color: "#181717", title: "GitHub" },
  reddit: { icon: "/images/reddit.svg", color: "#FF4500", title: "Reddit" },
  pinterest: {
    icon: "/images/pinterest.svg",
    color: "#E60023",
    title: "Pinterest",
  },
  snapchat: {
    icon: "/images/snapchat.svg",
    color: "#FFFC00",
    title: "Snapchat",
  },
  tiktok: { icon: "/images/tiktok.svg", color: "#69C9D0", title: "TikTok" },
  medium: { icon: "/images/medium.svg", color: "#00AB6C", title: "Medium" },
  dribbble: {
    icon: "/images/dribbble.svg",
    color: "#EA4C89",
    title: "Dribbble",
  },
  behance: { icon: "/images/behance.svg", color: "#1769FF", title: "Behance" },
  whatsapp: {
    icon: "/images/whatsapp.svg",
    color: "#25D366",
    title: "WhatsApp",
  },
  spotify: { icon: "/images/spotify.svg", color: "#1DB954", title: "Spotify" },
  soundcloud: {
    icon: "/images/soundcloud.svg",
    color: "#FF5500",
    title: "SoundCloud",
  },
  twitch: { icon: "/images/twitch.svg", color: "#9146FF", title: "Twitch" },
  discord: { icon: "/images/discord.svg", color: "#5865F2", title: "Discord" },
  slack: { icon: "/images/slack.svg", color: "#4A154B", title: "Slack" },
  calendly: {
    icon: "/images/calendly.svg",
    color: "#006BFF",
    title: "Calendly",
  },
  // Add more mappings as needed
};

const getIconForLink = (link: string) => {
  let platform = "";
  if (link.includes("instagram.com")) platform = "instagram";
  else if (link.includes("linkedin.com")) platform = "linkedin";
  else if (link.includes("facebook.com")) platform = "facebook";
  else if (link.includes("twitter.com")) platform = "twitter";
  else if (link.includes("youtube.com")) platform = "youtube";
  else if (link.includes("github.com")) platform = "github";
  else if (link.includes("reddit.com")) platform = "reddit";
  else if (link.includes("pinterest.com")) platform = "pinterest";
  else if (link.includes("snapchat.com")) platform = "snapchat";
  else if (link.includes("tiktok.com")) platform = "tiktok";
  else if (link.includes("medium.com")) platform = "medium";
  else if (link.includes("dribbble.com")) platform = "dribbble";
  else if (link.includes("behance.net")) platform = "behance";
  else if (link.includes("whatsapp.com")) platform = "whatsapp";
  else if (link.includes("spotify.com")) platform = "spotify";
  else if (link.includes("soundcloud.com")) platform = "soundcloud";
  else if (link.includes("twitch.tv")) platform = "twitch";
  else if (link.includes("discord.com")) platform = "discord";
  else if (link.includes("slack.com")) platform = "slack";
  else if (link.includes("calendly.com")) platform = "calendly";
  // Default icon, color, and title
  return (
    platformMapping[platform] || {
      icon: "/images/3.svg",
      color: "#000000",
      title: "Other",
    }
  );
};

const LinkComponent: React.FC<ILink> = ({ name, placeholder, link = "#" }) => {
  const [title, setTitle] = useState<string>("Other");
  const [linkref, setLink] = useState<string>(link || "");
  const [icon, setIcon] = useState<string>("/images/3.svg");
  const [borderColor, setBorderColor] = useState<string>("#000000");

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    const { icon, color, title } = getIconForLink(e.target.value);
    setIcon(icon);
    setBorderColor(color);
    setTitle(title);
  };

  const onAddClick = () => {
    toast.success("Link updated successfully!");
  };

  useEffect(() => {
    // setTitle(name);
    setLink(link || "");
    const { icon, color, title } = getIconForLink(link || "");
    setIcon(icon);
    setBorderColor(color);
    setTitle(title);
  }, [link, name]);

  return (
    <Link href={link}>
      <div
        className="border-2 border-dashed p-4 flex flex-row gap-5 w-[300px] rounded-[16px] text-[#050401] px-7 overflow-clip text-ellipsis"
        style={{ borderColor }}
      >
        <Image src={icon} alt={title} width={64} height={64} />
        <div className="flex flex-col gap-0.5 items-start justify-center">
          <h3 className="text-2xl euclid font-medium outline-none bg-transparent">
            {title}
          </h3>
          <h4 className="text-ellipsis max-w-[75%] overflow-clip">{link}</h4>
        </div>
      </div>
    </Link>
  );
};

export default LinkComponent;
