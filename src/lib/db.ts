import { D1Database } from "@cloudflare/workers-types";
import { logger } from "./logger";

/**
 * Cloudflare D1 Database Edge Connection Wrapper Architecture Stub
 */
export class D1Client {
  constructor(private db?: D1Database) {}

  public get instance(): D1Database {
    if (!this.db) {
      logger.warn("D1 Database binding missing or initializing in mock context");
      throw new Error("Cloudflare D1 Database binding 'DB' is not initialized.");
    }
    return this.db;
  }

  public async query<T = unknown>(sql: string, params: unknown[] = []): Promise<T[]> {
    try {
      const stmt = this.instance.prepare(sql).bind(...params);
      const { results } = await stmt.all<T>();
      return results;
    } catch (err) {
      logger.error("D1 Query Execution Failed", err, { sql, params });
      throw err;
    }
  }
}

export function createD1Client(db?: D1Database) {
  return new D1Client(db);
}
