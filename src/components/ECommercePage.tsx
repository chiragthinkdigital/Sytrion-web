"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ── DATA ────────────────────────────────────────────────────────── */

const challenges = [
  "Growing product & SKU complexity",
  "Multiple marketplaces & channels",
  "Real-time inventory expectations",
  "Rising customer expectations",
  "Returns, refunds & payment complexity",
  "Seasonal and promotional demand peaks",
];

const ecosystemCards = [
  {
    title: "Retailers & Brands",
    desc: "Connected operations across products, orders, customers, fulfillment and digital channels.",
    image: "/ecommerce/retailers.png",
  },
  {
    title: "Marketplaces",
    desc: "Scalable catalog, seller, order, customer and marketplace-support operations.",
    image: "/ecommerce/marketplaces.png",
  },
  {
    title: "D2C Businesses",
    desc: "End-to-end operational support designed for fast-growing direct-to-consumer brands.",
    image: "/ecommerce/d2c.png",
  },
];

const ibsTabs = [
  {
    num: "01",
    tab: "Products",
    title: "Product & Catalog Operations",
    lead: "Build and maintain commerce-ready product information at scale.",
    items: [
      "Product onboarding",
      "Catalog creation & maintenance",
      "Product-data enrichment",
      "Attribute management",
      "Product classification & tagging",
      "Image/content quality checks",
    ],
  },
  {
    num: "02",
    tab: "Marketplace",
    title: "Marketplace Operations",
    lead: "Simplify high-volume marketplace administration.",
    items: [
      "Product listing management",
      "Marketplace onboarding",
      "Seller/vendor administration",
      "Pricing & promotion updates",
      "Listing-quality management",
      "Marketplace issue resolution",
    ],
  },
  {
    num: "03",
    tab: "Orders",
    title: "Order Management",
    lead: "Move orders through the lifecycle with greater control.",
    items: [
      "Order validation",
      "Order processing",
      "Order-status management",
      "Order modifications",
      "Cancellation processing",
      "Exception management",
    ],
  },
  {
    num: "04",
    tab: "Fulfillment",
    title: "Fulfillment Operations",
    lead: "Keep fulfillment moving with visibility and coordination.",
    items: [
      "Inventory-status support",
      "Fulfillment coordination",
      "Shipment-status management",
      "Delivery exceptions",
      "Order tracking",
      "Operational reconciliation",
    ],
  },
  {
    num: "05",
    tab: "Customer",
    title: "Customer Operations",
    lead: "Turn every interaction into an opportunity to build loyalty.",
    items: [
      "Product queries",
      "Order support",
      "Delivery assistance",
      "Returns & refunds",
      "Payment queries",
      "Complaint management",
    ],
  },
  {
    num: "06",
    tab: "Data",
    title: "Commerce Data & Insights",
    lead: "Turn fragmented commerce information into reliable operational data.",
    items: [
      "Product-data quality",
      "Order analytics",
      "Customer insights",
      "Marketplace performance",
      "Return trends",
      "Operational dashboards",
    ],
  },
];

const productSteps = [
  { name: "INGEST", sub: "Product information" },
  { name: "CLASSIFY", sub: "Category & taxonomy" },
  { name: "ENRICH", sub: "Attributes & content" },
  { name: "VALIDATE", sub: "Quality & completeness" },
  { name: "PUBLISH", sub: "Channels & marketplaces" },
  { name: "MONITOR", sub: "Accuracy & updates" },
];

const orderSteps = [
  { name: "ORDER", sub: "Capture & validate" },
  { name: "PAYMENT", sub: "Confirm & reconcile" },
  { name: "ALLOCATE", sub: "Inventory & fulfillment" },
  { name: "SHIP", sub: "Dispatch & track" },
  { name: "DELIVER", sub: "Confirm completion" },
  { name: "SUPPORT", sub: "Resolve exceptions" },
];

const intelligenceNodes = [
  { title: "Product Intelligence", verbs: "Classify • Enrich • Optimize" },
  { title: "Content Intelligence", verbs: "Generate • Tag • Validate" },
  { title: "Customer Intelligence", verbs: "Understand • Personalize • Assist" },
  { title: "Order Intelligence", verbs: "Monitor • Prioritize • Resolve" },
  { title: "Inventory Intelligence", verbs: "Analyze • Forecast • Replenish" },
  { title: "Decision Intelligence", verbs: "Analyze • Predict • Improve" },
];

const commerceItems = [
  {
    title: "Product Data Enrichment & Classification",
    desc: "Ingest, classify and enrich product information so catalogs are accurate, complete and commerce-ready across every channel and marketplace.",
  },
  {
    title: "Order & Fulfillment Workflow Automation",
    desc: "Automate order validation, status management, fulfillment coordination and exception routing to reduce manual touchpoints and improve order accuracy.",
  },
  {
    title: "Returns & Refund Processing",
    desc: "Structure return initiation, validation, authorization, refund processing and inventory reconciliation into connected, visible workflows.",
  },
  {
    title: "Marketplace Listing Quality",
    desc: "Review listings for completeness, accuracy, policy compliance and content quality across multiple marketplace platforms.",
  },
  {
    title: "Customer Query Resolution",
    desc: "Combine AI-assisted support with skilled teams to resolve product, order, delivery and post-purchase queries across omnichannel touchpoints.",
  },
  {
    title: "Commerce Finance Reconciliation",
    desc: "Support order-to-cash, marketplace settlements, fee reconciliation, refund administration and financial exception management.",
  },
  {
    title: "Fraud & Trust Operations",
    desc: "Process transaction alerts, administer fraud cases, review suspicious activity and support marketplace trust and safety workflows.",
  },
  {
    title: "Human-in-the-Loop Governance",
    desc: "Maintain role-based review, traceable actions, configurable approvals and professional oversight for sensitive commerce workflows.",
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
    desc: "Streamlined workflows help reduce operational delays across orders, products and customer interactions.",
  },
  {
    num: "02",
    word: "ACCURATE",
    sub: "Greater accuracy",
    desc: "Structured validation helps improve product data, order processing and transaction quality.",
  },
  {
    num: "03",
    word: "EFFICIENT",
    sub: "Lower operational effort",
    desc: "Automation reduces repetitive manual activity across commerce operations.",
  },
  {
    num: "04",
    word: "VISIBLE",
    sub: "Better operational visibility",
    desc: "Connected reporting makes performance and exceptions easier to understand across channels.",
  },
  {
    num: "05",
    word: "EXPERIENCED",
    sub: "Better experiences",
    desc: "Simpler operations help create smoother interactions for customers, sellers and partners.",
  },
  {
    num: "06",
    word: "SCALABLE",
    sub: "Built to adapt",
    desc: "Flexible operations support changing volumes, seasonal peaks and evolving requirements.",
  },
];

const modelLayers = [
  {
    num: "01",
    name: "Commerce Ecosystem",
    items: "Customers • Sellers • Partners • Brands",
  },
  {
    num: "02",
    name: "Systems & Information",
    items: "Core Platforms • Marketplaces • Catalogs • Data • Interactions",
  },
  {
    num: "03",
    name: "Sytrion Intelligence Layer",
    items: "AI | Automation | Content Intelligence | Analytics",
  },
  {
    num: "04",
    name: "Intelligent Operations",
    items: "Products | Orders | Fulfillment | Customer | Finance",
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
    desc: "Operations designed around e-commerce's complex digital workflows.",
    icon: <svg key="domain" {...whyIconProps}><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/></svg>,
  },
  {
    num: "02",
    name: "AI-first",
    desc: "Intelligence applied where it can simplify work and improve operational decision support.",
    icon: <svg key="ai" {...whyIconProps}><path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5"/><circle cx="12" cy="16" r="4"/><path d="M12 12v-2"/><path d="M8 20h8"/></svg>,
  },
  {
    num: "03",
    name: "Human + Digital",
    desc: "Automation and skilled teams working together.",
    icon: <svg key="human" {...whyIconProps}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    num: "04",
    name: "Data-driven",
    desc: "Better information supporting better operational decisions.",
    icon: <svg key="data" {...whyIconProps}><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="7" width="4" height="14" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg>,
  },
  {
    num: "05",
    name: "Secure by Design",
    desc: "Controlled processes, access and governance embedded into delivery.",
    icon: <svg key="secure" {...whyIconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
  },
  {
    num: "06",
    name: "Built to Scale",
    desc: "Flexible models designed around changing operational requirements.",
    icon: <svg key="scale" {...whyIconProps}><path d="M3 17.5l5.5-5.5 3.5 3.5L20.5 7"/><path d="M14.5 7h6v6"/><path d="M3 7h4v4"/><path d="M17 13v4h-4"/></svg>,
  },
];

function EcLabel({ text, light }: { text: string; light?: boolean }) {
  return (
    <span className={`ec-label${light ? " ec-label--light" : ""}`}>
      {text}
    </span>
  );
}

export default function ECommercePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [accordionOpen, setAccordionOpen] = useState(0);
  const revealRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = revealRef.current;
    if (!root) return;
    const targets = root.querySelectorAll(".ec-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ec-in");
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
    <div className="ec-page" ref={revealRef}>
      <style>{`
        .ec-page { --ecn:#071426; --ecn2:#0B1F38; --ecb:#10315C; --ecc:#C6E84A; --ecl:#F5F9FC; color:#0E1B2A; background:#fff; font-family: var(--font-geist-sans), Arial, sans-serif; }
        .ec-page * { box-sizing: border-box; }
        .ec-wrap { max-width: 1400px; margin: 0 auto; }
        @media (max-width: 900px) {
          .ec-section-light, .ec-section-dark, .ec-section-navy, .ec-hero .ec-wrap, .ec-banner, .ec-transform .ec-wrap, .ec-final .ec-wrap { padding-left: 40px; padding-right: 40px; }
        }
        @media (max-width: 640px) {
          .ec-section-light, .ec-section-dark, .ec-section-navy, .ec-hero .ec-wrap, .ec-banner, .ec-transform .ec-wrap, .ec-final .ec-wrap { padding-left: 20px; padding-right: 20px; }
        }

        .ec-label { display: inline-block; background: #C6E84A; color: #0f0f0f; padding: 8px 20px; border-radius: 999px; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; font-variant: small-caps; margin-bottom: 24px; }
        .ec-label em { font-style: normal; }
        .ec-label--light { background: #C6E84A; color: #0f0f0f; }

        .ec-reveal { opacity: 0; transform: translateY(26px); transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .ec-reveal.ec-in { opacity: 1; transform: none; animation: ecSafety 0.8s ease-out 2.5s forwards; }
        @keyframes ecSafety { to { opacity: 1; transform: none; } }

        .ec-btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 16px 30px; border-radius: 999px; background: var(--ecc); color: #062033; font-size: 15px; font-weight: 700; letter-spacing: 0.02em; text-decoration: none; transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, background 0.3s ease; }
        .ec-btn:hover { transform: translateY(-2px); box-shadow: 0 16px 34px -14px rgba(198,232,74,0.55); background: #D9F77E; }
        .ec-btn--ghost { background: transparent; border: 1px solid rgba(255,255,255,0.45); color: #fff; }
        .ec-btn--ghost:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.7); box-shadow: none; }

        .ec-hero { position: relative; min-height: 94vh; display: flex; align-items: center; overflow: hidden; background: var(--ecn); }
        .ec-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .ec-hero-scrim { position: absolute; inset: 0; background: linear-gradient(100deg, rgba(4,12,24,0.94) 8%, rgba(6,18,36,0.72) 48%, rgba(7,22,44,0.32) 100%); }
        .ec-hero-scrim::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 220px; background: linear-gradient(180deg, rgba(4,12,24,0), rgba(4,12,24,0.85)); }
        .ec-hero .ec-wrap { position: relative; z-index: 1; width: 100%; padding: 140px 80px 120px; }
        .ec-hero-inner { max-width: 900px; }
        .ec-h1 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(42px, 6vw, 82px); line-height: 1.02; letter-spacing: -0.02em; font-weight: 700; color: #ffffff; margin: 28px 0 0; max-width: 780px; text-wrap: balance; }
        .ec-hero-sub { font-size: clamp(17px, 1.6vw, 21px); line-height: 1.65; color: rgba(255,255,255,0.88); max-width: 720px; margin: 26px 0 0; }
        .ec-hero-body { font-size: 16px; line-height: 1.75; color: rgba(255,255,255,0.68); max-width: 660px; margin: 18px 0 0; }
        .ec-hero-ctas { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 40px; }

        .ec-section-light { background: #ffffff; padding: clamp(76px, 9vw, 128px) 80px; }
        .ec-section-dark { background: var(--ecn); padding: clamp(76px, 9vw, 128px) 80px; }
        .ec-section-navy { background: linear-gradient(180deg, #081A31 0%, #071426 100%); padding: clamp(76px, 9vw, 128px) 80px; }
        .ec-head { max-width: none; }
        .ec-h2 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(32px, 5vw, 48px); font-weight: 700; line-height: 1.15; letter-spacing: -0.02em; margin: 0 0 20px; }
        .ec-section-light .ec-h2 { color: #0f172a; }
        .ec-section-dark .ec-h2, .ec-section-navy .ec-h2 { color: #ffffff; }
        .ec-h2 span { color: #C6E84A; }
        .ec-lede { font-size: 19px; font-weight: 400; line-height: 1.8; margin: 0 0 12px; }
        .ec-section-light .ec-lede { color: #5A5D66; }
        .ec-section-dark .ec-lede, .ec-section-navy .ec-lede { color: rgba(255,255,255,0.6); }
        .ec-copy { font-size: 19px; font-weight: 400; line-height: 1.8; margin: 0 0 12px; }
        .ec-section-light .ec-copy { color: #5A5D66; }
        .ec-section-dark .ec-copy, .ec-section-navy .ec-copy { color: rgba(255,255,255,0.6); }

        .ec-land-grid { margin-bottom: 0; }
        .ec-land-row { display: grid; grid-template-columns: 1fr 1.1fr; gap: 80px; align-items: start; margin-top: 40px; }
        .ec-section-landscape { padding-bottom: clamp(40px, 5vw, 60px); }
        .ec-head h2 { position: relative; padding-bottom: 12px; }
        .ec-head h2::after { content: ""; display: block; width: 64px; height: 4px; background: #C4E538; margin-top: 14px; }
        .ec-landscape-right { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
        .ec-challenge-card { background: #FAFBFC; border: 1px solid #EDF0F3; border-radius: 14px; padding: 18px 20px; position: relative; transition: transform .25s ease, background .25s ease, border-color .25s ease, box-shadow .25s ease; }
        .ec-challenge-card:hover { transform: translateY(-3px); background: #FFFFFF; border-color: #0A1628; box-shadow: 0 12px 30px -12px rgba(10,22,40,0.18); }
        .ec-challenge-card:hover::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: #C4E538; transform: scaleY(1); transform-origin: bottom; }
        .ec-challenge-card::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: #C4E538; transform: scaleY(0); transform-origin: bottom; transition: transform .25s ease; }
        .ec-challenge-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .ec-challenge-num { font-size: 12px; font-weight: 700; color: #97A83A; font-variant-numeric: tabular-nums; letter-spacing: .02em; }
        .ec-challenge-icon { width: 34px; height: 34px; border-radius: 9px; background: #0A1628; display: flex; align-items: center; justify-content: center; }
        .ec-challenge-icon svg { width: 16px; height: 16px; stroke: #C4E538; fill: none; stroke-width: 2; }
        .ec-challenge-label { font-size: 16px; font-weight: 600; color: #0A1628; }
        .ec-approach { border-top: 1px solid #E2E5E9; padding: 40px 0 0; display: grid; grid-template-columns: 260px 1fr; gap: 40px; align-items: start; }
        .ec-approach-label { font-size: 12px; font-weight: 600; letter-spacing: .18em; text-transform: uppercase; color: #8A93A3; }
        .ec-approach-text { font-size: 30px; line-height: 1.55; color: #0A1628; font-weight: 500; max-width: 760px; }
        .ec-approach-text em { font-style: normal; font-weight: 600; }

        .ec-eco-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 56px; }
        .ec-eco-card { position: relative; overflow: hidden; border-radius: 20px; aspect-ratio: 4 / 5; background: var(--ecn2); }
        .ec-eco-card img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .ec-eco-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(7,20,38,0.05) 35%, rgba(6,16,31,0.88) 88%); }
        .ec-eco-card:hover img { transform: scale(1.06); }
        .ec-eco-body { position: absolute; left: 0; right: 0; bottom: 0; padding: 26px 24px; z-index: 1; }
        .ec-eco-title { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 19px; font-weight: 700; line-height: 1.3; color: #ffffff; margin: 0; }
        .ec-eco-desc { font-size: 13.5px; line-height: 1.6; color: rgba(255,255,255,0.72); margin: 10px 0 0; }
        .ec-eco-link { display: inline-block; margin-top: 16px; font-size: 13px; font-weight: 700; letter-spacing: 0.06em; color: #ffffff; text-decoration: underline; text-underline-offset: 5px; text-decoration-color: rgba(255,255,255,0.5); transition: color 0.3s ease, text-decoration-color 0.3s ease; }
        .ec-eco-card:hover .ec-eco-link { color: var(--ecc); text-decoration-color: var(--ecc); }

        .ec-ibs-tabs { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 48px; border-bottom: 1px solid rgba(12,27,48,0.1); padding-bottom: 0; }
        .ec-ibs-tab { appearance: none; background: transparent; border: none; cursor: pointer; font-family: inherit; position: relative; display: inline-flex; align-items: baseline; gap: 8px; padding: 14px 18px 16px; font-size: 15px; font-weight: 600; color: #7A8AA0; transition: color 0.25s ease; }
        .ec-ibs-tab em { font-style: normal; font-size: 11.5px; font-weight: 700; color: #A9B6C6; font-variant-numeric: tabular-nums; transition: color 0.25s ease; }
        .ec-ibs-tab::after { content: ""; position: absolute; left: 18px; right: 18px; bottom: -1px; height: 3px; border-radius: 2px 2px 0 0; background: var(--ecc); transform: scaleX(0); transform-origin: left; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); }
        .ec-ibs-tab:hover { color: #14263C; }
        .ec-ibs-tab--active { color: #0C1B30; }
        .ec-ibs-tab--active em { color: var(--ecc); }
        .ec-ibs-tab--active::after { transform: scaleX(1); }
        .ec-ibs-panel { margin-top: 44px; animation: ecPanelIn 0.5s cubic-bezier(0.16,1,0.3,1); display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(36px, 6vw, 100px); align-items: center; }
        @keyframes ecPanelIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .ec-ibs-title { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(24px, 2.6vw, 34px); font-weight: 700; line-height: 1.2; color: #0C1B30; margin: 0; }
        .ec-ibs-lead { font-size: 18px; line-height: 1.7; color: #42556D; margin: 16px 0 0; }
        .ec-ibs-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 clamp(28px, 4vw, 56px); }
        .ec-ibs-item { display: flex; align-items: baseline; gap: 14px; padding: 15px 2px; border-top: 1px solid rgba(12,27,48,0.09); font-size: 16px; color: #33475E; }
        .ec-ibs-item::before { content: ""; width: 6px; height: 6px; flex: 0 0 auto; border-radius: 50%; background: var(--ecc); align-self: center; }

        .ec-split { display: grid; grid-template-columns: 1fr 1.15fr; gap: clamp(36px, 5vw, 80px); align-items: center; }
        .ec-feature-img { position: relative; overflow: hidden; border-radius: 22px; aspect-ratio: 4 / 4.6; }
        .ec-feature-img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .ec-feature-tint { position: absolute; inset: 0; background: linear-gradient(200deg, rgba(198,232,74,0.16) 0%, rgba(7,20,38,0.05) 40%, rgba(7,20,38,0.55) 100%); }
        .ec-steps { list-style: none; margin: 36px 0 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px 18px; counter-reset: step; }
        .ec-step { position: relative; padding-left: 18px; }
        .ec-step::before { content: ""; position: absolute; left: 0; top: 4px; bottom: 4px; width: 2px; border-radius: 2px; background: linear-gradient(180deg, var(--ecc), rgba(198,232,74,0.15)); }
        .ec-step-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 11.5px; font-weight: 700; letter-spacing: 0.14em; color: var(--ecc); font-variant-numeric: tabular-nums; }
        .ec-step-name { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 16.5px; font-weight: 700; letter-spacing: 0.06em; color: #ffffff; margin: 5px 0 0; }
        .ec-step-sub { font-size: 13px; line-height: 1.55; color: rgba(255,255,255,0.6); margin: 4px 0 0; }

        .ec-prov-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: clamp(36px, 5vw, 90px); align-items: center; }
        .ec-prov-img { position: relative; overflow: hidden; border-radius: 22px; aspect-ratio: 4 / 4.8; box-shadow: 0 34px 70px -40px rgba(12,27,48,0.45); }
        .ec-prov-img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .ec-prov-net { position: absolute; inset: 0; background:
          radial-gradient(circle at 78% 18%, rgba(198,232,74,0.28), rgba(198,232,74,0) 34%),
          linear-gradient(210deg, rgba(16,49,92,0.06) 0%, rgba(12,27,48,0.42) 100%); }
        .ec-timeline { list-style: none; margin: 34px 0 0; padding: 0 0 0 30px; position: relative; }
        .ec-timeline::before { content: ""; position: absolute; left: 7px; top: 8px; bottom: 8px; width: 2px; background: linear-gradient(180deg, var(--ecc), rgba(16,49,92,0.18)); }
        .ec-tstep { position: relative; padding: 0 0 30px 24px; }
        .ec-tstep:last-child { padding-bottom: 0; }
        .ec-tstep::before { content: ""; position: absolute; left: -30px; top: 5px; width: 16px; height: 16px; border-radius: 50%; background: #ffffff; border: 3px solid var(--ecc); box-shadow: 0 0 0 5px rgba(198,232,74,0.14); }
        .ec-tstep-name { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 17px; font-weight: 700; letter-spacing: 0.06em; color: #0C1B30; }
        .ec-tstep-sub { font-size: 14px; line-height: 1.6; color: #5A6B7F; margin: 4px 0 0; }

        .ec-intel { position: relative; overflow: hidden; }
        .ec-intel-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.16; }
        .ec-intel-veil { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 46%, rgba(7,20,38,0.55) 0%, rgba(5,13,25,0.96) 72%); }
        .ec-intel .ec-wrap { position: relative; z-index: 1; }
        .ec-tree { margin-top: clamp(36px, 5vw, 64px); }
        .ec-core { position: relative; width: 190px; height: 190px; margin: 0 auto; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; background: radial-gradient(circle at 34% 30%, rgba(222,248,150,0.95), rgba(198,232,74,0.75) 45%, rgba(16,49,92,0.9) 100%); box-shadow: 0 0 60px rgba(198,232,74,0.45), 0 0 140px rgba(198,232,74,0.22); animation: ecPulse 3.6s ease-in-out infinite; text-align: center; z-index: 2; }
        @keyframes ecPulse { 0%, 100% { box-shadow: 0 0 60px rgba(198,232,74,0.42), 0 0 140px rgba(198,232,74,0.2); } 50% { box-shadow: 0 0 84px rgba(198,232,74,0.62), 0 0 180px rgba(198,232,74,0.32); } }
        .ec-core-name { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 15px; font-weight: 700; color: #04202F; line-height: 1.25; padding: 0 18px; }
        .ec-core-sub { font-size: 10px; font-weight: 700; letter-spacing: 0.22em; color: #06344B; }
        .ec-tree-links { position: relative; height: 56px; }
        .ec-tree-trunk { position: absolute; left: 50%; top: 0; width: 2px; height: 28px; margin-left: -1px; background: linear-gradient(180deg, rgba(198,232,74,0.85), rgba(198,232,74,0.4)); }
        .ec-tree-bar { position: absolute; top: 27px; left: calc((100% - 80px) / 12); right: calc((100% - 80px) / 12); height: 2px; background: linear-gradient(90deg, rgba(198,232,74,0.12), rgba(198,232,74,0.45) 18%, rgba(198,232,74,0.45) 82%, rgba(198,232,74,0.12)); }
        .ec-tree-row { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 16px; }
        .ec-node { position: relative; border-radius: 16px; padding: 20px 18px 18px; background: rgba(9,26,48,0.82); border: 1px solid rgba(198,232,74,0.24); backdrop-filter: blur(6px); transition: border-color 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1); }
        .ec-node::before { content: ""; position: absolute; left: 50%; top: -27px; width: 2px; height: 27px; margin-left: -1px; background: linear-gradient(180deg, rgba(198,232,74,0.45), rgba(198,232,74,0.7)); }
        .ec-node::after { content: ""; position: absolute; left: 50%; top: -31px; width: 6px; height: 6px; margin-left: -3px; border-radius: 50%; background: var(--ecc); box-shadow: 0 0 10px rgba(198,232,74,0.85); }
        .ec-node:hover { border-color: rgba(198,232,74,0.65); background: rgba(13,34,62,0.92); transform: translateY(-4px); }
        .ec-node-title { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 15.5px; font-weight: 700; color: #ffffff; margin: 0; }
        .ec-node-verbs { font-size: 11.5px; letter-spacing: 0.08em; font-weight: 600; color: var(--ecc); margin: 8px 0 0; }

        .ec-clin-hero { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(32px, 4.5vw, 72px); align-items: center; }
        .ec-clin-img { position: relative; overflow: hidden; border-radius: 22px; aspect-ratio: 16 / 11; }
        .ec-clin-img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .ec-clin-tint { position: absolute; inset: 0; background: linear-gradient(190deg, rgba(16,49,92,0.18), rgba(5,13,25,0.62) 85%); }
        .ec-chip-row { position: absolute; left: 18px; right: 18px; bottom: 18px; display: flex; flex-wrap: wrap; gap: 8px; z-index: 1; }
        .ec-chip { font-size: 10.5px; font-weight: 700; letter-spacing: 0.14em; color: var(--ecc); background: rgba(5,17,32,0.78); border: 1px solid rgba(198,232,74,0.35); border-radius: 999px; padding: 7px 12px; backdrop-filter: blur(4px); }
        .ec-cards2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; margin-top: 54px; }
        .ec-clin-card { border-radius: 16px; padding: 26px 24px; background: linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015)); border: 1px solid rgba(198,232,74,0.14); transition: border-color 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1); }
        .ec-clin-card:hover { border-color: rgba(198,232,74,0.45); transform: translateY(-4px); }
        .ec-clin-card h3 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 17px; font-weight: 700; color: #ffffff; margin: 0; }
        .ec-clin-card p { font-size: 14.5px; line-height: 1.7; color: rgba(255,255,255,0.66); margin: 10px 0 0; }
        .ec-cont-rule { display: flex; align-items: center; gap: 16px; margin: 58px 0 0; }
        .ec-cont-rule::before, .ec-cont-rule::after { content: ""; height: 1px; flex: 1; background: linear-gradient(90deg, rgba(198,232,74,0), rgba(198,232,74,0.5), rgba(198,232,74,0)); }
        .ec-cont-label { font-size: 11px; font-weight: 700; letter-spacing: 0.3em; color: var(--ecc); }

        .ec-clin-accordion { margin-top:48px; }
        .ec-clin-item { background:#0B1729; border:1px solid #173049; border-radius:10px; margin-bottom:8px; overflow:hidden; }
        .ec-clin-header { width:100%; display:flex; align-items:center; justify-content:space-between; padding:16px 20px; background:transparent; border:none; color:#F5F7FA; font-family:var(--font-syne),Arial,Helvetica,sans-serif; font-size:15px; font-weight:600; text-align:left; cursor:pointer; }
        .ec-clin-header:focus { outline:none; }
        .ec-clin-chevron { color:#5EE6FF; transition:transform .25s ease; flex:0 0 auto; margin-left:12px; }
        .ec-clin-chevron[data-open="true"] { transform:rotate(180deg); }
        .ec-clin-panel { max-height:0; overflow:hidden; transition:max-height .25s ease; }
        .ec-clin-panel.is-open { max-height:500px; }
        .ec-clin-panel-inner { padding:0 20px 16px; color:#9AA7B8; font-size:13px; line-height:1.6; }

        .ec-out-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; margin-top: 56px; }
        .ec-outcome { position: relative; overflow: hidden; background: #ffffff; border: 1px solid rgba(12,27,48,0.08); border-radius: 20px; padding: clamp(28px, 2.5vw, 36px); display: flex; flex-direction: column; box-shadow: 0 4px 20px -6px rgba(12,27,48,0.04); transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.35s ease, box-shadow 0.35s ease; }
        .ec-outcome::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 3px; background: linear-gradient(90deg, #7AA306, #C6E84A); opacity: 0; transition: opacity 0.35s ease; }
        .ec-outcome:hover { transform: translateY(-6px); border-color: rgba(122,163,6,0.35); box-shadow: 0 24px 48px -18px rgba(12,27,48,0.12); }
        .ec-outcome:hover::after { opacity: 1; }
        .ec-outcome-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .ec-outcome-icon { width: 48px; height: 48px; border-radius: 14px; background: rgba(198,232,74,0.12); border: 1px solid rgba(122,163,6,0.2); display: flex; align-items: center; justify-content: center; color: #618300; transition: background 0.35s ease, border-color 0.35s ease, color 0.35s ease, transform 0.35s ease; }
        .ec-outcome:hover .ec-outcome-icon { background: #C6E84A; border-color: #C6E84A; color: #0C1B30; transform: scale(1.06); }
        .ec-outcome-word { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(22px, 2.2vw, 28px); font-weight: 700; letter-spacing: -0.01em; color: #0C1B30; margin: 0; }
        .ec-outcome-sub { font-size: 15px; font-weight: 600; color: #7AA306; margin: 6px 0 0; }
        .ec-outcome-desc { font-size: 14.5px; line-height: 1.65; color: #5A6B7F; margin: 12px 0 0; }

        .ec-stack { display: flex; flex-direction: column; gap: 12px; margin-top: 56px; }
        .ec-layer { display: grid; grid-template-columns: 90px 320px 1fr; align-items: center; gap: 20px; border-radius: 14px; padding: 24px 30px; background: #0C2036; border: 1px solid rgba(198,232,74,0.12); transition: border-color 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1); }
        .ec-layer:nth-child(2), .ec-layer:nth-child(4) { background: #10294A; }
        .ec-layer:hover { border-color: rgba(198,232,74,0.4); transform: translateX(6px); }
        .ec-layer--core { background: linear-gradient(90deg, #C6E84A, #7AA306); border-color: rgba(222,248,150,0.8); box-shadow: 0 0 50px rgba(198,232,74,0.3); }
        .ec-layer--core .ec-layer-num, .ec-layer--core .ec-layer-items { color: #06344B; }
        .ec-layer--core .ec-layer-name { color: #04202F; }
        .ec-layer-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; color: var(--ecc); font-variant-numeric: tabular-nums; }
        .ec-layer-name { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #ffffff; }
        .ec-layer-items { font-size: 12.5px; letter-spacing: 0.05em; color: rgba(255,255,255,0.62); }

        .ec-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 56px; }
        .ec-why-card { position: relative; border-radius: 16px; padding: 28px 24px 26px; background: #FAFBFC; border: 1px solid #EDF0F3; display: flex; flex-direction: column; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.35s ease, box-shadow 0.35s ease; }
        .ec-why-card::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 3px; border-radius: 0 0 16px 16px; background: linear-gradient(90deg, #7AA306, #C6E84A); opacity: 0; transition: opacity 0.35s ease; }
        .ec-why-card:hover { transform: translateY(-4px); border-color: rgba(122,163,6,0.35); box-shadow: 0 12px 30px -12px rgba(10,22,40,0.12); }
        .ec-why-card:hover::after { opacity: 1; }
        .ec-why-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(198,232,74,0.12); border: 1px solid rgba(122,163,6,0.2); display: flex; align-items: center; justify-content: center; color: #618300; margin-bottom: 18px; transition: background 0.35s ease, border-color 0.35s ease, color 0.35s ease, transform 0.35s ease; }
        .ec-why-card:hover .ec-why-icon { background: #C6E84A; border-color: #C6E84A; color: #0C1B30; transform: scale(1.06); }
        .ec-why-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; color: #7AA306; font-variant-numeric: tabular-nums; }
        .ec-why-card h3 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 17px; font-weight: 700; color: #0C1B30; margin: 8px 0 0; }
        .ec-why-card p { font-size: 14px; line-height: 1.65; color: #5A6B7F; margin: 8px 0 0; }

        .ec-transform { display:grid; grid-template-columns:1fr 1fr; min-height:700px; isolation:isolate; overflow:hidden; }
        .ec-transform-panel { padding:56px 64px; display:flex; }
        .ec-transform-panel--dark { position:relative; background:radial-gradient(circle at 30% 20%, #132745 0%, #0A1628 55%, #050B14 100%); color:#F5F7FA; overflow:hidden; }
        .ec-transform-panel--dark::before { content:""; position:absolute; left:-80px; bottom:-80px; width:380px; height:380px; background:radial-gradient(circle, rgba(196,229,56,0.12), transparent 70%); pointer-events:none; }
        .ec-transform-panel--light { background:#FFFFFF; color:#0A1628; }
        .ec-transform-panel-inner { width:100%; display:flex; flex-direction:column; }
        .ec-transform-panel--light .ec-transform-panel-inner { justify-content:center; }
        .ec-transform-badge { display:inline-block; align-self:flex-start; background:#C4E538; color:#2B3B0A; padding:5px 14px; border-radius:999px; font-weight:700; font-size:11px; letter-spacing:.04em; text-transform:uppercase; margin-bottom:24px; }
        .ec-transform h3 { font-family:var(--font-syne),Arial,Helvetica,sans-serif; font-size:clamp(22px,2.4vw,30px); font-weight:600; margin:22px 0 0; color:inherit; }
        .ec-transform-panel--dark > .ec-transform-panel-inner > p { font-size:16px; line-height:1.75; margin:14px 0 0; max-width:340px; color:#93A0B4; }
        .ec-transform-panel--light > .ec-transform-panel-inner > p { font-size:16px; line-height:1.75; margin:14px 0 0; max-width:460px; color:#5B6472; }
        .ec-transform-illustration { flex:1; display:flex; align-items:flex-end; justify-content:center; margin-top:32px; }
        .ec-transform-illustration svg { width:100%; max-width:480px; height:auto; }
        .ec-pot-heading { display:flex; align-items:center; gap:12px; margin:28px 0 16px; font-family:var(--font-syne),Arial,Helvetica,sans-serif; font-size:19px; font-weight:700; color:#0A1628; text-transform:uppercase; letter-spacing:.04em; }
        .ec-pot-heading span { white-space:nowrap; }
        .ec-pot-heading::after { content:""; flex:1; height:1px; background:linear-gradient(90deg, #C4E538, #E5E8EC 60%); }
        .ec-pot-checklist { list-style:none; margin:0; padding:0; }
        .ec-pot-checklist li { display:flex; align-items:center; gap:12px; padding:12px 0; border-top:1px solid #EEF0F3; font-size:15px; font-weight:600; color:#1D2733; transition:background .2s ease, border-left .2s ease; border-left:2px solid transparent; }
        .ec-pot-checklist li:last-child { border-top: 1px solid #EEF0F3; }
        .ec-pot-checklist li:hover { background:#FAFBF6; border-left-color:#C4E538; }
        .ec-pot-badge { width:26px; height:26px; border-radius:50%; background:#0A1628; color:#C4E538; display:flex; align-items:center; justify-content:center; flex:0 0 auto; font-weight:700; font-size:14px; }
        .ec-transform-cta { display:inline-flex; align-items:center; gap:10px; align-self:flex-start; background:#0A1628; color:#F5F7FA; padding:12px 22px; border-radius:100px; font-weight:700; text-decoration:none; margin-top:28px; transition:background .15s ease, transform .15s ease; }
        .ec-transform-cta span { display:inline-block; transition:transform .15s ease; }
        .ec-transform-cta:hover { background:#142544; transform:translateY(-1px); }
        .ec-transform-cta:hover span { transform:translateX(3px); }
        @media (prefers-reduced-motion:reduce){ .ec-pot-checklist li:hover{ border-left-color:#C4E538; } .ec-transform-cta:hover{ transform:none; } .ec-transform-cta:hover span{ transform:none; } }
        @media (max-width:900px){ .ec-transform{ grid-template-columns:1fr; min-height:auto; } .ec-transform-panel{ padding:32px 24px; } }

        .ec-final { position: relative; overflow: hidden; background: #0f0f0f; text-align: center; padding: 100px 80px; }
        .ec-final-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 600px; height: 400px; background: radial-gradient(circle, rgba(198,232,74,0.12) 0%, transparent 70%); border-radius: 50%; pointer-events: none; }
        .ec-final .ec-wrap { position: relative; z-index: 1; }
        .ec-final-inner { max-width: 750px; margin: 0 auto; }
        .ec-final-eyebrow { display: inline-block; font-size: 12px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: #C6E84A; margin-bottom: 22px; }
        .ec-final-h2 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(32px, 4vw, 40px); line-height: 1.3; font-weight: 700; color: #FFFFFF; margin: 0 0 20px; }
        .ec-final-body { font-size: 17px; line-height: 1.7; color: #DCDECD; max-width: 640px; margin: 20px auto 0; }
        .ec-final-ctas { display: flex; justify-content: center; gap: 20px; margin-top: 40px; flex-wrap: wrap; }
        .ec-final .ec-btn { position: relative; overflow: hidden; padding: 16px 32px; border-radius: 9999px; font-size: 16px; font-weight: 700; cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease, color 0.3s ease; text-decoration: none; display: inline-block; }
        .ec-final .ec-btn-primary { background: #C6E84A; color: #0f0f0f; }
        .ec-final .ec-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(198,232,74,0.35); }
        .ec-final .ec-btn-ghost { background: transparent; color: #FFFFFF; border: 1.5px solid #FFFFFF; }
        .ec-final .ec-btn-ghost:hover { background: #FFFFFF; color: #0f0f0f; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,255,255,0.15); }

        @media (max-width: 1080px) {
          .ec-steps { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 900px) {
          .ec-land-grid, .ec-split, .ec-prov-grid, .ec-clin-hero { grid-template-columns: 1fr; }
          .ec-land-row { grid-template-columns: 1fr; }
          .ec-ibs-panel { grid-template-columns: 1fr; gap: 26px; }
          .ec-eco-grid { grid-template-columns: 1fr; }
          .ec-eco-card { aspect-ratio: 4 / 3; }
          .ec-cards2 { grid-template-columns: 1fr 1fr; }
          .ec-out-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .ec-outcome:nth-child(5) { grid-column: span 1; }
          .ec-why-grid { grid-template-columns: 1fr 1fr; }
          .ec-tree-links { display: none; }
          .ec-node::before, .ec-node::after { display: none; }
          .ec-node { transform: none; }
          .ec-tree-row { grid-template-columns: 1fr 1fr; gap: 14px; }
          .ec-transform-half { width: 100%; height: 50%; bottom: auto; }
          .ec-transform-half--light { top: 50%; bottom: 0; }
          .ec-transform-grid { grid-template-columns: 1fr; gap: 44px; }
          .ec-transform-cta { left: 50%; bottom: 24px; }
        }
        @media (max-width: 800px) {
          .ec-approach { grid-template-columns: 1fr; padding: 48px 0 80px; }
        }
        @media (max-width: 640px) {
          .ec-cards2, .ec-out-grid, .ec-why-grid { grid-template-columns: 1fr; }
          .ec-outcome:nth-child(5) { grid-column: span 1; }
          .ec-ibs-list { grid-template-columns: 1fr; }
          .ec-ibs-tabs { gap: 2px; }
          .ec-ibs-tab { padding: 12px 10px 14px; font-size: 13.5px; }
          .ec-layer { grid-template-columns: 1fr; gap: 8px; padding: 20px; }
          .ec-hero-ctas .ec-btn, .ec-final-ctas .ec-btn { width: 100%; }
          .ec-tree-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .ec-landscape-right { grid-template-columns: 1fr; }
        }
        @media (max-width: 1024px) {
          .ec-final { padding: 80px 40px !important; }
        }
        @media (max-width: 768px) {
          .ec-final { padding: 60px 20px !important; }
          .ec-final-ctas { flex-direction: column; align-items: center; }
          .ec-final .ec-btn { width: 100%; max-width: 320px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ec-reveal { opacity: 1; transform: none; transition: none; animation: none; }
          .ec-core { animation: none; }
        }
      `}</style>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="ec-hero">
        <img className="ec-hero-img" src="/ecommerce/ecommerce-hero.png" alt="Modern e-commerce fulfillment center with digital operations" />
        <div className="ec-hero-scrim" />
        <div className="ec-wrap">
          <div className="ec-hero-inner ec-reveal">
            <EcLabel text="E-Commerce Operations" />
            <h1 className="ec-h1">Intelligent operations behind every <span style={{ color: "#C6E84A" }}>digital order.</span></h1>
            <p className="ec-hero-sub">Transforming e-commerce operations through domain expertise, AI, automation and data intelligence.</p>
            <p className="ec-hero-body">From product onboarding and marketplace operations to order management, customer experience, returns and finance, Sytrion helps digital commerce businesses simplify complexity and build connected operations designed to scale.</p>
            <div className="ec-hero-ctas">
              <Link href="#capabilities" className="ec-btn">Explore Our Capabilities ↓</Link>
              <Link href="/contact" className="ec-btn ec-btn--ghost">Talk to Our Experts ↗</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── LANDSCAPE ──────────────────────────────────────────── */}
      <section className="ec-section-light ec-section-landscape">
        <div className="ec-wrap">
          <div className="ec-land-grid ec-reveal">
            <EcLabel text="A World of Always-On Commerce" light />
            <h2 className="ec-h2">Every click creates an <span style={{ color: "#C6E84A" }}>operational promise.</span></h2>
          </div>
          <div className="ec-land-row ec-reveal">
            <div className="ec-landscape-text">
              <p className="ec-lede">Today's customers expect products to be easy to discover, simple to purchase and delivered exactly when promised.</p>
              <p className="ec-copy">Behind that experience sits a complex network of catalogs, marketplaces, inventory, orders, payments, fulfillment, returns and customer interactions — operating continuously across channels and geographies.</p>
            </div>
            <div className="ec-landscape-right">
              {challenges.map((c, i) => (
                <article key={c} className="ec-challenge-card">
                  <div className="ec-challenge-top">
                    <span className="ec-challenge-num">{String(i + 1).padStart(2, "0")}</span>
                    <div className="ec-challenge-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        {i===0 && <><path d="M4 7h16v10H4z"/><path d="M8 7v10M12 7v10M16 7v10"/></>}
                        {i===1 && <><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/></>}
                        {i===2 && <><circle cx="7" cy="12" r="3"/><circle cx="17" cy="12" r="3"/><line x1="10" y1="12" x2="14" y2="12"/></>}
                        {i===3 && <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h10M7 13h10"/></>}
                        {i===4 && <><circle cx="12" cy="12" r="9"/><path d="M12 7v10M7 12h10"/></>}
                        {i===5 && <><path d="M4 17l5-5 3 3 7-7"/><path d="M4 14h14"/></>}
                      </svg>
                    </div>
                  </div>
                  <div className="ec-challenge-label">{c}</div>
                </article>
              ))}
            </div>
          </div>
          <div className="ec-approach ec-reveal">
            <div className="ec-approach-label">OUR APPROACH</div>
            <p className="ec-approach-text">We connect <em>products, orders, customers, data</em> and <em>intelligence</em> to keep digital commerce moving.</p>
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM ──────────────────────────────────────────── */}
      <section className="ec-section-navy">
        <div className="ec-wrap">
          <div className="ec-head ec-reveal">
            <EcLabel text="Across the Digital Commerce Ecosystem" />
            <h2 className="ec-h2">Built around the businesses shaping how the world <span style={{ color: "#C6E84A" }}>shops.</span></h2>
          </div>
          <div className="ec-eco-grid ec-reveal">
            {ecosystemCards.map((card) => (
              <article key={card.title} className="ec-eco-card">
                <img src={card.image} alt={card.title} />
                <div className="ec-eco-overlay" />
                <div className="ec-eco-body">
                  <h3 className="ec-eco-title">{card.title}</h3>
                  <p className="ec-eco-desc">{card.desc}</p>
                  <a href="#capabilities" className="ec-eco-link">Explore →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── IBS TABS ───────────────────────────────────────────── */}
      <section className="ec-section-light" id="capabilities">
        <div className="ec-wrap">
          <div className="ec-head ec-reveal">
            <EcLabel text="Intelligent E-Commerce Operations" light />
            <h2 className="ec-h2">From product discovery to post-purchase — <span style={{ color: "#C6E84A" }}>connected.</span></h2>
            <p className="ec-lede">Sytrion combines commerce-domain expertise with AI, automation and data to manage high-volume digital operations with greater speed, accuracy and visibility.</p>
          </div>
          <div className="ec-ibs-tabs ec-reveal" role="tablist" aria-label="Intelligent e-commerce operations">
            {ibsTabs.map((t, i) => (
              <button
                key={t.num}
                type="button"
                role="tab"
                aria-selected={activeTab === i}
                className={`ec-ibs-tab${activeTab === i ? " ec-ibs-tab--active" : ""}`}
                onClick={() => setActiveTab(i)}
              >
                <em>{t.num}</em> {t.tab}
              </button>
            ))}
          </div>
          <div key={activeTab} className="ec-ibs-panel" role="tabpanel">
            <div className="ec-ibs-intro">
              <h3 className="ec-ibs-title">{ibsTabs[activeTab].title}</h3>
              <p className="ec-ibs-lead">{ibsTabs[activeTab].lead}</p>
            </div>
            <ul className="ec-ibs-list">
              {ibsTabs[activeTab].items.map((item) => (
                <li key={item} className="ec-ibs-item">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── DIGITAL SHELF (Split image + steps) ────────────────── */}
      <section className="ec-section-dark">
        <div className="ec-wrap">
          <div className="ec-split">
            <div className="ec-feature-img ec-reveal">
              <img src="/ecommerce/digital-shelf.png" alt="E-commerce product data specialist working with product catalog" />
              <div className="ec-feature-tint" />
            </div>
            <div className="ec-reveal">
              <EcLabel text="Digital Shelf Operations" />
              <h2 className="ec-h2">Every great shopping experience starts with great <span style={{ color: "#C6E84A" }}>product data.</span></h2>
              <p className="ec-lede">Accurate titles, attributes, images, descriptions, categories and specifications influence how products are discovered, understood and purchased.</p>
              <p className="ec-copy">Sytrion combines structured operations, AI and human quality review to help businesses maintain accurate, enriched and commerce-ready product information.</p>
              <ol className="ec-steps">
                {productSteps.map((s, i) => (
                  <li key={s.name} className="ec-step">
                    <span className="ec-step-num">{String(i + 1).padStart(2, "0")}</span>
                    <div className="ec-step-name">{s.name}</div>
                    <div className="ec-step-sub">{s.sub}</div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── ORDER & FULFILLMENT (Timeline) ─────────────────────── */}
      <section className="ec-section-light">
        <div className="ec-wrap">
          <div className="ec-prov-grid">
            <div className="ec-prov-img ec-reveal">
              <img src="/ecommerce/order-fulfillment.png" alt="Order fulfillment operations in a modern warehouse" />
              <div className="ec-prov-net" />
            </div>
            <div className="ec-reveal">
              <EcLabel text="Order & Fulfillment" light />
              <h2 className="ec-h2">From &quot;Buy Now&quot; to <span style={{ color: "#C6E84A" }}>delivered.</span></h2>
              <p className="ec-lede">The moment a customer places an order, multiple processes begin across payment, inventory, fulfillment, logistics and customer communication.</p>
              <p className="ec-copy">Sytrion helps connect those workflows so orders move through the lifecycle with greater visibility and control.</p>
              <ol className="ec-timeline">
                {orderSteps.map((s) => (
                  <li key={s.name} className="ec-tstep">
                    <span className="ec-tstep-name">{s.name}</span>
                    <span className="ec-tstep-sub">{s.sub}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTELLIGENCE TREE ──────────────────────────────────── */}
      <section className="ec-section-dark ec-intel">
        <img className="ec-intel-bg" src="/ecommerce/ai-intelligence.jpg" alt="" aria-hidden="true" />
        <div className="ec-intel-veil" />
        <div className="ec-wrap">
          <div className="ec-head ec-reveal">
            <EcLabel text="Intelligence Built Into Commerce" />
            <h2 className="ec-h2">AI that works behind every <span style={{ color: "#C6E84A" }}>digital order.</span></h2>
          </div>
          <div className="ec-tree ec-reveal">
            <div className="ec-core">
              <span className="ec-core-name">SYTRION INTELLIGENCE CORE</span>
              <span className="ec-core-sub">COMMERCE OPS</span>
            </div>
            <div className="ec-tree-links" aria-hidden="true">
              <span className="ec-tree-trunk" />
              <span className="ec-tree-bar" />
            </div>
            <div className="ec-tree-row">
              {intelligenceNodes.map((node) => (
                <div key={node.title} className="ec-node">
                  <h3 className="ec-node-title">{node.title}</h3>
                  <p className="ec-node-verbs">{node.verbs}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMERCE CAPABILITIES (Accordion) ──────────────────── */}
      <section className="ec-section-dark">
        <div className="ec-wrap">
          <div className="ec-clin-hero">
            <div className="ec-clin-img ec-reveal">
              <img src="/ecommerce/commerce-capabilities.png" alt="E-commerce operations specialist working at a workstation" />
              <div className="ec-clin-tint" />
              <div className="ec-chip-row">
                <span className="ec-chip">PRODUCT DATA → COMMERCE-READY</span>
                <span className="ec-chip">ORDER AUTOMATION</span>
                <span className="ec-chip">EXCEPTION ROUTING</span>
              </div>
            </div>
            <div className="ec-reveal">
              <EcLabel text="Commerce Capabilities" />
              <h2 className="ec-h2">Turn complex operations into connected, <span style={{ color: "#C6E84A" }}>scalable workflows.</span></h2>
              <p className="ec-lede">E-commerce teams often work across fragmented systems, high-volume order queues, multiple marketplace channels and complex return workflows. Finding the right information and acting quickly requires connected operations.</p>
              <p className="ec-copy">Sytrion combines commerce domain expertise, AI, workflow automation and human review to organize information, streamline processes and strengthen operational quality — while keeping judgment and final decisions with authorized teams.</p>
            </div>
          </div>
          <div className="ec-clin-accordion ec-reveal">
            {commerceItems.map((c, i) => {
              const isOpen = accordionOpen === i;
              return (
                <div key={c.title} className="ec-clin-item">
                  <button
                    className="ec-clin-header"
                    aria-expanded={isOpen}
                    onClick={() => setAccordionOpen(isOpen ? -1 : i)}
                  >
                    <span>{c.title}</span>
                    <span className="ec-clin-chevron" data-open={isOpen ? "true" : "false"} aria-hidden="true">⌄</span>
                  </button>
                  <div className={`ec-clin-panel${isOpen ? " is-open" : ""}`}>
                    <div className="ec-clin-panel-inner">
                      <p>{c.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── OUTCOMES ───────────────────────────────────────────── */}
      <section className="ec-section-light">
        <div className="ec-wrap">
          <div className="ec-head ec-reveal">
            <EcLabel text="The Outcome" light />
            <h2 className="ec-h2">Better operations create better <span style={{ color: "#C6E84A" }}>commerce experiences.</span></h2>
          </div>
          <div className="ec-out-grid ec-reveal">
            {outcomes.map((o, i) => (
              <article key={o.word} className="ec-outcome">
                <div className="ec-outcome-header">
                  <div className="ec-outcome-icon" aria-hidden="true">
                    {outcomeIcons[i]}
                  </div>
                </div>
                <h3 className="ec-outcome-word">{o.word}</h3>
                <p className="ec-outcome-sub">{o.sub}</p>
                <p className="ec-outcome-desc">{o.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODEL STACK ────────────────────────────────────────── */}
      <section className="ec-section-dark">
        <div className="ec-wrap">
          <div className="ec-head ec-reveal">
            <EcLabel text="The Sytrion Model" />
            <h2 className="ec-h2">One connected commerce <span style={{ color: "#C6E84A" }}>operating model.</span></h2>
          </div>
          <div className="ec-stack ec-reveal">
            {modelLayers.map((layer) => (
              <div key={layer.num} className={`ec-layer${layer.name === "Sytrion Intelligence Layer" ? " ec-layer--core" : ""}`}>
                <span className="ec-layer-num">{layer.num}</span>
                <span className="ec-layer-name">{layer.name}</span>
                <span className="ec-layer-items">{layer.items}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY SYTRION ────────────────────────────────────────── */}
      <section className="ec-section-light">
        <div className="ec-wrap">
          <div className="ec-head ec-reveal">
            <EcLabel text="Why Sytrion" light />
            <h2 className="ec-h2">Commerce understanding. <span style={{ color: "#C6E84A" }}>Intelligent execution.</span></h2>
          </div>
          <div className="ec-why-grid ec-reveal">
            {whyPoints.map((w) => (
              <article key={w.num} className="ec-why-card">
                <div className="ec-why-icon" aria-hidden="true">
                  {w.icon}
                </div>
                <span className="ec-why-num">{w.num}</span>
                <h3>{w.name}</h3>
                <p>{w.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRANSFORM ──────────────────────────────────────────── */}
      <section className="ec-transform">
        <div className="ec-transform-panel ec-transform-panel--dark">
          <div className="ec-transform-panel-inner">
            <span className="ec-transform-badge">Transformation in Action</span>
            <h3>The Challenge</h3>
            <p>High-volume commerce workflows involve fragmented product data, manual order processing, repetitive validations and significant exception handling across multiple channels.</p>
            <div className="ec-transform-illustration" aria-hidden="true">
              <svg viewBox="0 0 520 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="40" width="160" height="120" rx="12" stroke="#2E4266" strokeWidth="1.5" transform="rotate(-5 100 100)"/>
                <rect x="45" y="55" width="160" height="120" rx="12" stroke="#3D5170" strokeWidth="1.5" transform="rotate(4 125 115)"/>
                <line x1="55" y1="75" x2="155" y2="75" stroke="#2E4266" strokeOpacity="0.6" strokeWidth="1.2"/>
                <line x1="55" y1="95" x2="170" y2="95" stroke="#2E4266" strokeOpacity="0.6" strokeWidth="1.2"/>
                <line x1="55" y1="115" x2="140" y2="115" stroke="#2E4266" strokeOpacity="0.6" strokeWidth="1.2"/>
                <line x1="55" y1="135" x2="130" y2="135" stroke="#2E4266" strokeOpacity="0.6" strokeWidth="1.2"/>
                <line x1="80" y1="80" x2="180" y2="80" stroke="#3D5170" strokeOpacity="0.6" strokeWidth="1.2"/>
                <line x1="80" y1="100" x2="190" y2="100" stroke="#3D5170" strokeOpacity="0.6" strokeWidth="1.2"/>
                <line x1="80" y1="120" x2="160" y2="120" stroke="#3D5170" strokeOpacity="0.6" strokeWidth="1.2"/>
                <line x1="80" y1="140" x2="150" y2="140" stroke="#3D5170" strokeOpacity="0.6" strokeWidth="1.2"/>
                <rect x="60" y="170" width="120" height="6" rx="3" fill="#1A2B45" fillOpacity="0.5"/>
                <rect x="60" y="182" width="80" height="6" rx="3" fill="#1A2B45" fillOpacity="0.35"/>
                <path d="M220 110 C280 70, 320 150, 380 110" stroke="#C4E538" strokeWidth="2" strokeDasharray="8 6" fill="none"/>
                <circle cx="440" cy="110" r="42" stroke="#1A2B45" strokeWidth="1.5" fill="none"/>
                <circle cx="440" cy="110" r="28" fill="#0A1628" stroke="#C4E538" strokeWidth="2.5"/>
                <path d="M426 110 l 10 11 l 20 -22" stroke="#C4E538" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <text x="65" y="220" fontSize="12" fill="#5B6C87">fragmented orders</text>
                <text x="395" y="170" fontSize="12" fontWeight="700" fill="#C4E538">validated outcome</text>
                <circle cx="440" cy="110" r="50" stroke="#C4E538" strokeOpacity="0.15" strokeWidth="1" fill="none"/>
                <path d="M210 200 l 30 -30 l 25 20 l 35 -25 l 30 15" stroke="#2E4266" strokeWidth="1" strokeOpacity="0.4" fill="none"/>
                <circle cx="210" cy="200" r="3" fill="#C4E538" fillOpacity="0.5"/>
                <circle cx="240" cy="170" r="3" fill="#C4E538" fillOpacity="0.5"/>
                <circle cx="265" cy="190" r="3" fill="#C4E538" fillOpacity="0.5"/>
                <circle cx="300" cy="165" r="3" fill="#C4E538" fillOpacity="0.5"/>
                <circle cx="330" cy="180" r="3" fill="#C4E538" fillOpacity="0.5"/>
                <text x="200" y="245" fontSize="11" fill="#5B6C87" fillOpacity="0.7">processing pipeline</text>
              </svg>
            </div>
          </div>
        </div>
        <div className="ec-transform-panel ec-transform-panel--light">
          <div className="ec-transform-panel-inner" style={{justifyContent:"center"}}>
            <h3>The Sytrion Approach</h3>
            <p>Combine domain-led operations with product intelligence, workflow automation, structured validation and operational analytics.</p>
            <div className="ec-pot-heading"><span>THE POTENTIAL</span></div>
            <ul className="ec-pot-checklist">
              <li><span className="ec-pot-badge" aria-hidden="true">✓</span> Faster Order Processing</li>
              <li><span className="ec-pot-badge" aria-hidden="true">✓</span> Reduced Manual Touchpoints</li>
              <li><span className="ec-pot-badge" aria-hidden="true">✓</span> Improved Product Data Quality</li>
              <li><span className="ec-pot-badge" aria-hidden="true">✓</span> Better Exception Visibility</li>
              <li><span className="ec-pot-badge" aria-hidden="true">✓</span> More Scalable Operations</li>
            </ul>
            <Link href="/contact" className="ec-transform-cta">Discuss Your Use Case <span>→</span></Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────── */}
      <section className="ec-final">
        <div className="ec-final-glow" />
        <div className="ec-wrap">
          <div className="ec-final-inner ec-reveal">
            <span className="ec-final-eyebrow">Let&apos;s Move Commerce Forward</span>
            <h2 className="ec-final-h2">Ready to build smarter e-commerce operations?</h2>
            <p className="ec-final-body">From products and orders to fulfillment, customer experience and finance, Sytrion can help you create a more connected, intelligent and scalable operating model.</p>
            <div className="ec-final-ctas">
              <Link href="/contact" className="ec-btn ec-btn-primary">Talk to Our Commerce Experts ↗</Link>
              <Link href="/contact" className="ec-btn ec-btn-ghost">Schedule a Consultation</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
