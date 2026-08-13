import { createHash } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "wa_admin_session";

export function getAdminToken(): string | null {
  const secret = process.env.ADMIN_SECRET?.trim();
  if (!secret) return null;
  return createHash("sha256").update(secret).digest("hex");
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const token = getAdminToken();
  if (!token) return false;
  const cookie = (await cookies()).get(ADMIN_COOKIE)?.value;
  return cookie === token;
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_SECRET?.trim());
}
