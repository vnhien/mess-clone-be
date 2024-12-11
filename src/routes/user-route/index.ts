import express, { Request, Response } from "express";
import { verifyJwt } from "../../middleware/jwt";
import { ExtendedRequest } from "../../overide";
import {
  addFriend,
  getFriendList,
  getUserInfo,
  getUserPublicData,
} from "../../controller/user-controller";
import { errorHandler } from "../../helper/error-handler";

const router = express.Router();

router.get("/friendList", verifyJwt, async (req: ExtendedRequest, res: Response) => {
  try {
    const result = await getFriendList(req);
    res.json(result);
  } catch (error) {
    errorHandler(res, error);
  }
});

router.post("/addFriend", verifyJwt, async (req: ExtendedRequest, res: Response) => {
  try {
    const result = await addFriend(req);
    res.json(result);
  } catch (error) {
    errorHandler(res, error);
  }
});

router.get("/userInfo", async (req: ExtendedRequest, res: Response) => {
  try {
    const result = await getUserPublicData(req);
    res.json(result);
  } catch (error) {
    errorHandler(res, error);
  }
});

router.get("/profile", verifyJwt, async (req: ExtendedRequest, res: Response) => {
  try {
    const result = await getUserInfo(req);
    res.json(result);
  } catch (error) {
    errorHandler(res, error);
  }
});

export { router as userRouter };
