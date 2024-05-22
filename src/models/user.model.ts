import mongoose, { Document, Schema } from "mongoose";

interface Link {
  name?: string;
  icon?: string;
  brand?: string;
  color: string;
  placeholder?: string;
  link?: string;
  key: number;
}

export interface User extends Document {
  username: string;
  email: string;
  password?: string;
  name: string;
  avatar?: string;
  bio?: string;
  tags?: [string];
  links?: Link[];
  linkSectionTitle?: string;
  imagesSectionTitle?: string;
  images?: string[];
}
const linkSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  key: {
    type: Number,
    required: true,
  },
  icon: {
    type: String,
    required: false,
  },
  brand: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: false,
  },
});

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: false,
    select: false,
    default: null,
  },
  avatar: {
    type: String,
    required: false,
    default: null,
  },
  bio: {
    type: String,
    required: false,
    default: null,
  },
  tags: {
    type: [String],
    required: false,
    default: [null],
  },
  linkSectionTitle: {
    type: String,
    required: false,
    default: "Links",
  },
  imagesSectionTitle: {
    type: String,
    required: false,
    default: "Images",
  },
  links: {
    type: [linkSchema],
    required: false,
    default: [
      {
        name: "Instagram",
        icon: "/images/2.svg",
        brand: "instagram",
        color: "#D62976",
        placeholder: "Add your insta link",
        link: "",
        key: 1,
      },
    ],
  },
  images: {
    type: [String],
    required: false,
    default: ["/images/4.png"],
  },
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
