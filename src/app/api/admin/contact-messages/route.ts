import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import pool, { ensureContactTable, ensureAdminUser } from "@/lib/db";
import { createAdminToken, isAdminToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie");

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
    const [rows] = await pool.execute(
      "SELECT id, full_name, email, phone, message, created_at FROM contact_messages ORDER BY created_at DESC, id DESC"
    );

    return NextResponse.json({ messages: rows });
  } catch (err) {
    console.error("Database error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}