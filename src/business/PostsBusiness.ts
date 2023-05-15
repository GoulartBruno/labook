import { PostsDatabase } from "../database/PostsDatabase";
import { UserDatabase } from "../database/UserDatabase";
import {
  CreatePostInputDTO,
  CreatePostOutputDTO,
} from "../dtos/post/createPost.dto";
import {
  DeletePostInputDTO,
  DeletePostOutputDTO,
} from "../dtos/post/deletePost.dto";
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/post/editPost.dto";
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/post/getPosts.dto";
import { PutLikeInputDTO, PutLikeOutputDTO } from "../dtos/post/putLike.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { Post } from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { InputLikeDB } from "../types/InputLikeDB";
import {
  EditedPostToDB,
  PostInputDB,
  PostOutputDB,
  PostRawDB,
} from "../types/PostDB";

export class PostsBusiness {
  constructor(
    private postsDatabase: PostsDatabase,
    private usersDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  public getPosts = async (
    input: GetPostsInputDTO
  ): Promise<GetPostsOutputDTO[]> => {
    const { token, query } = input;

    const isTokenValid = this.tokenManager.getPayload(token);

    if (!isTokenValid) {
      throw new BadRequestError("Token inválido");
    }

    const posts: PostOutputDB[] = await this.postsDatabase.getPosts(query);

    const checkedPosts: Post[] = posts.map(
      (post) =>
        new Post(
          post.id,
          post.content,
          post.likes,
          post.dislikes,
          post.created_at,
          post.updated_at,
          { id: post.creator_id, name: post.name }
        )
    );

    const output: GetPostsOutputDTO[] = checkedPosts.map((post) => {
      return {
        id: post.getId(),
        content: post.getContent(),
        likes: post.getLikes(),
        dislikes: post.getDislikes(),
        createdAt: post.getCreatedAt(),
        updatedAt: post.getUpdatedAt(),
        creator: post.getCreator(),
      };
    });
    return output;
  };

  public createPost = async (
    input: CreatePostInputDTO
  ): Promise<CreatePostOutputDTO> => {
    const { content, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const newPost: PostInputDB = {
      id: this.idGenerator.generate() as string,
      creator_id: payload.id as string,
      content: content as string,
    };

    const postExists = await this.postsDatabase.getPostByIdDBForm(newPost.id);

    if (postExists) {
      throw new BadRequestError("Post já existe.");
    }

    await this.postsDatabase.createPost(newPost);

    const output: CreatePostOutputDTO = {
      message: "Post criado com sucesso.",
    };
    return output;
  };

  public editPost = async (
    input: EditPostInputDTO
  ): Promise<EditPostOutputDTO> => {
    const { idToEdit, newContent, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const postToEdit: PostOutputDB | undefined =
      await this.postsDatabase.getPostByIdOutputForm(idToEdit);

    if (!postToEdit) {
      throw new NotFoundError("Não há post correspondente ao 'id' informado");
    }

    if (payload.id !== postToEdit.creator_id) {
      throw new BadRequestError(
        "O post deve pertencer ao usuário logado para que possa editá-lo"
      );
    }

    const inputDB: EditedPostToDB = {
      idToEdit,
      newPost: {
        content: newContent,
        updated_at: new Date().toISOString(),
      },
    };
    await this.postsDatabase.editPost(inputDB);

    const output: EditPostOutputDTO = {
      message: "Post modificado com sucesso.",
    };
    return output;
  };

  public putLike = async (
    input: PutLikeInputDTO
  ): Promise<DeletePostOutputDTO> => {
    const { postId, like, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const userId = payload.id;

    const inputLikeDB: InputLikeDB = {
      userId,
      postId,
      like,
    };

    const postDB = await this.postsDatabase.getPostByIdDBForm(postId);

    if (!postDB) {
      throw new NotFoundError("Post não existe.");
    }

    const userDB = await this.usersDatabase.findUserById(userId);

    if (!userDB) {
      throw new NotFoundError("Usuário não existe.");
    }

    if (postDB?.creator_id === userId) {
      throw new BadRequestError("O usuário não pode reagir ao próprio post.");
    }

    const likeDB = await this.postsDatabase.getLike(inputLikeDB);

    let output: PutLikeOutputDTO = {
      message: "",
    };

    if (!likeDB) {
      await this.postsDatabase.createLike(inputLikeDB);
      await this.postsDatabase.addLikeInPost(inputLikeDB);
      output.message = "Like/Dislike enviado com sucesso.";
    } else {
      if (likeDB.like === like) {
        await this.postsDatabase.deleteLike(inputLikeDB);

        await this.postsDatabase.decreaseLikeInPost(inputLikeDB);
        output.message = "Like/Dislike removido com sucesso.";
      } else {
        await this.postsDatabase.changeLike(inputLikeDB);

        await this.postsDatabase.overwriteLikeInPost(inputLikeDB);
        output.message = "Like/Dislike alterado com sucesso.";
      }
    }
    return output;
  };

  public deletePost = async (
    input: DeletePostInputDTO
  ): Promise<DeletePostOutputDTO> => {
    const { idToDelete, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const postExists = await this.postsDatabase.getPostByIdDBForm(idToDelete);
    if (!postExists) {
      throw new NotFoundError("'id' informado não possui posts.");
    }

    if (payload.id !== postExists.creator_id) {
      throw new BadRequestError(
        "O post deve pertencer ao usuário logado para que possa deletá-lo"
      );
    }

    await this.postsDatabase.deletePost(idToDelete);
    const output: DeletePostOutputDTO = {
      message: "Post deletado com sucesso.",
    };
    return output;
  };
}
