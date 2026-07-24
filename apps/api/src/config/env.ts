import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  NODE_ENV: z.enum(["development", "production", "test"]),
  CLIENT_URL: z.string().url(),
  MONGODB_URI: z.string(),
  JWT_SECRET: z.string().min(10),
});

export const env = envSchema.parse(process.env);