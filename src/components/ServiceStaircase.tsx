"use client";

import StaircaseFlow, { type StaircaseVariant } from "./StaircaseFlow";

/* ─────────────────────────────────────────────────────────────
   INTELLIGENT SERVICE DELIVERY — DPI page copy of the shared
   rising staircase. See StaircaseFlow.tsx for the design.
   ───────────────────────────────────────────────────────────── */

const STEPS = [
  { name: "Discover", desc: "Find the right service" },
  { name: "Identify", desc: "Establish trusted identity" },
  { name: "Apply", desc: "Submit information digitally" },
  { name: "Validate", desc: "Verify data and documents" },
  { name: "Process", desc: "Orchestrate workflows" },
  { name: "Deliver", desc: "Complete the service" },
  { name: "Inform", desc: "Provide status and communication" },
];

export type { StaircaseVariant };

export default function ServiceStaircase({ variant = "white" }: { variant?: StaircaseVariant }) {
  return (
    <StaircaseFlow
      ariaLabel="Intelligent Service Delivery"
      eyebrow="INTELLIGENT SERVICE DELIVERY"
      title={
        <>
          Make every interaction <span className="stf-h2-accent">easier to navigate.</span>
        </>
      }
      steps={STEPS}
      variant={variant}
      revealClass="dpi-reveal"
    />
  );
}
