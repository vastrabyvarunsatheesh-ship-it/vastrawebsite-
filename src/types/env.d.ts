import { D1Database, R2Bucket, KVNamespace } from "@cloudflare/workers-types";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_URL: string;
      NEXT_PUBLIC_APP_NAME: string;
      NEXT_PUBLIC_API_BASE_URL: string;
      CLOUDFLARE_ACCOUNT_ID?: string;
      CLOUDFLARE_API_TOKEN?: string;
      CLOUDFLARE_D1_DATABASE_ID?: string;
      CLOUDFLARE_R2_BUCKET_NAME?: string;
      CLOUDFLARE_R2_PUBLIC_URL?: string;
      BETTER_AUTH_SECRET?: string;
      BETTER_AUTH_URL?: string;
      NEXT_PUBLIC_RAZORPAY_KEY_ID?: string;
      RAZORPAY_KEY_SECRET?: string;
      RAZORPAY_WEBHOOK_SECRET?: string;
      RESEND_API_KEY?: string;
      EMAIL_FROM_ADDRESS?: string;
      EMAIL_SUPPORT_ADDRESS?: string;
      ENCRYPTION_SECRET?: string;
      JWT_SECRET?: string;
      LOG_LEVEL?: "debug" | "info" | "warn" | "error";
      ENABLE_AUDIT_LOGS?: "true" | "false";
    }
  }
}

// Cloudflare Runtime Env Binding Interface
export interface CloudflareEnv {
  DB: D1Database;
  MEDIA_BUCKET: R2Bucket;
  CACHE_KV: KVNamespace;
  ENVIRONMENT: string;
  APP_NAME: string;
}
