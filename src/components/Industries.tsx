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
    image: "/healtcare operations.jpg",
    imageAlt: "Healthcare operations",
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
    image: "/travelai.jpg",
    imageAlt: "Travel destination aerial view",
  },
  {
    name: "Banking",
    tagline: "",
    description: "KYC/AML compliance, loan processing & financial operations support.",
    image: "/bankingai.jpg",
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
    displayValue: "40%",
    label: "Faster Documentation Processing",
    subLabel: "",
    fillPercent: 40,
  },
  {
    type: "bar" as const,
    count: 50,
    displayValue: "50%",
    label: "Automation & Annual Savings",
    subLabel: "",
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

const mosaicImages = [
  { src: "/global clients.jpg", alt: "Global clients" },
  { src: "/Faster Documentation Processing.jpg", alt: "Faster documentation processing" },
  { src: "/Automation-and-Annual-Savings.jpg", alt: "Automation and annual savings" },
  { src: "/Reduction in Dispute Resolution Time.jpg", alt: "Reduction in dispute resolution time" },
  { src: "/Reduction in Operating Cost.jpg", alt: "Reduction in operating cost" },
];

type MosaicTile =
  | { kind: "image"; image: { src: string; alt: string } }
  | { kind: "stat"; statIndex: number };

const mosaicTiles: MosaicTile[] = [
  { kind: "image", image: mosaicImages[0] },
  { kind: "stat", statIndex: 0 },
  { kind: "image", image: mosaicImages[1] },
  { kind: "stat", statIndex: 1 },
  { kind: "image", image: mosaicImages[2] },
  { kind: "stat", statIndex: 2 },
  { kind: "image", image: mosaicImages[3] },
  { kind: "stat", statIndex: 3 },
  { kind: "image", image: mosaicImages[4] },
  { kind: "stat", statIndex: 4 },
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

  const statEls = useRef<(HTMLDivElement | null)[]>([]);
  const animFrame = useRef<number>(0);

  const setStatEl = (i: number) => (el: HTMLDivElement | null) => {
    statEls.current[i] = el;
  };

  const statSuffix = (stat: (typeof stats)[number]) =>
    stat.displayValue === "5+" ? "+" : "%";

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
    if (!inView) return;

    if (reducedMotion) {
      stats.forEach((stat, i) => {
        const node = statEls.current[i];
        if (node) node.textContent = `${stat.count}${statSuffix(stat)}`;
      });
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
        const value = Math.round(easedProgress * stat.count);
        const node = statEls.current[i];
        if (node) node.textContent = `${value}${statSuffix(stat)}`;
        if (progress < 1) anyRunning = true;
      });

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
          padding: 28px;
          z-index: 1;
        }
        .ind-photo-name {
          display: block;
          font-size: 22px;
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.3;
          text-shadow: 0 1px 4px rgba(0,0,0,0.4);
        }
        .ind-photo-tagline {
          font-weight: 500;
          color: rgba(255,255,255,0.7);
          font-size: 15px;
        }

        .ind-arrows {
          display: flex;
          gap: 12px;
          margin-top: 32px;
          justify-content: flex-end;
        }
        .ind-arrow-btn {
          width: 52px;
          height: 52px;
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

        /* ── Outcomes Mosaic Grid ──────────────────────────── */
        .outcomes-section {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(ellipse at top right, rgba(198, 232, 74, 0.08), transparent 55%),
            #0a0a0a;
        }
        .outcomes-layout {
          display: flex;
          gap: 64px;
          align-items: center;
        }
        .outcomes-intro {
          flex: 0 0 340px;
          max-width: 340px;
        }
        .outcomes-headline {
          font-size: 40px;
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.15;
          margin-bottom: 20px;
        }
        .outcomes-headline span {
          color: #C6E84A;
        }
        .outcomes-sub {
          font-size: 16px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.7;
          margin-bottom: 28px;
        }
        .outcomes-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #C6E84A;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        .outcomes-link:hover {
          opacity: 0.8;
        }

        .outcomes-mosaic {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-auto-rows: 170px;
          gap: 6px;
        }
        .outcome-tile {
          border-radius: 14px;
          overflow: hidden;
        }
        .outcome-tile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .outcome-tile:hover .outcome-tile-img {
          transform: scale(1.04);
        }
        .outcome-tile-stat {
          background: #14161D;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 12px;
          text-align: center;
        }
        .outcome-tile-number {
          font-size: 36px;
          font-weight: 700;
          color: #C6E84A;
          line-height: 1;
          font-variant-numeric: tabular-nums;
          margin-bottom: 10px;
        }
        .outcome-tile-label {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.45;
        }
        @media (max-width: 1000px) {
          .outcomes-layout {
            flex-direction: column;
            gap: 40px;
            align-items: flex-start;
          }
          .outcomes-intro {
            flex: none;
            max-width: none;
          }
          .outcomes-mosaic {
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: 150px;
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
          .outcomes-section {
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
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ marginBottom: "56px" }}>
            <span className="eyebrow-badge" style={{ marginBottom: "18px" }}>
              Industries we serve
            </span>
            <h2
              style={{
                fontSize: "clamp(36px, 5vw, 52px)",
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: 1.2,
                marginBottom: "16px",
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
                maxWidth: "100%",
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

      {/* ── Outcomes Mosaic ─────────────────────────────────────── */}
      <section
        ref={sectionRef}
        className="outcomes-section"
        style={{
          width: "100%",
          padding: "100px 80px",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }} className="outcomes-layout">
          {/* Left column — intro */}
          <div className="outcomes-intro">
            <h3 className="outcomes-headline">
              Delivering <span>Outcomes</span>
            </h3>
            <p className="outcomes-sub">
              From accelerated documentation processing to smarter automation
              and lower operating costs, our intelligent operations deliver
              measurable results — consistently, across every engagement.
            </p>
            <a href="#contact" className="outcomes-link">
              Read More <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Right column — mosaic grid */}
          <div className="outcomes-mosaic">
            {mosaicTiles.map((tile, i) => {
              if (tile.kind === "image") {
                return (
                  <div key={`img-${i}`} className="outcome-tile">
                    <img
                      src={tile.image.src}
                      alt={tile.image.alt}
                      className="outcome-tile-img"
                      loading="lazy"
                    />
                  </div>
                );
              }
              const stat = stats[tile.statIndex];
              const suffix = statSuffix(stat);
              return (
                <div
                  key={`stat-${i}`}
                  className="outcome-tile outcome-tile-stat"
                  role="group"
                  aria-label={`${stat.displayValue} ${stat.label}`}
                >
                  <div className="outcome-tile-number" ref={setStatEl(tile.statIndex)}>
                    0{suffix}
                  </div>
                  <div className="outcome-tile-label">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
