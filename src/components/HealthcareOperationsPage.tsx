"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const challenges = [
  { label: "High-volume claims", color: "#6366F1", gradient: "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(99,102,241,0.04))" },
  { label: "Complex administrative workflows", color: "#F59E0B", gradient: "linear-gradient(135deg, rgba(245,158,11,0.18), rgba(245,158,11,0.04))" },
  { label: "Fragmented provider data", color: "#10B981", gradient: "linear-gradient(135deg, rgba(16,185,129,0.18), rgba(16,185,129,0.04))" },
  { label: "Document-intensive processes", color: "#EF4444", gradient: "linear-gradient(135deg, rgba(239,68,68,0.18), rgba(239,68,68,0.04))" },
  { label: "Cross-system workflow complexity", color: "#8B5CF6", gradient: "linear-gradient(135deg, rgba(139,92,246,0.18), rgba(139,92,246,0.04))" },
  { label: "Rising experience expectations", color: "#06B6D4", gradient: "linear-gradient(135deg, rgba(6,182,212,0.18), rgba(6,182,212,0.04))" },
];

const ecosystemCards = [
  {
    title: "Health Plans & Payers",
    desc: "Claims, enrollment, member and provider operations supported by intelligent workflows and data-driven processes.",
    image: "/healthcare/payer.png",
  },
  {
    title: "Healthcare Providers",
    desc: "Administrative, data and patient-support operations designed for greater efficiency and control.",
    image: "/healthcare/providers.png",
  },
  {
    title: "Healthcare & Digital Health Organizations",
    desc: "Scalable processing, data management and operational support for organizations enabling the healthcare ecosystem.",
    image: "/healthcare/digital-health.png",
  },
];

const ibsTabs = [
  {
    num: "01",
    tab: "Claims",
    title: "Claims Operations",
    tagline: "Move claims through the lifecycle with greater accuracy and control.",
    items: [
      "Claims intake & data capture",
      "Claims validation & pre-processing",
      "Exception management",
      "Workflow verification support",
      "Claims correspondence",
      "Quality & audit support",
    ],
    image: "/healthcare/Claims Operations.webp",
  },
  {
    num: "02",
    tab: "Enrollment",
    title: "Enrollment & Eligibility",
    tagline: "Simplify high-volume member administration.",
    items: [
      "Enrollment processing",
      "Eligibility verification",
      "Member data updates",
      "Plan administration support",
      "Documentation support",
      "Exception resolution",
    ],
    image: "/healthcare/Enrollment & Eligibility.webp",
  },
  {
    num: "03",
    tab: "Providers",
    title: "Provider Operations",
    tagline: "Build reliable provider information across the network.",
    items: [
      "Provider onboarding support",
      "Provider data maintenance",
      "Roster processing",
      "Directory data validation",
      "Provider updates",
      "Data-quality management",
    ],
    image: "/healthcare/Provider Operations.webp",
  },
  {
    num: "04",
    tab: "Authorizations",
    title: "Authorization Operations",
    tagline: "Improve the flow of information supporting authorization workflows.",
    items: [
      "Request intake",
      "Document processing",
      "Information validation",
      "Workflow routing",
      "Status management",
      "Administrative follow-up",
    ],
    image: "/healthcare/Authorization Operations.webp",
  },
  {
    num: "05",
    tab: "Experience",
    title: "Member & Provider Experience",
    tagline: "Make every operational interaction easier to navigate.",
    items: [
      "Member query support",
      "Provider query support",
      "Claims status assistance",
      "Enrollment support",
      "Correspondence management",
      "Service-request processing",
    ],
    image: "/healthcare/Member & Provider Experience.webp",
  },
  {
    num: "06",
    tab: "Data",
    title: "Healthcare Data Operations",
    tagline: "Turn fragmented healthcare information into reliable operational data.",
    items: [
      "Data capture & validation",
      "Document indexing",
      "Master-data support",
      "Data-quality management",
      "Reconciliation",
      "Operational reporting",
    ],
    image: "/healthcare/Healthcare Data Operations.webp",
  },
];

const claimsSteps = [
  { num: "01", name: "RECEIVE", sub: "Claim & documents", icon: "inbox", x: 14, y: 28 },
  { num: "02", name: "EXTRACT", sub: "Relevant Information", icon: "scan", x: 50, y: 28 },
  { num: "03", name: "VALIDATE", sub: "Data & completeness", icon: "check", x: 86, y: 28 },
  { num: "04", name: "ROUTE", sub: "Workflow & exceptions", icon: "route", x: 86, y: 74 },
  { num: "05", name: "PROCESS", sub: "Administrative actions", icon: "settings", x: 50, y: 74 },
  { num: "06", name: "ANALYZE", sub: "Quality & insights", icon: "bar-chart", x: 14, y: 74 },
];

const flowIcons: Record<string, React.ReactNode> = {
  inbox: (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 12h-6l-2 3h-4l-2-3H2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6z" />
      <path d="M5.45 5.11 2 12v0h20v0l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  ),
  scan: (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <line x1="7" y1="12" x2="17" y2="12" />
    </svg>
  ),
  check: (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  route: (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  ),
  settings: (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  "bar-chart": (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  ),
};

const providerSteps = [
  { name: "ONBOARD", sub: "Provider information intake" },
  { name: "VALIDATE", sub: "Information & documentation" },
  { name: "MAINTAIN", sub: "Provider records" },
  { name: "UPDATE", sub: "Roster & directory information" },
  { name: "MONITOR", sub: "Data quality & exceptions" },
  { name: "REPORT", sub: "Operational insights" },
];

const intelligenceNodes = [
  { title: "Document Intelligence", verbs: "Extract • Classify • Validate" },
  { title: "Workflow Automation", verbs: "Route • Process • Update" },
  { title: "Claims Intelligence", verbs: "Identify • Validate • Prioritize" },
  { title: "Data Intelligence", verbs: "Clean • Reconcile • Enrich" },
  { title: "AI-Assisted Operations", verbs: "Summarize • Assist • Resolve" },
  { title: "Operational Analytics", verbs: "Measure • Analyze • Improve" },
];

const intelCapabilities = [
  { num: "01", title: "Document Intelligence", desc: "Transform unstructured clinical and administrative documents into structured, validated information that teams can act on.", tags: "Extract / Classify / Validate", bg: "linear-gradient(135deg, #0C1B30 0%, #243142 100%)", image: "/healthcare/Document Intelligence.webp" },
  { num: "02", title: "Workflow Automation", desc: "Connect repetitive operational steps into intelligent workflows that route work, reduce friction and keep processes moving.", tags: "Route / Process / Update", bg: "linear-gradient(135deg, #0C1B30 0%, #243142 100%)", image: "/healthcare/Workflow Automation.webp" },
  { num: "03", title: "Claims Intelligence", desc: "Surface anomalies and opportunities earlier, helping teams validate claims and prioritize the work that matters most.", tags: "Identify / Validate / Prioritize", bg: "linear-gradient(135deg, #0C1B30 0%, #243142 100%)", image: "/healthcare/Claims Intelligence.webp" },
  { num: "04", title: "Data Intelligence", desc: "Clean, reconcile and enrich fragmented data so healthcare teams can work from information they can trust.", tags: "Clean / Reconcile / Enrich", bg: "linear-gradient(135deg, #0C1B30 0%, #243142 100%)", image: "/healthcare/Data Intelligence.webp" },
  { num: "05", title: "AI-Assisted Operations", desc: "Give operational teams intelligent assistance for summarization, resolution and everyday decisions without adding complexity.", tags: "Summarize / Assist / Resolve", bg: "linear-gradient(135deg, #0C1B30 0%, #243142 100%)", image: "/healthcare/AI-Assisted Operations.webp" },
  { num: "06", title: "Operational Analytics", desc: "Measure performance, surface patterns and turn operational data into continuous opportunities for improvement.", tags: "Measure / Analyze / Improve", bg: "linear-gradient(135deg, #0C1B30 0%, #243142 100%)", image: "/healthcare/Operational Analytics.webp" },
];

const clinicalItems = [
  {
    title: "Nurse & Clinical Record Summarization",
    desc: "Organize lengthy records into concise, review-ready summaries that highlight relevant history, findings, documentation and open items for qualified review.",
  },
  {
    title: "Document Intake & Classification",
    desc: "Ingest, classify and index clinical and administrative documents so information reaches the appropriate workflow and reviewer.",
  },
  {
    title: "Post-QA Modules & Intelligent Sampling",
    desc: "Apply configurable samplers across completed work, prioritize higher-risk or exception-prone items and route selected cases for post-process quality review.",
  },
  {
    title: "Automated Quality Checks",
    desc: "Check required fields, documentation completeness, workflow adherence and defined business rules before work is finalized or released.",
  },
  {
    title: "Exception & Variance Detection",
    desc: "Surface inconsistencies, missing information, unusual patterns and process deviations for targeted investigation.",
  },
  {
    title: "Reviewer Copilot",
    desc: "Help reviewers retrieve supporting information, compare source documents, prepare review notes and document resolution actions.",
  },
  {
    title: "Quality Analytics",
    desc: "Track error themes, sampler results, repeat exceptions, reviewer feedback and operational trends to support continuous improvement.",
  },
  {
    title: "Human-in-the-Loop Governance",
    desc: "Maintain role-based review, traceable actions, configurable approvals and professional oversight for sensitive healthcare workflows.",
  },
];

const outcomes = [
  { num: "01", word: "FASTER", title: "Faster processing.", image: "/healthcare/faster (2).png", desc: "Streamlined workflows help reduce administrative delays." },
  { num: "02", word: "ACCURATE", title: "Greater accuracy .", image: "/healthcare/accurate.png", desc: "Structured validation helps improve data and process quality." },
  { num: "03", word: "EFFICIENT", title: "Lower administrative effort.", image: "/healthcare/efficient.png", desc: "Automation helps reduce manual administrative activity." },
  { num: "04", word: "VISIBLE", title: "Better operational visibility.", image: "/healthcare/visible.webp", desc: "Connected reporting makes performance and exceptions easier to understand." },
  { num: "05", word: "BETTER EXPERIENCES", title: "Smoother interactions.", image: "/healthcare/better-experiences.webp", desc: "Simpler operations support smoother interactions for members, patients and providers." },
  { num: "06", word: "SCALABLE", title: "Built to adapt.", image: "/healthcare/scalable.webp", desc: "Flexible operations support changing volumes and evolving requirements." },
];

const modelLayers = [
  {
    num: "01",
    name: "Healthcare Ecosystem",
    items: "Members • Patients • Providers • Health Plans",
  },
  {
    num: "02",
    name: "Systems & Information",
    items: "Core Platforms • Documents • Portals • Data • Interactions",
  },
  {
    num: "03",
    name: "Sytrion Intelligence Layer",
    items: "AI | Automation | Document Intelligence | Analytics",
  },
  {
    num: "04",
    name: "Intelligent Operations",
    items: "Claims | Enrollment | Provider Ops | Quality | Experience",
  },
  {
    num: "05",
    name: "Business Outcomes",
    items: "SPEED • ACCURACY • VISIBILITY • EFFICIENCY • EXPERIENCE",
  },
];

const whyIconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const whyPoints = [
  {
    num: "01",
    name: "Domain-led",
    desc: "Operations designed around healthcare's complex administrative workflows.",
    icon: "/healthcare/domain led.svg",
  },
  {
    num: "02",
    name: "AI-first",
    desc: "Intelligence applied where it can simplify work and improve operational decision support.",
    icon: "/healthcare/ai first.svg",
  },
  {
    num: "03",
    name: "Human + Digital",
    desc: "Automation and skilled teams working together.",
    icon: "/healthcare/human-digital.svg",
  },
  {
    num: "04",
    name: "Data-driven",
    desc: "Better information supporting better operational decisions.",
    icon: "/healthcare/Data-driven.svg",
  },
  {
    num: "05",
    name: "Secure by Design",
    desc: "Controlled processes, access and governance embedded into delivery.",
    icon: "/healthcare/Secure by Design.svg",
  },
  {
    num: "06",
    name: "Built to Scale",
    desc: "Flexible models designed around changing operational requirements.",
    icon: "/healthcare/Built to Scale.svg",
  },
];

function HcLabel({ text, light }: { text: string; light?: boolean }) {
  return (
    <span className={`hc-label${light ? " hc-label--light" : ""}`}>
      {text}
    </span>
  );
}

export default function HealthcareOperationsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [clinicalOpen, setClinicalOpen] = useState(0);
  const [intelActive, setIntelActive] = useState(0);
  const revealRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = revealRef.current;
    if (!root) return;
    const targets = root.querySelectorAll(".hc-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("hc-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hc-page" ref={revealRef}>
      <style>{`
        .hc-page { --hcn:#071426; --hcn2:#0B1F38; --hcb:#10315C; --hcc:#C6E84A; --hcl:#F5F9FC; color:#0E1B2A; background:#fff; font-family: var(--font-geist-sans), Arial, sans-serif; }
        .hc-page * { box-sizing: border-box; }
        .hc-wrap { max-width: 1400px; margin: 0 auto; }
        @media (max-width: 900px) {
          .hc-section-light, .hc-section-dark, .hc-section-navy, .hc-hero .hc-wrap, .hc-banner, .hc-transform .hc-wrap, .hc-final .hc-wrap { padding-left: 40px; padding-right: 40px; }
        }
        @media (max-width: 640px) {
          .hc-section-light, .hc-section-dark, .hc-section-navy, .hc-hero .hc-wrap, .hc-banner, .hc-transform .hc-wrap, .hc-final .hc-wrap { padding-left: 20px; padding-right: 20px; }
          .hc-hero .hc-wrap { padding: 168px 24px 90px; }
          .hc-model .hc-h2, .hc-why .hc-h2 { white-space: normal; }
        }

        .hc-label { display: inline-block; background: #C6E84A; color: #0f0f0f; padding: 8px 20px; border-radius: 999px; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; font-variant: small-caps; margin-bottom: 24px; }
        .hc-label em { font-style: normal; }
        .hc-label--light { background: #C6E84A; color: #0f0f0f; }

        .hc-reveal { opacity: 0; transform: translateY(26px); transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .hc-reveal.hc-in { opacity: 1; transform: none; animation: hcSafety 0.8s ease-out 2.5s forwards; }
        @keyframes hcSafety { to { opacity: 1; transform: none; } }

        .hc-btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 16px 30px; border-radius: 999px; background: var(--hcc); color: #062033; font-size: 15px; font-weight: 700; letter-spacing: 0.02em; text-decoration: none; transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, background 0.3s ease; }
        .hc-btn:hover { transform: translateY(-2px); box-shadow: 0 16px 34px -14px rgba(198,232,74,0.55); background: #D9F77E; }
        .hc-btn--ghost { background: transparent; border: 1px solid rgba(255,255,255,0.45); color: #fff; }
        .hc-btn--ghost:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.7); box-shadow: none; }

        .hc-hero { position: relative; height: 100vh; height: 100dvh; min-height: 600px; overflow: hidden; isolation: isolate; background: var(--hcn); }
        .hc-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .hc-hero .hc-wrap { position: absolute; inset: 0; z-index: 1; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; padding: 148px clamp(16px, 2vw, 32px) 0; max-width: none; margin: 0; left: 0; right: auto; }
        .hc-hero-inner { max-width: 900px; }
        .hc-h1 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(38px, 5.6vw, 68px); font-weight: 700; letter-spacing: -0.03em; line-height: 1.06; color: #ffffff; margin: 0 0 26px; max-width: 780px; text-wrap: balance; }
        .hc-hero-sub { font-size: clamp(17px, 1.6vw, 21px); font-weight: 600; line-height: 1.55; color: rgba(255,255,255,0.92); max-width: 640px; margin: 0 0 18px; }
        .hc-hero-body { font-size: 16px; line-height: 1.75; color: rgba(255,255,255,0.68); max-width: 520px; margin: 0 0 38px; }
        .hc-hero-ctas { display: flex; flex-wrap: wrap; gap: 16px; }
        @media (max-height: 860px) {
          .hc-hero .hc-wrap { padding-top: 120px; padding-bottom: 48px; }
        }
        @media (max-height: 700px) {
          .hc-hero .hc-wrap { padding-top: 104px; padding-bottom: 40px; }
          .hc-hero .hc-h1 { max-width: 920px; }
        }

        .hc-section-light { background: #ffffff; padding: clamp(76px, 9vw, 128px) 80px; }
        .hc-section-dark { background: var(--hcn); padding: clamp(76px, 9vw, 128px) 80px; }
        .hc-section-navy { background: linear-gradient(180deg, #081A31 0%, #071426 100%); padding: clamp(76px, 9vw, 128px) 80px; }
        .hc-head { max-width: none; }
        .hc-h2 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(32px, 5vw, 48px); font-weight: 700; line-height: 1.15; letter-spacing: -0.02em; margin: 0 0 20px; }
        .hc-model .hc-h2, .hc-why .hc-h2 { white-space: normal; }
        @media (min-width: 1400px) { .hc-model .hc-h2, .hc-why .hc-h2 { white-space: nowrap; } }
        .hc-section-light .hc-h2 { color: #0f172a; }
        .hc-section-dark .hc-h2, .hc-section-navy .hc-h2 { color: #ffffff; }
        .hc-h2 span { color: #C6E84A; }
        .hc-lede { font-size: 19px; font-weight: 400; line-height: 1.8; margin: 0 0 12px; text-align: justify; text-justify: inter-word; hyphens: auto; }
        .hc-section-light .hc-lede { color: #5A5D66; }
        .hc-section-dark .hc-lede, .hc-section-navy .hc-lede { color: rgba(255,255,255,0.6); }
        .hc-copy { font-size: 19px; font-weight: 400; line-height: 1.8; margin: 0 0 12px; text-align: justify; text-justify: inter-word; hyphens: auto; }
        .hc-section-light .hc-copy { color: #5A5D66; }
        .hc-section-dark .hc-copy, .hc-section-navy .hc-copy { color: rgba(255,255,255,0.6); }

        .hc-land-grid { margin-bottom: 0; }
        .hc-land-row { display: grid; grid-template-columns: 1fr 1.1fr; gap: 80px; align-items: start; margin-top: 40px; }
        .hc-section-landscape { padding-top: clamp(48px, 6vw, 80px); padding-bottom: clamp(40px, 5vw, 60px); position: relative; background: #ffffff; }
        .hc-section-landscape::before { content: none; }
        .hc-section-landscape::after { content: none; }
        .hc-landscape-text { }
        .hc-landscape-left { }
        .hc-head h2 { position: relative; padding-bottom: 12px; }
        .hc-head h2::after { content: ""; display: block; width: 64px; height: 4px; background: #C4E538; margin-top: 14px; }
        .hc-landscape-left p { color: #5B6472; max-width: 440px; }
        .hc-landscape-right { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .hc-challenge-card {
          background: linear-gradient(160deg, #0E1B2E 0%, #1B2735 100%);
          border: 1px solid rgba(198,232,74,0.14);
          border-radius: 16px;
          padding: 22px 22px 20px;
          position: relative;
          overflow: hidden;
          transition: transform .3s cubic-bezier(.4,0,.2,1), box-shadow .3s ease, border-color .3s ease;
          box-shadow: 0 10px 30px -12px rgba(12,27,48,0.35);
        }
        .hc-challenge-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background: radial-gradient(120px 60px at 20% 0%, rgba(198,232,74,0.12), transparent 70%);
          opacity: 0;
          transition: opacity .3s ease;
          pointer-events: none;
        }
        .hc-challenge-card:hover {
          transform: translateY(-5px) scale(1.01);
          box-shadow: 0 20px 44px -12px rgba(12,27,48,0.45);
          border-color: rgba(198,232,74,0.45);
        }
        .hc-challenge-card:hover::before { opacity: 1; }
        .hc-challenge-top { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
        .hc-challenge-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: #C6E84A;
          color: #0f0f0f;
          box-shadow: 0 2px 12px -3px rgba(198,232,74,0.5);
          flex-shrink: 0;
        }
        .hc-challenge-icon::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 12px;
          background: inherit;
          filter: blur(10px);
          opacity: 0.35;
          z-index: -1;
          transition: opacity .3s ease;
        }
        .hc-challenge-card:hover .hc-challenge-icon::after { opacity: 0.55; }
        .hc-challenge-icon svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
        .hc-challenge-label { font-size: 15px; font-weight: 600; color: #ffffff; line-height: 1.4; }
        .hc-approach {
          margin-top: 48px;
          background: linear-gradient(135deg, #0B1D35 0%, #132742 40%, #0F2035 100%);
          border-radius: 20px;
          padding: 44px 48px 40px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 40px -12px rgba(10,22,40,0.25);
        }
        .hc-approach::before {
          content: "";
          position: absolute;
          top: -60px;
          right: -40px;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(196,229,56,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .hc-approach::after {
          content: "";
          position: absolute;
          bottom: -40px;
          left: 30%;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .hc-approach-top { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; position: relative; z-index: 1; }
        .hc-approach-dot { width: 8px; height: 8px; border-radius: 50%; background: #C4E538; flex-shrink: 0; box-shadow: 0 0 12px rgba(196,229,56,0.5); }
        .hc-approach-label { font-size: 11px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: rgba(196,229,56,0.7); }
        .hc-approach-text { font-size: clamp(18px, 1.8vw, 26px); line-height: 1.4; color: rgba(255,255,255,0.92); font-weight: 500; margin: 0; position: relative; z-index: 1; white-space: nowrap; }
        .hc-approach-text em { font-style: normal; color: #C4E538; font-weight: 600; }

        .hc-eco-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 56px; }
        .hc-eco-card { position: relative; overflow: hidden; border-radius: 20px; aspect-ratio: 4 / 5; background: var(--hcn2); }
        .hc-eco-card img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .hc-eco-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(7,20,38,0.05) 35%, rgba(6,16,31,0.88) 88%); }
        .hc-eco-card:hover img { transform: scale(1.06); }
        .hc-eco-body { position: absolute; left: 0; right: 0; bottom: 0; padding: 26px 24px; z-index: 1; }
        .hc-eco-title { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 19px; font-weight: 700; line-height: 1.3; color: #ffffff; margin: 0; }
        .hc-eco-desc { font-size: 13.5px; line-height: 1.6; color: rgba(255,255,255,0.72); margin: 10px 0 0; }
        .hc-eco-link { display: inline-block; margin-top: 16px; font-size: 13px; font-weight: 700; letter-spacing: 0.06em; color: #ffffff; text-decoration: underline; text-underline-offset: 5px; text-decoration-color: rgba(255,255,255,0.5); transition: color 0.3s ease, text-decoration-color 0.3s ease; }
        .hc-eco-card:hover .hc-eco-link { color: var(--hcc); text-decoration-color: var(--hcc); }

        .hc-ibs-tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 46px; border-bottom: 1px solid rgba(12,27,48,0.1); padding-bottom: 14px; }
        .hc-ibs-tab { appearance: none; background: transparent; border: none; cursor: pointer; font-family: inherit; position: relative; display: inline-flex; align-items: center; padding: 12px 18px; font-size: 15px; font-weight: 600; color: #7A8AA0; transition: color 0.25s ease; }
        .hc-ibs-tab::after { content: ""; position: absolute; left: 18px; right: 18px; bottom: -15px; height: 3px; border-radius: 2px 2px 0 0; background: var(--hcc); transform: scaleX(0); transform-origin: left; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); }
        .hc-ibs-tab:hover { color: #14263C; }
        .hc-ibs-tab--active { color: #0C1B30; }
        .hc-ibs-tab--active::after { transform: scaleX(1); }
        .hc-ibs-panel { margin-top: 44px; animation: hcPanelIn 0.5s cubic-bezier(0.16,1,0.3,1); display: grid; grid-template-columns: 1.05fr 1fr; gap: clamp(32px, 5vw, 72px); align-items: center; }
        @keyframes hcPanelIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .hc-ibs-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 15px; font-weight: 700; letter-spacing: 0.04em; color: var(--hcc); display: block; margin: 0 0 14px; }
        .hc-ibs-title { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(24px, 2.6vw, 34px); font-weight: 700; line-height: 1.2; color: #0C1B30; margin: 0 0 16px; }
        .hc-ibs-tagline { font-style: italic; font-size: 16px; line-height: 1.6; color: #5A5D66; margin: 0 0 24px; }
        .hc-ibs-list { list-style: none; margin: 0; padding: 0; }
        .hc-ibs-item { display: flex; align-items: baseline; gap: 14px; padding: 13px 0; border-top: 1px solid rgba(12,27,48,0.09); font-size: 16px; color: #33475E; }
        .hc-ibs-item::before { content: ""; width: 9px; height: 9px; flex: 0 0 auto; background: #7AA306; transform: rotate(45deg); align-self: center; }
        .hc-ibs-visual { position: relative; border-radius: 20px; overflow: hidden; min-height: 380px; }
        .hc-ibs-visual img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .hc-ibs-visual::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(12,27,48,0) 40%, rgba(12,27,48,0.32) 100%); }

        .hc-split { display: grid; grid-template-columns: 1fr 1.15fr; gap: clamp(36px, 5vw, 80px); align-items: center; }
        .hc-feature-img { position: relative; overflow: hidden; border-radius: 22px; aspect-ratio: 4 / 4.6; }
        .hc-feature-img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .hc-feature-tint { position: absolute; inset: 0; background: linear-gradient(200deg, rgba(198,232,74,0.16) 0%, rgba(7,20,38,0.05) 40%, rgba(7,20,38,0.55) 100%); }
        .hc-claims-flow { position: relative; margin-top: 40px; max-width: 640px; width: 100%; aspect-ratio: 16 / 11; }
        .hc-cw-lines { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
        .hc-cw-node { position: absolute; z-index: 2; transform: translate(-50%, -50%); display: flex; align-items: center; justify-content: center; }
        .hc-cw-circle { width: 62px; height: 62px; border-radius: 50%; background: var(--hcn); border: 1.5px solid var(--hcc); display: flex; align-items: center; justify-content: center; color: #f4f7fb; transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.3s ease; }
        .hc-cw-node:hover .hc-cw-circle { transform: scale(1.08); border-color: #D9F77E; box-shadow: 0 0 0 7px rgba(198,232,74,0.12); }
        .hc-cw-label { position: absolute; bottom: calc(100% + 12px); left: 0; right: 0; display: flex; flex-direction: column; align-items: center; gap: 3px; pointer-events: none; }
        .hc-cw-num { font-family: var(--font-syne), Arial, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; color: var(--hcc); line-height: 1; }
        .hc-cw-name { font-family: var(--font-syne), Arial, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; color: #ffffff; text-transform: uppercase; white-space: nowrap; line-height: 1.15; }
        .hc-cw-sub { position: absolute; top: calc(100% + 10px); left: 0; right: 0; text-align: center; font-size: 12px; line-height: 1.35; color: rgba(196,211,231,0.72); white-space: nowrap; padding: 0 4px; pointer-events: none; }
        .hc-cw-arrow { position: absolute; z-index: 1; width: 0; height: 0; transform: translate(-50%, -50%); pointer-events: none; }
        .hc-cw-arrow--r { border-left: 9px solid var(--hcc); border-top: 5px solid transparent; border-bottom: 5px solid transparent; }
        .hc-cw-arrow--l { border-right: 9px solid var(--hcc); border-top: 5px solid transparent; border-bottom: 5px solid transparent; }
        .hc-cw-arrow--d { border-top: 9px solid var(--hcc); border-left: 5px solid transparent; border-right: 5px solid transparent; }
        .hc-cw-arrow--u { border-bottom: 9px solid var(--hcc); border-left: 5px solid transparent; border-right: 5px solid transparent; }
        @media (max-width: 1100px) {
          .hc-claims-flow { max-width: 100%; aspect-ratio: auto; }
          .hc-cw-lines, .hc-cw-arrow { display: none; }
          .hc-cw-node { position: relative; left: auto !important; top: auto !important; transform: none; width: 100%; margin: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
          .hc-cw-label { position: static; bottom: auto; margin-bottom: 12px; }
          .hc-cw-sub { position: static; top: auto; margin-top: 12px; white-space: normal; }
          .hc-cw-node:not(:last-child)::after { content: ""; display: block; width: 0; height: 0; margin: 4px auto 0; border-top: 9px solid var(--hcc); border-left: 5px solid transparent; border-right: 5px solid transparent; }
        }
        @media (max-width: 640px) {
          .hc-cw-circle { width: 58px; height: 58px; }
        }
        @media (prefers-reduced-motion: reduce) { .hc-cw-node:hover .hc-cw-circle { transform: none; } }

        .hc-prov-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: clamp(36px, 5vw, 90px); align-items: center; }
        .hc-prov-img { position: relative; overflow: hidden; border-radius: 22px; aspect-ratio: 4 / 4.8; box-shadow: 0 34px 70px -40px rgba(12,27,48,0.45); }
        .hc-prov-img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .hc-prov-net { position: absolute; inset: 0; background:
          radial-gradient(circle at 78% 18%, rgba(198,232,74,0.28), rgba(198,232,74,0) 34%),
          linear-gradient(210deg, rgba(16,49,92,0.06) 0%, rgba(12,27,48,0.42) 100%); }
        .hc-timeline { list-style: none; margin: 34px 0 0; padding: 0 0 0 30px; position: relative; }
        .hc-timeline::before { content: ""; position: absolute; left: 7px; top: 8px; bottom: 8px; width: 2px; background: linear-gradient(180deg, var(--hcc), rgba(16,49,92,0.18)); }
        .hc-tstep { position: relative; padding: 0 0 30px 24px; }
        .hc-tstep:last-child { padding-bottom: 0; }
        .hc-tstep::before { content: ""; position: absolute; left: -30px; top: 5px; width: 16px; height: 16px; border-radius: 50%; background: #ffffff; border: 3px solid var(--hcc); box-shadow: 0 0 0 5px rgba(198,232,74,0.14); }
        .hc-tstep-name { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 17px; font-weight: 700; letter-spacing: 0.06em; color: #0C1B30; }
        .hc-tstep-sub { font-size: 14px; line-height: 1.6; color: #5A6B7F; margin: 4px 0 0; }

        .hc-intel { position: relative; overflow: hidden; }
        .hc-intel-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.16; }
        .hc-intel-veil { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 46%, rgba(7,20,38,0.55) 0%, rgba(5,13,25,0.96) 72%); }
        .hc-intel .hc-wrap { position: relative; z-index: 1; }
        .hc-tree { margin-top: clamp(36px, 5vw, 64px); }
        .hc-core { position: relative; width: 190px; height: 190px; margin: 0 auto; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; background: radial-gradient(circle at 34% 30%, rgba(222,248,150,0.95), rgba(198,232,74,0.75) 45%, rgba(16,49,92,0.9) 100%); box-shadow: 0 0 60px rgba(198,232,74,0.45), 0 0 140px rgba(198,232,74,0.22); animation: hcPulse 3.6s ease-in-out infinite; text-align: center; z-index: 2; }
        @keyframes hcPulse { 0%, 100% { box-shadow: 0 0 60px rgba(198,232,74,0.42), 0 0 140px rgba(198,232,74,0.2); } 50% { box-shadow: 0 0 84px rgba(198,232,74,0.62), 0 0 180px rgba(198,232,74,0.32); } }
        .hc-core-name { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 15px; font-weight: 700; color: #04202F; line-height: 1.25; padding: 0 18px; }
        .hc-core-sub { font-size: 10px; font-weight: 700; letter-spacing: 0.22em; color: #06344B; }
        .hc-tree-links { position: relative; height: 56px; }
        .hc-tree-trunk { position: absolute; left: 50%; top: 0; width: 2px; height: 28px; margin-left: -1px; background: linear-gradient(180deg, rgba(198,232,74,0.85), rgba(198,232,74,0.4)); }
        .hc-tree-bar { position: absolute; top: 27px; left: calc((100% - 80px) / 12); right: calc((100% - 80px) / 12); height: 2px; background: linear-gradient(90deg, rgba(198,232,74,0.12), rgba(198,232,74,0.45) 18%, rgba(198,232,74,0.45) 82%, rgba(198,232,74,0.12)); }
        .hc-tree-row { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 16px; }
        .hc-node { position: relative; border-radius: 16px; padding: 20px 18px 18px; background: rgba(9,26,48,0.82); border: 1px solid rgba(198,232,74,0.24); backdrop-filter: blur(6px); transition: border-color 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1); }
        .hc-node::before { content: ""; position: absolute; left: 50%; top: -27px; width: 2px; height: 27px; margin-left: -1px; background: linear-gradient(180deg, rgba(198,232,74,0.45), rgba(198,232,74,0.7)); }
        .hc-node::after { content: ""; position: absolute; left: 50%; top: -31px; width: 6px; height: 6px; margin-left: -3px; border-radius: 50%; background: var(--hcc); box-shadow: 0 0 10px rgba(198,232,74,0.85); }
        .hc-node:hover { border-color: rgba(198,232,74,0.65); background: rgba(13,34,62,0.92); transform: translateY(-4px); }
        .hc-node-title { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 15.5px; font-weight: 700; color: #ffffff; margin: 0; }
        .hc-node-verbs { font-size: 11.5px; letter-spacing: 0.08em; font-weight: 600; color: var(--hcc); margin: 8px 0 0; }

        .hc-intel-deck { padding-bottom: clamp(28px, 4vw, 44px); }
        .hc-clin-section { padding-top: clamp(12px, 2vw, 24px); }
        .hc-clin-hero { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(32px, 4.5vw, 72px); align-items: center; }
        .hc-clin-img { position: relative; overflow: hidden; border-radius: 22px; aspect-ratio: 16 / 11; }
        .hc-clin-img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .hc-clin-tint { position: absolute; inset: 0; background: linear-gradient(190deg, rgba(16,49,92,0.18), rgba(5,13,25,0.62) 85%); }
        .hc-chip-row { position: absolute; left: 18px; right: 18px; bottom: 18px; display: flex; flex-wrap: wrap; gap: 8px; z-index: 1; }
        .hc-chip { font-size: 10.5px; font-weight: 700; letter-spacing: 0.14em; color: var(--hcc); background: rgba(5,17,32,0.78); border: 1px solid rgba(198,232,74,0.35); border-radius: 999px; padding: 7px 12px; backdrop-filter: blur(4px); }
        .hc-cards2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; margin-top: 54px; }
        .hc-clin-card { border-radius: 16px; padding: 26px 24px; background: linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015)); border: 1px solid rgba(198,232,74,0.14); transition: border-color 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1); }
        .hc-clin-card:hover { border-color: rgba(198,232,74,0.45); transform: translateY(-4px); }
        .hc-clin-card h3 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 17px; font-weight: 700; color: #ffffff; margin: 0; }
        .hc-clin-card p { font-size: 14.5px; line-height: 1.7; color: rgba(255,255,255,0.66); margin: 10px 0 0; }
        .hc-cont-rule { display: flex; align-items: center; gap: 16px; margin: 58px 0 0; }
        .hc-cont-rule::before, .hc-cont-rule::after { content: ""; height: 1px; flex: 1; background: linear-gradient(90deg, rgba(198,232,74,0), rgba(198,232,74,0.5), rgba(198,232,74,0)); }
        .hc-cont-label { font-size: 11px; font-weight: 700; letter-spacing: 0.3em; color: var(--hcc); }

        .hc-clin-accordion { margin-top:48px; display:flex; flex-direction:column; gap:8px; }
        .hc-clin-item { background:#0B1729; border:1px solid #173049; border-radius:10px; overflow:hidden; transition:border-color .35s ease, box-shadow .35s ease, background .35s ease; }
        .hc-clin-item.is-active { border-color:rgba(198,232,74,0.45); background:#0D1F35; box-shadow:0 0 20px -4px rgba(198,232,74,0.12); }
        .hc-clin-header { width:100%; display:flex; align-items:center; justify-content:space-between; padding:16px 20px; background:transparent; border:none; color:#F5F7FA; font-family:var(--font-syne),Arial,Helvetica,sans-serif; font-size:15px; font-weight:600; text-align:left; cursor:pointer; transition:color .3s ease; }
        .hc-clin-header:focus { outline:none; }
        .hc-clin-item.is-active .hc-clin-header { color:#C6E84A; }
        .hc-clin-chevron { color:#5EE6FF; transition:transform .35s cubic-bezier(0.16,1,0.3,1), color .3s ease; flex:0 0 auto; margin-left:12px; }
        .hc-clin-item.is-active .hc-clin-chevron { color:#C6E84A; }
        .hc-clin-chevron[data-open="true"] { transform:rotate(180deg); }
        .hc-clin-panel { max-height:0; overflow:hidden; transition:max-height .4s cubic-bezier(0.16,1,0.3,1), opacity .3s ease; opacity:0; }
        .hc-clin-panel.is-open { max-height:500px; opacity:1; }
        .hc-clin-panel-inner { padding:0 20px 18px; color:#9AA7B8; font-size:13.5px; line-height:1.7; }

        .hc-out-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin-top: 40px; }
        .hc-outcome { position: relative; overflow: hidden; background: #f5f5f3; border-radius: 14px; display: flex; flex-direction: row; min-height: 180px; box-shadow: 0 2px 12px -4px rgba(12,27,48,0.08); transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, background-color 0.4s cubic-bezier(0.16,1,0.3,1); }
        .hc-outcome:hover { transform: translateY(-4px); background: #0c1b2e; box-shadow: 0 16px 40px -14px rgba(12,27,48,0.20); }
        .hc-outcome-body { flex: 0 0 50%; padding: 18px 14px 18px 20px; display: flex; flex-direction: column; justify-content: flex-end; position: relative; z-index: 2; pointer-events: none; }
        .hc-outcome-body * { pointer-events: auto; }
        .hc-outcome-eyebrow { font-size: 9px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #8a97a8; margin: 0 0 8px; transition: color 0.35s ease; }
        .hc-outcome:hover .hc-outcome-eyebrow { color: #6b8299; }
        .hc-outcome-title { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(17px, 1.45vw, 21px); font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; color: #0a1628; margin: 0 0 8px; transition: color 0.35s ease; }
        .hc-outcome:hover .hc-outcome-title { color: #ffffff; }
        .hc-outcome-desc { font-size: 11.5px; line-height: 1.55; color: #5a6b7f; margin: 0; max-width: 26ch; transition: color 0.35s ease; }
        .hc-outcome:hover .hc-outcome-desc { color: #7a96ae; }
        .hc-outcome-media { position: absolute; right: 0; top: 0; bottom: 0; width: 68%; z-index: 1; overflow: hidden; }
        .hc-outcome-media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; object-position: right center; display: block; transition: transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .hc-outcome:hover .hc-outcome-media img { transform: scale(1.05); }

        .hc-stack { display: flex; flex-direction: column; gap: 12px; margin-top: 56px; }
        .hc-layer { display: grid; grid-template-columns: 90px 320px 1fr; align-items: center; gap: 20px; border-radius: 14px; padding: 24px 30px; background: #10294A; border: 1px solid rgba(198,232,74,0.12); transition: border-color 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1); }
        .hc-layer:hover { background:#C6E84A; border-color: rgba(198,232,74,0.8); box-shadow: 0 0 40px -6px rgba(198,232,74,0.4); transform: translateX(6px); }
        .hc-layer:hover .hc-layer-num, .hc-layer:hover .hc-layer-name, .hc-layer:hover .hc-layer-items { color:#0C1B30; }
        .hc-layer--core .hc-layer-num, .hc-layer--core .hc-layer-items { color: var(--hcc); }
        .hc-layer--core .hc-layer-name { color: #ffffff; }
        .hc-layer-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; color: var(--hcc); font-variant-numeric: tabular-nums; }
        .hc-layer-name { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #ffffff; }
        .hc-layer-items { font-size: 12.5px; letter-spacing: 0.05em; color: rgba(255,255,255,0.62); }

        .hc-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 56px; }
        .hc-why-card { position: relative; border-radius: 16px; padding: 28px 24px 26px; background: #FAFBFC; border: 2px solid #D1D9E6; display: flex; flex-direction: column; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease; }
        .hc-why-card::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 3px; border-radius: 0 0 16px 16px; background: linear-gradient(90deg, #7AA306, #C6E84A); opacity: 0; transition: opacity 0.35s ease; }
        .hc-why-card:hover { transform: translateY(-4px); box-shadow: 0 12px 30px -12px rgba(10,22,40,0.12); }
        .hc-why-card:hover::after { opacity: 1; }
        .hc-why-head { display: flex; align-items: center; gap: 16px; margin-bottom: 14px; }
        .hc-why-head-text { display: flex; flex-direction: column; }
        .hc-why-icon { width: 64px; height: 64px; border-radius: 16px; background: rgba(198,232,74,0.12); border: 1px solid rgba(122,163,6,0.2); display: flex; align-items: center; justify-content: center; color: #618300; flex: 0 0 auto; transition: background 0.35s ease, border-color 0.35s ease, color 0.35s ease, transform 0.35s ease; }
        .hc-why-card:hover .hc-why-icon { background: #C6E84A; border-color: #C6E84A; color: #0C1B30; transform: scale(1.06); }
        .hc-why-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; color: #7AA306; font-variant-numeric: tabular-nums; }
        .hc-why-card h3 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 23px; font-weight: 700; color: #0C1B30; margin: 4px 0 0; }
        .hc-why-card p { font-size: 14px; line-height: 1.65; color: #5A6B7F; margin: 8px 0 0; }

        .hc-transform { margin-top:clamp(8px,1vw,16px); padding:0 clamp(28px,5vw,80px) clamp(64px,8vw,120px); background:#FFFFFF; overflow:hidden; }
        .hc-transform-badge { display:inline-block; align-self:flex-start; background:#C6E84A; color:#0f0f0f; padding:8px 20px; border-radius:999px; font-size:14px; font-weight:600; letter-spacing:0.5px; font-variant:small-caps; margin-bottom:clamp(12px,1.6vw,16px); }
        .hc-transform-grid { display:grid; grid-template-columns:1.1fr 1fr; gap:clamp(40px,5vw,72px); align-items:flex-start; }
        .hc-transform-left { display:flex; flex-direction:column; max-width:560px; padding-top:clamp(8px,1vw,16px); }
        .hc-tl-step { display:flex; align-items:flex-start; gap:24px; }
        .hc-tl-step--approach { align-items:center; }
        .hc-tl-icon { flex:0 0 auto; width:52px; height:52px; border-radius:50%; border:1.5px solid #C8D1DD; background:#FFFFFF; color:#93A0B0; display:flex; align-items:center; justify-content:center; }
        .hc-tl-icon svg { width:22px; height:22px; }
        .hc-tl-body { flex:1; min-width:0; }
        .hc-tl-body h3 { font-family:var(--font-syne),Arial,Helvetica,sans-serif; font-size:clamp(20px,2vw,24px); font-weight:700; margin:0; color:#0C1B30; line-height:1.25; }
        .hc-tl-body p { font-size:15px; line-height:1.7; margin:12px 0 0; color:#5A6B7F; }
        .hc-tl-step--approach .hc-tl-body { background:#F3F5F7; border-left:4px solid var(--hcc); border-radius:16px; padding:24px 26px; }
        .hc-tl-link { flex:0 0 auto; width:0; height:44px; margin:12px 0 12px 25px; border-left:2px dashed #C6E84A; }
        .hc-pot-card { background:#0C1B30; border-radius:22px; padding:clamp(30px,3.5vw,44px); color:#FFFFFF; box-shadow:0 34px 70px -40px rgba(7,20,38,0.5); }
        .hc-pot-title { font-family:var(--font-syne),Arial,Helvetica,sans-serif; font-size:clamp(24px,2.6vw,32px); font-weight:700; margin:0 0 clamp(18px,2vw,24px); color:#FFFFFF; line-height:1.25; }
        .hc-pot-checklist { list-style:none; margin:0; padding:0; }
        .hc-pot-checklist li { display:flex; align-items:center; gap:14px; padding:16px 0; border-bottom:1px solid rgba(255,255,255,0.1); font-size:15px; font-weight:600; color:#FFFFFF; }
        .hc-pot-checklist li:last-child { border-bottom:none; }
        .hc-pot-tick { flex:0 0 auto; display:inline-flex; align-items:center; justify-content:center; color:var(--hcc); }
        .hc-pot-tick svg { width:18px; height:18px; }
        .hc-transform-cta { display:inline-flex; align-items:center; justify-content:center; gap:10px; align-self:flex-start; background:#C6E84A; color:#0f0f0f; padding:15px 30px; border-radius:999px; font-weight:700; font-size:15px; letter-spacing:0.02em; text-decoration:none; margin-top:28px; transition:background .25s ease, transform .25s cubic-bezier(0.16,1,0.3,1), box-shadow .25s ease; }
        .hc-transform-cta span { display:inline-block; transition:transform .2s ease; }
        .hc-transform-cta:hover { background:#D9F77E; transform:translateY(-2px); box-shadow:0 16px 34px -14px rgba(198,232,74,0.55); }
        .hc-transform-cta:hover span { transform:translateX(3px); }
        @media (prefers-reduced-motion:reduce){ .hc-transform-cta:hover{ transform:none; } .hc-transform-cta:hover span{ transform:none; } }
        @media (max-width:900px){ .hc-transform{ margin-top:clamp(12px,3vw,24px); padding:0 24px clamp(48px,8vw,72px); } .hc-transform-grid{ grid-template-columns:1fr; gap:40px; } .hc-transform-left{ max-width:none; } }
        @media (max-width:520px){ .hc-tl-step{ gap:16px; } .hc-tl-icon{ width:46px; height:46px; } .hc-tl-icon svg{ width:20px; height:20px; } .hc-tl-link{ margin-left:22px; height:36px; margin-top:10px; margin-bottom:10px; } .hc-tl-step--approach .hc-tl-body{ padding:20px 18px; } }

        .hc-final { position: relative; overflow: hidden; background: #0f0f0f; text-align: center; padding: 100px 80px; }
        .hc-final-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 600px; height: 400px; background: radial-gradient(circle, rgba(198,232,74,0.12) 0%, transparent 70%); border-radius: 50%; pointer-events: none; }
        .hc-final .hc-wrap { position: relative; z-index: 1; }
        .hc-final-inner { max-width: 750px; margin: 0 auto; }
        .hc-final-eyebrow { display: inline-block; font-size: 12px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: #C6E84A; margin-bottom: 22px; }
        .hc-final-h2 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(32px, 4vw, 40px); line-height: 1.3; font-weight: 700; color: #FFFFFF; margin: 0 0 20px; }
        .hc-final-body { font-size: 17px; line-height: 1.7; color: #DCDECD; max-width: 640px; margin: 20px auto 0; }
        .hc-final-ctas { display: flex; justify-content: center; gap: 20px; margin-top: 40px; flex-wrap: wrap; }
        .hc-final .hc-btn { position: relative; overflow: hidden; padding: 16px 32px; border-radius: 9999px; font-size: 16px; font-weight: 700; cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease, color 0.3s ease; text-decoration: none; display: inline-block; }
        .hc-final .hc-btn-primary { background: #C6E84A; color: #0f0f0f; }
        .hc-final .hc-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(198,232,74,0.35); }
        .hc-final .hc-btn-ghost { background: transparent; color: #FFFFFF; border: 1.5px solid #FFFFFF; }
        .hc-final .hc-btn-ghost:hover { background: #FFFFFF; color: #0f0f0f; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,255,255,0.15); }


        @media (max-width: 900px) {
          .hc-land-grid, .hc-split, .hc-prov-grid, .hc-clin-hero { grid-template-columns: 1fr; }
          .hc-land-row { grid-template-columns: 1fr; }
          .hc-ibs-panel { grid-template-columns: 1fr; gap: 26px; }
          .hc-eco-grid { grid-template-columns: 1fr; }
          .hc-eco-card { aspect-ratio: 4 / 3; }
          .hc-cards2 { grid-template-columns: 1fr 1fr; }
          .hc-out-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .hc-why-grid { grid-template-columns: 1fr 1fr; }
          .hc-tree-links { display: none; }
          .hc-node::before, .hc-node::after { display: none; }
          .hc-node { transform: none; }
          .hc-tree-row { grid-template-columns: 1fr 1fr; gap: 14px; }
          .hc-intel-header { grid-template-columns: 1fr; gap: 24px; margin-bottom: 40px; }
          .hc-intel-lede { max-width: none; }
          .hc-intel-card-content { grid-template-columns: 1fr; gap: 32px; padding: 40px 32px; }
          .hc-intel-visual { height: 240px; }
        }
        @media (max-width: 800px) {
          .hc-approach { grid-template-columns: 1fr; padding: 48px 0 80px; }
        }
        @media (max-width: 640px) {
          .hc-cards2, .hc-out-grid, .hc-why-grid { grid-template-columns: 1fr; }
          .hc-ibs-list { grid-template-columns: 1fr; }
          .hc-ibs-tabs { gap: 2px; }
          .hc-ibs-tab { padding: 12px 10px 14px; font-size: 13.5px; }
          .hc-layer { grid-template-columns: 1fr; gap: 8px; padding: 20px; }
          .hc-hero-ctas .hc-btn, .hc-final-ctas .hc-btn { width: 100%; }
          .hc-tree-row { grid-template-columns: 1fr; }
          .hc-intel-tabs { gap: 8px; }
          .hc-intel-tab { padding: 10px 14px; font-size: 13px; }
          .hc-intel-card-content { padding: 28px 20px; }
          .hc-intel-card-title { font-size: 24px; }
          .hc-intel-visual { display: none; }
          .hc-intel-card { min-height: 380px; }
        }
        @media (max-width: 560px) {
          .hc-landscape-right { grid-template-columns: 1fr; }
        }
        @media (max-width: 1024px) {
          .hc-final { padding: 80px 40px !important; }
        }
        @media (max-width: 768px) {
          .hc-final { padding: 60px 20px !important; }
          .hc-final-ctas { flex-direction: column; align-items: center; }
          .hc-final .hc-btn { width: 100%; max-width: 320px; }
        }

        /* Dynamic Tabbed Stack Deck — Intelligence Built Into Operations */
        .hc-intel-header { display: grid; grid-template-columns: 1fr; gap: 16px; align-items: start; margin-bottom: 48px; }
        .hc-intel-header .hc-h2 { white-space: normal; }
        .hc-intel-lede { font-size: 18px; line-height: 1.8; color: rgba(255,255,255,0.7); max-width: 640px; margin: 8px 0 0; }
        .scd-deck-wrapper { position: relative; width: 100%; margin-top: 20px; }
        .scd-deck { position: relative; width: 100%; min-height: 480px; }
        .scd-tabs-bar { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 6px; position: relative; z-index: 10; width: 100%; }
        .scd-tab { appearance: none; border: none; background: #1B2530; border-radius: 14px 14px 0 0; padding: 14px 12px; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; color: #B7C3D0; font-family: inherit; font-size: 13.5px; font-weight: 700; opacity: 0.85; transition: background 0.3s ease, transform 0.3s cubic-bezier(0.3, 0.9, 0.3, 1), opacity 0.3s ease, color 0.3s ease; text-align: center; min-width: 0; overflow: hidden; }
        .scd-tab:hover { background: #26303C; color: #ffffff; opacity: 1; }
        .scd-tab.is-active { background: #C6E84A; color: #0f0f0f; opacity: 1; transform: translateY(-4px); box-shadow: 0 -8px 20px rgba(0,0,0,0.3); }
        .scd-tab.is-active .scd-tab-num { background: rgba(15,23,42,0.16); color: #0f0f0f; }
        .scd-tab-num { font-size: 11px; font-weight: 800; letter-spacing: 0.08em; background: rgba(0,0,0,0.25); padding: 2px 6px; border-radius: 999px; }
        .scd-tab-text { font-family: var(--font-syne), sans-serif; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; }
        .scd-cards-stack { position: relative; width: 100%; min-height: 400px; }
        .scd-card { position: absolute; inset: 0; border-radius: 0 0 24px 24px; padding: 52px 56px; color: #ffffff; overflow: hidden; box-shadow: 0 30px 60px -20px rgba(0,0,0,0.7); transform: translateY(24px) scale(0.95); opacity: 0; pointer-events: none; transition: transform 0.45s cubic-bezier(0.3, 0.9, 0.3, 1), opacity 0.45s ease; z-index: 1; }
        .scd-card.is-active { transform: translateY(0) scale(1); opacity: 1; pointer-events: auto; z-index: 5; }
        .scd-card-bg-img { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
        .scd-card-bg-img img { width: 100%; height: 100%; object-fit: cover; opacity: 0.28; filter: saturate(1.2); }
        .scd-card-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(6,14,25,0.7) 0%, rgba(6,14,25,0.4) 100%); }
        .scd-card-inner { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 320px; gap: 48px; align-items: center; height: 100%; }
        .scd-card-num { display: inline-block; font-family: var(--font-syne), sans-serif; font-size: 13px; font-weight: 800; letter-spacing: 0.16em; background: rgba(0,0,0,0.35); padding: 4px 12px; border-radius: 999px; margin-bottom: 16px; backdrop-filter: blur(4px); }
        .scd-card-title { font-family: var(--font-syne), sans-serif; font-size: clamp(28px, 3.2vw, 42px); font-weight: 800; line-height: 1.12; margin: 0 0 16px; letter-spacing: -0.02em; }
        .scd-card-desc { font-size: 17px; line-height: 1.75; opacity: 0.92; max-width: 580px; margin: 0 0 24px; }
        .scd-card-tags { font-size: 13.5px; font-weight: 700; letter-spacing: 0.08em; background: rgba(0,0,0,0.35); padding: 8px 16px; border-radius: 999px; display: inline-block; backdrop-filter: blur(4px); }
        .scd-card-visual { position: relative; height: 250px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.2); overflow: hidden; display: flex; align-items: center; justify-content: center; box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
        .scd-visual-thumb { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 1; transition: transform 0.4s ease; }
        .scd-card:hover .scd-visual-thumb { transform: scale(1.05); }
        @media (max-width: 1024px) {
          .scd-tabs-bar { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
          .scd-tab { border-radius: 12px; }
          .scd-card-inner { grid-template-columns: 1fr; gap: 24px; }
          .scd-card-visual { display: none; }
          .scd-card { padding: 40px 32px; border-radius: 20px; }
        }
        @media (max-width: 640px) {
          .scd-tabs-bar { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .scd-tab-text { font-size: 12px; }
          .scd-card { padding: 32px 24px; }
        }
        .hc-intel-nodes::after { right: 28%; top: 42%; }
        .hc-intel-nodes span { left: 58%; bottom: 30%; }
        @keyframes hcRingSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        @media (prefers-reduced-motion: reduce) {
          .hc-reveal { opacity: 1; transform: none; transition: none; animation: none; }
          .hc-core { animation: none; }
          .hc-intel-rings::before, .hc-intel-rings::after { animation: none !important; }
          .hc-intel-card-panel { transition: none; }
        }


      `}</style>
      <section className="hc-hero">
        <video className="hc-hero-img" src="/healthcare/healthcarehero1.mp4" autoPlay muted loop playsInline />
        <div className="hc-wrap">
          <div className="hc-hero-inner hc-reveal">
            <HcLabel text="Healthcare Operations" />
            <h1 className="hc-h1">Making healthcare operations <span style={{ color: "#C6E84A" }}>work smarter.</span></h1>
            <p className="hc-hero-sub">Transforming complex healthcare processes through domain expertise, intelligent automation, data and AI.</p>
            <p className="hc-hero-body">Sytrion helps healthcare organizations simplify administrative complexity, improve process accuracy and create connected operations that support better experiences for members, patients and providers.</p>
            <div className="hc-hero-ctas">
              <Link href="#capabilities" className="hc-btn">Explore Our Capabilities ↓</Link>
              <Link href="/contact" className="hc-btn hc-btn--ghost">Talk to Our Experts ↗</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="hc-section-light hc-section-landscape">
        <div className="hc-wrap">
          <div className="hc-land-grid hc-reveal">
            <HcLabel text="The Healthcare Landscape" light />
            <h2 className="hc-h2">Better healthcare experiences depend on <span style={{ color: "#C6E84A" }}>better operations.</span></h2>
          </div>
          <div className="hc-land-row hc-reveal">
            <div className="hc-landscape-text">
              <p className="hc-lede">Healthcare organizations manage enormous volumes of information, transactions and interactions across members, patients, providers and operational systems.</p>
              <p className="hc-copy">Behind every healthcare experience sits a complex network of claims, authorizations, provider information, documentation and service workflows — often spread across multiple systems and teams.</p>
            </div>
            <div className="hc-landscape-right">
              {challenges.map((c, i) => (
                <article key={c.label} className="hc-challenge-card">
                  <div className="hc-challenge-top">
                    <div className="hc-challenge-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        {i === 0 && <><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /><path d="M9 14l2 2 4-4" /></>}
                        {i === 1 && <><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></>}
                        {i === 2 && <><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><circle cx="12" cy="18" r="3" /><path d="M8.6 7.4L10.4 16M15.4 7.4L13.6 16M9 6h6" /></>}
                        {i === 3 && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M8 13h3M8 17h3M14 13h2M14 17h2" /></>}
                        {i === 4 && <><rect x="2" y="6" width="6" height="6" rx="1" /><rect x="16" y="6" width="6" height="6" rx="1" /><rect x="9" y="14" width="6" height="6" rx="1" /><path d="M8 9h1M15 9h1M12 14v-2" /></>}
                        {i === 5 && <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /><path d="M22 12h-4M6 12H2" /></>}
                      </svg>
                    </div>
                  </div>
                  <div className="hc-challenge-label">{c.label}</div>
                </article>
              ))}
            </div>
          </div>
          <div className="hc-approach hc-reveal">
            <div className="hc-approach-top">
              <div className="hc-approach-dot" />
              <div className="hc-approach-label">Our Approach</div>
            </div>
            <p className="hc-approach-text">We connect <em>people, processes, data</em> and <em>intelligence</em> to make healthcare operations simpler.</p>
          </div>
        </div>
      </section>

      <section className="hc-section-navy">
        <div className="hc-wrap">
          <div className="hc-head hc-reveal">
            <HcLabel text="Across the Healthcare Ecosystem" />
            <h2 className="hc-h2">Built around the operations that <span style={{ color: "#C6E84A" }}>connect healthcare.</span></h2>
          </div>
          <div className="hc-eco-grid hc-reveal">
            {ecosystemCards.map((card) => (
              <article key={card.title} className="hc-eco-card">
                <img src={card.image} alt={card.title} />
                <div className="hc-eco-overlay" />
                <div className="hc-eco-body">
                  <h3 className="hc-eco-title">{card.title}</h3>
                  <p className="hc-eco-desc">{card.desc}</p>
                  <a href="#capabilities" className="hc-eco-link">Explore →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hc-section-light" id="capabilities">
        <div className="hc-wrap">
          <div className="hc-head hc-reveal">
            <HcLabel text="Intelligent Business Services" light />
            <h2 className="hc-h2">From administrative complexity to <span style={{ color: "#C6E84A" }}>intelligent operations.</span></h2>
            <p className="hc-lede">Sytrion combines healthcare process expertise with intelligent workflows, automation and data to help organizations manage high-volume operations with greater accuracy, visibility and control.</p>
          </div>

          <div className="hc-ibs-tabs hc-reveal" role="tablist" aria-label="Intelligent Business Services journey">
            {ibsTabs.map((t, i) => (
              <button
                key={t.num}
                type="button"
                role="tab"
                id={`hc-tab-${i}`}
                aria-selected={activeTab === i}
                aria-controls={`hc-panel-${i}`}
                className={`hc-ibs-tab${activeTab === i ? " hc-ibs-tab--active" : ""}`}
                onMouseEnter={() => setActiveTab(i)}
                onClick={() => setActiveTab(i)}
              >
                {t.tab}
              </button>
            ))}
          </div>

          <div
            key={ibsTabs[activeTab].num}
            className="hc-ibs-panel"
            role="tabpanel"
            id={`hc-panel-${activeTab}`}
            aria-labelledby={`hc-tab-${activeTab}`}
          >
            <div className="hc-ibs-copy">
              <span className="hc-ibs-num">{ibsTabs[activeTab].num} —</span>
              <h3 className="hc-ibs-title">{ibsTabs[activeTab].title}</h3>
              <p className="hc-ibs-tagline">{ibsTabs[activeTab].tagline}</p>
              <ul className="hc-ibs-list">
                {ibsTabs[activeTab].items.map((item) => (
                  <li key={item} className="hc-ibs-item">{item}</li>
                ))}
              </ul>
            </div>
            <div className="hc-ibs-visual">
              <img
                src={ibsTabs[activeTab].image}
                alt={ibsTabs[activeTab].title}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="hc-section-dark">
        <div className="hc-wrap">
          <div className="hc-split">
            <div className="hc-feature-img hc-reveal">
              <img src="/healthcare/claims.png" alt="Healthcare administrative professional working with claims documentation" />
              <div className="hc-feature-tint" />
            </div>
            <div className="hc-reveal">
              <HcLabel text="Claims Operations" />
              <h2 className="hc-h2">Smarter claims. Less <span style={{ color: "#C6E84A" }}>operational friction.</span></h2>
              <p className="hc-lede">Claims operations sit at the intersection of members, providers, policies, documentation and complex administrative workflows.</p>
              <p className="hc-copy">Sytrion combines structured workflows, document intelligence, automation and human expertise to help streamline administrative claims processes while improving visibility and operational control.</p>
              <div className="hc-claims-flow">
                <svg className="hc-cw-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <path
                    d="M14 28 H50 M50 28 H86 M86 28 L86 67 M86 74 H50 M50 74 H14"
                    stroke="#C6E84A"
                    strokeOpacity="0.42"
                    strokeWidth="1.2"
                    vectorEffect="non-scaling-stroke"
                    fill="none"
                  />
                </svg>

                <span className="hc-cw-arrow hc-cw-arrow--r" style={{ left: "32%", top: "28%" }} aria-hidden="true" />
                <span className="hc-cw-arrow hc-cw-arrow--r" style={{ left: "68%", top: "28%" }} aria-hidden="true" />
                <span className="hc-cw-arrow hc-cw-arrow--d" style={{ left: "86%", top: "67%" }} aria-hidden="true" />
                <span className="hc-cw-arrow hc-cw-arrow--l" style={{ left: "68%", top: "74%" }} aria-hidden="true" />
                <span className="hc-cw-arrow hc-cw-arrow--l" style={{ left: "32%", top: "74%" }} aria-hidden="true" />

                {claimsSteps.map((s) => (
                  <div key={s.name} className="hc-cw-node" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
                    <div className="hc-cw-circle">{flowIcons[s.icon]}</div>
                    <span className="hc-cw-label">
                      <span className="hc-cw-num">{s.num}</span>
                      <span className="hc-cw-name">{s.name}</span>
                    </span>
                    <span className="hc-cw-sub">{s.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hc-section-light">
        <div className="hc-wrap">
          <div className="hc-prov-grid">
            <div className="hc-prov-img hc-reveal">
              <img src="/healthcare/provider-lifecycle.png" alt="Physician with an administrative specialist in a care setting" />
              <div className="hc-prov-net" />
            </div>
            <div className="hc-reveal">
              <HcLabel text="Provider Operations" light />
              <h2 className="hc-h2">Better provider data. Better <span style={{ color: "#C6E84A" }}>connected operations.</span></h2>
              <p className="hc-lede">Accurate and current provider information is fundamental to claims, network operations and provider/member experiences.</p>
              <p className="hc-copy">Sytrion supports provider lifecycle operations with structured workflows and data management designed to improve consistency, accuracy and visibility.</p>
              <ol className="hc-timeline">
                {providerSteps.map((s) => (
                  <li key={s.name} className="hc-tstep">
                    <span className="hc-tstep-name">{s.name}</span>
                    <span className="hc-tstep-sub">{s.sub}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="hc-section-dark hc-intel-deck">
        <div className="hc-wrap">
          <div className="hc-intel-header hc-reveal">
            <div className="hc-intel-head-left">
              <HcLabel text="Intelligence Built Into Operations" />
              <h2 className="hc-h2">AI that works behind the <span style={{ color: "#C6E84A" }}>healthcare experience.</span></h2>
            </div>
            <p className="hc-intel-lede">Six connected capabilities that turn complex healthcare information into clearer decisions and more efficient operations.</p>
          </div>

          <div className="scd-deck-wrapper hc-reveal">
            <div className="scd-deck">
              {/* Tabs navigation attached directly to top of deck */}
              <div className="scd-tabs-bar" role="tablist" aria-label="Intelligence capabilities">
                {intelCapabilities.map((cap, i) => (
                  <button
                    key={cap.title}
                    role="tab"
                    id={`scd-tab-${i}`}
                    aria-selected={intelActive === i}
                    aria-controls={`scd-card-${i}`}
                    className={`scd-tab ${intelActive === i ? "is-active" : ""}`}
                    onClick={() => setIntelActive(i)}
                    onMouseEnter={() => setIntelActive(i)}
                    onFocus={() => setIntelActive(i)}
                  >
                    <span className="scd-tab-num">{cap.num}</span>
                    <span className="scd-tab-text">{cap.title}</span>
                  </button>
                ))}
              </div>

              {/* Cards stacked underneath */}
              <div className="scd-cards-stack">
                {intelCapabilities.map((cap, i) => {
                  const isActive = intelActive === i;
                  return (
                    <article
                      key={cap.title}
                      id={`scd-card-${i}`}
                      role="tabpanel"
                      aria-labelledby={`scd-tab-${i}`}
                      className={`scd-card ${isActive ? "is-active" : ""}`}
                      style={{ background: cap.bg }}
                    >
                      <div className="scd-card-bg-img">
                        <img src={cap.image} alt={cap.title} loading="lazy" decoding="async" />
                        <div className="scd-card-overlay" />
                      </div>

                      <div className="scd-card-inner">
                        <div className="scd-card-main">
                          <span className="scd-card-num">{cap.num}</span>
                          <h3 className="scd-card-title">{cap.title}</h3>
                          <p className="scd-card-desc">{cap.desc}</p>
                          <div className="scd-card-tags">{cap.tags}</div>
                        </div>
                        <div className="scd-card-visual" aria-hidden="true">
                          <img src={cap.image} alt="" className="scd-visual-thumb" />
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hc-section-dark hc-clin-section">
        <div className="hc-wrap">
          <div className="hc-clin-hero">
            <div className="hc-clin-img hc-reveal">
              <img src="/healthcare/ai-clinical.png" alt="Clinical reviewer working through clinical records at a workstation" />
              <div className="hc-clin-tint" />
              <div className="hc-chip-row">
                <span className="hc-chip">UNSTRUCTURED RECORDS → STRUCTURED SUMMARY</span>
                <span className="hc-chip">POST-QA SAMPLING</span>
                <span className="hc-chip">EXCEPTION FLAGS</span>
              </div>
            </div>
            <div className="hc-reveal">
              <HcLabel text="AI Clinical + Quality" />
              <h2 className="hc-h2">Turn complex records and quality workflows into clear,<span style={{ color: "#C6E84A" }}>review-ready intelligence. </span></h2>
              <p className="hc-lede">Healthcare teams often work across lengthy clinical records, fragmented documentation and high-volume quality-review queues. Finding the relevant information can require significant manual effort before a qualified reviewer can act.</p>
              <p className="hc-copy">Sytrion can combine healthcare operations expertise, generative AI, workflow automation and human review to organize information, prepare concise summaries and strengthen post-process quality controls — while keeping clinical judgment and final decisions with authorized professionals.</p>
            </div>
          </div>
          <div className="hc-clin-accordion hc-reveal">
            {clinicalItems.map((c, i) => {
              const isOpen = clinicalOpen === i;
              return (
                <div key={c.title} className={`hc-clin-item${isOpen ? " is-active" : ""}`}>
                  <button
                    className="hc-clin-header"
                    aria-expanded={isOpen}
                    onMouseEnter={() => setClinicalOpen(i)}
                    onClick={() => setClinicalOpen(isOpen ? -1 : i)}
                  >
                    <span>{c.title}</span>
                    <span className="hc-clin-chevron" data-open={isOpen ? "true" : "false"} aria-hidden="true">⌄</span>
                  </button>
                  <div className={`hc-clin-panel${isOpen ? " is-open" : ""}`}>
                    <div className="hc-clin-panel-inner">
                      <p>{c.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="hc-section-light">
        <div className="hc-wrap">
          <div className="hc-head hc-reveal">
            <HcLabel text="The Outcome" light />
            <h2 className="hc-h2">Better operations create better <span style={{ color: "#C6E84A" }}>healthcare experiences.</span></h2>
          </div>
          <div className="hc-out-grid hc-reveal">
            {outcomes.map((o) => (
              <article key={o.word} className="hc-outcome">
                <div className="hc-outcome-body">
                  <p className="hc-outcome-eyebrow">{o.num} / {o.word}</p>
                  <h3 className="hc-outcome-title">{o.title}</h3>
                  <p className="hc-outcome-desc">{o.desc}</p>
                </div>
                <div className="hc-outcome-media">
                  <img src={o.image} alt={o.title} loading="lazy" decoding="async" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hc-section-dark hc-model">
        <div className="hc-wrap">
          <div className="hc-head hc-reveal">
            <HcLabel text="The Sytrion Model" />
            <h2 className="hc-h2">One connected healthcare <span style={{ color: "#C6E84A" }}>operating model.</span></h2>
          </div>
          <div className="hc-stack hc-reveal">
            {modelLayers.map((layer) => (
              <div key={layer.num} className={`hc-layer`}>
                <span className="hc-layer-num">{layer.num}</span>
                <span className="hc-layer-name">{layer.name}</span>
                <span className="hc-layer-items">{layer.items}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hc-section-light hc-why">
        <div className="hc-wrap">
          <div className="hc-head hc-reveal">
            <HcLabel text="Why Sytrion" light />
            <h2 className="hc-h2">Healthcare understanding. <span style={{ color: "#C6E84A" }}>Intelligent execution.</span></h2>
          </div>
          <div className="hc-why-grid hc-reveal">
            {whyPoints.map((w) => (
              <article key={w.num} className="hc-why-card">
                <div className="hc-why-head">
                  <div className="hc-why-icon" aria-hidden="true">
                    <img src={w.icon} alt="" width="52" height="52" />
                  </div>
                  <div className="hc-why-head-text">
                    <span className="hc-why-num">{w.num}</span>
                    <h3>{w.name}</h3>
                  </div>
                </div>
                <p>{w.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hc-transform">
        <div className="hc-transform-grid">
          <div className="hc-transform-left">
          <span className="hc-transform-badge">Transformation in Action</span>
          <div className="hc-tl-step">
            <span className="hc-tl-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </span>
            <div className="hc-tl-body">
              <h3>The Challenge</h3>
              <p>High-volume healthcare workflows can involve fragmented information, manual document processing, repetitive validations and significant exception handling.</p>
            </div>
          </div>
          <div className="hc-tl-link" aria-hidden="true" />
          <div className="hc-tl-step hc-tl-step--approach">
            <span className="hc-tl-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </span>
            <div className="hc-tl-body">
              <h3>The Sytrion Approach</h3>
              <p>Combine domain-led operations with document intelligence, workflow automation, structured validation and operational analytics.</p>
            </div>
          </div>
        </div>
        <div className="hc-pot-card">
          <h3 className="hc-pot-title">The Potential</h3>
          <ul className="hc-pot-checklist">
            <li><span className="hc-pot-tick" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12.5 9.5 18 20 6.5" stroke="#C6E84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span> Faster Processing</li>
            <li><span className="hc-pot-tick" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12.5 9.5 18 20 6.5" stroke="#C6E84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span> Reduced Manual Touchpoints</li>
            <li><span className="hc-pot-tick" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12.5 9.5 18 20 6.5" stroke="#C6E84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span> Improved Data Quality</li>
            <li><span className="hc-pot-tick" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12.5 9.5 18 20 6.5" stroke="#C6E84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span> Better Exception Visibility</li>
            <li><span className="hc-pot-tick" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12.5 9.5 18 20 6.5" stroke="#C6E84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span> More Scalable Operations</li>
          </ul>
          <Link href="/contact" className="hc-transform-cta">Discuss Your Use Case <span>→</span></Link>
        </div>
        </div>
      </section>

      <section className="hc-final">
        <div className="hc-final-glow" />
        <div className="hc-wrap">
          <div className="hc-final-inner hc-reveal">
            <span className="hc-final-eyebrow">Let's Move Healthcare Forward</span>
            <h2 className="hc-final-h2">Ready to build smarter healthcare operations?</h2>
            <p className="hc-final-body">From claims and provider operations to quality, data and automation, Sytrion can help you create a more connected, intelligent and scalable operating model.</p>
            <div className="hc-final-ctas">
              <Link href="/contact" className="hc-btn hc-btn-primary">Talk to Our Healthcare Experts ↗</Link>
              <Link href="/contact" className="hc-btn hc-btn-ghost">Schedule a Consultation</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

