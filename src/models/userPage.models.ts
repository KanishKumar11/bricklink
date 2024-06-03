import mongoose, { Schema, Document } from "mongoose";

// Interface for Link component
interface ILink {
  name: string;
  color: string;
  placeholder: string;
  link: string;
}

// Interface for Image component
interface IImage {
  imageUrl: string;
  height: number;
  width: number;
}

// Interface for Text component
interface IText {
  text: string;
  textColor: string;
  bgColor: string;
}

// Interface for Heading component
interface IHeading {
  heading: string;
  color: string;
}

// Interface for Portfolio component
interface IPortfolio {
  title: string;
  description: string;
  images: string[];
  subHeading: string;
  cta: string;
  link: string;
}

// Interface for UserPage
interface IUserPage extends Document {
  username: string; // Add username field
  bio?: string;
  tags: string[];
  components: (ILink | IImage | IText | IHeading | IPortfolio)[];
}

// Define schemas for each component
const LinkSchema: Schema = new Schema({
  name: { type: String, required: false },
  color: { type: String, required: false },
  placeholder: { type: String, required: false },
  link: { type: String, required: true },
});

const ImageSchema: Schema = new Schema({
  imageUrl: { type: String, required: true },
  height: { type: Number, required: true },
  width: { type: Number, required: true },
});

const TextSchema: Schema = new Schema({
  text: { type: String, required: true },
  textColor: { type: String, required: false },
  bgColor: { type: String, required: false },
});

const HeadingSchema: Schema = new Schema({
  heading: { type: String, required: true },
  color: { type: String, required: false },
});

const PortfolioSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String, required: true }],
  subHeading: { type: String, required: true },
  cta: { type: String, required: false },
  link: { type: String, required: false },
});

// UserPage schema
const UserPageSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  bio: { type: String },
  tags: { type: [String], required: false },
  components: {
    type: [
      {
        type: new Schema(
          {
            type: {
              type: String,
              enum: ["Link", "Image", "Text", "Heading", "Portfolio"],
              required: true,
            },
            data: { type: Schema.Types.Mixed, required: true },
          },
          { _id: false }
        ),
      },
    ],
    required: true,
  },
});

const UserPage =
  mongoose.models?.UserPage ||
  mongoose.model<IUserPage>("UserPage", UserPageSchema);

export { UserPage };
