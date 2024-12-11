import { Request } from "express";

export class AppError extends Error {
  public statusCode: number | undefined;
  constructor(msg?: string, errorCode?: number) {
    super(msg);
    this.message = this.message;
    this.statusCode = errorCode;
  }
}

export type ExtendedRequest = Request & {
  userVerifiedData?: {
    userId: string;
  };
  file?: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  };
};
