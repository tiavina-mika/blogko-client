import { z } from "zod";
import { loginSchema } from "../utils/vaildations/auth.validation";

export type LoginInput = z.infer<typeof loginSchema>;
