"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CallToAction from "./CallToAction";

const ibsTabs = [
  {
    id: "booking",
    tab: "BOOKING",
    num: "01",
    title: "Booking & Shipment Processing",
    subtitle: "Move shipments forward with greater speed and control.",
    image: "/services/01-booking/illustration/main-illustration.png",
    items: [
      { text: "Booking creation & validation", icon: "/services/01-booking/icons/01-booking-creation-and-validation.svg" },
      { text: "Shipment data processing", icon: "/services/01-booking/icons/02-shipment-data-processing.svg" },
      { text: "Schedule & routing updates", icon: "/services/01-booking/icons/03-schedule-and-routing-updates.svg" },
      { text: "Shipment status management", icon: "/services/01-booking/icons/04-shipment-status-management.svg" },
      { text: "Exception handling", icon: "/services/01-booking/icons/05-exception-handling.svg" },
    ],
  },
  {
    id: "documentation",
    tab: "DOCUMENTATION",
    num: "02",
    title: "Documentation",
    subtitle: "Simplify document-intensive shipping operations.",
    image: "/services/02-documentation/illustration/main-illustration.png",
    items: [
      { text: "Shipping instructions", icon: "/services/02-documentation/icons/01-shipping-instructions.svg" },
      { text: "Bill of Lading processing", icon: "/services/02-documentation/icons/02-bill-of-lading-processing.svg" },
      { text: "Arrival documentation", icon: "/services/02-documentation/icons/03-arrival-documentation.svg" },
      { text: "Document validation & amendments", icon: "/services/02-documentation/icons/04-document-validation-and-amendments.svg" },
      { text: "Proof of Delivery processing", icon: "/services/02-documentation/icons/05-proof-of-delivery-processing.svg" },
    ],
  },
  {
    id: "freight-data",
    tab: "FREIGHT DATA",
    num: "03",
    title: "Freight Data",
    subtitle: "Create reliable data across the shipment lifecycle.",
    image: "/services/03-freight-data/illustration/main-illustration.png",
    items: [
      { text: "Freight data capture", icon: "/services/03-freight-data/icons/01-freight-data-capture.svg" },
      { text: "Rate & tariff maintenance", icon: "/services/03-freight-data/icons/02-rate-and-tariff-maintenance.svg" },
      { text: "Master data management", icon: "/services/03-freight-data/icons/03-master-data-management.svg" },
      { text: "Data validation", icon: "/services/03-freight-data/icons/04-data-validation.svg" },
      { text: "Shipment reconciliation", icon: "/services/03-freight-data/icons/05-shipment-reconciliation.svg" },
    ],
  },
  {
    id: "trade",
    tab: "TRADE",
    num: "04",
    title: "Customs & Trade",
    subtitle: "Improve the flow of information supporting international trade.",
    image: "/services/04-trade/illustration/main-illustration.png",
    items: [
      { text: "Trade documentation support", icon: "/services/04-trade/icons/01-trade-documentation-support.svg" },
      { text: "Data extraction & validation", icon: "/services/04-trade/icons/02-data-extraction-and-validation.svg" },
      { text: "Document completeness checks", icon: "/services/04-trade/icons/03-document-completeness-checks.svg" },
      { text: "Compliance data preparation", icon: "/services/04-trade/icons/04-compliance-data-preparation.svg" },
      { text: "Exception processing", icon: "/services/04-trade/icons/05-exception-processing.svg" },
    ],
  },
  {
    id: "customer-ops",
    tab: "CUSTOMER OPS",
    num: "05",
    title: "Customer Operations",
    subtitle: "Keep customers informed and operations moving.",
    image: "/services/05-customer-ops/illustration/main-illustration.png",
    items: [
      { text: "Shipment tracking support", icon: "/services/05-customer-ops/icons/01-shipment-tracking-support.svg" },
      { text: "Customer queries", icon: "/services/05-customer-ops/icons/02-customer-queries.svg" },
      { text: "Operational exceptions", icon: "/services/05-customer-ops/icons/03-operational-exceptions.svg" },
      { text: "Email & workflow management", icon: "/services/05-customer-ops/icons/04-email-and-workflow-management.svg" },
      { text: "Service request processing", icon: "/services/05-customer-ops/icons/05-service-request-processing.svg" },
    ],
  },
  {
    id: "insights",
    tab: "INSIGHTS",
    num: "06",
    title: "Analytics & Insights",
    subtitle: "Turn operational activity into actionable intelligence.",
    image: "/services/06-insights/illustration/main-illustration.png",
    items: [
      { text: "Performance dashboards", icon: "/services/06-insights/icons/01-performance-dashboards.svg" },
      { text: "Volume reporting", icon: "/services/06-insights/icons/02-volume-reporting.svg" },
      { text: "Turnaround-time analysis", icon: "/services/06-insights/icons/03-turnaround-time-analysis.svg" },
      { text: "Exception trends", icon: "/services/06-insights/icons/04-exception-trends.svg" },
      { text: "Operational insights", icon: "/services/06-insights/icons/05-operational-insights.svg" },
    ],
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
  { name: "Document Intelligence", verbs: "Extract • Classify • Validate", desc: "Turns unstructured documents into structured, reliable operational data.", img: "/services/Document Intelligence.jpg", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="15" x2="15" y2="15" /></svg> },
  { name: "Workflow Automation", verbs: "Route • Process • Update", desc: "Orchestrates repetitive, high-volume steps end-to-end without manual handoffs.", img: "/services/Workflow Automation.jpg", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><path d="M10 6.5h3a3 3 0 0 1 3 3V14" /></svg> },
  { name: "Exception Intelligence", verbs: "Detect • Prioritize • Resolve", desc: "Catches anomalies early and routes them to the right people or resolution path.", img: "/services/Exception Intelligence.jpg", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 4 22 20 2 20 12 4" /><line x1="12" y1="10" x2="12" y2="14" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg> },
  { name: "Reconciliation Intelligence", verbs: "Match • Validate • Flag", desc: "Matches financial and operational records to surface discrepancies fast.", img: "/services/Reconciliation Intelligence.jpg", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="9" r="6" /><path d="M13.5 13.5 21 21" /></svg> },
  { name: "AI-Assisted Operations", verbs: "Summarize • Assist • Decide", desc: "Puts AI-driven context and recommendations at the moment your teams act.", img: "/services/AI-Assisted Operations.jpg", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a9 9 0 1 0 9 9" /><circle cx="12" cy="12" r="3" /><path d="M19 3l-6 6" /></svg> },
  { name: "Decision Intelligence", verbs: "Measure • Analyze • Improve", desc: "Turns operational data into insight that continuously improves outcomes.", img: "/services/Decision Intelligence.jpg", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg> },
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

const outcomeIconProps = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const outcomeIcons = [
  <svg key="faster" {...outcomeIconProps}><path d="M4.5 17.5a8 8 0 1 1 15 0" /><path d="M12 14l4-5" /><circle cx="12" cy="15" r="1.6" /><path d="M3 20h18" /></svg>,
  <svg key="accurate" {...outcomeIconProps}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="0.8" /></svg>,
  <svg key="efficient" {...outcomeIconProps}><ellipse cx="12" cy="5.5" rx="7" ry="2.8" /><path d="M5 5.5v6.2c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8V5.5" /><path d="M5 11.7v6.3c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8v-6.3" /></svg>,
  <svg key="visible" {...outcomeIconProps}><path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="2.8" /></svg>,
  <svg key="scalable" {...outcomeIconProps}><path d="M3 17.5l5.5-5.5 3.5 3.5L20.5 7" /><path d="M14.5 7h6v6" /></svg>,
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

const whyPoints = [
  {
    num: "01",
    name: "Domain-led",
    desc: "Solutions designed around shipping and logistics complex administrative workflows.",
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

const ecosystemTiles = [
  {
    num: "01",
    title: "Ocean Shipping",
    desc: "Operational, documentation and finance support across complex global shipping environments.",
    image: "/services/Ocean Shipping.png",
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
    image: "/services/3 PL & Logistics.png",
  },
  {
    num: "04",
    title: "Customs & Trade",
    desc: "Document-intensive operational support for efficient international trade workflows.",
    image: "/services/Customs & Trade.png",
  },
];

const landCards = [
  { num: "01", name: "High-volume documentation", image: "/services/01-documentation.png" },
  { num: "02", name: "Fragmented operational data", image: "/services/02-fragmented-data.png" },
  { num: "03", name: "Complex freight billing", image: "/services/03-freight-billing.png" },
  { num: "04", name: "Manual reconciliations", image: "/services/04-reconciliation.png" },
  { num: "05", name: "Time-sensitive exceptions", image: "/services/05-exceptions.png" },
  { num: "06", name: "Growing cost pressures", image: "/services/06-cost-pressures.png" },
];

function SectionLabel({ text, dark }: { num?: string; text: string; dark?: boolean }) {
  return (
    <span className={`sl-label${dark ? " sl-label--dark" : ""}`}>
      <span>{text}</span>
    </span>
  );
}

const faIcons = [
  "/services/order to cash.svg",
  "/services/procure to pay.svg",
  "/services/record to report.svg",
  "/services/FREIGHT AUDIT & REVENUE ASSURANCE.svg",
];

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

  const [sqIndex, setSqIndex] = useState(0);
  const [sqPaused, setSqPaused] = useState(false);

  useEffect(() => {
    if (sqPaused) return;
    const id = setInterval(() => setSqIndex(prev => (prev + 1) % aiCapabilities.length), 4000);
    return () => clearInterval(id);
  }, [sqPaused, sqIndex]);

  return (
    <div className="sl-page">
      <style>{`
        .sl-page { background: #ffffff; color: #16181d; font-family: var(--font-geist-sans), Arial, Helvetica, sans-serif; overflow-x: clip; }
        .sl-page h1, .sl-page h2, .sl-page h3 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; }
        .sl-wrap { max-width: 1400px; margin: 0 auto; }

        .sl-label { display: inline-block; background: #C6E84A; color: #0f0f0f; padding: 8px 20px; border-radius: 999px; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; font-variant: small-caps; margin-bottom: 24px; }
        .sl-label--dark { background: #C6E84A; color: #0f0f0f; }

        .sl-h2 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(32px, 5vw, 48px); font-weight: 700; color: #0f172a; line-height: 1.15; letter-spacing: -0.02em; margin: 0 0 20px; }
        .sl-h2 span { color: #C6E84A; }
        .sl-lead { font-size: 19px; font-weight: 400; line-height: 1.8; color: #5A5D66; margin: 0 0 12px; }
        .sl-lead--dark { color: rgba(255,255,255,0.6); }

        .sl-reveal { opacity: 0; transform: translateY(26px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); animation: slRevealSafety 0.8s ease-out 2.5s forwards; }
        .sl-reveal.sl-in { opacity: 1; transform: none; }
        @keyframes slRevealSafety { to { opacity: 1; transform: none; } }

        /* ── 01 HERO ── */
        .sl-hero { position: relative; height: 100vh; height: 100dvh; min-height: 600px; background: #0A1424; overflow: hidden; isolation: isolate; }
        .sl-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: right center; z-index: -2; }
        .sl-hero-content { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; z-index: 1; padding: 100px clamp(16px, 3vw, 48px) 0; max-width: 1440px; margin: 0 auto; left: 0; right: 0; }
        .sl-hero-eyebrow { display: inline-block; background: #C6E84A; color: #0f0f0f; padding: 8px 20px; border-radius: 999px; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; font-variant: small-caps; margin-bottom: 24px; }
        .sl-hero h1 { font-size: clamp(38px, 5.6vw, 68px); font-weight: 700; letter-spacing: -0.03em; line-height: 1.06; color: #ffffff; margin: 0 0 26px; max-width: 780px; text-wrap: balance; }
        .sl-hero-sub { font-size: clamp(17px, 1.6vw, 21px); font-weight: 600; line-height: 1.55; color: rgba(255,255,255,0.92); margin: 0 0 18px; max-width: 640px; }
        .sl-hero-body { font-size: 16px; line-height: 1.75; color: rgba(255,255,255,0.68); margin: 0 0 38px; max-width: 520px; }
        .sl-hero-ctas { display: flex; flex-wrap: wrap; gap: 16px; }
        .sl-float-words { position: absolute; left: auto !important; top: auto !important; right: clamp(24px, 3vw, 56px) !important; bottom: clamp(20px, 3.5vh, 44px) !important; z-index: 2; display: flex; flex-direction: row; align-items: center; justify-content: flex-end; gap: clamp(14px, 1.8vw, 28px); pointer-events: none; flex-wrap: nowrap; white-space: nowrap; }
        .sl-float-word { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-weight: 700; font-size: clamp(11px, 1.0vw, 18px); letter-spacing: 0.22em; color: #ffffff; white-space: nowrap; text-shadow: 0 0 8px rgba(255,255,255,0.6), 0 0 22px rgba(255,255,255,0.35); }
        .sl-float-dot { color: rgba(255,255,255,0.55); font-size: 14px; line-height: 0; }

        /* ── section rhythm ── */
        .sl-section { padding: clamp(76px, 9vw, 128px) 80px; }

        /* ── 02 LANDSCAPE ── */
        .sl-land { position: relative; overflow-x: clip; }
        .sl-land-hero { position: relative; display: flex; align-items: center; }
        .sl-land-copy { position: relative; z-index: 2; width: min(46%, 620px); }
        .sl-land-copy p { font-size: 19px; line-height: 1.8; color: #5A5D66; margin: 0 0 12px; }
        .sl-land-hero-media { position: absolute; top: 0; bottom: 0; right: -80px; width: 60%; z-index: 1; }
        .sl-land-hero-media::before { content: ""; position: absolute; inset: 0; z-index: 1; background: linear-gradient(90deg, #ffffff 3%, rgba(255,255,255,0.9) 20%, rgba(255,255,255,0) 48%); }
        .sl-land-hero-media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
        .sl-land-grid { list-style: none; margin: 48px 0 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .sl-land-card { background: #F5F6F0; border-radius: 14px; padding: 0 0 12px; overflow: hidden; display: flex; flex-direction: column; align-items: center; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); }
        .sl-land-card:hover { transform: translateY(-4px); }
        .sl-land-card-media { width: 100%; aspect-ratio: 21 / 9; overflow: hidden; }
        .sl-land-card-media img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .sl-land-card:hover .sl-land-card-media img { transform: scale(1.05); }
        .sl-land-card-cap { margin: 10px 0 0; padding: 0 14px; font-size: 13px; font-weight: 700; color: #1F2226; text-align: center; letter-spacing: -0.01em; }
        .sl-land-card-num { color: #7AA306; font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-weight: 700; }
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
        .sl-tile-title { font-size: clamp(17px, 1.45vw, 20px); font-weight: 700; margin: 6px 0 0; color: #ffffff; white-space: nowrap; }
        .sl-tile-desc { font-size: 14px; line-height: 1.65; color: rgba(255,255,255,0.75); margin: 10px 0 0; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden; min-height: calc(1.65em * 3); opacity: 0; transform: translateY(12px); transition: opacity 0.45s ease, transform 0.45s cubic-bezier(0.16,1,0.3,1); }
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
        .sl-panel-list li { display: flex; align-items: center; gap: 14px; padding: 13px 0; border-top: 1px solid rgba(0,0,0,0.08); font-size: 15.5px; color: #33363d; }
        .sl-panel-item-icon { flex: 0 0 auto; width: 32px; height: 32px; object-fit: contain; }
        .sl-panel-visual { position: relative; border-radius: 20px; overflow: hidden; min-height: 380px; background: #F3F6FB; display: flex; align-items: center; justify-content: center; }
        .sl-panel-visual img { width: 100%; height: 100%; object-fit: contain; object-position: center; }

        /* ── 05 F&A ── */
        .sl-fa { position: relative; background: #0A1930; color: #ffffff; overflow: hidden; isolation: isolate; }
        .sl-fa .sl-wrap { position: relative; z-index: 1; }
        .sl-fa-bg { position: absolute; right: 0; top: 0; width: 58%; height: 100%; object-fit: cover; opacity: 0.24; z-index: -1; mask-image: linear-gradient(90deg, transparent 0%, #000 45%); -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 45%); }
        .sl-fa-grid-wrap { display: grid; grid-template-columns: 1fr; gap: clamp(32px, 3.5vw, 48px); }
        .sl-fa-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        .sl-fa-card { perspective: 1400px; outline: none; cursor: pointer; }
        .sl-fa-card-inner { position: relative; height: clamp(300px, 30vw, 370px); transform-style: preserve-3d; transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.25, 1); }
        .sl-fa-card:hover .sl-fa-card-inner, .sl-fa-card:focus-visible .sl-fa-card-inner { transform: rotateY(180deg); }
        .sl-fa-card-face { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.045); backdrop-filter: blur(4px); padding: 26px 24px; display: flex; flex-direction: column; }
        .sl-fa-card-face--back { transform: rotateY(180deg); border-color: rgba(198,232,74,0.45); background: linear-gradient(160deg, rgba(198,232,74,0.12), rgba(255,255,255,0.03)); }
        .sl-fa-card-face--front { justify-content: center; align-items: center; text-align: center; }
        .sl-fa-card-icon { width: 92px; height: 92px; flex: 0 0 auto; border-radius: 22px; background: rgba(198,232,74,0.14); border: 1px solid rgba(198,232,74,0.35); color: #C6E84A; display: flex; align-items: center; justify-content: center; margin-bottom: 26px; box-shadow: 0 0 34px rgba(198,232,74,0.18); }
        .sl-fa-card-icon img { width: 54px; height: 54px; object-fit: contain; display: block; }
        .sl-fa-card-title { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 17px; font-weight: 700; letter-spacing: 0.08em; color: #ffffff; margin: 0; line-height: 1.45; max-width: 220px; }
        .sl-fa-card-hint { position: absolute; bottom: 18px; left: 0; right: 0; text-align: center; font-size: 11.5px; letter-spacing: 0.14em; color: rgba(255,255,255,0.5); }
        .sl-fa-card-back-title { font-size: 12.5px; font-weight: 700; letter-spacing: 0.12em; color: #C6E84A; margin: 0 0 12px; }
        .sl-fa-card ul { list-style: none; margin: 0; padding: 0; }
        .sl-fa-card li { font-size: 14.5px; color: rgba(255,255,255,0.78); padding: 7px 0; border-top: 1px solid rgba(255,255,255,0.08); }
        .sl-fa-card li:first-child { border-top: none; }
        .sl-capital-strip { margin-top: 26px; grid-column: 1 / -1; border: 1px solid rgba(198,232,74,0.35); background: rgba(198,232,74,0.06); border-radius: 16px; padding: 22px 28px; display: flex; flex-wrap: wrap; align-items: center; gap: 12px 28px; }
        .sl-capital-title { font-size: 13.5px; font-weight: 700; letter-spacing: 0.14em; color: #C6E84A; }
        .sl-capital-items { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; font-size: 14.5px; color: rgba(255,255,255,0.85); }
        .sl-capital-pipe { color: rgba(198,232,74,0.6); }

        /* ── 06 AI ── */
        .sl-ai { background: #05070D; color: #ffffff; position: relative; overflow: hidden; }
        .sl-ai::before { content: ""; position: absolute; inset: 0; z-index: 0; pointer-events: none; background-image: radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px); background-size: 26px 26px; }
        .sl-ai .sl-wrap { position: relative; z-index: 1; }

        .sl-sq { display: flex; align-items: stretch; gap: 10px; height: 410px; margin-top: 56px; }
        .sl-sq-panel { position: relative; flex: 1 1 0; min-width: 0; background: #0B1424; border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 22px; cursor: pointer; overflow: hidden; transition: flex-grow 0.65s cubic-bezier(0.32, 0.72, 0, 1), height 0.65s cubic-bezier(0.32, 0.72, 0, 1), border-color 0.3s ease, background 0.3s ease; }
        .sl-sq-panel:not(.sl-sq-panel--open):hover { border-color: rgba(198,232,74,0.5); background: #0F1A2E; }
        .sl-sq-panel--open { flex-grow: 8.2; background: #101B30; border-color: rgba(198,232,74,0.7); }
        .sl-sq-panel--open::after { content: ""; position: absolute; right: -70px; bottom: -70px; width: 240px; height: 240px; border-radius: 50%; background: radial-gradient(circle, rgba(198,232,74,0.16) 0%, transparent 70%); pointer-events: none; }

        .sl-sq-slat { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 44px 8px 20px; opacity: 1; transition: opacity 0.35s ease; }
        .sl-sq-panel--open .sl-sq-slat { opacity: 0; visibility: hidden; }
        .sl-sq-num { font-family: var(--font-syne), ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.4); letter-spacing: 0.08em; position: absolute; top: 16px; left: 18px; }
        .sl-sq-icon { display: flex; align-items: center; justify-content: center; color: #C6E84A; background: rgba(198,232,74,0.12); border-radius: 8px; }
        .sl-sq-slat .sl-sq-icon { width: 40px; height: 40px; }
        .sl-sq-slat .sl-sq-icon svg { width: 22px; height: 22px; }
        .sl-sq-name-v { writing-mode: vertical-rl; transform: rotate(180deg); font-size: 15px; font-weight: 700; color: #ffffff; letter-spacing: 0.06em; text-align: center; }

        .sl-sq-pane { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: flex-start; padding: 22px; opacity: 0; visibility: hidden; transition: opacity 0.35s ease 0.22s; }
        .sl-sq-panel--open .sl-sq-pane { opacity: 1; visibility: visible; }
        .sl-sq-pane .sl-sq-icon { width: 56px; height: 56px; margin-top: 40px; }
        .sl-sq-pane .sl-sq-icon svg { width: 28px; height: 28px; }
        .sl-sq-name-h { font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.01em; margin-top: 18px; }
        .sl-sq-tags { font-size: 13px; letter-spacing: 0.08em; color: #C6E84A; margin-top: 9px; }
        .sl-sq-desc { font-size: 14px; line-height: 1.65; color: rgba(255,255,255,0.6); margin-top: 16px; max-width: 340px; }
        .sl-sq-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .sl-sq-pane::after { content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none; background: linear-gradient(100deg, rgba(5,7,13,0.94) 0%, rgba(5,7,13,0.72) 48%, rgba(5,7,13,0.32) 80%, rgba(5,7,13,0.18) 100%); }
        .sl-sq-pane .sl-sq-num { z-index: 2; }
        .sl-sq-pane .sl-sq-icon, .sl-sq-pane .sl-sq-name-h, .sl-sq-pane .sl-sq-tags, .sl-sq-pane .sl-sq-desc { position: relative; z-index: 2; }

        /* ── 07 OUTCOMES ── */
        .sl-outcomes { background: #F7F8F4; }
        .sl-outcome-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 40px; }
        .sl-outcome { position: relative; overflow: hidden; background-color: #E9EAEC; border: 1px solid rgba(10,25,48,0.12); border-radius: 14px; padding: clamp(15px, 1.3vw, 18px); display: flex; flex-direction: column; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, box-shadow 0.35s ease, background-color 0.4s cubic-bezier(0.16,1,0.3,1); }
        .sl-outcome:hover { transform: translateY(-4px); background-color: #0c1b2e; border-color: rgba(198,232,74,0.35); box-shadow: 0 20px 40px -20px rgba(12,27,48,0.45); }
        .sl-outcome::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 3px; background: linear-gradient(90deg, #C6E84A, rgba(198,232,74,0)); opacity: 0; transition: opacity 0.3s ease; }
        .sl-outcome:hover::after { opacity: 1; }
        .sl-outcome-top { display: flex; align-items: center; justify-content: space-between; padding-bottom: 10px; border-bottom: 1px solid rgba(10,25,48,0.09); transition: border-color 0.35s ease; }
        .sl-outcome:hover .sl-outcome-top { border-bottom-color: rgba(255,255,255,0.14); }
        .sl-outcome-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 12px; font-weight: 700; color: #7AA306; letter-spacing: 0.14em; font-variant-numeric: tabular-nums; transition: color 0.35s ease; }
        .sl-outcome:hover .sl-outcome-num { color: #C6E84A; }
        .sl-outcome-chip { width: 36px; height: 36px; flex: 0 0 auto; border-radius: 50%; border: 1px solid rgba(10,25,48,0.16); display: flex; align-items: center; justify-content: center; color: #7AA306; transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease; }
        .sl-outcome:hover .sl-outcome-chip { background: var(--color-primary); border-color: var(--color-primary); color: #16181d; }
        .sl-outcome-word { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(17px, 1.35vw, 20px); font-weight: 700; letter-spacing: -0.01em; line-height: 1.1; color: #16181d; margin: 12px 0 0; transition: color 0.35s ease; }
        .sl-outcome:hover .sl-outcome-word { color: #ffffff; }
        .sl-outcome-sub { font-size: 12.5px; font-weight: 600; color: #7AA306; margin: 5px 0 0; transition: color 0.35s ease; }
        .sl-outcome:hover .sl-outcome-sub { color: #C6E84A; }
        .sl-outcome-desc { font-size: 12.5px; line-height: 1.55; color: #5A5D66; margin: 8px 0 0; transition: color 0.35s ease; }
        .sl-outcome:hover .sl-outcome-desc { color: #9AA7B8; }
        @media (min-width: 700px) { .sl-outcome-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1081px) { .sl-outcome-grid { grid-template-columns: repeat(3, 1fr); } }

        /* ── 08 MODEL ── */
        .sl-model { background: #081020; color: #ffffff; }
        .sl-model-stack { max-width: 980px; margin: 56px auto 0; display: flex; flex-direction: column; gap: 12px; }
        .sl-layer { display: grid; grid-template-columns: 90px 320px 1fr; align-items: center; gap: 20px; border-radius: 14px; padding: 24px 30px; background: #10294A; border: 1px solid rgba(198,232,74,0.12); transition: border-color 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1); }
        .sl-layer:hover { background: #C6E84A; border-color: rgba(198,232,74,0.8); box-shadow: 0 0 40px -6px rgba(198,232,74,0.4); transform: translateX(6px); }
        .sl-layer:hover .sl-layer-num, .sl-layer:hover .sl-layer-name, .sl-layer:hover .sl-layer-items { color: #0C1B30; }
        .sl-layer-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; color: #C6E84A; font-variant-numeric: tabular-nums; }
        .sl-layer-name { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #ffffff; }
        .sl-layer-items { font-size: 12.5px; letter-spacing: 0.05em; color: rgba(255,255,255,0.62); }
        .sl-layer-pipe { color: inherit; padding: 0 7px; }

        /* ── 09 WHY ── */
        .sl-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 56px; }
        .sl-why-card { position: relative; border-radius: 16px; padding: 28px 24px 26px; background: #FAFBFC; border: 2px solid #D1D9E6; display: flex; flex-direction: column; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease; }
        .sl-why-card::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 3px; border-radius: 0 0 16px 16px; background: linear-gradient(90deg, #7AA306, #C6E84A); opacity: 0; transition: opacity 0.35s ease; }
        .sl-why-card:hover { transform: translateY(-4px); box-shadow: 0 12px 30px -12px rgba(10,22,40,0.12); }
        .sl-why-card:hover::after { opacity: 1; }
        .sl-why-head { display: flex; align-items: center; gap: 16px; margin-bottom: 14px; }
        .sl-why-head-text { display: flex; flex-direction: column; }
        .sl-why-icon { width: 64px; height: 64px; border-radius: 16px; background: rgba(198,232,74,0.12); border: 1px solid rgba(122,163,6,0.2); display: flex; align-items: center; justify-content: center; color: #618300; flex: 0 0 auto; transition: background 0.35s ease, border-color 0.35s ease, color 0.35s ease, transform 0.35s ease; }
        .sl-why-card:hover .sl-why-icon { background: #C6E84A; border-color: #C6E84A; color: #0C1B30; transform: scale(1.06); }
        .sl-why-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; color: #7AA306; font-variant-numeric: tabular-nums; }
        .sl-why-card h3 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 23px; font-weight: 700; color: #0C1B30; margin: 4px 0 0; }
        .sl-why-card p { font-size: 14px; line-height: 1.65; color: #5A6B7F; margin: 8px 0 0; }

        /* ── 10 TRANSFORMATION ── */
        .sl-trans { display: grid; grid-template-columns: 1fr 1fr; min-height: 640px; }
        .sl-trans-media { position: relative; min-height: 380px; }
        .sl-trans-media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .sl-trans-media::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(6,12,24,0.05) 60%, rgba(6,12,24,0.4) 100%); }
        .sl-trans-body { background: #ffffff; display: flex; flex-direction: column; justify-content: center; padding: clamp(48px, 6vw, 96px) clamp(28px, 6vw, 96px); }
        .sl-trans-block { margin-top: 26px; }
        .sl-trans-block-title { font-size: 13px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #7AA306; margin: 0 0 8px; }
        .sl-trans-block p { font-size: 17px; line-height: 1.8; color: #5A5D66; margin: 0; }
        .sl-trans-block ul { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 10px 24px; }
        .sl-trans-block li { display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 600; color: #16181d; }
        .sl-trans-block li::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: #C6E84A; box-shadow: 0 0 0 3px rgba(198,232,74,0.25); flex: 0 0 auto; }
        .sl-trans-cta { margin-top: 36px; }

        /* ── 11 FINAL CTA ── */
        .sl-final { position: relative; background: #0f0f0f; color: #ffffff; overflow: hidden; isolation: isolate; }
        .sl-final-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 600px; height: 400px; background: radial-gradient(circle, rgba(198,232,74,0.12) 0%, transparent 70%); border-radius: 50%; pointer-events: none; }
        .sl-final .sl-wrap { position: relative; z-index: 1; }
        .sl-final-inner { text-align: center; max-width: 780px; margin: 0 auto; }
        .sl-final h2 { font-size: clamp(32px, 5vw, 48px); font-weight: 700; letter-spacing: -0.02em; line-height: 1.15; margin: 0 0 20px; color: #ffffff; }
        .sl-final-body { font-size: 17px; line-height: 1.8; color: rgba(255,255,255,0.6); margin: 20px auto 40px; max-width: 640px; }
        .sl-final-ctas { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; }

        /* ── animations ── */
        @media (hover: none) {
          .sl-tile-desc { opacity: 1; transform: none; }
        }

        @media (max-width: 1100px) {
          .sl-why-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 860px) {
          .sl-sq { flex-direction: column; height: auto; gap: 10px; }
          .sl-sq-panel { flex: none; height: 68px; padding: 14px 16px; }
          .sl-sq-panel--open { height: 330px; flex: none; }
          .sl-sq-slat { flex-direction: row; align-items: center; justify-content: flex-start; gap: 14px; padding: 0 18px; }
          .sl-sq-slat .sl-sq-num { position: static; flex: none; }
          .sl-sq-slat .sl-sq-icon { flex: none; }
          .sl-sq-name-v { writing-mode: horizontal-tb; transform: none; font-size: 16px; flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: left; }
          .sl-sq-pane { padding: 18px; }
        }

        @media (max-width: 900px) {
          .sl-section { padding-left: 40px; padding-right: 40px; }
          .sl-land-hero { display: block; }
          .sl-land-copy { width: 100%; max-width: 720px; }
          .sl-land-hero-media { position: static; width: 100%; margin-top: 36px; }
          .sl-land-hero-media::before { display: none; }
          .sl-land-grid { grid-template-columns: repeat(2, 1fr); }
          .sl-eco-grid { grid-template-columns: 1fr 1fr; }
          .sl-outcome-grid { grid-template-columns: repeat(2, 1fr); }
          .sl-panel { grid-template-columns: 1fr; }
          .sl-panel-visual { min-height: 260px; }
          .sl-float-words { bottom: clamp(20px, 3vh, 40px) !important; top: auto !important; gap: 12px; right: clamp(20px, 3.5vw, 40px) !important; flex-wrap: nowrap; white-space: nowrap; }
          .sl-float-word { font-size: clamp(10px, 1.1vw, 16px); }
          .sl-fa-grid-wrap { grid-template-columns: 1fr; }
          .sl-fa-cards { grid-template-columns: repeat(2, 1fr); }
          .sl-fa-bg { width: 100%; mask-image: linear-gradient(180deg, transparent 0%, #000 60%); -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 60%); }
          .sl-trans { grid-template-columns: 1fr; }
        }

        @media (max-width: 640px) {
          .sl-section { padding-left: 20px; padding-right: 20px; }
          .sl-land-grid { grid-template-columns: 1fr; }
          .sl-eco-grid { grid-template-columns: 1fr; }
          .sl-outcome-grid { grid-template-columns: 1fr; }
          .sl-fa-cards { grid-template-columns: 1fr; }
          .sl-why-grid { grid-template-columns: 1fr; }
          .sl-trans-block ul { grid-template-columns: 1fr; }
          .sl-layer { grid-template-columns: 1fr; gap: 8px; padding: 20px; }
          .sl-float-words { right: 24px !important; bottom: 16px !important; top: auto !important; gap: 8px; flex-wrap: nowrap; white-space: nowrap; }
          .sl-float-word { font-size: 9px; letter-spacing: 0.15em; }
          .sl-hero-content { padding: 120px 24px 90px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .sl-reveal { opacity: 1; transform: none; transition: none; animation: none; }
          .sl-fa-card-inner { transition: none; }
          .sl-float-word { animation: none; }
          .sl-tile img, .sl-tile-desc, .sl-fa-card, .sl-sq-panel, .sl-layer, .sl-land-card, .sl-why-col { transition: none; }
          html { scroll-behavior: auto; }
        }
      `}</style>

      {/* ══════════ 01 HERO ══════════ */}
      <section className="sl-hero">
        <video className="sl-hero-img" src="/services/shippinghero1.mp4" autoPlay muted loop playsInline />
        <div className="sl-float-words" aria-hidden="true">
          <span className="sl-float-word">OPERATIONS</span>
          <span className="sl-float-dot">·</span>
          <span className="sl-float-word">INTELLIGENCE</span>
          <span className="sl-float-dot">·</span>
          <span className="sl-float-word">TRANSFORMATION</span>
        </div>
        <div className="sl-hero-content">
          <span className="sl-hero-eyebrow">SHIPPING &amp; LOGISTICS</span>
            <h1>Intelligent operations for <span style={{ color: "#C6E84A" }}>a world in motion.</span></h1>
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
      <section className="sl-section sl-land">
        <div className="sl-wrap">
          <div className="sl-land-hero">
            <div className="sl-land-copy sl-reveal">
              <span className="eyebrow-badge">
                THE LOGISTICS LANDSCAPE
              </span>
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
            <div className="sl-land-hero-media" aria-hidden="true">
              <img src="/services/00-ship-and-port.png" alt="" loading="lazy" decoding="async" />
            </div>
          </div>

          <ul className="sl-land-grid sl-reveal">
            {landCards.map((card) => (
              <li key={card.num} className="sl-land-card">
                <div className="sl-land-card-media">
                  <img src={card.image} alt="" loading="lazy" decoding="async" />
                </div>
                <p className="sl-land-card-cap">
                  <span className="sl-land-card-num">{card.num}.</span> {card.name}
                </p>
              </li>
            ))}
          </ul>

          <p className="sl-closing sl-reveal">
            We bring operations, technology and intelligence together to make complexity easier to manage.
          </p>
        </div>
      </section>

      {/* ══════════ 03 ECOSYSTEM ══════════ */}
      <section className="sl-section sl-eco">
        <div className="sl-wrap">
          <div className="sl-reveal">
            <SectionLabel num="03" text="ACROSS THE LOGISTICS ECOSYSTEM" dark />
            <h2 className="sl-h2" style={{ color: "#ffffff" }}>
              Built around the way <span style={{ color: "#C6E84A" }}>global logistics actually works</span>
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
            <h2 className="sl-h2">From process execution to<span style={{ color: "#C6E84A" }}> intelligent operations. </span></h2>
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
                onMouseEnter={() => setActiveTab(i)}
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
              <p className="sl-panel-tagline">{active.subtitle}</p>
              <ul className="sl-panel-list">
                {active.items.map((item) => (
                  <li key={item.text}>
                    <img className="sl-panel-item-icon" src={item.icon} alt="" width="32" height="32" loading="lazy" decoding="async" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sl-panel-visual">
              <img
                src={active.image ?? "/solutions/Shipment Data Management.jpg"}
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
              <h2 className="sl-h2" style={{ color: "#ffffff" }}>Finance that understands <span style={{ color: "#C6E84A" }}>freight</span>.</h2>
              <p className="sl-lead sl-lead--dark">
                Shipping and logistics finance operates at the intersection of shipments, rates, vendors, customers,
                currencies and contracts. Sytrion brings logistics context and finance expertise together to build
                accurate, controlled and insight-driven financial operations.
              </p>
            </div>
            <div className="sl-reveal">
              <div className="sl-fa-cards">
                {faCapabilities.map((cap, i) => (
                  <div key={cap.title} className="sl-fa-card" tabIndex={0}>
                    <div className="sl-fa-card-inner">
                      <div className="sl-fa-card-face sl-fa-card-face--front">
                        <span className="sl-fa-card-icon"><img src={faIcons[i]} alt="" /></span>
                        <h3 className="sl-fa-card-title">{cap.title}</h3>
                        <span className="sl-fa-card-hint">HOVER TO EXPLORE ↻</span>
                      </div>
                      <div className="sl-fa-card-face sl-fa-card-face--back">
                        <h4 className="sl-fa-card-back-title">{cap.title}</h4>
                        <ul>
                          {cap.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
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
          <div className="sl-reveal">
            <SectionLabel num="06" text="AI / AUTOMATION INTELLIGENCE" dark />
            <h2 className="sl-h2" style={{ color: "#ffffff" }}>
              Every process is an opportunity to <span style={{ color: "#C6E84A" }}>work smarter</span>.
            </h2>
            <p className="sl-lead sl-lead--dark">
              We apply AI, automation and analytics where they create practical operational value — reducing
              repetitive effort, improving data quality and helping teams focus on decisions that matter.
            </p>
          </div>

          <div className="sl-sq" onMouseEnter={() => setSqPaused(true)} onMouseLeave={() => setSqPaused(false)}>
            {aiCapabilities.map((cap, i) => (
              <div
                key={cap.name}
                role="button"
                tabIndex={0}
                onMouseEnter={() => setSqIndex(i)}
                onClick={() => setSqIndex(i)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSqIndex(i); } }}
                className={`sl-sq-panel sl-reveal${sqIndex === i ? " sl-sq-panel--open" : ""}`}
              >
                <div className="sl-sq-slat">
                  <span className="sl-sq-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="sl-sq-icon">{cap.icon}</span>
                  <span className="sl-sq-name-v">{cap.name}</span>
                </div>
                <div className="sl-sq-pane">
                  <span className="sl-sq-num">{String(i + 1).padStart(2, "0")}</span>
                  <img src={cap.img} alt="" loading="lazy" className="sl-sq-img" />
                  <span className="sl-sq-icon">{cap.icon}</span>
                  <span className="sl-sq-name-h">{cap.name}</span>
                  <span className="sl-sq-tags">{cap.verbs}</span>
                  <span className="sl-sq-desc">{cap.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 07 BUSINESS OUTCOMES ══════════ */}
      <section className="sl-section sl-outcomes">
        <div className="sl-wrap">
          <div className="sl-reveal">
            <SectionLabel num="07" text="BUSINESS OUTCOMES" />
            <h2 className="sl-h2">Better operations move <span style={{ color: "#C6E84A" }}>business forward. </span></h2>
          </div>
          <div className="sl-reveal sl-outcome-grid">
            {outcomes.map((o, i) => (
              <article key={o.num} className="sl-outcome">
                <div className="sl-outcome-top">
                  <span className="sl-outcome-num">{o.num}</span>
                  <span className="sl-outcome-chip" aria-hidden="true">{outcomeIcons[i]}</span>
                </div>
                <h3 className="sl-outcome-word">{o.word}</h3>
                <p className="sl-outcome-sub">{o.sub}</p>
                <p className="sl-outcome-desc">{o.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 08 CONNECTED OPERATING MODEL ══════════ */}
      <section className="sl-section sl-model">
        <div className="sl-wrap">
          <div className="sl-reveal">
            <SectionLabel num="08" text="CONNECTED OPERATING MODEL" dark />
            <h2 className="sl-h2" style={{ color: "#ffffff" }}>One connected <span style={{ color: "#C6E84A" }}>operating model. </span></h2>
          </div>
          <div className="sl-model-stack">
            {modelLayers.map((layer) => (
              <div key={layer.num} className="sl-layer sl-reveal">
                <span className="sl-layer-num">{layer.num} —</span>
                <span className="sl-layer-name">{layer.name}</span>
                <span className="sl-layer-items">
                  {layer.items.map((item, j, arr) => (
                    <span key={item}>
                      {item}
                      {j < arr.length - 1 && <span className="sl-layer-pipe">|</span>}
                    </span>
                  ))}
                </span>
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
            <h2 className="sl-h2">Shipping understanding. <span style={{ color: "#C6E84A" }}>Intelligent execution.</span></h2>
          </div>
          <div className="sl-why-grid sl-reveal">
            {whyPoints.map((w) => (
              <article key={w.num} className="sl-why-card">
                <div className="sl-why-head">
                  <div className="sl-why-icon" aria-hidden="true">
                    <img src={w.icon} alt="" width="52" height="52" />
                  </div>
                  <div className="sl-why-head-text">
                    <span className="sl-why-num">{w.num}</span>
                    <h3>{w.name}</h3>
                  </div>
                </div>
                <p>{w.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 10 TRANSFORMATION IN ACTION ══════════ */}
      <section className="sl-trans">
        <div className="sl-trans-media">
          <img
            src="/services/Reimagining document-intensive logistics operations.png"
            alt="Logistics operations team working with shipment documentation"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="sl-trans-body">
          <div className="sl-reveal">
            <SectionLabel num="10" text="TRANSFORMATION IN ACTION" />
            <h2 className="sl-h2">Reimagining document-intensive <span style={{ color: "#C6E84A" }}>logistics operations</span>.</h2>
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
        <div className="sl-final-glow" aria-hidden="true" />
        <div className="sl-wrap">
          <div className="sl-final-inner sl-reveal">
            <SectionLabel num="11" text="LET'S MOVE FORWARD" dark />
            <h2>Ready to transform your <span style={{ color: "#C6E84A" }}>logistics operations</span>?</h2>
            <p className="sl-final-body">
              Whether you&apos;re rethinking documentation, freight operations, finance or automation, Sytrion can
              help you build a smarter and more scalable operating model.
            </p>
            <div className="sl-final-ctas">
              <Link href="/contact" className="btn-primary">
               Schedule a Consultation
              </Link>
              <Link href="/contact" className="btn-secondary">
                 Talk to Our Experts ↗
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
