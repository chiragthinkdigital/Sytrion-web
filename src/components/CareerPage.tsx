"use client";

import Link from "next/link";
import Script from "next/script";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface RecaptchaParameters {
  sitekey: string;
  theme?: "light" | "dark";
  size?: "normal" | "compact";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
}

interface RecaptchaApi {
  render(container: HTMLElement | string, parameters: RecaptchaParameters): number;
  reset(widgetId?: number): void;
  getResponse(widgetId?: number): string;
}

declare global {
  interface Window {
    grecaptcha?: RecaptchaApi;
    onRecaptchaLoadCallback?: () => void;
  }
}

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

interface Job {
  id: number;
  title: string;
  department: string | null;
  location: string | null;
  employment_type: string | null;
  experience_level: string | null;
  summary: string | null;
  description: string;
  responsibilities: string | null;
  requirements: string | null;
  created_at: string;
}

interface JobsResponse {
  jobs: Job[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  filters: {
    departments: string[];
    locations: string[];
    types: string[];
  };
}

interface ApplicationForm {
  legalFirstName: string;
  legalMiddleName: string;
  legalLastName: string;
  gender: string;
  email: string;
  callingCode: string;
  phone: string;
  countryResidence: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateProvinceRegion: string;
  postalCode: string;
  linkedinProfile: string;
  yearsExperience: string;
  currentJobTitle: string;
  currentEmployer: string;
  highestQualification: string;
  noticePeriod: string;
  workEntitlement: string;
  previouslyEmployed: string;
  disabilityConsent: boolean;
  certificationConsent: boolean;
}

const emptyForm: ApplicationForm = {
  legalFirstName: "",
  legalMiddleName: "",
  legalLastName: "",
  gender: "",
  email: "",
  callingCode: "+91",
  phone: "",
  countryResidence: "India",
  addressLine1: "",
  addressLine2: "",
  city: "",
  stateProvinceRegion: "",
  postalCode: "",
  linkedinProfile: "",
  yearsExperience: "",
  currentJobTitle: "",
  currentEmployer: "",
  highestQualification: "",
  noticePeriod: "",
  workEntitlement: "",
  previouslyEmployed: "",
  disabilityConsent: false,
  certificationConsent: false,
};

const genderOptions = ["Male", "Female", "Non-binary", "Prefer not to say"];

const countries = [
  { name: "India", dial: "+91" },
  { name: "United States", dial: "+1" },
  { name: "Canada", dial: "+1" },
  { name: "United Kingdom", dial: "+44" },
  { name: "Australia", dial: "+61" },
  { name: "New Zealand", dial: "+64" },
  { name: "Ireland", dial: "+353" },
  { name: "Germany", dial: "+49" },
  { name: "France", dial: "+33" },
  { name: "Netherlands", dial: "+31" },
  { name: "Belgium", dial: "+32" },
  { name: "Switzerland", dial: "+41" },
  { name: "Austria", dial: "+43" },
  { name: "Spain", dial: "+34" },
  { name: "Portugal", dial: "+351" },
  { name: "Italy", dial: "+39" },
  { name: "Sweden", dial: "+46" },
  { name: "Norway", dial: "+47" },
  { name: "Denmark", dial: "+45" },
  { name: "Finland", dial: "+358" },
  { name: "Poland", dial: "+48" },
  { name: "Czech Republic", dial: "+420" },
  { name: "Hungary", dial: "+36" },
  { name: "Romania", dial: "+40" },
  { name: "Bulgaria", dial: "+359" },
  { name: "Greece", dial: "+30" },
  { name: "Turkey", dial: "+90" },
  { name: "Russia", dial: "+7" },
  { name: "Ukraine", dial: "+380" },
  { name: "United Arab Emirates", dial: "+971" },
  { name: "Saudi Arabia", dial: "+966" },
  { name: "Qatar", dial: "+974" },
  { name: "Kuwait", dial: "+965" },
  { name: "Bahrain", dial: "+973" },
  { name: "Oman", dial: "+968" },
  { name: "Israel", dial: "+972" },
  { name: "Egypt", dial: "+20" },
  { name: "Morocco", dial: "+212" },
  { name: "South Africa", dial: "+27" },
  { name: "Nigeria", dial: "+234" },
  { name: "Kenya", dial: "+254" },
  { name: "Ghana", dial: "+233" },
  { name: "Tanzania", dial: "+255" },
  { name: "Uganda", dial: "+256" },
  { name: "Rwanda", dial: "+250" },
  { name: "China", dial: "+86" },
  { name: "Japan", dial: "+81" },
  { name: "South Korea", dial: "+82" },
  { name: "Singapore", dial: "+65" },
  { name: "Malaysia", dial: "+60" },
  { name: "Indonesia", dial: "+62" },
  { name: "Thailand", dial: "+66" },
  { name: "Vietnam", dial: "+84" },
  { name: "Philippines", dial: "+63" },
  { name: "Bangladesh", dial: "+880" },
  { name: "Pakistan", dial: "+92" },
  { name: "Sri Lanka", dial: "+94" },
  { name: "Nepal", dial: "+977" },
  { name: "Myanmar", dial: "+95" },
  { name: "Cambodia", dial: "+855" },
  { name: "Laos", dial: "+856" },
  { name: "Taiwan", dial: "+886" },
  { name: "Hong Kong", dial: "+852" },
  { name: "Macau", dial: "+853" },
  { name: "Brazil", dial: "+55" },
  { name: "Mexico", dial: "+52" },
  { name: "Argentina", dial: "+54" },
  { name: "Chile", dial: "+56" },
  { name: "Colombia", dial: "+57" },
  { name: "Peru", dial: "+51" },
  { name: "Venezuela", dial: "+58" },
  { name: "Ecuador", dial: "+593" },
  { name: "Bolivia", dial: "+591" },
  { name: "Paraguay", dial: "+595" },
  { name: "Uruguay", dial: "+598" },
  { name: "Costa Rica", dial: "+506" },
  { name: "Panama", dial: "+507" },
  { name: "Guatemala", dial: "+502" },
  { name: "Honduras", dial: "+504" },
  { name: "El Salvador", dial: "+503" },
  { name: "Nicaragua", dial: "+505" },
  { name: "Dominican Republic", dial: "+1" },
  { name: "Jamaica", dial: "+1" },
  { name: "Trinidad and Tobago", dial: "+1" },
  { name: "Cuba", dial: "+53" },
  { name: "Iceland", dial: "+354" },
  { name: "Luxembourg", dial: "+352" },
  { name: "Malta", dial: "+356" },
  { name: "Cyprus", dial: "+357" },
  { name: "Estonia", dial: "+372" },
  { name: "Latvia", dial: "+371" },
  { name: "Lithuania", dial: "+370" },
  { name: "Slovakia", dial: "+421" },
  { name: "Slovenia", dial: "+386" },
  { name: "Croatia", dial: "+385" },
  { name: "Serbia", dial: "+381" },
  { name: "Bosnia and Herzegovina", dial: "+387" },
  { name: "North Macedonia", dial: "+389" },
  { name: "Albania", dial: "+355" },
  { name: "Georgia", dial: "+995" },
  { name: "Armenia", dial: "+374" },
  { name: "Azerbaijan", dial: "+994" },
  { name: "Kazakhstan", dial: "+7" },
  { name: "Uzbekistan", dial: "+998" },
  { name: "Belarus", dial: "+375" },
  { name: "Moldova", dial: "+373" },
  { name: "Iran", dial: "+98" },
  { name: "Iraq", dial: "+964" },
  { name: "Jordan", dial: "+962" },
  { name: "Lebanon", dial: "+961" },
  { name: "Syria", dial: "+963" },
  { name: "Tunisia", dial: "+216" },
  { name: "Algeria", dial: "+213" },
  { name: "Libya", dial: "+218" },
  { name: "Sudan", dial: "+249" },
  { name: "Ethiopia", dial: "+251" },
  { name: "Zimbabwe", dial: "+263" },
  { name: "Zambia", dial: "+260" },
  { name: "Botswana", dial: "+267" },
  { name: "Namibia", dial: "+264" },
  { name: "Mauritius", dial: "+230" },
  { name: "Fiji", dial: "+679" },
  { name: "Papua New Guinea", dial: "+675" },
];

const callingCodes = Array.from(new Set(countries.map((country) => country.dial))).sort(
  (a, b) => Number.parseInt(a.replace("+", ""), 10) - Number.parseInt(b.replace("+", ""), 10)
);

function FormField({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="cr-field">
      <label htmlFor={id}>
        {label} {required && "*"}
      </label>
      {children}
      {error && <p className="cr-error-text">{error}</p>}
    </div>
  );
}

const exploreCards = [
  {
    label: "Culture",
    title: "Why join Sytrion",
    href: "/about",
    image: 'url("/about/excellence.jpg")',
  },
  {
    label: "People",
    title: "Meet the team",
    href: "/about",
    image: 'url("/about/people.png")',
  },
  {
    label: "Work",
    title: "What we build",
    href: "/solutions",
    image: 'url("/home/Operations.jpg")',
  },
  {
    label: "Opportunity",
    title: "Open roles",
    href: "#openings",
    image: 'url("/about/collaboration.jpg")',
  },
];

function toBulletList(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function pageWindow(current: number, total: number): number[] {
  const start = Math.max(1, current - 2);
  const end = Math.min(total, start + 4);
  const pages: number[] = [];
  for (let i = start; i <= end; i += 1) pages.push(i);
  return pages;
}

export default function CareerPage() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<JobsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<number[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [form, setForm] = useState<ApplicationForm>(emptyForm);
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const applyRef = useRef<HTMLElement | null>(null);
  const recaptchaWidgetRef = useRef<HTMLDivElement | null>(null);
  const recaptchaWidgetIdRef = useRef<number | null>(null);

  const renderRecaptchaWidget = useCallback(() => {
    const container = recaptchaWidgetRef.current;
    if (
      !recaptchaSiteKey ||
      !container ||
      typeof window.grecaptcha?.render !== "function"
    ) {
      return;
    }
    if (recaptchaWidgetIdRef.current !== null && container.hasChildNodes()) {
      return;
    }
    recaptchaWidgetIdRef.current = null;
    recaptchaWidgetIdRef.current = window.grecaptcha.render(container, {
      sitekey: recaptchaSiteKey,
      theme: "light",
      callback: (token: string) => {
        setRecaptchaToken(token);
        setFormErrors((current) => ({ ...current, captcha: "" }));
        setServerError((current) => (current.includes("CAPTCHA") ? "" : current));
      },
      "expired-callback": () => {
        setRecaptchaToken("");
        setServerError("CAPTCHA expired. Please verify again.");
      },
      "error-callback": () => {
        setRecaptchaToken("");
        setServerError("CAPTCHA could not be verified. Please try again.");
      },
    });
  }, []);

  const resetRecaptcha = () => {
    if (
      recaptchaWidgetIdRef.current !== null &&
      typeof window.grecaptcha?.reset === "function"
    ) {
      window.grecaptcha.reset(recaptchaWidgetIdRef.current);
    }
    setRecaptchaToken("");
  };

  useEffect(() => {
    if (!recaptchaSiteKey) return;
    window.onRecaptchaLoadCallback = renderRecaptchaWidget;
    if (typeof window.grecaptcha?.render === "function") {
      renderRecaptchaWidget();
    }
    return () => {
      if (window.onRecaptchaLoadCallback === renderRecaptchaWidget) {
        delete window.onRecaptchaLoadCallback;
      }
    };
  }, [renderRecaptchaWidget]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 250);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const controller = new AbortController();
    const loadJobs = async () => {
      setLoading(true);
      setError("");
      const params = new URLSearchParams({ page: String(page), pageSize: "11" });
      if (search) params.set("q", search);
      if (department) params.set("department", department);
      if (location) params.set("location", location);
      if (type) params.set("type", type);

      try {
        const res = await fetch(`/api/jobs?${params.toString()}`, {
          signal: controller.signal,
        });
        const payload = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(payload.error || "Unable to load open roles.");
        }
        setData(payload as JobsResponse);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError((err as Error).message || "Unable to load open roles.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadJobs();
    return () => controller.abort();
  }, [search, department, location, type, page]);

  const jobOptions =
    selectedJob && !data?.jobs.some((job) => job.id === selectedJob.id)
      ? [selectedJob, ...(data?.jobs ?? [])]
      : (data?.jobs ?? []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setSubmitted(false);
    setServerError("");
    setFormErrors({});
    window.setTimeout(() => {
      applyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  const toggleDetails = (id: number) => {
    setExpanded((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const clearFilters = () => {
    setSearchInput("");
    setSearch("");
    setDepartment("");
    setLocation("");
    setType("");
    setPage(1);
  };

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (formErrors[name]) setFormErrors((current) => ({ ...current, [name]: "" }));
    if (serverError) setServerError("");
  };

  const handleResumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResume(event.target.files?.[0] ?? null);
    if (formErrors.resume) setFormErrors((current) => ({ ...current, resume: "" }));
    if (serverError) setServerError("");
  };

  const handleCoverLetterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoverLetter(event.target.files?.[0] ?? null);
    if (formErrors.coverLetter) setFormErrors((current) => ({ ...current, coverLetter: "" }));
    if (serverError) setServerError("");
  };

  const handleCheckboxChange = (field: "disabilityConsent" | "certificationConsent") => {
    setForm((current) => ({ ...current, [field]: !current[field] }));
    if (formErrors[field]) setFormErrors((current) => ({ ...current, [field]: "" }));
    if (serverError) setServerError("");
  };

  const validateFile = (file: File, label: string): string | null => {
    const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (![".pdf", ".doc", ".docx"].includes(extension)) {
      return `${label} must be a PDF, DOC, or DOCX file.`;
    }
    if (file.size > 10 * 1024 * 1024) {
      return `${label} must be 10 MB or smaller.`;
    }
    return null;
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!selectedJob) errors.role = "Please select the role you are applying for.";
    if (!form.legalFirstName.trim()) errors.legalFirstName = "Legal first name is required.";
    if (!form.legalLastName.trim()) errors.legalLastName = "Legal last name is required.";
    if (!form.gender) errors.gender = "Please select your gender.";
    if (!form.email.trim()) {
      errors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!form.callingCode) errors.callingCode = "Please select a calling code.";
    if (!form.phone.trim()) errors.phone = "Phone number is required.";
    if (!form.countryResidence) errors.countryResidence = "Please select your country of residence.";
    if (!form.city.trim()) errors.city = "City / town is required.";
    if (!form.workEntitlement) errors.workEntitlement = "Please answer this question.";
    if (!form.previouslyEmployed) errors.previouslyEmployed = "Please answer this question.";
    if (!form.disabilityConsent) errors.disabilityConsent = "Please provide your consent.";
    if (!form.certificationConsent) errors.certificationConsent = "Please certify this application.";
    if (!recaptchaToken) errors.captcha = "Please complete the CAPTCHA.";
    if (!resume) {
      errors.resume = "Please attach your CV or resume.";
    } else {
      const fileError = validateFile(resume, "Resume");
      if (fileError) errors.resume = fileError;
    }
    if (coverLetter) {
      const fileError = validateFile(coverLetter, "Cover letter");
      if (fileError) errors.coverLetter = fileError;
    }
    return errors;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    if (!selectedJob || !resume) return;

    setSubmitting(true);
    setServerError("");
    const payload = new FormData();
    payload.append("jobId", String(selectedJob.id));
    payload.append("legalFirstName", form.legalFirstName);
    payload.append("legalMiddleName", form.legalMiddleName);
    payload.append("legalLastName", form.legalLastName);
    payload.append("gender", form.gender);
    payload.append("email", form.email);
    payload.append("callingCode", form.callingCode);
    payload.append("phone", form.phone);
    payload.append("countryResidence", form.countryResidence);
    payload.append("addressLine1", form.addressLine1);
    payload.append("addressLine2", form.addressLine2);
    payload.append("city", form.city);
    payload.append("stateProvinceRegion", form.stateProvinceRegion);
    payload.append("postalCode", form.postalCode);
    payload.append("linkedinProfile", form.linkedinProfile);
    payload.append("yearsExperience", form.yearsExperience);
    payload.append("currentJobTitle", form.currentJobTitle);
    payload.append("currentEmployer", form.currentEmployer);
    payload.append("highestQualification", form.highestQualification);
    payload.append("noticePeriod", form.noticePeriod);
    payload.append("workEntitlement", form.workEntitlement);
    payload.append("previouslyEmployed", form.previouslyEmployed);
    payload.append("disabilityConsent", String(form.disabilityConsent));
    payload.append("certificationConsent", String(form.certificationConsent));
    payload.append("captchaToken", recaptchaToken);
    payload.append("resume", resume);
    if (coverLetter) payload.append("coverLetter", coverLetter);

    try {
      const res = await fetch("/api/applications", { method: "POST", body: payload });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) {
        setServerError(result.error || "Something went wrong. Please try again.");
        if (result.error?.includes("CAPTCHA")) resetRecaptcha();
        return;
      }
      setSubmitted(true);
      setForm(emptyForm);
      setResume(null);
      setCoverLetter(null);
      resetRecaptcha();
      const fileInput = document.getElementById("cr-resume") as HTMLInputElement | null;
      if (fileInput) fileInput.value = "";
      const coverInput = document.getElementById("cr-coverLetter") as HTMLInputElement | null;
      if (coverInput) coverInput.value = "";
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        .cr-hero {
          position: relative;
          overflow: hidden;
          background: #0c1b30;
          padding: clamp(150px, 17vw, 230px) clamp(20px, 5vw, 80px) clamp(90px, 10vw, 140px);
          color: #ffffff;
        }
        .cr-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: linear-gradient(90deg, #0c1b30 0%, rgba(12,27,48,0.94) 45%, rgba(12,27,48,0.55) 100%), url("/about/collaboration.jpg");
          background-size: cover;
          background-position: center;
        }
        .cr-hero::after {
          content: "";
          position: absolute;
          right: -160px;
          bottom: -220px;
          width: 520px;
          height: 520px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(198,232,74,0.18) 0%, rgba(198,232,74,0) 68%);
          pointer-events: none;
        }
        .cr-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
        }
        .cr-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 7px 15px;
          border: 1px solid rgba(198,232,74,0.35);
          border-radius: 999px;
          background: rgba(198,232,74,0.08);
          color: #C6E84A;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 26px;
        }
        .cr-hero h1 {
          font-family: var(--font-syne), Arial, sans-serif;
          font-size: clamp(44px, 7vw, 88px);
          line-height: 1.02;
          letter-spacing: -0.035em;
          font-weight: 700;
          margin: 0 0 24px;
          max-width: 900px;
        }
        .cr-hero h1 span {
          color: #C6E84A;
        }
        .cr-hero-copy {
          max-width: 640px;
          font-size: clamp(16px, 2vw, 19px);
          line-height: 1.75;
          color: rgba(255,255,255,0.75);
          margin: 0 0 40px;
        }
        .cr-search {
          display: flex;
          align-items: center;
          gap: 12px;
          width: min(100%, 640px);
          padding: 8px 8px 8px 22px;
          background: #ffffff;
          border-radius: 999px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.25);
        }
        .cr-search svg {
          color: #8a8e96;
          flex-shrink: 0;
        }
        .cr-search input {
          flex: 1;
          min-width: 0;
          border: none;
          outline: none;
          font-family: inherit;
          font-size: 15px;
          color: #0f0f0f;
          background: transparent;
        }
        .cr-search input::placeholder {
          color: #9a9da4;
        }
        .cr-search button {
          border: none;
          border-radius: 999px;
          background: #C6E84A;
          color: #0f0f0f;
          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          padding: 13px 26px;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          white-space: nowrap;
        }
        .cr-search button:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(198,232,74,0.35);
        }
        .cr-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 40px;
          margin-top: 56px;
        }
        .cr-stat-value {
          font-family: var(--font-syne), Arial, sans-serif;
          font-size: 30px;
          font-weight: 700;
          line-height: 1;
          color: #ffffff;
        }
        .cr-stat-label {
          margin-top: 8px;
          font-size: 13px;
          color: rgba(255,255,255,0.55);
        }
        .cr-section {
          padding: clamp(72px, 10vw, 130px) clamp(20px, 5vw, 80px);
        }
        .cr-wrap {
          max-width: 1200px;
          margin: 0 auto;
        }
        .cr-section-label {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #618300;
          margin-bottom: 18px;
        }
        .cr-section h2 {
          font-family: var(--font-syne), Arial, sans-serif;
          font-size: clamp(32px, 5vw, 56px);
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: #0f0f0f;
          margin: 0 0 22px;
        }
        .cr-section h2 span {
          color: #618300;
        }
        .cr-intro {
          background: #ffffff;
        }
        .cr-intro-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 7vw, 100px);
          align-items: start;
        }
        .cr-intro-copy {
          font-size: 17px;
          line-height: 1.85;
          color: #5a5d66;
          margin: 0 0 28px;
        }
        .cr-fraud {
          display: flex;
          gap: 16px;
          padding: 22px 24px;
          border: 1px solid rgba(12,27,48,0.09);
          border-radius: 18px;
          background: #f8f8f5;
        }
        .cr-fraud svg {
          flex-shrink: 0;
          color: #618300;
        }
        .cr-fraud strong {
          display: block;
          font-size: 14px;
          color: #0f0f0f;
          margin-bottom: 6px;
        }
        .cr-fraud p {
          margin: 0;
          font-size: 14px;
          line-height: 1.7;
          color: #5a5d66;
        }
        .cr-explore {
          background: #f6f7f3;
        }
        .cr-tile-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-top: 48px;
        }
        .cr-tile {
          position: relative;
          display: block;
          min-height: 300px;
          padding: 28px;
          border-radius: 20px;
          overflow: hidden;
          color: #ffffff;
          text-decoration: none;
          background-color: #0c1b30;
          background-size: cover;
          background-position: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .cr-tile::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(12,27,48,0.25) 0%, rgba(12,27,48,0.9) 100%);
        }
        .cr-tile:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 40px rgba(12,27,48,0.2);
        }
        .cr-tile > * {
          position: relative;
          z-index: 1;
        }
        .cr-tile-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #C6E84A;
        }
        .cr-tile-title {
          position: absolute;
          left: 28px;
          right: 28px;
          bottom: 28px;
          font-family: var(--font-syne), Arial, sans-serif;
          font-size: 22px;
          line-height: 1.25;
          font-weight: 700;
        }
        .cr-tile-arrow {
          position: absolute;
          top: 26px;
          right: 26px;
        }
        .cr-openings {
          background: #f6f7f3;
          scroll-margin-top: 90px;
        }
        .cr-filters {
          display: grid;
          grid-template-columns: repeat(3, 1fr) auto;
          gap: 16px;
          align-items: end;
          margin: 44px 0 20px;
          padding: 24px;
          border-radius: 20px;
          background: #ffffff;
          border: 1px solid rgba(12,27,48,0.06);
        }
        .cr-filter label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #5a5d66;
          margin-bottom: 9px;
        }
        .cr-filter select {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid rgba(0,0,0,0.12);
          border-radius: 12px;
          background: #ffffff;
          font-family: inherit;
          font-size: 14px;
          color: #0f0f0f;
          outline: none;
        }
        .cr-filter select:focus {
          border-color: #C6E84A;
          box-shadow: 0 0 0 3px rgba(198,232,74,0.12);
        }
        .cr-clear {
          border: 1px solid rgba(12,27,48,0.15);
          border-radius: 999px;
          background: transparent;
          padding: 12px 20px;
          font-family: inherit;
          font-size: 13px;
          font-weight: 600;
          color: #0f0f0f;
          cursor: pointer;
          transition: border-color 0.2s ease, color 0.2s ease;
        }
        .cr-clear:hover {
          border-color: #618300;
          color: #618300;
        }
        .cr-result-line {
          font-size: 14px;
          color: #5a5d66;
          margin-bottom: 20px;
        }
        .cr-job-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .cr-job-card {
          border-radius: 20px;
          background: #ffffff;
          border: 1px solid rgba(12,27,48,0.07);
          padding: clamp(22px, 3vw, 32px);
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .cr-job-card:hover,
        .cr-job-card.is-open {
          border-color: rgba(198,232,74,0.75);
          box-shadow: 0 14px 36px rgba(12,27,48,0.07);
        }
        .cr-job-top {
          display: flex;
          gap: 28px;
          justify-content: space-between;
          align-items: flex-start;
        }
        .cr-job-main {
          flex: 1;
          min-width: 0;
        }
        .cr-job-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          margin-bottom: 12px;
          font-size: 13px;
          color: #5a5d66;
        }
        .cr-job-meta span {
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }
        .cr-job-meta svg {
          color: #618300;
        }
        .cr-job-card h3 {
          font-family: var(--font-syne), Arial, sans-serif;
          font-size: clamp(21px, 2.5vw, 27px);
          letter-spacing: -0.02em;
          color: #0f0f0f;
          margin: 0 0 10px;
        }
        .cr-job-summary {
          font-size: 15px;
          line-height: 1.7;
          color: #5a5d66;
          margin: 0 0 18px;
          max-width: 70ch;
        }
        .cr-job-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .cr-tag {
          padding: 6px 12px;
          border-radius: 999px;
          background: #f2f4ed;
          color: #4f5600;
          font-size: 12px;
          font-weight: 600;
        }
        .cr-job-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex-shrink: 0;
          min-width: 150px;
        }
        .cr-details-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          border: 1px solid rgba(12,27,48,0.15);
          border-radius: 999px;
          background: transparent;
          padding: 11px 18px;
          font-family: inherit;
          font-size: 13px;
          font-weight: 600;
          color: #0f0f0f;
          cursor: pointer;
          transition: border-color 0.2s ease, color 0.2s ease;
        }
        .cr-details-btn:hover {
          border-color: #618300;
          color: #618300;
        }
        .cr-details-btn svg {
          transition: transform 0.2s ease;
        }
        .cr-job-card.is-open .cr-details-btn svg {
          transform: rotate(180deg);
        }
        .cr-apply-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: none;
          border-radius: 999px;
          background: #C6E84A;
          padding: 12px 20px;
          font-family: inherit;
          font-size: 13px;
          font-weight: 700;
          color: #0f0f0f;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cr-apply-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(198,232,74,0.35);
        }
        .cr-job-details {
          margin-top: 28px;
          padding-top: 28px;
          border-top: 1px solid rgba(12,27,48,0.08);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        .cr-detail-block h4 {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          color: #618300;
          margin: 0 0 14px;
        }
        .cr-detail-block p,
        .cr-detail-block li {
          font-size: 14px;
          line-height: 1.75;
          color: #5a5d66;
        }
        .cr-detail-block p {
          margin: 0;
        }
        .cr-detail-block ul {
          margin: 0;
          padding-left: 18px;
        }
        .cr-detail-block li {
          margin-bottom: 8px;
        }
        .cr-message-box {
          padding: 26px;
          border-radius: 18px;
          background: #ffffff;
          border: 1px solid rgba(12,27,48,0.07);
          color: #5a5d66;
          font-size: 15px;
          line-height: 1.7;
        }
        .cr-message-box.error {
          border-color: rgba(229,62,62,0.25);
          color: #b83232;
        }
        .cr-pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 32px;
          flex-wrap: wrap;
        }
        .cr-page-btn {
          min-width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(12,27,48,0.12);
          background: #ffffff;
          color: #0f0f0f;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .cr-page-btn:hover:not(:disabled) {
          border-color: #618300;
          color: #618300;
        }
        .cr-page-btn.active {
          background: #0c1b30;
          border-color: #0c1b30;
          color: #ffffff;
        }
        .cr-page-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .cr-apply {
          background: #ffffff;
          scroll-margin-top: 90px;
        }
        .cr-apply-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: clamp(32px, 6vw, 80px);
          align-items: start;
        }
        .cr-apply-aside h2 {
          font-family: var(--font-syne), Arial, sans-serif;
          font-size: clamp(36px, 5vw, 58px);
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #0f0f0f;
          margin: 0 0 20px;
        }
        .cr-apply-aside h2 span {
          color: #618300;
        }
        .cr-apply-aside > p {
          font-size: 16px;
          line-height: 1.8;
          color: #5a5d66;
          margin: 0 0 30px;
        }
        .cr-selected {
          padding: 22px 24px;
          border-radius: 18px;
          background: #0c1b30;
          color: #ffffff;
          margin-bottom: 30px;
        }
        .cr-selected-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #C6E84A;
          margin-bottom: 8px;
        }
        .cr-selected strong {
          font-family: var(--font-syne), Arial, sans-serif;
          font-size: 20px;
          line-height: 1.3;
        }
        .cr-selected span {
          display: block;
          margin-top: 8px;
          font-size: 13px;
          color: rgba(255,255,255,0.6);
        }
        .cr-steps {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .cr-step {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }
        .cr-step-number {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(198,232,74,0.18);
          color: #618300;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .cr-step strong {
          display: block;
          font-size: 14px;
          color: #0f0f0f;
          margin-bottom: 3px;
        }
        .cr-step span {
          font-size: 13px;
          line-height: 1.6;
          color: #5a5d66;
        }
        .cr-form-card {
          border-radius: 24px;
          background: #f8f8f5;
          border: 1px solid rgba(12,27,48,0.06);
          padding: clamp(24px, 4vw, 44px);
        }
        .cr-form-card h3 {
          font-family: var(--font-syne), Arial, sans-serif;
          font-size: 27px;
          color: #0f0f0f;
          margin: 0 0 8px;
        }
        .cr-form-card > p {
          font-size: 14px;
          color: #5a5d66;
          margin: 0 0 30px;
          line-height: 1.7;
        }
        .cr-field {
          margin-bottom: 20px;
        }
        .cr-field label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #0f0f0f;
          margin-bottom: 8px;
        }
        .cr-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 18px;
        }
        .cr-form-section {
          grid-column: 1 / -1;
          border-top: 1px solid rgba(0,0,0,0.08);
          padding-top: 22px;
          margin-top: 8px;
        }
        .cr-form-section:first-child {
          border-top: none;
          padding-top: 0;
          margin-top: 0;
        }
        .cr-form-section h4 {
          font-size: 14px;
          font-weight: 700;
          color: #0f0f0f;
          margin: 0 0 18px;
        }
        .cr-field-full {
          grid-column: 1 / -1;
        }
        .cr-field .cr-file {
          display: flex;
          margin-bottom: 0;
        }
        .cr-radio-row {
          display: flex;
          gap: 22px;
          padding: 4px 0 2px;
        }
        .cr-radio {
          display: inline-flex !important;
          align-items: center;
          gap: 7px;
          margin-bottom: 0 !important;
          font-size: 14px;
          font-weight: 500 !important;
          cursor: pointer;
        }
        .cr-radio input {
          width: 16px;
          height: 16px;
          accent-color: #618300;
        }
        .cr-consent {
          display: flex !important;
          align-items: flex-start;
          gap: 10px;
          padding: 14px 16px;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 13px;
          background: #ffffff;
          margin-bottom: 0 !important;
        }
        .cr-consent input {
          width: 16px;
          height: 16px;
          margin-top: 3px;
          flex-shrink: 0;
          accent-color: #618300;
        }
        .cr-consent span {
          font-size: 12.5px;
          line-height: 1.6;
          color: #5a5d66;
          font-weight: 400;
        }
        .cr-recaptcha {
          min-height: 78px;
          display: flex;
          align-items: center;
        }
        .cr-recaptcha-message {
          padding: 14px 16px;
          border-radius: 12px;
          background: rgba(229,62,62,0.07);
          border: 1px solid rgba(229,62,62,0.18);
          color: #b83232;
          font-size: 13px;
          line-height: 1.6;
        }
        .cr-input {
          width: 100%;
          box-sizing: border-box;
          padding: 14px 16px;
          border: 1px solid rgba(0,0,0,0.12);
          border-radius: 13px;
          background: #ffffff;
          font-family: inherit;
          font-size: 14px;
          color: #0f0f0f;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .cr-input::placeholder {
          color: #9a9da4;
        }
        .cr-input:focus {
          border-color: #C6E84A;
          box-shadow: 0 0 0 3px rgba(198,232,74,0.14);
        }
        .cr-input.has-error {
          border-color: #e53e3e;
          box-shadow: 0 0 0 3px rgba(229,62,62,0.08);
        }
        textarea.cr-input {
          min-height: 120px;
          resize: vertical;
          line-height: 1.6;
        }
        .cr-error-text {
          margin: 6px 0 0;
          font-size: 12px;
          color: #e53e3e;
          font-weight: 500;
        }
        .cr-file {
          position: relative;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px;
          border: 1.5px dashed rgba(12,27,48,0.18);
          border-radius: 14px;
          background: #ffffff;
          cursor: pointer;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .cr-file:hover {
          border-color: #618300;
          background: rgba(198,232,74,0.05);
        }
        .cr-file svg {
          color: #618300;
          flex-shrink: 0;
        }
        .cr-file strong {
          display: block;
          font-size: 14px;
          color: #0f0f0f;
          margin-bottom: 3px;
          word-break: break-all;
        }
        .cr-file small {
          font-size: 12px;
          color: #8a8e96;
        }
        .cr-file input {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }
        .cr-submit {
          width: 100%;
          border: none;
          border-radius: 999px;
          background: #C6E84A;
          color: #0f0f0f;
          font-family: inherit;
          font-size: 15px;
          font-weight: 700;
          padding: 16px 28px;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cr-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(198,232,74,0.35);
        }
        .cr-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }
        .cr-server-error {
          padding: 14px 16px;
          border-radius: 12px;
          background: rgba(229,62,62,0.07);
          border: 1px solid rgba(229,62,62,0.18);
          color: #b83232;
          font-size: 13px;
          margin-bottom: 20px;
        }
        .cr-success {
          text-align: center;
          padding: 30px 10px;
        }
        .cr-success-icon {
          width: 66px;
          height: 66px;
          border-radius: 20px;
          background: rgba(198,232,74,0.16);
          color: #618300;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 22px;
        }
        .cr-success h3 {
          margin: 0 0 10px;
        }
        .cr-success p {
          max-width: 460px;
          margin: 0 auto 24px;
        }
        .cr-secondary-btn {
          border: 1px solid rgba(12,27,48,0.16);
          border-radius: 999px;
          background: transparent;
          padding: 12px 24px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          color: #0f0f0f;
          cursor: pointer;
        }
        .cr-secondary-btn:hover {
          border-color: #618300;
          color: #618300;
        }
        .cr-cta {
          background: #0c1b30;
          padding: clamp(70px, 9vw, 120px) clamp(20px, 5vw, 80px);
          color: #ffffff;
        }
        .cr-cta-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }
        .cr-cta h2 {
          font-family: var(--font-syne), Arial, sans-serif;
          font-size: clamp(30px, 4.5vw, 52px);
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin: 0;
        }
        .cr-cta p {
          margin: 12px 0 0;
          color: rgba(255,255,255,0.65);
          font-size: 16px;
        }
        .cr-cta a {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 28px;
          border-radius: 999px;
          background: #C6E84A;
          color: #0f0f0f;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.2s ease;
        }
        .cr-cta a:hover {
          transform: translateY(-2px);
        }
        @media (max-width: 1024px) {
          .cr-tile-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .cr-job-details {
            grid-template-columns: 1fr 1fr;
          }
          .cr-filters {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 760px) {
          .cr-stats {
            gap: 24px;
          }
          .cr-intro-grid,
          .cr-apply-grid {
            grid-template-columns: 1fr;
          }
          .cr-tile-grid {
            grid-template-columns: 1fr;
          }
          .cr-job-top {
            flex-direction: column;
            gap: 18px;
          }
          .cr-job-actions {
            flex-direction: row;
            width: 100%;
          }
          .cr-job-actions button {
            flex: 1;
          }
          .cr-job-details {
            grid-template-columns: 1fr;
            gap: 22px;
          }
          .cr-filters {
            grid-template-columns: 1fr;
          }
          .cr-form-grid {
            grid-template-columns: 1fr;
          }
          .cr-search {
            flex-wrap: wrap;
            border-radius: 20px;
            padding: 14px;
          }
          .cr-search input {
            padding: 6px 4px;
          }
          .cr-search button {
            width: 100%;
          }
        }
      `}</style>

      <section className="cr-hero">
        <div className="cr-hero-inner">
          <span className="cr-eyebrow">Careers at Sytrion</span>
          <h1>
            Build what&apos;s <span>next.</span>
          </h1>
          <p className="cr-hero-copy">
            Join a team of thinkers, builders, and problem-solvers using AI and
            intelligent operations to make meaningful change for businesses around
            the world.
          </p>
          <form
            className="cr-search"
            onSubmit={(event) => {
              event.preventDefault();
              setSearch(searchInput.trim());
              setPage(1);
              scrollTo("openings");
            }}
          >
            <Search size={19} aria-hidden="true" />
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search roles by title or keyword"
              aria-label="Search open roles"
            />
            <button type="submit">Search roles</button>
          </form>
          <div className="cr-stats">
            <div>
              <div className="cr-stat-value">50+</div>
              <div className="cr-stat-label">Team members</div>
            </div>
            <div>
              <div className="cr-stat-value">6</div>
              <div className="cr-stat-label">Industry practices</div>
            </div>
            <div>
              <div className="cr-stat-value">1</div>
              <div className="cr-stat-label">Shared ambition</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cr-section cr-intro">
        <div className="cr-wrap cr-intro-grid">
          <div>
            <span className="cr-section-label">What&apos;s next?</span>
            <h2>
              Great careers are <span>built together.</span>
            </h2>
          </div>
          <div>
            <p className="cr-intro-copy">
              Helping clients grow while building a more sustainable, more
              inclusive future is a tough ask. At Sytrion, you join a collective of
              free-thinkers and experts driven to use technology to reimagine what
              is possible — and make it real. We give you the space to grow, the
              people to learn from, and the problems worth solving.
            </p>
            <div className="cr-fraud">
              <ShieldCheck size={22} aria-hidden="true" />
              <div>
                <strong>Recruitment scam awareness</strong>
                <p>
                  Sytrion never asks candidates for money at any stage of hiring.
                  Always verify that communication comes from an official Sytrion
                  email address.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cr-section cr-explore">
        <div className="cr-wrap">
          <span className="cr-section-label">Explore Sytrion</span>
          <h2>Find your place here.</h2>
          <div className="cr-tile-grid">
            {exploreCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="cr-tile"
                style={{ backgroundImage: card.image }}
              >
                <span className="cr-tile-label">{card.label}</span>
                <ArrowRight className="cr-tile-arrow" size={20} aria-hidden="true" />
                <span className="cr-tile-title">{card.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cr-section cr-openings" id="openings">
        <div className="cr-wrap">
          <span className="cr-section-label">Openings</span>
          <h2>Find your role.</h2>
          <div className="cr-filters">
            <div className="cr-filter">
              <label htmlFor="cr-department">Department</label>
              <select
                id="cr-department"
                value={department}
                onChange={(event) => {
                  setDepartment(event.target.value);
                  setPage(1);
                }}
              >
                <option value="">All departments</option>
                {(data?.filters.departments ?? []).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="cr-filter">
              <label htmlFor="cr-location">Location</label>
              <select
                id="cr-location"
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value);
                  setPage(1);
                }}
              >
                <option value="">All locations</option>
                {(data?.filters.locations ?? []).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="cr-filter">
              <label htmlFor="cr-type">Employment type</label>
              <select
                id="cr-type"
                value={type}
                onChange={(event) => {
                  setType(event.target.value);
                  setPage(1);
                }}
              >
                <option value="">All types</option>
                {(data?.filters.types ?? []).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <button type="button" className="cr-clear" onClick={clearFilters}>
              Clear filters
            </button>
          </div>

          <div className="cr-result-line">
            {loading
              ? "Loading open roles..."
              : error
                ? "Unable to load roles"
                : `${data?.total ?? 0} open role${data?.total === 1 ? "" : "s"} found`}
          </div>

          {error ? (
            <div className="cr-message-box error">{error}</div>
          ) : loading ? (
            <div className="cr-message-box">Loading opportunities at Sytrion...</div>
          ) : data && data.jobs.length > 0 ? (
            <div className="cr-job-list">
              {data.jobs.map((job) => {
                const isOpen = expanded.includes(job.id);
                const responsibilities = toBulletList(job.responsibilities);
                const requirements = toBulletList(job.requirements);
                return (
                  <article
                    key={job.id}
                    className={`cr-job-card ${isOpen ? "is-open" : ""}`}
                  >
                    <div className="cr-job-top">
                      <div className="cr-job-main">
                        <div className="cr-job-meta">
                          <span>
                            <BriefcaseBusiness size={14} aria-hidden="true" />
                            {job.department || "Sytrion"}
                          </span>
                          <span>
                            <MapPin size={14} aria-hidden="true" />
                            {job.location || "Location flexible"}
                          </span>
                          <span>
                            <CalendarDays size={14} aria-hidden="true" />
                            {formatDate(job.created_at)}
                          </span>
                        </div>
                        <h3>{job.title}</h3>
                        {job.summary && <p className="cr-job-summary">{job.summary}</p>}
                        <div className="cr-job-tags">
                          {job.employment_type && (
                            <span className="cr-tag">{job.employment_type}</span>
                          )}
                          {job.experience_level && (
                            <span className="cr-tag">{job.experience_level}</span>
                          )}
                        </div>
                      </div>
                      <div className="cr-job-actions">
                        <button
                          type="button"
                          className="cr-details-btn"
                          onClick={() => toggleDetails(job.id)}
                          aria-expanded={isOpen}
                        >
                          {isOpen ? "Hide details" : "View details"}
                          <ChevronDown size={15} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          className="cr-apply-btn"
                          onClick={() => handleApply(job)}
                        >
                          Apply now <ArrowRight size={15} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    {isOpen && (
                      <div className="cr-job-details">
                        <div className="cr-detail-block">
                          <h4>The role</h4>
                          <p>{job.description}</p>
                        </div>
                        <div className="cr-detail-block">
                          <h4>What you&apos;ll do</h4>
                          {responsibilities.length > 0 ? (
                            <ul>
                              {responsibilities.map((item, index) => (
                                <li key={`${job.id}-r-${index}`}>{item}</li>
                              ))}
                            </ul>
                          ) : (
                            <p>Details will be shared by the hiring team.</p>
                          )}
                        </div>
                        <div className="cr-detail-block">
                          <h4>What you bring</h4>
                          {requirements.length > 0 ? (
                            <ul>
                              {requirements.map((item, index) => (
                                <li key={`${job.id}-q-${index}`}>{item}</li>
                              ))}
                            </ul>
                          ) : (
                            <p>Details will be shared by the hiring team.</p>
                          )}
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="cr-message-box">
              No open roles match your search right now. Try clearing the filters or
              send us an application below — we&apos;re always looking for great
              people.
            </div>
          )}

          {data && data.totalPages > 1 && !error && (
            <div className="cr-pagination">
              <button
                type="button"
                className="cr-page-btn"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page === 1}
                aria-label="Previous page"
              >
                <ChevronLeft size={16} aria-hidden="true" />
              </button>
              {pageWindow(page, data.totalPages).map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`cr-page-btn ${item === page ? "active" : ""}`}
                  onClick={() => setPage(item)}
                >
                  {item}
                </button>
              ))}
              <button
                type="button"
                className="cr-page-btn"
                onClick={() => setPage((current) => Math.min(data.totalPages, current + 1))}
                disabled={page === data.totalPages}
                aria-label="Next page"
              >
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="cr-section cr-apply" id="apply" ref={applyRef}>
        <div className="cr-wrap cr-apply-grid">
          <div className="cr-apply-aside">
            <span className="cr-section-label">Mission admissions</span>
            <h2>
              Apply for a <span>role.</span>
            </h2>
            <p>
              Tell us what drives you. Pick a role from the openings above — or
              choose one here — and share your story with our team.
            </p>
            <div className="cr-selected">
              <span className="cr-selected-label">Applying for</span>
              <strong>{selectedJob ? selectedJob.title : "Select a role below"}</strong>
              <span>
                {selectedJob
                  ? [selectedJob.department, selectedJob.location]
                      .filter(Boolean)
                      .join(" · ") || "Sytrion"
                  : "Open roles are listed above"}
              </span>
            </div>
            <div className="cr-steps">
              <div className="cr-step">
                <span className="cr-step-number">1</span>
                <div>
                  <strong>Choose your role</strong>
                  <span>Select the opportunity that fits you best.</span>
                </div>
              </div>
              <div className="cr-step">
                <span className="cr-step-number">2</span>
                <div>
                  <strong>Share your impact</strong>
                  <span>Tell us what you can bring to the team.</span>
                </div>
              </div>
              <div className="cr-step">
                <span className="cr-step-number">3</span>
                <div>
                  <strong>We&apos;ll be in touch</strong>
                  <span>Our team reviews every application carefully.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="cr-form-card">
            {submitted ? (
              <div className="cr-success">
                <div className="cr-success-icon">
                  <CheckCircle2 size={32} aria-hidden="true" />
                </div>
                <h3>Application received</h3>
                <p>
                  Thank you for applying for {selectedJob?.title || "a role at Sytrion"}.
                  Our team will review your details and get back to you soon.
                </p>
                <button
                  type="button"
                  className="cr-secondary-btn"
                  onClick={() => scrollTo("openings")}
                >
                  Browse more roles
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3>Apply for a Role</h3>
                <p>Fields marked with an asterisk are required.</p>

                <FormField id="cr-role" label="Role" required error={formErrors.role}>
                  <select
                    id="cr-role"
                    name="role"
                    className={`cr-input ${formErrors.role ? "has-error" : ""}`}
                    value={selectedJob ? String(selectedJob.id) : ""}
                    onChange={(event) => {
                      const chosen = jobOptions.find(
                        (job) => String(job.id) === event.target.value
                      );
                      setSelectedJob(chosen ?? null);
                      if (formErrors.role) {
                        setFormErrors((current) => ({ ...current, role: "" }));
                      }
                    }}
                  >
                    <option value="">Select a role</option>
                    {jobOptions.map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                </FormField>

                <div className="cr-form-grid">
                  <div className="cr-form-section">
                    <h4>Personal details</h4>
                    <div className="cr-form-grid">
                      <FormField
                        id="cr-legalFirstName"
                        label="Legal First Name"
                        required
                        error={formErrors.legalFirstName}
                      >
                        <input
                          id="cr-legalFirstName"
                          name="legalFirstName"
                          type="text"
                          className={`cr-input ${formErrors.legalFirstName ? "has-error" : ""}`}
                          placeholder="First name"
                          value={form.legalFirstName}
                          onChange={handleFormChange}
                        />
                      </FormField>
                      <FormField
                        id="cr-legalMiddleName"
                        label="Legal Middle Name"
                        error={formErrors.legalMiddleName}
                      >
                        <input
                          id="cr-legalMiddleName"
                          name="legalMiddleName"
                          type="text"
                          className="cr-input"
                          placeholder="Middle name (optional)"
                          value={form.legalMiddleName}
                          onChange={handleFormChange}
                        />
                      </FormField>
                      <FormField
                        id="cr-legalLastName"
                        label="Legal Last Name"
                        required
                        error={formErrors.legalLastName}
                      >
                        <input
                          id="cr-legalLastName"
                          name="legalLastName"
                          type="text"
                          className={`cr-input ${formErrors.legalLastName ? "has-error" : ""}`}
                          placeholder="Last name"
                          value={form.legalLastName}
                          onChange={handleFormChange}
                        />
                      </FormField>
                      <FormField
                        id="cr-gender"
                        label="Gender"
                        required
                        error={formErrors.gender}
                      >
                        <select
                          id="cr-gender"
                          name="gender"
                          className={`cr-input ${formErrors.gender ? "has-error" : ""}`}
                          value={form.gender}
                          onChange={handleFormChange}
                        >
                          <option value="">Select gender</option>
                          {genderOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </FormField>
                      <FormField id="cr-email" label="Email address" required error={formErrors.email}>
                        <input
                          id="cr-email"
                          name="email"
                          type="email"
                          className={`cr-input ${formErrors.email ? "has-error" : ""}`}
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={handleFormChange}
                        />
                      </FormField>
                      <FormField
                        id="cr-callingCode"
                        label="Country/region calling code"
                        required
                        error={formErrors.callingCode}
                      >
                        <select
                          id="cr-callingCode"
                          name="callingCode"
                          className={`cr-input ${formErrors.callingCode ? "has-error" : ""}`}
                          value={form.callingCode}
                          onChange={handleFormChange}
                        >
                          {callingCodes.map((code) => (
                            <option key={code} value={code}>
                              {code}
                            </option>
                          ))}
                        </select>
                      </FormField>
                      <FormField id="cr-phone" label="Phone number" required error={formErrors.phone}>
                        <input
                          id="cr-phone"
                          name="phone"
                          type="tel"
                          className={`cr-input ${formErrors.phone ? "has-error" : ""}`}
                          placeholder="98765 43210"
                          value={form.phone}
                          onChange={handleFormChange}
                        />
                      </FormField>
                      <FormField
                        id="cr-countryResidence"
                        label="Country of residence"
                        required
                        error={formErrors.countryResidence}
                      >
                        <select
                          id="cr-countryResidence"
                          name="countryResidence"
                          className={`cr-input ${formErrors.countryResidence ? "has-error" : ""}`}
                          value={form.countryResidence}
                          onChange={handleFormChange}
                        >
                          <option value="">Select country</option>
                          {countries.map((country) => (
                            <option key={country.name} value={country.name}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </FormField>
                    </div>
                  </div>

                  <div className="cr-form-section">
                    <h4>Mailing address</h4>
                    <div className="cr-form-grid">
                      <FormField id="cr-addressLine1" label="Address line 1">
                        <input
                          id="cr-addressLine1"
                          name="addressLine1"
                          type="text"
                          className="cr-input"
                          placeholder="Street address"
                          value={form.addressLine1}
                          onChange={handleFormChange}
                        />
                      </FormField>
                      <FormField id="cr-addressLine2" label="Address line 2">
                        <input
                          id="cr-addressLine2"
                          name="addressLine2"
                          type="text"
                          className="cr-input"
                          placeholder="Apartment, suite, etc. (optional)"
                          value={form.addressLine2}
                          onChange={handleFormChange}
                        />
                      </FormField>
                      <FormField id="cr-city" label="City / Town" required error={formErrors.city}>
                        <input
                          id="cr-city"
                          name="city"
                          type="text"
                          className={`cr-input ${formErrors.city ? "has-error" : ""}`}
                          placeholder="City / town"
                          value={form.city}
                          onChange={handleFormChange}
                        />
                      </FormField>
                      <FormField id="cr-stateProvinceRegion" label="State / Province / Region">
                        <input
                          id="cr-stateProvinceRegion"
                          name="stateProvinceRegion"
                          type="text"
                          className="cr-input"
                          placeholder="State / province / region"
                          value={form.stateProvinceRegion}
                          onChange={handleFormChange}
                        />
                      </FormField>
                      <FormField id="cr-postalCode" label="Postal / ZIP code">
                        <input
                          id="cr-postalCode"
                          name="postalCode"
                          type="text"
                          className="cr-input"
                          placeholder="Postal / ZIP code"
                          value={form.postalCode}
                          onChange={handleFormChange}
                        />
                      </FormField>
                    </div>
                  </div>

                  <div className="cr-form-section">
                    <h4>Professional details</h4>
                    <div className="cr-form-grid">
                      <FormField id="cr-linkedinProfile" label="LinkedIn profile">
                        <input
                          id="cr-linkedinProfile"
                          name="linkedinProfile"
                          type="url"
                          className="cr-input"
                          placeholder="https://linkedin.com/in/..."
                          value={form.linkedinProfile}
                          onChange={handleFormChange}
                        />
                      </FormField>
                      <FormField id="cr-yearsExperience" label="Years of relevant experience">
                        <select
                          id="cr-yearsExperience"
                          name="yearsExperience"
                          className="cr-input"
                          value={form.yearsExperience}
                          onChange={handleFormChange}
                        >
                          <option value="">Select experience</option>
                          <option value="0-1 years">0-1 years</option>
                          <option value="2-4 years">2-4 years</option>
                          <option value="5-7 years">5-7 years</option>
                          <option value="8-10 years">8-10 years</option>
                          <option value="11-15 years">11-15 years</option>
                          <option value="15+ years">15+ years</option>
                        </select>
                      </FormField>
                      <FormField id="cr-currentJobTitle" label="Current / most recent job title">
                        <input
                          id="cr-currentJobTitle"
                          name="currentJobTitle"
                          type="text"
                          className="cr-input"
                          placeholder="Job title"
                          value={form.currentJobTitle}
                          onChange={handleFormChange}
                        />
                      </FormField>
                      <FormField id="cr-currentEmployer" label="Current / most recent employer">
                        <input
                          id="cr-currentEmployer"
                          name="currentEmployer"
                          type="text"
                          className="cr-input"
                          placeholder="Employer"
                          value={form.currentEmployer}
                          onChange={handleFormChange}
                        />
                      </FormField>
                      <FormField id="cr-highestQualification" label="Highest relevant qualification">
                        <input
                          id="cr-highestQualification"
                          name="highestQualification"
                          type="text"
                          className="cr-input"
                          placeholder="Qualification"
                          value={form.highestQualification}
                          onChange={handleFormChange}
                        />
                      </FormField>
                      <FormField id="cr-noticePeriod" label="Notice period / availability">
                        <select
                          id="cr-noticePeriod"
                          name="noticePeriod"
                          className="cr-input"
                          value={form.noticePeriod}
                          onChange={handleFormChange}
                        >
                          <option value="">Select availability</option>
                          <option value="Immediate">Immediate</option>
                          <option value="30 days">30 days</option>
                          <option value="60 days">60 days</option>
                          <option value="90 days">90 days</option>
                          <option value="90+ days">90+ days</option>
                        </select>
                      </FormField>
                      <div className="cr-field cr-field-full">
                        <label htmlFor="cr-resume">Resume / CV *</label>
                        <label className="cr-file" htmlFor="cr-resume">
                          <UploadCloud size={22} aria-hidden="true" />
                          <span>
                            <strong>{resume ? resume.name : "Attach File"}</strong>
                            <small>PDF, DOC, DOCX up to 10MB</small>
                          </span>
                          <input
                            id="cr-resume"
                            type="file"
                            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            onChange={handleResumeChange}
                          />
                        </label>
                        {formErrors.resume && <p className="cr-error-text">{formErrors.resume}</p>}
                      </div>
                      <div className="cr-field cr-field-full">
                        <label htmlFor="cr-coverLetter">Cover letter</label>
                        <label className="cr-file" htmlFor="cr-coverLetter">
                          <UploadCloud size={22} aria-hidden="true" />
                          <span>
                            <strong>{coverLetter ? coverLetter.name : "Attach File (optional)"}</strong>
                            <small>PDF, DOC, DOCX up to 10MB</small>
                          </span>
                          <input
                            id="cr-coverLetter"
                            type="file"
                            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            onChange={handleCoverLetterChange}
                          />
                        </label>
                        {formErrors.coverLetter && (
                          <p className="cr-error-text">{formErrors.coverLetter}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="cr-form-section">
                    <h4>Declarations</h4>
                    <FormField
                      id="cr-workEntitlement"
                      label="Legally entitled to work in the country applied for?"
                      required
                      error={formErrors.workEntitlement}
                    >
                      <div className="cr-radio-row">
                        {["yes", "no"].map((option) => (
                          <label className="cr-radio" key={option}>
                            <input
                              type="radio"
                              name="workEntitlement"
                              value={option}
                              checked={form.workEntitlement === option}
                              onChange={handleFormChange}
                            />
                            {option === "yes" ? "Yes" : "No"}
                          </label>
                        ))}
                      </div>
                    </FormField>
                    <FormField
                      id="cr-previouslyEmployed"
                      label="Previously employed by Sytrion?"
                      required
                      error={formErrors.previouslyEmployed}
                    >
                      <div className="cr-radio-row">
                        {["yes", "no"].map((option) => (
                          <label className="cr-radio" key={option}>
                            <input
                              type="radio"
                              name="previouslyEmployed"
                              value={option}
                              checked={form.previouslyEmployed === option}
                              onChange={handleFormChange}
                            />
                            {option === "yes" ? "Yes" : "No"}
                          </label>
                        ))}
                      </div>
                    </FormField>
                    <div className="cr-field">
                      <label className="cr-consent" htmlFor="cr-disabilityConsent">
                        <input
                          id="cr-disabilityConsent"
                          type="checkbox"
                          checked={form.disabilityConsent}
                          onChange={() => handleCheckboxChange("disabilityConsent")}
                        />
                        <span>
                          I give my explicit consent for Sytrion Group to collect and process
                          information about my disability to make appropriate adjustments I may
                          require during the recruitment process. I understand that providing this
                          information is voluntary, that it will be treated confidentially, and
                          that I may withdraw my data or consent at any time.
                        </span>
                      </label>
                      {formErrors.disabilityConsent && (
                        <p className="cr-error-text">{formErrors.disabilityConsent}</p>
                      )}
                    </div>
                    <div className="cr-field">
                      <label className="cr-consent" htmlFor="cr-certificationConsent">
                        <input
                          id="cr-certificationConsent"
                          type="checkbox"
                          checked={form.certificationConsent}
                          onChange={() => handleCheckboxChange("certificationConsent")}
                        />
                        <span>
                          I hereby certify that all information provided in this application is
                          true and complete to the best of my knowledge. I understand that any
                          false statements or omissions may disqualify me from employment
                          consideration or result in termination if already employed. I authorize
                          Sytrion to conduct any necessary inquiries and investigations concerning
                          my education, employment history, and relevant professional
                          qualifications. By submitting this application, I acknowledge that I have
                          read, understood, and agree to the terms.
                        </span>
                      </label>
                      {formErrors.certificationConsent && (
                        <p className="cr-error-text">{formErrors.certificationConsent}</p>
                      )}
                    </div>
                  </div>

                  <div className="cr-form-section">
                    <h4>Verification</h4>
                    <FormField
                      id="cr-captcha"
                      label="CAPTCHA"
                      required
                      error={formErrors.captcha}
                    >
                      {!recaptchaSiteKey ? (
                        <div className="cr-recaptcha-message">
                          CAPTCHA is not configured. Please contact the site administrator.
                        </div>
                      ) : (
                        <>
                          <div id="cr-captcha" ref={recaptchaWidgetRef} className="cr-recaptcha" />
                          <Script
                            id="google-recaptcha-v2"
                            src="https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoadCallback&render=explicit"
                            strategy="afterInteractive"
                            onReady={renderRecaptchaWidget}
                            onError={() =>
                              setServerError("Unable to load CAPTCHA. Please refresh the page.")
                            }
                          />
                        </>
                      )}
                    </FormField>
                  </div>
                </div>

                {serverError && <div className="cr-server-error">{serverError}</div>}

                <button type="submit" className="cr-submit" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit application"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="cr-cta">
        <div className="cr-cta-inner">
          <div>
            <h2>Don&apos;t see the right fit?</h2>
            <p>We&apos;re always interested in meeting people who think differently.</p>
          </div>
          <Link href="/contact">
            Start a conversation <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
