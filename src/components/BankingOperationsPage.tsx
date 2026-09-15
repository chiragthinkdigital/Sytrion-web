"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
  { title: "Retail Banking", img: "/services/banking/Retail Banking.jpg", desc: "Customer onboarding, deposits, account servicing, payments and customer operations." },
  { title: "Lending & Mortgages", img: "/services/banking/Lending & Mortgages.jpg", desc: "Operational support across origination, documentation, servicing and portfolio administration." },
  { title: "Commercial Banking", img: "/services/banking/Commercial Banking.jpg", desc: "Account, lending, payment, cash-management and trade-related operational support." },
  { title: "Cards & Payments", img: "/services/banking/Cards & Payments.jpg", desc: "Card servicing, transaction operations, reconciliation, disputes and payment workflows." },
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

const cwPositions = [
  { x: 14, y: 28 },
  { x: 50, y: 28 },
  { x: 86, y: 28 },
  { x: 86, y: 74 },
  { x: 62, y: 74 },
  { x: 38, y: 74 },
  { x: 14, y: 74 },
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

const transitStops = [
  { name: "Document", desc: "Reads and structures incoming paperwork", x: 150, y: 55, hub: false },
  { name: "Fraud", desc: "Flags anomalies before they settle", x: 350, y: 170, hub: false },
  { name: "Sytrion Intelligence", desc: "Core reasoning layer", x: 575, y: 55, hub: true },
  { name: "Compliance", desc: "Checks activity against policy", x: 775, y: 170, hub: false },
  { name: "Workflow", desc: "Routes exceptions automatically", x: 975, y: 55, hub: false },
  { name: "Transaction", desc: "Processes volume with speed", x: 1100, y: 170, hub: false },
];
const transitPath = "M150 55 C216.67 55 283.33 170 350 170 C425 170 500 55 575 55 C641.67 55 708.33 170 775 170 C841.67 170 908.33 55 975 55 C1016.67 55 1058.33 170 1100 170";

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
const outcomeImages = [
  "/healthcare/faster (2).png",
  "/healthcare/accurate.png",
  "/healthcare/efficient.png",
  "/healthcare/visible.png",
  "/healthcare/better-experiences.png",
  "/healthcare/scalable.png",
];

const modelLayers = [
  { num: "01", name: "Customers & Businesses", items: ["Individuals", "SMEs", "Corporates", "Partners"] },
  { num: "02", name: "Banking Experience", items: ["Branch", "Web", "Mobile", "Contact Center", "Assisted Channels"] },
  { num: "03", name: "Sytrion Intelligence Layer", items: ["AI", "Automation", "Document Intelligence", "Data", "Analytics"] },
  { num: "04", name: "Intelligent Operations", items: ["Onboarding", "Accounts", "Payments", "Lending", "Compliance", "Finance"] },
  { num: "05", name: "Business Outcomes", items: ["EXPERIENCE", "SPEED", "ACCURACY", "CONTROL", "EFFICIENCY", "SCALE"] },
];

const whyIconProps = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
const whyPoints = [
  { num: "01", name: "Domain-led", desc: "Solutions built around real banking processes and operating environments.", icon: <svg key="d" {...whyIconProps}><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/></svg> },
  { num: "02", name: "AI-first", desc: "Intelligence embedded into documents, workflows, transactions and operations.", icon: <svg key="a" {...whyIconProps}><path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5"/><circle cx="12" cy="16" r="4"/><path d="M12 12v-2"/><path d="M8 20h8"/></svg> },
  { num: "03", name: "Human + Digital", desc: "Technology and skilled professionals working together.", icon: <svg key="h" {...whyIconProps}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { num: "04", name: "Control-focused", desc: "Structured processes designed around accuracy, visibility and operational governance.", icon: <svg key="c" {...whyIconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg> },
  { num: "05", name: "Data-driven", desc: "Reliable information supporting operations, service and decisions.", icon: <svg key="da" {...whyIconProps}><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="7" width="4" height="14" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg> },
  { num: "06", name: "Built to Scale", desc: "Flexible models designed around changing transaction volumes and business requirements.", icon: <svg key="s" {...whyIconProps}><path d="M3 17.5l5.5-5.5 3.5 3.5L20.5 7"/><path d="M14.5 7h6v6"/><path d="M3 7h4v4"/><path d="M17 13v4h-4"/></svg> },
];
const whyImages = [
  "/healthcare/domain led.svg",
  "/healthcare/ai first.svg",
  "/healthcare/human-digital.svg",
  "/healthcare/Secure by Design.svg",
  "/healthcare/Data-driven.svg",
  "/healthcare/Built to Scale.svg",
];

function BkLabel({ text, light }: { text: string; light?: boolean }) {
  return <span className={`bk-label${light ? " bk-label--light" : ""}`}>{text}</span>;
}

export default function BankingOperationsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedStages, setExpandedStages] = useState<Set<string>>(new Set());
  const revealRef = useRef<HTMLDivElement | null>(null);
  const bkHdStageRef = useRef<HTMLDivElement | null>(null);

  const onBkHdTilt = (e: React.MouseEvent<HTMLElement>) => {
    const stage = bkHdStageRef.current;
    if (!stage) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    stage.style.transform = `perspective(1200px) rotateY(${(x * 8).toFixed(2)}deg) rotateX(${(y * -8).toFixed(2)}deg)`;
  };
  const onBkHdTiltReset = () => {
    if (bkHdStageRef.current) bkHdStageRef.current.style.transform = "";
  };

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
        .bk-hero-content { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; z-index: 1; padding: 100px clamp(16px, 3vw, 48px) 0; max-width: 1440px; margin: 0 auto; left: 0; right: 0; }
        .bk-hero-eyebrow { display: inline-block; background: #C6E84A; color: #0f0f0f; padding: 8px 20px; border-radius: 999px; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; font-variant: small-caps; margin-bottom: 24px; }
        .bk-hero h2 { font-size: clamp(38px, 5.6vw, 68px); font-weight: 700; letter-spacing: -0.03em; line-height: 1.06; color: #ffffff; margin: 0 0 26px; max-width: 780px; text-wrap: balance; }
        .bk-hero-sub { font-size: clamp(17px, 1.6vw, 21px); font-weight: 600; line-height: 1.55; color: rgba(255,255,255,0.92); margin: 0 0 18px; max-width: 640px; }
        .bk-hero-body { font-size: 16px; line-height: 1.75; color: rgba(255,255,255,0.68); margin: 0 0 38px; max-width: 520px; }
        .bk-hero-ctas { display: flex; flex-wrap: wrap; gap: 16px; }

        /* ── S02 LANDSCAPE ── */
        .bk-s02 { background: #ffffff; padding: clamp(48px, 6vw, 80px) 80px clamp(40px, 5vw, 60px); position: relative; }
        .bk-s02-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 80px; align-items: start; margin-top: 40px; }
        .bk-s02-head { max-width: none; }
        .bk-s02-left .bk-lede { color: #5A5D66; }
        .bk-s02-left .bk-copy { color: #5B6472; }
        .bk-s02-grid-inner { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .bk-s02-card {
          background: linear-gradient(160deg, #0E1B2E 0%, #1B2735 100%);
          border: 1px solid rgba(198,232,74,0.14);
          border-radius: 16px;
          padding: 22px 22px 20px;
          position: relative;
          overflow: hidden;
          transition: transform .3s cubic-bezier(.4,0,.2,1), box-shadow .3s ease, border-color .3s ease;
          box-shadow: 0 10px 30px -12px rgba(12,27,48,0.35);
        }
        .bk-s02-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background: radial-gradient(120px 60px at 20% 0%, rgba(198,232,74,0.12), transparent 70%);
          opacity: 0;
          transition: opacity .3s ease;
          pointer-events: none;
        }
        .bk-s02-card:hover {
          transform: translateY(-5px) scale(1.01);
          box-shadow: 0 20px 44px -12px rgba(12,27,48,0.45);
          border-color: rgba(198,232,74,0.45);
        }
        .bk-s02-card:hover::before { opacity: 1; }
        .bk-s02-card-top { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
        .bk-s02-icon {
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
        .bk-s02-icon::after {
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
        .bk-s02-card:hover .bk-s02-icon::after { opacity: 0.55; }
        .bk-s02-icon svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
        .bk-s02-card-label { font-size: 15px; font-weight: 600; color: #ffffff; line-height: 1.4; }
        .bk-s02-callout {
          margin-top: 48px;
          background: linear-gradient(135deg, #0B1D35 0%, #132742 40%, #0F2035 100%);
          border-radius: 20px;
          padding: 44px 48px 40px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 40px -12px rgba(10,22,40,0.25);
        }
        .bk-s02-callout::before {
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
        .bk-s02-callout::after {
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
        .bk-s02-callout-top { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; position: relative; z-index: 1; }
        .bk-s02-callout-dot { width: 8px; height: 8px; border-radius: 50%; background: #C4E538; flex-shrink: 0; box-shadow: 0 0 12px rgba(196,229,56,0.5); }
        .bk-s02-callout-label { font-size: 11px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: rgba(196,229,56,0.7); }
        .bk-s02-callout-text { font-size: clamp(18px, 1.8vw, 26px); line-height: 1.4; color: rgba(255,255,255,0.92); font-weight: 500; margin: 0; position: relative; z-index: 1; }
        .bk-s02-callout-text em { font-style: normal; color: #C4E538; font-weight: 600; }

        /* ── S03 ECOSYSTEM ── */
        .bk-s03 { background: linear-gradient(180deg, #081A31 0%, #071426 100%); padding: clamp(76px, 9vw, 128px) 80px; }
        .bk-s03 .bk-h2 { color: #ffffff; }
        .bk-s03-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-top: 56px; }
        .bk-s03-card { position: relative; aspect-ratio: 4 / 5; border-radius: 18px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.3); transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .bk-s03-card:hover { transform: scale(1.02); box-shadow: 0 8px 32px rgba(0,0,0,0.45); }
        .bk-s03-card img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: filter 0.2s ease; }
        .bk-s03-card:hover img { filter: brightness(1.1); }
        .bk-s03-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0) 70%); pointer-events: none; }
        .bk-s03-card-label { position: absolute; top: 0; left: 0; right: 0; padding: 26px; z-index: 1; }
        .bk-s03-card-name { display: block; font-size: 22px; font-weight: 700; color: #FFFFFF; line-height: 1.3; text-shadow: 0 1px 4px rgba(0,0,0,0.4); }
        .bk-s03-card-desc { display: block; font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.7); line-height: 1.55; margin-top: 6px; text-shadow: 0 1px 3px rgba(0,0,0,0.35); }

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

        /* ── S05 CUSTOMER LIFECYCLE (claims-ops style) ── */
        .bk-s05 { background: var(--bkn); padding: clamp(76px, 9vw, 128px) 80px; color: #ffffff; }
        .bk-s05-split { display: grid; grid-template-columns: 1fr 1.15fr; gap: clamp(36px, 5vw, 80px); align-items: center; }
        .bk-s05-img { position: relative; overflow: hidden; border-radius: 22px; aspect-ratio: 4 / 4.6; }
        .bk-s05-img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .bk-s05-tint { position: absolute; inset: 0; background: linear-gradient(200deg, rgba(198,232,74,0.16) 0%, rgba(7,20,38,0.05) 40%, rgba(7,20,38,0.55) 100%); }
        .bk-s05 .bk-h2 { color: #ffffff; margin: 0; }
        .bk-s05 .bk-lede { color: rgba(255,255,255,0.8); font-size: 17px; margin-top: 22px; }
        .bk-s05 .bk-copy { color: rgba(255,255,255,0.55); font-size: 16px; }
        .bk-cw { position: relative; margin-top: 40px; max-width: 640px; width: 100%; aspect-ratio: 16 / 11; }
        .bk-cw-lines { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
        .bk-cw-node { position: absolute; z-index: 2; transform: translate(-50%, -50%); display: flex; align-items: center; justify-content: center; }
        .bk-cw-circle { width: 62px; height: 62px; border-radius: 50%; background: #0F1B30; border: 1.5px solid #C6E84A; display: flex; align-items: center; justify-content: center; color: #f4f7fb; transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.3s ease; }
        .bk-cw-node:hover .bk-cw-circle { transform: scale(1.08); border-color: #D9F77E; box-shadow: 0 0 0 7px rgba(198,232,74,0.12); }
        .bk-cw-circle svg { width: 22px; height: 22px; }
        .bk-cw-label { position: absolute; bottom: calc(100% + 12px); left: 0; right: 0; display: flex; flex-direction: column; align-items: center; gap: 3px; pointer-events: none; }
        .bk-cw-num { font-family: var(--font-syne), Arial, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; color: #C6E84A; line-height: 1; }
        .bk-cw-name { font-family: var(--font-syne), Arial, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; color: #ffffff; text-transform: uppercase; white-space: nowrap; line-height: 1.15; }
        .bk-cw-sub { position: absolute; top: calc(100% + 10px); left: 0; right: 0; text-align: center; font-size: 12px; line-height: 1.35; color: rgba(196,211,231,0.72); white-space: nowrap; padding: 0 4px; pointer-events: none; }
        .bk-cw-arrow { position: absolute; z-index: 1; width: 0; height: 0; transform: translate(-50%, -50%); pointer-events: none; }
        .bk-cw-arrow--r { border-left: 9px solid #C6E84A; border-top: 5px solid transparent; border-bottom: 5px solid transparent; }
        .bk-cw-arrow--l { border-right: 9px solid #C6E84A; border-top: 5px solid transparent; border-bottom: 5px solid transparent; }
        .bk-cw-arrow--d { border-top: 9px solid #C6E84A; border-left: 5px solid transparent; border-right: 5px solid transparent; }
        .bk-cw-arrow--u { border-bottom: 9px solid #C6E84A; border-left: 5px solid transparent; border-right: 5px solid transparent; }

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

        /* ── S08 OUTCOMES ── */
        .bk-s08 { background: #ffffff; padding: clamp(76px, 9vw, 128px) 80px; }
        .bk-s08 .bk-h2 { color: #0f172a; }
        .bk-s08-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 56px; }
        .bk-s08-card { position: relative; overflow: hidden; background: #f5f5f3; border-radius: 16px; display: flex; flex-direction: row; min-height: 220px; box-shadow: 0 2px 12px -4px rgba(12,27,48,0.08); transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease; }
        .bk-s08-card--dark { background: #0c1b2e; }
        .bk-s08-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px -14px rgba(12,27,48,0.20); }
        .bk-s08-body { flex: 0 0 50%; padding: 24px 20px 24px 24px; display: flex; flex-direction: column; justify-content: flex-end; position: relative; z-index: 2; pointer-events: none; }
        .bk-s08-body * { pointer-events: auto; }
        .bk-s08-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #8a97a8; margin: 0 0 10px; }
        .bk-s08-card--dark .bk-s08-eyebrow { color: #6b8299; }
        .bk-s08-title { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(20px, 1.8vw, 26px); font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; color: #0a1628; margin: 0 0 10px; }
        .bk-s08-card--dark .bk-s08-title { color: #ffffff; }
        .bk-s08-desc { font-size: 12.5px; line-height: 1.6; color: #5a6b7f; margin: 0; max-width: 24ch; }
        .bk-s08-card--dark .bk-s08-desc { color: #7a96ae; }
        .bk-s08-media { position: absolute; right: 0; top: 0; bottom: 0; width: 68%; z-index: 1; overflow: hidden; }
        .bk-s08-media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; object-position: right center; display: block; transition: transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .bk-s08-card:hover .bk-s08-media img { transform: scale(1.05); }

        /* ── S09 OPERATING MODEL (Sytrion Model stack) ── */
        .bk-s09 { background: #070d17; position: relative; overflow: hidden; padding: clamp(76px, 9vw, 128px) 80px; }
        .bk-s09 .bk-h2 { color: #ffffff; }
        .bk-s09-stack { display: flex; flex-direction: column; gap: 12px; margin-top: 56px; }
        .bk-s09-layer { display: grid; grid-template-columns: 90px 320px 1fr; align-items: center; gap: 20px; border-radius: 14px; padding: 24px 30px; background: #10294A; border: 1px solid rgba(198,232,74,0.12); transition: border-color 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1); }
        .bk-s09-layer:hover { background: #C6E84A; border-color: rgba(198,232,74,0.8); box-shadow: 0 0 40px -6px rgba(198,232,74,0.4); transform: translateX(6px); }
        .bk-s09-layer:hover .bk-s09-layer-num, .bk-s09-layer:hover .bk-s09-layer-name, .bk-s09-layer:hover .bk-s09-layer-items { color: #0C1B30; }
        .bk-s09-layer-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; color: #C6E84A; font-variant-numeric: tabular-nums; }
        .bk-s09-layer-name { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #ffffff; }
        .bk-s09-layer-items { font-size: 12.5px; letter-spacing: 0.05em; color: rgba(255,255,255,0.62); }
        @media (max-width: 900px) {
          .bk-s09-layer { grid-template-columns: 60px 1fr; row-gap: 8px; padding: 22px 24px; }
          .bk-s09-layer-items { grid-column: 2; }
        }
        @media (max-width: 640px) {
          .bk-s09-layer { grid-template-columns: 1fr; gap: 8px; padding: 20px; }
        }

        /* ── S09A ADVANTAGES (Why Sytrion cards) ── */
        .bk-s09a { background: #ffffff; padding: clamp(76px, 9vw, 128px) 80px; }
        .bk-s09a .bk-h2 { color: #0f172a; }
        .bk-s09a-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 56px; }
        .bk-s09a-card { position: relative; border-radius: 16px; padding: 28px 24px 26px; background: #FAFBFC; border: 2px solid #D1D9E6; display: flex; flex-direction: column; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease; }
        .bk-s09a-card::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 3px; border-radius: 0 0 16px 16px; background: linear-gradient(90deg, #7AA306, #C6E84A); opacity: 0; transition: opacity 0.35s ease; }
        .bk-s09a-card:hover { transform: translateY(-4px); box-shadow: 0 12px 30px -12px rgba(10,22,40,0.12); }
        .bk-s09a-card:hover::after { opacity: 1; }
        .bk-s09a-head { display: flex; align-items: center; gap: 16px; margin-bottom: 14px; }
        .bk-s09a-head-text { display: flex; flex-direction: column; }
        .bk-s09a-icon { width: 64px; height: 64px; border-radius: 16px; background: rgba(198,232,74,0.12); border: 1px solid rgba(122,163,6,0.2); display: flex; align-items: center; justify-content: center; color: #618300; flex: 0 0 auto; transition: background 0.35s ease, border-color 0.35s ease, color 0.35s ease, transform 0.35s ease; }
        .bk-s09a-card:hover .bk-s09a-icon { background: #C6E84A; border-color: #C6E84A; color: #0C1B30; transform: scale(1.06); }
        .bk-s09a-icon img { width: 52px; height: 52px; object-fit: contain; display: block; }
        .bk-s09a-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; color: #7AA306; font-variant-numeric: tabular-nums; }
        .bk-s09a-card h3 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 23px; font-weight: 700; color: #0C1B30; margin: 4px 0 0; }
        .bk-s09a-card p { font-size: 14px; line-height: 1.65; color: #5A6B7F; margin: 8px 0 0; }
        @media (max-width: 1080px) {
          .bk-s09a-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .bk-s09a-grid { grid-template-columns: 1fr; }
        }

        /* ── S10 TRANSFORM + CTA ── */
        .bk-s10 { background: #0f0f0f; overflow: hidden; }
        .bk-tf { background: #ffffff; padding: clamp(64px, 8vw, 128px) clamp(28px, 5vw, 80px); }
        .bk-tf-badge { display: inline-block; background: #C6E84A; color: #0f0f0f; padding: 8px 20px; border-radius: 999px; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; font-variant: small-caps; margin-bottom: clamp(12px, 1.6vw, 16px); }
        .bk-tf-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: clamp(40px, 5vw, 72px); align-items: flex-start; }
        .bk-tf-left { display: flex; flex-direction: column; max-width: 560px; padding-top: clamp(8px, 1vw, 16px); }
        .bk-tl-step { display: flex; align-items: flex-start; gap: 24px; }
        .bk-tl-step--approach { align-items: center; }
        .bk-tl-icon { flex: 0 0 auto; width: 52px; height: 52px; border-radius: 50%; border: 1.5px solid #C8D1DD; background: #FFFFFF; color: #93A0B0; display: flex; align-items: center; justify-content: center; }
        .bk-tl-icon svg { width: 22px; height: 22px; }
        .bk-tl-body { flex: 1; min-width: 0; }
        .bk-tl-body h3 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(20px, 2vw, 24px); font-weight: 700; margin: 0; color: #0C1B30; line-height: 1.25; }
        .bk-tl-body p { font-size: 15px; line-height: 1.7; margin: 12px 0 0; color: #5A6B7F; }
        .bk-tl-step--approach .bk-tl-body { background: #F3F5F7; border-left: 4px solid #C6E84A; border-radius: 16px; padding: 24px 26px; }
        .bk-tl-link { flex: 0 0 auto; width: 0; height: 44px; margin: 12px 0 12px 25px; border-left: 2px dashed #C6E84A; }
        .bk-pot-card { background: #0C1B30; border-radius: 22px; padding: clamp(30px, 3.5vw, 44px); color: #FFFFFF; box-shadow: 0 34px 70px -40px rgba(7,20,38,0.5); }
        .bk-pot-title { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(24px, 2.6vw, 32px); font-weight: 700; margin: 0 0 clamp(18px, 2vw, 24px); color: #FFFFFF; line-height: 1.25; }
        .bk-pot-checklist { list-style: none; margin: 0; padding: 0; }
        .bk-pot-checklist li { display: flex; align-items: center; gap: 14px; padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 15px; font-weight: 600; color: #FFFFFF; }
        .bk-pot-checklist li:last-child { border-bottom: none; }
        .bk-pot-tick { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; color: #C6E84A; }
        .bk-pot-tick svg { width: 18px; height: 18px; }
        .bk-transform-cta { display: inline-flex; align-items: center; justify-content: center; gap: 10px; align-self: flex-start; background: #C6E84A; color: #0f0f0f; padding: 15px 30px; border-radius: 999px; font-weight: 700; font-size: 15px; letter-spacing: 0.02em; text-decoration: none; margin-top: 28px; transition: background .25s ease, transform .25s cubic-bezier(0.16,1,0.3,1), box-shadow .25s ease; }
        .bk-transform-cta span { display: inline-block; transition: transform .2s ease; }
        .bk-transform-cta:hover { background: #D9F77E; transform: translateY(-2px); box-shadow: 0 16px 34px -14px rgba(198,232,74,0.55); }
        .bk-transform-cta:hover span { transform: translateX(3px); }
        .bk-final { position: relative; overflow: hidden; text-align: center; padding: clamp(76px, 9vw, 128px) 80px; }
        .bk-final-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 600px; height: 400px; background: radial-gradient(circle, rgba(198,232,74,0.12) 0%, transparent 70%); border-radius: 50%; pointer-events: none; }
        .bk-final-inner { position: relative; z-index: 1; max-width: 750px; margin: 0 auto; }
        .bk-final-eyebrow { display: inline-block; font-size: 12px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: #C6E84A; margin-bottom: 22px; }
        .bk-final-h2 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(32px, 4vw, 40px); line-height: 1.3; font-weight: 700; color: #FFFFFF; margin: 0 0 20px; }
        .bk-final-body { font-size: 17px; line-height: 1.7; color: #DCDECD; max-width: 640px; margin: 20px auto 0; }
        .bk-final-ctas { display: flex; justify-content: center; gap: 20px; margin-top: 40px; flex-wrap: wrap; }
        .bk-s10-cta { display: inline-flex; align-items: center; gap: 10px; padding: 14px 28px; border-radius: 999px; font-weight: 700; font-size: 15px; text-decoration: none; transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .bk-final .bk-s10-cta { padding: 16px 32px; font-size: 16px; border-radius: 9999px; }
        .bk-final .bk-s10-cta-primary { background: #C6E84A; color: #0f0f0f; }
        .bk-final .bk-s10-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(198,232,74,0.35); }
        .bk-final .bk-s10-cta-ghost { background: transparent; color: #FFFFFF; border: 1.5px solid #FFFFFF; }
        .bk-final .bk-s10-cta-ghost:hover { background: #FFFFFF; color: #0f0f0f; transform: translateY(-2px); }

        /* ── RESPONSIVE ── */
        @media (max-width: 1080px) {
          .bk-s08-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 900px) {
          .bk-s02-grid, .bk-s05-split { grid-template-columns: 1fr; }
          .bk-s03-cards { grid-template-columns: repeat(2, 1fr); }
          .bk-s04-tabbar { grid-template-columns: repeat(3, 1fr); }
          .bk-s04-panel { grid-template-columns: 1fr; }
          .bk-s06-row { grid-template-columns: 1fr; }
          .bk-tf-grid { grid-template-columns: 1fr; gap: 40px; }
          .bk-tf-left { max-width: none; }
        }
        @media (max-width: 640px) {
          .bk-hero-text { padding: 100px 20px 40px; }
          .bk-s02, .bk-s04, .bk-s05, .bk-s06, .bk-s08, .bk-s09, .bk-s09a, .bk-tf, .bk-final { padding-left: 20px; padding-right: 20px; }
          .bk-s03 { padding-left: 20px; padding-right: 20px; }
          .bk-s03-cards { grid-template-columns: 1fr; }
          .bk-s04-tabbar { grid-template-columns: repeat(2, 1fr); }
          .bk-s04-checklist { grid-template-columns: 1fr; }
          .bk-s08-grid { grid-template-columns: 1fr; }
          .bk-final-ctas { flex-direction: column; align-items: center; }
          .bk-final .bk-s10-cta { width: 100%; max-width: 320px; justify-content: center; }
          .bk-tl-step { gap: 16px; }
          .bk-tl-icon { width: 46px; height: 46px; }
          .bk-tl-icon svg { width: 20px; height: 20px; }
          .bk-tl-link { margin-left: 22px; height: 36px; margin-top: 10px; margin-bottom: 10px; }
          .bk-tl-step--approach .bk-tl-body { padding: 20px 18px; }
          .bk-hero-ctas { flex-direction: column; }
          .bk-hero-ctas .bk-btn { width: 100%; }
          .bk-cw { max-width: 100%; aspect-ratio: auto; }
          .bk-cw-lines, .bk-cw-arrow { display: none; }
          .bk-cw-node { position: relative; left: auto !important; top: auto !important; transform: none; width: 100%; margin: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
          .bk-cw-label { position: static; bottom: auto; margin-bottom: 12px; }
          .bk-cw-sub { position: static; top: auto; margin-top: 12px; white-space: normal; }
          .bk-cw-node:not(:last-child)::after { content: ""; display: block; width: 0; height: 0; margin: 4px auto 0; border-top: 9px solid #C6E84A; border-left: 5px solid transparent; border-right: 5px solid transparent; }
        }
        @media (max-width: 560px) {
          .bk-s02-grid-inner { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bk-reveal { opacity: 1; transform: none; transition: none; animation: none; }
          .bk-cw-node:hover .bk-cw-circle { transform: none; }
          .bk-transform-cta:hover { transform: none; }
          .bk-transform-cta:hover span { transform: none; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* S01 — HERO: 42/58 split, bleeding photo                          */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="bk-hero">
        <video className="bk-hero-img" src="/services/banking/bankinghero1.mp4" autoPlay muted loop playsInline />
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
      {/* S02 — LANDSCAPE: text + challenge cards + approach callout        */}
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
                <article key={c} className="bk-s02-card">
                  <div className="bk-s02-card-top">
                    <div className="bk-s02-icon" aria-hidden="true">{landscapeIcons[i]}</div>
                  </div>
                  <div className="bk-s02-card-label">{c}</div>
                </article>
              ))}
            </div>
          </div>
          <div className="bk-s02-callout bk-reveal">
            <div className="bk-s02-callout-top">
              <div className="bk-s02-callout-dot" aria-hidden="true" />
              <div className="bk-s02-callout-label">Our Approach</div>
            </div>
            <p className="bk-s02-callout-text">Sytrion brings <em>people, processes, data</em> and <em>intelligence</em> together to make banking operations work smarter.</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* S03 — ECOSYSTEM: industries-style photo cards                     */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="bk-s03">
        <div className="bk-wrap">
          <div className="bk-head bk-reveal">
            <BkLabel text="Across the Banking Ecosystem" />
            <h2 className="bk-h2">Built around the operations <span style={{ color: "#C6E84A" }}>that keep banking moving.</span></h2>
          </div>
          <div className="bk-s03-cards bk-reveal">
            {ecosystemCards.map((card) => (
              <div key={card.title} className="bk-s03-card">
                <img src={card.img} alt={card.title} loading="lazy" />
                <div className="bk-s03-overlay" aria-hidden="true" />
                <div className="bk-s03-card-label">
                  <span className="bk-s03-card-name">{card.title}</span>
                  <span className="bk-s03-card-desc">{card.desc}</span>
                </div>
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
      {/* S05 — CUSTOMER LIFECYCLE: split + claims-style flow diagram       */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="bk-s05">
        <div className="bk-wrap">
          <div className="bk-s05-split">
            <div className="bk-s05-img bk-reveal">
              <img src="/services/banking/Customer Lifecycle Operations.jpg" alt="Banking operations professional supporting a customer through the customer lifecycle" />
              <div className="bk-s05-tint" />
            </div>
            <div className="bk-reveal">
              <BkLabel text="Customer Lifecycle Operations" />
              <h2 className="bk-h2">Start every banking relationship with <span style={{ color: "#C6E84A" }}>confidence.</span></h2>
              <p className="bk-lede">Customer onboarding sits at the intersection of experience, compliance, identity and data.</p>
              <p className="bk-copy">Sytrion helps banks streamline the administrative workflows behind onboarding and ongoing customer lifecycle management through structured processes, document intelligence, automation and human expertise.</p>
              <div className="bk-cw">
                <svg className="bk-cw-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <path
                    d="M14 28 H50 M50 28 H86 M86 28 L86 67 M86 74 H62 M62 74 H38 M38 74 H14"
                    stroke="#C6E84A"
                    strokeOpacity="0.42"
                    strokeWidth="1.2"
                    vectorEffect="non-scaling-stroke"
                    fill="none"
                  />
                </svg>

                <span className="bk-cw-arrow bk-cw-arrow--r" style={{ left: "32%", top: "28%" }} aria-hidden="true" />
                <span className="bk-cw-arrow bk-cw-arrow--r" style={{ left: "68%", top: "28%" }} aria-hidden="true" />
                <span className="bk-cw-arrow bk-cw-arrow--d" style={{ left: "86%", top: "67%" }} aria-hidden="true" />
                <span className="bk-cw-arrow bk-cw-arrow--l" style={{ left: "74%", top: "74%" }} aria-hidden="true" />
                <span className="bk-cw-arrow bk-cw-arrow--l" style={{ left: "50%", top: "74%" }} aria-hidden="true" />
                <span className="bk-cw-arrow bk-cw-arrow--l" style={{ left: "26%", top: "74%" }} aria-hidden="true" />

                {kycSteps.map((s, i) => (
                  <div key={s.name} className="bk-cw-node" style={{ left: `${cwPositions[i].x}%`, top: `${cwPositions[i].y}%` }}>
                    <div className="bk-cw-circle">{s.icon}</div>
                    <span className="bk-cw-label">
                      <span className="bk-cw-num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="bk-cw-name">{s.name}</span>
                    </span>
                    <span className="bk-cw-sub">{s.sub}</span>
                  </div>
                ))}
              </div>
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
      {/* S07 — INTELLIGENCE TRANSIT HERO + HUMAN + DIGITAL                 */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="bk-s07">
        <div className="bk-intel">
          <div className="bk-intel-hero bk-reveal">
            <BkLabel text="Intelligence Built Into Banking" />
            <h2 className="bk-intel-title">AI that works behind <span>every transaction.</span></h2>
            <p className="bk-intel-sub">AI can help banks move beyond automating repetitive tasks toward operations that understand information, identify exceptions and support faster decisions.</p>
          </div>
          <div className="bk-transit bk-reveal">
            <svg className="bk-transit-line" viewBox="0 0 1200 220" fill="none" preserveAspectRatio="none" aria-hidden="true">
              <path d={transitPath} stroke="rgba(198,241,53,0.55)" strokeWidth="2" />
              <g className="bk-transit-pulse">
                <circle className="bk-transit-glow" r="11" />
                <circle className="bk-transit-dot" r="5" />
                <animateMotion dur="6s" repeatCount="indefinite" path={transitPath} />
              </g>
            </svg>
            {transitStops.map((stop) => (
              <div key={stop.name} className={"bk-stop" + (stop.hub ? " bk-stop--hub" : "")} style={{ left: `${(stop.x / 1200) * 100}%`, top: `${(stop.y / 220) * 100}%` }}>
                <span className="bk-stop-dot" />
                <div className="bk-stop-body">
                  <span className="bk-stop-name">{stop.name}</span>
                  <span className="bk-stop-desc">{stop.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="bk-s07-sep" />

        <div className="bk-hd" onMouseMove={onBkHdTilt} onMouseLeave={onBkHdTiltReset}>
          <div className="bk-hd-glow bk-hd-glow--lime" aria-hidden="true" />
          <div className="bk-hd-glow bk-hd-glow--blue" aria-hidden="true" />
          <div className="bk-hd-wrap">
            <div className="bk-hd-grid">
              <div className="bk-hd-copy bk-reveal">
                <p className="bk-hd-kicker">07 / Human + Digital</p>
                <span className="bk-hd-pill">Human + Digital</span>
                <h2 className="bk-hd-title">
                  <span className="bk-hd-title-white">Smarter banking should</span>
                  <span className="bk-hd-title-lime">still feel personal.</span>
                </h2>
                <p className="bk-hd-line">Automation can handle repetitive transactions.</p>
                <p className="bk-hd-line">AI can organize information and help surface what matters.</p>
                <p className="bk-hd-line">People bring judgment, context and empathy to complex customer situations.</p>
                <p className="bk-hd-em">Sytrion brings them together.</p>
              </div>
              <div className="bk-hd-visual bk-reveal">
                <div className="bk-hd-stage" ref={bkHdStageRef}>
                  <div className="bk-hd-halo" aria-hidden="true" />
                  <svg className="bk-hd-conn" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    <line x1="24" y1="16" x2="36" y2="29" />
                    <line x1="24" y1="54" x2="36" y2="46" />
                    <line x1="52" y1="70" x2="62" y2="48" />
                  </svg>
                  <div className="bk-hd-globe" aria-hidden="true">
                    <div className="bk-hd-solid" />
                    <svg className="bk-hd-mesh" viewBox="0 0 400 400" fill="none">
                      <ellipse cx="200" cy="200" rx="198" ry="198" stroke="rgba(198,241,53,0.30)" strokeWidth="1" />
                      <ellipse cx="200" cy="200" rx="198" ry="126" stroke="rgba(198,241,53,0.15)" strokeWidth="1" />
                      <ellipse cx="200" cy="200" rx="198" ry="62" stroke="rgba(198,241,53,0.15)" strokeWidth="1" />
                      <ellipse cx="200" cy="200" rx="126" ry="198" stroke="rgba(198,241,53,0.15)" strokeWidth="1" />
                      <ellipse cx="200" cy="200" rx="62" ry="198" stroke="rgba(198,241,53,0.15)" strokeWidth="1" />
                      <ellipse cx="200" cy="200" rx="150" ry="198" stroke="rgba(110,160,255,0.10)" strokeWidth="1" />
                      <path d="M2 200h396" stroke="rgba(198,241,53,0.20)" strokeWidth="1" />
                    </svg>
                    <div className="bk-hd-pts">
                      {[
                        [62, 22], [70, 30], [76, 40], [74, 52], [66, 62], [54, 68], [44, 66], [36, 60],
                        [30, 50], [31, 38], [38, 28], [50, 24], [60, 36], [66, 48], [48, 56], [56, 40],
                        [40, 44], [44, 52], [54, 30], [58, 58],
                      ].map(([px, py], i) => (
                        <span
                          key={i}
                          className={"bk-hd-pt" + (i % 5 === 0 ? " bk-hd-pt--glow" : "")}
                          style={{ left: `${px}%`, top: `${py}%` }}
                        />
                      ))}
                    </div>
                    <div className="bk-hd-core" />
                  </div>
                  <div className="bk-hd-orbit bk-hd-orbit--a" aria-hidden="true">
                    <span className="bk-hd-orbit-dot" />
                  </div>
                  <div className="bk-hd-orbit bk-hd-orbit--b" aria-hidden="true">
                    <span className="bk-hd-orbit-dot" />
                  </div>
                  <svg className="bk-hd-hand" viewBox="0 0 320 170" fill="none" aria-hidden="true">
                    <g stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M96 58 C74 64 56 78 48 94 C42 104 40 112 40 118 C40 130 50 138 64 138 L64 120 C52 118 48 112 50 106 C54 92 70 74 96 66" />
                      <path d="M224 58 C246 64 264 78 272 94 C278 104 280 112 280 118 C280 130 270 138 256 138 L256 120 C268 118 272 112 270 106 C266 92 250 74 224 66" />
                      <path d="M160 34 C136 40 114 54 100 74 C95 84 92 96 92 106 C92 120 100 130 112 131 C124 132 132 122 135 130 C138 138 148 146 160 146 C172 146 182 138 185 130 C188 122 196 132 208 131 C220 130 228 120 228 106 C228 96 225 84 220 74 C206 54 184 40 160 34 Z" />
                    </g>
                  </svg>
                  <div className="bk-hd-card bk-hd-card--tl">
                    <span className="bk-hd-card-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M22 12h-4M6 12H2" /><circle cx="12" cy="12" r="8" opacity="0.45" /></svg>
                    </span>
                    <div>
                      <h3>Smarter decisions</h3>
                      <p>AI analyzes patterns in real time.</p>
                    </div>
                  </div>
                  <div className="bk-hd-card bk-hd-card--ml">
                    <span className="bk-hd-card-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" /><path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" /></svg>
                    </span>
                    <div>
                      <h3>Automate at scale</h3>
                      <p>Handle high volumes with speed and accuracy.</p>
                    </div>
                  </div>
                  <div className="bk-hd-card bk-hd-card--r">
                    <span className="bk-hd-card-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></svg>
                    </span>
                    <div>
                      <h3>Human insight</h3>
                      <p>Context, empathy and complex judgment.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .bk-s07 { background: #0B1220; position: relative; }
          .bk-s07-sep { height: 1px; background: #223148; border: 0; margin: 0; }

          .bk-intel { background: #0B1220; padding: clamp(76px, 9vw, 128px) 80px clamp(104px, 10vw, 150px); position: relative; }
          .bk-intel-hero { }
          .bk-intel-title { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(32px, 5vw, 48px); font-weight: 700; line-height: 1.15; letter-spacing: -0.02em; margin: 0 0 20px; color: #F4F5F2; }
          .bk-intel-title span { color: #C6E84A; }
          .bk-intel-sub { font-size: clamp(15px, 1.35vw, 17px); line-height: 1.8; color: #93A0B0; margin: 0; }

          .bk-transit { position: relative; width: 100%; margin: clamp(56px, 6.5vw, 84px) 0 40px; }
          .bk-transit-line { display: block; width: 100%; height: 220px; }
          .bk-transit-pulse .bk-transit-glow { fill: rgba(198,241,53,0.22); }
          .bk-transit-pulse .bk-transit-dot { fill: #C6F135; filter: drop-shadow(0 0 8px rgba(198,241,53,0.9)); }

          .bk-stop { position: absolute; transform: translate(-50%, -50%); z-index: 2; pointer-events: none; }
          .bk-stop-dot { display: block; width: 14px; height: 14px; border-radius: 50%; background: #0B1220; border: 2px solid #C6F135; box-sizing: border-box; }
          .bk-stop--hub .bk-stop-dot { width: 24px; height: 24px; background: #C6F135; border-color: #C6F135; box-shadow: 0 0 20px rgba(198,241,53,0.55); }
          .bk-stop-body { position: absolute; top: 12px; left: 50%; transform: translateX(-50%); width: 150px; display: flex; flex-direction: column; align-items: center; text-align: center; }
          .bk-stop--hub .bk-stop-body { width: 200px; top: 15px; }
          .bk-stop-name { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 700; color: #F4F5F2; white-space: nowrap; }
          .bk-stop--hub .bk-stop-name { color: #C6F135; }
          .bk-stop-desc { font-size: 11.5px; line-height: 1.45; color: #93A0B0; margin-top: 4px; }

          .bk-hd { position: relative; overflow: hidden; background: #0B1220; }
          .bk-hd-glow { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; }
          .bk-hd-glow--lime { width: 46vw; height: 46vw; max-width: 720px; max-height: 720px; right: -9%; top: -14%; background: rgba(198,241,53,0.16); }
          .bk-hd-glow--blue { width: 34vw; height: 34vw; max-width: 560px; max-height: 560px; right: 4%; bottom: -22%; background: rgba(96,146,255,0.10); }
          .bk-hd-wrap { position: relative; z-index: 2; max-width: 1400px; width: 100%; margin: 0 auto; padding: clamp(88px, 10vw, 140px) 40px; }
          .bk-hd-grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: clamp(28px, 4vw, 64px); align-items: center; min-height: clamp(600px, 84vh, 780px); }
          .bk-hd-copy { position: relative; z-index: 2; }
          .bk-hd-kicker { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #C6F135; margin: 0 0 16px; font-variant-numeric: tabular-nums; }
          .bk-hd-pill { display: inline-flex; align-items: center; background: #C6F135; color: #0B1220; font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 9px 20px; border-radius: 999px; margin: 0 0 30px; }
          .bk-hd-title { margin: 0 0 28px; }
          .bk-hd-title-white { display: block; color: #ffffff; font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(40px, 5vw, 56px); font-weight: 700; line-height: 1.06; letter-spacing: -0.02em; }
          .bk-hd-title-lime { display: block; color: #C6F135; font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(40px, 5vw, 56px); font-weight: 700; line-height: 1.06; letter-spacing: -0.02em; }
          .bk-hd-line { font-size: clamp(15.5px, 1.35vw, 18px); line-height: 1.85; color: #93A0B0; margin: 0 0 10px; max-width: 540px; }
          .bk-hd-em { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(19px, 1.9vw, 23px); font-weight: 700; color: #C6F135; margin: 24px 0 0; }
          .bk-hd-visual { position: relative; display: flex; align-items: center; justify-content: center; min-height: clamp(420px, 52vw, 640px); }
          .bk-hd-stage { position: relative; width: 100%; max-width: 660px; aspect-ratio: 1 / 1; transform-style: preserve-3d; transition: transform 0.12s ease-out; will-change: transform; }
          .bk-hd-halo { position: absolute; left: 50%; top: 46%; width: 78%; aspect-ratio: 1; transform: translate(-50%, -50%); border-radius: 50%; background: radial-gradient(circle, rgba(198,241,53,0.10) 0%, rgba(96,146,255,0.05) 45%, rgba(11,18,32,0) 70%); }
          .bk-hd-globe { position: absolute; left: 50%; top: 46%; width: 62%; aspect-ratio: 1; transform: translate(-50%, -50%); }
          .bk-hd-solid { position: absolute; inset: 0; border-radius: 50%; background: radial-gradient(circle at 34% 30%, rgba(198,241,53,0.10) 0%, rgba(11,18,32,0.55) 62%, rgba(11,18,32,0) 100%); animation: bkHdPulse 5s ease-in-out infinite; }
          .bk-hd-mesh { position: absolute; inset: 0; width: 100%; height: 100%; animation: bkHdSpin 70s linear infinite; }
          .bk-hd-pts { position: absolute; inset: 0; }
          .bk-hd-pt { position: absolute; width: 4px; height: 4px; margin: -2px 0 0 -2px; border-radius: 50%; background: rgba(198,241,53,0.9); }
          .bk-hd-pt--glow { width: 6px; height: 6px; margin: -3px 0 0 -3px; background: #C6F135; box-shadow: 0 0 10px 2px rgba(198,241,53,0.75); animation: bkHdTwinkle 3.4s ease-in-out infinite; }
          .bk-hd-core { position: absolute; left: 50%; top: 50%; width: 26%; aspect-ratio: 1; transform: translate(-50%, -50%); border-radius: 50%; background: radial-gradient(circle, rgba(198,241,53,0.55) 0%, rgba(198,241,53,0) 70%); animation: bkHdPulse 5s ease-in-out infinite 0.4s; }
          .bk-hd-orbit { position: absolute; left: 50%; top: 46%; aspect-ratio: 1; transform: translate(-50%, -50%); border-radius: 50%; border: 1px solid rgba(198,241,53,0.28); transform-style: preserve-3d; }
          .bk-hd-orbit--a { width: 82%; transform: translate(-50%, -50%) rotateX(68deg) rotateZ(-14deg); animation: bkHdOrbitA 18s linear infinite; }
          .bk-hd-orbit--b { width: 54%; transform: translate(-50%, -50%) rotateX(76deg) rotateZ(24deg); border-color: rgba(198,241,53,0.18); animation: bkHdOrbitB 26s linear infinite; }
          .bk-hd-orbit-dot { position: absolute; left: 50%; top: -4px; transform: translateX(-50%); width: 7px; height: 7px; border-radius: 50%; background: #C6F135; box-shadow: 0 0 14px 3px rgba(198,241,53,0.8); }
          .bk-hd-hand { position: absolute; left: 50%; top: 88%; transform: translateX(-50%); width: 66%; z-index: 2; }
          .bk-hd-conn { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; }
          .bk-hd-conn line { stroke: rgba(147,160,176,0.35); stroke-width: 1; stroke-dasharray: 2.5 3; }
          .bk-hd-card { position: absolute; z-index: 3; display: flex; gap: 12px; align-items: flex-start; width: 232px; padding: 14px 16px; border-radius: 14px; background: rgba(16,26,44,0.6); border: 1px solid rgba(147,160,176,0.22); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
          .bk-hd-card-icon { width: 36px; height: 36px; flex: 0 0 auto; border-radius: 50%; background: rgba(11,18,32,0.9); border: 1.5px solid rgba(198,241,53,0.7); display: flex; align-items: center; justify-content: center; color: #C6F135; }
          .bk-hd-card-icon svg { width: 16px; height: 16px; }
          .bk-hd-card h3 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; margin: 0 0 4px; }
          .bk-hd-card p { font-size: 12px; line-height: 1.5; color: #93A0B0; margin: 0; }
          .bk-hd-card--tl { left: 0; top: 2%; }
          .bk-hd-card--ml { left: -7%; top: 42%; }
          .bk-hd-card--r { left: 56%; top: 56%; }

          @keyframes bkHdSpin { to { transform: rotate(360deg); } }
          @keyframes bkHdPulse { 0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); } 50% { opacity: 1; transform: translate(-50%, -50%) scale(1.06); } }
          @keyframes bkHdTwinkle { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
          @keyframes bkHdOrbitA { to { transform: translate(-50%, -50%) rotateX(68deg) rotateZ(-14deg) rotate(360deg); } }
          @keyframes bkHdOrbitB { to { transform: translate(-50%, -50%) rotateX(76deg) rotateZ(24deg) rotate(-360deg); } }

          @media (max-width: 1080px) {
            .bk-hd-grid { grid-template-columns: 1fr 1fr; }
            .bk-hd-card { width: 200px; }
            .bk-hd-card--ml { left: -4%; }
          }
          @media (max-width: 900px) {
            .bk-hd-grid { grid-template-columns: 1fr; gap: 40px; min-height: 0; }
            .bk-hd-visual { min-height: 0; }
            .bk-hd-stage { max-width: 560px; aspect-ratio: 1 / 1; margin: 0 auto; }
            .bk-hd-card { width: 212px; }
            .bk-hd-card--tl { left: 0; top: 2%; }
            .bk-hd-card--ml { left: -4%; top: 42%; }
            .bk-hd-card--r { left: 58%; top: 58%; }
            .bk-transit-line { display: none; }
            .bk-transit { margin: 48px auto 0; }
            .bk-stop { position: relative !important; left: auto !important; top: auto !important; transform: none; margin: 26px auto 0; display: flex; flex-direction: column; align-items: center; }
            .bk-stop-body { position: static; transform: none; margin-top: 8px; }
            .bk-stop--hub .bk-stop-body { width: 200px; }
          }
          @media (max-width: 760px) {
            .bk-hd-stage { max-width: 460px; }
            .bk-hd-conn, .bk-hd-card--ml, .bk-hd-card--r { display: none; }
            .bk-hd-card--tl { left: 4%; top: 6%; }
          }
          @media (max-width: 640px) {
            .bk-hd-wrap { padding: 72px 20px; }
            .bk-hd-stage { max-width: 400px; }
            .bk-hd-hand { width: 72%; }
            .bk-intel { padding: 72px 20px 88px; }
          }
          @media (prefers-reduced-motion: reduce) {
            .bk-transit-pulse { display: none; }
          }
        `}</style>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* S07A — CUSTOMER EXPERIENCE: dark photographic + capability grid    */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="bk-cx">
        <div className="bk-cx-wrap">
          <div className="bk-cx-hero">
            <div className="bk-cx-copy bk-reveal">
              <p className="bk-cx-kicker">12 / Customer Experience</p>
              <h2 className="bk-cx-title">BEYOND THE <span>TRANSACTION.</span></h2>
              <p className="bk-cx-lede">Turn banking interactions into relationships.</p>
              <p className="bk-cx-para">Customers increasingly expect banking experiences to be simple, responsive and consistent across channels.</p>
              <p className="bk-cx-para">Sytrion helps banks create connected customer operations that combine digital self-service, AI-assisted support and human expertise.</p>
            </div>
            <div className="bk-cx-photo bk-reveal">
              <img src="/services/banking/Customer Experience.jpg" alt="Service professional providing assisted customer support in a banking operations context" loading="lazy" decoding="async" />
              <div className="bk-cx-photo-tint" />
            </div>
          </div>
          <div className="bk-cx-grid bk-reveal">
            {cxOps.map((g, i) => (
              <article key={g.title} className="bk-cx-card">
                <div className="bk-cx-card-top">
                  <span className="bk-cx-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{g.title}</h3>
                </div>
                <ul className="bk-cx-list">
                  {g.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <style>{`
          .bk-cx { position: relative; overflow: hidden; background: linear-gradient(180deg, #0B1220 0%, #0E1E38 100%); }
          .bk-cx-wrap { position: relative; z-index: 1; max-width: 1400px; width: 100%; margin: 0 auto; padding: clamp(88px, 10vw, 140px) 40px; }
          .bk-cx-hero { display: grid; grid-template-columns: 1.1fr 1fr; gap: clamp(36px, 5vw, 80px); align-items: center; }
          .bk-cx-kicker { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #C6F135; margin: 0 0 16px; font-variant-numeric: tabular-nums; }
          .bk-cx-title { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(40px, 5vw, 56px); font-weight: 700; line-height: 1.06; letter-spacing: -0.02em; color: #ffffff; margin: 0; }
          .bk-cx-title span { color: #C6F135; }
          .bk-cx-lede { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(19px, 1.9vw, 23px); font-weight: 700; color: #ffffff; margin: 26px 0 18px; }
          .bk-cx-para { font-size: clamp(15.5px, 1.35vw, 18px); line-height: 1.85; color: #93A0B0; margin: 0 0 12px; max-width: 560px; }
          .bk-cx-photo { position: relative; overflow: hidden; border-radius: 22px; aspect-ratio: 4 / 3.4; max-height: 520px; box-shadow: 0 34px 70px -40px rgba(0,0,0,0.5); }
          .bk-cx-photo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
          .bk-cx-photo-tint { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(11,18,32,0) 30%, rgba(11,18,32,0.55) 100%), linear-gradient(200deg, rgba(198,232,74,0.10) 0%, rgba(11,18,32,0) 45%); }
          .bk-cx-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: clamp(56px, 6vw, 88px); }
          .bk-cx-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(147,160,176,0.2); border-radius: 18px; padding: 26px 24px; transition: background 0.3s ease, border-color 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1); }
          .bk-cx-card:hover { background: rgba(255,255,255,0.07); border-color: rgba(198,241,53,0.4); transform: translateY(-4px); }
          .bk-cx-card-top { display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 20px; }
          .bk-cx-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.18em; color: #C6F135; margin-bottom: 12px; font-variant-numeric: tabular-nums; }
          .bk-cx-card h3 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 17px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #ffffff; margin: 0; }
          .bk-cx-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid rgba(147,160,176,0.18); }
          .bk-cx-list li { display: flex; align-items: flex-start; gap: 10px; padding: 12px 0; border-bottom: 1px solid rgba(147,160,176,0.14); font-size: 14.5px; line-height: 1.4; color: rgba(196,211,231,0.85); }
          .bk-cx-list li:last-child { border-bottom: 0; }
          .bk-cx-list li::before { content: ""; width: 6px; height: 6px; flex: 0 0 auto; border-radius: 50%; background: #C6F135; margin-top: 6px; box-shadow: 0 0 10px rgba(198,241,53,0.55); }
          @media (max-width: 1080px) {
            .bk-cx-grid { grid-template-columns: 1fr 1fr; }
          }
          @media (max-width: 900px) {
            .bk-cx-hero { grid-template-columns: 1fr; gap: 40px; }
            .bk-cx-photo { aspect-ratio: 4 / 3; max-height: 460px; }
          }
          @media (max-width: 640px) {
            .bk-cx-wrap { padding: 72px 20px; }
            .bk-cx-grid { grid-template-columns: 1fr; }
          }
        `}</style>
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
          <div className="bk-s08-grid bk-reveal">
            {outcomes.map((o, i) => (
              <article key={o.word} className={`bk-s08-card${i === 0 ? " bk-s08-card--dark" : ""}`}>
                <div className="bk-s08-body">
                  <p className="bk-s08-eyebrow">{o.num} / {o.word}</p>
                  <h3 className="bk-s08-title">{o.sub}</h3>
                  <p className="bk-s08-desc">{o.desc}</p>
                </div>
                <div className="bk-s08-media">
                  <img src={outcomeImages[i]} alt={o.sub} loading="lazy" decoding="async" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* S09 — OPERATING MODEL: Sytrion Model stack (healthcare design)    */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="bk-s09">
        <div className="bk-wrap">
          <div className="bk-head bk-reveal">
            <BkLabel text="Operating Model" />
            <h2 className="bk-h2">One connected banking <span style={{ color: "#C6E84A" }}>operating model.</span></h2>
          </div>
          <div className="bk-s09-stack bk-reveal">
            {modelLayers.map((layer) => (
              <div key={layer.num} className="bk-s09-layer">
                <span className="bk-s09-layer-num">{layer.num}</span>
                <span className="bk-s09-layer-name">{layer.name}</span>
                <span className="bk-s09-layer-items">{layer.items.join(" • ")}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* S09A — ADVANTAGES: Why Sytrion cards (healthcare design)          */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="bk-s09a">
        <div className="bk-wrap">
          <div className="bk-head bk-reveal">
            <BkLabel text="Advantages" light />
            <h2 className="bk-h2">Banking understanding. <span style={{ color: "#C6E84A" }}>Intelligent execution.</span></h2>
          </div>
          <div className="bk-s09a-grid bk-reveal">
            {whyPoints.map((w, i) => (
              <article key={w.num} className="bk-s09a-card">
                <div className="bk-s09a-head">
                  <div className="bk-s09a-icon" aria-hidden="true">
                    <img src={whyImages[i]} alt="" width="52" height="52" loading="lazy" decoding="async" />
                  </div>
                  <div className="bk-s09a-head-text">
                    <span className="bk-s09a-num">{w.num}</span>
                    <h3>{w.name}</h3>
                  </div>
                </div>
                <p>{w.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* S10 — TRANSFORM + FINAL CTA: one section, two separate blocks    */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="bk-s10">
        <div className="bk-tf">
          <div className="bk-tf-grid bk-reveal">
            <div className="bk-tf-left">
              <span className="bk-tf-badge">Transformation in Action</span>
              <div className="bk-tl-step">
                <span className="bk-tl-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </span>
                <div className="bk-tl-body">
                  <h3>The Challenge</h3>
                  <p>Banking operations can involve high transaction volumes, fragmented systems, document-intensive workflows, repetitive validations and significant exception handling.</p>
                </div>
              </div>
              <div className="bk-tl-link" aria-hidden="true" />
              <div className="bk-tl-step bk-tl-step--approach">
                <span className="bk-tl-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </span>
                <div className="bk-tl-body">
                  <h3>The Approach</h3>
                  <p>Combine banking-domain expertise with intelligent document processing, workflow automation, structured controls, AI and operational analytics.</p>
                </div>
              </div>
            </div>
            <div className="bk-pot-card">
              <h3 className="bk-pot-title">The Potential</h3>
              <ul className="bk-pot-checklist">
                <li><span className="bk-pot-tick" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12.5 9.5 18 20 6.5" stroke="#C6E84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span> Faster Processing</li>
                <li><span className="bk-pot-tick" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12.5 9.5 18 20 6.5" stroke="#C6E84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span> Reduced Manual Touchpoints</li>
                <li><span className="bk-pot-tick" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12.5 9.5 18 20 6.5" stroke="#C6E84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span> Improved Data Quality</li>
                <li><span className="bk-pot-tick" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12.5 9.5 18 20 6.5" stroke="#C6E84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span> Better Exception Visibility</li>
                <li><span className="bk-pot-tick" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12.5 9.5 18 20 6.5" stroke="#C6E84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span> More Scalable Operations</li>
              </ul>
              <Link href="/contact" className="bk-transform-cta">Discuss Your Use Case <span>→</span></Link>
            </div>
          </div>
        </div>
        <div className="bk-final">
          <div className="bk-final-glow" aria-hidden="true" />
          <div className="bk-final-inner bk-reveal">
            <span className="bk-final-eyebrow">Let&apos;s Build Banking That Works Smarter</span>
            <h2 className="bk-final-h2">Ready to transform your <span style={{ color: "#C6E84A" }}>banking operations?</span></h2>
            <p className="bk-final-body">From onboarding, lending and payments to compliance, finance and AI, Sytrion can help create connected operations designed for greater speed, accuracy and control.</p>
            <div className="bk-final-ctas">
              <Link href="/contact" className="bk-s10-cta bk-s10-cta-primary">Talk to Our Banking Experts ↗</Link>
              <Link href="/contact" className="bk-s10-cta bk-s10-cta-ghost">Schedule a Consultation</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
