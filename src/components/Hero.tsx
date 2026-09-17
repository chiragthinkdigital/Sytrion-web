import Link from "next/link";

export default function Hero() {
  return (
    <>
      <style>{`
        .hero-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          z-index: 1;
          padding: 100px clamp(16px, 3vw, 48px) 0;
          max-width: 1440px;
          margin: 0 auto;
          left: 0;
          right: 0;
        }
        .hero-eyebrow {
          display: inline-block;
          background: #C6E84A;
          color: #0f0f0f;
          padding: 6px 16px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          font-variant: small-caps;
          letter-spacing: 0.5px;
          text-transform: none;
          margin-bottom: 32px;
        }
        .hero-heading {
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.08;
          letter-spacing: -0.03em;
          max-width: 780px;
          margin-bottom: 28px;
          text-wrap: balance;
        }
        .hero-subheading {
          font-size: clamp(16px, 2vw, 19px);
          font-weight: 400;
          color: rgba(255,255,255,0.6);
          line-height: 1.75;
          max-width: 520px;
          margin-bottom: 44px;
        }
        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        .hero-cta-primary {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #C6E84A;
          color: #0f0f0f;
          padding: 16px 34px;
          border-radius: 9999px;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 20px rgba(198,232,74,0.25);
        }
        .hero-cta-primary::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 60%;
          background: linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 100%);
          pointer-events: none;
          border-radius: inherit;
        }
        .hero-cta-primary::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(100deg, transparent 0%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.25) 55%, transparent 100%);
          pointer-events: none;
          border-radius: inherit;
          transition: left 0.6s ease;
        }
        .hero-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(198,232,74,0.4);
        }
        .hero-cta-primary:hover::after {
          left: 120%;
        }
        .hero-cta-primary:active {
          transform: translateY(0) scale(0.98);
        }
        .hero-cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #FFFFFF;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.3s ease, transform 0.3s ease;
          padding: 16px 8px;
          border-bottom: 1px solid rgba(255,255,255,0.2);
        }
        .hero-cta-secondary:hover {
          color: #C6E84A;
          transform: translateX(4px);
          border-color: #C6E84A;
        }
        .hero-cta-secondary svg {
          transition: transform 0.3s ease;
        }
        .hero-cta-secondary:hover svg {
          transform: translateX(4px);
        }
        .hero-microcopy {
          margin-top: 48px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.3px;
        }
        @media (max-width: 1024px) {
          .hero-content {
            padding: 0 clamp(24px, 5vw, 60px);
          }
          .hero-heading {
            max-width: 600px;
          }
        }
        @media (max-width: 768px) {
          .hero-content {
            align-items: flex-start;
            text-align: left;
            padding: 0 24px;
          }
          .hero-heading {
            font-size: clamp(32px, 8vw, 44px);
            max-width: 100%;
          }
          .hero-subheading {
            max-width: 100%;
          }
          .hero-cta-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            width: 100%;
          }
          .hero-cta-primary {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }
          .hero-cta-secondary {
            justify-content: flex-start;
          }
          .hero-microcopy {
            margin-top: 32px;
          }
        }
      `}</style>

      <section className="relative w-full h-[100dvh] overflow-hidden bg-[#0f0f0f]">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/home/hero1.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Subtle grain */}
        <div className="grain-overlay absolute inset-0 pointer-events-none" />

        <div className="hero-content">
          <h1 className="hero-heading">
            Engineering intelligent operations <span style={{ color: "#C6E84A" }}>for a smarter world.</span>
          </h1>

          <p className="hero-subheading">
            AI-driven solutions that transform business processes through
            automation, data intelligence, and operational excellence.
          </p>

          <div className="hero-cta-row">
            <Link href="/contact" className="hero-cta-primary">
              Schedule a consultation
            </Link>
            <a href="#solutions" className="hero-cta-secondary">
              Explore solutions
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          <p className="hero-microcopy">
            Trusted by enterprises across shipping, healthcare, and banking.
          </p>
        </div>
      </section>
    </>
  );
}
