import { R2Bucket } from "@cloudflare/workers-types";
import { logger } from "./logger";

/**
 * Cloudflare R2 Media Storage Utility Architecture Stub
 */
export class R2StorageClient {
  constructor(private bucket?: R2Bucket) {}

  public async uploadMedia(key: string, file: ArrayBuffer | ArrayBufferView | string, contentType: string): Promise<string> {
    if (!this.bucket) {
      logger.warn("R2 Bucket binding missing. Returning mock storage key.", { key });
      return `https://media.vastra.com/${key}`;
    }

    try {
      await this.bucket.put(key, file as ArrayBuffer, {
        httpMetadata: { contentType },
      });
      const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL || "https://media.vastra.com";
      return `${publicUrl}/${key}`;
    } catch (err) {
      logger.error("R2 File Upload Failed", err, { key });
      throw err;
    }
  }

  public async deleteMedia(key: string): Promise<void> {
    if (!this.bucket) return;
    await this.bucket.delete(key);
  }
}

export function createR2StorageClient(bucket?: R2Bucket) {
  return new R2StorageClient(bucket);
}
