"use client";

import { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 100;
const PEAK_LEFT = 6;
const PEAK_TOP_LEFT = 18;
const PEAK_TOP = 29;
const PEAK_TOP_RIGHT = 40;
const PEAK_RIGHT = 50;
const PEAK_BOTTOM_RIGHT = 60;
const PEAK_BOTTOM = 70;
const PEAK_BOTTOM_LEFT = 82;
const PEAK_FRONT = 98;

// Living Human Gaze Choreography:
// Follows the visitor's natural inspection journey with biological neck arcs
// and rock-steady fixation holds with organic micro-ocular drift.
const HUMAN_INSPECTION_ROADMAP = [
  // 1st Nazar: Direct, confident, welcoming eye contact with visitor
  { 
    name: 'Visitor Direct Eye Contact',
    x: 0, 
    y: 0, 
    targetFrame: PEAK_FRONT,
    saccadeMs: 500, 
    holdMs: 3200 
  },
  // 2nd Nazar: Glances up-left toward "Adarsh Karmic // Portfolio & Monograph"
  { 
    name: 'Editorial Monograph & Name',
    x: -0.60, 
    y: -0.28, 
    targetFrame: PEAK_TOP_LEFT,
    saccadeMs: 560, 
    holdMs: 2700 
  },
  // Friendly re-engagement glance with visitor
  { 
    name: 'Visitor Re-engagement',
    x: 0, 
    y: 0, 
    targetFrame: PEAK_FRONT,
    saccadeMs: 480, 
    holdMs: 2200 
  },
  // 3rd Nazar: Glances across to right side Capabilities 01-03
  { 
    name: 'Capabilities Index 01-03',
    x: 0.62, 
    y: 0.08, 
    targetFrame: PEAK_RIGHT,
    saccadeMs: 540, 
    holdMs: 2800 
  },
  // 4th Nazar: Subtle downward glance towards scroll prompt / exploration
  { 
    name: 'Scroll Prompt & Exploration',
    x: 0.12, 
    y: 0.38, 
    targetFrame: PEAK_BOTTOM,
    saccadeMs: 460, 
    holdMs: 2000 
  },
  // Smooth return to direct eye contact
  { 
    name: 'Return Front Welcome',
    x: 0, 
    y: 0, 
    targetFrame: PEAK_FRONT,
    saccadeMs: 500, 
    holdMs: 3000 
  }
];

const TOTAL_ROADMAP_DURATION = HUMAN_INSPECTION_ROADMAP.reduce(
  (sum, step) => sum + step.saccadeMs + step.holdMs, 
  0
);

// Neuroscience Saccadic Velocity Curve (Biological Minimum-Jerk Trajectory with Muscle Cushion)
// Eliminates robotic stepper feel; replicates smooth human cervical acceleration & natural deceleration
function humanSaccadeEase(t) {
  const clamped = Math.max(0, Math.min(1, t));
  // Quintic minimum-jerk trajectory: 10t^3 - 15t^4 + 6t^5
  return clamped * clamped * clamped * (clamped * (6 * clamped - 15) + 10);
}

function getGazeFrame(mx, my) {
  const dist = Math.hypot(mx, my);

  // Clean, confident direct eye contact when cursor is near face/center
  if (dist < 0.20) {
    return PEAK_FRONT;
  }

  // Polar angle (-PI to +PI)
  const angle = Math.atan2(my, mx);
  let frame = PEAK_FRONT;

  // 1. Left (-PI) to Top-Left (-3*PI/4): -180 deg to -135 deg
  if (angle >= -Math.PI && angle < -0.75 * Math.PI) {
    const t = (angle - (-Math.PI)) / (0.25 * Math.PI);
    frame = PEAK_LEFT + t * (PEAK_TOP_LEFT - PEAK_LEFT);
  }
  // 2. Top-Left (-3*PI/4) to Top (-PI/2): -135 deg to -90 deg
  else if (angle >= -0.75 * Math.PI && angle < -0.5 * Math.PI) {
    const t = (angle - (-0.75 * Math.PI)) / (0.25 * Math.PI);
    frame = PEAK_TOP_LEFT + t * (PEAK_TOP - PEAK_TOP_LEFT);
  }
  // 3. Top (-PI/2) to Top-Right (-PI/4): -90 deg to -45 deg
  else if (angle >= -0.5 * Math.PI && angle < -0.25 * Math.PI) {
    const t = (angle - (-0.5 * Math.PI)) / (0.25 * Math.PI);
    frame = PEAK_TOP + t * (PEAK_TOP_RIGHT - PEAK_TOP);
  }
  // 4. Top-Right (-PI/4) to Right (0): -45 deg to 0 deg
  else if (angle >= -0.25 * Math.PI && angle < 0) {
    const t = (angle - (-0.25 * Math.PI)) / (0.25 * Math.PI);
    frame = PEAK_TOP_RIGHT + t * (PEAK_RIGHT - PEAK_TOP_RIGHT);
  }
  // 5. Right (0) to Bottom-Right (PI/4): 0 deg to 45 deg
  else if (angle >= 0 && angle < 0.25 * Math.PI) {
    const t = angle / (0.25 * Math.PI);
    frame = PEAK_RIGHT + t * (PEAK_BOTTOM_RIGHT - PEAK_RIGHT);
  }
  // 6. Bottom-Right (PI/4) to Bottom (PI/2): 45 deg to 90 deg
  else if (angle >= 0.25 * Math.PI && angle < 0.5 * Math.PI) {
    const t = (angle - 0.25 * Math.PI) / (0.25 * Math.PI);
    frame = PEAK_BOTTOM_RIGHT + t * (PEAK_BOTTOM - PEAK_BOTTOM_RIGHT);
  }
  // 7. Bottom (PI/2) to Bottom-Left (3*PI/4): 90 deg to 135 deg
  else if (angle >= 0.5 * Math.PI && angle < 0.75 * Math.PI) {
    const t = (angle - 0.5 * Math.PI) / (0.25 * Math.PI);
    frame = PEAK_BOTTOM + t * (PEAK_BOTTOM_LEFT - PEAK_BOTTOM);
  }
  // 8. Bottom-Left (3*PI/4) to Left (PI): 135 deg to 180 deg (Smooth wrap back to Left)
  else {
    const t = (angle - 0.75 * Math.PI) / (0.25 * Math.PI);
    if (t < 0.5) {
      frame = PEAK_BOTTOM_LEFT + (t / 0.5) * (PEAK_FRONT - PEAK_BOTTOM_LEFT);
    } else {
      const t2 = (t - 0.5) / 0.5;
      let f = PEAK_FRONT + t2 * 8;
      if (f > TOTAL_FRAMES) f -= TOTAL_FRAMES;
      frame = f;
    }
  }

  return frame;
}

export default function HeroGazeCanvas({ mouseOffset = { x: 0, y: 0 } }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const targetMxRef = useRef(0);
  const targetMyRef = useRef(0);
  const currentMxRef = useRef(0);
  const currentMyRef = useRef(0);

  const lastInteractionRef = useRef(Date.now());
  const isDraggingRef = useRef(false);
  const breathTickRef = useRef(0);
  const lastBreathYRef = useRef(0);
  const lastRenderedIdxRef = useRef(-1);
  const mouseStopTimerRef = useRef(null);

  // Progressive Priority Loading:
  // 1. Frame 98 (Front) loaded immediately
  // 2. 8 Cardinal Keyframes for 360° coverage
  // 3. Background streaming of remaining frames
  useEffect(() => {
    const imgs = new Array(TOTAL_FRAMES);
    imagesRef.current = imgs;

    const cardinalFrames = [PEAK_FRONT, PEAK_LEFT, PEAK_TOP_LEFT, PEAK_TOP, PEAK_TOP_RIGHT, PEAK_RIGHT, PEAK_BOTTOM_RIGHT, PEAK_BOTTOM, PEAK_BOTTOM_LEFT];

    // Priority 1: Load Front Frame
    const priorityImg = new Image();
    priorityImg.onload = () => {
      setIsLoaded(true);
    };
    priorityImg.src = `/hero_gaze_frames/frame_098.webp?v=ue5_hd`;
    imgs[PEAK_FRONT - 1] = priorityImg;

    if (priorityImg.complete) {
      setIsLoaded(true);
    }

    // Priority 2: Load 8 Cardinal Keyframes
    cardinalFrames.forEach((fIdx) => {
      if (fIdx === PEAK_FRONT) return;
      const img = new Image();
      const numStr = String(fIdx).padStart(3, '0');
      img.src = `/hero_gaze_frames/frame_${numStr}.webp?v=ue5_hd`;
      imgs[fIdx - 1] = img;
    });

    // Priority 3: Preload all remaining frames in sequential batches
    let currentBatchStart = 1;
    const loadNextBatch = () => {
      let loadedInBatch = 0;
      while (currentBatchStart <= TOTAL_FRAMES && loadedInBatch < 8) {
        const i = currentBatchStart;
        currentBatchStart++;
        if (cardinalFrames.includes(i)) continue;

        const img = new Image();
        const numStr = String(i).padStart(3, '0');
        img.src = `/hero_gaze_frames/frame_${numStr}.webp?v=ue5_hd`;
        imgs[i - 1] = img;
        loadedInBatch++;
      }

      if (currentBatchStart <= TOTAL_FRAMES) {
        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
          window.requestIdleCallback(loadNextBatch, { timeout: 200 });
        } else {
          setTimeout(loadNextBatch, 80);
        }
      }
    };

    const timer = setTimeout(loadNextBatch, 150);
    return () => clearTimeout(timer);
  }, []);

  // Bulletproof optical gaze ray calculation from Adarsh's actual eye level
  const updateGazeCoordinates = (clientX, clientY) => {
    lastInteractionRef.current = Date.now();

    let centerX = window.innerWidth * 0.5;
    let centerY = window.innerHeight * 0.45;

    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        centerX = rect.left + rect.width * 0.5;
        centerY = rect.top + rect.height * 0.30; // Anatomical eye level (y=310 in 1080p frame)
      }
    }

    // Normalized tracking radii with comfortable deflection across full desktop & mobile viewports
    const radiusX = Math.max(window.innerWidth * 0.38, 160);
    const radiusY = Math.max(window.innerHeight * 0.34, 150);

    const dx = (clientX - centerX) / radiusX;
    const dy = (clientY - centerY) / radiusY;

    targetMxRef.current = Math.max(-1, Math.min(1, dx));
    targetMyRef.current = Math.max(-1, Math.min(1, dy));
  };

  // Unified Event Listeners: Handles Desktop Mouse Movement & Mobile Hero Touch Dragging
  useEffect(() => {
    const onMouseMove = (e) => {
      isDraggingRef.current = false;
      lastInteractionRef.current = Date.now();
      updateGazeCoordinates(e.clientX, e.clientY);

      // When cursor stops moving at any position, promptly return to initial front gaze (200ms dwell)
      if (mouseStopTimerRef.current) {
        clearTimeout(mouseStopTimerRef.current);
      }
      mouseStopTimerRef.current = setTimeout(() => {
        targetMxRef.current = 0;
        targetMyRef.current = 0;
      }, 200);
    };

    const onMouseLeave = () => {
      if (mouseStopTimerRef.current) {
        clearTimeout(mouseStopTimerRef.current);
      }
      // Instantly return to initial front position when cursor leaves window
      targetMxRef.current = 0;
      targetMyRef.current = 0;
    };

    const onHeroPointerMove = (e) => {
      if (e.detail) {
        isDraggingRef.current = true;
        lastInteractionRef.current = Date.now();
        updateGazeCoordinates(e.detail.clientX, e.detail.clientY);

        // When touch drag stops moving at any position, promptly return to initial front gaze (200ms dwell)
        if (mouseStopTimerRef.current) {
          clearTimeout(mouseStopTimerRef.current);
        }
        mouseStopTimerRef.current = setTimeout(() => {
          targetMxRef.current = 0;
          targetMyRef.current = 0;
        }, 200);
      }
    };

    const onHeroPointerEnd = () => {
      isDraggingRef.current = false;
      if (mouseStopTimerRef.current) {
        clearTimeout(mouseStopTimerRef.current);
      }
      // Instantly return to initial front position when touch drag ends
      targetMxRef.current = 0;
      targetMyRef.current = 0;
      lastInteractionRef.current = Date.now();
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });
    window.addEventListener('hero-pointer-move', onHeroPointerMove, { passive: true });
    window.addEventListener('hero-pointer-end', onHeroPointerEnd, { passive: true });

    return () => {
      if (mouseStopTimerRef.current) {
        clearTimeout(mouseStopTimerRef.current);
      }
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('hero-pointer-move', onHeroPointerMove);
      window.removeEventListener('hero-pointer-end', onHeroPointerEnd);
    };
  }, []);

  // Helper: Retrieve the best available frame (exact frame or nearest loaded cardinal keyframe)
  const getBestAvailableImage = (targetIdx) => {
    const imgs = imagesRef.current;
    if (!imgs) return null;

    // 1. Direct hit: exact requested frame
    const direct = imgs[targetIdx - 1];
    if (direct && direct.complete && direct.naturalWidth > 0) {
      return { img: direct, idx: targetIdx };
    }

    // 2. Nearest loaded cardinal frame fallback (ensures continuous smooth render with no visual blanks)
    const cardinals = [98, 6, 18, 29, 40, 50, 60, 70, 82];
    let bestCard = 98;
    let minDiff = 999;
    for (const c of cardinals) {
      const cImg = imgs[c - 1];
      if (cImg && cImg.complete && cImg.naturalWidth > 0) {
        let diff = Math.abs(c - targetIdx);
        if (diff > 50) diff = 100 - diff;
        if (diff < minDiff) {
          minDiff = diff;
          bestCard = c;
        }
      }
    }

    const fallbackImg = imgs[bestCard - 1];
    if (fallbackImg && fallbackImg.complete && fallbackImg.naturalWidth > 0) {
      return { img: fallbackImg, idx: bestCard };
    }

    return null;
  };

  // Animation & Canvas Draw Loop with Off-Screen Pause & Biological Micro-Movements
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let isVisible = true;

    // Off-screen pause observer (relieves 100% CPU/GPU when user scrolls to projects or footer)
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animId) {
        animId = requestAnimationFrame(render);
      }
    }, { threshold: 0.05 });

    observer.observe(canvas);

    const render = () => {
      if (!isVisible) {
        animId = null;
        return;
      }
      animId = requestAnimationFrame(render);

      const imgs = imagesRef.current;
      if (!imgs || imgs.length === 0) return;

      const now = Date.now();
      const idleTime = now - lastInteractionRef.current;
      // Generous 4.5s idle threshold before entering autonomous roadmap
      const isIdle = !isDraggingRef.current && idleTime > 4500;

      // Autonomous Living Human Inspection Choreography when idle (> 4500ms)
      if (isIdle) {
        const cycleTime = (idleTime - 4500) % TOTAL_ROADMAP_DURATION;
        let accumulated = 0;
        let activeStep = HUMAN_INSPECTION_ROADMAP[0];
        let prevStep = HUMAN_INSPECTION_ROADMAP[HUMAN_INSPECTION_ROADMAP.length - 1];
        let stepProgressMs = 0;

        for (let sIdx = 0; sIdx < HUMAN_INSPECTION_ROADMAP.length; sIdx++) {
          const step = HUMAN_INSPECTION_ROADMAP[sIdx];
          const stepTotal = step.saccadeMs + step.holdMs;
          if (cycleTime >= accumulated && cycleTime < accumulated + stepTotal) {
            activeStep = step;
            prevStep = sIdx > 0 ? HUMAN_INSPECTION_ROADMAP[sIdx - 1] : HUMAN_INSPECTION_ROADMAP[HUMAN_INSPECTION_ROADMAP.length - 1];
            stepProgressMs = cycleTime - accumulated;
            break;
          }
          accumulated += stepTotal;
        }

        // Biological Respiratory Chin Nod: ~13-14 breaths per min resting rhythm
        breathTickRef.current += 0.018;
        const breathPhase = breathTickRef.current;
        const breathWave = Math.sin(breathPhase) + 0.25 * Math.sin(2 * breathPhase - Math.PI * 0.5);
        const respiratoryChinNod = -breathWave * 0.028;

        let currentX = activeStep.x;
        let currentY = activeStep.y;

        if (stepProgressMs < activeStep.saccadeMs) {
          const t = stepProgressMs / activeStep.saccadeMs;
          const ease = humanSaccadeEase(t);
          const cervicalArcY = Math.sin(t * Math.PI) * 0.035;

          currentX = prevStep.x + (activeStep.x - prevStep.x) * ease;
          currentY = prevStep.y + (activeStep.y - prevStep.y) * ease + cervicalArcY + respiratoryChinNod * 0.4;
        } else {
          const holdElapsed = stepProgressMs - activeStep.saccadeMs;
          const microDriftX = Math.sin(holdElapsed * 0.0014) * 0.005 + Math.sin(holdElapsed * 0.0032) * 0.003;
          const microDriftY = Math.cos(holdElapsed * 0.0016) * 0.004 + Math.cos(holdElapsed * 0.0038) * 0.002 + respiratoryChinNod;
          currentX = activeStep.x + microDriftX;
          currentY = activeStep.y + microDriftY;
        }

        targetMxRef.current = currentX;
        targetMyRef.current = currentY;
      } else {
        breathTickRef.current += 0.018;
      }

      // Physics: Smooth anatomical muscle damping for responsive, non-jittery head tracking
      const isReturningToCenter = targetMxRef.current === 0 && targetMyRef.current === 0;
      const LERP_FACTOR = isDraggingRef.current ? 0.26 : (isReturningToCenter ? 0.28 : (isIdle ? 0.08 : 0.22));
      currentMxRef.current += (targetMxRef.current - currentMxRef.current) * LERP_FACTOR;
      currentMyRef.current += (targetMyRef.current - currentMyRef.current) * LERP_FACTOR;
      if (isReturningToCenter && Math.abs(currentMxRef.current) < 0.005 && Math.abs(currentMyRef.current) < 0.005) {
        currentMxRef.current = 0;
        currentMyRef.current = 0;
      }

      // Realistic Anisotropic Ribcage & Lung Expansion
      // Breathing expands UPWARD into chest/shoulders, never DOWNWARD below the ground line
      const breathPhase = breathTickRef.current;
      const breathWave = Math.sin(breathPhase) + 0.25 * Math.sin(2 * breathPhase - Math.PI * 0.5);
      const breathY = -Math.max(0, breathWave) * 3.8;

      // Style mutation throttle: only mutate DOM when delta > 0.35px
      if (Math.abs(breathY - lastBreathYRef.current) > 0.35) {
        lastBreathYRef.current = breathY;
        const isMobile = window.innerWidth < 1024;
        const baseScale = isMobile ? 0.92 : 1.0;
        const breathScaleX = baseScale + Math.max(0, breathWave) * 0.008;
        const breathScaleY = baseScale + Math.max(0, breathWave) * 0.005;
        canvas.style.transform = `translateY(${breathY.toFixed(1)}px) scale(${breathScaleX.toFixed(3)}, ${breathScaleY.toFixed(3)})`;
      }

      // Crisp Single-Frame Photographic Rendering with Bulletproof Fallback
      const targetFrame = getGazeFrame(currentMxRef.current, currentMyRef.current);
      let targetIdx = Math.round(targetFrame);
      if (targetIdx < 1) targetIdx = 1;
      if (targetIdx > TOTAL_FRAMES) targetIdx = TOTAL_FRAMES;

      const best = getBestAvailableImage(targetIdx);
      if (best && best.img) {
        if (canvas.width !== best.img.naturalWidth || canvas.height !== best.img.naturalHeight) {
          canvas.width = best.img.naturalWidth;
          canvas.height = best.img.naturalHeight;
          lastRenderedIdxRef.current = -1;
        }

        // Only redraw if the actual rendered frame index changed
        if (best.idx !== lastRenderedIdxRef.current) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.globalAlpha = 1;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(best.img, 0, 0);
          lastRenderedIdxRef.current = best.idx;
        }
      }
    };

    animId = requestAnimationFrame(render);
    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isLoaded]);

  return (
    <div className="hero-gaze-wrapper">
      <canvas
        ref={canvasRef}
        className="hero-gaze-canvas"
      />
      {!isLoaded && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/hero_gaze_frames/frame_098.webp?v=ue5_hd"
          alt="Adarsh Karmic"
          className="hero-gaze-fallback"
        />
      )}
    </div>
  );
}
