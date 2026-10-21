"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import EcosystemHoneycomb from "./EcosystemHoneycomb";
import ServiceStaircase from "./ServiceStaircase";

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
    image: "/dpi/DPI_Identify.jpeg",
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
    image: "/dpi/DPI_Registries.jpeg",
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
    image: "/dpi/DPI_Exchange.jpeg",
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
    image: "/dpi/DPI_Services.jpeg",
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
    image: "/dpi/DPI_Operations.jpeg",
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
    image: "/dpi/DPI_Insights.jpeg",
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


const openEcosystemLayers = [
  { name: "People & Businesses", image: "/dpi/People & Businesses.jpg" },
  { name: "Applications & Services", image: "/dpi/Applications & Services.jpg" },
  { name: "Open APIs & Protocols", image: "/dpi/Open APIs & Protocols.jpg" },
  { name: "Registries, Identity & Data Exchange", image: "/dpi/Registries, Identity & Data Exchange.jpg" },
  { name: "Digital Public Infrastructure", image: "/dpi/Digital Public Infrastructure.jpg" },
  { name: "Institutions & Ecosystem Participants", image: "/dpi/Institutions & Ecosystem Participants.jpg" },
];

const aiNodes = [
  { title: "Document Intelligence", verbs: "Extract • Classify • Validate", image: "/dpi/Document Intelligence (5).jpg" },
  { title: "Service Intelligence", verbs: "Understand • Route • Assist", image: "/dpi/Service Intelligence.jpg" },
  { title: "Data Intelligence", verbs: "Clean • Connect • Enrich", image: "/dpi/Data Intelligence (2).jpg" },
  { title: "Workflow Intelligence", verbs: "Automate • Orchestrate • Resolve", image: "/dpi/Workflow Intelligence (3).jpg" },
  { title: "Risk & Anomaly Intelligence", verbs: "Identify • Prioritize • Review", image: "/dpi/Risk & Anomaly Intelligence.jpg" },
  { title: "Decision Intelligence", verbs: "Analyze • Predict • Improve", image: "/dpi/Decision Intelligence (4).jpg" },
];

const humanIconProps = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "#c6e84a", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
const humanIcons = [
  <svg key="human-accessible" {...humanIconProps}><circle cx="12" cy="12" r="8.5" /><path d="M12 1v3.5M12 19.5V23M1 12h3.5M19.5 12H23" /><circle cx="12" cy="12" r="2.4" fill="#c6e84a" stroke="none" /></svg>,
  <svg key="human-inclusive" {...humanIconProps}><circle cx="8" cy="7" r="3.5" /><circle cx="16" cy="7" r="3.5" /><circle cx="12" cy="17" r="3.5" fill="#c6e84a" stroke="none" /><path d="M8 10.5l2.7 3.1M16 10.5l-2.7 3.1" /></svg>,
  <svg key="human-connected" {...humanIconProps}><circle cx="4.5" cy="12" r="3" /><circle cx="12" cy="12" r="3" /><circle cx="19.5" cy="12" r="3" /><path d="M7.5 12h3M13.5 12h3" /></svg>,
];

const humanDigitalPillars = [
  { num: "01", title: "Accessible by design", desc: "Simple digital journeys that work the first time, for everyone." },
  { num: "02", title: "Inclusive by design", desc: "Services that hold up across diverse needs, devices and abilities." },
  { num: "03", title: "Connected by design", desc: "Fewer barriers standing between institutions and the services they offer." },
];

const trustPillars = [
  { title: "Secure Architecture", desc: "Security principles incorporated across systems and workflows." },
  { title: "Data Governance", desc: "Structured controls supporting responsible information management." },
  { title: "Privacy-Aware Design", desc: "Processes designed around appropriate access and data handling." },
  { title: "Resilient Operations", desc: "Operational models designed for availability, monitoring and continuity." },
];

const trustIconProps = { width: 30, height: 30, viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
const trustIcons = [
  <svg key="trust-shield" {...trustIconProps}><path d="M16 4l9 3.5V14c0 5.5-3.8 10.3-9 12-5.2-1.7-9-6.5-9-12V7.5L16 4z" /><circle cx="16" cy="13.5" r="3" fill="currentColor" stroke="none" /></svg>,
  <svg key="trust-governance" {...trustIconProps}><rect x="6" y="8" width="20" height="6" rx="3" /><rect x="6" y="15" width="20" height="6" rx="3" fill="currentColor" stroke="none" /><rect x="6" y="22" width="20" height="6" rx="3" /></svg>,
  <svg key="trust-privacy" {...trustIconProps}><path d="M3 16s4-8 13-8 13 8 13 8-4 8-13 8S3 16 3 16z" /><circle cx="16" cy="16" r="3.5" fill="currentColor" stroke="none" /></svg>,
  <svg key="trust-resilient" {...trustIconProps}><path d="M3 16h6l3-7 5 14 3-7h9" /></svg>,
];

const outcomes = [
  { num: "01", word: "ACCESSIBLE", title: "Easier access", image: "/healthcare/faster (2).png", desc: "Simpler digital journeys can make services easier to discover and use." },
  { num: "02", word: "CONNECTED", title: "Connected ecosystems", image: "/healthcare/accurate.png", desc: "Interoperability reduces barriers between systems and institutions." },
  { num: "03", word: "EFFICIENT", title: "More efficient operations", image: "/healthcare/efficient.png", desc: "Automation helps reduce repetitive administrative activity." },
  { num: "04", word: "VISIBLE", title: "Greater visibility", image: "/healthcare/visible.webp", desc: "Connected data creates better operational transparency." },
  { num: "05", word: "SCALABLE", title: "Built for scale", image: "/healthcare/scalable.webp", desc: "Modular digital foundations can evolve as participation and demand grow." },
  { num: "06", word: "INNOVATIVE", title: "Enable innovation", image: "/healthcare/better-experiences.webp", desc: "Open, reusable building blocks allow new services and experiences to emerge." },
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
  { n: "03", title: "Technology + Operations", desc: "Digital platforms supported by the operational capabilities needed to make them work.", icon: "/healthcare/human-digital.svg" },
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

  /* ── Ecosystem carousel ─────────────────────────────────── */
  const ecoTrackRef = useRef<HTMLDivElement | null>(null);
  const [ecoPage, setEcoPage] = useState(0);
  const [ecoVisible, setEcoVisible] = useState(4);

  const [aiActive, setAiActive] = useState(0);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setEcoVisible(1);
      else if (w < 1024) setEcoVisible(2);
      else setEcoVisible(4);
    };
    update();
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => setEcoPage(0);
    mq.addEventListener?.("change", onMq);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      mq.removeEventListener?.("change", onMq);
    };
  }, []);

  const ecoMaxPage = Math.max(0, Math.ceil(ecosystemModules.length / ecoVisible) - 1);

  const scrollEcoToPage = useCallback(
    (p: number) => {
      const track = ecoTrackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(ecoMaxPage, p));
      const card = track.children[0] as HTMLElement | undefined;
      if (!card) return;
      const cardW = card.offsetWidth;
      const gap = 24;
      track.scrollTo({ left: clamped * (cardW + gap) * ecoVisible, behavior: "smooth" });
      setEcoPage(clamped);
    },
    [ecoMaxPage, ecoVisible]
  );

  const canEcoLeft = ecoPage > 0;
  const canEcoRight = ecoPage < ecoMaxPage;

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
        .dpi-head-full .dpi-h2, .dpi-head-full .dpi-body { max-width: none; }
        .dpi-hero { position:relative; overflow:hidden; background:linear-gradient(115deg, ${NAVY} 0%, ${NAVY2} 55%, #14263f 100%); padding: clamp(110px, 13vh, 150px) 0 clamp(70px, 8vh, 100px); display:flex; align-items:center; min-height:100dvh; }
        .dpi-hero > .dpi-wrap { width:100%; }
        .dpi-hero-bg { position:absolute; inset:0; z-index:0; }
        .dpi-hero-video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
        .dpi-hero-inner { position:relative; z-index:2; max-width: 720px; text-align:left; margin:0; }
        .dpi-hero-ctas { display:flex; flex-wrap:wrap; gap:16px; margin-top:32px; justify-content:flex-start; }

        .dpi-land-grid { margin-bottom: 0; }
        .dpi-land-row { display: grid; grid-template-columns: 1fr 1.1fr; gap: 80px; align-items: start; margin-top: 40px; }
        .dpi-land-section { padding-top: clamp(48px, 6vw, 80px); padding-bottom: clamp(40px, 5vw, 60px); position: relative; background: #ffffff; }
        .dpi-land-section::before { content: none; }
        .dpi-land-section::after { content: none; }
        .dpi-land-text p { color: #5B6472; max-width: 440px; font-size: 19px; font-weight: 400; line-height: 1.8; margin: 0 0 12px; }
        .dpi-land-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .dpi-challenge-card {
          background: linear-gradient(160deg, #0E1B2E 0%, #1B2735 100%);
          border: 1px solid rgba(198,232,74,0.14);
          border-radius: 16px;
          padding: 22px 22px 20px;
          position: relative;
          overflow: hidden;
          transition: transform .3s cubic-bezier(.4,0,.2,1), box-shadow .3s ease, border-color .3s ease;
          box-shadow: 0 10px 30px -12px rgba(12,27,48,0.35);
        }
        .dpi-challenge-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background: radial-gradient(120px 60px at 20% 0%, rgba(198,232,74,0.12), transparent 70%);
          opacity: 0;
          transition: opacity .3s ease;
          pointer-events: none;
        }
        .dpi-challenge-card:hover {
          transform: translateY(-5px) scale(1.01);
          box-shadow: 0 20px 44px -12px rgba(12,27,48,0.45);
          border-color: rgba(198,232,74,0.45);
        }
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
          background: #C6E84A;
          color: #0f0f0f;
          box-shadow: 0 2px 12px -3px rgba(198,232,74,0.5);
          flex-shrink: 0;
        }
        .dpi-challenge-icon::after { content: ""; position: absolute; inset: 0; border-radius: 12px; background: inherit; filter: blur(10px); opacity: 0.35; z-index: -1; transition: opacity .3s ease; }
        .dpi-challenge-card:hover .dpi-challenge-icon::after { opacity: 0.55; }
        .dpi-challenge-icon svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
        .dpi-challenge-label { font-size: 15px; font-weight: 600; color: #ffffff; line-height: 1.4; }
        .dpi-approach {
          margin-top: 32px;
          background: linear-gradient(135deg, #0B1D35 0%, #132742 40%, #0F2035 100%);
          border-radius: 14px;
          padding: 22px 28px 20px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 40px -12px rgba(10,22,40,0.25);
        }
        .dpi-approach::before { content: ""; position: absolute; top: -60px; right: -40px; width: 260px; height: 260px; border-radius: 50%; background: radial-gradient(circle, rgba(196,229,56,0.12) 0%, transparent 70%); pointer-events: none; }
        .dpi-approach::after { content: ""; position: absolute; bottom: -40px; left: 30%; width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%); pointer-events: none; }
        .dpi-approach-top { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; position: relative; z-index: 1; }
        .dpi-approach-dot { width: 7px; height: 7px; border-radius: 50%; background: #C4E538; flex-shrink: 0; box-shadow: 0 0 12px rgba(196,229,56,0.5); }
        .dpi-approach-label { font-size: 10px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: rgba(196,229,56,0.7); }
        .dpi-approach-text { font-size: clamp(15px, 1.4vw, 19px); line-height: 1.4; color: rgba(255,255,255,0.92); font-weight: 500; margin: 0; position: relative; z-index: 1; }
        .dpi-approach-text em { font-style: normal; color: #C4E538; font-weight: 600; }

        .dpi-eco-band { background:linear-gradient(160deg, ${NAVY} 0%, ${NAVY2} 100%); }
        .dpi-eco-track { display:flex; gap:24px; overflow-x:auto; scroll-snap-type:x mandatory; scrollbar-width:none; -ms-overflow-style:none; scroll-behavior:smooth; margin-top:56px; padding-bottom:4px; }
        .dpi-eco-track::-webkit-scrollbar { display:none; }
        .dpi-eco-module { flex:0 0 calc((100% - 72px) / 4); position:relative; aspect-ratio:4/5; border-radius:18px; overflow:hidden; background:#101a2c; margin:0; scroll-snap-align:start; scroll-snap-stop:always; cursor:default; transition:transform 0.2s ease, box-shadow 0.2s ease; box-shadow:0 4px 20px rgba(0,0,0,0.3); }
        .dpi-eco-module:hover { transform:scale(1.02); box-shadow:0 8px 32px rgba(0,0,0,0.45); }
        .dpi-eco-module img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; transition:transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .dpi-eco-overlay { position:absolute; inset:0; background:linear-gradient(180deg, rgba(6,12,24,0.05) 30%, rgba(6,12,24,0.82) 100%); transition:background 0.4s ease; }
        .dpi-eco-module:hover img { transform:scale(1.06); }
        .dpi-eco-module:hover .dpi-eco-overlay { background:linear-gradient(180deg, rgba(6,12,24,0.25) 0%, rgba(6,12,24,0.92) 100%); }
        .dpi-eco-body { position:absolute; left:0; right:0; bottom:0; padding:28px; }
        .dpi-eco-num { display:block; font-size:13px; font-weight:700; letter-spacing:0.14em; color:${CYAN}; margin-bottom:6px; }
        .dpi-eco-title { font-size:clamp(17px, 1.45vw, 20px); font-weight:700; margin:0; color:#fff; }
        .dpi-eco-desc { font-size:14px; line-height:1.65; color:rgba(255,255,255,0.75); margin:10px 0 0; display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:3; overflow:hidden; min-height:calc(1.65em * 3); opacity:0; transform:translateY(12px); transition:opacity 0.45s ease, transform 0.45s cubic-bezier(0.16,1,0.3,1); }
        .dpi-eco-module:hover .dpi-eco-desc, .dpi-eco-module:focus-within .dpi-eco-desc { opacity:1; transform:none; }
        .dpi-eco-arrows { display:flex; gap:12px; margin-top:32px; justify-content:flex-end; }
        .dpi-eco-arrow-btn { width:52px; height:52px; border-radius:50%; border:1.5px solid rgba(255,255,255,0.2); background:transparent; color:#FFFFFF; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background 0.2s ease, border-color 0.2s ease, opacity 0.2s ease; padding:0; }
        .dpi-eco-arrow-btn:hover:not(:disabled) { background:rgba(255,255,255,0.08); border-color:rgba(255,255,255,0.4); }
        .dpi-eco-arrow-btn:disabled { opacity:0.25; cursor:default; }

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
        .dpi-cap-visual { position:relative; border-radius:16px; overflow:hidden; aspect-ratio:1; min-height:420px; background:linear-gradient(135deg, #2b2f1a 0%, #0d0f08 100%); }
        .dpi-cap-preview { position:absolute; inset:0; display:block; width:100%; height:100%; object-fit:cover; object-position:center; animation: dpiCapFade 0.32s cubic-bezier(0.16,1,0.3,1); }
        @keyframes dpiCapFade { from { opacity:0; transform: scale(1.03); } to { opacity:1; transform:none; } }

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


        /* --- 08 Open Digital Ecosystems --- */
        .dpi-open { padding: clamp(76px, 8vw, 120px) 0; background:linear-gradient(180deg, ${NAVY} 0%, #141414 100%); }
        .dpi-open-grid { display:grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap:16px; margin-top:48px; }
        .dpi-open-card { position:relative; overflow:hidden; display:flex; flex-direction:row; min-height:180px; border:1px solid rgba(255,255,255,0.14); border-radius:16px; background:rgba(255,255,255,0.03); transition:border-color .3s ease, background .3s ease, transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s ease; }
        .dpi-open-card:hover { background:rgba(198,232,74,0.1); border-color:rgba(198,232,74,0.55); transform:translateY(-4px); box-shadow:0 18px 40px -20px rgba(198,232,74,0.32); }
        .dpi-open-card-body { flex:0 0 56%; padding:20px 12px 20px 22px; display:flex; flex-direction:column; justify-content:flex-end; gap:8px; position:relative; z-index:2; }
        .dpi-open-card-num { font-family: var(--font-syne), Arial, sans-serif; font-size:13px; font-weight:700; letter-spacing:0.08em; color:${CYAN}; transition:color .3s ease; }
        .dpi-open-card:hover .dpi-open-card-num { color:#c9e94a; }
        .dpi-open-card-name { font-family: var(--font-syne), Arial, sans-serif; font-size:18px; font-weight:700; line-height:1.2; color:#fff; margin:0; transition:color .3s ease; }
        .dpi-open-card:hover .dpi-open-card-name { color:#c9e94a; }
        .dpi-open-card-media { position:absolute; right:0; top:0; bottom:0; width:50%; z-index:1; overflow:hidden; -webkit-mask-image:linear-gradient(to right, transparent 0%, #000 46%); mask-image:linear-gradient(to right, transparent 0%, #000 46%); }
        .dpi-open-card-media img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:right center; display:block; transition:transform .7s cubic-bezier(.16,1,.3,1); }
        .dpi-open-card:hover .dpi-open-card-media img { transform:scale(1.06); }

        /* --- 09 AI + DPI (intelligence deck) --- */
        .dpi-ai { padding: clamp(76px, 8vw, 120px) 0; background:linear-gradient(150deg, #0B1220 0%, #141414 60%, ${NAVY2} 100%); }
        .dpi-ai-head { display: grid; grid-template-columns: 1fr; gap: 16px; align-items: start; margin-bottom: 48px; }
        .dpi-ai-lede { font-size: 18px; line-height: 1.8; color: rgba(255,255,255,0.7); max-width: 640px; margin: 8px 0 0; }

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
        .scd-card-tags { font-size: 13.5px; font-weight: 700; letter-spacing: 0.08em; background: rgba(0,0,0,0.35); padding: 8px 16px; border-radius: 999px; display: inline-block; backdrop-filter: blur(4px); max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .scd-card-visual { position: relative; height: 250px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.2); overflow: hidden; display: flex; align-items: center; justify-content: center; box-shadow: 0 20px 40px rgba(0,0,0,0.4); min-width: 0; }
        .scd-visual-thumb { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.3, 0.9, 0.3, 1); }
        .scd-card:hover .scd-visual-thumb { transform: scale(1.05); }
        @media (max-width: 900px) {
          .scd-tabs-bar { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
          .scd-deck { min-height: 420px; }
          .scd-card-inner { grid-template-columns: minmax(0, 1fr); gap: 24px; }
          .scd-card-visual { display: none; }
          .scd-card { padding: 40px 32px; border-radius: 20px; }
        }
        @media (max-width: 640px) {
          .scd-tabs-bar { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .scd-card { padding: 32px 24px; }
        }

        /* --- 10 Human + Digital --- */
        .dpi-human { background:#fafaf8; }
        .dpi-human-grid { display:grid; grid-template-columns: 1.05fr 0.95fr; gap:56px; align-items:start; }
        .dpi-human-badge { display:inline-block; background:${BLUE}; color:#0d0f08; font-size:13px; font-weight:700; line-height:1; padding:12px 20px; border-radius:999px; margin:0 0 28px; }
        .dpi-human-h2 { font-family: var(--font-fraunces), Georgia, serif; font-weight:500; color:#1a1917; font-size: clamp(36px, 4.4vw, 58px); line-height:1.06; letter-spacing:-0.02em; max-width:34ch; margin:0 0 26px; }
        .dpi-human-body { font-size:17px; line-height:1.75; color:#5A5D66; max-width:42ch; margin:0; }
        .dpi-human-panel { position:relative; overflow:hidden; align-self:start; border-radius:24px; padding: clamp(28px, 3.4vw, 44px); background: radial-gradient(130% 120% at 100% 0%, #2b2f1a 0%, #171a0e 48%, #0d0f08 100%); }
        .dpi-human-grit { position:absolute; top:0; right:0; width:260px; height:220px; pointer-events:none; background-image: radial-gradient(rgba(198,232,74,0.5) 1.2px, transparent 1.2px); background-size:13px 13px; -webkit-mask-image: radial-gradient(circle at 78% 8%, #000 0%, transparent 70%); mask-image: radial-gradient(circle at 78% 8%, #000 0%, transparent 70%); }
        .dpi-human-rows { position:relative; }
        .dpi-human-row { position:relative; display:flex; align-items:flex-start; gap:18px; padding: clamp(20px, 2.4vw, 28px) 0; }
        .dpi-human-row + .dpi-human-row { border-top:1px solid rgba(255,255,255,0.1); }
        .dpi-human-icon { flex-shrink:0; width:46px; height:46px; border-radius:12px; display:flex; align-items:center; justify-content:center; background:rgba(198,232,74,0.12); border:1px solid rgba(198,232,74,0.35); }
        .dpi-human-icon svg { display:block; }
        .dpi-human-text { position:relative; z-index:1; }
        .dpi-human-title { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size:17px; font-weight:700; color:#F2F3EA; margin:0 0 6px; }
        .dpi-human-desc { font-size:14.5px; line-height:1.6; color:rgba(255,255,255,0.62); margin:0; max-width:34ch; }
        .dpi-human-ghost { position:absolute; top:4px; right:0; z-index:0; font-family: var(--font-fraunces), Georgia, serif; font-weight:500; font-size:56px; line-height:1; color:rgba(255,255,255,0.05); }
        .dpi-human-closer { border-top:1px solid rgba(255,255,255,0.1); padding: clamp(20px, 2.4vw, 26px) 0 0; margin:6px 0 0; font-family: var(--font-fraunces), Georgia, serif; font-style:italic; font-weight:500; font-size: clamp(18px, 1.8vw, 21px); line-height:1.4; color:${BLUE}; }
        @media (max-width: 880px) {
          .dpi-human-grid { grid-template-columns: 1fr; gap:40px; }
          .dpi-human-panel { padding:28px 24px; }
          .dpi-human-ghost { display:none; }
        }


        /* --- 12 Trust, Security & Governance --- */
        .dpi-trust { background:linear-gradient(160deg, ${NAVY} 0%, ${NAVY2} 100%); --t-accent:${BLUE}; --t-card:#1f1f1f; --t-border:#2e2e2e; --t-muted:#b8b8b8; }
        .dpi-trust-cards { display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:20px; margin-top:36px; }
        .dpi-trust-card { display:flex; align-items:center; gap:20px; min-width:0; background:var(--t-card); border:1px solid var(--t-border); border-radius:20px; padding:20px; transition: border-color .2s ease, transform .2s ease; }
        .dpi-trust-card:hover { border-color:var(--t-accent); transform:translateY(-2px); }
        .dpi-trust-card:focus-visible { outline:2px solid var(--t-accent); outline-offset:3px; }
        .dpi-trust-tile { flex:0 0 64px; width:64px; height:64px; border-radius:16px; background:var(--t-accent); color:${NAVY}; display:flex; align-items:center; justify-content:center; }
        .dpi-trust-tile svg { width:30px; height:30px; }
        .dpi-trust-text { min-width:0; }
        .dpi-trust-title { font-family:var(--font-syne), Arial, sans-serif; font-size:18px; font-weight:700; color:#f6f7ef; margin:0 0 4px; }
        .dpi-trust-desc { font-size:15px; line-height:1.5; color:var(--t-muted); margin:0; }

        /* --- 13 Outcomes --- */
        .dpi-outcomes { background: #ffffff; }
        .dpi-out-grid { display:grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap:14px; margin-top:40px; }
        .dpi-outcome { position:relative; overflow:hidden; background:#f5f5f3; border-radius:14px; display:flex; flex-direction:row; min-height:180px; box-shadow:0 2px 12px -4px rgba(12,27,48,0.08); transition:transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, background-color 0.4s cubic-bezier(0.16,1,0.3,1); }
        .dpi-outcome:hover { transform:translateY(-4px); background:#0c1b2e; box-shadow:0 16px 40px -14px rgba(12,27,48,0.20); }
        .dpi-outcome-body { flex:0 0 50%; padding:18px 14px 18px 20px; display:flex; flex-direction:column; justify-content:flex-end; position:relative; z-index:2; pointer-events:none; }
        .dpi-outcome-body * { pointer-events:auto; }
        .dpi-outcome-eyebrow { font-size:9px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:#8a97a8; margin:0 0 8px; transition:color 0.35s ease; }
        .dpi-outcome:hover .dpi-outcome-eyebrow { color:#6b8299; }
        .dpi-outcome-title { font-family: var(--font-syne), Arial, Helvetica, sans-serif; font-size:clamp(17px, 1.45vw, 21px); font-weight:800; letter-spacing:-0.03em; line-height:1.1; color:#0a1628; margin:0 0 8px; transition:color 0.35s ease; }
        .dpi-outcome:hover .dpi-outcome-title { color:#ffffff; }
        .dpi-outcome-desc { font-size:11.5px; line-height:1.55; color:#5a6b7f; margin:0; max-width:26ch; transition:color 0.35s ease; }
        .dpi-outcome:hover .dpi-outcome-desc { color:#7a96ae; }
        .dpi-outcome-media { position:absolute; right:0; top:0; bottom:0; width:68%; z-index:1; overflow:hidden; }
        .dpi-outcome-media img { position:absolute; inset:0; width:100%; height:100%; object-fit:contain; object-position:right center; display:block; transition:transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .dpi-outcome:hover .dpi-outcome-media img { transform:scale(1.05); }

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
        .dpi-transform { margin-top:clamp(8px,1vw,16px); padding:0 clamp(28px,5vw,80px) clamp(64px,8vw,120px); background:#FFFFFF; overflow:hidden; }
        .dpi-transform-badge { display:inline-block; align-self:flex-start; background:#C6E84A; color:#0f0f0f; padding:8px 20px; border-radius:999px; font-size:14px; font-weight:600; letter-spacing:0.5px; font-variant:small-caps; margin-bottom:clamp(12px,1.6vw,16px); }
        .dpi-transform-grid { display:grid; grid-template-columns:1.1fr 1fr; gap:clamp(40px,5vw,72px); align-items:flex-start; }
        .dpi-transform-left { display:flex; flex-direction:column; max-width:560px; padding-top:clamp(8px,1vw,16px); }
        .dpi-tl-step { display:flex; align-items:flex-start; gap:24px; }
        .dpi-tl-step--approach { align-items:center; }
        .dpi-tl-icon { flex:0 0 auto; width:52px; height:52px; border-radius:50%; border:1.5px solid #C8D1DD; background:#FFFFFF; color:#93A0B0; display:flex; align-items:center; justify-content:center; }
        .dpi-tl-icon svg { width:22px; height:22px; }
        .dpi-tl-body { flex:1; min-width:0; }
        .dpi-tl-body h3 { font-family:var(--font-syne),Arial,Helvetica,sans-serif; font-size:clamp(20px,2vw,24px); font-weight:700; margin:0; color:#0C1B30; line-height:1.25; }
        .dpi-tl-body p { font-size:15px; line-height:1.7; margin:12px 0 0; color:#5A6B7F; }
        .dpi-tl-step--approach .dpi-tl-body { background:#F3F5F7; border-left:4px solid ${CYAN}; border-radius:16px; padding:24px 26px; }
        .dpi-tl-link { flex:0 0 auto; width:0; height:44px; margin:12px 0 12px 25px; border-left:2px dashed #C6E84A; }
        .dpi-pot-card { background:#0C1B30; border-radius:22px; padding:clamp(30px,3.5vw,44px); color:#FFFFFF; box-shadow:0 34px 70px -40px rgba(7,20,38,0.5); }
        .dpi-pot-title { font-family:var(--font-syne),Arial,Helvetica,sans-serif; font-size:clamp(24px,2.6vw,32px); font-weight:700; margin:0 0 clamp(18px,2vw,24px); color:#FFFFFF; line-height:1.25; }
        .dpi-pot-checklist { list-style:none; margin:0; padding:0; }
        .dpi-pot-checklist li { display:flex; align-items:center; gap:14px; padding:16px 0; border-bottom:1px solid rgba(255,255,255,0.1); font-size:15px; font-weight:600; color:#FFFFFF; }
        .dpi-pot-checklist li:last-child { border-bottom:none; }
        .dpi-pot-tick { flex:0 0 auto; display:inline-flex; align-items:center; justify-content:center; color:${CYAN}; }
        .dpi-pot-tick svg { width:18px; height:18px; }
        .dpi-transform-cta { display:inline-flex; align-items:center; justify-content:center; gap:10px; align-self:flex-start; background:#C6E84A; color:#0f0f0f; padding:15px 30px; border-radius:999px; font-weight:700; font-size:15px; letter-spacing:0.02em; text-decoration:none; margin-top:28px; transition:background .25s ease, transform .25s cubic-bezier(0.16,1,0.3,1), box-shadow .25s ease; }
        .dpi-transform-cta span { display:inline-block; transition:transform .2s ease; }
        .dpi-transform-cta:hover { background:#D9F77E; transform:translateY(-2px); box-shadow:0 16px 34px -14px rgba(198,232,74,0.55); }
        .dpi-transform-cta:hover span { transform:translateX(3px); }
        @media (prefers-reduced-motion:reduce){ .dpi-transform-cta:hover{ transform:none; } .dpi-transform-cta:hover span{ transform:none; } }
        @media (max-width:900px){ .dpi-transform{ margin-top:clamp(12px,3vw,24px); padding:0 24px clamp(48px,8vw,72px); } .dpi-transform-grid{ grid-template-columns:1fr; gap:40px; } .dpi-transform-left{ max-width:none; } }
        @media (max-width:520px){ .dpi-tl-step{ gap:16px; } .dpi-tl-icon{ width:46px; height:46px; } .dpi-tl-icon svg{ width:20px; height:20px; } .dpi-tl-link{ margin-left:22px; height:36px; margin-top:10px; margin-bottom:10px; } .dpi-tl-step--approach .dpi-tl-body{ padding:20px 18px; } }

        /* --- 17 Final CTA --- */
        .dpi-final { position:relative; overflow:hidden; background:linear-gradient(115deg, #242424 0%, ${NAVY} 65%, #141414 100%); padding: clamp(100px, 12vw, 160px) 0; }
        .dpi-final-inner { position:relative; z-index:2; text-align:center; max-width:720px; margin:0 auto; }
        .dpi-final-h2 { font-family: var(--font-syne), Arial, sans-serif; font-size: clamp(32px, 4.5vw, 54px); color:#fff; font-weight:700; line-height:1.1; margin:0 0 20px; }
        .dpi-final-body { font-size:17px; line-height:1.7; color:rgba(255,255,255,0.8); margin:0 auto 36px; max-width:60ch; }
        .dpi-final-ctas { display:flex; flex-wrap:wrap; gap:16px; justify-content:center; }

        @media (hover:none) {
          .dpi-eco-desc { opacity:1; transform:none; }
        }

        @media (max-width: 1080px) {
          .dpi-impact-grid { grid-template-columns: repeat(2, 1fr); }
          .dpi-pension-cols { grid-template-columns: 1fr; }
          .dpi-open-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 1023px) {
          .dpi-eco-module { flex: 0 0 calc((100% - 24px) / 2); }
        }
        @media (max-width: 639px) {
          .dpi-eco-module { flex: 0 0 100%; }
        }
        @media (max-width: 900px) {
          .dpi-land-row { grid-template-columns: 1fr; }
          .dpi-cap-panel { grid-template-columns: 1fr; }
          .dpi-out-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .dpi-why-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .dpi-pstep-detail { grid-template-columns: 1fr; }
        }
        @media (max-width: 720px) {
          .dpi-impact-grid { grid-template-columns: 1fr; }
          .dpi-cap-list { grid-template-columns: 1fr; }
          .dpi-pstep-list { grid-template-columns: 1fr; }
          .dpi-out-grid { grid-template-columns: 1fr; }
          .dpi-why-grid { grid-template-columns: 1fr; }
          .dpi-why-grid > .dpi-why-card { min-width: 0; }
          .dpi-why-card h3 { overflow-wrap: anywhere; }
          .dpi-layer { grid-template-columns: 1fr; gap: 8px; }
          .dpi-open-grid { grid-template-columns: 1fr; }
          .dpi-open-card-media { display: none; }
          .dpi-open-card-body { flex: 1 1 auto; }
        }
        @media (max-width: 768px) {
          .dpi-trust-cards { grid-template-columns: 1fr; }
          .dpi-trust-tile { flex-basis:52px; width:52px; height:52px; border-radius:14px; }
          .dpi-trust-tile svg { width:26px; height:26px; }
          .dpi-trust .dpi-h2 { font-size: clamp(26px, 6.5vw, 40px); }
        }
        @media (max-width: 560px) {
          .dpi-land-cards { grid-template-columns: 1fr; }
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
            <h1 className="dpi-h1">Digital foundations for a <span style={{ color: "#C6E84A" }}>connected world.</span></h1>
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
            <h2 className="dpi-h2">Public services are changing. <span style={{ color: "#C6E84A" }}>The infrastructure behind them must change too.</span></h2>
          </div>
          <div className="dpi-land-row dpi-reveal">
            <div className="dpi-land-text">
              <p className="dpi-land-lede">&emsp;People increasingly expect essential services to be simple, accessible and connected. Yet institutions often operate across fragmented systems, disconnected databases, manual processes and complex service-delivery environments.</p>
              <p className="dpi-land-copy">&emsp;Digital Public Infrastructure creates reusable foundations that allow identity, information, transactions and services to move securely across an ecosystem.</p>
            </div>
            <div className="dpi-land-cards">
              {challengeList.map((item, i) => (
                <article key={item} className="dpi-challenge-card">
                  <div className="dpi-challenge-top">
                    <div className="dpi-challenge-icon" aria-hidden="true">
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
            <h2 className="dpi-h2">One foundation. <span style={{ color: "#C6E84A" }}>Multiple possibilities.</span></h2>
          </div>
          <div className="dpi-eco dpi-reveal">
            <div ref={ecoTrackRef} className="dpi-eco-track">
              {ecosystemModules.map((m, i) => (
                <figure key={m.name} className="dpi-eco-module">
                  <img src={"/dpi/" + m.title + ".jpg"} alt={m.title} loading="lazy" decoding="async" />
                  <div className="dpi-eco-overlay" aria-hidden="true" />
                  <figcaption className="dpi-eco-body">
                    <span className="dpi-eco-num">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="dpi-eco-title">{m.title}</h3>
                    <p className="dpi-eco-desc">{m.desc}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="dpi-eco-arrows">
              <button className="dpi-eco-arrow-btn" disabled={!canEcoLeft} onClick={() => scrollEcoToPage(ecoPage - 1)} aria-label="Previous ecosystem">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button className="dpi-eco-arrow-btn" disabled={!canEcoRight} onClick={() => scrollEcoToPage(ecoPage + 1)} aria-label="Next ecosystem">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── 04 WHERE DPI CREATES IMPACT ─────────────────── */}
      <section className="dpi-section">
        <div className="dpi-wrap">
          <div className="dpi-reveal dpi-head-full">
            <Eyebrow text="WHERE DPI CREATES IMPACT" />
            <h2 className="dpi-h2">Digital infrastructure that <span style={{ color: "#C6E84A" }}>works across society.</span></h2>
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
          <div className="dpi-reveal dpi-head-full">
            <Eyebrow text="SYTRION DPI CAPABILITIES" />
            <h2 className="dpi-h2">From digital building blocks to <span style={{ color: "#C6E84A" }}>connected ecosystems.</span></h2>
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
                onMouseEnter={() => setCapTab(i)}
                onFocus={() => setCapTab(i)}
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
              <img
                className="dpi-cap-preview"
                src={capabilityTabs[capTab].image}
                alt={capabilityTabs[capTab].title + " capability preview"}
                width={627}
                height={627}
                decoding="async"
              />
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
              <h2 className="dpi-h2">Digital operations for a lifetime of <span style={{ color: "#C6E84A" }}>financial security.</span></h2>
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
      <EcosystemHoneycomb />

      {/* ───────────── 08 OPEN DIGITAL ECOSYSTEMS ───────────── */}
      <section className="dpi-open">
        <div className="dpi-wrap">
          <div className="dpi-reveal">
            <Eyebrow text="OPEN DIGITAL ECOSYSTEMS" dark />
            <h2 className="dpi-h2">Build ecosystems.<span style={{ color: "#C6E84A" }}> Not silos.</span></h2>
            <p className="dpi-body" style={{ color: "rgba(255,255,255,0.72)" }}>The next generation of digital infrastructure is not built around one application or institution. It connects participants through common standards, interoperable systems and shared digital building blocks — allowing innovation to happen across the ecosystem.</p>
          </div>
          <div className="dpi-open-grid dpi-reveal">
            {openEcosystemLayers.map((l, i) => (
              <article key={l.name} className="dpi-open-card">
                <div className="dpi-open-card-body">
                  <span className="dpi-open-card-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="dpi-open-card-name">{l.name}</h3>
                </div>
                <div className="dpi-open-card-media" aria-hidden="true">
                  <img src={l.image} alt="" loading="lazy" decoding="async" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 09 AI + DPI ───────────── */}
      <section className="dpi-ai">
        <div className="dpi-wrap">
          <div className="dpi-ai-head dpi-reveal">
            <div>
              <Eyebrow text="AI + DPI" dark />
              <h2 className="dpi-h2">From digital infrastructure to <span style={{ color: "#C6E84A" }}>intelligent infrastructure.</span></h2>
            </div>
            <p className="dpi-ai-lede">Digital infrastructure connects systems. AI can help make those systems more responsive, efficient and intelligent.</p>
          </div>

          <div className="scd-deck-wrapper dpi-reveal">
            <div className="scd-deck">
              <div className="scd-tabs-bar" role="tablist" aria-label="AI and digital public infrastructure capabilities">
                {aiNodes.map((n, i) => (
                  <button
                    key={n.title}
                    role="tab"
                    id={`dpi-ai-tab-${i}`}
                    aria-selected={aiActive === i}
                    aria-controls={`dpi-ai-card-${i}`}
                    className={`scd-tab ${aiActive === i ? "is-active" : ""}`}
                    onClick={() => setAiActive(i)}
                    onMouseEnter={() => setAiActive(i)}
                    onFocus={() => setAiActive(i)}
                  >
                    <span className="scd-tab-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="scd-tab-text">{n.title}</span>
                  </button>
                ))}
              </div>

              <div className="scd-cards-stack">
                {aiNodes.map((n, i) => {
                  const isActive = aiActive === i;
                  return (
                    <article
                      key={n.title}
                      id={`dpi-ai-card-${i}`}
                      role="tabpanel"
                      aria-labelledby={`dpi-ai-tab-${i}`}
                      className={`scd-card ${isActive ? "is-active" : ""}`}
                      style={{ background: "linear-gradient(135deg, #0C1B30 0%, #243142 100%)" }}
                    >
                      <div className="scd-card-bg-img">
                        <img src={n.image} alt={n.title} loading="lazy" decoding="async" />
                        <div className="scd-card-overlay" />
                      </div>

                      <div className="scd-card-inner">
                        <div className="scd-card-main">
                          <span className="scd-card-num">{String(i + 1).padStart(2, "0")}</span>
                          <h3 className="scd-card-title">{n.title}</h3>
                          <div className="scd-card-tags">{n.verbs}</div>
                        </div>
                        <div className="scd-card-visual" aria-hidden="true">
                          <img src={n.image} alt="" className="scd-visual-thumb" />
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

      {/* ─────────────────── 10 HUMAN + DIGITAL ─────────────────── */}
      <section className="dpi-section dpi-human">
        <div className="dpi-wrap">
          <div className="dpi-human-grid">
            <div className="dpi-human-copy dpi-reveal">
              <span className="dpi-human-badge">Human + digital: technology for everyone</span>
              <h2 className="dpi-human-h2">Digital infrastructure matters when <br /><span style={{ color: "#C6E84A" }}> people can actually use it.</span></h2>
              <p className="dpi-human-body">Technology alone does not create inclusion. Digital services need to be accessible, intuitive and designed around the people and institutions they serve.</p>
            </div>
            <div className="dpi-human-panel dpi-reveal">
              <div className="dpi-human-grit" aria-hidden="true" />
              <div className="dpi-human-rows">
                {humanDigitalPillars.map((p, i) => (
                  <article key={p.title} className="dpi-human-row">
                    <span className="dpi-human-ghost" aria-hidden="true"></span>
                    <div className="dpi-human-icon">{humanIcons[i]}</div>
                    <div className="dpi-human-text">
                      <h3 className="dpi-human-title">{p.title}</h3>
                      <p className="dpi-human-desc">{p.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
              <p className="dpi-human-closer">Infrastructure becomes meaningful when technology translates into access.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── 11 INTELLIGENT SERVICE DELIVERY ─────────────────── */}
      <ServiceStaircase />

      {/* ───────────── 12 TRUST, SECURITY & GOVERNANCE ───────────── */}
      <section className="dpi-section dpi-trust">
        <div className="dpi-wrap">
          <div className="dpi-reveal dpi-head-full">
            <Eyebrow text="TRUST, SECURITY & GOVERNANCE" dark />
            <h2 className="dpi-h2">Digital ecosystems need trust at <span style={{ color: "#C6E84A" }}>their core.</span></h2>
            <p className="dpi-body" style={{ color: "rgba(255,255,255,0.72)" }}>As digital services connect more institutions, systems and users, security, privacy, governance and accountability become fundamental to sustainable infrastructure.</p>
          </div>
          <div className="dpi-trust-cards dpi-reveal">
            {trustPillars.map((p, i) => (
              <article key={p.title} className="dpi-trust-card">
                <span className="dpi-trust-tile" aria-hidden="true">{trustIcons[i]}</span>
                <div className="dpi-trust-text">
                  <h3 className="dpi-trust-title">{p.title}</h3>
                  <p className="dpi-trust-desc">{p.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── 13 OUTCOMES ─────────────────── */}
      <section className="dpi-section dpi-outcomes">
        <div className="dpi-wrap">
          <div className="dpi-reveal">
            <Eyebrow text="OUTCOMES" />
            <h2 className="dpi-h2">Infrastructure designed to create impact <span style={{ color: "#C6E84A" }}>at scale.</span></h2>
          </div>
          <div className="dpi-out-grid dpi-reveal">
            {outcomes.map((o) => (
              <article key={o.word} className="dpi-outcome">
                <div className="dpi-outcome-body">
                  <p className="dpi-outcome-eyebrow">{o.num} / {o.word}</p>
                  <h3 className="dpi-outcome-title">{o.title}</h3>
                  <p className="dpi-outcome-desc">{o.desc}</p>
                </div>
                <div className="dpi-outcome-media">
                  <img src={o.image} alt={o.title} loading="lazy" decoding="async" />
                </div>
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
            <h2 className="dpi-h2">One connected <span style={{ color: "#C6E84A" }}>digital public ecosystem.</span></h2>
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
            <h2 className="dpi-h2">Technology architecture. Operational intelligence.<span style={{ color: "#C6E84A" }}> Human impact.</span></h2>
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
        <div className="dpi-transform-grid">
          <div className="dpi-transform-left">
          <span className="dpi-transform-badge">Transformation in Action</span>
          <div className="dpi-tl-step">
            <span className="dpi-tl-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </span>
            <div className="dpi-tl-body">
              <h3>The Challenge</h3>
              <p>Public-service ecosystems can involve disconnected systems, repeated information requests, manual document processing and complex institutional workflows.</p>
            </div>
          </div>
          <div className="dpi-tl-link" aria-hidden="true" />
          <div className="dpi-tl-step dpi-tl-step--approach">
            <span className="dpi-tl-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </span>
            <div className="dpi-tl-body">
              <h3>The Sytrion Approach</h3>
              <p>Create connected digital journeys using interoperable architecture, reusable digital building blocks, intelligent workflows, automation and data-driven operations.</p>
            </div>
          </div>
        </div>
        <div className="dpi-pot-card">
          <h3 className="dpi-pot-title">The Potential</h3>
          <ul className="dpi-pot-checklist">
            {transformPotential.map((item) => (
              <li key={item}><span className="dpi-pot-tick" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12.5 9.5 18 20 6.5" stroke="#C6E84A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span> {item}</li>
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
            <h2 className="dpi-final-h2">Ready to build intelligent <span style={{ color: "#C6E84A" }}>digital infrastructure?</span></h2>
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


