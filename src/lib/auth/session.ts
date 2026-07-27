import { D1Database } from "@cloudflare/workers-types";
import { User } from "@/types/user";

export function generateSessionToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function createSession(
  db: D1Database,
  userId: string,
  ipAddress?: string,
  userAgent?: string
): Promise<{ token: string; expiresAt: string }> {
  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days
  const id = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  await db
    .prepare(
      "INSERT INTO sessions (id, user_id, token, ip_address, user_agent, expires_at) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .bind(id, userId, token, ipAddress || null, userAgent || null, expiresAt)
    .run();

  return { token, expiresAt };
}

export async function validateSession(
  db: D1Database,
  token: string
): Promise<{ user: User; expiresAt: string } | null> {
  const stmt = db.prepare(
    `SELECT s.expires_at, u.id, u.email, u.name, u.phone, u.role, u.avatar_url, u.is_verified, u.created_at, u.updated_at
     FROM sessions s
     JOIN users u ON s.user_id = u.id
     WHERE s.token = ? AND s.expires_at > CURRENT_TIMESTAMP AND u.deleted_at IS NULL`
  );

  const row = await stmt.bind(token).first<{
    expires_at: string;
    id: string;
    email: string;
    name: string;
    phone: string | null;
    role: string;
    avatar_url: string | null;
    is_verified: number;
    created_at: string;
    updated_at: string;
  }>();

  if (!row) return null;

  return {
    expiresAt: row.expires_at,
    user: {
      id: row.id,
      email: row.email,
      name: row.name,
      phone: row.phone || undefined,
      role: row.role as User["role"],
      avatarUrl: row.avatar_url || undefined,
      isVerified: Boolean(row.is_verified),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    },
  };
}

export async function invalidateSession(db: D1Database, token: string): Promise<void> {
  await db.prepare("DELETE FROM sessions WHERE token = ?").bind(token).run();
}
