import { readFile } from "fs/promises";
import path from "path";
import { requireAdmin } from "@/lib/admin-auth";
import pool, { ensureApplicationsTable } from "@/lib/db";
import type mysql from "mysql2/promise";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: Request, context: RouteContext) {
  if (!(await requireAdmin(request))) {
    return new Response("Unauthorized", { status: 401 });
  }

  const id = Number.parseInt((await context.params).id, 10);
  if (!Number.isFinite(id) || id <= 0) {
    return new Response("Invalid application id", { status: 400 });
  }

  try {
    await ensureApplicationsTable();
    const [rows] = await pool.execute<mysql.RowDataPacket[]>(
      "SELECT cover_letter_path, cover_letter_filename FROM job_applications WHERE id = ?",
      [id]
    );
    const application = rows[0];
    if (!application?.cover_letter_path) {
      return new Response("Cover letter not found", { status: 404 });
    }

    const storedName = path.basename(String(application.cover_letter_path));
    const filePath = path.join(process.cwd(), "uploads", "cover-letters", storedName);
    const file = await readFile(filePath);

    const originalName = String(application.cover_letter_filename).replace(/["\r\n]/g, "_");
    const extension = path.extname(originalName).toLowerCase();
    const contentType =
      extension === ".pdf"
        ? "application/pdf"
        : extension === ".doc"
          ? "application/msword"
          : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    return new Response(new Uint8Array(file), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${originalName}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("Cover letter download error:", err);
    return new Response("Cover letter not found", { status: 404 });
  }
}
