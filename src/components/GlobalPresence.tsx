"use client";

import { useState, useRef } from "react";

/* ── Flag / icon SVGs ─────────────────────────────────────── */

function starPath(cx: number, cy: number, r: number) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? r : r * 0.42;
    const a = ((i * 36 - 90) * Math.PI) / 180;
    pts.push(`${i === 0 ? "M" : "L"}${(cx + rad * Math.cos(a)).toFixed(2)} ${(cy + rad * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ") + "Z";
}

function sparkPath(cx: number, cy: number, r: number) {
  return `M${cx} ${cy - r}L${cx + r * 0.35} ${cy - r * 0.35}L${cx + r} ${cy}L${cx + r * 0.35} ${cy + r * 0.35}L${cx} ${cy + r}L${cx - r * 0.35} ${cy + r * 0.35}L${cx - r} ${cy}L${cx - r * 0.35} ${cy - r * 0.35}Z`;
}

function FlagAustralia() {
  return (
    <svg viewBox="0 0 60 30" className="gp-flag-svg" aria-hidden="true">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0l30 15M0 15L30 0M0 7.5h30M15 0v15" stroke="#fff" strokeWidth="5" fill="none" />
      <path d="M0 0l30 15M0 15L30 0M0 7.5h30M15 0v15" stroke="#E4002B" strokeWidth="2.6" fill="none" />
      <g fill="#fff">
        <path d={sparkPath(42, 21, 2.4)} />
        <path d={sparkPath(49, 13.5, 1.3)} />
        <path d={sparkPath(56, 20, 1.3)} />
        <path d={sparkPath(47, 8.5, 1.1)} />
        <path d={sparkPath(44, 15.5, 1)} />
      </g>
    </svg>
  );
}

function FlagNewZealand() {
  return (
    <svg viewBox="0 0 60 30" className="gp-flag-svg" aria-hidden="true">
      <rect width="60" height="30" fill="#00247D" />
      <path d="M0 0l30 15M0 15L30 0M0 7.5h30M15 0v15" stroke="#fff" strokeWidth="5" fill="none" />
      <path d="M0 0l30 15M0 15L30 0M0 7.5h30M15 0v15" stroke="#CC142B" strokeWidth="2.6" fill="none" />
      <g fill="#CC142B" stroke="#fff" strokeWidth="1.1">
        <path d={sparkPath(47.5, 12, 1.8)} />
        <path d={sparkPath(41, 20, 1.6)} />
        <path d={sparkPath(54, 21, 1.4)} />
        <path d={sparkPath(51, 8, 1.2)} />
      </g>
    </svg>
  );
}

function FlagUnitedStates() {
  const stars: React.ReactNode[] = [];
  for (let r = 0; r < 9; r++) {
    const n = r % 2 === 0 ? 6 : 5;
    for (let c = 0; c < n; c++) {
      const x = 2.9 + c * 4.3 + (r % 2 === 1 ? 2.15 : 0);
      const y = 1.6 + r * 1.6;
      stars.push(<circle key={`${r}-${c}`} cx={x.toFixed(2)} cy={y.toFixed(2)} r="0.62" fill="#fff" />);
    }
  }
  return (
    <svg viewBox="0 0 60 30" className="gp-flag-svg" aria-hidden="true">
      {Array.from({ length: 13 }, (_, i) => (
        <rect key={i} width="60" height="2.3077" y={(30 / 13) * i} fill={i % 2 === 0 ? "#B22234" : "#fff"} />
      ))}
      <rect width="26" height="14.8" fill="#3C3B6E" />
      {stars}
    </svg>
  );
}

function FlagEurope() {
  return (
    <svg viewBox="0 0 60 40" className="gp-flag-svg" aria-hidden="true">
      <rect width="60" height="40" fill="#003399" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 * Math.PI) / 180 - Math.PI / 2;
        const x = 30 + 12 * Math.cos(a);
        const y = 20 + 12 * Math.sin(a);
        return <path key={i} d={starPath(x, y, 2.1)} fill="#FFD700" />;
      })}
    </svg>
  );
}

function FlagLogo({ src }: { src: string }) {
  return <img src={src} className="gp-flag-svg gp-logo" alt="" />;
}

/* ── Data ─────────────────────────────────────────────────── */

const regions = [
  { name: "Australia", Flag: FlagAustralia, image: "/australia.jpg", alt: "Sytrion presence in Australia" },
  { name: "New Zealand", Flag: FlagNewZealand, image: "/new zealand.jpg", alt: "Sytrion presence in New Zealand" },
  { name: "United States", Flag: FlagUnitedStates, image: "/united states.jpg", alt: "Sytrion presence in the United States" },
  { name: "Europe", Flag: FlagEurope, image: "/europe.jpg", alt: "Sytrion presence in Europe" },
  { name: "Asia", Flag: () => <FlagLogo src="/asialogo.svg" />, image: "/asia.jpg", alt: "Sytrion presence in Asia" },
  { name: "Africa", Flag: () => <FlagLogo src="/africalogo.svg" />, image: "/africa.jpg", alt: "Sytrion presence in Africa" },
];

const COLLAPSED_WIDTH = 56;

export default function GlobalPresence() {
  const [activeIndex, setActiveIndex] = useState(0);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const gridTemplateColumns = regions
    .map((_, i) => (i === activeIndex ? "minmax(0, 1fr)" : `${COLLAPSED_WIDTH}px`))
    .join(" ");

  return (
    <section className="gp-section" id="global-presence">
      <div className="reveal-section" style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div className="reveal-child" style={{ marginBottom: "48px" }}>
          <span className="eyebrow-badge">Global presence</span>
          <h2 className="heading-display" style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            fontFamily: "var(--font-syne), sans-serif",
            fontWeight: 700,
            color: "var(--ab-text-primary)",
            marginTop: "16px",
          }}>
            Supporting organizations across{" "}
            <span style={{ color: "var(--ab-accent)" }}>the globe</span>
          </h2>
        </div>

        <div className="reveal-child gp-accordion" style={{ gridTemplateColumns }}>
          {regions.map((region, i) => {
            const isActive = i === activeIndex;
            const panelId = `gp-panel-${i}`;
            const tabId = `gp-tab-${i}`;

            if (isActive) {
              return (
                <div
                  key={region.name}
                  id={panelId}
                  role="region"
                  aria-label={region.name}
                  className="gp-card gp-card-active"
                >
                  <div className="gp-card-head">
                    <region.Flag />
                    <h3 className="gp-card-title">{region.name}</h3>
                  </div>
                  <div className="gp-card-media">
                    <img
                      src={region.image}
                      alt={region.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              );
            }

            return (
              <button
                key={region.name}
                id={tabId}
                type="button"
                className="gp-card gp-card-collapsed"
                onClick={() => setActiveIndex(i)}
                onMouseEnter={() => { hoverTimeout.current = setTimeout(() => setActiveIndex(i), 300); } }
                onMouseLeave={() => { if (hoverTimeout.current) { clearTimeout(hoverTimeout.current); hoverTimeout.current = null; } } }
                aria-controls={panelId}
                aria-label={`Show ${region.name}`}
              >
                <region.Flag />
                <span className="gp-label">{region.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        .gp-section {
          --ab-base: #f8f9fc;
          --ab-surface-1: #f0f2f7;
          --ab-surface-2: #ffffff;
          --ab-surface-3: #e8ebf2;
          --ab-text-primary: #0f172a;
          --ab-text-secondary: #334155;
          --ab-text-muted: #64748b;
          --ab-accent: #C6E84A;
          --ab-accent-dim: rgba(198, 232, 74, 0.35);
          --ab-border: rgba(15, 23, 42, 0.08);
          --ab-border-hover: rgba(15, 23, 42, 0.14);
          background: var(--ab-base);
          border-top: 1px solid var(--ab-border);
          padding: 100px 48px;
          overflow: hidden;
        }

        .gp-accordion {
          display: grid;
          gap: 2px;
          height: clamp(420px, 60vh, 560px);
          background: var(--ab-border);
          border: 1px solid var(--ab-border);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 24px 48px rgba(15, 23, 42, 0.1), 0 4px 16px rgba(15, 23, 42, 0.06);
          transition: grid-template-columns 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .gp-card {
          min-width: 0;
          min-height: 0;
          background: var(--ab-surface-2);
          overflow: hidden;
        }

        .gp-card-collapsed {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 18px 10px 22px;
          border: none;
          cursor: pointer;
          color: var(--ab-text-secondary);
          background: var(--ab-surface-2);
          transition: background 0.25s ease, color 0.25s ease;
          animation: gpStripIn 0.5s ease both;
        }
        .gp-card-collapsed:hover {
          background: var(--ab-accent-dim);
          color: var(--ab-text-primary);
        }
        .gp-card-collapsed:hover .gp-flag-svg {
          transform: scale(1.15);
        }

        .gp-flag-svg {
          width: 26px;
          height: auto;
          flex-shrink: 0;
          border-radius: 3px;
          transition: transform 0.25s ease;
        }
        .gp-flag-svg.gp-logo {
          width: 28px;
          height: 28px;
          object-fit: contain;
          border-radius: 4px;
          background: #f0f2f7;
        }
        .gp-card-collapsed .gp-flag-svg {
          width: 24px;
        }
        .gp-card-collapsed .gp-flag-svg.gp-logo {
          width: 24px;
          height: 24px;
        }
        .gp-card-head .gp-flag-svg {
          width: 32px;
        }
        .gp-card-head .gp-flag-svg.gp-logo {
          width: 32px;
          height: 32px;
        }

        .gp-label {
          flex: 1;
          min-height: 0;
          display: flex;
          justify-content: center;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          font-size: 17px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: inherit;
          white-space: nowrap;
        }

        .gp-card-active {
          position: relative;
          display: flex;
          flex-direction: column;
          animation: gpCardIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .gp-card-head {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 22px 26px 20px;
          background: var(--ab-surface-2);
          z-index: 2;
        }
        .gp-card-title {
          font-family: var(--font-syne), sans-serif;
          font-size: clamp(20px, 2.2vw, 28px);
          font-weight: 700;
          color: var(--ab-text-primary);
          line-height: 1.1;
        }
        .gp-card-media {
          flex: 1;
          position: relative;
          min-height: 0;
        }
        .gp-card-media::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(10, 15, 28, 0) 55%, rgba(10, 15, 28, 0.2) 100%);
          pointer-events: none;
        }
        .gp-card-media img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @keyframes gpCardIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes gpStripIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 860px) {
          .gp-section {
            padding: 72px 20px;
          }
          .gp-accordion {
            display: flex;
            height: auto;
            min-height: 440px;
            overflow-x: auto;
            overscroll-behavior-x: contain;
            scroll-snap-type: x proximity;
            scrollbar-width: none;
          }
          .gp-accordion::-webkit-scrollbar { display: none; }
          .gp-card-collapsed {
            flex: 0 0 64px;
            width: 64px;
          }
          .gp-card-active {
            flex: 0 0 min(80vw, 420px);
            scroll-snap-align: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gp-accordion {
            transition: none;
          }
          .gp-card-active,
          .gp-card-collapsed {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}