"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  CAPABILITIES_DATA,
  CAPABILITIES_LIST,
  DEFAULT_CAPABILITY_SLUG,
} from '../data/capabilities';

// Precision Synthesizer Haptic Audio (Whisper-quiet, elegant tactile confirmation)
let globalAudioCtx = null;
const getAudioCtx = () => {
  if (typeof window === 'undefined') return null;
  if (!globalAudioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) globalAudioCtx = new AudioContext();
  }
  if (globalAudioCtx && globalAudioCtx.state === 'suspended') {
    globalAudioCtx.resume();
  }
  return globalAudioCtx;
};

const FREQS = [523.25, 659.25, 783.99, 880.0, 1046.5];

const playNodeHoverSfx = (index) => {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const gain = ctx.createGain();
    gain.connect(ctx.destination);

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    const baseFreq = FREQS[index % FREQS.length];
    osc.frequency.setValueAtTime(baseFreq + 80, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq, now + 0.035);
    osc.connect(gain);

    // Whisper quiet: peak gain 0.02
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.02, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

    osc.start(now);
    osc.stop(now + 0.16);
  } catch {}
};

const playNodeSelectSfx = (index) => {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;

    [0, 3].forEach((interval, i) => {
      const gain = ctx.createGain();
      gain.connect(ctx.destination);
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      const f = (FREQS[index % FREQS.length] || 523.25) * (1 + interval * 0.08);
      osc.frequency.setValueAtTime(f, now);
      osc.connect(gain);

      // Low volume harmonic click
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.035, now + 0.02 + i * 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

      osc.start(now + i * 0.015);
      osc.stop(now + 0.28);
    });
  } catch {}
};

const MOBILE_SHORT_LABELS = {
  'web-experiences': 'WEB',
  'ai-campaigns': 'AI ADS',
  'automation-systems': 'AUTOMATION',
  'ai-agents': 'AGENTS',
  'creative-experiments': 'EXPERIMENTS',
};

// Base orbital angular offsets for the 5 capability nodes (72° equidistant spacing)
// Node 0 (Web Experiences): -90° (Top Center, above hair)
// Node 1 (AI Campaigns): -18° (Upper Right)
// Node 2 (Automation Systems): +54° (Lower Right)
// Node 3 (AI Agents): +126° (Lower Left)
// Node 4 (Creative Experiments): +198° (Upper Left)
const BASE_ANGLES = [-Math.PI / 2, -Math.PI / 2 + 1.2566, -Math.PI / 2 + 2.5133, -Math.PI / 2 + 3.7699, -Math.PI / 2 + 5.0265];
const ORBIT_PERIOD_SECONDS = 48; // Smooth 48-second complete orbital revolution

export default function HaloDialer({
  activeSlug = DEFAULT_CAPABILITY_SLUG,
  onSelectCapability = () => {},
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const isInteractingRef = useRef(false);
  const currentRotationRef = useRef(0);
  const nodeElementsRef = useRef([]);

  // High-precision touch tracking & deduplication refs
  const touchTrackerRef = useRef({
    startX: 0,
    startY: 0,
    startTime: 0,
    isScroll: false,
    nodeId: null,
  });
  const lastTouchActionTimeRef = useRef(0);
  const resumeTimerRef = useRef(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nodes = CAPABILITIES_LIST.map((slug) => CAPABILITIES_DATA[slug]);
  const nodeSize = isMobile ? 32 : 44;

  // Calibrated elliptical orbit geometry (guarantees clear clearance over face, chin & hair)
  const Rx = isMobile ? 144 : 304;
  const Ry = isMobile ? 130 : 252;
  const Y_OFFSET = isMobile ? 16 : 10;

  // High-performance continuous orbital motion loop (60 FPS with zero React re-renders)
  useEffect(() => {
    let animId = null;
    let lastTime = performance.now();
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = mediaQuery.matches;

    const onMotionChange = (e) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', onMotionChange);

    const updateOrbit = (time) => {
      const delta = (time - lastTime) * 0.001;
      lastTime = time;

      if (!isInteractingRef.current && !prefersReducedMotion) {
        // Advance rotation smoothly: 2π radians per ORBIT_PERIOD_SECONDS
        currentRotationRef.current = (currentRotationRef.current + (delta / ORBIT_PERIOD_SECONDS) * 2 * Math.PI) % (2 * Math.PI);
      }

      const rot = prefersReducedMotion ? 0 : currentRotationRef.current;

      // Update positions of all 5 nodes directly on the GPU
      nodeElementsRef.current.forEach((el, idx) => {
        if (!el) return;
        const angle = BASE_ANGLES[idx] + rot;
        const x = Rx * Math.cos(angle);
        const y = Ry * Math.sin(angle) + Y_OFFSET;
        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      });

      animId = requestAnimationFrame(updateOrbit);
    };

    animId = requestAnimationFrame(updateOrbit);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      mediaQuery.removeEventListener('change', onMotionChange);
    };
  }, [Rx, Ry, Y_OFFSET]);

  // -------------------------------------------------------------
  // HIGH-RELIABILITY MOBILE TOUCH & INTERACTION HANDLERS
  // -------------------------------------------------------------
  const handleNodeTouchStart = (node, e) => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
    isInteractingRef.current = true;
    if (e.touches && e.touches.length > 0) {
      touchTrackerRef.current = {
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        startTime: e.timeStamp,
        isScroll: false,
        nodeId: node.id,
      };
    }
  };

  const handleNodeTouchMove = (e) => {
    if (e.touches && e.touches.length > 0 && touchTrackerRef.current.nodeId) {
      const dx = e.touches[0].clientX - touchTrackerRef.current.startX;
      const dy = e.touches[0].clientY - touchTrackerRef.current.startY;
      // Tested 8px threshold distinguishes deliberate taps from page scrolling gestures
      if (Math.hypot(dx, dy) > 8) {
        touchTrackerRef.current.isScroll = true;
      }
    }
  };

  const handleNodeTouchEnd = (node, e) => {
    const tracker = touchTrackerRef.current;
    const now = e ? e.timeStamp : 0;
    const duration = now - tracker.startTime;
    const isValidTap = !tracker.isScroll && duration < 500 && tracker.nodeId === node.id;
    touchTrackerRef.current.nodeId = null;

    if (isValidTap) {
      // Record timestamp to deduplicate following synthetic click
      lastTouchActionTimeRef.current = now;
      playNodeSelectSfx(node.index);
      onSelectCapability(node.id);

      // Deterministic 300ms pause prevents node hit-target drift while activating
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(() => {
        isInteractingRef.current = false;
        resumeTimerRef.current = null;
      }, 300);
    } else {
      isInteractingRef.current = false;
    }
  };

  const handleNodeTouchCancel = () => {
    touchTrackerRef.current.nodeId = null;
    isInteractingRef.current = false;
  };

  const handleNodeClick = (node, e) => {
    e.stopPropagation();
    // Deduplication guard: ignore synthetic click if already triggered via touch within 600ms
    const now = e ? e.timeStamp : 0;
    if (now - lastTouchActionTimeRef.current < 600) {
      return;
    }
    playNodeSelectSfx(node.index);
    onSelectCapability(node.id);
  };

  const handleNodeKeyDown = (node, e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      playNodeSelectSfx(node.index);
      onSelectCapability(node.id);
    }
  };

  const handleNodeMouseEnter = (node, e) => {
    // Guard against touch devices and recent touch events to eliminate synthetic hover interference
    if (isMobile || (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)) {
      return;
    }
    const now = e ? e.timeStamp : 0;
    if (now - lastTouchActionTimeRef.current < 600) {
      return;
    }
    playNodeHoverSfx(node.index);
    setHoveredIdx(node.index);
    isInteractingRef.current = true;
  };

  const handleNodeMouseLeave = () => {
    if (isMobile) return;
    setHoveredIdx(null);
    isInteractingRef.current = false;
  };

  return (
    <div
      className="precision-instrument-dialer"
      role="tablist"
      aria-label="Capabilities Navigation Instrument"
    >
      <style jsx>{`
        .precision-instrument-dialer {
          position: relative;
          width: 0;
          height: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .orbit-node-btn {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        .orbit-node-btn:focus-visible {
          outline: 2px solid #00e5ff;
          outline-offset: 4px;
          border-radius: 50%;
        }
        @media (prefers-reduced-motion: reduce) {
          .active-halo-ring,
          .node-rotating-reticle {
            animation: none !important;
          }
        }
      `}</style>

      {/* INSTRUMENT CHASSIS: Precision Concentric Calibration Guide Rings */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          pointerEvents: 'none',
          zIndex: 1,
          overflow: 'visible',
        }}
        aria-hidden="true"
      >
        {/* Outer Hairline Calibration Ring */}
        <ellipse
          cx={0}
          cy={Y_OFFSET}
          rx={isMobile ? Rx + 14 : Rx + 24}
          ry={isMobile ? Ry + 12 : Ry + 20}
          fill="none"
          stroke="rgba(255, 255, 255, 0.04)"
          strokeWidth="1"
        />

        {/* Primary Radial Orbit Path */}
        <ellipse
          cx={0}
          cy={Y_OFFSET}
          rx={Rx}
          ry={Ry}
          fill="none"
          stroke="rgba(0, 229, 255, 0.14)"
          strokeWidth="1"
          strokeDasharray="3 9"
        />

        {/* Inner Spatial Depth Ring */}
        <ellipse
          cx={0}
          cy={Y_OFFSET}
          rx={isMobile ? Rx - 16 : Rx - 28}
          ry={isMobile ? Ry - 14 : Ry - 22}
          fill="none"
          stroke="rgba(255, 255, 255, 0.03)"
          strokeWidth="1"
        />
      </svg>

      {/* CONTINUOUS HALO CONSTELLATION NODES */}
      <div
        className="orbit-chassis"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          zIndex: 2,
        }}
        onMouseEnter={() => {
          if (isMobile) return;
          isInteractingRef.current = true;
        }}
        onMouseLeave={() => {
          if (isMobile) return;
          isInteractingRef.current = false;
        }}
      >
        {nodes.map((node, i) => {
          const isActive = node.id === activeSlug;
          const isHovered = hoveredIdx === node.index;
          // Initial baseline position (fallback before first animation frame)
          const initialAngle = BASE_ANGLES[i];
          const initialX = Rx * Math.cos(initialAngle);
          const initialY = Ry * Math.sin(initialAngle);

          return (
            <div
              key={node.id}
              ref={(el) => {
                nodeElementsRef.current[i] = el;
              }}
              role="tab"
              aria-selected={isActive}
              aria-label={`${node.number} ${node.title}`}
              tabIndex={0}
              className={`orbit-node-btn ${isActive ? 'is-active' : ''}`}
              onClick={(e) => handleNodeClick(node, e)}
              onKeyDown={(e) => handleNodeKeyDown(node, e)}
              onMouseEnter={(e) => handleNodeMouseEnter(node, e)}
              onMouseLeave={handleNodeMouseLeave}
              onTouchStart={(e) => handleNodeTouchStart(node, e)}
              onTouchMove={handleNodeTouchMove}
              onTouchEnd={(e) => handleNodeTouchEnd(node, e)}
              onTouchCancel={handleNodeTouchCancel}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                transform: `translate3d(${initialX.toFixed(2)}px, ${initialY.toFixed(2)}px, 0)`,
                cursor: 'pointer',
                pointerEvents: 'auto',
                zIndex: isActive ? 25 : isHovered ? 15 : 5,
                outline: 'none',
                userSelect: 'none',
                minWidth: '44px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                willChange: 'transform',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {/* Node Wrapper: Keeps node & label naturally upright with smooth active scale */}
              <div
                className="orbit-counter-wrapper"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transform: `translate(-50%, -50%) scale(${
                    isActive ? (isMobile ? 1.15 : 1.22) : isHovered ? 1.08 : 1
                  })`,
                  transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Precision Instrument Node Orb */}
                <div
                  style={{
                    width: `${nodeSize}px`,
                    height: `${nodeSize}px`,
                    borderRadius: '50%',
                    position: 'relative',
                    background: isActive
                      ? `radial-gradient(circle at 35% 28%, #ffffff 0%, ${node.accent} 45%, #07090d 95%)`
                      : isHovered
                      ? `radial-gradient(circle at 35% 28%, rgba(255,255,255,0.9) 0%, ${node.accent}bb 40%, #0b0e13 90%)`
                      : `radial-gradient(circle at 35% 28%, rgba(255,255,255,0.55) 0%, ${node.accent}66 38%, #0d1117 88%)`,
                    border: isActive
                      ? `1.5px solid #ffffff`
                      : isHovered
                      ? `1px solid ${node.accent}`
                      : `1px solid rgba(255, 255, 255, 0.15)`,
                    boxShadow: isActive
                      ? `0 0 20px ${node.glow}, 0 0 35px ${node.glow}, inset 0 2px 4px rgba(255,255,255,0.8)`
                      : isHovered
                      ? `0 0 14px ${node.glow}, inset 0 1px 3px rgba(255,255,255,0.5)`
                      : `0 0 8px rgba(0, 0, 0, 0.8), inset 0 1px 2px rgba(255,255,255,0.3)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'border 0.3s ease, box-shadow 0.3s ease',
                  }}
                >
                  {/* Continuous Anticlockwise Reticle Ring on ALL 5 spheres (12s complete rotation) */}
                  <div
                    className="node-rotating-reticle"
                    style={{
                      position: 'absolute',
                      top: isMobile ? '-7px' : '-8px',
                      left: isMobile ? '-7px' : '-8px',
                      right: isMobile ? '-7px' : '-8px',
                      bottom: isMobile ? '-7px' : '-8px',
                      borderRadius: '50%',
                      border: isActive
                        ? `1.5px dashed ${node.accent}`
                        : isHovered
                        ? `1.2px dashed ${node.accent}`
                        : `1px dashed rgba(255, 255, 255, 0.28)`,
                      boxShadow: isActive ? `0 0 12px ${node.glow}` : 'none',
                      animation: 'anticlockwiseReticleSpin 12s linear infinite',
                      pointerEvents: 'none',
                      willChange: 'transform',
                    }}
                  />

                  {/* Subtle Glyphic Indicator */}
                  <span
                    style={{
                      fontSize: isMobile ? '0.74rem' : '0.92rem',
                      color: isActive ? '#ffffff' : '#f2f3f5',
                      textShadow: isActive ? `0 0 10px ${node.accent}` : 'none',
                      transition: 'all 0.3s ease',
                      transform: isActive || isHovered ? 'scale(1.1)' : 'none',
                    }}
                  >
                    {node.icon}
                  </span>

                  {/* Active Outer Precision Reticle Pulse */}
                  {isActive && (
                    <div
                      className="active-halo-ring"
                      style={{
                        position: 'absolute',
                        top: isMobile ? '-5px' : '-6px',
                        left: isMobile ? '-5px' : '-6px',
                        right: isMobile ? '-5px' : '-6px',
                        bottom: isMobile ? '-5px' : '-6px',
                        borderRadius: '50%',
                        border: `1px solid ${node.accent}`,
                        boxShadow: `0 0 14px ${node.accent}`,
                        animation: 'subtleRingPulse 3s ease-in-out infinite',
                        pointerEvents: 'none',
                        willChange: 'transform, opacity',
                      }}
                    />
                  )}

                  {/* Hover Micro-Reticle */}
                  {isHovered && !isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-4px',
                        left: '-4px',
                        right: '-4px',
                        bottom: '-4px',
                        borderRadius: '50%',
                        border: `1px dashed rgba(255, 255, 255, 0.4)`,
                        pointerEvents: 'none',
                      }}
                    />
                  )}
                </div>

                {/* Clean Instrument Monospace Label */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '6px',
                    pointerEvents: 'none',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace, sans-serif",
                      fontSize: isMobile ? (isActive ? '0.50rem' : '0.46rem') : '0.52rem',
                      letterSpacing: isMobile ? '1.1px' : '1.4px',
                      fontWeight: 700,
                      color: isActive ? '#ffffff' : isHovered ? '#f2f3f5' : '#9299a5',
                      textShadow: isActive
                        ? `0 0 10px ${node.glow}, 0 0 2px #ffffff`
                        : 'none',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                      transition: 'color 0.3s ease, text-shadow 0.3s ease',
                    }}
                  >
                    {isMobile
                      ? isActive
                        ? node.title
                        : MOBILE_SHORT_LABELS[node.id] || node.shortName
                      : node.shortName}
                  </span>

                  {/* Active State Micro-Indicator */}
                  {isActive && (
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: isMobile ? '0.38rem' : '0.44rem',
                        letterSpacing: '1px',
                        color: node.accent,
                        marginTop: '2px',
                        fontWeight: 700,
                      }}
                    >
                      [ ACTIVE ]
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
