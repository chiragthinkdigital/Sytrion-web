import { NextResponse } from "next/server";
import type mysql from "mysql2/promise";
import { requireAdmin } from "@/lib/admin-auth";
import pool, { ensureJobsTable } from "@/lib/db";
import { normalizeJobInput } from "@/lib/jobs";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

function parseId(raw: string): number | null {
  const id = Number.parseInt(raw, 10);
  return Number.isFinite(id) && id > 0 ? id : null;
}

export async function PUT(request: Request, context: RouteContext) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const id = parseId((await context.params).id);
  if (id === null) {
    return NextResponse.json({ error: "Invalid job id." }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  try {
    await ensureJobsTable();
    const [existingRows] = await pool.execute<mysql.RowDataPacket[]>(
      "SELECT is_published FROM job_openings WHERE id = ?",
      [id]
    );
    const existing = existingRows[0];
    if (!existing) {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }

    const normalized = normalizeJobInput(body, Number(existing.is_published) === 1);
    if ("error" in normalized) {
      return NextResponse.json({ error: normalized.error }, { status: 400 });
    }

    const job = normalized.value;
    await pool.execute(
      `UPDATE job_openings SET
        title = ?, department = ?, location = ?, employment_type = ?,
        experience_level = ?, summary = ?, description = ?,
        responsibilities = ?, requirements = ?, is_published = ?
       WHERE id = ?`,
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
        id,
      ]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Database error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const id = parseId((await context.params).id);
  if (id === null) {
    return NextResponse.json({ error: "Invalid job id." }, { status: 400 });
  }

  try {
    await ensureJobsTable();
    const [result] = await pool.execute<mysql.ResultSetHeader>(
      "DELETE FROM job_openings WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Database error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
