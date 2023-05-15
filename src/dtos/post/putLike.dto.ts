import z from "zod";

export interface PutLikeInputDTO {
  postId: string;
  like: boolean;
  token: string;
}

export interface PutLikeOutputDTO {
  message: string;
}

export const PutLikeInputSchema = z
  .object({
    postId: z
      .string({
        required_error: "'postId' é obrigatório para concluir a requisição",
        invalid_type_error: "'postId' deve ser do tipo string",
      })
      .min(0),
    like: z.boolean({
      required_error: "'like' é obrigatório para concluir a requisição",
      invalid_type_error: "'like' deve ser do tipo boolean",
    }),
    token: z
      .string({
        required_error:
          "Um token válido é obrigatório para concluir a requisição",
        invalid_type_error: "Token deve ser do tipo string",
      })
      .min(0),
  })
  .transform((data) => data as PutLikeInputDTO);
