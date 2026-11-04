"use client";

import React, { useState, useEffect } from 'react';

export default function TopNavHUD({ activeSlug, onSelectCapability }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'EXPLORE', href: '#hero' },
    { label: 'WORK', href: '#work' },
    { label: 'PROCESS', href: '#process' },
    { label: 'CAPABILITIES', href: '#capabilities' },
    { label: 'ARSENAL', href: '#arsenal' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`hud-header-root ${scrolled ? 'is-scrolled' : ''}`}
      role="banner"
    >
      <style jsx>{`
        .hud-header-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          box-sizing: border-box;
          z-index: 95;
          padding: 1.25rem 4%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: transparent;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hud-header-root.is-scrolled {
          padding: 0.85rem 4%;
          box-sizing: border-box;
          background: rgba(7, 9, 13, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .identity-group {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .founder-brand-link {
          font-family: 'Space Mono', monospace, sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #f2f3f5;
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.2s ease;
        }
        .founder-brand-link:hover {
          color: #00e5ff;
        }
        .identity-divider {
          width: 1px;
          height: 14px;
          background: rgba(255, 255, 255, 0.15);
        }
        .agency-lab-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Space Mono', monospace, sans-serif;
          font-size: 0.6rem;
          letter-spacing: 1px;
          color: #9299a5;
          text-decoration: none;
          padding: 3px 8px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
          transition: all 0.25s ease;
        }
        .agency-lab-link:hover {
          color: #f2f3f5;
          border-color: rgba(0, 229, 255, 0.3);
          background: rgba(0, 229, 255, 0.05);
        }
        .tp-vector-mark {
          width: 11px;
          height: 10px;
          display: inline-block;
          opacity: 0.75;
          transition: opacity 0.2s ease;
        }
        .agency-lab-link:hover .tp-vector-mark {
          opacity: 1;
        }
        .nav-links-menu {
          display: flex;
          align-items: center;
          gap: 1.6rem;
        }
        .nav-item-link {
          font-family: 'Space Mono', monospace, sans-serif;
          font-size: 0.64rem;
          font-weight: 600;
          letter-spacing: 1.4px;
          color: #9299a5;
          text-decoration: none;
          position: relative;
          padding: 4px 0;
          transition: color 0.25s ease;
        }
        .nav-item-link:hover {
          color: #f2f3f5;
        }
        .nav-item-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: #00e5ff;
          transition: width 0.25s ease;
        }
        .nav-item-link:hover::after {
          width: 100%;
        }
        .actions-group {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .operating-status-tag {
          font-family: 'Space Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 1px;
          color: #9299a5;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .status-dot-active {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 6px #10b981;
        }
        .contact-cta-button {
          font-family: 'Space Mono', monospace;
          font-size: 0.64rem;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          padding: 7px 15px;
          border-radius: 4px;
          background: transparent;
          color: #f2f3f5;
          border: 1px solid rgba(255, 255, 255, 0.18);
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .contact-cta-button:hover {
          border-color: #00e5ff;
          color: #00e5ff;
          background: rgba(0, 229, 255, 0.05);
          box-shadow: 0 0 16px rgba(0, 229, 255, 0.2);
        }
        .mobile-hamburger-btn {
          display: none;
          background: rgba(7, 9, 13, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #f2f3f5;
          padding: 5px 9px;
          border-radius: 4px;
          font-family: 'Space Mono', monospace;
          font-size: 0.60rem;
          font-weight: 700;
          letter-spacing: 1px;
          cursor: pointer;
          white-space: nowrap;
          z-index: 96;
        }
        @media (max-width: 1023px) {
          .hud-header-root {
            padding: 0.75rem 4% !important;
            box-sizing: border-box !important;
            max-width: 100vw !important;
          }
          .identity-group {
            gap: 6px !important;
            max-width: calc(100% - 80px) !important;
          }
          .founder-brand-link {
            font-size: 0.68rem !important;
            letter-spacing: 1px !important;
            white-space: nowrap !important;
          }
          .identity-divider {
            display: none !important;
          }
          .agency-lab-link {
            font-size: 0.48rem !important;
            padding: 2px 6px !important;
            gap: 3px !important;
            white-space: nowrap !important;
          }
          .nav-links-menu {
            display: none !important;
          }
          .operating-status-tag {
            display: none !important;
          }
          .contact-cta-button {
            display: none !important;
          }
          .actions-group {
            margin-left: auto !important;
            flex-shrink: 0 !important;
          }
          .mobile-hamburger-btn {
            display: inline-flex !important;
            align-items: center !important;
            gap: 4px !important;
            font-size: 0.58rem !important;
            padding: 4px 8px !important;
            flex-shrink: 0 !important;
          }
        }
        .mobile-navigation-dropdown {
          position: fixed;
          top: 60px;
          left: 0;
          width: 100%;
          background: rgba(7, 9, 13, 0.97);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.5rem 6%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          z-index: 94;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
        }
      `}</style>

      {/* LEFT: PERSONAL IDENTITY & FOUNDER'S LAB CO-BRAND */}
      <div className="identity-group">
        <a
          href="#hero"
          onClick={(e) => handleSmoothScroll(e, '#hero')}
          className="founder-brand-link"
        >
          ADARSH KARMIC
        </a>

        <span className="identity-divider" aria-hidden="true"></span>

        <a
          href="https://trendypixel.de"
          target="_blank"
          rel="noopener noreferrer"
          className="agency-lab-link"
          title="Founder's Lab — Connected to Trendy Pixel"
        >
          <img
            src="/brand/trendy_pixel_tp_symbol_vector.svg"
            alt=""
            width={11}
            height={10}
            className="tp-vector-mark"
            aria-hidden="true"
          />
          <span>FOUNDER&apos;S LAB</span>
        </a>
      </div>

      {/* CENTER: DESKTOP EDITORIAL NAV LINKS */}
      <nav className="nav-links-menu" aria-label="Main Sections">
        {navLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleSmoothScroll(e, item.href)}
            className="nav-item-link"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* RIGHT: QUIET STATUS & DIRECT ACTION */}
      <div className="actions-group">
        <div className="operating-status-tag">
          <span className="status-dot-active" aria-hidden="true"></span>
          <span>DARBHANGA, IN · WORLDWIDE</span>
        </div>

        <a
          href="#contact"
          onClick={(e) => handleSmoothScroll(e, '#contact')}
          className="contact-cta-button"
        >
          CONTACT
        </a>

        <button
          className="mobile-hamburger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle Mobile Menu"
        >
          {mobileMenuOpen ? '✕' : '☰ MENU'}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {mobileMenuOpen && (
        <div className="mobile-navigation-dropdown">
          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, '#contact')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.74rem',
              fontWeight: 700,
              letterSpacing: '1.2px',
              color: '#07090D',
              background: '#00E5FF',
              padding: '10px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              marginBottom: '0.4rem',
            }}
          >
            GET IN TOUCH ↗
          </a>
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.82rem',
                color: '#f2f3f5',
                textDecoration: 'none',
                letterSpacing: '1.2px',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              {item.label}
            </a>
          ))}
          <div
            style={{
              paddingTop: '0.6rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.6rem',
              color: '#9299a5',
            }}
          >
            <span>BASED IN DARBHANGA, INDIA</span>
            <a
              href="https://trendypixel.de"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#00e5ff', textDecoration: 'none' }}
            >
              TRENDY PIXEL STUDIO ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
