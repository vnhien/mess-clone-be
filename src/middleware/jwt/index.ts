import { Request, Response } from "express";
import { verifyToken } from "../../utils";
import { ExtendedRequest } from "../../overide";

export const verifyJwt = async (req: ExtendedRequest, res: Response, next: any) => {
  if (!req.headers.authorization) {
    res.json({
      valid: false,
      err: "No token found",
    });
  } else {
    const result = await verifyToken(req.headers.authorization);
    if (result.valid) {
      req.userVerifiedData = result;
      next();
    } else {
      res.status(401);
      res.json({
        valid: false,
        err: "Invalid token",
      });
    }
  }
};
