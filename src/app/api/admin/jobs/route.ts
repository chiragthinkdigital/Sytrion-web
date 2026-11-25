import { NextResponse } from "next/server";
import type mysql from "mysql2/promise";
import { requireAdmin } from "@/lib/admin-auth";
import pool, { ensureJobsTable } from "@/lib/db";
import { normalizeJobInput } from "@/lib/jobs";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    await ensureJobsTable();
    const [rows] = await pool.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM job_openings ORDER BY created_at DESC, id DESC"
    );
    return NextResponse.json({ jobs: rows });
  } catch (err) {
    console.error("Database error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const normalized = normalizeJobInput(body);
  if ("error" in normalized) {
    return NextResponse.json({ error: normalized.error }, { status: 400 });
  }

  const job = normalized.value;

  try {
    await ensureJobsTable();
    const [result] = await pool.execute<mysql.ResultSetHeader>(
      `INSERT INTO job_openings
        (title, department, location, employment_type, experience_level,
         summary, description, responsibilities, requirements, is_published)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        job.title,
        job.department,
        job.location,
        job.employment_type,
        job.experience_level,
        job.summary,
        job.description,
        job.responsibilities,
        job.requirements,
        job.is_published ? 1 : 0,
      ]
    );
    return NextResponse.json({ id: result.insertId, success: true }, { status: 201 });
  } catch (err) {
    console.error("Database error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
