import { z } from "zod";

export const envSchema = z.object({
  BASE_URL: z.string().url(),
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url(),
  APP_EMAIL: z.string(),
  APP_PASS: z.string(),
});
