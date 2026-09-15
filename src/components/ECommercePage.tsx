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
  { num: "01", name: "INGEST", sub: "Product information", icon: "inbox", x: 14, y: 28 },
  { num: "02", name: "CLASSIFY", sub: "Category & taxonomy", icon: "scan", x: 50, y: 28 },
  { num: "03", name: "ENRICH", sub: "Attributes & content", icon: "check", x: 86, y: 28 },
  { num: "04", name: "VALIDATE", sub: "Quality & completeness", icon: "git-branch", x: 86, y: 74 },
  { num: "05", name: "PUBLISH", sub: "Channels & marketplaces", icon: "cpu", x: 50, y: 74 },
  { num: "06", name: "MONITOR", sub: "Accuracy & updates", icon: "bar-chart", x: 14, y: 74 },
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
  "git-branch": (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  ),
  cpu: (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="15" x2="23" y2="15" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="15" x2="4" y2="15" />
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

const orderSteps = [
  { name: "ORDER", sub: "Capture & validate" },
  { name: "PAYMENT", sub: "Confirm & reconcile" },
  { name: "ALLOCATE", sub: "Inventory & fulfillment" },
  { name: "SHIP", sub: "Dispatch & track" },
  { name: "DELIVER", sub: "Confirm completion" },
  { name: "SUPPORT", sub: "Resolve exceptions" },
];

const intelCapabilities = [
  { num: "01", title: "Product Data Enrichment & Classification", desc: "Ingest, classify and enrich product information so catalogs are accurate, complete and commerce-ready across every channel and marketplace.", tags: "Classify / Enrich / Optimize", bg: "linear-gradient(135deg, #0C1B30 0%, #243142 100%)", image: "/services/ecommerce/Product & Catalog Operations.jpg" },
  { num: "02", title: "Order & Fulfillment Workflow Automation", desc: "Automate order validation, status management, fulfillment coordination and exception routing to reduce manual touchpoints and improve order accuracy.", tags: "Monitor / Prioritize / Resolve", bg: "linear-gradient(135deg, #0C1B30 0%, #243142 100%)", image: "/services/ecommerce/Order Management.jpg" },
  { num: "03", title: "Returns & Refund Processing", desc: "Structure return initiation, validation, authorization, refund processing and inventory reconciliation into connected, visible workflows.", tags: "Analyze / Predict / Improve", bg: "linear-gradient(135deg, #0C1B30 0%, #243142 100%)", image: "/services/ecommerce/Fulfillment Operations (2).jpg" },
  { num: "04", title: "Marketplace Listing Quality", desc: "Review listings for completeness, accuracy, policy compliance and content quality across multiple marketplace platforms.", tags: "Generate / Tag / Validate", bg: "linear-gradient(135deg, #0C1B30 0%, #243142 100%)", image: "/services/ecommerce/Marketplace Operations.jpg" },
  { num: "05", title: "Customer Query Resolution", desc: "Combine AI-assisted support with skilled teams to resolve product, order, delivery and post-purchase queries across omnichannel touchpoints.", tags: "Understand / Personalize / Assist", bg: "linear-gradient(135deg, #0C1B30 0%, #243142 100%)", image: "/services/ecommerce/Customer Operations.jpg" },
  { num: "06", title: "Commerce Finance Reconciliation", desc: "Support order-to-cash, marketplace settlements, fee reconciliation, refund administration and financial exception management.", tags: "Analyze / Forecast / Replenish", bg: "linear-gradient(135deg, #0C1B30 0%, #243142 100%)", image: "/services/ecommerce/Commerce Data & Insights.jpg" },
];

const outcomes = [
  {
    num: "01",
    word: "FASTER",
    sub: "Faster processing",
    image: "/healthcare/faster (2).png",
    desc: "Streamlined workflows help reduce operational delays across orders, products and customer interactions.",
  },
  {
    num: "02",
    word: "ACCURATE",
    sub: "Greater accuracy",
    image: "/healthcare/accurate.png",
    desc: "Structured validation helps improve product data, order processing and transaction quality.",
  },
  {
    num: "03",
    word: "EFFICIENT",
    sub: "Lower operational effort",
    image: "/healthcare/efficient.png",
    desc: "Automation reduces repetitive manual activity across commerce operations.",
  },
  {
    num: "04",
    word: "VISIBLE",
    sub: "Better operational visibility",
    image: "/healthcare/visible.png",
    desc: "Connected reporting makes performance and exceptions easier to understand across channels.",
  },
  {
    num: "05",
    word: "EXPERIENCED",
    sub: "Better experiences",
    image: "/healthcare/better-experiences.png",
    desc: "Simpler operations help create smoother interactions for customers, sellers and partners.",
  },
  {
    num: "06",
    word: "SCALABLE",
    sub: "Built to adapt",
    image: "/healthcare/scalable.png",
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

const marketplaceCapabilities = [
  {
    title: "Seller Onboarding",
    image: "/services/ecommerce/seller onboarding.jpg",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><path d="M20 8v6" /><path d="M23 11h-6" /></svg>),
    items: ["Seller information processing", "Documentation support", "Profile setup", "Data validation", "Onboarding workflow administration"],
  },
  {
    title: "Listing Operations",
    image: "/services/ecommerce/Listing operations.jpg",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.83z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>),
    items: ["Product listing", "Content updates", "Attribute maintenance", "Listing-quality checks", "Issue resolution"],
  },
  {
    title: "Commercial Operations",
    image: "/services/ecommerce/commercial operations.jpg",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>),
    items: ["Price updates", "Promotion administration", "Offer management support", "Marketplace reconciliation", "Exception handling"],
  },
  {
    title: "Seller Support",
    image: "/services/ecommerce/seller support.jpg",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>),
    items: ["Seller queries", "Case management", "Listing issues", "Order-related support", "Performance reporting"],
  },
];

const reverseStages = [
  { num: "01", name: "REQUEST", desc: "Return initiation" },
  { num: "02", name: "VALIDATE", desc: "Order & return information" },
  { num: "03", name: "AUTHORIZE", desc: "Workflow administration" },
  { num: "04", name: "RECEIVE", desc: "Return-status processing" },
  { num: "05", name: "REFUND", desc: "Payment/refund support" },
  { num: "06", name: "RECONCILE", desc: "Transaction & inventory" },
  { num: "07", name: "ANALYZE", desc: "Return trends & insights" },
];

const customerCare = [
  {
    title: "Pre-Purchase",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>),
    items: ["Product information", "Availability queries", "Purchase assistance"],
  },
  {
    title: "Order Support",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>),
    items: ["Order status", "Modifications", "Delivery queries"],
  },
  {
    title: "Post-Purchase",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>),
    items: ["Returns", "Refunds", "Warranty/service queries"],
  },
  {
    title: "Customer Care",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>),
    items: ["Complaints", "Escalations", "Case management", "Customer feedback"],
  },
];

const cxStages = [
  {
    num: "01",
    label: "Pre-Purchase",
    title: "Pre-Purchase",
    desc: "Helping shoppers decide with confidence, before they ever add to cart.",
    items: ["Product information", "Availability queries", "Purchase assistance"],
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>),
  },
  {
    num: "02",
    label: "Order Support",
    title: "Order Support",
    desc: "Keeping customers informed and in control from checkout to dispatch.",
    items: ["Order status", "Modifications", "Delivery queries"],
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>),
  },
  {
    num: "03",
    label: "Post-Purchase",
    title: "Post-Purchase",
    desc: "Making it easy to resolve issues once an order has arrived.",
    items: ["Returns", "Refunds", "Warranty/service queries"],
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>),
  },
  {
    num: "04",
    label: "Customer Care",
    title: "Customer Care",
    desc: "Giving every complaint or escalation a clear owner and a resolution path.",
    items: ["Complaints", "Escalations", "Case management", "Customer feedback"],
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>),
  },
];

const financeCapabilities = [
  {
    title: "Order-to-Cash",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z" /><line x1="8" y1="7" x2="16" y2="7" /><line x1="8" y1="11" x2="16" y2="11" /><line x1="8" y1="15" x2="13" y2="15" /></svg>),
    items: ["Payment processing support", "Receivables", "Cash application", "Refund administration", "Customer reconciliation"],
  },
  {
    title: "Marketplace Reconciliation",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>),
    items: ["Marketplace settlements", "Fee reconciliation", "Commission reconciliation", "Payment discrepancies", "Exception management"],
  },
  {
    title: "Procure-to-Pay",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>),
    items: ["Supplier invoices", "Vendor administration", "Payment support", "Account reconciliation"],
  },
  {
    title: "Financial Intelligence",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>),
    items: ["Sales reconciliation", "Refund trends", "Marketplace fees", "Receivables analysis", "Operational dashboards"],
  },
];

const trustedCapabilities = [
  {
    title: "Transaction Support",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>),
    image: "/services/ecommerce/Transaction Support.jpg",
    items: ["Payment exception workflows", "Transaction review support", "Dispute administration"],
  },
  {
    title: "Fraud Operations",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>),
    image: "/services/ecommerce/Fraud Operations.jpg",
    items: ["Alert processing support", "Case administration", "Transaction review workflows", "Escalation support"],
  },
  {
    title: "Content Quality",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="10" y1="11" x2="4" y2="11" /><line x1="10" y1="6" x2="4" y2="6" /><line x1="10" y1="16" x2="4" y2="16" /><path d="M20 7.5 15.5 12 13 9.5" /><path d="M20 15.5 15.5 20 13 17.5" /></svg>),
    image: "/services/ecommerce/Content Quality.jpg",
    items: ["Listing-quality review", "Product-content validation", "Policy workflow support", "Exception handling"],
  },
  {
    title: "Marketplace Trust",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>),
    image: "/services/ecommerce/Marketplace Trust.jpg",
    items: ["Seller-data validation", "Listing issue management", "Case administration", "Operational reporting"],
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
  const hdStageRef = useRef<HTMLDivElement | null>(null);
  const [cxActive, setCxActive] = useState(0);
  const cxRailRef = useRef<HTMLDivElement | null>(null);
  const cxLineRef = useRef<HTMLDivElement | null>(null);
  const cxFillRef = useRef<HTMLSpanElement | null>(null);
  const cxBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onHdTilt = (e: React.MouseEvent<HTMLElement>) => {
    const stage = hdStageRef.current;
    if (!stage) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    stage.style.transform = `perspective(1200px) rotateY(${(x * 8).toFixed(2)}deg) rotateX(${(y * -8).toFixed(2)}deg)`;
  };
  const onHdTiltReset = () => {
    if (hdStageRef.current) hdStageRef.current.style.transform = "";
  };

  useEffect(() => {
    const rail = cxRailRef.current;
    const line = cxLineRef.current;
    const fill = cxFillRef.current;
    if (!rail || !line || !fill) return;
    const draw = () => {
      const railRect = rail.getBoundingClientRect();
      const centers = cxBtnRefs.current.map((el) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return r.left + r.width / 2 - railRect.left;
      });
      const first = centers[0] ?? 0;
      const last = centers[centers.length - 1] ?? first;
      line.style.left = `${first}px`;
      line.style.width = `${Math.max(0, last - first)}px`;
      const activeX = centers[cxActive] ?? first;
      fill.style.left = `${first}px`;
      fill.style.width = `${Math.max(0, activeX - first)}px`;
    };
    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [cxActive]);

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
        .ec-section-landscape { padding-top: clamp(48px, 6vw, 80px); padding-bottom: clamp(40px, 5vw, 60px); position: relative; background: #ffffff; }
        .ec-section-landscape::before { content: none; }
        .ec-section-landscape::after { content: none; }
        .ec-landscape-text { }
        .ec-landscape-left { }
        .ec-head h2 { position: relative; padding-bottom: 12px; }
        .ec-head h2::after { content: ""; display: block; width: 64px; height: 4px; background: #C4E538; margin-top: 14px; }
        .ec-landscape-left p { color: #5B6472; max-width: 440px; }
        .ec-landscape-right { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .ec-challenge-card {
          background: linear-gradient(160deg, #0E1B2E 0%, #1B2735 100%);
          border: 1px solid rgba(198,232,74,0.14);
          border-radius: 16px;
          padding: 22px 22px 20px;
          position: relative;
          overflow: hidden;
          transition: transform .3s cubic-bezier(.4,0,.2,1), box-shadow .3s ease, border-color .3s ease;
          box-shadow: 0 10px 30px -12px rgba(12,27,48,0.35);
        }
        .ec-challenge-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background: radial-gradient(120px 60px at 20% 0%, rgba(198,232,74,0.12), transparent 70%);
          opacity: 0;
          transition: opacity .3s ease;
          pointer-events: none;
        }
        .ec-challenge-card:hover {
          transform: translateY(-5px) scale(1.01);
          box-shadow: 0 20px 44px -12px rgba(12,27,48,0.45);
          border-color: rgba(198,232,74,0.45);
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
          background: #C6E84A;
          color: #0f0f0f;
          box-shadow: 0 2px 12px -3px rgba(198,232,74,0.5);
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
        .ec-challenge-label { font-size: 15px; font-weight: 600; color: #ffffff; line-height: 1.4; }
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
        .ec-claims-flow { position: relative; margin-top: 40px; max-width: 640px; width: 100%; aspect-ratio: 16 / 11; }
        .ec-cw-lines { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
        .ec-cw-node { position: absolute; z-index: 2; transform: translate(-50%, -50%); display: flex; align-items: center; justify-content: center; }
        .ec-cw-circle { width: 62px; height: 62px; border-radius: 50%; background: var(--ecn); border: 1.5px solid var(--ecc); display: flex; align-items: center; justify-content: center; color: #f4f7fb; transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.3s ease; }
        .ec-cw-node:hover .ec-cw-circle { transform: scale(1.08); border-color: #D9F77E; box-shadow: 0 0 0 7px rgba(198,232,74,0.12); }
        .ec-cw-label { position: absolute; bottom: calc(100% + 12px); left: 0; right: 0; display: flex; flex-direction: column; align-items: center; gap: 3px; pointer-events: none; }
        .ec-cw-num { font-family: var(--font-syne), Arial, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; color: var(--ecc); line-height: 1; }
        .ec-cw-name { font-family: var(--font-syne), Arial, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; color: #ffffff; text-transform: uppercase; white-space: nowrap; line-height: 1.15; }
        .ec-cw-sub { position: absolute; top: calc(100% + 10px); left: 0; right: 0; text-align: center; font-size: 12px; line-height: 1.35; color: rgba(196,211,231,0.72); white-space: nowrap; padding: 0 4px; pointer-events: none; }
        .ec-cw-arrow { position: absolute; z-index: 1; width: 0; height: 0; transform: translate(-50%, -50%); pointer-events: none; }
        .ec-cw-arrow--r { border-left: 9px solid var(--ecc); border-top: 5px solid transparent; border-bottom: 5px solid transparent; }
        .ec-cw-arrow--l { border-right: 9px solid var(--ecc); border-top: 5px solid transparent; border-bottom: 5px solid transparent; }
        .ec-cw-arrow--d { border-top: 9px solid var(--ecc); border-left: 5px solid transparent; border-right: 5px solid transparent; }
        .ec-cw-arrow--u { border-bottom: 9px solid var(--ecc); border-left: 5px solid transparent; border-right: 5px solid transparent; }
        @media (max-width: 1100px) {
          .ec-claims-flow { max-width: 100%; aspect-ratio: auto; }
          .ec-cw-lines, .ec-cw-arrow { display: none; }
          .ec-cw-node { position: relative; left: auto !important; top: auto !important; transform: none; width: 100%; margin: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
          .ec-cw-label { position: static; bottom: auto; margin-bottom: 12px; }
          .ec-cw-sub { position: static; top: auto; margin-top: 12px; white-space: normal; }
          .ec-cw-node:not(:last-child)::after { content: ""; display: block; width: 0; height: 0; margin: 4px auto 0; border-top: 9px solid var(--ecc); border-left: 5px solid transparent; border-right: 5px solid transparent; }
        }
        @media (max-width: 540px) {
          .ec-cw-circle { width: 58px; height: 58px; }
        }
        @media (prefers-reduced-motion: reduce) { .ec-cw-node:hover .ec-cw-circle { transform: none; } }

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

        .ec-out-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 56px; }
        .ec-outcome { position: relative; overflow: hidden; background: #f5f5f3; border-radius: 16px; display: flex; flex-direction: row; min-height: 220px; box-shadow: 0 2px 12px -4px rgba(12,27,48,0.08); transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease; }
        .ec-outcome--dark { background: #0c1b2e; }
        .ec-outcome:hover { transform: translateY(-4px); box-shadow: 0 16px 40px -14px rgba(12,27,48,0.20); }
        .ec-outcome-body { flex: 0 0 50%; padding: 24px 20px 24px 24px; display: flex; flex-direction: column; justify-content: flex-end; position: relative; z-index: 2; pointer-events: none; }
        .ec-outcome-body * { pointer-events: auto; }
        .ec-outcome-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #8a97a8; margin: 0 0 10px; }
        .ec-outcome--dark .ec-outcome-eyebrow { color: #6b8299; }
        .ec-outcome-title { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(20px, 1.8vw, 26px); font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; color: #0a1628; margin: 0 0 10px; }
        .ec-outcome--dark .ec-outcome-title { color: #ffffff; }
        .ec-outcome-desc { font-size: 12.5px; line-height: 1.6; color: #5a6b7f; margin: 0; max-width: 24ch; }
        .ec-outcome--dark .ec-outcome-desc { color: #7a96ae; }
        .ec-outcome-media { position: absolute; right: 0; top: 0; bottom: 0; width: 68%; z-index: 1; overflow: hidden; }
        .ec-outcome-media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; object-position: right center; display: block; transition: transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .ec-outcome:hover .ec-outcome-media img { transform: scale(1.05); }

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

        .ec-transform { margin-top:clamp(8px,1vw,16px); padding:0 clamp(28px,5vw,80px) clamp(64px,8vw,120px); background:#FFFFFF; overflow:hidden; }
        .ec-transform-badge { display:inline-block; align-self:flex-start; background:#C6E84A; color:#0f0f0f; padding:8px 20px; border-radius:999px; font-size:14px; font-weight:600; letter-spacing:0.5px; font-variant:small-caps; margin-bottom:clamp(12px,1.6vw,16px); }
        .ec-transform-grid { display:grid; grid-template-columns:1.1fr 1fr; gap:clamp(40px,5vw,72px); align-items:flex-start; }
        .ec-transform-left { display:flex; flex-direction:column; max-width:560px; padding-top:clamp(8px,1vw,16px); }
        .ec-tl-step { display:flex; align-items:flex-start; gap:24px; }
        .ec-tl-step--approach { align-items:center; }
        .ec-tl-icon { flex:0 0 auto; width:52px; height:52px; border-radius:50%; border:1.5px solid #C8D1DD; background:#FFFFFF; color:#93A0B0; display:flex; align-items:center; justify-content:center; }
        .ec-tl-icon svg { width:22px; height:22px; }
        .ec-tl-body { flex:1; min-width:0; }
        .ec-tl-body h3 { font-family:var(--font-syne),Arial,Helvetica,sans-serif; font-size:clamp(20px,2vw,24px); font-weight:700; margin:0; color:#0C1B30; line-height:1.25; }
        .ec-tl-body p { font-size:15px; line-height:1.7; margin:12px 0 0; color:#5A6B7F; }
        .ec-tl-step--approach .ec-tl-body { background:#F3F5F7; border-left:4px solid var(--ecc); border-radius:16px; padding:24px 26px; }
        .ec-tl-link { flex:0 0 auto; width:0; height:44px; margin:12px 0 12px 25px; border-left:2px dashed #C6E84A; }
        .ec-pot-card { background:#0C1B30; border-radius:22px; padding:clamp(30px,3.5vw,44px); color:#FFFFFF; box-shadow:0 34px 70px -40px rgba(7,20,38,0.5); }
        .ec-pot-title { font-family:var(--font-syne),Arial,Helvetica,sans-serif; font-size:clamp(24px,2.6vw,32px); font-weight:700; margin:0 0 clamp(18px,2vw,24px); color:#FFFFFF; line-height:1.25; }
        .ec-pot-checklist { list-style:none; margin:0; padding:0; }
        .ec-pot-checklist li { display:flex; align-items:center; gap:14px; padding:16px 0; border-bottom:1px solid rgba(255,255,255,0.1); font-size:15px; font-weight:600; color:#FFFFFF; }
        .ec-pot-checklist li:last-child { border-bottom:none; }
        .ec-pot-tick { flex:0 0 auto; display:inline-flex; align-items:center; justify-content:center; color:var(--ecc); }
        .ec-pot-tick svg { width:18px; height:18px; }
        .ec-transform-cta { display:inline-flex; align-items:center; justify-content:center; gap:10px; align-self:flex-start; background:#C6E84A; color:#0f0f0f; padding:15px 30px; border-radius:999px; font-weight:700; font-size:15px; letter-spacing:0.02em; text-decoration:none; margin-top:28px; transition:background .25s ease, transform .25s cubic-bezier(0.16,1,0.3,1), box-shadow .25s ease; }
        .ec-transform-cta span { display:inline-block; transition:transform .2s ease; }
        .ec-transform-cta:hover { background:#D9F77E; transform:translateY(-2px); box-shadow:0 16px 34px -14px rgba(198,232,74,0.55); }
        .ec-transform-cta:hover span { transform:translateX(3px); }
        @media (prefers-reduced-motion:reduce){ .ec-transform-cta:hover{ transform:none; } .ec-transform-cta:hover span{ transform:none; } }
        @media (max-width:900px){ .ec-transform{ margin-top:clamp(12px,3vw,24px); padding:0 24px clamp(48px,8vw,72px); } .ec-transform-grid{ grid-template-columns:1fr; gap:40px; } .ec-transform-left{ max-width:none; } }
        @media (max-width:520px){ .ec-tl-step{ gap:16px; } .ec-tl-icon{ width:46px; height:46px; } .ec-tl-icon svg{ width:20px; height:20px; } .ec-tl-link{ margin-left:22px; height:36px; margin-top:10px; margin-bottom:10px; } .ec-tl-step--approach .ec-tl-body{ padding:20px 18px; } }

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
        .scd-tab { appearance: none; border: none; background: #1B2530; border-radius: 14px 14px 0 0; padding: 14px 12px; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; color: #B7C3D0; font-family: inherit; font-size: 13.5px; font-weight: 700; opacity: 0.85; transition: background 0.3s ease, transform 0.3s cubic-bezier(0.3, 0.9, 0.3, 1), opacity 0.3s ease, color 0.3s ease; text-align: center; min-width: 0; overflow: hidden; }
        .scd-tab:hover { background: #26303C; color: #ffffff; opacity: 1; }
        .scd-tab.is-active { background: #C6E84A; color: #0f0f0f; opacity: 1; transform: translateY(-4px); box-shadow: 0 -8px 20px rgba(0,0,0,0.3); }
        .scd-tab.is-active .scd-tab-num { background: rgba(15,23,42,0.16); color: #0f0f0f; }
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
                <article key={c.label} className="ec-challenge-card">
                  <div className="ec-challenge-top">
                    <div className="ec-challenge-icon" aria-hidden="true">
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
              <div className="ec-claims-flow">
                <svg className="ec-cw-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <path
                    d="M14 28 H50 M50 28 H86 M86 28 L86 67 M86 74 H50 M50 74 H14"
                    stroke="#C6E84A"
                    strokeOpacity="0.42"
                    strokeWidth="1.2"
                    vectorEffect="non-scaling-stroke"
                    fill="none"
                  />
                </svg>

                <span className="ec-cw-arrow ec-cw-arrow--r" style={{ left: "32%", top: "28%" }} aria-hidden="true" />
                <span className="ec-cw-arrow ec-cw-arrow--r" style={{ left: "68%", top: "28%" }} aria-hidden="true" />
                <span className="ec-cw-arrow ec-cw-arrow--d" style={{ left: "86%", top: "67%" }} aria-hidden="true" />
                <span className="ec-cw-arrow ec-cw-arrow--l" style={{ left: "68%", top: "74%" }} aria-hidden="true" />
                <span className="ec-cw-arrow ec-cw-arrow--l" style={{ left: "32%", top: "74%" }} aria-hidden="true" />

                {commerceSteps.map((s) => (
                  <div key={s.name} className="ec-cw-node" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
                    <div className="ec-cw-circle">{flowIcons[s.icon]}</div>
                    <span className="ec-cw-label">
                      <span className="ec-cw-num">{s.num}</span>
                      <span className="ec-cw-name">{s.name}</span>
                    </span>
                    <span className="ec-cw-sub">{s.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ec-section-light ec-mp">
        <div className="ec-wrap">
          <div className="ec-reveal">
            <EcLabel text="Marketplace & Seller Operations" light />
            <h2 className="ec-h2">Make marketplace complexity <span style={{ color: "#C6E84A" }}>easier to manage.</span></h2>
            <p className="ec-lede">Marketplaces bring together products, sellers, customers, transactions and service expectations at enormous scale.</p>
            <p className="ec-copy">Sytrion supports the operational workflows behind marketplace growth, helping businesses maintain product quality, seller information and responsive marketplace operations.</p>

          </div>
          <div className="ec-ms-cards ec-reveal">
            {marketplaceCapabilities.map((c) => (
              <div key={c.title} className="ec-ms-card" tabIndex={0}>
                <div className="ec-ms-card-inner">
                  <div className="ec-ms-card-face ec-ms-card-face--front" style={{ backgroundImage: `url("${c.image}")` }}>
                    <span className="ec-ms-card-icon" aria-hidden="true">{c.icon}</span>
                    <h3 className="ec-ms-card-title">{c.title}</h3>
                    <span className="ec-ms-card-hint">HOVER TO EXPLORE ↻</span>
                  </div>
                  <div className="ec-ms-card-face ec-ms-card-face--back">
                    <h4 className="ec-ms-card-back-title">{c.title}</h4>
                    <ul>
                      {c.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
            <div className="ec-ms-strip">
              <span className="ec-ms-strip-title">MARKETPLACE &amp; SELLER OPERATIONS</span>
              <span className="ec-ms-strip-items">
                {marketplaceCapabilities.map((c, i, arr) => (
                  <span key={c.title}>
                    {c.title}
                    {i < arr.length - 1 && <span className="ec-ms-strip-pipe"> | </span>}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>
        <style>{`
          .ec-ms-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #7AA306; margin: 24px 0 0; font-variant-numeric: tabular-nums; }
          .ec-ms-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 56px; }
          .ec-ms-card { perspective: 1400px; outline: none; cursor: pointer; }
          .ec-ms-card-inner { position: relative; height: clamp(300px, 30vw, 370px); transform-style: preserve-3d; transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.25, 1); }
          .ec-ms-card:hover .ec-ms-card-inner, .ec-ms-card:focus-visible .ec-ms-card-inner { transform: rotateY(180deg); }
          .ec-ms-card-face { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; border-radius: 16px; border: 1px solid #D1D9E6; background: #FAFBFC; box-shadow: 0 2px 12px -4px rgba(12,27,48,0.08); padding: 26px 24px; display: flex; flex-direction: column; }
          .ec-ms-card-face--back { transform: rotateY(180deg); border-color: rgba(122,163,6,0.45); background: linear-gradient(160deg, rgba(198,232,74,0.16), #ffffff); }
          .ec-ms-card-face--front { justify-content: flex-end; align-items: center; text-align: center; background-size: cover; background-position: center; overflow: hidden; padding-bottom: 58px; }
          .ec-ms-card-face--front::before { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(12,27,48,0.08) 0%, rgba(12,27,48,0.42) 50%, rgba(12,27,48,0.82) 100%); z-index: 0; }
          .ec-ms-card-icon { position: relative; z-index: 1; width: 84px; height: 84px; flex: 0 0 auto; border-radius: 20px; background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.38); color: #ffffff; backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
          .ec-ms-card-icon svg { width: 38px; height: 38px; }
          .ec-ms-card-title { position: relative; z-index: 1; font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 17px; font-weight: 700; letter-spacing: 0.05em; color: #ffffff; text-shadow: 0 1px 10px rgba(0,0,0,0.4); margin: 0; line-height: 1.45; max-width: 220px; }
          .ec-ms-card-hint { position: absolute; bottom: 18px; left: 0; right: 0; z-index: 1; text-align: center; font-size: 11.5px; letter-spacing: 0.14em; color: rgba(255,255,255,0.78); }
          .ec-ms-card-back-title { font-size: 12.5px; font-weight: 700; letter-spacing: 0.12em; color: #618300; margin: 0 0 12px; }
          .ec-ms-card ul { list-style: none; margin: 0; padding: 0; }
          .ec-ms-card li { font-size: 14.5px; color: #33475E; padding: 7px 0; border-top: 1px solid rgba(12,27,48,0.07); }
          .ec-ms-card li:first-child { border-top: none; }
          .ec-ms-strip { margin-top: 26px; grid-column: 1 / -1; border: 1px solid rgba(122,163,6,0.35); background: rgba(198,232,74,0.07); border-radius: 16px; padding: 22px 28px; display: flex; flex-wrap: wrap; align-items: center; gap: 12px 28px; }
          .ec-ms-strip-title { font-size: 13.5px; font-weight: 700; letter-spacing: 0.14em; color: #4D7C0F; }
          .ec-ms-strip-items { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; font-size: 14.5px; color: #33475E; text-transform: uppercase; letter-spacing: 0.06em; }
          .ec-ms-strip-pipe { color: rgba(122,163,6,0.6); }
          @media (max-width: 1080px) { .ec-ms-cards { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 640px) { .ec-ms-cards { grid-template-columns: 1fr; } }
        `}</style>
      </section>

      <section className="ec-section-dark ec-of">
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
        <style>{`
          .ec-of .ec-prov-net { background:
            radial-gradient(circle at 78% 18%, rgba(198,232,74,0.20), rgba(198,232,74,0) 34%),
            linear-gradient(210deg, rgba(16,49,92,0.16) 0%, rgba(7,20,38,0.62) 100%); }
          .ec-of .ec-timeline::before { background: linear-gradient(180deg, var(--ecc), rgba(16,49,92,0.35)); }
          .ec-of .ec-tstep::before { background: var(--ecn); }
          .ec-of .ec-tstep-name { color: #ffffff; }
          .ec-of .ec-tstep-sub { color: rgba(196,211,231,0.72); }
        `}</style>
      </section>

      <section className="ec-section-light ec-rs">
        <div className="ec-wrap">
          <div className="ec-rs-head ec-reveal">
            <EcLabel text="Returns & Refunds" light />
            <h2 className="ec-h2">Make the journey back as seamless as the <span style={{ color: "#C6E84A" }}>journey out.</span></h2>
            <p className="ec-lede">Returns are one of e-commerce&apos;s most operationally complex moments — connecting customers, orders, products, payments, inventory and logistics.</p>
            <p className="ec-copy">Sytrion supports structured returns and refund operations designed to improve visibility, processing consistency and customer experience.</p>
          </div>
          <div className="ec-rs-flow ec-reveal">
            <div className="ec-rs-rail">
              <div className="ec-rs-rail-line" aria-hidden="true" />
              {reverseStages.map((s, i) => {
                const up = i % 2 === 0;
                return (
                  <div key={s.num} className="ec-rs-step">
                    <div className="ec-rs-node" aria-hidden="true" />
                    <div className={"ec-rs-stem ec-rs-stem--" + (up ? "up" : "down")} aria-hidden="true" />
                    <div className={"ec-rs-label ec-rs-label--" + (up ? "up" : "down")}>
                      <span className="ec-rs-lbl-num">{s.num}</span>
                      <h3 className="ec-rs-name">{s.name}</h3>
                      <p className="ec-rs-desc">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <style>{`
          .ec-rs .ec-h2 { color: #0f172a; }
          .ec-rs .ec-lede { color: #5A5D66; }
          .ec-rs .ec-copy { color: #5A5D66; }
          .ec-rs-head { max-width: 820px; }
          .ec-rs-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #7AA306; margin: 22px 0 0; font-variant-numeric: tabular-nums; }
          .ec-rs-flow { margin-top: 52px; background: linear-gradient(135deg, #2b2f1a, #0d0f08); border-radius: 20px; padding: 20px 44px; }
          .ec-rs-rail { position: relative; display: flex; height: 330px; }
          .ec-rs-rail-line { position: absolute; top: 50%; left: 0; right: 0; height: 2px; transform: translateY(-50%); background: linear-gradient(90deg, rgba(198,232,74,0.12), rgba(198,232,74,0.95)); border-radius: 2px; z-index: 0; }
          .ec-rs-step { position: relative; flex: 1; height: 100%; }
          .ec-rs-node { position: absolute; top: 50%; left: 50%; width: 13px; height: 13px; border-radius: 50%; background: #C6E84A; transform: translate(-50%, -50%); z-index: 2; }
          .ec-rs-stem { position: absolute; left: 50%; width: 1px; background: rgba(198,232,74,0.35); z-index: 1; }
          .ec-rs-stem--up { bottom: 50%; height: 46px; }
          .ec-rs-stem--down { top: 50%; height: 46px; }
          .ec-rs-label { position: absolute; left: 50%; transform: translateX(-50%); width: 168px; text-align: center; z-index: 2; }
          .ec-rs-label--up { bottom: calc(50% + 46px); }
          .ec-rs-label--down { top: calc(50% + 46px); }
          .ec-rs-lbl-num { display: block; font-family: var(--font-syne), Arial, sans-serif; font-size: 22px; font-weight: 800; color: #C6E84A; text-shadow: 0 0 18px rgba(198,232,74,0.5); margin-bottom: 4px; }
          .ec-rs-name { font-family: var(--font-syne), Arial, sans-serif; font-size: 13.5px; font-weight: 700; letter-spacing: 0.03em; text-transform: uppercase; color: #f6f7ef; margin: 0 0 6px; }
          .ec-rs-desc { font-size: 12.5px; color: #a9ab9a; margin: 0; line-height: 1.45; }
          @media (max-width: 900px) {
            .ec-rs-flow { padding: 36px 24px; }
            .ec-rs-rail { flex-direction: column; height: auto; gap: 0; }
            .ec-rs-rail-line { top: 0; bottom: 0; left: 16px; right: auto; width: 2px; height: auto; transform: translateY(0); background: linear-gradient(180deg, rgba(198,232,74,0.12), rgba(198,232,74,0.95)); }
            .ec-rs-step { height: auto; padding: 0 0 32px 44px; }
            .ec-rs-step:last-child { padding-bottom: 0; }
            .ec-rs-node { top: 6px; left: 16px; transform: translate(-50%, 0); }
            .ec-rs-stem { display: none; }
            .ec-rs-label { position: static; transform: none; width: auto; text-align: left; }
          }
        `}</style>
      </section>

      <section className="ec-cx2">
        <div className="ec-cx2-glow" aria-hidden="true" />
        <div className="ec-cx2-wrap">
          <div className="ec-cx2-head ec-reveal">
            <span className="ec-cx2-pill">Customer Experience</span>
            <h2 className="ec-cx2-title">
              <span>Turn every interaction into an opportunity to&nbsp;</span>
              <span className="ec-cx2-title-lime">build loyalty.</span>
            </h2>
            <div className="ec-cx2-cols">
              <p className="ec-cx2-p ec-cx2-p--main">E-commerce customers expect answers wherever they choose to engage — before purchase, during fulfillment and after delivery.</p>
              <p className="ec-cx2-p ec-cx2-p--dim">Sytrion combines digital channels, AI-assisted support and skilled customer-service teams to create responsive commerce operations across the customer journey.</p>
            </div>
          </div>

          <div className="ec-cx2-rail" ref={cxRailRef}>
            <div className="ec-cx2-line" ref={cxLineRef} aria-hidden="true" />
            <span className="ec-cx2-fill" ref={cxFillRef} aria-hidden="true" />
            {cxStages.map((s, i) => (
              <button
                key={s.num}
                type="button"
                ref={(el) => { cxBtnRefs.current[i] = el; }}
                className={"ec-cx2-btn" + (cxActive === i ? " is-active" : "")}
                onClick={() => setCxActive(i)}
                aria-pressed={cxActive === i}
              >
                <span className="ec-cx2-marker" aria-hidden="true">
                  <span className="ec-cx2-num">{s.num}</span>
                </span>
                <span className="ec-cx2-label">{s.label}</span>
              </button>
            ))}
          </div>

          <div className="ec-cx2-panel ec-reveal">
            <div key={cxActive} className="ec-cx2-panel-in ec-cx2-anim">
              <div className="ec-cx2-left">
                <span className="ec-cx2-ghost" aria-hidden="true">{cxStages[cxActive].num}</span>
                <span className="ec-cx2-icon" aria-hidden="true">{cxStages[cxActive].icon}</span>
              </div>
              <div className="ec-cx2-right">
                <h3 className="ec-cx2-stage-title">{cxStages[cxActive].title}</h3>
                <p className="ec-cx2-stage-desc">{cxStages[cxActive].desc}</p>
                <ul className="ec-cx2-list">
                  {cxStages[cxActive].items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          .ec-cx2 { position: relative; overflow: hidden; background: #0B1220; }
          .ec-cx2-glow { position: absolute; width: 900px; height: 500px; left: 85%; top: -10%; transform: translate(-50%, -50%); border-radius: 50%; background: radial-gradient(closest-side, rgba(198,241,53,0.06), rgba(198,241,53,0) 70%); pointer-events: none; }
          .ec-cx2-wrap { position: relative; z-index: 1; width: 100%; max-width: 1400px; margin: 0 auto; padding: clamp(72px, 8vw, 96px) clamp(20px, 4vw, 64px); }

          .ec-cx2-pill { display: inline-flex; align-items: center; background: #C6F135; color: #0B1220; font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 9px 20px; border-radius: 999px; margin: 0 0 28px; }
          .ec-cx2-title { margin: 0 0 24px; }
          .ec-cx2-title span { display: block; font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(34px, 4.4vw, 48px); font-weight: 700; line-height: 1.12; letter-spacing: -0.02em; color: #F4F5F2; }
          .ec-cx2-title .ec-cx2-title-lime { color: #C6F135; }
          .ec-cx2-cols { display: flex; gap: clamp(24px, 4vw, 48px); }
          .ec-cx2-p { flex: 1; font-size: clamp(15.5px, 1.35vw, 18px); line-height: 1.8; margin: 0; }
          .ec-cx2-p--main { color: #F4F5F2; }
          .ec-cx2-p--dim { color: #93A0B0; }

          .ec-cx2-rail { position: relative; display: flex; justify-content: space-between; margin-top: clamp(44px, 6vw, 72px); }
          .ec-cx2-line { position: absolute; top: 18px; height: 2px; border-radius: 2px; background: #223148; z-index: 1; }
          .ec-cx2-fill { position: absolute; top: 18px; height: 2px; border-radius: 2px; background: #C6F135; z-index: 1; box-shadow: 0 0 10px rgba(198,241,53,0.45); transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
          .ec-cx2-btn { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 12px; background: none; border: 0; padding: 0; cursor: pointer; font-family: inherit; }
          .ec-cx2-marker { width: 38px; height: 38px; border-radius: 50%; border: 1.5px solid #223148; background: #0B1220; display: flex; align-items: center; justify-content: center; transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
          .ec-cx2-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; color: #93A0B0; transition: color 0.3s ease; font-variant-numeric: tabular-nums; }
          .ec-cx2-btn:hover .ec-cx2-marker { border-color: rgba(198,241,53,0.5); }
          .ec-cx2-btn:hover .ec-cx2-num { color: #F4F5F2; }
          .ec-cx2-btn.is-active .ec-cx2-marker { background: #C6F135; border-color: #C6F135; box-shadow: 0 0 0 7px rgba(198,241,53,0.14), 0 0 26px rgba(198,241,53,0.4); }
          .ec-cx2-btn.is-active .ec-cx2-num { color: #0B1220; }
          .ec-cx2-label { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 700; color: #93A0B0; white-space: nowrap; transition: color 0.3s ease; }
          .ec-cx2-btn:hover .ec-cx2-label { color: #F4F5F2; }
          .ec-cx2-btn.is-active .ec-cx2-label { color: #F4F5F2; }

          .ec-cx2-panel { margin-top: clamp(40px, 6vw, 64px); }
          .ec-cx2-panel-in { display: grid; grid-template-columns: 200px 1fr; gap: clamp(28px, 4vw, 56px); align-items: start; }
          .ec-cx2-anim { animation: ecCx2Swap 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
          @keyframes ecCx2Swap { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
          .ec-cx2-left { display: flex; flex-direction: column; align-items: flex-start; gap: 20px; }
          .ec-cx2-ghost { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(96px, 11vw, 150px); font-weight: 700; line-height: 0.9; letter-spacing: -0.02em; color: transparent; -webkit-text-stroke: 1.5px #223148; font-variant-numeric: tabular-nums; }
          .ec-cx2-icon { width: 56px; height: 56px; border-radius: 14px; border: 1px solid #223148; background: rgba(24, 36, 62, 0.35); display: flex; align-items: center; justify-content: center; color: #C6F135; }
          .ec-cx2-icon svg { width: 26px; height: 26px; }
          .ec-cx2-stage-title { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 28px; font-weight: 700; color: #F4F5F2; margin: 0 0 10px; }
          .ec-cx2-stage-desc { font-size: clamp(15px, 1.2vw, 17px); line-height: 1.7; color: #93A0B0; margin: 0; max-width: 640px; }
          .ec-cx2-list { list-style: none; margin: 22px 0 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; column-gap: clamp(32px, 5vw, 64px); }
          .ec-cx2-list li { display: flex; align-items: center; gap: 14px; padding: 15px 0; border-bottom: 1px solid #223148; font-size: 15px; color: #F4F5F2; }
          .ec-cx2-list li::before { content: ""; width: 8px; height: 8px; flex: 0 0 auto; background: #C6F135; transform: rotate(45deg); }

          @media (max-width: 860px) {
            .ec-cx2-cols { flex-direction: column; gap: 16px; }
            .ec-cx2-rail { justify-content: flex-start; gap: clamp(28px, 7vw, 56px); overflow-x: auto; padding-bottom: 10px; margin-top: 40px; }
            .ec-cx2-btn { flex: 0 0 auto; }
            .ec-cx2-line, .ec-cx2-fill { display: none; }
            .ec-cx2-panel-in { grid-template-columns: 1fr; gap: 32px; }
            .ec-cx2-left { flex-direction: row; align-items: center; }
            .ec-cx2-ghost { font-size: clamp(72px, 16vw, 120px); }
            .ec-cx2-list { grid-template-columns: 1fr; }
          }
          @media (prefers-reduced-motion: reduce) {
            .ec-cx2-fill { transition: none; }
            .ec-cx2-anim { animation: none; }
          }
        `}</style>
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

      <section className="ec-hd" onMouseMove={onHdTilt} onMouseLeave={onHdTiltReset}>
        <div className="ec-hd-glow ec-hd-glow--lime" aria-hidden="true" />
        <div className="ec-hd-glow ec-hd-glow--blue" aria-hidden="true" />
        <div className="ec-wrap">
          <div className="ec-hd-grid">
            <div className="ec-hd-copy ec-reveal">
              <p className="ec-hd-kicker">11 / Human + Digital</p>
              <span className="ec-hd-pill">Human + Digital</span>
              <h2 className="ec-hd-title">
                <span className="ec-hd-title-white">Automation at scale.</span>
                <span className="ec-hd-title-lime">Human judgment where it matters.</span>
              </h2>
              <p className="ec-hd-line">Automation can process routine updates.</p>
              <p className="ec-hd-line">AI can classify products, understand customer intent and identify exceptions.</p>
              <p className="ec-hd-line">People bring context, judgment and empathy to situations that are not routine.</p>
              <p className="ec-hd-em">Sytrion brings them together.</p>
            </div>
            <div className="ec-hd-visual ec-reveal">
              <div className="ec-hd-stage" ref={hdStageRef}>
                <div className="ec-hd-halo" aria-hidden="true" />
                <svg className="ec-hd-conn" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <line x1="24" y1="16" x2="36" y2="29" />
                  <line x1="24" y1="54" x2="36" y2="46" />
                  <line x1="52" y1="70" x2="62" y2="48" />
                </svg>
                <div className="ec-hd-globe" aria-hidden="true">
                  <div className="ec-hd-solid" />
                  <svg className="ec-hd-mesh" viewBox="0 0 400 400" fill="none">
                    <ellipse cx="200" cy="200" rx="198" ry="198" stroke="rgba(198,241,53,0.30)" strokeWidth="1" />
                    <ellipse cx="200" cy="200" rx="198" ry="126" stroke="rgba(198,241,53,0.15)" strokeWidth="1" />
                    <ellipse cx="200" cy="200" rx="198" ry="62" stroke="rgba(198,241,53,0.15)" strokeWidth="1" />
                    <ellipse cx="200" cy="200" rx="126" ry="198" stroke="rgba(198,241,53,0.15)" strokeWidth="1" />
                    <ellipse cx="200" cy="200" rx="62" ry="198" stroke="rgba(198,241,53,0.15)" strokeWidth="1" />
                    <ellipse cx="200" cy="200" rx="150" ry="198" stroke="rgba(110,160,255,0.10)" strokeWidth="1" />
                    <path d="M2 200h396" stroke="rgba(198,241,53,0.20)" strokeWidth="1" />
                  </svg>
                  <div className="ec-hd-pts">
                    {[
                      [62, 22], [70, 30], [76, 40], [74, 52], [66, 62], [54, 68], [44, 66], [36, 60],
                      [30, 50], [31, 38], [38, 28], [50, 24], [60, 36], [66, 48], [48, 56], [56, 40],
                      [40, 44], [44, 52], [54, 30], [58, 58],
                    ].map(([px, py], i) => (
                      <span
                        key={i}
                        className={"ec-hd-pt" + (i % 5 === 0 ? " ec-hd-pt--glow" : "")}
                        style={{ left: `${px}%`, top: `${py}%` }}
                      />
                    ))}
                  </div>
                  <div className="ec-hd-core" />
                </div>
                <div className="ec-hd-orbit ec-hd-orbit--a" aria-hidden="true">
                  <span className="ec-hd-orbit-dot" />
                </div>
                <div className="ec-hd-orbit ec-hd-orbit--b" aria-hidden="true">
                  <span className="ec-hd-orbit-dot" />
                </div>
                <svg className="ec-hd-hand" viewBox="0 0 320 170" fill="none" aria-hidden="true">
                  <g stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M96 58 C74 64 56 78 48 94 C42 104 40 112 40 118 C40 130 50 138 64 138 L64 120 C52 118 48 112 50 106 C54 92 70 74 96 66" />
                    <path d="M224 58 C246 64 264 78 272 94 C278 104 280 112 280 118 C280 130 270 138 256 138 L256 120 C268 118 272 112 270 106 C266 92 250 74 224 66" />
                    <path d="M160 34 C136 40 114 54 100 74 C95 84 92 96 92 106 C92 120 100 130 112 131 C124 132 132 122 135 130 C138 138 148 146 160 146 C172 146 182 138 185 130 C188 122 196 132 208 131 C220 130 228 120 228 106 C228 96 225 84 220 74 C206 54 184 40 160 34 Z" />
                  </g>
                </svg>
                <div className="ec-hd-card ec-hd-card--tl">
                  <span className="ec-hd-card-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M22 12h-4M6 12H2" /><circle cx="12" cy="12" r="8" opacity="0.45" /></svg>
                  </span>
                  <div>
                    <h3>Smarter decisions</h3>
                    <p>AI analyzes patterns in real time.</p>
                  </div>
                </div>
                <div className="ec-hd-card ec-hd-card--ml">
                  <span className="ec-hd-card-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" /><path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" /></svg>
                  </span>
                  <div>
                    <h3>Automate at scale</h3>
                    <p>Handle high volumes with speed and accuracy.</p>
                  </div>
                </div>
                <div className="ec-hd-card ec-hd-card--r">
                  <span className="ec-hd-card-icon" aria-hidden="true">
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
        <style>{`
          .ec-hd { position: relative; overflow: hidden; background: #0B1220; }
          .ec-hd-glow { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; }
          .ec-hd-glow--lime { width: 46vw; height: 46vw; max-width: 720px; max-height: 720px; right: -9%; top: -14%; background: rgba(198,241,53,0.16); }
          .ec-hd-glow--blue { width: 34vw; height: 34vw; max-width: 560px; max-height: 560px; right: 4%; bottom: -22%; background: rgba(96,146,255,0.10); }
          .ec-hd .ec-wrap { position: relative; z-index: 2; padding: clamp(88px, 10vw, 140px) 40px; }
          .ec-hd-grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: clamp(28px, 4vw, 64px); align-items: center; min-height: clamp(600px, 84vh, 780px); }
          .ec-hd-copy { position: relative; z-index: 2; }
          .ec-hd-kicker { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #C6F135; margin: 0 0 16px; font-variant-numeric: tabular-nums; }
          .ec-hd-pill { display: inline-flex; align-items: center; background: #C6F135; color: #0B1220; font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 9px 20px; border-radius: 999px; margin: 0 0 30px; }
          .ec-hd-title { margin: 0 0 28px; }
          .ec-hd-title-white { display: block; color: #ffffff; font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(40px, 5vw, 56px); font-weight: 700; line-height: 1.06; letter-spacing: -0.02em; }
          .ec-hd-title-lime { display: block; color: #C6F135; font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(40px, 5vw, 56px); font-weight: 700; line-height: 1.06; letter-spacing: -0.02em; }
          .ec-hd-line { font-size: clamp(15.5px, 1.35vw, 18px); line-height: 1.85; color: #93A0B0; margin: 0 0 10px; max-width: 540px; }
          .ec-hd-em { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(19px, 1.9vw, 23px); font-weight: 700; color: #C6F135; margin: 24px 0 0; }

          .ec-hd-visual { position: relative; display: flex; align-items: center; justify-content: center; min-height: clamp(420px, 52vw, 640px); }
          .ec-hd-stage { position: relative; width: 100%; max-width: 660px; aspect-ratio: 1 / 1; transform-style: preserve-3d; transition: transform 0.12s ease-out; will-change: transform; }
          .ec-hd-halo { position: absolute; left: 50%; top: 46%; width: 78%; aspect-ratio: 1; transform: translate(-50%, -50%); border-radius: 50%; background: radial-gradient(circle, rgba(198,241,53,0.10) 0%, rgba(96,146,255,0.05) 45%, rgba(11,18,32,0) 70%); }

          .ec-hd-globe { position: absolute; left: 50%; top: 46%; width: 62%; aspect-ratio: 1; transform: translate(-50%, -50%); }
          .ec-hd-solid { position: absolute; inset: 0; border-radius: 50%; background: radial-gradient(circle at 34% 30%, rgba(198,241,53,0.10) 0%, rgba(11,18,32,0.55) 62%, rgba(11,18,32,0) 100%); animation: ecHdPulse 5s ease-in-out infinite; }
          .ec-hd-mesh { position: absolute; inset: 0; width: 100%; height: 100%; animation: ecHdSpin 70s linear infinite; }
          .ec-hd-pts { position: absolute; inset: 0; }
          .ec-hd-pt { position: absolute; width: 4px; height: 4px; margin: -2px 0 0 -2px; border-radius: 50%; background: rgba(198,241,53,0.9); }
          .ec-hd-pt--glow { width: 6px; height: 6px; margin: -3px 0 0 -3px; background: #C6F135; box-shadow: 0 0 10px 2px rgba(198,241,53,0.75); animation: ecHdTwinkle 3.4s ease-in-out infinite; }
          .ec-hd-core { position: absolute; left: 50%; top: 50%; width: 26%; aspect-ratio: 1; transform: translate(-50%, -50%); border-radius: 50%; background: radial-gradient(circle, rgba(198,241,53,0.55) 0%, rgba(198,241,53,0) 70%); animation: ecHdPulse 5s ease-in-out infinite 0.4s; }

          .ec-hd-orbit { position: absolute; left: 50%; top: 46%; aspect-ratio: 1; transform: translate(-50%, -50%); border-radius: 50%; border: 1px solid rgba(198,241,53,0.28); transform-style: preserve-3d; }
          .ec-hd-orbit--a { width: 82%; transform: translate(-50%, -50%) rotateX(68deg) rotateZ(-14deg); animation: ecHdOrbitA 18s linear infinite; }
          .ec-hd-orbit--b { width: 54%; transform: translate(-50%, -50%) rotateX(76deg) rotateZ(24deg); border-color: rgba(198,241,53,0.18); animation: ecHdOrbitB 26s linear infinite; }
          .ec-hd-orbit-dot { position: absolute; left: 50%; top: -4px; transform: translateX(-50%); width: 7px; height: 7px; border-radius: 50%; background: #C6F135; box-shadow: 0 0 14px 3px rgba(198,241,53,0.8); }

          .ec-hd-hand { position: absolute; left: 50%; top: 88%; transform: translateX(-50%); width: 66%; z-index: 2; }
          .ec-hd-conn { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; }
          .ec-hd-conn line { stroke: rgba(147,160,176,0.35); stroke-width: 1; stroke-dasharray: 2.5 3; }

          .ec-hd-card { position: absolute; z-index: 3; display: flex; gap: 12px; align-items: flex-start; width: 232px; padding: 14px 16px; border-radius: 14px; background: rgba(16,26,44,0.6); border: 1px solid rgba(147,160,176,0.22); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
          .ec-hd-card-icon { width: 36px; height: 36px; flex: 0 0 auto; border-radius: 50%; background: rgba(11,18,32,0.9); border: 1.5px solid rgba(198,241,53,0.7); display: flex; align-items: center; justify-content: center; color: #C6F135; }
          .ec-hd-card-icon svg { width: 16px; height: 16px; }
          .ec-hd-card h3 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; margin: 0 0 4px; }
          .ec-hd-card p { font-size: 12px; line-height: 1.5; color: #93A0B0; margin: 0; }
          .ec-hd-card--tl { left: 0; top: 2%; }
          .ec-hd-card--ml { left: -7%; top: 42%; }
          .ec-hd-card--r { left: 56%; top: 56%; }

          @keyframes ecHdSpin { to { transform: rotate(360deg); } }
          @keyframes ecHdPulse { 0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); } 50% { opacity: 1; transform: translate(-50%, -50%) scale(1.06); } }
          @keyframes ecHdTwinkle { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
          @keyframes ecHdOrbitA { to { transform: translate(-50%, -50%) rotateX(68deg) rotateZ(-14deg) rotate(360deg); } }
          @keyframes ecHdOrbitB { to { transform: translate(-50%, -50%) rotateX(76deg) rotateZ(24deg) rotate(-360deg); } }

          @media (max-width: 1080px) {
            .ec-hd-grid { grid-template-columns: 1fr 1fr; }
            .ec-hd-card { width: 200px; }
            .ec-hd-card--ml { left: -4%; }
          }
          @media (max-width: 900px) {
            .ec-hd-grid { grid-template-columns: 1fr; gap: 40px; min-height: 0; }
            .ec-hd-visual { min-height: 0; }
            .ec-hd-stage { max-width: 560px; aspect-ratio: 1 / 1; margin: 0 auto; }
            .ec-hd-card { width: 212px; }
            .ec-hd-card--tl { left: 0; top: 2%; }
            .ec-hd-card--ml { left: -4%; top: 42%; }
            .ec-hd-card--r { left: 58%; top: 58%; }
          }
          @media (max-width: 760px) {
            .ec-hd-stage { max-width: 460px; }
            .ec-hd-conn, .ec-hd-card--ml, .ec-hd-card--r { display: none; }
            .ec-hd-card--tl { left: 4%; top: 6%; }
          }
          @media (max-width: 640px) {
            .ec-hd .ec-wrap { padding: 72px 20px; }
            .ec-hd-stage { max-width: 400px; }
            .ec-hd-hand { width: 72%; }
          }
        `}</style>
      </section>

      <section className="ec-fin">
        <div className="ec-wrap">
          <div className="ec-prov-grid">
            <div className="ec-reveal">
              <EcLabel text="Commerce Finance Operations" light />
              <h2 className="ec-h2">Control behind <span style={{ color: "#7AA306" }}>every transaction.</span></h2>
              <p className="ec-lede">Digital commerce generates complex financial flows across customers, marketplaces, payment providers, sellers, logistics partners and suppliers.</p>

            </div>
            <div className="ec-reveal ec-fin-aside">
              <div className="ec-fin-flow-box">
                <span className="ec-fin-flow-title">Transaction Lifecycle</span>
                <div className="ec-fin-flow">
                  <span>Transactions</span><span className="ec-fin-flow-arrow" aria-hidden="true">→</span>
                  <span>Settlements</span><span className="ec-fin-flow-arrow" aria-hidden="true">→</span>
                  <span>Reconciliation</span><span className="ec-fin-flow-arrow" aria-hidden="true">→</span>
                  <span>Visibility</span>
                </div>
              </div>
              <p className="ec-fin-note">Structured finance operations connecting the full transaction lifecycle — from payment and settlement to reconciliation and reporting.</p>
            </div>
          </div>
          <div className="ec-fin-grid ec-reveal">
            {financeCapabilities.map((c, idx) => (
              <article key={c.title} className="ec-fin-block">
                <div className="ec-fin-badge">0{idx + 1}</div>
                <div className="ec-fin-head">
                  <div className="ec-fin-icon" aria-hidden="true">{c.icon}</div>
                  <h3>{c.title}</h3>
                </div>
                <ul>
                  {c.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          .ec-fin { background: #FFFFFF; padding: clamp(48px, 5.5vw, 72px) 80px; border-top: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0; }
          .ec-fin .ec-h2 { color: #0f172a; margin-bottom: 14px; }
          .ec-fin .ec-lede { color: #475569; margin-bottom: 12px; }
          .ec-fin .ec-prov-grid { grid-template-columns: 1fr 1fr; align-items: start; gap: 40px; }
          .ec-fin-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #7AA306; margin: 16px 0 0; font-variant-numeric: tabular-nums; }
          .ec-fin-aside { padding-top: 6px; }
          .ec-fin-flow-box { background: #FAFBFC; border: 1.5px solid #D1D9E6; border-radius: 14px; padding: 14px 18px; box-shadow: 0 2px 10px rgba(15,23,42,0.03); }
          .ec-fin-flow-title { display: block; font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 11px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; color: #64748B; margin-bottom: 8px; }
          .ec-fin-flow { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #1E293B; }
          .ec-fin-flow span { white-space: nowrap; }
          .ec-fin-flow-arrow { color: #7AA306; font-weight: 900; }
          .ec-fin-note { font-size: 14.5px; line-height: 1.7; color: #5A6B7F; margin: 14px 0 0; max-width: 460px; }
          .ec-fin-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 36px; }
          .ec-fin-block { position: relative; background: #FAFBFC; border: 1.5px solid #D1D9E6; border-radius: 14px; padding: 22px 20px 20px; transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.3s ease; box-shadow: 0 2px 12px rgba(15,23,42,0.03); display: flex; flex-direction: column; justify-content: space-between; }
          .ec-fin-block::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 3px; border-radius: 14px 14px 0 0; background: linear-gradient(90deg, #7AA306, #C6E84A); }
          .ec-fin-badge { position: absolute; top: 16px; right: 18px; font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 12px; font-weight: 800; color: #64748B; letter-spacing: 0.1em; }
          .ec-fin-block:hover { transform: translateY(-4px); box-shadow: 0 14px 32px -8px rgba(122,163,6,0.18); border-color: rgba(122,163,6,0.45); }
          .ec-fin-head { display: flex; flex-direction: column; gap: 12px; margin-bottom: 14px; }
          .ec-fin-icon { width: 44px; height: 44px; border-radius: 10px; background: rgba(198,232,74,0.18); border: 1px solid rgba(122,163,6,0.25); display: flex; align-items: center; justify-content: center; color: #5B7A00; flex: 0 0 auto; }
          .ec-fin-icon svg { width: 22px; height: 22px; }
          .ec-fin-block h3 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 20px; font-weight: 700; color: #0C1B30; margin: 0; line-height: 1.35; }
          .ec-fin-block ul { list-style: none; margin: 0; padding: 0; border-top: 1px solid #E2E8F0; padding-top: 10px; }
          .ec-fin-block li { display: flex; align-items: center; gap: 8px; padding: 6px 0; font-size: 14.5px; color: #33475E; font-weight: 500; }
          .ec-fin-block li::before { content: ""; width: 6px; height: 6px; flex: 0 0 auto; background: #7AA306; border-radius: 50%; }
          @media (max-width: 1100px) { .ec-fin-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 900px) { .ec-fin .ec-prov-grid { grid-template-columns: 1fr; gap: 20px; } .ec-fin { padding-left: 40px; padding-right: 40px; } }
          @media (max-width: 640px) { .ec-fin { padding-left: 20px; padding-right: 20px; } .ec-fin-grid { grid-template-columns: 1fr; } }
        `}</style>
      </section>

      <section className="ec-tf">
        <div className="ec-wrap">
          <div className="ec-tf-head ec-reveal">

            <EcLabel text="Trusted Commerce Operations" />
            <h2 className="ec-h2">Protect the experience behind the <span style={{ color: "#C6E84A" }}>transaction.</span></h2>
            <p className="ec-lede">As digital commerce grows, businesses must manage payment risk, marketplace quality, suspicious activity and increasingly complex content at scale.</p>
          </div>
          <div className="ec-tf-cards ec-reveal">
            {trustedCapabilities.map((c) => (
              <div key={c.title} className="ec-tf-card" tabIndex={0}>
                <div className="ec-tf-card-inner">
                  <div className="ec-tf-card-face ec-tf-card-face--front" style={{ backgroundImage: `url("${c.image}")` }}>
                    <span className="ec-tf-card-icon" aria-hidden="true">{c.icon}</span>
                    <h3 className="ec-tf-card-title">{c.title}</h3>
                    <span className="ec-tf-card-hint">HOVER TO EXPLORE ↻</span>
                  </div>
                  <div className="ec-tf-card-face ec-tf-card-face--back">
                    <h4 className="ec-tf-card-back-title">{c.title}</h4>
                    <ul>
                      {c.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .ec-tf { position: relative; overflow: hidden; background: #0A1628; padding: clamp(80px, 9vw, 128px) 80px; }
          .ec-tf::before { content: ""; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(198,232,74,0.1) 1px, transparent 1px); background-size: 30px 30px; opacity: 0.3; mask-image: radial-gradient(ellipse 65% 55% at 50% 30%, black, transparent 78%); -webkit-mask-image: radial-gradient(ellipse 65% 55% at 50% 30%, black, transparent 78%); pointer-events: none; }
          .ec-tf .ec-wrap { position: relative; z-index: 1; }
          .ec-tf-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #C6E84A; margin: 0 0 18px; font-variant-numeric: tabular-nums; }
          .ec-tf-head { max-width: 800px; }
          .ec-tf .ec-h2 { color: #ffffff; }
          .ec-tf .ec-lede { color: rgba(255,255,255,0.6); }
          .ec-tf-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 56px; }
          .ec-tf-card { perspective: 1400px; outline: none; cursor: pointer; }
          .ec-tf-card-inner { position: relative; height: clamp(300px, 30vw, 370px); transform-style: preserve-3d; transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.25, 1); }
          .ec-tf-card:hover .ec-tf-card-inner, .ec-tf-card:focus-visible .ec-tf-card-inner { transform: rotateY(180deg); }
          .ec-tf-card-face { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; border-radius: 16px; border: 1px solid #D1D9E6; background: #FAFBFC; box-shadow: 0 2px 12px -4px rgba(12,27,48,0.08); padding: 26px 24px; display: flex; flex-direction: column; }
          .ec-tf-card-face--back { transform: rotateY(180deg); border-color: rgba(122,163,6,0.45); background: #ffffff; justify-content: center; }
          .ec-tf-card-face--front { justify-content: flex-end; align-items: center; text-align: center; background-size: cover; background-position: center; overflow: hidden; padding-bottom: 58px; }
          .ec-tf-card-face--front::before { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(12,27,48,0.08) 0%, rgba(12,27,48,0.42) 50%, rgba(12,27,48,0.82) 100%); z-index: 0; }
          .ec-tf-card-icon { position: relative; z-index: 1; width: 84px; height: 84px; flex: 0 0 auto; border-radius: 20px; background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.38); color: #ffffff; backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
          .ec-tf-card-icon svg { width: 38px; height: 38px; }
          .ec-tf-card-title { position: relative; z-index: 1; font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 17px; font-weight: 700; letter-spacing: 0.05em; color: #ffffff; text-shadow: 0 1px 10px rgba(0,0,0,0.4); margin: 0; line-height: 1.45; max-width: 220px; }
          .ec-tf-card-hint { position: absolute; bottom: 18px; left: 0; right: 0; z-index: 1; text-align: center; font-size: 11.5px; letter-spacing: 0.14em; color: rgba(255,255,255,0.78); }
          .ec-tf-card-back-title { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #0C1B30; margin: 0 0 14px; }
          .ec-tf-card-back-title::before { content: ""; width: 8px; height: 8px; flex: 0 0 auto; background: #C6E84A; transform: rotate(45deg); }
          .ec-tf-card ul { list-style: none; margin: 0; padding: 0; }
          .ec-tf-card li { display: flex; align-items: flex-start; gap: 10px; font-size: 15px; font-weight: 500; color: #33475E; padding: 10px 0; border-top: 1px solid rgba(12,27,48,0.08); }
          .ec-tf-card li::before { content: ""; width: 7px; height: 7px; flex: 0 0 auto; background: #7AA306; transform: rotate(45deg); margin-top: 6px; }
          .ec-tf-card li:first-child { border-top: none; }
          @media (max-width: 1080px) { .ec-tf-cards { grid-template-columns: 1fr 1fr; } }
          @media (max-width: 640px) { .ec-tf { padding-left: 20px; padding-right: 20px; } .ec-tf-cards { grid-template-columns: 1fr; } }
        `}</style>
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
              <article key={o.word} className={`ec-outcome${i === 0 ? " ec-outcome--dark" : ""}`}>
                <div className="ec-outcome-body">
                  <p className="ec-outcome-eyebrow">{o.num} / {o.word}</p>
                  <h3 className="ec-outcome-title">{o.sub}</h3>
                  <p className="ec-outcome-desc">{o.desc}</p>
                </div>
                <div className="ec-outcome-media">
                  <img src={o.image} alt={o.sub} loading="lazy" decoding="async" />
                </div>
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
        <div className="ec-transform-grid">
          <div className="ec-transform-left">
            <span className="ec-transform-badge">Transformation in Action</span>
            <div className="ec-tl-step">
              <span className="ec-tl-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </span>
              <div className="ec-tl-body">
                <h3>The Challenge</h3>
                <p>High-volume commerce workflows can involve fragmented product information, manual order processing, repetitive validations and significant exception handling.</p>
              </div>
            </div>
            <div className="ec-tl-link" aria-hidden="true" />
            <div className="ec-tl-step ec-tl-step--approach">
              <span className="ec-tl-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </span>
              <div className="ec-tl-body">
                <h3>The Sytrion Approach</h3>
                <p>Combine domain-led operations with product intelligence, workflow automation, structured validation and operational analytics.</p>
              </div>
            </div>
          </div>
          <div className="ec-pot-card">
            <h3 className="ec-pot-title">The Potential</h3>
            <ul className="ec-pot-checklist">
              <li><span className="ec-pot-tick" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12.5 9.5 18 20 6.5" stroke="#C6E84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span> Faster Order Processing</li>
              <li><span className="ec-pot-tick" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12.5 9.5 18 20 6.5" stroke="#C6E84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span> Reduced Manual Touchpoints</li>
              <li><span className="ec-pot-tick" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12.5 9.5 18 20 6.5" stroke="#C6E84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span> Improved Product Data Quality</li>
              <li><span className="ec-pot-tick" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12.5 9.5 18 20 6.5" stroke="#C6E84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span> Better Exception Visibility</li>
              <li><span className="ec-pot-tick" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12.5 9.5 18 20 6.5" stroke="#C6E84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span> More Scalable Operations</li>
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