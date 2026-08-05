"use client";

const ACCENT = "#c6ff3d";
const NAVY = "#0e1b3d";

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="ws-badge">{children}</span>;
}

function Title({ children }: { children: React.ReactNode }) {
  return <h3 className="ws-title">{children}</h3>;
}

export default function WhySytrion() {
  return (
    <>
      <style>{`
        .ws-section {
          width: 100%;
          background: #0b1220;
          padding: 100px 80px;
        }
        .ws-wrap {
          max-width: 1400px;
          margin: 0 auto;
        }

        /* ── Header ─────────────────────────────────────── */
        .ws-header {
          margin-bottom: 60px;
        }
        .ws-pill {
          display: inline-block;
          border: 1.5px solid ${ACCENT};
          color: ${ACCENT};
          padding: 8px 22px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          margin-bottom: 18px;
        }
        .ws-headline {
          font-size: clamp(36px, 5vw, 52px);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          margin-bottom: 16px;
        }
        .ws-sub {
          font-size: 19px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.7;
          max-width: 100%;
        }

        /* ── Rows & cards ───────────────────────────────── */
        .ws-row {
          display: flex;
          gap: 24px;
          margin-bottom: 24px;
        }
        .ws-card {
          background: #f4f5f7;
          border-radius: 16px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25), 0 16px 40px rgba(0, 0, 0, 0.3);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .ws-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3), 0 24px 60px rgba(0, 0, 0, 0.35);
        }
        .ws-wide {
          flex: 1.4;
        }
        .ws-narrow {
          flex: 1;
        }

        /* Split card — side image */
        .ws-split {
          flex-direction: row;
        }
        .ws-vcenter .ws-content {
          justify-content: center;
        }
        .ws-img-side {
          flex: 0 0 30%;
        }
        .ws-split.ws-img-26 .ws-img-side {
          flex-basis: 26%;
        }
        .ws-img-side img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Image-top card */
        .ws-img-top {
          width: 100%;
          height: 230px;
          object-fit: cover;
          display: block;
        }

        /* Card content */
        .ws-content {
          padding: 28px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .ws-content .ws-badge {
          margin-bottom: 14px;
        }
        .ws-content .ws-title {
          margin-bottom: 12px;
        }

        /* Shared primitives */
        .ws-badge {
          align-self: flex-start;
          display: inline-block;
          background: ${NAVY};
          color: #ffffff;
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.3px;
        }
        .ws-title {
          font-size: 24px;
          font-weight: 700;
          color: ${NAVY};
          line-height: 1.3;
        }
        .ws-desc {
          font-size: 16px;
          font-weight: 400;
          color: #5a6478;
          line-height: 1.6;
        }

        /* ── Row 3 — full-width split card ──────────────── */
        .ws-row3 {
          flex-direction: row;
          margin-bottom: 0;
        }
        .ws-half {
          flex: 1;
          display: flex;
        }
        .ws-half-right {
          border-left: 1px solid rgba(14, 27, 61, 0.14);
          padding: 32px 36px;
          flex-direction: column;
        }
        .ws-half-left {
          padding: 0;
          flex-direction: row;
          overflow: hidden;
        }
        .ws-half-img {
          flex: 0 0 40%;
          overflow: hidden;
        }
        .ws-half-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .ws-half-body {
          flex: 1;
          padding: 32px 36px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .ws-half .ws-badge {
          margin-bottom: 14px;
        }
        .ws-half .ws-title {
          margin-bottom: 12px;
        }

        /* ── Responsive ─────────────────────────────────── */
        @media (max-width: 820px) {
          .ws-section {
            padding: 60px 20px;
          }
          .ws-row {
            flex-direction: column;
            margin-bottom: 20px;
          }
          .ws-wide,
          .ws-narrow {
            flex: 1 1 auto;
          }
          .ws-split {
            flex-direction: column;
          }
          .ws-split.ws-img-26 .ws-img-side {
            flex-basis: auto;
          }
          .ws-img-side {
            flex: none;
            width: 100%;
          }
          .ws-img-side img {
            height: 230px;
            width: 100%;
          }
          .ws-row3 {
            flex-direction: column;
          }
          .ws-half-left {
            flex-direction: column;
          }
          .ws-half-img {
            flex: none;
            width: 100%;
            height: 220px;
          }
          .ws-half-right {
            border-left: none;
            border-top: 1px solid rgba(14, 27, 61, 0.14);
          }
        }
      `}</style>

      <section className="ws-section">
        <div className="ws-wrap">
          {/* Header */}
          <div className="ws-header">
            <span className="ws-pill">Why Sytrion</span>

            <h2 className="ws-headline">
              A Trusted Partner for <span style={{ color: ACCENT }}>Intelligent Transformation</span>
            </h2>

            <p className="ws-sub">
              Organizations choose Sytrion because we combine technological
              innovation with operational expertise to deliver meaningful
              business outcomes.
            </p>
          </div>

          {/* Row 1 — AI-First Thinking (wide) + Business Transformation (narrow) */}
          <div className="ws-row">
            <div className="ws-card ws-wide ws-split ws-vcenter">
              <div className="ws-img-side">
                <img src="/ai first thinking.jpg" alt="AI-First Thinking" />
              </div>
              <div className="ws-content">
                <Badge>AI &middot; Innovation</Badge>
                <Title>AI-First Thinking</Title>
                <p className="ws-desc">
                  Embedding intelligence into every process to improve
                  efficiency and accelerate innovation.
                </p>
              </div>
            </div>

            <div className="ws-card ws-narrow">
              <img className="ws-img-top" src="/business transformation.jpg" alt="Business Transformation" />
              <div className="ws-content">
                <Badge>Transformation &middot; Operations</Badge>
                <Title>Business Transformation</Title>
              </div>
            </div>
          </div>

          {/* Row 2 — Scalable Delivery (narrow) + Enterprise Security (wide) */}
          <div className="ws-row">
            <div className="ws-card ws-narrow">
              <img className="ws-img-top" src="/scalable delivery.jpg" alt="Scalable Delivery" />
              <div className="ws-content">
                <Badge>Scalable &middot; Flexible</Badge>
                <Title>Scalable Delivery</Title>
              </div>
            </div>

            <div className="ws-card ws-wide ws-split ws-img-26 ws-vcenter">
              <div className="ws-img-side">
                <img src="/enterprise  secuirty.jpg" alt="Enterprise Security" />
              </div>
              <div className="ws-content">
                <Badge>Security &middot; Governance</Badge>
                <Title>Enterprise Security</Title>
                <p className="ws-desc">
                  Protecting critical business information with secure
                  infrastructure, governance frameworks, and
                  confidentiality-first practices.
                </p>
              </div>
            </div>
          </div>

          {/* Row 3 — Customer Partnership + Security by Design */}
          <div className="ws-card ws-row3">
            <div className="ws-half ws-half-left">
              <div className="ws-half-img">
                <img src="/customer partnership.jpg" alt="Customer Partnership" />
              </div>
              <div className="ws-half-body">
                <Badge>Partnership &middot; Trust</Badge>
                <Title>Customer Partnership</Title>
                <p className="ws-desc">
                  Building long-term relationships founded on trust,
                  transparency, and shared success.
                </p>
              </div>
            </div>

            <div className="ws-half ws-half-right">
              <Badge>Trust by Default</Badge>
              <Title>Security by Design, Trust by Default</Title>
              <p className="ws-desc">
                Secure infrastructure, role-based access controls,
                confidentiality-first practices, business continuity planning,
                audit-ready processes, and compliance-oriented operations —
                ensuring your business information stays protected throughout
                every engagement.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
