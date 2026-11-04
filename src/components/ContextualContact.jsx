"use client";

import React, { useState } from 'react';
import { CAPABILITIES_DATA, CAPABILITIES_LIST } from '../data/capabilities';

export default function ContextualContact({ activeSlug, onSelectCapability }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [budget, setBudget] = useState('');
  const [selectedCapabilityOverride, setSelectedCapabilityOverride] = useState(null);
  const [userCustomMessage, setUserCustomMessage] = useState(null);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const currentCapability = selectedCapabilityOverride || activeSlug;
  const data = CAPABILITIES_DATA[currentCapability] || CAPABILITIES_DATA['web-experiences'];

  const messageValue =
    userCustomMessage !== null
      ? userCustomMessage
      : data?.contactContext.defaultMessage || '';

  const handleCapabilityChange = (newSlug) => {
    setSelectedCapabilityOverride(newSlug);
    onSelectCapability(newSlug);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Field validation
    if (!name.trim() || name.trim().length < 2) {
      setErrorMessage('Please provide your name or organization name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid business email address.');
      return;
    }

    if (!messageValue.trim() || messageValue.trim().length < 8) {
      setErrorMessage('Please describe your project objectives (minimum 8 characters).');
      return;
    }

    setIsSubmitting(true);

    // Simulate resilient transmission with safety timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 750);
  };

  const budgetOptions = [
    { label: 'Select Inquiry Category (Optional)', value: '' },
    { label: 'Employment / Trainee Opportunity', value: 'employment-trainee' },
    { label: 'Technical Project / Prototype', value: 'technical-project' },
    { label: 'Creative or Technical Collaboration', value: 'collaboration' },
    { label: 'General Inquiry', value: 'general' },
  ];

  return (
    <section id="contact" className="contextual-contact-section" aria-label="Contextual Contact Inquiry">
      <style jsx>{`
        .contextual-contact-section {
          position: relative;
          width: 100%;
          padding: 6.5rem 5% 7.5rem;
          background: #0B0E13;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .contact-container {
          max-width: 1240px;
          margin: 0 auto;
        }
        .section-header {
          margin-bottom: 3.8rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .section-index {
          font-family: 'Space Mono', monospace, sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 2px;
          color: ${data.accent};
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.5rem;
        }
        .section-heading {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: clamp(1.8rem, 3.4vw, 2.5rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          color: #F2F3F5;
          margin: 0;
          line-height: 1.15;
        }
        .section-caption {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Space Mono', monospace;
          font-size: 0.62rem;
          color: ${data.accent};
          letter-spacing: 1.2px;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-top: 1.5px solid rgba(255, 255, 255, 0.28);
          background: linear-gradient(
            165deg,
            rgba(16, 22, 34, 0.58) 0%,
            rgba(10, 14, 22, 0.72) 60%,
            rgba(6, 8, 14, 0.82) 100%
          );
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          box-shadow:
            inset 0 1.5px 0 0 rgba(255, 255, 255, 0.25),
            0 0 24px -4px ${data.accent}20;
        }
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1.25fr;
          gap: 3.5rem;
          align-items: start;
        }
        .info-col {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .direct-statement {
          font-family: 'Inter', sans-serif;
          font-size: 1.05rem;
          line-height: 1.7;
          color: #9299A5;
          margin: 0;
        }
        .contact-card-box {
          background: linear-gradient(
            165deg,
            rgba(16, 22, 34, 0.65) 0%,
            rgba(10, 14, 22, 0.74) 60%,
            rgba(7, 9, 16, 0.84) 100%
          );
          backdrop-filter: blur(26px) saturate(160%);
          -webkit-backdrop-filter: blur(26px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-top: 1.5px solid rgba(255, 255, 255, 0.22);
          border-radius: 20px;
          box-shadow:
            inset 0 1.5px 0 0 rgba(255, 255, 255, 0.20),
            inset 0 0 16px 0 rgba(255, 255, 255, 0.02),
            inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.50),
            0 22px 50px -12px rgba(0, 0, 0, 0.85);
          padding: 2.2rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.3rem;
        }
        .detail-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .detail-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 1.2px;
          color: #9299A5;
          text-transform: uppercase;
        }
        .detail-val {
          font-family: 'Space Mono', monospace;
          font-size: 0.82rem;
          color: #F2F3F5;
        }
        .detail-link {
          color: ${data.accent};
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .detail-link:hover {
          color: #ffffff;
        }
        .direct-mailto-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 0.5rem;
          font-family: 'Space Mono', monospace;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 1px;
          color: #f2f3f5;
          background: linear-gradient(
            165deg,
            rgba(16, 22, 34, 0.58) 0%,
            rgba(10, 14, 22, 0.72) 60%,
            rgba(6, 8, 14, 0.82) 100%
          );
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-top: 1.5px solid rgba(255, 255, 255, 0.28);
          box-shadow: inset 0 1.5px 0 0 rgba(255, 255, 255, 0.25);
          padding: 8px 18px;
          border-radius: 999px;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          align-self: flex-start;
        }
        .direct-mailto-chip:hover {
          background: linear-gradient(
            165deg,
            rgba(22, 30, 48, 0.76) 0%,
            rgba(13, 18, 28, 0.84) 100%
          );
          border-color: ${data.accent};
          border-top-color: ${data.accent};
          box-shadow:
            inset 0 1.5px 0 0 rgba(255, 255, 255, 0.35),
            0 0 20px -2px ${data.accent}44;
          color: #ffffff;
        }
        .form-col {
          background: linear-gradient(
            165deg,
            rgba(16, 22, 34, 0.65) 0%,
            rgba(10, 14, 22, 0.74) 60%,
            rgba(7, 9, 16, 0.84) 100%
          );
          backdrop-filter: blur(26px) saturate(160%);
          -webkit-backdrop-filter: blur(26px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-top: 1.5px solid rgba(255, 255, 255, 0.22);
          border-radius: 20px;
          box-shadow:
            inset 0 1.5px 0 0 rgba(255, 255, 255, 0.20),
            inset 0 0 16px 0 rgba(255, 255, 255, 0.02),
            inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.50),
            0 22px 50px -12px rgba(0, 0, 0, 0.85);
          padding: 2.5rem;
          position: relative;
        }
        .form-grid-two {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
        }
        .form-group {
          margin-bottom: 1.4rem;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 1.2px;
          color: #F2F3F5;
          text-transform: uppercase;
        }
        .form-optional-tag {
          font-family: 'Space Mono', monospace;
          font-size: 0.52rem;
          color: #64748b;
          font-weight: 400;
        }
        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          background: rgba(10, 14, 24, 0.60);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.10);
          border-top-color: rgba(255, 255, 255, 0.18);
          border-radius: 12px;
          box-shadow:
            inset 0 1px 2px rgba(0, 0, 0, 0.50),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.10);
          padding: 0.85rem 1.1rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: #F2F3F5;
          outline: none;
          transition: all 0.22s ease;
          box-sizing: border-box;
        }
        .form-input:hover:not(:disabled),
        .form-select:hover:not(:disabled),
        .form-textarea:hover:not(:disabled) {
          border-color: rgba(255, 255, 255, 0.18);
          background: rgba(14, 19, 30, 0.72);
        }
        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: ${data.accent};
          border-top-color: ${data.accent};
          background: rgba(16, 22, 36, 0.85);
          box-shadow:
            0 0 0 3px ${data.accent}33,
            inset 0 1px 2px rgba(0, 0, 0, 0.40),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.14);
        }
        .form-select option {
          background: #0B0E13;
          color: #F2F3F5;
        }
        .error-banner {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.35);
          color: #fca5a5;
          font-family: 'Space Mono', monospace;
          font-size: 0.68rem;
          padding: 10px 14px;
          border-radius: 8px;
          margin-bottom: 1.2rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .submit-btn {
          width: 100%;
          padding: 1rem 1.5rem;
          border-radius: 999px;
          background: ${data.accent};
          color: #07090D;
          border: 1px solid ${data.accent};
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow:
            inset 0 1px 1px 0 rgba(255, 255, 255, 0.45),
            0 4px 18px -2px ${data.accent}44,
            0 1px 2px 0 rgba(0, 0, 0, 0.50);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .submit-btn:hover:not(:disabled) {
          background: #ffffff;
          border-color: #ffffff;
          box-shadow:
            inset 0 1px 1px 0 rgba(255, 255, 255, 0.70),
            0 6px 24px -2px rgba(255, 255, 255, 0.50);
          transform: translateY(-2px);
        }
        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .confirmation-box {
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.35);
          border-radius: 8px;
          padding: 2.5rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
        }
        .conf-title {
          font-family: 'Space Mono', monospace;
          font-size: 0.95rem;
          font-weight: 700;
          color: #10b981;
          letter-spacing: 1.2px;
          margin: 0;
        }
        .conf-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: #9299A5;
          line-height: 1.65;
          margin: 0;
          max-width: 480px;
        }
        @media (max-width: 1023px) {
          .contextual-contact-section {
            padding: 4.5rem 5% 5rem;
          }
          .contact-layout {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .form-col {
            padding: 1.8rem;
          }
          .form-grid-two {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }
      `}</style>

      <div className="contact-container">
        {/* HEADER */}
        <div className="section-header">
          <div>
            <span className="section-index">05 — GET IN TOUCH</span>
            <h2 className="section-heading">Open to Engineering Opportunities &amp; Technical Collaboration</h2>
          </div>
          <div className="section-caption">
            <span>ACTIVE FOCUS: {data.contactContext.topic}</span>
          </div>
        </div>

        {/* LAYOUT */}
        <div className="contact-layout">
          {/* INFO COLUMN */}
          <div className="info-col">
            <p className="direct-statement">
              Interested in web development, AI-assisted products, and practical technology projects? Send a message to discuss an opportunity, build, or collaboration.
            </p>

            <div className="contact-card-box">
              <div className="detail-row">
                <span className="detail-label">OPERATING BASE</span>
                <span className="detail-val">Based in Darbhanga, Bihar, India · Operating Worldwide</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">STUDIO AFFILIATION</span>
                <span className="detail-val">
                  Founder &amp; Principal at{' '}
                  <a
                    href="https://trendypixel.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail-link"
                  >
                    Trendy Pixel (trendypixel.de) ↗
                  </a>
                </span>
              </div>

              <div className="detail-row">
                <span className="detail-label">DIRECT CONTACT</span>
                <span className="detail-val">
                  <a href="mailto:adarshkarmic@gmail.com" className="detail-link">
                    adarshkarmic@gmail.com ↗
                  </a>
                </span>
              </div>

              <div className="detail-row">
                <span className="detail-label">AVAILABILITY STATUS</span>
                <span className="detail-val" style={{ color: '#10b981' }}>
                  ● Open to Engineering Roles &amp; Collaboration
                </span>
              </div>

              <a
                href={`mailto:adarshkarmic@gmail.com?subject=${encodeURIComponent(
                  `Inquiry: ${data.title}`
                )}&body=${encodeURIComponent(messageValue)}`}
                className="direct-mailto-chip"
              >
                <span>OPEN EMAIL CLIENT DIRECTLY</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* FORM COLUMN */}
          <div className="form-col">
            {submitted ? (
              <div className="confirmation-box">
                <span style={{ fontSize: '1.8rem', color: '#10b981' }}>✓</span>
                <h3 className="conf-title">INQUIRY RECEIVED</h3>
                <p className="conf-desc">
                  Thank you for reaching out, <strong style={{ color: '#F2F3F5' }}>{name}</strong>. Your note regarding{' '}
                  <strong style={{ color: data.accent }}>
                    {CAPABILITIES_DATA[currentCapability]?.title || 'Collaboration'}
                  </strong>{' '}
                  has been noted. For direct communication, you can also reach me directly at <strong style={{ color: '#00E5FF' }}>adarshkarmic@gmail.com</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setCompany('');
                    setBudget('');
                    setUserCustomMessage(null);
                  }}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#F2F3F5',
                    padding: '8px 18px',
                    borderRadius: '4px',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.65rem',
                    cursor: 'pointer',
                    marginTop: '0.5rem',
                  }}
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {errorMessage && (
                  <div className="error-banner" role="alert">
                    <span>⚠</span>
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="form-grid-two">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">
                      YOUR NAME / CONTACT *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      className="form-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">
                      BUSINESS EMAIL *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      className="form-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-grid-two">
                  <div className="form-group">
                    <label htmlFor="contact-company" className="form-label">
                      COMPANY / STUDIO <span className="form-optional-tag">(OPTIONAL)</span>
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      placeholder="e.g. Apex Studio"
                      className="form-input"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-budget" className="form-label">
                      INQUIRY CATEGORY <span className="form-optional-tag">(OPTIONAL)</span>
                    </label>
                    <select
                      id="contact-budget"
                      name="budget"
                      className="form-select"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    >
                      {budgetOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-capability" className="form-label">
                    PRIMARY TOPIC / AREA *
                  </label>
                  <select
                    id="contact-capability"
                    name="capability"
                    className="form-select"
                    value={currentCapability}
                    onChange={(e) => handleCapabilityChange(e.target.value)}
                  >
                    {CAPABILITIES_LIST.map((slug) => (
                      <option key={slug} value={slug}>
                        {CAPABILITIES_DATA[slug].number} — {CAPABILITIES_DATA[slug].title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    MESSAGE / TOPIC DETAILS *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    placeholder={data.contactContext.defaultMessage}
                    className="form-textarea"
                    value={messageValue}
                    onChange={(e) => setUserCustomMessage(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn"
                >
                  {isSubmitting ? 'TRANSMITTING MESSAGE...' : 'SEND MESSAGE ↗'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
