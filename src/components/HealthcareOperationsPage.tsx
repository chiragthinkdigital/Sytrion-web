"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const challenges = [
  "High-volume claims",
  "Complex administrative workflows",
  "Fragmented provider data",
  "Document-intensive processes",
  "Cross-system workflow complexity",
  "Rising experience expectations",
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
  { name: "RECEIVE", sub: "Claim & documents", bg: "linear-gradient(135deg, #0EA5E9, #0284C7)", text: "#FFFFFF", icon: "inbox" },
  { name: "EXTRACT", sub: "Relevant information", bg: "linear-gradient(135deg, #9333EA, #7E22CE)", text: "#FFFFFF", icon: "scan" },
  { name: "VALIDATE", sub: "Data & completeness", bg: "linear-gradient(135deg, #C6E84A, #9ECC12)", text: "#0F172A", icon: "check" },
  { name: "ROUTE", sub: "Workflow & exceptions", bg: "linear-gradient(135deg, #F97316, #EA580C)", text: "#FFFFFF", icon: "git-branch" },
  { name: "PROCESS", sub: "Administrative actions", bg: "linear-gradient(135deg, #2563EB, #1D4ED8)", text: "#FFFFFF", icon: "cpu" },
  { name: "ANALYZE", sub: "Quality & insights", bg: "linear-gradient(135deg, #EC4899, #DB2777)", text: "#FFFFFF", icon: "bar-chart" },
];

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
  { num: "01", title: "Document Intelligence", desc: "Transform unstructured clinical and administrative documents into structured, validated information that teams can act on.", tags: "Extract / Classify / Validate", bg: "linear-gradient(135deg, #0F172A 0%, #0369A1 100%)", tabColor: "#0284C7", image: "/healthcare/Document Intelligence.webp" },
  { num: "02", title: "Workflow Automation", desc: "Connect repetitive operational steps into intelligent workflows that route work, reduce friction and keep processes moving.", tags: "Route / Process / Update", bg: "linear-gradient(135deg, #1E1B4B 0%, #6D28D9 100%)", tabColor: "#7C3AED", image: "/healthcare/Workflow Automation.webp" },
  { num: "03", title: "Claims Intelligence", desc: "Surface anomalies and opportunities earlier, helping teams validate claims and prioritize the work that matters most.", tags: "Identify / Validate / Prioritize", bg: "linear-gradient(135deg, #142E11 0%, #4D7C0F 100%)", tabColor: "#65A30D", image: "/healthcare/Claims Intelligence.webp" },
  { num: "04", title: "Data Intelligence", desc: "Clean, reconcile and enrich fragmented data so healthcare teams can work from information they can trust.", tags: "Clean / Reconcile / Enrich", bg: "linear-gradient(135deg, #431407 0%, #C2410C 100%)", tabColor: "#EA580C", image: "/healthcare/Data Intelligence.webp" },
  { num: "05", title: "AI-Assisted Operations", desc: "Give operational teams intelligent assistance for summarization, resolution and everyday decisions without adding complexity.", tags: "Summarize / Assist / Resolve", bg: "linear-gradient(135deg, #0B192C 0%, #1D4ED8 100%)", tabColor: "#2563EB", image: "/healthcare/AI-Assisted Operations.webp" },
  { num: "06", title: "Operational Analytics", desc: "Measure performance, surface patterns and turn operational data into continuous opportunities for improvement.", tags: "Measure / Analyze / Improve", bg: "linear-gradient(135deg, #3B0764 0%, #BE185D 100%)", tabColor: "#DB2777", image: "/healthcare/Operational Analytics.webp" },
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

const outcomeIconProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const outcomeIcons = [
  <svg key="faster" {...outcomeIconProps}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  <svg key="accurate" {...outcomeIconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>,
  <svg key="efficient" {...outcomeIconProps}><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M11 9h4" /><path d="M11 13h4" /><path d="M11 17h4" /><path d="M7 9h.01" /><path d="M7 13h.01" /><path d="M7 17h.01" /></svg>,
  <svg key="visible" {...outcomeIconProps}><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" /><circle cx="12" cy="12" r="3" /></svg>,
  <svg key="experienced" {...outcomeIconProps}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>,
  <svg key="scalable" {...outcomeIconProps}><path d="M3 17.5l5.5-5.5 3.5 3.5L20.5 7" /><path d="M14.5 7h6v6" /></svg>,
];

const outcomes = [
  {
    num: "01",
    word: "FASTER",
    sub: "Faster processing",
    desc: "Streamlined workflows help reduce administrative delays.",
  },
  {
    num: "02",
    word: "ACCURATE",
    sub: "Greater accuracy",
    desc: "Structured validation helps improve data and process quality.",
  },
  {
    num: "03",
    word: "EFFICIENT",
    sub: "Lower administrative effort",
    desc: "Automation reduces repetitive manual activity.",
  },
  {
    num: "04",
    word: "VISIBLE",
    sub: "Better operational visibility",
    desc: "Connected reporting makes performance and exceptions easier to understand.",
  },
  {
    num: "05",
    word: "EXPERIENCED",
    sub: "Better experiences",
    desc: "Simpler operations help create smoother interactions for members, patients and providers.",
  },
  {
    num: "06",
    word: "SCALABLE",
    sub: "Built to adapt",
    desc: "Flexible operations support changing volumes and evolving requirements.",
  },
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
    icon: "/healthcare/Human + Digital.svg",
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

        .hc-hero { position: relative; min-height: 94vh; display: flex; align-items: flex-start; justify-content: flex-start; overflow: hidden; background: var(--hcn); }
        .hc-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .hc-hero-scrim { position: absolute; inset: 0; background: linear-gradient(100deg, rgba(4,12,24,0.94) 8%, rgba(6,18,36,0.72) 48%, rgba(7,22,44,0.32) 100%); }
        .hc-hero-scrim::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 220px; background: linear-gradient(180deg, rgba(4,12,24,0), rgba(4,12,24,0.85)); }
        .hc-hero .hc-wrap { position: relative; z-index: 1; width: 100%; padding: 140px 80px 120px; }
        .hc-hero-inner { max-width: 900px; }
        .hc-h1 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(42px, 6vw, 82px); line-height: 1.02; letter-spacing: -0.02em; font-weight: 700; color: #ffffff; margin: 28px 0 0; max-width: 780px; text-wrap: balance; }
        .hc-hero-sub { font-size: clamp(17px, 1.6vw, 21px); line-height: 1.65; color: rgba(255,255,255,0.88); max-width: 720px; margin: 26px 0 0; }
        .hc-hero-body { font-size: 16px; line-height: 1.75; color: rgba(255,255,255,0.68); max-width: 660px; margin: 18px 0 0; }
        .hc-hero-ctas { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 40px; }

        .hc-section-light { background: #ffffff; padding: clamp(76px, 9vw, 128px) 80px; }
        .hc-section-dark { background: var(--hcn); padding: clamp(76px, 9vw, 128px) 80px; }
        .hc-section-navy { background: linear-gradient(180deg, #081A31 0%, #071426 100%); padding: clamp(76px, 9vw, 128px) 80px; }
        .hc-head { max-width: none; }
        .hc-h2 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(32px, 5vw, 48px); font-weight: 700; line-height: 1.15; letter-spacing: -0.02em; margin: 0 0 20px; }
        .hc-section-light .hc-h2 { color: #0f172a; }
        .hc-section-dark .hc-h2, .hc-section-navy .hc-h2 { color: #ffffff; }
        .hc-h2 span { color: #C6E84A; }
        .hc-lede { font-size: 19px; font-weight: 400; line-height: 1.8; margin: 0 0 12px; }
        .hc-section-light .hc-lede { color: #5A5D66; }
        .hc-section-dark .hc-lede, .hc-section-navy .hc-lede { color: rgba(255,255,255,0.6); }
        .hc-copy { font-size: 19px; font-weight: 400; line-height: 1.8; margin: 0 0 12px; }
        .hc-section-light .hc-copy { color: #5A5D66; }
        .hc-section-dark .hc-copy, .hc-section-navy .hc-copy { color: rgba(255,255,255,0.6); }

        .hc-land-grid { margin-bottom: 0; }
        .hc-land-row { display: grid; grid-template-columns: 1fr 1.1fr; gap: 80px; align-items: start; margin-top: 40px; }
        .hc-section-landscape { padding-bottom: clamp(40px, 5vw, 60px); }
        .hc-landscape-text { }
        .hc-landscape-left { }
        .hc-head h2 { position: relative; padding-bottom: 12px; }
        .hc-head h2::after { content: ""; display: block; width: 64px; height: 4px; background: #C4E538; margin-top: 14px; }
        .hc-landscape-left p { color: #5B6472; max-width: 440px; }
        .hc-landscape-right { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
        .hc-challenge-card { background: #FAFBFC; border: 1px solid #EDF0F3; border-radius: 14px; padding: 18px 20px; position: relative; transition: transform .25s ease, background .25s ease, border-color .25s ease, box-shadow .25s ease; }
        .hc-challenge-card:hover { transform: translateY(-3px); background: #FFFFFF; border-color: #0A1628; box-shadow: 0 12px 30px -12px rgba(10,22,40,0.18); }
        .hc-challenge-card:hover::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: #C4E538; transform: scaleY(1); transform-origin: bottom; }
        .hc-challenge-card::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: #C4E538; transform: scaleY(0); transform-origin: bottom; transition: transform .25s ease; }
        .hc-challenge-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .hc-challenge-num { font-size: 12px; font-weight: 700; color: #97A83A; font-variant-numeric: tabular-nums; letter-spacing: .02em; }
        .hc-challenge-icon { width: 34px; height: 34px; border-radius: 9px; background: #0A1628; display: flex; align-items: center; justify-content: center; }
        .hc-challenge-icon svg { width: 16px; height: 16px; stroke: #C4E538; fill: none; stroke-width: 2; }
        .hc-challenge-label { font-size: 16px; font-weight: 600; color: #0A1628; }
        .hc-approach { border-top: 1px solid #E2E5E9; padding: 40px 0 0; display: grid; grid-template-columns: 260px 1fr; gap: 40px; align-items: start; }
        .hc-approach-label { font-size: 12px; font-weight: 600; letter-spacing: .18em; text-transform: uppercase; color: #8A93A3; }
        .hc-approach-text { font-size: 30px; line-height: 1.55; color: #0A1628; font-weight: 500; max-width: 760px; }
        .hc-approach-text em { font-style: normal; font-weight: 600; }

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
        .hc-claims-wf-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px 14px; margin-top: 36px; }
        .hc-claims-wf-step { position: relative; display: flex; align-items: center; }
        .hc-claims-wf-card { flex: 1; border-radius: 16px; padding: 18px 16px; border: 1px solid rgba(255, 255, 255, 0.15); transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, filter 0.35s ease; position: relative; box-shadow: 0 10px 24px -6px rgba(0,0,0,0.4); }
        .hc-claims-wf-card:hover { transform: translateY(-5px); box-shadow: 0 16px 36px -8px rgba(0,0,0,0.6); filter: brightness(1.08); }
        .hc-claims-wf-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .hc-claims-wf-icon { width: 34px; height: 34px; border-radius: 10px; background: rgba(0, 0, 0, 0.2); border: 1px solid rgba(255, 255, 255, 0.25); display: flex; align-items: center; justify-content: center; color: inherit; transition: transform 0.3s ease; }
        .hc-claims-wf-card:hover .hc-claims-wf-icon { transform: scale(1.1); }
        .hc-claims-wf-num { font-family: var(--font-syne), sans-serif; font-size: 11.5px; font-weight: 800; color: inherit; letter-spacing: 0.08em; background: rgba(0, 0, 0, 0.2); padding: 4px 9px; border-radius: 999px; border: 1px solid rgba(255, 255, 255, 0.2); }
        .hc-claims-wf-title { font-family: var(--font-syne), sans-serif; font-size: 15px; font-weight: 700; color: inherit; letter-spacing: 0.04em; }
        .hc-claims-wf-sub { font-size: 12.5px; line-height: 1.45; color: inherit; opacity: 0.85; margin-top: 4px; }
        .hc-claims-wf-connector { position: absolute; right: -13px; top: 50%; transform: translateY(-50%); width: 24px; height: 24px; border-radius: 50%; background: #071426; border: 1.5px solid rgba(255, 255, 255, 0.3); display: flex; align-items: center; justify-content: center; color: #ffffff; z-index: 3; box-shadow: 0 0 10px rgba(0,0,0,0.6); }
        @media (max-width: 1100px) {
          .hc-claims-wf-grid { grid-template-columns: repeat(2, 1fr); }
          .hc-claims-wf-connector { display: none; }
        }
        @media (max-width: 640px) {
          .hc-claims-wf-grid { grid-template-columns: 1fr; }
        }

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

        .hc-out-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; margin-top: 56px; }
        .hc-outcome { position: relative; overflow: hidden; background: #ffffff; border: 1px solid rgba(12,27,48,0.08); border-radius: 20px; padding: clamp(28px, 2.5vw, 36px); display: flex; flex-direction: column; box-shadow: 0 4px 20px -6px rgba(12,27,48,0.04); transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.35s ease, box-shadow 0.35s ease; }
        .hc-outcome::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 3px; background: linear-gradient(90deg, #7AA306, #C6E84A); opacity: 0; transition: opacity 0.35s ease; }
        .hc-outcome:hover { transform: translateY(-6px); border-color: rgba(122,163,6,0.35); box-shadow: 0 24px 48px -18px rgba(12,27,48,0.12); }
        .hc-outcome:hover::after { opacity: 1; }
        .hc-outcome-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .hc-outcome-icon { width: 48px; height: 48px; border-radius: 14px; background: rgba(198,232,74,0.12); border: 1px solid rgba(122,163,6,0.2); display: flex; align-items: center; justify-content: center; color: #618300; transition: background 0.35s ease, border-color 0.35s ease, color 0.35s ease, transform 0.35s ease; }
        .hc-outcome:hover .hc-outcome-icon { background: #C6E84A; border-color: #C6E84A; color: #0C1B30; transform: scale(1.06); }
        .hc-outcome-word { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(22px, 2.2vw, 28px); font-weight: 700; letter-spacing: -0.01em; color: #0C1B30; margin: 0; }
        .hc-outcome-sub { font-size: 15px; font-weight: 600; color: #7AA306; margin: 6px 0 0; }
        .hc-outcome-desc { font-size: 14.5px; line-height: 1.65; color: #5A6B7F; margin: 12px 0 0; }

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

        .hc-transform { display:grid; grid-template-columns:1fr 1fr; min-height:700px; isolation:isolate; overflow:hidden; }
        .hc-transform-panel { padding:56px 64px; display:flex; }
        .hc-transform-panel--dark { position:relative; background:radial-gradient(circle at 30% 20%, #132745 0%, #0A1628 55%, #050B14 100%); color:#F5F7FA; overflow:hidden; }
        .hc-transform-panel--dark::before { content:""; position:absolute; left:-80px; bottom:-80px; width:380px; height:380px; background:radial-gradient(circle, rgba(196,229,56,0.12), transparent 70%); pointer-events:none; }
        .hc-transform-panel--light { background:#FFFFFF; color:#0A1628; }
        .hc-transform-panel-inner { width:100%; display:flex; flex-direction:column; }
        .hc-transform-panel--light .hc-transform-panel-inner { justify-content:center; }
        .hc-transform-badge { display:inline-block; align-self:flex-start; background:#C4E538; color:#2B3B0A; padding:5px 14px; border-radius:999px; font-weight:700; font-size:11px; letter-spacing:.04em; text-transform:uppercase; margin-bottom:24px; }
        .hc-transform h3 { font-family:var(--font-syne),Arial,Helvetica,sans-serif; font-size:clamp(22px,2.4vw,30px); font-weight:600; margin:22px 0 0; color:inherit; }
        .hc-transform-panel--dark > .hc-transform-panel-inner > p { font-size:16px; line-height:1.75; margin:14px 0 0; max-width:340px; color:#93A0B4; }
        .hc-transform-panel--light > .hc-transform-panel-inner > p { font-size:16px; line-height:1.75; margin:14px 0 0; max-width:460px; color:#5B6472; }
        .hc-transform-illustration { flex:1; display:flex; align-items:flex-end; justify-content:center; margin-top:32px; }
        .hc-transform-illustration svg { width:100%; max-width:480px; height:auto; }
        .hc-pot-heading { display:flex; align-items:center; gap:12px; margin:28px 0 16px; font-family:var(--font-syne),Arial,Helvetica,sans-serif; font-size:19px; font-weight:700; color:#0A1628; text-transform:uppercase; letter-spacing:.04em; }
        .hc-pot-heading span { white-space:nowrap; }
        .hc-pot-heading::after { content:""; flex:1; height:1px; background:linear-gradient(90deg, #C4E538, #E5E8EC 60%); }
        .hc-pot-checklist { list-style:none; margin:0; padding:0; }
        .hc-pot-checklist li { display:flex; align-items:center; gap:12px; padding:12px 0; border-top:1px solid #EEF0F3; font-size:15px; font-weight:600; color:#1D2733; transition:background .2s ease, border-left .2s ease; border-left:2px solid transparent; }
        .hc-pot-checklist li:last-child { border-top: 1px solid #EEF0F3; }
        .hc-pot-checklist li:hover { background:#FAFBF6; border-left-color:#C4E538; }
        .hc-pot-badge { width:26px; height:26px; border-radius:50%; background:#0A1628; color:#C4E538; display:flex; align-items:center; justify-content:center; flex:0 0 auto; font-weight:700; font-size:14px; }
        .hc-transform-cta { display:inline-flex; align-items:center; gap:10px; align-self:flex-start; background:#0A1628; color:#F5F7FA; padding:12px 22px; border-radius:100px; font-weight:700; text-decoration:none; margin-top:28px; transition:background .15s ease, transform .15s ease; }
        .hc-transform-cta span { display:inline-block; transition:transform .15s ease; }
        .hc-transform-cta:hover { background:#142544; transform:translateY(-1px); }
        .hc-transform-cta:hover span { transform:translateX(3px); }
        @media (prefers-reduced-motion:reduce){ .hc-pot-checklist li:hover{ border-left-color:#C4E538; } .hc-transform-cta:hover{ transform:none; } .hc-transform-cta:hover span{ transform:none; } }
        @media (max-width:900px){ .hc-transform{ grid-template-columns:1fr; min-height:auto; } .hc-transform-panel{ padding:32px 24px; } }

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
          .hc-out-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .hc-outcome:nth-child(5) { grid-column: span 1; }
          .hc-why-grid { grid-template-columns: 1fr 1fr; }
          .hc-tree-links { display: none; }
          .hc-node::before, .hc-node::after { display: none; }
          .hc-node { transform: none; }
          .hc-tree-row { grid-template-columns: 1fr 1fr; gap: 14px; }
          .hc-transform-half { width: 100%; height: 50%; bottom: auto; }
          .hc-transform-half--light { top: 50%; bottom: 0; }
          .hc-transform-grid { grid-template-columns: 1fr; gap: 44px; }
          .hc-transform-cta { left: 50%; bottom: 24px; }
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
          .hc-outcome:nth-child(5) { grid-column: span 1; }
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
        .scd-tabs-bar { display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; position: relative; z-index: 10; width: 100%; }
        .scd-tab { appearance: none; border: none; background: var(--c); border-radius: 14px 14px 0 0; padding: 14px 12px; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; color: #ffffff; font-family: inherit; font-size: 13.5px; font-weight: 700; filter: brightness(0.55); opacity: 0.85; transition: filter 0.3s ease, transform 0.3s cubic-bezier(0.3, 0.9, 0.3, 1), opacity 0.3s ease; text-align: center; }
        .scd-tab:hover { filter: brightness(0.85); opacity: 1; }
        .scd-tab.is-active { filter: brightness(1); opacity: 1; transform: translateY(-4px); box-shadow: 0 -8px 20px rgba(0,0,0,0.3); }
        .scd-tab-num { font-size: 11px; font-weight: 800; letter-spacing: 0.08em; background: rgba(0,0,0,0.25); padding: 2px 6px; border-radius: 999px; }
        .scd-tab-text { font-family: var(--font-syne), sans-serif; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
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
          .scd-tabs-bar { grid-template-columns: repeat(3, 1fr); gap: 6px; }
          .scd-tab { border-radius: 12px; }
          .scd-card-inner { grid-template-columns: 1fr; gap: 24px; }
          .scd-card-visual { display: none; }
          .scd-card { padding: 40px 32px; border-radius: 20px; }
        }
        @media (max-width: 640px) {
          .scd-tabs-bar { grid-template-columns: repeat(2, 1fr); }
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
        <img className="hc-hero-img" src="/healthcare/Healthcare services hero.png" alt="Healthcare professionals working in a modern hospital environment" />
        <div className="hc-hero-scrim" />
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
                <article key={c} className="hc-challenge-card">
                  <div className="hc-challenge-top">
                    <span className="hc-challenge-num">{String(i + 1).padStart(2, "0")}</span>
                    <div className="hc-challenge-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        {i === 0 && <><path d="M4 7h16v10H4z" /><path d="M8 7v10M12 7v10M16 7v10" /></>}
                        {i === 1 && <><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></>}
                        {i === 2 && <><circle cx="7" cy="12" r="3" /><circle cx="17" cy="12" r="3" /><line x1="10" y1="12" x2="14" y2="12" /></>}
                        {i === 3 && <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 9h10M7 13h10" /></>}
                        {i === 4 && <><circle cx="12" cy="12" r="9" /><path d="M12 7v10M7 12h10" /></>}
                        {i === 5 && <><path d="M4 17l5-5 3 3 7-7" /><path d="M4 14h14" /></>}
                      </svg>
                    </div>
                  </div>
                  <div className="hc-challenge-label">{c}</div>
                </article>
              ))}
            </div>
          </div>
          <div className="hc-approach hc-reveal">
            <div className="hc-approach-label">OUR APPROACH</div>
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
              <div className="hc-claims-wf-grid">
                {claimsSteps.map((s, i) => {
                  const stepIcons: Record<string, React.ReactNode> = {
                    inbox: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-6l-2 3h-4l-2-3H2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6z" /><path d="M5.45 5.11 2 12v0h20v0l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>,
                    scan: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><line x1="7" y1="12" x2="17" y2="12" /></svg>,
                    check: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
                    "git-branch": <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" /></svg>,
                    cpu: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="15" x2="23" y2="15" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="15" x2="4" y2="15" /></svg>,
                    "bar-chart": <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>,
                  };

                  return (
                    <div key={s.name} className="hc-claims-wf-step">
                      <div
                        className="hc-claims-wf-card"
                        style={{
                          background: s.bg,
                          color: s.text,
                        }}
                      >
                        <div className="hc-claims-wf-top">
                          <div className="hc-claims-wf-icon">
                            {stepIcons[s.icon]}
                          </div>
                          <span className="hc-claims-wf-num">0{i + 1}</span>
                        </div>
                        <div className="hc-claims-wf-title">{s.name}</div>
                        <div className="hc-claims-wf-sub">{s.sub}</div>
                      </div>
                      {i < claimsSteps.length - 1 && (
                        <div className="hc-claims-wf-connector" aria-hidden="true">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </div>
                      )}
                    </div>
                  );
                })}
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

      <section className="hc-section-dark">
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
                    style={{ "--c": cap.tabColor } as React.CSSProperties}
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

      <section className="hc-section-dark">
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
            {outcomes.map((o, i) => (
              <article key={o.word} className="hc-outcome">
                <div className="hc-outcome-header">
                  <div className="hc-outcome-icon" aria-hidden="true">
                    {outcomeIcons[i]}
                  </div>
                </div>
                <h3 className="hc-outcome-word">{o.word}</h3>
                <p className="hc-outcome-sub">{o.sub}</p>
                <p className="hc-outcome-desc">{o.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hc-section-dark">
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

      <section className="hc-section-light">
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
        <div className="hc-transform-panel hc-transform-panel--dark">
          <div className="hc-transform-panel-inner">
            <span className="hc-transform-badge">Transformation in Action</span>
            <h3>The Challenge</h3>
            <p>High-volume healthcare workflows can involve fragmented information, manual document processing, repetitive validations and significant exception handling.</p>
            <div className="hc-transform-illustration" aria-hidden="true">
              <svg viewBox="0 0 520 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="40" width="160" height="120" rx="12" stroke="#2E4266" strokeWidth="1.5" transform="rotate(-5 100 100)" />
                <rect x="45" y="55" width="160" height="120" rx="12" stroke="#3D5170" strokeWidth="1.5" transform="rotate(4 125 115)" />
                <line x1="55" y1="75" x2="155" y2="75" stroke="#2E4266" strokeOpacity="0.6" strokeWidth="1.2" />
                <line x1="55" y1="95" x2="170" y2="95" stroke="#2E4266" strokeOpacity="0.6" strokeWidth="1.2" />
                <line x1="55" y1="115" x2="140" y2="115" stroke="#2E4266" strokeOpacity="0.6" strokeWidth="1.2" />
                <line x1="55" y1="135" x2="130" y2="135" stroke="#2E4266" strokeOpacity="0.6" strokeWidth="1.2" />
                <line x1="80" y1="80" x2="180" y2="80" stroke="#3D5170" strokeOpacity="0.6" strokeWidth="1.2" />
                <line x1="80" y1="100" x2="190" y2="100" stroke="#3D5170" strokeOpacity="0.6" strokeWidth="1.2" />
                <line x1="80" y1="120" x2="160" y2="120" stroke="#3D5170" strokeOpacity="0.6" strokeWidth="1.2" />
                <line x1="80" y1="140" x2="150" y2="140" stroke="#3D5170" strokeOpacity="0.6" strokeWidth="1.2" />
                <rect x="60" y="170" width="120" height="6" rx="3" fill="#1A2B45" fillOpacity="0.5" />
                <rect x="60" y="182" width="80" height="6" rx="3" fill="#1A2B45" fillOpacity="0.35" />
                <path d="M220 110 C280 70, 320 150, 380 110" stroke="#C4E538" strokeWidth="2" strokeDasharray="8 6" fill="none" />
                <circle cx="440" cy="110" r="42" stroke="#1A2B45" strokeWidth="1.5" fill="none" />
                <circle cx="440" cy="110" r="28" fill="#0A1628" stroke="#C4E538" strokeWidth="2.5" />
                <path d="M426 110 l 10 11 l 20 -22" stroke="#C4E538" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <text x="65" y="220" fontSize="12" fill="#5B6C87">fragmented records</text>
                <text x="395" y="170" fontSize="12" fontWeight="700" fill="#C4E538">validated outcome</text>
                <circle cx="440" cy="110" r="50" stroke="#C4E538" strokeOpacity="0.15" strokeWidth="1" fill="none" />
                <path d="M210 200 l 30 -30 l 25 20 l 35 -25 l 30 15" stroke="#2E4266" strokeWidth="1" strokeOpacity="0.4" fill="none" />
                <circle cx="210" cy="200" r="3" fill="#C4E538" fillOpacity="0.5" />
                <circle cx="240" cy="170" r="3" fill="#C4E538" fillOpacity="0.5" />
                <circle cx="265" cy="190" r="3" fill="#C4E538" fillOpacity="0.5" />
                <circle cx="300" cy="165" r="3" fill="#C4E538" fillOpacity="0.5" />
                <circle cx="330" cy="180" r="3" fill="#C4E538" fillOpacity="0.5" />
                <text x="200" y="245" fontSize="11" fill="#5B6C87" fillOpacity="0.7">processing pipeline</text>
              </svg>
            </div>
          </div>
        </div>
        <div className="hc-transform-panel hc-transform-panel--light">
          <div className="hc-transform-panel-inner" style={{ justifyContent: "center" }}>
            <h3>The Sytrion Approach</h3>
            <p>Combine domain-led operations with document intelligence, workflow automation, structured validation and operational analytics.</p>
            <div className="hc-pot-heading"><span>THE POTENTIAL</span></div>
            <ul className="hc-pot-checklist">
              <li><span className="hc-pot-badge" aria-hidden="true">✓</span> Faster Processing</li>
              <li><span className="hc-pot-badge" aria-hidden="true">✓</span> Reduced Manual Touchpoints</li>
              <li><span className="hc-pot-badge" aria-hidden="true">✓</span> Improved Data Quality</li>
              <li><span className="hc-pot-badge" aria-hidden="true">✓</span> Better Exception Visibility</li>
              <li><span className="hc-pot-badge" aria-hidden="true">✓</span> More Scalable Operations</li>
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

