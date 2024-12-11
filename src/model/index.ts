import mongoose from "mongoose";
import { app_db_connect_string } from "../config";
import { User_Schema } from "./users";
import { FriendListSchema } from "./friendList";

const appDBName = "MyProject";
export const appConnection = mongoose.createConnection(app_db_connect_string, {
  dbName: appDBName,
});

appConnection.once("open", async () => {
  console.log(`Connected to DB: ${appDBName}`);
});

export const UserModel = appConnection.model("user_model", User_Schema);
export const FriendListModel = appConnection.model("friend_list", FriendListSchema);
