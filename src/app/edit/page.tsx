"use client";
import React, { useState } from "react";
import { IUser, IUserPage } from "@/interfaces";
import UserPage from "@/components/pages/UserPage";

// Dummy data for demonstration
const dummyUserPage: IUserPage = {
  username: "samked",
  bio: "A passionate web developer.",
  tags: ["JavaScript", "React", "UI/UX Designer"],
  components: [
    {
      type: "Heading",
      data: {
        heading: "Links",
      },
    },
    {
      type: "Link",
      data: {
        link: "https://instagram.com/johndoe",
      },
    },
    {
      type: "Link",
      data: {
        link: "https://medium.com/johndoe",
      },
    },
    {
      type: "Link",
      data: {
        link: "https://github.com/johndoe",
      },
    },
    {
      type: "Link",
      data: {
        link: "https://tiktok.com/johndoe",
      },
    },
    {
      type: "Link",
      data: {
        link: "https://calendly.com/johndoe",
      },
    },
    {
      type: "Link",
      data: {
        link: "https://kanishkumar.in/johndoe",
      },
    },
    {
      type: "Link",
      data: {
        link: "https://whatsapp.com/johndoe",
      },
    },
    {
      type: "Image",
      data: {
        imageUrl: "https://via.placeholder.com/150",
        height: 150,
        width: 150,
      },
    },
    {
      type: "Text",
      data: {
        text: "Hello, I am John Doe, a web developer specializing in modern JavaScript frameworks.",
      },
    },
    {
      type: "Heading",
      data: {
        heading: "My Projects",
      },
    },
    {
      type: "Portfolio",
      data: {
        title: "Vista : website design",
        description: "A collection of my personal projects and contributions.",
        images: ["/images/p1.svg", "/images/p2.svg"],
        subHeading: "UI/UX design for an NFT holding company",
        cta: "Read case study",
        link: "https://johndoe.com/portfolio",
      },
    },
    {
      type: "Portfolio",
      data: {
        title: "Personal Portfolio2",
        description: "A collection of my personal projects and contributions.",
        images: [
          "https://via.placeholder.com/200",
          "https://via.placeholder.com/200",
        ],
        subHeading: "Web Development Projects",
        cta: "View More",
        link: "https://johndoe.com/portfolio",
      },
    },
    {
      type: "Portfolio",
      data: {
        title: "Personal Portfolio3",
        description: "A collection of my personal projects and contributions.",
        images: [
          "https://via.placeholder.com/200",
          "https://via.placeholder.com/200",
        ],
        subHeading: "Web Development Projects",
        cta: "View More",
        link: "https://johndoe.com/portfolio",
      },
    },
  ],
};
const dummyUser: IUser = {
  username: "samked",
  email: "samked@gmail.com",
  avatar: "/images/dummy.svg",
  name: "Sampreet s kulkarni",
};
const Page: React.FC = () => {
  const [userPage, setUserPage] = useState<IUserPage>(dummyUserPage);

  return (
    <div>
      <UserPage page={userPage} user={dummyUser} />
    </div>
  );
};

export default Page;
