import type mysql from "mysql2/promise";
import { createAdminToken, isAdminToken } from "./auth";
import pool, { ensureAdminUser } from "./db";

export async function requireAdmin(request: Request): Promise<boolean> {
  await ensureAdminUser();
  const cookieHeader = request.headers.get("cookie");
  const [rows] = await pool.execute<mysql.RowDataPacket[]>(
    "SELECT password_hash FROM admin_users"
  );
  return rows.some((row) =>
    isAdminToken(cookieHeader, createAdminToken(row.password_hash))
  );
}
