import { z } from "zod";

export const articleSchema = z.object({
  title: z.number({
    required_error: "Obligatoire",
    invalid_type_error: "Tsy soratra",
  })
})