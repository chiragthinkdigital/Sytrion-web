"use client";

import { Clock, Coins, FileText, House, LayoutGrid, Sparkles, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Participant = {
  step: number;
  title: string;
  desc: string;
  icon: LucideIcon;
  col: number;
  row: number;
};

const PARTICIPANTS: readonly Participant[] = [
  { step: 1, title: "Subscribers", desc: "People at the heart of the system", icon: User, col: 1, row: 1 },
  { step: 2, title: "Service & access channels", desc: "Digital, human, and partner touchpoints", icon: LayoutGrid, col: 2, row: 1 },
  { step: 3, title: "Recordkeeping & administration", desc: "Accurate records and administration", icon: FileText, col: 3, row: 1 },
  { step: 4, title: "Contribution & transaction ecosystem", desc: "Money movement across the ecosystem", icon: Coins, col: 3, row: 3 },
  { step: 5, title: "Pension / financial institutions", desc: "Plans, providers, and financial partners", icon: House, col: 2, row: 3 },
  { step: 6, title: "Retirement & service ecosystem", desc: "Guidance through retirement decisions", icon: Clock, col: 1, row: 3 },
];

const INTELLIGENCE_LAYER = ["AI", "Automation", "Data", "Workflow", "Analytics"];

export default function EcosystemHoneycomb() {
  return (
    <section className="pns-eco" aria-labelledby="pns-eco-title">
      <div className="pns-eco-glow" aria-hidden="true" />

      <div className="pns-eco-inner">
        <header className="pns-eco-head dpi-reveal">
          <span className="dpi-eyebrow">CONNECTED PENSION ECOSYSTEM</span>
          <h2 className="pns-eco-h2" id="pns-eco-title">
            <span>One ecosystem. Multiple participants.</span>
            <span className="pns-eco-h2-lime">One continuous flow of information.</span>
          </h2>
          <p className="pns-eco-sub">
            A connected ecosystem of participants working together to deliver better outcomes for subscribers.
          </p>
        </header>

        <div className="pns-eco-diagram dpi-reveal">
          <svg className="pns-eco-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M50 50 L16.7 12.5" />
            <path d="M50 50 L50 12.5" />
            <path d="M50 50 L83.3 12.5" />
            <path d="M50 50 L16.7 87.5" />
            <path d="M50 50 L50 87.5" />
            <path d="M50 50 L83.3 87.5" />
          </svg>

          <div className="pns-eco-hub">
            <span className="pns-eco-ring1" aria-hidden="true" />
            <span className="pns-eco-ring2" aria-hidden="true" />
            <Sparkles size={40} strokeWidth={1.6} aria-hidden="true" />
            <span className="pns-eco-hub-title">
              <span>Sytrion</span>
              <span>Intelligence</span>
            </span>
            <span className="pns-eco-hub-tag">THE CONNECTIVE LAYER</span>
          </div>

          {PARTICIPANTS.map((p) => {
            const Icon = p.icon;
            return (
              <article
                key={p.step}
                className="pns-eco-card"
                style={{ gridColumn: p.col, gridRow: p.row }}
              >
                <span className="pns-eco-tile" aria-hidden="true">
                  <Icon size={24} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
                </span>
                <div className="pns-eco-copy">
                  <h3 className="pns-eco-card-title">{p.title}</h3>
                  <p className="pns-eco-card-desc">{p.desc}</p>
                </div>
                <span className="pns-eco-badge" aria-hidden="true">{p.step}</span>
              </article>
            );
          })}
        </div>

        <div className="pns-eco-layer">
          <div className="pns-eco-layerbar">
            <span className="pns-eco-layerlabel">SYTRION INTELLIGENCE LAYER</span>
            <ul className="pns-eco-chips" aria-label="Sytrion Intelligence Layer capabilities">
              {INTELLIGENCE_LAYER.map((x) => (
                <li className="pns-eco-chip" key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .pns-eco {
          --pns-bg: #f7f8f3;
          --pns-dark: #141a0f;
          --pns-lime: #c5e84d;
          --pns-green: #8fb312;
          --pns-line: #a9c93a;
          --pns-text: #4a5043;
          --pns-desc: #515847;
          --pns-border: #e3e7d8;
          position: relative;
          overflow: hidden;
          background: var(--pns-bg);
          font-family: var(--font-geist-sans), Arial, sans-serif;
        }
        .pns-eco * { box-sizing: border-box; }

        .pns-eco-glow {
          position: absolute;
          left: 50%;
          top: 640px;
          width: 1000px;
          height: 1000px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(197,232,77,0.22) 0%, rgba(197,232,77,0) 62%);
          pointer-events: none;
          z-index: 0;
        }

        .pns-eco-inner {
          position: relative;
          z-index: 1;
          max-width: 1400px;
          margin: 0 auto;
          padding: clamp(76px, 9vw, 128px) clamp(20px, 4vw, 40px);
        }

        .pns-eco-h2 {
          font-family: var(--font-syne), Arial, sans-serif;
          font-size: clamp(30px, 4.4vw, 54px);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.08;
          color: #1a1a1a;
          margin: 0 0 24px;
        }
        .pns-eco-h2 > span { display: inline; }
        .pns-eco-h2-lime { color: #C6E84A; }
        .pns-eco-sub {
          font-size: 17px;
          line-height: 1.7;
          color: #1a1a1a;
          opacity: 0.75;
          max-width: none;
          margin: 0;
        }

        .pns-eco-diagram {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 150px 300px 150px;
          height: 600px;
          margin-top: 56px;
        }
        .pns-eco-lines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }
        .pns-eco-lines path {
          stroke: var(--pns-line);
          stroke-width: 1.5;
          stroke-dasharray: 3 6;
          stroke-linecap: round;
          vector-effect: non-scaling-stroke;
          fill: none;
        }

        .pns-eco-hub {
          position: relative;
          grid-column: 1 / -1;
          grid-row: 2;
          justify-self: center;
          align-self: center;
          width: 290px;
          height: 290px;
          z-index: 1;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 25%, #27331b 0%, #141a0f 65%);
          box-shadow: 0 0 0 8px rgba(197,232,77,0.28), 0 24px 60px rgba(20,26,15,0.35);
          color: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .pns-eco-hub > svg { color: var(--pns-lime); display: block; }
        .pns-eco-ring1,
        .pns-eco-ring2 {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .pns-eco-ring1 { inset: -26px; border: 1.5px dashed var(--pns-line); }
        .pns-eco-ring2 { inset: -52px; border: 1px solid rgba(169,201,58,0.35); }
        .pns-eco-hub-title {
          font-family: var(--font-syne), Arial, sans-serif;
          font-weight: 800;
          font-size: 27px;
          line-height: 1.1;
          color: #ffffff;
          margin-top: 12px;
        }
        .pns-eco-hub-title > span { display: block; }
        .pns-eco-hub-tag {
          color: var(--pns-lime);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.16em;
          margin-top: 14px;
        }

        .pns-eco-card {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          width: 300px;
          max-width: 92%;
          justify-self: center;
          align-self: center;
          background: #ffffff;
          border: 1px solid var(--pns-border);
          border-radius: 20px;
          padding: 20px 22px;
          box-shadow: 0 10px 30px rgba(20,26,15,0.06);
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .pns-eco-card:hover {
          transform: translateY(-4px);
          border-color: var(--pns-lime);
          box-shadow: 0 16px 40px rgba(111,140,10,0.18);
        }
        .pns-eco-tile {
          flex: 0 0 48px;
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: var(--pns-dark);
          color: var(--pns-lime);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pns-eco-tile svg {
          width: 24px;
          height: 24px;
          stroke: var(--pns-lime);
          stroke-width: 1.7;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .pns-eco-copy { min-width: 0; }
        .pns-eco-card-title {
          font-family: var(--font-syne), Arial, sans-serif;
          font-weight: 700;
          font-size: 17px;
          line-height: 1.2;
          color: var(--pns-dark);
          margin: 0;
        }
        .pns-eco-card-desc {
          font-size: 13.5px;
          line-height: 1.5;
          color: var(--pns-desc);
          margin: 6px 0 0;
        }
        .pns-eco-badge {
          position: absolute;
          top: -11px;
          right: 18px;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: var(--pns-lime);
          border: 3px solid var(--pns-bg);
          color: var(--pns-dark);
          font-weight: 800;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pns-eco-layer {
          margin-top: 56px;
          display: flex;
          justify-content: center;
        }
        .pns-eco-layerbar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
          width: fit-content;
          max-width: 100%;
          background: var(--pns-dark);
          border-radius: 999px;
          padding: 12px;
        }
        .pns-eco-layerlabel {
          color: var(--pns-lime);
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.14em;
          padding: 0 14px;
        }
        .pns-eco-chips {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .pns-eco-chip {
          display: flex;
          align-items: center;
          gap: 9px;
          background: rgba(255,255,255,0.08);
          color: #ffffff;
          font-weight: 600;
          font-size: 14px;
          padding: 10px 20px;
          border-radius: 999px;
        }
        .pns-eco-chip::before {
          content: "";
          flex: 0 0 auto;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--pns-lime);
        }

        @media (max-width: 860px) {
          .pns-eco-diagram {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 34px;
            height: auto;
          }
          .pns-eco-lines { display: none; }
          .pns-eco-hub { flex: 0 0 auto; margin: 50px 0; }
          .pns-eco-card { width: 100%; max-width: 420px; }
          .pns-eco-layerbar { border-radius: 28px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pns-eco-card { transition: none; }
          .pns-eco-card:hover { transform: none; }
        }
      `}</style>
    </section>
  );
}
