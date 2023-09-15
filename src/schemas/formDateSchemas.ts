import { z } from "zod";

export const formDateSchema = z.object({
  day: z
    .string()
    .nonempty("O dia é obrigatório")
    .length(2, "O dia deve ter 2 caracteres")
    .regex(/^([0-9])+$/, "Digite apenas números")
    .regex(/^[0-3][0-9]$/, "Digite um dia válido"),

  month: z
    .string()
    .nonempty("O mês é obrigatório")
    .length(2, "O mês deve ter 2 caracteres")
    .regex(/^([0-9])+$/, "Digite apenas números"),
  year: z
    .string()
    .nonempty("O ano é obrigatório")
    .length(4, "O ano deve ter 4 caracteres")
    .regex(/^([0-9])+$/, "Digite apenas números"),
});

export type FormDateData = z.infer<typeof formDateSchema>;
