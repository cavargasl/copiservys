import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    PRODUCTS_SHEET_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_NODE_ENV: z.enum(["development", "test", "production"]),
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().min(10),
  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    PRODUCTS_SHEET_URL: process.env.PRODUCTS_SHEET_URL,
    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,
    
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  }
})