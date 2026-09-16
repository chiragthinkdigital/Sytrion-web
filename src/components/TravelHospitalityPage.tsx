"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const landscapeItems = [
  { num: "01", label: "Always-on traveler expectations", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { num: "02", label: "Complex reservation environments", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M12 7.5v4M12 11.5l-5.5 5.5M12 11.5l5.5 5.5"/></svg> },
  { num: "03", label: "Time-critical disruptions", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 2h6"/></svg> },
  { num: "04", label: "Fragmented operational data", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg> },
  { num: "05", label: "Revenue leakage & reconciliation", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
  { num: "06", label: "Growing pressure on cost and experience", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17.5l5.5-5.5 3.5 3.5L20.5 7"/><path d="M14.5 7h6v6"/></svg> },
];

const serveCols = [
  { label: "AIRLINES", desc: "Intelligent operations across reservations, traveler services, disruption management, revenue and finance.", image: "/services/travel/AIRLINES.jpg" },
  { label: "AIRPORTS", desc: "Supporting passenger journeys and operational processes across complex airport environments.", image: "/services/travel/AIRPORTS.jpg" },
  { label: "ONLINE TRAVEL & TRAVEL MANAGEMENT", desc: "Scalable support across reservations, fulfillment, customer service, payments and back-office operations.", image: "/services/travel/ONLINE TRAVEL & TRAVEL MANAGEMENT.jpg" },
  { label: "HOSPITALITY & LEISURE", desc: "Connected guest, reservation, finance and service operations designed around better experiences.", image: "/services/travel/HOSPITALITY & LEISURE.jpg" },
];

const tabs = [
  { num: "01", tab: "RESERVATIONS", title: "01 — Reservations & Ticketing", intro: "Make booking journeys simpler from search to service.", img: "/services/travel/Reservations & Ticketing.jpg", items: ["Reservation support", "Booking modifications", "Ticketing support", "Group bookings", "Cancellations & refunds", "Schedule-change processing"] },
  { num: "02", tab: "TRAVELER CARE", title: "02 — Traveler Care", intro: "Support travelers across every stage of the journey.", img: "/services/travel/Traveler Care.jpg", items: ["Pre-travel assistance", "Booking queries", "Travel information", "Special-service requests", "Post-travel support", "Omnichannel service"] },
  { num: "03", tab: "DISRUPTIONS", title: "03 — Disruption Management", intro: "Respond when journeys don't go as planned.", img: "/services/travel/Disruption Management.jpg", items: ["Schedule-change support", "Cancellation handling", "Rebooking assistance", "Traveler notifications", "Service recovery workflows", "Exception management"] },
  { num: "04", tab: "FULFILLMENT", title: "04 — Fulfillment Operations", intro: "Keep the processes behind every journey moving.", img: "/services/travel/Fulfillment Operations.jpg", items: ["Fare & rate loading", "Booking validation", "Payment processing support", "Refund processing", "Travel-document workflows", "Back-office administration"] },
  { num: "05", tab: "LOYALTY", title: "05 — Loyalty Operations", intro: "Turn travel relationships into lasting engagement.", img: "/services/travel/Loyalty Operations.jpg", items: ["Member administration", "Points & miles support", "Partner transactions", "Redemption support", "Loyalty queries", "Data & reconciliation"] },
  { num: "06", tab: "DATA", title: "06 — Travel Data & Insights", intro: "Turn traveler and operational activity into actionable intelligence.", img: "/services/travel/Travel Data & Insights.jpg", items: ["Data management", "Operational reporting", "Traveler insights", "Service analytics", "Exception trends", "Performance dashboards"] },
];

const journeyStages = [
  { name: "DREAM", sub: "Explore & discover", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16.2 7.8l-2 6.3-6.4 1.9 2-6.3z"/></svg> },
  { name: "BOOK", sub: "Reserve & pay", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg> },
  { name: "PREPARE", sub: "Manage the journey", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> },
  { name: "TRAVEL", sub: "Receive support", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  { name: "RECOVER", sub: "Resolve disruptions", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/></svg> },
  { name: "RETURN", sub: "Engage & stay loyal", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg> },
];

const journeyFlowPos = [
  { x: 14, y: 28 },
  { x: 50, y: 28 },
  { x: 86, y: 28 },
  { x: 86, y: 74 },
  { x: 50, y: 74 },
  { x: 14, y: 74 },
];

const cardSections = [
  {
    title: "Airline Operations",
    desc: "Keeping complex airline operations connected.",
    img: "/services/travel/Airline Operations.jpg",
    groups: [
      { label: "Booking & Ticketing", items: ["Reservations", "Ticketing support", "Schedule changes", "Refunds"] },
      { label: "Airport & Passenger Support", items: ["Airport service workflows", "Passenger queries", "Baggage support", "Service requests"] },
      { label: "Disruption Operations", items: ["Rebooking support", "Cancellation processing", "Passenger notifications", "Exception management"] },
      { label: "Commercial Operations", items: ["Fare & rate support", "Revenue integrity", "Ancillary administration", "Sales support"] },
    ],
  },
  {
    title: "Revenue & Financial Operations",
    desc: "Protect revenue. Improve financial control.",
    img: "/services/travel/Revenue & Financial Operations.jpg",
    groups: [
      { label: "Revenue Accounting", items: ["Passenger revenue support", "Revenue reconciliation", "Revenue recognition support", "Interline transaction support", "Revenue reporting"] },
      { label: "Order-to-Cash", items: ["Billing & receivables", "Cash application", "Collections support", "Refund administration", "Payment reconciliation"] },
      { label: "Procure-to-Pay", items: ["Supplier invoices", "Vendor reconciliation", "Payment support", "Travel-expense processing", "Exception management"] },
      { label: "Revenue Assurance", items: ["Fare validation", "Commission audit support", "Revenue leakage identification", "Payment discrepancies", "Exception analysis"] },
      { label: "Financial Intelligence", items: ["Revenue analytics", "Receivables ageing", "Route/product profitability support", "Variance analysis", "Management dashboards"] },
    ],
  },
  {
    title: "Loyalty & Personalization",
    desc: "Turn travelers into lasting relationships.",
    img: "/services/travel/Loyalty & Personalization.jpg",
    groups: [
      { label: "Member Operations", items: ["Enrollment", "Profile management", "Account servicing"] },
      { label: "Loyalty Transactions", items: ["Points & miles", "Partner transactions", "Redemptions"] },
      { label: "Customer Insights", items: ["Traveler segmentation", "Behavior analysis", "Interaction insights"] },
      { label: "Personalized Engagement", items: ["Relevant offers", "Service recommendations", "Campaign support"] },
    ],
  },
];

const intelligenceNodes = [
  { title: "Traveler Intelligence", verbs: "Understand • Personalize • Assist", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  { title: "Conversational AI", verbs: "Engage • Answer • Resolve", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  { title: "Workflow Intelligence", verbs: "Automate • Route • Process", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><path d="M10 6.5h7a1 1 0 0 1 1 1V14M14 17.5H7a1 1 0 0 1-1-1V10"/></svg> },
  { title: "Disruption Intelligence", verbs: "Detect • Prioritize • Respond", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg> },
  { title: "Revenue Intelligence", verbs: "Validate • Reconcile • Protect", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
  { title: "Document Intelligence", verbs: "Extract • Classify • Validate", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg> },
  { title: "Decision Intelligence", verbs: "Analyze • Predict • Improve", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/></svg> },
];

const tvTransitStops = [
  { name: "Reservation", desc: "Processes booking volume with speed", x: 150, y: 55, hub: false },
  { name: "Sentiment", desc: "Understands traveler intent", x: 350, y: 170, hub: false },
  { name: "Sytrion Intelligence", desc: "Core reasoning layer", x: 575, y: 55, hub: true },
  { name: "Disruption", desc: "Detects and triages exceptions", x: 775, y: 170, hub: false },
  { name: "Loyalty", desc: "Recognizes and rewards journeys", x: 975, y: 55, hub: false },
  { name: "Revenue", desc: "Safeguards every transaction", x: 1100, y: 170, hub: false },
];
const tvTransitPath = "M150 55 C216.67 55 283.33 170 350 170 C425 170 500 55 575 55 C641.67 55 708.33 170 775 170 C841.67 170 908.33 55 975 55 C1016.67 55 1058.33 170 1100 170";

const disruptionSteps = [
  { name: "DETECT", sub: "Schedule disruption", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
  { name: "IDENTIFY", sub: "Affected travelers", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { name: "PRIORITIZE", sub: "Critical journeys", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> },
  { name: "REBOOK", sub: "Alternative options", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg> },
  { name: "INFORM", sub: "Traveler communication", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg> },
  { name: "SUPPORT", sub: "Exception handling", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg> },
  { name: "LEARN", sub: "Disruption analytics", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg> },
];

const outcomes = [
  { num: "01", word: "FASTER", sub: "Faster response", desc: "Intelligent workflows help teams process requests and exceptions more quickly.", image: "/healthcare/faster (2).png" },
  { num: "02", word: "SEAMLESS", sub: "Smoother journeys", desc: "Connected operations reduce friction across traveler touchpoints.", image: "/healthcare/better-experiences.webp" },
  { num: "03", word: "EFFICIENT", sub: "Lower operational effort", desc: "Automation reduces repetitive administrative activity.", image: "/healthcare/efficient.png" },
  { num: "04", word: "PROTECTED", sub: "Better revenue control", desc: "Validation and reconciliation help identify discrepancies and revenue leakage.", image: "/healthcare/accurate.png" },
  { num: "05", word: "PERSONAL", sub: "More relevant experiences", desc: "Connected data helps organizations understand and serve travelers better.", image: "/healthcare/visible.webp" },
  { num: "06", word: "SCALABLE", sub: "Built for demand", desc: "Flexible operations help manage seasonal peaks and changing travel volumes.", image: "/healthcare/scalable.webp" },
];

const loyaltyCards = [
  {
    title: "Member Operations",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    items: ["Enrollment", "Profile management", "Account servicing"],
  },
  {
    title: "Loyalty Transactions",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    items: ["Points & miles", "Partner transactions", "Redemptions"],
  },
  {
    title: "Customer Insights",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M8 17v-3" />
        <path d="M12 17v-7" />
        <path d="M16 17v-4" />
      </svg>
    ),
    items: ["Traveler segmentation", "Behavior analysis", "Interaction insights"],
  },
  {
    title: "Personalized Engagement",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
    items: ["Relevant offers", "Service recommendations", "Campaign support"],
  },
];

const modelLayers = [
  { num: "01", name: "Travel Ecosystem", items: "Travelers • Airlines • Airports • Hotels • Travel Partners" },
  { num: "02", name: "Systems & Experience", items: "Core Platforms • Documents • Portals • Data • Interactions" },
  { num: "03", name: "Sytrion Intelligence Layer", items: "AI | Automation | Document Intelligence | Analytics" },
  { num: "04", name: "Intelligent Operations", items: "Reservations | Traveler Care | Disruptions | Loyalty | Revenue & Finance" },
  { num: "05", name: "Business Outcomes", items: "SPEED • ACCURACY • VISIBILITY • EFFICIENCY • EXPERIENCE" },
];

const whyPoints = [
  { num: "01", name: "Domain-led", icon: "/healthcare/domain led.svg", desc: "Solutions designed around real travel and hospitality workflows." },
  { num: "02", name: "AI-first", icon: "/healthcare/ai first.svg", desc: "Intelligence applied across traveler, operational and financial processes." },
  { num: "03", name: "Human + Digital", icon: "/healthcare/human-digital.svg", desc: "Automation and skilled professionals working together." },
  { num: "04", name: "Revenue-aware", icon: "/healthcare/Revenue-aware.svg", desc: "Operational transformation designed with commercial performance in mind." },
  { num: "05", name: "Data-driven", icon: "/healthcare/Data-driven.svg", desc: "Connected information supporting better decisions and experiences." },
  { num: "06", name: "Built to Scale", icon: "/healthcare/Built to Scale.svg", desc: "Flexible operations designed for seasonal and unpredictable demand." },
];

function TvLabel({ text, light }: { text: string; light?: boolean }) {
  return <span className={`tv-label${light ? " tv-label--light" : ""}`}>{text}</span>;
}

export default function TravelHospitalityPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const revealRef = useRef<HTMLDivElement | null>(null);
  const tvHdStageRef = useRef<HTMLDivElement | null>(null);

  const onTvHdTilt = (e: React.MouseEvent<HTMLElement>) => {
    const stage = tvHdStageRef.current;
    if (!stage) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    stage.style.transform = `perspective(1200px) rotateY(${(x * 8).toFixed(2)}deg) rotateX(${(y * -8).toFixed(2)}deg)`;
  };
  const onTvHdTiltReset = () => {
    if (tvHdStageRef.current) tvHdStageRef.current.style.transform = "";
  };

  const toggleGroup = (key: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  useEffect(() => {
    const root = revealRef.current;
    if (!root) return;
    const targets = root.querySelectorAll(".tv-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("tv-in");
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
    <div className="tv-page" ref={revealRef}>
      <style>{`
        .tv-page { --tv-navy:#0A1628; --tv-navy2:#0D2038; --tv-cyan:#C6E84A; --tv-blue:#5E8A0A; color:#0E1B2A; background:#fff; font-family: var(--font-geist-sans), Arial, sans-serif; }
        .tv-page * { box-sizing: border-box; }
        .tv-wrap { max-width: 1400px; margin: 0 auto; }
        .tv-label { display: inline-block; background: #C6E84A; color: #0f0f0f; padding: 8px 20px; border-radius: 999px; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; font-variant: small-caps; margin-bottom: 24px; }
        .tv-label--light { background: #C6E84A; color: #0f0f0f; }
        .tv-reveal { opacity: 0; transform: translateY(26px); transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .tv-reveal.tv-in { opacity: 1; transform: none; }
        .tv-h2 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(32px, 5vw, 48px); font-weight: 700; line-height: 1.15; letter-spacing: -0.02em; margin: 0 0 20px; }
        .tv-lede { font-size: 19px; font-weight: 400; line-height: 1.8; margin: 0 0 12px; }
        .tv-copy { font-size: 19px; font-weight: 400; line-height: 1.8; margin: 0 0 12px; }
        .tv-btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 16px 30px; border-radius: 999px; background: #C6E84A; color: #0f0f0f; font-size: 15px; font-weight: 700; letter-spacing: 0.02em; text-decoration: none; transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease; }
        .tv-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(198,232,74,0.4); }
        .tv-btn--ghost { background: transparent; border: 1px solid rgba(255,255,255,0.45); color: #fff; }
        .tv-btn--ghost:hover { background: rgba(255,255,255,0.08); box-shadow: none; }

        .tv-hero { position: relative; height: 100vh; height: 100dvh; min-height: 600px; background: #0A1628; overflow: hidden; isolation: isolate; }
        .tv-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: right center; z-index: -2; }
        .tv-hero-content { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; z-index: 1; padding: 100px clamp(16px, 3vw, 48px) 0; max-width: 1440px; margin: 0 auto; left: 0; right: 0; }
        .tv-hero-eyebrow { display: inline-block; background: #C6E84A; color: #0f0f0f; padding: 8px 20px; border-radius: 999px; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; font-variant: small-caps; margin-bottom: 24px; }
        .tv-hero h1 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(38px, 5.6vw, 68px); font-weight: 700; letter-spacing: -0.03em; line-height: 1.06; color: #ffffff; margin: 0 0 26px; max-width: 780px; text-wrap: balance; }
        .tv-hero-sub { font-size: clamp(17px, 1.6vw, 21px); font-weight: 600; line-height: 1.55; color: rgba(255,255,255,0.92); margin: 0 0 18px; max-width: 640px; }
        .tv-hero-body { font-size: 16px; line-height: 1.75; color: rgba(255,255,255,0.68); margin: 0 0 38px; max-width: 520px; }
        .tv-hero-ctas { display: flex; flex-wrap: wrap; gap: 16px; }

        .tv-s02 { background: #ffffff; padding: clamp(48px, 6vw, 80px) 80px clamp(40px, 5vw, 60px); }
        .tv-s02-head { margin-bottom: 8px; }
        .tv-s02-head .tv-h2 { font-size: clamp(28px, 2.8vw, 36px); }
        .tv-s02-text .tv-lede { color: #5A5D66; }
        .tv-s02-text .tv-copy { color: #5B6472; }
        .tv-s02-row { display: grid; grid-template-columns: 1fr 1.1fr; gap: 80px; align-items: start; margin-top: 40px; }
        .tv-s02-right { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .tv-s02-card { background: linear-gradient(160deg, #0E1B2E 0%, #1B2735 100%); border: 1px solid rgba(198,232,74,0.14); border-radius: 16px; padding: 22px 22px 20px; position: relative; overflow: hidden; transition: transform .3s cubic-bezier(.4,0,.2,1), box-shadow .3s ease, border-color .3s ease; box-shadow: 0 10px 30px -12px rgba(12,27,48,0.35); }
        .tv-s02-card::before { content: ""; position: absolute; inset: 0; border-radius: 16px; background: radial-gradient(120px 60px at 20% 0%, rgba(198,232,74,0.12), transparent 70%); opacity: 0; transition: opacity .3s ease; pointer-events: none; }
        .tv-s02-card:hover { transform: translateY(-5px) scale(1.01); box-shadow: 0 20px 44px -12px rgba(12,27,48,0.45); border-color: rgba(198,232,74,0.45); }
        .tv-s02-card:hover::before { opacity: 1; }
        .tv-s02-icon { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; position: relative; background: #C6E84A; color: #0f0f0f; box-shadow: 0 2px 12px -3px rgba(198,232,74,0.5); flex-shrink: 0; margin-bottom: 14px; }
        .tv-s02-icon::after { content: ""; position: absolute; inset: 0; border-radius: 12px; background: inherit; filter: blur(10px); opacity: 0.35; z-index: -1; transition: opacity .3s ease; }
        .tv-s02-card:hover .tv-s02-icon::after { opacity: 0.55; }
        .tv-s02-icon svg { width: 20px; height: 20px; }
        .tv-s02-label { font-size: 15px; font-weight: 600; color: #ffffff; line-height: 1.4; }
        .tv-s02-approach { margin-top: 48px; background: linear-gradient(135deg, #0B1D35 0%, #132742 40%, #0F2035 100%); border-radius: 20px; padding: 44px 48px 40px; position: relative; overflow: hidden; box-shadow: 0 8px 40px -12px rgba(10,22,40,0.25); }
        .tv-s02-approach::before { content: ""; position: absolute; top: -60px; right: -40px; width: 260px; height: 260px; border-radius: 50%; background: radial-gradient(circle, rgba(196,229,56,0.12) 0%, transparent 70%); pointer-events: none; }
        .tv-s02-approach::after { content: ""; position: absolute; bottom: -40px; left: 30%; width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%); pointer-events: none; }
        .tv-s02-approach-top { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; position: relative; z-index: 1; }
        .tv-s02-approach-dot { width: 8px; height: 8px; border-radius: 50%; background: #C4E538; flex-shrink: 0; box-shadow: 0 0 12px rgba(196,229,56,0.5); }
        .tv-s02-approach-label { font-size: 11px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: rgba(196,229,56,0.7); }
        .tv-s02-approach-text { font-size: clamp(18px, 1.8vw, 26px); line-height: 1.4; color: rgba(255,255,255,0.92); font-weight: 500; margin: 0; position: relative; z-index: 1; max-width: 900px; }
        .tv-s02-approach-text em { font-style: normal; color: #C4E538; font-weight: 600; }

        .tv-s03 { background: var(--tv-navy); padding: clamp(76px, 9vw, 128px) 80px; }
        .tv-s03 .tv-h2 { color: #ffffff; }
        .tv-s03-track { display: flex; gap: 24px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; -ms-overflow-style: none; scroll-behavior: smooth; margin-top: 56px; padding-bottom: 4px; }
        .tv-s03-track::-webkit-scrollbar { display: none; }
        .tv-s03-card { flex: 0 0 calc((100% - 72px) / 4); aspect-ratio: 4 / 5; border-radius: 18px; position: relative; overflow: hidden; scroll-snap-align: start; scroll-snap-stop: always; cursor: default; transition: transform 0.2s ease, box-shadow 0.2s ease; box-shadow: 0 4px 20px rgba(0,0,0,0.3); background-size: cover; background-position: center; }
        .tv-s03-card:hover { transform: scale(1.02); box-shadow: 0 8px 32px rgba(0,0,0,0.45); }
        .tv-s03-card-name { position: absolute; top: 0; left: 0; right: 0; padding: 28px; z-index: 1; font-size: 22px; font-weight: 700; color: #ffffff; line-height: 1.3; text-shadow: 0 1px 4px rgba(0,0,0,0.4); }
        .tv-s03-card-desc { position: absolute; left: 0; right: 0; bottom: 0; padding: 22px 28px 26px; z-index: 1; margin: 0; font-size: 14.5px; line-height: 1.65; color: rgba(255,255,255,0.9); text-shadow: 0 1px 4px rgba(0,0,0,0.4); }

        .tv-s04 { background: #ffffff; padding: clamp(76px, 9vw, 128px) 80px; }
        .tv-s04 .tv-h2 { color: #0E1B2A; }
        .tv-s04 .tv-lede { color: #5A5D66; }
        .tv-s04-tabbar { display: grid; grid-template-columns: repeat(6, 1fr); margin-top: 48px; border-radius: 12px; overflow: hidden; border: 1px solid #E2E8F0; }
        .tv-s04-tabbar button { appearance: none; background: #F8FAFC; border: none; border-right: 1px solid #E2E8F0; cursor: pointer; padding: 16px 12px; font-family: inherit; font-size: 13.5px; font-weight: 600; color: #64748B; transition: background 0.25s ease, color 0.25s ease; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .tv-s04-tabbar button:last-child { border-right: none; }
        .tv-s04-tabbar button em { font-style: normal; font-size: 11px; font-weight: 700; color: #94A3B8; }
        .tv-s04-tabbar button:hover { background: #F1F5F9; color: #0E1B2A; }
        .tv-s04-tabbar button.tv-tab-active { background: var(--tv-navy); color: #ffffff; }
        .tv-s04-tabbar button.tv-tab-active em { color: var(--tv-cyan); }
        .tv-s04-panel { margin-top: 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; animation: tvFadeIn 0.4s ease; }
        .tv-s04-panel.tv-panel-full { grid-template-columns: 1fr; }
        @keyframes tvFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .tv-s04-text h3 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(24px, 2.6vw, 32px); font-weight: 700; line-height: 1.2; color: #0E1B2A; margin: 0; }
        .tv-s04-intro { font-size: 17px; font-weight: 700; color: #1E293B; margin: 12px 0 0; }
        .tv-s04-checklist { display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-top: 24px; }
        .tv-s04-check { display: flex; align-items: center; gap: 10px; padding: 12px 0; border-top: 1px solid rgba(14,27,42,0.08); font-size: 15px; color: #33475E; }
        .tv-s04-check::before { content: ""; width: 6px; height: 6px; flex: 0 0 auto; border-radius: 50%; background: var(--tv-blue); }
        .tv-s04-photo { position: relative; border-radius: 20px; overflow: hidden; aspect-ratio: 4/3; background:
          linear-gradient(200deg, rgba(198,232,74,0.16) 0%, rgba(10,22,40,0.55) 100%),
          center / cover no-repeat,
          linear-gradient(200deg, #123055 0%, #0A1628 100%); }

        .tv-s05 { background: var(--tv-navy); padding: clamp(76px, 9vw, 128px) 80px; }
        .tv-s05 .tv-h2 { color: #ffffff; }
        .tv-s05 .tv-lede { color: rgba(255,255,255,0.88); }
        .tv-s05 .tv-copy { color: rgba(255,255,255,0.6); }
        .tv-s05-head { max-width: 100%; }
        .tv-s05-lede-row { display: flex; gap: 32px; margin-bottom: 12px; }
        .tv-s05-lede-row .tv-lede { flex: 1; margin: 0; }
        .tv-s05-split { display: grid; grid-template-columns: 1fr 1.15fr; gap: clamp(36px, 5vw, 80px); align-items: center; }
        .tv-s05-feature { position: relative; overflow: hidden; border-radius: 22px; aspect-ratio: 4 / 4.6; }
        .tv-s05-feature img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .tv-s05-tint { position: absolute; inset: 0; background: linear-gradient(200deg, rgba(198,232,74,0.16) 0%, rgba(7,20,38,0.05) 40%, rgba(7,20,38,0.55) 100%); }
        .tv-s05-flow { position: relative; margin-top: 40px; max-width: 640px; width: 100%; aspect-ratio: 16 / 11; }
        .tv-s05-lines { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
        .tv-s05-node { position: absolute; z-index: 2; transform: translate(-50%, -50%); display: flex; align-items: center; justify-content: center; }
        .tv-s05-circle { width: 62px; height: 62px; border-radius: 50%; background: var(--tv-navy2); border: 1.5px solid var(--tv-cyan); display: flex; align-items: center; justify-content: center; color: #f4f7fb; transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.3s ease; }
        .tv-s05-circle svg { width: 22px; height: 22px; }
        .tv-s05-node:hover .tv-s05-circle { transform: scale(1.08); border-color: #D9F77E; box-shadow: 0 0 0 7px rgba(198,232,74,0.12); }
        .tv-s05-label { position: absolute; bottom: calc(100% + 12px); left: 0; right: 0; display: flex; flex-direction: column; align-items: center; gap: 3px; pointer-events: none; }
        .tv-s05-num { font-family: var(--font-syne), Arial, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; color: var(--tv-cyan); line-height: 1; }
        .tv-s05-name { font-family: var(--font-syne), Arial, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; color: #ffffff; text-transform: uppercase; white-space: nowrap; line-height: 1.15; }
        .tv-s05-sub { position: absolute; top: calc(100% + 10px); left: 0; right: 0; text-align: center; font-size: 12px; line-height: 1.35; color: rgba(196,211,231,0.72); white-space: nowrap; padding: 0 4px; pointer-events: none; }
        .tv-s05-arrow { position: absolute; z-index: 1; width: 0; height: 0; transform: translate(-50%, -50%); pointer-events: none; }
        .tv-s05-arrow--r { border-left: 9px solid var(--tv-cyan); border-top: 5px solid transparent; border-bottom: 5px solid transparent; }
        .tv-s05-arrow--l { border-right: 9px solid var(--tv-cyan); border-top: 5px solid transparent; border-bottom: 5px solid transparent; }
        .tv-s05-arrow--d { border-top: 9px solid var(--tv-cyan); border-left: 5px solid transparent; border-right: 5px solid transparent; }

        .tv-s06 { background: #ffffff; padding: clamp(76px, 9vw, 128px) 80px; }
        .tv-s06 .tv-h2 { color: #0E1B2A; }
        .tv-s06 .tv-lede { color: #5A5D66; }
        .tv-s06 .tv-copy { color: #5B6472; }
        .tv-s06-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 48px; align-items: start; }
        .tv-s06-card { border-radius: 20px; overflow: hidden; background: #ffffff; border: 1px solid #E2E8F0; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .tv-s06-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px -16px rgba(10,22,40,0.12); }
        .tv-s06-card-img { aspect-ratio: 16/9; background-size: cover; background-position: center; background-image: linear-gradient(200deg, rgba(198,232,74,0.18) 0%, rgba(10,22,40,0.5) 100%); }
        .tv-s06-card-body { padding: 26px 24px 24px; }
        .tv-s06-card-body h3 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 20px; font-weight: 700; color: #0E1B2A; margin: 0; line-height: 1.25; }
        .tv-s06-card-desc { font-size: 14px; font-weight: 600; color: var(--tv-blue); margin: 8px 0 0; }
        .tv-s06-group { border-top: 1px solid rgba(14,27,42,0.07); }
        .tv-s06-group:first-of-type { margin-top: 18px; }
        .tv-s06-group-toggle { display: flex; align-items: center; justify-content: space-between; gap: 8px; cursor: pointer; font-family: inherit; font-size: 14px; font-weight: 700; color: #0E1B2A; padding: 11px 0; border: none; background: none; width: 100%; text-align: left; }
        .tv-s06-group-toggle:hover { color: var(--tv-blue); }
        .tv-s06-group-icon { font-size: 18px; font-weight: 600; color: var(--tv-blue); flex-shrink: 0; transition: transform 0.25s ease; }
        .tv-s06-group-open .tv-s06-group-icon { transform: rotate(45deg); }
        .tv-s06-group-list { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
        .tv-s06-group-open .tv-s06-group-list { max-height: 400px; }
        .tv-s06-group-list ul { list-style: none; margin: 0; padding: 0 0 12px; }
        .tv-s06-group-list li { padding: 5px 0; font-size: 13.5px; color: #5A6B7F; display: flex; align-items: baseline; gap: 8px; }
        .tv-s06-group-list li::before { content: ""; width: 5px; height: 5px; flex: 0 0 auto; border-radius: 50%; background: var(--tv-blue); align-self: center; }

        .tv-s08 { background: #0B1220; position: relative; }
        .tv-s08-sep { height: 1px; background: #223148; border: 0; margin: 0; }

        .tv-intel { background: #0B1220; padding: clamp(76px, 9vw, 128px) 80px clamp(104px, 10vw, 150px); position: relative; }
        .tv-intel-title { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(32px, 5vw, 48px); font-weight: 700; line-height: 1.15; letter-spacing: -0.02em; margin: 0 0 20px; color: #F4F5F2; }
        .tv-intel-title span { color: #C6E84A; }
        .tv-intel-sub { font-size: clamp(15px, 1.35vw, 17px); line-height: 1.8; color: #93A0B0; margin: 0; }

        .tv-transit { position: relative; width: 100%; margin: clamp(56px, 6.5vw, 84px) 0 40px; }
        .tv-transit-line { display: block; width: 100%; height: 220px; }
        .tv-transit-pulse .tv-transit-glow { fill: rgba(198,241,53,0.22); }
        .tv-transit-pulse .tv-transit-dot { fill: #C6F135; filter: drop-shadow(0 0 8px rgba(198,241,53,0.9)); }

        .tv-stop { position: absolute; transform: translate(-50%, -50%); z-index: 2; pointer-events: none; }
        .tv-stop-dot { display: block; width: 14px; height: 14px; border-radius: 50%; background: #0B1220; border: 2px solid #C6F135; box-sizing: border-box; }
        .tv-stop--hub .tv-stop-dot { width: 24px; height: 24px; background: #C6F135; border-color: #C6F135; box-shadow: 0 0 20px rgba(198,241,53,0.55); }
        .tv-stop-body { position: absolute; top: 12px; left: 50%; transform: translateX(-50%); width: 150px; display: flex; flex-direction: column; align-items: center; text-align: center; }
        .tv-stop--hub .tv-stop-body { width: 200px; top: 15px; }
        .tv-stop--up .tv-stop-body { top: auto; bottom: 24px; }
        .tv-stop--up.tv-stop--hub .tv-stop-body { bottom: 26px; }
        .tv-stop-name { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 700; color: #F4F5F2; white-space: nowrap; }
        .tv-stop--hub .tv-stop-name { color: #C6F135; }
        .tv-stop-desc { font-size: 11.5px; line-height: 1.45; color: #93A0B0; margin-top: 4px; }

        .tv-hd { position: relative; overflow: hidden; background: #0B1220; }
        .tv-hd-glow { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; }
        .tv-hd-glow--lime { width: 46vw; height: 46vw; max-width: 720px; max-height: 720px; right: -9%; top: -14%; background: rgba(198,241,53,0.16); }
        .tv-hd-glow--blue { width: 34vw; height: 34vw; max-width: 560px; max-height: 560px; right: 4%; bottom: -22%; background: rgba(96,146,255,0.10); }
        .tv-hd-wrap { position: relative; z-index: 2; max-width: 1400px; width: 100%; margin: 0 auto; padding: clamp(88px, 10vw, 140px) 40px; }
        .tv-hd-grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: clamp(28px, 4vw, 64px); align-items: center; min-height: clamp(600px, 84vh, 780px); }
        .tv-hd-copy { position: relative; z-index: 2; }
        .tv-hd-kicker { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #C6F135; margin: 0 0 16px; font-variant-numeric: tabular-nums; }
        .tv-hd-pill { display: inline-flex; align-items: center; background: #C6F135; color: #0B1220; font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 9px 20px; border-radius: 999px; margin: 0 0 30px; }
        .tv-hd-title { margin: 0 0 28px; }
        .tv-hd-title-white { display: block; color: #ffffff; font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(40px, 5vw, 56px); font-weight: 700; line-height: 1.06; letter-spacing: -0.02em; }
        .tv-hd-title-lime { display: block; color: #C6F135; font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(40px, 5vw, 56px); font-weight: 700; line-height: 1.06; letter-spacing: -0.02em; }
        .tv-hd-line { font-size: clamp(15.5px, 1.35vw, 18px); line-height: 1.85; color: #93A0B0; margin: 0 0 10px; max-width: 540px; }
        .tv-hd-em { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(19px, 1.9vw, 23px); font-weight: 700; color: #C6F135; margin: 24px 0 0; }
        .tv-hd-visual { position: relative; display: flex; align-items: center; justify-content: center; min-height: clamp(420px, 52vw, 640px); }
        .tv-hd-stage { position: relative; width: 100%; max-width: 660px; aspect-ratio: 1 / 1; transform-style: preserve-3d; transition: transform 0.12s ease-out; will-change: transform; }
        .tv-hd-halo { position: absolute; left: 50%; top: 46%; width: 78%; aspect-ratio: 1; transform: translate(-50%, -50%); border-radius: 50%; background: radial-gradient(circle, rgba(198,241,53,0.10) 0%, rgba(96,146,255,0.05) 45%, rgba(11,18,32,0) 70%); }
        .tv-hd-globe { position: absolute; left: 50%; top: 46%; width: 62%; aspect-ratio: 1; transform: translate(-50%, -50%); }
        .tv-hd-solid { position: absolute; inset: 0; border-radius: 50%; background: radial-gradient(circle at 34% 30%, rgba(198,241,53,0.10) 0%, rgba(11,18,32,0.55) 62%, rgba(11,18,32,0) 100%); animation: tvHdPulse 5s ease-in-out infinite; }
        .tv-hd-mesh { position: absolute; inset: 0; width: 100%; height: 100%; animation: tvHdSpin 70s linear infinite; }
        .tv-hd-pts { position: absolute; inset: 0; }
        .tv-hd-pt { position: absolute; width: 4px; height: 4px; margin: -2px 0 0 -2px; border-radius: 50%; background: rgba(198,241,53,0.9); }
        .tv-hd-pt--glow { width: 6px; height: 6px; margin: -3px 0 0 -3px; background: #C6F135; box-shadow: 0 0 10px 2px rgba(198,241,53,0.75); animation: tvHdTwinkle 3.4s ease-in-out infinite; }
        .tv-hd-core { position: absolute; left: 50%; top: 50%; width: 26%; aspect-ratio: 1; transform: translate(-50%, -50%); border-radius: 50%; background: radial-gradient(circle, rgba(198,241,53,0.55) 0%, rgba(198,241,53,0) 70%); animation: tvHdPulse 5s ease-in-out infinite 0.4s; }
        .tv-hd-orbit { position: absolute; left: 50%; top: 46%; aspect-ratio: 1; transform: translate(-50%, -50%); border-radius: 50%; border: 1px solid rgba(198,241,53,0.28); transform-style: preserve-3d; }
        .tv-hd-orbit--a { width: 82%; transform: translate(-50%, -50%) rotateX(68deg) rotateZ(-14deg); animation: tvHdOrbitA 18s linear infinite; }
        .tv-hd-orbit--b { width: 54%; transform: translate(-50%, -50%) rotateX(76deg) rotateZ(24deg); border-color: rgba(198,241,53,0.18); animation: tvHdOrbitB 26s linear infinite; }
        .tv-hd-orbit-dot { position: absolute; left: 50%; top: -4px; transform: translateX(-50%); width: 7px; height: 7px; border-radius: 50%; background: #C6F135; box-shadow: 0 0 14px 3px rgba(198,241,53,0.8); }
        .tv-hd-conn { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; }
        .tv-hd-conn line { stroke: rgba(147,160,176,0.35); stroke-width: 1; stroke-dasharray: 2.5 3; }
        .tv-hd-card { position: absolute; z-index: 3; display: flex; gap: 12px; align-items: flex-start; width: 232px; padding: 14px 16px; border-radius: 14px; background: rgba(16,26,44,0.6); border: 1px solid rgba(147,160,176,0.22); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
        .tv-hd-card-icon { width: 36px; height: 36px; flex: 0 0 auto; border-radius: 50%; background: rgba(11,18,32,0.9); border: 1.5px solid rgba(198,241,53,0.7); display: flex; align-items: center; justify-content: center; color: #C6F135; }
        .tv-hd-card-icon svg { width: 16px; height: 16px; }
        .tv-hd-card h3 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; margin: 0 0 4px; }
        .tv-hd-card p { font-size: 12px; line-height: 1.5; color: #93A0B0; margin: 0; }
        .tv-hd-card--tl { left: 0; top: 2%; }
        .tv-hd-card--ml { left: -7%; top: 42%; }
        .tv-hd-card--r { left: 56%; top: 56%; }

        @keyframes tvHdSpin { to { transform: rotate(360deg); } }
        @keyframes tvHdPulse { 0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); } 50% { opacity: 1; transform: translate(-50%, -50%) scale(1.06); } }
        @keyframes tvHdTwinkle { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
        @keyframes tvHdOrbitA { to { transform: translate(-50%, -50%) rotateX(68deg) rotateZ(-14deg) rotate(360deg); } }
        @keyframes tvHdOrbitB { to { transform: translate(-50%, -50%) rotateX(76deg) rotateZ(24deg) rotate(-360deg); } }

        .tv-s09 { background: #ffffff; padding: clamp(76px, 9vw, 128px) 80px; }
        .tv-s09 .tv-h2 { color: #0f172a; }
        .tv-s09 .tv-lede { color: #5A5D66; }
        .tv-s09 .tv-copy { color: #5A5D66; }
        .tv-s09-head { max-width: 1280px; }
        .tv-s09-flow { margin-top: 52px; background: linear-gradient(135deg, #2b2f1a, #0d0f08); border-radius: 20px; padding: 20px 44px; }
        .tv-s09-rail { position: relative; display: flex; height: 330px; }
        .tv-s09-rail-line { position: absolute; top: 50%; left: 0; right: 0; height: 2px; transform: translateY(-50%); background: linear-gradient(90deg, rgba(198,232,74,0.12), rgba(198,232,74,0.95)); border-radius: 2px; z-index: 0; }
        .tv-s09-step { position: relative; flex: 1; height: 100%; }
        .tv-s09-node { position: absolute; top: 50%; left: 50%; width: 13px; height: 13px; border-radius: 50%; background: #C6E84A; transform: translate(-50%, -50%); z-index: 2; }
        .tv-s09-stem { position: absolute; left: 50%; width: 1px; background: rgba(198,232,74,0.35); z-index: 1; }
        .tv-s09-stem--up { bottom: 50%; height: 46px; }
        .tv-s09-stem--down { top: 50%; height: 46px; }
        .tv-s09-label { position: absolute; left: 50%; transform: translateX(-50%); width: 168px; text-align: center; z-index: 2; }
        .tv-s09-label--up { bottom: calc(50% + 46px); }
        .tv-s09-label--down { top: calc(50% + 46px); }
        .tv-s09-lbl-num { display: block; font-family: var(--font-syne), Arial, sans-serif; font-size: 22px; font-weight: 800; color: #C6E84A; text-shadow: 0 0 18px rgba(198,232,74,0.5); margin-bottom: 4px; }
        .tv-s09-name { font-family: var(--font-syne), Arial, sans-serif; font-size: 13.5px; font-weight: 700; letter-spacing: 0.03em; text-transform: uppercase; color: #f6f7ef; margin: 0 0 6px; }
        .tv-s09-desc { font-size: 12.5px; color: #a9ab9a; margin: 0; line-height: 1.45; }

        .tv-s10 { background: #ffffff; padding: clamp(76px, 9vw, 128px) 80px; }
        .tv-s10 .tv-h2 { color: #0E1B2A; }
        .tv-out-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 56px; }
        .tv-outcome { position: relative; overflow: hidden; background: #f5f5f3; border-radius: 16px; display: flex; flex-direction: row; min-height: 220px; box-shadow: 0 2px 12px -4px rgba(12,27,48,0.08); transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease; }
        .tv-outcome--dark { background: #0c1b2e; }
        .tv-outcome:hover { transform: translateY(-4px); box-shadow: 0 16px 40px -14px rgba(12,27,48,0.20); }
        .tv-outcome-body { flex: 0 0 50%; padding: 24px 20px 24px 24px; display: flex; flex-direction: column; justify-content: flex-end; position: relative; z-index: 2; pointer-events: none; }
        .tv-outcome-body * { pointer-events: auto; }
        .tv-outcome-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #8a97a8; margin: 0 0 10px; }
        .tv-outcome--dark .tv-outcome-eyebrow { color: #6b8299; }
        .tv-outcome-title { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(20px, 1.8vw, 26px); font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; color: #0a1628; margin: 0 0 10px; }
        .tv-outcome--dark .tv-outcome-title { color: #ffffff; }
        .tv-outcome-desc { font-size: 12.5px; line-height: 1.6; color: #5a6b7f; margin: 0; max-width: 24ch; }
        .tv-outcome--dark .tv-outcome-desc { color: #7a96ae; }
        .tv-outcome-media { position: absolute; right: 0; top: 0; bottom: 0; width: 68%; z-index: 1; overflow: hidden; }
        .tv-outcome-media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; object-position: right center; display: block; transition: transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .tv-outcome:hover .tv-outcome-media img { transform: scale(1.05); }

        .tv-s11 { position: relative; min-height: 640px; display: flex; align-items: center; background:
          linear-gradient(180deg, rgba(6,14,28,0.82) 0%, rgba(6,14,28,0.68) 50%, rgba(6,14,28,0.88) 100%),
          url("/services/travel/travel cta.jpg") center / cover no-repeat,
          linear-gradient(180deg, #10263F, #0A1628); }
        .tv-s11-content { position: relative; z-index: 1; width: 100%; max-width: 1440px; margin: 0 auto; padding: clamp(90px, 10vw, 140px) clamp(24px, 8vw, 120px); text-align: center; }
        .tv-s11-content .tv-label { margin: 0 auto 24px; }
        .tv-s11 h2 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(32px, 4.6vw, 56px); font-weight: 700; letter-spacing: -0.02em; line-height: 1.1; color: #ffffff; margin: 0 auto 22px; max-width: 820px; }
        .tv-s11 p { font-size: 17px; line-height: 1.75; color: rgba(255,255,255,0.78); max-width: 680px; margin: 0 auto 38px; }
        .tv-s11-ctas { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; }

        @media (max-width: 1080px) {
          .tv-s02-row { grid-template-columns: 1fr; gap: 40px; }
          .tv-hd-grid { grid-template-columns: 1fr 1fr; }
          .tv-hd-card { width: 200px; }
          .tv-hd-card--ml { left: -4%; }
        }
        @media (max-width: 900px) {
          .tv-hd-grid { grid-template-columns: 1fr; gap: 40px; min-height: 0; }
          .tv-hd-visual { min-height: 0; }
          .tv-hd-stage { max-width: 560px; aspect-ratio: 1 / 1; margin: 0 auto; }
          .tv-hd-card { width: 212px; }
          .tv-hd-card--tl { left: 0; top: 2%; }
          .tv-hd-card--ml { left: -4%; top: 42%; }
          .tv-hd-card--r { left: 58%; top: 58%; }
          .tv-transit-line { display: none; }
          .tv-transit { margin: 48px auto 0; }
          .tv-stop { position: relative !important; left: auto !important; top: auto !important; transform: none; margin: 26px auto 0; display: flex; flex-direction: column; align-items: center; }
          .tv-stop-body { position: static; transform: none; margin-top: 8px; }
          .tv-stop--hub .tv-stop-body { width: 200px; }
          .tv-s03-card { flex: 0 0 calc((100% - 24px) / 2); }
          .tv-s04-tabbar { grid-template-columns: repeat(3, 1fr); }
          .tv-s04-panel { grid-template-columns: 1fr; }
          .tv-s06-row { grid-template-columns: 1fr; }
          .tv-s09-flow { padding: 36px 24px; }
          .tv-s09-rail { flex-direction: column; height: auto; gap: 0; }
          .tv-s09-rail-line { top: 0; bottom: 0; left: 16px; right: auto; width: 2px; height: auto; transform: translateY(0); background: linear-gradient(180deg, rgba(198,232,74,0.12), rgba(198,232,74,0.95)); }
          .tv-s09-step { height: auto; padding: 0 0 32px 44px; }
          .tv-s09-step:last-child { padding-bottom: 0; }
          .tv-s09-node { top: 6px; left: 16px; transform: translate(-50%, 0); }
          .tv-s09-stem { display: none; }
          .tv-s09-label { position: static; transform: none; width: auto; text-align: left; }
          .tv-s05-split { grid-template-columns: 1fr; }
          .tv-s05-flow { max-width: 100%; aspect-ratio: auto; }
          .tv-s05-lines, .tv-s05-arrow { display: none; }
          .tv-s05-node { position: relative; left: auto !important; top: auto !important; transform: none; width: 100%; margin: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
          .tv-s05-label { position: static; bottom: auto; margin-bottom: 12px; }
          .tv-s05-sub { position: static; top: auto; margin-top: 12px; white-space: normal; }
          .tv-s05-node:not(:last-child)::after { content: ""; display: block; width: 0; height: 0; margin: 4px auto 0; border-top: 9px solid var(--tv-cyan); border-left: 5px solid transparent; border-right: 5px solid transparent; }
        }
        @media (max-width: 760px) {
          .tv-hd-stage { max-width: 460px; }
          .tv-hd-conn, .tv-hd-card--ml, .tv-hd-card--r { display: none; }
          .tv-hd-card--tl { left: 4%; top: 6%; }
        }
        @media (max-width: 640px) {
          .tv-s02, .tv-s04, .tv-s06, .tv-s09, .tv-s10 { padding-left: 20px; padding-right: 20px; }
          .tv-s03 { padding-left: 20px; padding-right: 20px; }
          .tv-s05 { padding-left: 20px; padding-right: 20px; }
          .tv-s05-circle { width: 58px; height: 58px; }
          .tv-s03-card { flex: 0 0 100%; }
          .tv-s04-tabbar { grid-template-columns: repeat(2, 1fr); }
          .tv-s04-checklist { grid-template-columns: 1fr; }
          .tv-s02-right { grid-template-columns: 1fr 1fr; }
          .tv-s02-approach { padding: 36px 24px 32px; }
          .tv-out-grid { grid-template-columns: 1fr; }
          .tv-hd-wrap { padding: 72px 20px; }
          .tv-hd-stage { max-width: 400px; }
          .tv-intel { padding: 72px 20px 88px; }
          .tv-hero-ctas { flex-direction: column; }
          .tv-hero-ctas .tv-btn { width: 100%; }
          .tv-s11-ctas { flex-direction: column; }
          .tv-s11-ctas .tv-btn { width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tv-reveal { opacity: 1; transform: none; transition: none; animation: none; }
          .tv-transit-pulse { display: none; }
          .tv-s05-node:hover .tv-s05-circle { transform: none; }
        }
      `}</style>

      <section className="tv-hero">
        <video className="tv-hero-img" src="/services/travel/travelhero.mp4" autoPlay muted loop playsInline />
        <div className="tv-hero-content tv-reveal">
          <span className="tv-hero-eyebrow">TRAVEL &amp; HOSPITALITY</span>
          <h1>Intelligent operations behind<span style={{ color: "#C6E84A" }}> every journey.</span></h1>
          <p className="tv-hero-sub">Transforming travel operations through domain expertise, AI, automation and data intelligence.</p>
          <p className="tv-hero-body">From reservations and traveler support to disruption management, revenue operations and finance, Sytrion helps travel enterprises simplify complexity, improve service and build connected operations designed around the modern traveler.</p>
          <div className="tv-hero-ctas">
            <Link href="#capabilities" className="tv-btn">Explore Our Capabilities ↓</Link>
            <Link href="/contact" className="tv-btn tv-btn--ghost">Talk to Our Experts ↗</Link>
          </div>
        </div>
      </section>

      <section className="tv-s02">
        <div className="tv-wrap">
          <div className="tv-s02-head tv-reveal">
            <TvLabel text="A WORLD THAT NEVER STOPS MOVING" />
            <h2 className="tv-h2">Every journey creates thousands of <span style={{ color: "#C6E84A" }}>moments that need to work.</span></h2>
          </div>
          <div className="tv-s02-row tv-reveal">
            <div className="tv-s02-text">
              <p className="tv-lede">Travel businesses operate in an environment where customer expectations, operational complexity and commercial pressures intersect every day.</p>
              <p className="tv-copy">Behind every booking is a network of reservations, payments, schedules, customer interactions, baggage, disruptions, partners and financial transactions that must work together — often in real time.</p>
            </div>
            <div className="tv-s02-right">
              {landscapeItems.map((item) => (
                <article key={item.num} className="tv-s02-card">
                  <div className="tv-s02-icon" aria-hidden="true">{item.icon}</div>
                  <div className="tv-s02-label">{item.label}</div>
                </article>
              ))}
            </div>
          </div>
          <div className="tv-s02-approach tv-reveal">
            <div className="tv-s02-approach-top">
              <div className="tv-s02-approach-dot" />
              <div className="tv-s02-approach-label">Our Approach</div>
            </div>
            <p className="tv-s02-approach-text">We connect <em>people, processes, data</em> and <em>intelligence</em> to keep travel operations moving.</p>
          </div>
        </div>
      </section>

      <section className="tv-s03">
        <div className="tv-wrap">
          <div className="tv-reveal">
            <TvLabel text="WHO WE SERVE" />
            <h2 className="tv-h2">Built around the businesses that <span style={{ color: "#C6E84A" }}>make travel possible.</span></h2>
          </div>
          <div className="tv-s03-track tv-reveal">
            {serveCols.map((col) => (
              <div key={col.label} className="tv-s03-card" style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0) 70%), linear-gradient(0deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 58%), url("${col.image}")` }}>
                <div className="tv-s03-card-name">{col.label}</div>
                <p className="tv-s03-card-desc">{col.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tv-s04" id="capabilities">
        <div className="tv-wrap">
          <div className="tv-reveal">
            <TvLabel text="INTELLIGENT BUSINESS SERVICES" />
            <h2 className="tv-h2">From individual transactions to <span style={{ color: "#C6E84A" }}>connected journeys.</span></h2>
            <p className="tv-lede">Sytrion combines travel-domain expertise with intelligent workflows, automation, AI and data to help enterprises manage high-volume travel operations with greater speed, accuracy and control.</p>
          </div>
          <div className="tv-s04-tabbar tv-reveal" role="tablist">
            {tabs.map((t, i) => (
              <button key={t.num} role="tab" aria-selected={activeTab === i} className={activeTab === i ? "tv-tab-active" : ""} onClick={() => setActiveTab(i)} onMouseEnter={() => setActiveTab(i)}>
                <em>{t.num}</em> {t.tab}
              </button>
            ))}
          </div>
          <div key={activeTab} className={`tv-s04-panel${tabs[activeTab].img ? "" : " tv-panel-full"}`} role="tabpanel">
            <div className="tv-s04-text">
              <h3>{tabs[activeTab].title}</h3>
              <p className="tv-s04-intro">{tabs[activeTab].intro}</p>
              <div className="tv-s04-checklist">
                {tabs[activeTab].items.map((item) => (
                  <div key={item} className="tv-s04-check">{item}</div>
                ))}
              </div>
            </div>
            {tabs[activeTab].img && <div className="tv-s04-photo" role="img" aria-label={tabs[activeTab].title} style={{ backgroundImage: `linear-gradient(200deg, rgba(198,232,74,0.16) 0%, rgba(10,22,40,0.55) 100%), url("${tabs[activeTab].img}")` }} />}
          </div>
        </div>
      </section>

      <section className="tv-s05">
        <div className="tv-wrap">
          <div className="tv-s05-split">
            <div className="tv-s05-feature tv-reveal">
              <img src="/services/travel/TRAVELER EXPERIENCE.jpg" alt="Traveler care representative supporting a traveler journey" />
              <div className="tv-s05-tint" />
            </div>
            <div className="tv-reveal">
              <div className="tv-s05-head">
                <TvLabel text="TRAVELER EXPERIENCE" />
                <h2 className="tv-h2">Make every interaction <span style={{ color: "#C6E84A" }}>feel effortless.</span></h2>
                <div className="tv-s05-lede-row">
                  <p className="tv-lede">Travelers don&apos;t experience systems, processes or organizational boundaries.</p>
                  <p className="tv-lede">They experience moments.</p>
                </div>
                <p className="tv-copy">From booking and departure to disruption and arrival, Sytrion helps travel organizations create connected service operations that make those moments easier to navigate.</p>
              </div>
              <div className="tv-s05-flow">
                <svg className="tv-s05-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <path
                    d="M14 28 H50 M50 28 H86 M86 28 L86 67 M86 74 H50 M50 74 H14"
                    stroke="#C6E84A"
                    strokeOpacity="0.42"
                    strokeWidth="1.2"
                    vectorEffect="non-scaling-stroke"
                    fill="none"
                  />
                </svg>
                <span className="tv-s05-arrow tv-s05-arrow--r" style={{ left: "32%", top: "28%" }} aria-hidden="true" />
                <span className="tv-s05-arrow tv-s05-arrow--r" style={{ left: "68%", top: "28%" }} aria-hidden="true" />
                <span className="tv-s05-arrow tv-s05-arrow--d" style={{ left: "86%", top: "67%" }} aria-hidden="true" />
                <span className="tv-s05-arrow tv-s05-arrow--l" style={{ left: "68%", top: "74%" }} aria-hidden="true" />
                <span className="tv-s05-arrow tv-s05-arrow--l" style={{ left: "32%", top: "74%" }} aria-hidden="true" />
                {journeyStages.map((s, i) => (
                  <div key={s.name} className="tv-s05-node" style={{ left: `${journeyFlowPos[i].x}%`, top: `${journeyFlowPos[i].y}%` }}>
                    <div className="tv-s05-circle">{s.icon}</div>
                    <span className="tv-s05-label">
                      <span className="tv-s05-num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="tv-s05-name">{s.name}</span>
                    </span>
                    <span className="tv-s05-sub">{s.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tv-s06">
        <div className="tv-wrap">
          <div className="tv-reveal">
            <TvLabel text="CORE TRAVEL OPERATIONS" />
           
            <h2 className="tv-h2">Keeping complex airline <span style={{ color: "#C6E84A" }}>operations connected.</span></h2>
            <p className="tv-lede">Airline operations bring together passengers, schedules, airports, crews, partners, baggage and financial systems in a highly time-sensitive environment.</p>
            <p className="tv-copy">Sytrion helps support the operational workflows behind reliable journeys through connected processes, intelligent automation and real-time information.</p>
          </div>
          <div className="tv-s06-row tv-reveal">
            {cardSections.map((sec) => (
              <article key={sec.title} className="tv-s06-card">
                <div className="tv-s06-card-img" style={{ backgroundImage: `linear-gradient(200deg, rgba(198,232,74,0.18) 0%, rgba(10,22,40,0.5) 100%), url("${sec.img}")` }} role="img" aria-label={sec.title} />
                <div className="tv-s06-card-body">
                  <h3>{sec.title}</h3>
                  <p className="tv-s06-card-desc">{sec.desc}</p>
                  {sec.groups.map((group, gi) => {
                    const key = `${sec.title}-${gi}`;
                    const open = expandedGroups.has(key);
                    return (
                      <div key={group.label} className={`tv-s06-group${open ? " tv-s06-group-open" : ""}`}>
                        <button type="button" className="tv-s06-group-toggle" onClick={() => toggleGroup(key)} aria-expanded={open}>
                          <span>{group.label}</span>
                          <span className="tv-s06-group-icon">+</span>
                        </button>
                        <div className="tv-s06-group-list">
                          <ul>
                            {group.items.map((item) => <li key={item}>{item}</li>)}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tv-s08">
        <div className="tv-intel">
          <div className="tv-intel-hero tv-reveal">
            <TvLabel text="AI THAT POWERS TRAVEL OPERATIONS" />
            <h2 className="tv-intel-title">AI that works behind <span>every journey.</span></h2>
            <p className="tv-intel-sub">AI can help travel enterprises understand intent, automate repetitive processes, identify exceptions and help operational teams respond faster.</p>
          </div>
          <div className="tv-transit tv-reveal">
            <svg className="tv-transit-line" viewBox="0 0 1200 220" fill="none" preserveAspectRatio="none" aria-hidden="true">
              <path d={tvTransitPath} stroke="rgba(198,241,53,0.55)" strokeWidth="2" />
              <g className="tv-transit-pulse">
                <circle className="tv-transit-glow" r="11" />
                <circle className="tv-transit-dot" r="5" />
                <animateMotion dur="6s" repeatCount="indefinite" path={tvTransitPath} />
              </g>
            </svg>
            {tvTransitStops.map((stop) => (
              <div key={stop.name} className={"tv-stop" + (stop.hub ? " tv-stop--hub" : "") + (stop.y < 110 ? " tv-stop--up" : "")} style={{ left: `${(stop.x / 1200) * 100}%`, top: `${(stop.y / 220) * 100}%` }}>
                <span className="tv-stop-dot" />
                <div className="tv-stop-body">
                  <span className="tv-stop-name">{stop.name}</span>
                  <span className="tv-stop-desc">{stop.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="tv-s08-sep" />

        <div className="tv-hd" onMouseMove={onTvHdTilt} onMouseLeave={onTvHdTiltReset}>
          <div className="tv-hd-glow tv-hd-glow--lime" aria-hidden="true" />
          <div className="tv-hd-glow tv-hd-glow--blue" aria-hidden="true" />
          <div className="tv-hd-wrap">
            <div className="tv-hd-grid">
              <div className="tv-hd-copy tv-reveal">
                
                <span className="tv-hd-pill">Human + Digital</span>
                <h2 className="tv-hd-title">
                  <span className="tv-hd-title-white">Smarter travel should</span>
                  <span className="tv-hd-title-lime">still feel personal.</span>
                </h2>
                <p className="tv-hd-line">Automation can handle repetitive requests.</p>
                <p className="tv-hd-line">AI can organize information and help surface what matters.</p>
                <p className="tv-hd-line">People bring judgment, context and empathy to complex travel situations.</p>
                <p className="tv-hd-em">Sytrion brings them together.</p>
              </div>
              <div className="tv-hd-visual tv-reveal">
                <div className="tv-hd-stage" ref={tvHdStageRef}>
                  <div className="tv-hd-halo" aria-hidden="true" />
                  <svg className="tv-hd-conn" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    <line x1="24" y1="16" x2="36" y2="29" />
                    <line x1="24" y1="54" x2="36" y2="46" />
                    <line x1="52" y1="70" x2="62" y2="48" />
                  </svg>
                  <div className="tv-hd-globe" aria-hidden="true">
                    <div className="tv-hd-solid" />
                    <svg className="tv-hd-mesh" viewBox="0 0 400 400" fill="none">
                      <ellipse cx="200" cy="200" rx="198" ry="198" stroke="rgba(198,241,53,0.30)" strokeWidth="1" />
                      <ellipse cx="200" cy="200" rx="198" ry="126" stroke="rgba(198,241,53,0.15)" strokeWidth="1" />
                      <ellipse cx="200" cy="200" rx="198" ry="62" stroke="rgba(198,241,53,0.15)" strokeWidth="1" />
                      <ellipse cx="200" cy="200" rx="126" ry="198" stroke="rgba(198,241,53,0.15)" strokeWidth="1" />
                      <ellipse cx="200" cy="200" rx="62" ry="198" stroke="rgba(198,241,53,0.15)" strokeWidth="1" />
                      <ellipse cx="200" cy="200" rx="150" ry="198" stroke="rgba(110,160,255,0.10)" strokeWidth="1" />
                      <path d="M2 200h396" stroke="rgba(198,241,53,0.20)" strokeWidth="1" />
                    </svg>
                    <div className="tv-hd-pts">
                      {[
                        [62, 22], [70, 30], [76, 40], [74, 52], [66, 62], [54, 68], [44, 66], [36, 60],
                        [30, 50], [31, 38], [38, 28], [50, 24], [60, 36], [66, 48], [48, 56], [56, 40],
                        [40, 44], [44, 52], [54, 30], [58, 58],
                      ].map(([px, py], i) => (
                        <span
                          key={i}
                          className={"tv-hd-pt" + (i % 5 === 0 ? " tv-hd-pt--glow" : "")}
                          style={{ left: `${px}%`, top: `${py}%` }}
                        />
                      ))}
                    </div>
                    <div className="tv-hd-core" />
                  </div>
                  <div className="tv-hd-orbit tv-hd-orbit--a" aria-hidden="true">
                    <span className="tv-hd-orbit-dot" />
                  </div>
                  <div className="tv-hd-orbit tv-hd-orbit--b" aria-hidden="true">
                    <span className="tv-hd-orbit-dot" />
                  </div>
                  <div className="tv-hd-card tv-hd-card--tl">
                    <span className="tv-hd-card-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M22 12h-4M6 12H2" /><circle cx="12" cy="12" r="8" opacity="0.45" /></svg>
                    </span>
                    <div>
                      <h3>Smarter decisions</h3>
                      <p>AI analyzes patterns in real time.</p>
                    </div>
                  </div>
                  <div className="tv-hd-card tv-hd-card--ml">
                    <span className="tv-hd-card-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" /><path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" /></svg>
                    </span>
                    <div>
                      <h3>Automate at scale</h3>
                      <p>Handle high volumes with speed and accuracy.</p>
                    </div>
                  </div>
                  <div className="tv-hd-card tv-hd-card--r">
                    <span className="tv-hd-card-icon" aria-hidden="true">
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
      </section>

      <section className="tv-s09">
        <div className="tv-wrap">
          <div className="tv-s09-head tv-reveal">
            <TvLabel text="WHEN PLANS CHANGE" />
            <h2 className="tv-h2">Turn disruption into <span style={{ color: "#C6E84A" }}> intelligent service recovery.</span></h2>
            <p className="tv-lede">Travel disruptions create a cascade of operational decisions across schedules, bookings, travelers, channels and service teams.</p>
            <p className="tv-copy">Sytrion helps orchestrate the administrative workflows behind disruption management so teams can respond with greater speed and consistency.</p>
          </div>
          <div className="tv-s09-flow tv-reveal">
            <div className="tv-s09-rail">
              <div className="tv-s09-rail-line" aria-hidden="true" />
              {disruptionSteps.map((s, i) => {
                const up = i % 2 === 0;
                return (
                  <div key={s.name} className="tv-s09-step">
                    <div className="tv-s09-node" aria-hidden="true" />
                    <div className={"tv-s09-stem tv-s09-stem--" + (up ? "up" : "down")} aria-hidden="true" />
                    <div className={"tv-s09-label tv-s09-label--" + (up ? "up" : "down")}>
                      <span className="tv-s09-lbl-num">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="tv-s09-name">{s.name}</h3>
                      <p className="tv-s09-desc">{s.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

<section className="tv-s10">
        <div className="tv-wrap">
          <div className="tv-reveal">
            <TvLabel text="THE OUTCOME" light />
            <h2 className="tv-h2">Better operations create better <span style={{ color: "#C6E84A" }}>travel experiences.</span></h2>
          </div>
          <div className="tv-out-grid tv-reveal">
            {outcomes.map((o, i) => (
              <article key={o.word} className={`tv-outcome${i === 0 ? " tv-outcome--dark" : ""}`}>
                <div className="tv-outcome-body">
                  <p className="tv-outcome-eyebrow">{o.num} / {o.word}</p>
                  <h3 className="tv-outcome-title">{o.sub}</h3>
                  <p className="tv-outcome-desc">{o.desc}</p>
                </div>
                <div className="tv-outcome-media">
                  <img src={o.image} alt={o.sub} loading="lazy" decoding="async" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tv-loyalty">
        <div className="tv-wrap">
          <div className="tv-sec-head tv-reveal">
            <TvLabel text="Loyalty &amp; Personalization" />
            
            <h2 className="tv-h2">Turn travelers into <span style={{ color: "#C6E84A" }}>relationships.</span></h2>
            <div className="tv-sec-copy">
              <p className="tv-lede">Every journey creates information that can help travel brands understand preferences, anticipate needs and create more relevant experiences.</p>
              <p className="tv-copy">Sytrion helps support loyalty and customer operations that turn those insights into meaningful engagement.</p>
            </div>
          </div>
          <div className="tv-loyalty-grid tv-reveal">
            {loyaltyCards.map((c) => (
              <article key={c.title} className="tv-loyalty-card">
                <div className="tv-loyalty-card-icon" aria-hidden="true">{c.icon}</div>
                <h3>{c.title}</h3>
                <ul>
                  {c.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          .tv-sec-head { max-width: 900px; }
          .tv-sec-theme { font-size: 13px; font-weight: 700; letter-spacing: 0.24em; text-transform: uppercase; color: #4d7c0f; margin: 0 0 12px; }
          .tv-sec-copy { max-width: 720px; }
          .tv-loyalty { position: relative; background: radial-gradient(ellipse 80% 60% at 85% 10%, rgba(198,232,74,0.05), transparent 60%), var(--tv-navy); padding: clamp(76px, 9vw, 128px) 80px; overflow: hidden; }
          .tv-loyalty::before { content: ""; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(198,232,74,0.11) 1px, transparent 1px); background-size: 34px 34px; opacity: 0.35; pointer-events: none; mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%); -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%); }
          .tv-loyalty .tv-sec-head { position: relative; z-index: 1; max-width: none; }
          .tv-loyalty .tv-sec-copy { max-width: none; }
          .tv-loyalty .tv-h2 { color: #ffffff; }
          .tv-loyalty .tv-lede { color: rgba(255,255,255,0.85); }
          .tv-loyalty .tv-copy { color: rgba(255,255,255,0.58); }
          .tv-loyalty .tv-sec-theme { color: rgba(198,232,74,0.85); }
          .tv-loyalty-grid { position: relative; z-index: 1; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 56px; }
          .tv-loyalty-card { position: relative; background: rgba(255,255,255,0.035); border: 1px solid rgba(198,232,74,0.14); border-radius: 18px; padding: 30px 26px; overflow: hidden; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.35s ease, background 0.35s ease; }
          .tv-loyalty-card::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 3px; border-radius: 0 0 18px 18px; background: linear-gradient(90deg, #7AA306, #C6E84A); opacity: 0; transition: opacity 0.35s ease; }
          .tv-loyalty-card:hover { transform: translateY(-5px); border-color: rgba(198,232,74,0.35); background: rgba(198,232,74,0.05); }
          .tv-loyalty-card:hover::after { opacity: 1; }
          .tv-loyalty-card-icon { width: 52px; height: 52px; border-radius: 14px; background: rgba(198,232,74,0.12); border: 1px solid rgba(198,232,74,0.25); display: flex; align-items: center; justify-content: center; color: #C6E84A; margin-bottom: 22px; }
          .tv-loyalty-card-icon svg { width: 24px; height: 24px; }
          .tv-loyalty-card h3 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 20px; font-weight: 700; color: #ffffff; margin: 0; }
          .tv-loyalty-card ul { list-style: none; margin: 14px 0 0; padding: 6px 0 0; border-top: 1px solid rgba(255,255,255,0.07); }
          .tv-loyalty-card li { display: flex; align-items: center; gap: 10px; padding: 7px 0; font-size: 14px; color: rgba(255,255,255,0.62); }
          .tv-loyalty-card li::before { content: ""; width: 5px; height: 5px; border-radius: 50%; background: #C6E84A; flex: 0 0 auto; }
          @media (max-width: 1080px) { .tv-loyalty-grid { grid-template-columns: 1fr 1fr; } }
          @media (max-width: 640px) {
            .tv-loyalty { padding-left: 20px; padding-right: 20px; }
            .tv-loyalty-grid { grid-template-columns: 1fr; }
            .tv-loyalty-card { padding: 24px 22px; }
          }
        `}</style>
      </section>

      <section className="tv-model">
        <div className="tv-wrap">
          <div className="tv-sec-head tv-reveal">
            <TvLabel text="The Sytrion Model" />
            <h2 className="tv-h2">One connected travel <span style={{ color: "#C6E84A" }}>operating model.</span></h2>
          </div>
          <div className="tv-stack tv-reveal">
            {modelLayers.map((layer) => (
              <div key={layer.num} className="tv-layer">
                <span className="tv-layer-num">{layer.num}</span>
                <span className="tv-layer-name">{layer.name}</span>
                <span className="tv-layer-items">{layer.items}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .tv-model { background: #071426; padding: clamp(76px, 9vw, 128px) 80px; }
          .tv-model .tv-h2 { color: #ffffff; }
          .tv-stack { display: flex; flex-direction: column; gap: 12px; margin-top: 56px; }
          .tv-layer { display: grid; grid-template-columns: 90px 320px 1fr; align-items: center; gap: 20px; border-radius: 14px; padding: 24px 30px; background: #10294A; border: 1px solid rgba(198,232,74,0.12); transition: border-color 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1); }
          .tv-layer:hover { background: #C6E84A; border-color: rgba(198,232,74,0.8); box-shadow: 0 0 40px -6px rgba(198,232,74,0.4); transform: translateX(6px); }
          .tv-layer:hover .tv-layer-num, .tv-layer:hover .tv-layer-name, .tv-layer:hover .tv-layer-items { color: #0C1B30; }
          .tv-layer-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; color: #C6E84A; font-variant-numeric: tabular-nums; }
          .tv-layer-name { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #ffffff; }
          .tv-layer-items { font-size: 12.5px; letter-spacing: 0.05em; color: rgba(255,255,255,0.62); }
          @media (max-width: 640px) { .tv-layer { grid-template-columns: 1fr; gap: 8px; padding: 20px; } }
          @media (min-width: 1400px) { .tv-model .tv-h2 { white-space: nowrap; } .tv-model .tv-sec-head { max-width: none; } }
        `}</style>
      </section>

      <section className="tv-why">
        <div className="tv-wrap">
          <div className="tv-sec-head tv-reveal">
            <TvLabel text="Why Sytrion" />
            <h2 className="tv-h2">Travel understanding. <span style={{ color: "#C6E84A" }}>Intelligent execution.</span></h2>
          </div>
          <div className="tv-why-grid tv-reveal">
            {whyPoints.map((w) => (
              <article key={w.num} className="tv-why-card">
                <div className="tv-why-head">
                  <div className="tv-why-icon" aria-hidden="true">
                    <img src={w.icon} alt="" width="52" height="52" />
                  </div>
                  <div className="tv-why-head-text">
                    <span className="tv-why-num">{w.num}</span>
                    <h3>{w.name}</h3>
                  </div>
                </div>
                <p>{w.desc}</p>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          .tv-why { background: #ffffff; padding: clamp(76px, 9vw, 128px) 80px; }
          .tv-why .tv-h2 { color: #0f172a; }
          .tv-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 56px; }
          .tv-why-card { position: relative; border-radius: 16px; padding: 28px 24px 26px; background: #FAFBFC; border: 2px solid #D1D9E6; display: flex; flex-direction: column; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease; }
          .tv-why-card::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 3px; border-radius: 0 0 16px 16px; background: linear-gradient(90deg, #7AA306, #C6E84A); opacity: 0; transition: opacity 0.35s ease; }
          .tv-why-card:hover { transform: translateY(-4px); box-shadow: 0 12px 30px -12px rgba(10,22,40,0.12); }
          .tv-why-card:hover::after { opacity: 1; }
          .tv-why-head { display: flex; align-items: center; gap: 16px; margin-bottom: 14px; }
          .tv-why-head-text { display: flex; flex-direction: column; }
          .tv-why-icon { width: 64px; height: 64px; border-radius: 16px; background: rgba(198,232,74,0.12); border: 1px solid rgba(122,163,6,0.2); display: flex; align-items: center; justify-content: center; color: #618300; flex: 0 0 auto; transition: background 0.35s ease, border-color 0.35s ease, color 0.35s ease, transform 0.35s ease; }
          .tv-why-icon svg { width: 28px; height: 28px; }
          .tv-why-card:hover .tv-why-icon { background: #C6E84A; border-color: #C6E84A; color: #0C1B30; transform: scale(1.06); }
          .tv-why-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; color: #7AA306; font-variant-numeric: tabular-nums; }
          .tv-why-card h3 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 23px; font-weight: 700; color: #0C1B30; margin: 4px 0 0; }
          .tv-why-card p { font-size: 14px; line-height: 1.65; color: #5A6B7F; margin: 8px 0 0; }
          @media (max-width: 900px) { .tv-why-grid { grid-template-columns: 1fr 1fr; } }
          @media (max-width: 640px) {
            .tv-why { padding-left: 20px; padding-right: 20px; }
            .tv-why-grid { grid-template-columns: 1fr; }
            .tv-why .tv-h2 { white-space: normal; }
          }
          @media (min-width: 1400px) { .tv-why .tv-h2 { white-space: nowrap; } .tv-why .tv-sec-head { max-width: none; } }
        `}</style>
      </section>

      <section className="tv-transform">
        <div className="tv-transform-grid">
          <div className="tv-transform-left">
            <span className="tv-transform-badge">Transformation in Action</span>
            <div className="tv-tl-step">
              <span className="tv-tl-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </span>
              <div className="tv-tl-body">
                <h3>The Challenge</h3>
                <p>High-volume travel operations can involve fragmented information, manual document processing, repetitive validations and significant exception handling.</p>
              </div>
            </div>
            <div className="tv-tl-link" aria-hidden="true" />
            <div className="tv-tl-step tv-tl-step--approach">
              <span className="tv-tl-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </span>
              <div className="tv-tl-body">
                <h3>The Sytrion Approach</h3>
                <p>Combine domain-led operations with document intelligence, workflow automation, structured validation and operational analytics.</p>
              </div>
            </div>
          </div>
          <div className="tv-pot-card">
            <h3 className="tv-pot-title">The Potential</h3>
            <ul className="tv-pot-checklist">
              <li><span className="tv-pot-tick" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12.5 9.5 18 20 6.5" stroke="#C6E84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span> Faster Traveler Support</li>
              <li><span className="tv-pot-tick" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12.5 9.5 18 20 6.5" stroke="#C6E84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span> Reduced Manual Processing</li>
              <li><span className="tv-pot-tick" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12.5 9.5 18 20 6.5" stroke="#C6E84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span> Better Exception Management</li>
              <li><span className="tv-pot-tick" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12.5 9.5 18 20 6.5" stroke="#C6E84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span> Improved Revenue Visibility</li>
              <li><span className="tv-pot-tick" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12.5 9.5 18 20 6.5" stroke="#C6E84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span> More Scalable Operations</li>
            </ul>
            <Link href="/contact" className="tv-transform-cta">Discuss Your Use Case <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <style>{`
          .tv-transform { margin-top: clamp(8px, 1vw, 16px); padding: 0 clamp(28px, 5vw, 80px) clamp(64px, 8vw, 120px); background: #FFFFFF; overflow: hidden; }
          .tv-transform-badge { display: inline-block; align-self: flex-start; background: #C6E84A; color: #0f0f0f; padding: 8px 20px; border-radius: 999px; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; font-variant: small-caps; margin-bottom: clamp(12px, 1.6vw, 16px); }
          .tv-transform-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: clamp(40px, 5vw, 72px); align-items: flex-start; }
          .tv-transform-left { display: flex; flex-direction: column; max-width: 560px; padding-top: clamp(8px, 1vw, 16px); }
          .tv-tl-step { display: flex; align-items: flex-start; gap: 24px; }
          .tv-tl-step--approach { align-items: center; }
          .tv-tl-icon { flex: 0 0 auto; width: 52px; height: 52px; border-radius: 50%; border: 1.5px solid #C8D1DD; background: #FFFFFF; color: #93A0B0; display: flex; align-items: center; justify-content: center; }
          .tv-tl-icon svg { width: 22px; height: 22px; }
          .tv-tl-body { flex: 1; min-width: 0; }
          .tv-tl-body h3 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(20px, 2vw, 24px); font-weight: 700; margin: 0; color: #0C1B30; line-height: 1.25; }
          .tv-tl-body p { font-size: 15px; line-height: 1.7; margin: 12px 0 0; color: #5A6B7F; }
          .tv-tl-step--approach .tv-tl-body { background: #F3F5F7; border-left: 4px solid #C6E84A; border-radius: 16px; padding: 24px 26px; }
          .tv-tl-link { flex: 0 0 auto; width: 0; height: 44px; margin: 12px 0 12px 25px; border-left: 2px dashed #C6E84A; }
          .tv-pot-card { background: #0C1B30; border-radius: 22px; padding: clamp(30px, 3.5vw, 44px); color: #FFFFFF; box-shadow: 0 34px 70px -40px rgba(7,20,38,0.5); }
          .tv-pot-title { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(24px, 2.6vw, 32px); font-weight: 700; margin: 0 0 clamp(18px, 2vw, 24px); color: #FFFFFF; line-height: 1.25; }
          .tv-pot-checklist { list-style: none; margin: 0; padding: 0; }
          .tv-pot-checklist li { display: flex; align-items: center; gap: 14px; padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 15px; font-weight: 600; color: #FFFFFF; }
          .tv-pot-checklist li:last-child { border-bottom: none; }
          .tv-pot-tick { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; color: #C6E84A; }
          .tv-pot-tick svg { width: 18px; height: 18px; }
          .tv-transform-cta { display: inline-flex; align-items: center; justify-content: center; gap: 10px; align-self: flex-start; background: #C6E84A; color: #0f0f0f; padding: 15px 30px; border-radius: 999px; font-weight: 700; font-size: 15px; letter-spacing: 0.02em; text-decoration: none; margin-top: 28px; transition: background 0.25s ease, transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease; }
          .tv-transform-cta span { display: inline-block; transition: transform 0.2s ease; }
          .tv-transform-cta:hover { background: #D9F77E; transform: translateY(-2px); box-shadow: 0 16px 34px -14px rgba(198,232,74,0.55); }
          .tv-transform-cta:hover span { transform: translateX(3px); }
          @media (prefers-reduced-motion: reduce) { .tv-transform-cta:hover { transform: none; } .tv-transform-cta:hover span { transform: none; } }
          @media (max-width: 900px) { .tv-transform { margin-top: clamp(12px, 3vw, 24px); padding: 0 24px clamp(48px, 8vw, 72px); } .tv-transform-grid { grid-template-columns: 1fr; gap: 40px; } .tv-transform-left { max-width: none; } }
          @media (max-width: 520px) { .tv-tl-step { gap: 16px; } .tv-tl-icon { width: 46px; height: 46px; } .tv-tl-icon svg { width: 20px; height: 20px; } .tv-tl-link { margin-left: 22px; height: 36px; margin-top: 10px; margin-bottom: 10px; } .tv-tl-step--approach .tv-tl-body { padding: 20px 18px; } }
        `}</style>
      </section>

      <section className="tv-s11">
        <div className="tv-s11-content tv-reveal">
          <TvLabel text="LET'S MOVE TRAVEL FORWARD." />
          <h2>Ready to build smarter<span style={{ color: "#C6E84A" }}>  travel operations?</span></h2>
          <p>From traveler experience and airline operations to disruption management, revenue, finance and AI, Sytrion can help create connected operations designed to keep every journey moving.</p>
          <div className="tv-s11-ctas">
            <Link href="/contact" className="tv-btn">Talk to Our Travel Experts ↗</Link>
            <Link href="/contact" className="tv-btn tv-btn--ghost">Schedule a Consultation</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
