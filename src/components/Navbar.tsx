"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Solutions",
    href: "/solutions",
    children: [
      { name: "AI Automation & Agentic AI", href: "/solutions#ai-automation" },
      { name: "Intelligent Operations", href: "/solutions#intelligent-operations" },
      { name: "Data Engineering", href: "/solutions#data-engineering" },
      { name: "Analytics & BI", href: "/solutions#analytics-bi" },
      { name: "Shipping & Logistics", href: "/solutions#shipping-logistics" },
      { name: "Healthcare Operations", href: "/solutions#healthcare-operations" },

    ],
  },
  {
    name: "Services",
    href: "/#industries",
    children: [
      { name: "Shipping & Logistics", href: "/shipping-logistics" },
      { name: "Healthcare", href: "/healthcare-operations" },
      { name: "E-Commerce", href: "/#industries" },
      { name: "Banking", href: "/banking" },
      { name: "Digital Public Infrastructure", href: "/#industries" },
      { name: "Travel", href: "/#industries" },
    ],
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const socialLinks = [
  { name: "Twitter", handle: "@sytrion", href: "#" },
  { name: "Instagram", handle: "@sytrion", href: "#" },
  { name: "Dribbble", handle: "sytrion", href: "#" },
  { name: "Behance", handle: "sytrion", href: "#" },
];

const SocialIcon = ({ name }: { name: string }) => {
  switch (name) {
    case "Twitter":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l11.733 16h4.267l-11.733-16z" />
          <path d="M4 20l6.768-6.768m2.46-2.46L20 4" />
        </svg>
      );
    case "Instagram":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "Dribbble":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
          <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
          <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
        </svg>
      );
    case "Behance":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.8 14.2c.7 0 1.3-.2 1.8-.6.5-.4.7-1 .7-1.8H6.9c0 .7.2 1.2.6 1.5.3.3.8.5 1.4.5zm.9 1.1c-.8.4-1.7.6-2.8.6-1.3 0-2.4-.4-3.2-1.2-.8-.8-1.2-1.8-1.2-3.1 0-1.3.4-2.3 1.3-3.1.8-.8 1.9-1.2 3.2-1.2 1 0 1.9.3 2.5.8.7.5 1 1.2 1.2 2H6.1c0 1.5.9 2.3 2.7 2.3.6 0 1.2-.1 1.6-.4.5-.3.7-.7.7-1.2h3.1c-.1.8-.5 1.6-1.1 2.2-.7.6-1.6 1-2.7 1.3l-.5-.5zM16.3 14.4h5.3v-1.3h-5.3v1.3zm.3 3.1c.3.5.7.9 1.3 1.1.5.3 1.1.4 1.7.4.7 0 1.3-.2 1.8-.5.5-.3.8-.7 1-1.2h2.5c-.4 1.3-1.1 2.2-2.1 2.8-1 .6-2.2.9-3.5.9-1 0-1.9-.2-2.7-.5-.8-.3-1.5-.8-2-1.4-.6-.6-1-1.4-1.2-2.2-.3-.9-.3-1.8-.1-2.7.3-1 .8-1.8 1.5-2.5.7-.7 1.6-1.2 2.6-1.5 1-.3 2.1-.4 3.2-.3 1.1.1 2.1.4 3 .9.9.5 1.6 1.2 2.1 2 .5.8.8 1.8.9 2.8h-7.5c.1 1 .4 1.7.9 2.2zM17.5 10c-.6 0-1.1.2-1.4.5-.4.4-.5.8-.6 1.4h4c-.1-.7-.3-1.2-.7-1.5-.3-.3-.8-.5-1.3-.4z" />
        </svg>
      );
    default:
      return null;
  }
};

const SCROLL_THRESHOLD = 60;

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const collapsedBtnRef = useRef<HTMLButtonElement>(null);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > SCROLL_THRESHOLD);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        (scrolled ? collapsedBtnRef.current : menuButtonRef.current)?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, scrolled]);

  const openMenu = useCallback(() => {
    setMenuOpen(true);
    setExpandedItem(null);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setExpandedItem(null);
  }, []);

  const toggleSubmenu = useCallback((name: string) => {
    setExpandedItem((prev) => (prev === name ? null : name));
  }, []);

  const isNavActive = useCallback(
    (item: (typeof navItems)[number]) => {
      if (item.href === "#" || item.href.includes("#")) return false;
      if (item.href === "/") return pathname === "/";
      return pathname === item.href || pathname.startsWith(item.href);
    },
    [pathname]
  );

  return (
    <>
      <style>{`
        .nav-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          margin: 12px 16px 0 16px;
          z-index: 50;
          background-color: #edeff2;
          border-radius: 28px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: height 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.35s ease;
        }
        .nav-header.scrolled {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
        }

        .nav-full {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(24px, 5vw, 80px);
          max-width: 1440px;
          margin: 0 auto;
          left: 0;
          right: 0;
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.3s ease, transform 0.3s ease;
          pointer-events: auto;
        }
        .nav-header.scrolled:not(.nav-hovered) .nav-full {
          opacity: 0;
          transform: translateY(-8px);
          pointer-events: none;
        }
        .nav-header.scrolled.nav-hovered .nav-full {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .nav-collapsed {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          pointer-events: none;
        }
        .nav-header.scrolled:not(.nav-hovered) .nav-collapsed {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
          transition-delay: 0.1s;
        }
        .nav-header.scrolled.nav-hovered .nav-collapsed {
          opacity: 0;
          transform: translateY(8px);
          pointer-events: none;
        }

        .desktop-tab {
          position: relative;
          font-size: 15px;
          font-weight: 500;
          color: #0F0F0F;
          text-decoration: none;
          transition: color 0.2s ease;
          padding: 4px 0;
        }
        .desktop-tab::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 2px;
          background: #C6E84A;
          border-radius: 1px;
          transition: width 0.3s ease;
        }
        .desktop-tab:hover {
          color: #C6E84A;
        }
        .desktop-tab:hover::after {
          width: 100%;
        }
        .desktop-tab.active {
          color: #C6E84A;
        }
        .desktop-tab.active::after {
          width: 100%;
        }

        .desktop-tab-chevron {
          display: inline-block;
          margin-left: 4px;
          vertical-align: middle;
          transition: transform 0.25s ease, opacity 0.2s ease;
          opacity: 0.45;
        }
        .desktop-tab:hover .desktop-tab-chevron {
          opacity: 0.8;
        }

        .desktop-dropdown-panel {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 12px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.04);
          padding: 8px 0;
          animation: dropdownIn 0.2s ease-out;
          z-index: 51;
          min-width: 200px;
          width: max-content;
          margin-top: 20px;
        }
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .desktop-dropdown-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .desktop-dropdown-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0 32px;
        }

        .desktop-dropdown-link {
          display: block;
          color: #0F0F0F;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          padding: 10px 20px;
          position: relative;
          transition: color 0.2s ease, background 0.2s ease;
          border-radius: 8px;
          margin: 0 4px;
        }
        .desktop-dropdown-link:hover {
          color: #C6E84A;
          background: rgba(198,232,74,0.06);
        }
        .desktop-dropdown-link::after {
          display: none;
        }

        .icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: #0F0F0F;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
          padding: 0;
        }
        .icon-btn:hover {
          background: rgba(0,0,0,0.05);
          color: #C6E84A;
        }

        .collapsed-hamburger {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          width: 40px;
          height: 40px;
          border: none;
          background: transparent;
          cursor: pointer;
          padding: 0;
          color: #0F0F0F;
          border-radius: 8px;
          transition: background 0.2s ease;
        }
        .collapsed-hamburger:hover {
          background: rgba(0,0,0,0.05);
        }
        .collapsed-hamburger .c-line {
          display: block;
          width: 22px;
          height: 1.5px;
          background: currentColor;
          border-radius: 1px;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
        }

        /* Overlay styles */
        .menu-link {
          display: inline-block;
          position: relative;
          color: #f5f5f0;
          text-decoration: none;
          transition: color 0.3s ease, transform 0.3s ease;
        }
        .menu-link:hover {
          color: #C6E84A;
          transform: translateX(8px);
        }
        .menu-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 0;
          height: 2px;
          background: #C6E84A;
          transition: width 0.3s ease;
        }
        .menu-link:hover::after {
          width: 60px;
        }
        .menu-link.active {
          color: #C6E84A;
        }
        .menu-link.active::after {
          width: 60px;
        }
        .submenu-container {
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
        }
        .submenu-link {
          display: block;
          color: rgba(245,245,240,0.5);
          text-decoration: none;
          font-size: 16px;
          font-weight: 400;
          padding: 6px 0;
          transition: color 0.25s ease, padding-left 0.25s ease;
        }
        .submenu-link:hover {
          color: #C6E84A;
          padding-left: 8px;
        }
        .social-icon-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(245,245,240,0.45);
          text-decoration: none;
          font-size: 14px;
          transition: color 0.25s ease, transform 0.25s ease;
        }
        .social-icon-btn:hover {
          color: #C6E84A;
          transform: translateX(4px);
        }
        .let-talk-btn {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #C6E84A;
          color: #0f0f0f;
          padding: 14px 36px;
          border-radius: 999px;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(198,232,74,0.25);
        }
        .let-talk-btn::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 60%;
          background: linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 100%);
          pointer-events: none;
          border-radius: inherit;
        }
        .let-talk-btn::after {
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
        .let-talk-btn:hover {
          background: #ffffff;
          color: #0a0a0a;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255,255,255,0.15);
        }
        .let-talk-btn:hover::after {
          left: 120%;
        }
        .let-talk-btn:active {
          transform: translateY(0) scale(0.98);
        }
        .let-talk-btn svg {
          transition: transform 0.3s ease;
        }
        .let-talk-btn:hover svg {
          transform: translateX(4px);
        }
        .nav-cta-btn {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          background: #C6E84A;
          color: #0f0f0f;
          padding: 12px 28px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 2px 8px rgba(198,232,74,0.25);
        }
        .nav-cta-btn::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 60%;
          background: linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 100%);
          pointer-events: none;
          border-radius: inherit;
        }
        .nav-cta-btn::after {
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
        .nav-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(198,232,74,0.35);
        }
        .nav-cta-btn:hover::after {
          left: 120%;
        }
        .nav-cta-btn:active {
          transform: translateY(0) scale(0.98);
        }
        .hamburger-open .c-line:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }
        .hamburger-open .c-line:nth-child(2) {
          transform: translateY(-6.5px) rotate(-45deg);
        }
      `}</style>

      {/* ===== HEADER ===== */}
      <header
        className={`nav-header ${scrolled ? "scrolled" : ""} ${hovered ? "nav-hovered" : ""}`}
        style={{ height: scrolled && !hovered ? "48px" : "80px" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setDesktopDropdown(null); }}
      >
        {/* Full nav (visible at top) */}
        <div className="nav-full">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
            <img
              src="/shared/Sytrionlogo-8.png"
              alt="Sytrion Logo"
              width={280}
              height={56}
              className="h-20 "

            />
          </Link>

          {/* Desktop tabs */}
          <ul className="hidden lg:flex items-center" style={{ gap: "36px", listStyle: "none", margin: 0, padding: 0 }}>
            {navItems.map((item) => (
              <li
                key={item.name}
                style={{ position: "relative" }}
                onMouseEnter={() => {
                  if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                  if (item.children) setDesktopDropdown(item.name);
                }}
                onMouseLeave={() => {
                  if (item.children) {
                    dropdownTimeoutRef.current = setTimeout(() => setDesktopDropdown(null), 150);
                  }
                }}
              >
                <a
                  href={item.href}
                  className={"desktop-tab" + (isNavActive(item) ? " active" : "")}
                  onClick={() => setDesktopDropdown(null)}
                >
                  {item.name}
                  {item.children && (
                    <svg
                      className="desktop-tab-chevron"
                      style={{
                        transform: desktopDropdown === item.name ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="2 3.5 5 6.5 8 3.5" />
                    </svg>
                  )}
                </a>

                {item.children && desktopDropdown === item.name && (
                  <div
                    className="desktop-dropdown-panel"
                    onMouseEnter={() => {
                      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                    }}
                    onMouseLeave={() => {
                      dropdownTimeoutRef.current = setTimeout(() => setDesktopDropdown(null), 150);
                    }}
                  >
                    <div className={item.children.length > 4 ? "desktop-dropdown-grid" : "desktop-dropdown-list"}>
                      {item.children.map((child) => (
                        <a
                          key={child.name}
                          href={child.href}
                          className="desktop-dropdown-link"
                          onClick={() => setDesktopDropdown(null)}
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Right — CTA button */}
          <a
            href="/contact"
            className="hidden lg:inline-flex items-center nav-cta-btn"
          >
            Schedule a Consultation
          </a>
        </div>

        {/* Collapsed hamburger (visible on scroll) */}
        <div className="nav-collapsed">
          <button
            ref={collapsedBtnRef}
            className={`collapsed-hamburger ${menuOpen ? "hamburger-open" : ""}`}
            onClick={openMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="fullscreen-menu"
          >
            <span className="c-line" />
            <span className="c-line" />
          </button>
        </div>
      </header>

      {/* ===== FULLSCREEN OVERLAY ===== */}
      <div
        ref={overlayRef}
        id="fullscreen-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="fixed inset-0 z-[55] overflow-y-auto"
        style={{
          background: "#0a0a0a",
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1), transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="min-h-screen flex flex-col" style={{ padding: "clamp(100px, 12vh, 140px) clamp(24px, 5vw, 80px) 40px" }}>
          {/* Close button top-right */}
          <button
            ref={menuButtonRef}
            onClick={closeMenu}
            className="fixed top-6 right-6 z-[60] flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300"
            style={{ background: "rgba(255,255,255,0.08)", color: "#f5f5f0" }}
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col lg:flex-row gap-16 lg:gap-8 max-w-[1440px] mx-auto w-full">
            {/* Left — Navigation Links */}
            <div className="flex-1 flex flex-col justify-center">
              <nav aria-label="Main navigation">
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {navItems.map((item, i) => {
                    const hasChildren = !!item.children;
                    const isExpanded = expandedItem === item.name;

                    return (
                      <li
                        key={item.name}
                        style={{
                          opacity: menuOpen ? 1 : 0,
                          transform: menuOpen ? "translateY(0)" : "translateY(30px)",
                          transition: `opacity 0.4s ease ${0.05 * i + 0.2}s, transform 0.4s ease ${0.05 * i + 0.2}s`,
                        }}
                      >
                        {hasChildren ? (
                          <div>
                            <button
                              onClick={() => toggleSubmenu(item.name)}
                              className="flex items-center gap-3 group cursor-pointer bg-transparent border-none"
                              aria-expanded={isExpanded}
                              style={{ padding: "10px 0" }}
                            >
                              <span
                                className={"menu-link" + (isNavActive(item) ? " active" : "")}
                                style={{
                                  fontSize: "clamp(32px, 5vw, 56px)",
                                  fontWeight: 700,
                                  letterSpacing: "-0.02em",
                                  lineHeight: 1.15,
                                }}
                              >
                                {item.name}
                              </span>
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="#C6E84A"
                                strokeWidth="2"
                                strokeLinecap="round"
                                style={{
                                  transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)",
                                  transition: "transform 0.3s ease",
                                  flexShrink: 0,
                                  opacity: 0.6,
                                }}
                              >
                                <line x1="10" y1="4" x2="10" y2="16" />
                                <line x1="4" y1="10" x2="16" y2="10" />
                              </svg>
                            </button>
                            <div
                              className="submenu-container"
                              style={{
                                maxHeight: isExpanded ? "300px" : "0",
                                opacity: isExpanded ? 1 : 0,
                                paddingLeft: "clamp(16px, 2vw, 24px)",
                              }}
                            >
                              <div style={{ padding: "8px 0 16px" }}>
                                {item.children.map((child) => (
                                  <a
                                    key={child.name}
                                    href={child.href}
                                    className="submenu-link"
                                    onClick={closeMenu}
                                  >
                                    {child.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div style={{ padding: "10px 0" }}>
                            <a
                              href={item.href}
                              className={"menu-link" + (isNavActive(item) ? " active" : "")}
                              onClick={closeMenu}
                              style={{
                                fontSize: "clamp(32px, 5vw, 56px)",
                                fontWeight: 700,
                                letterSpacing: "-0.02em",
                                lineHeight: 1.15,
                              }}
                            >
                              {item.name}
                            </a>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* CTA */}
              <div
                style={{
                  marginTop: "clamp(40px, 5vh, 60px)",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(30px)",
                  transition: "opacity 0.4s ease 0.55s, transform 0.4s ease 0.55s",
                }}
              >
                <p style={{ fontSize: "18px", color: "rgba(245,245,240,0.5)", marginBottom: "20px", fontWeight: 400 }}>
                  Got a <span style={{ fontWeight: 700, fontStyle: "italic", color: "#f5f5f0" }}>PROJECT</span> in mind?
                </p>
                <a href="#contact" className="let-talk-btn" onClick={closeMenu}>
                  Let&apos;s Talk
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right — Decorative (desktop only) */}
            <div
              className="hidden lg:flex flex-col justify-center items-end"
              style={{
                width: "320px",
                flexShrink: 0,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(30px)",
                transition: "opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s",
              }}
            >
              <div style={{ borderLeft: "1px solid rgba(245,245,240,0.1)", paddingLeft: "40px" }}>
                <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(245,245,240,0.25)", marginBottom: "24px" }}>
                  Get in touch
                </p>
                <a
                  href="mailto:hello@sytrion.com"
                  style={{ fontSize: "22px", fontWeight: 600, color: "#f5f5f0", textDecoration: "none", lineHeight: 1.4, display: "block", transition: "color 0.25s ease" }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#C6E84A"; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#f5f5f0"; }}
                >
                  hello@sytrion.com
                </a>
                <p style={{ fontSize: "15px", color: "rgba(245,245,240,0.35)", marginTop: "16px", lineHeight: 1.6 }}>
                  Available for new projects<br />and partnerships.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Row */}
          <div
            className="mt-auto pt-12"
            style={{
              maxWidth: "1440px",
              width: "100%",
              margin: "0 auto",
              borderTop: "1px solid rgba(245,245,240,0.08)",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.4s ease 0.65s, transform 0.4s ease 0.65s",
            }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {socialLinks.map((social) => (
                  <a key={social.name} href={social.href} className="social-icon-btn" target="_blank" rel="noopener noreferrer">
                    <SocialIcon name={social.name} />
                    <span>
                      <span style={{ fontWeight: 500 }}>{social.name}</span>
                      <span style={{ marginLeft: "6px", opacity: 0.5 }}>{social.handle}</span>
                    </span>
                  </a>
                ))}
              </div>
              <p style={{ fontSize: "13px", color: "rgba(245,245,240,0.2)", whiteSpace: "nowrap" }}>
                &copy; {new Date().getFullYear()} Sytrion Data Labs
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
