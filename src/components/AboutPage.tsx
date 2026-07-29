"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe } from "@/components/Globe";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 5, suffix: "+", label: "Global Clients" },
  { value: 98, suffix: "%", label: "Client Retention" },
  { value: 50, suffix: "+", label: "Team Members" },
  { value: 10, suffix: "+", label: "Years of Excellence" },
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
    text: "Expanded into shipping, healthcare, insurance, and banking — building trusted partnerships with global enterprises.",
  },
  {
    year: "Today",
    title: "Industry Leaders",
    text: "A trusted partner for organizations seeking to operate smarter, innovate faster, and adapt confidently in a connected world.",
  },
];

const REGIONS: Record<string, { lat: number; lng: number }> = {
  Australia: { lat: -25.27, lng: 133.77 },
  "New Zealand": { lat: -40.9, lng: 174.88 },
  "United States": { lat: 37.09, lng: -95.71 },
  Europe: { lat: 54.53, lng: 15.25 },
  Asia: { lat: 34.05, lng: 100.62 },
  Africa: { lat: -8.78, lng: 34.51 },
};

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

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

        // ── Hero text reveal ──
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

        // ── Hero badge + subtitle fade in ──
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

        // ── Section reveals (scroll-triggered) ──
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

        // ── Stats counter ──
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

        // ── Value cards stagger ──
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

        // ── Timeline line draw ──
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

        // ── Timeline items stagger ──
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

        // ── Leadership card reveal ──
        const leaderCards = containerRef.current?.querySelectorAll(".leader-card");
        if (leaderCards?.length) {
          gsap.set(leaderCards, { autoAlpha: 0, y: 50, scale: 0.96 });
          ScrollTrigger.create({
            trigger: leaderCards[0],
            start: "top 80%",
            once: true,
            onEnter: () => {
              gsap.to(leaderCards, {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: reduceMotion ? 0 : 0.8,
                ease: "power2.out",
                stagger: reduceMotion ? 0 : 0.15,
              });
            },
          });
        }

        // ── CTA glow pulse (only if not reduced motion) ──
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

        /* ── Grid texture overlay ── */
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

        /* ── Hero ── */
        .ab-hero {
          position: relative;
          background: var(--ab-base);
          padding: 120px 48px 100px;
          overflow: hidden;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
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
          border: 1px solid rgba(199, 224, 82, 0.12);
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
          background: #C7E052;
          box-shadow: 0 0 12px 2px rgba(199, 224, 82, 0.7);
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

        /* ── Section wrapper ── */
        .ab-section {
          position: relative;
          padding: 120px 48px;
        }
        .ab-section-dark { background: var(--ab-base); }
        .ab-section-darker { background: var(--ab-surface-1); }
        .ab-section-border-top {
          border-top: 1px solid var(--ab-border);
        }

        /* ── Glass card ── */
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

        /* ── Stat card ── */
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

        /* ── Value card ── */
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

        /* ── Timeline ── */
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

        /* ── Leader card ── */
        .leader-card {
          background: var(--ab-surface-2);
          border: 1px solid var(--ab-border);
          border-radius: 20px;
          overflow: hidden;
          transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .leader-card:hover {
          border-color: rgba(198,232,74,0.15);
          box-shadow: var(--ab-glow);
          transform: translateY(-4px);
        }
        .leader-card-avatar {
          width: 100%;
          height: 280px;
          background: var(--ab-surface-3);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .leader-card-avatar::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(0deg, var(--ab-surface-2) 0%, transparent 100%);
        }

        /* ── Values grid ── */
        .ab-values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        /* ── Value card new ── */
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

        /* ── CTA ── */
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
          .ab-leaders-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .ab-leaders-grid > :last-child {
            grid-column: 1 / -1;
            max-width: 400px;
            margin: 0 auto;
          }
          .ab-values-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .ab-hero { padding: 120px 24px 80px; min-height: auto; }
          .ab-section { padding: 80px 24px; }
          .ab-cta { padding: 80px 24px; }
          .ab-story-grid { flex-direction: column !important; gap: 48px !important; }
          .ab-stats-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .ab-values-grid {
            grid-template-columns: 1fr !important;
          }
          .ab-leaders-grid {
            grid-template-columns: 1fr !important;
          }
          .ab-leaders-grid > :last-child {
            max-width: none;
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
        {/* ════════════════════════════════════════════════════
            HERO
            ════════════════════════════════════════════════════ */}
        <section className="ab-hero">
          <div className="ab-grid-overlay" />
          <div className="ab-hero-orb" />
          <div className="ab-hero-orb-2" />
          <div className="orbit-ring r1"><div className="orb" /></div>
          <div className="orbit-ring r2"><div className="orb" /></div>
          <div className="orbit-ring r3" />

          <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
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
              maxWidth: "540px",
              margin: "40px auto 0",
            }}>
              We combine intelligent technologies with operational excellence to
              simplify complexity, improve productivity, and create sustainable
              business value across industries.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            STORY + TIMELINE
            ════════════════════════════════════════════════════ */}
        <section className="ab-section ab-section-darker ab-section-border-top">
          <div className="reveal-section ab-story-grid" style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "80px", alignItems: "flex-start" }}>
            {/* Left — Text */}
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
              }}>
                Sytrion Data Labs was founded with a clear mission — to help
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
              }}>
                What began as a vision to bridge the gap between technology and
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
                Our purpose extends beyond business transformation. We aspire to
                create opportunities, empower people, and contribute to building a
                more connected and intelligent future.
              </p>
            </div>

            {/* Right — Timeline */}
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

        {/* ════════════════════════════════════════════════════
            VISION
            ════════════════════════════════════════════════════ */}
        <section className="ab-section ab-section-dark ab-section-border-top">
          <div className="reveal-section" style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div className="reveal-child" style={{ textAlign: "center", marginBottom: "32px" }}>
              <span className="eyebrow-badge">Our vision</span>
            </div>
            <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
              <h2 className="heading-display reveal-child" style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 700,
                color: "var(--ab-text-primary)",
                marginBottom: "24px",
              }}>
                Shaping the Future of{" "}
                <span style={{ color: "var(--ab-accent)" }}>Intelligent Operations</span>
              </h2>
              <p className="reveal-child" style={{
                fontSize: "18px",
                fontFamily: "var(--font-geist-sans), sans-serif",
                color: "var(--ab-text-secondary)",
                lineHeight: 1.75,
                maxWidth: "680px",
                margin: "0 auto",
              }}>
                To become one of the world's most trusted Intelligent Operations partners,
                enabling organizations to achieve sustainable growth through innovation,
                operational excellence and technology-driven transformation.
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            MISSION
            ════════════════════════════════════════════════════ */}
        <section className="ab-section ab-section-darker ab-section-border-top">
          <div className="reveal-section" style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div className="reveal-child" style={{ textAlign: "center", marginBottom: "32px" }}>
              <span className="eyebrow-badge">Our mission</span>
            </div>
            <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
              <h2 className="heading-display reveal-child" style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 700,
                color: "var(--ab-text-primary)",
                marginBottom: "24px",
              }}>
                Transforming Complexity into{" "}
                <span style={{ color: "var(--ab-accent)" }}>Competitive Advantage</span>
              </h2>
              <p className="reveal-child" style={{
                fontSize: "18px",
                fontFamily: "var(--font-geist-sans), sans-serif",
                color: "var(--ab-text-secondary)",
                lineHeight: 1.75,
                maxWidth: "680px",
                margin: "0 auto",
              }}>
                To empower businesses by delivering secure, scalable and intelligent
                operational solutions that create measurable value for clients, employees
                and society.
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            STATS
            ════════════════════════════════════════════════════ */}
        <section className="ab-section ab-section-dark ab-section-border-top" ref={statsRef}>
          <div className="reveal-section" style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div className="ab-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
              {stats.map((stat) => (
                <div key={stat.label} className="ab-stat-card reveal-child">
                  <div
                    className="stat-number"
                    data-target={stat.value}
                    data-suffix={stat.suffix}
                    style={{
                      fontSize: "clamp(36px, 5vw, 56px)",
                      fontFamily: "var(--font-syne), sans-serif",
                      fontWeight: 700,
                      color: "var(--ab-accent)",
                      lineHeight: 1,
                      marginBottom: "12px",
                    }}
                  >
                    0{stat.suffix}
                  </div>
                  <div style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--ab-text-muted)",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            VALUES
            ════════════════════════════════════════════════════ */}
        <section className="ab-section ab-section-darker ab-section-border-top">
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div className="reveal-section" style={{ textAlign: "center", marginBottom: "72px" }}>
              <div className="reveal-child">
                <span className="eyebrow-badge">Our values</span>
              </div>
              <h2 className="heading-display reveal-child" style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 700,
                color: "var(--ab-text-primary)",
                marginBottom: "20px",
                marginTop: "20px",
              }}>
                What <span style={{ color: "var(--ab-accent)" }}>drives</span> us forward
              </h2>
              <p className="reveal-child" style={{
                fontSize: "17px",
                fontFamily: "var(--font-geist-sans), sans-serif",
                color: "var(--ab-text-muted)",
                lineHeight: 1.7,
                maxWidth: "520px",
                margin: "0 auto",
              }}>
                Our core values shape every solution we build, every partnership we
                nurture, and every impact we create.
              </p>
            </div>

            <div className="ab-values-grid">
              {values.map((value, i) => {
                const num = String(i + 1).padStart(2, "0");
                return (
                  <div key={value.title} className="val-card">
                    <div className="val-card-inner">
                      <div className="val-card-num">{num}</div>
                      <div className="val-card-icon">{value.icon}</div>
                      <div className="val-card-title">{value.title}</div>
                      <p className="val-card-desc">{value.description}</p>
                      <div className="val-card-line" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            WHY BUSINESSES CHOOSE SYTRION
            ════════════════════════════════════════════════════════════ */}
        <section className="ab-section ab-section-dark ab-section-border-top" style={{ position: "relative", overflow: "hidden" }}>
          {/* Glow blobs */}
          <div style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            filter: "blur(90px)",
            pointerEvents: "none",
            zIndex: 0,
            background: "#C7E052",
            opacity: 0.25,
            top: "-180px",
            left: "60%",
          }} />
          <div style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            filter: "blur(90px)",
            pointerEvents: "none",
            zIndex: 0,
            background: "#2E5AAC",
            opacity: 0.2,
            bottom: "-200px",
            left: "10%",
          }} />
          <div className="reveal-section" style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
              <div className="reveal-child" style={{ marginBottom: "22px" }}>
                <span className="eyebrow-badge">Why Sytrion</span>
              </div>
              <h2 className="heading-display reveal-child" style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 700,
                color: "var(--ab-text-primary)",
                marginBottom: "24px",
              }}>
                Why Businesses Choose{" "}
                <span style={{ color: "var(--ab-accent)" }}>Sytrion</span>
              </h2>
              <p className="reveal-child" style={{
                fontSize: "18px",
                fontFamily: "var(--font-geist-sans), sans-serif",
                color: "var(--ab-text-secondary)",
                lineHeight: 1.75,
              }}>
                Intelligent Operations — AI-enabled workflows designed for efficiency and accuracy.
                Our solutions are designed around the unique operational requirements of every industry.
              </p>
              {/* Accent divider */}
              <div className="reveal-child" style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                marginTop: "32px",
              }}>
                <div style={{
                  width: "60px",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(199,224,82,0.6))",
                }} />
                <div style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#C7E052",
                }} />
                <div style={{
                  width: "60px",
                  height: "1px",
                  background: "linear-gradient(90deg, rgba(199,224,82,0.6), transparent)",
                }} />
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            INDUSTRY FOCUS
            ════════════════════════════════════════════════════════════ */}
        <section className="ab-section ab-section-darker ab-section-border-top">
          <div className="reveal-section" style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div className="reveal-child" style={{ textAlign: "center", marginBottom: "48px" }}>
              <span className="eyebrow-badge">Industries we serve</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
              {[
                {
                  title: "Shipping & Logistics",
                  image: "/shipping.jpg",
                  items: ["Freight forwarding & documentation", "Shipment processing & customs support", "Finance & accounting operations", "Vendor management", "Supply chain back-office services"],
                },
                {
                  title: "Healthcare & Life Sciences",
                  image: "/healthcare.jpg",
                  items: ["Claims processing & provider support", "Document management", "Workflow optimization", "Healthcare administration services"],
                },
                {
                  title: "E-Commerce",
                  image: "/ecommerce.jpg",
                  items: ["Order processing & catalog operations", "Customer support", "Returns management", "Business reporting"],
                },
                {
                  title: "Other Industries",
                  image: "/banking.jpg",
                  items: ["Banking & Financial Services", "Insurance", "Travel & Hospitality", "Retail", "Digital Public Infrastructure"],
                },
              ].map((group) => (
                <div key={group.title} className="ab-glass" style={{ position: "relative", overflow: "hidden" }}>
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${group.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.18,
                  }} />
                  <div style={{ position: "relative", zIndex: 1, padding: "36px" }}>
                    <h3 style={{
                      fontSize: "20px",
                      fontFamily: "var(--font-syne), sans-serif",
                      fontWeight: 700,
                      color: "var(--ab-text-primary)",
                      marginBottom: "20px",
                    }}>
                      {group.title}
                    </h3>
                    <ul style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}>
                      {group.items.map((item) => (
                        <li key={item} style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          fontSize: "15px",
                          fontFamily: "var(--font-geist-sans), sans-serif",
                          color: "var(--ab-text-muted)",
                          lineHeight: 1.6,
                        }}>
                          <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                            <circle cx="3" cy="3" r="3" fill="var(--ab-accent)" opacity="0.6" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            GLOBAL CLIENTS
            ════════════════════════════════════════════════════════════ */}
        <section className="ab-section ab-section-dark ab-section-border-top">
          <div className="reveal-section" style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div className="ab-global-row" style={{ display: "flex", gap: "60px", alignItems: "center" }}>
              <div className="reveal-child" style={{ flex: "0 0 45%", maxWidth: "520px" }}>
                <span className="eyebrow-badge">Global presence</span>
                <h2 className="heading-display" style={{
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontFamily: "var(--font-syne), sans-serif",
                  fontWeight: 700,
                  color: "var(--ab-text-primary)",
                  marginTop: "16px",
                  marginBottom: "32px",
                }}>
                  Supporting organizations across{" "}
                  <span style={{ color: "var(--ab-accent)" }}>the globe</span>
                </h2>
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}>
                  {["Australia", "New Zealand", "United States", "Europe", "Asia", "Africa"].map((region) => {
                    const active = selectedRegion === region;
                    return (
                      <button
                        key={region}
                        onClick={() => setSelectedRegion(active ? null : region)}
                        style={{
                          cursor: "pointer",
                          display: "inline-block",
                          padding: "8px 18px",
                          borderRadius: "999px",
                          background: active ? "var(--ab-accent)" : "var(--ab-surface-2)",
                          border: active ? "1px solid var(--ab-accent)" : "1px solid var(--ab-border)",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: active ? "#0f0f0f" : "var(--ab-text-secondary)",
                          letterSpacing: "0.3px",
                          whiteSpace: "nowrap",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {region}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="reveal-child" style={{
                flex: 1,
                height: "480px",
                position: "relative",
              }}>
                <Globe
                  focusTarget={selectedRegion ? REGIONS[selectedRegion] : null}
                  markers={
                    selectedRegion
                      ? [{ location: [REGIONS[selectedRegion].lat, REGIONS[selectedRegion].lng], size: 0.12 }]
                      : undefined
                  }
                  baseColor={[0.3, 0.32, 0.35]}
                  markerColor={[198 / 255, 232 / 255, 74 / 255]}
                />
              </div>
            </div>
          </div>
          <style>{`
            @media (max-width: 900px) {
              .ab-global-row {
                flex-direction: column !important;
              }
              .ab-global-row > div:first-child {
                flex: none !important;
                max-width: none !important;
              }
              .ab-global-row > div:last-child {
                width: 100% !important;
                height: 360px !important;
              }
            }
          `}</style>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECURITY FIRST
            ════════════════════════════════════════════════════════════ */}
        <section className="ab-section ab-section-darker ab-section-border-top">
          <div className="reveal-section" style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "flex", gap: "60px", alignItems: "center" }}>
              <div className="reveal-child" style={{ flex: "0 0 40%" }}>
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
              <div className="reveal-child" style={{ flex: 1 }}>
                <div className="ab-glass" style={{ padding: "40px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    {[
                      { title: "Data Protection", desc: "End-to-end encryption and access controls to safeguard sensitive information." },
                      { title: "Compliance Ready", desc: "Built to meet ISO 27001, GDPR, and industry-specific regulatory standards." },
                      { title: "Continuous Monitoring", desc: "24/7 threat detection, incident response, and regular security audits." },
                    ].map((item) => (
                      <div key={item.title} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                        <div style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          background: "rgba(198,232,74,0.1)",
                          border: "1px solid rgba(198,232,74,0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ab-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          </svg>
                        </div>
                        <div>
                          <div style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "var(--ab-text-primary)",
                            fontFamily: "var(--font-syne), sans-serif",
                            marginBottom: "4px",
                          }}>
                            {item.title}
                          </div>
                          <div style={{
                            fontSize: "14px",
                            fontFamily: "var(--font-geist-sans), sans-serif",
                            color: "var(--ab-text-muted)",
                            lineHeight: 1.6,
                          }}>
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SCALABLE ENGAGEMENT
            ════════════════════════════════════════════════════════════ */}
        <section className="ab-section ab-section-dark ab-section-border-top">
          <div className="reveal-section" style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
            <div className="reveal-child" style={{ marginBottom: "16px" }}>
              <span className="eyebrow-badge">Scalable Engagement</span>
            </div>
            <h2 className="heading-display reveal-child" style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontFamily: "var(--font-syne), sans-serif",
              fontWeight: 700,
              color: "var(--ab-text-primary)",
              marginBottom: "20px",
            }}>
              Solutions that scale with{" "}
              <span style={{ color: "var(--ab-accent)" }}>your ambition</span>
            </h2>
            <p className="reveal-child" style={{
              fontSize: "18px",
              fontFamily: "var(--font-geist-sans), sans-serif",
              color: "var(--ab-text-secondary)",
              lineHeight: 1.75,
              maxWidth: "600px",
              margin: "0 auto",
            }}>
              Whether supporting five professionals or five hundred, our solutions evolve
              with our clients' ambitions — growing as you grow.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            FEATURE GRID
            ════════════════════════════════════════════════════════════ */}
        <section className="ab-section ab-section-darker ab-section-border-top">
          <div className="reveal-section" style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div className="reveal-child" style={{ textAlign: "center", marginBottom: "56px" }}>
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              {[
                { title: "Domain Expertise", desc: "Industry-focused teams with deep operational understanding across sectors." },
                { title: "Operational Excellence", desc: "Standardized processes designed to improve quality, productivity, and efficiency." },
                { title: "Technology-Enabled Services", desc: "Leveraging Agentic AI, AI-enabled automation, analytics, and digital tools to enhance business operations." },
                { title: "Flexible Delivery Models", desc: "Solutions that scale with your business requirements, from on-site to hybrid and remote." },
                { title: "Quality & Governance", desc: "Strong operational controls, structured governance, and continuous performance monitoring." },
                { title: "Customer-Centric Approach", desc: "We work as an extension of your business, ensuring transparency, responsiveness, and long-term partnership." },
              ].map((feature) => (
                <div key={feature.title} className="ab-glass" style={{ padding: "32px" }}>
                  <div className="val-card-title" style={{ fontSize: "18px", marginBottom: "12px" }}>
                    {feature.title}
                  </div>
                  <p className="val-card-desc" style={{ fontSize: "14px" }}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            OPERATING PRINCIPLES
            ════════════════════════════════════════════════════════════ */}
        <section className="ab-section ab-section-dark ab-section-border-top">
          <div className="reveal-section" style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div className="reveal-child" style={{ textAlign: "center", marginBottom: "48px" }}>
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              {[
                { title: "Customer First", desc: "Every solution begins with understanding our client's business objectives and desired outcomes." },
                { title: "Operational Excellence", desc: "We continuously improve processes to deliver consistent, measurable results." },
                { title: "Innovation with Purpose", desc: "Technology is applied where it creates real business value — not for its own sake." },
                { title: "Integrity & Trust", desc: "We build lasting relationships through transparency, accountability, and ethical business practices." },
                { title: "Continuous Improvement", desc: "We embrace change and continuously evolve to help our clients stay ahead." },
              ].map((principle, i) => (
                <div key={principle.title} className="val-card" style={i === 4 ? { gridColumn: "2 / 3" } : undefined}>
                  <div className="val-card-inner" style={{ padding: "32px" }}>
                    <div className="val-card-num" style={{ fontSize: "48px", top: "16px", right: "20px" }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="val-card-title" style={{ fontSize: "18px", marginBottom: "12px", marginTop: "8px" }}>
                      {principle.title}
                    </div>
                    <p className="val-card-desc" style={{ fontSize: "14px" }}>
                      {principle.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            THE FUTURE WE ARE BUILDING
            ════════════════════════════════════════════════════════════ */}
        <section className="ab-section ab-section-darker ab-section-border-top">
          <div className="reveal-section" style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
            <div className="reveal-child" style={{ marginBottom: "16px" }}>
              <span className="eyebrow-badge">Looking ahead</span>
            </div>
            <h2 className="heading-display reveal-child" style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontFamily: "var(--font-syne), sans-serif",
              fontWeight: 700,
              color: "var(--ab-text-primary)",
              marginBottom: "32px",
            }}>
              The Future We Are{" "}
              <span style={{ color: "var(--ab-accent)" }}>Building</span>
            </h2>
            <p className="reveal-child" style={{
              fontSize: "18px",
              fontFamily: "var(--font-geist-sans), sans-serif",
              color: "var(--ab-text-secondary)",
              lineHeight: 1.8,
              maxWidth: "720px",
              margin: "0 auto 48px",
            }}>
              Technology alone cannot transform businesses. People alone cannot transform
              businesses. The future belongs to organizations that combine both.
            </p>
            <div className="reveal-child" style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}>
              {[
                { label: "Artificial Intelligence", desc: "Enhances human capability" },
                { label: "Automation", desc: "Accelerates productivity" },
                { label: "Data", desc: "Drives better decisions" },
                { label: "People", desc: "Create lasting impact" },
              ].map((item) => (
                <div key={item.label} className="ab-glass" style={{ padding: "28px 20px" }}>
                  <div className="val-card-title" style={{
                    fontSize: "15px",
                    marginBottom: "8px",
                    color: "var(--ab-accent)",
                  }}>
                    {item.label}
                  </div>
                  <p className="val-card-desc" style={{ fontSize: "14px" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            FOUNDER'S MESSAGE
            ════════════════════════════════════════════════════════════ */}
        <section className="ab-section ab-section-dark ab-section-border-top">
          <div className="reveal-section" style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div className="ab-glass" style={{ padding: "56px 48px" }}>
              <div className="reveal-child" style={{ textAlign: "center", marginBottom: "16px" }}>
                <span className="eyebrow-badge">A message from our founder</span>
              </div>
              <blockquote className="reveal-child" style={{
                fontSize: "clamp(18px, 2.5vw, 24px)",
                fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 600,
                color: "var(--ab-text-primary)",
                lineHeight: 1.6,
                margin: "0 auto",
                maxWidth: "720px",
                textAlign: "center",
                fontStyle: "italic",
              }}>
                "Sytrion was born from a simple yet powerful belief — that every organization
                deserves operational excellence backed by integrity, innovation, and intelligent
                thinking. Our mission is not merely to deliver services, but to become a trusted
                partner in our clients' journey of growth and transformation."
              </blockquote>
              <div className="reveal-child" style={{
                textAlign: "center",
                marginTop: "32px",
                paddingTop: "24px",
                borderTop: "1px solid var(--ab-border)",
              }}>
                <div style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "var(--ab-accent)",
                  fontFamily: "var(--font-syne), sans-serif",
                }}>
                  Rajesh Kulkarni
                </div>
                <div style={{
                  fontSize: "14px",
                  color: "var(--ab-text-muted)",
                  fontFamily: "var(--font-geist-sans), sans-serif",
                  marginTop: "4px",
                }}>
                  Founder &amp; CEO, Sytrion Data Labs
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            LEADERSHIP
            ════════════════════════════════════════════════════ */}
        <section className="ab-section ab-section-dark ab-section-border-top">
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div className="reveal-section" style={{ textAlign: "center", marginBottom: "72px" }}>
              <div className="reveal-child">
                <span className="eyebrow-badge">Leadership</span>
              </div>
              <h2 className="heading-display reveal-child" style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 700,
                color: "var(--ab-text-primary)",
                marginBottom: "20px",
                marginTop: "20px",
              }}>
                The people behind the{" "}
                <span style={{ color: "var(--ab-accent)" }}>vision</span>
              </h2>
              <p className="reveal-child" style={{
                fontSize: "17px",
                fontFamily: "var(--font-geist-sans), sans-serif",
                color: "var(--ab-text-muted)",
                lineHeight: 1.7,
                maxWidth: "520px",
                margin: "0 auto",
              }}>
                Our leadership team brings decades of experience in technology,
                operations, and business transformation.
              </p>
            </div>

            <div className="ab-leaders-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
              {/* Leader 1 */}
              <div className="leader-card">
                <div className="leader-card-avatar">
                  <div style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    background: "rgba(198,232,74,0.1)",
                    border: "2px solid rgba(198,232,74,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "42px",
                    fontWeight: 700,
                    fontFamily: "var(--font-syne), sans-serif",
                    color: "var(--ab-accent)",
                    position: "relative",
                    zIndex: 1,
                  }}>
                    R
                  </div>
                </div>
                <div style={{ padding: "28px 32px 32px" }}>
                  <div style={{
                    fontSize: "18px",
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 700,
                    color: "var(--ab-text-primary)",
                    marginBottom: "4px",
                  }}>
                    Rajesh Kulkarni
                  </div>
                  <div style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--ab-accent)",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}>
                    Founder &amp; CEO
                  </div>
                  <p style={{
                    fontSize: "14px",
                    fontFamily: "var(--font-geist-sans), sans-serif",
                    color: "var(--ab-text-muted)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    Visionary leader with a passion for bridging technology and business outcomes through AI and operational excellence.
                  </p>
                </div>
              </div>

              {/* Leader 2 */}
              <div className="leader-card">
                <div className="leader-card-avatar">
                  <div style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    background: "rgba(198,232,74,0.1)",
                    border: "2px solid rgba(198,232,74,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "42px",
                    fontWeight: 700,
                    fontFamily: "var(--font-syne), sans-serif",
                    color: "var(--ab-accent)",
                    position: "relative",
                    zIndex: 1,
                  }}>
                    A
                  </div>
                </div>
                <div style={{ padding: "28px 32px 32px" }}>
                  <div style={{
                    fontSize: "18px",
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 700,
                    color: "var(--ab-text-primary)",
                    marginBottom: "4px",
                  }}>
                    Anil Kumar
                  </div>
                  <div style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--ab-accent)",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}>
                    Chief Technology Officer
                  </div>
                  <p style={{
                    fontSize: "14px",
                    fontFamily: "var(--font-geist-sans), sans-serif",
                    color: "var(--ab-text-muted)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    Drives the technical vision and architecture behind Sytrion&apos;s AI-powered solutions and data engineering platforms.
                  </p>
                </div>
              </div>

              {/* Leader 3 */}
              <div className="leader-card">
                <div className="leader-card-avatar">
                  <div style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    background: "rgba(198,232,74,0.1)",
                    border: "2px solid rgba(198,232,74,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "42px",
                    fontWeight: 700,
                    fontFamily: "var(--font-syne), sans-serif",
                    color: "var(--ab-accent)",
                    position: "relative",
                    zIndex: 1,
                  }}>
                    P
                  </div>
                </div>
                <div style={{ padding: "28px 32px 32px" }}>
                  <div style={{
                    fontSize: "18px",
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 700,
                    color: "var(--ab-text-primary)",
                    marginBottom: "4px",
                  }}>
                    Priya Sharma
                  </div>
                  <div style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--ab-accent)",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}>
                    Head of Operations
                  </div>
                  <p style={{
                    fontSize: "14px",
                    fontFamily: "var(--font-geist-sans), sans-serif",
                    color: "var(--ab-text-muted)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    Ensures operational excellence across all client engagements with a focus on scalable, resilient process design.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            CTA
            ════════════════════════════════════════════════════ */}
        <section className="ab-cta ab-section-border-top">
          <div className="cta-orb" />
          <div className="ab-grid-overlay" />

          <div className="reveal-section" style={{ maxWidth: "700px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <div className="reveal-child" style={{ marginBottom: "16px" }}>
              <span className="eyebrow-badge">Let's build together</span>
            </div>

            <h2 className="heading-display reveal-child" style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontFamily: "var(--font-syne), sans-serif",
              fontWeight: 700,
              color: "var(--ab-text-primary)",
              marginBottom: "24px",
              marginTop: "20px",
            }}>
              Let's Build{" "}
              <span style={{ color: "var(--ab-accent)" }}>Smarter Operations</span>{" "}
              Together
            </h2>

            <p className="reveal-child" style={{
              fontSize: "18px",
              fontFamily: "var(--font-geist-sans), sans-serif",
              color: "var(--ab-text-muted)",
              lineHeight: 1.7,
              marginBottom: "48px",
              maxWidth: "580px",
              marginLeft: "auto",
              marginRight: "auto",
            }}>
              Whether you are looking to optimize business processes, enhance operational
              efficiency, or accelerate digital transformation, Sytrion Data Labs is ready
              to help you achieve your goals with confidence.
            </p>

            <div className="reveal-child">
              <a href="/contact" className="btn-primary" style={{ fontSize: "17px", padding: "18px 44px" }}>
                Schedule a Consultation
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
