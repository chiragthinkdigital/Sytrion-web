export default function CallToAction() {
  return (
    <>
      <style>{`
        .cta-section {
          width: 100%;
          background: #D4E83A;
          padding: 56px 80px;
          position: relative;
          overflow: hidden;
        }
        .cta-inner {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 48px;
        }
        .cta-content {
          flex: 1 1 58%;
          max-width: 640px;
          text-align: left;
        }
        .cta-badge {
          display: inline-block;
          background: #7A8B2E;
          color: #111111;
          padding: 9px 18px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }
        .cta-heading {
          font-size: clamp(25px, 3vw, 33px);
          font-weight: 700;
          color: #141414;
          line-height: 1.25;
          letter-spacing: -0.01em;
        }
        .cta-body {
          font-size: 16px;
          color: #4B5320;
          line-height: 1.65;
          margin-top: 16px;
          max-width: 56ch;
        }
        .cta-actions {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 14px;
          flex-wrap: wrap;
        }
        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #141414;
          color: #FFFFFF;
          border: none;
          padding: 16px 30px;
          border-radius: 999px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        }
        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(20, 20, 20, 0.25);
        }
        .cta-primary:active {
          transform: translateY(0) scale(0.98);
        }
        .cta-secondary {
          display: inline-flex;
          align-items: center;
          background: transparent;
          color: #141414;
          border: 1.5px solid #141414;
          padding: 15px 30px;
          border-radius: 999px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .cta-secondary:hover {
          background: rgba(20, 20, 20, 0.06);
          transform: translateY(-2px);
        }
        .cta-secondary:active {
          transform: translateY(0) scale(0.98);
        }
        @media (max-width: 1024px) {
          .cta-section {
            padding: 48px 40px;
          }
          .cta-inner {
            gap: 32px;
          }
          .cta-actions {
            gap: 12px;
          }
        }
        @media (max-width: 768px) {
          .cta-section {
            padding: 40px 20px;
          }
          .cta-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 28px;
          }
          .cta-content {
            max-width: 100%;
          }
          .cta-actions {
            width: 100%;
            justify-content: flex-start;
          }
        }
      `}</style>

      <section className="cta-section">
        <div className="cta-inner">
          <div className="cta-content">
            <span className="cta-badge">Get started</span>

            <h2 className="cta-heading">
              Ready to transform the way your business operates?
            </h2>

            <p className="cta-body">
              Whether you are exploring AI-driven transformation, intelligent
              operations, data engineering, or industry-specific solutions, our
              team is ready to help you unlock new possibilities.
            </p>
          </div>

          <div className="cta-actions">
            <button className="cta-primary">
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
            </button>
            <button className="cta-secondary">Talk to Our Experts</button>
          </div>
        </div>
      </section>
    </>
  );
}