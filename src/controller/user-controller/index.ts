import { Request, Response } from "express";
import { FriendListModel, UserModel } from "../../model";
import { AppError, ExtendedRequest } from "../../overide";
import { hashString } from "../../utils";
import { uuid as v4 } from "uuidv4";
import jwt from "jsonwebtoken";
import { app_secret } from "../../config";

export async function login(req: Request) {
  const { userName, password } = req.query;
  if (!userName) {
    throw new AppError("User Name is empty", 400);
  }
  if (!password) {
    throw new AppError("Password is empty", 400);
  }
  const exsitingUser = await UserModel.findOne({
    userName: userName,
  });
  if (!exsitingUser) {
    throw new AppError("Invalid Username");
  }
  const hashedPassword = await hashString(password);
  if (hashedPassword !== exsitingUser.passwordHashed) {
    throw new AppError("Invalid Password", 400);
  }
  const userJwt = await jwt.sign(
    {
      userId: exsitingUser.id,
    },
    app_secret
  );
  return { jwt: userJwt, userId: exsitingUser.id };
}

export async function register(req: Request) {
  const { userName, password } = req.body;
  if (!userName) {
    throw new AppError("User Name is empty", 400);
  }

  if (!password) {
    throw new AppError("Password is empty", 400);
  }

  const exsitingUser = await UserModel.findOne({ userName: userName });

  if (exsitingUser) {
    throw new AppError("User Name existed", 400);
  }
  const hashedPassword = await hashString(String(password));
  const newUserId = v4();
  const newUser = new UserModel({
    avatar: "",
    id: newUserId,
    passwordHashed: hashedPassword,
    userName: userName,
  });
  await newUser.save();
  return { userId: newUserId };
}

export async function getUserPublicData(req: Request) {
  const { userId } = req.query;
  const user = await UserModel.findOne({ id: userId });
  if (!user) {
    throw new AppError("User not found", 400);
  }
  return { userName: user.userName, userId: user.id };
}
export async function getUserInfo(req: ExtendedRequest) {
  const { userId } = req.userVerifiedData || {};
  console.log("🚀 ~ getUserInfo ~ userId:", userId);
  if (!userId) {
    throw new AppError("user not found", 404);
  }
  const userData = await UserModel.findOne({ id: userId });
  if (!userData) {
    throw new AppError("user not found", 404);
  }
  return { userName: userData.userName, userId: userData.id };
}

export async function addFriend(req: ExtendedRequest) {
  const { friendId } = req.body;
  const { userId } = req.userVerifiedData || {};
  const user = await UserModel.findOne({ id: userId });
  if (!user) {
    throw new AppError("User not found", 400);
  }
  const friend = await UserModel.findOne({ id: friendId });
  if (!friend) {
    throw new AppError("Friend not found", 400);
  }
  const existingFriend = await FriendListModel.findOne({ id: userId });
  if (existingFriend) {
    if (existingFriend.friends.find((x) => x.id === friendId)) {
      throw new AppError("Friend already exists", 400);
    }
  }
  await FriendListModel.updateOne(
    { id: userId },
    {
      $addToSet: {
        friends: {
          id: friendId,
          name: friend.userName,
        },
      },
    },
    { upsert: true }
  );
  return { message: "Success" };
}

export async function getFriendList(req: ExtendedRequest) {
  const { userId } = req.userVerifiedData || {};
  if (!userId) {
    throw new AppError("user not found", 400);
  }
  const userData = await UserModel.findOne({ id: userId });
  if (!userData) {
    throw new AppError("User not found", 400);
  }
  const friendData = await FriendListModel.findOne({ id: userId });
  return {
    userId: userId,
    friends:
      friendData?.friends?.map((i) => ({
        id: i.id,
        name: i.name,
      })) || [],
  };
}
