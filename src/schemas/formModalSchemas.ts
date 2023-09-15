import { z } from "zod";

export const formModalSchema = z.object({
  country: z.string().nonempty("O dia é obrigatório"),
  cases: z
    .string()
    .nonempty("A quantidade de casos é obrigatório")
    .regex(/^([0-9])+$/, "Digite apenas números"),
  confirmed: z
    .string()
    .nonempty("A quantidade de casos é obrigatório")
    .regex(/^([0-9])+$/, "Digite apenas números"),
  recovered: z
    .string()
    .nonempty("A quantidade de casos é obrigatório")
    .regex(/^([0-9])+$/, "Digite apenas números"),
  deaths: z
    .string()
    .nonempty("A quantidade de casos é obrigatório")
    .regex(/^([0-9])+$/, "Digite apenas números"),
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

export type FormModalData = z.infer<typeof formModalSchema>;
