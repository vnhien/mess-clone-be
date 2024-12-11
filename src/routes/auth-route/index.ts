import express, { Request, Response } from "express";
import { login, register } from "../../controller/user-controller";
import { errorHandler } from "../../helper/error-handler";

const router = express.Router();

router.get("/login", async (req: Request, res: Response) => {
  try {
    const result = await login(req);
    res.json(result);
  } catch (error) {
    errorHandler(res, error);
  }
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    const result = await register(req);
    res.json(result);
  } catch (error) {
    console.log("🚀 ~ router.post ~ error:", error);
    errorHandler(res, error);
  }
});

export { router as authRouter };
