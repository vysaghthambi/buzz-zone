import { NextFunction, Request, Response } from "express";
import { RowDataPacket } from "mysql2";

import db from "../lib/db";

const userController = {
  getUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      const [results] = await db
        .promise()
        .query<RowDataPacket[]>(
          `SELECT * FROM users WHERE email="${req.user?.email}"`
        );

      if (!results.length) {
        console.log("User not found, Creating User...");

        await db
          .promise()
          .query(`INSERT INTO users (name,email) VALUES (?, ?)`, [
            user?.displayName,
            user?.email,
          ]);

        console.log("User Created, Fetching user data...");

        const [results] = await db
          .promise()
          .query<RowDataPacket[]>(
            `SELECT * FROM users WHERE email="${req.user?.email}"`
          );

        console.log("Fetched user data:", results[0]);

        res.status(200).json({ user: results[0] });

        return;
      }

      console.log("Fetched user data:", results[0]);

      res.status(200).json({ user: results[0] });
    } catch (error) {
      console.error(error);
      throw new Error("Error in getting user");
    }
  },
};

export default userController;
