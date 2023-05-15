import z from "zod";

export interface GetPostsInputDTO {
  token: string;
  query: string | undefined;
}

export interface GetPostsOutputDTO {
  id: string;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
  creator: {
    id: string;
    name: string;
  };
}

export const GetPostsSchema = z
  .object({
    token: z.string({
      required_error:
        "Um token válido é obrigatório para concluir a requisição",
      invalid_type_error: "Token deve ser do tipo string",
    }),
    query: z
      .string({ invalid_type_error: "A query deve ser do tipo string" })
      .min(0)
      .optional(),
  })
  .transform((data) => data as GetPostsInputDTO);
