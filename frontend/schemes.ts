import { z } from "zod";
export const signinScheme = z.object({
  email: z
    .string()
    .min(3, "Your email is requires")
    .email("invalid Email address"),
  password: z.string().min(3, "Password is required"),
});
