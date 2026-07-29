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
      const rows = sectionRef.current.querySelectorAll(".philosophy-row-wrapper");
      rows.forEach((row) => observer.observe(row));
    }
    if (closingRef.current) {
      observer.observe(closingRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .philosophy-row-wrapper {
          opacity: 0;
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }

        /* Normal row (icon left, text right): icon from left, text from right */
        .philosophy-row-wrapper:not(.reverse) .philosophy-letter-block {
          opacity: 0;
          transform: translateX(-100px) scale(0.95);
          transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .philosophy-row-wrapper:not(.reverse) .philosophy-text-block {
          opacity: 0;
          transform: translateX(100px) scale(0.95);
          transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: 0.08s;
        }

        /* Reversed row (icon right, text left): icon from right, text from left */
        .philosophy-row-wrapper.reverse .philosophy-letter-block {
          opacity: 0;
          transform: translateX(100px) scale(0.95);
          transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .philosophy-row-wrapper.reverse .philosophy-text-block {
          opacity: 0;
          transform: translateX(-100px) scale(0.95);
          transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: 0.08s;
        }

        /* Step number */
        .philosophy-row-wrapper .philosophy-step {
          opacity: 0;
          transform: scale(0.5);
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: 0.15s;
        }

        /* Stagger: each row pair delays by 200ms increments */
        .philosophy-row-wrapper.in-view {
          opacity: 1;
        }
        .philosophy-row-wrapper.in-view .philosophy-letter-block,
        .philosophy-row-wrapper.in-view .philosophy-text-block {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
        .philosophy-row-wrapper.in-view .philosophy-step {
          opacity: 1;
          transform: scale(1);
        }

        .philosophy-row-wrapper[data-index="0"] { transition-delay: 0s; }
        .philosophy-row-wrapper[data-index="0"] .philosophy-letter-block { transition-delay: 0s; }
        .philosophy-row-wrapper[data-index="0"] .philosophy-text-block { transition-delay: 0.08s; }

        .philosophy-row-wrapper[data-index="1"] { transition-delay: 0.2s; }
        .philosophy-row-wrapper[data-index="1"] .philosophy-letter-block { transition-delay: 0.2s; }
        .philosophy-row-wrapper[data-index="1"] .philosophy-text-block { transition-delay: 0.28s; }

        .philosophy-row-wrapper[data-index="2"] { transition-delay: 0.4s; }
        .philosophy-row-wrapper[data-index="2"] .philosophy-letter-block { transition-delay: 0.4s; }
        .philosophy-row-wrapper[data-index="2"] .philosophy-text-block { transition-delay: 0.48s; }

        .philosophy-row-wrapper[data-index="3"] { transition-delay: 0.6s; }
        .philosophy-row-wrapper[data-index="3"] .philosophy-letter-block { transition-delay: 0.6s; }
        .philosophy-row-wrapper[data-index="3"] .philosophy-text-block { transition-delay: 0.68s; }

        .philosophy-row-wrapper[data-index="4"] { transition-delay: 0.8s; }
        .philosophy-row-wrapper[data-index="4"] .philosophy-letter-block { transition-delay: 0.8s; }
        .philosophy-row-wrapper[data-index="4"] .philosophy-text-block { transition-delay: 0.88s; }

        /* Closing statement animation */
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

        .philosophy-closing-box {
          background: #DDE8B5;
          border-radius: 28px;
          padding: 40px 48px;
          max-width: 900px;
          width: 100%;
          box-shadow: 0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04);
        }
        .philosophy-closing-text {
          font-size: 20px;
          font-weight: 500;
          color: #0f0f0f;
          line-height: 1.7;
          text-align: center;
        }

        /* Reduced motion: fade only */
        .fade-only .philosophy-letter-block,
        .fade-only .philosophy-text-block,
        .fade-only .philosophy-step,
        .fade-only.philosophy-closing-wrapper {
          transform: none !important;
        }

        .philosophy-row {
          display: flex;
          align-items: center;
          gap: 60px;
          padding: 50px 0;
          border-bottom: 1px solid #DCDECD;
        }
        .philosophy-row:last-child {
          border-bottom: none;
        }
        .philosophy-row.reverse {
          flex-direction: row-reverse;
        }
        .philosophy-letter-block {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .philosophy-letter-badge {
          width: 140px;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 24px;
          background: rgba(198, 232, 74, 0.1);
          border: 2px solid rgba(198, 232, 74, 0.2);
        }
        .philosophy-text-block {
          flex: 1;
        }
        .philosophy-step {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #C6E84A;
          color: #0f0f0f;
          font-size: 14px;
          font-weight: 700;
          flex-shrink: 0;
        }
        @media (max-width: 1024px) {
          .philosophy-section {
            padding: 80px 40px !important;
          }
          .philosophy-closing {
            padding: 60px 40px !important;
          }
          .philosophy-row {
            gap: 40px;
          }
        }
        @media (max-width: 768px) {
          .philosophy-row,
          .philosophy-row.reverse {
            flex-direction: column;
            gap: 24px;
            text-align: center;
          }
          .philosophy-letter-block {
            width: 100%;
          }
          .philosophy-text-block {
            width: 100%;
          }
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
          .philosophy-row-wrapper:not(.reverse) .philosophy-letter-block,
          .philosophy-row-wrapper.reverse .philosophy-letter-block {
            transform: translateY(-40px) scale(0.95);
          }
          .philosophy-row-wrapper:not(.reverse) .philosophy-text-block,
          .philosophy-row-wrapper.reverse .philosophy-text-block {
            transform: translateY(40px) scale(0.95);
          }
          .philosophy-row-wrapper.in-view:not(.reverse) .philosophy-letter-block,
          .philosophy-row-wrapper.in-view.reverse .philosophy-letter-block,
          .philosophy-row-wrapper.in-view:not(.reverse) .philosophy-text-block,
          .philosophy-row-wrapper.in-view.reverse .philosophy-text-block {
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      {/* ── Main Section ─────────────────────────────────────── */}
      <section
        ref={sectionRef}
        className="philosophy-section"
        style={{
          width: "100%",
          background: "#F8F8F8",
          padding: "100px 80px",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <span className="eyebrow-badge">
              Our philosophy
            </span>

            <h2
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 700,
                color: "#0f0f0f",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: "24px",
              }}
            >
              More than a name. <span style={{ color: "#C6E84A" }}>A philosophy.</span>
            </h2>

            <p
              style={{
                fontSize: "18px",
                fontWeight: 400,
                color: "#5A5D66",
                lineHeight: 1.7,
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              Every remarkable organization begins with a purpose. Sytrion is
              not simply a company name — it is a philosophy that defines how
              we think, innovate, and create value. Each element of our name
              represents the principles that shape our identity and our
              commitment to transforming businesses worldwide.
            </p>
          </div>

          {/* Rows */}
          {cards.map((card, index) => (
            <div
              key={card.letter}
              className={`philosophy-row-wrapper ${index % 2 !== 0 ? "reverse" : ""}`}
              data-index={index}
            >
              <div className={`philosophy-row ${index % 2 !== 0 ? "reverse" : ""}`}>
                {/* Letter Block */}
                <div className="philosophy-letter-block">
                  <div className="philosophy-letter-badge">
                    <span
                      style={{
                        fontSize: "64px",
                        fontWeight: 700,
                        color: "#C6E84A",
                        lineHeight: 1,
                      }}
                    >
                      {card.letter}
                    </span>
                  </div>
                </div>

                {/* Step Number */}
                <div className="philosophy-step">{index + 1}</div>

                {/* Text Block */}
                <div className="philosophy-text-block">
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
              color: "#0f0f0f",
              marginBottom: "12px",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#5A5D66",
                      lineHeight: 1.7,
                      maxWidth: "500px",
                    }}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
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
            padding: "60px 80px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="philosophy-closing-box">
            <p className="philosophy-closing-text">
              Together, these principles define Sytrion — a company built on
              Synergy, Systems, Transformation, Innovation, Operations, and Next
              Generation thinking, delivering intelligent solutions that empower
              businesses and enrich lives.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
