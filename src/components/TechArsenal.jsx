"use client";

import React from 'react';
import { CAPABILITIES_DATA } from '../data/capabilities';

export default function TechArsenal({ activeSlug }) {
  const data = CAPABILITIES_DATA[activeSlug] || CAPABILITIES_DATA['web-experiences'];

  return (
    <section id="arsenal" className="tech-arsenal-section" aria-label="Technical Tooling Arsenal">
      <style jsx>{`
        .tech-arsenal-section {
          position: relative;
          width: 100%;
          padding: 6.5rem 5% 7.5rem;
          background: #07090D;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .arsenal-container {
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
          color: #cbd5e1;
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
        .caption-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${data.accent};
          box-shadow: 0 0 8px ${data.accent};
        }
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.5rem;
        }
        .arsenal-group {
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
          padding: 2rem 1.8rem;
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .arsenal-group:hover {
          border-color: ${data.accent}66;
          border-top-color: ${data.accent};
          background: linear-gradient(
            165deg,
            rgba(22, 30, 48, 0.76) 0%,
            rgba(13, 18, 28, 0.84) 100%
          );
          box-shadow:
            inset 0 1.5px 0 0 rgba(255, 255, 255, 0.30),
            0 28px 60px -10px rgba(0, 0, 0, 0.90),
            0 0 28px -4px ${data.accent}25;
          transform: translateY(-2px);
        }
        .group-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.8rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .group-title {
          font-family: 'Space Mono', monospace, sans-serif;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 1.2px;
          color: #F2F3F5;
          text-transform: uppercase;
          margin: 0;
        }
        .group-badge {
          font-family: 'Space Mono', monospace;
          font-size: 0.52rem;
          color: ${data.accent};
          background: rgba(14, 18, 26, 0.65);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid ${data.accent}44;
          padding: 3px 8px;
          border-radius: 999px;
          letter-spacing: 1px;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }
        .chips-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tool-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.4px;
          color: #9299A5;
          background: rgba(14, 18, 26, 0.65);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
          padding: 6px 12px;
          border-radius: 999px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tool-chip-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transition: background 0.2s ease;
        }
        .tool-chip:hover {
          color: #F2F3F5;
          border-color: ${data.accent}88;
          border-top-color: ${data.accent};
          background: rgba(22, 30, 48, 0.85);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.25),
            0 0 16px -2px ${data.accent}33;
        }
        .tool-chip:hover .tool-chip-dot {
          background: ${data.accent};
        }
        @media (max-width: 640px) {
          .tech-arsenal-section {
            padding: 4.5rem 5% 5rem;
          }
          .categories-grid {
            grid-template-columns: 1fr;
          }
          .arsenal-group {
            padding: 1.6rem 1.4rem;
          }
        }
      `}</style>

      <div className="arsenal-container">
        {/* HEADER */}
        <div className="section-header">
          <div>
            <span className="section-index">04 — TECH ARSENAL</span>
            <h2 className="section-heading">Production Tooling &amp; Infrastructure</h2>
          </div>
          <div className="section-caption">
            <span className="caption-dot"></span>
            <span>ENVIRONMENT: {data.number} — {data.title}</span>
          </div>
        </div>

        {/* CATEGORIES GRID */}
        <div className="categories-grid">
          {data.tools.map((group) => (
            <div key={group.category} className="arsenal-group">
              <div className="group-header">
                <h3 className="group-title">{group.category}</h3>
                <span className="group-badge">ACTIVE</span>
              </div>
              <div className="chips-container">
                {group.items.map((tool) => (
                  <span key={tool} className="tool-chip">
                    <span className="tool-chip-dot"></span>
                    <span>{tool}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
