"use client";

import type { CSSProperties, ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────
   RISING STAIRCASE — shared section

   N steps on a shared baseline, each one 45px taller than the
   last, so the set reads as a climb. Step heights and the step
   fill are both derived from the index rather than hardcoded per
   step, so the two stay locked together:

     height(i) = 170 + i * 45   →  170, 215, 260, 305, 350, …
     fill(i)   = lerp(from, to, i / (n - 1))

   The tallest step lands exactly on the computed row height.

   Self-contained: it ships its own eyebrow, heading and styles, so
   a page only has to supply copy, step data and its reveal class.
   ───────────────────────────────────────────────────────────── */

const STEP_BASE = 170;
const STEP_RISE = 45;

export type StaircaseVariant = "white" | "dots" | "lime" | "ink";

export type StaircaseStep = {
  name: string;
  desc: string;
};

type Palette = {
  /** Page-level band behind the card. */
  section: string;
  card: string;
  stepFrom: string;
  stepTo: string;
  border: string;
  /** Step text colour before any flip. */
  text: string;
  /** Heading accent, applied to `.stf-h2-accent`. */
  accent: string;
  /** Heading base colour. */
  heading: string;
  /** Optional lede paragraph colour. */
  muted: string;
  eyebrowBg: string;
  eyebrowFg: string;
  /** From this index onward the step text inverts for contrast. */
  flipAt?: { from: number; text: string };
  /** Optional card background pattern. */
  pattern?: string;
};

const PALETTES: Record<StaircaseVariant, Palette> = {
  white: {
    section: "#fafaf8",
    card: "#ffffff",
    stepFrom: "#eef7c8",
    stepTo: "#b2df10",
    border: "#7fae06",
    text: "#15180d",
    accent: "#8fbf0c",
    heading: "#15180d",
    muted: "#5A5D66",
    eyebrowBg: "#C6E84A",
    eyebrowFg: "#0f0f0f",
  },
  dots: {
    section: "#fafaf8",
    card: "#eef2df",
    stepFrom: "#ffffff",
    stepTo: "#c6f03c",
    border: "#15180d",
    text: "#15180d",
    accent: "#6f9a08",
    heading: "#15180d",
    muted: "#5A5D66",
    eyebrowBg: "#C6E84A",
    eyebrowFg: "#0f0f0f",
    pattern: "radial-gradient(rgba(21, 24, 13, 0.13) 1.2px, transparent 1.2px)",
  },
  lime: {
    section: "#fafaf8",
    card: "#c6f03c",
    stepFrom: "#f7fcd9",
    stepTo: "#15180d",
    border: "#15180d",
    text: "#15180d",
    accent: "#ffffff",
    heading: "#15180d",
    muted: "#15180d",
    eyebrowBg: "#15180d",
    eyebrowFg: "#c6f03c",
    flipAt: { from: 3, text: "#f1f4e6" },
  },
  ink: {
    section: "#fafaf8",
    card: "#10140a",
    stepFrom: "#2b3512",
    stepTo: "#c6f03c",
    border: "#c6f03c",
    text: "#f1f4e6",
    accent: "#c6f03c",
    heading: "#f1f4e6",
    muted: "rgba(255,255,255,0.62)",
    eyebrowBg: "#c6f03c",
    eyebrowFg: "#0f0f0f",
    flipAt: { from: 3, text: "#15180d" },
  },
};

type CSSVars = CSSProperties & { [key: `--${string}`]: string | number };

/** Linear interpolation between two #rrggbb colours, t in [0, 1]. */
function lerpHex(from: string, to: string, t: number): string {
  const a = parseInt(from.slice(1), 16);
  const b = parseInt(to.slice(1), 16);
  const channel = (shift: number) => {
    const x = (a >> shift) & 0xff;
    const y = (b >> shift) & 0xff;
    return Math.round(x + (y - x) * t).toString(16).padStart(2, "0");
  };
  return `#${channel(16)}${channel(8)}${channel(0)}`;
}

export type StaircaseFlowProps = {
  /** Small uppercase pill above the heading. */
  eyebrow: string;
  /** Heading content. Wrap the highlighted phrase in `.stf-h2-accent`. */
  title: ReactNode;
  /** Optional supporting paragraph under the heading. */
  description?: ReactNode;
  steps: StaircaseStep[];
  variant?: StaircaseVariant;
  /** The host page's scroll-reveal class, e.g. `tv-reveal`. */
  revealClass?: string;
  /** Accessible name for the landmark. Defaults to the eyebrow. */
  ariaLabel?: string;
};

export default function StaircaseFlow({
  eyebrow,
  title,
  description,
  steps,
  variant = "white",
  revealClass,
  ariaLabel,
}: StaircaseFlowProps) {
  const p = PALETTES[variant] ?? PALETTES.white;
  const last = Math.max(1, steps.length - 1);
  const rowHeight = STEP_BASE + STEP_RISE * Math.max(0, steps.length - 1);
  const reveal = revealClass ? ` ${revealClass}` : "";

  const cardStyle: CSSVars = {
    backgroundColor: p.card,
    backgroundImage: p.pattern,
    backgroundSize: p.pattern ? "22px 22px" : undefined,
    color: p.heading,
    "--stf-border": p.border,
    "--stf-accent": p.accent,
    "--stf-muted": p.muted,
  };

  return (
    <section className="stf" aria-label={ariaLabel ?? eyebrow} style={{ background: p.section }}>
      <div className="stf-inner">
        <div className="stf-card" style={cardStyle}>
          <header className={`stf-head${reveal}`}>
            <span
              className="stf-eyebrow"
              style={{ background: p.eyebrowBg, color: p.eyebrowFg }}
            >
              {eyebrow}
            </span>
            <h2 className="stf-h2">{title}</h2>
            {description ? <p className="stf-lede">{description}</p> : null}
          </header>

          <ol className={`stf-row${reveal}`} style={{ height: rowHeight }}>
            {steps.map((s, i) => {
              const text = p.flipAt && i >= p.flipAt.from ? p.flipAt.text : p.text;
              const stepStyle: CSSVars = {
                "--stf-step-bg": lerpHex(p.stepFrom, p.stepTo, i / last),
                "--stf-step-h": `${STEP_BASE + i * STEP_RISE}px`,
                color: text,
              };

              return (
                <li className="stf-step" key={s.name} style={stepStyle} tabIndex={0}>
                  <span className="stf-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="stf-name">{s.name}</span>
                  <span className="stf-desc">{s.desc}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <style>{`
        .stf { font-family: var(--font-geist-sans), Arial, sans-serif; }
        .stf * { box-sizing: border-box; }

        .stf-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: clamp(76px, 9vw, 128px) clamp(20px, 4vw, 40px);
        }

        .stf-card {
          border-radius: 28px;
          padding: clamp(20px, 4vw, 48px);
          overflow: hidden;
        }

        .stf-eyebrow {
          display: inline-block;
          padding: 8px 20px;
          border: 1px solid var(--stf-border);
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .stf-h2 {
          font-family: var(--font-syne), Arial, sans-serif;
          font-size: clamp(30px, 4.4vw, 54px);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.08;
          color: inherit;
          margin: 0 0 24px;
        }
        .stf-h2-accent { color: var(--stf-accent); }

        .stf-lede {
          font-size: clamp(16px, 1.4vw, 19px);
          line-height: 1.75;
          color: var(--stf-muted);
          margin: 0;
          max-width: 900px;
        }

        .stf-row {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: flex-end;
          gap: 10px;
        }

        .stf-step {
          flex: 1;
          min-width: 0;
          height: var(--stf-step-h);
          border: 2px solid var(--stf-border);
          border-radius: 20px 20px 6px 6px;
          background: var(--stf-step-bg);
          padding: 16px 14px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
          cursor: default;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .stf-step:hover,
        .stf-step:focus-visible {
          transform: translateY(-10px);
          box-shadow: 0 14px 24px rgba(30, 40, 0, 0.18);
        }
        .stf-step:focus-visible {
          outline: 3px solid var(--stf-border);
          outline-offset: 3px;
        }

        .stf-num {
          font-family: var(--font-syne), Arial, sans-serif;
          font-size: 34px;
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1;
        }
        .stf-name {
          font-family: var(--font-syne), Arial, sans-serif;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.2;
        }
        .stf-desc {
          font-size: 14px;
          line-height: 1.35;
          opacity: 0.8;
        }

        @media (max-width: 820px) {
          .stf-row { flex-direction: column; align-items: stretch; height: auto; }
          .stf-step { height: auto; }
        }

        @media (prefers-reduced-motion: reduce) {
          .stf-step { transition: none; }
          .stf-step:hover,
          .stf-step:focus-visible { transform: none; }
        }
      `}</style>
    </section>
  );
}
