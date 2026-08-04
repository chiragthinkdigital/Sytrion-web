"use client";

export default function About() {
  return (
    <>
      <style>{`
        .about-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 40px;
          padding: 80px 80px;
          min-height: 620px;
          overflow: hidden;
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
          background: #F8F8F8;
          position: relative;
        }
        .about-text {
          text-align: justify;
          hyphens: auto;
          max-width: 680px;
          padding-left: 20px;
        }
        .about-visual {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 500px;
          border-radius: 24px;
          overflow: hidden;
          background: #1a1a1a;
        }
        .about-visual img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          position: absolute;
          inset: 0;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease;
        }
        .about-visual:hover img {
          transform: scale(1.03);
          filter: brightness(1.05);
        }
        @media (max-width: 1024px) {
          .about-section {
            padding: 60px 40px;
          }
        }
        @media (max-width: 900px) {
          .about-section {
            grid-template-columns: 1fr;
            padding: 60px 24px;
            min-height: auto;
          }
          .about-text {
            max-width: none;
            padding-left: 0;
          }
          .about-visual {
            min-height: 360px;
          }
        }
      `}</style>

      <section id="about" className="about-section">
        {/* Left — Text */}
        <div className="about-text">
          <span className="eyebrow-badge">
            About Sytrion
          </span>

          <h2
            style={{
              fontSize: "clamp(36px, 5.5vw, 56px)",
              fontWeight: 700,
              color: "#0f0f0f",
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
              marginBottom: "28px",
              textAlign: "left",
            }}
          >
            Intelligence with <span style={{ color: "#C6E84A", whiteSpace: "nowrap" }}>purpose</span>.
          </h2>

          <p
            style={{
              fontSize: "17px",
              fontWeight: 400,
              color: "#5A5D66",
              lineHeight: 1.8,
              marginBottom: "20px",
            }}
          >
            &emsp;Technology has the power to redefine industries, but only when it
            solves real business challenges. At Sytrion Data Labs, we combine
            intelligent technologies with operational excellence to simplify
            complexity, improve productivity, and create sustainable business
            value. Every engagement is designed to help organizations operate
            smarter, innovate faster, and adapt confidently in an evolving
            digital world.
          </p>

          <p
            style={{
              fontSize: "17px",
              fontWeight: 400,
              color: "#5A5D66",
              lineHeight: 1.8,
            }}
          >
            &emsp;Our purpose extends beyond business transformation. We aspire to
            create opportunities, empower people, and contribute to building a
            more connected and intelligent future.
          </p>
        </div>

        {/* Right — Single Cover Image */}
        <div className="about-visual">
          <img
            src="/aboutai.png"
            alt="AI-first intelligent automation"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}
