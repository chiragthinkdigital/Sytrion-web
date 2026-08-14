"use client";

import Link from "next/link";
import React, { useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   Design-system reuse (mapped from Home/About):
   - Colors: --color-primary #C6E84A, --color-offblack #0f0f0f, #F5F6F0 / #F8F8F8
     light section backgrounds, #5A5D66 muted text (same tokens as About/Industries).
   - Typography: .heading-display (letter-spacing/line-height), .eyebrow-badge pill,
     Syne headings via font-family var(--font-syne), Geist body.
   - Buttons: global .btn-primary (lime pill w/ shine) and .btn-secondary (outline)
     from globals.css — same as used on dark Home sections.
   - Cards: white borderless-elevation card (card-elevated pattern from globals.css)
     and the lime-top-border tile pattern from the old products grid (prod-solutions-card).
   - Icons: inline lucide-style SVGs (stroke currentColor, 24 viewBox) — the same
     icon approach used across Hero/About/Contact (lucide-react is installed but the
     site inlines SVGs; reusing that inline pattern).
   - Motion: hover lift translateY(-4px) + soft shadow (card-elevated), CSS smooth
     scroll (html { scroll-behavior: smooth } in globals.css). No new motion system.
   - Section rhythm: padding 100px 80px → 80px 40px → 60px 20px, max-width 1400px,
     alternating light/warm/dark backgrounds — identical to Home/About sections.
   ───────────────────────────────────────────────────────────────────────────── */

const icons: Record<string, React.ReactNode> = {
  sparkles: (
    <>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </>
  ),
  cpu: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </>
  ),
  settings: (
    <>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </>
  ),
  "bar-chart": (
    <>
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </>
  ),
  ship: (
    <>
      <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" />
      <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
      <path d="M12 10v4" />
      <path d="M12 2v3" />
    </>
  ),
  "heart-pulse": (
    <>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
    </>
  ),
  anchor: (
    <>
      <path d="M12 22V8" />
      <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
      <circle cx="12" cy="5" r="3" />
    </>
  ),
  "file-text": (
    <>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </>
  ),
  "file-check": (
    <>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="m9 15 2 2 4-4" />
    </>
  ),
  "file-search": (
    <>
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
      <circle cx="11.5" cy="14.5" r="2.5" />
      <path d="m13.5 16.5 2.5 2.5" />
    </>
  ),
  receipt: (
    <>
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 17.5v-11" />
    </>
  ),
  "alert-circle": (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </>
  ),
  workflow: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="13" width="8" height="8" rx="2" />
      <path d="M7 11v4a2 2 0 0 0 2 2h4" />
    </>
  ),
  zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  "trending-up": (
    <>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </>
  ),
  "check-circle": (
    <>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </>
  ),
  shield: (
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  ),
  "shield-check": (
    <>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  gauge: (
    <>
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </>
  ),
  layers: (
    <>
      <path d="m12 2 10 6.5-10 6.5L2 8.5Z" />
      <path d="m2 15.5 10 6.5 10-6.5" />
      <path d="m2 11.5 10 6.5 10-6.5" />
    </>
  ),
  "mouse-pointer": <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />,
  clipboard: (
    <>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </>
  ),
  "scan-text": (
    <>
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M7 8h8" />
      <path d="M7 12h10" />
      <path d="M7 16h6" />
    </>
  ),
};

function SolIcon({ name, size = 22 }: { name: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ── Capabilities overview (interactive rail + preview) ───────────────── */
const capabilities = [
  {
    number: "01",
    icon: "sparkles",
    title: "AI Automation & Agentic AI",
    tagline: "Automate. Understand. Act.",
    description:
      "Move from conventional process automation towards AI-enabled, agentic operations that understand information, support decisions and coordinate workflows.",
    chips: ["Agentic AI", "Document intelligence", "Workflow orchestration"],
    href: "/solutions#ai-automation",
  },
  {
    number: "02",
    icon: "settings",
    title: "Intelligent Operations",
    tagline: "Operate. Optimize. Scale.",
    description:
      "People, process, technology and performance management working together to operate and improve business-critical processes reliably every day.",
    chips: ["Process operations", "Quality assurance", "Exception handling"],
    href: "/solutions#intelligent-operations",
  },
  {
    number: "03",
    icon: "database",
    title: "Data Engineering",
    tagline: "Structure. Connect. Activate.",
    description:
      "Transform fragmented information across systems and formats into structured, accurate and usable data assets that support operations, analytics and AI.",
    chips: ["Data validation", "Enrichment", "AI-ready data"],
    href: "/solutions#data-engineering",
  },
  {
    number: "04",
    icon: "bar-chart",
    title: "Analytics & Business Intelligence",
    tagline: "Measure. Understand. Decide.",
    description:
      "Transform enterprise and operational data into clear, relevant and actionable insights — from executive dashboards to predictive analytics.",
    chips: ["Dashboards", "KPI monitoring", "Predictive analytics"],
    href: "/solutions#analytics-bi",
  },
  {
    number: "05",
    icon: "ship",
    title: "Shipping & Logistics Solutions",
    tagline: "Simplify complex logistics operations.",
    description:
      "Shipping domain expertise combined with intelligent operations, automation and data to simplify complex workflows across freight and customs.",
    chips: ["Freight forwarding", "Customs documentation", "Logistics analytics"],
    href: "/solutions#shipping-logistics",
  },
  {
    number: "06",
    icon: "heart-pulse",
    title: "Healthcare Operations",
    tagline: "Smarter healthcare administration.",
    description:
      "Intelligent document processing, automation, data and managed operations that streamline administrative workflows with a focus on security and accuracy.",
    chips: ["Claims operations", "Document intelligence", "Secure delivery"],
    href: "/solutions#healthcare-operations",
  },
];

/* ── Section 3 — AI Automation ─────────────────────────────────────────── */
const aiCapabilities = [
  "Intelligent workflow automation",
  "Agentic AI solutions",
  "AI-assisted business processes",
  "Intelligent document processing",
  "Cognitive data extraction",
  "Workflow orchestration",
  "Human-in-the-loop automation",
  "Enterprise AI integration",
  "Process intelligence",
  "AI-enabled decision support",
];
const aiImpact = [
  { icon: "mouse-pointer", title: "Less Manual Effort", desc: "Reduce repetitive and information-intensive work." },
  { icon: "zap", title: "Faster Processing", desc: "Reduce delays across multi-step workflows." },
  { icon: "check-circle", title: "Greater Consistency", desc: "Apply business rules more consistently at scale." },
  { icon: "target", title: "Better Decisions", desc: "Bring intelligence closer to the point of action." },
];

/* ── Section 4 — Intelligent Operations ────────────────────────────────── */
const opsCapabilities = [
  { icon: "settings", label: "Business process operations" },
  { icon: "clipboard", label: "Back-office operations" },
  { icon: "receipt", label: "Transaction processing" },
  { icon: "file-text", label: "Document-intensive operations" },
  { icon: "workflow", label: "Workflow management" },
  { icon: "layers", label: "Process standardization" },
  { icon: "shield-check", label: "Quality assurance" },
  { icon: "alert-circle", label: "Exception management" },
  { icon: "bar-chart", label: "Operational reporting" },
  { icon: "zap", label: "Process automation" },
  { icon: "gauge", label: "Performance management" },
];
const opsFramework = [
  { icon: "users", title: "People", desc: "Domain-aware teams with clearly defined responsibilities." },
  { icon: "workflow", title: "Process", desc: "Standardized workflows designed for quality and consistency." },
  { icon: "cpu", title: "Technology", desc: "AI and automation embedded where they add measurable value." },
  { icon: "gauge", title: "Performance", desc: "Defined controls, service levels and continuous improvement." },
];

/* ── Section 5 — Data Engineering ──────────────────────────────────────── */
const dataCapabilities = [
  "Data processing",
  "Data cleansing",
  "Data validation",
  "Data enrichment",
  "Data transformation",
  "Data migration",
  "Data integration",
  "Master data support",
  "Data quality management",
  "Unstructured data processing",
  "AI-ready data preparation",
];
const dataProcess = [
  { title: "Collect", desc: "Bring data together from relevant systems, sources and formats." },
  { title: "Process", desc: "Transform raw information into structured and usable data." },
  { title: "Validate", desc: "Improve accuracy, completeness and consistency." },
  { title: "Enrich", desc: "Add context and value to information." },
  { title: "Integrate", desc: "Connect data across systems and business processes." },
  { title: "Activate", desc: "Make trusted information available for operations, analytics and AI." },
];

/* ── Section 6 — Analytics & BI ────────────────────────────────────────── */
const analyticsCapabilities = [
  "Executive dashboards",
  "Operational dashboards",
  "Business intelligence",
  "KPI monitoring",
  "Management reporting",
  "Automated reporting",
  "Data visualization",
  "Trend analysis",
  "Variance analysis",
  "Predictive analytics",
  "Decision intelligence",
];
const analyticsFramework = [
  { icon: "eye", title: "Visibility", desc: "Understand what is happening across the business." },
  { icon: "lightbulb", title: "Insight", desc: "Identify trends, exceptions and opportunities." },
  { icon: "trending-up", title: "Prediction", desc: "Use historical information to understand what may happen next." },
  { icon: "target", title: "Action", desc: "Give teams the intelligence needed to make informed decisions." },
];

/* ── Section 8 — Shipping & Logistics ──────────────────────────────────── */
const shippingCapabilities = [
  { icon: "anchor", title: "Freight Forwarding Operations", desc: "Operational support across freight-forwarding workflows, helping teams manage high-volume activities with greater speed and consistency." },
  { icon: "file-text", title: "Shipping Documentation", desc: "Processing, validating and managing business-critical shipping documents across operational workflows." },
  { icon: "file-check", title: "Customs Documentation Support", desc: "Structured support for customs-related documentation, data processing and validation." },
  { icon: "receipt", title: "Invoice & Billing Operations", desc: "Processing and validating freight invoices, supporting billing workflows and identifying exceptions." },
  { icon: "database", title: "Shipment Data Management", desc: "Capturing, validating, enriching and maintaining shipment-related operational information." },
  { icon: "alert-circle", title: "Exception & Dispute Management", desc: "Structured handling of discrepancies and operational exceptions to support faster resolution." },
  { icon: "workflow", title: "Workflow Automation", desc: "Applying intelligent automation to repetitive documentation and operational processes." },
  { icon: "trending-up", title: "Logistics Analytics", desc: "Creating visibility into operational volumes, performance, exceptions and trends." },
];
const shippingTags = [
  "Shipping companies",
  "Freight forwarders",
  "Logistics service providers",
  "3PL organizations",
  "Supply-chain businesses",
  "Transportation operations",
];

/* ── Section 9 — Healthcare Operations ─────────────────────────────────── */
const healthcareCapabilities = [
  { icon: "clipboard", title: "Claims Operations", desc: "Technology-enabled support for claims-related administrative processes and workflows." },
  { icon: "scan-text", title: "Document Intelligence", desc: "Using intelligent technologies to capture, classify, extract and process information from healthcare-related documents." },
  { icon: "database", title: "Healthcare Data Processing", desc: "Structured processing, validation and management of operational healthcare data." },
  { icon: "workflow", title: "Workflow Automation", desc: "Automating repetitive administrative activities and routing information intelligently across processes." },
  { icon: "file-text", title: "Document Management", desc: "Organizing and processing high-volume documentation through structured operational workflows." },
  { icon: "check-circle", title: "Data Validation & Quality Control", desc: "Applying defined validation and quality processes to improve accuracy and consistency." },
  { icon: "bar-chart", title: "Operational Reporting", desc: "Creating visibility into processing volumes, turnaround times, exceptions and operational performance." },
  { icon: "shield-check", title: "Secure Operational Support", desc: "Delivery practices designed around confidentiality, controlled access and responsible information handling." },
];

/* ── Section 10 — Connected Ecosystem ──────────────────────────────────── */
const ecosystem = [
  { icon: "sparkles", title: "AI Automation", desc: "Understand and automate." },
  { icon: "settings", title: "Intelligent Operations", desc: "Execute and optimize." },
  { icon: "database", title: "Data Engineering", desc: "Structure and connect." },
  { icon: "bar-chart", title: "Analytics & BI", desc: "Measure and understand." },
  { icon: "compass", title: "Domain Expertise", desc: "Apply with context." },
];

/* ── Section 11 — Approach ─────────────────────────────────────────────── */
const approachSteps = [
  { title: "Discover", desc: "Understand your processes, systems, data, people and business objectives." },
  { title: "Diagnose", desc: "Identify bottlenecks, manual effort, fragmented workflows and opportunities for improvement." },
  { title: "Design", desc: "Create the right combination of process, technology, automation and operational support." },
  { title: "Implement", desc: "Introduce the solution through a structured transition designed around business continuity." },
  { title: "Operate", desc: "Manage agreed processes with defined controls, quality standards and performance measures." },
  { title: "Improve", desc: "Continuously identify opportunities for automation, optimization and greater intelligence." },
];

/* ── Section 12 — Differentiators ──────────────────────────────────────── */
const differentiators = [
  { icon: "sparkles", title: "AI-First Thinking", desc: "We identify where intelligence can create meaningful operational value." },
  { icon: "settings", title: "Operational Expertise", desc: "Technology combined with an understanding of how business processes actually work." },
  { icon: "shield", title: "Security by Design", desc: "Security, confidentiality and governance considered throughout delivery." },
  { icon: "layers", title: "Scalable Delivery", desc: "Solutions designed to evolve alongside changing business requirements." },
  { icon: "trending-up", title: "Data-Driven Improvement", desc: "Use operational intelligence to continuously identify improvement opportunities." },
  { icon: "users", title: "Customer Partnership", desc: "Work as an extension of client teams with transparency and accountability." },
];

/* ── Section 13 — Security & Trust ─────────────────────────────────────── */
const securityTags = [
  "Secure Infrastructure",
  "Role-Based Access",
  "Confidentiality First",
  "Governance Frameworks",
  "Business Continuity",
  "Audit-Ready Processes",
  "Compliance-Oriented Operations",
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow-badge">{children}</span>;
}

function SectionHeading({
  children,
  size = "lg",
}: {
  children: React.ReactNode;
  size?: "lg" | "md";
}) {
  return (
    <h2
      className="heading-display sol-h2"
      style={{ fontSize: size === "lg" ? "clamp(32px, 5vw, 48px)" : "clamp(28px, 4vw, 40px)" }}
    >
      {children}
    </h2>
  );
}

function IntroText({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={dark ? "sol-lead sol-lead--dark" : "sol-lead"}
      style={{ marginBottom: "16px", maxWidth: "720px" }}
    >
      {children}
    </p>
  );
}

function CapabilitiesGrid({ items }: { items: string[] }) {
  return (
    <div className="sol-checks">
      {items.map((item) => (
        <div key={item} className="sol-check">
          <span className="sol-check-icon">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <span className="sol-check-text">{item}</span>
        </div>
      ))}
    </div>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return <span className="sol-sublabel">{children}</span>;
}

function Callout({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={dark ? "sol-callout sol-callout--dark" : "sol-callout"}>
      <div className="sol-callout-rule" />
      <p className="sol-callout-line">{children}</p>
    </div>
  );
}

function CapabilitiesRail() {
  const [active, setActive] = useState(0);
  const cap = capabilities[active];

  return (
    <div className="sol-rail-layout">
      <div className="sol-rail" role="group" aria-label="Capabilities">
        {capabilities.map((item, i) => (
          <button
            key={item.number}
            type="button"
            className={"sol-rail-item" + (i === active ? " active" : "")}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            onFocus={() => setActive(i)}
            aria-pressed={i === active}
          >
            <span className="sol-rail-num">{item.number}</span>
            <span className="sol-rail-body">
              <span className="sol-rail-title">{item.title}</span>
              <span className="sol-rail-tagline">{item.tagline}</span>
            </span>
            <span className="sol-rail-arrow">
              <ArrowIcon />
            </span>
          </button>
        ))}
      </div>

      <div className="sol-preview" aria-live="polite" aria-atomic="true">
        <span className="sol-preview-ghost" aria-hidden="true">{cap.number}</span>
        <div className="sol-preview-body" key={cap.number}>
          <div className="sol-preview-icon">
            <SolIcon name={cap.icon} size={34} />
          </div>
          <h3 className="sol-preview-title">{cap.title}</h3>
          <p className="sol-preview-tagline">{cap.tagline}</p>
          <p className="sol-preview-desc">{cap.description}</p>
          <div className="sol-preview-chips">
            {cap.chips.map((chip) => (
              <span key={chip} className="sol-preview-chip">{chip}</span>
            ))}
          </div>
          <div className="sol-preview-divider" />
          <div className="sol-preview-foot">
            <Link href={cap.href} className="sol-preview-cta">
              Explore capability
              <ArrowIcon />
            </Link>
            <div className="sol-preview-dots" aria-hidden="true">
              {capabilities.map((item, i) => (
                <span
                  key={item.number}
                  className={"sol-preview-dot" + (i === active ? " active" : "")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SolutionsPage() {
  return (
    <>
      <style>{`
        .sol-section {
          position: relative;
          width: 100%;
          padding: 100px 80px;
          overflow: hidden;
        }
        .sol-section--warm { background: #F5F6F0; }
        .sol-section--white { background: #ffffff; }
        .sol-section--cream { background: #F8F8F8; }
        .sol-section--dark { background: #0f0f0f; }
        .sol-section--dark-alt { background: #0a0a0a; }

        .sol-wrap {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        section[id] {
          scroll-margin-top: 110px;
        }

        /* ── Typography ─────────────────────────────────── */
        .sol-h2 {
          font-family: var(--font-syne), sans-serif;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.15;
          letter-spacing: -0.02em;
          width: 100%;
          box-sizing: border-box;
          margin: 0 0 20px;
        }
        .sol-lead {
          font-size: 17px;
          font-weight: 400;
          color: #5A5D66;
          line-height: 1.8;
          margin: 0;
        }
        .sol-lead--dark { color: rgba(255,255,255,0.62); }
        .sol-sublabel {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #4d7c0f;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-family: var(--font-geist-sans), sans-serif;
          margin: 0 0 20px;
        }

        /* ── Hero ───────────────────────────────────────── */
        .sol-hero {
          position: relative;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          padding: 160px 80px 120px;
          background: #0f0f0f;
          overflow: hidden;
        }
        .sol-hero-glow {
          position: absolute;
          top: 22%;
          left: 55%;
          width: 720px;
          height: 720px;
          background: radial-gradient(circle, rgba(198,232,74,0.07) 0%, transparent 60%);
          border-radius: 50%;
          pointer-events: none;
        }
        .sol-hero-orb {
          position: absolute;
          bottom: -18%;
          right: -8%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(198,232,74,0.05) 0%, transparent 60%);
          border-radius: 50%;
          pointer-events: none;
        }
        .sol-hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 80% 70% at 55% 40%, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 55% 40%, black 30%, transparent 80%);
        }
        .sol-hero-content {
          max-width: 860px;
          position: relative;
          z-index: 2;
        }
        .sol-hero-title {
          font-size: clamp(40px, 6vw, 68px);
          font-family: var(--font-syne), sans-serif;
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin: 0 0 32px;
          text-wrap: balance;
        }
        .sol-hero-title span { color: #C6E84A; }
        .sol-hero-body {
          font-size: 18px;
          font-weight: 400;
          color: rgba(255,255,255,0.6);
          line-height: 1.75;
          max-width: 640px;
          margin: 0;
        }
        .sol-hero-ctas {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: 44px;
        }
        .sol-hero-ctas .btn-primary,
        .sol-hero-ctas .btn-secondary {
          font-size: 16px;
          padding: 16px 34px;
        }

        /* ── Overview cards ─────────────────────────────── */
        .sol-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .sol-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        .sol-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .sol-grid-6 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

        /* ── Capabilities rail + preview ────────────────── */
        .sol-rail-layout {
          display: grid;
          grid-template-columns: minmax(0, 45%) minmax(0, 55%);
          gap: 56px;
          align-items: stretch;
        }

        .sol-rail {
          display: flex;
          flex-direction: column;
          border-top: 1px solid rgba(0,0,0,0.1);
        }
        .sol-rail-item {
          display: flex;
          align-items: center;
          gap: 20px;
          width: 100%;
          padding: 22px 18px;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(0,0,0,0.1);
          border-radius: 14px;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          color: inherit;
          transition: background 0.25s ease, border-color 0.25s ease;
        }
        .sol-rail-item:hover,
        .sol-rail-item.active {
          background: rgba(198,232,74,0.16);
          border-bottom-color: transparent;
        }
        .sol-rail-num {
          flex-shrink: 0;
          font-family: var(--font-geist-mono), monospace;
          font-size: 14px;
          font-weight: 600;
          color: #8A8D96;
          transition: color 0.25s ease;
        }
        .sol-rail-item:hover .sol-rail-num,
        .sol-rail-item.active .sol-rail-num {
          color: #4d7c0f;
        }
        .sol-rail-body {
          flex: 1;
          min-width: 0;
        }
        .sol-rail-title {
          display: block;
          font-size: 18px;
          font-weight: 700;
          color: #242424;
          line-height: 1.3;
        }
        .sol-rail-tagline {
          display: block;
          font-size: 13.5px;
          font-weight: 400;
          color: #5A5D66;
          line-height: 1.5;
          margin-top: 4px;
        }
        .sol-rail-arrow {
          flex-shrink: 0;
          display: inline-flex;
          margin-left: auto;
          opacity: 0;
          transform: translateX(-8px);
          color: #242424;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .sol-rail-item:hover .sol-rail-arrow,
        .sol-rail-item.active .sol-rail-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── Capabilities preview panel ─────────────────── */
        .sol-preview {
          position: relative;
          background: #0f0f0f;
          border-radius: 24px;
          padding: 56px 48px 40px;
          overflow: hidden;
          min-height: 540px;
          display: flex;
          flex-direction: column;
        }
        .sol-preview-ghost {
          position: absolute;
          top: -12px;
          right: -8px;
          font-family: var(--font-syne), sans-serif;
          font-size: clamp(120px, 16vw, 190px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.05em;
          color: rgba(255,255,255,0.05);
          pointer-events: none;
          user-select: none;
        }
        .sol-preview-body {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          flex: 1;
          animation: solPreviewIn 0.25s ease;
        }
        @keyframes solPreviewIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sol-preview-icon {
          width: 76px;
          height: 76px;
          border-radius: 20px;
          background: #C6E84A;
          color: #0f0f0f;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 28px;
        }
        .sol-preview-title {
          font-size: clamp(28px, 3vw, 38px);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.15;
          margin: 0 0 12px;
        }
        .sol-preview-tagline {
          font-size: 15px;
          font-weight: 600;
          color: #C6E84A;
          margin: 0 0 16px;
        }
        .sol-preview-desc {
          font-size: 16px;
          font-weight: 400;
          color: rgba(255,255,255,0.72);
          line-height: 1.7;
          max-width: 46ch;
          margin: 0 0 28px;
        }
        .sol-preview-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 32px;
        }
        .sol-preview-chip {
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          color: rgba(255,255,255,0.85);
          font-size: 13px;
          font-weight: 500;
        }
        .sol-preview-divider {
          height: 1px;
          background: rgba(255,255,255,0.12);
          margin: 0 0 24px;
        }
        .sol-preview-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          margin-top: auto;
        }
        .sol-preview-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #C6E84A;
          color: #0f0f0f;
          padding: 14px 26px;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .sol-preview-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(198,232,74,0.3);
        }
        .sol-preview-cta:active {
          transform: scale(0.98);
        }
        .sol-preview-cta svg {
          transition: transform 0.3s ease;
        }
        .sol-preview-cta:hover svg {
          transform: translateX(4px);
        }
        .sol-preview-dots {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .sol-preview-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: rgba(255,255,255,0.25);
          transition: width 0.25s ease, background 0.25s ease;
        }
        .sol-preview-dot.active {
          width: 22px;
          background: #C6E84A;
        }
        @media (max-width: 880px) {
          .sol-rail-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .sol-preview {
            min-height: 0;
            padding: 44px 32px 32px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .sol-preview-body {
            animation: none;
          }
          .sol-rail-arrow,
          .sol-rail-item:hover .sol-rail-arrow,
          .sol-rail-item.active .sol-rail-arrow {
            transition: none;
            transform: none;
            opacity: 1;
          }
        }

        /* ── Capability detail cards ────────────────────── */
        .sol-cap-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 32px 28px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.06);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .sol-cap-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.1);
        }
        .sol-cap-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: rgba(198,232,74,0.12);
          color: #4d7c0f;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          transition: background 0.25s ease, color 0.25s ease;
        }
        .sol-cap-card:hover .sol-cap-icon {
          background: #C6E84A;
          color: #0f0f0f;
        }
        .sol-cap-title {
          font-size: 17px;
          font-weight: 700;
          color: #242424;
          line-height: 1.3;
          margin: 0 0 10px;
        }
        .sol-cap-desc {
          font-size: 14px;
          font-weight: 400;
          color: #5A5D66;
          line-height: 1.65;
          margin: 0;
        }

        /* ── Check list (capabilities) ──────────────────── */
        .sol-checks {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px 40px;
        }
        .sol-check {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .sol-check-icon {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(198,232,74,0.16);
          color: #4d7c0f;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .sol-check-text {
          font-size: 15px;
          font-weight: 500;
          color: #242424;
          line-height: 1.5;
        }

        /* ── Impact / framework cards ───────────────────── */
        .sol-impact { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .sol-impact-card {
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 20px;
          padding: 30px 26px;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .sol-impact-card:hover {
          transform: translateY(-4px);
          border-color: rgba(198,232,74,0.4);
          box-shadow: 0 12px 32px rgba(0,0,0,0.08);
        }
        .sol-impact-icon {
          width: 46px;
          height: 46px;
          border-radius: 13px;
          background: rgba(198,232,74,0.12);
          color: #4d7c0f;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .sol-impact-title {
          font-size: 17px;
          font-weight: 700;
          color: #242424;
          line-height: 1.3;
          margin: 0 0 8px;
        }
        .sol-impact-desc {
          font-size: 14px;
          font-weight: 400;
          color: #5A5D66;
          line-height: 1.65;
          margin: 0;
        }

        /* ── Data process flow ──────────────────────────── */
        .sol-flow { display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; }
        .sol-flow-item {
          position: relative;
          text-align: center;
          padding: 26px 16px;
          background: #ffffff;
          border-radius: 16px;
          border-top: 4px solid rgba(198,232,74,0.5);
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.06);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }
        .sol-flow-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.1);
        }
        .sol-flow-num {
          width: 40px;
          height: 40px;
          margin: 0 auto 16px;
          border-radius: 50%;
          background: #C6E84A;
          color: #0f0f0f;
          font-size: 15px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sol-flow-title {
          font-size: 15px;
          font-weight: 700;
          color: #242424;
          margin: 0 0 8px;
        }
        .sol-flow-desc {
          font-size: 13px;
          font-weight: 400;
          color: #5A5D66;
          line-height: 1.6;
          margin: 0;
        }

        /* ── Steps (approach) ───────────────────────────── */
        .sol-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .sol-step {
          background: #ffffff;
          border-radius: 20px;
          border-top: 4px solid rgba(198,232,74,0.5);
          padding: 32px 28px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.06);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }
        .sol-step:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.1);
        }
        .sol-step-num {
          font-size: 12px;
          font-weight: 700;
          color: #4d7c0f;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 14px;
          display: block;
        }
        .sol-step-title {
          font-size: 20px;
          font-weight: 700;
          color: #242424;
          margin: 0 0 10px;
        }
        .sol-step-desc {
          font-size: 15px;
          font-weight: 400;
          color: #5A5D66;
          line-height: 1.7;
          margin: 0;
        }

        /* ── Callout ────────────────────────────────────── */
        .sol-callout {
          text-align: center;
          margin: 56px auto 0;
          max-width: 760px;
        }
        .sol-callout-rule {
          width: 48px;
          height: 3px;
          background: #C6E84A;
          border-radius: 2px;
          margin: 0 auto 20px;
        }
        .sol-callout-line {
          font-size: clamp(20px, 2.6vw, 26px);
          font-weight: 700;
          color: #0f0f0f;
          line-height: 1.5;
          font-family: var(--font-syne), sans-serif;
          margin: 0;
        }
        .sol-callout--dark .sol-callout-line { color: #FFFFFF; }
        .sol-callout--dark .sol-callout-line span { color: #C6E84A; }

        /* ── Tags / pills ──────────────────────────────── */
        .sol-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .sol-tag {
          padding: 10px 22px;
          border-radius: 999px;
          background: rgba(198,232,74,0.12);
          border: 1px solid rgba(198,232,74,0.35);
          color: #242424;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.4;
        }
        .sol-tag--dark {
          background: rgba(198,232,74,0.08);
          border-color: rgba(198,232,74,0.3);
          color: #F5F5F0;
        }

        /* ── Ecosystem row ─────────────────────────────── */
        .sol-eco { display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; }
        .sol-eco-item {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 20px;
          padding: 32px 24px;
          text-align: center;
          transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
        }
        .sol-eco-item:hover {
          border-color: rgba(198,232,74,0.4);
          background: rgba(198,232,74,0.06);
          transform: translateY(-4px);
        }
        .sol-eco-icon {
          width: 52px;
          height: 52px;
          margin: 0 auto 18px;
          border-radius: 14px;
          background: rgba(198,232,74,0.12);
          border: 1px solid rgba(198,232,74,0.2);
          color: #C6E84A;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sol-eco-title {
          font-size: 16px;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 6px;
        }
        .sol-eco-desc {
          font-size: 13.5px;
          font-weight: 400;
          color: rgba(255,255,255,0.55);
          line-height: 1.6;
          margin: 0;
        }

        /* ── Dark section headings ─────────────────────── */
        .sol-h2--dark { color: #FFFFFF; }

        /* ── Industry intro ────────────────────────────── */
        .sol-industry-intro { text-align: center; max-width: 900px; margin: 0 auto; }
        .sol-industry-intro .sol-h2 { margin-left: auto; margin-right: auto; max-width: 780px; }

        /* ── CTA band ──────────────────────────────────── */
        .sol-cta-band { text-align: center; }
        .sol-cta-band .sol-wrap { max-width: 780px; }
        .sol-cta-buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: 40px;
        }

        /* ── Responsive ────────────────────────────────── */
        @media (max-width: 1024px) {
          .sol-section, .sol-hero { padding: 80px 40px; }
          .sol-hero { padding-top: 150px; min-height: auto; }
          .sol-grid-3, .sol-grid-6 { grid-template-columns: repeat(2, 1fr); }
          .sol-grid-4, .sol-impact { grid-template-columns: repeat(2, 1fr); }
          .sol-flow { grid-template-columns: repeat(3, 1fr); }
          .sol-eco { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .sol-section, .sol-hero { padding: 60px 20px; }
          .sol-hero { padding-top: 130px; }
          .sol-grid-3, .sol-grid-2, .sol-grid-4, .sol-grid-6,
          .sol-impact, .sol-steps, .sol-flow, .sol-eco {
            grid-template-columns: 1fr;
          }
          .sol-checks { grid-template-columns: 1fr; }
          .sol-hero-ctas, .sol-cta-buttons {
            flex-direction: column;
            align-items: stretch;
          }
          .sol-hero-ctas .btn-primary,
          .sol-hero-ctas .btn-secondary,
          .sol-cta-buttons .btn-primary,
          .sol-cta-buttons .btn-secondary {
            width: 100%;
            max-width: 320px;
            justify-content: center;
            margin: 0 auto;
          }
          .sol-callout { margin-top: 44px; }
        }
      `}</style>

      {/* ══════════════════════ 1. HERO ══════════════════════ */}
      <section className="sol-hero">
        <div className="sol-hero-grid" />
        <div className="sol-hero-glow" />
        <div className="sol-hero-orb" />
        <div className="grain-overlay absolute inset-0 pointer-events-none" />

        <div className="sol-hero-content">
          <Eyebrow>Our Solutions</Eyebrow>

          <h1 className="sol-hero-title">
            Intelligence built around <span>the way your business works.</span>
          </h1>

          <p className="sol-hero-body">
            Every business has its own complexities — processes that consume time, data that
            remains underused, systems that do not always work together, and decisions that
            need to happen faster.
          </p>
          <p className="sol-hero-body" style={{ marginTop: "16px" }}>
            Sytrion brings together AI, automation, data, analytics and operational expertise
            to solve these challenges — helping organizations simplify operations, improve
            productivity and build for what comes next.
          </p>

          <div className="sol-hero-ctas">
            <a href="#capabilities" className="btn-primary">
              Explore Our Solutions
              <ArrowIcon />
            </a>
            <Link href="/contact" className="btn-secondary">
              Talk to Our Experts
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════ 2. CAPABILITIES OVERVIEW ══════════════════════ */}
      <section id="capabilities" className="sol-section sol-section--warm">
        <div className="sol-wrap">
          <div style={{ maxWidth: "720px", marginBottom: "56px" }}>
            <Eyebrow>Capabilities</Eyebrow>
            <SectionHeading>One partner. Multiple <span style={{ color: "#C6E84A" }}>capabilities</span>. One connected approach.</SectionHeading>
            <p className="sol-lead" style={{ maxWidth: "620px" }}>
              Our capabilities work individually or together, depending on the challenge you
              need to solve.
            </p>
          </div>

          <CapabilitiesRail />
        </div>
      </section>

{/* ══════════════════════ 3. AI AUTOMATION & AGENTIC AI ══════════════════════ */}
      <style>{`
        .ai-auto-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          margin-bottom: 80px;
        }
        .ai-bento-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 24px;
          margin-top: 80px;
        }
        .ai-bento-left {
          grid-column: span 7;
        }
        .ai-bento-right {
          grid-column: span 5;
        }
        @media (max-width: 1024px) {
          .ai-auto-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .ai-bento-grid {
            grid-template-columns: 1fr;
          }
          .ai-bento-left, .ai-bento-right {
            grid-column: span 1;
          }
        }
      `}</style>
      <section id="ai-automation" className="sol-section" style={{ background: "#0a0a0a", position: "relative", overflow: "hidden" }}>
        {/* Background Effects */}
        <div style={{
          position: "absolute", top: "-20%", right: "-10%", width: "800px", height: "800px",
          background: "radial-gradient(circle, rgba(198,232,74,0.08) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none"
        }} />
        
        <div className="sol-wrap">
          {/* Header & Image Split */}
          <div className="ai-auto-grid">
            <div>
              <Eyebrow>AI Automation & Agentic AI</Eyebrow>
              <h2 className="heading-display sol-h2" style={{
                color: "#FFFFFF",
                fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 700,
                lineHeight: 1.15,
                margin: "0 0 24px",
                fontSize: "clamp(36px, 5vw, 56px)",
              }}>
                From repetitive tasks to <span style={{ color: "#C6E84A" }}>intelligent</span> action.
              </h2>
              <div style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "18px",
                lineHeight: 1.7,
                marginBottom: "32px",
              }}>
                <p style={{ marginBottom: "16px" }}>Automation has evolved. Businesses today need systems that can do more than follow predefined rules.</p>
                <p>Sytrion helps organizations move from conventional process automation towards AI-enabled and agentic operations — combining artificial intelligence, workflow automation and human expertise to improve the way work gets done.</p>
              </div>
              <Link href="/contact" className="btn-primary" style={{ display: "inline-flex" }}>
                Explore AI Opportunities
                <ArrowIcon />
              </Link>
            </div>
            
            <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(198,232,74,0.2)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
              <img 
                src="/AI-Automation-and-Agentic-AI-2.jpg" 
                alt="AI Automation & Agentic AI" 
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", aspectRatio: "4/3" }} 
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 60%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: "30px", left: "30px", display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "50px", height: "50px", borderRadius: "12px", background: "#C6E84A", display: "flex", alignItems: "center", justifyContent: "center", color: "#0f0f0f" }}>
                  <SolIcon name="sparkles" size={24} />
                </div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "18px" }}>Agentic Operations</div>
                  <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>Workflow orchestration</div>
                </div>
              </div>
            </div>
          </div>

          {/* New Bento Grid for Capabilities & Impact */}
          <div className="ai-bento-grid">
            
            {/* Capabilities Box */}
            <div className="ai-bento-left" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "48px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(198,232,74,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C6E84A" }}>
                  <SolIcon name="layers" size={20} />
                </div>
                <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", margin: 0 }}>Core Capabilities</h3>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {aiCapabilities.map((cap) => (
                  <span key={cap} style={{ 
                    padding: "10px 20px", 
                    background: "rgba(198,232,74,0.05)", 
                    border: "1px solid rgba(198,232,74,0.2)", 
                    borderRadius: "999px", 
                    color: "rgba(255,255,255,0.9)", 
                    fontSize: "14px", 
                    fontWeight: 500,
                    transition: "all 0.2s ease",
                    cursor: "default"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(198,232,74,0.15)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(198,232,74,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            {/* Impact List */}
            <div className="ai-bento-right" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {aiImpact.map((item, idx) => (
                <div key={item.title} style={{ 
                  background: idx === 0 ? "rgba(198,232,74,0.1)" : "rgba(255,255,255,0.03)", 
                  border: idx === 0 ? "1px solid rgba(198,232,74,0.3)" : "1px solid rgba(255,255,255,0.08)", 
                  borderRadius: "20px", 
                  padding: "24px", 
                  display: "flex", 
                  alignItems: "flex-start", 
                  gap: "16px",
                  transition: "transform 0.3s ease, background 0.3s ease"
                }}
                onMouseEnter={(e) => { if(idx !== 0) e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                onMouseLeave={(e) => { if(idx !== 0) e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                >
                  <div style={{ 
                    width: "48px", height: "48px", 
                    borderRadius: "12px", 
                    background: idx === 0 ? "#C6E84A" : "rgba(255,255,255,0.05)", 
                    color: idx === 0 ? "#0f0f0f" : "#C6E84A", 
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <SolIcon name={item.icon} size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "17px", fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>{item.title}</h4>
                    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div style={{ 
            marginTop: "60px", 
            padding: "36px", 
            background: "linear-gradient(90deg, rgba(198,232,74,0.08) 0%, rgba(198,232,74,0.02) 100%)", 
            borderLeft: "4px solid #C6E84A", 
            borderRadius: "0 20px 20px 0" 
          }}>
            <p style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 500, color: "#fff", margin: 0, fontStyle: "italic", lineHeight: 1.5 }}>
              "We don't introduce AI because it is new. We apply it where it can make operations meaningfully better."
            </p>
          </div>

        </div>
      </section>

      {/* ══════════════════════ 4. INTELLIGENT OPERATIONS ══════════════════════ */}
      <style>{`
        .io-section {
          padding: 120px 0;
          background: linear-gradient(180deg, #f8faf5 0%, #ffffff 50%, #f5f7f2 100%);
          position: relative;
          overflow: hidden;
        }
        .io-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(198,232,74,0.4), transparent);
        }

        /* Hero Row */
        .io-hero-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          margin-bottom: 100px;
        }
        .io-hero-text h2 {
          font-family: var(--font-syne), sans-serif;
          font-size: clamp(38px, 5vw, 56px);
          font-weight: 700;
          color: #0f172a;
          line-height: 1.12;
          letter-spacing: -0.02em;
          margin: 0 0 28px;
        }
        .io-hero-desc {
          font-size: 17px;
          color: #5A5D66;
          line-height: 1.8;
          margin: 0 0 40px;
        }
        .io-hero-img-wrap {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          background: #0f172a;
        }
        .io-hero-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          aspect-ratio: 4/3;
          display: block;
          opacity: 0.85;
          transition: opacity 0.6s ease, transform 0.8s ease;
        }
        .io-hero-img-wrap:hover img {
          opacity: 1;
          transform: scale(1.03);
        }
        .io-hero-img-badge {
          position: absolute;
          top: 28px;
          left: 28px;
          background: rgba(198,232,74,0.95);
          color: #0f172a;
          font-family: var(--font-syne), sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 10px 20px;
          border-radius: 100px;
        }

        /* Auto-Scroll Capabilities */
        .io-scroll-wrap {
          margin-bottom: 100px;
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(90deg, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, black 5%, black 95%, transparent);
        }
        .io-scroll-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: io-scroll 40s linear infinite;
        }
        .io-scroll-wrap:hover .io-scroll-track {
          animation-play-state: paused;
        }
        @keyframes io-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .io-scroll-card {
          flex-shrink: 0;
          width: 300px;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 20px;
          padding: 36px 32px;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
        }
        .io-scroll-card:hover {
          border-color: rgba(198,232,74,0.5);
          box-shadow: 0 16px 32px rgba(0,0,0,0.06), 0 0 0 1px rgba(198,232,74,0.3);
          transform: translateY(-4px);
        }
        .io-scroll-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #C6E84A, #4d7c0f);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .io-scroll-card:hover::after {
          opacity: 1;
        }
        .io-scroll-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #f0f4e4, #e8eddb);
          color: #4d7c0f;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          transition: all 0.4s ease;
        }
        .io-scroll-card:hover .io-scroll-icon {
          background: linear-gradient(135deg, #C6E84A, #a5c83a);
          color: #0f172a;
        }
        .io-scroll-title {
          font-family: var(--font-syne), sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          line-height: 1.3;
        }

        /* Framework */
        .io-fw-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .io-fw-header h3 {
          font-family: var(--font-syne), sans-serif;
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 16px;
        }
        .io-fw-header p {
          font-size: 17px;
          color: #5A5D66;
          margin: 0;
        }
        .io-fw-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .io-fw-card {
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 20px;
          padding: 44px 36px;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          overflow: hidden;
        }
        .io-fw-card:hover {
          border-color: rgba(198,232,74,0.5);
          box-shadow: 0 20px 40px rgba(0,0,0,0.06), 0 0 0 1px rgba(198,232,74,0.3);
          transform: translateY(-6px);
        }
        .io-fw-card-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #f5f7f2;
          color: #4d7c0f;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 28px;
          transition: all 0.4s ease;
          border: 1.5px solid rgba(0,0,0,0.06);
        }
        .io-fw-card:hover .io-fw-card-icon {
          background: #C6E84A;
          border-color: #C6E84A;
          color: #0f172a;
          transform: scale(1.1) rotate(8deg);
        }
        .io-fw-card h4 {
          font-family: var(--font-syne), sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 12px;
        }
        .io-fw-card p {
          font-size: 14.5px;
          color: #5A5D66;
          line-height: 1.65;
          margin: 0;
        }

        /* CTA Banner */
        .io-cta-banner {
          margin-top: 80px;
          background: #0f172a;
          border-radius: 24px;
          padding: 56px 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          position: relative;
          overflow: hidden;
        }
        .io-cta-banner::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: rgba(198,232,74,0.08);
          pointer-events: none;
        }
        .io-cta-banner::after {
          content: '';
          position: absolute;
          bottom: -60px; left: -60px;
          width: 200px; height: 200px;
          border-radius: 50%;
          background: rgba(198,232,74,0.05);
          pointer-events: none;
        }
        .io-cta-text h3 {
          font-family: var(--font-syne), sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 8px;
          position: relative;
          z-index: 2;
        }
        .io-cta-text p {
          font-size: 16px;
          color: rgba(255,255,255,0.6);
          margin: 0;
          position: relative;
          z-index: 2;
        }

        @media (max-width: 1024px) {
          .io-hero-row {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .io-bento {
            grid-template-columns: repeat(2, 1fr);
          }
          .io-fw-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .io-cta-banner {
            flex-direction: column;
            text-align: center;
            padding: 48px 40px;
          }
        }
        @media (max-width: 640px) {
          .io-section { padding: 80px 0; }
          .io-bento {
            grid-template-columns: 1fr;
          }
          .io-fw-grid {
            grid-template-columns: 1fr;
          }
          .io-cta-banner {
            padding: 40px 28px;
          }
        }
      `}</style>
      <section id="intelligent-operations" className="io-section">
        <div className="sol-wrap">

          {/* Hero Row */}
          <div className="io-hero-row">
            <div className="io-hero-text">
              <Eyebrow>Intelligent Operations</Eyebrow>
              <h2>
                People. Process.<br /><span style={{ color: "#4d7c0f" }}>Technology</span>.
              </h2>
              <p className="io-hero-desc">
                Operational excellence cannot be achieved through technology alone.
                Sytrion combines skilled professionals, standardized processes, intelligent
                automation and performance management to operate and improve business-critical
                processes. Our teams become an extension of your organization — bringing
                structure, technology and continuous improvement to operations that need to
                perform reliably every day.
              </p>
              <Link href="/contact" className="btn-primary" style={{ display: "inline-flex" }}>
                Transform Your Operations
                <ArrowIcon />
              </Link>
            </div>
            <div className="io-hero-img-wrap">
              <img src="/Operations.jpg" alt="Intelligent Operations" />
              <div className="io-hero-img-badge">Operational Excellence</div>
            </div>
          </div>

          {/* Capabilities — Auto-Scroll */}
          <div className="io-scroll-wrap">
            <div className="io-scroll-track">
              {[...opsCapabilities, ...opsCapabilities].map((cap, i) => (
                <div key={i} className="io-scroll-card">
                  <div className="io-scroll-icon">
                    <SolIcon name={cap.icon} size={20} />
                  </div>
                  <h4 className="io-scroll-title">{cap.label}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Operating Framework */}
          <div className="io-fw-header">
            <h3>Our Operating Framework</h3>
            <p>Technology makes operations smarter. Operational discipline makes them dependable.</p>
          </div>
          <div className="io-fw-grid">
            {opsFramework.map((item) => (
              <div key={item.title} className="io-fw-card">
                <div className="io-fw-card-icon">
                  <SolIcon name={item.icon} size={26} />
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="io-cta-banner">
            <div className="io-cta-text">
              <h3>Ready to transform your operations?</h3>
              <p>Let our experts build a dependable, scalable operating model for your business.</p>
            </div>
            <Link href="/contact" className="btn-primary" style={{ position: "relative", zIndex: 2, flexShrink: 0 }}>
              Get Started
              <ArrowIcon />
            </Link>
          </div>

        </div>
      </section>

      {/* ══════════════════════ 5. DATA ENGINEERING ══════════════════════ */}
      <section id="data-engineering" className="sol-section sol-section--warm">
        <div className="sol-wrap">
          <div style={{ maxWidth: "760px" }}>
            <Eyebrow>Data Engineering</Eyebrow>
            <SectionHeading>Build intelligence on data you can <span style={{ color: "#C6E84A" }}>trust</span>.</SectionHeading>
            <IntroText>AI and analytics are only as reliable as the information behind them.</IntroText>
            <IntroText>
              Enterprise data often exists across different systems, formats and processes —
              creating inconsistencies that limit its business value.
            </IntroText>
            <IntroText>
              Sytrion helps organizations transform fragmented information into structured,
              accurate and usable data assets that can support operations, analytics and AI.
            </IntroText>
          </div>

          <div style={{ margin: "56px 0 0" }}>
            <SubLabel>Capabilities</SubLabel>
            <CapabilitiesGrid items={dataCapabilities} />
          </div>

          <div style={{ marginTop: "64px" }}>
            <SubLabel>From Raw Data to Activation</SubLabel>
            <div className="sol-flow">
              {dataProcess.map((step, i) => (
                <div key={step.title} className="sol-flow-item">
                  <div className="sol-flow-num">{i + 1}</div>
                  <div className="sol-flow-title">{step.title}</div>
                  <p className="sol-flow-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <Callout>Better intelligence begins with better data.</Callout>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/contact" className="btn-primary">
              Strengthen Your Data Foundation
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════ 6. ANALYTICS & BI ══════════════════════ */}
      <section id="analytics-bi" className="sol-section sol-section--white">
        <div className="sol-wrap">
          <div style={{ maxWidth: "760px" }}>
            <Eyebrow>Analytics &amp; Business Intelligence</Eyebrow>
            <SectionHeading>See what is happening. Understand <span style={{ color: "#C6E84A" }}>why</span>. Know what to do next.</SectionHeading>
            <IntroText>Organizations generate enormous amounts of information every day.</IntroText>
            <IntroText>
              The challenge is turning that information into something decision-makers can
              actually use.
            </IntroText>
            <IntroText>
              Sytrion develops analytics and business intelligence solutions that transform
              enterprise and operational data into clear, relevant and actionable insights.
            </IntroText>
          </div>

          <div style={{ margin: "56px 0 0" }}>
            <SubLabel>Capabilities</SubLabel>
            <CapabilitiesGrid items={analyticsCapabilities} />
          </div>

          <div style={{ marginTop: "64px" }}>
            <SubLabel>From Data to Decision</SubLabel>
            <div className="sol-impact">
              {analyticsFramework.map((item) => (
                <div key={item.title} className="sol-impact-card">
                  <div className="sol-impact-icon">
                    <SolIcon name={item.icon} size={22} />
                  </div>
                  <h4 className="sol-impact-title">{item.title}</h4>
                  <p className="sol-impact-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <Callout>
            The value of data isn&apos;t in having more of it. It&apos;s in knowing what it means.
          </Callout>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/contact" className="btn-primary">
              Turn Data Into Intelligence
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════ 7. INDUSTRY INTRO ══════════════════════ */}
      <section className="sol-section sol-section--dark">
        <div className="sol-wrap">
          <div className="sol-industry-intro">
            <Eyebrow>Industries</Eyebrow>
            <h2 className="heading-display sol-h2 sol-h2--dark">
              Technology understands data. We also understand <span style={{ color: "#C6E84A" }}>the business behind it.</span>
            </h2>
            <p className="sol-lead sol-lead--dark" style={{ margin: "0 0 16px" }}>
              Industry transformation requires more than technology expertise.
            </p>
            <p className="sol-lead sol-lead--dark" style={{ margin: "0 0 16px" }}>
              Processes, documents, terminology, exceptions and operating priorities vary
              significantly from one industry to another.
            </p>
            <p className="sol-lead sol-lead--dark" style={{ margin: 0 }}>
              That is why Sytrion combines technology capabilities with domain-focused
              operational expertise to create solutions designed around how industries
              actually work.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════ 8. SHIPPING & LOGISTICS ══════════════════════ */}
      <section id="shipping-logistics" className="sol-section sol-section--warm">
        <div className="sol-wrap">
          <div style={{ maxWidth: "760px" }}>
            <Eyebrow>Shipping &amp; Logistics Solutions</Eyebrow>
            <SectionHeading>Intelligence across every movement, document and <span style={{ color: "#C6E84A" }}>decision</span>.</SectionHeading>
            <IntroText>
              Global logistics depends on thousands of interconnected activities — shipments,
              documentation, freight operations, customs processes, invoices, exceptions and
              customer communication.
            </IntroText>
            <IntroText>
              When these processes remain manual or fragmented, small inefficiencies quickly
              become larger operational challenges.
            </IntroText>
            <IntroText>
              Sytrion combines shipping domain expertise, intelligent operations, automation
              and data to help logistics organizations simplify complex workflows and improve
              operational performance.
            </IntroText>
          </div>

          <div style={{ margin: "56px 0 0" }}>
            <SubLabel>Capabilities</SubLabel>
            <div className="sol-grid-4">
              {shippingCapabilities.map((cap) => (
                <div key={cap.title} className="sol-cap-card">
                  <div className="sol-cap-icon">
                    <SolIcon name={cap.icon} size={22} />
                  </div>
                  <h4 className="sol-cap-title">{cap.title}</h4>
                  <p className="sol-cap-desc">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "64px" }}>
            <SubLabel>Who We Support</SubLabel>
            <div className="sol-tags">
              {shippingTags.map((tag) => (
                <span key={tag} className="sol-tag">{tag}</span>
              ))}
            </div>
          </div>

          <Callout>Moving information as efficiently as you move goods.</Callout>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/contact" className="btn-primary">
              Talk to Our Shipping Experts
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════ 9. HEALTHCARE OPERATIONS ══════════════════════ */}
      <section id="healthcare-operations" className="sol-section sol-section--white">
        <div className="sol-wrap">
          <div style={{ maxWidth: "760px" }}>
            <Eyebrow>Healthcare Operations</Eyebrow>
            <SectionHeading>Smarter administration. More efficient <span style={{ color: "#C6E84A" }}>healthcare</span> operations.</SectionHeading>
            <IntroText>
              Healthcare organizations manage enormous volumes of information alongside
              complex administrative processes.
            </IntroText>
            <IntroText>
              Claims, documents, data validation, workflow coordination and operational
              controls can consume significant resources that could otherwise be focused on
              higher-value activities.
            </IntroText>
            <IntroText>
              Sytrion combines intelligent document processing, automation, data and managed
              operations to help healthcare organizations streamline administrative workflows
              while maintaining a strong focus on security, accuracy and process control.
            </IntroText>
          </div>

          <div style={{ margin: "56px 0 0" }}>
            <SubLabel>Capabilities</SubLabel>
            <div className="sol-grid-4">
              {healthcareCapabilities.map((cap) => (
                <div key={cap.title} className="sol-cap-card">
                  <div className="sol-cap-icon">
                    <SolIcon name={cap.icon} size={22} />
                  </div>
                  <h4 className="sol-cap-title">{cap.title}</h4>
                  <p className="sol-cap-desc">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <Callout>Making healthcare administration work smarter behind the scenes.</Callout>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/contact" className="btn-primary">
              Talk to Our Healthcare Experts
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════ 10. CONNECTED ECOSYSTEM ══════════════════════ */}
      <section className="sol-section sol-section--dark-alt">
        <div className="sol-wrap">
          <div style={{ maxWidth: "820px" }}>
            <Eyebrow>One Connected Ecosystem</Eyebrow>
            <h2 className="heading-display sol-h2 sol-h2--dark">
              Six capabilities. One connected <span style={{ color: "#C6E84A" }}>intelligence ecosystem.</span>
            </h2>
            <p className="sol-lead sol-lead--dark" style={{ margin: "0 0 16px" }}>
              The strongest transformation opportunities often sit between traditional
              solution categories.
            </p>
            <p className="sol-lead sol-lead--dark" style={{ margin: "0 0 16px" }}>
              A document may require intelligent extraction. The extracted information may
              require validation and enrichment. The process may require human review.
              Management may need real-time analytics. And AI may determine the next action.
            </p>
            <p className="sol-lead sol-lead--dark" style={{ margin: 0 }}>
              Sytrion brings these capabilities together.
            </p>
          </div>

          <div style={{ marginTop: "56px" }}>
            <div className="sol-eco">
              {ecosystem.map((item) => (
                <div key={item.title} className="sol-eco-item">
                  <div className="sol-eco-icon">
                    <SolIcon name={item.icon} size={24} />
                  </div>
                  <div className="sol-eco-title">{item.title}</div>
                  <p className="sol-eco-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <Callout dark>
            <span>Smarter Operations.</span> Meaningful Outcomes.
          </Callout>
        </div>
      </section>

      {/* ══════════════════════ 11. APPROACH / PROCESS ══════════════════════ */}
      <section className="sol-section sol-section--cream">
        <div className="sol-wrap">
          <div style={{ maxWidth: "760px" }}>
            <Eyebrow>Our Approach</Eyebrow>
            <SectionHeading>Transformation starts with <span style={{ color: "#C6E84A" }}>understanding</span>.</SectionHeading>
            <IntroText>We do not begin with a technology recommendation.</IntroText>
            <IntroText>
              We begin by understanding how your business works, where friction exists and
              what better performance should look like.
            </IntroText>
          </div>

          <div style={{ marginTop: "56px" }}>
            <SubLabel>How We Work</SubLabel>
            <div className="sol-steps">
              {approachSteps.map((step, i) => (
                <div key={step.title} className="sol-step">
                  <span className="sol-step-num">Step {String(i + 1).padStart(2, "0")}</span>
                  <h4 className="sol-step-title">{step.title}</h4>
                  <p className="sol-step-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ 12. DIFFERENTIATORS ══════════════════════ */}
      <section className="sol-section sol-section--warm">
        <div className="sol-wrap">
          <div style={{ maxWidth: "720px", marginBottom: "56px" }}>
            <Eyebrow>Why Sytrion</Eyebrow>
            <SectionHeading>Built for intelligent <span style={{ color: "#C6E84A" }}>transformation</span>.</SectionHeading>
          </div>

          <div className="sol-grid-6">
            {differentiators.map((diff) => (
              <div key={diff.title} className="sol-cap-card">
                <div className="sol-cap-icon">
                  <SolIcon name={diff.icon} size={22} />
                </div>
                <h4 className="sol-cap-title">{diff.title}</h4>
                <p className="sol-cap-desc">{diff.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ 13. SECURITY & TRUST ══════════════════════ */}
      <section className="sol-section sol-section--white">
        <div className="sol-wrap">
          <div style={{ maxWidth: "760px", marginBottom: "48px" }}>
            <Eyebrow>Security &amp; Trust</Eyebrow>
            <SectionHeading><span style={{ color: "#C6E84A" }}>Intelligence</span> you can trust.</SectionHeading>
            <IntroText>Business transformation increasingly depends on data.</IntroText>
            <IntroText>
              Protecting that data must therefore be part of the solution — not something
              considered afterwards.
            </IntroText>
            <IntroText>
              Our delivery approach incorporates security and confidentiality principles
              across people, processes and technology.
            </IntroText>
          </div>

          <div className="sol-tags">
            {securityTags.map((tag) => (
              <span key={tag} className="sol-tag">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ 14. FINAL CTA ══════════════════════ */}
      <section className="sol-section sol-section--dark">
        <div className="sol-wrap sol-cta-band">
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              height: "400px",
              background: "radial-gradient(circle, rgba(198,232,74,0.12) 0%, transparent 70%)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", zIndex: 2 }}>
            <Eyebrow>Get started</Eyebrow>
            <h2 className="heading-display sol-h2 sol-h2--dark" style={{ maxWidth: "680px", marginLeft: "auto", marginRight: "auto" }}>
              Start with the challenge. <span style={{ color: "#C6E84A" }}>We&apos;ll help you find the solution.</span>
            </h2>
            <p className="sol-lead sol-lead--dark" style={{ margin: "0 0 16px" }}>
              You don&apos;t need to know whether your challenge requires AI, automation, data
              engineering or operational transformation.
            </p>
            <p className="sol-lead sol-lead--dark" style={{ margin: "0 0 16px" }}>
              Tell us what needs to work better.
            </p>
            <p className="sol-lead sol-lead--dark" style={{ margin: 0 }}>
              Together, we&apos;ll identify the right approach and build a solution designed
              around your business.
            </p>

            <div className="sol-cta-buttons">
              <Link href="/contact" className="btn-primary">
                Schedule a Consultation
                <ArrowIcon />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Talk to Our Experts
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
);
}



