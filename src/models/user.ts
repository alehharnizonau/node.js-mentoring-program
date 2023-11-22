import { model, Schema } from "mongoose";
import { IUser } from "../types";

export const UserSchema = new Schema<IUser>({
  email: { type: String, unique: true },
  password: { type: String },
  role: { type: String },
});

export const User = model("User", UserSchema);
