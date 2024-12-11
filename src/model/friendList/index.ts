import { Schema } from "mongoose";

export interface IFriendListSchema {
  id: string;
  friends: {
    id: string;
    name: string;
  }[];
}
export const FriendListSchema = new Schema<IFriendListSchema>(
  {
    id: String,
    friends: {
      type: [
        {
          id: String,
          name: String,
        },
      ],
      default: [],
    },
  },
  { collection: "friend-list" }
);
