"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ibsTabs = [
  {
    tab: "BOOKING",
    num: "01",
    title: "Booking & Shipment Processing",
    tagline: "Move shipments forward with greater speed and control.",
    items: [
      "Booking creation & validation",
      "Shipment data processing",
      "Schedule & routing updates",
      "Shipment status management",
      "Exception handling",
    ],
    image: "/services/Booking & Shipment Processing.jpg",
  },
  {
    tab: "DOCUMENTATION",
    num: "02",
    title: "Documentation",
    tagline: "Simplify document-intensive shipping operations.",
    items: [
      "Shipping instructions",
      "Bill of Lading processing",
      "Arrival documentation",
      "Document validation & amendments",
      "Proof of Delivery processing",
    ],
    image: "/services/Documentation.jpg",
  },
  {
    tab: "FREIGHT DATA",
    num: "03",
    title: "Freight Data",
    tagline: "Create reliable data across the shipment lifecycle.",
    items: [
      "Freight data capture",
      "Rate & tariff maintenance",
      "Master data management",
      "Data validation",
      "Shipment reconciliation",
    ],
    image: "/services/Freight Data.jpg",
  },
  {
    tab: "TRADE",
    num: "04",
    title: "Customs & Trade",
    tagline: "Improve the flow of information supporting international trade.",
    items: [
      "Trade documentation support",
      "Data extraction & validation",
      "Document completeness checks",
      "Compliance data preparation",
      "Exception processing",
    ],
    image: "/services/Customs & Trade (2).jpg",
  },
  {
    tab: "CUSTOMER OPS",
    num: "05",
    title: "Customer Operations",
    tagline: "Keep customers informed and operations moving.",
    items: [
      "Shipment tracking support",
      "Customer queries",
      "Operational exceptions",
      "Email & workflow management",
      "Service request processing",
    ],
  },
  {
    tab: "INSIGHTS",
    num: "06",
    title: "Analytics & Insights",
    tagline: "Turn operational activity into actionable intelligence.",
    items: [
      "Performance dashboards",
      "Volume reporting",
      "Turnaround-time analysis",
      "Exception trends",
      "Operational insights",
    ],
    image: "/services/Analytics & Insights.jpg",
  },
];

const faCapabilities = [
  {
    title: "ORDER-TO-CASH",
    items: [
      "Billing & invoicing",
      "Accounts receivable",
      "Cash application",
      "Collections support",
      "Dispute management",
    ],
  },
  {
    title: "PROCURE-TO-PAY",
    items: [
      "Vendor invoice processing",
      "Freight invoice validation",
      "Accounts payable",
      "Vendor reconciliation",
      "Payment support",
    ],
  },
  {
    title: "RECORD-TO-REPORT",
    items: [
      "General ledger support",
      "Account reconciliation",
      "Journal processing",
      "Month-end support",
      "Management reporting",
    ],
  },
  {
    title: "FREIGHT AUDIT & REVENUE ASSURANCE",
    items: [
      "Freight charge validation",
      "Rate & surcharge verification",
      "Billing discrepancy identification",
      "Revenue leakage analysis",
      "Exception management",
    ],
  },
];

const aiCapabilities = [
  { name: "Document Intelligence", verbs: "Extract • Classify • Validate" },
  { name: "Workflow Automation", verbs: "Route • Process • Update" },
  { name: "Exception Intelligence", verbs: "Detect • Prioritize • Resolve" },
  { name: "Reconciliation Intelligence", verbs: "Match • Validate • Flag" },
  { name: "AI-Assisted Operations", verbs: "Summarize • Assist • Decide" },
  { name: "Decision Intelligence", verbs: "Measure • Analyze • Improve" },
];

const outcomes = [
  {
    num: "01",
    word: "FASTER",
    sub: "Faster processing",
    desc: "Streamlined workflows reduce unnecessary handoffs and processing delays.",
  },
  {
    num: "02",
    word: "ACCURATE",
    sub: "Greater accuracy",
    desc: "Structured validation and automation improve operational and financial data quality.",
  },
  {
    num: "03",
    word: "EFFICIENT",
    sub: "Lower cost-to-serve",
    desc: "Intelligent workflows enable leaner, more scalable operations.",
  },
  {
    num: "04",
    word: "VISIBLE",
    sub: "Better visibility",
    desc: "Connected reporting provides greater transparency into performance and exceptions.",
  },
  {
    num: "05",
    word: "SCALABLE",
    sub: "Built for changing volumes",
    desc: "Flexible operations adapt as transaction volumes and business requirements evolve.",
  },
];

const modelLayers = [
  {
    num: "01",
    name: "CLIENT ECOSYSTEM",
    items: ["TMS", "ERP", "CRM", "Portals", "Documents", "Emails", "Financial Systems"],
  },
  {
    num: "02",
    name: "SYTRION INTELLIGENCE LAYER",
    items: ["AI", "AUTOMATION", "DOCUMENT INTELLIGENCE", "ANALYTICS"],
  },
  {
    num: "03",
    name: "INTELLIGENT OPERATIONS",
    items: ["Bookings", "Documentation", "Freight Data", "Customer Ops", "F&A"],
  },
  {
    num: "04",
    name: "BUSINESS OUTCOMES",
    items: ["SPEED", "ACCURACY", "VISIBILITY", "CONTROL", "EFFICIENCY"],
  },
];

const whyColumns = [
  { num: "01", title: "Domain-led", desc: "Solutions designed around real shipping and logistics workflows." },
  { num: "02", title: "AI-first", desc: "Intelligence applied where it creates measurable operational value." },
  { num: "03", title: "Human + Digital", desc: "Technology and skilled professionals working as one operating model." },
  { num: "04", title: "Built to Scale", desc: "Flexible delivery aligned with changing business volumes." },
  { num: "05", title: "Secure by Design", desc: "Security, confidentiality and governance embedded into operations." },
];

const ecosystemTiles = [
  {
    num: "01",
    title: "Ocean Shipping",
    desc: "Operational, documentation and finance support across complex global shipping environments.",
    image: "/services/Ocean Shipping.jpg",
  },
  {
    num: "02",
    title: "Freight Forwarding",
    desc: "Intelligent support across booking, documentation, freight data, billing and shipment workflows.",
    image: "/services/Freight Forwarding.png",
  },
  {
    num: "03",
    title: "3PL & Logistics",
    desc: "Scalable operational and financial services supporting high-volume logistics networks.",
    image: "/services/3PL & Logistics.jpg",
  },
  {
    num: "04",
    title: "Customs & Trade",
    desc: "Document-intensive operational support for efficient international trade workflows.",
    image: "/services/Customs & Trade.jpg",
  },
];

function SectionLabel({ num, text, dark }: { num: string; text: string; dark?: boolean }) {
  return (
    <span className={`sl-label${dark ? " sl-label--dark" : ""}`}>
      <span className="sl-label-num">{num}</span>
      <span className="sl-label-bar" aria-hidden="true" />
      <span>{text}</span>
    </span>
  );
}

function ArrowUpRight() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export default function ShippingLogisticsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".sl-reveal"));
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("sl-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sl-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const last = ibsTabs.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = activeTab === last ? 0 : activeTab + 1;
    else if (e.key === "ArrowLeft") next = activeTab === 0 ? last : activeTab - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      setActiveTab(next);
      tabRefs.current[next]?.focus();
    }
  };

  const active = ibsTabs[activeTab];

  return (
    <div className="sl-page">
      <style>{`
        .sl-page { background: #ffffff; color: #16181d; font-family: var(--font-geist-sans), Arial, Helvetica, sans-serif; overflow-x: clip; }
        .sl-page h1, .sl-page h2, .sl-page h3 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; }
        .sl-wrap { max-width: 1240px; margin: 0 auto; padding: 0 32px; }

        .sl-label { display: inline-flex; align-items: center; gap: 12px; font-size: 13px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #16181d; margin-bottom: 22px; }
        .sl-label-num { color: #7AA306; font-variant-numeric: tabular-nums; }
        .sl-label-bar { width: 34px; height: 2px; background: #C6E84A; display: inline-block; }
        .sl-label--dark { color: rgba(255,255,255,0.85); }

        .sl-h2 { font-size: clamp(30px, 4.2vw, 48px); font-weight: 700; letter-spacing: -0.02em; line-height: 1.14; margin: 0 0 20px; }
        .sl-lead { font-size: clamp(16px, 1.35vw, 18px); line-height: 1.75; color: #5A5D66; max-width: 62ch; }
        .sl-lead--dark { color: rgba(255,255,255,0.66); }

        .sl-reveal { opacity: 0; transform: translateY(26px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .sl-reveal.sl-in { opacity: 1; transform: none; }

        /* ── 01 HERO ── */
        .sl-hero { position: relative; height: 100vh; height: 100dvh; min-height: 600px; background: #0A1424; overflow: hidden; isolation: isolate; }
        .sl-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: right center; z-index: -2; }
        .sl-hero-overlay { position: absolute; inset: 0; z-index: -1; background:
          linear-gradient(90deg, rgba(5,10,20,0.96) 0%, rgba(5,10,20,0.88) 28%, rgba(5,10,20,0.55) 55%, rgba(5,10,20,0.14) 82%, rgba(5,10,20,0.06) 100%),
          linear-gradient(180deg, rgba(5,10,20,0.32) 0%, rgba(5,10,20,0) 34%, rgba(5,10,20,0.48) 100%); }
        .sl-hero-content { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; z-index: 1; padding: 100px clamp(24px, 8vw, 120px) 0; max-width: 1440px; margin: 0 auto; left: 0; right: 0; }
        .sl-hero-eyebrow { display: inline-block; background: var(--color-primary); color: var(--color-offblack); padding: 8px 20px; border-radius: 999px; font-size: 13px; font-weight: 700; letter-spacing: 0.14em; margin-bottom: 28px; }
        .sl-hero h1 { font-size: clamp(38px, 5.6vw, 68px); font-weight: 700; letter-spacing: -0.03em; line-height: 1.06; color: #ffffff; margin: 0 0 26px; max-width: 780px; text-wrap: balance; }
        .sl-hero-sub { font-size: clamp(17px, 1.6vw, 21px); font-weight: 600; line-height: 1.55; color: rgba(255,255,255,0.92); margin: 0 0 18px; max-width: 640px; }
        .sl-hero-body { font-size: 16px; line-height: 1.75; color: rgba(255,255,255,0.68); margin: 0 0 38px; max-width: 520px; }
        .sl-hero-ctas { display: flex; flex-wrap: wrap; gap: 16px; }
        .sl-float-words { position: absolute; left: auto !important; top: auto !important; right: clamp(120px, 20vw, 420px) !important; bottom: clamp(48px, 7vh, 110px) !important; z-index: 2; display: flex; flex-direction: row; align-items: center; gap: clamp(14px, 1.8vw, 28px); pointer-events: none; flex-wrap: wrap; }
        .sl-float-word { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-weight: 700; font-size: clamp(11px, 1.0vw, 18px); letter-spacing: 0.22em; color: transparent; -webkit-text-stroke: 1px rgba(198,232,74,0.85); white-space: nowrap; text-shadow: 0 0 12px rgba(198,232,74,0.25); }
        .sl-float-dot { color: rgba(255,255,255,0.55); font-size: 14px; line-height: 0; }

        /* ── section rhythm ── */
        .sl-section { padding: clamp(76px, 9vw, 128px) 0; }

        /* ── 02 LANDSCAPE ── */
        .sl-land-grid { display: grid; grid-template-columns: 42% 1fr; gap: clamp(40px, 6vw, 96px); align-items: start; }
        .sl-land-copy p { font-size: 16px; line-height: 1.8; color: #5A5D66; margin: 0 0 18px; }
        .sl-land-figure { margin: 34px 0 0; border-radius: 20px; overflow: hidden; aspect-ratio: 4 / 5; max-width: 420px; }
        .sl-land-figure img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .sl-challenge-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; column-gap: clamp(28px, 4vw, 56px); }
        .sl-challenge-item { border-top: 1px solid rgba(0,0,0,0.1); padding: 22px 4px; display: flex; gap: 16px; align-items: baseline; transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease; }
        .sl-challenge-item:hover { transform: translateY(-4px); border-top-color: #C6E84A; }
        .sl-challenge-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-weight: 700; font-size: 14px; color: #7AA306; font-variant-numeric: tabular-nums; }
        .sl-challenge-name { font-size: clamp(16px, 1.4vw, 19px); font-weight: 600; color: #16181d; }
        .sl-closing { margin-top: 40px; border-left: 3px solid #C6E84A; background: #F5F6F0; padding: 22px 28px; font-size: clamp(16px, 1.5vw, 19px); font-weight: 600; line-height: 1.6; color: #16181d; border-radius: 0 14px 14px 0; }

        /* ── 03 ECOSYSTEM ── */
        .sl-eco { background: #0B1220; color: #ffffff; }
        .sl-eco-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-top: 56px; }
        .sl-tile { position: relative; border-radius: 18px; overflow: hidden; aspect-ratio: 4 / 5; background: #101a2c; }
        .sl-tile img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .sl-tile-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(6,12,24,0.05) 30%, rgba(6,12,24,0.82) 100%); transition: background 0.4s ease; }
        .sl-tile:hover img { transform: scale(1.06); }
        .sl-tile:hover .sl-tile-overlay { background: linear-gradient(180deg, rgba(6,12,24,0.25) 0%, rgba(6,12,24,0.92) 100%); }
        .sl-tile-body { position: absolute; left: 0; right: 0; bottom: 0; padding: 28px; }
        .sl-tile-num { font-size: 13px; font-weight: 700; letter-spacing: 0.14em; color: #C6E84A; }
        .sl-tile-title { font-size: clamp(21px, 1.7vw, 26px); font-weight: 700; margin: 6px 0 0; color: #ffffff; }
        .sl-tile-desc { font-size: 14px; line-height: 1.65; color: rgba(255,255,255,0.75); margin: 10px 0 0; opacity: 0; transform: translateY(12px); transition: opacity 0.45s ease, transform 0.45s cubic-bezier(0.16,1,0.3,1); }
        .sl-tile:hover .sl-tile-desc, .sl-tile:focus-within .sl-tile-desc { opacity: 1; transform: none; }

        /* ── 04 IBS ── */
        .sl-ibs { background: #F7F8F4; }
        .sl-tabs { display: flex; gap: 8px; margin: 46px 0 0; padding-bottom: 14px; border-bottom: 1px solid rgba(0,0,0,0.1); overflow-x: auto; scrollbar-width: none; }
        .sl-tabs::-webkit-scrollbar { display: none; }
        .sl-tab { flex: 0 0 auto; background: transparent; border: 1.5px solid transparent; border-radius: 999px; padding: 11px 22px; font-size: 13px; font-weight: 700; letter-spacing: 0.1em; color: #5A5D66; cursor: pointer; white-space: nowrap; transition: color 0.25s ease, background 0.25s ease, border-color 0.25s ease; }
        .sl-tab:hover { color: #16181d; }
        .sl-tab[aria-selected="true"] { background: var(--color-offblack); color: #C6E84A; border-color: var(--color-offblack); }
        .sl-panel { display: grid; grid-template-columns: 1.05fr 1fr; gap: clamp(32px, 5vw, 72px); margin-top: 44px; align-items: stretch; }
        .sl-panel-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 15px; font-weight: 700; color: #7AA306; letter-spacing: 0.12em; }
        .sl-panel-title { font-size: clamp(24px, 2.6vw, 34px); font-weight: 700; letter-spacing: -0.015em; margin: 10px 0 8px; }
        .sl-panel-tagline { font-style: italic; font-size: 16px; color: #5A5D66; margin: 0 0 24px; }
        .sl-panel-list { list-style: none; margin: 0; padding: 0; }
        .sl-panel-list li { display: flex; align-items: baseline; gap: 14px; padding: 13px 0; border-top: 1px solid rgba(0,0,0,0.08); font-size: 15.5px; color: #33363d; }
        .sl-panel-list li::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: #C6E84A; box-shadow: 0 0 0 3px rgba(198,232,74,0.25); flex: 0 0 auto; align-self: center; }
        .sl-panel-visual { position: relative; border-radius: 20px; overflow: hidden; min-height: 380px; }
        .sl-panel-visual img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; }
        .sl-panel-visual::after { content: ""; position: absolute; inset: 0; background: linear-gradient(200deg, rgba(6,12,24,0) 40%, rgba(6,12,24,0.55) 100%); }

        /* ── 05 F&A ── */
        .sl-fa { position: relative; background: #0A1930; color: #ffffff; overflow: hidden; isolation: isolate; }
        .sl-fa-bg { position: absolute; right: 0; top: 0; width: 58%; height: 100%; object-fit: cover; opacity: 0.24; z-index: -1; mask-image: linear-gradient(90deg, transparent 0%, #000 45%); -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 45%); }
        .sl-fa-grid-wrap { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: clamp(40px, 5vw, 80px); align-items: start; }
        .sl-fa-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .sl-fa-card { background: rgba(255,255,255,0.045); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 26px 24px; backdrop-filter: blur(4px); transition: border-color 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1); }
        .sl-fa-card:hover { border-color: rgba(198,232,74,0.55); transform: translateY(-4px); }
        .sl-fa-card-title { font-size: 14px; font-weight: 700; letter-spacing: 0.12em; color: #C6E84A; margin: 0 0 14px; min-height: 34px; }
        .sl-fa-card ul { list-style: none; margin: 0; padding: 0; }
        .sl-fa-card li { font-size: 14.5px; color: rgba(255,255,255,0.78); padding: 7px 0; border-top: 1px solid rgba(255,255,255,0.08); }
        .sl-fa-card li:first-child { border-top: none; }
        .sl-capital-strip { margin-top: 26px; grid-column: 1 / -1; border: 1px solid rgba(198,232,74,0.35); background: rgba(198,232,74,0.06); border-radius: 16px; padding: 22px 28px; display: flex; flex-wrap: wrap; align-items: center; gap: 12px 28px; }
        .sl-capital-title { font-size: 13.5px; font-weight: 700; letter-spacing: 0.14em; color: #C6E84A; }
        .sl-capital-items { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; font-size: 14.5px; color: rgba(255,255,255,0.85); }
        .sl-capital-pipe { color: rgba(198,232,74,0.6); }

        /* ── 06 AI ── */
        .sl-ai { background: #05070D; color: #ffffff; position: relative; overflow: hidden; }
        .sl-ai-core-zone { display: grid; grid-template-columns: 1fr minmax(300px, 460px) 1fr; gap: clamp(20px, 3vw, 44px); align-items: center; margin-top: 60px; }
        .sl-ai-col { display: flex; flex-direction: column; gap: clamp(28px, 4vh, 52px); }
        .sl-ai-col--right { align-items: flex-start; }
        .sl-ai-col--left { align-items: flex-end; }
        .sl-ai-card { position: relative; background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 18px 22px; max-width: 320px; transition: border-color 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1); }
        .sl-ai-card:hover { border-color: rgba(103,232,249,0.5); transform: translateY(-3px); }
        .sl-ai-card-name { font-size: 15.5px; font-weight: 700; color: #ffffff; }
        .sl-ai-card-verbs { font-size: 12.5px; letter-spacing: 0.08em; color: #67E8F9; margin-top: 6px; }
        .sl-ai-card::after { content: ""; position: absolute; top: 50%; width: clamp(16px, 2.4vw, 40px); height: 2px; background-image: repeating-linear-gradient(90deg, rgba(103,232,249,0.7) 0 5px, transparent 5px 11px); background-size: 11px 2px; }
        .sl-ai-col--left .sl-ai-card::after { right: -1px; transform: translateX(100%); }
        .sl-ai-col--right .sl-ai-card::after { left: -1px; transform: translateX(-100%); }
        .sl-ai-core { position: relative; aspect-ratio: 1 / 1; width: 100%; max-width: 460px; justify-self: center; }
        .sl-ai-core svg { width: 100%; height: 100%; display: block; }
        .sl-orbit { transform-origin: 250px 250px; animation: slSpin 60s linear infinite; }
        .sl-orbit--rev { animation-direction: reverse; animation-duration: 80s; }

        /* ── 07 OUTCOMES ── */
        .sl-outcome { display: grid; grid-template-columns: auto 1fr; column-gap: clamp(24px, 4vw, 64px); padding: clamp(30px, 4vw, 48px) 0; border-top: 1px solid rgba(0,0,0,0.09); align-items: baseline; }
        .sl-outcome:last-child { border-bottom: 1px solid rgba(0,0,0,0.09); }
        .sl-outcome-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 15px; font-weight: 700; color: #7AA306; letter-spacing: 0.1em; white-space: nowrap; }
        .sl-outcome-word { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(40px, 7vw, 88px); font-weight: 700; letter-spacing: -0.03em; line-height: 1; color: #16181d; margin: 0; }
        .sl-outcome-sub { display: block; font-size: clamp(16px, 1.6vw, 20px); font-style: italic; font-weight: 500; color: #33363d; margin-top: 10px; }
        .sl-outcome-desc { font-size: 15.5px; line-height: 1.7; color: #5A5D66; max-width: 52ch; margin: 14px 0 0; }

        /* ── 08 MODEL ── */
        .sl-model { background: #081020; color: #ffffff; }
        .sl-model-stack { max-width: 980px; margin: 56px auto 0; display: flex; flex-direction: column; align-items: stretch; }
        .sl-layer { border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 24px clamp(20px, 3vw, 36px); background: rgba(255,255,255,0.03); display: grid; grid-template-columns: minmax(200px, 0.85fr) 1.15fr; gap: 14px 32px; align-items: center; transition: border-color 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1); }
        .sl-layer:hover { border-color: rgba(103,232,249,0.45); transform: translateY(-3px); }
        .sl-layer--core { border-color: rgba(198,232,74,0.5); background: linear-gradient(135deg, rgba(198,232,74,0.08), rgba(103,232,249,0.05)); }
        .sl-layer-head { display: flex; align-items: baseline; gap: 14px; }
        .sl-layer-num { font-size: 13px; font-weight: 700; color: #67E8F9; letter-spacing: 0.12em; }
        .sl-layer--core .sl-layer-num { color: #C6E84A; }
        .sl-layer-name { font-size: clamp(15px, 1.5vw, 19px); font-weight: 700; letter-spacing: 0.06em; }
        .sl-layer-items { display: flex; flex-wrap: wrap; row-gap: 8px; font-size: 14px; color: rgba(255,255,255,0.8); }
        .sl-layer-pipe { color: rgba(103,232,249,0.55); padding: 0 10px; }
        .sl-layer--core .sl-layer-pipe { color: rgba(198,232,74,0.6); }
        .sl-flow { align-self: center; height: 44px; width: 2px; background-image: repeating-linear-gradient(180deg, rgba(103,232,249,0.85) 0 6px, transparent 6px 14px); background-size: 2px 14px; animation: slFlowDown 1.1s linear infinite; }

        /* ── 09 WHY ── */
        .sl-why-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: clamp(20px, 2.6vw, 36px); margin-top: 54px; }
        .sl-why-col { border-top: 2px solid rgba(0,0,0,0.12); padding-top: 22px; transition: border-color 0.3s ease; }
        .sl-why-col:hover { border-top-color: #C6E84A; }
        .sl-why-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 700; color: #7AA306; }
        .sl-why-title { font-size: clamp(17px, 1.5vw, 20px); font-weight: 700; margin: 10px 0 10px; }
        .sl-why-desc { font-size: 14.5px; line-height: 1.7; color: #5A5D66; margin: 0; }

        /* ── 10 TRANSFORMATION ── */
        .sl-trans { display: grid; grid-template-columns: 1fr 1fr; min-height: 640px; }
        .sl-trans-media { position: relative; min-height: 380px; }
        .sl-trans-media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .sl-trans-media::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(6,12,24,0.05) 60%, rgba(6,12,24,0.4) 100%); }
        .sl-trans-body { background: #ffffff; display: flex; flex-direction: column; justify-content: center; padding: clamp(48px, 6vw, 96px) clamp(28px, 6vw, 96px); }
        .sl-trans-block { margin-top: 26px; }
        .sl-trans-block-title { font-size: 13px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #7AA306; margin: 0 0 8px; }
        .sl-trans-block p { font-size: 15.5px; line-height: 1.75; color: #44474e; margin: 0; }
        .sl-trans-block ul { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 10px 24px; }
        .sl-trans-block li { display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 600; color: #16181d; }
        .sl-trans-block li::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: #C6E84A; box-shadow: 0 0 0 3px rgba(198,232,74,0.25); flex: 0 0 auto; }
        .sl-trans-cta { margin-top: 36px; }

        /* ── 11 FINAL CTA ── */
        .sl-final { position: relative; background: #071120; color: #ffffff; overflow: hidden; isolation: isolate; }
        .sl-final-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 68%; z-index: -2; }
        .sl-final-overlay { position: absolute; inset: 0; z-index: -1; background: linear-gradient(180deg, rgba(7,17,32,0.86) 0%, rgba(7,17,32,0.72) 45%, rgba(7,17,32,0.92) 100%); }
        .sl-final-inner { text-align: center; max-width: 780px; margin: 0 auto; }
        .sl-final .sl-label { justify-content: center; width: 100%; }
        .sl-final h2 { font-size: clamp(32px, 4.6vw, 54px); font-weight: 700; letter-spacing: -0.025em; line-height: 1.12; margin: 0 0 20px; }
        .sl-final-body { font-size: clamp(16px, 1.4vw, 18px); line-height: 1.75; color: rgba(255,255,255,0.72); margin: 0 auto 40px; max-width: 60ch; }
        .sl-final-ctas { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; }

        /* ── animations ── */
        @keyframes slFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes slFlowDown { to { background-position-y: 14px; } }
        @keyframes slSpin { to { transform: rotate(360deg); } }
        @keyframes slDash { to { background-position-x: 11px; } }
        .sl-float-word { animation: slFloat 7s ease-in-out infinite; }
        .sl-float-word:nth-child(3n) { animation-delay: -2.4s; }
        .sl-ai-card::after { animation: slDash 0.9s linear infinite; }

        @media (hover: none) {
          .sl-tile-desc { opacity: 1; transform: none; }
        }

        @media (max-width: 1080px) {
          .sl-why-grid { grid-template-columns: repeat(3, 1fr); }
          .sl-ai-core-zone { grid-template-columns: 1fr; }
          .sl-ai-col--left { order: 2; align-items: stretch; }
          .sl-ai-col--right { order: 3; align-items: stretch; }
          .sl-ai-core { order: 1; max-width: 340px; }
          .sl-ai-card { max-width: none; }
          .sl-ai-card::after { display: none; }
        }

        @media (max-width: 900px) {
          .sl-land-grid { grid-template-columns: 1fr; }
          .sl-land-figure { max-width: 520px; aspect-ratio: 3 / 2; }
          .sl-eco-grid { grid-template-columns: 1fr 1fr; }
          .sl-panel { grid-template-columns: 1fr; }
          .sl-panel-visual { min-height: 260px; }
          .sl-float-words { bottom: clamp(28px, 4.5vh, 64px) !important; top: auto !important; gap: 12px; right: clamp(96px, 14vw, 300px) !important; }
          .sl-float-word { font-size: clamp(10px, 1.1vw, 16px); -webkit-text-stroke: 1px rgba(198,232,74,0.8); }
          .sl-fa-grid-wrap { grid-template-columns: 1fr; }
          .sl-fa-bg { width: 100%; mask-image: linear-gradient(180deg, transparent 0%, #000 60%); -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 60%); }
          .sl-trans { grid-template-columns: 1fr; }
          .sl-layer { grid-template-columns: 1fr; }
        }

        @media (max-width: 640px) {
          .sl-challenge-list { grid-template-columns: 1fr; }
          .sl-eco-grid { grid-template-columns: 1fr; }
          .sl-fa-cards { grid-template-columns: 1fr; }
          .sl-why-grid { grid-template-columns: 1fr; }
          .sl-trans-block ul { grid-template-columns: 1fr; }
          .sl-float-words { right: 32px !important; bottom: 18px !important; top: auto !important; gap: 8px; }
          .sl-float-word { font-size: 10px; letter-spacing: 0.18em; -webkit-text-stroke: 1px rgba(198,232,74,0.85); }
          .sl-hero-content { padding: 120px 24px 90px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .sl-reveal { opacity: 1; transform: none; transition: none; }
          .sl-float-word, .sl-flow, .sl-orbit, .sl-orbit--rev, .sl-ai-card::after { animation: none; }
          .sl-tile img, .sl-tile-desc, .sl-challenge-item, .sl-fa-card, .sl-ai-card, .sl-layer, .sl-why-col { transition: none; }
          html { scroll-behavior: auto; }
        }
      `}</style>

      {/* ══════════ 01 HERO ══════════ */}
      <section className="sl-hero">
        <img src="/services/slhero.png" alt="" className="sl-hero-img" fetchPriority="high" />
        <div className="sl-hero-overlay" aria-hidden="true" />
        <div className="sl-float-words" aria-hidden="true">
          <span className="sl-float-word">OPERATIONS</span>
          <span className="sl-float-dot">·</span>
          <span className="sl-float-word">INTELLIGENCE</span>
          <span className="sl-float-dot">·</span>
          <span className="sl-float-word">TRANSFORMATION</span>
        </div>
        <div className="sl-hero-content">
          <span className="sl-hero-eyebrow">SHIPPING &amp; LOGISTICS</span>
            <h1>Intelligent operations for a world in motion.</h1>
            <p className="sl-hero-sub">
              Transforming shipping and logistics operations through domain expertise, AI, automation and data
              intelligence.
            </p>
            <p className="sl-hero-body">
              From shipment documentation and freight operations to finance and accounting, Sytrion helps logistics
              enterprises simplify complexity, improve accuracy and build scalable, future-ready operations.
            </p>
            <div className="sl-hero-ctas">
              <Link href="#ibs" className="btn-primary">
                Explore Our Capabilities ↓
              </Link>
              <Link href="/contact" className="btn-secondary">
                Talk to Our Experts ↗
              </Link>
            </div>
        </div>
      </section>

      {/* ══════════ 02 LOGISTICS LANDSCAPE ══════════ */}
      <section className="sl-section">
        <div className="sl-wrap">
          <div className="sl-land-grid">
            <div className="sl-land-copy sl-reveal">
              <span className="eyebrow-badge">
            THE LOGISTICS LANDSCAPE
          </span>
              {/* <SectionLabel num="02" text="THE LOGISTICS LANDSCAPE" /> */}
              <h2 className="sl-h2">Complexity moves with <span style={{ color: "#C6E84A", whiteSpace: "nowrap" }}>every shipment.</span></h2>
              <p>
                &emsp;Global logistics connects carriers, customers, ports, customs authorities, agents, vendors and
                financial systems — creating thousands of operational and financial interactions behind every
                shipment.
              </p>
              <p>
                &emsp;Yet many of these processes still depend on fragmented systems, manual intervention and
                document-intensive workflows.
              </p>
             
            </div>
            <div className="sl-reveal">
              <ul className="sl-challenge-list">
                <li className="sl-challenge-item"><span className="sl-challenge-num">01.</span><span className="sl-challenge-name">High-volume documentation</span></li>
                <li className="sl-challenge-item"><span className="sl-challenge-num">02.</span><span className="sl-challenge-name">Fragmented operational data</span></li>
                <li className="sl-challenge-item"><span className="sl-challenge-num">03.</span><span className="sl-challenge-name">Complex freight billing</span></li>
                <li className="sl-challenge-item"><span className="sl-challenge-num">04.</span><span className="sl-challenge-name">Manual reconciliations</span></li>
                <li className="sl-challenge-item"><span className="sl-challenge-num">05.</span><span className="sl-challenge-name">Time-sensitive exceptions</span></li>
                <li className="sl-challenge-item"><span className="sl-challenge-num">06.</span><span className="sl-challenge-name">Growing cost pressures</span></li>
              </ul>
              <p className="sl-closing">
                We bring operations, technology and intelligence together to make complexity easier to manage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 03 ECOSYSTEM ══════════ */}
      <section className="sl-section sl-eco">
        <div className="sl-wrap">
          <div className="sl-reveal">
            <SectionLabel num="03" text="ACROSS THE LOGISTICS ECOSYSTEM" dark />
            <h2 className="sl-h2" style={{ color: "#ffffff", maxWidth: "18ch" }}>
              Built around the way global logistics actually works.
            </h2>
            <p className="sl-lead sl-lead--dark">
              From ocean shipping and freight forwarding to 3PL and trade operations, our solutions are designed
              around the processes that keep goods, information and money moving.
            </p>
          </div>
          <div className="sl-eco-grid">
            {ecosystemTiles.map((tile) => (
              <figure key={tile.num} className="sl-tile sl-reveal" style={{ margin: 0 }}>
                <img src={tile.image} alt="" loading="lazy" decoding="async" />
                <div className="sl-tile-overlay" aria-hidden="true" />
                <figcaption className="sl-tile-body">
                  <span className="sl-tile-num">{tile.num}</span>
                  <h3 className="sl-tile-title">{tile.title}</h3>
                  <p className="sl-tile-desc">{tile.desc}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 04 INTELLIGENT BUSINESS SERVICES ══════════ */}
      <section className="sl-section sl-ibs" id="ibs">
        <div className="sl-wrap">
          <div className="sl-reveal">
            <SectionLabel num="04" text="INTELLIGENT BUSINESS SERVICES" />
            <h2 className="sl-h2">From process execution to intelligent operations.</h2>
            <p className="sl-lead">
              Sytrion combines logistics domain expertise, standardized processes, automation and AI to help
              enterprises run high-volume operational workflows with greater speed, accuracy and control.
            </p>
          </div>

          <div className="sl-tabs sl-reveal" role="tablist" aria-label="Intelligent Business Services journey">
            {ibsTabs.map((t, i) => (
              <button
                key={t.tab}
                ref={(el) => { tabRefs.current[i] = el; }}
                role="tab"
                id={`sl-tab-${i}`}
                aria-selected={activeTab === i}
                aria-controls={`sl-panel-${i}`}
                tabIndex={activeTab === i ? 0 : -1}
                className="sl-tab"
                onClick={() => setActiveTab(i)}
                onKeyDown={onTabKeyDown}
              >
                {t.tab}
              </button>
            ))}
          </div>

          <div
            key={active.num}
            className="sl-panel sl-reveal sl-in"
            role="tabpanel"
            id={`sl-panel-${activeTab}`}
            aria-labelledby={`sl-tab-${activeTab}`}
          >
            <div>
              <span className="sl-panel-num">{active.num} —</span>
              <h3 className="sl-panel-title">{active.title}</h3>
              <p className="sl-panel-tagline">{active.tagline}</p>
              <ul className="sl-panel-list">
                {active.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="sl-panel-visual">
              <img
                src={active.image || "/solutions/Shipment Data Management.jpg"}
                alt={active.title}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 05 FINANCE & ACCOUNTING ══════════ */}
      <section className="sl-section sl-fa">
        <img src="/solutions/Invoice & Billing Operations.jpg" alt="" className="sl-fa-bg" loading="lazy" decoding="async" />
        <div className="sl-wrap">
          <div className="sl-fa-grid-wrap">
            <div className="sl-reveal">
              <SectionLabel num="05" text="FINANCE & ACCOUNTING" dark />
              <h2 className="sl-h2" style={{ color: "#ffffff" }}>Finance that understands freight.</h2>
              <p className="sl-lead sl-lead--dark">
                Shipping and logistics finance operates at the intersection of shipments, rates, vendors, customers,
                currencies and contracts. Sytrion brings logistics context and finance expertise together to build
                accurate, controlled and insight-driven financial operations.
              </p>
            </div>
            <div className="sl-reveal">
              <div className="sl-fa-cards">
                {faCapabilities.map((cap) => (
                  <div key={cap.title} className="sl-fa-card">
                    <h3 className="sl-fa-card-title">{cap.title}</h3>
                    <ul>
                      {cap.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="sl-capital-strip">
                  <span className="sl-capital-title">WORKING CAPITAL &amp; FINANCIAL INTELLIGENCE</span>
                  <span className="sl-capital-items">
                    {["Receivables Ageing", "DSO Visibility", "Cash Flow", "Margin Insights", "Management Dashboards"].map(
                      (item, i, arr) => (
                        <span key={item}>
                          {item}
                          {i < arr.length - 1 && <span className="sl-capital-pipe"> | </span>}
                        </span>
                      )
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 06 AI / AUTOMATION INTELLIGENCE ══════════ */}
      <section className="sl-section sl-ai">
        <div className="sl-wrap">
          <div className="sl-reveal" style={{ textAlign: "center" }}>
            <SectionLabel num="06" text="AI / AUTOMATION INTELLIGENCE" dark />
            <h2 className="sl-h2" style={{ color: "#ffffff", maxWidth: "22ch", marginLeft: "auto", marginRight: "auto" }}>
              Every process is an opportunity to work smarter.
            </h2>
            <p className="sl-lead sl-lead--dark" style={{ marginLeft: "auto", marginRight: "auto" }}>
              We apply AI, automation and analytics where they create practical operational value — reducing
              repetitive effort, improving data quality and helping teams focus on decisions that matter.
            </p>
          </div>

          <div className="sl-ai-core-zone">
            <div className="sl-ai-col sl-ai-col--left">
              {aiCapabilities.slice(0, 3).map((cap) => (
                <div key={cap.name} className="sl-ai-card sl-reveal">
                  <div className="sl-ai-card-name">{cap.name}</div>
                  <div className="sl-ai-card-verbs">{cap.verbs}</div>
                </div>
              ))}
            </div>

            <div className="sl-ai-core sl-reveal" aria-hidden="true">
              <svg viewBox="0 0 500 500" fill="none">
                <defs>
                  <radialGradient id="slCoreGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.16" />
                    <stop offset="55%" stopColor="#67E8F9" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#67E8F9" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="slCoreRing" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#C6E84A" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                <circle cx="250" cy="250" r="240" fill="url(#slCoreGlow)" />
                <g className="sl-orbit">
                  <circle cx="250" cy="250" r="190" stroke="url(#slCoreRing)" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 9" />
                  <circle cx="250" cy="60" r="4" fill="#67E8F9" fillOpacity="0.9" />
                  <circle cx="414" cy="345" r="3" fill="#C6E84A" fillOpacity="0.8" />
                  <circle cx="86" cy="345" r="2.5" fill="#67E8F9" fillOpacity="0.6" />
                </g>
                <g className="sl-orbit sl-orbit--rev">
                  <circle cx="250" cy="250" r="130" stroke="#67E8F9" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="2 7" />
                  <circle cx="380" cy="250" r="3" fill="#C6E84A" fillOpacity="0.85" />
                  <circle cx="155" cy="137" r="2.5" fill="#67E8F9" fillOpacity="0.7" />
                </g>
                <g stroke="#67E8F9" strokeOpacity="0.35" strokeWidth="1">
                  <line x1="250" y1="250" x2="250" y2="60" />
                  <line x1="250" y1="250" x2="414" y2="345" />
                  <line x1="250" y1="250" x2="86" y2="345" />
                  <line x1="250" y1="250" x2="380" y2="250" />
                  <line x1="250" y1="250" x2="155" y2="137" />
                </g>
                <circle cx="250" cy="250" r="58" fill="#0A1424" stroke="url(#slCoreRing)" strokeWidth="1.5" />
                <circle cx="250" cy="250" r="34" fill="none" stroke="#C6E84A" strokeOpacity="0.7" strokeWidth="1" strokeDasharray="4 6" />
                <circle cx="250" cy="250" r="12" fill="#C6E84A" fillOpacity="0.9" />
                <circle cx="250" cy="250" r="22" stroke="#67E8F9" strokeOpacity="0.5" strokeWidth="1" fill="none" />
              </svg>
            </div>

            <div className="sl-ai-col sl-ai-col--right">
              {aiCapabilities.slice(3).map((cap) => (
                <div key={cap.name} className="sl-ai-card sl-reveal">
                  <div className="sl-ai-card-name">{cap.name}</div>
                  <div className="sl-ai-card-verbs">{cap.verbs}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 07 BUSINESS OUTCOMES ══════════ */}
      <section className="sl-section">
        <div className="sl-wrap">
          <div className="sl-reveal">
            <SectionLabel num="07" text="BUSINESS OUTCOMES" />
            <h2 className="sl-h2">Better operations move business forward.</h2>
          </div>
          <div className="sl-reveal">
            {outcomes.map((o) => (
              <article key={o.num} className="sl-outcome">
                <span className="sl-outcome-num">{o.num} —</span>
                <div>
                  <h3 className="sl-outcome-word">
                    {o.word}
                    <span className="sl-outcome-sub">{o.sub}</span>
                  </h3>
                  <p className="sl-outcome-desc">{o.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 08 CONNECTED OPERATING MODEL ══════════ */}
      <section className="sl-section sl-model">
        <div className="sl-wrap">
          <div className="sl-reveal" style={{ textAlign: "center" }}>
            <SectionLabel num="08" text="CONNECTED OPERATING MODEL" dark />
            <h2 className="sl-h2" style={{ color: "#ffffff" }}>One connected operating model.</h2>
          </div>
          <div className="sl-model-stack">
            {modelLayers.map((layer, i) => (
              <div key={layer.num} style={{ display: "contents" }}>
                {i > 0 && <div className="sl-flow" aria-hidden="true" />}
                <div className={`sl-layer sl-reveal${layer.num === "02" ? " sl-layer--core" : ""}`}>
                  <div className="sl-layer-head">
                    <span className="sl-layer-num">{layer.num} —</span>
                    <span className="sl-layer-name">{layer.name}</span>
                  </div>
                  <div className="sl-layer-items">
                    {layer.items.map((item, j, arr) => (
                      <span key={item}>
                        {item}
                        {j < arr.length - 1 && <span className="sl-layer-pipe">|</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 09 WHY SYTRION ══════════ */}
      <section className="sl-section">
        <div className="sl-wrap">
          <div className="sl-reveal">
            <SectionLabel num="09" text="WHY SYTRION" />
            <h2 className="sl-h2">Domain understanding meets intelligent execution.</h2>
          </div>
          <div className="sl-why-grid">
            {whyColumns.map((col) => (
              <div key={col.num} className="sl-why-col sl-reveal">
                <span className="sl-why-num">{col.num}</span>
                <h3 className="sl-why-title">{col.title}</h3>
                <p className="sl-why-desc">{col.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 10 TRANSFORMATION IN ACTION ══════════ */}
      <section className="sl-trans">
        <div className="sl-trans-media">
          <img
            src="/solutions/Shipment Data Management.jpg"
            alt="Logistics operations team working with shipment documentation"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="sl-trans-body">
          <div className="sl-reveal">
            <SectionLabel num="10" text="TRANSFORMATION IN ACTION" />
            <h2 className="sl-h2">Reimagining document-intensive logistics operations.</h2>
            <div className="sl-trans-block">
              <h3 className="sl-trans-block-title">The Challenge</h3>
              <p>
                High-volume shipment workflows can require significant manual data processing, document validation
                and exception handling.
              </p>
            </div>
            <div className="sl-trans-block">
              <h3 className="sl-trans-block-title">The Sytrion Approach</h3>
              <p>
                Combine domain-led operations with document intelligence, workflow automation, standardized
                validation and performance analytics.
              </p>
            </div>
            <div className="sl-trans-block">
              <h3 className="sl-trans-block-title">The Potential</h3>
              <ul>
                <li>Faster Processing</li>
                <li>Fewer Manual Touchpoints</li>
                <li>Improved Data Quality</li>
                <li>Better Exception Visibility</li>
              </ul>
            </div>
            <div className="sl-trans-cta">
              <Link href="/contact" className="btn-primary">
                Discuss Your Use Case ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 11 LET'S MOVE FORWARD ══════════ */}
      <section className="sl-section sl-final">
        <img src="/home/shipping.jpg" alt="" className="sl-final-img" loading="lazy" decoding="async" />
        <div className="sl-final-overlay" aria-hidden="true" />
        <div className="sl-wrap">
          <div className="sl-final-inner sl-reveal">
            <SectionLabel num="11" text="LET'S MOVE FORWARD" dark />
            <h2>Ready to transform your logistics operations?</h2>
            <p className="sl-final-body">
              Whether you&apos;re rethinking documentation, freight operations, finance or automation, Sytrion can
              help you build a smarter and more scalable operating model.
            </p>
            <div className="sl-final-ctas">
              <Link href="/contact" className="btn-primary">
                Talk to Our Experts ↗
              </Link>
              <Link href="/contact" className="btn-secondary">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
