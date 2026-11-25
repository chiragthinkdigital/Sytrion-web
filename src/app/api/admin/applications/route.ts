import { NextResponse } from "next/server";
import type mysql from "mysql2/promise";
import { requireAdmin } from "@/lib/admin-auth";
import pool, { ensureApplicationsTable, ensureJobsTable } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    await ensureJobsTable();
    await ensureApplicationsTable();
    const [rows] = await pool.execute<mysql.RowDataPacket[]>(
      `SELECT a.*, j.title AS job_title
       FROM job_applications a
       LEFT JOIN job_openings j ON a.job_id = j.id
       ORDER BY a.created_at DESC, a.id DESC`
    );
    return NextResponse.json({ applications: rows });
  } catch (err) {
    console.error("Database error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
