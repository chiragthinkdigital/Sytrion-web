"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import WhySytrion from "./WhySytrion";

/* ─────────────────────────────────────────────────────────────────────────────
   Solutions Page — Redesigned
   ───────────────────────────────────────────────────────────────────────────── */

const icons: Record<string, React.ReactNode> = {
  sparkles: (
    <>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </>
  ),
  cpu: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </>
  ),
  settings: (
    <>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </>
  ),
  "bar-chart": (
    <>
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </>
  ),
  ship: (
    <>
      <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" />
      <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
      <path d="M12 10v4" />
      <path d="M12 2v3" />
    </>
  ),
  "heart-pulse": (
    <>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
    </>
  ),
  anchor: (
    <>
      <path d="M12 22V8" />
      <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
      <circle cx="12" cy="5" r="3" />
    </>
  ),
  "file-text": (
    <>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </>
  ),
  "file-check": (
    <>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="m9 15 2 2 4-4" />
    </>
  ),
  "file-search": (
    <>
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
      <circle cx="11.5" cy="14.5" r="2.5" />
      <path d="m13.5 16.5 2.5 2.5" />
    </>
  ),
  receipt: (
    <>
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 17.5v-11" />
    </>
  ),
  "alert-circle": (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </>
  ),
  workflow: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="13" width="8" height="8" rx="2" />
      <path d="M7 11v4a2 2 0 0 0 2 2h4" />
    </>
  ),
  zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  "trending-up": (
    <>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </>
  ),
  "check-circle": (
    <>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </>
  ),
  shield: (
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  ),
  "shield-check": (
    <>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  gauge: (
    <>
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </>
  ),
  layers: (
    <>
      <path d="m12 2 10 6.5-10 6.5L2 8.5Z" />
      <path d="m2 15.5 10 6.5 10-6.5" />
      <path d="m2 11.5 10 6.5 10-6.5" />
    </>
  ),
  "mouse-pointer": <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />,
  clipboard: (
    <>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </>
  ),
  "scan-text": (
    <>
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M7 8h8" />
      <path d="M7 12h10" />
      <path d="M7 16h6" />
    </>
  ),
};

/* ── Shared helpers ────────────────────────────────────────────────────────── */

function SolIcon({ name, size = 22 }: { name: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="sol-eyebrow">{children}</span>;
}

function SectionTitle({ children, dark, style }: { children: React.ReactNode; dark?: boolean; style?: React.CSSProperties }) {
  return <h2 className={"sol-section-title" + (dark ? " sol-section-title--dark" : "")} style={style}>{children}</h2>;
}

/* ── Approach Timeline (scroll-triggered) ─────────────────────────────────── */

function ApproachTimeline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const setProgress = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const start = vh * 0.92;
      const end = vh * 0.5;
      const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      el.style.setProperty("--rail-progress", String(p));
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);

    setProgress();
    window.addEventListener("scroll", setProgress, { passive: true });
    window.addEventListener("resize", setProgress);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", setProgress);
      window.removeEventListener("resize", setProgress);
    };
  }, []);

  return (
    <div className="ap-timeline" ref={ref} style={{ marginTop: "48px" }}>
      <div className="ap-scroller">
        <div className="ap-inner">
          <div className="ap-rail" aria-hidden="true">
            <span className="ap-rail-fill" />
          </div>
          <div className="ap-track">
            {approachSteps.map((step, i) => (
              <div
                key={step.title}
                className="ap-step"
                style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
              >
                <span className="ap-node" aria-hidden="true" />
                <span className="sol-step-num">Step {String(i + 1).padStart(2, "0")}</span>
                <h4 className="sol-step-title">{step.title}</h4>
                <p className="sol-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Shared Card Component ─────────────────────────────────────────────────── */

function SolutionCard({
  icon,
  title,
  desc,
  variant = "dark",
  iconStyle = "square",
  image,
}: {
  icon: string;
  title: string;
  desc: string;
  variant?: "dark" | "light";
  iconStyle?: "square" | "circle";
  image?: string;
}) {
  return (
    <div className={"sol-card sol-card--" + variant}>
      {image && (
        <div className="sol-card-img">
          <img src={image} alt={title} loading="lazy" decoding="async" />
        </div>
      )}
      <div className={"sol-card-icon sol-card-icon--" + iconStyle}>
        <SolIcon name={icon} size={22} />
      </div>
      <h4 className={"sol-card-title" + (variant === "dark" ? " sol-card-title--dark" : "")}>{title}</h4>
      <p className={"sol-card-desc" + (variant === "dark" ? " sol-card-desc--dark" : "")}>{desc}</p>
    </div>
  );
}

/* ── Data Capability Card ───────────────────────────────────────────────────── */

/* ── Data Engineering — Card Visuals ────────────────────────────────────────── */

function DEVisual01() {
  return (
    <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }} aria-hidden="true">
      <defs>
        <radialGradient id="de01-g1" cx="25%" cy="30%" r="50%"><stop offset="0%" stopColor="#93e857" stopOpacity="0.13" /><stop offset="100%" stopColor="#93e857" stopOpacity="0" /></radialGradient>
        <radialGradient id="de01-g2" cx="75%" cy="70%" r="45%"><stop offset="0%" stopColor="#93e857" stopOpacity="0.08" /><stop offset="100%" stopColor="#93e857" stopOpacity="0" /></radialGradient>
        <radialGradient id="de01-g3" cx="60%" cy="25%" r="35%"><stop offset="0%" stopColor="#b9f16c" stopOpacity="0.06" /><stop offset="100%" stopColor="#b9f16c" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="800" height="500" fill="#08090a" />
      <rect width="800" height="500" fill="url(#de01-g1)" />
      <rect width="800" height="500" fill="url(#de01-g2)" />
      <rect width="800" height="500" fill="url(#de01-g3)" />
      {/* Node constellation — converging streams */}
      <line x1="80" y1="80" x2="340" y2="220" stroke="#93e857" strokeWidth="0.7" opacity="0.25" />
      <line x1="120" y1="420" x2="340" y2="260" stroke="#93e857" strokeWidth="0.7" opacity="0.2" />
      <line x1="60" y1="260" x2="340" y2="240" stroke="#b9f16c" strokeWidth="0.5" opacity="0.15" />
      <line x1="200" y1="60" x2="360" y2="200" stroke="#93e857" strokeWidth="0.5" opacity="0.18" />
      <line x1="340" y1="240" x2="580" y2="180" stroke="#93e857" strokeWidth="0.7" opacity="0.22" />
      <line x1="340" y1="240" x2="600" y2="340" stroke="#93e857" strokeWidth="0.7" opacity="0.2" />
      <line x1="340" y1="240" x2="700" y2="200" stroke="#b9f16c" strokeWidth="0.5" opacity="0.15" />
      <line x1="340" y1="240" x2="520" y2="420" stroke="#93e857" strokeWidth="0.5" opacity="0.18" />
      <line x1="580" y1="180" x2="720" y2="120" stroke="#93e857" strokeWidth="0.5" opacity="0.15" />
      <line x1="600" y1="340" x2="740" y2="400" stroke="#b9f16c" strokeWidth="0.5" opacity="0.12" />
      {/* Nodes */}
      <circle cx="80" cy="80" r="4" fill="#93e857" opacity="0.4" />
      <circle cx="120" cy="420" r="3.5" fill="#93e857" opacity="0.35" />
      <circle cx="60" cy="260" r="3" fill="#b9f16c" opacity="0.3" />
      <circle cx="200" cy="60" r="3" fill="#93e857" opacity="0.35" />
      <circle cx="340" cy="240" r="7" fill="#93e857" opacity="0.5" />
      <circle cx="340" cy="240" r="3" fill="#08090a" />
      <circle cx="580" cy="180" r="4" fill="#93e857" opacity="0.4" />
      <circle cx="600" cy="340" r="3.5" fill="#93e857" opacity="0.35" />
      <circle cx="700" cy="200" r="3" fill="#b9f16c" opacity="0.3" />
      <circle cx="520" cy="420" r="3" fill="#93e857" opacity="0.3" />
      <circle cx="720" cy="120" r="2.5" fill="#93e857" opacity="0.25" />
      <circle cx="740" cy="400" r="2.5" fill="#b9f16c" opacity="0.25" />
    </svg>
  );
}

function DEVisual02() {
  return (
    <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }} aria-hidden="true">
      <defs>
        <radialGradient id="de02-g1" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#93e857" stopOpacity="0.14" /><stop offset="100%" stopColor="#93e857" stopOpacity="0" /></radialGradient>
        <radialGradient id="de02-g2" cx="20%" cy="75%" r="40%"><stop offset="0%" stopColor="#b9f16c" stopOpacity="0.06" /><stop offset="100%" stopColor="#b9f16c" stopOpacity="0" /></radialGradient>
        <radialGradient id="de02-g3" cx="80%" cy="25%" r="35%"><stop offset="0%" stopColor="#93e857" stopOpacity="0.07" /><stop offset="100%" stopColor="#93e857" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="800" height="500" fill="#08090a" />
      <rect width="800" height="500" fill="url(#de02-g1)" />
      <rect width="800" height="500" fill="url(#de02-g2)" />
      <rect width="800" height="500" fill="url(#de02-g3)" />
      {/* Node constellation — central hub with radiating connections */}
      <line x1="140" y1="100" x2="400" y2="250" stroke="#93e857" strokeWidth="0.7" opacity="0.22" />
      <line x1="100" y1="380" x2="400" y2="250" stroke="#93e857" strokeWidth="0.7" opacity="0.2" />
      <line x1="660" y1="120" x2="400" y2="250" stroke="#b9f16c" strokeWidth="0.7" opacity="0.2" />
      <line x1="700" y1="400" x2="400" y2="250" stroke="#93e857" strokeWidth="0.7" opacity="0.18" />
      <line x1="400" y1="60" x2="400" y2="250" stroke="#93e857" strokeWidth="0.5" opacity="0.15" />
      <line x1="400" y1="440" x2="400" y2="250" stroke="#b9f16c" strokeWidth="0.5" opacity="0.15" />
      <line x1="60" y1="250" x2="400" y2="250" stroke="#93e857" strokeWidth="0.5" opacity="0.12" />
      <line x1="740" y1="250" x2="400" y2="250" stroke="#93e857" strokeWidth="0.5" opacity="0.12" />
      {/* Cross connections */}
      <line x1="140" y1="100" x2="660" y2="120" stroke="#93e857" strokeWidth="0.4" opacity="0.1" />
      <line x1="100" y1="380" x2="700" y2="400" stroke="#b9f16c" strokeWidth="0.4" opacity="0.1" />
      <line x1="140" y1="100" x2="100" y2="380" stroke="#93e857" strokeWidth="0.3" opacity="0.08" />
      <line x1="660" y1="120" x2="700" y2="400" stroke="#93e857" strokeWidth="0.3" opacity="0.08" />
      {/* Nodes */}
      <circle cx="140" cy="100" r="5" fill="#93e857" opacity="0.45" />
      <circle cx="100" cy="380" r="4.5" fill="#93e857" opacity="0.4" />
      <circle cx="660" cy="120" r="5" fill="#b9f16c" opacity="0.4" />
      <circle cx="700" cy="400" r="4" fill="#93e857" opacity="0.35" />
      <circle cx="400" cy="60" r="3.5" fill="#93e857" opacity="0.3" />
      <circle cx="400" cy="440" r="3" fill="#b9f16c" opacity="0.3" />
      <circle cx="60" cy="250" r="3" fill="#93e857" opacity="0.25" />
      <circle cx="740" cy="250" r="3" fill="#93e857" opacity="0.25" />
      <circle cx="400" cy="250" r="9" fill="#93e857" opacity="0.35" />
      <circle cx="400" cy="250" r="4" fill="#08090a" />
    </svg>
  );
}

function DEVisual03() {
  return (
    <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }} aria-hidden="true">
      <defs>
        <radialGradient id="de03-g1" cx="30%" cy="40%" r="50%"><stop offset="0%" stopColor="#93e857" stopOpacity="0.12" /><stop offset="100%" stopColor="#93e857" stopOpacity="0" /></radialGradient>
        <radialGradient id="de03-g2" cx="70%" cy="60%" r="45%"><stop offset="0%" stopColor="#b9f16c" stopOpacity="0.09" /><stop offset="100%" stopColor="#b9f16c" stopOpacity="0" /></radialGradient>
        <radialGradient id="de03-g3" cx="50%" cy="80%" r="35%"><stop offset="0%" stopColor="#93e857" stopOpacity="0.05" /><stop offset="100%" stopColor="#93e857" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="800" height="500" fill="#08090a" />
      <rect width="800" height="500" fill="url(#de03-g1)" />
      <rect width="800" height="500" fill="url(#de03-g2)" />
      <rect width="800" height="500" fill="url(#de03-g3)" />
      {/* Node constellation — left-to-right transformation flow */}
      <line x1="60" y1="140" x2="200" y2="200" stroke="#93e857" strokeWidth="0.6" opacity="0.2" />
      <line x1="60" y1="280" x2="200" y2="250" stroke="#93e857" strokeWidth="0.6" opacity="0.18" />
      <line x1="100" y1="400" x2="200" y2="300" stroke="#b9f16c" strokeWidth="0.5" opacity="0.15" />
      <line x1="200" y1="230" x2="420" y2="230" stroke="#93e857" strokeWidth="0.8" opacity="0.25" />
      <line x1="200" y1="230" x2="420" y2="200" stroke="#b9f16c" strokeWidth="0.5" opacity="0.15" />
      <line x1="200" y1="230" x2="420" y2="280" stroke="#93e857" strokeWidth="0.5" opacity="0.15" />
      <line x1="420" y1="230" x2="620" y2="180" stroke="#93e857" strokeWidth="0.7" opacity="0.22" />
      <line x1="420" y1="230" x2="620" y2="280" stroke="#93e857" strokeWidth="0.7" opacity="0.2" />
      <line x1="420" y1="230" x2="640" y2="380" stroke="#b9f16c" strokeWidth="0.5" opacity="0.15" />
      <line x1="420" y1="230" x2="660" y2="120" stroke="#93e857" strokeWidth="0.5" opacity="0.15" />
      <line x1="620" y1="180" x2="750" y2="140" stroke="#93e857" strokeWidth="0.4" opacity="0.12" />
      <line x1="620" y1="280" x2="740" y2="360" stroke="#93e857" strokeWidth="0.4" opacity="0.12" />
      {/* Nodes */}
      <circle cx="60" cy="140" r="3.5" fill="#93e857" opacity="0.35" />
      <circle cx="60" cy="280" r="3" fill="#93e857" opacity="0.3" />
      <circle cx="100" cy="400" r="3" fill="#b9f16c" opacity="0.25" />
      <circle cx="200" cy="230" r="6" fill="#93e857" opacity="0.45" />
      <circle cx="200" cy="230" r="2.5" fill="#08090a" />
      <circle cx="420" cy="230" r="7" fill="#93e857" opacity="0.4" />
      <circle cx="420" cy="230" r="3" fill="#08090a" />
      <circle cx="620" cy="180" r="4" fill="#93e857" opacity="0.4" />
      <circle cx="620" cy="280" r="3.5" fill="#93e857" opacity="0.35" />
      <circle cx="640" cy="380" r="3" fill="#b9f16c" opacity="0.3" />
      <circle cx="660" cy="120" r="3" fill="#93e857" opacity="0.3" />
      <circle cx="750" cy="140" r="2.5" fill="#93e857" opacity="0.25" />
      <circle cx="740" cy="360" r="2.5" fill="#93e857" opacity="0.25" />
    </svg>
  );
}

function DEVisual04() {
  return (
    <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }} aria-hidden="true">
      <defs>
        <radialGradient id="de04-g1" cx="50%" cy="40%" r="50%"><stop offset="0%" stopColor="#93e857" stopOpacity="0.13" /><stop offset="100%" stopColor="#93e857" stopOpacity="0" /></radialGradient>
        <radialGradient id="de04-g2" cx="30%" cy="70%" r="40%"><stop offset="0%" stopColor="#b9f16c" stopOpacity="0.06" /><stop offset="100%" stopColor="#b9f16c" stopOpacity="0" /></radialGradient>
        <radialGradient id="de04-g3" cx="75%" cy="30%" r="35%"><stop offset="0%" stopColor="#93e857" stopOpacity="0.07" /><stop offset="100%" stopColor="#93e857" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="800" height="500" fill="#08090a" />
      <rect width="800" height="500" fill="url(#de04-g1)" />
      <rect width="800" height="500" fill="url(#de04-g2)" />
      <rect width="800" height="500" fill="url(#de04-g3)" />
      {/* Node constellation — shield/quality pattern */}
      <line x1="400" y1="80" x2="280" y2="200" stroke="#93e857" strokeWidth="0.7" opacity="0.25" />
      <line x1="400" y1="80" x2="520" y2="200" stroke="#93e857" strokeWidth="0.7" opacity="0.25" />
      <line x1="280" y1="200" x2="220" y2="360" stroke="#93e857" strokeWidth="0.6" opacity="0.2" />
      <line x1="520" y1="200" x2="580" y2="360" stroke="#93e857" strokeWidth="0.6" opacity="0.2" />
      <line x1="220" y1="360" x2="400" y2="440" stroke="#b9f16c" strokeWidth="0.6" opacity="0.18" />
      <line x1="580" y1="360" x2="400" y2="440" stroke="#b9f16c" strokeWidth="0.6" opacity="0.18" />
      <line x1="280" y1="200" x2="520" y2="200" stroke="#93e857" strokeWidth="0.5" opacity="0.15" />
      <line x1="220" y1="360" x2="580" y2="360" stroke="#93e857" strokeWidth="0.5" opacity="0.12" />
      {/* Outer verification nodes */}
      <line x1="120" y1="160" x2="280" y2="200" stroke="#93e857" strokeWidth="0.4" opacity="0.12" />
      <line x1="680" y1="160" x2="520" y2="200" stroke="#93e857" strokeWidth="0.4" opacity="0.12" />
      <line x1="100" y1="400" x2="220" y2="360" stroke="#b9f16c" strokeWidth="0.4" opacity="0.1" />
      <line x1="700" y1="400" x2="580" y2="360" stroke="#93e857" strokeWidth="0.4" opacity="0.1" />
      {/* Nodes */}
      <circle cx="400" cy="80" r="5" fill="#93e857" opacity="0.45" />
      <circle cx="280" cy="200" r="5.5" fill="#93e857" opacity="0.4" />
      <circle cx="520" cy="200" r="5.5" fill="#93e857" opacity="0.4" />
      <circle cx="220" cy="360" r="4.5" fill="#93e857" opacity="0.35" />
      <circle cx="580" cy="360" r="4.5" fill="#93e857" opacity="0.35" />
      <circle cx="400" cy="440" r="4" fill="#b9f16c" opacity="0.35" />
      <circle cx="120" cy="160" r="3" fill="#93e857" opacity="0.25" />
      <circle cx="680" cy="160" r="3" fill="#93e857" opacity="0.25" />
      <circle cx="100" cy="400" r="2.5" fill="#b9f16c" opacity="0.2" />
      <circle cx="700" cy="400" r="2.5" fill="#93e857" opacity="0.2" />
    </svg>
  );
}

const deVisuals: Record<string, React.FC> = { "01": DEVisual01, "02": DEVisual02, "03": DEVisual03, "04": DEVisual04 };
const deImages: Record<string, string> = {
  "01": "/Data Processing & Validation.png",
  "02": "/Data Enrichment & Integration1.png",
  "03": "/AI-Ready Data Preparation.png",
  "04": "/data quality management.png",
};

function DataEngCard({
  index,
  icon,
  title,
  desc,
}: {
  index: string;
  icon: string;
  title: string;
  desc: string;
}) {
  const Visual = deVisuals[index];
  const imgSrc = deImages[index];
  return (
    <div className="de-card">
      <div className="de-card-visual">
        {imgSrc ? (
          <img src={imgSrc} alt={title} />
        ) : (
          Visual && <Visual />
        )}
        <div className="de-card-scrim" />
        <div className="de-card-grain" />
      </div>
      <div className="de-card-body">
        <div className="de-card-icon">
          <SolIcon name={icon} size={18} />
        </div>
        <h4 className="de-card-title">{title}</h4>
        <p className="de-card-desc">{desc}</p>
        <Link href="/contact" className="de-card-link">
          Explore capability
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

/* ── Data ──────────────────────────────────────────────────────────────────── */

const capabilities = [
  {
    number: "01",
    icon: "sparkles",
    title: "AI Automation & Agentic AI",
    tagline: "Automate. Understand. Act.",
    description:
      "Move from conventional process automation towards AI-enabled, agentic operations that understand information, support decisions and coordinate workflows.",
    chips: ["Agentic AI", "Document intelligence", "Workflow orchestration"],
    href: "/solutions#ai-automation",
  },
  {
    number: "02",
    icon: "settings",
    title: "Intelligent Operations",
    tagline: "Operate. Optimize. Scale.",
    description:
      "People, process, technology and performance management working together to operate and improve business-critical processes reliably every day.",
    chips: ["Process operations", "Quality assurance", "Exception handling"],
    href: "/solutions#intelligent-operations",
  },
  {
    number: "03",
    icon: "database",
    title: "Data Engineering",
    tagline: "Structure. Connect. Activate.",
    description:
      "Transform fragmented information across systems and formats into structured, accurate and usable data assets that support operations, analytics and AI.",
    chips: ["Data validation", "Enrichment", "AI-ready data"],
    href: "/solutions#data-engineering",
  },
  {
    number: "04",
    icon: "bar-chart",
    title: "Analytics & Business Intelligence",
    tagline: "Measure. Understand. Decide.",
    description:
      "Transform enterprise and operational data into clear, relevant and actionable insights — from executive dashboards to predictive analytics.",
    chips: ["Dashboards", "KPI monitoring", "Predictive analytics"],
    href: "/solutions#analytics-bi",
  },
  {
    number: "05",
    icon: "ship",
    title: "Shipping & Logistics Solutions",
    tagline: "Simplify complex logistics operations.",
    description:
      "Shipping domain expertise combined with intelligent operations, automation and data to simplify complex workflows across freight and customs.",
    chips: ["Freight forwarding", "Customs documentation", "Logistics analytics"],
    href: "/solutions#shipping-logistics",
  },
  {
    number: "06",
    icon: "heart-pulse",
    title: "Healthcare Operations",
    tagline: "Smarter healthcare administration.",
    description:
      "Intelligent document processing, automation, data and managed operations that streamline administrative workflows with a focus on security and accuracy.",
    chips: ["Claims operations", "Document intelligence", "Secure delivery"],
    href: "/solutions#healthcare-operations",
  },
];

const aiCapabilities = [
  { icon: "sparkles", title: "Agentic AI Solutions", desc: "AI systems that reason, plan and act across multi-step workflows." },
  { icon: "workflow", title: "Workflow Orchestration", desc: "Connecting people, systems and AI into seamless operational flows." },
  { icon: "cpu", title: "AI-Assisted Business Processes", desc: "Embedding intelligence into core processes for faster execution." },
  { icon: "layers", title: "Intelligent Document Processing", desc: "Extracting and understanding information from complex documents." },
];

const opsCapabilities = [
  { title: "Business Process Operations", desc: "Structured support for high-volume and business-critical operational processes.", image: "/Business Process Operations.jpg" },
  { title: "Back-Office Operations", desc: "Improve efficiency across repetitive administrative and transaction-based activities.", image: "/Back-Office Operations.jpg" },
  { title: "Workflow & Exception Management", desc: "Manage workflows, exceptions and process dependencies with greater control.", image: "/Workflow & Exception Management.jpg" },
  { title: "Quality & Performance Management", desc: "Maintain consistent delivery through defined quality controls, reporting and continuous improvement.", image: "/Quality & Performance Management.jpg" },
];

const dataCapabilities = [
  { index: "01", icon: "database", title: "Data Processing & Validation", desc: "Cleaning, verifying and structuring data from multiple sources into a single reliable format." },
  { index: "02", icon: "layers", title: "Data Enrichment & Integration", desc: "Adding context and connecting data across systems." },
  { index: "03", icon: "cpu", title: "AI-Ready Data Preparation", desc: "Shaping data into formats AI and analytics can consume." },
  { index: "04", icon: "shield-check", title: "Data Quality Management", desc: "Monitoring and maintaining accuracy across the lifecycle." },
];

const shippingCapabilities = [
  { icon: "anchor", title: "Freight Forwarding Operations", desc: "Operational support for high-volume freight workflows with speed and consistency.", image: "/Freight Forwarding Operations.jpg" },
  { icon: "file-text", title: "Shipping Documentation", desc: "Processing, validating and managing business-critical shipping documents.", image: "/Shipping Documentation.jpg" },
  { icon: "file-check", title: "Customs Documentation", desc: "Structured support for customs-related documentation, data and validation.", image: "/Customs Documentation.jpg" },
  { icon: "receipt", title: "Invoice & Billing Operations", desc: "Processing and validating freight invoices with exception identification.", image: "/Invoice & Billing Operations.jpg" },
  { icon: "database", title: "Shipment Data Management", desc: "Capturing, validating and enriching shipment-related information.", image: "/Shipment Data Management.jpg" },
  { icon: "alert-circle", title: "Exception Management", desc: "Structured handling of discrepancies and operational exceptions.", image: "/Exception Management.jpg" },
];

const healthcareCapabilities = [
  { icon: "clipboard", title: "Claims Operations", desc: "Technology-enabled support for claims-related administrative workflows." },
  { icon: "scan-text", title: "Document Intelligence", desc: "Capturing, classifying and extracting information from healthcare documents." },
  { icon: "database", title: "Healthcare Data Processing", desc: "Structured processing and validation of operational healthcare data." },
  { icon: "workflow", title: "Workflow Automation", desc: "Automating repetitive administrative tasks and intelligent routing." },
  { icon: "shield-check", title: "Secure Operations", desc: "Delivery practices designed around confidentiality and controlled access." },
  { icon: "bar-chart", title: "Operational Reporting", desc: "Visibility into volumes, turnaround times and exceptions." },
];

const ecosystem = [
  { icon: "sparkles", title: "AI Automation", desc: "Understand and automate." },
  { icon: "settings", title: "Intelligent Operations", desc: "Execute and optimize." },
  { icon: "database", title: "Data Engineering", desc: "Structure and connect." },
  { icon: "bar-chart", title: "Analytics & BI", desc: "Measure and understand." },
  { icon: "compass", title: "Domain Expertise", desc: "Apply with context." },
];

const approachSteps = [
  { title: "Discover", desc: "Understand your processes, systems, data and business objectives." },
  { title: "Diagnose", desc: "Identify bottlenecks, manual effort and opportunities for improvement." },
  { title: "Design", desc: "Create the right combination of process, technology and automation." },
  { title: "Implement", desc: "Introduce the solution through a structured transition." },
  { title: "Operate", desc: "Manage processes with defined controls and performance measures." },
  { title: "Improve", desc: "Continuously identify opportunities for optimization and intelligence." },
];

const securityTags = [
  "Secure Infrastructure",
  "Role-Based Access",
  "Confidentiality First",
  "Governance Frameworks",
  "Business Continuity",
  "Audit-Ready Processes",
];

/* ── Analytics Orbit Diagram ────────────────────────────────────────────────── */

function CapabilitiesOrbit() {
  return (
    <div className="orbit-section">
      <div className="orbit-wrap">
        <div className="orbit-ring" />
        <div className="orbit-core">
          <span className="orbit-core-num">08</span>
          <span className="orbit-core-label">CAPABILITIES</span>
        </div>
        <div className="cap-1"><span className="orbit-dot" />Executive dashboards</div>
        <div className="cap-2"><span className="orbit-dot" />KPI monitoring</div>
        <div className="cap-3"><span className="orbit-dot" />Automated reporting</div>
        <div className="cap-4"><span className="orbit-dot" />Trend analysis</div>
        <div className="cap-5"><span className="orbit-dot" />Operational dashboards</div>
        <div className="cap-6"><span className="orbit-dot" />Predictive analytics</div>
        <div className="cap-7"><span className="orbit-dot" />Data visualization</div>
        <div className="cap-8"><span className="orbit-dot" />Decision intelligence</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────────────────────── */

function CapabilitiesRail() {
  const [active, setActive] = useState(0);
  const cap = capabilities[active];

  return (
    <div className="sol-rail-layout">
      <div className="sol-rail" role="group" aria-label="Capabilities">
        {capabilities.map((item, i) => (
          <button
            key={item.number}
            type="button"
            className={"sol-rail-item" + (i === active ? " active" : "")}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            onFocus={() => setActive(i)}
            aria-pressed={i === active}
          >
            <span className="sol-rail-num">{item.number}</span>
            <span className="sol-rail-body">
              <span className="sol-rail-title">{item.title}</span>
              <span className="sol-rail-tagline">{item.tagline}</span>
            </span>
            <span className="sol-rail-arrow">
              <ArrowIcon />
            </span>
          </button>
            ))}
          </div>

      <div className="sol-preview" aria-live="polite" aria-atomic="true">
        <span className="sol-preview-ghost" aria-hidden="true">{cap.number}</span>
        <div className="sol-preview-body" key={cap.number}>
          <div className="sol-preview-icon">
            <SolIcon name={cap.icon} size={34} />
          </div>
          <h3 className="sol-preview-title">{cap.title}</h3>
          <p className="sol-preview-tagline">{cap.tagline}</p>
          <p className="sol-preview-desc">{cap.description}</p>
          <div className="sol-preview-chips">
            {cap.chips.map((chip) => (
              <span key={chip} className="sol-preview-chip">{chip}</span>
            ))}
          </div>
          <div className="sol-preview-divider" />
          <div className="sol-preview-foot">
            <Link href={cap.href} className="sol-preview-cta">
              Explore capability
              <ArrowIcon />
            </Link>
            <div className="sol-preview-dots" aria-hidden="true">
              {capabilities.map((item, i) => (
                <span
                  key={item.number}
                  className={"sol-preview-dot" + (i === active ? " active" : "")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SolutionsPage() {
  return (
    <>
      <style>{`
        /* ── Base Section ────────────────────────────────── */
        .sol-section {
          position: relative;
          width: 100%;
          padding: 100px 80px;
          overflow: hidden;
        }
        .sol-section--dark { background: #0a0a0a; }
        .sol-section--light { background: #f8faf5; }
        .sol-wrap {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        section[id] { scroll-margin-top: 110px; }

        /* ── Eyebrow ────────────────────────────────────── */
        .sol-eyebrow {
          display: inline-block;
          background: #C6E84A;
          color: #0f0f0f;
          padding: 8px 20px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          font-variant: small-caps;
          text-transform: none;
          margin-bottom: 24px;
        }

        /* ── Section Title ───────────────────────────────── */
        .sol-section-title {
          font-family: var(--font-syne), sans-serif;
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 700;
          color: #0f172a;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0 0 20px;
        }
        .sol-section-title--dark { color: #fff; }
        .sol-section-title--dark span { color: #C6E84A; }
        .sol-section-title span { color: #C6E84A; }

        /* ── Shared Card ─────────────────────────────────── */
        .sol-card {
          box-sizing: border-box;
          border-radius: 20px;
          padding: 32px 28px;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .sol-card:hover {
          transform: translateY(-4px);
        }
        .sol-card--dark {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .sol-card--dark:hover {
          border-color: rgba(198,232,74,0.3);
          box-shadow: 0 12px 32px rgba(0,0,0,0.2);
        }
        .sol-card--light {
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.07);
        }
        .sol-card--light:hover {
          border-color: rgba(198,232,74,0.4);
          box-shadow: 0 12px 32px rgba(0,0,0,0.08);
        }
        .sol-card-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          transition: background 0.25s ease, color 0.25s ease;
        }
        .sol-card-icon--square {
          border-radius: 14px;
          background: rgba(198,232,74,0.12);
          color: #C6E84A;
        }
        .sol-card--light .sol-card-icon--square {
          background: rgba(198,232,74,0.12);
          color: #4d7c0f;
        }
        .sol-card-icon--circle {
          border-radius: 50%;
          background: rgba(198,232,74,0.12);
          color: #C6E84A;
        }
        .sol-card--light .sol-card-icon--circle {
          background: rgba(198,232,74,0.12);
          color: #4d7c0f;
        }
        .sol-card:hover .sol-card-icon--square,
        .sol-card:hover .sol-card-icon--circle {
          background: #C6E84A;
          color: #0f0f0f;
        }
        .sol-card-title {
          font-family: var(--font-syne), sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #fff;
          line-height: 1.3;
          margin: 0 0 10px;
        }
        .sol-card-title--dark { color: #fff; }
        .sol-card-desc {
          font-size: 14.5px;
          font-weight: 400;
          color: rgba(255,255,255,0.55);
          line-height: 1.65;
          margin: 0;
        }
        .sol-card-desc--dark { color: rgba(255,255,255,0.55); }
        .sol-card--light .sol-card-title { color: #242424; }
        .sol-card--light .sol-card-desc { color: #5A5D66; }

        .sol-card-img {
          margin: -32px -28px 20px;
          height: 180px;
          overflow: hidden;
          border-radius: 20px 20px 0 0;
        }
        .sol-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* ── Grid Helpers ────────────────────────────────── */
        .sol-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        .sol-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .sol-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .sol-grid-6 { display: grid; grid-template-columns: repeat(6, 1fr); gap: 20px; }

        /* ── Hero ────────────────────────────────────────── */
        .sol-hero {
          position: relative;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          padding: 160px 80px 120px;
          background: #0f0f0f;
          overflow: hidden;
        }
        .sol-hero-video {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.65;
        }
        .sol-hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 80% 70% at 55% 40%, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 55% 40%, black 30%, transparent 80%);
        }
        .sol-hero-glow {
          position: absolute;
          top: 22%; left: 55%;
          width: 720px; height: 720px;
          background: radial-gradient(circle, rgba(198,232,74,0.07) 0%, transparent 60%);
          border-radius: 50%;
          pointer-events: none;
        }
        .sol-hero-orb {
          position: absolute;
          bottom: -18%; right: -8%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(198,232,74,0.05) 0%, transparent 60%);
          border-radius: 50%;
          pointer-events: none;
        }
        .sol-hero-content {
          max-width: 860px;
          position: relative;
          z-index: 2;
        }
        .sol-hero-title {
          font-size: clamp(40px, 6vw, 68px);
          font-family: var(--font-syne), sans-serif;
          font-weight: 700;
          color: #fff;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin: 0 0 32px;
          text-wrap: balance;
        }
        .sol-hero-title span { color: #C6E84A; }
        .sol-hero-body {
          font-size: 18px;
          font-weight: 400;
          color: rgba(255,255,255,0.6);
          line-height: 1.75;
          max-width: 640px;
          margin: 0;
        }

        /* ── Capabilities rail + preview ────────────────── */
        .sol-rail-layout {
          display: grid;
          grid-template-columns: minmax(0, 45%) minmax(0, 55%);
          gap: 56px;
          align-items: stretch;
        }
        .sol-rail {
          display: flex;
          flex-direction: column;
          border-top: 1px solid rgba(0,0,0,0.1);
        }
        .sol-rail-item {
          display: flex;
          align-items: center;
          gap: 20px;
          width: 100%;
          padding: 22px 18px;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(0,0,0,0.1);
          border-radius: 14px;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          color: inherit;
          transition: background 0.25s ease, border-color 0.25s ease;
        }
        .sol-rail-item:hover,
        .sol-rail-item.active {
          background: rgba(198,232,74,0.16);
          border-bottom-color: transparent;
        }
        .sol-rail-num {
          flex-shrink: 0;
          font-family: var(--font-geist-mono), monospace;
          font-size: 14px;
          font-weight: 600;
          color: #8A8D96;
          transition: color 0.25s ease;
        }
        .sol-rail-item:hover .sol-rail-num,
        .sol-rail-item.active .sol-rail-num {
          color: #4d7c0f;
        }
        .sol-rail-body {
          flex: 1;
          min-width: 0;
        }
        .sol-rail-title {
          display: block;
          font-size: 18px;
          font-weight: 700;
          color: #242424;
          line-height: 1.3;
        }
        .sol-rail-tagline {
          display: block;
          font-size: 13.5px;
          font-weight: 400;
          color: #5A5D66;
          line-height: 1.5;
          margin-top: 4px;
        }
        .sol-rail-arrow {
          flex-shrink: 0;
          display: inline-flex;
          margin-left: auto;
          opacity: 0;
          transform: translateX(-8px);
          color: #242424;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .sol-rail-item:hover .sol-rail-arrow,
        .sol-rail-item.active .sol-rail-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── Capabilities preview panel ─────────────────── */
        .sol-preview {
          position: relative;
          background: #0f0f0f;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 56px 48px 40px;
          overflow: hidden;
          min-height: 540px;
          display: flex;
          flex-direction: column;
        }
        .sol-preview-ghost {
          position: absolute;
          top: -12px;
          right: -8px;
          font-family: var(--font-syne), sans-serif;
          font-size: clamp(120px, 16vw, 190px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.05em;
          color: rgba(255,255,255,0.05);
          pointer-events: none;
          user-select: none;
        }
        .sol-preview-body {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          flex: 1;
          animation: solPreviewIn 0.25s ease;
        }
        @keyframes solPreviewIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sol-preview-icon {
          width: 76px;
          height: 76px;
          border-radius: 20px;
          background: #C6E84A;
          color: #0f0f0f;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 28px;
        }
        .sol-preview-title {
          font-family: var(--font-syne), sans-serif;
          font-size: clamp(28px, 3vw, 38px);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.15;
          margin: 0 0 12px;
        }
        .sol-preview-tagline {
          font-size: 15px;
          font-weight: 600;
          color: #C6E84A;
          margin: 0 0 16px;
        }
        .sol-preview-desc {
          font-size: 16px;
          font-weight: 400;
          color: rgba(255,255,255,0.72);
          line-height: 1.7;
          max-width: 46ch;
          margin: 0 0 28px;
        }
        .sol-preview-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 32px;
        }
        .sol-preview-chip {
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          color: rgba(255,255,255,0.85);
          font-size: 13px;
          font-weight: 500;
        }
        .sol-preview-divider {
          height: 1px;
          background: rgba(255,255,255,0.12);
          margin: 0 0 24px;
        }
        .sol-preview-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          margin-top: auto;
        }
        .sol-preview-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #C6E84A;
          color: #0f0f0f;
          padding: 14px 26px;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .sol-preview-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(198,232,74,0.3);
        }
        .sol-preview-cta:active {
          transform: scale(0.98);
        }
        .sol-preview-cta svg {
          transition: transform 0.3s ease;
        }
        .sol-preview-cta:hover svg {
          transform: translateX(4px);
        }
        .sol-preview-dots {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .sol-preview-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: rgba(255,255,255,0.25);
          transition: width 0.25s ease, background 0.25s ease;
        }
        .sol-preview-dot.active {
          width: 22px;
          background: #C6E84A;
        }
        @media (max-width: 880px) {
          .sol-rail-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .sol-preview {
            min-height: 0;
            padding: 44px 32px 32px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .sol-preview-body {
            animation: none;
          }
          .sol-rail-arrow,
          .sol-rail-item:hover .sol-rail-arrow,
          .sol-rail-item.active .sol-rail-arrow {
            transition: none;
            transform: none;
            opacity: 1;
          }
        }

        /* ── Split Layout (Section 3) ─────────────────────── */
        .sol-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          margin-bottom: 64px;
        }
        .sol-split-text { max-width: 100%; }
        .sol-split-body {
          color: rgba(255,255,255,0.7);
          font-size: 17px;
          line-height: 1.7;
          margin: 0 0 32px;
        }
        .sol-split-img {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(198,232,74,0.2);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .sol-split-img img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          aspect-ratio: 4/3;
        }

        /* ── Numbered Steps ───────────────────────────────── */
        /* ── Approach Timeline ───────────────────────────── */
        .ap-timeline { --rail-progress: 0; }
        .ap-inner { position: relative; }
        .ap-rail {
          position: absolute;
          top: 6px;
          left: 0;
          right: 0;
          height: 1px;
          background: #DFE3D6;
          transform: translateY(-50%);
        }
        .ap-rail-fill {
          display: block;
          height: 100%;
          width: 100%;
          background: #C6E84A;
          transform-origin: left center;
          transform: scaleX(var(--rail-progress));
        }
        .ap-track {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 28px;
        }
        .ap-step {
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 0.55s ease var(--d, 0ms),
            transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) var(--d, 0ms);
        }
        .ap-timeline.is-visible .ap-step {
          opacity: 1;
          transform: translateY(0);
        }
        .ap-node {
          display: block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid #C6E84A;
          background: #f8faf5;
          box-sizing: border-box;
          margin: 0 auto 20px;
          transition: background-color 0.35s ease var(--d, 0ms);
        }
        .ap-timeline.is-visible .ap-node {
          background: #C6E84A;
        }
        .sol-step-num {
          font-size: 12px;
          font-weight: 700;
          color: #4d7c0f;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 14px;
          display: block;
        }
        .sol-step-title {
          font-family: var(--font-syne), sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #242424;
          margin: 0 0 10px;
        }
        .sol-step-desc {
          font-size: 15px;
          font-weight: 400;
          color: #5A5D66;
          line-height: 1.7;
          margin: 0;
        }
        @media (max-width: 1024px) {
          .ap-scroller {
            overflow-x: auto;
            overscroll-behavior-x: contain;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .ap-scroller::-webkit-scrollbar { display: none; }
          .ap-inner {
            min-width: max-content;
            padding-right: 8px;
          }
          .ap-track {
            grid-template-columns: repeat(6, minmax(230px, 1fr));
          }
          .ap-step { scroll-snap-align: start; }
        }

        /* ── Ecosystem Row ───────────────────────────────── */
        .sol-eco-row {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
          margin-top: 48px;
        }
        .sol-eco-item {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 20px;
          padding: 28px 20px;
          text-align: center;
          transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
        }
        .sol-eco-item:hover {
          border-color: rgba(198,232,74,0.4);
          background: rgba(198,232,74,0.06);
          transform: translateY(-4px);
        }
        .sol-eco-icon {
          width: 48px; height: 48px;
          margin: 0 auto 16px;
          border-radius: 12px;
          background: rgba(198,232,74,0.12);
          border: 1px solid rgba(198,232,74,0.2);
          color: #C6E84A;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sol-eco-title {
          font-family: var(--font-syne), sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 4px;
        }
        .sol-eco-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          margin: 0;
        }

        /* ── Tags / Pills ────────────────────────────────── */
        .sol-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .sol-tag {
          padding: 10px 22px;
          border-radius: 999px;
          background: rgba(198,232,74,0.08);
          border: 1px solid rgba(198,232,74,0.3);
          color: rgba(255,255,255,0.9);
          font-size: 14px;
          font-weight: 600;
          line-height: 1.4;
        }
        .sol-tag--light {
          background: rgba(198,232,74,0.12);
          border-color: rgba(198,232,74,0.35);
          color: #242424;
        }

        /* ── Callout ─────────────────────────────────────── */
        .sol-callout {
          text-align: center;
          margin: 56px auto 0;
          max-width: 760px;
        }
        .sol-callout-rule {
          width: 48px; height: 3px;
          background: #C6E84A;
          border-radius: 2px;
          margin: 0 auto 20px;
        }
        .sol-callout-line {
          font-size: clamp(20px, 2.6vw, 26px);
          font-weight: 700;
          color: #fff;
          line-height: 1.5;
          font-family: var(--font-syne), sans-serif;
          margin: 0;
        }
        .sol-callout-line span { color: #C6E84A; }

        /* ── Intro Lead ──────────────────────────────────── */
        .sol-lead {
          font-size: 17px;
          font-weight: 400;
          color: rgba(255,255,255,0.6);
          line-height: 1.8;
          margin: 0 0 12px;
          max-width: 720px;
        }
        .sol-lead--light { color: #5A5D66; }

        /* ── Sublabel ────────────────────────────────────── */
        .sol-sublabel {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #C6E84A;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin: 0 0 20px;
        }

        /* ── Data Engineering Section ──────────────────────── */
        .de-header {
          max-width: 720px;
          margin-bottom: 56px;
        }
        .de-eyebrow {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
        }
        .de-eyebrow-line {
          width: 28px;
          height: 1px;
          background: #93e857;
        }
        .de-eyebrow-text {
          font-family: var(--font-geist-mono), monospace;
          font-size: 12px;
          font-weight: 500;
          color: #93e857;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        /* Card grid — 1 large + 3 standard */
        .de-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 20px;
          margin-top: 48px;
        }

        /* Card base */
        .de-card {
          position: relative;
          background: #0d0e10;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .de-card:hover {
          transform: translateY(-4px);
          border-color: rgba(147,232,87,0.3);
          box-shadow: 0 12px 40px rgba(0,0,0,0.3);
        }

        /* Visual area — full bleed background */
        .de-card-visual {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          flex-shrink: 0;
        }
        .de-card--large .de-card-visual {
          aspect-ratio: 16 / 10;
        }
        .de-card-visual svg, .de-card-visual img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .de-card:hover .de-card-visual svg, .de-card:hover .de-card-visual img {
          transform: scale(1.03);
        }

        /* Dark gradient scrim over bottom ~55% */
        .de-card-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 30%, rgba(8,9,10,0.7) 55%, rgba(8,9,10,0.95) 100%);
          pointer-events: none;
        }

        /* Grain/noise overlay */
        .de-card-grain {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 128px 128px;
          pointer-events: none;
        }

        /* Index label — top right */
        .de-card-index {
          position: absolute;
          top: 16px;
          right: 18px;
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          font-weight: 500;
          color: rgba(255,255,255,0.35);
          letter-spacing: 1px;
          z-index: 2;
        }

        /* Card body — content below visual */
        .de-card-body {
          padding: 20px 22px 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 1;
        }

        /* Icon badge */
        .de-card-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(147,232,87,0.1);
          border: 1px solid rgba(147,232,87,0.18);
          color: #93e857;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
          transition: background 0.3s ease, color 0.3s ease;
          flex-shrink: 0;
        }
        .de-card:hover .de-card-icon {
          background: rgba(147,232,87,0.18);
        }

        /* Title */
        .de-card-title {
          font-family: var(--font-syne), sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.35;
          margin: 0 0 8px;
        }

        /* Description */
        .de-card-desc {
          font-size: 13px;
          font-weight: 400;
          color: #96988f;
          line-height: 1.6;
          margin: 0;
        }

        /* Explore link — only on large card */
        .de-card-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: auto;
          padding-top: 16px;
          font-size: 13px;
          font-weight: 600;
          color: #93e857;
          text-decoration: none;
          transition: gap 0.3s ease;
        }
        .de-card-link:hover {
          gap: 12px;
        }
        .de-card-link svg {
          transition: transform 0.3s ease;
        }
        .de-card-link:hover svg {
          transform: translateX(2px);
        }

        /* Closing row */
        .de-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          margin-top: 48px;
          padding-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .de-footer-text {
          font-family: var(--font-syne), sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
          line-height: 1.5;
          margin: 0;
        }
        .de-footer-text span {
          color: #93e857;
        }
        .de-footer-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #93e857;
          color: #08090a;
          padding: 14px 28px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 700;
          font-family: var(--font-syne), sans-serif;
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .de-footer-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(147,232,87,0.25);
        }
        .de-footer-cta svg {
          transition: transform 0.3s ease;
        }
        .de-footer-cta:hover svg {
          transform: translateX(3px);
        }

        /* ── Analytics Orbit Diagram ────────────────────── */
        .orbit-section {
          display: flex;
          justify-content: center;
          padding: 64px 0 16px;
          overflow: visible;
        }
        .orbit-wrap {
          position: relative;
          width: 660px;
          height: 660px;
          flex-shrink: 0;
          overflow: visible;
        }

        /* Ring */
        .orbit-ring {
          position: absolute;
          inset: 130px;
          border-radius: 50%;
          border: 1px solid rgba(17,22,37,0.12);
          pointer-events: none;
        }

        /* Core */
        .orbit-core {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 250px;
          height: 250px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: #c8ef3f;
          box-shadow: 0 0 0 20px rgba(200,239,63,.07), 0 0 0 55px rgba(200,239,63,.035);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }
        .orbit-core::before {
          content: "";
          position: absolute;
          inset: 18px;
          border: 1px solid rgba(17,22,37,.18);
          border-radius: 50%;
          pointer-events: none;
        }
        .orbit-core-num {
          font-family: var(--font-syne), sans-serif;
          font-size: 36px;
          font-weight: 800;
          color: #111625;
          line-height: 1;
          letter-spacing: -0.03em;
        }
        .orbit-core-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          font-weight: 700;
          color: #3c4520;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-top: 7px;
        }

        /* Dot shared style */
        .orbit-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #c8ef3f;
          border: 1px solid rgba(17,22,37,.2);
          flex-shrink: 0;
        }

        /* 8 Labels — desktop self-contained rules */
        .cap-1 {
          position: absolute;
          left: 330px;
          top: 30px;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 20px;
          font-weight: 600;
          color: #111625;
          white-space: nowrap;
          z-index: 3;
        }
        .cap-2 {
          position: absolute;
          left: 542px;
          top: 118px;
          transform: translate(0, -50%);
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 20px;
          font-weight: 600;
          color: #111625;
          white-space: nowrap;
          z-index: 3;
        }
        .cap-3 {
          position: absolute;
          left: 630px;
          top: 330px;
          transform: translate(0, -50%);
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 20px;
          font-weight: 600;
          color: #111625;
          white-space: nowrap;
          z-index: 3;
        }
        .cap-4 {
          position: absolute;
          left: 542px;
          top: 542px;
          transform: translate(0, -50%);
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 20px;
          font-weight: 600;
          color: #111625;
          white-space: nowrap;
          z-index: 3;
        }
        .cap-5 {
          position: absolute;
          left: 330px;
          top: 630px;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 20px;
          font-weight: 600;
          color: #111625;
          white-space: nowrap;
          z-index: 3;
        }
        .cap-6 {
          position: absolute;
          left: 118px;
          top: 542px;
          flex-direction: row-reverse;
          transform: translate(-100%, -50%);
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 20px;
          font-weight: 600;
          color: #111625;
          white-space: nowrap;
          z-index: 3;
        }
        .cap-7 {
          position: absolute;
          left: 30px;
          top: 330px;
          flex-direction: row-reverse;
          transform: translate(-100%, -50%);
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 20px;
          font-weight: 600;
          color: #111625;
          white-space: nowrap;
          z-index: 3;
        }
        .cap-8 {
          position: absolute;
          left: 118px;
          top: 118px;
          flex-direction: row-reverse;
          transform: translate(-100%, -50%);
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 20px;
          font-weight: 600;
          color: #111625;
          white-space: nowrap;
          z-index: 3;
        }

        /* Responsive (<640px) */
        @media (max-width: 640px) {
          .orbit-wrap {
            width: 420px;
            height: 420px;
          }
          .orbit-ring {
            inset: 85px;
          }
          .orbit-core {
            width: 150px;
            height: 150px;
          }
          .orbit-core-num {
            font-size: 24px;
          }
          .orbit-core-label {
            font-size: 9px;
          }

          .cap-1 { left: 210px; top: 10px; transform: translate(-50%, -50%); gap: 7px; font-size: 15px; }
          .cap-2 { left: 351px; top: 69px; transform: translate(0, -50%); gap: 7px; font-size: 15px; }
          .cap-3 { left: 410px; top: 210px; transform: translate(0, -50%); gap: 7px; font-size: 15px; }
          .cap-4 { left: 351px; top: 351px; transform: translate(0, -50%); gap: 7px; font-size: 15px; }
          .cap-5 { left: 210px; top: 410px; transform: translate(-50%, -50%); gap: 7px; font-size: 15px; }
          .cap-6 { left: 69px; top: 351px; flex-direction: row-reverse; transform: translate(-100%, -50%); gap: 7px; font-size: 15px; }
          .cap-7 { left: 10px; top: 210px; flex-direction: row-reverse; transform: translate(-100%, -50%); gap: 7px; font-size: 15px; }
          .cap-8 { left: 69px; top: 69px; flex-direction: row-reverse; transform: translate(-100%, -50%); gap: 7px; font-size: 15px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sol-card, .sol-eco-item { transition: none; transform: none; }
          .ap-step, .ap-node, .ap-rail-fill { transition: none !important; }
          .ap-step { opacity: 1; transform: none; }
          .ap-timeline .ap-node { background: #C6E84A; }
          .de-card { transition: none; transform: none; }
          .de-card:hover { transform: none; }
          .de-card-visual svg { transition: none; transform: none; }
          .de-card-icon { transition: none; }
          .de-card-link { transition: none; }
          .de-card-link svg { transition: none; }
          .de-footer-cta { transition: none; transform: none; }
          .de-footer-cta svg { transition: none; }
        }

        /* ── Ops Capability Cards (philosophy-style) ─────── */
        .ops-cards-scroll {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding-bottom: 14px;
          scrollbar-width: thin;
          scrollbar-color: #1a1d24 #e5e7eb;
        }
        .ops-cards-scroll::-webkit-scrollbar {
          height: 8px;
        }
        .ops-cards-scroll::-webkit-scrollbar-track {
          background: #e5e7eb;
          border-radius: 4px;
        }
        .ops-cards-scroll::-webkit-scrollbar-thumb {
          background: #1a1d24;
          border-radius: 4px;
        }

        .ops-card {
          flex: 0 0 440px;
          width: 440px;
          border-radius: 6px;
          overflow: hidden;
          background: #2b2e35;
          display: flex;
          flex-direction: column;
        }
        .ops-card-img {
          height: 290px;
          overflow: hidden;
        }
        .ops-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .ops-card-body {
          position: relative;
          flex: 1;
          min-height: 180px;
          padding: 26px 24px;
          display: flex;
          flex-direction: column;
        }
        .ops-card-title {
          font-size: 28px;
          font-weight: 700;
          color: #fffffe;
          line-height: 1.15;
          margin: 0 0 14px;
        }
        .ops-card-desc {
          font-size: 14px;
          font-weight: 400;
          color: #9ca3af;
          line-height: 1.6;
          margin: 0;
          padding-right: 40px;
        }

        @media (max-width: 600px) {
          .ops-card {
            flex: 0 0 320px;
            width: 320px;
          }
        }
          .cta-primary {
          position: relative;
          overflow: hidden;
          background: #C6E84A;
          color: #0f0f0f;
          border: none;
          padding: 16px 32px;
          border-radius: 9999px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .cta-primary::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 60%;
          background: linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 100%);
          pointer-events: none;
          border-radius: inherit;
          transition: opacity 0.3s ease;
        }
        .cta-primary::after {
          content: '';
          position: absolute;
          top: 0; left: -100%; right: 0;
          width: 60%;
          height: 100%;
          background: linear-gradient(100deg, transparent 0%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.25) 55%, transparent 100%);
          pointer-events: none;
          border-radius: inherit;
          transition: left 0.6s ease;
        }
        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(198,232,74,0.35);
        }
        .cta-primary:hover::before {
          opacity: 1.2;
        }
        .cta-primary:hover::after {
          left: 120%;
        }
        .cta-primary:active {
          transform: translateY(0) scale(0.98);
        }

        .cta-secondary {
          position: relative;
          overflow: hidden;
          background: transparent;
          color: #FFFFFF;
          border: 1.5px solid #FFFFFF;
          padding: 16px 32px;
          border-radius: 9999px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .cta-secondary::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 60%;
          background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 100%);
          pointer-events: none;
          border-radius: inherit;
          transition: opacity 0.3s ease;
        }
        .cta-secondary::after {
          content: '';
          position: absolute;
          top: 0; left: -100%; right: 0;
          width: 60%;
          height: 100%;
          background: linear-gradient(100deg, transparent 0%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.15) 55%, transparent 100%);
          pointer-events: none;
          border-radius: inherit;
          transition: left 0.6s ease;
        }
        .cta-secondary:hover {
          background: #FFFFFF;
          color: #0f0f0f;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255,255,255,0.15);
        }
        .cta-secondary:hover::before {
          background: linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 100%);
        }
        .cta-secondary:hover::after {
          left: 120%;
        }
        .cta-secondary:active {
          transform: translateY(0) scale(0.98);
        }

        /* ── Healthcare Operations (editorial two-column) ── */
        .ho-section {
          background: #F6F7F1;
          padding: 110px 80px;
          width: 100%;
          overflow: hidden;
        }
        .ho-wrap {
          max-width: 1400px;
          margin: 0 auto;
        }
        .ho-grid {
          display: grid;
          grid-template-columns: minmax(0, 55fr) minmax(0, 45fr);
          gap: 72px;
          align-items: stretch;
          margin-top: 44px;
        }
        .ho-list {
          list-style: none;
          margin: 0;
          padding: 0;
          border-top: 1px solid #DFE3D6;
        }
        .ho-item {
          display: grid;
          grid-template-columns: 52px minmax(0, 1fr);
          align-items: baseline;
          padding: 20px 0;
          border-bottom: 1px solid #DFE3D6;
        }
        .ho-num {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #8FAE1E;
        }
        .ho-item-title {
          font-size: 16px;
          font-weight: 600;
          color: #0F1B2A;
          line-height: 1.35;
          margin: 0 0 4px;
        }
        .ho-item-desc {
          font-size: 14px;
          color: #5B6A63;
          line-height: 1.6;
          margin: 0;
        }
        .ho-media {
          position: relative;
          border-radius: 4px;
          overflow: hidden;
          min-height: 320px;
        }
        .ho-media img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .ho-media::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15, 27, 42, 0.5) 0%, rgba(15, 27, 42, 0) 45%);
          pointer-events: none;
        }
        .ho-band {
          border-top: 1px solid #DFE3D6;
          margin-top: 80px;
          padding-top: 52px;
          text-align: center;
        }
        .ho-band p {
          font-size: clamp(20px, 2vw, 24px);
          font-weight: 700;
          color: #0F1B2A;
          line-height: 1.45;
          max-width: 780px;
          margin: 0 auto;
        }
        .ho-band span { color: #8FAE1E; }

        @media (max-width: 1024px) {
          .ho-section { padding: 88px 40px; }
          .ho-grid { gap: 48px; }
        }
        @media (max-width: 900px) {
          .ho-section { padding: 72px 24px; }
          .ho-grid {
            grid-template-columns: 1fr;
            gap: 36px;
            margin-top: 36px;
          }
          .ho-media {
            order: -1;
            min-height: 340px;
          }
          .ho-band { margin-top: 56px; padding-top: 40px; }
        }

        /* ── Shipping sticky stacking cards ─────────────── */
        /* overflow: visible is REQUIRED here — .sol-section sets
           overflow: hidden, which silently disables position: sticky */
        .sol-section--stack { overflow: visible; }
        .stack-wrapper {
          margin-top: 64px;
        }
        .stack-card {
          position: sticky;
          top: 96px;
          display: grid;
          grid-template-columns: minmax(0, 30fr) minmax(0, 70fr);
          align-items: stretch;
          gap: 56px;
          height: calc(100vh - 144px);
          min-height: 520px;
          padding: 24px;
          background: #141414;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          box-shadow: 0 -20px 40px rgba(0, 0, 0, 0.4);
        }
        .stack-card + .stack-card { margin-top: 24px; }
        .stack-card:nth-child(1) { z-index: 1; }
        .stack-card:nth-child(2) { z-index: 2; }
        .stack-card:nth-child(3) { z-index: 3; }
        .stack-card:nth-child(4) { z-index: 4; }
        .stack-card:nth-child(5) { z-index: 5; }
        .stack-card:nth-child(6) { z-index: 6; }
        .stack-media {
          order: 2;
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          height: 100%;
          min-height: 0;
        }
        .stack-media img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .stack-body {
          order: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .stack-num {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #C6E84A;
          margin-bottom: 16px;
        }
        .stack-title {
          font-family: var(--font-syne), sans-serif;
          font-size: clamp(26px, 3vw, 32px);
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.2;
          margin: 0 0 16px;
        }
        .stack-desc {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.7;
          max-width: 52ch;
          margin: 0;
        }

        @media (max-width: 1024px) {
          .stack-card { padding: 20px; gap: 36px; }
        }
        @media (max-width: 900px) {
          .stack-wrapper { margin-top: 40px; }
          .stack-card {
            grid-template-columns: 1fr;
            align-items: start;
            gap: 24px;
            top: 88px;
            height: calc(100vh - 128px);
            min-height: 540px;
            padding: 20px 20px 32px;
          }
          .stack-media {
            order: -1;
            height: auto;
            min-height: 0;
            aspect-ratio: 16 / 10;
          }
          .stack-body {
            order: 0;
            justify-content: flex-start;
          }
        }
      `}</style>

      {/* ══════════════════════ 1. HERO ══════════════════════ */}
      <section className="sol-hero">
        <div className="sol-hero-grid" />
        <div className="sol-hero-glow" />
        <div className="sol-hero-orb" />
        <div className="grain-overlay absolute inset-0 pointer-events-none" />
        <video
          className="sol-hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/solutionshero2.mp4" type="video/mp4" />
        </video>

        <div className="sol-hero-content">
          <Eyebrow>Our Solutions</Eyebrow>

          <h1 className="sol-hero-title">
            Intelligence built around <span>the way your business works.</span>
          </h1>

          <p className="sol-hero-body">
            Every business has its own complexities — processes that consume time, data that remains underused,
            systems that don&apos;t always work together, and decisions that need to happen faster. Sytrion brings
            together AI, automation, data and operational expertise to solve these challenges — helping
            organizations simplify operations, improve productivity and build for what comes next.
          </p>
        </div>
      </section>

      {/* ══════════════════════ 2. CAPABILITIES OVERVIEW ══════════════════════ */}
      <section id="capabilities" className="sol-section" style={{ background: "#F5F6F0" }}>
        <div className="sol-wrap">
          <div >
            <Eyebrow>Capabilities</Eyebrow>
            <h2  style={{
                fontSize: "clamp(36px, 5vw, 52px)",
                fontWeight: 700,
                color: "#242424",
                lineHeight: 1.2,
                marginBottom: "16px",
              }}>
              One partner. Multiple capabilities. <span style={{ color: "#C6E84A" }}>One connected approach.</span>
            </h2>
            <p className="sol-lead" style={{ color: "#5A5D66" }}>
              Our solutions work individually or together, depending on the challenge you need to solve. 
            </p>
          </div>

          <CapabilitiesRail />
        </div>
      </section>

      {/* ══════════════════════ 3. AI AUTOMATION ══════════════════════ */}
      <section id="ai-automation" className="sol-section sol-section--dark" style={{ position: "relative" }}>
        <div style={{
          position: "absolute", top: "-20%", right: "-10%", width: "800px", height: "800px",
          background: "radial-gradient(circle, rgba(198,232,74,0.08) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none"
        }} />

        <div className="sol-wrap">
          <div className="sol-split">
            <div className="sol-split-text">
              <Eyebrow>AI Automation & Agentic AI</Eyebrow>
              <SectionTitle dark>
                From repetitive tasks to <span>intelligent action.</span>
              </SectionTitle>
              <p className="sol-split-body">
                We help businesses move beyond traditional automation by combining AI, intelligent workflows and human expertise to automate processes, understand information and support better decisions.
              </p>
              <p className="sol-split-body">
                Sytrion combines AI, workflow automation and human expertise to improve the way work gets done —
                from document processing to complex multi-step decision workflows.
              </p>
              <Link href="/contact" className="btn-primary" style={{ display: "inline-flex" }}>
                Explore AI Opportunities <ArrowIcon />
              </Link>
            </div>

            <div className="sol-split-img">
              <img
                src="/AI-Automation-and-Agentic-AI-2.jpeg"
                alt="AI Automation & Agentic AI"
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", aspectRatio: "4/3" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 60%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: "30px", left: "30px", display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "50px", height: "50px", borderRadius: "12px", background: "#C6E84A", display: "flex", alignItems: "center", justifyContent: "center", color: "#0f0f0f" }}>
                  <SolIcon name="sparkles" size={24} />
                </div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "18px" }}>Agentic Operations</div>
                  <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>Workflow orchestration</div>
                </div>
              </div>
            </div>
          </div>

          <div className="sol-grid-4">
            {aiCapabilities.map((cap) => (
              <SolutionCard key={cap.title} icon={cap.icon} title={cap.title} desc={cap.desc} variant="dark" />
            ))}
          </div>

          <div className="sol-callout">
            <div className="sol-callout-rule" />
            <p className="sol-callout-line">
              &ldquo;We don&apos;t introduce AI because it is new. We apply it where it can make operations <span>meaningfully better.</span>&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════ 4. INTELLIGENT OPERATIONS ══════════════════════ */}
      <section id="intelligent-operations" className="sol-section sol-section--light">
        <div className="sol-wrap">
          <Eyebrow>Intelligent Operations</Eyebrow>
          <SectionTitle>
            People. Process. <span>Technology.</span>
          </SectionTitle>
          <p style={{
                fontSize: "19px",
                fontWeight: 400,
                color: "#9CA3AF",
                lineHeight: 1.8,
                maxWidth: "100%",
              }}>
            Sytrion combines skilled teams, standardized processes, automation and performance management to improve business-critical operations. 
We work as an extension of your organization, bringing greater efficiency, consistency and control to everyday processes. 
          </p>

          <div className="ops-cards-scroll" style={{ marginTop: "48px" }}>
            {opsCapabilities.map((cap) => (
              <div key={cap.title} className="ops-card">
                <div className="ops-card-img">
                  <img
                    src={cap.image}
                    alt={cap.title}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="ops-card-body">
                  <h4 className="ops-card-title">{cap.title}</h4>
                  <p className="ops-card-desc">{cap.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="sol-callout">
            <div className="sol-callout-rule" />
            <p className="sol-callout-line" style={{ color: "#0f172a" }}>
              Technology makes operations smarter. <span>Operational discipline makes them dependable.</span>
            </p>
          </div>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/contact" className="btn-primary">
              Transform Your Operations <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════ 5. DATA ENGINEERING ══════════════════════ */}
      <section id="data-engineering" className="sol-section sol-section--dark">
        <div className="sol-wrap">
          <div className="">
           <Eyebrow> DATA ENGINEERING </Eyebrow>
            <SectionTitle dark>
              The backbone of every <span>intelligent system.</span>
            </SectionTitle>
            <p style={{
                fontSize: "19px",
                fontWeight: 400,
                color: "#9CA3AF",
                lineHeight: 1.8,
                maxWidth: "100%",
              }}>
              AI and analytics are only as reliable as the information behind them. Sytrion transforms fragmented data into structured, accurate and usable assets that power operations, analytics and AI.
            </p>
          </div>

          <div className="de-grid">
            {dataCapabilities.map((cap) => (
              <DataEngCard
                key={cap.title}
                index={cap.index}
                icon={cap.icon}
                title={cap.title}
                desc={cap.desc}
              />
            ))}
          </div>

          <div className="de-footer">
            <p className="de-footer-text">Better intelligence begins with <span>better data.</span></p>
            <Link href="/contact" className="de-footer-cta">
              Strengthen your data foundation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════ 6. ANALYTICS & BI ══════════════════════ */}
      <section id="analytics-bi" className="sol-section sol-section--light">
        <div className="sol-wrap">
          <Eyebrow>Analytics &amp; Business Intelligence</Eyebrow>
          <SectionTitle>
            Turn business data into <span>better decisions.</span>
          </SectionTitle>
          <p style={{
                fontSize: "19px",
                fontWeight: 400,
                color: "#9CA3AF",
                lineHeight: 1.8,
                maxWidth: "100%",
              }}>
            Sytrion transforms enterprise and operational data into clear, actionable intelligence — helping teams understand performance, identify opportunities and make informed decisions. 
          </p>

          <CapabilitiesOrbit />

          <div className="sol-callout">
            <div className="sol-callout-rule" />
            <p className="sol-callout-line" style={{ color: "#0f172a" }}>
              The value of data isn&apos;t in having more of it. It&apos;s in <span>knowing what it means.</span>
            </p>
          </div>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/contact" className="btn-primary">
              Turn Data Into Intelligence <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════ 7. SHIPPING & LOGISTICS ══════════════════════ */}
      <section id="shipping-logistics" className="sol-section sol-section--dark sol-section--stack">
        <div className="sol-wrap">
          <Eyebrow>Shipping &amp; Logistics</Eyebrow>
          <SectionTitle dark>
           Intelligence across every movement, <span>document and decision.</span>
          </SectionTitle>
          <p style={{
                fontSize: "19px",
                fontWeight: 400,
                color: "#9CA3AF",
                lineHeight: 1.8,
                maxWidth: "100%",
              }}>
           Sytrion combines logistics expertise, intelligent operations, automation and data to simplify documentation-heavy workflows and improve efficiency across shipping and logistics operations.
          </p>
        </div>

        <section className="stack-wrapper" aria-label="Shipping and logistics capabilities">
          {[
            { title: "Freight Forwarding Operations", desc: "Support high-volume freight workflows with greater speed, accuracy and consistency.", image: "/Freight Forwarding Operations.jpg" },
            { title: "Shipping & Customs Documentation", desc: "Process, validate and manage critical shipping and customs documentation.", image: "/Shipping Documentation.jpg" },
            { title: "Invoice & Billing Operations", desc: "Streamline invoice processing, validation, billing workflows and exception handling.", image: "/Invoice & Billing Operations.jpg" },
            { title: "Shipment Data Management", desc: "Capture, validate and maintain accurate shipment and operational information.", image: "/Shipment Data Management.jpg" },
            { title: "Exception Management", desc: "Identify and manage discrepancies through structured resolution workflows.", image: "/Exception Management.jpg" },
            { title: "Automation & Logistics Analytics", desc: "Automate repetitive activities while improving visibility into operational performance.", image: "/Automation & Logistics Analytics.jpg" },
          ].map((card, i) => (
            <div key={card.title} className="stack-card">
              <div className="stack-media">
                <img
                  src={card.image}
                  alt={card.title}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
              <div className="stack-body">
                <span className="stack-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="stack-title">{card.title}</h3>
                <p className="stack-desc">{card.desc}</p>
              </div>
            </div>
          ))}
        </section>

        <div className="sol-wrap">
          <div style={{ marginTop: "48px" }}>
            <span className="sol-sublabel">Who We Support</span>
            <div className="sol-tags">
              {["Shipping companies", "Freight forwarders", "Logistics service providers", "3PL organizations", "Supply-chain businesses"].map((tag) => (
                <span key={tag} className="sol-tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="sol-callout">
            <div className="sol-callout-rule" />
            <p className="sol-callout-line">
              Moving information as efficiently as you <span>move goods.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════ 8. HEALTHCARE OPERATIONS ══════════════════════ */}
      <section id="healthcare-operations" className="ho-section">
        <div className="ho-wrap">
          <Eyebrow>Healthcare Operations</Eyebrow>
          <SectionTitle style={{ maxWidth: "100%" }}>
            Smarter administration.{" "}
            <span>More efficient healthcare operations.</span>
          </SectionTitle>
          <p style={{
                fontSize: "19px",
                fontWeight: 400,
                color: "#9CA3AF",
                lineHeight: 1.8,
                maxWidth: "100%",
              }}>
            Sytrion combines intelligent document processing, automation, data
            and operational expertise to simplify healthcare administrative
            workflows while maintaining a strong focus on accuracy, security
            and control.
          </p>

          <div className="ho-grid">
            <ul className="ho-list">
              {healthcareCapabilities.map((cap, i) => (
                <li key={cap.title} className="ho-item">
                  <span className="ho-num">{String(i + 1).padStart(2, "0")}</span>
                  <div className="ho-item-body">
                    <h3 className="ho-item-title">{cap.title}</h3>
                    <p className="ho-item-desc">{cap.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="ho-media">
              <img
                src="/healthcare operations section.png"
                alt="Healthcare professional reviewing documents on a tablet"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div className="ho-band">
            <p>
              We bring people, technology and intelligence together to make{" "}
              <span>healthcare administration simpler.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════ 9. CONNECTED ECOSYSTEM ══════════════════════ */}
      <section className="sol-section sol-section--dark">
        <div className="sol-wrap">
          <Eyebrow>One Connected intelligence Ecosystem</Eyebrow>
          <SectionTitle dark>
           The strongest solutions rarely rely on <span style={{ color: "#C6E84A" }}>one capability alone.</span>
          </SectionTitle>
          <p style={{
                fontSize: "19px",
                fontWeight: 400,
                color: "#9CA3AF",
                lineHeight: 1.8,
                maxWidth: "100%",
              }}>
            Sytrion connects AI, operations, data, analytics and domain expertise to address the complete business challenge. 
          </p>

          <div className="sol-eco-row">
            {ecosystem.map((item) => (
              <div key={item.title} className="sol-eco-item">
                <div className="sol-eco-icon">
                  <SolIcon name={item.icon} size={24} />
                </div>
                <div className="sol-eco-title">{item.title}</div>
                <p className="sol-eco-desc">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="sol-callout">
            <div className="sol-callout-rule" />
            <p className="sol-callout-line">
              <span>Smarter Operations.</span> Meaningful Outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════ 10. APPROACH / PROCESS ══════════════════════ */}
      <section className="sol-section sol-section--light">
        <div className="sol-wrap">
          <Eyebrow>Our Approach</Eyebrow>
          <SectionTitle>
            Transformation starts with <span>understanding.</span>
          </SectionTitle>
          <p style={{
                fontSize: "19px",
                fontWeight: 400,
                color: "#9CA3AF",
                lineHeight: 1.8,
                maxWidth: "100%",
              }}>
            We don&apos;t begin with a technology recommendation. We begin by understanding how your business works,
            where friction exists and what better performance should look like.
          </p>

          <ApproachTimeline />
        </div>
      </section>

      {/* ══════════════════════ 13. FINAL CTA ══════════════════════ */}
      <section className="sol-section sol-section--dark" style={{ textAlign: "center" }}>
        <div className="sol-wrap" style={{ maxWidth: "780px" }}>
          <Eyebrow>Get started</Eyebrow>
          <SectionTitle dark>
            Start with the challenge. <span>We&apos;ll help you find the solution.</span>
          </SectionTitle>
          <p className="sol-lead" style={{ maxWidth: "640px", margin: "20px auto" }}>
          Whether the opportunity lies in AI, automation, data, analytics or operations, we'll help you identify the right approach and build a solution around your business.
          </p>

           <button className="cta-primary">Schedule a Consultation</button>
            <button className="cta-secondary">Talk to Our Experts</button>
        </div>
      </section>
    </>
  );
}
