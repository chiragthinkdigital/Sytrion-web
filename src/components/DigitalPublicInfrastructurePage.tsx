"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   SYTRION — DIGITAL PUBLIC INFRASTRUCTURE PAGE
   All copy verbatim from spec. No invented claims/metrics.
   Editorial guardrails enforced (no CRA/PFRDA claims, no flags).
   ───────────────────────────────────────────────────────────── */

const NAVY = "#0f0f0f";
const NAVY2 = "#1a1a1a";
const BLUE = "#C6E84A";
const CYAN = "#C6E84A";

const challengeList = [
  "Fragmented public systems",
  "Disconnected user journeys",
  "Complex identity and verification",
  "Siloed data ecosystems",
  "Manual service delivery",
  "Population-scale processing requirements",
];

const challengeLooks = [
  { color: "#6366F1", gradient: "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(99,102,241,0.04))" },
  { color: "#F59E0B", gradient: "linear-gradient(135deg, rgba(245,158,11,0.18), rgba(245,158,11,0.04))" },
  { color: "#10B981", gradient: "linear-gradient(135deg, rgba(16,185,129,0.18), rgba(16,185,129,0.04))" },
  { color: "#EF4444", gradient: "linear-gradient(135deg, rgba(239,68,68,0.18), rgba(239,68,68,0.04))" },
  { color: "#8B5CF6", gradient: "linear-gradient(135deg, rgba(139,92,246,0.18), rgba(139,92,246,0.04))" },
  { color: "#06B6D4", gradient: "linear-gradient(135deg, rgba(6,182,212,0.18), rgba(6,182,212,0.04))" },
];

const ecosystemModules = [
  { name: "IDENTITY", title: "Digital Identity", desc: "Create trusted digital interactions through identity, verification, authentication and credential workflows." },
  { name: "REGISTRIES", title: "Registries & Data", desc: "Build structured, reliable information foundations that enable connected services and trusted data." },
  { name: "DATA EXCHANGE", title: "Data Exchange", desc: "Enable secure information exchange across institutions, platforms and ecosystem participants." },
  { name: "SERVICES", title: "Digital Services", desc: "Create accessible digital experiences connecting people with essential services." },
  { name: "OPERATIONS", title: "Intelligent Operations", desc: "Support the high-volume processing, validation, reconciliation and exception management behind digital services." },
];

const impactCards = [
  { title: "Citizen Services", desc: "Simplifying access to essential services through connected digital experiences and intelligent workflows." },
  { title: "Social Security & Pensions", desc: "Building scalable digital foundations supporting pension administration, subscriber services, recordkeeping and social-security ecosystems." },
  { title: "Financial Inclusion", desc: "Enabling digital onboarding, identity, verification, transactions and access to financial ecosystems." },
  { title: "Health", desc: "Connecting information, participants and services across digital healthcare ecosystems." },
  { title: "Education & Skilling", desc: "Creating digital foundations that improve discovery, access, participation and administration." },
  { title: "Commerce & Mobility", desc: "Enabling interoperable networks connecting consumers, businesses, service providers and platforms." },
];

const capabilityTabs = [
  {
    tab: "Identity",
    title: "Identity",
    lead: "Create trusted foundations for digital interaction.",
    items: [
      "Digital onboarding",
      "Identity workflow integration",
      "Verification workflows",
      "Authentication integration",
      "Credential management support",
      "Identity lifecycle operations",
    ],
  },
  {
    tab: "Registries",
    title: "Registries",
    lead: "Create reliable information foundations.",
    items: [
      "Registry operations",
      "Data ingestion",
      "Master data management",
      "Data validation",
      "Record management",
      "Data-quality operations",
    ],
  },
  {
    tab: "Exchange",
    title: "Exchange",
    lead: "Connect information across ecosystems.",
    items: [
      "API integration",
      "Data-exchange workflows",
      "Consent-aware information flows",
      "Interoperability support",
      "Transaction orchestration",
      "Exception management",
    ],
  },
  {
    tab: "Services",
    title: "Services",
    lead: "Make essential services easier to access.",
    items: [
      "Digital applications",
      "Service portals",
      "Service-request workflows",
      "Document processing",
      "Status and notification workflows",
      "Omnichannel support",
    ],
  },
  {
    tab: "Operations",
    title: "Operations",
    lead: "Keep population-scale digital services moving.",
    items: [
      "Transaction processing",
      "Workflow management",
      "Validation",
      "Reconciliation",
      "Exception handling",
      "Operational support",
    ],
  },
  {
    tab: "Insights",
    title: "Insights",
    lead: "Turn ecosystem activity into actionable intelligence.",
    items: [
      "Operational dashboards",
      "Transaction analytics",
      "Service-performance insights",
      "Exception analytics",
      "Data-quality monitoring",
      "Decision support",
    ],
  },
];

const pensionJourney = [
  { name: "ONBOARD", long: "Subscriber Registration", items: ["Digital onboarding", "Application processing", "Information validation", "Document processing", "Account-creation support"] },
  { name: "MAINTAIN", long: "Subscriber Administration", items: ["Subscriber-data maintenance", "Account updates", "Service requests", "Document management", "Record validation"] },
  { name: "CONTRIBUTE", long: "Contribution Operations", items: ["Contribution data processing", "Transaction validation", "Contribution reconciliation", "Exception handling", "Status management"] },
  { name: "RECORD", long: "Recordkeeping Operations", items: ["Transaction records", "Subscriber-account information", "Data reconciliation", "Record maintenance", "Data-quality management"] },
  { name: "SERVICE", long: "Subscriber & Intermediary Services", items: ["Subscriber queries", "Service requests", "Intermediary support", "Transaction-status support", "Grievance-workflow administration"] },
  { name: "EXIT", long: "Withdrawal & Retirement Administration", items: ["Request-processing support", "Document validation", "Workflow administration", "Status tracking", "Exception management"] },
  { name: "ANALYZE", long: "Pension Operations Intelligence", items: ["Operational dashboards", "Contribution analytics", "Service-performance reporting", "Exception trends", "Data-quality monitoring"] },
];

const pensionEcosystem = [
  { name: "Subscribers", tip: "Plan members and beneficiaries" },
  { name: "Service & Access Channels", tip: "Portals, apps, and support desks" },
  { name: "Recordkeeping & Administration", tip: "Plan records, enrollment, and processing" },
  { name: "Contribution & Transaction Ecosystem", tip: "Payroll, contributions, and transfers" },
  { name: "Pension / Financial Institutions", tip: "Custodians, insurers, and asset managers" },
  { name: "Retirement & Service Ecosystem", tip: "Payouts, advice, and ongoing support" },
];

const intelligenceLayer = ["AI", "Automation", "Data", "Workflow", "Analytics"];

const openEcosystemLayers = [
  "People & Businesses",
  "Applications & Services",
  "Open APIs & Protocols",
  "Registries, Identity & Data Exchange",
  "Digital Public Infrastructure",
  "Institutions & Ecosystem Participants",
];

const aiNodes = [
  { title: "Document Intelligence", verbs: "Extract • Classify • Validate" },
  { title: "Service Intelligence", verbs: "Understand • Route • Assist" },
  { title: "Data Intelligence", verbs: "Clean • Connect • Enrich" },
  { title: "Workflow Intelligence", verbs: "Automate • Orchestrate • Resolve" },
  { title: "Risk & Anomaly Intelligence", verbs: "Identify • Prioritize • Review" },
  { title: "Decision Intelligence", verbs: "Analyze • Predict • Improve" },
];

const humanIconProps = { width: 52, height: 52, viewBox: "0 0 120 120", fill: "none", stroke: "#c9e94a", strokeWidth: 1.3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
const humanIcons = [
  <svg key="human-accessible" {...humanIconProps}><circle cx="60" cy="60" r="44" /><path d="M60 16v24M60 80v24M16 60h24M80 60h24" /><circle cx="60" cy="60" r="12" fill="#c9e94a" stroke="none" /></svg>,
  <svg key="human-inclusive" {...humanIconProps}><circle cx="40" cy="40" r="14" /><circle cx="80" cy="40" r="14" /><circle cx="60" cy="82" r="14" fill="#c9e94a" stroke="none" /><path d="M40 54L54 68M80 54L66 68" /></svg>,
  <svg key="human-connected" {...humanIconProps}><circle cx="24" cy="60" r="12" /><circle cx="60" cy="60" r="12" /><circle cx="96" cy="60" r="12" /><path d="M38 54l8 6-8 6M74 54l8 6-8 6" /></svg>,
];

const humanDigitalPillars = [
  { title: "Accessible by Design", desc: "Simple digital journeys." },
  { title: "Inclusive by Design", desc: "Services that work across diverse user needs." },
  { title: "Connected by Design", desc: "Fewer barriers between institutions and services." },
];

const serviceFlow = [
  { name: "DISCOVER", desc: "Find the right service" },
  { name: "IDENTIFY", desc: "Establish trusted identity" },
  { name: "APPLY", desc: "Submit information digitally" },
  { name: "VALIDATE", desc: "Verify data and documents" },
  { name: "PROCESS", desc: "Orchestrate workflows" },
  { name: "DELIVER", desc: "Complete the service" },
  { name: "INFORM", desc: "Provide status and communication" },
];

const trustPillars = [
  { title: "Secure Architecture", desc: "Security principles incorporated across systems and workflows." },
  { title: "Data Governance", desc: "Structured controls supporting responsible information management." },
  { title: "Privacy-Aware Design", desc: "Processes designed around appropriate access and data handling." },
  { title: "Resilient Operations", desc: "Operational models designed for availability, monitoring and continuity." },
];

const trustIconProps = { width: 32, height: 32, viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
const trustIcons = [
  <svg key="trust-shield" {...trustIconProps}><path d="M16 4l9 3.5V14c0 5.5-3.8 10.3-9 12-5.2-1.7-9-6.5-9-12V7.5L16 4z" /><circle cx="16" cy="13.5" r="3" fill="currentColor" stroke="none" /></svg>,
  <svg key="trust-governance" {...trustIconProps}><rect x="6" y="8" width="20" height="6" rx="3" /><rect x="6" y="15" width="20" height="6" rx="3" fill="currentColor" stroke="none" /><rect x="6" y="22" width="20" height="6" rx="3" /></svg>,
  <svg key="trust-privacy" {...trustIconProps}><path d="M3 16s4-8 13-8 13 8 13 8-4 8-13 8S3 16 3 16z" /><circle cx="16" cy="16" r="3.5" fill="currentColor" stroke="none" /></svg>,
  <svg key="trust-resilient" {...trustIconProps}><path d="M3 16h6l3-7 5 14 3-7h9" /></svg>,
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
  <svg key="accessible" {...outcomeIconProps}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  <svg key="connected" {...outcomeIconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>,
  <svg key="efficient" {...outcomeIconProps}><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M11 9h4" /><path d="M11 13h4" /><path d="M11 17h4" /><path d="M7 9h.01" /><path d="M7 13h.01" /><path d="M7 17h.01" /></svg>,
  <svg key="visible" {...outcomeIconProps}><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" /><circle cx="12" cy="12" r="3" /></svg>,
  <svg key="scalable" {...outcomeIconProps}><path d="M3 17.5l5.5-5.5 3.5 3.5L20.5 7" /><path d="M14.5 7h6v6" /></svg>,
  <svg key="innovative" {...outcomeIconProps}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>,
];

const outcomeTiles = [
  { label: "Accessible", title: "Easier access", desc: "Simpler digital journeys can make services easier to discover and use." },
  { label: "Connected", title: "Connected ecosystems", desc: "Interoperability reduces barriers between systems and institutions." },
  { label: "Efficient", title: "More efficient operations", desc: "Automation helps reduce repetitive administrative activity." },
  { label: "Visible", title: "Greater visibility", desc: "Connected data creates better operational transparency." },
  { label: "Scalable", title: "Built for scale", desc: "Modular digital foundations can evolve as participation and demand grow." },
  { label: "Innovative", title: "Enable innovation", desc: "Open, reusable building blocks allow new services and experiences to emerge." },
];

const dpiModelLayers = [
  { n: "01", title: "People & Ecosystems", items: "Citizens • Businesses • Institutions • Service Providers" },
  { n: "02", title: "Experience", items: "Portals • Applications • Assisted Channels • APIs" },
  { n: "03", title: "Intelligence", items: "AI • Automation • Document Intelligence • Analytics" },
  { n: "04", title: "Digital Building Blocks", items: "Identity • Registries • Data Exchange • Workflows" },
  { n: "05", title: "Operations", items: "Processing • Validation • Reconciliation • Exception Management" },
  { n: "06", title: "Outcomes", items: "Access • Trust • Efficiency • Scale • Inclusion" },
];

const whySytrion = [
  { n: "01", title: "Ecosystem Thinking", desc: "Solutions designed around interconnected participants rather than isolated systems.", icon: "/healthcare/domain led.svg" },
  { n: "02", title: "AI-First", desc: "Intelligence embedded into workflows, data and service operations.", icon: "/healthcare/ai first.svg" },
  { n: "03", title: "Technology + Operations", desc: "Digital platforms supported by the operational capabilities needed to make them work.", icon: "/healthcare/Human + Digital.svg" },
  { n: "04", title: "Interoperability", desc: "Architecture designed around integration, reusable components and connected ecosystems.", icon: "/healthcare/Data-driven.svg" },
  { n: "05", title: "Trust by Design", desc: "Security, governance and responsible data practices incorporated into delivery.", icon: "/healthcare/Secure by Design.svg" },
  { n: "06", title: "Built to Evolve", desc: "Modular approaches that can adapt as ecosystems and requirements change.", icon: "/healthcare/Built to Scale.svg" },
];

const transformPotential = [
  "Simpler digital journeys",
  "Reduced manual processing",
  "Better data quality",
  "Greater service visibility",
  "More scalable operations",
];

function Eyebrow({ text, dark }: { text: string; dark?: boolean }) {
  return (
    <span className={"dpi-eyebrow" + (dark ? " dpi-eyebrow--dark" : "")}>{text}</span>
  );
}

/* --- Capability preview glyphs -----------------------------------------
   One icon per capability tab, rendered inside the same dark card frame.
   Icon language stays constant across variants: thin lime strokes,
   hollow circles for nodes, filled circles for emphasis. */
function CapabilityIcon({ variant }: { variant: string }) {
  const color = "currentColor";
  const line = { fill: "none" as const, stroke: color, strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const node = { fill: "none" as const, stroke: color, strokeWidth: 1.5 };
  const dot = { fill: color, stroke: "none" as const };

  switch (variant) {
    case "identity":
      return (
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke={color} strokeWidth="1.5">
          <circle cx="60" cy="60" r="44" {...node} />
          <path d="M60 16v24M60 80v24M16 60h24M80 60h24" {...line} />
          <circle cx="60" cy="60" r="12" {...dot} />
          <circle cx="60" cy="16" r="5" {...dot} />
          <circle cx="60" cy="104" r="5" {...dot} />
          <circle cx="16" cy="60" r="5" {...dot} />
          <circle cx="104" cy="60" r="5" {...dot} />
        </svg>
      );
    case "registries":
      return (
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke={color} strokeWidth="1.5">
          <rect x="30" y="30" width="60" height="15" rx="7.5" {...node} />
          <rect x="30" y="52.5" width="60" height="15" rx="7.5" fill={color} stroke="none" />
          <rect x="30" y="75" width="60" height="15" rx="7.5" {...node} />
        </svg>
      );
    case "exchange":
      return (
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke={color} strokeWidth="1.5">
          <circle cx="26" cy="60" r="15" {...node} />
          <circle cx="94" cy="60" r="15" {...node} />
          <path d="M42 48h30" {...line} />
          <path d="M72 43l6 5-6 5" {...line} />
          <path d="M78 72H48" {...line} />
          <path d="M48 67l-6 5 6 5" {...line} />
        </svg>
      );
    case "services":
      return (
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke={color} strokeWidth="1.5">
          <circle cx="40" cy="34" r="14" {...node} />
          <circle cx="80" cy="34" r="14" {...node} />
          <circle cx="60" cy="88" r="14" {...dot} />
          <path d="M40 48L54 74" {...line} />
          <path d="M80 48L66 74" {...line} />
        </svg>
      );
    case "operations":
      return (
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke={color} strokeWidth="1.5">
          <circle cx="24" cy="60" r="12" {...node} />
          <circle cx="60" cy="60" r="12" {...node} />
          <circle cx="96" cy="60" r="12" {...node} />
          <path d="M38 54l8 6-8 6" {...line} />
          <path d="M74 54l8 6-8 6" {...line} />
        </svg>
      );
    case "insights":
      return (
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke={color} strokeWidth="1.5">
          <rect x="32" y="58" width="16" height="30" fill={color} stroke="none" fillOpacity="0.4" />
          <rect x="60" y="43" width="16" height="45" fill={color} stroke="none" fillOpacity="0.7" />
          <rect x="88" y="24" width="16" height="64" fill={color} stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

export default function DigitalPublicInfrastructurePage() {
  const [capTab, setCapTab] = useState(0);
  const [pensionStep, setPensionStep] = useState(0);
  const [pensionHover, setPensionHover] = useState<number | null>(null);
  const pensionShown = pensionHover ?? pensionStep;
  const revealRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = revealRef.current;
    if (!root) return;
    const targets = root.querySelectorAll(".dpi-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("dpi-in");
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
    <div className="dpi-page" ref={revealRef}>
      <style>{`
        .dpi-page { --n:${NAVY}; --n2:${NAVY2}; --b:${BLUE}; --c:${CYAN}; color:#1a1a1a; background:#fafaf8; font-family: var(--font-geist-sans), Arial, sans-serif; }
        .dpi-page * { box-sizing: border-box; }
        .dpi-wrap { max-width: 1400px; margin: 0 auto; padding: 0 clamp(20px, 4vw, 40px); }
        .dpi-section { padding: clamp(76px, 9vw, 128px) 0; }
        .dpi-eyebrow { display: inline-block; background:${BLUE}; color:#0f0f0f; padding: 8px 20px; border-radius: 999px; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 24px; }
        .dpi-eyebrow--dark { color:#C6E84A; background:rgba(198,232,74,0.18); }
        .dpi-h1 { font-family: var(--font-syne), Arial, sans-serif; font-size: clamp(40px, 5.5vw, 72px); line-height: 1.05; font-weight: 700; letter-spacing: -0.02em; color:#fff; margin: 0 0 24px; }
        .dpi-h2 { font-family: var(--font-syne), Arial, sans-serif; font-size: clamp(30px, 4.4vw, 54px); line-height: 1.08; font-weight: 700; letter-spacing: -0.02em; color:#1a1a1a; margin: 0 0 24px; }
        .dpi-section-dark .dpi-h2, .dpi-section-navy .dpi-h2 { color:#fff; }
        .dpi-eco-band .dpi-h2, .dpi-pension .dpi-h2, .dpi-open .dpi-h2, .dpi-ai .dpi-h2, .dpi-trust .dpi-h2, .dpi-model .dpi-h2 { color:#fff; }
        .dpi-eco-band .dpi-body, .dpi-pension .dpi-body, .dpi-open .dpi-body, .dpi-ai .dpi-body, .dpi-trust .dpi-body, .dpi-model .dpi-body { color:rgba(255,255,255,0.72); }
        .dpi-sub { font-size: clamp(19px, 2.2vw, 24px); line-height: 1.5; color:rgba(255,255,255,0.85); max-width: 60ch; margin: 0 0 16px; }
        .dpi-body { font-size: 17px; line-height: 1.75; color:#5A5D66; max-width: 62ch; margin: 0; }
        .dpi-section-dark .dpi-body, .dpi-section-navy .dpi-body { color:rgba(255,255,255,0.72); }
        .dpi-btn { display:inline-flex; align-items:center; gap:10px; padding: 15px 30px; border-radius:999px; font-size:15px; font-weight:700; text-decoration:none; transition: transform .25s ease, box-shadow .25s ease, background .25s ease, color .25s ease; }
        .dpi-btn--primary { background:${BLUE}; color:#0f0f0f; }
        .dpi-btn--primary:hover { background:#d9f46b; color:#0f0f0f; transform: translateY(-2px); box-shadow: 0 10px 30px rgba(198,232,74,0.3); }
        .dpi-btn--ghost { background:transparent; color:#fff; border:1.5px solid rgba(255,255,255,0.4); }
        .dpi-btn--ghost:hover { background:#fff; color:#1a1a1a; transform: translateY(-2px); }
        .dpi-reveal { opacity:0; transform: translateY(26px); transition: opacity .8s ease, transform .8s ease; }
        .dpi-reveal.dpi-in { opacity:1; transform:none; }
        .dpi-hero { position:relative; overflow:hidden; background:linear-gradient(115deg, ${NAVY} 0%, ${NAVY2} 55%, #14263f 100%); padding: clamp(110px, 13vh, 150px) 0 clamp(70px, 8vh, 100px); display:flex; align-items:center; min-height:100dvh; }
        .dpi-hero > .dpi-wrap { width:100%; }
        .dpi-hero-bg { position:absolute; inset:0; z-index:0; }
        .dpi-hero-video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
        .dpi-hero-inner { position:relative; z-index:2; max-width: 720px; text-align:left; margin:0; }
        .dpi-hero-ctas { display:flex; flex-wrap:wrap; gap:16px; margin-top:32px; justify-content:flex-start; }

        .dpi-land-grid { margin-bottom: 0; }
        .dpi-land-row { display: grid; grid-template-columns: 1fr 1.1fr; gap: 80px; align-items: start; margin-top: 40px; }
        .dpi-land-section { position: relative; padding-bottom: clamp(40px, 5vw, 60px); background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #f0fdf4 100%); }
        .dpi-land-section::before { content: ""; position: absolute; top: 80px; right: 60px; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%); pointer-events: none; }
        .dpi-land-section::after { content: ""; position: absolute; bottom: 40px; left: 100px; width: 300px; height: 300px; border-radius: 50%; background: radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%); pointer-events: none; }
        .dpi-land-text p { color: #5B6472; max-width: 440px; font-size: 19px; font-weight: 400; line-height: 1.8; margin: 0 0 12px; }
        .dpi-land-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .dpi-challenge-card {
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
        .dpi-challenge-card::before { content: ""; position: absolute; inset: 0; border-radius: 16px; opacity: 0; transition: opacity .3s ease; pointer-events: none; }
        .dpi-challenge-card:hover { transform: translateY(-5px) scale(1.01); box-shadow: 0 16px 40px -10px rgba(10,22,40,0.14), inset 0 1px 0 rgba(255,255,255,0.8); border-color: rgba(255,255,255,0.9); }
        .dpi-challenge-card:hover::before { opacity: 1; }
        .dpi-challenge-top { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
        .dpi-challenge-icon {
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
        .dpi-challenge-icon::after { content: ""; position: absolute; inset: 0; border-radius: 12px; background: inherit; filter: blur(10px); opacity: 0.35; z-index: -1; transition: opacity .3s ease; }
        .dpi-challenge-card:hover .dpi-challenge-icon::after { opacity: 0.55; }
        .dpi-challenge-icon svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
        .dpi-challenge-label { font-size: 15px; font-weight: 600; color: #1A2540; line-height: 1.4; }
        .dpi-approach {
          margin-top: 48px;
          background: linear-gradient(135deg, #0B1D35 0%, #132742 40%, #0F2035 100%);
          border-radius: 20px;
          padding: 44px 48px 40px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 40px -12px rgba(10,22,40,0.25);
        }
        .dpi-approach::before { content: ""; position: absolute; top: -60px; right: -40px; width: 260px; height: 260px; border-radius: 50%; background: radial-gradient(circle, rgba(196,229,56,0.12) 0%, transparent 70%); pointer-events: none; }
        .dpi-approach::after { content: ""; position: absolute; bottom: -40px; left: 30%; width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%); pointer-events: none; }
        .dpi-approach-top { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; position: relative; z-index: 1; }
        .dpi-approach-dot { width: 8px; height: 8px; border-radius: 50%; background: #C4E538; flex-shrink: 0; box-shadow: 0 0 12px rgba(196,229,56,0.5); }
        .dpi-approach-label { font-size: 11px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: rgba(196,229,56,0.7); }
        .dpi-approach-text { font-size: clamp(18px, 1.8vw, 26px); line-height: 1.4; color: rgba(255,255,255,0.92); font-weight: 500; margin: 0; position: relative; z-index: 1; }
        .dpi-approach-text em { font-style: normal; color: #C4E538; font-weight: 600; }

        .dpi-eco-band { background:linear-gradient(160deg, ${NAVY} 0%, ${NAVY2} 100%); }
        .dpi-eco-grid { display:grid; grid-template-columns: repeat(5, 1fr); gap:20px; margin-top:48px; }
        .dpi-eco-module { border:1px solid rgba(255,255,255,0.12); border-radius:16px; padding:28px 24px; background:rgba(255,255,255,0.03); position:relative; }
        .dpi-eco-arrow { color:${CYAN}; margin-top:14px; font-size:18px; }
        .dpi-eco-name { font-size:11.5px; font-weight:700; letter-spacing:0.14em; color:${CYAN}; margin:0 0 14px; }
        .dpi-eco-title { font-family: var(--font-syne), Arial, sans-serif; font-size:18px; font-weight:700; color:#fff; margin:0 0 10px; }
        .dpi-eco-desc { font-size:14px; line-height:1.6; color:rgba(255,255,255,0.7); margin:0; }

        .dpi-impact-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap:24px; margin-top:48px; }
        .dpi-impact-card { position:relative; overflow:hidden; border-radius:18px; aspect-ratio: 4/3; }
        .dpi-impact-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
        .dpi-impact-overlay { position:absolute; inset:0; background:linear-gradient(180deg, rgba(15,15,15,0.05) 30%, rgba(15,15,15,0.82) 100%); }
        .dpi-impact-body { position:absolute; left:0; right:0; bottom:0; padding:26px; }
        .dpi-impact-title { font-family: var(--font-syne), Arial, sans-serif; font-size:22px; font-weight:700; color:#fff; margin:0 0 8px; }
        .dpi-impact-desc { font-size:14.5px; line-height:1.55; color:rgba(255,255,255,0.85); margin:0; }

        .dpi-cap-tabs { display:flex; flex-wrap:wrap; gap:8px; margin:44px 0 34px; border-bottom:1px solid rgba(15,15,15,0.1); padding-bottom:14px; }
        .dpi-cap-tab { appearance:none; background:transparent; border:none; cursor:pointer; font-family:inherit; font-size:15px; font-weight:600; color:#8A8D96; padding:12px 20px; position:relative; transition:color .25s ease; }
        .dpi-cap-tab::after { content:""; position:absolute; left:20px; right:20px; bottom:-15px; height:3px; border-radius:2px; background:${CYAN}; transform:scaleX(0); transform-origin:left; transition:transform .35s cubic-bezier(.16,1,.3,1); }
        .dpi-cap-tab:hover { color:#242424; }
        .dpi-cap-tab--active { color:#1a1a1a; }
        .dpi-cap-tab--active::after { transform:scaleX(1); }
        .dpi-cap-panel { display:grid; grid-template-columns: 1.05fr 1fr; gap:clamp(32px,5vw,72px); align-items:center; }
        .dpi-cap-num { font-family: var(--font-syne), Arial, sans-serif; font-size:15px; font-weight:700; color:${CYAN}; display:block; margin:0 0 12px; }
        .dpi-cap-panel-title { font-family: var(--font-syne), Arial, sans-serif; font-size:clamp(24px,2.8vw,34px); font-weight:700; color:#1a1a1a; margin:0 0 12px; }
        .dpi-cap-lead { font-style:italic; font-size:16.5px; color:#5A5D66; margin:0 0 22px; }
        .dpi-cap-list { list-style:none; margin:0 0 0 -18px; padding:0; display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:0 clamp(20px,3vw,40px); }
        .dpi-cap-item { display:flex; align-items:baseline; gap:12px; padding:11px 0; font-size:15px; color:#1a1a1a; border-bottom:1px solid rgba(15,15,15,0.08); }
        .dpi-cap-item::before { content:""; width:7px; height:7px; flex:0 0 auto; border-radius:50%; background:${CYAN}; align-self:center; margin-left:18px; }
        .dpi-cap-visual { position:relative; border-radius:16px; overflow:hidden; min-height:420px; background:linear-gradient(135deg, #2b2f1a 0%, #0d0f08 100%); display:flex; align-items:center; justify-content:center; }
        .dpi-cap-glyph { position:relative; z-index:2; color:#c9e94a; animation: dpiGlyphIn 0.22s cubic-bezier(0.16,1,0.3,1); }
        @keyframes dpiGlyphIn { from { opacity:0; transform: scale(0.95); } to { opacity:1; transform:none; } }

        /* --- Pension & Social Security --- */
        .dpi-pension { background:linear-gradient(160deg, #1f1f1f 0%, ${NAVY} 60%, ${NAVY2} 100%); }
        .dpi-pension-head { margin-bottom:44px; }
        .dpi-pension-cols { display:grid; grid-template-columns: 1.1fr 1fr; gap:clamp(36px,6vw,80px); align-items:center; }
        .dpi-pension-text .dpi-body + .dpi-body { margin-top:16px; }
        .dpi-pension-text .dpi-btn { display:inline-flex; }
        .dpi-visual-tile { position:relative; border-radius:18px; overflow:hidden; height:320px; background:linear-gradient(150deg, rgba(198,232,74,0.35), rgba(15,15,15,0.6)), ${NAVY}; }
        .dpi-visual-tile::after { content:""; position:absolute; inset:0; background:linear-gradient(176deg, rgba(15,15,15,0) 40%, rgba(15,15,15,0.75) 100%); pointer-events:none; }
        .dpi-visual-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
        .dpi-visual-label { position:absolute; left:24px; bottom:22px; z-index:2; font-size:11.5px; font-weight:700; letter-spacing:0.18em; color:${CYAN}; }
        .dpi-pension-steps { display:flex; flex-wrap:wrap; gap:10px; margin-top:52px; border-top:1px solid rgba(255,255,255,0.12); padding-top:30px; }
        .dpi-pstep { appearance:none; background:transparent; border:none; cursor:pointer; display:inline-flex; align-items:center; gap:10px; padding:11px 18px; border-radius:999px; border:1px solid rgba(255,255,255,0.2); color:rgba(255,255,255,0.6); font-family:inherit; font-size:13.5px; font-weight:600; transition: all .25s ease; }
        .dpi-pstep-num { font-family: var(--font-syne), Arial, sans-serif; font-size:12px; font-weight:700; color:${CYAN}; transition: color .25s ease; }
        .dpi-pstep:hover { background:${BLUE}; border-color:${BLUE}; color:${NAVY}; transform:translateY(-2px); }
        .dpi-pstep:hover .dpi-pstep-num { color:${NAVY}; }
        .dpi-pstep--active { background:transparent; border-color:rgba(255,255,255,0.2); color:rgba(255,255,255,0.6); }
        .dpi-pstep--active:hover { transform:translateY(-2px); }
        .dpi-pstep--active .dpi-pstep-num { color:${CYAN}; }
        .dpi-pstep-detail { margin-top:38px; display:grid; grid-template-columns: 1fr 1.2fr; gap:clamp(24px,4vw,56px); align-items:start; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:32px; }
        .dpi-pstep-list { list-style:none; margin:0; padding:0; display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:0 clamp(20px,3vw,40px); }
        .dpi-pstep-list li { position:relative; padding:11px 0 11px 22px; font-size:15px; color:rgba(255,255,255,0.85); border-bottom:1px solid rgba(255,255,255,0.1); }
        .dpi-pstep-list li::before { content:""; position:absolute; left:0; top:20px; width:7px; height:7px; border-radius:50%; background:${CYAN}; }

        /* --- 07 Pension Ecosystem --- */
        .dpi-ecosys { background:#fafaf8; }
        .dpi-ecosys-flow { position:relative; display:grid; grid-template-columns: repeat(6, 1fr); gap:0; margin-top:56px; background:linear-gradient(135deg, #2b2f1a, #0d0f08); border-radius:20px; padding:44px 36px 40px; }
        .dpi-ecosys-line { position:absolute; top:65px; left:6%; width:88%; height:1px; background:rgba(201,233,74,0.28); pointer-events:none; z-index:1; }
        .dpi-ecosys-node { position:relative; display:flex; flex-direction:column; align-items:center; gap:12px; cursor:pointer; z-index:2; }
        .dpi-ecosys-circle { width:42px; height:42px; border-radius:50%; border:1.5px solid #c9e94a; background:#0d0f08; transition:transform .25s cubic-bezier(.16,1,.3,1), box-shadow .25s ease, background .25s ease; }
        .dpi-ecosys-node--filled .dpi-ecosys-circle { background:#c9e94a; }
        .dpi-ecosys-node:hover .dpi-ecosys-circle { transform:scale(1.18); box-shadow:0 0 0 7px rgba(201,233,74,0.16); }
        .dpi-ecosys-node--filled:hover .dpi-ecosys-circle { box-shadow:0 0 0 7px rgba(201,233,74,0.28); }
        .dpi-ecosys-node-name { font-family: var(--font-syne), Arial, sans-serif; font-size:13.5px; font-weight:600; text-align:center; color:#f2f3ea; max-width:130px; line-height:1.35; transition:color .25s ease; }
        .dpi-ecosys-node:hover .dpi-ecosys-node-name { color:#c9e94a; }
        .dpi-ecosys-tip { position:absolute; left:50%; bottom:calc(100% + 12px); transform:translateX(-50%) translateY(4px); background:#17170f; border:0.5px solid rgba(201,233,74,0.3); border-radius:8px; color:#e7e9db; font-size:11.5px; line-height:1.45; text-align:center; max-width:170px; width:max-content; padding:8px 12px; opacity:0; pointer-events:none; transition:opacity .2s ease, transform .2s ease; z-index:5; }
        .dpi-ecosys-tip::after { content:""; position:absolute; top:100%; left:50%; margin-left:-5px; border:5px solid transparent; border-top-color:rgba(201,233,74,0.3); }
        .dpi-ecosys-node:hover .dpi-ecosys-tip { opacity:1; transform:translateX(-50%) translateY(0); }
        .dpi-ecosys-node:first-child .dpi-ecosys-tip { left:auto; right:0; transform:translateY(4px); }
        .dpi-ecosys-node:first-child:hover .dpi-ecosys-tip { transform:translateY(0); }
        .dpi-ecosys-node:last-child .dpi-ecosys-tip { left:0; transform:translateY(4px); }
        .dpi-ecosys-node:last-child:hover .dpi-ecosys-tip { transform:translateY(0); }
        .dpi-ilband { margin-top:34px; background:linear-gradient(90deg, rgba(201,233,74,0.14), rgba(201,233,74,0.04)); border:1px solid rgba(201,233,74,0.25); border-radius:16px; padding:20px 28px; display:flex; align-items:center; gap:14px; flex-wrap:wrap; }
        .dpi-ilband-label { font-size:12px; font-weight:700; letter-spacing:0.14em; color:#6b8a1a; }
        .dpi-ilband-item { display:inline-flex; align-items:center; gap:8px; background:#fff; border:0.5px solid #e5e4dc; border-radius:100px; padding:7px 16px; font-size:13px; font-weight:600; color:#1a1a1a; }
        .dpi-ilband-item::before { content:""; width:5px; height:5px; border-radius:50%; background:#c9e94a; flex:0 0 auto; }

        /* --- 08 Open Digital Ecosystems --- */
        .dpi-section-cols { display:grid; grid-template-columns: 1fr 1fr; }
        .dpi-col { min-width:0; }
        .dpi-open, .dpi-ai { padding: clamp(76px, 8vw, 120px) 0; height:100%; }
        .dpi-open { background:linear-gradient(180deg, ${NAVY} 0%, #141414 100%); }
        .dpi-open-stack { margin-top:48px; position:relative; }
        .dpi-open-layer { display:flex; align-items:center; gap:18px; border:1px solid rgba(255,255,255,0.14); border-bottom:none; padding:26px 30px; background:rgba(255,255,255,0.03); position:relative; transition:border-color .3s ease, background .3s ease, transform .3s cubic-bezier(.16,1,.3,1); }
        .dpi-open-layer:last-child { border-bottom:1px solid rgba(255,255,255,0.14); }
        .dpi-open-layer:hover { background:rgba(198,232,74,0.1); border-color:rgba(198,232,74,0.55); transform:translateX(6px); }
        .dpi-open-layer:hover .dpi-open-layer-num { color:#fff; }
        .dpi-open-layer:hover .dpi-open-layer-name { color:#c9e94a; }
        .dpi-open-layer-num { font-family: var(--font-syne), Arial, sans-serif; font-size:13px; font-weight:700; color:${CYAN}; min-width:34px; transition:color .3s ease; }
        .dpi-open-layer-name { font-family: var(--font-syne), Arial, sans-serif; font-size:19px; font-weight:700; color:#fff; transition:color .3s ease; }

        /* --- 09 AI + DPI --- */
        .dpi-ai { background:linear-gradient(150deg, #141414 0%, #141414 60%, ${NAVY2} 100%); }
        .dpi-ai-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap:20px; margin-top:48px; }
        .dpi-ai-node { border:1px solid rgba(198,232,74,0.25); border-radius:14px; padding:24px; background:rgba(15,15,15,0.5); transition:border-color .3s ease, background .3s ease, transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s ease; }
        .dpi-ai-node:hover { background:rgba(198,232,74,0.08); border-color:rgba(198,232,74,0.6); transform:translateY(-4px); box-shadow:0 16px 40px -16px rgba(198,232,74,0.25); }
        .dpi-ai-title { font-family: var(--font-syne), Arial, sans-serif; font-size:17px; font-weight:700; color:#fff; margin:0 0 8px; transition:color .3s ease; }
        .dpi-ai-node:hover .dpi-ai-title { color:#c9e94a; }
        .dpi-ai-verbs { font-size:13px; letter-spacing:0.04em; color:${CYAN}; transition:color .3s ease; }
        .dpi-ai-node:hover .dpi-ai-verbs { color:#fff; }

        /* --- 10 Human + Digital --- */
        .dpi-human { background:#fafaf8; }
        .dpi-human-panel { display:grid; grid-template-columns: repeat(3, 1fr); gap:0; margin-top:48px; background:linear-gradient(135deg, #2b2f1a, #0d0f08); border-radius:20px; padding:40px clamp(24px, 3vw, 36px); }
        .dpi-human-feature { padding:0 clamp(20px, 2.4vw, 32px); }
        .dpi-human-feature:first-child { padding-left:0; }
        .dpi-human-feature + .dpi-human-feature { border-left:1px solid rgba(201,233,74,0.18); }
        .dpi-human-icon { margin-bottom:18px; }
        .dpi-human-title { font-family: var(--font-syne), Arial, sans-serif; font-size:16px; font-weight:600; color:#f2f3ea; margin:0 0 8px; }
        .dpi-human-desc { font-size:13.5px; line-height:1.55; color:#a9ab9a; margin:0; }
        .dpi-human-closer { font-size:20px; font-weight:700; color:${BLUE}; margin-top:40px; }

        /* --- 11 Intelligent Service Delivery --- */
        .dpi-service { background:#fafaf8; }
        .dpi-service-flow { margin-top:52px; background:linear-gradient(135deg, #2b2f1a, #0d0f08); border-radius:20px; padding:20px 44px; }
        .dpi-service-rail { position:relative; display:flex; height:330px; }
        .dpi-service-rail-line { position:absolute; top:50%; left:0; right:0; height:2px; transform:translateY(-50%); background:linear-gradient(90deg, rgba(201,233,74,0.12), rgba(201,233,74,0.95)); border-radius:2px; z-index:0; }
        .dpi-service-step { position:relative; flex:1; height:100%; }
        .dpi-service-node { position:absolute; top:50%; left:50%; width:13px; height:13px; border-radius:50%; background:#c9e94a; transform:translate(-50%,-50%); z-index:2; }
        .dpi-service-stem { position:absolute; left:50%; width:1px; background:rgba(201,233,74,0.35); z-index:1; }
        .dpi-service-stem--up { bottom:50%; height:46px; }
        .dpi-service-stem--down { top:50%; height:46px; }
        .dpi-service-label { position:absolute; left:50%; transform:translateX(-50%); width:168px; text-align:center; z-index:2; }
        .dpi-service-label--up { bottom:calc(50% + 46px); }
        .dpi-service-label--down { top:calc(50% + 46px); }
        .dpi-service-num { display:block; font-family: var(--font-syne), Arial, sans-serif; font-size:22px; font-weight:800; color:#c9e94a; text-shadow:0 0 18px rgba(201,233,74,0.5); margin-bottom:4px; }
        .dpi-service-name { font-family: var(--font-syne), Arial, sans-serif; font-size:13.5px; font-weight:700; letter-spacing:0.03em; text-transform:uppercase; color:#f6f7ef; margin:0 0 6px; }
        .dpi-service-desc { font-size:12.5px; color:#a9ab9a; margin:0; line-height:1.45; }

        /* --- 12 Trust, Security & Governance --- */
        .dpi-trust { background:linear-gradient(160deg, ${NAVY} 0%, ${NAVY2} 100%); }
        .dpi-trust-stage { position:relative; margin-top:48px; padding:0 40px; }
        .dpi-trust-grid { position:relative; display:grid; grid-template-columns: repeat(2, 1fr); gap:64px 72px; }
        .dpi-trust-line-h, .dpi-trust-line-v { position:absolute; background:rgba(201,233,74,0.22); pointer-events:none; z-index:1; }
        .dpi-trust-line-h { left:0; right:0; top:50%; height:1px; }
        .dpi-trust-line-v { top:0; bottom:0; left:50%; width:1px; }
        .dpi-trust-pillar { background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-radius:16px; padding:26px 24px; }
        .dpi-trust-icon { width:32px; height:32px; color:#c9e94a; margin-bottom:14px; }
        .dpi-trust-title { font-family: var(--font-syne), Arial, sans-serif; font-size:16px; font-weight:700; color:#f6f7ef; margin:0 0 8px; }
        .dpi-trust-desc { font-size:13.5px; line-height:1.6; color:#9a9c8d; margin:0; }
        .dpi-trust-hub { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); z-index:3; display:flex; flex-direction:column; align-items:center; gap:12px; }
        .dpi-trust-hub-circle { width:108px; height:108px; border-radius:50%; background:radial-gradient(circle at 35% 30%, #3a4420, #0a0b06 70%); border:1.5px solid #c9e94a; box-shadow:0 0 0 10px rgba(201,233,74,0.06), 0 0 40px rgba(201,233,74,0.15); display:flex; align-items:center; justify-content:center; color:#c9e94a; }
        .dpi-trust-hub-label { background:#0a0b06; border:1px solid rgba(201,233,74,0.35); color:#fff; font-size:12px; font-weight:700; letter-spacing:0.08em; padding:8px 18px; border-radius:999px; white-space:nowrap; }

        /* --- 13 Outcomes --- */
        .dpi-outcomes { background:#fafaf8; }
        .dpi-out-grid { display:grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap:24px; margin-top:56px; }
        .dpi-outcome { position:relative; overflow:hidden; background:#ffffff; border:1px solid rgba(12,27,48,0.08); border-radius:20px; padding:clamp(28px,2.5vw,36px); display:flex; flex-direction:column; box-shadow:0 4px 20px -6px rgba(12,27,48,0.04); transition:transform .35s cubic-bezier(.16,1,.3,1), border-color .35s ease, box-shadow .35s ease; }
        .dpi-outcome::after { content:""; position:absolute; left:0; right:0; bottom:0; height:3px; background:linear-gradient(90deg, #7AA306, #C6E84A); opacity:0; transition:opacity .35s ease; }
        .dpi-outcome:hover { transform:translateY(-6px); border-color:rgba(122,163,6,0.35); box-shadow:0 24px 48px -18px rgba(12,27,48,0.12); }
        .dpi-outcome:hover::after { opacity:1; }
        .dpi-outcome-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; }
        .dpi-outcome-icon { width:48px; height:48px; border-radius:14px; background:rgba(198,232,74,0.12); border:1px solid rgba(122,163,6,0.2); display:flex; align-items:center; justify-content:center; color:#618300; transition:background .35s ease, border-color .35s ease, color .35s ease, transform .35s ease; }
        .dpi-outcome:hover .dpi-outcome-icon { background:#C6E84A; border-color:#C6E84A; color:#0C1B30; transform:scale(1.06); }
        .dpi-outcome-word { font-family: var(--font-syne), Arial, sans-serif; font-size:clamp(22px,2.2vw,28px); font-weight:700; letter-spacing:-0.01em; color:#0C1B30; margin:0; }
        .dpi-outcome-sub { font-size:15px; font-weight:600; color:#7AA306; margin:6px 0 0; }
        .dpi-outcome-desc { font-size:14.5px; line-height:1.65; color:#5A6B7F; margin:12px 0 0; }

        /* --- 14 Sytrion DPI Model --- */
        .dpi-model { background:linear-gradient(180deg, #0d0f0a 0%, #141414 100%); }
        .dpi-stack { display:flex; flex-direction:column; gap:12px; margin-top:56px; }
        .dpi-layer { display:grid; grid-template-columns:90px 320px 1fr; align-items:center; gap:20px; border-radius:14px; padding:24px 30px; background:#10294A; border:1px solid rgba(198,232,74,0.12); transition:border-color .3s ease, transform .3s cubic-bezier(.16,1,.3,1); }
        .dpi-layer:hover { background:#C6E84A; border-color:rgba(198,232,74,0.8); box-shadow:0 0 40px -6px rgba(198,232,74,0.4); transform:translateX(6px); }
        .dpi-layer:hover .dpi-layer-num, .dpi-layer:hover .dpi-layer-title, .dpi-layer:hover .dpi-layer-items { color:#0C1B30; }
        .dpi-layer-num { font-family: var(--font-syne), Arial, sans-serif; font-size:13px; font-weight:700; color:${CYAN}; font-variant-numeric:tabular-nums; }
        .dpi-layer-title { font-family: var(--font-syne), Arial, sans-serif; font-size:16px; font-weight:700; letter-spacing:0.04em; text-transform:uppercase; color:#ffffff; }
        .dpi-layer-items { font-size:12.5px; letter-spacing:0.05em; color:rgba(255,255,255,0.62); }

        /* --- 15 Why Sytrion --- */
        .dpi-why { background:#FAFBFC; }
        .dpi-why-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap:24px; margin-top:56px; }
        .dpi-why-card { position:relative; border-radius:16px; padding:28px 24px 26px; background:#FFF; border:2px solid #D1D9E6; display:flex; flex-direction:column; transition:transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s ease; }
        .dpi-why-card::after { content:""; position:absolute; left:0; right:0; bottom:0; height:3px; border-radius:0 0 16px 16px; background:linear-gradient(90deg, #7AA306, #C6E84A); opacity:0; transition:opacity .35s ease; }
        .dpi-why-card:hover { transform:translateY(-4px); box-shadow:0 12px 30px -12px rgba(10,22,40,0.12); }
        .dpi-why-card:hover::after { opacity:1; }
        .dpi-why-head { display:flex; align-items:center; gap:16px; margin-bottom:14px; }
        .dpi-why-head-text { display:flex; flex-direction:column; }
        .dpi-why-icon { width:64px; height:64px; border-radius:16px; background:rgba(198,232,74,0.12); border:1px solid rgba(122,163,6,0.2); display:flex; align-items:center; justify-content:center; color:#618300; flex:0 0 auto; transition:background .35s ease, border-color .35s ease, color .35s ease, transform .35s ease; }
        .dpi-why-card:hover .dpi-why-icon { background:#C6E84A; border-color:#C6E84A; color:#0C1B30; transform:scale(1.06); }
        .dpi-why-num { font-family: var(--font-syne), Arial, sans-serif; font-size:12px; font-weight:700; letter-spacing:0.16em; color:#7AA306; font-variant-numeric:tabular-nums; }
        .dpi-why-card h3 { font-family: var(--font-syne), Arial, sans-serif; font-size:23px; font-weight:700; color:#0C1B30; margin:4px 0 0; }
        .dpi-why-card p { font-size:14px; line-height:1.65; color:#5A6B7F; margin:8px 0 0; }

        /* --- 16 Transformation in Action --- */
        .dpi-transform { display:grid; grid-template-columns:1fr 1fr; isolation:isolate; overflow:hidden; }
        .dpi-transform-left { display:flex; flex-direction:column; }
        .dpi-transform-panel { padding:44px 48px; display:flex; flex:1; }
        .dpi-transform-panel--dark { position:relative; background:radial-gradient(circle at 25% 15%, #132745 0%, #0A1628 55%, #050B14 100%); color:#F5F7FA; overflow:hidden; }
        .dpi-transform-panel--dark::before { content:""; position:absolute; left:-60px; bottom:-60px; width:340px; height:340px; background:radial-gradient(circle, rgba(196,229,56,0.1), transparent 70%); pointer-events:none; }
        .dpi-transform-panel--light { background:#F8FAFC; color:#0A1628; border-top:1px solid #EDF0F4; }
        .dpi-transform-panel--right { background:#EFF3F7; color:#0A1628; }
        .dpi-transform-panel-inner { width:100%; display:flex; flex-direction:column; justify-content:center; }
        .dpi-transform-badge { display:inline-block; align-self:flex-start; background:#C6E84A; color:#0f0f0f; padding:8px 20px; border-radius:999px; font-size:14px; font-weight:600; letter-spacing:0.5px; font-variant:small-caps; margin-bottom:24px; }
        .dpi-transform h3 { font-family:var(--font-syne),Arial,sans-serif; font-size:clamp(24px,2.6vw,32px); font-weight:700; margin:0; color:inherit; line-height:1.25; }
        .dpi-transform-panel--dark > .dpi-transform-panel-inner > p { font-size:15px; line-height:1.7; margin:14px 0 0; max-width:440px; color:#8B9AB5; }
        .dpi-transform-panel--light > .dpi-transform-panel-inner > p { font-size:15px; line-height:1.7; margin:14px 0 0; max-width:440px; color:#5B6472; }
        .dpi-pot-title { font-family:var(--font-syne),Arial,sans-serif; font-size:clamp(24px,2.6vw,32px); font-weight:700; margin:0 0 16px; color:#0A1628; line-height:1.25; }
        .dpi-pot-checklist { list-style:none; margin:0; padding:0; background:#FFFFFF; border:1px solid #E8EBF0; border-radius:16px; overflow:hidden; box-shadow:0 6px 20px -12px rgba(10,22,40,0.15); }
        .dpi-pot-checklist li { display:flex; align-items:center; gap:14px; padding:15px 20px; border-top:1px solid #EEF1F5; font-size:14.5px; font-weight:600; color:#1D2733; transition:background .2s ease; }
        .dpi-pot-checklist li:first-child { border-top:none; }
        .dpi-pot-checklist li:hover { background:#FAFDF5; }
        .dpi-pot-badge { width:28px; height:28px; border-radius:8px; background:linear-gradient(135deg, #0A1628 0%, #1A2B45 100%); color:#C4E538; display:flex; align-items:center; justify-content:center; flex:0 0 auto; font-weight:700; font-size:13px; }
        .dpi-transform-cta { display:inline-flex; align-items:center; gap:10px; align-self:flex-start; background:#0A1628; color:#F5F7FA; padding:14px 28px; border-radius:12px; font-weight:700; font-size:14px; text-decoration:none; margin-top:28px; transition:background .15s ease, transform .15s ease, box-shadow .15s ease; box-shadow:0 2px 12px -4px rgba(10,22,40,0.2); }
        .dpi-transform-cta span { display:inline-block; transition:transform .15s ease; }
        .dpi-transform-cta:hover { background:#142544; transform:translateY(-2px); box-shadow:0 6px 20px -6px rgba(10,22,40,0.3); }
        .dpi-transform-cta:hover span { transform:translateX(3px); }

        /* --- 17 Final CTA --- */
        .dpi-final { position:relative; overflow:hidden; background:linear-gradient(115deg, #242424 0%, ${NAVY} 65%, #141414 100%); padding: clamp(100px, 12vw, 160px) 0; }
        .dpi-final-inner { position:relative; z-index:2; text-align:center; max-width:720px; margin:0 auto; }
        .dpi-final-h2 { font-family: var(--font-syne), Arial, sans-serif; font-size: clamp(32px, 4.5vw, 54px); color:#fff; font-weight:700; line-height:1.1; margin:0 0 20px; }
        .dpi-final-body { font-size:17px; line-height:1.7; color:rgba(255,255,255,0.8); margin:0 auto 36px; max-width:60ch; }
        .dpi-final-ctas { display:flex; flex-wrap:wrap; gap:16px; justify-content:center; }

        @media (max-width: 1080px) {
          .dpi-eco-grid { grid-template-columns: repeat(3, 1fr); }
          .dpi-impact-grid { grid-template-columns: repeat(2, 1fr); }
          .dpi-pension-cols { grid-template-columns: 1fr; }
        }
        @media (max-width: 900px) {
          .dpi-land-row { grid-template-columns: 1fr; }
          .dpi-section-cols { grid-template-columns: 1fr; }
          .dpi-cap-panel { grid-template-columns: 1fr; }
          .dpi-ai-grid { grid-template-columns: repeat(2, 1fr); }
          .dpi-out-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .dpi-why-grid { grid-template-columns: repeat(2, 1fr); }
          .dpi-transform { grid-template-columns: 1fr; min-height: auto; }
          .dpi-transform-panel { padding: 36px 24px; }
          .dpi-transform-panel--light { border-top: 1px solid #EDF0F4; border-left: none; }
          .dpi-pstep-detail { grid-template-columns: 1fr; }
          .dpi-ecosys-flow { grid-template-columns: repeat(3, 1fr); row-gap: 40px; }
          .dpi-ecosys-line { display: none; }
          .dpi-service-flow { padding:36px 24px; }
          .dpi-service-rail { flex-direction:column; height:auto; gap:0; }
          .dpi-service-rail-line { top:0; bottom:0; left:16px; right:auto; width:2px; height:auto; transform:translateY(0); background:linear-gradient(180deg, rgba(201,233,74,0.12), rgba(201,233,74,0.95)); }
          .dpi-service-step { height:auto; padding:0 0 32px 44px; }
          .dpi-service-step:last-child { padding-bottom:0; }
          .dpi-service-node { top:6px; left:16px; transform:translate(-50%, 0); }
          .dpi-service-stem { display:none; }
          .dpi-service-label { position:static; transform:none; width:auto; text-align:left; }
        }
        @media (max-width: 720px) {
          .dpi-eco-grid { grid-template-columns: 1fr; }
          .dpi-impact-grid { grid-template-columns: 1fr; }
          .dpi-cap-list { grid-template-columns: 1fr; }
          .dpi-pstep-list { grid-template-columns: 1fr; }
          .dpi-ai-grid { grid-template-columns: 1fr; }
          .dpi-out-grid { grid-template-columns: 1fr; }
          .dpi-why-grid { grid-template-columns: 1fr; }
          .dpi-layer { grid-template-columns: 1fr; gap: 8px; }
          .dpi-human-panel { grid-template-columns: 1fr; padding:32px 28px; }
          .dpi-human-feature { padding:24px 0; }
          .dpi-human-feature:first-child { padding-left:0; padding-top:0; }
          .dpi-human-feature + .dpi-human-feature { border-left:none; border-top:1px solid rgba(201,233,74,0.18); }
          .dpi-open-layer { flex-direction: column; align-items: flex-start; gap: 8px; padding: 20px; }
        }
        @media (max-width: 780px) {
          .dpi-trust-stage { padding: 0; }
          .dpi-trust-grid { grid-template-columns: 1fr; gap: 24px; }
          .dpi-trust-line-h, .dpi-trust-line-v { display: none; }
          .dpi-trust-hub { position: static; transform: none; }
        }
        @media (max-width: 560px) {
          .dpi-land-cards { grid-template-columns: 1fr; }
          .dpi-ecosys-flow { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ─────────────────────────── 01 HERO ─────────────────────────── */}
      <section className="dpi-hero">
        <div className="dpi-hero-bg">
          <video
            className="dpi-hero-video"
            src="/dpi/dpihero1.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
        <div className="dpi-wrap dpi-hero-grid">
          <div className="dpi-hero-inner">
            <Eyebrow text="DIGITAL PUBLIC INFRASTRUCTURE" />
            <h1 className="dpi-h1">Digital foundations for a connected world.</h1>
            <p className="dpi-sub">Building secure, interoperable and intelligent digital ecosystems that connect people, institutions and services at scale.</p>
            <p className="dpi-body" style={{ color: "rgba(255,255,255,0.72)" }}>Sytrion brings together technology, data, AI and intelligent operations to help institutions modernize service delivery, connect fragmented ecosystems and build digital infrastructure designed for accessibility, efficiency and scale.</p>
            <div className="dpi-hero-ctas">
              <Link href="#capabilities" className="dpi-btn dpi-btn--primary">Explore Our Capabilities ↓</Link>
              <Link href="/contact" className="dpi-btn dpi-btn--ghost">Talk to Our Experts ↗</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── 02 WHY DIGITAL FOUNDATION ─────────────────── */}
      <section className="dpi-section dpi-land-section">
        <div className="dpi-wrap">
          <div className="dpi-land-grid dpi-reveal">
            <Eyebrow text="WHY DIGITAL PUBLIC INFRASTRUCTURE / DIGITAL FOUNDATION" />
            <h2 className="dpi-h2">Public services are changing. The infrastructure behind them must change too.</h2>
          </div>
          <div className="dpi-land-row dpi-reveal">
            <div className="dpi-land-text">
              <p className="dpi-land-lede">People increasingly expect essential services to be simple, accessible and connected. Yet institutions often operate across fragmented systems, disconnected databases, manual processes and complex service-delivery environments.</p>
              <p className="dpi-land-copy">Digital Public Infrastructure creates reusable foundations that allow identity, information, transactions and services to move securely across an ecosystem.</p>
            </div>
            <div className="dpi-land-cards">
              {challengeList.map((item, i) => (
                <article key={item} className="dpi-challenge-card" style={{ background: challengeLooks[i].gradient } as React.CSSProperties}>
                  <div className="dpi-challenge-top">
                    <div className="dpi-challenge-icon" style={{ background: challengeLooks[i].color, color: "#fff" }} aria-hidden="true">
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
                  <div className="dpi-challenge-label">{item}</div>
                </article>
              ))}
            </div>
          </div>
          <div className="dpi-approach dpi-reveal">
            <div className="dpi-approach-top">
              <div className="dpi-approach-dot" />
              <div className="dpi-approach-label">Our Approach</div>
            </div>
            <p className="dpi-approach-text">Sytrion connects <em>technology, data, operations</em> and <em>intelligence</em> to help build services around people — not systems.</p>
          </div>
        </div>
      </section>

      {/* ─────────────────── 03 CONNECTED DIGITAL ECOSYSTEMS ─────────────────── */}
      <section className="dpi-section dpi-eco-band">
        <div className="dpi-wrap">
          <div className="dpi-reveal">
            <Eyebrow text="CONNECTED DIGITAL ECOSYSTEMS" dark />
            <h2 className="dpi-h2">One foundation. Multiple possibilities.</h2>
          </div>
          <div className="dpi-eco-grid dpi-reveal">
            {ecosystemModules.map((m, i) => (
              <div key={m.name} className="dpi-eco-module">
                <p className="dpi-eco-name">{m.name}</p>
                <h3 className="dpi-eco-title">{m.title}</h3>
                <p className="dpi-eco-desc">{m.desc}</p>
                {i < ecosystemModules.length - 1 && <div className="dpi-eco-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── 04 WHERE DPI CREATES IMPACT ─────────────────── */}
      <section className="dpi-section">
        <div className="dpi-wrap">
          <div className="dpi-reveal">
            <Eyebrow text="WHERE DPI CREATES IMPACT" />
            <h2 className="dpi-h2">Digital infrastructure that works across society.</h2>
          </div>
          <div className="dpi-impact-grid dpi-reveal">
            {impactCards.map((c) => (
              <article key={c.title} className="dpi-impact-card">
                <img
                  className="dpi-impact-img"
                  src={"/dpi/" + c.title + ".jpg"}
                  alt={c.title}
                  loading="lazy"
                  decoding="async"
                />
                <div className="dpi-impact-overlay" />
                <div className="dpi-impact-body">
                  <h3 className="dpi-impact-title">{c.title}</h3>
                  <p className="dpi-impact-desc">{c.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── 05 SYTRION DPI CAPABILITIES ─────────────────── */}
      <section className="dpi-section" id="capabilities">
        <div className="dpi-wrap">
          <div className="dpi-reveal">
            <Eyebrow text="SYTRION DPI CAPABILITIES" />
            <h2 className="dpi-h2">From digital building blocks to connected ecosystems.</h2>
            <p className="dpi-body" style={{ marginBottom: 0 }}>Sytrion combines technology architecture, data, AI and operational expertise to help institutions design and enable digital ecosystems that are scalable, interoperable and built around user needs.</p>
          </div>
          <div className="dpi-cap-tabs dpi-reveal" role="tablist" aria-label="Sytrion DPI Capabilities">
            {capabilityTabs.map((t, i) => (
              <button
                key={t.tab}
                type="button"
                role="tab"
                aria-selected={capTab === i}
                className={"dpi-cap-tab" + (capTab === i ? " dpi-cap-tab--active" : "")}
                onClick={() => setCapTab(i)}
              >
                {t.tab}
              </button>
            ))}
          </div>
          <div key={capTab} className="dpi-cap-panel" role="tabpanel">
            <div>
              <span className="dpi-cap-num">0{capTab + 1} —</span>
              <h3 className="dpi-cap-panel-title">{capabilityTabs[capTab].title}</h3>
              <p className="dpi-cap-lead">{capabilityTabs[capTab].lead}</p>
              <ul className="dpi-cap-list">
                {capabilityTabs[capTab].items.map((item) => (
                  <li key={item} className="dpi-cap-item">{item}</li>
                ))}
              </ul>
            </div>
            <div className="dpi-cap-visual">
              <div key={capTab} className="dpi-cap-glyph" aria-hidden="true">
                <CapabilityIcon variant={capabilityTabs[capTab].tab.toLowerCase()} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── 06 PENSION & SOCIAL SECURITY OPERATIONS ─────────── */}
      <section className="dpi-section dpi-pension">
        <div className="dpi-wrap">
          <div className="dpi-pension-head dpi-reveal">
            <div className="dpi-reveal" style={{ margin: 0 }}>
              <Eyebrow text="PENSION & SOCIAL SECURITY OPERATIONS" dark />
              <h2 className="dpi-h2">Digital operations for a lifetime of financial security.</h2>
            </div>
          </div>
          <div className="dpi-pension-cols">
            <div className="dpi-pension-text dpi-reveal">
              <p className="dpi-body" style={{ color: "rgba(255,255,255,0.75)" }}>Population-scale pension and social-security systems require more than technology. They depend on accurate subscriber information, reliable recordkeeping, contribution processing, connected intermediaries, responsive service operations and trusted data.</p>
              <p className="dpi-body" style={{ color: "rgba(255,255,255,0.75)" }}>Sytrion brings together intelligent workflows, data, automation and operational expertise to support the complex processes behind digital pension and social-security ecosystems.</p>
              <Link href="/contact" className="dpi-btn dpi-btn--ghost" style={{ marginTop: 28 }}>Explore Pension Operations →</Link>
            </div>
            <div className="dpi-pension-visual dpi-reveal">
              <div className="dpi-visual-tile">
                <img className="dpi-visual-img" src="/dpi/PENSION & SOCIAL SECURITY OPERATIONS.jpg" alt="Social Security & Pensions" loading="lazy" decoding="async" />
                <span className="dpi-visual-label">PENSION JOURNEY</span>
              </div>
            </div>
          </div>
          <div className="dpi-pension-steps dpi-reveal">
            {pensionJourney.map((s, i) => (
              <button
                key={s.name}
                type="button"
                onClick={() => setPensionStep(i)}
                onMouseEnter={() => setPensionHover(i)}
                onMouseLeave={() => setPensionHover(null)}
                aria-pressed={pensionStep === i}
                className={"dpi-pstep" + (pensionStep === i ? " dpi-pstep--active" : "")}
              >
                <span className="dpi-pstep-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="dpi-pstep-name">{s.name}</span>
              </button>
            ))}
          </div>
          <div className="dpi-pstep-detail dpi-reveal">
            <div>
              <span className="dpi-cap-num">{pensionJourney[pensionShown].name} /</span>
              <h3 className="dpi-cap-panel-title" style={{ color: "#fff" }}>{pensionJourney[pensionShown].long}</h3>
            </div>
            <ul className="dpi-pstep-list">
              {pensionJourney[pensionShown].items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────────────── 07 CONNECTED PENSION ECOSYSTEM ─────────────────── */}
      <section className="dpi-section dpi-ecosys">
        <div className="dpi-wrap">
          <div className="dpi-reveal">
            <Eyebrow text="CONNECTED PENSION ECOSYSTEM" />
            <h2 className="dpi-h2">One ecosystem. Multiple participants. One continuous flow of information.</h2>
          </div>
          <div className="dpi-ecosys-flow dpi-reveal">
            <div className="dpi-ecosys-line" aria-hidden="true" />
            {pensionEcosystem.map((s, i) => (
              <div key={s.name} className={"dpi-ecosys-node" + (i === 0 || i === pensionEcosystem.length - 1 ? " dpi-ecosys-node--filled" : "")}>
                <span className="dpi-ecosys-tip">{s.tip}</span>
                <span className="dpi-ecosys-circle" aria-hidden="true" />
                <span className="dpi-ecosys-node-name">{s.name}</span>
              </div>
            ))}
          </div>
          <div className="dpi-ilband dpi-reveal">
            <span className="dpi-ilband-label">SYTRION INTELLIGENCE LAYER</span>
            {intelligenceLayer.map((x) => (
              <span key={x} className="dpi-ilband-item">{x}</span>
            ))}
          </div>
          <p className="dpi-body dpi-reveal" style={{ marginTop: 28 }}>A connected ecosystem of participants working together to deliver better outcomes for subscribers.</p>
        </div>
      </section>

      {/* ───────────── 08 OPEN DIGITAL ECOSYSTEMS + 09 AI + DPI ───────────── */}
      <section className="dpi-section-cols">
        <div className="dpi-col dpi-open-col">
          <section className="dpi-open">
            <div className="dpi-wrap">
              <div className="dpi-reveal">
                <Eyebrow text="OPEN DIGITAL ECOSYSTEMS" dark />
                <h2 className="dpi-h2">Build ecosystems. Not silos.</h2>
                <p className="dpi-body" style={{ color: "rgba(255,255,255,0.72)" }}>The next generation of digital infrastructure is not built around one application or institution. It connects participants through common standards, interoperable systems and shared digital building blocks — allowing innovation to happen across the ecosystem.</p>
              </div>
              <div className="dpi-open-stack dpi-reveal">
                {openEcosystemLayers.map((l, i) => (
                  <div key={l} className="dpi-open-layer">
                    <span className="dpi-open-layer-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="dpi-open-layer-name">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        <div className="dpi-col dpi-ai-col">
          <section className="dpi-ai">
            <div className="dpi-wrap">
              <div className="dpi-reveal">
                <Eyebrow text="AI + DPI" dark />
                <h2 className="dpi-h2">From digital infrastructure to intelligent infrastructure.</h2>
                <p className="dpi-body" style={{ color: "rgba(255,255,255,0.72)" }}>Digital infrastructure connects systems. AI can help make those systems more responsive, efficient and intelligent.</p>
              </div>
              <div className="dpi-ai-grid dpi-reveal">
                {aiNodes.map((n) => (
                  <div key={n.title} className="dpi-ai-node">
                    <h3 className="dpi-ai-title">{n.title}</h3>
                    <p className="dpi-ai-verbs">{n.verbs}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* ─────────────────── 10 HUMAN + DIGITAL ─────────────────── */}
      <section className="dpi-section dpi-human">
        <div className="dpi-wrap">
          <div className="dpi-reveal">
            <Eyebrow text="HUMAN + DIGITAL / TECHNOLOGY FOR EVERYONE" />
            <h2 className="dpi-h2">Digital infrastructure matters when people can actually use it.</h2>
            <p className="dpi-body">Technology alone does not create inclusion. Digital services need to be accessible, intuitive and designed around the people and institutions they serve.</p>
          </div>
          <div className="dpi-human-panel dpi-reveal">
            {humanDigitalPillars.map((p, i) => (
              <article key={p.title} className="dpi-human-feature">
                <div className="dpi-human-icon">{humanIcons[i]}</div>
                <h3 className="dpi-human-title">{p.title}</h3>
                <p className="dpi-human-desc">{p.desc}</p>
              </article>
            ))}
          </div>
          <p className="dpi-human-closer dpi-reveal">Infrastructure becomes meaningful when technology translates into access.</p>
        </div>
      </section>

      {/* ─────────────────── 11 INTELLIGENT SERVICE DELIVERY ─────────────────── */}
      <section className="dpi-section dpi-service">
        <div className="dpi-wrap">
          <div className="dpi-reveal">
            <Eyebrow text="INTELLIGENT SERVICE DELIVERY" />
            <h2 className="dpi-h2">Make every interaction easier to navigate.</h2>
          </div>
          <div className="dpi-service-flow dpi-reveal">
            <div className="dpi-service-rail">
              <div className="dpi-service-rail-line" aria-hidden="true" />
              {serviceFlow.map((s, i) => {
                const up = i % 2 === 0;
                return (
                  <div key={s.name} className="dpi-service-step">
                    <div className="dpi-service-node" aria-hidden="true" />
                    <div className={"dpi-service-stem dpi-service-stem--" + (up ? "up" : "down")} aria-hidden="true" />
                    <div className={"dpi-service-label dpi-service-label--" + (up ? "up" : "down")}>
                      <span className="dpi-service-num">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="dpi-service-name">{s.name}</h3>
                      <p className="dpi-service-desc">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── 12 TRUST, SECURITY & GOVERNANCE ───────────── */}
      <section className="dpi-section dpi-trust">
        <div className="dpi-wrap">
          <div className="dpi-reveal">
            <Eyebrow text="TRUST, SECURITY & GOVERNANCE" dark />
            <h2 className="dpi-h2">Digital ecosystems need trust at their core.</h2>
            <p className="dpi-body" style={{ color: "rgba(255,255,255,0.72)" }}>As digital services connect more institutions, systems and users, security, privacy, governance and accountability become fundamental to sustainable infrastructure.</p>
          </div>
          <div className="dpi-trust-stage dpi-reveal">
            <div className="dpi-trust-grid">
              <div className="dpi-trust-line-h" aria-hidden="true" />
              <div className="dpi-trust-line-v" aria-hidden="true" />
              <div className="dpi-trust-hub">
                <div className="dpi-trust-hub-circle" aria-hidden="true">
                  {trustIcons[0]}
                </div>
                <span className="dpi-trust-hub-label">Trust by Design</span>
              </div>
              {trustPillars.map((p, i) => (
                <div key={p.title} className="dpi-trust-pillar">
                  <div className="dpi-trust-icon" aria-hidden="true">{trustIcons[i]}</div>
                  <h3 className="dpi-trust-title">{p.title}</h3>
                  <p className="dpi-trust-desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── 13 OUTCOMES ─────────────────── */}
      <section className="dpi-section dpi-outcomes">
        <div className="dpi-wrap">
          <div className="dpi-reveal">
            <Eyebrow text="OUTCOMES" />
            <h2 className="dpi-h2">Infrastructure designed to create impact at scale.</h2>
          </div>
          <div className="dpi-out-grid dpi-reveal">
            {outcomeTiles.map((o, i) => (
              <article key={o.label} className="dpi-outcome">
                <div className="dpi-outcome-header">
                  <div className="dpi-outcome-icon" aria-hidden="true">
                    {outcomeIcons[i]}
                  </div>
                </div>
                <h3 className="dpi-outcome-word">{o.label}</h3>
                <p className="dpi-outcome-sub">{o.title}</p>
                <p className="dpi-outcome-desc">{o.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── 14 SYTRION DPI MODEL ─────────────────── */}
      <section className="dpi-section dpi-model">
        <div className="dpi-wrap">
          <div className="dpi-reveal">
            <Eyebrow text="SYTRION DPI MODEL" dark />
            <h2 className="dpi-h2">One connected digital public ecosystem.</h2>
          </div>
          <div className="dpi-stack dpi-reveal">
            {dpiModelLayers.map((l) => (
              <div key={l.title} className="dpi-layer">
                <span className="dpi-layer-num">{l.n}</span>
                <span className="dpi-layer-title">{l.title}</span>
                <span className="dpi-layer-items">{l.items}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── 15 WHY SYTRION ─────────────────── */}
      <section className="dpi-section dpi-why">
        <div className="dpi-wrap">
          <div className="dpi-reveal">
            <Eyebrow text="WHY SYTRION" />
            <h2 className="dpi-h2">Technology architecture. Operational intelligence. Human impact.</h2>
          </div>
          <div className="dpi-why-grid dpi-reveal">
            {whySytrion.map((w, i) => (
              <article key={w.title} className="dpi-why-card">
                <div className="dpi-why-head">
                  <div className="dpi-why-icon" aria-hidden="true">
                    <img src={w.icon} alt="" width="52" height="52" />
                  </div>
                  <div className="dpi-why-head-text">
                    <span className="dpi-why-num">{w.n}</span>
                    <h3>{w.title}</h3>
                  </div>
                </div>
                <p>{w.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── 16 TRANSFORMATION IN ACTION ─────────────────── */}
      <section className="dpi-transform">
        <div className="dpi-transform-left">
          <div className="dpi-transform-panel dpi-transform-panel--dark">
            <div className="dpi-transform-panel-inner">
              <span className="dpi-transform-badge">Transformation in Action</span>
              <h3>The Challenge</h3>
              <p>Public-service ecosystems can involve disconnected systems, repeated information requests, manual document processing and complex institutional workflows.</p>
            </div>
          </div>
          <div className="dpi-transform-panel dpi-transform-panel--light">
            <div className="dpi-transform-panel-inner">
              <h3>The Sytrion Approach</h3>
              <p>Create connected digital journeys using interoperable architecture, reusable digital building blocks, intelligent workflows, automation and data-driven operations.</p>
            </div>
          </div>
        </div>
        <div className="dpi-transform-panel dpi-transform-panel--right">
          <div className="dpi-transform-panel-inner">
            <h3 className="dpi-pot-title">The Potential</h3>
            <ul className="dpi-pot-checklist">
              {transformPotential.map((item) => (
                <li key={item}>
                  <span className="dpi-pot-badge" aria-hidden="true">✓</span> {item}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="dpi-transform-cta">Discuss Your Use Case <span>→</span></Link>
          </div>
        </div>
      </section>

      {/* ─────────────────── 17 FINAL CTA ─────────────────── */}
      <section className="dpi-final">
        <div className="dpi-wrap">
          <div className="dpi-final-inner dpi-reveal">
            <span className="dpi-eyebrow dpi-eyebrow--dark">DIGITAL PUBLIC INFRASTRUCTURE</span>
            <h2 className="dpi-final-h2">Ready to build intelligent digital infrastructure?</h2>
            <p className="dpi-final-body">From identity and data exchange to digital services, AI and intelligent operations, Sytrion can help create connected ecosystems designed to work at scale.</p>
            <div className="dpi-final-ctas">
              <Link href="/contact" className="dpi-btn dpi-btn--primary">Talk to Our DPI Experts ↗</Link>
              <Link href="/contact" className="dpi-btn dpi-btn--ghost">Schedule a Consultation</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


