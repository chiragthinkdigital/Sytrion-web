"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";

const landscapeChallenges = [
  "Rising customer expectations",
  "Complex regulatory requirements",
  "Fragmented legacy systems",
  "Financial crime & fraud risk",
  "High-volume transactions",
  "Growing cost pressures",
];

const landscapeIcons = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M2 10h20"/></svg>,
  <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17.5l5.5-5.5 3.5 3.5L20.5 7"/><path d="M14.5 7h6v6"/></svg>,
];

const ecosystemCards = [
  { title: "Retail Banking", desc: "Customer onboarding, deposits, account servicing, payments and customer operations." },
  { title: "Lending & Mortgages", desc: "Operational support across origination, documentation, servicing and portfolio administration." },
  { title: "Commercial Banking", desc: "Account, lending, payment, cash-management and trade-related operational support." },
  { title: "Cards & Payments", desc: "Card servicing, transaction operations, reconciliation, disputes and payment workflows." },
];

const ibsTabs = [
  { num: "01", tab: "Onboarding", title: "Customer Onboarding", lead: "Make the first banking interaction simpler and smarter.", items: ["Application processing","Customer data capture","Document processing","KYC workflow support","Identity verification support","Account-opening administration"], img: "/services/banking/Customer Onboarding.png", alt: "Customer onboarding process" },
  { num: "02", tab: "Accounts", title: "Account Operations", lead: "Keep customer accounts accurate, responsive and connected.", items: ["Account setup","Account maintenance","Customer information updates","Service requests","Deposit operations","Account closure support"], img: "/services/banking/Account Operations.png", alt: "Account operations management" },
  { num: "03", tab: "Payments", title: "Payments Operations", lead: "Support the movement of money with greater control.", items: ["Payment processing","Transaction validation","Payment investigations","Exception handling","Settlement support","Reconciliation"], img: "/services/banking/Payments Operations.jpg", alt: "Payment operations processing" },
  { num: "04", tab: "Lending", title: "Lending Operations", lead: "Streamline operational workflows across the lending lifecycle.", items: ["Application processing","Document preparation","Credit administration support","Loan setup","Loan servicing","Post-disbursement administration"], img: "/services/banking/Lending Operations.jpg", alt: "Lending operations workflow" },
  { num: "05", tab: "Compliance", title: "Compliance Operations", lead: "Embed structured controls throughout the customer lifecycle.", items: ["KYC operations","Periodic reviews","Screening support","AML workflow support","Remediation","Exception management"], img: "/services/banking/Compliance Operations.jpg", alt: "Compliance operations monitoring" },
  { num: "06", tab: "Data", title: "Banking Data & Insights", lead: "Turn operational data into better visibility.", items: ["Data capture & validation","Master-data support","Operational reporting","Exception analytics","Performance dashboards","Data-quality monitoring"], img: "/services/banking/Banking Data & Insights.jpg", alt: "Banking data and analytics" },
];

const kycSteps = [
  { name: "APPLY", sub: "Application intake", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
  { name: "CAPTURE", sub: "Customer information", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  { name: "VERIFY", sub: "Identity & documents", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg> },
  { name: "SCREEN", sub: "Required checks", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> },
  { name: "REVIEW", sub: "Exceptions", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> },
  { name: "ONBOARD", sub: "Account setup", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/></svg> },
  { name: "MAINTAIN", sub: "Ongoing lifecycle", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
];

const threeCardSections = [
  {
    eyebrow: "Lending Operations",
    heading: "Make lending operations move faster.",
    desc: "Lending brings together customers, credit information, documents, decisions, payments and ongoing account servicing. Sytrion supports the operational processes across the lending lifecycle, helping banks improve workflow efficiency, data quality and servicing responsiveness.",
    stages: [
      { title: "Origination", items: ["Application processing","Document processing","Data validation","Credit administration support","Pre-closing support"] },
      { title: "Closing & Disbursement", items: ["Document preparation","Closing support","Loan setup","Disbursement administration","Quality review"] },
      { title: "Servicing", items: ["Account maintenance","Payment processing","Customer servicing","Correspondence","Account updates"] },
      { title: "Portfolio Operations", items: ["Document review","Portfolio data management","Monitoring support","Exception management","Operational reporting"] },
    ],
    img: "/services/banking/Lending Operations (2).jpg",
    alt: "Lending professional working with customer",
    linkText: "Explore Lending Operations →",
  },
  {
    eyebrow: "Transaction Operations",
    heading: "Powering the transactions behind everyday banking.",
    desc: "Every payment creates a chain of processing, validation, settlement and reconciliation activities that must happen accurately and securely. Sytrion supports high-volume cards and payment operations with intelligent workflows designed to improve processing efficiency and operational control.",
    stages: [
      { title: "Cards Operations", items: ["Application processing","Card servicing","Account maintenance","Transaction support","Dispute administration"] },
      { title: "Payment Operations", items: ["Payment processing","Transaction validation","Wire/payment support","Exception processing","Payment investigations"] },
      { title: "Reconciliation & Settlement", items: ["Transaction matching","Settlement support","Account reconciliation","GL reconciliation","Exception management"] },
      { title: "Disputes & Chargebacks", items: ["Dispute intake","Document processing","Chargeback administration","Case workflow support","Resolution tracking"] },
    ],
    img: "/services/banking/Transaction Operations.jpg",
    alt: "Digital payment transaction operations",
    linkText: "Explore Payment Operations →",
  },
  {
    eyebrow: "Financial Crime & Compliance Operations",
    heading: "Strengthen controls without slowing the customer experience.",
    desc: "Banks must balance seamless customer experiences with increasingly complex requirements around customer due diligence, transaction monitoring and financial crime prevention. Sytrion supports structured operational workflows that help banks manage compliance processes with greater consistency, visibility and control.",
    stages: [
      { title: "KYC", items: ["Customer onboarding support","Customer information verification","Periodic review support","KYC remediation","Document management"] },
      { title: "Screening", items: ["Customer screening workflow support","Watchlist review administration","Alert processing","Exception routing","Case documentation"] },
      { title: "AML Operations", items: ["Transaction-monitoring support","Alert administration","Case preparation","Investigation support","Remediation workflows"] },
      { title: "Fraud & Disputes", items: ["Fraud-case administration","Transaction review support","Dispute processing","Chargeback workflows","Case tracking"] },
    ],
    img: "/services/banking/Financial Crime & Compliance Operations.jpg",
    alt: "Compliance operations workflow",
    linkText: "Explore Compliance Operations →",
  },
];

const intelligenceNodes = [
  { title: "Document Intelligence", verbs: "Extract • Classify • Validate" },
  { title: "Customer Intelligence", verbs: "Understand • Personalize • Assist" },
  { title: "Workflow Intelligence", verbs: "Automate • Route • Resolve" },
  { title: "Transaction Intelligence", verbs: "Match • Validate • Reconcile" },
  { title: "Compliance Intelligence", verbs: "Screen • Prioritize • Review" },
  { title: "Fraud Intelligence", verbs: "Detect • Flag • Investigate" },
  { title: "Decision Intelligence", verbs: "Analyze • Predict • Improve" },
];

const financeOps = [
  { title: "Reconciliation", items: ["Bank & GL reconciliation","Transaction matching","Suspense-account support","Exception resolution"] },
  { title: "Record-to-Report", items: ["Journal processing","General ledger support","Account reconciliation","Month-end support"] },
  { title: "Financial Reporting Support", items: ["Data preparation","Management reporting","Variance analysis","Operational dashboards"] },
  { title: "Financial Operations", items: ["Payment administration","Intercompany support","Account analysis","Exception management"] },
];

const cxOps = [
  { title: "Customer Service", items: ["Account & transaction queries","Service requests","Product support"] },
  { title: "Digital Support", items: ["Chat & messaging operations","Email support","Self-service assistance"] },
  { title: "Complaints & Resolution", items: ["Complaint intake","Case management","Escalation workflows"] },
  { title: "Customer Insights", items: ["Interaction analytics","Service trends","Customer feedback","Operational insights"] },
];

const outcomeIconProps = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
const outcomeIcons = [
  <svg key="faster" {...outcomeIconProps}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  <svg key="accurate" {...outcomeIconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>,
  <svg key="efficient" {...outcomeIconProps}><path d="M12 2v10l4.7 2.7" /><path d="M12 2v10l-4.7 2.7" /><circle cx="12" cy="18" r="4" /></svg>,
  <svg key="controlled" {...outcomeIconProps}><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M11 9h4" /><path d="M11 13h4" /><path d="M11 17h4" /><path d="M7 9h.01" /><path d="M7 13h.01" /><path d="M7 17h.01" /></svg>,
  <svg key="responsive" {...outcomeIconProps}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>,
  <svg key="scalable" {...outcomeIconProps}><path d="M3 17.5l5.5-5.5 3.5 3.5L20.5 7" /><path d="M14.5 7h6v6" /></svg>,
];
const outcomes = [
  { num: "01", word: "FASTER", sub: "Faster processing", desc: "Intelligent workflows help reduce processing delays." },
  { num: "02", word: "ACCURATE", sub: "Greater accuracy", desc: "Structured validation improves operational and data quality." },
  { num: "03", word: "EFFICIENT", sub: "Lower operational effort", desc: "Automation reduces repetitive manual processing." },
  { num: "04", word: "CONTROLLED", sub: "Stronger operational control", desc: "Structured workflows improve visibility into exceptions and processes." },
  { num: "05", word: "RESPONSIVE", sub: "Better customer experience", desc: "Connected operations help service teams respond more effectively." },
  { num: "06", word: "SCALABLE", sub: "Built for growth", desc: "Flexible operations support changing transaction volumes and requirements." },
];

const modelLayers = [
  { num: "01", name: "Customers & Businesses", items: ["Individuals", "SMEs", "Corporates", "Partners"] },
  { num: "02", name: "Banking Experience", items: ["Branch", "Web", "Mobile", "Contact Center", "Assisted Channels"] },
  { num: "03", name: "Sytrion Intelligence Layer", items: ["AI", "Automation", "Document Intelligence", "Data", "Analytics"] },
  { num: "04", name: "Intelligent Operations", items: ["Onboarding", "Accounts", "Payments", "Lending", "Compliance", "Finance"] },
  { num: "05", name: "Business Outcomes", items: ["EXPERIENCE", "SPEED", "ACCURACY", "CONTROL", "EFFICIENCY", "SCALE"] },
];

const checkLabels = ["Domain-led", "AI-first", "Human + Digital", "Control-focused", "Data-driven", "Built to Scale"];

const whyIconProps = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
const whyPoints = [
  { num: "01", name: "Domain-led", desc: "Solutions built around real banking processes and operating environments.", icon: <svg key="d" {...whyIconProps}><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/></svg> },
  { num: "02", name: "AI-first", desc: "Intelligence embedded into documents, workflows, transactions and operations.", icon: <svg key="a" {...whyIconProps}><path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5"/><circle cx="12" cy="16" r="4"/><path d="M12 12v-2"/><path d="M8 20h8"/></svg> },
  { num: "03", name: "Human + Digital", desc: "Technology and skilled professionals working together.", icon: <svg key="h" {...whyIconProps}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { num: "04", name: "Control-focused", desc: "Structured processes designed around accuracy, visibility and operational governance.", icon: <svg key="c" {...whyIconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg> },
  { num: "05", name: "Data-driven", desc: "Reliable information supporting operations, service and decisions.", icon: <svg key="da" {...whyIconProps}><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="7" width="4" height="14" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg> },
  { num: "06", name: "Built to Scale", desc: "Flexible models designed around changing transaction volumes and business requirements.", icon: <svg key="s" {...whyIconProps}><path d="M3 17.5l5.5-5.5 3.5 3.5L20.5 7"/><path d="M14.5 7h6v6"/><path d="M3 7h4v4"/><path d="M17 13v4h-4"/></svg> },
];

function BkLabel({ text, light }: { text: string; light?: boolean }) {
  return <span className={`bk-label${light ? " bk-label--light" : ""}`}>{text}</span>;
}

export default function BankingOperationsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedStages, setExpandedStages] = useState<Set<string>>(new Set());
  const revealRef = useRef<HTMLDivElement | null>(null);

  const toggleStage = (key: string) => {
    setExpandedStages((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  useEffect(() => {
    const root = revealRef.current;
    if (!root) return;
    const targets = root.querySelectorAll(".bk-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("bk-in");
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
    <div className="bk-page" ref={revealRef}>
      <style>{`
        .bk-page { --bkn:#071426; --bkn2:#0B1F38; --bkb:#10315C; --bkc:#A8D51E; --bkl:#F5F9FC; color:#0E1B2A; background:#fff; font-family: var(--font-geist-sans), Arial, sans-serif; }
        .bk-page * { box-sizing: border-box; }
        .bk-wrap { max-width: 1400px; margin: 0 auto; }
        .bk-head { max-width: none; }
        .bk-label { display: inline-block; background: #C6E84A; color: #0f0f0f; padding: 8px 20px; border-radius: 999px; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; font-variant: small-caps; margin-bottom: 24px; }
        .bk-label--light { background: #C6E84A; color: #0f0f0f; }
        .bk-reveal { opacity: 0; transform: translateY(26px); transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .bk-reveal.bk-in { opacity: 1; transform: none; }
        .bk-h2 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(32px, 5vw, 48px); font-weight: 700; line-height: 1.15; letter-spacing: -0.02em; margin: 0 0 20px; }
        .bk-lede { font-size: 19px; font-weight: 400; line-height: 1.8; margin: 0 0 12px; }
        .bk-copy { font-size: 19px; font-weight: 400; line-height: 1.8; margin: 0 0 12px; }
        .bk-btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 16px 30px; border-radius: 999px; background: #C6E84A; color: #0f0f0f; font-size: 15px; font-weight: 700; letter-spacing: 0.02em; text-decoration: none; transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, background 0.3s ease; }
        .bk-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(198,232,74,0.4); }
        .bk-btn--ghost { background: transparent; border: 1px solid rgba(255,255,255,0.45); color: #fff; }
        .bk-btn--ghost:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.7); box-shadow: none; }
        .bk-btn--dark { background: #0A1628; color: #F5F7FA; }
        .bk-btn--dark:hover { background: #142544; }

        /* ── S01 HERO ── */
        .bk-hero { position: relative; height: 100vh; height: 100dvh; min-height: 600px; background: #0A1424; overflow: hidden; isolation: isolate; }
        .bk-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: right center; z-index: -2; }
        .bk-hero-content { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; z-index: 1; padding: 100px clamp(24px, 8vw, 120px) 0; max-width: 1440px; margin: 0 auto; left: 0; right: 0; }
        .bk-hero-eyebrow { display: inline-block; background: #C6E84A; color: #0f0f0f; padding: 8px 20px; border-radius: 999px; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; font-variant: small-caps; margin-bottom: 24px; }
        .bk-hero h2 { font-size: clamp(38px, 5.6vw, 68px); font-weight: 700; letter-spacing: -0.03em; line-height: 1.06; color: #ffffff; margin: 0 0 26px; max-width: 780px; text-wrap: balance; }
        .bk-hero-sub { font-size: clamp(17px, 1.6vw, 21px); font-weight: 600; line-height: 1.55; color: rgba(255,255,255,0.92); margin: 0 0 18px; max-width: 640px; }
        .bk-hero-body { font-size: 16px; line-height: 1.75; color: rgba(255,255,255,0.68); margin: 0 0 38px; max-width: 520px; }
        .bk-hero-ctas { display: flex; flex-wrap: wrap; gap: 16px; }

        /* ── S02 LANDSCAPE ── */
        .bk-s02 { background: #ffffff; padding: clamp(120px, 12vw, 180px) 80px clamp(76px, 9vw, 128px); }
        .bk-s02-grid { display: grid; grid-template-columns: 55% 45%; gap: 60px; align-items: start; }
        .bk-s02-head { max-width: none; }
        .bk-s02-left h2::after { content: ""; display: block; width: 64px; height: 4px; background: #A8D51E; margin-top: 14px; }
        .bk-s02-left h2 { position: relative; padding-bottom: 12px; color: #0f172a; }
        .bk-s02-left .bk-lede { color: #5A5D66; }
        .bk-s02-left .bk-copy { color: #5B6472; }
        .bk-s02-grid-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 36px 48px; }
        .bk-s02-card { display: flex; flex-direction: column; gap: 6px; padding: 0; background: none; border: none; border-radius: 0; box-shadow: none; transition: none; }
        .bk-s02-card:hover { transform: none; box-shadow: none; border-color: transparent; }
        .bk-s02-card-head { display: flex; align-items: center; gap: 10px; }
        .bk-s02-icon { width: auto; height: auto; border-radius: 0; background: none; display: block; flex-shrink: 0; padding: 0; line-height: 0; }
        .bk-s02-icon svg { width: 22px; height: 22px; stroke: #A8D51E; fill: none; stroke-width: 2; }
        .bk-s02-card-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; color: #7FA818; font-variant-numeric: tabular-nums; letter-spacing: 0.04em; }
        .bk-s02-card-label { font-size: 16px; font-weight: 600; color: #0A1628; line-height: 1.45; }
        .bk-s02-callout { margin-top: 40px; display: flex; align-items: center; gap: 16px; padding: 20px 28px; border-radius: 999px; background: linear-gradient(90deg, rgba(168,213,30,0.08), rgba(168,213,30,0.04)); border: 1px solid rgba(168,213,30,0.2); }
        .bk-s02-callout-icon { width: 40px; height: 40px; border-radius: 50%; background: #A8D51E; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .bk-s02-callout-icon svg { width: 20px; height: 20px; stroke: #0A1628; fill: none; stroke-width: 2; }
        .bk-s02-callout p { font-size: 18px; font-weight: 700; color: #0C1B30; margin: 0; line-height: 1.4; }

        /* ── S03 ECOSYSTEM ── */
        .bk-s03 { background: linear-gradient(180deg, #081A31 0%, #071426 100%); padding: clamp(76px, 9vw, 128px) 80px; }
        .bk-s03 .bk-h2 { color: #ffffff; }
        .bk-s03-cols { display: grid; grid-template-columns: repeat(4, 1fr); margin-top: 56px; }
        .bk-s03-col { padding: 0 28px; position: relative; }
        .bk-s03-col:not(:last-child)::after { content: ""; position: absolute; right: 0; top: 0; bottom: 0; width: 1px; background: rgba(168,213,30,0.15); }
        .bk-s03-icon { width: 48px; height: 48px; border-radius: 12px; background: rgba(168,213,30,0.1); border: 1px solid rgba(168,213,30,0.2); display: flex; align-items: center; justify-content: center; color: #A8D51E; margin-bottom: 18px; }
        .bk-s03-icon svg { width: 24px; height: 24px; stroke: currentColor; fill: none; stroke-width: 1.8; }
        .bk-s03-title { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 18px; font-weight: 700; color: #ffffff; margin: 0 0 10px; }
        .bk-s03-desc { font-size: 14.5px; line-height: 1.7; color: rgba(255,255,255,0.6); margin: 0; }

        /* ── S04 TABS ── */
        .bk-s04 { background: #ffffff; padding: clamp(76px, 9vw, 128px) 80px; }
        .bk-s04 .bk-h2 { color: #0f172a; }
        .bk-s04 .bk-lede { color: #5A5D66; }
        .bk-s04-tabbar { display: grid; grid-template-columns: repeat(6, 1fr); margin-top: 48px; border-radius: 12px; overflow: hidden; border: 1px solid #E2E5E9; }
        .bk-s04-tabbar button { appearance: none; background: #F8F9FA; border: none; border-right: 1px solid #E2E5E9; cursor: pointer; padding: 16px 12px; font-family: inherit; font-size: 14px; font-weight: 600; color: #7A8AA0; transition: background 0.25s ease, color 0.25s ease; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .bk-s04-tabbar button:last-child { border-right: none; }
        .bk-s04-tabbar button em { font-style: normal; font-size: 11px; font-weight: 700; color: #A9B6C6; }
        .bk-s04-tabbar button:hover { background: #F0F2F5; color: #14263C; }
        .bk-s04-tabbar button.bk-tab-active { background: #0A1628; color: #ffffff; }
        .bk-s04-tabbar button.bk-tab-active em { color: var(--bkc); }
        .bk-s04-panel { margin-top: 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; animation: bkFadeIn 0.4s ease; }
        @keyframes bkFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .bk-s04-text h3 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(24px, 2.6vw, 32px); font-weight: 700; line-height: 1.2; color: #0C1B30; margin: 0; }
        .bk-s04-text .bk-lede { font-size: 17px; color: #42556D; margin-top: 12px; }
        .bk-s04-checklist { display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-top: 24px; }
        .bk-s04-check { display: flex; align-items: baseline; gap: 10px; padding: 12px 0; border-top: 1px solid rgba(12,27,48,0.08); font-size: 15px; color: #33475E; }
        .bk-s04-check::before { content: ""; width: 6px; height: 6px; flex: 0 0 auto; border-radius: 50%; background: var(--bkc); align-self: center; }
        .bk-s04-photo { position: relative; border-radius: 20px; overflow: hidden; aspect-ratio: 4/3; }
        .bk-s04-photo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .bk-s04-photo-tint { position: absolute; inset: 0; background: linear-gradient(200deg, rgba(168,213,30,0.08) 0%, rgba(7,20,38,0.35) 100%); }
        .bk-s04-nav { position: absolute; bottom: 16px; right: 16px; display: flex; gap: 8px; z-index: 1; }
        .bk-s04-nav button { width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.9); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s ease; }
        .bk-s04-nav button:hover { background: #ffffff; }
        .bk-s04-nav button svg { width: 18px; height: 18px; stroke: #0A1628; fill: none; stroke-width: 2; }

        /* ── S05 ONBOARDING ── */
        .bk-s05 { background: var(--bkn); padding: clamp(76px, 9vw, 128px) 80px; color: #ffffff; }
        .bk-s05-head { margin-bottom: 48px; }
        .bk-s05-head .bk-h2 { color: #ffffff; margin: 0; }
        .bk-s05-grid { display: grid; grid-template-columns: 45fr 55fr; gap: 48px; align-items: center; }
        .bk-s05-copy { min-width: 0; height: auto; overflow: visible; }
        .bk-s05-copy .bk-lede { color: rgba(255,255,255,0.8); font-size: 17px; }
        .bk-s05-copy .bk-copy { color: rgba(255,255,255,0.55); font-size: 16px; }
        .bk-s05-journey { display: flex; align-items: flex-start; min-width: 0; height: auto; }
        .bk-s05-connector { flex: 1 1 0; min-width: 12px; border-top: 2px dashed rgba(168,213,30,0.5); margin: 21px 6px 0; }
        .bk-s05-step { display: flex; flex-direction: column; align-items: center; text-align: center; flex: 0 0 auto; min-width: 80px; }
        .bk-s05-node { width: 44px; height: 44px; border-radius: 50%; background: rgba(168,213,30,0.15); border: 1.5px solid #A8D51E; display: flex; align-items: center; justify-content: center; }
        .bk-s05-node svg { width: 20px; height: 20px; color: #A8D51E; }
        .bk-s05-step-name { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 12px; font-weight: 700; color: #ffffff; margin-top: 12px; letter-spacing: 0.04em; }
        .bk-s05-step-sub { font-size: 11px; color: rgba(255,255,255,0.5); margin-top: 4px; max-width: 88px; line-height: 1.4; }

        /* ── S06 THREE CARD ROW ── */
        .bk-s06 { background: #ffffff; padding: clamp(76px, 9vw, 128px) 80px; }
        .bk-s06 .bk-h2 { color: #0f172a; }
        .bk-s06-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 48px; }
        .bk-s06-card { border-radius: 20px; overflow: hidden; background: #ffffff; border: 1px solid #E8EBF0; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .bk-s06-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px -16px rgba(10,22,40,0.12); }
        .bk-s06-card-img { position: relative; aspect-ratio: 16/9; overflow: hidden; }
        .bk-s06-card-img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .bk-s06-card-body { padding: 28px 24px 24px; }
        .bk-s06-card-body .bk-label { font-size: 11px; padding: 5px 12px; margin-bottom: 14px; }
        .bk-s06-card-body h3 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 20px; font-weight: 700; color: #0C1B30; margin: 0; line-height: 1.25; }
        .bk-s06-card-list { list-style: none; margin: 18px 0 0; padding: 0; }
        .bk-s06-card-list li { padding: 7px 0; border-top: 1px solid rgba(12,27,48,0.07); font-size: 13.5px; color: #5A6B7F; display: flex; align-items: baseline; gap: 8px; }
        .bk-s06-card-list li::before { content: ""; width: 5px; height: 5px; flex: 0 0 auto; border-radius: 50%; background: var(--bkc); align-self: center; }
        .bk-s06-card-link { display: inline-block; margin-top: 16px; font-size: 14px; font-weight: 700; color: #0A1628; text-decoration: none; transition: color 0.2s ease; }
        .bk-s06-card-link:hover { color: #5E8A0A; }
        .bk-s06-stage { margin-top: 16px; }
        .bk-s06-stage-toggle { display: flex; align-items: center; justify-content: space-between; gap: 8px; cursor: pointer; font-family: var(--font-syne), Arial, sans-serif; font-size: 14px; font-weight: 700; color: #0C1B30; padding: 10px 0; border: none; background: none; width: 100%; text-align: left; }
        .bk-s06-stage-toggle:hover { color: #5E8A0A; }
        .bk-s06-stage-icon { font-size: 18px; font-weight: 600; color: #A8D51E; flex-shrink: 0; transition: transform 0.25s ease; }
        .bk-s06-stage-open .bk-s06-stage-icon { transform: rotate(45deg); }
        .bk-s06-stage-list { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
        .bk-s06-stage-open .bk-s06-stage-list { max-height: 500px; }

        /* ── S07 AI + HUMAN ── */
        .bk-s07 { display: grid; grid-template-columns: 1fr 1fr; min-height: 700px; }
        .bk-s07-ai { background: radial-gradient(circle at 50% 50%, #0D1F38 0%, #071426 65%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px clamp(20px, 5vw, 80px); position: relative; overflow: hidden; }
        .bk-s07-hub { position: relative; width: 280px; height: 280px; }
        .bk-s07-core { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100px; height: 100px; border-radius: 50%; background: radial-gradient(circle at 34% 30%, rgba(200,240,100,0.95), rgba(168,213,30,0.75) 45%, rgba(16,49,92,0.9) 100%); box-shadow: 0 0 50px rgba(168,213,30,0.4); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 2; }
        .bk-s07-core span:first-child { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; color: #04202F; }
        .bk-s07-core span:last-child { font-size: 9px; font-weight: 700; letter-spacing: 0.2em; color: #06344B; }
        .bk-s07-sat { position: absolute; width: 52px; height: 52px; border-radius: 50%; background: rgba(9,26,48,0.85); border: 1px solid rgba(168,213,30,0.3); display: flex; flex-direction: column; align-items: center; justify-content: center; backdrop-filter: blur(4px); transition: border-color 0.3s ease, transform 0.3s ease; }
        .bk-s07-sat:hover { border-color: rgba(168,213,30,0.7); transform: translate(-50%, -50%) scale(1.1); }
        .bk-s07-sat svg { width: 18px; height: 18px; stroke: #A8D51E; fill: none; stroke-width: 1.8; }
        .bk-s07-sat-label { position: absolute; bottom: -20px; white-space: nowrap; font-size: 9.5px; font-weight: 600; color: rgba(255,255,255,0.6); letter-spacing: 0.02em; text-align: center; }
        .bk-s07-line { position: absolute; background: rgba(168,213,30,0.2); }
        .bk-s07-human { display: flex; flex-direction: column; justify-content: center; position: relative; overflow: hidden; }
        .bk-s07-human img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .bk-s07-human-scrim { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(255,255,255,0.92) 40%, rgba(255,255,255,0.97) 100%); }
        .bk-s07-human-content { position: relative; z-index: 1; padding: 60px; }
        .bk-s07-human-content .bk-label { margin-bottom: 16px; }
        .bk-s07-human-content h2 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(28px, 3.5vw, 40px); font-weight: 700; line-height: 1.15; color: #0C1B30; margin: 0; }
        .bk-s07-human-content .bk-copy { color: #5A6B7F; margin-top: 16px; font-size: 16px; }
        .bk-s07-human-content h3 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 20px; font-weight: 700; color: #0C1B30; margin: 28px 0 0; }

        /* ── S08 OUTCOMES ── */
        .bk-s08 { background: #ffffff; padding: clamp(76px, 9vw, 128px) 80px; }
        .bk-s08 .bk-h2 { color: #0f172a; }
        .bk-s08-cols { display: grid; grid-template-columns: repeat(6, 1fr); margin-top: 56px; }
        .bk-s08-col { padding: 0 20px; text-align: center; position: relative; }
        .bk-s08-col:not(:last-child)::after { content: ""; position: absolute; right: 0; top: 0; bottom: 0; width: 1px; background: #E2E5E9; }
        .bk-s08-icon { width: 48px; height: 48px; border-radius: 14px; background: rgba(168,213,30,0.12); border: 1px solid rgba(127,168,24,0.2); display: flex; align-items: center; justify-content: center; color: #5E8A0A; margin: 0 auto 16px; transition: background 0.3s ease, color 0.3s ease; }
        .bk-s08-col:hover .bk-s08-icon { background: #A8D51E; color: #0C1B30; }
        .bk-s08-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.14em; color: #7FA818; margin-bottom: 6px; }
        .bk-s08-word { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 18px; font-weight: 700; color: #0C1B30; margin: 0; }
        .bk-s08-sub { font-size: 13px; font-weight: 600; color: #5E8A0A; margin: 6px 0 0; }
        .bk-s08-desc { font-size: 13px; line-height: 1.6; color: #5A6B7F; margin: 10px 0 0; }

        /* ── S09 MODEL + WHY ── */
        .bk-s09 { background: #070d17; position: relative; overflow: hidden; }
        .bk-s09-glow-tl { position: absolute; top: -10%; left: -8%; width: 1100px; height: 500px; background: radial-gradient(ellipse at center, rgba(195,233,74,0.05), transparent 60%); pointer-events: none; }
        .bk-s09-glow-br { position: absolute; bottom: -20%; right: -6%; width: 900px; height: 500px; background: radial-gradient(ellipse at center, rgba(195,233,74,0.04), transparent 60%); pointer-events: none; }
        .bk-s09-section { display: flex; padding: 120px 100px; gap: 0; position: relative; z-index: 1; }
        .bk-s09-col { flex: 1; min-width: 0; position: relative; }
        .bk-s09-col:first-child { padding-right: 48px; border-right: 1px solid rgba(255,255,255,0.07); }
        .bk-s09-col:last-child { padding-left: 48px; }
        .bk-s09-col h3 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; color: #f4f7fb; font-size: clamp(26px, 2.4vw, 35px); font-weight: 700; line-height: 1.28; letter-spacing: -0.01em; margin: 0 0 64px; }
        .bk-s09-flow { position: relative; display: flex; align-items: flex-start; justify-content: space-between; }
        .bk-s09-flow::before { content: ""; position: absolute; top: 29px; left: 29px; right: 29px; height: 1px; background: linear-gradient(90deg, rgba(195,233,74,0.5) 0%, rgba(195,233,74,0.15) 50%, rgba(195,233,74,0.5) 100%); }
        .bk-s09-flow-step { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; width: 150px; }
        .bk-s09-flow-num { position: relative; width: 58px; height: 58px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #c3e94a; font-family: var(--font-geist-mono), monospace; font-weight: 500; font-size: 13px; letter-spacing: 0.03em; margin-bottom: 22px; background: radial-gradient(circle at 30% 25%, #13223a, #0a1120); border: 1px solid rgba(255,255,255,0.14); box-shadow: 0 0 0 6px #070d17, 0 8px 20px -6px rgba(0,0,0,0.6); z-index: 1; }
        .bk-s09-flow-step:first-child .bk-s09-flow-num, .bk-s09-flow-step:last-child .bk-s09-flow-num { border-color: #9cc23a; box-shadow: 0 0 0 6px #070d17, 0 0 22px rgba(195,233,74,0.22); }
        .bk-s09-flow-label { color: #f4f7fb; font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-weight: 700; font-size: 15.5px; line-height: 1.35; margin-bottom: 12px; min-height: 42px; }
        .bk-s09-flow-sub { display: flex; flex-direction: column; align-items: center; gap: 5px; }
        .bk-s09-flow-sub span { color: #5f7086; font-family: var(--font-geist-sans), Arial, sans-serif; font-size: 12px; line-height: 1.5; letter-spacing: 0.01em; }
        .bk-s09-checklist { display: grid; grid-template-columns: 1fr 1fr; column-gap: 56px; }
        .bk-s09-check { display: flex; align-items: center; gap: 16px; padding: 28px 4px; border-bottom: 1px solid rgba(255,255,255,0.07); transition: border-color 0.2s ease; }
        .bk-s09-check:hover { border-bottom-color: rgba(195,233,74,0.35); }
        .bk-s09-check-tick { flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%; background: rgba(195,233,74,0.22); display: flex; align-items: center; justify-content: center; }
        .bk-s09-check-tick svg { width: 12px; height: 12px; }
        .bk-s09-check-label { color: #f4f7fb; font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-weight: 700; font-size: 17px; letter-spacing: -0.005em; }
        @media (max-width: 1080px) {
          .bk-s09-section { flex-direction: column; gap: 80px; padding: 80px 48px; }
          .bk-s09-col:first-child { border-right: none; padding-right: 0; }
          .bk-s09-col:last-child { padding-left: 0; }
        }
        @media (max-width: 640px) {
          .bk-s09-section { padding: 64px 24px; gap: 56px; }
          .bk-s09-flow { flex-wrap: wrap; row-gap: 40px; justify-content: center; }
          .bk-s09-flow::before { display: none; }
          .bk-s09-flow-step { width: 50%; }
        }

        /* ── S10 TRANSFORM + CTA ── */
        .bk-s10 { display: grid; grid-template-columns: 1fr 1fr; min-height: 700px; background: var(--bkn); overflow: hidden; }
        .bk-s10-left { padding: clamp(48px, 5vw, 80px); display: flex; flex-direction: column; }
        .bk-s10-badge { display: inline-block; align-self: flex-start; background: #C6E84A; color: #0f0f0f; padding: 5px 14px; border-radius: 999px; font-weight: 700; font-size: 11px; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 24px; }
        .bk-s10 h3 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(22px, 2.4vw, 30px); font-weight: 700; color: #ffffff; margin: 0 0 16px; }
        .bk-s10-mini-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 12px; }
        .bk-s10-mini { padding: 20px 16px; border-radius: 12px; background: rgba(9,26,48,0.7); border: 1px solid rgba(168,213,30,0.12); }
        .bk-s10-mini h4 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; color: #A8D51E; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.06em; }
        .bk-s10-mini p { font-size: 13px; line-height: 1.55; color: rgba(255,255,255,0.6); margin: 0; }
        .bk-s10-mini-link { display: inline-flex; align-items: center; gap: 8px; margin-top: 28px; font-size: 14px; font-weight: 700; color: #A8D51E; text-decoration: none; transition: color 0.2s ease; }
        .bk-s10-mini-link:hover { color: #BEF042; }
        .bk-s10-right { padding: clamp(48px, 5vw, 80px); background: #ffffff; display: flex; flex-direction: column; justify-content: center; }
        .bk-s10-right .bk-label { align-self: flex-start; }
        .bk-s10-right h3 { color: #0C1B30; }
        .bk-s10-right p { font-size: 16px; line-height: 1.75; color: #5B6472; margin: 14px 0 0; max-width: 460px; }
        .bk-s10-ctas { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 28px; }
        .bk-s10-cta { display: inline-flex; align-items: center; gap: 10px; padding: 14px 28px; border-radius: 999px; font-weight: 700; font-size: 15px; text-decoration: none; transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .bk-s10-cta-primary { background: #C6E84A; color: #0f0f0f; }
        .bk-s10-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(198,232,74,0.35); }
        .bk-s10-cta-ghost { background: transparent; color: #0A1628; border: 1.5px solid #0A1628; }
        .bk-s10-cta-ghost:hover { background: #0A1628; color: #ffffff; transform: translateY(-2px); }

        /* ── RESPONSIVE ── */
        @media (max-width: 1200px) {
          .bk-s07-hub { width: 240px; height: 240px; }
          .bk-s07-core { width: 80px; height: 80px; }
          .bk-s07-sat { width: 44px; height: 44px; }
        }
        @media (max-width: 1080px) {
          .bk-s08-cols { grid-template-columns: repeat(3, 1fr); gap: 24px; }
          .bk-s08-col:nth-child(3)::after { display: none; }
          .bk-s08-col { padding: 0; }
        }
        @media (max-width: 900px) {
          .bk-s02-grid, .bk-s05-grid { grid-template-columns: 1fr; }
          .bk-s03-cols { grid-template-columns: 1fr 1fr; }
          .bk-s03-col:nth-child(2)::after { display: none; }
          .bk-s04-tabbar { grid-template-columns: repeat(3, 1fr); }
          .bk-s04-panel { grid-template-columns: 1fr; }
          .bk-s06-row { grid-template-columns: 1fr; }
          .bk-s07 { grid-template-columns: 1fr; }
          .bk-s07-ai { min-height: 500px; }
          .bk-s07-human { min-height: 400px; }
          .bk-s08-cols { grid-template-columns: repeat(2, 1fr); gap: 24px; }
          .bk-s08-col::after { display: none !important; }
          .bk-s09-grid { grid-template-columns: 1fr; }
          .bk-s09-rule { display: none; }
          .bk-s10 { grid-template-columns: 1fr; }
          .bk-s10-right { background: #ffffff; }
          .bk-s02-grid-inner { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .bk-hero-text { padding: 100px 20px 40px; }
          .bk-s02, .bk-s04, .bk-s05, .bk-s06, .bk-s08, .bk-s09, .bk-s10-left, .bk-s10-right { padding-left: 20px; padding-right: 20px; }
          .bk-s03 { padding-left: 20px; padding-right: 20px; }
          .bk-s03-cols { grid-template-columns: 1fr; }
          .bk-s04-tabbar { grid-template-columns: repeat(2, 1fr); }
          .bk-s04-checklist { grid-template-columns: 1fr; }
          .bk-s08-cols { grid-template-columns: 1fr; }
          .bk-s09-flow { overflow-x: auto; }
          .bk-s09-checklist { grid-template-columns: 1fr; }
          .bk-s10-mini-grid { grid-template-columns: 1fr; }
          .bk-s10-ctas { flex-direction: column; }
          .bk-s10-cta { width: 100%; justify-content: center; }
          .bk-hero-ctas { flex-direction: column; }
          .bk-hero-ctas .bk-btn { width: 100%; }
          .bk-s05-journey { flex-wrap: wrap; row-gap: 24px; justify-content: center; }
          .bk-s05-connector { display: none; }
          .bk-s05-step { flex: 0 0 25%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bk-reveal { opacity: 1; transform: none; transition: none; animation: none; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* S01 — HERO: 42/58 split, bleeding photo                          */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="bk-hero">
        <video className="bk-hero-img" src="/services/banking/bankinghero.mp4" autoPlay muted loop playsInline />
        <div className="bk-hero-content bk-reveal">
          <span className="bk-hero-eyebrow">BANKING</span>
          <h2>Intelligent operations for <span style={{ color: "#C6E84A" }}>modern banking.</span></h2>
          <p className="bk-hero-sub">Transforming banking operations through domain expertise, AI, automation and data intelligence.</p>
          <p className="bk-hero-body">From customer onboarding and account servicing to lending, payments, compliance and finance, Sytrion helps banks simplify complex processes, improve operational control and create connected experiences built for the future of banking.</p>
          <div className="bk-hero-ctas">
            <Link href="#capabilities" className="bk-btn">Explore Our Capabilities ↓</Link>
            <Link href="/contact" className="bk-btn bk-btn--ghost">Talk to Our Experts ↗</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* S02 — LANDSCAPE: 55/45 with 2x3 grid + pill callout              */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="bk-s02">
        <div className="bk-wrap">
          <div className="bk-s02-head bk-reveal">
            <BkLabel text="The Banking Landscape" light />
            <h2 className="bk-h2">Banking expectations have changed. <span style={{ color: "#C6E84A" }}>Operations must change with them.</span></h2>
          </div>
          <div className="bk-s02-grid bk-reveal">
            <div className="bk-s02-left">
              <p className="bk-lede">Customers expect banking to be instant, simple and always available.</p>
              <p className="bk-copy">At the same time, banks must manage increasingly complex regulatory requirements, financial crime risks, legacy systems, high transaction volumes and pressure to improve efficiency.</p>
              <p className="bk-copy">Behind every banking experience sits an interconnected network of customer data, documents, transactions, decisions and controls.</p>
            </div>
            <div className="bk-s02-grid-inner">
              {landscapeChallenges.map((c, i) => (
                <div key={c} className="bk-s02-card">
                  <div className="bk-s02-card-head">
                    <div className="bk-s02-icon">{landscapeIcons[i]}</div>
                    <div className="bk-s02-card-num">{String(i + 1).padStart(2, "0")}</div>
                  </div>
                  <div className="bk-s02-card-label">{c}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bk-s02-callout bk-reveal">
            <div className="bk-s02-callout-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <p>Sytrion brings people, processes, data and intelligence together to make banking operations work smarter.</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* S03 — ECOSYSTEM: 4 equal columns with dividers                   */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="bk-s03">
        <div className="bk-wrap">
          <div className="bk-head bk-reveal">
            <BkLabel text="Across the Banking Ecosystem" />
            <h2 className="bk-h2">Built around the operations <span style={{ color: "#C6E84A" }}>that keep banking moving.</span></h2>
          </div>
          <div className="bk-s03-cols bk-reveal">
            {ecosystemCards.map((card, i) => (
              <div key={card.title} className="bk-s03-col">
                <div className="bk-s03-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    {i===0 && <><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/></>}
                    {i===1 && <><path d="M2 17h20"/><path d="M6 7v10"/><path d="M10 7v10"/><path d="M14 7v10"/><path d="M18 7v10"/><rect x="4" y="3" width="16" height="4" rx="1"/></>}
                    {i===2 && <><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M2 10h20"/><path d="M12 6v12"/></>}
                    {i===3 && <><rect x="1" y="4" width="22" height="16" rx="3"/><path d="M1 10h22"/></>}
                  </svg>
                </div>
                <h3 className="bk-s03-title">{card.title}</h3>
                <p className="bk-s03-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* S04 — TABS: continuous tab bar + 50/50 panel                     */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="bk-s04" id="capabilities">
        <div className="bk-wrap">
          <div className="bk-head bk-reveal">
            <BkLabel text="Intelligent Business Services" light />
            <h2 className="bk-h2">From individual transactions to <span style={{ color: "#C6E84A" }}>connected banking operations.</span></h2>
            <p className="bk-lede">Sytrion combines banking-domain expertise with intelligent workflows, automation, AI and data to help banks manage high-volume processes with greater speed, accuracy and control.</p>
          </div>
          <div className="bk-s04-tabbar bk-reveal" role="tablist">
            {ibsTabs.map((t, i) => (
              <button key={t.num} role="tab" aria-selected={activeTab === i} className={activeTab === i ? "bk-tab-active" : ""} onClick={() => setActiveTab(i)}>
                <em>{t.num}</em> {t.tab}
              </button>
            ))}
          </div>
          <div key={activeTab} className="bk-s04-panel" role="tabpanel">
            <div className="bk-s04-text">
              <h3>{ibsTabs[activeTab].title}</h3>
              <p className="bk-lede">{ibsTabs[activeTab].lead}</p>
              <div className="bk-s04-checklist">
                {ibsTabs[activeTab].items.map((item) => (
                  <div key={item} className="bk-s04-check">{item}</div>
                ))}
              </div>
            </div>
            <div className="bk-s04-photo">
              <img key={activeTab} src={ibsTabs[activeTab].img} alt={ibsTabs[activeTab].alt} />
              <div className="bk-s04-photo-tint" />
              <div className="bk-s04-nav">
                <button aria-label="Previous" onClick={() => setActiveTab(Math.max(0, activeTab - 1))}><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></button>
                <button aria-label="Next" onClick={() => setActiveTab(Math.min(5, activeTab + 1))}><svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* S05 — ONBOARDING: 35/65 with horizontal journey diagram          */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="bk-s05">
        <div className="bk-wrap">
          <div className="bk-s05-head bk-reveal">
            <BkLabel text="Customer Lifecycle Operations" />
            <h2 className="bk-h2">Start every banking relationship with <span style={{ color: "#C6E84A" }}>confidence.</span></h2>
          </div>
          <div className="bk-s05-grid bk-reveal">
            <div className="bk-s05-copy">
              <p className="bk-lede">Customer onboarding sits at the intersection of experience, compliance, identity and data.</p>
              <p className="bk-copy">Sytrion helps banks streamline the administrative workflows behind onboarding and ongoing customer lifecycle management through structured processes, document intelligence, automation and human expertise.</p>
            </div>
            <div className="bk-s05-journey">
              {kycSteps.map((s, i) => (
                <Fragment key={s.name}>
                  {i > 0 && <div className="bk-s05-connector" aria-hidden="true" />}
                  <div className="bk-s05-step">
                    <div className="bk-s05-node">{s.icon}</div>
                    <div className="bk-s05-step-name">{s.name}</div>
                    <div className="bk-s05-step-sub">{s.sub}</div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* S06 — THREE-CARD ROW: Lending / Cards / Compliance               */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="bk-s06">
        <div className="bk-wrap">
          <div className="bk-head bk-reveal">
            <BkLabel text="Core Banking Operations" light />
            <h2 className="bk-h2">Operational support across the <span style={{ color: "#C6E84A" }}>banking lifecycle.</span></h2>
          </div>
          <div className="bk-s06-row bk-reveal">
            {threeCardSections.map((sec) => (
              <article key={sec.eyebrow} className="bk-s06-card">
                <div className="bk-s06-card-img">
                  <img src={sec.img} alt={sec.alt} />
                </div>
                <div className="bk-s06-card-body">
                  <BkLabel text={sec.eyebrow} light />
                  <h3>{sec.heading}</h3>
                  {sec.stages.map((stage, si) => {
                    const key = `${sec.eyebrow}-${si}`;
                    const open = expandedStages.has(key);
                    return (
                      <div key={stage.title} className={`bk-s06-stage${open ? " bk-s06-stage-open" : ""}`}>
                        <button type="button" className="bk-s06-stage-toggle" onClick={() => toggleStage(key)}>
                          <span>{stage.title}</span>
                          <span className="bk-s06-stage-icon">+</span>
                        </button>
                        <div className="bk-s06-stage-list">
                          <ul className="bk-s06-card-list">
                            {stage.items.map((item) => <li key={item}>{item}</li>)}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                  <a href="#" className="bk-s06-card-link">{sec.linkText}</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* S07 — AI + HUMAN/DIGITAL: 50/50 side-by-side                     */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="bk-s07">
        <div className="bk-s07-ai">
          <BkLabel text="Intelligence Built Into Banking" />
          <h2 className="bk-h2" style={{color:"#fff", textAlign:"center", fontSize:"clamp(28px, 3.5vw, 42px)", maxWidth:"none", width:"100%"}}>AI that works behind <span style={{ color: "#C6E84A" }}>every transaction.</span></h2>
          <p style={{color:"rgba(255,255,255,0.55)", textAlign:"center", maxWidth:520, fontSize:15, lineHeight:1.7, marginTop:8}}>AI can help banks move beyond automating repetitive tasks toward operations that understand information, identify exceptions and support faster decisions.</p>
          <div className="bk-s07-hub" style={{marginTop: 32}}>
            <div className="bk-s07-core">
              <span>SYTRION</span>
              <span>INTELLIGENCE</span>
            </div>
            {intelligenceNodes.slice(0, 6).map((node, i) => {
              const angle = (i * 60 - 90) * (Math.PI / 180);
              const r = 120;
              const cx = 140 + Math.cos(angle) * r;
              const cy = 140 + Math.sin(angle) * r;
              return (
                <div key={node.title} className="bk-s07-sat" style={{ left: cx, top: cy, transform: "translate(-50%, -50%)", position: "absolute" }}>
                  <svg viewBox="0 0 24 24">
                    {i===0 && <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h10M7 13h10"/></>}
                    {i===1 && <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></>}
                    {i===2 && <><path d="M12 2v10l4.7 2.7"/><circle cx="12" cy="18" r="4"/></>}
                    {i===3 && <><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M2 10h20"/></>}
                    {i===4 && <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></>}
                    {i===5 && <><circle cx="12" cy="12" r="10"/><path d="M12 8v4l2 2"/></>}
                  </svg>
                  <span className="bk-s07-sat-label">{node.title.replace(" Intelligence", "")}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bk-s07-human">
          <img src="/banking/human-digital.jpg" alt="Banking professional helping a customer" />
          <div className="bk-s07-human-scrim" />
          <div className="bk-s07-human-content bk-reveal">
            <BkLabel text="Human + Digital" light />
            <h2>Smarter banking should <span style={{ color: "#C6E84A" }}>still feel personal.</span></h2>
            <p className="bk-copy">Automation can handle repetitive transactions.</p>
            <p className="bk-copy">AI can organize information and help surface what matters.</p>
            <p className="bk-copy">People bring judgment, context and empathy to complex customer situations.</p>
            <h3>Sytrion brings them together.</h3>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* S08 — OUTCOMES: 6 equal columns with dividers                    */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="bk-s08">
        <div className="bk-wrap">
          <div className="bk-head bk-reveal">
            <BkLabel text="The Outcome" light />
            <h2 className="bk-h2">Better banking operations create better <span style={{ color: "#C6E84A" }}>banking experiences.</span></h2>
          </div>
          <div className="bk-s08-cols bk-reveal">
            {outcomes.map((o, i) => (
              <div key={o.word} className="bk-s08-col">
                <div className="bk-s08-icon" aria-hidden="true">{outcomeIcons[i]}</div>
                <div className="bk-s08-num">{o.num}</div>
                <h3 className="bk-s08-word">{o.word}</h3>
                <p className="bk-s08-sub">{o.sub}</p>
                <p className="bk-s08-desc">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* S09 — MODEL + WHY: 50/50 with horizontal flow + checkmarks      */}
      {/* ════════════════════════════════════════════════════════ */}
      <section className="bk-s09">
        <div className="bk-s09-glow-tl" aria-hidden="true"></div>
        <div className="bk-s09-glow-br" aria-hidden="true"></div>
        <div className="bk-s09-section">
          <div className="bk-s09-col bk-reveal">
            <BkLabel text="Operating Model" />
            <h3>One connected banking<br /><span style={{ color: "#C6E84A" }}>operating model.</span></h3>
            <div className="bk-s09-flow">
              {modelLayers.map((layer) => (
                <div key={layer.num} className="bk-s09-flow-step">
                  <div className="bk-s09-flow-num">{layer.num}</div>
                  <div className="bk-s09-flow-label">{layer.name}</div>
                  <div className="bk-s09-flow-sub">
                    {layer.items.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bk-s09-col bk-reveal">
            <BkLabel text="Advantages" />
            <h3>Banking understanding.<br /><span style={{ color: "#C6E84A" }}>Intelligent execution.</span></h3>
            <div className="bk-s09-checklist">
              {checkLabels.map((label) => (
                <div key={label} className="bk-s09-check">
                  <span className="bk-s09-check-tick">
                    <svg viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.2 12L13 4" stroke="#c3e94a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span className="bk-s09-check-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* S10 — TRANSFORM + FINAL CTA: full-bleed dark band                */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="bk-s10">
        <div className="bk-s10-left">
          <span className="bk-s10-badge">Transformation in Action</span>
          <h3>The Challenge</h3>
          <p style={{color:"rgba(255,255,255,0.6)", fontSize:15, lineHeight:1.7, marginTop:4}}>Banking operations can involve high transaction volumes, fragmented systems, document-intensive workflows, repetitive validations and significant exception handling.</p>
          <div className="bk-s10-mini-grid">
            <div className="bk-s10-mini">
              <h4>The Challenge</h4>
              <p>High transaction volumes, fragmented systems, document-intensive workflows, repetitive validations and significant exception handling.</p>
            </div>
            <div className="bk-s10-mini">
              <h4>The Approach</h4>
              <p>Combine banking-domain expertise with intelligent document processing, workflow automation, structured controls, AI and operational analytics.</p>
            </div>
            <div className="bk-s10-mini">
              <h4>The Potential</h4>
              <p>Faster processing, reduced manual touchpoints, improved data quality, better exception visibility, more scalable operations.</p>
            </div>
          </div>
          <a href="/contact" className="bk-s10-mini-link">Discuss Your Use Case →</a>
        </div>
        <div className="bk-s10-right">
          <BkLabel text="Let's Build Banking That Works Smarter" light />
          <h3>Ready to transform your <span style={{ color: "#C6E84A" }}>banking operations?</span></h3>
          <p>From onboarding, lending and payments to compliance, finance and AI, Sytrion can help create connected operations designed for greater speed, accuracy and control.</p>
          <div className="bk-s10-ctas">
            <Link href="/contact" className="bk-s10-cta bk-s10-cta-primary">Talk to Our Banking Experts ↗</Link>
            <Link href="/contact" className="bk-s10-cta bk-s10-cta-ghost">Schedule a Consultation</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
