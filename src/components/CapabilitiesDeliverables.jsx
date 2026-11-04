"use client";

import React from 'react';
import { CAPABILITIES_DATA } from '../data/capabilities';

export default function CapabilitiesDeliverables({ activeSlug }) {
  const data = CAPABILITIES_DATA[activeSlug] || CAPABILITIES_DATA['web-experiences'];

  return (
    <section id="capabilities" className="deliverables-section" aria-label="Capabilities and Deliverables">
      <style jsx>{`
        .deliverables-section {
          position: relative;
          width: 100%;
          padding: 6.5rem 5% 7.5rem;
          background: #0B0E13;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .deliverables-container {
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
        .deliverables-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .deliverable-item {
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
          gap: 1rem;
          position: relative;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .deliverable-item:hover {
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
        .deliverable-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.8rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .deliverable-num {
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          font-weight: 700;
          color: ${data.accent};
          letter-spacing: 1px;
        }
        .deliverable-tag {
          font-family: 'Space Mono', monospace;
          font-size: 0.52rem;
          letter-spacing: 1px;
          color: #cbd5e1;
          text-transform: uppercase;
          background: rgba(14, 18, 26, 0.65);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }
        .deliverable-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: #F2F3F5;
          margin: 0;
        }
        .deliverable-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          line-height: 1.65;
          color: #9299A5;
          margin: 0;
        }
        @media (max-width: 860px) {
          .deliverables-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .deliverables-section {
            padding: 4.5rem 5% 5rem;
          }
          .deliverable-item {
            padding: 1.6rem 1.4rem;
          }
        }
      `}</style>

      <div className="deliverables-container">
        {/* HEADER */}
        <div className="section-header">
          <div>
            <span className="section-index">03 — DELIVERABLES &amp; SERVICES</span>
            <h2 className="section-heading">Operational Capabilities &amp; Formats</h2>
          </div>
          <div className="section-caption">
            <span className="caption-dot"></span>
            <span>SCOPE: {data.number} — {data.title}</span>
          </div>
        </div>

        {/* DELIVERABLES LIST */}
        <div className="deliverables-grid">
          {data.deliverables.map((item, idx) => {
            const numStr = String(idx + 1).padStart(2, '0');
            return (
              <div key={item.title} className="deliverable-item">
                <div className="deliverable-top">
                  <span className="deliverable-num">{numStr}.</span>
                  <span className="deliverable-tag">SPECIFICATION READY</span>
                </div>
                <h3 className="deliverable-title">{item.title}</h3>
                <p className="deliverable-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
