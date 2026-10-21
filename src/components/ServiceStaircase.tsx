"use client";

import { Bell, FileText, Fingerprint, PackageCheck, Search, ShieldCheck, Workflow } from "lucide-react";
import ProgressTracker from "./ProgressTracker";

/* ─────────────────────────────────────────────────────────────
   INTELLIGENT SERVICE DELIVERY — DPI page progress tracker.
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

const SERVICE_ICONS = [Search, Fingerprint, FileText, ShieldCheck, Workflow, PackageCheck, Bell];

export default function ServiceStaircase() {
  return (
    <ProgressTracker
      ariaLabel="Intelligent Service Delivery"
      eyebrow="INTELLIGENT SERVICE DELIVERY"
      title={
        <>
          Make every interaction <span className="stf-h2-accent">easier to navigate.</span>
        </>
      }
      steps={STEPS}
      icons={SERVICE_ICONS}
      revealClass="dpi-reveal"
    />
  );
}
