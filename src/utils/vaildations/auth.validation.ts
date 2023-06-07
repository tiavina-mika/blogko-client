import { z } from "zod";
import { capitalizeFirstLetter } from "../utils";

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

const passwordConfirmationSchema = z.string().min(
  1,
  "Password confirmation required",
);

export const signUpSchema = userSchema
  .extend({
    passwordConfirmation: passwordConfirmationSchema,
    lastName: z.string()
      .min(1, 'Last name required')
      .max(112, 'Last name should have 112 characters maximum')
      .transform(capitalizeFirstLetter),
    firstName: z.string()
      .max(112, 'First name should have 112 characters maximum')
      .optional()
      .transform((value: any) => (value ? capitalizeFirstLetter(value) : '')),
  })
  // compare the password and confirm password fields
  .refine(value => value.password === value.passwordConfirmation, {
    message: "Password do not match",
    path: ['passwordConfirmation'],
  });