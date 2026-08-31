"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";

const landscapeItems = [
  { num: "01", label: "Always-on traveler expectations", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { num: "02", label: "Complex reservation environments", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M12 7.5v4M12 11.5l-5.5 5.5M12 11.5l5.5 5.5"/></svg> },
  { num: "03", label: "Time-critical disruptions", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 2h6"/></svg> },
  { num: "04", label: "Fragmented operational data", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg> },
  { num: "05", label: "Revenue leakage & reconciliation", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
  { num: "06", label: "Growing pressure on cost and experience", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17.5l5.5-5.5 3.5 3.5L20.5 7"/><path d="M14.5 7h6v6"/></svg> },
];

const serveCols = [
  { label: "AIRLINES", desc: "Intelligent operations across reservations, traveler services, disruption management, revenue and finance.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg> },
  { label: "AIRPORTS", desc: "Supporting passenger journeys and operational processes across complex airport environments.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M4 21V8l8-5 8 5v13"/><path d="M8 21v-5h8v5"/><path d="M8 11h.01M12 11h.01M16 11h.01"/></svg> },
  { label: "ONLINE TRAVEL & TRAVEL MANAGEMENT", desc: "Scalable support across reservations, fulfillment, customer service, payments and back-office operations.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
  { label: "HOSPITALITY & LEISURE", desc: "Connected guest, reservation, finance and service operations designed around better experiences.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01"/><path d="M10 21v-3h4v3"/></svg> },
];

const tabs = [
  { num: "01", tab: "RESERVATIONS", title: "01 — Reservations & Ticketing", intro: "Make booking journeys simpler from search to service.", img: "/services/travel/Reservations & Ticketing.png", items: ["Reservation support", "Booking modifications", "Ticketing support", "Group bookings", "Cancellations & refunds", "Schedule-change processing"] },
  { num: "02", tab: "TRAVELER CARE", title: "02 — Traveler Care", intro: "Support travelers across every stage of the journey.", img: "/services/travel/Traveler Care.png", items: ["Pre-travel assistance", "Booking queries", "Travel information", "Special-service requests", "Post-travel support", "Omnichannel service"] },
  { num: "03", tab: "DISRUPTIONS", title: "03 — Disruption Management", intro: "Respond when journeys don't go as planned.", img: "/services/travel/Disruption Management.png", items: ["Schedule-change support", "Cancellation handling", "Rebooking assistance", "Traveler notifications", "Service recovery workflows", "Exception management"] },
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

const cardSections = [
  {
    title: "Airline Operations",
    desc: "Keeping complex airline operations connected.",
    img: "/services/travel/Airline Operations.png",
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
    img: "/services/travel/Revenue & Financial Operations.png",
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
    img: "/services/travel/Loyalty & Personalization.png",
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
  { num: "01", word: "FASTER", sub: "Faster response", desc: "Intelligent workflows help teams process requests and exceptions more quickly.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
  { num: "02", word: "SEAMLESS", sub: "Smoother journeys", desc: "Connected operations reduce friction across traveler touchpoints.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h5a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z"/><path d="M11 9.5l4-2.5a2 2 0 0 1 3 1.7v7.6a2 2 0 0 1-3 1.7l-4-2.5"/><path d="M18 10.5a1.5 1.5 0 0 1 0 3"/></svg> },
  { num: "03", word: "EFFICIENT", sub: "Lower operational effort", desc: "Automation reduces repetitive administrative activity.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17.5l5.5-5.5 3.5 3.5L20.5 7"/><path d="M14.5 7h6v6"/></svg> },
  { num: "04", word: "PROTECTED", sub: "Better revenue control", desc: "Validation and reconciliation help identify discrepancies and revenue leakage.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg> },
  { num: "05", word: "PERSONAL", sub: "More relevant experiences", desc: "Connected data helps organizations understand and serve travelers better.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  { num: "06", word: "SCALABLE", sub: "Built for demand", desc: "Flexible operations help manage seasonal peaks and changing travel volumes.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 16l4-6 4 3 5-8"/></svg> },
];

function TvLabel({ text, light }: { text: string; light?: boolean }) {
  return <span className={`tv-label${light ? " tv-label--light" : ""}`}>{text}</span>;
}

export default function TravelHospitalityPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const revealRef = useRef<HTMLDivElement | null>(null);

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
        .tv-hero-overlay { position: absolute; inset: 0; z-index: -1; background:
          linear-gradient(90deg, rgba(5,10,20,0.96) 0%, rgba(5,10,20,0.88) 28%, rgba(5,10,20,0.55) 55%, rgba(5,10,20,0.14) 82%, rgba(5,10,20,0.06) 100%),
          linear-gradient(180deg, rgba(5,10,20,0.32) 0%, rgba(5,10,20,0) 34%, rgba(5,10,20,0.48) 100%); }
        .tv-hero-content { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; z-index: 1; padding: 100px clamp(24px, 8vw, 120px) 0; max-width: 1440px; margin: 0 auto; left: 0; right: 0; }
        .tv-hero-eyebrow { display: inline-block; background: #C6E84A; color: #0f0f0f; padding: 8px 20px; border-radius: 999px; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; font-variant: small-caps; margin-bottom: 24px; }
        .tv-hero h1 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(38px, 5.6vw, 68px); font-weight: 700; letter-spacing: -0.03em; line-height: 1.06; color: #ffffff; margin: 0 0 26px; max-width: 780px; text-wrap: balance; }
        .tv-hero-sub { font-size: clamp(17px, 1.6vw, 21px); font-weight: 600; line-height: 1.55; color: rgba(255,255,255,0.92); margin: 0 0 18px; max-width: 640px; }
        .tv-hero-body { font-size: 16px; line-height: 1.75; color: rgba(255,255,255,0.68); margin: 0 0 38px; max-width: 520px; }
        .tv-hero-ctas { display: flex; flex-wrap: wrap; gap: 16px; }

        .tv-s02 { background: #ffffff; padding: clamp(76px, 9vw, 128px) 80px; }
        .tv-s02-grid { display: grid; grid-template-columns: 45fr 55fr; gap: 60px; align-items: start; }
        .tv-s02-head { margin-bottom: 8px; }
        .tv-s02-head .tv-h2 { font-size: clamp(28px, 2.8vw, 36px); }
        .tv-s02-left .tv-lede { color: #5A5D66; }
        .tv-s02-left .tv-copy { color: #5B6472; }
        .tv-s02-items { display: grid; grid-template-columns: 1fr 1fr; gap: 36px 48px; }
        .tv-s02-item { display: flex; flex-direction: column; gap: 8px; }
        .tv-s02-item-head { display: flex; align-items: center; gap: 10px; }
        .tv-s02-item-icon { display: block; line-height: 0; color: var(--tv-blue); }
        .tv-s02-item-icon svg { width: 22px; height: 22px; }
        .tv-s02-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; color: var(--tv-blue); letter-spacing: 0.04em; }
        .tv-s02-item-label { font-size: 16px; font-weight: 600; color: #0E1B2A; line-height: 1.45; }
        .tv-s02-callout { margin-top: 48px; display: flex; align-items: center; gap: 16px; padding: 22px 28px; border-radius: 16px; background: linear-gradient(90deg, rgba(198,232,74,0.08), rgba(198,232,74,0.03)); border: 1px solid rgba(198,232,74,0.25); }
        .tv-s02-callout-icon { width: 42px; height: 42px; border-radius: 50%; background: #C6E84A; color: #0f0f0f; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .tv-s02-callout-icon svg { width: 20px; height: 20px; }
        .tv-s02-callout p { font-size: 18px; font-weight: 600; color: var(--tv-blue); margin: 0; line-height: 1.45; }

        .tv-s03 { background: var(--tv-navy); padding: clamp(76px, 9vw, 128px) 80px; }
        .tv-s03 .tv-h2 { color: #ffffff; }
        .tv-s03-cols { display: grid; grid-template-columns: repeat(4, 1fr); margin-top: 56px; }
        .tv-s03-col { padding: 0 28px; position: relative; }
        .tv-s03-col:first-child { padding-left: 0; }
        .tv-s03-col:not(:last-child)::after { content: ""; position: absolute; right: 0; top: 0; bottom: 0; width: 1px; background: rgba(198,232,74,0.18); }
        .tv-s03-icon { width: 48px; height: 48px; border-radius: 12px; background: rgba(198,232,74,0.1); border: 1px solid rgba(198,232,74,0.25); display: flex; align-items: center; justify-content: center; color: var(--tv-cyan); margin-bottom: 18px; }
        .tv-s03-icon svg { width: 24px; height: 24px; }
        .tv-s03-title { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 700; color: #ffffff; margin: 0 0 10px; letter-spacing: 0.04em; }
        .tv-s03-desc { font-size: 14.5px; line-height: 1.7; color: rgba(255,255,255,0.6); margin: 0; }

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
        .tv-s05-strip { display: grid; grid-template-columns: repeat(6, 1fr); margin-top: 56px; background: rgba(255,255,255,0.04); border: 1px solid rgba(198,232,74,0.18); border-radius: 16px; position: relative; overflow: hidden; }
        .tv-s05-seg { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 28px 12px 24px; position: relative; transition: background 0.3s ease; }
        .tv-s05-seg:not(:last-child)::after { content: ""; position: absolute; right: 0; top: 16px; bottom: 16px; width: 1px; border-right: 1px dashed rgba(198,232,74,0.3); }
        .tv-s05-seg:not(:last-child)::before { content: ""; position: absolute; right: -5px; top: -1px; width: 9px; height: 9px; border-radius: 50%; background: var(--tv-navy); z-index: 2; }
        .tv-s05-notch-bottom { position: absolute; right: -5px; bottom: -1px; width: 9px; height: 9px; border-radius: 50%; background: var(--tv-navy); z-index: 2; }
        .tv-s05-seq { font-size: 11px; font-weight: 600; letter-spacing: 0.12em; color: rgba(255,255,255,0.4); margin-bottom: 14px; font-family: var(--font-geist-mono), monospace; }
        .tv-s05-icon { width: 48px; height: 48px; border-radius: 50%; background: rgba(198,232,74,0.1); border: 1.5px solid var(--tv-cyan); display: flex; align-items: center; justify-content: center; color: var(--tv-cyan); margin-bottom: 14px; transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease; }
        .tv-s05-icon svg { width: 20px; height: 20px; }
        .tv-s05-label { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; color: #ffffff; letter-spacing: 0.06em; margin-bottom: 6px; }
        .tv-s05-sub { font-size: 12px; color: rgba(255,255,255,0.5); line-height: 1.4; max-width: 110px; }
        .tv-s05-seg:hover { background: rgba(198,232,74,0.06); }
        .tv-s05-seg:hover .tv-s05-icon { background: var(--tv-cyan); border-color: var(--tv-cyan); color: var(--tv-navy); }
        .tv-s05-pill { display: inline-block; margin-top: 10px; padding: 3px 10px; border-radius: 999px; background: var(--tv-cyan); color: var(--tv-navy); font-size: 10px; font-weight: 700; letter-spacing: 0.08em; }

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

        .tv-s08 { display: grid; grid-template-columns: 1fr 1fr; min-height: 700px; }
        .tv-s08-ai { background: radial-gradient(circle at 50% 50%, #0D1F38 0%, #071426 65%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px clamp(20px, 5vw, 80px); position: relative; overflow: hidden; }
        .tv-s08-ai .tv-label { align-self: center; }
        .tv-s08-hub { position: relative; width: 280px; height: 280px; }
        .tv-s08-core { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100px; height: 100px; border-radius: 50%; background: radial-gradient(circle at 34% 30%, rgba(200,240,100,0.95), rgba(168,213,30,0.75) 45%, rgba(16,49,92,0.9) 100%); box-shadow: 0 0 50px rgba(168,213,30,0.4); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 2; }
        .tv-s08-core span:first-child { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; color: #04202F; }
        .tv-s08-core span:last-child { font-size: 9px; font-weight: 700; letter-spacing: 0.2em; color: #06344B; }
        .tv-s08-sat { position: absolute; width: 52px; height: 52px; border-radius: 50%; background: rgba(9,26,48,0.85); border: 1px solid rgba(168,213,30,0.3); display: flex; align-items: center; justify-content: center; color: #A8D51E; backdrop-filter: blur(4px); transition: border-color 0.3s ease, transform 0.3s ease; }
        .tv-s08-sat:hover { border-color: rgba(168,213,30,0.7); transform: translate(-50%, -50%) scale(1.1); }
        .tv-s08-sat svg { width: 18px; height: 18px; }
        .tv-s08-sat-label { position: absolute; bottom: -20px; white-space: nowrap; font-size: 9.5px; font-weight: 600; color: rgba(255,255,255,0.6); letter-spacing: 0.02em; text-align: center; }
        .tv-s08-human { display: flex; flex-direction: column; justify-content: center; position: relative; overflow: hidden; background: #ffffff; }
        .tv-s08-human-content { position: relative; z-index: 1; padding: 60px; }
        .tv-s08-human-content .tv-label { margin-bottom: 16px; }
        .tv-s08-human-content h2 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(28px, 3.5vw, 40px); font-weight: 700; line-height: 1.15; color: #0C1B30; margin: 0; }
        .tv-s08-human-content .tv-copy { color: #5A6B7F; margin-top: 16px; font-size: 16px; }
        .tv-s08-human-content h3 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 20px; font-weight: 700; color: #0C1B30; margin: 28px 0 0; }

        .tv-s09 { background: #0e1526; padding: clamp(76px, 9vw, 128px) 80px; }
        .tv-s09 .tv-h2 { color: #f4f7fb; }
        .tv-s09 .tv-lede { color: rgba(255,255,255,0.6); }
        .tv-s09 .tv-copy { color: rgba(255,255,255,0.72); }
        .tv-s09-head { max-width: 1280px; }
        .tv-s09-path { display: flex; align-items: flex-start; margin-top: 56px; }
        .tv-s09-step { display: flex; flex-direction: column; align-items: center; text-align: center; flex: 0 0 auto; min-width: 88px; }
        .tv-s09-node { width: 52px; height: 52px; border-radius: 50%; background: rgba(94,138,10,0.15); border: 1.5px solid var(--tv-blue); display: flex; align-items: center; justify-content: center; color: var(--tv-blue); }
        .tv-s09-node svg { width: 22px; height: 22px; }
        .tv-s09-name { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; color: #ffffff; margin-top: 14px; letter-spacing: 0.06em; }
        .tv-s09-sub { font-size: 12px; color: rgba(255,255,255,0.5); margin-top: 4px; max-width: 104px; line-height: 1.4; }
        .tv-s09-connector { flex: 1 1 0; min-width: 20px; display: flex; align-items: center; margin: 25px 4px 0; }
        .tv-s09-connector-line { flex: 1; border-top: 2px dashed rgba(94,138,10,0.5); }
        .tv-s09-connector-arrow { width: 0; height: 0; border-left: 6px solid var(--tv-blue); border-top: 5px solid transparent; border-bottom: 5px solid transparent; }

        .tv-s10 { background: #ffffff; padding: clamp(76px, 9vw, 128px) 80px; }
        .tv-s10 .tv-h2 { color: #0E1B2A; }
        .tv-s10-cols { display: grid; grid-template-columns: repeat(6, 1fr); margin-top: 56px; }
        .tv-s10-col { padding: 0 20px; text-align: center; position: relative; }
        .tv-s10-col:not(:last-child)::after { content: ""; position: absolute; right: 0; top: 0; bottom: 0; width: 1px; background: #E2E8F0; }
        .tv-s10-icon { width: 48px; height: 48px; border-radius: 14px; background: rgba(94,138,10,0.07); border: 1px solid rgba(94,138,10,0.2); display: flex; align-items: center; justify-content: center; color: var(--tv-blue); margin: 0 auto 16px; }
        .tv-s10-icon svg { width: 22px; height: 22px; }
        .tv-s10-num { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.14em; color: var(--tv-blue); margin-bottom: 6px; }
        .tv-s10-word { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: 17px; font-weight: 700; color: #0E1B2A; margin: 0; }
        .tv-s10-sub { font-size: 13px; font-weight: 600; color: var(--tv-blue); margin: 6px 0 0; }
        .tv-s10-desc { font-size: 13px; line-height: 1.6; color: #5A6B7F; margin: 10px 0 0; }

        .tv-s11 { position: relative; min-height: 640px; display: flex; align-items: center; background:
          linear-gradient(180deg, rgba(6,14,28,0.82) 0%, rgba(6,14,28,0.68) 50%, rgba(6,14,28,0.88) 100%),
          url("/services/travel/travel cta.jpg") center / cover no-repeat,
          linear-gradient(180deg, #10263F, #0A1628); }
        .tv-s11-content { position: relative; z-index: 1; width: 100%; max-width: 1440px; margin: 0 auto; padding: clamp(90px, 10vw, 140px) clamp(24px, 8vw, 120px); text-align: center; }
        .tv-s11-content .tv-label { margin: 0 auto 24px; }
        .tv-s11 h2 { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size: clamp(32px, 4.6vw, 56px); font-weight: 700; letter-spacing: -0.02em; line-height: 1.1; color: #ffffff; margin: 0 auto 22px; max-width: 820px; }
        .tv-s11 p { font-size: 17px; line-height: 1.75; color: rgba(255,255,255,0.78); max-width: 680px; margin: 0 auto 38px; }
        .tv-s11-ctas { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; }

        @media (max-width: 1200px) {
          .tv-s10-cols { grid-template-columns: repeat(3, 1fr); gap: 32px 0; }
          .tv-s10-col:nth-child(3)::after { display: none; }
          .tv-s10-col { padding: 0 24px; }
          .tv-s08-hub { width: 240px; height: 240px; }
          .tv-s08-core { width: 80px; height: 80px; }
          .tv-s08-sat { width: 44px; height: 44px; }
        }
        @media (max-width: 1080px) {
          .tv-s02-grid { grid-template-columns: 1fr; gap: 40px; }
        }
        @media (max-width: 900px) {
          .tv-s08 { grid-template-columns: 1fr; }
          .tv-s08-ai { min-height: 500px; }
          .tv-s08-human { min-height: 400px; }
          .tv-s03-cols { grid-template-columns: 1fr 1fr; gap: 40px 0; }
          .tv-s03-col { padding: 0 24px; }
          .tv-s03-col:nth-child(3)::after { display: none; }
          .tv-s03-col:nth-child(odd) { padding-left: 0; }
          .tv-s04-tabbar { grid-template-columns: repeat(3, 1fr); }
          .tv-s04-panel { grid-template-columns: 1fr; }
          .tv-s06-row { grid-template-columns: 1fr; }
          .tv-s10-cols { grid-template-columns: repeat(2, 1fr); gap: 32px 0; }
          .tv-s10-col::after { display: none !important; }
          .tv-s09-path { overflow-x: auto; padding-bottom: 12px; }
          .tv-s09-step { min-width: 108px; }
          .tv-s05-strip { grid-template-columns: repeat(3, 1fr); }
          .tv-s05-seg:nth-child(3)::after, .tv-s05-seg:nth-child(3)::before { display: none; }
          .tv-s05-seg:nth-child(3) .tv-s05-notch-bottom { display: none; }
        }
        @media (max-width: 640px) {
          .tv-s02, .tv-s04, .tv-s06, .tv-s09, .tv-s10 { padding-left: 20px; padding-right: 20px; }
          .tv-s03 { padding-left: 20px; padding-right: 20px; }
          .tv-s05 { padding-left: 20px; padding-right: 20px; }
          .tv-s05-strip { grid-template-columns: repeat(2, 1fr); }
          .tv-s05-seg:nth-child(2n)::after, .tv-s05-seg:nth-child(2n)::before { display: none; }
          .tv-s05-seg:nth-child(2n) .tv-s05-notch-bottom { display: none; }
          .tv-s03-cols { grid-template-columns: 1fr; }
          .tv-s03-col { padding: 0; }
          .tv-s03-col::after { display: none !important; }
          .tv-s04-tabbar { grid-template-columns: repeat(2, 1fr); }
          .tv-s04-checklist { grid-template-columns: 1fr; }
          .tv-s02-items { grid-template-columns: 1fr; }
          .tv-s10-cols { grid-template-columns: 1fr; }
          .tv-s08-human-content { padding: 40px 24px; }
          .tv-hero-ctas { flex-direction: column; }
          .tv-hero-ctas .tv-btn { width: 100%; }
          .tv-s11-ctas { flex-direction: column; }
          .tv-s11-ctas .tv-btn { width: 100%; }
          .tv-s08-hub { transform: scale(0.82); transform-origin: top center; margin-top: 16px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tv-reveal { opacity: 1; transform: none; transition: none; animation: none; }
        }
      `}</style>

      <section className="tv-hero">
        <img src="/services/travel/travelhero.png" alt="" className="tv-hero-img" fetchPriority="high" />
        <div className="tv-hero-overlay" aria-hidden="true" />
        <div className="tv-hero-content tv-reveal">
          <span className="tv-hero-eyebrow">TRAVEL &amp; HOSPITALITY</span>
          <h1>Intelligent operations behind every journey.</h1>
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
            <h2 className="tv-h2">Every journey creates thousands of moments that need to work.</h2>
          </div>
          <div className="tv-s02-grid tv-reveal">
            <div className="tv-s02-left">
              <p className="tv-lede">Travel businesses operate in an environment where customer expectations, operational complexity and commercial pressures intersect every day.</p>
              <p className="tv-copy">Behind every booking is a network of reservations, payments, schedules, customer interactions, baggage, disruptions, partners and financial transactions that must work together — often in real time.</p>
            </div>
            <div className="tv-s02-items">
              {landscapeItems.map((item) => (
                <div key={item.num} className="tv-s02-item">
                  <div className="tv-s02-item-head">
                    <div className="tv-s02-item-icon">{item.icon}</div>
                    <div className="tv-s02-num">{item.num}</div>
                  </div>
                  <div className="tv-s02-item-label">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="tv-s02-callout tv-reveal">
            <div className="tv-s02-callout-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M12 7.5v4M12 11.5l-5.5 5.5M12 11.5l5.5 5.5"/></svg>
            </div>
            <p>Sytrion connects people, processes, data and intelligence to keep journeys — and the operations behind them — moving.</p>
          </div>
        </div>
      </section>

      <section className="tv-s03">
        <div className="tv-wrap">
          <div className="tv-reveal">
            <TvLabel text="WHO WE SERVE" />
            <h2 className="tv-h2">Built around the businesses that make travel possible.</h2>
          </div>
          <div className="tv-s03-cols tv-reveal">
            {serveCols.map((col) => (
              <div key={col.label} className="tv-s03-col">
                <div className="tv-s03-icon" aria-hidden="true">{col.icon}</div>
                <h3 className="tv-s03-title">{col.label}</h3>
                <p className="tv-s03-desc">{col.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tv-s04" id="capabilities">
        <div className="tv-wrap">
          <div className="tv-reveal">
            <TvLabel text="INTELLIGENT BUSINESS SERVICES" />
            <h2 className="tv-h2">From individual transactions to connected journeys.</h2>
            <p className="tv-lede">Sytrion combines travel-domain expertise with intelligent workflows, automation, AI and data to help enterprises manage high-volume travel operations with greater speed, accuracy and control.</p>
          </div>
          <div className="tv-s04-tabbar tv-reveal" role="tablist">
            {tabs.map((t, i) => (
              <button key={t.num} role="tab" aria-selected={activeTab === i} className={activeTab === i ? "tv-tab-active" : ""} onClick={() => setActiveTab(i)}>
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
          <div className="tv-s05-head tv-reveal">
            <TvLabel text="TRAVELER EXPERIENCE" />
            <h2 className="tv-h2">Make every interaction feel effortless.</h2>
            <div className="tv-s05-lede-row">
              <p className="tv-lede">Travelers don&apos;t experience systems, processes or organizational boundaries.</p>
              <p className="tv-lede">They experience moments.</p>
            </div>
            <p className="tv-copy">From booking and departure to disruption and arrival, Sytrion helps travel organizations create connected service operations that make those moments easier to navigate.</p>
          </div>
          <div className="tv-s05-strip tv-reveal">
            {journeyStages.map((s, i) => (
              <div key={s.name} className="tv-s05-seg">
                <div className="tv-s05-icon">{s.icon}</div>
                <div className="tv-s05-label">{s.name}</div>
                <div className="tv-s05-sub">{s.sub}</div>
                {i < journeyStages.length - 1 && <div className="tv-s05-notch-bottom" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tv-s06">
        <div className="tv-wrap">
          <div className="tv-reveal">
            <TvLabel text="CORE TRAVEL OPERATIONS" />
            <TvLabel text="AIRLINE OPERATIONS" />
            <h2 className="tv-h2">Keeping complex airline operations connected.</h2>
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
        <div className="tv-s08-ai">
          <TvLabel text="AI THAT POWERS TRAVEL OPERATIONS" />
          <h2 style={{color:"#fff", textAlign:"center", fontSize:"clamp(28px, 3.5vw, 42px)", maxWidth:"none", width:"100%", fontFamily:"var(--font-syne), Arial, Helvetica, sans-serif", fontWeight:700, lineHeight:1.2, margin:"0 0 18px"}}>AI that works behind <span style={{ color: "#C6E84A" }}>every journey.</span></h2>
          <p style={{color:"rgba(255,255,255,0.55)", textAlign:"center", maxWidth:520, fontSize:15, lineHeight:1.7, marginTop:8}}>AI can help travel enterprises understand intent, automate repetitive processes, identify exceptions and help operational teams respond faster.</p>
          <div className="tv-s08-hub" style={{marginTop: 32}}>
            <div className="tv-s08-core">
              <span>SYTRION</span>
              <span>INTELLIGENCE</span>
            </div>
            {intelligenceNodes.slice(0, 6).map((node, i) => {
              const angle = (i * 60 - 90) * (Math.PI / 180);
              const r = 120;
              const cx = 140 + Math.cos(angle) * r;
              const cy = 140 + Math.sin(angle) * r;
              return (
                <div key={node.title} className="tv-s08-sat" style={{ left: cx, top: cy, transform: "translate(-50%, -50%)", position: "absolute" }}>
                  {node.icon}
                  <span className="tv-s08-sat-label">{node.title.replace(" Intelligence", "")}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="tv-s08-human">
          <div className="tv-s08-human-content">
            <TvLabel text="HUMAN + DIGITAL" light />
            <h2>Smarter travel should <span style={{ color: "#C6E84A" }}>still feel personal.</span></h2>
            <p className="tv-copy">Automation can handle repetitive requests.</p>
            <p className="tv-copy">AI can organize information and help surface what matters.</p>
            <p className="tv-copy">People bring judgment, context and empathy to complex travel situations.</p>
            <h3>Sytrion brings them together.</h3>
          </div>
        </div>
      </section>

      <section className="tv-s09">
        <div className="tv-wrap">
          <div className="tv-s09-head tv-reveal">
            <TvLabel text="WHEN PLANS CHANGE" />
            <h2 className="tv-h2">Turn disruption into intelligent service recovery.</h2>
            <p className="tv-lede">Travel disruptions create a cascade of operational decisions across schedules, bookings, travelers, channels and service teams.</p>
            <p className="tv-copy">Sytrion helps orchestrate the administrative workflows behind disruption management so teams can respond with greater speed and consistency.</p>
          </div>
          <div className="tv-s09-path tv-reveal">
            {disruptionSteps.map((s, i) => (
              <Fragment key={s.name}>
                {i > 0 && (
                  <div className="tv-s09-connector" aria-hidden="true">
                    <div className="tv-s09-connector-line" />
                    <div className="tv-s09-connector-arrow" />
                  </div>
                )}
                <div className="tv-s09-step">
                  <div className="tv-s09-node">{s.icon}</div>
                  <div className="tv-s09-name">{s.name}</div>
                  <div className="tv-s09-sub">{s.sub}</div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="tv-s10">
        <div className="tv-wrap">
          <div className="tv-reveal">
            <TvLabel text="THE OUTCOME" />
            <h2 className="tv-h2">Better operations create better journeys.</h2>
          </div>
          <div className="tv-s10-cols tv-reveal">
            {outcomes.map((o) => (
              <div key={o.num} className="tv-s10-col">
                <div className="tv-s10-icon" aria-hidden="true">{o.icon}</div>
                <div className="tv-s10-num">{o.num}</div>
                <h3 className="tv-s10-word">{o.word}</h3>
                <p className="tv-s10-sub">{o.sub}</p>
                <p className="tv-s10-desc">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tv-s11">
        <div className="tv-s11-content tv-reveal">
          <TvLabel text="LET'S MOVE TRAVEL FORWARD." />
          <h2>Ready to build smarter travel operations?</h2>
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
