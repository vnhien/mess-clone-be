import express from "express";
import { generateUser } from "../../controller/dev";
import { errorHandler } from "../../helper/error-handler";

const router = express.Router();

router.post("/generateUser", async (req, res) => {
  const { userNum } = req.query || {};
  try {
    const result = await generateUser(Number(userNum || 10));
    return result;
  } catch (error) {
    errorHandler(res, error);
  }
});

export { router as devRouter };
