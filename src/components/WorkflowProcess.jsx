"use client";

import React from 'react';
import { CAPABILITIES_DATA } from '../data/capabilities';

export default function WorkflowProcess({ activeSlug }) {
  const data = CAPABILITIES_DATA[activeSlug] || CAPABILITIES_DATA['web-experiences'];

  return (
    <section id="process" className="workflow-process-section" aria-label="Creative & Technical Process">
      <style jsx>{`
        .workflow-process-section {
          position: relative;
          width: 100%;
          padding: 7rem 5% 8rem;
          background: #07090d;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }
        .process-container {
          max-width: 1240px;
          margin: 0 auto;
        }
        .section-header {
          margin-bottom: 4.5rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 1.5rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }
        .section-index {
          font-family: 'Space Mono', monospace, sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 2px;
          color: ${data.accent};
          text-transform: uppercase;
        }
        .section-heading {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: clamp(2rem, 3.8vw, 2.8rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #f2f3f5;
          margin-top: 6px;
        }
        .section-caption {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Space Mono', monospace;
          font-size: 0.62rem;
          color: #cbd5e1;
          letter-spacing: 1.4px;
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

        /* CONTINUOUS HORIZONTAL TIMELINE PROGRESSION */
        .timeline-rail {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.8rem;
          position: relative;
        }
        .timeline-card {
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
          padding: 2.2rem 1.8rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .timeline-card:hover {
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
            0 0 24px -4px ${data.accent}25;
          transform: translateY(-3px);
        }
        .timeline-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: ${data.accent};
          transition: width 0.35s ease;
        }
        .timeline-card:hover::before {
          width: 100%;
        }
        .card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .phase-tag {
          font-family: 'Space Mono', monospace;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: ${data.accent};
          text-transform: uppercase;
          background: rgba(14, 18, 26, 0.65);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid ${data.accent}33;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }
        .step-watermark {
          font-family: 'Space Mono', monospace;
          font-size: 1.8rem;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.07);
          line-height: 1;
        }
        .step-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.02rem;
          font-weight: 700;
          color: #f2f3f5;
          line-height: 1.35;
        }
        .step-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          line-height: 1.7;
          color: #9299a5;
        }

        @media (max-width: 1023px) {
          .timeline-rail {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.4rem;
          }
        }
        @media (max-width: 640px) {
          .workflow-process-section {
            padding: 5rem 5% 5rem;
          }
          .timeline-rail {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="process-container">
        {/* HEADER */}
        <div className="section-header">
          <div>
            <span className="section-index">02 — EXECUTION PIPELINE</span>
            <h2 className="section-heading">Disciplined Production Progression</h2>
          </div>
          <span className="section-caption">
            METHODOLOGY: {data.number} — {data.title}
          </span>
        </div>

        {/* 4-STEP TIMELINE RAIL */}
        <div className="timeline-rail">
          {data.processSteps.map((pStep) => (
            <div key={pStep.step} className="timeline-card">
              <div className="card-top-row">
                <span className="phase-tag">PHASE {pStep.step}</span>
                <span className="step-watermark">{pStep.step}</span>
              </div>
              <h3 className="step-title">{pStep.title}</h3>
              <p className="step-desc">{pStep.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
