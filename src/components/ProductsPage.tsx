"use client";

import Link from "next/link";

const solutions = [
  {
    id: "ai-automation",
    number: "01",
    title: "AI Automation & Agentic AI",
    description:
      "Empowering enterprises with intelligent automation, cognitive workflows, and AI-driven decision-making to transform operational performance.",
    features: [
      "Workflow automation & RPA",
      "Agentic AI assistants",
      "Intelligent decision engines",
    ],
    icon: "/AI Automation & Agentic AI.svg",
  },
  {
    id: "intelligent-operations",
    number: "02",
    title: "Intelligent Operations (RPAs)",
    description:
      "Delivering technology-enabled managed operations that combine skilled professionals, standardized processes, and intelligent automation to deliver measurable business outcomes.",
    features: [
      "Managed operations delivery",
      "Process standardization",
      "Outcome-based SLAs",
    ],
    icon: "/Intelligent Operations (RPAs).svg",
  },
  {
    id: "data-engineering",
    number: "03",
    title: "Data Engineering",
    description:
      "Building robust data pipelines and infrastructure that turn scattered information into a single source of truth for confident decision-making.",
    features: [
      "Data pipeline architecture",
      "Cloud data warehousing",
      "Data quality & governance",
    ],
    icon: "/Data Engineering.svg",
  },
  {
    id: "analytics-bi",
    number: "04",
    title: "Analytics & BI",
    description:
      "Transforming raw data into actionable business intelligence through dashboards, reporting, and predictive analytics.",
    features: [
      "Real-time dashboards",
      "Predictive analytics",
      "Custom BI reporting",
    ],
    icon: "/Analytics & BI.svg",
  },
  {
    id: "shipping-logistics",
    number: "05",
    title: "Shipping & Logistics",
    description:
      "Specialized operational support for freight forwarding, customs documentation, and supply chain intelligence tailored to logistics providers.",
    features: [
      "Freight documentation automation",
      "Customs compliance support",
      "Supply chain visibility tools",
    ],
    icon: "/Shipping & Logistics.svg",
  },
  {
    id: "healthcare-operations",
    number: "06",
    title: "Healthcare Operations",
    description:
      "Claims management, clinical workflow automation, and document intelligence built for healthcare and life sciences organizations.",
    features: [
      "Claims processing automation",
      "Clinical documentation support",
      "Compliance-ready workflows",
    ],
    icon: "/Healthcare Operations.svg",
  },
];

export default function ProductsPage() {
  return (
    <>
      <style>{`
        /* ── Solutions card (reused from Solutions.tsx) ── */
        .prod-solutions-card {
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border: none;
          border-top: 4px solid #C6E84A;
          border-radius: 18px;
          overflow: hidden;
          text-decoration: none;
          cursor: pointer;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .prod-solutions-card:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.1);
          transform: translateY(-4px);
        }
        .prod-card-image {
          position: relative;
          height: 180px;
          background: #2E2E2C;
          border-radius: 18px 18px 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: background 0.25s ease;
        }
        .prod-solutions-card:hover .prod-card-image {
          background: #232322;
        }
        .prod-card-noise {
          position: absolute;
          inset: 0;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 128px 128px;
          pointer-events: none;
        }
        .prod-card-icon {
          position: relative;
          z-index: 1;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C6E84A;
          transition: color 0.25s ease, filter 0.25s ease;
        }
        .prod-card-icon img {
          width: 48px;
          height: 48px;
          object-fit: contain;
          filter: brightness(0) saturate(100%) invert(75%) sepia(50%) saturate(500%) hue-rotate(35deg) brightness(100%) contrast(90%);
          transition: filter 0.25s ease;
        }
        .prod-solutions-card:hover .prod-card-icon img {
          filter: brightness(0) saturate(100%) invert(75%) sepia(50%) saturate(500%) hue-rotate(35deg) brightness(100%) contrast(90%) drop-shadow(0 0 12px rgba(198, 232, 74, 0.5));
        }
        .prod-card-text {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
          position: relative;
        }
        .prod-card-title {
          font-size: 17px;
          font-weight: 700;
          color: #242424;
          line-height: 1.3;
          margin: 0 0 10px;
        }
        .prod-card-desc {
          font-size: 14px;
          font-weight: 400;
          color: #5A5D66;
          line-height: 1.6;
          margin: 0;
        }
        .prod-card-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          color: #242424;
          margin-top: auto;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .prod-solutions-card:hover .prod-card-arrow {
          background: #242424;
          color: #ffffff;
        }

        /* ── Grid ── */
        .prod-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 1023px) {
          .prod-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 639px) {
          .prod-grid { grid-template-columns: 1fr; }
        }

        /* ── Detail section ── */
        .prod-detail-row {
          display: flex;
          align-items: center;
          gap: 80px;
        }
        .prod-detail-row.reverse {
          flex-direction: row-reverse;
        }
        .prod-detail-text {
          flex: 1;
        }
        .prod-detail-visual {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .prod-placeholder-box {
          width: 100%;
          max-width: 420px;
          aspect-ratio: 4 / 3;
          background: linear-gradient(180deg, #EEF5D6 0%, #F8FAF0 100%);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          border: 1px dashed rgba(198,232,74,0.3);
        }
        .prod-placeholder-icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          background: rgba(198,232,74,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C6E84A;
        }
        .prod-placeholder-label {
          font-size: 12px;
          font-weight: 600;
          color: #8A8D96;
          text-align: center;
          padding: 0 20px;
          line-height: 1.5;
        }
        .prod-check-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 14px;
        }
        .prod-check-icon {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(198,232,74,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .prod-check-text {
          font-size: 15px;
          font-weight: 500;
          color: #242424;
          line-height: 1.5;
        }
        .prod-cta-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #C6E84A;
          color: #242424;
          padding: 14px 28px;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          margin-top: 28px;
        }
        .prod-cta-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(198,232,74,0.35);
        }
        @media (max-width: 768px) {
          .prod-detail-row,
          .prod-detail-row.reverse {
            flex-direction: column;
            gap: 40px;
          }
          .prod-hero-section {
            padding: 120px 20px 60px !important;
          }
          .prod-solutions-section {
            padding: 60px 20px !important;
          }
          .prod-detail-section {
            padding: 60px 20px !important;
          }
          .prod-cta-section {
            padding: 60px 20px !important;
          }
        }
        @media (max-width: 1024px) {
          .prod-cta-section {
            padding: 80px 40px !important;
          }
        }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        className="prod-hero-section"
        style={{
          width: "100%",
          background: "#ffffff",
          padding: "140px 80px 80px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <span className="eyebrow-badge" style={{ marginBottom: "18px" }}>
              Our solutions
            </span>

          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 700,
              color: "#242424",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            Intelligent <span style={{ color: "#C6E84A" }}>Solutions</span>. Meaningful Outcomes.
          </h1>

          <p
            style={{
              fontSize: "18px",
              fontWeight: 400,
              color: "#5A5D66",
              lineHeight: 1.7,
              maxWidth: "100%",
            }}
          >
            Every business faces unique operational challenges. Our portfolio of
            technology-enabled services helps organizations unlock efficiencies,
            drive outcomes, and accelerate digital transformation.
          </p>
        </div>
      </section>

      {/* ── SOLUTIONS GRID ────────────────────────────────── */}
      <section
        className="prod-solutions-section"
        style={{
          width: "100%",
          background: "#F5F6F0",
          padding: "80px 80px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="prod-grid">
            {solutions.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="prod-solutions-card"
                aria-label={item.title}
              >
                <div className="prod-card-image">
                  <div className="prod-card-noise" />
                  <div className="prod-card-icon">
                    <img src={item.icon} alt={item.title} width={48} height={48} />
                  </div>
                </div>
                <div className="prod-card-text">
                  <h3 className="prod-card-title">{item.title}</h3>
                  <p className="prod-card-desc">{item.description}</p>
                  <span className="prod-card-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPANDED DETAIL SECTIONS ──────────────────────── */}
      {solutions.map((item, index) => (
        <section
          key={item.id}
          id={item.id}
          className="prod-detail-section"
          style={{
            width: "100%",
            background: index % 2 === 0 ? "#ffffff" : "#F8F8F8",
            padding: "100px 80px",
          }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div className={`prod-detail-row ${index % 2 !== 0 ? "reverse" : ""}`}>
              {/* Text */}
              <div className="prod-detail-text">
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#C6E84A",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}
                >
                  Solution {item.number}
                </span>

                <h2
                  style={{
                    fontSize: "clamp(28px, 4vw, 38px)",
                    fontWeight: 700,
                    color: "#242424",
                    lineHeight: 1.2,
                    marginBottom: "20px",
                  }}
                >
                  {item.title}
                </h2>

                <p
                  style={{
                    fontSize: "17px",
                    fontWeight: 400,
                    color: "#5A5D66",
                    lineHeight: 1.7,
                    marginBottom: "32px",
                  }}
                >
                  {item.description}
                </p>

                <div style={{ marginBottom: "8px" }}>
                  {item.features.map((feature) => (
                    <div key={feature} className="prod-check-item">
                      <div className="prod-check-icon">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C6E84A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="prod-check-text">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/contact" className="prod-cta-link">
                  Schedule a Consultation
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>

              {/* Placeholder visual */}
              <div className="prod-detail-visual">
                <div className="prod-placeholder-box">
                  <div className="prod-placeholder-icon">
                    <img src={item.icon} alt={item.title} width={48} height={48} />
                  </div>
                  <div className="prod-placeholder-label">
                    PLACEHOLDER &mdash; replace with product screenshot/graphic for {item.title}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── CTA BAND ──────────────────────────────────────── */}
      <section
        className="prod-cta-section"
        style={{
          width: "100%",
          background: "#242424",
          padding: "100px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "400px",
            background: "radial-gradient(circle, rgba(198,232,74,0.12) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "750px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.3,
            }}
          >
            Not Sure Where to <span style={{ color: "#C6E84A" }}>Start</span>?
          </h2>
          <p
            style={{
              fontSize: "17px",
              fontWeight: 400,
              color: "#DCDECD",
              lineHeight: 1.7,
              marginTop: "20px",
            }}
          >
            Let&apos;s talk about which solution fits your operational challenges best.
          </p>
          <div style={{ marginTop: "40px" }}>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "#C6E84A",
                color: "#242424",
                padding: "16px 32px",
                borderRadius: "999px",
                fontSize: "16px",
                fontWeight: 700,
                textDecoration: "none",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              Schedule a Consultation
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
