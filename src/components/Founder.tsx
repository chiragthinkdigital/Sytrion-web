export default function Founder() {
  return (
    <>
      <style>{`
        .founder-section {
          background: #fafaf8;
          position: relative;
        }
        .founder-inner {
          max-width: 780px;
          margin: 0 auto;
          text-align: center;
        }
        .founder-quote-mark {
          font-size: 100px;
          font-weight: 700;
          color: transparent;
          -webkit-text-stroke: 2px rgba(198, 232, 74, 0.35);
          line-height: 1;
          user-select: none;
          margin-bottom: 8px;
        }
        .founder-message {
          font-size: 22px;
          font-weight: 400;
          color: #3a3d44;
          line-height: 1.75;
          font-style: italic;
          margin: 0;
          max-width: 60ch;
          margin-left: auto;
          margin-right: auto;
        }
        .founder-message + .founder-message {
          margin-top: 28px;
        }
        .founder-signature {
          margin-top: 48px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: center;
        }
        .founder-name {
          font-size: 17px;
          font-weight: 600;
          color: #0f0f0f;
          letter-spacing: -0.01em;
        }
        .founder-role {
          font-size: 14px;
          font-weight: 400;
          color: #888;
        }
        @media (max-width: 768px) {
          .founder-section {
            padding: 60px 24px !important;
          }
          .founder-message {
            font-size: 19px;
          }
          .founder-quote-mark {
            font-size: 72px;
          }
        }
      `}</style>

      <section
        className="founder-section"
        style={{
          width: "100%",
          padding: "100px 80px",
        }}
      >
        <div className="founder-inner">
          <span className="eyebrow-badge">Founder&apos;s message</span>

          <div className="founder-quote-mark" aria-hidden="true">&ldquo;</div>

          <p className="founder-message">
            Sytrion was founded with a simple yet ambitious vision — to help
            organizations harness the power of intelligence, technology, and
            operational excellence to build stronger businesses while creating
            meaningful opportunities for people.
          </p>

          <p className="founder-message">
            We believe sustainable success is achieved when innovation serves a
            greater purpose. Every solution we deliver is designed not only to
            transform business performance but also to contribute positively to
            the communities and industries we serve.
          </p>

          <div className="founder-signature">
            <div className="founder-name">Rajesh Kulkarni</div>
            <div className="founder-role">Founder &amp; CEO, Sytrion Data Labs</div>
          </div>
        </div>
      </section>
    </>
  );
}
