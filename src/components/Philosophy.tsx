"use client";

import { useEffect, useRef } from "react";
import PhilosophyCards from "./PhilosophyCards";

export default function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createObserver = (threshold: number) =>
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              el.classList.add("in-view");
              observer.unobserve(el);
            }
          });
        },
        { threshold }
      );

    const observer = createObserver(0.2);

    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll(".phil-card-wrapper");
      cards.forEach((card) => observer.observe(card));
    }
    if (closingRef.current) {
      observer.observe(closingRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .phil-card-wrapper,
        .philosophy-closing-wrapper {
          opacity: 1;
          transform: none;
        }
        .phil-card-wrapper.in-view,
        .philosophy-closing-wrapper.in-view {
          animation: philEntrance 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes philEntrance {
          from { opacity: 0; transform: translateY(40px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .phil-card-wrapper[data-index="0"].in-view { animation-delay: 0s; }
        @media (prefers-reduced-motion: reduce) {
          .phil-card-wrapper.in-view,
          .philosophy-closing-wrapper.in-view {
            animation: none;
          }
        }

        .philosophy-closing-text {
          font-size: 21px;
          font-weight: 500;
          color: #E5E7EB;
          line-height: 1.7;
          text-align: center;
          max-width: 1400px;
          margin: 0 auto;
        }

        .phil-unified-wrapper {
          width: 100%;
        }

        @media (max-width: 1024px) {
          .philosophy-section {
            padding: 80px 40px !important;
          }
        }
        @media (max-width: 768px) {
          .philosophy-section {
            padding: 60px 20px !important;
          }
          .philosophy-closing-text {
            font-size: 17px;
          }
        }
        
        /* ── Dynamic Closing Statement Animations ── */
        @keyframes philShimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .phil-shimmer-text {
          background: linear-gradient(90deg, #C6E84A 0%, #4299E1 25%, #C6E84A 50%, #4299E1 75%, #C6E84A 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: philShimmer 8s linear infinite;
          font-weight: 700;
        }
        .phil-keyword {
          color: #C6E84A;
          font-weight: 700;
        }
      `}</style>

      {/* ── Main Section ─────────────────────────────────────── */}
      <section
        ref={sectionRef}
        className="philosophy-section"
        style={{
          width: "100%",
          background: "#030712",
          padding: "100px 80px",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: "64px" }}>
            <span className="eyebrow-badge" style={{ marginBottom: "18px" }}>
              Our philosophy
            </span>

            <h2
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: "16px",
              }}
            >
              More than a name. <span style={{ color: "#C6E84A" }}>A philosophy.</span>
            </h2>

            <p
              style={{
                fontSize: "19px",
                fontWeight: 400,
                color: "#9CA3AF",
                lineHeight: 1.8,
                maxWidth: "100%",
              }}
            >
              Every remarkable organization begins with a purpose. Sytrion is
              not simply a company name — it is a philosophy that defines how
              we think, innovate, and create value. Each element of our name
              represents the principles that shape our identity and our
              commitment to transforming businesses worldwide.
            </p>
          </div>

          {/* Unified Cards Grid */}
          <div className="phil-unified-wrapper phil-card-wrapper" data-index="0">
            <PhilosophyCards />
          </div>

          {/* ── Closing Statement ────────────────────────────────── */}
          <div
            ref={closingRef}
            className="philosophy-closing-wrapper"
            style={{ marginTop: "48px" }}
          >
            <p className="philosophy-closing-text" style={{ color: "#D1D5DB" }}>
              Together, these principles define <span className="phil-shimmer-text">Sytrion</span> — a company built on{" "}
              <strong className="phil-keyword">Synergy</strong>,{" "}
              <strong className="phil-keyword">Systems</strong>,{" "}
              <strong className="phil-keyword">Transformation</strong>,{" "}
              <strong className="phil-keyword">Innovation</strong>,{" "}
              <strong className="phil-keyword">Operations</strong>, and{" "}
              <strong className="phil-keyword">Next Generation</strong> thinking, delivering intelligent solutions that empower
              businesses and enrich lives.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

