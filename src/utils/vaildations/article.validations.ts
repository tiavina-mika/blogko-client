import { z } from "zod";

export const articleSchema = z.object({
  title: z.string({
    required_error: "Obligatoire",
    invalid_type_error: "Tsy soratra",
  })
})