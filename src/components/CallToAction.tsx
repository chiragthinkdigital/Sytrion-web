import Link from "next/link";

export default function CallToAction() {
  return (
    <>
      <style>{`
        .cta-section {
          position: relative;
          background: #0f0f0f;
          color: #ffffff;
          overflow: hidden;
          isolation: isolate;
          padding: clamp(76px, 9vw, 128px) 80px;
          text-align: center;
        }
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
        .cta-inner {
          position: relative;
          z-index: 1;
          max-width: 780px;
          margin: 0 auto;
        }
        .cta-badge {
          display: inline-block;
          background: #C6E84A;
          color: #0f0f0f;
          padding: 8px 20px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          font-variant: small-caps;
          margin-bottom: 24px;
        }
        .cta-heading {
          font-family: var(--font-syne), Arial, Helvetica, sans-serif;
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin: 0 0 20px;
          color: #ffffff;
        }
        .cta-body {
          font-size: 17px;
          line-height: 1.8;
          color: rgba(255,255,255,0.6);
          margin: 20px auto 40px;
          max-width: 640px;
        }
        .cta-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
        }
        @media (max-width: 1024px) {
          .cta-section { padding-left: 40px; padding-right: 40px; }
        }
        @media (max-width: 768px) {
          .cta-section { padding-left: 20px; padding-right: 20px; }
          .cta-actions { flex-direction: column; align-items: center; }
        }
      `}</style>

      <section className="cta-section">
        <div className="cta-glow" aria-hidden="true" />
        <div className="cta-inner">
          <span className="cta-badge">Get started</span>

          <h2 className="cta-heading">
            Ready to transform the way your business operates?
          </h2>

          <p className="cta-body">
            Whether you are exploring AI-driven transformation, intelligent
            operations, data engineering, or industry-specific solutions, our
            team is ready to help you unlock new possibilities.
          </p>

          <div className="cta-actions">
            <Link href="/contact" className="btn-primary">
              Schedule a Consultation
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
            <Link href="/contact" className="btn-secondary">
              Talk to Our Experts ↗
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}