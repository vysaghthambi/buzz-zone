import { NextFunction, Request, Response } from "express";
import db from "../lib/db";

const postController = {
  getAllPosts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [results] = await db.promise().query(
        `
          SELECT p.id, p.content, u.name as author, p.created_at as createdAt, p.updated_at as updatedAt
          FROM posts p 
          JOIN users u ON u.id = p.authorId
          WHERE isDraft=false AND email <> ? 
          ORDER BY p.created_at DESC
        `,
        [req.user?.email]
      );

      res.status(200).json({ posts: results });
    } catch (error) {
      console.error(error);
      next(new Error("Something went wrong!"));
    }
  },

  getUserPosts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [results] = await db.promise().query(
        `
          SELECT p.id, p.content, u.name as author, p.created_at as createdAt, p.updated_at as updatedAt
          FROM posts p 
          JOIN users u ON u.id = p.authorId
          WHERE isDraft = false AND email = ? 
          ORDER BY p.created_at DESC
        `,
        [req.user?.email]
      );

      res.status(200).json({ posts: results });
    } catch (error) {
      console.error(error);
      next(new Error("Something went wrong!"));
    }
  },

  createPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      await db
        .promise()
        .query(
          `INSERT INTO posts (content, authorId, isDraft) VALUES (?, ?, ?)`,
          [body.content, body.authorId, body.isDraft]
        );

      res.status(200).json({ message: "Post created successfully" });
    } catch (error) {
      console.error(error);
      next(new Error("Something went wrong!"));
    }
  },

  updatePost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: postId } = req.params;
      const body = req.body;

      await db.promise().query(
        `
          UPDATE posts 
          SET content = ?, isDraft = ?
          WHERE id = ?
        `,
        [body.content, body.isDraft, postId]
      );

      res.status(200).json({ message: "Post updated successfully" });
    } catch (error) {
      console.error(error);
      next(new Error("Something went wrong!"));
    }
  },

  deletePost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: postId } = req.params;

      await db.promise().query(`DELETE FROM posts WHERE id = ?`, [postId]);

      res.status(200).json({ message: "Post updated successfully" });
    } catch (error) {
      console.error(error);
      next(new Error("Something went wrong!"));
    }
  },
};

export default postController;
