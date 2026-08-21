const ACCENT = "#C6E84A";
const NAVY = "#0e1b3d";

const securityItems = [
  "Secure Infrastructure",
  "Role Based Access Controls",
  "Confidentiality First",
  "Business Continuity Planning",
  "Audit-Ready Processes",
  "Compliance-Oriented Operations",
];

function Card({
  image,
  title,
  alt,
  span,
  description,
}: {
  image: string;
  title: string;
  alt: string;
  span: string;
  description: string;
}) {
  return (
    <div className={`ws-card ws-span-${span}`}>
      <img className="ws-img-top" src={image} alt={alt} loading="lazy" decoding="async" />
      <div className="ws-content">
        <h3 className="ws-title">{title}</h3>
        <p className="ws-desc">{description}</p>
      </div>
    </div>
  );
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
          text-align: left;
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
          text-transform: uppercase;
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
          margin: 0;
        }

        /* ── Card grid ──────────────────────────────────── */
        .ws-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
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
        .ws-span-7 {
          grid-column: span 7;
        }
        .ws-span-5 {
          grid-column: span 5;
        }
        .ws-span-4 {
          grid-column: span 4;
        }

        .ws-img-top {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .ws-card:hover .ws-img-top {
          transform: scale(1.08);
        }
        .ws-content {
          padding: 28px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .ws-title {
          font-size: 24px;
          font-weight: 700;
          color: ${NAVY};
          line-height: 1.3;
          margin-bottom: 12px;
        }
        .ws-desc {
          font-size: 16px;
          font-weight: 400;
          color: #5a6478;
          line-height: 1.6;
        }

        /* ── Security callout ───────────────────────────── */
        .ws-security {
          background: #f0f0f0;
          border-radius: 20px;
          padding: 40px 40px 36px;
        }
        .ws-security-row1 {
          display: flex;
          gap: 60px;
          align-items: center;
        }
        .ws-security-text {
          flex: 1;
        }
        .ws-security-title {
          font-size: 26px;
          font-weight: 700;
          color: ${NAVY};
          line-height: 1.3;
          margin-bottom: 18px;
        }
        .ws-security-para {
          font-size: 16px;
          font-weight: 400;
          color: #5a5d66;
          line-height: 1.7;
          max-width: 480px;
        }
        .ws-security-img {
          flex: 1;
          border-radius: 16px;
          overflow: hidden;
          min-height: 220px;
        }
        .ws-security-img img {
          width: 100%;
          height: 260px;
          object-fit: cover;
          border-radius: 16px;
          display: block;
          transition: transform 0.4s ease;
        }
        .ws-security-img:hover img {
          transform: scale(1.08);
        }
        .ws-security-label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #4d7c0f;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 44px 0 20px;
        }
        .ws-security-check {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0 24px;
        }
        .ws-security-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          min-height: 44px;
        }
        .ws-security-item svg {
          flex-shrink: 0;
          margin-top: 2px;
        }
        .ws-security-item span {
          font-size: 15px;
          font-weight: 500;
          color: #0f0f0f;
          line-height: 1.5;
        }

        /* ── Responsive ─────────────────────────────────── */
        @media (max-width: 1024px) {
          .ws-section {
            padding: 60px 40px;
          }
          .ws-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .ws-grid > .ws-card {
            grid-column: span 1;
          }
        }
        @media (max-width: 768px) {
          .ws-section {
            padding: 60px 20px;
          }
          .ws-grid {
            grid-template-columns: 1fr;
          }
          .ws-security {
            padding: 30px;
          }
          .ws-security-row1 {
            flex-direction: column;
            gap: 32px;
          }
          .ws-security-check {
            grid-template-columns: 1fr;
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

          {/* Row 1 — AI-First Thinking (wider) + Business Transformation */}
          <div className="ws-grid">
            <Card
              image="/shared/ai first thinking.jpg"
              alt="AI-First Thinking"
              title="AI-First Thinking"
              span="7"
              description="Embedding intelligence into every process to improve efficiency and accelerate innovation."
            />
            <Card
              image="/home/business transformation.jpg"
              alt="Business Transformation"
              title="Business Transformation"
              span="5"
              description="Helping organizations modernize operations through scalable, measurable transformation initiatives."
            />
          </div>

          {/* Row 2 — Enterprise Security + Scalable Delivery + Customer Partnership */}
          <div className="ws-grid">
            <Card
              image="/home/enterprise  secuirty.jpg"
              alt="Enterprise Security"
              title="Enterprise Security"
              span="4"
              description="Protecting critical business information with secure infrastructure, governance frameworks, and confidentiality-first practices."
            />
            <Card
              image="/home/scalable delivery.jpg"
              alt="Scalable Delivery"
              title="Scalable Delivery"
              span="4"
              description="Flexible engagement models that grow alongside your business."
            />
            <Card
              image="/home/customer partnership.jpg"
              alt="Customer Partnership"
              title="Customer Partnership"
              span="4"
              description="Building long-term relationships founded on trust, transparency, and shared success."
            />
          </div>

          {/* Security by Design. Trust by Commitment. */}
          <div className="ws-security">
            <div className="ws-security-row1">
              <div className="ws-security-text">
                <h3 className="ws-security-title">
                  Security by Design. Trust by Commitment.
                </h3>
                <p className="ws-security-para">
                  Protecting client information is fundamental to everything we
                  do. Our delivery framework incorporates secure infrastructure,
                  role-based access controls, confidentiality agreements,
                  governance policies, and compliance-focused operational
                  practices to ensure your business information remains protected
                  throughout every engagement.
                </p>
              </div>

              <div className="ws-security-img">
                <img
                  src="/home/Security by Design. Trust by Commitment..jpg"
                  alt="Security by Design"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <span className="ws-security-label">Commitment Highlights</span>
            <div className="ws-security-check">
              {securityItems.map((item) => (
                <div key={item} className="ws-security-item">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4D7C0F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
