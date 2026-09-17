import { NextResponse } from "next/server";
import pool, { ensureContactTable } from "@/lib/db";

export async function POST(request: Request) {
  let body: { fullName?: string; email?: string; phone?: string; message?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { fullName, email, phone, message } = body;

  if (!fullName?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Full name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  try {
    await ensureContactTable();
    await pool.execute(
      "INSERT INTO contact_messages (full_name, email, phone, message) VALUES (?, ?, ?, ?)",
      [fullName.trim(), email.trim(), phone?.trim() || null, message.trim()]
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Database error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
