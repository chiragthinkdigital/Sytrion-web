"use client";

const bentoCards = [
  {
    id: 1,
    span: 7,
    featured: false,
    title: "AI-First Thinking",
    tags: ["AI", "INNOVATION"],
    description:
      "Embedding intelligence into every process to improve efficiency and accelerate innovation.",
    image: "/ai first thinking.jpg",
  },
  {
    id: 2,
    span: 5,
    featured: false,
    title: "Business Transformation",
    tags: ["TRANSFORMATION", "OPERATIONS"],
    description:
      "Helping organizations modernize operations through scalable, measurable transformation initiatives.",
    image: "/business transformation.jpg",
  },
  {
    id: 3,
    span: 4,
    featured: false,
    title: "Enterprise Security",
    tags: ["SECURITY", "GOVERNANCE"],
    description:
      "Protecting critical business information with secure infrastructure, governance frameworks, and confidentiality-first practices.",
    image: "/enterprise  secuirty.jpg",
  },
  {
    id: 4,
    span: 4,
    featured: false,
    title: "Scalable Delivery",
    tags: ["SCALABLE", "FLEXIBLE"],
    description:
      "Flexible engagement models that grow alongside your business.",
    image: "/scalable delivery.jpg",
  },
  {
    id: 5,
    span: 4,
    featured: false,
    title: "Customer Partnership",
    tags: ["PARTNERSHIP", "TRUST"],
    description:
      "Building long-term relationships founded on trust, transparency, collaboration, and shared success.",
    image: "/customer partnership.jpg",
  },
];

const securityItems = [
  "Secure Infrastructure",
  "Role Based Access Controls",
  "Confidentiality First",
  "Business Continuity Planning",
  "Audit-Ready Processes",
  "Compliance-Oriented Operations",
];

export default function WhySytrion() {
  return (
    <>
      <style>{`
        .bento-card:hover .bento-title {
          color: #C6E84A !important;
        }
        @media (max-width: 1024px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .bento-grid > div {
            grid-column: span 1 !important;
          }
          .security-row1 {
            flex-direction: column !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 768px) {
          .bento-grid {
            grid-template-columns: 1fr !important;
          }
          .why-section {
            padding: 60px 20px !important;
          }
          .security-callout {
            padding: 30px !important;
          }
          .security-checklist {
            grid-template-columns: 1fr !important;
          }
          .security-row1 {
            flex-direction: column !important;
            gap: 32px !important;
          }
        }
      `}</style>

      <section
        className="why-section"
        style={{
          width: "100%",
          background: "#242424",
          padding: "100px 80px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <span className="eyebrow-badge">
              Why Sytrion
            </span>

            <h2
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: 1.2,
                marginBottom: "24px",
              }}
            >
              A Trusted Partner for <span style={{ color: "#C6E84A" }}>Intelligent Transformation</span>
            </h2>

            <p
              style={{
                fontSize: "18px",
                fontWeight: 400,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.7,
                maxWidth: "700px",
                margin: "0 auto",
              }}
            >
              Organizations choose Sytrion because we combine technological
              innovation with operational expertise to deliver meaningful
              business outcomes.
            </p>
          </div>

          {/* Bento Grid */}
          <div
            className="bento-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "24px" }}
          >
            {bentoCards.map((card) => (
              <div
                key={card.id}
                style={{
                  gridColumn: `span ${card.span}`,
                  background: "#FFFFFF",
                  border: "none",
                  borderRadius: "24px",
                  padding: "32px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 40px rgba(0,0,0,0.08)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.06), 0 16px 56px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04), 0 8px 40px rgba(0,0,0,0.08)";
                }}
              >
                <div style={{ position: "relative", margin: "-32px -32px 20px -32px" }}>
                  <img
                    src={card.image}
                    alt={card.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "18px",
                    }}
                  />
                  <div style={{ position: "absolute", bottom: "12px", left: "12px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          display: "inline-block",
                          padding: "4px 12px",
                          borderRadius: "999px",
                          background: "rgba(255,255,255,0.9)",
                          backdropFilter: "blur(4px)",
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.8px",
                          textTransform: "uppercase",
                          color: "#242424",
                          lineHeight: 1,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h3
                  className="bento-title"
                  style={{
                    fontSize: card.featured ? "24px" : "19px",
                    fontWeight: 700,
                    color: "#0f0f0f",
                    marginTop: "16px",
                    marginBottom: "0px",
                  }}
                >
                  {card.title}
                </h3>
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    background: "#E0E0E0",
                    border: "none",
                    margin: "16px 0",
                  }}
                />
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: 400,
                    color: "#5A5D66",
                    lineHeight: 1.6,
                    marginTop: "0px",
                  }}
                >
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Security Callout */}
          <div
            className="security-callout"
            style={{
              marginTop: "60px",
              background: "#F0F0F0",
              borderRadius: "20px",
              padding: "50px 50px 42px 50px",
            }}
          >
            {/* Row 1 — Heading + Image */}
            <div className="security-row1" style={{ display: "flex", gap: "60px", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "#0f0f0f",
                    lineHeight: 1.3,
                    marginBottom: "20px",
                  }}
                >
                  Security by Design. Trust by Commitment.
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#5A5D66",
                    lineHeight: 1.7,
                    maxWidth: "480px",
                  }}
                >
                  Protecting client information is fundamental to everything we
                  do. Our delivery framework incorporates secure infrastructure,
                  role-based access controls, confidentiality agreements,
                  governance policies, and compliance-focused operational
                  practices to ensure your business information remains protected
                  throughout every engagement.
                </p>
              </div>

              <div
                style={{
                  flex: 1,
                  borderRadius: "16px",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "220px",
                }}
              >
                <img
                  src="/Security by Design. Trust by Commitment..jpg"
                  alt="Security by Design"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "16px",
                  }}
                />
              </div>
            </div>

            {/* Row 2 — Commitment Highlights (full width) */}
            <div style={{ marginTop: "44px" }}>
              <span
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#C6E84A",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "20px",
                }}
              >
                Commitment Highlights
              </span>
              <div
                className="security-checklist"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "0 24px",
                }}
              >
                {securityItems.map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      marginBottom: "4px",
                      minHeight: "44px",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#C6E84A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ flexShrink: 0, marginTop: "2px" }}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: 500,
                        color: "#0f0f0f",
                        lineHeight: 1.5,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
