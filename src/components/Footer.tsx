"use client";

import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/#industries" },
  { label: "Contact", href: "/contact" },
];

const solutions = [
  { label: "AI Automation", href: "/solutions#ai-automation" },
  { label: "Intelligent Operations", href: "/solutions#intelligent-operations" },
  { label: "Data Engineering", href: "/solutions#data-engineering" },
  { label: "Analytics & BI", href: "/solutions#analytics-bi" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="fl-footer-root">
      <style>{`
        .fl-footer-root {
          width: 100%;
          position: relative;
          overflow: hidden;
          font-family: var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #2D3139;
          background: #F4F6F4;
        }

        .fl-container {
          max-width: 1360px;
          margin: 0 auto;
          padding: 38px 40px 0;
          position: relative;
          z-index: 2;
        }

        .fl-grid {
          display: grid;
          grid-template-columns: 2.2fr 1fr 1fr 1.6fr;
          gap: 0;
          align-items: stretch;
          position: relative;
        }

        .fl-col {
          padding: 0 28px;
        }

        .fl-col:first-child {
          padding-left: 0;
        }

        .fl-col:last-child {
          padding-right: 0;
        }

        /* Column dividers */
        .fl-col-divider {
          border-right: 1px solid rgba(0, 0, 0, 0.08);
        }

        /* Push right columns down to align headings with brand content */
        .fl-col-top {
          padding-top: 56px;
        }

        /* Bottom-align elements in brand and contact columns */
        .fl-col:first-child {
          display: flex;
          flex-direction: column;
        }

        .fl-col:first-child .fl-motto-row {
          margin-top: auto;
        }

        .fl-col:last-child {
          display: flex;
          flex-direction: column;
        }

        .fl-callout-wrap {
          margin-top: auto;
          position: relative;
        }

        .fl-heading {
          font-size: 16px;
          font-weight: 700;
          color: #1F2226;
          margin-bottom: 4px;
          letter-spacing: -0.2px;
        }

        .fl-heading-underline {
          width: 20px;
          height: 3px;
          background: #BCE328;
          margin-bottom: 20px;
          border-radius: 1px;
        }

        .fl-link-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .fl-link {
          color: #5E626C;
          font-size: 14.5px;
          font-weight: 400;
          text-decoration: none;
          transition: color 0.2s ease;
          width: fit-content;
        }

        .fl-link:hover {
          color: #7CA100;
        }

        /* Brand Column */
        .fl-logo-wrap {
          position: relative;
          display: inline-block;
          margin-bottom: 16px;
        }

        .fl-brand-headline {
          font-size: 14.5px;
          font-weight: 700;
          color: #1F2226;
          line-height: 1.3;
          margin-bottom: 8px;
          white-space: nowrap;
          letter-spacing: -0.1px;
        }

        .fl-brand-headline span {
          color: #A3D600;
        }

        .fl-brand-desc {
          font-size: 13.5px;
          color: #727680;
          line-height: 1.5;
          max-width: 370px;
          margin-bottom: 18px;
        }

        .fl-socials {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
        }

        .fl-social-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #BCE328;
          color: #1F2226;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-weight: 700;
          font-size: 13.5px;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .fl-social-btn:hover {
          background: #1F2226;
          color: #BCE328;
        }

        .fl-motto-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .fl-motto-bar {
          width: 18px;
          height: 3px;
          background: #BCE328;
          border-radius: 1px;
        }

        .fl-motto-text {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.6px;
          color: #8E929C;
          text-transform: uppercase;
        }

        /* Contact Column */
        .fl-contact-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .fl-contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #4D515A;
          font-size: 14px;
          font-weight: 500;
        }

        .fl-contact-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #BCE328;
          color: #1F2226;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .fl-callout-wrap {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .fl-callout-bar {
          width: 38px;
          height: 3px;
          background: #BCE328;
          border-radius: 1px;
          flex-shrink: 0;
        }

        .fl-callout-text {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 1.4px;
          color: #787C86;
          text-transform: uppercase;
          line-height: 1.4;
        }

        /* Bottom Section with Full Width Green Line */
        .fl-bottom-line-wrap {
          width: 100%;
          position: relative;
          z-index: 5;
          margin-top: 0;
        }

        .fl-bottom-green-line {
          width: 100%;
          height: 1.5px;
          background: #BCE328;
        }

        .fl-bottom-bar {
          max-width: 1360px;
          margin: 0 auto;
          padding: 14px 40px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }

        .fl-copyright {
          font-size: 13px;
          color: #757983;
        }

        .fl-bottom-nav {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          color: #5E626C;
        }

        .fl-bottom-nav a {
          color: #5E626C;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .fl-bottom-nav a:hover {
          color: #7CA100;
        }

        .fl-bottom-nav span {
          color: #B2B6C0;
        }

        /* Scroll to Top floating on green line */
        .fl-back-to-top {
          position: absolute;
          right: 40px;
          top: -17px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 10;
        }

        .fl-back-to-top-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #BCE328;
          color: #1F2226;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease, background 0.2s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        }

        .fl-back-to-top:hover .fl-back-to-top-circle {
          transform: translateY(-2px);
          background: #A3D600;
        }

        .fl-back-to-top-text {
          font-size: 10.5px;
          color: #6C707A;
          font-weight: 500;
          white-space: nowrap;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .fl-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
          .fl-col {
            padding: 0;
            border-right: none;
          }
        }

        @media (max-width: 640px) {
          .fl-container {
            padding: 28px 20px 16px;
          }
          .fl-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .fl-bottom-bar {
            flex-direction: column;
            gap: 12px;
            padding: 16px 20px 0;
            text-align: center;
          }
          .fl-back-to-top {
            position: relative;
            top: 0;
            right: 0;
            margin-top: 8px;
          }
        }
      `}</style>

      {/* Background Image: /home/wmremove-transformed.webp — subtle, low opacity */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
        {/* The actual image at low opacity so it's a subtle texture */}
        <Image
          src="/home/wmremove-transformed.webp"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center", opacity: 0.22 }}
          priority
        />
        {/* White overlay to keep background light and content readable */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(244, 246, 244, 0.78)",
        }} />
      </div>

      <div className="fl-container">
        <div className="fl-grid">
          {/* Column 1: Brand */}
          <div className="fl-col fl-col-divider">
            <div className="fl-logo-wrap">
              <Image
                src="/shared/Sytrion-Logo.png"
                alt="Sytrion Data Labs"
                width={160}
                height={40}
                style={{ height: "auto", display: "block" }}
                priority
              />
            </div>

            <h3 className="fl-brand-headline">
              Engineering intelligent operations for a <span>smarter world.</span>
            </h3>

            <p className="fl-brand-desc">
              AI-powered intelligent operations company helping organizations transform business processes through
              automation, data intelligence, and technology-driven innovation.
            </p>

            <div className="fl-socials">
              <a href="#" className="fl-social-btn" aria-label="LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" className="fl-social-btn" aria-label="X">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>

            <div className="fl-motto-row">
              <div className="fl-motto-bar"></div>
              <span className="fl-motto-text">PEOPLE | PROGRESS | POSSIBILITIES</span>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="fl-col fl-col-top">
            <h4 className="fl-heading">Company</h4>
            <div className="fl-heading-underline"></div>
            <div className="fl-link-list">
              {quickLinks.map((link) => (
                <Link key={link.label} href={link.href} className="fl-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Solutions */}
          <div className="fl-col fl-col-divider fl-col-top">
            <h4 className="fl-heading">Solutions</h4>
            <div className="fl-heading-underline"></div>
            <div className="fl-link-list">
              {solutions.map((link) => (
                <Link key={link.label} href={link.href} className="fl-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Get in touch */}
          <div className="fl-col fl-col-top">
            <h4 className="fl-heading">Get in touch</h4>
            <div className="fl-heading-underline"></div>

            <div className="fl-contact-list">
              <div className="fl-contact-item">
                <div className="fl-contact-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <span>hello@sytrionlabs.com</span>
              </div>

              <div className="fl-contact-item">
                <div className="fl-contact-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span>+91 98765 43210</span>
              </div>

              <div className="fl-contact-item">
                <div className="fl-contact-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span>Nashik, India</span>
              </div>
            </div>

            <div className="fl-callout-wrap">
              <div className="fl-callout-bar"></div>
              <div className="fl-callout-text">
                LET'S BUILD A<br />
                SMARTER TOMORROW TOGETHER.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section with Full Width Green Line */}
      <div className="fl-bottom-line-wrap">
        <div className="fl-bottom-green-line"></div>
        <div className="fl-bottom-bar">
          <div className="fl-copyright">
            &copy; 2026 Sytrion Data Labs Pvt. Ltd. All rights reserved.
          </div>

          <div className="fl-bottom-nav">
            <Link href="#">Privacy Policy</Link>
            <span>|</span>
            <Link href="#">Terms of Use</Link>
            <span>|</span>
            <Link href="#">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
