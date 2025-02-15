import { Request, Response, NextFunction } from "express";
import admin from "../lib/firebase";

export default async function authenticateToken(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      throw new Error("Unauthorized");
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const user = await admin.auth().getUser(decodedToken.uid);

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}
