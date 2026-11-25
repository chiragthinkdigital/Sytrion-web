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
let jobsTableReady: Promise<void> | null = null;
let applicationsTableReady: Promise<void> | null = null;

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

export async function ensureJobsTable(): Promise<void> {
  if (!jobsTableReady) {
    jobsTableReady = pool.execute(`
      CREATE TABLE IF NOT EXISTS job_openings (
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        department VARCHAR(255) NULL,
        location VARCHAR(255) NULL,
        employment_type VARCHAR(100) NULL,
        experience_level VARCHAR(100) NULL,
        summary TEXT NULL,
        description TEXT NOT NULL,
        responsibilities TEXT NULL,
        requirements TEXT NULL,
        is_published TINYINT(1) NOT NULL DEFAULT 1,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY idx_job_openings_published (is_published)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `).then(() => undefined);
  }
  return jobsTableReady;
}

export async function ensureApplicationsTable(): Promise<void> {
  if (!applicationsTableReady) {
    applicationsTableReady = (async () => {
      await pool.execute(`
        CREATE TABLE IF NOT EXISTS job_applications (
          id INT NOT NULL AUTO_INCREMENT,
          job_id INT NOT NULL,
          full_name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50) NULL,
          portfolio_url VARCHAR(500) NULL,
          impact_statement TEXT NOT NULL,
          resume_path VARCHAR(500) NOT NULL,
          resume_filename VARCHAR(255) NOT NULL,
          legal_first_name VARCHAR(255) NULL,
          legal_middle_name VARCHAR(255) NULL,
          legal_last_name VARCHAR(255) NULL,
          gender VARCHAR(50) NULL,
          calling_code VARCHAR(20) NULL,
          country_residence VARCHAR(150) NULL,
          address_line_1 VARCHAR(255) NULL,
          address_line_2 VARCHAR(255) NULL,
          city VARCHAR(150) NULL,
          state_province_region VARCHAR(150) NULL,
          postal_code VARCHAR(50) NULL,
          linkedin_profile VARCHAR(500) NULL,
          cover_letter_path VARCHAR(500) NULL,
          cover_letter_filename VARCHAR(255) NULL,
          years_experience VARCHAR(50) NULL,
          current_job_title VARCHAR(255) NULL,
          current_employer VARCHAR(255) NULL,
          highest_qualification VARCHAR(255) NULL,
          notice_period VARCHAR(255) NULL,
          work_entitlement VARCHAR(10) NULL,
          previously_employed VARCHAR(10) NULL,
          disability_consent TINYINT(1) NOT NULL DEFAULT 0,
          certification_consent TINYINT(1) NOT NULL DEFAULT 0,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (id),
          KEY idx_job_applications_job (job_id),
          CONSTRAINT fk_job_applications_job FOREIGN KEY (job_id) REFERENCES job_openings (id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);

      const [columns] = await pool.execute<mysql.RowDataPacket[]>(
        "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?",
        ["job_applications"]
      );
      const existing = new Set(columns.map((column) => String(column.COLUMN_NAME)));
      const additions: Record<string, string> = {
        legal_first_name: "VARCHAR(255) NULL",
        legal_middle_name: "VARCHAR(255) NULL",
        legal_last_name: "VARCHAR(255) NULL",
        gender: "VARCHAR(50) NULL",
        calling_code: "VARCHAR(20) NULL",
        country_residence: "VARCHAR(150) NULL",
        address_line_1: "VARCHAR(255) NULL",
        address_line_2: "VARCHAR(255) NULL",
        city: "VARCHAR(150) NULL",
        state_province_region: "VARCHAR(150) NULL",
        postal_code: "VARCHAR(50) NULL",
        linkedin_profile: "VARCHAR(500) NULL",
        cover_letter_path: "VARCHAR(500) NULL",
        cover_letter_filename: "VARCHAR(255) NULL",
        years_experience: "VARCHAR(50) NULL",
        current_job_title: "VARCHAR(255) NULL",
        current_employer: "VARCHAR(255) NULL",
        highest_qualification: "VARCHAR(255) NULL",
        notice_period: "VARCHAR(255) NULL",
        work_entitlement: "VARCHAR(10) NULL",
        previously_employed: "VARCHAR(10) NULL",
        disability_consent: "TINYINT(1) NOT NULL DEFAULT 0",
        certification_consent: "TINYINT(1) NOT NULL DEFAULT 0",
      };

      for (const [name, definition] of Object.entries(additions)) {
        if (!existing.has(name)) {
          await pool.execute(`ALTER TABLE job_applications ADD COLUMN ${name} ${definition}`);
        }
      }
    })();
  }
  return applicationsTableReady;
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