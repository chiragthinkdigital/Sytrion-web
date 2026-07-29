"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .back-to-top {
          position: fixed;
          bottom: 32px;
          right: 32px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #C6E84A;
          color: #0f0f0f;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(198, 232, 74, 0.35);
          transition: opacity 0.3s ease, transform 0.3s ease;
          z-index: 40;
        }
        .back-to-top:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 24px rgba(198, 232, 74, 0.5);
        }
        @media (max-width: 768px) {
          .back-to-top {
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
      <button
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none", transform: visible ? "translateY(0)" : "translateY(12px)" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </>
  );
}
