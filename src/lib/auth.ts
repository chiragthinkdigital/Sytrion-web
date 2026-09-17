import { createHash, randomBytes, scrypt as _scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

export const ADMIN_COOKIE = "sytrion_admin";

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const hash = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${hash.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hashHex] = stored.split(":");
  if (!salt || !hashHex) return false;
  const storedHash = Buffer.from(hashHex, "hex");
  const providedHash = (await scrypt(password, salt, 64)) as Buffer;
  return storedHash.length === providedHash.length && timingSafeEqual(storedHash, providedHash);
}

export function createAdminToken(passwordHash: string): string {
  return createHash("sha256").update(passwordHash).digest("hex");
}

export function isAdminToken(cookieHeader: string | null, expectedToken: string): boolean {
  if (!cookieHeader || !expectedToken) return false;
  const match = cookieHeader.split(";").map((c) => c.trim()).find((c) => c.startsWith(`${ADMIN_COOKIE}=`));
  return !!match && match.slice(ADMIN_COOKIE.length + 1) === expectedToken;
}