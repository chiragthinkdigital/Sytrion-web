import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import pool, { ensureAdminUser } from "@/lib/db";
import { ADMIN_COOKIE, createAdminToken, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  let body: { username?: string; password?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const username = (body.username ?? "").trim();
  const password = body.password ?? "";

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
  }

  try {
    await ensureAdminUser();

    const [rows] = await pool.execute<mysql.RowDataPacket[]>(
      "SELECT id, password_hash FROM admin_users WHERE username = ?",
      [username]
    );

    if (rows.length === 0 || !(await verifyPassword(password, rows[0].password_hash))) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    const token = createAdminToken(rows[0].password_hash);
    const response = NextResponse.json({ success: true });
    response.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}