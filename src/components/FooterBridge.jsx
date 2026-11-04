"use client";

import React from 'react';

export default function FooterBridge() {
  return (
    <footer className="footer-bridge-root" role="contentinfo">
      <style jsx>{`
        .footer-bridge-root {
          position: relative;
          width: 100%;
          background: #07090D;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 6rem 5% 4rem;
          overflow: hidden;
        }
        .footer-container {
          max-width: 1240px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }
        .footer-top-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 3rem;
        }
        .founder-signature-col {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          max-width: 460px;
        }
        .signature-title {
          font-family: 'Sacramento', cursive;
          font-size: clamp(2.8rem, 4.5vw, 3.6rem);
          font-weight: 400;
          color: #ffffff;
          margin: 0;
          line-height: 1.0;
          text-shadow: 0 2px 16px rgba(0, 0, 0, 0.7);
        }
        .signature-sub {
          font-family: 'Space Mono', monospace;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #00E5FF;
          text-transform: uppercase;
        }
        .signature-bio {
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          line-height: 1.65;
          color: #9299A5;
          margin: 0;
        }
        .location-line {
          font-family: 'Space Mono', monospace;
          font-size: 0.64rem;
          color: #9299A5;
          letter-spacing: 0.8px;
        }
        .studio-bridge-card {
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
          padding: 2.2rem 2.2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 440px;
        }
        .bridge-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Space Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 1.2px;
          color: #00E5FF;
          text-transform: uppercase;
          background: rgba(14, 18, 26, 0.65);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid rgba(0, 229, 255, 0.3);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }
        .bridge-heading {
          font-family: 'Inter', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: #F2F3F5;
          margin: 0;
        }
        .bridge-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.86rem;
          line-height: 1.6;
          color: #9299A5;
          margin: 0;
        }
        .bridge-cta-btn {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 1.2px;
          color: #F2F3F5;
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
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          align-self: flex-start;
        }
        .bridge-cta-btn:hover {
          background: #00E5FF;
          color: #07090D;
          border-color: #00E5FF;
          border-top-color: #00E5FF;
          box-shadow:
            inset 0 1px 1px 0 rgba(255, 255, 255, 0.50),
            0 0 20px rgba(0, 229, 255, 0.45);
        }
        .footer-bottom-row {
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.2rem;
          font-family: 'Space Mono', monospace;
          font-size: 0.62rem;
          color: #9299A5;
          letter-spacing: 0.8px;
        }
        .socials-cluster {
          display: flex;
          gap: 1.8rem;
        }
        .social-link {
          color: #9299A5;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .social-link:hover {
          color: #00E5FF;
        }
        @media (max-width: 768px) {
          .footer-bridge-root {
            padding: 4.5rem 5% 3.5rem;
          }
          .footer-bottom-row {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="footer-container">
        {/* TOP ROW */}
        <div className="footer-top-row">
          <div className="founder-signature-col">
            <h2 className="signature-title">Adarsh Karmic</h2>
            <span className="signature-sub">
              Independent Creative Technologist
            </span>
            <p className="signature-bio">
              Personal portfolio and technical lab of Adarsh Karmic — exploring interactive web experiences, modern frontend engineering, practical automation, and browser graphics.
            </p>
            <div className="location-line">
              📍 Based in Darbhanga, Bihar, India · Operating Worldwide
            </div>
          </div>

          <div className="studio-bridge-card">
            <span className="bridge-pill">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/trendy_pixel_tp_symbol_vector.svg"
                alt="Trendy Pixel"
                width={12}
                height={11}
                style={{ opacity: 0.9 }}
              />
              FOUNDER&apos;S LAB — AGENCY ECOSYSTEM
            </span>
            <h3 className="bridge-heading">Looking for Full-Service Digital Studio Solutions?</h3>
            <p className="bridge-desc">
              Visit <strong>Trendy Pixel</strong> — my commercial digital agency delivering bespoke web applications, high-converting platforms, and brand systems for growing companies.
            </p>
            <a
              href="https://trendypixel.de"
              target="_blank"
              rel="noopener noreferrer"
              className="bridge-cta-btn"
            >
              <span>EXPLORE TRENDY PIXEL STUDIO</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* BOTTOM METADATA ROW */}
        <div className="footer-bottom-row">
          <div>
            © {new Date().getFullYear()} ADARSH KARMIC. ALL RIGHTS RESERVED.
          </div>

          <div className="socials-cluster">
            <a
              href="https://trendypixel.de"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              TRENDY PIXEL ↗
            </a>
            <a
              href="mailto:adarshkarmic@gmail.com"
              className="social-link"
            >
              DIRECT EMAIL
            </a>
            <a
              href="#hero"
              className="social-link"
            >
              BACK TO TOP ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
