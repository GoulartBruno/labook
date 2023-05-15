import z from "zod";

export interface DeletePostInputDTO {
  idToDelete: string;
  token: string;
}

export interface DeletePostOutputDTO {
  message: string;
}

export const DeletePostInputSchema = z
  .object({
    idToDelete: z
      .string({
        required_error: "Um 'id' é obrigatório para concluir a requisição",
        invalid_type_error: "'id' deve ser do tipo string",
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
  .transform((data) => data as DeletePostInputDTO);
