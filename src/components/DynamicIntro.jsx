"use client";

import React from 'react';
import { CAPABILITIES_DATA } from '../data/capabilities';

export default function DynamicIntro({ activeSlug }) {
  const data = CAPABILITIES_DATA[activeSlug] || CAPABILITIES_DATA['web-experiences'];

  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="intro" className="dynamic-intro-section" aria-label="Capability Introduction">
      <style jsx>{`
        .dynamic-intro-section {
          position: relative;
          width: 100%;
          padding: 7rem 5% 6rem;
          background: #07090d;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }
        .intro-container {
          max-width: 1240px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .category-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Space Mono', monospace, sans-serif;
          font-size: 0.65rem;
          letter-spacing: 2px;
          font-weight: 700;
          color: ${data.accent};
          margin-bottom: 1.6rem;
          text-transform: uppercase;
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
          box-shadow:
            inset 0 1.5px 0 0 rgba(255, 255, 255, 0.25),
            0 0 24px -4px ${data.accent}20;
          padding: 6px 16px;
          border-radius: 999px;
        }
        .category-bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${data.accent};
          box-shadow: 0 0 8px ${data.accent};
        }
        .intro-headline {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: clamp(2rem, 4.4vw, 3.6rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.12;
          color: #f2f3f5;
          max-width: 1100px;
          margin-bottom: 2.5rem;
        }
        .intro-content-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 4.5rem;
          align-items: start;
          padding-top: 2.2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }
        .manifesto-col {
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
        }
        .business-problem-text {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.92rem, 1.25vw, 1.05rem);
          line-height: 1.7;
          color: #cbd5e1;
          margin: 0;
        }
        .manifesto-body {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.95rem, 1.3vw, 1.1rem);
          line-height: 1.75;
          color: #9299a5;
          border-left: 2px solid ${data.accent};
          padding-left: 1.6rem;
          margin: 0;
        }
        .intro-cta-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-top: 0.5rem;
        }
        .intro-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: #07090d;
          background: ${data.accent};
          border: 1px solid ${data.accent};
          padding: 11px 24px;
          border-radius: 999px;
          text-decoration: none;
          cursor: pointer;
          box-shadow:
            inset 0 1px 1px 0 rgba(255, 255, 255, 0.45),
            0 4px 18px -2px ${data.accent}44,
            0 1px 2px 0 rgba(0, 0, 0, 0.50);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .intro-cta-btn:hover {
          background: #ffffff;
          border-color: #ffffff;
          box-shadow:
            inset 0 1px 1px 0 rgba(255, 255, 255, 0.70),
            0 6px 24px -2px rgba(255, 255, 255, 0.50);
          transform: translateY(-2px);
        }
        .stats-col {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .stats-strip {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .stat-block {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding-left: 1rem;
          border-left: 1px solid rgba(255, 255, 255, 0.1);
        }
        .stat-val {
          font-family: 'Space Mono', monospace, sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #f2f3f5;
          letter-spacing: 0.5px;
        }
        .stat-lbl {
          font-family: 'Space Mono', monospace, sans-serif;
          font-size: 0.54rem;
          letter-spacing: 1.2px;
          color: #64748b;
          text-transform: uppercase;
          margin-top: 2px;
        }
        @media (max-width: 1023px) {
          .dynamic-intro-section {
            padding: 5rem 5% 4rem;
          }
          .intro-content-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .stats-strip {
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          }
        }
        @media (max-width: 640px) {
          .stats-strip {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `}</style>

      <div className="intro-container">
        <div className="category-eyebrow">
          <span className="category-bullet" aria-hidden="true"></span>
          <span>{data.intro.categoryIdentifier || `${data.number} — ${data.title}`}</span>
        </div>

        <h2 className="intro-headline">{data.intro.headline}</h2>

        <div className="intro-content-grid">
          <div className="manifesto-col">
            <p className="business-problem-text">{data.intro.businessProblem}</p>
            <p className="manifesto-body">{data.intro.manifesto}</p>

            <div className="intro-cta-row">
              <a href="#contact" onClick={scrollToContact} className="intro-cta-btn">
                <span>{data.primaryCta || 'Discuss This Capability'}</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          <div className="stats-col">
            <div className="stats-strip">
              {data.intro.stats.map((stat, idx) => (
                <div key={idx} className="stat-block">
                  <span className="stat-val">{stat.value}</span>
                  <span className="stat-lbl">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
