import { CloudflareEnv } from "@/types/env.d";

/**
 * Safely extracts Cloudflare bindings (D1, R2, KV) from the request context or edge environment.
 */
export function getCloudflareBindings(env?: Partial<CloudflareEnv>): Partial<CloudflareEnv> {
  if (env && env.DB) {
    return env;
  }

  // Fallback for edge context if exposed on process or global context
  const globalEnv = (globalThis as unknown as { process?: { env?: Record<string, unknown> } })?.process?.env;
  
  return {
    DB: (globalEnv as unknown as CloudflareEnv)?.DB,
    MEDIA_BUCKET: (globalEnv as unknown as CloudflareEnv)?.MEDIA_BUCKET,
    CACHE_KV: (globalEnv as unknown as CloudflareEnv)?.CACHE_KV,
  };
}
