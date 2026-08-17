"use client";

import { useRef, useState, useCallback, useEffect } from "react";

const solutions = [
  {
    number: "01",
    anchor: "ai-automation",
    title: "AI Automation & Agentic AI",
    description:
      "Empowering enterprises with intelligent automation, cognitive workflows, and AI-driven decision-making to transform operational performance.",
    icon: "/AI Automation & Agentic AI.svg",
    image: "/AI-Automation-and-Agentic-AI-2.jpeg",
  },
  {
    number: "02",
    anchor: "intelligent-operations",
    title: "Intelligent Operations (RPAs)",
    description:
      "Delivering technology-enabled managed operations that combine skilled professionals, standardized processes, and intelligent automation to achieve measurable business outcomes.",
    icon: "/Intelligent Operations (RPAs).svg",
    image: "/rpa2.jpg",
  },
  {
    number: "03",
    anchor: "data-engineering",
    title: "Data Engineering",
    description:
      "Building trusted data ecosystems through data processing, enrichment, validation, migration, and intelligent data management.",
    icon: "/Data Engineering.svg",
    image: "/Data Engineering.webp",
  },
  {
    number: "04",
    anchor: "analytics-bi",
    title: "Analytics & Business Intelligence",
    description:
      "Transforming enterprise data into actionable insights through dashboards, reporting, predictive analytics, and decision intelligence.",
    icon: "/Analytics & BI.svg",
    image: "/Analytics-and-BI.webp",
  },
  {
    number: "05",
    anchor: "shipping-logistics",
    title: "Shipping & Logistics Solutions",
    description:
      "Digitally transforming freight forwarding, shipping operations, customs documentation, and supply chain support through intelligent operational services.",
    icon: "/Shipping & Logistics.svg",
    image: "/shipping and logistics.jpg",
  },
  {
    number: "06",
    anchor: "healthcare-operations",
    title: "Healthcare Operations",
    description:
      "Enhancing healthcare administration through claims management, document intelligence, workflow automation, and secure operational support.",
    icon: "/Healthcare operations.svg",
    image: "/Healthcare operations.webp",
  },
];

function useVisibleCount() {
  const [count, setCount] = useState(4);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setCount(1);
      else if (w < 1024) setCount(2);
      else setCount(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return count;
}

function SolutionCard({ item }: { item: (typeof solutions)[number] }) {
  return (
    <a href={`/solutions#${item.anchor}`} className="solutions-card" aria-label={item.title}>
      <img
        src={item.image}
        alt={item.title}
        className="solutions-card-bg-img"
        loading="lazy"
        decoding="async"
      />
      <div className="solutions-card-overlay" />
      <div className="solutions-card-noise" />
      <div className="solutions-card-text">
        <h3 className="solutions-card-title">{item.title}</h3>
        <p className="solutions-card-desc">{item.description}</p>
        <span className="solutions-card-readmore">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
          Read More
        </span>
      </div>
    </a>
  );
}

export default function Solutions() {
  const trackRef = useRef<HTMLDivElement>(null);
  const visibleCount = useVisibleCount();
  const maxPage = Math.ceil(solutions.length / visibleCount) - 1;
  const [page, setPage] = useState(0);

  const scrollToPage = useCallback(
    (p: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(maxPage, p));
      const card = track.children[0] as HTMLElement | undefined;
      if (!card) return;
      const cardW = card.offsetWidth;
      const gap = 24;
      track.scrollTo({ left: clamped * (cardW + gap) * visibleCount, behavior: "smooth" });
      setPage(clamped);
    },
    [maxPage, visibleCount]
  );

  const canScrollLeft = page > 0;
  const canScrollRight = page < maxPage;

  return (
    <>
      <style>{`
        /* ── Solutions carousel ────────────────────────── */
        .sol-track {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-behavior: smooth;
          padding-bottom: 4px;
        }
        .sol-track::-webkit-scrollbar { display: none; }

        .solutions-card {
          flex: 0 0 calc((100% - 72px) / 4);
          position: relative;
          height: 480px;
          background: #2E2E2C;
          border: none;
          border-radius: 12px;
          overflow: hidden;
          text-decoration: none;
          cursor: pointer;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .solutions-card:hover {
          box-shadow: 0 16px 44px rgba(0,0,0,0.18);
          transform: translateY(-4px);
        }

        @media (max-width: 1023px) {
          .solutions-card { flex: 0 0 calc((100% - 24px) / 2); height: 420px; }
        }
        @media (max-width: 639px) {
          .solutions-card { flex: 0 0 100%; height: 380px; }
        }

        .solutions-card-bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        .solutions-card:hover .solutions-card-bg-img {
          transform: scale(1.04);
        }
        .solutions-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0) 42%, rgba(0,0,0,0.72) 68%, rgba(0,0,0,0.92) 100%);
          pointer-events: none;
          z-index: 1;
        }
        .solutions-card:hover .solutions-card-overlay {
          background: linear-gradient(180deg, rgba(0,0,0,0) 42%, rgba(0,0,0,0.82) 68%, rgba(0,0,0,0.96) 100%);
        }

        .solutions-card-noise {
          position: absolute;
          inset: 0;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 128px 128px;
          pointer-events: none;
          z-index: 2;
        }

        .solutions-card-text {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 28px;
          display: flex;
          flex-direction: column;
          z-index: 3;
        }

        .solutions-card-title {
          font-size: 25px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.3;
          margin: 0 0 12px;
        }

        .solutions-card-desc {
          font-size: 14.5px;
          font-weight: 400;
          color: rgba(255,255,255,0.82);
          line-height: 1.6;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .solutions-card-readmore {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 18px;
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.6px;
          text-transform: uppercase;
        }
        .solutions-card-readmore svg {
          flex-shrink: 0;
        }

        .sol-arrows {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-top: 32px;
        }
        .sol-btn-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .sol-view-all {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #242424;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          text-decoration: none;
          padding: 6px 0;
          border-bottom: 2px solid rgba(198,232,74,0.9);
          transition: color 0.2s ease, border-color 0.2s ease, gap 0.2s ease;
        }
        .sol-view-all:hover {
          color: #8FAB1E;
          border-bottom-color: #C6E84A;
          gap: 12px;
        }
        .sol-arrow-btn {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 1.5px solid rgba(0,0,0,0.15);
          background: transparent;
          color: #242424;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease, opacity 0.2s ease;
          padding: 0;
        }
        .sol-arrow-btn:hover:not(:disabled) {
          background: rgba(0,0,0,0.06);
          border-color: rgba(0,0,0,0.3);
        }
        .sol-arrow-btn:disabled {
          opacity: 0.25;
          cursor: default;
        }
        @media (max-width: 1024px) {
          .sol-section {
            padding: 80px 40px;
          }
        }
        @media (max-width: 768px) {
          .sol-section {
            padding: 60px 20px;
          }
        }
      `}</style>

      <section
        className="sol-section"
        id="solutions"
        style={{
          width: "100%",
          background: "#F5F6F0",
          padding: "100px 80px",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ marginBottom: "48px" }}>
            <span className="eyebrow-badge" style={{ marginBottom: "18px" }}>
              Our solutions
            </span>
            <h2
              style={{
                fontSize: "clamp(36px, 5vw, 52px)",
                fontWeight: 700,
                color: "#242424",
                lineHeight: 1.2,
                marginBottom: "16px",
              }}
            >
              Intelligent Solutions. <span style={{ color: "#C6E84A" }}>Meaningful Outcomes</span>.
            </h2>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 400,
                color: "#5A5D66",
                lineHeight: 1.7,
                maxWidth: "100%",
              }}
            >
              Every business faces unique operational challenges. Our integrated
              portfolio of technology-enabled services helps organizations
              optimize operations, unlock efficiencies, and accelerate digital
              transformation.
            </p>
          </div>

          <div ref={trackRef} className="sol-track">
            {solutions.map((item) => (
              <SolutionCard key={item.number} item={item} />
            ))}
          </div>

          <div className="sol-arrows">
            <a href="/solutions" className="sol-view-all">
              View All Solutions
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <div className="sol-btn-group">
              <button
                className="sol-arrow-btn"
                disabled={!canScrollLeft}
                onClick={() => scrollToPage(page - 1)}
                aria-label="Previous solutions"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                className="sol-arrow-btn"
                disabled={!canScrollRight}
                onClick={() => scrollToPage(page + 1)}
                aria-label="Next solutions"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
