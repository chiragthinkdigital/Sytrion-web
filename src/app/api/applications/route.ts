import { randomUUID } from "crypto";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import type mysql from "mysql2/promise";
import { verifyRecaptcha } from "@/lib/captcha";
import pool, { ensureApplicationsTable, ensureJobsTable } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function clientIp(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || undefined;
  return request.headers.get("x-real-ip")?.trim() || undefined;
}

function validateFile(value: FormDataEntryValue | null, label: string): string | null {
  if (!(value instanceof File) || value.size === 0) {
    return `Please attach your ${label}.`;
  }
  const extension = path.extname(value.name).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(extension) || !ALLOWED_MIME_TYPES.includes(value.type)) {
    return `${label} must be a PDF, DOC, or DOCX file.`;
  }
  if (value.size > MAX_FILE_SIZE) {
    return `${label} must be 10 MB or smaller.`;
  }
  return null;
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const text = (key: string) => {
    const value = form.get(key);
    return typeof value === "string" ? value.trim() : "";
  };

  const jobId = Number.parseInt(text("jobId"), 10);
  const legalFirstName = text("legalFirstName");
  const legalMiddleName = text("legalMiddleName");
  const legalLastName = text("legalLastName");
  const gender = text("gender");
  const email = text("email");
  const callingCode = text("callingCode");
  const phone = text("phone");
  const countryResidence = text("countryResidence");
  const addressLine1 = text("addressLine1");
  const addressLine2 = text("addressLine2");
  const city = text("city");
  const stateProvinceRegion = text("stateProvinceRegion");
  const postalCode = text("postalCode");
  const linkedinProfile = text("linkedinProfile");
  const yearsExperience = text("yearsExperience");
  const currentJobTitle = text("currentJobTitle");
  const currentEmployer = text("currentEmployer");
  const highestQualification = text("highestQualification");
  const noticePeriod = text("noticePeriod");
  const workEntitlement = text("workEntitlement");
  const previouslyEmployed = text("previouslyEmployed");
  const disabilityConsent = text("disabilityConsent") === "true";
  const certificationConsent = text("certificationConsent") === "true";
  const captchaToken = text("captchaToken");
  const resume = form.get("resume");
  const coverLetter = form.get("coverLetter");

  if (!Number.isFinite(jobId) || jobId <= 0) {
    return NextResponse.json({ error: "Please select a role." }, { status: 400 });
  }
  if (!legalFirstName || !legalLastName) {
    return NextResponse.json(
      { error: "Legal first name and legal last name are required." },
      { status: 400 }
    );
  }
  if (!gender) {
    return NextResponse.json({ error: "Please select your gender." }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (!callingCode) {
    return NextResponse.json(
      { error: "Please select a country calling code." },
      { status: 400 }
    );
  }
  if (!phone) {
    return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
  }
  if (!countryResidence) {
    return NextResponse.json(
      { error: "Please select your country of residence." },
      { status: 400 }
    );
  }
  if (!city) {
    return NextResponse.json({ error: "City / town is required." }, { status: 400 });
  }
  if (!["yes", "no"].includes(workEntitlement)) {
    return NextResponse.json(
      { error: "Please answer the work entitlement question." },
      { status: 400 }
    );
  }
  if (!["yes", "no"].includes(previouslyEmployed)) {
    return NextResponse.json(
      { error: "Please tell us whether you worked at Sytrion before." },
      { status: 400 }
    );
  }
  if (!disabilityConsent || !certificationConsent) {
    return NextResponse.json(
      { error: "Please accept both declarations to submit your application." },
      { status: 400 }
    );
  }
  if (!(await verifyRecaptcha(captchaToken, clientIp(request)))) {
    return NextResponse.json(
      { error: "CAPTCHA verification failed. Please try again." },
      { status: 400 }
    );
  }

  const resumeError = validateFile(resume, "CV / resume");
  if (resumeError) {
    return NextResponse.json({ error: resumeError }, { status: 400 });
  }
  const coverLetterError = coverLetter && coverLetter instanceof File && coverLetter.size > 0
    ? validateFile(coverLetter, "cover letter")
    : null;
  if (coverLetterError) {
    return NextResponse.json({ error: coverLetterError }, { status: 400 });
  }

  const resumeFile = resume as File;
  const hasCoverLetter = coverLetter instanceof File && coverLetter.size > 0;
  const coverLetterFile = hasCoverLetter ? (coverLetter as File) : null;

  try {
    await ensureJobsTable();
    await ensureApplicationsTable();

    const [jobs] = await pool.execute<mysql.RowDataPacket[]>(
      "SELECT id FROM job_openings WHERE id = ? AND is_published = 1",
      [jobId]
    );
    if (jobs.length === 0) {
      return NextResponse.json(
        { error: "This role is no longer open. Please refresh the page." },
        { status: 400 }
      );
    }

    const resumeDir = path.join(process.cwd(), "uploads", "resumes");
    const coverLetterDir = path.join(process.cwd(), "uploads", "cover-letters");
    await mkdir(resumeDir, { recursive: true });
    if (coverLetterFile) await mkdir(coverLetterDir, { recursive: true });

    const resumeStoredName = `${Date.now()}-${randomUUID()}${path
      .extname(resumeFile.name)
      .toLowerCase()}`;
    const resumePath = path.join(resumeDir, resumeStoredName);
    await writeFile(resumePath, Buffer.from(await resumeFile.arrayBuffer()));

    let coverLetterStoredName: string | null = null;
    let coverLetterPath: string | null = null;
    if (coverLetterFile) {
      coverLetterStoredName = `${Date.now()}-${randomUUID()}${path
        .extname(coverLetterFile.name)
        .toLowerCase()}`;
      coverLetterPath = path.join(coverLetterDir, coverLetterStoredName);
      await writeFile(coverLetterPath, Buffer.from(await coverLetterFile.arrayBuffer()));
    }

    try {
      await pool.execute(
        `INSERT INTO job_applications (
          job_id, full_name, email, phone, portfolio_url, impact_statement,
          resume_path, resume_filename, legal_first_name, legal_middle_name,
          legal_last_name, gender, calling_code, country_residence, address_line_1,
          address_line_2, city, state_province_region, postal_code, linkedin_profile,
          cover_letter_path, cover_letter_filename, years_experience, current_job_title,
          current_employer, highest_qualification, notice_period, work_entitlement,
          previously_employed, disability_consent, certification_consent
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          jobId,
          `${legalFirstName} ${legalLastName}`.trim(),
          email,
          `${callingCode} ${phone}`.trim(),
          linkedinProfile || null,
          coverLetterFile ? `Cover letter: ${coverLetterFile.name}` : "",
          resumeStoredName,
          resumeFile.name,
          legalFirstName,
          legalMiddleName || null,
          legalLastName,
          gender,
          callingCode,
          countryResidence,
          addressLine1 || null,
          addressLine2 || null,
          city,
          stateProvinceRegion || null,
          postalCode || null,
          linkedinProfile || null,
          coverLetterStoredName,
          coverLetterFile?.name ?? null,
          yearsExperience || null,
          currentJobTitle || null,
          currentEmployer || null,
          highestQualification || null,
          noticePeriod || null,
          workEntitlement,
          previouslyEmployed,
          disabilityConsent ? 1 : 0,
          certificationConsent ? 1 : 0,
        ]
      );
    } catch (error) {
      await unlink(resumePath).catch(() => undefined);
      if (coverLetterPath) await unlink(coverLetterPath).catch(() => undefined);
      throw error;
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Database error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
