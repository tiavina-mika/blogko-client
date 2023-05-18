import { z } from "zod";

const passwordFieldSchema = z.string()
  .min(8, "Password should have at least 8 characters")
  .max(64, "Password should have 64 characters maximum");

const userSchema = z.object({
  email: z.string()
    .email({ message: "Email required" })
    .max(120, "Email should have 120 characters maximum")
    .refine(value => value.toLowerCase()),
  password: passwordFieldSchema,
});

export const loginSchema = userSchema.pick({ email: true, password: true });