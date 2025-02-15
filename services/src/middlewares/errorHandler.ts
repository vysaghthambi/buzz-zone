import { NextFunction, Request, Response } from "express";

export default function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err.stack);
  res.status(500).json({ message: err.message ?? "Something went wrong!" });
}
