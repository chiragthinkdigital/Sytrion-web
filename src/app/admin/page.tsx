"use client";

import { Fragment, useCallback, useEffect, useState } from "react";

interface ContactMessage {
  id: number;
  full_name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
}

interface JobOpening {
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
  is_published: number;
  created_at: string;
  updated_at: string;
}

interface JobApplication {
  id: number;
  job_id: number;
  job_title: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  portfolio_url: string | null;
  impact_statement: string;
  resume_filename: string;
  legal_first_name: string | null;
  legal_middle_name: string | null;
  legal_last_name: string | null;
  gender: string | null;
  calling_code: string | null;
  country_residence: string | null;
  address_line_1: string | null;
  address_line_2: string | null;
  city: string | null;
  state_province_region: string | null;
  postal_code: string | null;
  linkedin_profile: string | null;
  cover_letter_filename: string | null;
  years_experience: string | null;
  current_job_title: string | null;
  current_employer: string | null;
  highest_qualification: string | null;
  notice_period: string | null;
  work_entitlement: string | null;
  previously_employed: string | null;
  disability_consent: number;
  certification_consent: number;
  created_at: string;
}

interface JobFormState {
  title: string;
  department: string;
  location: string;
  employment_type: string;
  experience_level: string;
  summary: string;
  description: string;
  responsibilities: string;
  requirements: string;
  is_published: boolean;
}

type AdminTab = "messages" | "jobs" | "applications";

const emptyJobForm: JobFormState = {
  title: "",
  department: "",
  location: "",
  employment_type: "",
  experience_level: "",
  summary: "",
  description: "",
  responsibilities: "",
  requirements: "",
  is_published: true,
};

function jobToForm(job: JobOpening): JobFormState {
  return {
    title: job.title,
    department: job.department ?? "",
    location: job.location ?? "",
    employment_type: job.employment_type ?? "",
    experience_level: job.experience_level ?? "",
    summary: job.summary ?? "",
    description: job.description,
    responsibilities: job.responsibilities ?? "",
    requirements: job.requirements ?? "",
    is_published: Number(job.is_published) === 1,
  };
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

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<AdminTab>("messages");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [expandedApplication, setExpandedApplication] = useState<number | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [exporting, setExporting] = useState(false);
  const [jobFormOpen, setJobFormOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState<number | null>(null);
  const [jobForm, setJobForm] = useState<JobFormState>(emptyJobForm);
  const [jobFormErrors, setJobFormErrors] = useState<Record<string, string>>({});
  const [jobSaving, setJobSaving] = useState(false);
  const [jobActionError, setJobActionError] = useState("");

  const loadMessages = useCallback(async () => {
    const params = new URLSearchParams();
    if (fromDate) params.append("from", fromDate);
    if (toDate) params.append("to", toDate);
    const query = params.toString() ? `?${params.toString()}` : "";
    const res = await fetch(`/api/admin/contact-messages${query}`, {
      cache: "no-store",
    });
    if (res.status === 401) {
      setAuthenticated(false);
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setMessages(data.messages);
      setAuthenticated(true);
    }
  }, [fromDate, toDate]);

  const loadJobs = useCallback(async () => {
    const res = await fetch("/api/admin/jobs", { cache: "no-store" });
    if (res.status === 401) {
      setAuthenticated(false);
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setJobs(data.jobs);
    }
  }, []);

  const loadApplications = useCallback(async () => {
    const res = await fetch("/api/admin/applications", { cache: "no-store" });
    if (res.status === 401) {
      setAuthenticated(false);
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setApplications(data.applications);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await loadMessages();
      await loadJobs();
      await loadApplications();
      setLoading(false);
    })();
  }, [loadMessages, loadJobs, loadApplications]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        setUsername("");
        setPassword("");
        await loadMessages();
        await loadJobs();
        await loadApplications();
      } else {
        const data = await res.json();
        setLoginError(data.error || "Login failed.");
      }
    } catch {
      setLoginError("Network error. Please try again.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setMessages([]);
    setJobs([]);
    setApplications([]);
    setAuthenticated(false);
    setActiveTab("messages");
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const params = new URLSearchParams();
      if (fromDate) params.append("from", fromDate);
      if (toDate) params.append("to", toDate);
      const query = params.toString() ? `?${params.toString()}` : "";
      const res = await fetch(`/api/admin/contact-messages/export${query}`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Failed to export CSV.");
        return;
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const disposition = res.headers.get("Content-Disposition");
      let filename = "contact_messages.csv";
      if (disposition && disposition.includes("filename=")) {
        filename = disposition.split("filename=")[1].replace(/"/g, "");
      }
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      alert("Network error while exporting.");
    } finally {
      setExporting(false);
    }
  };

  const handleJobFieldChange =
    (field: keyof Omit<JobFormState, "is_published">) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setJobForm((current) => ({ ...current, [field]: value }));
      if (jobFormErrors[field]) {
        setJobFormErrors((current) => ({ ...current, [field]: "" }));
      }
    };

  const openJobForm = (job?: JobOpening) => {
    setEditingJobId(job?.id ?? null);
    setJobForm(job ? jobToForm(job) : emptyJobForm);
    setJobFormErrors({});
    setJobActionError("");
    setJobFormOpen(true);
  };

  const closeJobForm = () => {
    setJobFormOpen(false);
    setEditingJobId(null);
    setJobForm(emptyJobForm);
    setJobFormErrors({});
    setJobActionError("");
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!jobForm.title.trim()) errors.title = "Job title is required.";
    if (!jobForm.description.trim()) errors.description = "Job description is required.";
    if (Object.keys(errors).length > 0) {
      setJobFormErrors(errors);
      return;
    }

    setJobSaving(true);
    setJobActionError("");
    const url = editingJobId ? `/api/admin/jobs/${editingJobId}` : "/api/admin/jobs";
    const method = editingJobId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobForm),
      });
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setJobActionError(data.error || "Unable to save this job.");
        return;
      }
      closeJobForm();
      await loadJobs();
    } catch {
      setJobActionError("Network error. Please try again.");
    } finally {
      setJobSaving(false);
    }
  };

  const handleTogglePublish = async (job: JobOpening) => {
    setJobActionError("");
    try {
      const res = await fetch(`/api/admin/jobs/${job.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...jobToForm(job),
          is_published: Number(job.is_published) !== 1,
        }),
      });
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setJobActionError(data.error || "Unable to update this job.");
        return;
      }
      await loadJobs();
    } catch {
      setJobActionError("Network error. Please try again.");
    }
  };

  const handleDeleteJob = async (job: JobOpening) => {
    if (!window.confirm(`Delete "${job.title}"? This also removes its applications.`)) {
      return;
    }
    setJobActionError("");
    try {
      const res = await fetch(`/api/admin/jobs/${job.id}`, { method: "DELETE" });
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setJobActionError(data.error || "Unable to delete this job.");
        return;
      }
      await loadJobs();
      await loadApplications();
    } catch {
      setJobActionError("Network error. Please try again.");
    }
  };

  return (
    <>
      <style>{`
        .admin-page {
          min-height: 100vh;
          background: #f4f5f2;
          font-family: var(--font-geist-sans), Arial, sans-serif;
        }
        .admin-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: clamp(20px, 4vw, 36px) clamp(20px, 5vw, 64px);
          background: #0c1b30;
        }
        .admin-bar h1 {
          margin: 0;
          font-family: var(--font-syne), Arial, sans-serif;
          font-size: clamp(20px, 3vw, 28px);
          font-weight: 700;
          color: #ffffff;
        }
        .admin-bar p {
          margin: 4px 0 0;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
        }
        .admin-logout {
          background: transparent;
          border: 1.5px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          border-radius: 999px;
          padding: 10px 22px;
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .admin-logout:hover {
          border-color: #C6E84A;
          color: #C6E84A;
        }
        .admin-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .admin-export-btn {
          background: #C6E84A;
          border: none;
          color: #0f0f0f;
          border-radius: 999px;
          padding: 10px 22px;
          font-size: 14px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .admin-export-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(198, 232, 74, 0.35);
        }
        .admin-export-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        .admin-main {
          padding: clamp(24px, 5vw, 56px);
          max-width: 1200px;
          margin: 0 auto;
        }
        .admin-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }
        .admin-tab {
          border: 1px solid rgba(12, 27, 48, 0.1);
          background: #ffffff;
          color: #5a5d66;
          border-radius: 999px;
          padding: 10px 20px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .admin-tab:hover {
          border-color: #618300;
          color: #618300;
        }
        .admin-tab.active {
          background: #0c1b30;
          border-color: #0c1b30;
          color: #ffffff;
        }
        .admin-card {
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 2px 16px -6px rgba(12, 27, 48, 0.12);
          overflow: hidden;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }
        .admin-table th {
          text-align: left;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #5a5d66;
          background: #fafbf8;
          padding: 14px 20px;
          border-bottom: 1px solid #ecece8;
          white-space: nowrap;
        }
        .admin-table td {
          padding: 16px 20px;
          font-size: 14px;
          color: #0f0f0f;
          vertical-align: top;
          border-bottom: 1px solid #f0f0ec;
        }
        .admin-table tr:last-child td {
          border-bottom: none;
        }
        .admin-table td.admin-msg {
          line-height: 1.6;
          color: #5a5d66;
          max-width: 340px;
        }
        .admin-table td.admin-date {
          color: #8a8e96;
          font-size: 13px;
          white-space: nowrap;
        }
        .admin-empty {
          padding: 48px 24px;
          text-align: center;
          color: #8a8e96;
          font-size: 15px;
        }
        .admin-login-wrap {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: #f4f5f2;
        }
        .admin-login-card {
          width: 100%;
          max-width: 400px;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 2px 16px -6px rgba(12, 27, 48, 0.12);
          padding: 40px 32px;
        }
        .admin-login-card h1 {
          margin: 0 0 8px;
          font-family: var(--font-syne), Arial, sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #0f0f0f;
        }
        .admin-login-card p {
          margin: 0 0 28px;
          font-size: 14px;
          color: #8a8e96;
        }
        .admin-login-card input {
          width: 100%;
          box-sizing: border-box;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 14px;
          padding: 14px 18px;
          font-size: 15px;
          font-family: inherit;
          color: #0f0f0f;
          outline: none;
          margin-bottom: 12px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .admin-login-card input:focus {
          border-color: #C6E84A;
          box-shadow: 0 0 0 3px rgba(198, 232, 74, 0.12);
        }
        .admin-login-card button {
          width: 100%;
          background: #C6E84A;
          color: #0f0f0f;
          border: none;
          border-radius: 999px;
          padding: 14px 20px;
          font-size: 15px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .admin-login-card button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(198, 232, 74, 0.35);
        }
        .admin-login-error {
          color: #e53e3e;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 12px;
        }
        .admin-loader {
          padding: 56px 24px;
          text-align: center;
          color: #8a8e96;
          font-size: 14px;
        }
        .admin-filters {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          padding: 16px 20px 0;
        }
        .admin-filter-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .admin-filter-group label {
          font-size: 13px;
          color: #5a5d66;
          font-weight: 600;
        }
        .admin-filter-group input {
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 999px;
          padding: 8px 14px;
          font-size: 13px;
          font-family: inherit;
          color: #0f0f0f;
        }
        .admin-section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          padding: 20px 24px;
          border-bottom: 1px solid #f0f0ec;
        }
        .admin-section-head h2 {
          margin: 0;
          font-family: var(--font-syne), Arial, sans-serif;
          font-size: 20px;
          color: #0f0f0f;
        }
        .admin-section-head p {
          margin: 4px 0 0;
          font-size: 13px;
          color: #8a8e96;
        }
        .admin-add-btn {
          border: none;
          border-radius: 999px;
          background: #C6E84A;
          color: #0f0f0f;
          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          padding: 10px 20px;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .admin-add-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(198, 232, 74, 0.35);
        }
        .admin-row-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .admin-small-btn {
          border: 1px solid rgba(12, 27, 48, 0.14);
          border-radius: 999px;
          background: transparent;
          color: #0f0f0f;
          font-family: inherit;
          font-size: 12px;
          font-weight: 600;
          padding: 7px 13px;
          cursor: pointer;
          white-space: nowrap;
        }
        .admin-small-btn:hover {
          border-color: #618300;
          color: #618300;
        }
        .admin-small-btn.danger:hover {
          border-color: #e53e3e;
          color: #e53e3e;
        }
        .admin-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 11px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
        }
        .admin-status.live {
          background: rgba(198, 232, 74, 0.18);
          color: #526d00;
        }
        .admin-status.draft {
          background: rgba(12, 27, 48, 0.07);
          color: #5a5d66;
        }
        .admin-form-panel {
          padding: 24px;
          background: #fafbf8;
          border-bottom: 1px solid #f0f0ec;
        }
        .admin-form-panel h3 {
          margin: 0 0 20px;
          font-family: var(--font-syne), Arial, sans-serif;
          font-size: 19px;
          color: #0f0f0f;
        }
        .admin-form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .admin-form-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .admin-form-field.full {
          grid-column: 1 / -1;
        }
        .admin-form-field label {
          font-size: 12px;
          font-weight: 700;
          color: #5a5d66;
        }
        .admin-form-field input[type="text"],
        .admin-form-field textarea {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 12px;
          padding: 11px 13px;
          font-family: inherit;
          font-size: 14px;
          color: #0f0f0f;
          outline: none;
          background: #ffffff;
        }
        .admin-form-field textarea {
          min-height: 88px;
          resize: vertical;
          line-height: 1.6;
        }
        .admin-form-field input:focus,
        .admin-form-field textarea:focus {
          border-color: #C6E84A;
          box-shadow: 0 0 0 3px rgba(198, 232, 74, 0.12);
        }
        .admin-publish-row {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: #0f0f0f;
        }
        .admin-publish-row input {
          width: 17px;
          height: 17px;
          accent-color: #618300;
        }
        .admin-form-actions {
          grid-column: 1 / -1;
          display: flex;
          gap: 10px;
          margin-top: 8px;
        }
        .admin-form-actions button {
          border-radius: 999px;
          padding: 11px 22px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
        }
        .admin-form-actions .save {
          border: none;
          background: #C6E84A;
          color: #0f0f0f;
        }
        .admin-form-actions .cancel {
          border: 1px solid rgba(12, 27, 48, 0.14);
          background: transparent;
          color: #0f0f0f;
        }
        .admin-form-error {
          grid-column: 1 / -1;
          color: #e53e3e;
          font-size: 13px;
          font-weight: 500;
        }
        .admin-field-error {
          color: #e53e3e;
          font-size: 12px;
        }
        .admin-link {
          color: #618300;
          text-decoration: none;
          font-weight: 600;
        }
        .admin-link:hover {
          text-decoration: underline;
        }
        .admin-resume-link {
          display: inline-flex;
          align-items: center;
          border: 1px solid rgba(12, 27, 48, 0.14);
          border-radius: 999px;
          padding: 7px 13px;
          font-size: 12px;
          font-weight: 600;
          color: #0f0f0f;
          text-decoration: none;
          white-space: nowrap;
        }
        .admin-resume-link:hover {
          border-color: #618300;
          color: #618300;
        }
        .admin-toggle-btn {
          border: 1px solid rgba(12, 27, 48, 0.14);
          border-radius: 999px;
          padding: 7px 13px;
          font-size: 12px;
          font-weight: 600;
          color: #0f0f0f;
          background: #ffffff;
          cursor: pointer;
          white-space: nowrap;
        }
        .admin-toggle-btn:hover {
          border-color: #618300;
          color: #618300;
        }
        .admin-detail-cell {
          background: #f7f9f3;
        }
        .admin-detail-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px 22px;
        }
        .admin-detail-item span {
          display: block;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #8a8e96;
          margin-bottom: 4px;
        }
        .admin-detail-item strong {
          font-size: 13px;
          font-weight: 600;
          color: #0f0f0f;
        }
        @media (max-width: 720px) {
          .admin-detail-grid {
            grid-template-columns: 1fr;
          }
          .admin-table th, .admin-table td {
            padding: 12px 14px;
          }
          .admin-table td.admin-msg {
            max-width: 220px;
          }
          .admin-actions {
            width: 100%;
            justify-content: flex-start;
          }
          .admin-form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {loading ? (
        <div className="admin-login-wrap">
          <div className="admin-loader">Loading...</div>
        </div>
      ) : !authenticated ? (
        <div className="admin-login-wrap">
          <div className="admin-login-card">
            <h1>Admin Login</h1>
            <p>Enter your admin credentials to manage submissions and careers.</p>
            {loginError && <div className="admin-login-error">{loginError}</div>}
            <form onSubmit={handleLogin}>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (loginError) setLoginError("");
                }}
                placeholder="Username"
                autoComplete="username"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (loginError) setLoginError("");
                }}
                placeholder="Password"
                autoComplete="current-password"
                autoFocus
              />
              <button type="submit" disabled={loggingIn} style={{ opacity: loggingIn ? 0.7 : 1 }}>
                {loggingIn ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="admin-page">
          <header className="admin-bar">
            <div>
              <h1>Sytrion Admin</h1>
              <p>
                {messages.length} message{messages.length === 1 ? "" : "s"} · {jobs.length} job
                {jobs.length === 1 ? "" : "s"} · {applications.length} application
                {applications.length === 1 ? "" : "s"}
              </p>
            </div>
            <div className="admin-actions">
              <button className="admin-export-btn" onClick={handleExport} disabled={exporting}>
                {exporting ? "Exporting..." : "Export CSV"}
              </button>
              <button className="admin-logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </header>

          <main className="admin-main">
            <div className="admin-tabs">
              <button
                className={`admin-tab ${activeTab === "messages" ? "active" : ""}`}
                onClick={() => setActiveTab("messages")}
              >
                Contact messages
              </button>
              <button
                className={`admin-tab ${activeTab === "jobs" ? "active" : ""}`}
                onClick={() => setActiveTab("jobs")}
              >
                Job openings
              </button>
              <button
                className={`admin-tab ${activeTab === "applications" ? "active" : ""}`}
                onClick={() => setActiveTab("applications")}
              >
                Applications
              </button>
            </div>

            {activeTab === "messages" && (
              <div className="admin-card">
                <div className="admin-section-head">
                  <div>
                    <h2>Contact submissions</h2>
                    <p>Filter messages by received date or export them as CSV.</p>
                  </div>
                </div>
                <div className="admin-filters">
                  <div className="admin-filter-group">
                    <label htmlFor="fromDate">From</label>
                    <input
                      id="fromDate"
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>
                  <div className="admin-filter-group">
                    <label htmlFor="toDate">To</label>
                    <input
                      id="toDate"
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>
                </div>
                {messages.length === 0 ? (
                  <div className="admin-empty">No contact messages yet.</div>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Message</th>
                          <th>Received</th>
                        </tr>
                      </thead>
                      <tbody>
                        {messages.map((m) => (
                          <tr key={m.id}>
                            <td style={{ fontWeight: 600 }}>{m.full_name}</td>
                            <td>
                              <a href={`mailto:${m.email}`} className="admin-link">
                                {m.email}
                              </a>
                            </td>
                            <td>{m.phone ?? "—"}</td>
                            <td className="admin-msg">{m.message}</td>
                            <td className="admin-date">
                              {new Date(m.created_at).toLocaleString(undefined, {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === "jobs" && (
              <div className="admin-card">
                <div className="admin-section-head">
                  <div>
                    <h2>Job openings</h2>
                    <p>Add, edit, publish, or remove roles shown on the career page.</p>
                  </div>
                  <button className="admin-add-btn" onClick={() => openJobForm()}>
                    Add job
                  </button>
                </div>

                {jobFormOpen && (
                  <div className="admin-form-panel">
                    <h3>{editingJobId ? "Edit job opening" : "New job opening"}</h3>
                    <form onSubmit={handleJobSubmit} noValidate>
                      <div className="admin-form-grid">
                        <div className="admin-form-field">
                          <label htmlFor="job-title">Job title *</label>
                          <input
                            id="job-title"
                            type="text"
                            value={jobForm.title}
                            onChange={handleJobFieldChange("title")}
                            placeholder="Senior Data Engineer"
                          />
                          {jobFormErrors.title && (
                            <span className="admin-field-error">{jobFormErrors.title}</span>
                          )}
                        </div>
                        <div className="admin-form-field">
                          <label htmlFor="job-department">Department</label>
                          <input
                            id="job-department"
                            type="text"
                            value={jobForm.department}
                            onChange={handleJobFieldChange("department")}
                            placeholder="Data & Analytics"
                          />
                        </div>
                        <div className="admin-form-field">
                          <label htmlFor="job-location">Location</label>
                          <input
                            id="job-location"
                            type="text"
                            value={jobForm.location}
                            onChange={handleJobFieldChange("location")}
                            placeholder="Nashik / Hybrid"
                          />
                        </div>
                        <div className="admin-form-field">
                          <label htmlFor="job-type">Employment type</label>
                          <input
                            id="job-type"
                            type="text"
                            value={jobForm.employment_type}
                            onChange={handleJobFieldChange("employment_type")}
                            placeholder="Full-time"
                          />
                        </div>
                        <div className="admin-form-field">
                          <label htmlFor="job-experience">Experience level</label>
                          <input
                            id="job-experience"
                            type="text"
                            value={jobForm.experience_level}
                            onChange={handleJobFieldChange("experience_level")}
                            placeholder="4-7 years"
                          />
                        </div>
                        <div className="admin-form-field full">
                          <label htmlFor="job-summary">Short summary</label>
                          <textarea
                            id="job-summary"
                            value={jobForm.summary}
                            onChange={handleJobFieldChange("summary")}
                            placeholder="One or two lines shown on the job card."
                          />
                        </div>
                        <div className="admin-form-field full">
                          <label htmlFor="job-description">Description *</label>
                          <textarea
                            id="job-description"
                            value={jobForm.description}
                            onChange={handleJobFieldChange("description")}
                            placeholder="Describe the role and the team."
                          />
                          {jobFormErrors.description && (
                            <span className="admin-field-error">
                              {jobFormErrors.description}
                            </span>
                          )}
                        </div>
                        <div className="admin-form-field full">
                          <label htmlFor="job-responsibilities">
                            Responsibilities (one per line)
                          </label>
                          <textarea
                            id="job-responsibilities"
                            value={jobForm.responsibilities}
                            onChange={handleJobFieldChange("responsibilities")}
                            placeholder={"Build scalable data pipelines\nPartner with product teams"}
                          />
                        </div>
                        <div className="admin-form-field full">
                          <label htmlFor="job-requirements">
                            Requirements (one per line)
                          </label>
                          <textarea
                            id="job-requirements"
                            value={jobForm.requirements}
                            onChange={handleJobFieldChange("requirements")}
                            placeholder={"5+ years of experience\nStrong SQL skills"}
                          />
                        </div>
                        <label className="admin-publish-row">
                          <input
                            type="checkbox"
                            checked={jobForm.is_published}
                            onChange={(e) =>
                              setJobForm((current) => ({
                                ...current,
                                is_published: e.target.checked,
                              }))
                            }
                          />
                          Publish this role on the career page
                        </label>
                        {jobActionError && (
                          <div className="admin-form-error">{jobActionError}</div>
                        )}
                        <div className="admin-form-actions">
                          <button type="submit" className="save" disabled={jobSaving}>
                            {jobSaving ? "Saving..." : editingJobId ? "Save changes" : "Add job"}
                          </button>
                          <button type="button" className="cancel" onClick={closeJobForm}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {jobActionError && !jobFormOpen && (
                  <div style={{ padding: "16px 24px 0", color: "#e53e3e", fontSize: 13 }}>
                    {jobActionError}
                  </div>
                )}

                {jobs.length === 0 ? (
                  <div className="admin-empty">No job openings yet.</div>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Role</th>
                          <th>Department</th>
                          <th>Location</th>
                          <th>Status</th>
                          <th>Posted</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobs.map((job) => (
                          <tr key={job.id}>
                            <td style={{ fontWeight: 600 }}>{job.title}</td>
                            <td>{job.department ?? "—"}</td>
                            <td>{job.location ?? "—"}</td>
                            <td>
                              <span
                                className={`admin-status ${
                                  Number(job.is_published) === 1 ? "live" : "draft"
                                }`}
                              >
                                {Number(job.is_published) === 1 ? "Published" : "Draft"}
                              </span>
                            </td>
                            <td className="admin-date">{formatDate(job.created_at)}</td>
                            <td>
                              <div className="admin-row-actions">
                                <button
                                  className="admin-small-btn"
                                  onClick={() => handleTogglePublish(job)}
                                >
                                  {Number(job.is_published) === 1 ? "Unpublish" : "Publish"}
                                </button>
                                <button
                                  className="admin-small-btn"
                                  onClick={() => openJobForm(job)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="admin-small-btn danger"
                                  onClick={() => handleDeleteJob(job)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === "applications" && (
              <div className="admin-card">
                <div className="admin-section-head">
                  <div>
                    <h2>Applications</h2>
                    <p>Candidates who applied through the career page.</p>
                  </div>
                </div>
                {applications.length === 0 ? (
                  <div className="admin-empty">No applications yet.</div>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Role</th>
                          <th>Candidate</th>
                          <th>Contact</th>
                          <th>Experience</th>
                          <th>Documents</th>
                          <th>Applied</th>
                          <th>Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.map((application) => {
                          const candidateName =
                            [
                              application.legal_first_name,
                              application.legal_middle_name,
                              application.legal_last_name,
                            ]
                              .filter(Boolean)
                              .join(" ") || application.full_name;
                          const profile = application.linkedin_profile || application.portfolio_url;
                          const expanded = expandedApplication === application.id;
                          return (
                            <Fragment key={application.id}>
                              <tr>
                                <td style={{ fontWeight: 600 }}>
                                  {application.job_title ?? "Removed role"}
                                </td>
                                <td>{candidateName}</td>
                                <td>
                                  <a href={`mailto:${application.email}`} className="admin-link">
                                    {application.email}
                                  </a>
                                  {application.phone && (
                                    <div className="admin-date">
                                      {[application.calling_code, application.phone]
                                        .filter(Boolean)
                                        .join(" ")}
                                    </div>
                                  )}
                                  {profile && (
                                    <div>
                                      <a
                                        href={profile}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="admin-link"
                                      >
                                        LinkedIn
                                      </a>
                                    </div>
                                  )}
                                </td>
                                <td>{application.years_experience || "—"}</td>
                                <td>
                                  <a
                                    className="admin-resume-link"
                                    href={`/api/admin/applications/${application.id}/resume`}
                                    download
                                  >
                                    Download CV
                                  </a>
                                  {application.cover_letter_filename && (
                                    <div style={{ marginTop: 6 }}>
                                      <a
                                        className="admin-resume-link"
                                        href={`/api/admin/applications/${application.id}/cover-letter`}
                                        download
                                      >
                                        Cover letter
                                      </a>
                                    </div>
                                  )}
                                </td>
                                <td className="admin-date">
                                  {new Date(application.created_at).toLocaleString(undefined, {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                  })}
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="admin-toggle-btn"
                                    onClick={() =>
                                      setExpandedApplication(expanded ? null : application.id)
                                    }
                                  >
                                    {expanded ? "Hide" : "View"}
                                  </button>
                                </td>
                              </tr>
                              {expanded && (
                                <tr>
                                  <td className="admin-detail-cell" colSpan={7}>
                                    <div className="admin-detail-grid">
                                      <div className="admin-detail-item">
                                        <span>Gender</span>
                                        <strong>{application.gender || "—"}</strong>
                                      </div>
                                      <div className="admin-detail-item">
                                        <span>Country of residence</span>
                                        <strong>{application.country_residence || "—"}</strong>
                                      </div>
                                      <div className="admin-detail-item">
                                        <span>Address</span>
                                        <strong>
                                          {[
                                            application.address_line_1,
                                            application.address_line_2,
                                          ]
                                            .filter(Boolean)
                                            .join(", ") || "—"}
                                        </strong>
                                      </div>
                                      <div className="admin-detail-item">
                                        <span>City / Region / Postal</span>
                                        <strong>
                                          {[
                                            application.city,
                                            application.state_province_region,
                                            application.postal_code,
                                          ]
                                            .filter(Boolean)
                                            .join(", ") || "—"}
                                        </strong>
                                      </div>
                                      <div className="admin-detail-item">
                                        <span>Current / most recent title</span>
                                        <strong>{application.current_job_title || "—"}</strong>
                                      </div>
                                      <div className="admin-detail-item">
                                        <span>Current / most recent employer</span>
                                        <strong>{application.current_employer || "—"}</strong>
                                      </div>
                                      <div className="admin-detail-item">
                                        <span>Highest qualification</span>
                                        <strong>{application.highest_qualification || "—"}</strong>
                                      </div>
                                      <div className="admin-detail-item">
                                        <span>Notice period</span>
                                        <strong>{application.notice_period || "—"}</strong>
                                      </div>
                                      <div className="admin-detail-item">
                                        <span>Work entitlement</span>
                                        <strong>{application.work_entitlement || "—"}</strong>
                                      </div>
                                      <div className="admin-detail-item">
                                        <span>Previously employed by Sytrion</span>
                                        <strong>{application.previously_employed || "—"}</strong>
                                      </div>
                                      <div className="admin-detail-item">
                                        <span>Declarations accepted</span>
                                        <strong>
                                          {application.disability_consent === 1 &&
                                          application.certification_consent === 1
                                            ? "Yes"
                                            : "No"}
                                        </strong>
                                      </div>
                                      <div className="admin-detail-item">
                                        <span>Additional note</span>
                                        <strong>{application.impact_statement || "—"}</strong>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      )}
    </>
  );
}
