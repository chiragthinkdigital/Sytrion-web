"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name.";
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) newErrors.message = "Please enter a message.";
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        .contact-input {
          width: 100%;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.12);
          border-radius: 16px;
          padding: 16px 20px;
          font-size: 15px;
          font-family: inherit;
          font-weight: 400;
          color: #0f0f0f;
          outline: none;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .contact-input::placeholder {
          color: #999999;
        }
        .contact-input:focus {
          border-color: #C6E84A;
          box-shadow: 0 0 0 3px rgba(198,232,74,0.12);
        }
        .contact-input.error {
          border-color: #e53e3e;
          box-shadow: 0 0 0 3px rgba(229,62,62,0.1);
        }
        .contact-error {
          color: #e53e3e;
          font-size: 13px;
          margin-top: 6px;
          font-weight: 500;
        }
        .contact-form-btn {
          position: relative;
          overflow: hidden;
          background: #C6E84A;
          color: #0f0f0f;
          border: none;
          padding: 16px 32px;
          border-radius: 9999px;
          font-size: 16px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          width: 100%;
        }
        .contact-form-btn::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 60%;
          background: linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 100%);
          pointer-events: none;
          border-radius: inherit;
          transition: opacity 0.3s ease;
        }
        .contact-form-btn::after {
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
        .contact-form-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(198,232,74,0.35);
        }
        .contact-form-btn:hover::before {
          opacity: 1.2;
        }
        .contact-form-btn:hover::after {
          left: 120%;
        }
        .contact-form-btn:active {
          transform: translateY(0) scale(0.98);
        }
        .contact-detail-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: rgba(198,232,74,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C6E84A;
          flex-shrink: 0;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .contact-detail-row:hover .contact-detail-icon {
          background: #C6E84A;
          color: #FFFFFF;
        }
        .contact-detail-link {
          color: #5A5D66;
          font-size: 16px;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .contact-detail-link:hover {
          color: #C6E84A;
        }
        .contact-social-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          border: 1px solid rgba(0,0,0,0.08);
          background: rgba(198,232,74,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #5A5D66;
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.3s ease, color 0.3s ease, background 0.3s ease;
        }
        .contact-social-icon:hover {
          border-color: #C6E84A;
          color: #C6E84A;
          background: rgba(198,232,74,0.1);
        }
        @media (max-width: 1024px) {
          .contact-hero-section {
            padding: 120px 40px 60px !important;
          }
          .contact-form-section {
            padding: 80px 40px !important;
          }
          .contact-details-section {
            padding: 80px 40px !important;
          }
          .contact-banner {
            padding: 80px 40px !important;
          }
          .contact-grid {
            gap: 48px !important;
          }
        }
        @media (max-width: 768px) {
          .contact-hero-section {
            padding: 80px 20px 60px !important;
          }
          .contact-form-section {
            padding: 60px 20px !important;
          }
          .contact-details-section {
            padding: 60px 20px !important;
          }
          .contact-banner {
            padding: 60px 20px !important;
          }
          .contact-grid {
            flex-direction: column !important;
            gap: 48px !important;
          }
          .contact-grid-form,
          .contact-grid-details {
            width: 100% !important;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section
        className="contact-hero-section"
        style={{
          width: "100%",
          background: "#ffffff",
          padding: "140px 80px 80px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <span className="eyebrow-badge" style={{ marginBottom: "18px" }}>
            Contact us
          </span>

          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 56px)",
              fontWeight: 700,
              color: "#0f0f0f",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Let&apos;s start a <span style={{ color: "#C6E84A" }}>conversation</span>
          </h1>

          <p
            style={{
              fontSize: "18px",
              fontWeight: 400,
              color: "#5A5D66",
              lineHeight: 1.7,
              maxWidth: "100%",
            }}
          >
            Whether you&apos;re exploring AI-driven transformation, intelligent
            operations, or industry-specific solutions, we&apos;re here to help
            you take the next step.
          </p>
        </div>
      </section>

      {/* Form & Details Section */}
      <section
        className="contact-form-section"
        style={{
          width: "100%",
          background: "#F8F8F8",
          padding: "100px 80px",
        }}
      >
        <div
          className="contact-grid"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            gap: "80px",
          }}
        >
          {/* Left — Contact Form */}
          <div className="contact-grid-form" style={{ flex: 1 }}>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 36px)",
                fontWeight: 700,
                color: "#0f0f0f",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                marginBottom: "16px",
              }}
            >
              Send us a message
            </h2>

            <div
              style={{
                width: "60px",
                height: "3px",
                background: "#C6E84A",
                borderRadius: "2px",
                marginBottom: "40px",
              }}
            />

            {submitted ? (
              <div
                style={{
                  padding: "60px 40px",
                  background: "#ffffff",
                  borderRadius: "20px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "20px",
                    background: "rgba(198,232,74,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                  }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C6E84A"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#0f0f0f",
                    marginBottom: "12px",
                  }}
                >
                  Message sent
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#5A5D66",
                    lineHeight: 1.7,
                  }}
                >
                  Thank you for reaching out. Our team will get back to you
                  within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: "24px" }}>
                  <label
                    htmlFor="name"
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#0f0f0f",
                      marginBottom: "8px",
                    }}
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Priya Sharma"
                    value={formData.name}
                    onChange={handleChange}
                    className={`contact-input ${errors.name ? "error" : ""}`}
                  />
                  {errors.name && <p className="contact-error">{errors.name}</p>}
                </div>

                <div style={{ marginBottom: "24px" }}>
                  <label
                    htmlFor="email"
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#0f0f0f",
                      marginBottom: "8px",
                    }}
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="priya@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`contact-input ${errors.email ? "error" : ""}`}
                  />
                  {errors.email && <p className="contact-error">{errors.email}</p>}
                </div>

                <div style={{ marginBottom: "24px" }}>
                  <label
                    htmlFor="phone"
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#0f0f0f",
                      marginBottom: "8px",
                    }}
                  >
                    Phone number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="contact-input"
                  />
                </div>

                <div style={{ marginBottom: "32px" }}>
                  <label
                    htmlFor="message"
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#0f0f0f",
                      marginBottom: "8px",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your project or inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`contact-input ${errors.message ? "error" : ""}`}
                    style={{ resize: "vertical", minHeight: "120px" }}
                  />
                  {errors.message && <p className="contact-error">{errors.message}</p>}
                </div>

                <button type="submit" className="contact-form-btn">
                  Send message
                </button>
              </form>
            )}
          </div>

          {/* Right — Contact Details */}
          <div
            className="contact-grid-details"
            style={{ flex: 1 }}
          >
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 36px)",
                fontWeight: 700,
                color: "#0f0f0f",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                marginBottom: "16px",
              }}
            >
              Get in <span style={{ color: "#C6E84A" }}>touch</span>
            </h2>

            <div
              style={{
                width: "60px",
                height: "3px",
                background: "#C6E84A",
                borderRadius: "2px",
                marginBottom: "40px",
              }}
            />

            <p
              style={{
                fontSize: "17px",
                fontWeight: 400,
                color: "#5A5D66",
                lineHeight: 1.8,
                marginBottom: "48px",
                maxWidth: "65ch",
              }}
            >
              Have a question or ready to start a project? Reach out through any
              of the channels below and we&apos;ll respond promptly.
            </p>

            {/* Email */}
            <div
              className="contact-detail-row"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "20px",
                marginBottom: "36px",
              }}
            >
              <div className="contact-detail-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#0f0f0f",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    marginBottom: "6px",
                  }}
                >
                  Email
                </p>
                <a
                  href="mailto:hello@sytrionlabs.com"
                  className="contact-detail-link"
                >
                  hello@sytrionlabs.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div
              className="contact-detail-row"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "20px",
                marginBottom: "36px",
              }}
            >
              <div className="contact-detail-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#0f0f0f",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    marginBottom: "6px",
                  }}
                >
                  Phone
                </p>
                <a
                  href="tel:+919876543210"
                  className="contact-detail-link"
                >
                  +91 98765 43210
                </a>
              </div>
            </div>

            {/* Address */}
            <div
              className="contact-detail-row"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "20px",
                marginBottom: "36px",
              }}
            >
              <div className="contact-detail-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#0f0f0f",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    marginBottom: "6px",
                  }}
                >
                  Office
                </p>
                <p className="contact-detail-link" style={{ lineHeight: 1.7 }}>
                  Nashik, Maharashtra<br />
                  India
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div
              style={{
                borderTop: "1px solid rgba(0,0,0,0.08)",
                paddingTop: "36px",
                marginTop: "12px",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#0f0f0f",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "20px",
                }}
              >
                Follow us
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
                <a
                  href="#"
                  className="contact-social-icon"
                  aria-label="LinkedIn"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="contact-social-icon"
                  aria-label="X (Twitter)"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4l11.733 16h4.267l-11.733-16z" />
                    <path d="M4 20l6.768-6.768m2.46-2.46L20 4" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="contact-social-icon"
                  aria-label="Instagram"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="1"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Banner */}
      <section
        className="contact-banner"
        style={{
          width: "100%",
          background: "#0f0f0f",
          padding: "80px 80px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "750px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              marginBottom: "20px",
            }}
          >
            Prefer to talk directly?
          </h2>
          <p
            style={{
              fontSize: "17px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.7,
              marginBottom: "40px",
            }}
          >
            Our team is available for a quick call to discuss your project
            requirements and how Sytrion can help transform your operations.
          </p>
          <a
            href="tel:+919876543210"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              position: "relative",
              overflow: "hidden",
              background: "#C6E84A",
              color: "#0f0f0f",
              padding: "16px 32px",
              borderRadius: "9999px",
              fontSize: "16px",
              fontWeight: 700,
              textDecoration: "none",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            Call us now
          </a>
        </div>
      </section>
    </>
  );
}
