"use client";

import { useRef, useState, useCallback, useEffect } from "react";

const solutions = [
  {
    number: "01",
    title: "AI Automation & Agentic AI",
    description:
      "Empowering enterprises with intelligent automation, cognitive workflows, and AI-driven decision-making to transform operational performance.",
    icon: "/AI Automation & Agentic AI.svg",
    image: "/AI Automation & Agentic AI.jpg",
  },
  {
    number: "02",
    title: "Intelligent Operations (RPAs)",
    description:
      "Delivering technology-enabled managed operations that combine skilled professionals, standardized processes, and intelligent automation to achieve measurable business outcomes.",
    icon: "/Intelligent Operations (RPAs).svg",
    image: "/intelligent operations rpa.jpg",
  },
  {
    number: "03",
    title: "Data Engineering",
    description:
      "Building trusted data ecosystems through data processing, enrichment, validation, migration, and intelligent data management.",
    icon: "/Data Engineering.svg",
    image: "/dataengineeringai.jpg",
  },
  {
    number: "04",
    title: "Analytics & Business Intelligence",
    description:
      "Transforming enterprise data into actionable insights through dashboards, reporting, predictive analytics, and decision intelligence.",
    icon: "/Analytics & BI.svg",
    image: "/sol-analytics-bi.jpg",
  },
  {
    number: "05",
    title: "Shipping & Logistics Solutions",
    description:
      "Digitally transforming freight forwarding, shipping operations, customs documentation, and supply chain support through intelligent operational services.",
    icon: "/Shipping & Logistics.svg",
    image: "/sol-shipping-logistics.jpg",
  },
  {
    number: "06",
    title: "Healthcare Operations",
    description:
      "Enhancing healthcare administration through claims management, document intelligence, workflow automation, and secure operational support.",
    icon: "/Healthcare Operations.svg",
    image: "/sol-healthcare-ops.jpg",
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
    <a href="#contact" className="solutions-card" aria-label={item.title}>
      <div className="solutions-card-image">
        <img
          src={item.image}
          alt={item.title}
          className="solutions-card-bg-img"
        />
        <div className="solutions-card-overlay" />
        <div className="solutions-card-noise" />
      </div>
      <div className="solutions-card-text">
        <h3 className="solutions-card-title">{item.title}</h3>
        <p className="solutions-card-desc">{item.description}</p>
        <span className="solutions-card-arrow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
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
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border: none;
          border-top: 4px solid #C6E84A;
          border-radius: 20px;
          overflow: hidden;
          text-decoration: none;
          cursor: pointer;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.06);
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .solutions-card:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.1);
          transform: translateY(-4px);
        }

        @media (max-width: 1023px) {
          .solutions-card { flex: 0 0 calc((100% - 24px) / 2); }
        }
        @media (max-width: 639px) {
          .solutions-card { flex: 0 0 100%; }
        }

        .solutions-card-image {
          position: relative;
          height: 240px;
          background: #2E2E2C;
          border-radius: 20px 20px 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: background 0.25s ease;
        }
        .solutions-card:hover .solutions-card-image {
          background: #232322;
        }
        .solutions-card-bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .solutions-card:hover .solutions-card-bg-img {
          transform: scale(1.05);
        }
        .solutions-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%);
          pointer-events: none;
          z-index: 1;
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
          padding: 28px 28px 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
          position: relative;
        }

        .solutions-card-title {
          font-size: 19px;
          font-weight: 700;
          color: #242424;
          line-height: 1.3;
          margin: 0 0 12px;
        }

        .solutions-card-desc {
          font-size: 15px;
          font-weight: 400;
          color: #5A5D66;
          line-height: 1.6;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .solutions-card-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          color: #242424;
          margin-top: auto;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .solutions-card:hover .solutions-card-arrow {
          background: #242424;
          color: #ffffff;
        }

        .sol-arrows {
          display: flex;
          gap: 12px;
          margin-top: 32px;
          justify-content: flex-end;
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
        style={{
          width: "100%",
          background: "#F5F6F0",
          padding: "100px 80px",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span className="eyebrow-badge">
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
                margin: "0 auto",
                textAlign: "justify",
                textAlignLast: "center",
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
      </section>
    </>
  );
}
