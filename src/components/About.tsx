"use client";

import { Globe } from "./Globe";

export default function About() {
  return (
    <>
      <style>{`
        .about-section {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
          gap: 40px;
          padding: 60px 80px;
          min-height: 560px;
          overflow: hidden;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          background: #F8F8F8;
          position: relative;
        }
        .about-inner {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          display: contents;
        }
        .about-text {
          text-align: left;
          max-width: 520px;
          padding-left: 20px;
        }
        .globe-col {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          height: 100%;
          padding-right: 20px;
        }
        .globe-wrap {
          position: relative;
          width: 500px;
          height: 500px;
          margin-left: 0;
          margin-right: 0;
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
          .globe-col {
            padding-right: 0;
            justify-content: center;
          }
          .globe-wrap {
            width: 260px;
            height: 260px;
            margin: 30px auto 0;
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
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              color: "#0f0f0f",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              marginBottom: "24px",
            }}
          >
            Intelligence with <span style={{ color: "#C6E84A" }}>purpose</span>.
          </h2>

          <p
            style={{
              fontSize: "18px",
              fontWeight: 500,
              color: "#5A5D66",
              lineHeight: 1.7,
              marginBottom: "40px",
              maxWidth: "65ch",
            }}
          >
            Technology has the power to redefine industries, but only when it
            solves real business challenges.
          </p>

          <p
            style={{
              fontSize: "17px",
              fontWeight: 400,
              color: "#5A5D66",
              lineHeight: 1.8,
              marginBottom: "20px",
              maxWidth: "65ch",
            }}
          >
            At Sytrion Data Labs, we combine intelligent technologies with
            operational excellence to simplify complexity, improve productivity,
            and create sustainable business value. Every engagement is designed to
            help organizations operate smarter, innovate faster, and adapt
            confidently in an evolving digital world.
          </p>

          <p
            style={{
              fontSize: "17px",
              fontWeight: 400,
              color: "#5A5D66",
              lineHeight: 1.8,
              maxWidth: "65ch",
            }}
          >
            Our purpose extends beyond business transformation. We aspire to
            create opportunities, empower people, and contribute to building a
            more connected and intelligent future.
          </p>
        </div>

        {/* Right — Globe */}
        <div className="globe-col">
          <div className="globe-wrap">
            <Globe />
          </div>
        </div>
      </section>
    </>
  );
}
