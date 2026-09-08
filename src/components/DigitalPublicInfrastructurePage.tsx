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
  "Subscribers",
  "Service & Access Channels",
  "Recordkeeping & Administration",
  "Contribution & Transaction Ecosystem",
  "Pension / Financial Institutions",
  "Retirement & Service Ecosystem",
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
  { n: "01", title: "Ecosystem Thinking", desc: "Solutions designed around interconnected participants rather than isolated systems." },
  { n: "02", title: "AI-First", desc: "Intelligence embedded into workflows, data and service operations." },
  { n: "03", title: "Technology + Operations", desc: "Digital platforms supported by the operational capabilities needed to make them work." },
  { n: "04", title: "Interoperability", desc: "Architecture designed around integration, reusable components and connected ecosystems." },
  { n: "05", title: "Trust by Design", desc: "Security, governance and responsible data practices incorporated into delivery." },
  { n: "06", title: "Built to Evolve", desc: "Modular approaches that can adapt as ecosystems and requirements change." },
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

export default function DigitalPublicInfrastructurePage() {
  const [capTab, setCapTab] = useState(0);
  const [pensionStep, setPensionStep] = useState(0);
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
        .dpi-hero-overlay { position:absolute; inset:0; background:linear-gradient(90deg, rgba(10,12,16,0.92) 0%, rgba(10,12,16,0.72) 45%, rgba(10,12,16,0.45) 100%); }
        .dpi-hero-inner { position:relative; z-index:2; max-width: 720px; text-align:left; margin:0; }
        .dpi-hero-ctas { display:flex; flex-wrap:wrap; gap:16px; margin-top:32px; justify-content:flex-start; }

        .dpi-split { display:grid; grid-template-columns: 1.05fr 1fr; gap: clamp(40px, 6vw, 90px); align-items:start; }
        .dpi-challenge-list { list-style:none; margin:0; padding:0; position:relative; }
        .dpi-challenge-list::before { content:""; position:absolute; left:9px; top:8px; bottom:8px; width:2px; background:rgba(198,232,74,0.35); }
        .dpi-challenge-item { position:relative; display:flex; align-items:baseline; gap:18px; padding:20px 0 20px 40px; }
        .dpi-challenge-item::before { content:""; position:absolute; left:1px; top:26px; width:16px; height:16px; border-radius:50%; background:#fff; border:3px solid ${CYAN}; }
        .dpi-challenge-num { font-family: var(--font-syne), Arial, sans-serif; font-size: 15px; font-weight:700; color:${BLUE}; min-width:44px; }
        .dpi-challenge-text { font-size:19px; font-weight:600; color:#242424; line-height:1.4; }
        .dpi-closer { font-size: 22px; font-weight:700; color:${BLUE}; line-height:1.4; margin-top: 34px; max-width: 30ch; }

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
        .dpi-cap-visual { position:relative; border-radius:18px; overflow:hidden; min-height:340px; background:linear-gradient(150deg, ${NAVY}, ${NAVY2}); display:flex; align-items:center; justify-content:center; }
        .dpi-cap-visual img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
        .dpi-cap-visual--tint::after { content:""; position:absolute; inset:0; background:linear-gradient(160deg, rgba(198,232,74,0.18), rgba(198,232,74,0.08) 45%, rgba(15,15,15,0.55)); }
        .dpi-cap-glyph { position:relative; z-index:2; color:${CYAN}; }

        /* --- Pension & Social Security --- */
        .dpi-pension { background:linear-gradient(160deg, #1f1f1f 0%, ${NAVY} 60%, ${NAVY2} 100%); }
        .dpi-pension-head { margin-bottom:44px; }
        .dpi-pension-cols { display:grid; grid-template-columns: 1.1fr 1fr; gap:clamp(36px,6vw,80px); align-items:center; }
        .dpi-pension-text .dpi-body + .dpi-body { margin-top:16px; }
        .dpi-pension-text .dpi-btn { display:inline-flex; }
        .dpi-visual-tile { position:relative; border-radius:18px; overflow:hidden; height:320px; background:linear-gradient(150deg, rgba(198,232,74,0.35), rgba(15,15,15,0.6)), ${NAVY}; display:flex; align-items:flex-end; justify-content:flex-start; padding:24px; }
        .dpi-visual-label { font-size:11.5px; font-weight:700; letter-spacing:0.18em; color:${CYAN}; }
        .dpi-pension-steps { display:flex; flex-wrap:wrap; gap:10px; margin-top:52px; border-top:1px solid rgba(255,255,255,0.12); padding-top:30px; }
        .dpi-pstep { appearance:none; background:transparent; border:none; cursor:pointer; display:inline-flex; align-items:center; gap:10px; padding:11px 18px; border-radius:999px; border:1px solid rgba(255,255,255,0.2); color:rgba(255,255,255,0.6); font-family:inherit; font-size:13.5px; font-weight:600; transition: all .25s ease; }
        .dpi-pstep-num { font-family: var(--font-syne), Arial, sans-serif; font-size:12px; font-weight:700; color:${CYAN}; }
        .dpi-pstep:hover { color:#fff; border-color:rgba(255,255,255,0.5); }
        .dpi-pstep--active { background:${BLUE}; border-color:${BLUE}; color:#fff; }
        .dpi-pstep--active .dpi-pstep-num { color:#fff; }
        .dpi-pstep-detail { margin-top:38px; display:grid; grid-template-columns: 1fr 1.2fr; gap:clamp(24px,4vw,56px); align-items:start; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:32px; }
        .dpi-pstep-list { list-style:none; margin:0; padding:0; display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:0 clamp(20px,3vw,40px); }
        .dpi-pstep-list li { position:relative; padding:11px 0 11px 22px; font-size:15px; color:rgba(255,255,255,0.85); border-bottom:1px solid rgba(255,255,255,0.1); }
        .dpi-pstep-list li::before { content:""; position:absolute; left:0; top:20px; width:7px; height:7px; border-radius:50%; background:${CYAN}; }

        /* --- 07 Pension Ecosystem --- */
        .dpi-ecosys { background:#fafaf8; }
        .dpi-ecosys-flow { display:flex; align-items:stretch; gap:0; margin-top:48px; position:relative; }
        .dpi-ecosys-node { flex:1; position:relative; background:#fff; border:1.5px solid rgba(198,232,74,0.25); border-radius:14px; padding:22px 18px; text-align:center; }
        .dpi-ecosys-node::after { content:""; position:absolute; right:-14px; top:50%; transform:translateY(-50%); width:28px; height:2px; background:${CYAN}; }
        .dpi-ecosys-node:last-child::after { display:none; }
        .dpi-ecosys-node-name { font-family: var(--font-syne), Arial, sans-serif; font-size:15px; font-weight:700; color:#1a1a1a; line-height:1.3; }
        .dpi-ilband { margin-top:34px; background:linear-gradient(90deg, rgba(198,232,74,0.1), rgba(198,232,74,0.14), rgba(198,232,74,0.1)); border:1px solid rgba(198,232,74,0.25); border-radius:12px; padding:18px 24px; display:flex; align-items:center; gap:18px; flex-wrap:wrap; }
        .dpi-ilband-label { font-size:12px; font-weight:700; letter-spacing:0.14em; color:${BLUE}; }
        .dpi-ilband-item { font-family: var(--font-syne), Arial, sans-serif; font-size:18px; font-weight:700; color:${NAVY}; }

        /* --- 08 Open Digital Ecosystems --- */
        .dpi-section-cols { display:grid; grid-template-columns: 1fr 1fr; }
        .dpi-col { min-width:0; }
        .dpi-open, .dpi-ai { padding: clamp(76px, 8vw, 120px) 0; height:100%; }
        .dpi-open { background:linear-gradient(180deg, ${NAVY} 0%, #141414 100%); }
        .dpi-open-stack { margin-top:48px; position:relative; }
        .dpi-open-layer { display:flex; align-items:center; gap:18px; border:1px solid rgba(255,255,255,0.14); border-bottom:none; padding:26px 30px; background:rgba(255,255,255,0.03); position:relative; }
        .dpi-open-layer:last-child { border-bottom:1px solid rgba(255,255,255,0.14); }
        .dpi-open-layer-num { font-family: var(--font-syne), Arial, sans-serif; font-size:13px; font-weight:700; color:${CYAN}; min-width:34px; }
        .dpi-open-layer-name { font-family: var(--font-syne), Arial, sans-serif; font-size:19px; font-weight:700; color:#fff; }

        /* --- 09 AI + DPI --- */
        .dpi-ai { background:linear-gradient(150deg, #141414 0%, #141414 60%, ${NAVY2} 100%); }
        .dpi-ai-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap:20px; margin-top:48px; }
        .dpi-ai-node { border:1px solid rgba(198,232,74,0.25); border-radius:14px; padding:24px; background:rgba(15,15,15,0.5); }
        .dpi-ai-title { font-family: var(--font-syne), Arial, sans-serif; font-size:17px; font-weight:700; color:#fff; margin:0 0 8px; }
        .dpi-ai-verbs { font-size:13px; letter-spacing:0.04em; color:${CYAN}; }

        /* --- 10 Human + Digital --- */
        .dpi-human { background:#fafaf8; }
        .dpi-pillars { display:grid; grid-template-columns: repeat(3, 1fr); gap:24px; margin-top:48px; }
        .dpi-pillar { border-top:3px solid ${BLUE}; padding-top:22px; }
        .dpi-pillar-title { font-family: var(--font-syne), Arial, sans-serif; font-size:22px; font-weight:700; color:#1a1a1a; margin:0 0 10px; }
        .dpi-pillar-desc { font-size:15.5px; line-height:1.6; color:#5A5D66; margin:0; }
        .dpi-human-closer { font-size:20px; font-weight:700; color:${BLUE}; margin-top:40px; }

        /* --- 11 Intelligent Service Delivery --- */
        .dpi-service { background:#fafaf8; }
        .dpi-service-flow { display:flex; align-items:stretch; gap:0; margin-top:52px; }
        .dpi-service-step { flex:1; position:relative; text-align:center; padding:0 12px; }
        .dpi-service-step--active .dpi-service-num { color:${BLUE}; }
        .dpi-service-num { display:flex; align-items:center; justify-content:center; width:52px; height:52px; margin:0 auto 14px; border-radius:50%; border:2px solid rgba(15,15,15,0.15); font-family: var(--font-syne), Arial, sans-serif; font-size:15px; font-weight:700; color:${BLUE}; background:#fff; position:relative; z-index:2; }
        .dpi-service-name { font-family: var(--font-syne), Arial, sans-serif; font-size:13px; font-weight:700; letter-spacing:0.06em; color:#1a1a1a; margin:0 0 6px; }
        .dpi-service-desc { font-size:12.5px; line-height:1.45; color:#5A5D66; margin:0; }
        .dpi-service-flow::before { content:""; position:absolute; left:8%; right:8%; top:26px; height:2px; background:rgba(198,232,74,0.18); z-index:1; }

        /* --- 12 Trust, Security & Governance --- */
        .dpi-trust { background:linear-gradient(160deg, ${NAVY} 0%, ${NAVY2} 100%); }
        .dpi-trust-core { text-align:center; margin:48px 0; }
        .dpi-trust-center { display:inline-flex; align-items:center; justify-content:center; padding:34px 44px; border-radius:20px; background:linear-gradient(135deg, rgba(198,232,74,0.3), rgba(198,232,74,0.2)); border:1px solid rgba(198,232,74,0.4); font-family: var(--font-syne), Arial, sans-serif; font-size:20px; font-weight:700; color:#fff; }
        .dpi-trust-grid { display:grid; grid-template-columns: repeat(4, 1fr); gap:20px; }
        .dpi-trust-pillar { border:1px solid rgba(255,255,255,0.12); border-radius:14px; padding:24px; background:rgba(255,255,255,0.03); }
        .dpi-trust-title { font-family: var(--font-syne), Arial, sans-serif; font-size:18px; font-weight:700; color:#fff; margin:0 0 10px; }
        .dpi-trust-desc { font-size:14px; line-height:1.6; color:rgba(255,255,255,0.7); margin:0; }

        /* --- 13 Outcomes --- */
        .dpi-outcomes { background:#fafaf8; }
        .dpi-out-tiles { display:grid; grid-template-columns: repeat(3, 1fr); gap:20px; margin-top:48px; }
        .dpi-out-tile { border:1px solid rgba(15,15,15,0.1); border-radius:14px; padding:26px; }
        .dpi-out-label { font-size:12px; font-weight:700; letter-spacing:0.14em; color:${BLUE}; margin:0 0 10px; }
        .dpi-out-title { font-family: var(--font-syne), Arial, sans-serif; font-size:20px; font-weight:700; color:#1a1a1a; margin:0 0 10px; }
        .dpi-out-desc { font-size:14.5px; line-height:1.6; color:#5A5D66; margin:0; }

        /* --- 14 Sytrion DPI Model --- */
        .dpi-model { background:linear-gradient(180deg, #141414 0%, #141414 100%); }
        .dpi-stack { margin-top:48px; position:relative; }
        .dpi-stack-layer { display:flex; align-items:center; gap:24px; border:1px solid rgba(255,255,255,0.14); border-bottom:none; padding:24px 28px; background:rgba(255,255,255,0.03); position:relative; z-index:1; }
        .dpi-stack-layer:last-child { border-bottom:1px solid rgba(255,255,255,0.14); }
        .dpi-stack-num { font-family: var(--font-syne), Arial, sans-serif; font-size:13px; font-weight:700; color:${CYAN}; min-width:30px; }
        .dpi-stack-title { font-family: var(--font-syne), Arial, sans-serif; font-size:20px; font-weight:700; color:#fff; min-width:220px; }
        .dpi-stack-items { font-size:14px; color:rgba(255,255,255,0.65); }
        .dpi-stack::before { content:""; position:absolute; left:83px; top:0; bottom:0; width:2px; background:rgba(198,232,74,0.35); z-index:0; }

        /* --- 15 Why Sytrion --- */
        .dpi-why { background:#fafaf8; }
        .dpi-why-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap:24px; margin-top:48px; }
        .dpi-why-card { border-top:3px solid ${CYAN}; padding-top:22px; }
        .dpi-why-num { font-family: var(--font-syne), Arial, sans-serif; font-size:14px; font-weight:700; color:${BLUE}; margin:0 0 12px; }
        .dpi-why-title { font-family: var(--font-syne), Arial, sans-serif; font-size:22px; font-weight:700; color:#1a1a1a; margin:0 0 10px; }
        .dpi-why-desc { font-size:15px; line-height:1.6; color:#5A5D66; margin:0; }

        /* --- 16 Transformation --- */
        .dpi-transform { background:#fafaf8; }
        .dpi-transform-grid { display:grid; grid-template-columns: 1fr 1fr; gap:clamp(28px,4vw,60px); margin-top:48px; }
        .dpi-tf-half { border-radius:16px; padding:34px; }
        .dpi-tf-half--before { background:#F5F6F0; border:1px solid rgba(15,15,15,0.08); }
        .dpi-tf-half--after { background:linear-gradient(150deg, ${NAVY}, ${NAVY2}); }
        .dpi-tf-label { font-size:12px; font-weight:700; letter-spacing:0.14em; margin:0 0 16px; color:${BLUE}; }
        .dpi-tf-half--after .dpi-tf-label { color:${CYAN}; }
        .dpi-tf-title { font-family: var(--font-syne), Arial, sans-serif; font-size:26px; font-weight:700; color:#1a1a1a; margin:0 0 14px; }
        .dpi-tf-half--after .dpi-tf-title { color:#fff; }
        .dpi-tf-body { font-size:15.5px; line-height:1.65; color:#5A5D66; margin:0; }
        .dpi-tf-half--after .dpi-tf-body { color:rgba(255,255,255,0.8); }
        .dpi-tf-checklist { list-style:none; margin:20px 0 0; padding:0; }
        .dpi-tf-checklist li { position:relative; padding:9px 0 9px 24px; font-size:15px; color:rgba(255,255,255,0.9); border-bottom:1px solid rgba(255,255,255,0.12); }
        .dpi-tf-checklist li::before { content:"✓"; position:absolute; left:0; color:${CYAN}; font-weight:700; }

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
          .dpi-trust-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 900px) {
          .dpi-section-cols { grid-template-columns: 1fr; }
          .dpi-split { grid-template-columns: 1fr; }
          .dpi-cap-panel { grid-template-columns: 1fr; }
          .dpi-ai-grid { grid-template-columns: repeat(2, 1fr); }
          .dpi-pillars { grid-template-columns: 1fr; }
          .dpi-out-tiles { grid-template-columns: repeat(2, 1fr); }
          .dpi-why-grid { grid-template-columns: repeat(2, 1fr); }
          .dpi-transform-grid { grid-template-columns: 1fr; }
          .dpi-pstep-detail { grid-template-columns: 1fr; }
          .dpi-ecosys-flow { flex-direction: column; gap: 12px; }
          .dpi-ecosys-node::after { display: none; }
          .dpi-service-flow { flex-direction: column; }
          .dpi-service-flow::before { display: none; }
          .dpi-stack-title { min-width: 0; }
        }
        @media (max-width: 720px) {
          .dpi-eco-grid { grid-template-columns: 1fr; }
          .dpi-impact-grid { grid-template-columns: 1fr; }
          .dpi-cap-list { grid-template-columns: 1fr; }
          .dpi-pstep-list { grid-template-columns: 1fr; }
          .dpi-ai-grid { grid-template-columns: 1fr; }
          .dpi-trust-grid { grid-template-columns: 1fr; }
          .dpi-out-tiles { grid-template-columns: 1fr; }
          .dpi-why-grid { grid-template-columns: 1fr; }
          .dpi-stack::before { left: 16px; }
          .dpi-stack-layer { padding-left: 44px; }
          .dpi-stack-title { font-size: 17px; }
          .dpi-open-layer { flex-direction: column; align-items: flex-start; gap: 8px; padding: 20px; }
        }
      `}</style>

      {/* ─────────────────────────── 01 HERO ─────────────────────────── */}
      <section className="dpi-hero">
        <div className="dpi-hero-bg">
          <video
            className="dpi-hero-video"
            src="/dpi/dpihero.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <span className="dpi-hero-overlay" aria-hidden="true" />
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
      <section className="dpi-section">
        <div className="dpi-wrap">
          <div className="dpi-split">
            <div className="dpi-reveal">
              <Eyebrow text="WHY DIGITAL PUBLIC INFRASTRUCTURE / DIGITAL FOUNDATION" />
              <h2 className="dpi-h2">Public services are changing. The infrastructure behind them must change too.</h2>
              <p className="dpi-body">People increasingly expect essential services to be simple, accessible and connected. Yet institutions often operate across fragmented systems, disconnected databases, manual processes and complex service-delivery environments. Digital Public Infrastructure creates reusable foundations that allow identity, information, transactions and services to move securely across an ecosystem.</p>
              <p className="dpi-closer">Sytrion connects technology, data, operations and intelligence to help build services around people — not systems.</p>
            </div>
            <div className="dpi-reveal">
              <ul className="dpi-challenge-list">
                {challengeList.map((item, i) => (
                  <li key={item} className="dpi-challenge-item">
                    <span className="dpi-challenge-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="dpi-challenge-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
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
            {impactCards.map((c, i) => (
              <article key={c.title} className="dpi-impact-card">
                <img
                  className="dpi-impact-img"
                  src={"/dpi/impact-" + (i + 1) + ".jpg"}
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
            <div className="dpi-cap-visual dpi-cap-visual--tint">
              <div className="dpi-cap-glyph" aria-hidden="true">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="60" cy="60" r="44" />
                  <path d="M60 16v24M60 80v24M16 60h24M80 60h24" />
                  <circle cx="60" cy="60" r="14" fill="currentColor" stroke="none" />
                  <circle cx="60" cy="16" r="6" fill="currentColor" stroke="none" />
                  <circle cx="60" cy="104" r="6" fill="currentColor" stroke="none" />
                  <circle cx="16" cy="60" r="6" fill="currentColor" stroke="none" />
                  <circle cx="104" cy="60" r="6" fill="currentColor" stroke="none" />
                </svg>
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
              <span className="dpi-cap-num">{pensionJourney[pensionStep].name} /</span>
              <h3 className="dpi-cap-panel-title" style={{ color: "#fff" }}>{pensionJourney[pensionStep].long}</h3>
            </div>
            <ul className="dpi-pstep-list">
              {pensionJourney[pensionStep].items.map((item) => (
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
            {pensionEcosystem.map((n) => (
              <div key={n} className="dpi-ecosys-node">
                <span className="dpi-ecosys-node-name">{n}</span>
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
          <div className="dpi-pillars dpi-reveal">
            {humanDigitalPillars.map((p) => (
              <div key={p.title} className="dpi-pillar">
                <h3 className="dpi-pillar-title">{p.title}</h3>
                <p className="dpi-pillar-desc">{p.desc}</p>
              </div>
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
            {serviceFlow.map((s, i) => (
              <div key={s.name} className="dpi-service-step">
                <span className="dpi-service-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="dpi-service-name">{s.name}</h3>
                <p className="dpi-service-desc">{s.desc}</p>
              </div>
            ))}
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
          <div className="dpi-trust-core dpi-reveal">
            <div className="dpi-trust-center">Trust by Design</div>
          </div>
          <div className="dpi-trust-grid dpi-reveal">
            {trustPillars.map((p) => (
              <div key={p.title} className="dpi-trust-pillar">
                <h3 className="dpi-trust-title">{p.title}</h3>
                <p className="dpi-trust-desc">{p.desc}</p>
              </div>
            ))}
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
          <div className="dpi-out-tiles dpi-reveal">
            {outcomeTiles.map((o) => (
              <div key={o.label} className="dpi-out-tile">
                <p className="dpi-out-label">{o.label} / {o.title}</p>
                <p className="dpi-out-title"><strong>{o.title}</strong></p>
                <p className="dpi-out-desc">{o.desc}</p>
              </div>
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
              <div key={l.title} className="dpi-stack-layer">
                <span className="dpi-stack-num">{l.n}</span>
                <span className="dpi-stack-title">{l.title}</span>
                <span className="dpi-stack-items">{l.items}</span>
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
            {whySytrion.map((w) => (
              <div key={w.title} className="dpi-why-card">
                <p className="dpi-why-num">{w.n}</p>
                <h3 className="dpi-why-title">{w.title}</h3>
                <p className="dpi-why-desc">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── 16 TRANSFORMATION IN ACTION ─────────────────── */}
      <section className="dpi-section dpi-transform">
        <div className="dpi-wrap">
          <div className="dpi-reveal">
            <Eyebrow text="TRANSFORMATION IN ACTION" />
            <h2 className="dpi-h2">Reimagining how people access essential services.</h2>
            <p className="dpi-body" style={{ fontWeight: 700, letterSpacing: "0.08em", color: "#C6E84A" }}>FROM FRAGMENTED SERVICES TO CONNECTED DIGITAL DELIVERY</p>
          </div>
          <div className="dpi-transform-grid dpi-reveal">
            <div className="dpi-tf-half dpi-tf-half--before">
              <p className="dpi-tf-label">THE CHALLENGE</p>
              <h3 className="dpi-tf-title">The Challenge</h3>
              <p className="dpi-tf-body">Public-service ecosystems can involve disconnected systems, repeated information requests, manual document processing and complex institutional workflows.</p>
            </div>
            <div className="dpi-tf-half">
              <p className="dpi-tf-label">THE SYTRION APPROACH</p>
              <h3 className="dpi-tf-title">The Sytrion Approach</h3>
              <p className="dpi-tf-body">Create connected digital journeys using interoperable architecture, reusable digital building blocks, intelligent workflows, automation and data-driven operations.</p>
            </div>
          </div>
          <div className="dpi-reveal" style={{ marginTop: 48 }}>
            <p className="dpi-tf-label" style={{ color: "#C6E84A" }}>THE POTENTIAL</p>
            <ul className="dpi-tf-checklist" style={{ maxWidth: 560 }}>
              {transformPotential.map((item) => (
                <li key={item} style={{ color: "#1a1a1a", borderBottom: "1px solid rgba(15,15,15,0.1)" }}>{item}</li>
              ))}
            </ul>
            <Link href="/contact" className="dpi-btn dpi-btn--primary" style={{ marginTop: 30 }}>Discuss Your Use Case →</Link>
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


