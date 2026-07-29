"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

const industryCards = [
  {
    name: "Shipping & Logistics",
    tagline: "IBS & FNA",
    description: "Freight forwarding, customs documentation & supply chain intelligence.",
    image: "/shipping.jpg",
    imageAlt: "Shipping containers at port",
  },
  {
    name: "Healthcare",
    tagline: "HCLS",
    description: "Claims management, document intelligence & clinical workflow automation.",
    image: "/healthcare.jpg",
    imageAlt: "Hospital corridor",
  },
  {
    name: "Insurance",
    tagline: "",
    description: "Policy administration, claims processing & underwriting support.",
    image: "/insurance.jpg",
    imageAlt: "Business documents and pen",
  },
  {
    name: "Digital Public Infrastructure",
    tagline: "DPI",
    description: "Digital identity systems, payment infrastructure & governance platforms.",
    image: "/dpi.jpg",
    imageAlt: "Server room with network cables",
  },
  {
    name: "Travel",
    tagline: "",
    description: "Booking operations, itinerary management & customer support automation.",
    image: "/travel.jpg",
    imageAlt: "Travel destination aerial view",
  },
  {
    name: "Banking",
    tagline: "",
    description: "KYC/AML compliance, loan processing & financial operations support.",
    image: "/banking.jpg",
    imageAlt: "Modern bank building",
  },
  {
    name: "eCommerce",
    tagline: "",
    description: "Catalog management, order processing & returns automation.",
    image: "/ecommerce.jpg",
    imageAlt: "Online shopping on laptop",
  },
];

const stats = [
  {
    type: "dots" as const,
    count: 5,
    displayValue: "5+",
    label: "Global Clients",
    subLabel: "",
    fillPercent: 0,
  },
  {
    type: "bar" as const,
    count: 40,
    displayValue: "20–40%",
    label: "Faster Documentation Processing",
    subLabel: "",
    fillPercent: 40,
  },
  {
    type: "bar" as const,
    count: 50,
    displayValue: "40–50%",
    label: "Automation & Annual Savings",
    subLabel: "RPAs / Transformation / Macro VBA",
    fillPercent: 50,
  },
  {
    type: "bar" as const,
    count: 50,
    displayValue: "50%",
    label: "Reduction in Dispute Resolution Time",
    subLabel: "",
    fillPercent: 50,
  },
  {
    type: "bar" as const,
    count: 40,
    displayValue: "40%",
    label: "Reduction in Operating Cost",
    subLabel: "",
    fillPercent: 40,
  },
];

const STAGGER_DELAY = 150;
const COUNT_DURATION = 1500;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

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

export default function Industries() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const reducedMotion = useReducedMotion();

  const animValues = useRef<number[]>(stats.map(() => 0));
  const [tick, setTick] = useState(0);
  const animFrame = useRef<number>(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reducedMotion) {
      if (reducedMotion && inView) {
        animValues.current = stats.map((s) => s.count);
        setTick((t) => t + 1);
      }
      return;
    }

    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      let anyRunning = false;

      stats.forEach((stat, i) => {
        const rowDelay = i * STAGGER_DELAY;
        const rowElapsed = Math.max(0, elapsed - rowDelay);
        const progress = Math.min(1, rowElapsed / COUNT_DURATION);
        const easedProgress = easeOutCubic(progress);
        animValues.current[i] = Math.round(easedProgress * stat.count);
        if (progress < 1) anyRunning = true;
      });

      setTick((t) => t + 1);

      if (anyRunning) {
        animFrame.current = requestAnimationFrame(animate);
      }
    }

    animFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame.current);
  }, [inView, reducedMotion]);

  /* ── Carousel ──────────────────────────────────────────── */
  const trackRef = useRef<HTMLDivElement>(null);
  const visibleCount = useVisibleCount();
  const maxPage = Math.ceil(industryCards.length / visibleCount) - 1;
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
        /* ── Photo cards carousel ────────────────────────── */
        .ind-photo-section {
          position: relative;
          overflow: hidden;
        }
        .ind-photo-track {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-behavior: smooth;
          padding-bottom: 4px;
        }
        .ind-photo-track::-webkit-scrollbar { display: none; }

        .ind-photo-card {
          flex: 0 0 calc((100% - 72px) / 4);
          align-self: flex-start;
          aspect-ratio: 4 / 5;
          border-radius: 18px;
          position: relative;
          overflow: hidden;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          cursor: default;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .ind-photo-card:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 32px rgba(0,0,0,0.45);
        }
        .ind-photo-card:hover .ind-photo-img {
          filter: brightness(1.1);
        }

        .ind-photo-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: filter 0.2s ease;
        }

        .ind-photo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0) 70%);
          pointer-events: none;
        }

        .ind-photo-label {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding: 24px;
          z-index: 1;
        }
        .ind-photo-name {
          display: block;
          font-size: 20px;
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.3;
          text-shadow: 0 1px 4px rgba(0,0,0,0.4);
        }
        .ind-photo-tagline {
          font-weight: 500;
          color: rgba(255,255,255,0.7);
          font-size: 14px;
        }

        .ind-arrows {
          display: flex;
          gap: 12px;
          margin-top: 32px;
          justify-content: flex-end;
        }
        .ind-arrow-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.2);
          background: transparent;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease, opacity 0.2s ease;
          padding: 0;
        }
        .ind-arrow-btn:hover:not(:disabled) {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.4);
        }
        .ind-arrow-btn:disabled {
          opacity: 0.25;
          cursor: default;
        }

        @media (max-width: 1023px) {
          .ind-photo-card {
            flex: 0 0 calc((100% - 24px) / 2);
          }
        }
        @media (max-width: 639px) {
          .ind-photo-card {
            flex: 0 0 100%;
          }
        }

        /* ── Stats Count-Up Grid ──────────────────────────── */
        .dash-stats-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 40px 24px;
          position: relative;
          align-items: start;
        }
        .dash-stat-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .dash-stat-block.dash-in-view {
          opacity: 1;
          transform: translateY(0);
        }
        .dash-stat-number {
          font-size: 44px;
          font-weight: 700;
          color: #C6E84A;
          line-height: 1;
          font-variant-numeric: tabular-nums;
          margin-bottom: 16px;
        }
        .dash-stat-label {
          font-size: 13px;
          font-weight: 600;
          color: #242424;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          line-height: 1.5;
          min-height: 40px;
          text-align: center;
        }
        .dash-stat-sublabel {
          font-size: 11px;
          font-weight: 400;
          color: #8A8D96;
          text-transform: none;
          letter-spacing: 0;
          margin-top: 2px;
          text-align: center;
        }
        @media (max-width: 900px) {
          .dash-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 36px 24px;
          }
        }
        @media (max-width: 600px) {
          .dash-stats-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .dash-stat-number {
            font-size: 36px;
          }
        }
        @media (max-width: 1024px) {
          .ind-photo-section {
            padding: 80px 40px !important;
          }
        }
        @media (max-width: 768px) {
          .ind-photo-section {
            padding: 60px 20px !important;
          }
          .industries-stats-band {
            padding: 60px 20px !important;
          }
        }
      `}</style>

      {/* ── Photo Cards Section ─────────────────────────────── */}
      <section
        className="ind-photo-section"
        style={{
          width: "100%",
          background: "#0f0f0f",
          padding: "100px 80px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span className="eyebrow-badge">
              Industries we serve
            </span>
            <h2
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: 1.2,
                marginBottom: "24px",
              }}
            >
              Delivering Expertise <span style={{ color: "#C6E84A" }}>Across Industries</span>
            </h2>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 400,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.7,
                maxWidth: "750px",
                margin: "0 auto",
              }}
            >
              Every industry presents unique opportunities and operational
              challenges. Our deep domain expertise enables us to design
              intelligent solutions that address industry-specific complexities
              while maintaining the highest standards of quality, security, and
              operational excellence.
            </p>
          </div>

          {/* Carousel */}
          <div ref={trackRef} className="ind-photo-track">
            {industryCards.map((ind) => (
              <div key={ind.name} className="ind-photo-card">
                <Image
                  src={ind.image}
                  alt={ind.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="ind-photo-img"
                  unoptimized
                />
                <div className="ind-photo-overlay" />
                <div className="ind-photo-overlay" />
                <div className="ind-photo-label">
                  <span className="ind-photo-name">
                    {ind.name}
                    {ind.tagline && (
                      <span className="ind-photo-tagline"> ({ind.tagline})</span>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Nav Arrows */}
          <div className="ind-arrows">
            <button
              className="ind-arrow-btn"
              disabled={!canScrollLeft}
              onClick={() => scrollToPage(page - 1)}
              aria-label="Previous industries"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              className="ind-arrow-btn"
              disabled={!canScrollRight}
              onClick={() => scrollToPage(page + 1)}
              aria-label="Next industries"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats Dashboard Band ──────────────────────────────── */}
      <section
        ref={sectionRef}
        className="industries-stats-band"
        style={{
          width: "100%",
          background: "#F5F5F0",
          padding: "80px 80px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h3
            style={{
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "#242424",
              marginBottom: "48px",
              textAlign: "center",
            }}
          >
            Delivering Outcomes
          </h3>

          <div className="dash-stats-grid">
            {stats.map((stat, i) => {
              const animVal = animValues.current[i];
              const numPart = inView ? animVal : 0;
              const suffix = stat.displayValue === "5+" ? "+" : "%";

              return (
                <div
                  key={stat.label}
                  className={`dash-stat-block ${inView ? "dash-in-view" : ""}`}
                  style={{ transitionDelay: `${i * STAGGER_DELAY}ms` }}
                  role="group"
                  aria-label={`${stat.displayValue} ${stat.label}`}
                >
                  <div className="dash-stat-number">
                    {numPart}{suffix}
                  </div>
                  <div className="dash-stat-label">{stat.label}</div>
                  {stat.subLabel && (
                    <div className="dash-stat-sublabel">{stat.subLabel}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
