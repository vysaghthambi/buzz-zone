import express from "express";
import postController from "../controllers/postController";

const router = express.Router();

router
  .route("/")
  .get(postController.getAllPosts)
  .post(postController.createPost);

router.route("/user").get(postController.getUserPosts);

router
  .route("/:id")
  .put(postController.updatePost)
  .delete(postController.deletePost);

export default router;
