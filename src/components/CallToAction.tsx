"use client";

export default function CallToAction() {
  return (
    <>
      <style>{`
        .cta-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 400px;
          background: radial-gradient(circle, rgba(198,232,74,0.12) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .cta-primary {
          position: relative;
          overflow: hidden;
          background: #C6E84A;
          color: #0f0f0f;
          border: none;
          padding: 16px 32px;
          border-radius: 9999px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .cta-primary::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 60%;
          background: linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 100%);
          pointer-events: none;
          border-radius: inherit;
          transition: opacity 0.3s ease;
        }
        .cta-primary::after {
          content: '';
          position: absolute;
          top: 0; left: -100%; right: 0;
          width: 60%;
          height: 100%;
          background: linear-gradient(100deg, transparent 0%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.25) 55%, transparent 100%);
          pointer-events: none;
          border-radius: inherit;
          transition: left 0.6s ease;
        }
        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(198,232,74,0.35);
        }
        .cta-primary:hover::before {
          opacity: 1.2;
        }
        .cta-primary:hover::after {
          left: 120%;
        }
        .cta-primary:active {
          transform: translateY(0) scale(0.98);
        }

        .cta-secondary {
          position: relative;
          overflow: hidden;
          background: transparent;
          color: #FFFFFF;
          border: 1.5px solid #FFFFFF;
          padding: 16px 32px;
          border-radius: 9999px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .cta-secondary::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 60%;
          background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 100%);
          pointer-events: none;
          border-radius: inherit;
          transition: opacity 0.3s ease;
        }
        .cta-secondary::after {
          content: '';
          position: absolute;
          top: 0; left: -100%; right: 0;
          width: 60%;
          height: 100%;
          background: linear-gradient(100deg, transparent 0%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.15) 55%, transparent 100%);
          pointer-events: none;
          border-radius: inherit;
          transition: left 0.6s ease;
        }
        .cta-secondary:hover {
          background: #FFFFFF;
          color: #0f0f0f;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255,255,255,0.15);
        }
        .cta-secondary:hover::before {
          background: linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 100%);
        }
        .cta-secondary:hover::after {
          left: 120%;
        }
        .cta-secondary:active {
          transform: translateY(0) scale(0.98);
        }
        @media (max-width: 1024px) {
          .cta-section {
            padding: 80px 40px !important;
          }
        }
        @media (max-width: 768px) {
          .cta-section {
            padding: 60px 20px !important;
          }
          .cta-heading {
            font-size: 28px !important;
          }
          .cta-buttons {
            flex-direction: column !important;
            align-items: center !important;
          }
          .cta-primary,
          .cta-secondary {
            width: 100%;
            max-width: 320px;
          }
        }
      `}</style>

      <section
        className="cta-section"
        style={{
          width: "100%",
          background: "#0f0f0f",
          padding: "100px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="cta-glow" />

        <div
          style={{
            maxWidth: "750px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <span className="eyebrow-badge">
            Get started
          </span>

          <h2
            className="cta-heading"
            style={{
              fontSize: "40px",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.3,
            }}
          >
            Ready to transform the way your <span style={{ color: "#C6E84A" }}>business operates?</span>
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
            Whether you are exploring AI-driven transformation, intelligent
            operations, data engineering, or industry-specific solutions, our
            team is ready to help you unlock new possibilities. Let&apos;s build
            the future of intelligent operations together.
          </p>

          <div
            className="cta-buttons"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginTop: "40px",
            }}
          >
            <button className="cta-primary">Schedule a Consultation</button>
            <button className="cta-secondary">Talk to Our Experts</button>
          </div>
        </div>
      </section>
    </>
  );
}
