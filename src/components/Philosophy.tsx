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

        .philosophy-closing-box {
          background: #111827;
          border-radius: 28px;
          padding: 48px 56px;
          width: 100%;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2);
          border: 1px solid rgba(198, 232, 74, 0.15);
        }
        .philosophy-closing-text {
          font-size: 21px;
          font-weight: 500;
          color: #E5E7EB;
          line-height: 1.7;
          text-align: center;
        }

        .phil-unified-wrapper {
          width: 100%;
        }

        @media (max-width: 1024px) {
          .philosophy-section {
            padding: 80px 40px !important;
          }
          .philosophy-closing {
            padding: 0 40px 40px !important;
          }
        }
        @media (max-width: 768px) {
          .philosophy-section {
            padding: 60px 20px !important;
          }
          .philosophy-closing {
            padding: 0 20px 20px !important;
          }
          .philosophy-closing-box {
            padding: 32px 24px;
          }
          .philosophy-closing-text {
            font-size: 17px;
          }
        }
        
        /* ── Dynamic Closing Statement Animations ── */
        @keyframes philGlowFloat1 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 20px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes philGlowFloat2 {
          0% { transform: translate(0, 0) scale(1.1); }
          50% { transform: translate(30px, -20px) scale(1); }
          100% { transform: translate(0, 0) scale(1.1); }
        }
        @keyframes philShimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .phil-closing-orb-1 {
          position: absolute;
          top: -20px;
          left: -20px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(198, 232, 74, 0.15), transparent 70%);
          filter: blur(40px);
          animation: philGlowFloat1 15s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }
        .phil-closing-orb-2 {
          position: absolute;
          bottom: -40px;
          right: -40px;
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(66, 153, 225, 0.15), transparent 70%);
          filter: blur(40px);
          animation: philGlowFloat2 18s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
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
        .phil-closing-divider {
          width: 60px;
          height: 3px;
          margin: 32px auto 0;
          background: linear-gradient(90deg, #C6E84A, #4299E1);
          border-radius: 2px;
          opacity: 0.8;
          animation: philShimmer 6s linear infinite;
          background-size: 200% auto;
        }
        .philosophy-closing-box {
          position: relative;
          overflow: hidden;
        }
        .philosophy-closing-content {
          position: relative;
          z-index: 1;
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
        </div>
      </section>

      {/* ── Closing Statement ────────────────────────────────── */}
      <div
        ref={closingRef}
        className="philosophy-closing-wrapper"
      >
        <section
          className="philosophy-closing"
          style={{
            width: "100%",
            padding: "0 80px 80px",
            display: "flex",
            justifyContent: "center",
            background: "#030712",
          }}
        >
          <div className="philosophy-closing-box" style={{ maxWidth: "1000px" }}>
            <div className="phil-closing-orb-1" />
            <div className="phil-closing-orb-2" />
            
            <div className="philosophy-closing-content">
              <p className="philosophy-closing-text" style={{ textAlign: "center", color: "#D1D5DB" }}>
                Together, these principles define <span className="phil-shimmer-text">Sytrion</span> — a company built on{" "}
                <strong className="phil-keyword">Synergy</strong>,{" "}
                <strong className="phil-keyword">Systems</strong>,{" "}
                <strong className="phil-keyword">Transformation</strong>,{" "}
                <strong className="phil-keyword">Innovation</strong>,{" "}
                <strong className="phil-keyword">Operations</strong>, and{" "}
                <strong className="phil-keyword">Next Generation</strong> thinking, delivering intelligent solutions that empower
                businesses and enrich lives.
              </p>
              <div className="phil-closing-divider" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

