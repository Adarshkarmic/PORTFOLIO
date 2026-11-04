"use client";

import React, { useState, useEffect } from 'react';
import { CAPABILITIES_DATA } from '../data/capabilities';

export default function SelectedWork({ activeSlug }) {
  const data = CAPABILITIES_DATA[activeSlug] || CAPABILITIES_DATA['web-experiences'];
  const [activeModalProject, setActiveModalProject] = useState(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModalProject(null);
      }
    };
    if (activeModalProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalProject]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'LIVE':
      case 'LIVE DEPLOYMENT':
        return { color: '#10b981', dot: '#10b981', text: 'LIVE' };
      case 'COMPLETED':
        return { color: '#10b981', dot: '#10b981', text: 'COMPLETED' };
      case 'SELF-INITIATED FLAGSHIP':
        return { color: '#00e5ff', dot: '#00e5ff', text: 'FOUNDER LAB' };
      case 'PROTOTYPE':
      case 'PROTOTYPE IN DEVELOPMENT':
        return { color: '#f59e0b', dot: '#f59e0b', text: 'PROTOTYPE' };
      case 'IN DEVELOPMENT':
      case 'CURRENTLY BUILDING':
        return { color: '#f59e0b', dot: '#f59e0b', text: 'IN DEVELOPMENT' };
      case 'COMING SOON':
        return { color: '#9299a5', dot: '#64748b', text: 'COMING SOON' };
      default:
        return { color: '#9299a5', dot: '#64748b', text: status || 'CONCEPT' };
    }
  };

  const primaryProject = data.projects[0];
  const secondaryProjects = data.projects.slice(1);

  const scrollToContact = () => {
    setActiveModalProject(null);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="work" className="selected-work-section" aria-label="Selected Work and Case Studies">
      <style jsx>{`
        .selected-work-section {
          position: relative;
          width: 100%;
          padding: 7rem 5% 8rem;
          background: #0b0e13;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }
        .work-container {
          max-width: 1240px;
          margin: 0 auto;
        }
        .section-header {
          margin-bottom: 4rem;
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

        /* PRIMARY FEATURED SHOWCASE (EXPANSIVE 2-COL HERO CARD) */
        .primary-showcase {
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
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          overflow: hidden;
          margin-bottom: 2.5rem;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .primary-showcase:hover {
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
            0 0 32px ${data.accent}20;
          transform: translateY(-2px);
        }
        .primary-content {
          padding: 3.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .card-meta-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }
        .index-pill {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          font-weight: 700;
          color: ${data.accent};
          letter-spacing: 1px;
        }
        .category-text {
          font-family: 'Space Mono', monospace;
          font-size: 0.58rem;
          color: #9299a5;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }
        .project-type-badge {
          font-family: 'Space Mono', monospace;
          font-size: 0.52rem;
          color: #cbd5e1;
          background: rgba(14, 18, 26, 0.65);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }
        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Space Mono', monospace;
          font-size: 0.52rem;
          letter-spacing: 1px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 999px;
          background: rgba(14, 18, 26, 0.70);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.10);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.20);
        }
        .status-microdot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
        }
        .primary-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.5rem, 2.4vw, 2.1rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          color: #f2f3f5;
          line-height: 1.2;
          margin-bottom: 1.2rem;
        }
        .primary-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          line-height: 1.7;
          color: #9299a5;
          margin-bottom: 2rem;
        }
        .tech-tags-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 2rem;
        }
        .tech-tag-chip {
          font-family: 'Space Mono', monospace;
          font-size: 0.58rem;
          color: #cbd5e1;
          background: rgba(14, 18, 26, 0.65);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 5px 12px;
          border-radius: 999px;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }
        .action-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .primary-action-btn {
          font-family: 'Space Mono', monospace;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 1.2px;
          color: ${data.accent};
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .primary-action-btn:hover {
          color: #ffffff;
          transform: translateX(3px);
        }
        .case-study-trigger-btn {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 1.2px;
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
          border-radius: 999px;
          padding: 8px 18px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow:
            inset 0 1.5px 0 0 rgba(255, 255, 255, 0.25),
            0 4px 16px -2px rgba(0, 0, 0, 0.50);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .case-study-trigger-btn:hover {
          background: linear-gradient(
            165deg,
            rgba(22, 30, 48, 0.76) 0%,
            rgba(13, 18, 28, 0.84) 100%
          );
          border-color: ${data.accent}88;
          border-top-color: ${data.accent};
          box-shadow:
            inset 0 1.5px 0 0 rgba(255, 255, 255, 0.35),
            0 6px 20px -2px ${data.accent}33;
          color: #ffffff;
          transform: translateY(-1px);
        }

        /* PRIMARY VISUAL MOCKUP VIEWPORT */
        .primary-viewport {
          background: #07090d;
          border-left: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .viewport-chrome {
          height: 38px;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding: 0 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .traffic-lights {
          display: flex;
          gap: 6px;
        }
        .light-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
        }
        .url-bar-pill {
          flex: 1;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 4px;
          height: 20px;
          padding: 0 10px;
          display: flex;
          align-items: center;
          font-family: 'Space Mono', monospace;
          font-size: 0.52rem;
          color: #64748b;
        }
        .viewport-canvas {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          min-height: 280px;
          padding: 2rem;
          background: radial-gradient(circle at 50% 50%, ${data.glow} 0%, transparent 75%);
          overflow: hidden;
        }
        .canvas-grid-lines {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        .canvas-center-badge {
          position: relative;
          z-index: 2;
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 2px;
          color: ${data.accent};
          background: rgba(7, 9, 13, 0.88);
          border: 1px solid ${data.accent}44;
          padding: 10px 20px;
          border-radius: 6px;
          box-shadow: 0 0 25px ${data.accent}22;
          text-align: center;
          max-width: 85%;
        }
        .canvas-arch-note {
          position: relative;
          z-index: 2;
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          color: #9299a5;
          text-align: center;
          margin-top: 1rem;
          max-width: 80%;
          line-height: 1.5;
        }

        /* SECONDARY SHOWCASES (ASYMMETRIC 2-COLUMN DECK) */
        .secondary-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        .secondary-card {
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
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .secondary-card:hover {
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
            0 0 24px ${data.accent}15;
          transform: translateY(-3px);
        }
        .secondary-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #f2f3f5;
          line-height: 1.35;
          margin-bottom: 0.9rem;
        }
        .secondary-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          line-height: 1.65;
          color: #9299a5;
          margin-bottom: 1.8rem;
        }

        /* EXPANDABLE CASE STUDY MODAL */
        .case-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(7, 9, 13, 0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: fadeInModal 0.25s ease-out;
        }
        @keyframes fadeInModal {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .case-modal-dialog {
          background: rgba(12, 16, 25, 0.94);
          backdrop-filter: blur(32px) saturate(180%);
          -webkit-backdrop-filter: blur(32px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-top: 1.5px solid rgba(255, 255, 255, 0.28);
          box-shadow:
            inset 0 1.5px 0 0 rgba(255, 255, 255, 0.25),
            0 32px 80px -12px rgba(0, 0, 0, 0.95),
            0 0 40px ${data.glow};
          border-radius: 22px;
          width: 100%;
          max-width: 860px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .modal-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 1.5rem;
        }
        .modal-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.6rem, 2.8vw, 2.2rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          color: #ffffff;
          margin: 0.5rem 0 0 0;
          line-height: 1.2;
        }
        .modal-close-btn {
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
          color: #f2f3f5;
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 8px 18px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          flex-shrink: 0;
        }
        .modal-close-btn:hover {
          background: linear-gradient(
            165deg,
            rgba(22, 30, 48, 0.76) 0%,
            rgba(13, 18, 28, 0.84) 100%
          );
          color: #ffffff;
          border-color: ${data.accent};
          border-top-color: ${data.accent};
          box-shadow:
            inset 0 1.5px 0 0 rgba(255, 255, 255, 0.35),
            0 0 16px -2px ${data.accent}44;
        }
        .case-section-block {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .case-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: ${data.accent};
          text-transform: uppercase;
        }
        .case-body {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          line-height: 1.7;
          color: #cbd5e1;
          margin: 0;
        }
        .case-grid-two {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .case-status-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-left: 3px solid ${data.accent};
          padding: 1.2rem 1.5rem;
          border-radius: 6px;
        }
        .case-status-note {
          font-family: 'Space Mono', monospace;
          font-size: 0.75rem;
          color: #f1f5f9;
          margin: 0;
          line-height: 1.5;
        }
        .modal-footer-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .modal-cta-btn {
          background: ${data.accent};
          color: #07090d;
          border: 1px solid ${data.accent};
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 1.2px;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          text-transform: uppercase;
          transition: all 0.25s ease;
        }
        .modal-cta-btn:hover {
          background: #ffffff;
          border-color: #ffffff;
          transform: translateY(-2px);
        }

        @media (max-width: 1023px) {
          .primary-showcase {
            grid-template-columns: 1fr;
          }
          .primary-content {
            padding: 2.5rem;
          }
          .primary-viewport {
            border-left: none;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            min-height: 220px;
          }
          .secondary-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .case-grid-two {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .case-modal-dialog {
            padding: 2rem;
          }
        }
        @media (max-width: 640px) {
          .selected-work-section {
            padding: 5rem 5% 5rem;
          }
          .primary-content {
            padding: 1.8rem;
          }
          .secondary-card {
            padding: 1.8rem;
          }
          .case-modal-dialog {
            padding: 1.5rem;
          }
        }
      `}</style>

      <div className="work-container">
        {/* SECTION HEADER */}
        <div className="section-header">
          <div>
            <span className="section-index">01 — SELECTED WORK</span>
            <h2 className="section-heading">Curated Case Studies &amp; Prototypes</h2>
          </div>
          <span className="section-caption">
            ACTIVE DOMAIN: {data.number} — {data.title}
          </span>
        </div>

        {/* PRIMARY HERO CASE STUDY */}
        {primaryProject && (
          <article className="primary-showcase">
            <div className="primary-content">
              <div>
                <div className="card-meta-row">
                  <span className="index-pill">[ 01 ]</span>
                  <span className="category-text">{primaryProject.category}</span>
                  <span className="project-type-badge">{primaryProject.projectType}</span>
                  {(() => {
                    const badge = getStatusBadge(primaryProject.status);
                    return (
                      <span className="status-pill" style={{ color: badge.color }}>
                        <span
                          className="status-microdot"
                          style={{ background: badge.dot }}
                          aria-hidden="true"
                        ></span>
                        {badge.text}
                      </span>
                    );
                  })()}
                </div>

                <h3 className="primary-title">{primaryProject.title}</h3>
                <p className="primary-desc">{primaryProject.description}</p>
              </div>

              <div>
                <div className="tech-tags-wrap">
                  {primaryProject.technology.map((tag) => (
                    <span key={tag} className="tech-tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="action-row">
                  <button
                    type="button"
                    onClick={() => setActiveModalProject(primaryProject)}
                    className="case-study-trigger-btn"
                  >
                    <span>EXPLORE CASE STUDY</span>
                    <span>[ + ]</span>
                  </button>

                  {primaryProject.isLive && primaryProject.liveUrl && (
                    <a
                      href={primaryProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="primary-action-btn"
                    >
                      <span>VIEW LIVE DEPLOYMENT</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* HIGH-PRECISION DISPLAY MOCKUP FRAME */}
            <div className="primary-viewport" aria-hidden="true">
              <div className="viewport-chrome">
                <div className="traffic-lights">
                  <span className="light-dot"></span>
                  <span className="light-dot"></span>
                  <span className="light-dot"></span>
                </div>
                <div className="url-bar-pill">
                  {primaryProject.liveUrl ? primaryProject.liveUrl.replace('https://', '') : 'prototype preview'}
                </div>
              </div>

              <div className="viewport-canvas">
                <div className="canvas-grid-lines"></div>
                <div className="canvas-center-badge">
                  {primaryProject.title.toUpperCase()}
                </div>
                <p className="canvas-arch-note">{primaryProject.architecture}</p>
              </div>
            </div>
          </article>
        )}

        {/* SECONDARY SHOWCASES (ASYMMETRIC DECK) */}
        {secondaryProjects.length > 0 && (
          <div className="secondary-grid">
            {secondaryProjects.map((project, idx) => {
              const badge = getStatusBadge(project.status);
              const cardNum = idx + 2;
              return (
                <article key={project.id} className="secondary-card">
                  <div>
                    <div className="card-meta-row">
                      <span className="index-pill">[ 0{cardNum} ]</span>
                      <span className="category-text">{project.category}</span>
                      <span className="project-type-badge">{project.projectType}</span>
                      <span className="status-pill" style={{ color: badge.color }}>
                        <span
                          className="status-microdot"
                          style={{ background: badge.dot }}
                          aria-hidden="true"
                        ></span>
                        {badge.text}
                      </span>
                    </div>

                    <h3 className="secondary-title">{project.title}</h3>
                    <p className="secondary-desc">{project.description}</p>
                  </div>

                  <div>
                    <div className="tech-tags-wrap">
                      {project.technology.map((tag) => (
                        <span key={tag} className="tech-tag-chip">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="action-row">
                      <button
                        type="button"
                        onClick={() => setActiveModalProject(project)}
                        className="case-study-trigger-btn"
                      >
                        <span>EXPLORE CASE STUDY</span>
                        <span>[ + ]</span>
                      </button>

                      {project.isLive && project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="primary-action-btn"
                        >
                          <span>LIVE DEPLOYMENT</span>
                          <span>↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* DETAILED CASE STUDY MODAL */}
      {activeModalProject && (
        <div
          className="case-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-case-title"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="case-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="modal-header-row">
              <div>
                <div className="card-meta-row" style={{ marginBottom: '0.4rem' }}>
                  <span className="category-text">{activeModalProject.category}</span>
                  <span className="project-type-badge">{activeModalProject.projectType}</span>
                  {(() => {
                    const badge = getStatusBadge(activeModalProject.status);
                    return (
                      <span className="status-pill" style={{ color: badge.color }}>
                        <span
                          className="status-microdot"
                          style={{ background: badge.dot }}
                          aria-hidden="true"
                        ></span>
                        {badge.text}
                      </span>
                    );
                  })()}
                </div>
                <h2 id="modal-case-title" className="modal-title">
                  {activeModalProject.title}
                </h2>
              </div>

              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setActiveModalProject(null)}
                aria-label="Close Case Study"
              >
                ✕ ESC
              </button>
            </div>

            {/* CASE STUDY CONTENT SECTIONS */}
            <div className="case-section-block">
              <span className="case-label">01 — PROJECT OVERVIEW</span>
              <p className="case-body">{activeModalProject.caseStudy.overview}</p>
            </div>

            <div className="case-grid-two">
              <div className="case-section-block">
                <span className="case-label">02 — THE OBJECTIVE</span>
                <p className="case-body">{activeModalProject.caseStudy.challenge}</p>
              </div>

              <div className="case-section-block">
                <span className="case-label">03 — DESIGN &amp; TECHNICAL APPROACH</span>
                <p className="case-body">{activeModalProject.caseStudy.approach}</p>
              </div>
            </div>

            <div className="case-section-block">
              <span className="case-label">04 — IMPLEMENTATION &amp; ARCHITECTURE</span>
              <p className="case-body">{activeModalProject.caseStudy.implementation}</p>
            </div>

            {/* STATUS DISCLOSURE */}
            <div className="case-status-box">
              <span className="case-label" style={{ display: 'block', marginBottom: '4px' }}>
                PROJECT STATUS DISCLOSURE
              </span>
              <p className="case-status-note">{activeModalProject.caseStudy.statusNote}</p>
            </div>

            {/* MODAL FOOTER */}
            <div className="modal-footer-row">
              <div className="tech-tags-wrap" style={{ margin: 0 }}>
                {activeModalProject.technology.map((tag) => (
                  <span key={tag} className="tech-tag-chip">
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {activeModalProject.isLive && activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="primary-action-btn"
                  >
                    <span>VIEW LIVE DEPLOYMENT</span>
                    <span>↗</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={scrollToContact}
                  className="modal-cta-btn"
                >
                  DISCUSS A SIMILAR BUILD ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
