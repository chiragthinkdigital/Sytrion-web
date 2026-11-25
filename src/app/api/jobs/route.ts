import { NextResponse } from "next/server";
import type mysql from "mysql2/promise";
import pool, { ensureJobsTable } from "@/lib/db";

export const dynamic = "force-dynamic";

function collectDistinct(rows: mysql.RowDataPacket[], column: string): string[] {
  const values = rows
    .map((row) => row[column])
    .filter((value): value is string => typeof value === "string" && value.trim().length > 0);
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

export async function GET(request: Request) {
  try {
    await ensureJobsTable();

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim() ?? "";
    const department = searchParams.get("department")?.trim() ?? "";
    const location = searchParams.get("location")?.trim() ?? "";
    const type = searchParams.get("type")?.trim() ?? "";
    const parsedPage = Number.parseInt(searchParams.get("page") ?? "1", 10);
    const parsedPageSize = Number.parseInt(searchParams.get("pageSize") ?? "11", 10);
    const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
    const pageSize =
      Number.isFinite(parsedPageSize) && parsedPageSize > 0
        ? Math.min(parsedPageSize, 50)
        : 11;

    const conditions = ["is_published = 1"];
    const params: (string | number)[] = [];

    if (query) {
      const like = `%${query}%`;
      conditions.push("(title LIKE ? OR summary LIKE ? OR description LIKE ?)");
      params.push(like, like, like);
    }
    if (department) {
      conditions.push("department = ?");
      params.push(department);
    }
    if (location) {
      conditions.push("location LIKE ?");
      params.push(`%${location}%`);
    }
    if (type) {
      conditions.push("employment_type = ?");
      params.push(type);
    }

    const where = conditions.join(" AND ");

    const [countRows] = await pool.execute<mysql.RowDataPacket[]>(
      `SELECT COUNT(*) AS total FROM job_openings WHERE ${where}`,
      params
    );
    const total = Number(countRows[0]?.total ?? 0);

    const [rows] = await pool.execute<mysql.RowDataPacket[]>(
      `SELECT * FROM job_openings WHERE ${where}
       ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?`,
      [...params, pageSize, (page - 1) * pageSize]
    );

    const [filterRows] = await pool.execute<mysql.RowDataPacket[]>(
      "SELECT department, location, employment_type FROM job_openings WHERE is_published = 1"
    );

    return NextResponse.json({
      jobs: rows,
      total,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
      filters: {
        departments: collectDistinct(filterRows, "department"),
        locations: collectDistinct(filterRows, "location"),
        types: collectDistinct(filterRows, "employment_type"),
      },
    });
  } catch (err) {
    console.error("Database error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
