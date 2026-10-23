"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WhySytrion from "@/components/WhySytrion";
import FutureCards from "@/components/FutureCards";
import CallToAction from "@/components/CallToAction";
import GlobalPresence from "@/components/GlobalPresence";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 5, suffix: "+", label: "Global Clients" },
  { value: 98, suffix: "%", label: "Client Retention" },
  { value: 50, suffix: "+", label: "Team Members" },
  { value: 10, suffix: "+", label: "Years of Excellence" },
];

const operatingPrinciples = [
  { title: "Customer First", image: "/about/Customer First.png", desc: "Every solution begins with understanding our client's business objectives and desired outcomes." },
  { title: "Operational Excellence", image: "/about/Operational Excellence.png", desc: "We continuously improve processes to deliver consistent, measurable results." },
  { title: "Innovation with Purpose", image: "/about/Innovation with Purpose.png", desc: "Technology is applied where it creates real business value â€” not for its own sake." },
  { title: "Integrity & Trust", image: "/about/Integrity and Trust.png", desc: "We build lasting relationships through transparency, accountability, and ethical business practices." },
  { title: "Continuous Improvement", image: "/about/Continuous Improvement.jpg", desc: "We embrace change and continuously evolve to help our clients stay ahead." },
];

const values = [
  {
    title: "Integrity",
    description:
      "We uphold the highest standards of ethics, honesty and transparency in every interaction and decision we make.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Innovation",
    description:
      "We continuously embrace emerging technologies and challenge conventional thinking to deliver forward-thinking solutions.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-1v1a4 4 0 0 1-8 0v-1H7a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z" />
        <circle cx="9" cy="10" r="1" fill="currentColor" />
        <circle cx="15" cy="10" r="1" fill="currentColor" />
        <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
      </svg>
    ),
  },
  {
    title: "Excellence",
    description:
      "Every process, every project and every partnership reflects our relentless pursuit of quality and continuous improvement.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    title: "Ownership",
    description:
      "We take responsibility beyond contractual obligations, treating every client engagement as if it were our own business.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Collaboration",
    description:
      "Long-term success is built through trust, open communication and shared goals with our clients and partners.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Customer Success",
    description:
      "Our success is measured by the value we create for our clients and the lasting impact we deliver to their businesses.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

const timeline = [
  {
    year: "Founded",
    title: "The Beginning",
    text: "Established with a mission to bridge technology and business outcomes through AI and operational excellence.",
  },
  {
    year: "Growth",
    title: "Scaling Impact",
    text: "Expanded into shipping, healthcare, insurance, and banking â€” building trusted partnerships with global enterprises.",
  },
  {
    year: "Today",
    title: "Industry Leaders",
    text: "A trusted partner for organizations seeking to operate smarter, innovate faster, and adapt confidently in a connected world.",
  },
];

const valueImages = [
  "/about/integrity.png",         // Integrity
  "/about/innovation1.png",       // Innovation
  "/about/excellence.png",        // Excellence
  "/about/ownership.jpg",         // Ownership
  "/about/collaboration.jpg",     // Collaboration
  "/about/customer success.png",  // Customer Success
];

function ValuesPanel() {
  const [active, setActive] = useState(0);
  const activeValue = values[active];
  const num = String(active + 1).padStart(2, "0");

  const subLabels = [
    "Our guiding principle",
    "Our driving force",
    "Our standard",
    "Our commitment",
    "Our foundation",
    "Our north star",
  ];

  return (
    <div className="vp-root">
      <style>{`
        .vp-root {
          display: flex;
          gap: 0;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 4px 32px rgba(0,0,0,0.06);
          background: #FFFFFF;
          min-height: 480px;
        }

        /* Left nav */
        .vp-nav {
          flex: 0 0 42%;
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(0,0,0,0.07);
        }
        .vp-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 22px 32px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          cursor: pointer;
          background: transparent;
          border-left: 3px solid transparent;
          transition: background 0.18s ease, border-color 0.18s ease;
          text-align: left;
          width: 100%;
          outline: none;
          position: relative;
        }
        .vp-row:last-child {
          border-bottom: none;
        }
        .vp-row:hover {
          background: rgba(198,232,74,0.06);
        }
        .vp-row:focus-visible {
          box-shadow: inset 0 0 0 2px var(--ab-accent);
        }
        .vp-row.active {
          border-left-color: #C6E84A;
          background: rgba(198,232,74,0.07);
        }
        .vp-row-num {
          font-size: 11px;
          font-weight: 700;
          color: #9AA8BF;
          letter-spacing: 1.5px;
          font-family: var(--font-geist-mono), monospace;
          flex-shrink: 0;
          width: 24px;
          transition: color 0.18s ease;
        }
        .vp-row.active .vp-row-num {
          color: #C6E84A;
        }
        .vp-row-name {
          flex: 1;
          font-size: 15px;
          font-weight: 600;
          color: #6B7A99;
          font-family: var(--font-geist-sans), sans-serif;
          transition: color 0.18s ease;
          letter-spacing: -0.01em;
        }
        .vp-row.active .vp-row-name {
          color: #0B1225;
          font-weight: 700;
        }
        .vp-row-arrow {
          font-size: 14px;
          color: #CBD5E1;
          flex-shrink: 0;
          transition: color 0.18s ease, transform 0.18s ease;
        }
        .vp-row.active .vp-row-arrow,
        .vp-row:hover .vp-row-arrow {
          color: #C6E84A;
          transform: translate(2px, -2px);
        }

        /* Right detail panel */
        .vp-panel {
          flex: 1;
          position: relative;
          padding: 48px 52px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 480px;
          background: #0B1225;
        }
        .vp-panel-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          opacity: 0;
          transition: opacity 0.45s ease;
          z-index: 0;
        }
        .vp-panel-img.visible {
          opacity: 1;
        }
        .vp-panel-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(7, 12, 24, 0.80) 0%,
            rgba(7, 12, 24, 0.60) 60%,
            rgba(7, 12, 24, 0.50) 100%
          );
          z-index: 1;
          pointer-events: none;
        }
        .vp-bg-num {
          position: absolute;
          top: -24px;
          right: -12px;
          font-size: clamp(120px, 18vw, 200px);
          font-family: var(--font-syne), sans-serif;
          font-weight: 800;
          color: rgba(198,232,74,0.12);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.04em;
          transition: opacity 0.3s ease;
        }
        .vp-accent-line {
          width: 36px;
          height: 3px;
          background: #C6E84A;
          border-radius: 2px;
          margin-bottom: 28px;
          flex-shrink: 0;
        }
        .vp-sub-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(198,232,74,0.7);
          font-family: var(--font-geist-mono), monospace;
          margin-bottom: 12px;
        }
        .vp-title {
          font-size: clamp(28px, 4vw, 42px);
          font-family: var(--font-syne), sans-serif;
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
        }
        .vp-desc {
          font-size: 17px;
          font-family: var(--font-geist-sans), sans-serif;
          color: rgba(200, 214, 235, 0.88);
          line-height: 1.75;
          max-width: 380px;
        }
        .vp-content {
          position: relative;
          z-index: 2;
          transition: opacity 0.22s ease;
        }
        .vp-content.fade {
          opacity: 0;
        }
        .vp-bg-num {
          color: rgba(198,232,74,0.10);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .vp-root {
            flex-direction: column;
            min-height: unset;
          }
          .vp-nav {
            flex: unset;
            border-right: none;
            border-bottom: 1px solid rgba(0,0,0,0.07);
          }
          .vp-row {
            padding: 18px 24px;
          }
          .vp-panel {
            padding: 36px 28px;
            min-height: 320px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .vp-row,
          .vp-row-num,
          .vp-row-name,
          .vp-row-arrow,
          .vp-content {
            transition: none !important;
          }
        }
      `}</style>

      {/* Left — editorial navigation */}
      <nav className="vp-nav" aria-label="Our Values navigation">
        {values.map((v, i) => {
          const n = String(i + 1).padStart(2, "0");
          return (
            <button
              key={v.title}
              className={`vp-row${active === i ? " active" : ""}`}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-pressed={active === i}
              aria-label={`${n} ${v.title}`}
            >
              <span className="vp-row-num">{n}</span>
              <span className="vp-row-name">{v.title}</span>
              <span className="vp-row-arrow" aria-hidden="true">↗</span>
            </button>
          );
        })}
      </nav>

      {/* Right — active value detail panel with background image */}
      <div className="vp-panel" aria-live="polite" aria-atomic="true">
        {/* Background images — one per value, crossfade via opacity */}
        {valueImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            className={`vp-panel-img${active === i ? " visible" : ""}`}
          />
        ))}
        {/* Dark overlay for text legibility */}
        <div className="vp-panel-overlay" aria-hidden="true" />
        <div className="vp-bg-num" aria-hidden="true">{num}</div>
        <div className="vp-content">
          <div className="vp-accent-line" />
          <div className="vp-sub-label">{subLabels[active]}</div>
          <div className="vp-title">{activeValue.title}</div>
          <p className="vp-desc">{activeValue.description}</p>
        </div>
      </div>
    </div>
  );
}

function MissionCollage() {
  const [offsets, setOffsets] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    // Check prefers-reduced-motion using window matchMedia
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Subtly scale the parallax effect
    setOffsets({
      x: x * 20, // max 10px shift
      y: y * 20,
    });
  };

  const handleMouseLeave = () => {
    setOffsets({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "570px",
        height: "440px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Decorative ambient lime glow behind the collage */}
      <div style={{
        position: "absolute",
        width: "250px",
        height: "250px",
        borderRadius: "50%",
        background: "rgba(77, 124, 15, 0.08)",
        filter: "blur(50px)",
        zIndex: 0,
        pointerEvents: "none",
      }} />

      {/* Decorative dots / grid decoration */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "5%",
        width: "60px",
        height: "60px",
        backgroundImage: "radial-gradient(circle, rgba(77, 124, 15, 0.25) 1px, transparent 1px)",
        backgroundSize: "10px 10px",
        zIndex: 1,
        pointerEvents: "none",
      }} />

      {/* 1. Large Primary Image */}
      <div style={{
        width: "62%",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.05)",
        zIndex: 2,
        transform: `translate(${offsets.x * 0.4}px, ${offsets.y * 0.4}px)`,
        transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
        position: "relative",
        border: "1px solid rgba(77, 124, 15, 0.08)",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(77, 124, 15, 0.05) 0%, transparent 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }} />
        <img
          src="/about/Transforming Complexity into Competitive Advantage2.png"
          alt="Advanced technological enterprise operations"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </div>

      {/* 2. Smaller floating image near top right */}
      <div style={{
        position: "absolute",
        width: "42%",
        top: "5%",
        right: "2%",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 16px 36px rgba(0, 0, 0, 0.16)",
        zIndex: 3,
        transform: `translate(${offsets.x * 0.8}px, ${offsets.y * 0.8}px)`,
        transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
        border: "1px solid rgba(77, 124, 15, 0.12)",
      }}>
        <img
          src="/about/Transforming Complexity into Competitive Advantage1.png"
          alt="Intelligent business transformation workflow"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </div>

      {/* 3. Smaller floating image near bottom left */}
      <div style={{
        position: "absolute",
        width: "42%",
        bottom: "5%",
        left: "2%",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 16px 36px rgba(0, 0, 0, 0.16)",
        zIndex: 4,
        transform: `translate(${offsets.x * 1.2}px, ${offsets.y * 1.2}px)`,
        transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
        border: "1px solid rgba(77, 124, 15, 0.12)",
      }}>
        <img
          src="/about/Transforming Complexity into Competitive Advantage3.png"
          alt="Analytics and automated digital solution execution"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const opTrackRef = useRef<HTMLDivElement>(null);
  const [opVisible, setOpVisible] = useState(4);
  const [opPage, setOpPage] = useState(0);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 768) setOpVisible(1);
      else if (w < 1024) setOpVisible(2);
      else setOpVisible(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const opMaxPage = Math.ceil(operatingPrinciples.length / opVisible) - 1;
  const canScrollLeft = opPage > 0;
  const canScrollRight = opPage < opMaxPage;

  const scrollOp = (p: number) => {
    const track = opTrackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(opMaxPage, p));
    const card = track.children[0] as HTMLElement | undefined;
    if (!card) return;
    const cardW = card.offsetWidth;
    const gap = 20;
    track.scrollTo({ left: clamped * (cardW + gap) * opVisible, behavior: "smooth" });
    setOpPage(clamped);
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const conditions = context.conditions as { reduceMotion?: boolean } | undefined;
        const reduceMotion = conditions?.reduceMotion ?? false;

        // â”€â”€ Hero text reveal â”€â”€
        const heroLines = heroTextRef.current?.querySelectorAll(".hero-line");
        if (heroLines?.length) {
          gsap.set(heroLines, { clipPath: "inset(0 0 100% 0)", yPercent: 30 });
          gsap.to(heroLines, {
            clipPath: "inset(0 0 0% 0)",
            yPercent: 0,
            duration: reduceMotion ? 0 : 1.2,
            ease: "power3.out",
            stagger: 0.15,
            delay: reduceMotion ? 0 : 0.3,
          });
        }

        // â”€â”€ Hero badge + subtitle fade in â”€â”€
        const heroBadge = containerRef.current?.querySelector(".hero-badge");
        const heroSub = containerRef.current?.querySelector(".hero-sub");
        if (heroBadge) {
          gsap.fromTo(heroBadge,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: reduceMotion ? 0 : 0.8, ease: "power2.out", delay: reduceMotion ? 0 : 0.1 }
          );
        }
        if (heroSub) {
          gsap.fromTo(heroSub,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: reduceMotion ? 0 : 0.8, ease: "power2.out", delay: reduceMotion ? 0 : 0.9 }
          );
        }

        // â”€â”€ Section reveals (scroll-triggered) â”€â”€
        const sections = containerRef.current?.querySelectorAll(".reveal-section");
        sections?.forEach((section) => {
          const children = section.querySelectorAll(".reveal-child");
          gsap.set(children, { autoAlpha: 0, y: 40 });
          ScrollTrigger.create({
            trigger: section,
            start: "top 80%",
            once: true,
            onEnter: () => {
              gsap.to(children, {
                autoAlpha: 1,
                y: 0,
                duration: reduceMotion ? 0 : 0.8,
                ease: "power2.out",
                stagger: reduceMotion ? 0 : 0.12,
              });
            },
          });
        });

        // â”€â”€ Stats counter â”€â”€
        const statEls = statsRef.current?.querySelectorAll(".stat-number");
        statEls?.forEach((el) => {
          const target = parseInt(el.getAttribute("data-target") || "0", 10);
          const suffix = el.getAttribute("data-suffix") || "";
          const obj = { val: 0 };
          ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.to(obj, {
                val: target,
                duration: reduceMotion ? 0 : 2,
                ease: "power2.out",
                onUpdate: () => {
                  el.textContent = Math.round(obj.val) + suffix;
                },
              });
            },
          });
        });

        // â”€â”€ Value cards stagger â”€â”€
        const valueCards = containerRef.current?.querySelectorAll(".value-card");
        if (valueCards?.length) {
          gsap.set(valueCards, { autoAlpha: 0, y: 60 });
          ScrollTrigger.create({
            trigger: valueCards[0],
            start: "top 80%",
            once: true,
            onEnter: () => {
              gsap.to(valueCards, {
                autoAlpha: 1,
                y: 0,
                duration: reduceMotion ? 0 : 0.8,
                ease: "power2.out",
                stagger: reduceMotion ? 0 : 0.15,
              });
            },
          });
        }

        // â”€â”€ Timeline line draw â”€â”€
        const timelineLine = containerRef.current?.querySelector(".timeline-line-fill");
        if (timelineLine) {
          gsap.set(timelineLine, { scaleY: 0, transformOrigin: "top" });
          ScrollTrigger.create({
            trigger: timelineLine,
            start: "top 70%",
            end: "bottom 50%",
            scrub: 1,
            onUpdate: (self) => {
              gsap.set(timelineLine, { scaleY: self.progress });
            },
          });
        }

        // â”€â”€ Timeline items stagger â”€â”€
        const tlItems = containerRef.current?.querySelectorAll(".timeline-item");
        if (tlItems?.length) {
          gsap.set(tlItems, { autoAlpha: 0, y: -30 });
          tlItems.forEach((item, i) => {
            ScrollTrigger.create({
              trigger: item,
              start: "top 80%",
              once: true,
              onEnter: () => {
                gsap.to(item, {
                  autoAlpha: 1,
                  y: 0,
                  duration: reduceMotion ? 0 : 0.7,
                  ease: "power2.out",
                  delay: reduceMotion ? 0 : i * 0.2,
                });
              },
            });
          });
        }

        // â”€â”€ CTA glow pulse (only if not reduced motion) â”€â”€
        if (!reduceMotion) {
          const ctaGlow = containerRef.current?.querySelector(".cta-orb");
          if (ctaGlow) {
            gsap.to(ctaGlow, {
              scale: 1.15,
              opacity: 0.18,
              duration: 3,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            });
          }
        }
      }
    );

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, { scope: containerRef });

  return (
    <>
      <style>{`
        :root {
          --ab-base: #0c1222;
          --ab-surface-1: #111827;
          --ab-surface-2: #1a1f3a;
          --ab-surface-3: #232b45;
          --ab-text-primary: #f1f5f9;
          --ab-text-secondary: #cbd5e1;
          --ab-text-muted: #94a3b8;
          --ab-accent: #C6E84A;
          --ab-accent-dim: rgba(198, 232, 74, 0.12);
          --ab-glow: 0 0 20px rgba(198, 232, 74, 0.15);
          --ab-glow-strong: 0 0 60px rgba(198, 232, 74, 0.2);
          --ab-border: rgba(255, 255, 255, 0.06);
          --ab-border-hover: rgba(255, 255, 255, 0.12);
          --ab-glass: rgba(255, 255, 255, 0.03);
          --ab-glass-border: rgba(255, 255, 255, 0.06);
        }

        /* ── Light theme section ── */
        .ab-section-light {
          --ab-base: #f8f9fc;
          --ab-surface-1: #f0f2f7;
          --ab-surface-2: #ffffff;
          --ab-surface-3: #e8ebf2;
          --ab-text-primary: #0f172a;
          --ab-text-secondary: #334155;
          --ab-text-muted: #64748b;
          --ab-accent: #4d7c0f;
          --ab-accent-dim: rgba(77, 124, 15, 0.1);
          --ab-glow: 0 4px 24px rgba(77, 124, 15, 0.08);
          --ab-glow-strong: 0 8px 40px rgba(77, 124, 15, 0.12);
          --ab-border: rgba(15, 23, 42, 0.08);
          --ab-border-hover: rgba(15, 23, 42, 0.14);
          --ab-glass: rgba(255, 255, 255, 0.7);
          --ab-glass-border: rgba(15, 23, 42, 0.08);
          background: #f8f9fc !important;
        }
        .ab-section-light .ab-glass {
          background: rgba(255,255,255,0.7);
          border-color: rgba(15,23,42,0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .ab-section-light .ab-glass:hover {
          background: rgba(255,255,255,0.85);
          border-color: rgba(15,23,42,0.14);
          box-shadow: 0 8px 32px rgba(0,0,0,0.06);
        }
        .ab-section-light .ab-stat-card {
          background: #ffffff;
          border-color: rgba(15,23,42,0.08);
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .ab-section-light .ab-stat-card:hover {
          border-color: rgba(77,124,15,0.25);
          box-shadow: 0 8px 24px rgba(77,124,15,0.08);
        }
        .ab-section-light .val-card {
          background: #ffffff;
          border-color: rgba(15,23,42,0.08);
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .ab-section-light .val-card:hover {
          border-color: rgba(77,124,15,0.2);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
        }
        .ab-section-light .val-card-num {
          -webkit-text-stroke-color: rgba(77,124,15,0.1);
        }
        .ab-section-light .val-card:hover .val-card-num {
          -webkit-text-stroke-color: rgba(77,124,15,0.2);
        }
        .ab-section-light .val-card-icon {
          background: rgba(77,124,15,0.08);
          border-color: rgba(77,124,15,0.15);
        }
        .ab-section-light .val-card:hover .val-card-icon {
          background: rgba(77,124,15,0.15);
          border-color: rgba(77,124,15,0.3);
          box-shadow: 0 0 16px rgba(77,124,15,0.12);
        }
        .ab-section-light .val-card-line {
          background: #4d7c0f;
        }
        .ab-section-light .eyebrow-badge {
          background: rgba(77,124,15,0.08) !important;
          border-color: rgba(77,124,15,0.18) !important;
          color: #4d7c0f !important;
        }
        .ab-section-light .timeline-line {
          background: rgba(15,23,42,0.1);
        }
        .ab-section-light .timeline-line-fill {
          background: linear-gradient(180deg, #4d7c0f, rgba(77,124,15,0.15));
        }
        .ab-section-light .timeline-dot {
          background: #f8f9fc;
          border-color: #4d7c0f;
          box-shadow: 0 0 12px rgba(77,124,15,0.25);
        }
        .ab-section-light .ab-section-border-top,
        .ab-section-light.ab-section-border-top {
          border-top-color: rgba(15,23,42,0.08);
        }

        /* ── Light sections: lime accent override (light bg preserved) ── */
        .ab-lime-accent {
          --ab-accent: #C6E84A;
        }
        .ab-lime-accent .ab-stat-card:hover {
          border-color: rgba(198,232,74,0.3);
          box-shadow: 0 8px 24px rgba(198,232,74,0.12);
        }
        .ab-lime-accent .val-card:hover {
          border-color: rgba(198,232,74,0.2);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
        }
        .ab-lime-accent .val-card-num {
          -webkit-text-stroke-color: rgba(198,232,74,0.1);
        }
        .ab-lime-accent .val-card:hover .val-card-num {
          -webkit-text-stroke-color: rgba(198,232,74,0.2);
        }
        .ab-lime-accent .val-card-icon {
          background: rgba(198,232,74,0.08);
          border-color: rgba(198,232,74,0.15);
        }
        .ab-lime-accent .val-card:hover .val-card-icon {
          background: rgba(198,232,74,0.15);
          border-color: rgba(198,232,74,0.3);
          box-shadow: 0 0 16px rgba(198,232,74,0.12);
        }
        .ab-lime-accent .val-card-line {
          background: #C6E84A;
        }
        .ab-lime-accent .timeline-line-fill {
          background: linear-gradient(180deg, #C6E84A, rgba(198,232,74,0.15));
        }
        .ab-lime-accent .timeline-dot {
          background: #f8f9fc;
          border-color: #C6E84A;
          box-shadow: 0 0 12px rgba(198,232,74,0.3);
        }
        .ab-lime-accent .eyebrow-badge {
          background: #C6E84A !important;
          border-color: #C6E84A !important;
          color: #0f172a !important;
        }

        /* â”€â”€ Grid texture overlay â”€â”€ */
        .ab-grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 80%);
        }

        /* â”€â”€ Hero â”€â”€ */
        .ab-hero {
          position: relative;
          background: var(--ab-base);
          padding: 120px 0 100px;
          overflow: hidden;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
        .ab-hero-orb {
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(198,232,74,0.06) 0%, transparent 60%);
          pointer-events: none;
          border-radius: 50%;
        }
        .ab-hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: right center;
          z-index: 0;
        }
        .ab-hero-scrim {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(90deg, var(--ab-base) 0%, rgba(10, 22, 40, 0.55) 55%, rgba(10, 22, 40, 0.28) 100%);
          pointer-events: none;
        }
        .ab-hero-orb, .ab-hero-orb-2, .orbit-ring { z-index: 0; }
        .ab-hero-orb-2 {
          position: absolute;
          bottom: -20%;
          right: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(198,232,74,0.04) 0%, transparent 60%);
          pointer-events: none;
          border-radius: 50%;
        }
        .orbit-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border: 1px solid rgba(198, 232, 74, 0.12);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .orbit-ring.r1 { width: 500px; height: 500px; animation: spin 40s linear infinite; }
        .orbit-ring.r2 { width: 750px; height: 750px; animation: spin 60s linear infinite reverse; }
        .orbit-ring.r3 { width: 1000px; height: 1000px; animation: spin 80s linear infinite; }
        .orbit-ring .orb {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #C6E84A;
          box-shadow: 0 0 12px 2px rgba(198, 232, 74, 0.7);
          top: -3px;
          left: 50%;
        }
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @media (max-width: 768px) {
          .orbit-ring.r1 { width: 280px; height: 280px; }
          .orbit-ring.r2 { width: 420px; height: 420px; }
          .orbit-ring.r3 { width: 560px; height: 560px; }
        }

        /* â”€â”€ Section wrapper â”€â”€ */
        .ab-section {
          position: relative;
          padding: 120px 48px;
        }
        .ab-section-dark { background: var(--ab-base); }
        .ab-section-darker { background: var(--ab-surface-1); }
        .ab-section-light { background: #f8f9fc; }
        .ab-section-border-top {
          border-top: 1px solid var(--ab-border);
        }

        /* â”€â”€ Glass card â”€â”€ */
        .ab-glass {
          background: var(--ab-glass);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--ab-glass-border);
          border-radius: 20px;
          transition: border-color 0.4s ease, background 0.4s ease, box-shadow 0.4s ease;
        }
        .ab-glass:hover {
          border-color: var(--ab-border-hover);
          background: rgba(255,255,255,0.05);
          box-shadow: var(--ab-glow);
        }

        /* â”€â”€ Stat card â”€â”€ */
        .ab-stat-card {
          background: var(--ab-surface-2);
          border: 1px solid var(--ab-border);
          border-radius: 20px;
          padding: 48px 32px;
          text-align: center;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .ab-stat-card:hover {
          border-color: rgba(198,232,74,0.2);
          box-shadow: var(--ab-glow);
        }

        /* â”€â”€ Value card â”€â”€ */
        .value-card {
          background: var(--ab-surface-2);
          border: 1px solid var(--ab-border);
          border-radius: 20px;
          overflow: hidden;
          transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .value-card:hover {
          border-color: rgba(198,232,74,0.15);
          box-shadow: var(--ab-glow);
          transform: translateY(-6px);
        }
        .value-card-img {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .value-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .value-card:hover .value-card-img img {
          transform: scale(1.08);
        }
        .value-card-img::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60%;
          background: linear-gradient(0deg, var(--ab-surface-2) 0%, transparent 100%);
          pointer-events: none;
        }
        .value-card--wide {
          display: flex;
          align-items: stretch;
        }
        .value-card--wide .value-card-img {
          width: 50%;
          height: auto;
          min-height: 300px;
          flex-shrink: 0;
        }
        .value-card--wide .value-card-img::after {
          width: 30%;
          height: 100%;
          left: auto;
          right: 0;
          bottom: 0;
          top: 0;
          background: linear-gradient(270deg, var(--ab-surface-2) 0%, transparent 100%);
        }
        .value-card-body {
          padding: 32px 36px 36px;
        }
        .value-card--wide .value-card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px;
        }

        /* â”€â”€ Timeline â”€â”€ */
        .timeline-wrapper {
          position: relative;
          padding-left: 32px;
        }
        .timeline-line {
          position: absolute;
          top: 0;
          left: 15px;
          width: 2px;
          height: 100%;
          background: var(--ab-border);
        }
        .timeline-line-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, var(--ab-accent), rgba(198,232,74,0.1));
        }
        .timeline-item {
          position: relative;
          margin-bottom: 56px;
        }
        .timeline-item:last-child { margin-bottom: 0; }
        .timeline-dot {
          position: absolute;
          top: 8px;
          left: -24px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--ab-surface-1);
          border: 2px solid var(--ab-accent);
          box-shadow: 0 0 12px rgba(198,232,74,0.3);
          z-index: 1;
        }

        /* â”€â”€ Values grid â”€â”€ */
        .ab-values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        /* â”€â”€ Value card new â”€â”€ */
        .val-card {
          position: relative;
          background: var(--ab-surface-2);
          border: 1px solid var(--ab-border);
          border-radius: 20px;
          overflow: hidden;
          transition: border-color 0.4s ease, box-shadow 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .val-card:hover {
          border-color: rgba(198,232,74,0.18);
          box-shadow: 0 0 40px rgba(198,232,74,0.08), 0 20px 60px rgba(0,0,0,0.3);
          transform: translateY(-6px);
        }
        .val-card-inner {
          position: relative;
          z-index: 2;
          padding: 40px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .val-card--hero .val-card-inner {
          padding: 48px;
        }
        .val-card--wide .val-card-inner {
          flex-direction: row;
          align-items: center;
          gap: 48px;
          padding: 0;
        }

        .val-card-num {
          font-size: clamp(56px, 6vw, 80px);
          font-family: "var(--font-syne), sans-serif";
          font-weight: 800;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(198,232,74,0.15);
          line-height: 1;
          position: absolute;
          top: 28px;
          right: 32px;
          pointer-events: none;
          user-select: none;
          z-index: 1;
          transition: -webkit-text-stroke-color 0.4s ease;
        }
        .val-card:hover .val-card-num {
          -webkit-text-stroke-color: rgba(198,232,74,0.3);
        }

        .val-card-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: rgba(198,232,74,0.08);
          border: 1px solid rgba(198,232,74,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ab-accent);
          margin-bottom: 28px;
          position: relative;
          z-index: 2;
          transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .val-card:hover .val-card-icon {
          background: rgba(198,232,74,0.15);
          border-color: rgba(198,232,74,0.25);
          box-shadow: 0 0 20px rgba(198,232,74,0.15);
        }

        .val-card-title {
          font-size: clamp(20px, 2.5vw, 24px);
          font-family: "var(--font-syne), sans-serif";
          font-weight: 700;
          color: var(--ab-text-primary);
          line-height: 1.25;
          margin-bottom: 14px;
          position: relative;
          z-index: 2;
        }

        .val-card-desc {
          font-size: 15px;
          font-family: "var(--font-geist-sans), sans-serif";
          color: var(--ab-text-muted);
          line-height: 1.75;
          margin: 0;
          position: relative;
          z-index: 2;
          flex: 1;
        }

        .val-card-line {
          width: 40px;
          height: 2px;
          background: var(--ab-accent);
          border-radius: 1px;
          margin-top: 24px;
          position: relative;
          z-index: 2;
          transition: width 0.4s ease;
        }
        .val-card:hover .val-card-line {
          width: 64px;
        }

        /* Hero card bg image */
        .val-card-hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .val-card-hero-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.12;
          transition: opacity 0.5s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .val-card:hover .val-card-hero-bg img {
          opacity: 0.18;
          transform: scale(1.04);
        }
        .val-card-hero-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--ab-surface-2) 40%, rgba(26,31,58,0.85) 100%);
        }

        /* ── Operating principle cards (photo carousel, like Industries) ── */
        .ab-op-track {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-behavior: smooth;
          padding-bottom: 4px;
        }
        .ab-op-track::-webkit-scrollbar { display: none; }
        .op-card {
          position: relative;
          flex: 0 0 calc((100% - 60px) / 4);
          align-self: flex-start;
          aspect-ratio: 4 / 5;
          border-radius: 18px;
          overflow: hidden;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .op-card:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 32px rgba(0,0,0,0.45);
        }
        @media (max-width: 1023px) {
          .op-card {
            flex: 0 0 calc((100% - 20px) / 2);
          }
        }
        @media (max-width: 639px) {
          .op-card {
            flex: 0 0 100%;
          }
        }
        .op-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: filter 0.3s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .op-card:hover .op-card-img {
          filter: brightness(1.1);
          transform: scale(1.04);
        }
        .op-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 42%, rgba(0,0,0,0.78) 100%);
          pointer-events: none;
        }
        .op-card-body {
          position: absolute;
          inset: 0;
          z-index: 1;
          padding: 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .op-card-title {
          font-family: "var(--font-syne), sans-serif";
          font-weight: 700;
          font-size: 22px;
          color: #FFFFFF;
          line-height: 1.3;
          margin-top: 8px;
          text-shadow: 0 1px 4px rgba(0,0,0,0.4);
        }
        .op-card-desc {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.85);
          line-height: 1.7;
          margin: 0;
          text-shadow: 0 1px 3px rgba(0,0,0,0.5);
        }
        @media (max-width: 768px) {
          .op-card-body {
            padding: 24px;
          }
        }
        .ab-op-arrows {
          display: flex;
          gap: 12px;
          margin-top: 32px;
          justify-content: flex-end;
        }
        .ab-op-arrow-btn {
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
        .ab-op-arrow-btn:hover:not(:disabled) {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.4);
        }
        .ab-op-arrow-btn:disabled {
          opacity: 0.25;
          cursor: default;
        }

        /* Wide card image */
        .val-card-wide-img {
          width: 45%;
          min-height: 280px;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }
        .val-card-wide-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .val-card:hover .val-card-wide-img img {
          transform: scale(1.06);
        }
        .val-card-wide-img::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 60%, var(--ab-surface-2) 100%);
        }
        .val-card-wide-body {
          flex: 1;
          padding: 40px 40px 40px 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* â”€â”€ CTA â”€â”€ */
        .ab-cta {
          position: relative;
          background: var(--ab-base);
          padding: 160px 48px;
          text-align: center;
          overflow: hidden;
        }
        .cta-orb {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(198,232,74,0.1) 0%, transparent 60%);
          pointer-events: none;
          border-radius: 50%;
        }

        @media (max-width: 1024px) {
          .ab-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .ab-values-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .ab-hero { padding: 120px 0 80px; min-height: auto; }
          .ab-section { padding: 80px 24px; }
          .ab-cta { padding: 80px 24px; }
          .ab-story-grid { flex-direction: column !important; gap: 48px !important; }
          .ab-stats-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .ab-values-grid {
            grid-template-columns: 1fr !important;
          }
          .val-card--wide .val-card-inner {
            flex-direction: column;
            padding: 0;
          }
          .val-card-wide-img {
            width: 100%;
            min-height: 200px;
          }
          .val-card-wide-img::after {
            background: linear-gradient(0deg, var(--ab-surface-2) 0%, transparent 60%);
          }
          .val-card-wide-body {
            padding: 28px 32px 32px;
          }
        }
        @media (max-width: 480px) {
          .ab-stats-grid {
            grid-template-columns: 1fr !important;
          }
          .val-card-num {
            font-size: 48px;
            top: 20px;
            right: 20px;
          }
          .val-card-inner,
          .val-card--hero .val-card-inner {
            padding: 28px;
          }
        }
      `}</style>

      <div ref={containerRef}>
        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            HERO
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="ab-hero">
          <div className="ab-grid-overlay" />
          <video className="ab-hero-video" src="/about/about us.mp4" autoPlay muted loop playsInline />
          <div className="ab-hero-scrim" />
          <div className="ab-hero-orb" />
          <div className="ab-hero-orb-2" />
          <div className="orbit-ring r1"><div className="orb" /></div>
          <div className="orbit-ring r2"><div className="orb" /></div>
          <div className="orbit-ring r3" />

          <div style={{ maxWidth: "900px", margin: 0, textAlign: "left", position: "relative", zIndex: 2, paddingLeft: "clamp(16px, 2vw, 32px)", paddingRight: 0 }}>
            <div className="hero-badge" style={{ marginBottom: "16px" }}>
              <span className="eyebrow-badge">About Sytrion</span>
            </div>

            <div ref={heroTextRef}>
              <h1 className="heading-display" style={{
                fontSize: "clamp(42px, 7vw, 80px)",
                fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 700,
                lineHeight: 1.15,
                color: "var(--ab-text-primary)",
                margin: 0,
              }}>
                <div className="hero-line" style={{ overflow: "hidden" }}>
                  Engineering intelligent
                </div>
                <div className="hero-line" style={{ overflow: "hidden" }}>
                  operations for a
                </div>
                <div className="hero-line" style={{ overflow: "hidden" }}>
                  <span style={{ color: "var(--ab-accent)" }}>smarter world.</span> 
                </div>
              </h1>
            </div>

            <p className="hero-sub" style={{
              fontSize: "18px",
              fontFamily: "var(--font-geist-sans), sans-serif",
              color: "var(--ab-text-muted)",
              lineHeight: 1.7,
              maxWidth: "100%",
              margin: "24px 0 0",
            }}>
              We combine intelligent technologies with operational excellence to
              simplify complexity, improve productivity, and create sustainable
              business value across industries.
            </p>
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            STORY + TIMELINE
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="ab-section ab-section-light ab-lime-accent ab-section-border-top">
          <div className="reveal-section ab-story-grid" style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", gap: "80px", alignItems: "flex-start" }}>
            {/* Left â€” Text */}
            <div className="reveal-child" style={{ flex: 1 }}>
              <span className="eyebrow-badge">Our story</span>

              <h2 className="heading-display" style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 700,
                color: "var(--ab-text-primary)",
                marginBottom: "28px",
              }}>
                From vision to{" "}
                <span style={{ color: "var(--ab-accent)" }}>impact</span>.
              </h2>

              <div style={{ width: "40px", height: "2px", background: "var(--ab-accent)", borderRadius: "1px", marginBottom: "28px" }} />

              <p style={{
                fontSize: "17px",
                fontFamily: "var(--font-geist-sans), sans-serif",
                color: "var(--ab-text-secondary)",
                lineHeight: 1.75,
                marginBottom: "20px",
                maxWidth: "480px",
                textAlign: "justify",
              }}>
                Technology has the power to redefine industries, but only when it
                solves real business challenges.
              </p>

              <p style={{
                fontSize: "15px",
                fontFamily: "var(--font-geist-sans), sans-serif",
                color: "var(--ab-text-muted)",
                lineHeight: 1.8,
                marginBottom: "16px",
                maxWidth: "480px",
                textAlign: "justify",
              }}>
                &emsp;Sytrion Data Labs was founded with a clear mission to help
                organizations harness the power of AI, data intelligence, and
                operational excellence to build stronger, more resilient businesses.
              </p>

              <p style={{
                fontSize: "15px",
                fontFamily: "var(--font-geist-sans), sans-serif",
                color: "var(--ab-text-muted)",
                lineHeight: 1.8,
                marginBottom: "16px",
                maxWidth: "480px",
                textAlign: "justify",
              }}>
                &emsp;What began as a vision to bridge the gap between technology and
                business outcomes has grown into a trusted partnership with
                enterprises across shipping, healthcare, insurance, banking, and more.
              </p>

              <p style={{
                fontSize: "15px",
                fontFamily: "var(--font-geist-sans), sans-serif",
                color: "var(--ab-text-muted)",
                lineHeight: 1.8,
                maxWidth: "480px",
              }}>
                &emsp;Our purpose extends beyond business transformation. We aspire to
                create opportunities, empower people, and contribute to building a
                more connected and intelligent future.
              </p>
            </div>

            {/* Right â€” Timeline */}
            <div className="reveal-child" style={{ flex: 1 }}>
              <div className="ab-glass" style={{ padding: "48px" }}>
                <div className="timeline-wrapper">
                  <div className="timeline-line">
                    <div className="timeline-line-fill" />
                  </div>
                  {timeline.map((item) => (
                    <div key={item.year} className="timeline-item">
                      <div className="timeline-dot" />
                      <div style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "var(--ab-accent)",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        marginBottom: "6px",
                      }}>
                        {item.year}
                      </div>
                      <div style={{
                        fontSize: "18px",
                        fontFamily: "var(--font-syne), sans-serif",
                        fontWeight: 700,
                        color: "var(--ab-text-primary)",
                        marginBottom: "8px",
                      }}>
                        {item.title}
                      </div>
                      <div style={{
                        fontSize: "15px",
                        fontFamily: "var(--font-geist-sans), sans-serif",
                        color: "var(--ab-text-muted)",
                        lineHeight: 1.7,
                      }}>
                        {item.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            VISION
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="ab-section ab-section-dark ab-section-border-top" style={{ background: "#070C18", overflow: "hidden", position: "relative" }}>
          {/* Subtle tech grid, grain texture and blue ambient glow on the right */}
          <div className="ab-grid-overlay" style={{ opacity: 0.15 }} />
          <div style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            filter: "blur(120px)",
            pointerEvents: "none",
            zIndex: 1,
            background: "radial-gradient(circle, rgba(104, 217, 255, 0.08) 0%, rgba(46, 90, 172, 0.04) 50%, transparent 100%)",
            top: "10%",
            right: "-10%",
          }} />

          <div className="reveal-section" style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <div style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "60px",
              alignItems: "center",
            }}>
              {/* Left Column — Vision Content */}
              <div className="reveal-child" style={{
                flex: "1 1 500px",
                display: "flex",
                flexDirection: "row",
                gap: "24px",
                alignItems: "stretch",
              }}>
                {/* Left accent fade line */}
                <div style={{
                  width: "2px",
                  background: "linear-gradient(180deg, #C6E84A 0%, rgba(198, 232, 74, 0.3) 50%, transparent 100%)",
                  flexShrink: 0,
                  marginTop: "8px",
                  borderRadius: "2px",
                }} />

                <div style={{ flex: 1 }}>
                  {/* Vision Badge */}
                  <div style={{ marginBottom: "20px" }}>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "6px 14px",
                      borderRadius: "999px",
                      background: "rgba(7, 12, 24, 0.6)",
                      border: "1px solid rgba(198, 232, 74, 0.3)",
                      color: "#C6E84A",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}>
                      <span className="pulse-dot" style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#C6E84A",
                        boxShadow: "0 0 8px #C6E84A",
                      }} />
                      Our vision
                    </span>
                  </div>

                  {/* Header */}
                  <h2 className="heading-display" style={{
                    fontSize: "clamp(42px, 5vw, 68px)",
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 700,
                    lineHeight: "0.98",
                    letterSpacing: "-0.02em",
                    color: "#F4F7FB",
                    marginBottom: "24px",
                  }}>
                    Shaping the Future of<br />
                    <span style={{ color: "#C6E84A" }}>Intelligent</span><br />
                    <span style={{ color: "#C6E84A" }}>Operations</span>
                  </h2>

                  {/* Description */}
                  <p style={{
                    fontSize: "17px",
                    fontFamily: "var(--font-geist-sans), sans-serif",
                    color: "#9AA8BF",
                    lineHeight: "1.75",
                    maxWidth: "520px",
                    margin: "0 0 40px 0",
                  }}>
                    To become one of the world's most trusted Intelligent Operations partners,
                    enabling organizations to achieve sustainable growth through innovation,
                    operational excellence and technology-driven transformation.
                  </p>

                  {/* Supporting Metrics */}
                  <div style={{
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                    paddingTop: "28px",
                    display: "flex",
                    gap: "36px",
                    flexWrap: "wrap",
                  }}>
                    {[
                      { value: "01", label: "Purpose" },
                      { value: "24/7", label: "Intelligence" },
                      { value: "∞", label: "Possibility" },
                    ].map((metric) => (
                      <div key={metric.label}>
                        <div style={{
                          fontSize: metric.value === "∞" ? "34px" : "24px",
                          fontFamily: "var(--font-syne), sans-serif",
                          fontWeight: 700,
                          color: "#F4F7FB",
                          height: "38px",
                          lineHeight: "38px",
                        }}>{metric.value}</div>
                        <div style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#9AA8BF",
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                          fontFamily: "var(--font-geist-sans), sans-serif",
                        }}>{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column — Technology Image Collage with Overlapping Card */}
              <div className="reveal-child" style={{
                flex: "1 1 500px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}>
                {/* 3D Perspective Collage Frame */}
                <div className="collage-3d-frame" style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "540px",
                  height: "440px",
                  borderRadius: "26px",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  background: "rgba(11, 18, 32, 0.4)",
                  padding: "24px",
                  boxShadow: "0 24px 48px rgba(0, 0, 0, 0.4)",
                  transform: "perspective(1000px) rotateY(-4deg)",
                  overflow: "hidden",
                }}>
                  {/* Subtle scanning line animation */}
                  <div className="scan-line" style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "linear-gradient(90deg, transparent, #C6E84A, transparent)",
                    opacity: 0.25,
                    zIndex: 3,
                  }} />

                  {/* Collage Grid */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "60fr 40fr",
                    gridTemplateRows: "58fr 42fr",
                    gap: "14px",
                    width: "100%",
                    height: "100%",
                  }}>
                    {/* Image 1: Large top-left */}
                    <div className="collage-img-wrap" style={{
                      gridColumn: 1,
                      gridRow: 1,
                      minWidth: 0,
                      minHeight: 0,
                      borderRadius: "18px",
                      overflow: "hidden",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
                    }}>
                      <img
                        src="/about/aboutai.png"
                        alt="AI and operations analytics dashboard visualizing data intelligence"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          filter: "brightness(0.6) contrast(1.1) saturate(0.8)",
                          transition: "transform 0.4s ease, filter 0.4s ease",
                        }}
                      />
                    </div>

                    {/* Image 2: Small top-right */}
                    <div className="collage-img-wrap" style={{
                      gridColumn: 2,
                      gridRow: 1,
                      minWidth: 0,
                      minHeight: 0,
                      borderRadius: "18px",
                      overflow: "hidden",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                    }}>
                      <img
                        src="/shared/ai first thinking.jpg"
                        alt="Intelligent technological infrastructure"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          filter: "brightness(0.55) contrast(1.15) saturate(0.7)",
                          transition: "transform 0.4s ease, filter 0.4s ease",
                        }}
                      />
                    </div>

                    {/* Image 3: Small bottom-right */}
                    <div className="collage-img-wrap" style={{
                      gridColumn: 2,
                      gridRow: 2,
                      minWidth: 0,
                      minHeight: 0,
                      borderRadius: "18px",
                      overflow: "hidden",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                    }}>
                      <img
                        src="/shared/Data Engineering.webp"
                        alt="Data flow and system engineering operations"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          filter: "brightness(0.55) contrast(1.15) saturate(0.7)",
                          transition: "transform 0.4s ease, filter 0.4s ease",
                        }}
                      />
                    </div>

                    {/* Operations Intelligence Card occupying bottom-left cell */}
                    <div className="intelligence-floating-card" style={{
                      gridColumn: 1,
                      gridRow: 2,
                      minWidth: 0,
                      minHeight: 0,
                      height: "100%",
                      background: "rgba(11, 18, 32, 0.85)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "18px",
                      padding: "16px 18px",
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
                    }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "#9AA8BF", letterSpacing: "1px", textTransform: "uppercase" }}>Ops Intelligence</span>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "9px",
                        fontWeight: 800,
                        background: "rgba(198, 232, 74, 0.1)",
                        color: "#C6E84A",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        border: "1px solid rgba(198, 232, 74, 0.2)",
                      }}>
                        <span className="pulse-dot" style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#C6E84A" }} />
                        LIVE
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "baseline", gap: "2px", marginBottom: "4px" }}>
                      <span style={{ fontSize: "32px", fontWeight: 800, color: "#F4F7FB", fontFamily: "var(--font-syne), sans-serif", lineHeight: 1 }}>98.4</span>
                      <span style={{ fontSize: "18px", fontWeight: 700, color: "#C6E84A" }}>%</span>
                    </div>
                    <p style={{ fontSize: "11px", color: "#9AA8BF", margin: "0 0 10px 0", lineHeight: 1.3 }}>automated resolution rate</p>

                    {/* Micro Bar Chart */}
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "5px", height: "22px", paddingBottom: "2px" }}>
                      {[35, 50, 45, 60, 55, 75, 90, 85, 100].map((h, idx) => (
                        <div key={idx} className="chart-bar" style={{
                          flex: 1,
                          height: `${h}%`,
                          background: "#C6E84A",
                          borderRadius: "2px",
                          opacity: idx === 8 ? 1 : 0.45,
                          transition: "height 0.6s ease",
                        }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 0.5; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.15); }
            }
            .pulse-dot {
              animation: pulse 2s infinite ease-in-out;
            }
            @keyframes scan {
              0% { top: -2%; }
              50% { top: 102%; }
              100% { top: -2%; }
            }
            .scan-line {
              animation: scan 6s infinite linear;
            }
            .collage-img-wrap:hover img {
              transform: scale(1.04);
              filter: brightness(0.85) contrast(1.1) saturate(0.9) !important;
            }
            @media (prefers-reduced-motion: reduce) {
              .pulse-dot, .scan-line {
                animation: none !important;
              }
              .collage-3d-frame {
                transform: none !important;
              }
              .collage-img-wrap img {
                transition: none !important;
              }
            }
          `}</style>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            MISSION
            ──────────────────────────────────────────────────────────────────── */}
        <section className="ab-section ab-section-light ab-lime-accent ab-section-border-top" style={{ overflow: "hidden" }}>
          <div className="reveal-section" style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <div style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "60px",
              alignItems: "center",
            }}>
              {/* Left Column — Text */}
              <div className="reveal-child" style={{ flex: "1 1 500px" }}>
                <div style={{ marginBottom: "18px" }}>
                  <span className="eyebrow-badge">Our mission</span>
                </div>
                <h2 className="heading-display" style={{
                  fontSize: "clamp(32px, 5vw, 48px)",
                  fontFamily: "var(--font-syne), sans-serif",
                  fontWeight: 700,
                  color: "var(--ab-text-primary)",
                  marginBottom: "24px",
                  lineHeight: "1.15",
                }}>
                  Transforming Complexity into{" "}
                  <span style={{ color: "var(--ab-accent)" }}>Competitive Advantage</span>
                </h2>
                <p style={{
                  fontSize: "18px",
                  fontFamily: "var(--font-geist-sans), sans-serif",
                  color: "var(--ab-text-secondary)",
                  lineHeight: "1.75",
                  maxWidth: "540px",
                }}>
                  To empower businesses by delivering secure, scalable and intelligent
                  operational solutions that create measurable value for clients, employees
                  and society.
                </p>
              </div>

              {/* Right Column — Layered Image Collage with Mouse Parallax */}
              <div className="reveal-child" style={{
                flex: "1 1 500px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}>
                <MissionCollage />
              </div>
            </div>
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            VALUES
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="ab-section ab-section-light ab-lime-accent ab-section-border-top" style={{ overflow: "hidden" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

            {/* Header — left-aligned */}
            <div className="reveal-section" style={{ marginBottom: "64px" }}>
              <div className="reveal-child" style={{ marginBottom: "20px" }}>
                <span className="eyebrow-badge">Our values</span>
              </div>
              <h2 className="heading-display reveal-child" style={{
                fontSize: "clamp(32px, 5vw, 52px)",
                fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 700,
                color: "var(--ab-text-primary)",
                marginBottom: "16px",
                marginTop: "20px",
                lineHeight: 1.1,
              }}>
                What <span style={{ color: "var(--ab-accent)" }}>drives</span> us forward
              </h2>
              <p className="reveal-child" style={{
                fontSize: "17px",
                fontFamily: "var(--font-geist-sans), sans-serif",
                color: "var(--ab-text-muted)",
                lineHeight: 1.75,
                maxWidth: "560px",
              }}>
                Our core values shape every solution we build, every partnership we
                nurture, and every impact we create.
              </p>
            </div>

            {/* Interactive Values Interface */}
            <ValuesPanel />

          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            GLOBAL PRESENCE
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <GlobalPresence />

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            SECURITY FIRST
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="ab-section ab-section-dark ab-section-border-top ab-sec-combo">
          <div className="reveal-section" style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <div className="ab-sec-grid">
              <div className="reveal-child ab-sec-grid-text">
                <span className="eyebrow-badge">Security First</span>
                <h2 className="heading-display" style={{
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontFamily: "var(--font-syne), sans-serif",
                  fontWeight: 700,
                  color: "var(--ab-text-primary)",
                  marginTop: "16px",
                  marginBottom: "20px",
                }}>
                  Security is{" "}
                  <span style={{ color: "var(--ab-accent)" }}>embedded</span>, not bolted on
                </h2>
                <p style={{
                  fontSize: "16px",
                  fontFamily: "var(--font-geist-sans), sans-serif",
                  color: "var(--ab-text-muted)",
                  lineHeight: 1.75,
                }}>
                  Information security isn't an afterthought. It is embedded into every
                  process we build. Designed with global best practices and ISO 27001
                  readiness in mind.
                </p>
              </div>
              <div className="reveal-child ab-sec-grid-cards">
                {[
                  { title: "Data Protection", desc: "End-to-end encryption and access controls to safeguard sensitive information." },
                  { title: "Compliance Ready", desc: "Built to meet ISO 27001, GDPR, and industry-specific regulatory standards." },
                  { title: "Continuous Monitoring", desc: "24/7 threat detection, incident response, and regular security audits." },
                ].map((item) => (
                  <div key={item.title} className="ab-glass ab-sec-card">
                    <div className="ab-sec-card-icon">
                      <img
                        src={`/about/${item.title}.svg`}
                        alt={item.title}
                        width={24}
                        height={24}
                        style={{ objectFit: "contain", filter: "brightness(0) invert(74%) sepia(60%) saturate(500%) hue-rotate(18deg) brightness(1.1)" }}
                      />
                    </div>
                    <div className="ab-sec-card-title">{item.title}</div>
                    <p className="ab-sec-card-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="ab-scale-band">
              <div className="reveal-child" style={{ flex: 1 }}>
                <span className="eyebrow-badge">Scalable Engagement</span>
                <h2 className="heading-display" style={{
                  fontSize: "clamp(26px, 3.5vw, 36px)",
                  fontFamily: "var(--font-syne), sans-serif",
                  fontWeight: 700,
                  color: "var(--ab-text-primary)",
                  marginBottom: "16px",
                }}>
                  Solutions that scale with{" "}
                  <span style={{ color: "var(--ab-accent)" }}>your ambition</span>
                </h2>
                <p style={{
                  fontSize: "16px",
                  fontFamily: "var(--font-geist-sans), sans-serif",
                  color: "var(--ab-text-secondary)",
                  lineHeight: 1.75,
                  maxWidth: "100%",
                  marginBottom: 0,
                }}>
                  Whether supporting five professionals or five hundred, our solutions evolve
                  with our clients&apos; ambitions — growing as you grow.
                </p>
              </div>
              <div className="ab-scale-bars" aria-hidden="true">
                {[24, 38, 52, 72, 100].map((h, i) => (
                  <div
                    key={i}
                    className="ab-scale-bar"
                    style={{
                      height: `${h}px`,
                      background: i === 4 ? "var(--ab-accent)" : "rgba(198,232,74,0.16)",
                      boxShadow: i === 4 ? "var(--ab-glow)" : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <style>{`
            .ab-sec-grid {
              display: flex;
              gap: 60px;
              align-items: center;
            }
            .ab-sec-grid-text {
              flex: 0 0 38%;
            }
            .ab-sec-grid-cards {
              flex: 1;
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 16px;
            }
            .ab-sec-card {
              padding: 28px 24px;
              border-radius: 16px;
            }
            .ab-sec-card-icon {
              width: 40px;
              height: 40px;
              border-radius: 12px;
              background: rgba(198,232,74,0.1);
              border: 1px solid rgba(198,232,74,0.15);
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 18px;
            }
            .ab-sec-card-title {
              font-size: 16px;
              font-weight: 600;
              color: var(--ab-text-primary);
              font-family: var(--font-syne), sans-serif;
              margin-bottom: 8px;
            }
            .ab-sec-card-desc {
              font-size: 14px;
              font-family: var(--font-geist-sans), sans-serif;
              color: var(--ab-text-muted);
              line-height: 1.6;
              margin: 0;
            }
            .ab-scale-band {
              position: relative;
              margin-top: 72px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 48px;
              padding: 56px 64px;
              background: linear-gradient(135deg, rgba(198,232,74,0.06), rgba(255,255,255,0.02));
              border: 1px solid rgba(198,232,74,0.14);
              border-radius: 24px;
              overflow: hidden;
            }
            .ab-scale-band::before {
              content: "";
              position: absolute;
              top: 50%;
              right: -8%;
              width: 460px;
              height: 460px;
              background: radial-gradient(circle, rgba(198,232,74,0.1) 0%, transparent 60%);
              transform: translateY(-50%);
              pointer-events: none;
            }
            .ab-scale-bars {
              position: relative;
              display: flex;
              align-items: flex-end;
              gap: 10px;
              flex-shrink: 0;
              padding: 12px;
            }
            .ab-scale-bar {
              width: 16px;
              border-radius: 6px 6px 0 0;
              transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .ab-scale-band:hover .ab-scale-bar:nth-child(1) { transform: scaleY(1.08); }
            .ab-scale-band:hover .ab-scale-bar:nth-child(2) { transform: scaleY(1.12); }
            .ab-scale-band:hover .ab-scale-bar:nth-child(3) { transform: scaleY(1.16); }
            .ab-scale-band:hover .ab-scale-bar:nth-child(4) { transform: scaleY(1.2); }
            @media (max-width: 900px) {
              .ab-sec-grid {
                flex-direction: column;
              }
              .ab-sec-grid-text {
                flex: none;
                width: 100%;
              }
              .ab-sec-grid-cards {
                grid-template-columns: 1fr;
                width: 100%;
              }
              .ab-scale-band {
                flex-direction: column;
                align-items: flex-start;
                padding: 40px 28px;
              }
            }
          `}</style>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            FEATURE GRID
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="ab-section ab-section-light ab-lime-accent ab-section-border-top" style={{ position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{
            position: "absolute",
            inset: 0,
            backgroundImage: [
              "radial-gradient(560px 380px at 6% 4%, rgba(198,232,74,0.08) 0%, rgba(198,232,74,0) 62%)",
              "radial-gradient(680px 480px at 94% 100%, rgba(12,18,34,0.06) 0%, rgba(12,18,34,0) 62%)",
            ].join(","),
            pointerEvents: "none",
          }} />
          <div className="reveal-section" style={{ maxWidth: "1400px", margin: "0 auto", position: "relative" }}>
            <div className="reveal-child" style={{ marginBottom: "56px" }}>
              <span className="eyebrow-badge">What sets us apart</span>
              <h2 className="heading-display" style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 700,
                color: "var(--ab-text-primary)",
                marginTop: "16px",
              }}>
                Built for{" "}
                <span style={{ color: "var(--ab-accent)" }}>impact</span>
              </h2>
            </div>
            <div className="ab-impact-grid reveal-child">
              {[
                {
                  title: "Domain Expertise",
                  desc: "Industry-focused teams with deep operational understanding across sectors.",
                  corner: (
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <circle cx="22" cy="22" r="18" />
                      <circle cx="22" cy="22" r="11" />
                      <circle cx="22" cy="22" r="4" />
                    </svg>
                  ),
                },
                {
                  title: "Operational Excellence",
                  desc: "Standardized processes designed to improve quality, productivity, and efficiency.",
                  corner: (
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12c6 0 6 8 12 8s6-8 12-8 6 8 12 8" />
                      <path d="M4 30c6 0 6 8 12 8s6-8 12-8 6 8 12 8" />
                    </svg>
                  ),
                },
                {
                  title: "Technology-Enabled Services",
                  desc: "Leveraging Agentic AI, AI-enabled automation, analytics, and digital tools to enhance business operations.",
                  corner: (
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
                      <path d="M22 5l15 8.5v17L22 39 7 30.5v-17L22 5z" />
                      <path d="M22 13l10 5.5v11L22 35l-10-5.5v-11L22 13z" />
                    </svg>
                  ),
                },
                {
                  title: "Flexible Delivery Models",
                  desc: "Solutions that scale with your business requirements, from on-site to hybrid and remote.",
                  corner: (
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
                      <rect x="6" y="6" width="32" height="32" rx="2" />
                      <rect x="14" y="14" width="16" height="16" rx="2" />
                      <rect x="20" y="20" width="4" height="4" />
                    </svg>
                  ),
                },
                {
                  title: "Quality & Governance",
                  desc: "Strong operational controls, structured governance, and continuous performance monitoring.",
                  corner: (
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M10 22h24M22 10v24" />
                      <path d="M15 15h14M15 29h14" />
                      <circle cx="10" cy="10" r="2" />
                      <circle cx="34" cy="10" r="2" />
                      <circle cx="10" cy="34" r="2" />
                      <circle cx="34" cy="34" r="2" />
                      <circle cx="22" cy="22" r="2" />
                    </svg>
                  ),
                },
                {
                  title: "Customer-Centric Approach",
                  desc: "We work as an extension of your business, ensuring transparency, responsiveness, and long-term partnership.",
                  corner: (
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="16" cy="22" r="13" />
                      <circle cx="28" cy="22" r="13" />
                    </svg>
                  ),
                },
              ].map((feature) => (
                <div key={feature.title} className="ab-impact-card ab-impact-card--dark">
                  <span className="ab-impact-corner" aria-hidden="true">
                    {feature.corner}
                  </span>
                  <span className="ab-impact-glow" aria-hidden="true" />
                  <div className="ab-impact-title">{feature.title}</div>
                  <p className="ab-impact-desc">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <style>{`
            .ab-impact-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
            }
            .ab-impact-card {
              position: relative;
              display: flex;
              flex-direction: column;
              padding: 32px;
              border-radius: 20px;
              background: #0f0f0f;
              border: 1px solid rgba(255, 255, 255, 0.08);
              overflow: hidden;
              transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            .ab-impact-card:hover {
              transform: translateY(-4px);
              box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
            }
            .ab-impact-corner {
              position: absolute;
              top: 24px;
              right: 24px;
              width: 44px;
              height: 44px;
              color: rgba(198, 232, 74, 0.5);
              pointer-events: none;
              z-index: 1;
            }
            .ab-impact-glow {
              position: absolute;
              bottom: -70px;
              right: -70px;
              width: 200px;
              height: 200px;
              border-radius: 50%;
              background: radial-gradient(circle, rgba(198, 232, 74, 0.16) 0%, rgba(198, 232, 74, 0) 70%);
              filter: blur(8px);
              pointer-events: none;
              z-index: 0;
            }
            .ab-impact-title {
              font-size: 18px;
              font-family: var(--font-syne), sans-serif;
              font-weight: 700;
              color: #FFFFFF;
              line-height: 1.3;
              margin-bottom: 12px;
              position: relative;
              z-index: 2;
            }
            .ab-impact-desc {
              font-size: 14px;
              font-family: var(--font-geist-sans), sans-serif;
              color: #DCDECD;
              line-height: 1.6;
              margin: 0;
              position: relative;
              z-index: 2;
            }
            @media (max-width: 1024px) {
              .ab-impact-grid {
                grid-template-columns: repeat(2, 1fr);
              }
            }
            @media (max-width: 768px) {
              .ab-impact-grid {
                grid-template-columns: 1fr;
              }
            }
          `}</style>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            OPERATING PRINCIPLES
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="ab-section ab-section-dark ab-section-border-top">
          <div className="reveal-section" style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <div className="reveal-child" style={{ marginBottom: "48px" }}>
              <span className="eyebrow-badge">Our Operating Principles</span>
              <h2 className="heading-display" style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 700,
                color: "var(--ab-text-primary)",
                marginTop: "16px",
              }}>
                How we{" "}
                <span style={{ color: "var(--ab-accent)" }}>operate</span>
              </h2>
            </div>
            <div className="ab-op-track" ref={opTrackRef}>
              {operatingPrinciples.map((principle, i) => (
                <div key={principle.title} className="op-card">
                  <img className="op-card-img" src={principle.image} alt={principle.title} loading="lazy" decoding="async" />
                  <div className="op-card-overlay" />
                  <div className="op-card-body">
                    <div className="op-card-title">
                      {principle.title}
                    </div>
                    <p className="op-card-desc">
                      {principle.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Nav Arrows */}
            <div className="ab-op-arrows">
              <button
                className="ab-op-arrow-btn"
                disabled={!canScrollLeft}
                onClick={() => scrollOp(opPage - 1)}
                aria-label="Previous principles"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                className="ab-op-arrow-btn"
                disabled={!canScrollRight}
                onClick={() => scrollOp(opPage + 1)}
                aria-label="Next principles"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            THE FUTURE WE ARE BUILDING
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section
          className="ab-future-section"
          style={{
            width: "100%",
            background: "#030712",
            padding: "100px 80px",
          }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <div className="reveal-child" style={{ marginBottom: "64px" }}>
              <span className="eyebrow-badge" style={{ marginBottom: "18px" }}>
                Looking ahead
              </span>
              <h2
                className="heading-display"
                style={{
                  fontSize: "clamp(32px, 5vw, 48px)",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  marginBottom: "16px",
                }}
              >
                The Future We Are{" "}
                <span style={{ color: "#C6E84A" }}>Building</span>
              </h2>
              <p
                className="reveal-child"
                style={{
                  fontSize: "19px",
                  fontWeight: 400,
                  color: "#9CA3AF",
                  lineHeight: 1.8,
                  maxWidth: "100%",
                }}
              >
                Technology alone cannot transform businesses. People alone cannot transform
                businesses. The future belongs to organizations that combine both.
              </p>
            </div>

            <div className="reveal-child">
              <FutureCards />
            </div>
          </div>
          <style>{`
            @media (max-width: 1024px) {
              .ab-future-section {
                padding: 80px 40px !important;
              }
            }
            @media (max-width: 768px) {
              .ab-future-section {
                padding: 60px 20px !important;
              }
            }
          `}</style>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            FOUNDER'S MESSAGE (HOME SECTION)
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CTA
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <CallToAction />
      </div>
    </>
  );
}
