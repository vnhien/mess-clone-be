import { Response } from "express";
import { AppError } from "../../overide";

export function errorHandler(res: Response, err: unknown) {
  const appError = err as AppError;
  const statusCode = appError.statusCode || 500;
  const message = appError.message || "unknow error";
  res.status(statusCode);
  res.statusMessage = message;
  res.end();
}
