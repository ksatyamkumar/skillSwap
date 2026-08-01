import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),

  password: z
  .string()
  .min(8, "Password must be at least 8 characters")
});

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(2),

  email: z.email(),

  password: z
    .string()
    .min(8),
});

export type LoginFormData =
  z.infer<typeof loginSchema>;


export type RegisterFormData =
  z.infer<typeof registerSchema>;

