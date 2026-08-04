"use client";

import { useEffect, useRef } from "react";

const cards = [
  {
    letter: "SY",
    title: "Synergy · Systems",
    description:
      "True transformation begins when people, processes, and technology work together seamlessly. We build systems that create synergy across organizations, enabling greater collaboration, operational consistency, and sustainable growth.",
  },
  {
    letter: "TR",
    title: "Transformation",
    description:
      "Transformation is more than adopting technology, it's about reimagining how businesses operate. We help organizations modernize operations, simplify complexity, and unlock new possibilities through intelligent transformation.",
  },
  {
    letter: "I",
    title: "Innovation",
    description:
      "Innovation is the driving force behind progress. We continuously embrace emerging technologies, Artificial Intelligence, automation, and advanced analytics to solve business challenges with creativity and precision.",
  },
  {
    letter: "O",
    title: "Operations",
    description:
      "Operational excellence is where strategy becomes measurable success. Our intelligent operations framework enables organizations to improve efficiency, enhance customer experiences, and achieve operational resilience at scale.",
  },
  {
    letter: "N",
    title: "Next Generation",
    description:
      "Tomorrow belongs to organizations that innovate today. We build next-generation solutions designed to help businesses remain agile, competitive, and prepared for an ever-changing digital landscape.",
  },
];

export default function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const createObserver = (threshold: number) =>
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              if (prefersReduced) {
                el.classList.add("fade-only");
              }
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
        .phil-card-wrapper {
          opacity: 0;
          transform: translateY(40px) scale(0.97);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .phil-card-wrapper.in-view {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .phil-card-wrapper[data-index="0"] { transition-delay: 0s; }

        .philosophy-closing-wrapper {
          opacity: 0;
          transform: translateY(40px) scale(0.97);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .philosophy-closing-wrapper.in-view {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .fade-only .phil-unified-card {
          transform: none !important;
        }
        .fade-only.philosophy-closing-wrapper {
          transform: none !important;
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

        .phil-unified-card {
          background: #111827;
          border-radius: 32px;
          padding: 48px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.05);
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        .phil-cohesive-name-row {
          display: flex;
          gap: 20px;
        }

        .phil-name-segment {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #C6E84A;
          height: 120px;
          border-radius: 24px;
          box-shadow: 0 8px 24px rgba(198, 232, 74, 0.15);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .phil-name-segment:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(198, 232, 74, 0.25);
        }

        .phil-segment-letter {
          font-size: 42px;
          font-weight: 800;
          color: #0f0f0f;
          line-height: 1;
          letter-spacing: 2px;
        }

        .phil-definitions-row {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 32px;
        }

        .phil-definition-item {
          display: flex;
          flex-direction: column;
        }
        .phil-card-title {
          font-size: 22px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: #F9FAFB;
          margin-bottom: 16px;
          line-height: 1.3;
        }
        
        .phil-card-desc {
          font-size: 16px;
          font-weight: 400;
          color: #9CA3AF;
          line-height: 1.7;
          text-align: left;
        }

        @media (max-width: 1024px) {
          .philosophy-section {
            padding: 80px 40px !important;
          }
          .philosophy-closing {
            padding: 60px 40px !important;
          }
          .phil-definitions-row {
            grid-template-columns: repeat(3, 1fr);
          }
          .phil-name-segment {
            height: 100px;
          }
          .phil-segment-letter {
            font-size: 32px;
          }
        }
        @media (max-width: 768px) {
          .philosophy-section {
            padding: 60px 20px !important;
          }
          .philosophy-closing {
            padding: 40px 20px !important;
          }
          .philosophy-closing-box {
            padding: 32px 24px;
          }
          .philosophy-closing-text {
            font-size: 17px;
          }
          .phil-definitions-row {
            grid-template-columns: 1fr;
          }
          .phil-unified-card {
            padding: 32px 24px;
            gap: 32px;
          }
          .phil-cohesive-name-row {
            flex-direction: column;
            gap: 16px;
          }
          .phil-name-segment {
            height: 80px;
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
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span className="eyebrow-badge">
              Our philosophy
            </span>

            <h2
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: "24px",
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
                margin: "0 auto",
                textAlign: "justify",
                textAlignLast: "center",
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
            <div className="phil-unified-card">

              {/* Cohesive Brand Name Row */}
              <div className="phil-cohesive-name-row">
                {cards.map((card) => (
                  <div key={card.letter} className="phil-name-segment">
                    <div className="phil-segment-letter">
                      {card.letter}
                    </div>
                  </div>
                ))}
              </div>

              {/* Definitions Row */}
              <div className="phil-definitions-row">
                {cards.map((card, index) => (
                  <div key={card.letter} className="phil-definition-item">
                    <h3 className="phil-card-title">{card.title}</h3>
                    <p className="phil-card-desc">{card.description}</p>
                  </div>
                ))}
              </div>

            </div>
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
            padding: "80px 80px",
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

