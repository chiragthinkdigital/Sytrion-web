"use client";

import { Clock, Coins, FileText, House, LayoutGrid, Sparkles, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   CONNECTED PENSION ECOSYSTEM — honeycomb
   Regular pointy-top hexagonal cells in a 2-3-2 flower.

   Geometry (exact, not approximated). For a regular pointy-top
   hexagon of width w, the height is 2w/√3 = 1.1547w, which is
   what makes the clip-path vertices below produce true regular
   hexagons rather than stretched ones:

     --w : cell width
     --g : gap between neighbours
     --h : cell height = w * 1.1547

   A tight hex grid stacks rows at a pitch of 0.75h = 0.866w, so
   each row after the first pulls up by (0.25h) = 0.2887w and then
   pushes back down by the gap allowance, which is what makes the
   rows interlock.
   ───────────────────────────────────────────────────────────── */

type Participant = {
  /** Position in the clockwise walk around the centre cell. */
  step: number;
  label: string;
  icon: LucideIcon;
};

/* Clockwise from the top-left: 1 → 2 across the top, 3 down the
   right, 4 → 5 across the bottom, 6 back up the left. */
const PARTICIPANTS: readonly Participant[] = [
  { step: 1, label: "Subscribers", icon: User },
  { step: 2, label: "Service & Access Channels", icon: LayoutGrid },
  { step: 3, label: "Recordkeeping & Administration", icon: FileText },
  { step: 4, label: "Contribution & Transaction Ecosystem", icon: Coins },
  { step: 5, label: "Pension / Financial Institutions", icon: House },
  { step: 6, label: "Retirement & Service Ecosystem", icon: Clock },
];

const CENTRE: Participant = { step: 0, label: "Sytrion Intelligence", icon: Sparkles };

const INTELLIGENCE_LAYER = ["AI", "Automation", "Data", "Workflow", "Analytics"];

const ROWS: readonly (readonly Participant[])[] = [
  [PARTICIPANTS[0], PARTICIPANTS[1]],
  [PARTICIPANTS[5], CENTRE, PARTICIPANTS[2]],
  [PARTICIPANTS[4], PARTICIPANTS[3]],
];

function HexCell({ participant, centre = false }: { participant: Participant; centre?: boolean }) {
  const Icon = participant.icon;
  const name = centre ? participant.label : `${participant.step}. ${participant.label}`;

  return (
    /* The drop-shadow lives on this wrapper: clip-path on the cell
       itself would cut the shadow off along the hexagon edges. */
    <li className="pns-eco-cellwrap">
      <div
        className={"pns-eco-cell" + (centre ? " pns-eco-cell--centre" : "")}
        role="img"
        aria-label={name}
        tabIndex={0}
      >
        <div className="pns-eco-in">
          <span className="pns-eco-ic">
            <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
          </span>
          <span className="pns-eco-lb">{centre ? "Sytrion Intelligence" : participant.label}</span>
          {!centre && <span className="pns-eco-num">{participant.step}</span>}
        </div>
      </div>
    </li>
  );
}

export default function EcosystemHoneycomb() {
  return (
    <section className="pns-eco" aria-label="Connected Pension Ecosystem">
      <div className="pns-eco-inner">
        <div className="pns-eco-card">
          <header className="pns-eco-head dpi-reveal">
            <span className="dpi-eyebrow">CONNECTED PENSION ECOSYSTEM</span>
            <h2 className="pns-eco-h2">
              <span>One ecosystem. Multiple participants.</span>
              <span className="pns-eco-h2-lime">One continuous flow of information.</span>
            </h2>
            <p className="pns-eco-copy">
              A connected ecosystem of participants working together to deliver better outcomes for subscribers.
            </p>
          </header>

          <div className="pns-eco-body dpi-reveal">
            <ul className="pns-eco-comb" aria-label="Pension ecosystem participants and the Sytrion Intelligence layer">
              {ROWS.map((row, i) => (
                <li className="pns-eco-rowwrap" key={i}>
                  <ul className="pns-eco-row">
                    {row.map((p) => (
                      <HexCell key={p.step} participant={p} centre={p === CENTRE} />
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <aside className="pns-eco-panel">
              <h3 className="pns-eco-pt">Sytrion Intelligence Layer</h3>
              <ul className="pns-eco-chips">
                {INTELLIGENCE_LAYER.map((x) => (
                  <li className="pns-eco-chip" key={x}>
                    {x}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </div>

      <style>{`
        .pns-eco {
          --pns-lime: #C6E84A;
          --pns-ink: #15180d;
          --pns-olive: #4b6112;
          --pns-on-dark: #f1f4e6;
          --pns-card: #ffffff;
          --pns-line: rgba(15, 15, 15, 0.08);
          --pns-heading: #1a1a1a;
          --pns-shell: #fafaf8;
          background: var(--pns-shell);
          font-family: var(--font-geist-sans), Arial, sans-serif;
        }
        .pns-eco * { box-sizing: border-box; }
        .pns-eco-inner { max-width: 1400px; margin: 0 auto; padding: clamp(76px, 9vw, 128px) clamp(20px, 4vw, 40px); }

        .pns-eco-card {
          background: var(--pns-card);
          border: 1px solid var(--pns-line);
          border-radius: 28px;
          padding: clamp(20px, 4vw, 48px);
        }

        .pns-eco-h2 {
          font-family: var(--font-syne), Arial, sans-serif;
          font-size: clamp(30px, 4.4vw, 54px);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.08;
          color: var(--pns-heading);
          margin: 0 0 24px;
        }
        .pns-eco-h2 > span { display: inline; }
        .pns-eco-h2-lime { color: var(--pns-lime); }
        .pns-eco-copy {
          font-size: 17px;
          line-height: 1.7;
          color: var(--pns-heading);
          opacity: 0.75;
          max-width: none;
          margin: 0;
        }

        .pns-eco-body {
          margin-top: clamp(28px, 4vw, 48px);
          display: grid;
          grid-template-columns: auto 1fr;
          gap: clamp(24px, 5vw, 64px);
          align-items: center;
        }

        /* --- honeycomb ------------------------------------------------ */
        .pns-eco-comb {
          --w: clamp(84px, 13.5vw, 158px);
          --g: 8px;
          --h: calc(var(--w) * 1.1547);
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .pns-eco-rowwrap { list-style: none; margin: 0; padding: 0; display: flex; }
        .pns-eco-row {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          gap: var(--g);
          justify-content: center;
        }
        .pns-eco-rowwrap + .pns-eco-rowwrap {
          margin-top: calc(var(--w) * -0.2887 + var(--g) * 0.866);
        }

        .pns-eco-cellwrap {
          list-style: none;
          display: block;
          /* drop-shadow, not box-shadow: clip-path cuts box-shadow away */
          filter: drop-shadow(0 6px 8px rgba(20, 30, 0, 0.18));
          transition: transform 0.25s ease, filter 0.25s ease;
        }
        .pns-eco-cellwrap:has(.pns-eco-cell:hover) { transform: scale(1.08); z-index: 2; }
        .pns-eco-cellwrap:focus-within {
          transform: scale(1.08);
          z-index: 2;
          filter: drop-shadow(0 6px 8px rgba(20, 30, 0, 0.18)) drop-shadow(0 0 0 3px var(--pns-lime));
        }

        .pns-eco-cell {
          --pns-fill: var(--pns-ink);
          --pns-fg: var(--pns-on-dark);
          --pns-icon: var(--pns-lime);
          position: relative;
          width: var(--w);
          height: var(--h);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 16%;
          text-align: center;
          background: var(--pns-olive);
          clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
          outline: none;
          cursor: default;
        }
        .pns-eco-cell::before {
          content: "";
          position: absolute;
          inset: 3px;
          background: var(--pns-fill);
          clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
          transition: background-color 0.25s ease;
        }

        .pns-eco-in {
          position: relative;
          z-index: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }
        .pns-eco-ic { display: block; color: var(--pns-icon); transition: color 0.25s ease; }
        .pns-eco-ic svg { display: block; width: 24px; height: 24px; }
        .pns-eco-lb {
          display: block;
          font-family: var(--font-syne), Arial, sans-serif;
          font-size: clamp(8.5px, 1.15vw, 13px);
          font-weight: 600;
          line-height: 1.15;
          color: var(--pns-fg);
          transition: color 0.25s ease;
          overflow-wrap: anywhere;
        }
        .pns-eco-num {
          display: block;
          font-family: var(--font-syne), Arial, sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: var(--pns-fg);
          opacity: 0.55;
          transition: color 0.25s ease;
        }

        /* Only the targeted cell reacts. Siblings are never dimmed,
           blurred or faded. */
        .pns-eco-cell:hover,
        .pns-eco-cell:focus-visible {
          --pns-fill: var(--pns-lime);
          --pns-fg: var(--pns-ink);
          --pns-icon: var(--pns-ink);
        }
        .pns-eco-cell--centre {
          --pns-fill: var(--pns-lime);
          --pns-fg: var(--pns-ink);
          --pns-icon: var(--pns-ink);
        }
        .pns-eco-cell--centre .pns-eco-lb { font-weight: 800; }
        .pns-eco-cell--centre:hover,
        .pns-eco-cell--centre:focus-visible {
          --pns-fill: var(--pns-ink);
          --pns-fg: var(--pns-lime);
          --pns-icon: var(--pns-lime);
        }

        /* --- info panel ----------------------------------------------- */
        .pns-eco-panel {
          align-self: center;
          background: var(--pns-ink);
          color: var(--pns-on-dark);
          border-radius: 24px;
          padding: 28px;
        }
        .pns-eco-pt {
          font-family: var(--font-syne), Arial, sans-serif;
          font-size: clamp(22px, 2.6vw, 32px);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.15;
          color: inherit;
          margin: 0 0 20px;
        }
        .pns-eco-chips { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 10px; }
        .pns-eco-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.1);
          color: var(--pns-on-dark);
          border-radius: 99px;
          padding: 7px 14px;
          font-size: 13.5px;
          font-weight: 600;
          line-height: 1.2;
        }
        .pns-eco-chip::before {
          content: "";
          flex: 0 0 auto;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--pns-lime);
        }

        @media (max-width: 820px) {
          .pns-eco-comb { --w: clamp(84px, 27vw, 150px); }
          .pns-eco-body { grid-template-columns: 1fr; justify-items: center; }
          .pns-eco-panel { width: 100%; }
        }

        @media (prefers-color-scheme: dark) {
          .pns-eco {
            --pns-card: #14140f;
            --pns-line: rgba(255, 255, 255, 0.12);
            --pns-heading: #ffffff;
            --pns-shell: #0c0c0a;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pns-eco-cellwrap,
          .pns-eco-cell::before,
          .pns-eco-ic,
          .pns-eco-lb,
          .pns-eco-num { transition: none; }
          .pns-eco-cellwrap:has(.pns-eco-cell:hover),
          .pns-eco-cellwrap:focus-within { transform: none; }
        }
      `}</style>
    </section>
  );
}
