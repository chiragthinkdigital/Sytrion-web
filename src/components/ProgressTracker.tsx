"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export type ProgressTrackerStep = {
  name: string;
  desc: string;
};

type ProgressTrackerProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  steps: ProgressTrackerStep[];
  icons: readonly LucideIcon[];
  revealClass?: string;
  ariaLabel?: string;
};

type CSSVars = CSSProperties & { "--pt-progress": string };

export default function ProgressTracker({
  eyebrow,
  title,
  description,
  steps,
  icons,
  revealClass,
  ariaLabel,
}: ProgressTrackerProps) {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [visible, setVisible] = useState(false);
  const stepsRef = useRef<HTMLDivElement>(null);
  const last = Math.max(1, steps.length - 1);
  const reveal = revealClass ? ` ${revealClass}` : "";

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setActive(Math.min(3, steps.length - 1)), 0);
    return () => window.clearTimeout(id);
  }, [steps.length]);

  useEffect(() => {
    const el = stepsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => {
      setActive((a) => (a >= steps.length - 1 ? 0 : a + 1));
    }, 2000);
    return () => window.clearTimeout(t);
  }, [active, cycle, visible, steps.length]);

  const jump = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  };

  const progress = `${(active / last) * 100}%`;

  return (
    <section className="progress-tracker" aria-label={ariaLabel ?? eyebrow}>
      <div className="progress-tracker__inner">
        <header className={`progress-tracker__head${reveal}`}>
          <span className="progress-tracker__eyebrow">{eyebrow}</span>
          <h2 className="progress-tracker__h2">{title}</h2>
          {description ? <p className="progress-tracker__lede">{description}</p> : null}
        </header>

        <div
          className={`progress-tracker__steps${reveal}`}
          ref={stepsRef}
          style={{ "--pt-progress": progress } as CSSVars}
        >
          <div className="progress-tracker__track" aria-hidden="true">
            <span className="progress-tracker__fill" />
          </div>

          {steps.map((s, i) => {
            const Icon = icons[i % icons.length];
            const state = i < active ? "completed" : i === active ? "current" : "upcoming";
            return (
              <div key={s.name} className={`progress-tracker__step progress-tracker__step--${state}`}>
                <button
                  type="button"
                  className="progress-tracker__node"
                  aria-label={`${s.name} – ${s.desc}`}
                  onClick={() => jump(i)}
                >
                  <Icon
                    size={38}
                    strokeWidth={1.7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  />
                </button>
                <div className="progress-tracker__meta">
                  <span className="progress-tracker__num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="progress-tracker__name">{s.name}</span>
                  <span className="progress-tracker__desc">{s.desc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .progress-tracker { background: #fafaf8; font-family: var(--font-geist-sans), Arial, sans-serif; }
        .progress-tracker * { box-sizing: border-box; }

        .progress-tracker__inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: clamp(76px, 9vw, 128px) clamp(20px, 4vw, 40px);
        }

        .progress-tracker__eyebrow {
          display: inline-block;
          padding: 8px 20px;
          border: 1px solid #7fae06;
          border-radius: 999px;
          background: #C6E84A;
          color: #0f0f0f;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .progress-tracker__h2 {
          font-family: var(--font-syne), Arial, sans-serif;
          font-size: clamp(30px, 4.4vw, 54px);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.08;
          color: #15180d;
          margin: 0 0 24px;
        }
        .progress-tracker__h2 .stf-h2-accent { color: #8fbf0c; }

        .progress-tracker__lede {
          font-size: clamp(16px, 1.4vw, 19px);
          line-height: 1.75;
          color: #5A5D66;
          margin: 0;
          max-width: 900px;
        }

        .progress-tracker__steps {
          position: relative;
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          margin-top: clamp(36px, 4vw, 56px);
        }

        .progress-tracker__track {
          position: absolute;
          left: 7.15%;
          right: 7.15%;
          top: 38px;
          height: 8px;
          border-radius: 99px;
          background: #dfe6cf;
          overflow: hidden;
          z-index: 0;
        }
        .progress-tracker__fill {
          position: absolute;
          left: 0;
          top: 0;
          width: var(--pt-progress);
          height: 100%;
          border-radius: 99px;
          background: #b3e00f;
          transition: width 0.6s ease, height 0.6s ease;
        }

        .progress-tracker__step {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          min-width: 0;
        }

        .progress-tracker__node {
          appearance: none;
          -webkit-appearance: none;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 84px;
          width: 84px;
          height: 84px;
          padding: 0;
          border-radius: 50%;
          border: 2px solid #dfe6cf;
          background: #ffffff;
          color: #0e1a12;
          cursor: pointer;
          transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .progress-tracker__node svg { width: 38px; height: 38px; }
        .progress-tracker__node:focus-visible {
          outline: 3px solid #0e1a12;
          outline-offset: 3px;
        }

        .progress-tracker__step--completed .progress-tracker__node,
        .progress-tracker__step--current .progress-tracker__node {
          background: #b3e00f;
          border-color: #b3e00f;
        }
        .progress-tracker__step--current .progress-tracker__node {
          box-shadow: 0 0 0 10px rgba(179, 224, 15, 0.3);
          animation: progressTrackerPulse 2s ease-in-out infinite;
        }
        @keyframes progressTrackerPulse {
          0%, 100% { box-shadow: 0 0 0 10px rgba(179, 224, 15, 0.3); }
          50% { box-shadow: 0 0 0 18px rgba(179, 224, 15, 0.14); }
        }

        .progress-tracker__meta {
          margin-top: 18px;
          max-width: 210px;
        }
        .progress-tracker__step--upcoming .progress-tracker__meta { opacity: 0.55; }

        .progress-tracker__num {
          display: block;
          font-family: var(--font-syne), Arial, sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #7AA306;
          font-variant-numeric: tabular-nums;
        }
        .progress-tracker__name {
          display: block;
          font-family: var(--font-syne), Arial, sans-serif;
          font-size: 19px;
          font-weight: 700;
          line-height: 1.2;
          color: #0e1a12;
          margin-top: 4px;
        }
        .progress-tracker__desc {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-size: 15px;
          line-height: 1.4;
          color: #5c6770;
          margin-top: 4px;
        }

        @media (max-width: 1100px) {
          .progress-tracker__steps {
            display: flex;
            flex-direction: column;
            gap: 32px;
          }
          .progress-tracker__track {
            left: 38px;
            right: auto;
            top: 38px;
            bottom: 38px;
            width: 8px;
            height: auto;
          }
          .progress-tracker__fill {
            width: 100%;
            height: var(--pt-progress);
          }
          .progress-tracker__step {
            display: grid;
            grid-template-columns: 84px minmax(0, 1fr);
            gap: 16px;
            align-items: start;
            text-align: left;
          }
          .progress-tracker__meta {
            margin-top: 0;
            max-width: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .progress-tracker__fill { transition: none; }
          .progress-tracker__step--current .progress-tracker__node { animation: none; }
        }
      `}</style>
    </section>
  );
}
