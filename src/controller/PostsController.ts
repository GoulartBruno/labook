import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";
import { PostsBusiness } from "../business/PostsBusiness";
import { GetPostsOutputDTO, GetPostsSchema } from "../dtos/post/getPosts.dto";
import { CreatePostInputSchema } from "../dtos/post/createPost.dto";
import { EditPostInputSchema } from "../dtos/post/editPost.dto";
import { PutLikeInputSchema } from "../dtos/post/putLike.dto";
import { ZodError } from "zod";
import { DeletePostInputSchema } from "../dtos/post/deletePost.dto";

export class PostsController {
  constructor(private postsBusiness: PostsBusiness) {}

  public getPosts = async (req: Request, res: Response) => {
    try {
      const input = GetPostsSchema.parse({
        token: req.headers.authorization as string,
        query: req.query.q as string,
      });

      const output: GetPostsOutputDTO[] = await this.postsBusiness.getPosts(
        input
      );
      res.status(200).send(output);
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public createPost = async (req: Request, res: Response) => {
    try {
      const content = req.body.content;
      const token = req.headers.authorization;
      const input = CreatePostInputSchema.parse({
        content,
        token,
      });
      const output = await this.postsBusiness.createPost(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public editPost = async (req: Request, res: Response) => {
    try {
      const input = EditPostInputSchema.parse({
        idToEdit: req.params.id,
        newContent: req.body.content,
        token: req.headers.authorization,
      });

      const output = await this.postsBusiness.editPost(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public putLike = async (req: Request, res: Response) => {
    try {
      const input = PutLikeInputSchema.parse({
        postId: req.params.id,
        like: req.body.like,
        token: req.headers.authorization,
      });

      const output = await this.postsBusiness.putLike(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public deletePost = async (req: Request, res: Response) => {
    try {
      const input = DeletePostInputSchema.parse({
        idToDelete: req.params.id as string,
        token: req.headers.authorization as string,
      });

      const output = await this.postsBusiness.deletePost(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}
