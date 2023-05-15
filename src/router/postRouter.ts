import express from "express";
import { PostsController } from "../controller/PostsController";
import { PostsBusiness } from "../business/PostsBusiness";
import { PostsDatabase } from "../database/PostsDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { UserDatabase } from "../database/UserDatabase";
import { TokenManager } from "../services/TokenManager";

export const postsRouter = express.Router();

const postsController = new PostsController(
  new PostsBusiness(
    new PostsDatabase(),
    new UserDatabase(),
    new IdGenerator(),
    new TokenManager()
  )
);

postsRouter.get("/", postsController.getPosts);
postsRouter.post("/", postsController.createPost);
postsRouter.put("/:id", postsController.editPost);
postsRouter.put("/:id/like", postsController.putLike);
postsRouter.delete("/:id", postsController.deletePost);
