import { Model, Schema } from "mongoose";

export type User_Schema = {
  id: string;
  userName: string;
  passwordHashed: string;
  avatar?: string;
};

export const User_Schema = new Schema<User_Schema>(
  {
    avatar: String,
    id: String,
    userName: String,
    passwordHashed: String,
  },
  {
    collection: "users",
  }
);
