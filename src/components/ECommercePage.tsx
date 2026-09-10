"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const challenges = [
  { label: "Growing product & SKU complexity", color: "#6366F1", gradient: "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(99,102,241,0.04))" },
  { label: "Multiple marketplaces & channels", color: "#F59E0B", gradient: "linear-gradient(135deg, rgba(245,158,11,0.18), rgba(245,158,11,0.04))" },
  { label: "Real-time inventory expectations", color: "#10B981", gradient: "linear-gradient(135deg, rgba(16,185,129,0.18), rgba(16,185,129,0.04))" },
  { label: "Rising customer expectations", color: "#EF4444", gradient: "linear-gradient(135deg, rgba(239,68,68,0.18), rgba(239,68,68,0.04))" },
  { label: "Returns, refunds & payment complexity", color: "#8B5CF6", gradient: "linear-gradient(135deg, rgba(139,92,246,0.18), rgba(139,92,246,0.04))" },
  { label: "Seasonal and promotional demand peaks", color: "#06B6D4", gradient: "linear-gradient(135deg, rgba(6,182,212,0.18), rgba(6,182,212,0.04))" },
];

const ecosystemCards = [
  {
    title: "Retailers & Brands",
    desc: "Connected operations across products, orders, customers, fulfillment and digital channels.",
    image: "/services/ecommerce/Retailers & Brands.jpg",
  },
  {
    title: "Marketplaces",
    desc: "Scalable catalog, seller, order, customer and marketplace-support operations.",
    image: "/services/ecommerce/Marketplaces.jpg",
  },
  {
    title: "D2C Businesses",
    desc: "End-to-end operational support designed for fast-growing direct-to-consumer brands.",
    image: "/services/ecommerce/D2C Businesses.png",
  },
];

const ibsTabs = [
  {
    num: "01",
    tab: "Products",
    title: "Product & Catalog Operations",
    tagline: "Build and maintain commerce-ready product information at scale.",
    items: [
      "Product onboarding",
      "Catalog creation & maintenance",
      "Product-data enrichment",
      "Attribute management",
      "Product classification & tagging",
      "Image/content quality checks",
    ],
    image: "/services/ecommerce/Products.png",
  },
  {
    num: "02",
    tab: "Marketplace",
    title: "Marketplace Operations",
    tagline: "Simplify high-volume marketplace administration.",
    items: [
      "Product listing management",
      "Marketplace onboarding",
      "Seller/vendor administration",
      "Pricing & promotion updates",
      "Listing-quality management",
      "Marketplace issue resolution",
    ],
    image: "/services/ecommerce/Marketplace.png",
  },
  {
    num: "03",
    tab: "Orders",
    title: "Order Management",
    tagline: "Move orders through the lifecycle with greater control.",
    items: [
      "Order validation",
      "Order processing",
      "Order-status management",
      "Order modifications",
      "Cancellation processing",
      "Exception management",
    ],
    image: "/services/ecommerce/Orders.png",
  },
  {
    num: "04",
    tab: "Fulfillment",
    title: "Fulfillment Operations",
    tagline: "Keep fulfillment moving with visibility and coordination.",
    items: [
      "Inventory-status support",
      "Fulfillment coordination",
      "Shipment-status management",
      "Delivery exceptions",
      "Order tracking",
      "Operational reconciliation",
    ],
    image: "/services/ecommerce/Fulfillment.png",
  },
  {
    num: "05",
    tab: "Customer",
    title: "Customer Operations",
    tagline: "Turn every interaction into an opportunity to build loyalty.",
    items: [
      "Product queries",
      "Order support",
      "Delivery assistance",
      "Returns & refunds",
      "Payment queries",
      "Complaint management",
    ],
    image: "/services/ecommerce/Customer.png",
  },
  {
    num: "06",
    tab: "Data",
    title: "Commerce Data & Insights",
    tagline: "Turn fragmented commerce information into reliable operational data.",
    items: [
      "Product-data quality",
      "Order analytics",
      "Customer insights",
      "Marketplace performance",
      "Return trends",
      "Operational dashboards",
    ],
    image: "/services/ecommerce/Data.png",
  },
];

const commerceSteps = [
  { name: "INGEST", sub: "Product information", bg: "linear-gradient(135deg, #0EA5E9, #0284C7)", text: "#FFFFFF", icon: "inbox" },
  { name: "CLASSIFY", sub: "Category & taxonomy", bg: "linear-gradient(135deg, #9333EA, #7E22CE)", text: "#FFFFFF", icon: "scan" },
  { name: "ENRICH", sub: "Attributes & content", bg: "linear-gradient(135deg, #C6E84A, #9ECC12)", text: "#0F172A", icon: "check" },
  { name: "VALIDATE", sub: "Quality & completeness", bg: "linear-gradient(135deg, #F97316, #EA580C)", text: "#FFFFFF", icon: "git-branch" },
  { name: "PUBLISH", sub: "Channels & marketplaces", bg: "linear-gradient(135deg, #2563EB, #1D4ED8)", text: "#FFFFFF", icon: "cpu" },
  { name: "MONITOR", sub: "Accuracy & updates", bg: "linear-gradient(135deg, #EC4899, #DB2777)", text: "#FFFFFF", icon: "bar-chart" },
];

const orderSteps = [
  { name: "ORDER", sub: "Capture & validate" },
  { name: "PAYMENT", sub: "Confirm & reconcile" },
  { name: "ALLOCATE", sub: "Inventory & fulfillment" },
  { name: "SHIP", sub: "Dispatch & track" },
  { name: "DELIVER", sub: "Confirm completion" },
  { name: "SUPPORT", sub: "Resolve exceptions" },
];

const intelCapabilities = [
  { num: "01", title: "Product Data Enrichment & Classification", desc: "Ingest, classify and enrich product information so catalogs are accurate, complete and commerce-ready across every channel and marketplace.", tags: "Classify / Enrich / Optimize", bg: "linear-gradient(135deg, #0F172A 0%, #0369A1 100%)", tabColor: "#0284C7", image: "/services/ecommerce/Product & Catalog Operations.jpg" },
  { num: "02", title: "Order & Fulfillment Workflow Automation", desc: "Automate order validation, status management, fulfillment coordination and exception routing to reduce manual touchpoints and improve order accuracy.", tags: "Monitor / Prioritize / Resolve", bg: "linear-gradient(135deg, #1E1B4B 0%, #6D28D9 100%)", tabColor: "#7C3AED", image: "/services/ecommerce/Order Management.jpg" },
  { num: "03", title: "Returns & Refund Processing", desc: "Structure return initiation, validation, authorization, refund processing and inventory reconciliation into connected, visible workflows.", tags: "Analyze / Predict / Improve", bg: "linear-gradient(135deg, #142E11 0%, #4D7C0F 100%)", tabColor: "#65A30D", image: "/services/ecommerce/Fulfillment Operations (2).jpg" },
  { num: "04", title: "Marketplace Listing Quality", desc: "Review listings for completeness, accuracy, policy compliance and content quality across multiple marketplace platforms.", tags: "Generate / Tag / Validate", bg: "linear-gradient(135deg, #431407 0%, #C2410C 100%)", tabColor: "#EA580C", image: "/services/ecommerce/Marketplace Operations.jpg" },
  { num: "05", title: "Customer Query Resolution", desc: "Combine AI-assisted support with skilled teams to resolve product, order, delivery and post-purchase queries across omnichannel touchpoints.", tags: "Understand / Personalize / Assist", bg: "linear-gradient(135deg, #0B192C 0%, #1D4ED8 100%)", tabColor: "#2563EB", image: "/services/ecommerce/Customer Operations.jpg" },
  { num: "06", title: "Commerce Finance Reconciliation", desc: "Support order-to-cash, marketplace settlements, fee reconciliation, refund administration and financial exception management.", tags: "Analyze / Forecast / Replenish", bg: "linear-gradient(135deg, #3B0764 0%, #BE185D 100%)", tabColor: "#DB2777", image: "/services/ecommerce/Commerce Data & Insights.jpg" },
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

const qualityItems = [
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

function EcLabel({ text, light }: { text: string; light?: boolean }) {
  return (
    <span className={`ec-label${light ? " ec-label--light" : ""}`}>
      {text}
    </span>
  );
}

export default function ECommercePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [qualityOpen, setQualityOpen] = useState(0);
  const [intelActive, setIntelActive] = useState(0);
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
          .ec-hero .ec-wrap { padding: 24px 24px; }
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

        .ec-hero { position: relative; height: 100vh; height: 100dvh; min-height: 600px; overflow: hidden; isolation: isolate; background: var(--ecn); }
        .ec-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .ec-hero::after { content: ""; position: absolute; inset: 0; background: linear-gradient(105deg, rgba(7,20,38,0.55) 0%, rgba(7,20,38,0.12) 55%, rgba(7,20,38,0.02) 100%); pointer-events: none; }
        .ec-hero .ec-wrap { position: absolute; inset: 0; z-index: 1; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; padding: 120px clamp(16px, 3vw, 48px) 24px; max-width: 1440px; margin: 0 auto; left: 0; right: 0; }
        .ec-hero-inner { max-width: 900px; display: flex; flex-direction: column; align-items: flex-start; text-align: left; }
        .ec-label { align-self: flex-start; }
        .ec-h1 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(38px, 5.6vw, 68px); font-weight: 700; letter-spacing: -0.03em; line-height: 1.06; color: #ffffff; margin: 0 0 26px; max-width: 780px; text-wrap: balance; }
        .ec-hero-sub { font-size: clamp(17px, 1.6vw, 21px); font-weight: 600; line-height: 1.55; color: rgba(255,255,255,0.92); max-width: 640px; margin: 0 0 18px; }
        .ec-hero-body { font-size: 16px; line-height: 1.75; color: rgba(255,255,255,0.68); max-width: 520px; margin: 0 0 38px; }
        .ec-hero-ctas { display: flex; flex-wrap: wrap; gap: 16px; margin: 0; }
        @media (max-height: 860px) {
          .ec-hero .ec-wrap { padding-top: 88px; padding-bottom: 24px; }
        }
        @media (max-height: 700px) {
          .ec-hero .ec-wrap { padding-top: 84px; padding-bottom: 16px; }
        }

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
        .ec-section-landscape { padding-bottom: clamp(40px, 5vw, 60px); position: relative; background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #f0fdf4 100%); }
        .ec-section-landscape::before { content: ""; position: absolute; top: 80px; right: 60px; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%); pointer-events: none; }
        .ec-section-landscape::after { content: ""; position: absolute; bottom: 40px; left: 100px; width: 300px; height: 300px; border-radius: 50%; background: radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%); pointer-events: none; }
        .ec-landscape-text { }
        .ec-landscape-left { }
        .ec-head h2 { position: relative; padding-bottom: 12px; }
        .ec-head h2::after { content: ""; display: block; width: 64px; height: 4px; background: #C4E538; margin-top: 14px; }
        .ec-landscape-left p { color: #5B6472; max-width: 440px; }
        .ec-landscape-right { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .ec-challenge-card {
          background: rgba(255, 255, 255, 0.55);
          backdrop-filter: blur(20px) saturate(1.4);
          -webkit-backdrop-filter: blur(20px) saturate(1.4);
          border: 1px solid rgba(255, 255, 255, 0.7);
          border-radius: 16px;
          padding: 22px 22px 20px;
          position: relative;
          overflow: hidden;
          transition: transform .3s cubic-bezier(.4,0,.2,1), box-shadow .3s ease, border-color .3s ease;
          box-shadow: 0 4px 24px -8px rgba(10,22,40,0.06), inset 0 1px 0 rgba(255,255,255,0.6);
        }
        .ec-challenge-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 16px;
          opacity: 0;
          transition: opacity .3s ease;
          pointer-events: none;
        }
        .ec-challenge-card:hover {
          transform: translateY(-5px) scale(1.01);
          box-shadow: 0 16px 40px -10px rgba(10,22,40,0.14), inset 0 1px 0 rgba(255,255,255,0.8);
          border-color: rgba(255,255,255,0.9);
        }
        .ec-challenge-card:hover::before { opacity: 1; }
        .ec-challenge-top { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
        .ec-challenge-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 2px 12px -3px currentColor;
          flex-shrink: 0;
        }
        .ec-challenge-icon::after {
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
        .ec-challenge-card:hover .ec-challenge-icon::after { opacity: 0.55; }
        .ec-challenge-icon svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
        .ec-challenge-label { font-size: 15px; font-weight: 600; color: #1A2540; line-height: 1.4; }
        .ec-approach {
          margin-top: 48px;
          background: linear-gradient(135deg, #0B1D35 0%, #132742 40%, #0F2035 100%);
          border-radius: 20px;
          padding: 44px 48px 40px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 40px -12px rgba(10,22,40,0.25);
        }
        .ec-approach::before {
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
        .ec-approach::after {
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
        .ec-approach-top { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; position: relative; z-index: 1; }
        .ec-approach-dot { width: 8px; height: 8px; border-radius: 50%; background: #C4E538; flex-shrink: 0; box-shadow: 0 0 12px rgba(196,229,56,0.5); }
        .ec-approach-label { font-size: 11px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: rgba(196,229,56,0.7); }
        .ec-approach-text { font-size: clamp(18px, 1.8vw, 26px); line-height: 1.4; color: rgba(255,255,255,0.92); font-weight: 500; margin: 0; position: relative; z-index: 1; white-space: nowrap; }
        .ec-approach-text em { font-style: normal; color: #C4E538; font-weight: 600; }

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

        .ec-ibs-tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 46px; border-bottom: 1px solid rgba(12,27,48,0.1); padding-bottom: 14px; }
        .ec-ibs-tab { appearance: none; background: transparent; border: none; cursor: pointer; font-family: inherit; position: relative; display: inline-flex; align-items: center; padding: 12px 18px; font-size: 15px; font-weight: 600; color: #7A8AA0; transition: color 0.25s ease; }
        .ec-ibs-tab::after { content: ""; position: absolute; left: 18px; right: 18px; bottom: -15px; height: 3px; border-radius: 2px 2px 0 0; background: var(--ecc); transform: scaleX(0); transform-origin: left; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); }
        .ec-ibs-tab:hover { color: #14263C; }
        .ec-ibs-tab--active { color: #0C1B30; }
        .ec-ibs-tab--active::after { transform: scaleX(1); }
        .ec-ibs-panel { margin-top: 44px; animation: ecPanelIn 0.5s cubic-bezier(0.16,1,0.3,1); display: grid; grid-template-columns: 1.05fr 1fr; gap: clamp(32px, 5vw, 72px); align-items: center; }
        @keyframes ecPanelIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .ec-ibs-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 15px; font-weight: 700; letter-spacing: 0.04em; color: var(--ecc); display: block; margin: 0 0 14px; }
        .ec-ibs-title { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(24px, 2.6vw, 34px); font-weight: 700; line-height: 1.2; color: #0C1B30; margin: 0 0 16px; }
        .ec-ibs-tagline { font-style: italic; font-size: 16px; line-height: 1.6; color: #5A5D66; margin: 0 0 24px; }
        .ec-ibs-list { list-style: none; margin: 0; padding: 0; }
        .ec-ibs-item { display: flex; align-items: baseline; gap: 14px; padding: 13px 0; border-top: 1px solid rgba(12,27,48,0.09); font-size: 16px; color: #33475E; }
        .ec-ibs-item::before { content: ""; width: 9px; height: 9px; flex: 0 0 auto; background: #7AA306; transform: rotate(45deg); align-self: center; }
        .ec-ibs-visual { position: relative; border-radius: 20px; overflow: hidden; min-height: 380px; }
        .ec-ibs-visual img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .ec-ibs-visual::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(12,27,48,0) 40%, rgba(12,27,48,0.32) 100%); }

        .ec-split { display: grid; grid-template-columns: 1fr 1.15fr; gap: clamp(36px, 5vw, 80px); align-items: center; }
        .ec-feature-img { position: relative; overflow: hidden; border-radius: 22px; aspect-ratio: 4 / 4.6; }
        .ec-feature-img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .ec-feature-tint { position: absolute; inset: 0; background: linear-gradient(200deg, rgba(198,232,74,0.16) 0%, rgba(7,20,38,0.05) 40%, rgba(7,20,38,0.55) 100%); }
        .ec-claims-wf-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px 14px; margin-top: 36px; }
        .ec-claims-wf-step { position: relative; display: flex; align-items: center; }
        .ec-claims-wf-card { flex: 1; border-radius: 16px; padding: 18px 16px; border: 1px solid rgba(255, 255, 255, 0.15); transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, filter 0.35s ease; position: relative; box-shadow: 0 10px 24px -6px rgba(0,0,0,0.4); }
        .ec-claims-wf-card:hover { transform: translateY(-5px); box-shadow: 0 16px 36px -8px rgba(0,0,0,0.6); filter: brightness(1.08); }
        .ec-claims-wf-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .ec-claims-wf-icon { width: 34px; height: 34px; border-radius: 10px; background: rgba(0, 0, 0, 0.2); border: 1px solid rgba(255, 255, 255, 0.25); display: flex; align-items: center; justify-content: center; color: inherit; transition: transform 0.3s ease; }
        .ec-claims-wf-card:hover .ec-claims-wf-icon { transform: scale(1.1); }
        .ec-claims-wf-num { font-family: var(--font-syne), sans-serif; font-size: 11.5px; font-weight: 800; color: inherit; letter-spacing: 0.08em; background: rgba(0, 0, 0, 0.2); padding: 4px 9px; border-radius: 999px; border: 1px solid rgba(255, 255, 255, 0.2); }
        .ec-claims-wf-title { font-family: var(--font-syne), sans-serif; font-size: 15px; font-weight: 700; color: inherit; letter-spacing: 0.04em; }
        .ec-claims-wf-sub { font-size: 12.5px; line-height: 1.45; color: inherit; opacity: 0.85; margin-top: 4px; }
        .ec-claims-wf-connector { position: absolute; right: -13px; top: 50%; transform: translateY(-50%); width: 24px; height: 24px; border-radius: 50%; background: #071426; border: 1.5px solid rgba(255, 255, 255, 0.3); display: flex; align-items: center; justify-content: center; color: #ffffff; z-index: 3; box-shadow: 0 0 10px rgba(0,0,0,0.6); }
        @media (max-width: 1100px) {
          .ec-claims-wf-grid { grid-template-columns: repeat(2, 1fr); }
          .ec-claims-wf-connector { display: none; }
        }
        @media (max-width: 640px) {
          .ec-claims-wf-grid { grid-template-columns: 1fr; }
        }

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

        .ec-clin-accordion { margin-top:48px; display:flex; flex-direction:column; gap:8px; }
        .ec-clin-item { background:#0B1729; border:1px solid #173049; border-radius:10px; overflow:hidden; transition:border-color .35s ease, box-shadow .35s ease, background .35s ease; }
        .ec-clin-item.is-active { border-color:rgba(198,232,74,0.45); background:#0D1F35; box-shadow:0 0 20px -4px rgba(198,232,74,0.12); }
        .ec-clin-header { width:100%; display:flex; align-items:center; justify-content:space-between; padding:16px 20px; background:transparent; border:none; color:#F5F7FA; font-family:var(--font-syne),Arial,Helvetica,sans-serif; font-size:15px; font-weight:600; text-align:left; cursor:pointer; transition:color .3s ease; }
        .ec-clin-header:focus { outline:none; }
        .ec-clin-item.is-active .ec-clin-header { color:#C6E84A; }
        .ec-clin-chevron { color:#5EE6FF; transition:transform .35s cubic-bezier(0.16,1,0.3,1), color .3s ease; flex:0 0 auto; margin-left:12px; }
        .ec-clin-item.is-active .ec-clin-chevron { color:#C6E84A; }
        .ec-clin-chevron[data-open="true"] { transform:rotate(180deg); }
        .ec-clin-panel { max-height:0; overflow:hidden; transition:max-height .4s cubic-bezier(0.16,1,0.3,1), opacity .3s ease; opacity:0; }
        .ec-clin-panel.is-open { max-height:500px; opacity:1; }
        .ec-clin-panel-inner { padding:0 20px 18px; color:#9AA7B8; font-size:13.5px; line-height:1.7; }

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
        .ec-layer { display: grid; grid-template-columns: 90px 320px 1fr; align-items: center; gap: 20px; border-radius: 14px; padding: 24px 30px; background: #10294A; border: 1px solid rgba(198,232,74,0.12); transition: border-color 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1); }
        .ec-layer:hover { background:#C6E84A; border-color: rgba(198,232,74,0.8); box-shadow: 0 0 40px -6px rgba(198,232,74,0.4); transform: translateX(6px); }
        .ec-layer:hover .ec-layer-num, .ec-layer:hover .ec-layer-name, .ec-layer:hover .ec-layer-items { color:#0C1B30; }
        .ec-layer--core .ec-layer-num, .ec-layer--core .ec-layer-items { color: var(--ecc); }
        .ec-layer--core .ec-layer-name { color: #ffffff; }
        .ec-layer-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; color: var(--ecc); font-variant-numeric: tabular-nums; }
        .ec-layer-name { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #ffffff; }
        .ec-layer-items { font-size: 12.5px; letter-spacing: 0.05em; color: rgba(255,255,255,0.62); }

        .ec-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 56px; }
        .ec-why-card { position: relative; border-radius: 16px; padding: 28px 24px 26px; background: #FAFBFC; border: 2px solid #D1D9E6; display: flex; flex-direction: column; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease; }
        .ec-why-card::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 3px; border-radius: 0 0 16px 16px; background: linear-gradient(90deg, #7AA306, #C6E84A); opacity: 0; transition: opacity 0.35s ease; }
        .ec-why-card:hover { transform: translateY(-4px); box-shadow: 0 12px 30px -12px rgba(10,22,40,0.12); }
        .ec-why-card:hover::after { opacity: 1; }
        .ec-why-head { display: flex; align-items: center; gap: 16px; margin-bottom: 14px; }
        .ec-why-head-text { display: flex; flex-direction: column; }
        .ec-why-icon { width: 64px; height: 64px; border-radius: 16px; background: rgba(198,232,74,0.12); border: 1px solid rgba(122,163,6,0.2); display: flex; align-items: center; justify-content: center; color: #618300; flex: 0 0 auto; transition: background 0.35s ease, border-color 0.35s ease, color 0.35s ease, transform 0.35s ease; }
        .ec-why-card:hover .ec-why-icon { background: #C6E84A; border-color: #C6E84A; color: #0C1B30; transform: scale(1.06); }
        .ec-why-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; color: #7AA306; font-variant-numeric: tabular-nums; }
        .ec-why-card h3 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 23px; font-weight: 700; color: #0C1B30; margin: 4px 0 0; }
        .ec-why-card p { font-size: 14px; line-height: 1.65; color: #5A6B7F; margin: 8px 0 0; }

        .ec-transform { display:grid; grid-template-columns:1fr 1fr; isolation:isolate; overflow:hidden; }
        .ec-transform-left { display:flex; flex-direction:column; }
        .ec-transform-panel { padding:44px 48px; display:flex; flex:1; }
        .ec-transform-panel--dark { position:relative; background:radial-gradient(circle at 25% 15%, #132745 0%, #0A1628 55%, #050B14 100%); color:#F5F7FA; overflow:hidden; }
        .ec-transform-panel--dark::before { content:""; position:absolute; left:-60px; bottom:-60px; width:340px; height:340px; background:radial-gradient(circle, rgba(196,229,56,0.1), transparent 70%); pointer-events:none; }
        .ec-transform-panel--light { background:#F8FAFC; color:#0A1628; border-top:1px solid #EDF0F4; }
        .ec-transform-panel--right { background:#EFF3F7; color:#0A1628; }
        .ec-transform-panel-inner { width:100%; display:flex; flex-direction:column; justify-content:center; }
        .ec-transform-badge { display:inline-block; align-self:flex-start; background:#C6E84A; color:#0f0f0f; padding:8px 20px; border-radius:999px; font-size:14px; font-weight:600; letter-spacing:0.5px; font-variant:small-caps; margin-bottom:24px; }
        .ec-transform h3 { font-family:var(--font-syne),Arial,Helvetica,sans-serif; font-size:clamp(24px,2.6vw,32px); font-weight:700; margin:0; color:inherit; line-height:1.25; }
        .ec-transform-panel--dark > .ec-transform-panel-inner > p { font-size:15px; line-height:1.7; margin:14px 0 0; max-width:440px; color:#8B9AB5; }
        .ec-transform-panel--light > .ec-transform-panel-inner > p { font-size:15px; line-height:1.7; margin:14px 0 0; max-width:440px; color:#5B6472; }
        .ec-transform-illustration { flex:1; display:flex; align-items:flex-end; justify-content:center; margin-top:32px; }
        .ec-transform-illustration svg { width:100%; max-width:440px; height:auto; }
        .ec-pot-title { font-family:var(--font-syne),Arial,Helvetica,sans-serif; font-size:clamp(24px,2.6vw,32px); font-weight:700; margin:0 0 16px; color:#0A1628; line-height:1.25; }
        .ec-pot-checklist { list-style:none; margin:0; padding:0; background:#FFFFFF; border:1px solid #E8EBF0; border-radius:16px; overflow:hidden; box-shadow:0 6px 20px -12px rgba(10,22,40,0.15); }
        .ec-pot-checklist li { display:flex; align-items:center; gap:14px; padding:15px 20px; border-top:1px solid #EEF1F5; font-size:14.5px; font-weight:600; color:#1D2733; transition:background .2s ease; }
        .ec-pot-checklist li:first-child { border-top:none; }
        .ec-pot-checklist li:hover { background:#FAFDF5; }
        .ec-pot-badge { width:28px; height:28px; border-radius:8px; background:linear-gradient(135deg, #0A1628 0%, #1A2B45 100%); color:#C4E538; display:flex; align-items:center; justify-content:center; flex:0 0 auto; font-weight:700; font-size:13px; }
        .ec-transform-cta { display:inline-flex; align-items:center; gap:10px; align-self:flex-start; background:#0A1628; color:#F5F7FA; padding:14px 28px; border-radius:12px; font-weight:700; font-size:14px; text-decoration:none; margin-top:28px; transition:background .15s ease, transform .15s ease, box-shadow .15s ease; box-shadow:0 2px 12px -4px rgba(10,22,40,0.2); }
        .ec-transform-cta span { display:inline-block; transition:transform .15s ease; }
        .ec-transform-cta:hover { background:#142544; transform:translateY(-2px); box-shadow:0 6px 20px -6px rgba(10,22,40,0.3); }
        .ec-transform-cta:hover span { transform:translateX(3px); }
        @media (prefers-reduced-motion:reduce){ .ec-pot-checklist li:hover{ background:transparent; } .ec-transform-cta:hover{ transform:none; } .ec-transform-cta:hover span{ transform:none; } }
        @media (max-width:900px){ .ec-transform{ grid-template-columns:1fr; min-height:auto; } .ec-transform-panel{ padding:36px 24px; } .ec-transform-panel--light{ border-top:1px solid #EDF0F4; border-left:none; } }

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
          .ec-intel-header { grid-template-columns: 1fr; gap: 24px; margin-bottom: 40px; }
          .ec-intel-lede { max-width: none; }
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

        /* Dynamic Tabbed Stack Deck — Intelligence Built Into Commerce */
        .ec-intel-header { display: grid; grid-template-columns: 1fr; gap: 16px; align-items: start; margin-bottom: 48px; }
        .ec-intel-header .ec-h2 { white-space: normal; }
        .ec-intel-lede { font-size: 18px; line-height: 1.8; color: rgba(255,255,255,0.7); max-width: 640px; margin: 8px 0 0; }
        .scd-deck-wrapper { position: relative; width: 100%; max-width: 100%; overflow: hidden; margin-top: 20px; }
        .scd-deck { position: relative; width: 100%; max-width: 100%; min-height: 480px; }
        .scd-tabs-bar { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 6px; position: relative; z-index: 10; width: 100%; max-width: 100%; }
        .scd-tab { appearance: none; border: none; background: var(--c); border-radius: 14px 14px 0 0; padding: 14px 12px; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; color: #ffffff; font-family: inherit; font-size: 13.5px; font-weight: 700; filter: brightness(0.55); opacity: 0.85; transition: filter 0.3s ease, transform 0.3s cubic-bezier(0.3, 0.9, 0.3, 1), opacity 0.3s ease; text-align: center; min-width: 0; overflow: hidden; }
        .scd-tab:hover { filter: brightness(0.85); opacity: 1; }
        .scd-tab.is-active { filter: brightness(1); opacity: 1; transform: translateY(-4px); box-shadow: 0 -8px 20px rgba(0,0,0,0.3); }
        .scd-tab-num { font-size: 11px; font-weight: 800; letter-spacing: 0.08em; background: rgba(0,0,0,0.25); padding: 2px 6px; border-radius: 999px; flex: 0 0 auto; }
        .scd-tab-text { font-family: var(--font-syne), sans-serif; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; flex: 1 1 auto; }
        .scd-cards-stack { position: relative; width: 100%; min-height: 420px; }
        .scd-card { position: absolute; inset: 0; border-radius: 0 0 24px 24px; padding: 52px 56px; color: #ffffff; overflow: hidden; box-shadow: 0 30px 60px -20px rgba(0,0,0,0.7); transform: translateY(24px) scale(0.95); opacity: 0; pointer-events: none; transition: transform 0.45s cubic-bezier(0.3, 0.9, 0.3, 1), opacity 0.45s ease; z-index: 1; }
        .scd-card.is-active { transform: translateY(0) scale(1); opacity: 1; pointer-events: auto; z-index: 5; }
        .scd-card-bg-img { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
        .scd-card-bg-img img { width: 100%; height: 100%; object-fit: cover; opacity: 0.28; filter: saturate(1.2); }
        .scd-card-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(6,14,25,0.7) 0%, rgba(6,14,25,0.4) 100%); }
        .scd-card-inner { position: relative; z-index: 1; display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 48px; align-items: center; height: 100%; overflow: hidden; }
        .scd-card-main { min-width: 0; }
        .scd-card-num { display: inline-block; font-family: var(--font-syne), sans-serif; font-size: 13px; font-weight: 800; letter-spacing: 0.16em; background: rgba(0,0,0,0.35); padding: 4px 12px; border-radius: 999px; margin-bottom: 16px; backdrop-filter: blur(4px); }
        .scd-card-title { font-family: var(--font-syne), sans-serif; font-size: clamp(24px, 2.6vw, 36px); font-weight: 800; line-height: 1.15; margin: 0 0 16px; letter-spacing: -0.02em; word-break: break-word; }
        .scd-card-desc { font-size: 16px; line-height: 1.7; opacity: 0.92; max-width: 560px; margin: 0 0 24px; word-break: break-word; }
        .scd-card-tags { font-size: 13.5px; font-weight: 700; letter-spacing: 0.08em; background: rgba(0,0,0,0.35); padding: 8px 16px; border-radius: 999px; display: inline-block; backdrop-filter: blur(4px); max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .scd-card-visual { position: relative; height: 250px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.2); overflow: hidden; display: flex; align-items: center; justify-content: center; box-shadow: 0 20px 40px rgba(0,0,0,0.4); min-width: 0; }
        .scd-visual-thumb { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 1; transition: transform 0.4s ease; }
        .scd-card:hover .scd-visual-thumb { transform: scale(1.05); }
        @media (max-width: 1024px) {
          .scd-tabs-bar { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
          .scd-tab { border-radius: 12px; }
          .scd-card-inner { grid-template-columns: minmax(0, 1fr); gap: 24px; }
          .scd-card-visual { display: none; }
          .scd-card { padding: 40px 32px; border-radius: 20px; }
        }
        @media (max-width: 640px) {
          .scd-tabs-bar { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .scd-tab-text { font-size: 12px; }
          .scd-card { padding: 32px 24px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ec-reveal { opacity: 1; transform: none; transition: none; animation: none; }
          .ec-core { animation: none; }
        }
      `}</style>

      <section className="ec-hero">
        <video
            className="dpi-hero-video"
            src="services/ecommerce/ecommercehero.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
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
                <article key={c.label} className="ec-challenge-card" style={{ background: c.gradient } as React.CSSProperties}>
                  <div className="ec-challenge-top">
                    <div className="ec-challenge-icon" style={{ background: c.color, color: "#fff" }} aria-hidden="true">
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
                  <div className="ec-challenge-label">{c.label}</div>
                </article>
              ))}
            </div>
          </div>
          <div className="ec-approach ec-reveal">
            <div className="ec-approach-top">
              <div className="ec-approach-dot" />
              <div className="ec-approach-label">Our Approach</div>
            </div>
            <p className="ec-approach-text">We connect <em>products, orders, customers, data</em> and <em>intelligence</em> to keep digital commerce moving.</p>
          </div>
        </div>
      </section>

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
                id={`ec-tab-${i}`}
                aria-selected={activeTab === i}
                aria-controls={`ec-panel-${i}`}
                className={`ec-ibs-tab${activeTab === i ? " ec-ibs-tab--active" : ""}`}
                onMouseEnter={() => setActiveTab(i)}
                onClick={() => setActiveTab(i)}
              >
                {t.tab}
              </button>
            ))}
          </div>

          <div
            key={ibsTabs[activeTab].num}
            className="ec-ibs-panel"
            role="tabpanel"
            id={`ec-panel-${activeTab}`}
            aria-labelledby={`ec-tab-${activeTab}`}
          >
            <div className="ec-ibs-copy">
              <span className="ec-ibs-num">{ibsTabs[activeTab].num} —</span>
              <h3 className="ec-ibs-title">{ibsTabs[activeTab].title}</h3>
              <p className="ec-ibs-tagline">{ibsTabs[activeTab].tagline}</p>
              <ul className="ec-ibs-list">
                {ibsTabs[activeTab].items.map((item) => (
                  <li key={item} className="ec-ibs-item">{item}</li>
                ))}
              </ul>
            </div>
            <div className="ec-ibs-visual">
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

      <section className="ec-section-dark">
        <div className="ec-wrap">
          <div className="ec-split">
            <div className="ec-feature-img ec-reveal">
              <img src="services/ecommerce/Digital Shelf Operations.jpg" alt="Digital commerce professional working with product and order documentation" />
              <div className="ec-feature-tint" />
            </div>
            <div className="ec-reveal">
              <EcLabel text="Digital Shelf Operations" />
              <h2 className="ec-h2">Every great shopping experience starts with great <span style={{ color: "#C6E84A" }}>product data.</span></h2>
              <p className="ec-lede">Accurate titles, attributes, images, descriptions, categories and specifications influence how products are discovered, understood and purchased.</p>
              <p className="ec-copy">Sytrion combines structured operations, AI and human quality review to help businesses maintain accurate, enriched and commerce-ready product information.</p>
              <div className="ec-claims-wf-grid">
                {commerceSteps.map((s, i) => {
                  const stepIcons: Record<string, React.ReactNode> = {
                    inbox: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-6l-2 3h-4l-2-3H2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6z" /><path d="M5.45 5.11 2 12v0h20v0l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>,
                    scan: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><line x1="7" y1="12" x2="17" y2="12" /></svg>,
                    check: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
                    "git-branch": <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" /></svg>,
                    cpu: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="15" x2="23" y2="15" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="15" x2="4" y2="15" /></svg>,
                    "bar-chart": <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>,
                  };

                  return (
                    <div key={s.name} className="ec-claims-wf-step">
                      <div
                        className="ec-claims-wf-card"
                        style={{
                          background: s.bg,
                          color: s.text,
                        }}
                      >
                        <div className="ec-claims-wf-top">
                          <div className="ec-claims-wf-icon">
                            {stepIcons[s.icon]}
                          </div>
                          <span className="ec-claims-wf-num">0{i + 1}</span>
                        </div>
                        <div className="ec-claims-wf-title">{s.name}</div>
                        <div className="ec-claims-wf-sub">{s.sub}</div>
                      </div>
                      {i < commerceSteps.length - 1 && (
                        <div className="ec-claims-wf-connector" aria-hidden="true">
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

      <section className="ec-section-light">
        <div className="ec-wrap">
          <div className="ec-prov-grid">
            <div className="ec-prov-img ec-reveal">
              <img src="/services/ecommerce/Order & Fulfillment.jpg" alt="Order and fulfillment operations in a modern fulfillment center" />
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

      <section className="ec-section-dark">
        <div className="ec-wrap">
          <div className="ec-intel-header ec-reveal">
            <div className="ec-intel-head-left">
              <EcLabel text="Intelligence Built Into Commerce" />
              <h2 className="ec-h2">AI that works behind every <span style={{ color: "#C6E84A" }}>digital order.</span></h2>
            </div>
            <p className="ec-intel-lede">Six connected capabilities that turn complex commerce information into clearer decisions and more efficient operations.</p>
          </div>

          <div className="scd-deck-wrapper ec-reveal">
            <div className="scd-deck">
              <div className="scd-tabs-bar" role="tablist" aria-label="Commerce intelligence capabilities">
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

      <section className="ec-section-dark">
        <div className="ec-wrap">
          <div className="ec-clin-hero">
            <div className="ec-clin-img ec-reveal">
              <img src="/services/ecommerce/Commerce Capabilities.jpg" alt="Specialist working through commerce operations at a workstation" />
              <div className="ec-chip-row">
                <span className="ec-chip">PRODUCT DATA → COMMERCE-READY</span>
                <span className="ec-chip">ORDER AUTOMATION</span>
                <span className="ec-chip">EXCEPTION ROUTING</span>
              </div>
            </div>
            <div className="ec-reveal">
              <EcLabel text="Commerce Capabilities" />
              <h2 className="ec-h2">Turn complex operations into connected,<span style={{ color: "#C6E84A" }}>scalable workflows. </span></h2>
              <p className="ec-lede">E-commerce teams often work across fragmented systems, high-volume order queues, multiple marketplace channels and complex return workflows. Finding the right information and acting quickly requires connected operations.</p>
              <p className="ec-copy">Sytrion combines commerce domain expertise, AI, workflow automation and human review to organize information, streamline processes and strengthen operational quality — while keeping judgment and final decisions with authorized teams.</p>
            </div>
          </div>
          <div className="ec-clin-accordion ec-reveal">
            {qualityItems.map((c, i) => {
              const isOpen = qualityOpen === i;
              return (
                <div key={c.title} className={`ec-clin-item${isOpen ? " is-active" : ""}`}>
                  <button
                    className="ec-clin-header"
                    aria-expanded={isOpen}
                    onMouseEnter={() => setQualityOpen(i)}
                    onClick={() => setQualityOpen(isOpen ? -1 : i)}
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

      <section className="ec-section-dark">
        <div className="ec-wrap">
          <div className="ec-head ec-reveal">
            <EcLabel text="The Sytrion Model" />
            <h2 className="ec-h2">One connected commerce <span style={{ color: "#C6E84A" }}>operating model.</span></h2>
          </div>
          <div className="ec-stack ec-reveal">
            {modelLayers.map((layer) => (
              <div key={layer.num} className={`ec-layer`}>
                <span className="ec-layer-num">{layer.num}</span>
                <span className="ec-layer-name">{layer.name}</span>
                <span className="ec-layer-items">{layer.items}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ec-section-light">
        <div className="ec-wrap">
          <div className="ec-head ec-reveal">
            <EcLabel text="Why Sytrion" light />
            <h2 className="ec-h2">Commerce understanding. <span style={{ color: "#C6E84A" }}>Intelligent execution.</span></h2>
          </div>
          <div className="ec-why-grid ec-reveal">
            {whyPoints.map((w) => (
              <article key={w.num} className="ec-why-card">
                <div className="ec-why-head">
                  <div className="ec-why-icon" aria-hidden="true">
                    <img src={w.icon} alt="" width="52" height="52" />
                  </div>
                  <div className="ec-why-head-text">
                    <span className="ec-why-num">{w.num}</span>
                    <h3>{w.name}</h3>
                  </div>
                </div>
                <p>{w.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ec-transform">
        <div className="ec-transform-left">
          <div className="ec-transform-panel ec-transform-panel--dark">
            <div className="ec-transform-panel-inner">
              <span className="ec-transform-badge">Transformation in Action</span>
              <h3>The Challenge</h3>
              <p>High-volume commerce workflows can involve fragmented product information, manual order processing, repetitive validations and significant exception handling.</p>
            </div>
          </div>
          <div className="ec-transform-panel ec-transform-panel--light">
            <div className="ec-transform-panel-inner">
              <h3>The Sytrion Approach</h3>
              <p>Combine domain-led operations with product intelligence, workflow automation, structured validation and operational analytics.</p>
            </div>
          </div>
        </div>
        <div className="ec-transform-panel ec-transform-panel--right">
          <div className="ec-transform-panel-inner">
            <h3 className="ec-pot-title">The Potential</h3>
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

      <section className="ec-final">
        <div className="ec-final-glow" />
        <div className="ec-wrap">
          <div className="ec-final-inner ec-reveal">
            <span className="ec-final-eyebrow">Let's Move Commerce Forward</span>
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