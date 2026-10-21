"use client";

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { PROJECT_SPECS } from '../data/projects.js';
import { playCyberSound as playSoundUtil } from '../utils/audio.js';
import SpecModal from '../components/SpecModal.jsx';

const HeroSpatialCanvas = dynamic(() => import('../components/HeroSpatialCanvas.jsx'), { ssr: false });
const HeroGazeCanvas = dynamic(() => import('../components/HeroGazeCanvas.jsx'), { ssr: false });



export default function Home() {
  const containerRef = useRef();
  const heroRef = useRef(null);
  const orb1Ref = useRef();
  const orb2Ref = useRef();
  const orb3Ref = useRef();

  const [activeSpec, setActiveSpec] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [latency, setLatency] = useState(19);
  const [istTime, setIstTime] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const glowRef = useRef(null);

  // Managed On-Demand Iframe Engine Lifecycle State
  const projectsSectionRef = useRef(null);
  const lenisRef = useRef(null);
  const [activeDeckIndex, setActiveDeckIndex] = useState(0);
  const [iframeDpiScale, setIframeDpiScale] = useState(0.65); // 0.65x High-DPI Desktop Viewport
  const [isProjectsInView, setIsProjectsInView] = useState(false);
  const [activeIframeCardId, setActiveIframeCardId] = useState(null);
  const [interactingCardId, setInteractingCardId] = useState(null);
  const [loadedIframes, setLoadedIframes] = useState({});
  const [isDesktop, setIsDesktop] = useState(false);
  const [mobileInteractingCardId, setMobileInteractingCardId] = useState(null);
  const [mobileAutoPreviewCardId, setMobileAutoPreviewCardId] = useState(null);
  const [mobileIframeScale, setMobileIframeScale] = useState(0.75);

  const dwellTimerRef = useRef(null);
  const mobileInteractingCardIdRef = useRef(null);
  const mobileAutoPreviewCardIdRef = useRef(null);
  const activeDeckIndexRef = useRef(activeDeckIndex);
  const isProjectsInViewRef = useRef(false);

  useEffect(() => {
    mobileInteractingCardIdRef.current = mobileInteractingCardId;
  }, [mobileInteractingCardId]);

  useEffect(() => {
    mobileAutoPreviewCardIdRef.current = mobileAutoPreviewCardId;
  }, [mobileAutoPreviewCardId]);

  useEffect(() => {
    activeDeckIndexRef.current = activeDeckIndex;
  }, [activeDeckIndex]);

  useEffect(() => {
    isProjectsInViewRef.current = isProjectsInView;
  }, [isProjectsInView]);

  // Dwell auto-preview scheduler: boots live 3D site after 1.5s pause on mobile
  const scheduleDwellTimer = () => {
    if (typeof window === 'undefined' || window.innerWidth >= 1024) return;
    if (dwellTimerRef.current) {
      clearTimeout(dwellTimerRef.current);
      dwellTimerRef.current = null;
    }

    if (!isProjectsInViewRef.current || mobileInteractingCardIdRef.current) return;
    const currentDeckIdx = activeDeckIndexRef.current;
    if (currentDeckIdx === 0) return; // Intro slide

    const projectList = Object.values(PROJECT_SPECS);
    const targetProject = projectList[currentDeckIdx - 1];
    if (!targetProject || !targetProject.canIframe) return;

    dwellTimerRef.current = setTimeout(() => {
      if (!mobileInteractingCardIdRef.current && isProjectsInViewRef.current) {
        setMobileAutoPreviewCardId(targetProject.id);
      }
    }, 1500);
  };

  // Trigger dwell auto-preview on card settle
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth >= 1024) return;
    if (dwellTimerRef.current) {
      clearTimeout(dwellTimerRef.current);
      dwellTimerRef.current = null;
    }
    setMobileAutoPreviewCardId(null);
    scheduleDwellTimer();

    return () => {
      if (dwellTimerRef.current) {
        clearTimeout(dwellTimerRef.current);
      }
    };
  }, [activeDeckIndex, isProjectsInView]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute precise mobile virtual viewport scale (390px target width scaled to fit phone screen)
  useEffect(() => {
    const updateMobileScale = () => {
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        const activeCard = document.querySelector('.project-card[data-deck-offset="0"] .mac-screen-content');
        if (activeCard) {
          const cardWidth = activeCard.getBoundingClientRect().width;
          if (cardWidth > 150) {
            const computedScale = Math.min(1, Math.max(0.45, cardWidth / 390));
            setMobileIframeScale(parseFloat(computedScale.toFixed(3)));
          }
        }
      }
    };

    updateMobileScale();
    window.addEventListener('resize', updateMobileScale);
    const timer = setTimeout(updateMobileScale, 200);
    return () => {
      window.removeEventListener('resize', updateMobileScale);
      clearTimeout(timer);
    };
  }, [activeDeckIndex]);

  // Toggle in-phone interactive mode on mobile with hibernation of portfolio background
  const handleToggleMobileInteract = (cardId) => {
    if (dwellTimerRef.current) {
      clearTimeout(dwellTimerRef.current);
      dwellTimerRef.current = null;
    }
    if (mobileInteractingCardId === cardId) {
      setMobileInteractingCardId(null);
      lenisRef.current?.start();
      playCyberSound('toggle');
      scheduleDwellTimer();
    } else {
      setMobileInteractingCardId(cardId);
      setMobileAutoPreviewCardId(null);
      lenisRef.current?.stop();
      playCyberSound('click');
    }
  };

  // Touch swipe gesture refs for mobile horizontal 3D coverflow
  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);

  const handleTouchStart = (e) => {
    if (mobileInteractingCardId !== null) return;
    if (dwellTimerRef.current) {
      clearTimeout(dwellTimerRef.current);
      dwellTimerRef.current = null;
    }
    if (mobileAutoPreviewCardIdRef.current) {
      setMobileAutoPreviewCardId(null);
    }
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (mobileInteractingCardId !== null) return;
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25) {
      if (deltaX < 0) {
        handleNavigateDeck(activeDeckIndex + 1);
      } else {
        handleNavigateDeck(activeDeckIndex - 1);
      }
    } else {
      scheduleDwellTimer();
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Manual navigation debounce flag to prevent ScrollTrigger scrub clash during swipe/taps
  const isManualNavigatingRef = useRef(false);

  // Direct Horizontal Deck Navigation (5 Slides: 0 = Intro, 1..4 = Projects)
  const handleNavigateDeck = (index) => {
    const totalSlides = 5;
    const clamped = Math.max(0, Math.min(totalSlides - 1, index));
    setActiveDeckIndex(clamped);
    if (dwellTimerRef.current) {
      clearTimeout(dwellTimerRef.current);
      dwellTimerRef.current = null;
    }
    setMobileAutoPreviewCardId(null);
    if (mobileInteractingCardId) {
      setMobileInteractingCardId(null);
      lenisRef.current?.start();
    }
    if (clamped > 0 && typeof window !== 'undefined' && window.innerWidth >= 1024) {
      const projectList = Object.values(PROJECT_SPECS);
      setActiveIframeCardId(projectList[clamped - 1]?.id || null);
    } else {
      setActiveIframeCardId(null);
    }
    playCyberSound('spec');

    isManualNavigatingRef.current = true;
    setTimeout(() => {
      isManualNavigatingRef.current = false;
    }, 750);

    const pinTrigger = ScrollTrigger.getById('projects-deck-pin') || ScrollTrigger.getById('projects-deck-pin-mobile');
    if (pinTrigger && lenisRef.current) {
      const targetScroll = pinTrigger.start + (clamped / (totalSlides - 1)) * (pinTrigger.end - pinTrigger.start);
      lenisRef.current.scrollTo(targetScroll, { duration: 0.75 });
    }
  };

  // Sync active deck project with active iframe on desktop
  useEffect(() => {
    if (!isProjectsInView) return;
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      if (activeDeckIndex > 0) {
        const activeProject = Object.values(PROJECT_SPECS)[activeDeckIndex - 1];
        if (activeProject) {
          setActiveIframeCardId(activeProject.id);
        }
      } else {
        setActiveIframeCardId(null);
      }
    }
  }, [activeDeckIndex, isProjectsInView]);

  // Live IST (UTC+5:30) World Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeStr = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(now);
        setIstTime(timeStr);
      } catch (e) {
        setIstTime('00:40:00');
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // High-performance ambient spotlight tracking (Zero React re-renders, 120 FPS GPU smoothness)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 1-Click Copy Email with Haptic Feedback
  const handleCopyEmail = (e) => {
    if (e) e.preventDefault();
    navigator.clipboard.writeText('hello@adarshkarmic.trendypixel.de');
    playCyberSound('toggle');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  // Cyber-Haptic Web Audio Synthesizer
  const playCyberSound = (type = 'hover') => playSoundUtil(type, soundEnabled);

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    if (nextState) {
      setTimeout(() => playCyberSound('toggle'), 50);
    }
  };

  // Close modal or exit interaction on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (interactingCardId) {
          setInteractingCardId(null);
        } else if (activeSpec) {
          playCyberSound('close');
          setActiveSpec(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSpec, interactingCardId, soundEnabled]);

  // Managed On-Demand Iframe Engine Lifecycle:
  // 1. Observe Projects Section visibility so iframes NEVER run in background
  useEffect(() => {
    const sectionEl = projectsSectionRef.current;
    if (!sectionEl) return;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const inView = entry.isIntersecting;
        setIsProjectsInView(inView);
        if (!inView) {
          // Immediately dismount and pause all iframes when user leaves projects section
          setActiveIframeCardId(null);
          setInteractingCardId(null);
          setMobileInteractingCardId(null);
          setMobileAutoPreviewCardId(null);
          if (dwellTimerRef.current) {
            clearTimeout(dwellTimerRef.current);
            dwellTimerRef.current = null;
          }
        }
      },
      {
        rootMargin: '120px 0px 120px 0px',
        threshold: 0.05,
      }
    );

    sectionObserver.observe(sectionEl);
    return () => sectionObserver.disconnect();
  }, []);

  // 2. Observe individual project cards to mount ONLY the active card's iframe
  useEffect(() => {
    if (!isProjectsInView) return;

    const cards = document.querySelectorAll('.project-card');
    if (!cards || cards.length === 0) return;

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.getAttribute('data-card-id');
            if (cardId) {
              setActiveIframeCardId(cardId);
            }
          }
        });
      },
      {
        threshold: 0.35,
      }
    );

    cards.forEach((card) => cardObserver.observe(card));
    return () => cardObserver.disconnect();
  }, [isProjectsInView]);

  // Live Navigation Timing Telemetry
  useEffect(() => {
    try {
      const navEntries = performance.getEntriesByType('navigation');
      if (navEntries.length > 0) {
        const rtt = Math.round(navEntries[0].responseEnd - navEntries[0].requestStart);
        requestAnimationFrame(() => {
          setLatency(rtt > 0 && rtt < 300 ? rtt : 18);
        });
      } else {
        requestAnimationFrame(() => {
          setLatency(19);
        });
      }
    } catch (e) {
      requestAnimationFrame(() => {
        setLatency(21);
      });
    }
  }, []);

  useEffect(() => {
    // Register GSAP Plugin
    gsap.registerPlugin(ScrollTrigger);

    // Lenis Smooth Scroll
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

    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      // Instantly kill auto-preview on any scroll so scrolling is 120 FPS
      if (!mobileInteractingCardIdRef.current) {
        if (dwellTimerRef.current) {
          clearTimeout(dwellTimerRef.current);
          dwellTimerRef.current = null;
        }
        if (mobileAutoPreviewCardIdRef.current) {
          setMobileAutoPreviewCardId(null);
        }
        scheduleDwellTimer();
      }
    });
    lenisRef.current = lenis;
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Background parallax scroll effect (optimized for desktop 120 FPS, skipped on mobile)
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (window.innerWidth >= 1024) {
        if (orb1Ref.current) orb1Ref.current.style.transform = `translate(${scrollY * 0.15}px, ${scrollY * 0.3}px)`;
        if (orb2Ref.current) orb2Ref.current.style.transform = `translate(${scrollY * -0.1}px, ${scrollY * -0.2}px)`;
        if (orb3Ref.current) orb3Ref.current.style.transform = `translate(${scrollY * -0.2}px, ${scrollY * 0.15}px)`;
      }

      // Auto-preview hibernation on scroll (instant dismount for 120 FPS performance)
      if (!mobileInteractingCardIdRef.current) {
        if (dwellTimerRef.current) {
          clearTimeout(dwellTimerRef.current);
          dwellTimerRef.current = null;
        }
        if (mobileAutoPreviewCardIdRef.current) {
          setMobileAutoPreviewCardId(null);
        }
        scheduleDwellTimer();
      }
    };
    
    window.addEventListener('scroll', handleScroll);

    const onHeroScrollDown = () => {
      lenisRef.current?.scrollTo('.projects-section', { duration: 1.1 });
    };
    window.addEventListener('hero-scroll-down', onHeroScrollDown);

    // Dedicated Hero Stage Touch Interceptor: Zero page scroll during 3D particle & character interaction
    const heroEl = heroRef.current;
    let isHeroInteracting = false;
    let heroStartX = 0;
    let heroStartY = 0;
    let heroStartTime = 0;

    const onHeroTouchStart = (e) => {
      if (e.target.closest('.audio-toggle-btn') || e.target.closest('button') || e.target.closest('a')) {
        return;
      }
      if (!e.touches || e.touches.length === 0) return;
      isHeroInteracting = true;
      const touch = e.touches[0];
      heroStartX = touch.clientX;
      heroStartY = touch.clientY;
      heroStartTime = Date.now();

      window.dispatchEvent(new CustomEvent('hero-pointer-move', {
        detail: { clientX: touch.clientX, clientY: touch.clientY, isInteracting: true }
      }));
    };

    const onHeroTouchMove = (e) => {
      if (!isHeroInteracting || !e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];

      const deltaY = touch.clientY - heroStartY;
      const deltaX = touch.clientX - heroStartX;
      const elapsed = Date.now() - heroStartTime;

      // Intentional quick upward flick to scroll down to projects
      if (deltaY < -48 && elapsed < 320 && Math.abs(deltaY) > 1.8 * Math.abs(deltaX)) {
        isHeroInteracting = false;
        lenisRef.current?.scrollTo('.projects-section', { duration: 1.1 });
        window.dispatchEvent(new CustomEvent('hero-pointer-end'));
        return;
      }

      // User is interacting with text or character -> STOP PAGE SCROLLING!
      if (e.cancelable) {
        e.preventDefault();
      }

      window.dispatchEvent(new CustomEvent('hero-pointer-move', {
        detail: { clientX: touch.clientX, clientY: touch.clientY, isInteracting: true }
      }));
    };

    const onHeroTouchEnd = () => {
      if (isHeroInteracting) {
        isHeroInteracting = false;
        window.dispatchEvent(new CustomEvent('hero-pointer-end'));
      }
    };

    if (heroEl) {
      heroEl.addEventListener('touchstart', onHeroTouchStart, { passive: true });
    }
    window.addEventListener('touchmove', onHeroTouchMove, { passive: false });
    window.addEventListener('touchend', onHeroTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onHeroTouchEnd, { passive: true });

    // GSAP Scroll Animations Context
    let ctx = gsap.context(() => {
      // 1. RECENT PROJECTS SECTION HEADER REVEAL (Safe check)
      const sectionHeaderH2 = document.querySelector('.section-header h2');
      if (sectionHeaderH2) {
        gsap.fromTo(sectionHeaderH2,
          { 
            y: 40, 
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.projects-section',
              start: 'top 85%',
            }
          }
        );
      }

      // 2. HORIZONTAL 3D XBOX COVERFLOW (DESKTOP) & STACKED DECK (MOBILE)
      const mm = gsap.matchMedia();

      // Desktop >= 1024px: Horizontal Pin & ScrollTrigger Scrub
      mm.add("(min-width: 1024px)", () => {
        const pinTrigger = ScrollTrigger.create({
          id: 'projects-deck-pin',
          trigger: '.projects-section',
          start: 'top top',
          end: '+=2800',
          pin: true,
          anticipatePin: 1,
          scrub: 0.8,
          onUpdate: (self) => {
            const totalSlides = 5;
            const progressIndex = self.progress * (totalSlides - 1);
            const targetIndex = Math.min(totalSlides - 1, Math.max(0, Math.round(progressIndex)));
            setActiveDeckIndex((prev) => {
              if (prev !== targetIndex) {
                if (targetIndex > 0) {
                  const targetProject = Object.values(PROJECT_SPECS)[targetIndex - 1];
                  if (targetProject) {
                    setActiveIframeCardId(targetProject.id);
                  }
                } else {
                  setActiveIframeCardId(null);
                }
                return targetIndex;
              }
              return prev;
            });
          }
        });

        return () => {
          pinTrigger.kill();
        };
      });

      // Mobile < 1024px: Pin & Scrub Scroll Navigation for 3D Phone Coverflow
      mm.add("(max-width: 1023px)", () => {
        const pinTriggerMobile = ScrollTrigger.create({
          id: 'projects-deck-pin-mobile',
          trigger: '.projects-section',
          start: 'top top',
          end: '+=2000',
          pin: true,
          anticipatePin: 1,
          scrub: 0.65,
          onUpdate: (self) => {
            if (isManualNavigatingRef.current) return;
            const totalSlides = 5;
            const progressIndex = self.progress * (totalSlides - 1);
            const targetIndex = Math.min(totalSlides - 1, Math.max(0, Math.round(progressIndex)));
            setActiveDeckIndex((prev) => {
              if (prev !== targetIndex) {
                return targetIndex;
              }
              return prev;
            });
            // Kill any auto preview immediately during pin scrub
            if (!mobileInteractingCardIdRef.current && mobileAutoPreviewCardIdRef.current) {
              setMobileAutoPreviewCardId(null);
            }
          }
        });

        return () => {
          pinTriggerMobile.kill();
        };
      });

      // 3. 3D TILT WITH GSAP quickTo & SPECULAR REFLECTION
      const allProjectCards = gsap.utils.toArray('.project-card');
      allProjectCards.forEach((card) => {
        const box = card.querySelector('.project-image-box');
        if (box) {
          const xTo = gsap.quickTo(box, "rotateY", { duration: 0.45, ease: "power3.out" });
          const yTo = gsap.quickTo(box, "rotateX", { duration: 0.45, ease: "power3.out" });
          const scaleTo = gsap.quickTo(box, "scale", { duration: 0.45, ease: "power3.out" });

          const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;
            xTo(relX * 10);
            yTo(-relY * 8);
            scaleTo(1.015);
            box.style.setProperty('--sheen-x', `${(relX + 0.5) * 100}%`);
            box.style.setProperty('--sheen-y', `${(relY + 0.5) * 100}%`);
          };

          const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
            scaleTo(1);
          };

          card.addEventListener('mousemove', handleMouseMove);
          card.addEventListener('mouseleave', handleMouseLeave);
        }
      });

      // 4. MAGNETIC PHYSICS FOR CTA BUTTONS
      const magneticElements = gsap.utils.toArray('.spec-trigger-btn, .copy-email-btn');
      magneticElements.forEach((btn) => {
        const xTo = gsap.quickTo(btn, "x", { duration: 0.35, ease: "power3.out" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.35, ease: "power3.out" });

        const onMouseMove = (e) => {
          const rect = btn.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (e.clientX - centerX) * 0.35;
          const deltaY = (e.clientY - centerY) * 0.35;
          xTo(deltaX);
          yTo(deltaY);
        };

        const onMouseLeave = () => {
          xTo(0);
          yTo(0);
        };

        btn.addEventListener('mousemove', onMouseMove);
        btn.addEventListener('mouseleave', onMouseLeave);
      });

      // 5. CRAFT & CAPABILITIES STAGGERED ROW REVEAL
      const capRows = gsap.utils.toArray('.capability-row');
      if (capRows.length > 0) {
        gsap.fromTo(capRows,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.capabilities-rows',
              start: 'top 85%'
            }
          }
        );
      }
    }, containerRef);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hero-scroll-down', onHeroScrollDown);
      if (heroEl) {
        heroEl.removeEventListener('touchstart', onHeroTouchStart);
      }
      window.removeEventListener('touchmove', onHeroTouchMove);
      window.removeEventListener('touchend', onHeroTouchEnd);
      window.removeEventListener('touchcancel', onHeroTouchEnd);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef}>

      {/* AMBIENT CYBER GLOW SPOTLIGHT (Zero React Re-renders, 120 FPS GPU) */}
      <div 
        ref={glowRef}
        className="cyber-ambient-glow"
      ></div>

      {/* HERO SECTION */}
      <section className="hero" ref={heroRef}>
          <header className="top-nav">
              <div className="nav-left">
                  <p>CREATIVE TECHNOLOGIST<br/><span className="accent-color">3D WEBGL &amp; INTERACTIVE EXPERIENCES</span></p>
              </div>
              <div className="nav-clock-pill">
                  <span className="clock-beacon"></span>
                  <span className="clock-time">IST (UTC+5:30) {istTime || '00:40:00'}</span>
                  <span className="clock-sep">•</span>
                  <span className="clock-status">COMMISSIONS OPEN ✦</span>
              </div>
              <div className="nav-right">
                  <span className="mobile-nav-status">
                    COMMISSIONS OPEN <span className="star-icon">✦</span>
                  </span>
                  <button 
                    className={`audio-toggle-btn ${soundEnabled ? 'active' : ''}`}
                    onClick={handleToggleSound}
                    title="Toggle Cyber-Haptic Web Audio Engine"
                  >
                    {soundEnabled ? (
                      <>
                        <span className="audio-eq-bars">
                          <span className="audio-eq-bar"></span>
                          <span className="audio-eq-bar"></span>
                          <span className="audio-eq-bar"></span>
                          <span className="audio-eq-bar"></span>
                        </span>
                        <span>AUDIO: ACTIVE</span>
                      </>
                    ) : (
                      <span>🔇 AUDIO: MUTED</span>
                    )}
                  </button>
              </div>
          </header>

          {/* LIVE 3D WEBGL SPATIAL CANVAS */}
          <HeroSpatialCanvas />

          <div className="hero-content">
              <div className="hero-left">
                  {/* EDITORIAL MAGAZINE MASTHEAD KICKER */}
                  <div className="editorial-masthead">
                      <div className="editorial-vol-row">
                          <span className="editorial-badge">VOL. 26 // 2026</span>
                          <span className="editorial-dot">✦</span>
                          <span className="editorial-spec">INDEX 01 / 04</span>
                          <span className="editorial-divider"></span>
                          <span className="editorial-coord">28.61°N 77.20°E</span>
                      </div>
                  </div>

                  {/* EDITORIAL TITLE WITH MONOGRAPH EYEBROW */}
                  <div className="hero-title-wrap">
                      <span className="editorial-eyebrow">PORTFOLIO &amp; MONOGRAPH</span>
                      <h1>Adarsh<br/>Karmic</h1>
                  </div>

                  {/* BOTTOM BIO & ATTRIBUTES CLUSTER */}
                  <div className="hero-bio-cluster">
                      <h2 className="sub-heading">
                          CREATIVE TECHNOLOGIST &amp; FULL-STACK DEVELOPER
                      </h2>

                      {/* DISCIPLINE TAG */}
                      <span className="hero-discipline-tag">
                          {"// INTERACTIVE 3D • MOTION & CRAFT • NEXT.JS ARCHITECTURE"}
                      </span>

                      {/* EDITORIAL MONOGRAPH BIO WITH LEFT CALLOUT RULE */}
                      <div className="editorial-bio-wrap">
                          <p className="desc">
                              Engineering hyper-aesthetic digital flagships, 3D interactive canvases, and mission-critical full-stack architectures for visionary brands across the globe.
                          </p>
                      </div>

                      {/* MOBILE WORLDWIDE AVAILABILITY */}
                      <div className="mobile-world-availability">
                          <span className="globe-icon">🌐</span>
                          <span>28.61°N 77.20°E • AVAILABLE WORLDWIDE</span>
                      </div>

                      {/* REAL TECH ARSENAL BADGE */}
                      <div className="telemetry-bar">
                          <span className="telemetry-beacon"></span>
                          <span className="telemetry-label">CORE STACK:</span>
                          <span className="telemetry-val">NEXT.JS 16</span>
                          <span className="telemetry-sep">•</span>
                          <span className="telemetry-val">REACT 19</span>
                          <span className="telemetry-sep">•</span>
                          <span className="telemetry-val">THREE.JS / WEBGL</span>
                          <span className="telemetry-sep">•</span>
                          <span className="telemetry-val">GSAP &amp; LENIS</span>
                          <span className="telemetry-sep">•</span>
                          <span className="telemetry-val">TYPESCRIPT</span>
                      </div>
                  </div>
              </div>

              {/* HERO CENTER CHARACTER (Rock-solid pedestal anchor + pure 120 FPS gaze tracking) */}
              <div className="hero-center">
                <HeroGazeCanvas />
              </div>

              <div className="hero-right">
                  {/* MOBILE TOP-RIGHT TAGLINE & STAR BADGE */}
                  <div className="mobile-tagline-wrap">
                      <p className="mobile-tagline-text">Bespoke digital flagships that captivate &amp; convert.</p>
                      <div className="mobile-tagline-badge">
                          <span>✦</span>
                      </div>
                  </div>

                  {/* EDITORIAL DIRECTORY OF CAPABILITIES / STATS */}
                  <div className="hero-spatial-reticles">
                      <div className="reticle-status-header">
                          <span className="reticle-beacon"></span>
                          <span>INDEX // CORE CAPABILITIES</span>
                      </div>
                      
                      <div className="reticle-item">
                          <span className="reticle-chapter">01</span>
                          <div className="reticle-data">
                              <span className="reticle-val">INTERACTIVE 3D</span>
                              <span className="reticle-label">THREE.JS, R3F &amp; CUSTOM SHADERS</span>
                          </div>
                      </div>

                      <div className="reticle-hairline"></div>

                      <div className="reticle-item">
                          <span className="reticle-chapter">02</span>
                          <div className="reticle-data">
                              <span className="reticle-val">MOTION &amp; CRAFT</span>
                              <span className="reticle-label">GSAP TIMELINES &amp; INERTIAL SCROLL</span>
                          </div>
                      </div>

                      <div className="reticle-hairline"></div>

                      <div className="reticle-item">
                          <span className="reticle-chapter">03</span>
                          <div className="reticle-data">
                              <span className="reticle-val">FULL-STACK &amp; APIS</span>
                              <span className="reticle-label">NEXT.JS, SERVERLESS &amp; CLOUD ARCHITECTURE</span>
                          </div>
                      </div>

                      <div className="reticle-quote-strip">
                          <span className="reticle-star">✦</span>
                          <span>Bespoke digital flagships that captivate &amp; convert.</span>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* BACKGROUND SCROLL EFFECTS */}
      <div className="bg-effects-container">
        <div className="glow-orb orb-1" ref={orb1Ref}></div>
        <div className="glow-orb orb-2" ref={orb2Ref}></div>
        <div className="glow-orb orb-3" ref={orb3Ref}></div>
      </div>

      {/* RECENT PROJECTS SECTION */}
      <section className="projects-section" ref={projectsSectionRef}>
        {/* 3D COVERFLOW STAGE WRAPPER */}
        <div 
          className={`projects-deck-stage ${mobileInteractingCardId ? 'stage-mobile-interacting' : ''}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="projects-grid projects-deck-track">
            {/* SLIDE 0: CINEMATIC RECENT PROJECTS TITLE DECK */}
            <div 
              id="deck-intro-card"
              data-card-id="intro"
              data-deck-offset={0 - activeDeckIndex}
              className={`project-card deck-intro-card ${activeDeckIndex === 0 ? 'card-center-active' : ''}`}
              style={{
                '--card-index': 0,
                '--deck-offset': 0 - activeDeckIndex,
                zIndex: 25 - Math.abs(0 - activeDeckIndex) * 5,
              }}
              onClick={() => {
                if (activeDeckIndex !== 0) {
                  handleNavigateDeck(0);
                } else {
                  handleNavigateDeck(1);
                }
              }}
              onMouseEnter={() => playCyberSound('hover')}
            >
              <div className="deck-intro-box">
                <div className="intro-card-bg-grid"></div>
                <div className="deck-intro-content">
                  <div className="deck-intro-header">
                    <span className="deck-intro-kicker">
                      <span className="intro-beacon-dot"></span>
                      <span>{"01 // ARCHITECTURE & ENGINEERING"}</span>
                    </span>
                    <span className="deck-intro-counter">04 SELECTED WORKS</span>
                  </div>

                  <div className="deck-intro-title-wrap">
                    <div className="intro-category-tag">SYSTEM // PRODUCTION INDEX</div>
                    <h2 className="deck-intro-title">
                      RECENT<br />PROJECTS
                    </h2>
                    <p className="deck-intro-subtitle">
                      Curated digital flagships, bespoke 3D WebGL experiences, and mission-critical production architectures.
                    </p>
                    <div className="intro-tech-chips">
                      <span className="intro-tech-chip">WebGL 2.0</span>
                      <span className="intro-tech-chip">GLSL Shaders</span>
                      <span className="intro-tech-chip">Next.js 16</span>
                    </div>
                  </div>

                  <div className="deck-intro-footer">
                    <div className="intro-advance-pill">
                      <span>EXPLORE FLAGSHIPS</span>
                      <span className="intro-advance-arrow">&rarr;</span>
                    </div>
                    <span className="intro-scroll-hint">
                      <span className="scroll-hint-desktop">[ SCROLL OR CLICK TO ADVANCE ]</span>
                      <span className="scroll-hint-mobile">[ SWIPE OR TAP TO EXPLORE ]</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {Object.values(PROJECT_SPECS).map((spec, idx) => {
              const isIframeActive = isDesktop && isProjectsInView && activeIframeCardId === spec.id && spec.canIframe;
              const isInteracting = interactingCardId === spec.id;
              const isLoaded = loadedIframes[spec.id];
              const offset = (idx + 1) - activeDeckIndex;
              const isMobileInteracting = mobileInteractingCardId === spec.id;
              const isAutoPreview = mobileAutoPreviewCardId === spec.id && !isMobileInteracting;
              const isIframeVisibleOnMobile = (isMobileInteracting || isAutoPreview) && spec.canIframe;

              return (
                <div 
                  key={spec.id} 
                  id={`project-card-${spec.id}`}
                  data-card-id={spec.id}
                  data-deck-offset={offset}
                  className={`project-card ${isInteracting || isMobileInteracting ? 'card-interacting' : ''} ${isAutoPreview ? 'card-autopreview' : ''} ${offset === 0 ? 'card-center-active' : ''}`}
                  style={{
                    '--card-index': idx + 1,
                    '--deck-offset': offset,
                    zIndex: 25 - Math.abs(offset) * 5,
                  }}
                  onClick={(e) => {
                    if (isMobileInteracting) {
                      e.stopPropagation();
                      return;
                    }
                    if (offset !== 0) {
                      handleNavigateDeck(idx + 1);
                    } else if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                      if (!e.target.closest('.mobile-exterior-dock')) {
                        e.stopPropagation();
                        handleToggleMobileInteract(spec.id);
                      }
                    }
                  }}
                  onMouseEnter={() => playCyberSound('hover')}
                >
                  <div className="project-image-box mac-window-frame">
                    {/* Genuine macOS Safari Chrome Bar (Desktop) */}
                    <div className="browser-chrome-bar">
                      <div className="browser-dots">
                        <span className="browser-dot dot-red"></span>
                        <span className="browser-dot dot-yellow"></span>
                        <span className="browser-dot dot-green"></span>
                      </div>

                      <a 
                        href={spec.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="browser-url-pill" 
                        style={{ textDecoration: 'none' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="url-lock-icon">🔒</span>
                        <span className="url-text">{spec.domain}</span>
                        <span className={`live-beacon ${isIframeActive ? 'beacon-live' : 'beacon-idle'}`}></span>
                      </a>

                      <div className="browser-controls-right">
                        {spec.canIframe ? (
                          <button 
                            type="button"
                            className={`iframe-toggle-chip ${isInteracting ? 'chip-active' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!isIframeActive) {
                                setActiveIframeCardId(spec.id);
                              }
                              setInteractingCardId(isInteracting ? null : spec.id);
                              playCyberSound('toggle');
                            }}
                            title={isInteracting ? "Exit 3D Interaction (Esc)" : "Interact with live site"}
                          >
                            <span>{isInteracting ? "⏸ EXIT" : "🎮 INTERACT"}</span>
                          </button>
                        ) : (
                          <span className="iframe-static-badge">STATIC MONOGRAPH</span>
                        )}

                        <a 
                          href={spec.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="browser-actions" 
                          title="Launch Live Application in New Window"
                          style={{ textDecoration: 'none' }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>↗</span>
                        </a>
                      </div>
                    </div>

                    {/* Modern Android Flagship Punch-Hole Camera (Mobile) */}
                    <div className="mobile-android-camera">
                      <span className="android-earpiece-slit"></span>
                      <span className="android-punchhole-lens">
                        <span className="lens-reflection"></span>
                      </span>
                    </div>

                    {/* Mobile Tap to Open Indicator (Hidden when in live interaction) */}
                    {!isMobileInteracting && (
                      <div className="mobile-tap-redirect-badge">
                        <span>TAP TO PLAY 🎮</span>
                      </div>
                    )}

                    {/* Display Canvas: Pure High-Res Mobile Screenshot or Live DPI-Scaled Iframe */}
                    <div 
                      className="mac-screen-content"
                      style={{ '--iframe-scale': iframeDpiScale }}
                    >
                      {/* Responsive Cover Image: High-Res Portrait on Mobile, Desktop 16:9 on Desktop */}
                      <div className={`project-image-container ${(isDesktop && isIframeActive && isLoaded) || isIframeVisibleOnMobile ? 'cover-behind' : ''}`}>
                        <picture>
                          <source media="(max-width: 1023px)" srcSet={spec.mobileCoverImage || spec.coverImage} />
                          <img 
                            src={spec.coverImage} 
                            alt={spec.title} 
                            loading="lazy" 
                            className="project-cover-display"
                          />
                        </picture>
                      </div>

                      {/* Managed On-Demand Live Iframe (Desktop Only) */}
                      {isDesktop && isIframeActive && (
                        <>
                          <iframe
                            src={spec.liveUrl}
                            title={`${spec.title} Live Preview`}
                            className={`mac-live-iframe ${isLoaded ? 'iframe-visible' : 'iframe-loading'}`}
                            loading="lazy"
                            style={{
                              width: `${100 / iframeDpiScale}%`,
                              height: `${100 / iframeDpiScale}%`,
                              transform: `scale(${iframeDpiScale})`,
                              transformOrigin: '0 0',
                            }}
                            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                            onLoad={() => {
                              setLoadedIframes(prev => ({ ...prev, [spec.id]: true }));
                            }}
                          />

                          {/* Loading Indicator while Iframe is bootstrapping */}
                          {!isLoaded && (
                            <div className="iframe-boot-loader">
                              <div className="boot-pulse-spinner"></div>
                              <span className="boot-text">BOOTING LIVE WEBGL ENGINE...</span>
                            </div>
                          )}

                          {/* Scroll Shield: Prevents mouse wheel scroll hijacking unless in Interacting mode */}
                          {!isInteracting && (
                            <div 
                              className="iframe-scroll-shield"
                              onClick={(e) => {
                                e.stopPropagation();
                                setInteractingCardId(spec.id);
                                playCyberSound('toggle');
                              }}
                              title="Click to interact with 3D scene"
                            />
                          )}
                        </>
                      )}

                      {/* Mobile In-Phone Live Iframe (Active on Dwell Auto-Preview or Full Interaction) */}
                      {isIframeVisibleOnMobile && (
                        <iframe
                          src={spec.liveUrl}
                          title={`${spec.title} Mobile Interactive Preview`}
                          className={`mobile-live-inphone-iframe ${isAutoPreview ? 'iframe-auto-preview' : 'iframe-full-interact'}`}
                          loading="eager"
                          scrolling="yes"
                          style={{
                            width: `${100 / mobileIframeScale}%`,
                            height: `${100 / mobileIframeScale}%`,
                            transform: `scale(${mobileIframeScale})`,
                            transformOrigin: '0 0',
                          }}
                          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; clipboard-write; web-share"
                        />
                      )}
                    </div>
                  </div>

                  <div className="project-info">
                    <div className="project-info-row-top">
                      <span className="project-num">{spec.id}</span>
                      <div className="project-title-area">
                        <h3>{spec.title}</h3>
                        <p>{spec.subtitle}</p>
                      </div>
                    </div>

                    <div className="project-badges" style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                      {spec.badges.map((b, bIdx) => (
                        <span 
                          key={bIdx}
                          style={b.primary ? {
                            fontSize: '0.65rem',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            background: 'rgba(16,185,129,0.1)',
                            color: '#10b981',
                            border: '1px solid rgba(16,185,129,0.3)'
                          } : {
                            fontSize: '0.65rem',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            background: 'rgba(255,255,255,0.05)',
                            color: '#aaa',
                            border: '1px solid #222'
                          }}
                        >
                          {b.text}
                        </span>
                      ))}
                    </div>

                    <div className="project-actions-box">
                      <button 
                        className="spec-trigger-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          playCyberSound('spec');
                          setActiveSpec(spec);
                        }}
                      >
                        <span>⚡ SYSTEM SPEC</span>
                      </button>
                    </div>
                  </div>

                  {/* Mobile Exterior Floating Dock (Niche - Below Phone Frame) */}
                  <div className="mobile-exterior-dock">
                    {/* Interaction Pill: Placed bottom center just below phone screen, right above text */}
                    {offset === 0 && (
                      <div className="mobile-dock-pill-row">
                        {spec.canIframe ? (
                          <button 
                            type="button"
                            className={`mobile-interact-pill ${isMobileInteracting ? 'pill-active' : ''} ${isAutoPreview ? 'pill-autopreview' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleMobileInteract(spec.id);
                            }}
                          >
                            {isMobileInteracting ? (
                              <>
                                <span className="pill-dot red-pulse"></span>
                                <span>✕ EXIT INTERACTION (SCROLL)</span>
                              </>
                            ) : isAutoPreview ? (
                              <>
                                <span className="pill-dot cyan-pulse"></span>
                                <span>🎮 TAP TO INTERACT (LIVE)</span>
                              </>
                            ) : (
                              <>
                                <span className="pill-dot green-pulse"></span>
                                <span>🎮 INTERACT IN-PHONE</span>
                              </>
                            )}
                          </button>
                        ) : (
                          <a 
                            href={spec.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="mobile-interact-pill pill-external"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="pill-dot green-pulse"></span>
                            <span>↗ OPEN LIVE SITE</span>
                          </a>
                        )}
                      </div>
                    )}

                    <div className="exterior-dock-main-row">
                      <div className="exterior-dock-info">
                        <span className="exterior-dock-num">{spec.id}</span>
                        <span className="exterior-dock-title">{spec.title}</span>
                      </div>
                      <div className="exterior-dock-actions">
                        <a 
                          href={spec.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="exterior-spec-btn exterior-visit-btn"
                          title="Open full site in new tab"
                          onClick={(e) => {
                            e.stopPropagation();
                            playCyberSound('click');
                          }}
                        >
                          ↗ VISIT
                        </a>
                        <button 
                          type="button"
                          className="exterior-spec-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            playCyberSound('spec');
                            setActiveSpec(spec);
                          }}
                        >
                          ⚡ SPEC
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


      </section>

      {/* CRAFT & CAPABILITIES SECTION (OPTION 1) */}
      <section className="craft-section">
        <div className="craft-container">
          {/* Section Header */}
          <div className="craft-header-bar">
            <span className="craft-tag">{"// DISCIPLINES & ARCHITECTURE"}</span>
            <h2>CRAFT &amp; CAPABILITIES</h2>
          </div>

          {/* Part 1: Full-Width Editorial Statement */}
          <div className="craft-manifesto">
            <p className="manifesto-lead">
              “Great web products shouldn’t force a trade-off between visual ambition and engineering reliability. I bridge the gap between studio-grade 3D design and clean, full-stack execution—taking projects from initial concept to live production.”
            </p>
          </div>

          {/* Part 2: 3 Full-Width Interactive Capability Rows */}
          <div className="capabilities-rows">
            {/* Row 01 */}
            <div className="capability-row" onMouseEnter={() => playCyberSound('hover')}>
              <div className="cap-meta">
                <span className="cap-num">01</span>
                <span className="cap-symbol">◈</span>
              </div>
              <div className="cap-body">
                <div className="cap-header">
                  <h3>INTERACTIVE 3D &amp; WEBGL</h3>
                  <span className="cap-badge">REAL-TIME 3D</span>
                </div>
                <p className="cap-desc">
                  Real-time Three.js &amp; R3F scenes, custom shaders, and interactive product/clinical visualizations that run smoothly across devices.
                </p>
              </div>
              <div className="cap-stack">
                <span>Three.js</span>
                <span>R3F</span>
                <span>GLSL</span>
                <span>WebGL 2.0</span>
              </div>
            </div>

            {/* Row 02 */}
            <div className="capability-row" onMouseEnter={() => playCyberSound('hover')}>
              <div className="cap-meta">
                <span className="cap-num">02</span>
                <span className="cap-symbol">⚡</span>
              </div>
              <div className="cap-body">
                <div className="cap-header">
                  <h3>FRONTEND CRAFT &amp; MOTION</h3>
                  <span className="cap-badge">KINETIC UI</span>
                </div>
                <p className="cap-desc">
                  Editorial typography, tactile micro-interactions, and physics-based smooth scrolling built with extreme attention to detail.
                </p>
              </div>
              <div className="cap-stack">
                <span>Next.js 16</span>
                <span>React 19</span>
                <span>GSAP</span>
                <span>Lenis</span>
                <span>Tailwind v4</span>
              </div>
            </div>

            {/* Row 03 */}
            <div className="capability-row" onMouseEnter={() => playCyberSound('hover')}>
              <div className="cap-meta">
                <span className="cap-num">03</span>
                <span className="cap-symbol">⚙</span>
              </div>
              <div className="cap-body">
                <div className="cap-header">
                  <h3>FULL-STACK &amp; AUTOMATION</h3>
                  <span className="cap-badge">SYSTEMS &amp; APIS</span>
                </div>
                <p className="cap-desc">
                  End-to-end backend wiring including payment checkouts, cryptographic webhooks, atomic database transactions, and automated fulfillment APIs.
                </p>
              </div>
              <div className="cap-stack">
                <span>TypeScript</span>
                <span>Serverless APIs</span>
                <span>Redis</span>
                <span>Cloud Storage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="footer-section">
        <div className="footer-left">
          <h2>LET&apos;S BUILD<br/>THE FUTURE <span className="star-icon">✦</span></h2>
          <p>Have an ambitious project in mind? Whether you need an interactive 3D brand experience or a full-stack web platform, let’s build it together.</p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:hello@adarshkarmic.trendypixel.de" className="freelance-btn">
              <span>&rarr;</span> INITIATE A PROJECT COLLABORATION
            </a>
            <button 
              className={`copy-email-btn ${copiedEmail ? 'copied' : ''}`}
              onClick={handleCopyEmail}
              title="Copy email to clipboard"
            >
              <span>{copiedEmail ? '✓ COPIED: hello@adarshkarmic.trendypixel.de' : '📋 COPY DIRECT EMAIL'}</span>
            </button>
          </div>
        </div>
        <div className="footer-middle">
          <ul className="contact-list">
            <li><span className="icon">✉</span> hello@adarshkarmic.trendypixel.de</li>
            <li><span className="icon">🌐</span> <a href="https://adarshkarmic.trendypixel.de/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>adarshkarmic.trendypixel.de</a></li>
            <li><span className="icon">📞</span> +91 91175 55175</li>
            <li><span className="icon">⚡</span> Creative Technologist • 3D &amp; Full-Stack</li>
          </ul>
        </div>
        <div className="footer-right">
          <div className="laptop-placeholder">
            <img src="/coding.webp" alt="Digital Experiences" />
            <div className="laptop-text">
              <h4>INTERACTIVE 3D &amp; FULL-STACK WEB DEVELOPMENT</h4>
            </div>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE SYSTEM SPEC BLUEPRINT MODAL */}
      <SpecModal 
        activeSpec={activeSpec} 
        onClose={() => setActiveSpec(null)} 
        playCyberSound={playCyberSound} 
      />
    </div>
  );
}
