"use client";

import { useEffect, useRef, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import {
  CAPABILITIES_DATA,
  CAPABILITIES_LIST,
  DEFAULT_CAPABILITY_SLUG,
} from '../data/capabilities';

// DYNAMIC 3D & CANVAS COMPONENTS (NO SSR)
const HeroSpatialCanvas = dynamic(() => import('../components/HeroSpatialCanvas.jsx'), {
  ssr: false,
});
const HeroGazeCanvas = dynamic(() => import('../components/HeroGazeCanvas.jsx'), {
  ssr: false,
});

// MODULAR PAGE SECTIONS
import TopNavHUD from '../components/TopNavHUD.jsx';
import DynamicIntro from '../components/DynamicIntro.jsx';
import SelectedWork from '../components/SelectedWork.jsx';
import WorkflowProcess from '../components/WorkflowProcess.jsx';
import CapabilitiesDeliverables from '../components/CapabilitiesDeliverables.jsx';
import TechArsenal from '../components/TechArsenal.jsx';
import ContextualContact from '../components/ContextualContact.jsx';
import FooterBridge from '../components/FooterBridge.jsx';

function PortfolioApp() {
  const searchParams = useSearchParams();
  const focusParam = searchParams.get('focus');
  const [userSelectedSlug, setUserSelectedSlug] = useState(null);

  const activeSlug =
    userSelectedSlug && CAPABILITIES_LIST.includes(userSelectedSlug)
      ? userSelectedSlug
      : focusParam && CAPABILITIES_LIST.includes(focusParam)
      ? focusParam
      : DEFAULT_CAPABILITY_SLUG;

  const containerRef = useRef();
  const heroRef = useRef(null);
  const orb1Ref = useRef();
  const orb2Ref = useRef();
  const orb3Ref = useRef();
  const glowRef = useRef(null);
  const lenisRef = useRef(null);

  // Synchronize browser history on popstate
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const f = params.get('focus');
      if (f && CAPABILITIES_LIST.includes(f)) {
        setUserSelectedSlug(f);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Selection handler: Updates state & pushes URL without page reload or jump
  const handleSelectCapability = (slug) => {
    if (!CAPABILITIES_LIST.includes(slug)) return;
    setUserSelectedSlug(slug);
    const url = new URL(window.location.href);
    url.searchParams.set('focus', slug);
    window.history.pushState(null, '', url.toString());
  };

  // High-performance ambient spotlight tracking (Zero React re-renders)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Lenis Smooth Scroll Engine
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', () => ScrollTrigger.update());
    lenisRef.current = lenis;

    const updateTicker = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Background parallax orbs (desktop only)
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (window.innerWidth >= 1024) {
        if (orb1Ref.current)
          orb1Ref.current.style.transform = `translate(${scrollY * 0.15}px, ${scrollY * 0.3}px)`;
        if (orb2Ref.current)
          orb2Ref.current.style.transform = `translate(${scrollY * -0.1}px, ${scrollY * -0.2}px)`;
        if (orb3Ref.current)
          orb3Ref.current.style.transform = `translate(${scrollY * -0.2}px, ${scrollY * 0.15}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Dedicated Hero Stage Touch Gaze Tracker (Passive - Never blocks scrolling)
    const heroEl = heroRef.current;

    const onHeroTouchStart = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      window.dispatchEvent(
        new CustomEvent('hero-pointer-move', {
          detail: { clientX: touch.clientX, clientY: touch.clientY, isInteracting: true },
        })
      );
    };

    const onHeroTouchMove = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      window.dispatchEvent(
        new CustomEvent('hero-pointer-move', {
          detail: { clientX: touch.clientX, clientY: touch.clientY, isInteracting: true },
        })
      );
    };

    const onHeroTouchEnd = () => {
      window.dispatchEvent(new CustomEvent('hero-pointer-end'));
    };

    if (heroEl) {
      heroEl.addEventListener('touchstart', onHeroTouchStart, { passive: true });
      heroEl.addEventListener('touchmove', onHeroTouchMove, { passive: true });
      heroEl.addEventListener('touchend', onHeroTouchEnd, { passive: true });
      heroEl.addEventListener('touchcancel', onHeroTouchEnd, { passive: true });
    }

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
      if (heroEl) {
        heroEl.removeEventListener('touchstart', onHeroTouchStart);
        heroEl.removeEventListener('touchmove', onHeroTouchMove);
        heroEl.removeEventListener('touchend', onHeroTouchEnd);
        heroEl.removeEventListener('touchcancel', onHeroTouchEnd);
      }
    };
  }, []);

  const activeData = CAPABILITIES_DATA[activeSlug] || CAPABILITIES_DATA[DEFAULT_CAPABILITY_SLUG];

  return (
    <div ref={containerRef} className="portfolio-app-root">
      {/* HUD FIXED TOP NAVIGATION */}
      <TopNavHUD
        activeSlug={activeSlug}
        onSelectCapability={handleSelectCapability}
      />

      {/* AMBIENT CYBER GLOW SPOTLIGHT */}
      <div ref={glowRef} className="cyber-ambient-glow"></div>

      {/* BACKGROUND ORB PARALLAX */}
      <div className="bg-effects-container">
        <div className="glow-orb orb-1" ref={orb1Ref}></div>
        <div className="glow-orb orb-2" ref={orb2Ref}></div>
        <div className="glow-orb orb-3" ref={orb3Ref}></div>
      </div>

            {/* HERO SECTION (UNIFIED V2.1 SINGLE-COMPOSITION POSTER) */}
      <section className="hero" id="hero" ref={heroRef}>
        {/* LIVE 3D WEBGL SPATIAL CANVAS ("PORTFOLIO" PARTICLES) */}
        <HeroSpatialCanvas />

        <div className="hero-content">
          {/* HERO LEFT: EDITORIAL SIGNATURE & GREETING */}
          <div className="hero-left">
            <div className="hero-title-wrap">
              <span className="hero-greeting-tag">HELLO, I AM —</span>
              <h1>
                Adarsh<br />Karmic
              </h1>
            </div>
          </div>

          {/* HERO CENTER: INTERACTIVE 100-FRAME GAZE AVATAR & 5-NODE HALO */}
          <div className="hero-center">
            <HeroGazeCanvas
              activeSlug={activeSlug}
              onSelectCapability={handleSelectCapability}
            />
          </div>

          {/* HERO RIGHT: ROLE, APPROVED LOCATION & POSITIONING MANIFESTO */}
          <div className="hero-right">
            <div className="hero-bio-cluster">
              <h2 className="sub-heading">
                INDEPENDENT CREATIVE TECHNOLOGIST
              </h2>

              <div className="editorial-bio-wrap">
                <p className="desc">
                  I build interactive web experiences, explore AI-assisted creative workflows, and connect tools through practical digital systems.
                </p>
              </div>

              {/* LOCATION & WORLDWIDE AVAILABILITY */}
              <div className="hero-location-cluster">
                <span className="globe-icon">📍</span>
                <div className="mobile-location-lines">
                  <span className="loc-line1">BASED IN DARBHANGA, BIHAR, INDIA</span>
                  <span className="loc-line2">OPERATING WORLDWIDE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC INTRODUCTION (MORPHS WITH ACTIVE CAPABILITY) */}
      <DynamicIntro activeSlug={activeSlug} />

      {/* SELECTED WORK SECTION */}
      <SelectedWork activeSlug={activeSlug} />

      {/* CREATIVE & TECHNICAL PROCESS PIPELINE */}
      <WorkflowProcess activeSlug={activeSlug} />

      {/* CAPABILITIES & OPERATIONAL DELIVERABLES */}
      <CapabilitiesDeliverables activeSlug={activeSlug} />

      {/* TECH ARSENAL */}
      <TechArsenal activeSlug={activeSlug} />

      {/* CONTEXTUAL CONTACT & INQUIRY FORM */}
      <ContextualContact
        activeSlug={activeSlug}
        onSelectCapability={handleSelectCapability}
      />

      {/* FOOTER & TRENDY PIXEL AGENCY BRIDGE */}
      <FooterBridge />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="cyber-loading-screen" />}>
      <PortfolioApp />
    </Suspense>
  );
}
