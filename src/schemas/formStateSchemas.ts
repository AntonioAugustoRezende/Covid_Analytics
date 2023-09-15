import { z } from "zod";

export const formStateSchema = z.object({
  data: z.string(),
});

export type FormStateData = z.infer<typeof formStateSchema>;
