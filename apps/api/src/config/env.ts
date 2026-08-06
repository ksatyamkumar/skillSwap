import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  NODE_ENV: z.enum(["development", "production", "test"]),
  CLIENT_URL: z.string().url(),
  MONGODB_URI: z.string(),

  JWT_SECRET: z.string().min(20),

JWT_EXPIRES_IN: z.string(),

REFRESH_TOKEN_SECRET: z.string().min(20),

REFRESH_TOKEN_EXPIRES_IN: z.string(),

CLOUDINARY_CLOUD_NAME: z.string(),

CLOUDINARY_API_KEY: z.string(),

CLOUDINARY_API_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);