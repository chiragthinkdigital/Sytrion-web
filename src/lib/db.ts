import mysql from "mysql2/promise";
import { hashPassword } from "./auth";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

let contactTableReady: Promise<void> | null = null;
let adminTableReady: Promise<void> | null = null;
let adminSeeded: Promise<void> | null = null;

export async function ensureContactTable(): Promise<void> {
  if (!contactTableReady) {
    contactTableReady = pool.execute(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INT NOT NULL AUTO_INCREMENT,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `).then(() => undefined);
  }
  return contactTableReady;
}

export async function ensureAdminTable(): Promise<void> {
  if (!adminTableReady) {
    adminTableReady = pool.execute(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT NOT NULL AUTO_INCREMENT,
        username VARCHAR(64) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY uq_admin_username (username)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `).then(() => undefined);
  }
  return adminTableReady;
}

export async function ensureAdminUser(): Promise<void> {
  await ensureAdminTable();
  if (!adminSeeded) {
    adminSeeded = (async () => {
      const [rows] = await pool.execute<mysql.RowDataPacket[]>(
        "SELECT COUNT(*) AS c FROM admin_users"
      );
      if ((rows[0]?.c ?? 0) > 0) return;

      const username = process.env.ADMIN_USERNAME || "admin";
      const password = process.env.ADMIN_PASSWORD || "admin123";
      const passwordHash = await hashPassword(password);

      await pool.execute(
        "INSERT INTO admin_users (username, password_hash) VALUES (?, ?)",
        [username, passwordHash]
      );
    })();
  }
  return adminSeeded;
}

export default pool;