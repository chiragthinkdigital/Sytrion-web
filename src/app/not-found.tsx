import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <style>{`
        .not-found-page {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #0f0f0f;
          padding: 40px 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .not-found-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(198,232,74,0.08) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .not-found-code {
          font-size: clamp(80px, 15vw, 160px);
          font-weight: 700;
          color: transparent;
          -webkit-text-stroke: 2px rgba(198,232,74,0.3);
          line-height: 1;
          letter-spacing: -0.05em;
          margin-bottom: 16px;
          user-select: none;
        }
        .not-found-heading {
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
        }
        .not-found-text {
          font-size: 17px;
          font-weight: 400;
          color: rgba(255,255,255,0.45);
          line-height: 1.7;
          max-width: 440px;
          margin-bottom: 40px;
        }
        .not-found-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #C6E84A;
          color: #0f0f0f;
          padding: 14px 30px;
          border-radius: 9999px;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 20px rgba(198,232,74,0.25);
        }
        .not-found-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(198,232,74,0.4);
        }
        .not-found-link:active {
          transform: translateY(0) scale(0.98);
        }
      `}</style>

      <main className="not-found-page" id="main-content">
        <div className="not-found-glow" />
        <div className="not-found-code">404</div>
        <h1 className="not-found-heading">Page not found</h1>
        <p className="not-found-text">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <Link href="/" className="not-found-link">
          Back to home
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </main>
    </>
  );
}
