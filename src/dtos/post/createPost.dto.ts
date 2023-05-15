import z from "zod";

export interface CreatePostInputDTO {
  content: string;
  token: string;
}

export interface CreatePostOutputDTO {
  message: string;
}

export const CreatePostInputSchema = z
  .object({
    content: z
      .string({
        required_error: "É obrigatório informar um 'content'",
        invalid_type_error: "'content' deve ter o tipo string",
      })
      .min(0),
    token: z
      .string({
        required_error:
          "Um token válido é obrigatório para concluir a requisição",
        invalid_type_error: "Token deve ser do tipo string",
      })
      .min(0),
  })
  .transform((data) => data as CreatePostInputDTO);
