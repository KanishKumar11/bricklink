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
        link: "https://kanishkumar.in/",
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
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        images: ["/images/p1.svg", "/images/p2.svg"],
        subHeading: "UI/UX design for an NFT holding company",
        cta: "Read case study",
        link: "https://instagram.com/portfolio",
      },
    },
    {
      type: "Portfolio",
      data: {
        title: "Vista : website design",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        images: ["/images/p1.svg", "/images/p2.svg"],
        subHeading: "UI/UX design for an NFT holding company",
        cta: "Read case study",
        link: "https://instagram.com/portfolio",
      },
    },
    {
      type: "Portfolio",
      data: {
        title: "Vista : website design",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        images: ["/images/p1.svg", "/images/p2.svg"],
        subHeading: "UI/UX design for an NFT holding company",
        cta: "Read case study",
        link: "https://instagram.com/portfolio",
      },
    },
    {
      type: "Portfolio",
      data: {
        title: "Vista : website design",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        images: ["/images/p1.svg"],
        subHeading: "UI/UX design for an NFT holding company",
        cta: "Read case study",
        link: "https://instagram.com/portfolio",
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
