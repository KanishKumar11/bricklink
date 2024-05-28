import mongoose, { Schema } from "mongoose";
import { IUser } from "@/interfaces";

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, lowercase: true },
  email: { type: String, required: true, lowercase: true },
  password: { type: String, required: false },
  name: { type: String, required: false },
  avatar: { type: String },
  page: { type: String, ref: "UserPage" },
});

const User = mongoose.models?.User || mongoose.model<IUser>("User", UserSchema);
export { User };
