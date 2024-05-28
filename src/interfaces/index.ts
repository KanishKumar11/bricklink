export interface ILink {
  name?: string;
  color?: string;
  placeholder?: string;
  link: string;
}

export interface IImage {
  imageUrl: string;
  height: number;
  width: number;
}

export interface IText {
  text: string;
  textColor?: string;
  bgColor?: string;
}

export interface IHeading {
  heading: string;
  color?: string;
}

export interface IPortfolio {
  title: string;
  description: string;
  images: string[];
  subHeading: string;
  cta: string;
  link: string;
}

// Define user and user page interfaces
export interface IUserPage {
  username: string;
  bio?: string;
  tags: string[];
  components: IComponent[];
}

export type IComponent =
  | { type: "Link"; data: ILink }
  | { type: "Image"; data: IImage }
  | { type: "Text"; data: IText }
  | { type: "Heading"; data: IHeading }
  | { type: "Portfolio"; data: IPortfolio };

export interface IUser {
  username: string;
  name?: string;
  email: string;
  password?: string;
  avatar?: string;
  page?: IUserPage;
}
