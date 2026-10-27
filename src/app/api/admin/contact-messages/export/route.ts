import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import pool, { ensureContactTable, ensureAdminUser } from "@/lib/db";
import { createAdminToken, isAdminToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

function escapeCsvField(field: any): string {
  if (field === null || field === undefined) {
    return "";
  }
  const str = String(field);
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  const { searchParams } = new URL(request.url);
  const fromDate = searchParams.get("from");
  const toDate = searchParams.get("to");

  try {
    await ensureAdminUser();

    const [admins] = await pool.execute<mysql.RowDataPacket[]>(
      "SELECT password_hash FROM admin_users"
    );

    const authorized = admins.some((a) =>
      isAdminToken(cookieHeader, createAdminToken(a.password_hash))
    );

    if (admins.length === 0 || !authorized) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    await ensureContactTable();

    let query = "SELECT id, full_name, email, phone, message, created_at FROM contact_messages";
    const conditions: string[] = [];
    const values: any[] = [];

    if (fromDate) {
      conditions.push("created_at >= ?");
      values.push(fromDate + " 00:00:00");
    }
    if (toDate) {
      conditions.push("created_at <= ?");
      values.push(toDate + " 23:59:59");
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY created_at DESC, id DESC";

    const [rows] = await pool.execute(query, values);

    const headers = ["ID", "Full Name", "Email", "Phone", "Message", "Created At"];
    const csvRows = [headers.map(escapeCsvField).join(",")];

    for (const row of rows as any[]) {
      const createdAt = row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at;
      const csvRow = [
        escapeCsvField(row.id),
        escapeCsvField(row.full_name),
        escapeCsvField(row.email),
        escapeCsvField(row.phone),
        escapeCsvField(row.message),
        escapeCsvField(createdAt),
      ];
      csvRows.push(csvRow.join(","));
    }

    const csvContent = "\ufeff" + csvRows.join("\r\n");
    const filename = `contact_messages_${fromDate || "all"}_${toDate || "all"}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
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
