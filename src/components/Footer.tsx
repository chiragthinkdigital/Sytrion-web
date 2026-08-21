import Image from "next/image";

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
  return (
    <footer
      className="fl-footer-root"
      style={{
        width: "100%",
        background: "#EEF0F1",
        padding: "32px 80px 16px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        .fl-footer-root::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #C6E84A, transparent);
          z-index: 3;
        }
        .fl-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(198,232,74,0.2), transparent 70%);
          top: -180px;
          right: -120px;
          filter: blur(40px);
          z-index: 1;
          pointer-events: none;
        }
        .fl-glow-bottom {
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(198,232,74,0.1), transparent 70%);
          bottom: -100px;
          left: -80px;
          filter: blur(40px);
          z-index: 1;
          pointer-events: none;
        }
        .fl-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.2fr;
          gap: 32px;
          align-items: flex-start;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .fl-heading {
          font-size: 15px;
          font-weight: 700;
          color: #0f0f0f;
          margin-bottom: 20px;
          letter-spacing: 0.5px;
        }
        .fl-col-pad {
          padding-top: 48px;
        }
        .fl-link {
          color: #5A5D66;
          font-size: 16px;
          text-decoration: none;
          display: block;
          padding: 0;
          margin-bottom: 20px;
          line-height: 1;
          transition: color 0.2s ease;
        }
        .fl-link:hover {
          color: #C6E84A;
        }
        .fl-contact {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          color: #5A5D66;
          font-size: 16px;
          line-height: 1;
        }
        .fl-contact svg {
          flex-shrink: 0;
          color: #0f0f0f;
          background: #C6E84A;
          border-radius: 50%;
          padding: 5px;
          width: 30px;
          height: 30px;
          transition: background 0.25s ease, color 0.25s ease;
        }
        .fl-contact:hover svg {
          background: #0f0f0f;
          color: #C6E84A;
        }
        .fl-social {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #C6E84A;
          color: #0f0f0f;
          text-decoration: none;
          margin-right: 10px;
          transition: background 0.25s ease, color 0.25s ease;
        }
        .fl-social:hover {
          background: #0f0f0f;
          color: #C6E84A;
        }
        .fl-divider {
          border: none;
          border-top: 1px solid #D8DBDD;
          margin: 16px auto 0;
          max-width: 1400px;
        }
        .fl-bottom {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0 0;
          position: relative;
          z-index: 2;
        }
        .fl-bottom-link {
          color: #8A8D96;
          font-size: 14px;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .fl-bottom-link:hover {
          color: #C6E84A;
        }
        .fl-bottom-sep {
          color: rgba(0,0,0,0.15);
          margin: 0 12px;
        }
        @media (max-width: 1024px) {
          .fl-footer-root {
            padding: 40px 40px 20px;
          }
          .fl-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px 36px;
          }
          .fl-col-pad {
            padding-top: 12px;
          }
        }
        @media (max-width: 768px) {
          .fl-footer-root {
            padding: 32px 20px 16px;
          }
          .fl-grid {
            grid-template-columns: 1fr;
            gap: 36px;
            text-align: center;
          }
          .fl-contact {
            justify-content: center;
          }
          .fl-socials {
            justify-content: center;
          }
          .fl-bottom {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
        }
      `}</style>

      <div className="fl-glow" />
      <div className="fl-glow-bottom" />
      <div className="fl-footer">
        <div className="fl-grid">
          {/* Brand */}
          <div>
            <Image
              src="/shared/Sytrion-Logo.png"
              alt="Sytrion Data Labs"
              width={170}
              height={44}
              style={{ height: "auto", marginBottom: "12px" }}
            />
            <p
              style={{
                fontSize: "17px",
                fontWeight: 600,
                color: "#8FAB1E",
                marginBottom: "8px",
                lineHeight: 1.4,
              }}
            >
              Engineering intelligent operations for a smarter world.
            </p>
            <p
              style={{
                fontSize: "15px",
                color: "#8A8D96",
                lineHeight: 1.5,
                maxWidth: "420px",
                marginBottom: "12px",
              }}
            >
              AI-powered intelligent operations company
              helping organizations transform business processes through
              automation, data intelligence, and technology-driven innovation.
            </p>
            <div className="fl-socials">
              <a href="#" className="fl-social" aria-label="LinkedIn">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" className="fl-social" aria-label="X">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="fl-col-pad">
            <h4 className="fl-heading">Company</h4>
            <nav>
              {quickLinks.map((link) => (
                <a key={link.label} href={link.href} className="fl-link">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Solutions */}
          <div className="fl-col-pad">
            <h4 className="fl-heading">Solutions</h4>
            <nav>
              {solutions.map((link) => (
                <a key={link.label} href={link.href} className="fl-link">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="fl-col-pad">
            <h4 className="fl-heading">Get in touch</h4>
            <div className="fl-contact">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>hello@sytrionlabs.com</span>
            </div>
            <div className="fl-contact">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>+91 98765 43210</span>
            </div>
            <div className="fl-contact">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Nashik, India</span>
            </div>
          </div>
        </div>
      </div>

      <hr className="fl-divider" />
      <div className="fl-bottom">
        <span style={{ color: "#8A8D96", fontSize: "14px" }}>
          &copy; 2026 Sytrion Data Labs Pvt. Ltd. All rights reserved.
        </span>
        <div>
          <a href="https://thinkdigitalindia.in/" className="fl-bottom-link">Designed & Developed by Think Digital</a>
          <span className="fl-bottom-sep">&middot;</span>
        </div>
      </div>
    </footer>
  );
}
