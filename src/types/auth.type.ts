import { z } from "zod";
import { loginSchema, signUpSchema } from "../utils/vaildations/auth.validation";

export type LoginInput = z.infer<typeof loginSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;

