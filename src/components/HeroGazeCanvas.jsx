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

  // Deadzone near center: Directly front gaze (Frame 98)
  if (dist < 0.16) {
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
  // 8. Bottom-Left (3*PI/4) to Left (PI): 135 deg to 180 deg (Continuous 360 Loop through Front 98)
  else {
    const t = (angle - 0.75 * Math.PI) / (0.25 * Math.PI);
    if (t < 0.5) {
      // 82 -> 98
      frame = PEAK_BOTTOM_LEFT + (t / 0.5) * (PEAK_FRONT - PEAK_BOTTOM_LEFT);
    } else {
      // 98 -> 100 -> 1 -> 6 (wraps cleanly)
      const t2 = (t - 0.5) / 0.5;
      let f = PEAK_FRONT + t2 * 8;
      if (f > TOTAL_FRAMES) f -= TOTAL_FRAMES;
      frame = f;
    }
  }

  // Smooth blending when transitioning between center deadzone (0.16) and active tracking (0.35)
  if (dist < 0.35) {
    const blend = (dist - 0.16) / (0.35 - 0.16);
    // Shortest circular interpolation towards PEAK_FRONT (98)
    let diff = frame - PEAK_FRONT;
    if (diff > 50) diff -= 100;
    if (diff < -50) diff += 100;
    frame = PEAK_FRONT + diff * blend;
    if (frame < 1) frame += 100;
    if (frame > 100) frame -= 100;
  }

  return frame;
}

export default function HeroGazeCanvas({ mouseOffset = { x: 0, y: 0 } }) {
  const canvasRef = useRef(null);
  const touchZoneRef = useRef(null);
  const imagesRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const targetMxRef = useRef(0);
  const targetMyRef = useRef(0);
  const currentMxRef = useRef(0);
  const currentMyRef = useRef(0);

  const lastInteractionRef = useRef(Date.now());
  const isDraggingRef = useRef(false);
  const breathTickRef = useRef(0);
  const lastBreathYRef = useRef(0);
  const lastRenderedIdxRef = useRef(-1);

  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const touchStartTimeRef = useRef(0);

  // Progressive Smart Staged Preloading:
  // Stage 1: Priority Front Frame (98) for instantaneous render
  // Stage 2: 8 Cardinal Gaze Keyframes for 360° coverage with low memory footprint
  // Stage 3: Progressive idle streaming of in-between frames in small throttled batches
  useEffect(() => {
    const imgs = [];
    imagesRef.current = imgs;

    // Stage 1: Load Frame 98 (Front) with highest priority
    const priorityImg = new Image();
    priorityImg.onload = () => {
      setIsLoaded(true);
    };
    priorityImg.src = `/hero_gaze_frames/frame_098.webp?v=ue5_hd`;
    imgs[PEAK_FRONT - 1] = priorityImg;

    if (priorityImg.complete) {
      setIsLoaded(true);
    }

    // Stage 2: 8 Cardinal Keyframes
    const cardinalFrames = [6, 18, 29, 40, 50, 60, 70, 82];
    cardinalFrames.forEach((fIdx) => {
      const img = new Image();
      const numStr = String(fIdx).padStart(3, '0');
      img.src = `/hero_gaze_frames/frame_${numStr}.webp?v=ue5_hd`;
      imgs[fIdx - 1] = img;
    });

    // Stage 3: Progressive streaming of in-between frames in batches of 6
    let currentBatchStart = 1;
    const loadNextBatch = () => {
      let loadedInBatch = 0;
      while (currentBatchStart <= TOTAL_FRAMES && loadedInBatch < 6) {
        const i = currentBatchStart;
        currentBatchStart++;
        if (i === PEAK_FRONT || cardinalFrames.includes(i)) continue;

        const img = new Image();
        const numStr = String(i).padStart(3, '0');
        img.src = `/hero_gaze_frames/frame_${numStr}.webp?v=ue5_hd`;
        imgs[i - 1] = img;
        loadedInBatch++;
      }

      if (currentBatchStart <= TOTAL_FRAMES) {
        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
          window.requestIdleCallback(loadNextBatch, { timeout: 250 });
        } else {
          setTimeout(loadNextBatch, 120);
        }
      }
    };

    const timer = setTimeout(loadNextBatch, 200);
    return () => clearTimeout(timer);
  }, []);

  // Update target gaze coordinates relative to character eye level
  const updateGazeFromTouch = (clientX, clientY) => {
    lastInteractionRef.current = Date.now();
    
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight * 0.42;

    if (touchZoneRef.current) {
      const rect = touchZoneRef.current.getBoundingClientRect();
      centerX = rect.left + rect.width / 2;
      centerY = rect.top + rect.height * 0.40; // eye/face level
    }

    const radiusX = Math.max(window.innerWidth * 0.42, 140);
    const radiusY = Math.max(window.innerHeight * 0.35, 140);

    const dx = (clientX - centerX) / radiusX;
    const dy = (clientY - centerY) / radiusY;

    targetMxRef.current = Math.max(-1, Math.min(1, dx));
    targetMyRef.current = Math.max(-1, Math.min(1, dy));
  };

  // 1. Desktop Mouse Movement Listener (Tracks freely across window)
  useEffect(() => {
    const onMouseMove = (e) => {
      if (isDraggingRef.current) return;
      lastInteractionRef.current = Date.now();
      targetMxRef.current = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMyRef.current = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onHeroPointerMove = (e) => {
      if (e.detail) {
        isDraggingRef.current = true;
        setIsDragging(true);
        updateGazeFromTouch(e.detail.clientX, e.detail.clientY);
      }
    };

    const onHeroPointerEnd = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      lastInteractionRef.current = Date.now();
    };

    window.addEventListener('hero-pointer-move', onHeroPointerMove, { passive: true });
    window.addEventListener('hero-pointer-end', onHeroPointerEnd, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      window.removeEventListener('hero-pointer-move', onHeroPointerMove);
      window.removeEventListener('hero-pointer-end', onHeroPointerEnd);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  // 2. Interactive Stage Touch Zone Listeners (Controls Gaze + Text Particles with ZERO Scroll Conflict)
  useEffect(() => {
    const touchZone = touchZoneRef.current;
    if (!touchZone) return;

    const onTouchStart = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      isDraggingRef.current = true;
      setIsDragging(true);
      const touch = e.touches[0];
      touchStartXRef.current = touch.clientX;
      touchStartYRef.current = touch.clientY;
      touchStartTimeRef.current = Date.now();
      updateGazeFromTouch(touch.clientX, touch.clientY);
    };

    const onWindowTouchMove = (e) => {
      if (!isDraggingRef.current || !e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];

      // Gesture Disambiguation: Detect intentional fast upward scroll flick
      const deltaY = touch.clientY - touchStartYRef.current;
      const deltaX = touch.clientX - touchStartXRef.current;
      const elapsed = Date.now() - touchStartTimeRef.current;

      if (deltaY < -55 && elapsed < 260 && Math.abs(deltaY) > 2.2 * Math.abs(deltaX)) {
        // User swiped up quickly with intent to scroll down into projects
        isDraggingRef.current = false;
        setIsDragging(false);
        lastInteractionRef.current = Date.now();
        window.dispatchEvent(new CustomEvent('hero-scroll-down'));
        return;
      }

      // Interactive exploration: lock page scroll so character & text particles track 360° freely
      if (e.cancelable) {
        e.preventDefault();
      }
      updateGazeFromTouch(touch.clientX, touch.clientY);
    };

    const onWindowTouchEnd = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
        lastInteractionRef.current = Date.now();
      }
    };

    touchZone.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onWindowTouchMove, { passive: false });
    window.addEventListener('touchend', onWindowTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onWindowTouchEnd, { passive: true });

    return () => {
      touchZone.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onWindowTouchMove);
      window.removeEventListener('touchend', onWindowTouchEnd);
      window.removeEventListener('touchcancel', onWindowTouchEnd);
    };
  }, []);

  // Animation & Canvas Draw Loop with Throttling & Off-Screen Pause
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
      const isIdle = !isDraggingRef.current && idleTime > 1800;

      // Autonomous Living Human Inspection Choreography when idle (> 1800ms)
      if (isIdle) {
        const cycleTime = (idleTime - 1800) % TOTAL_ROADMAP_DURATION;
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

      // Physics: Smooth anatomical muscle damping
      const LERP_FACTOR = isDraggingRef.current ? 0.16 : (isIdle ? 0.08 : 0.095);
      currentMxRef.current += (targetMxRef.current - currentMxRef.current) * LERP_FACTOR;
      currentMyRef.current += (targetMyRef.current - currentMyRef.current) * LERP_FACTOR;

      // Realistic Anisotropic Ribcage & Lung Expansion
      const breathPhase = breathTickRef.current;
      const breathWave = Math.sin(breathPhase) + 0.25 * Math.sin(2 * breathPhase - Math.PI * 0.5);
      const breathY = -breathWave * 4.2;

      // Style mutation throttle: only mutate DOM when delta > 0.35px
      if (Math.abs(breathY - lastBreathYRef.current) > 0.35) {
        lastBreathYRef.current = breathY;
        const isMobile = window.innerWidth < 1024;
        const baseScale = isMobile ? 0.92 : 1.0;
        const breathScaleX = baseScale + breathWave * 0.010;
        const breathScaleY = baseScale + breathWave * 0.006;
        canvas.style.transform = `translateY(${breathY.toFixed(1)}px) scale(${breathScaleX.toFixed(3)}, ${breathScaleY.toFixed(3)})`;
      }

      // Crisp Single-Frame Photographic Rendering (Draw call throttling)
      const targetFrame = getGazeFrame(currentMxRef.current, currentMyRef.current);
      let idx = Math.round(targetFrame);
      if (idx < 1) idx = 1;
      if (idx > TOTAL_FRAMES) idx = TOTAL_FRAMES;

      const img = (imgs[idx - 1] && imgs[idx - 1].complete && imgs[idx - 1].naturalWidth > 0)
        ? imgs[idx - 1]
        : imgs[PEAK_FRONT - 1];

      if (img && img.complete && img.naturalWidth > 0) {
        if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          lastRenderedIdxRef.current = -1;
        }

        // Only redraw if frame index actually changed
        if (idx !== lastRenderedIdxRef.current) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.globalAlpha = 1;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          lastRenderedIdxRef.current = idx;
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

      {/* UNIFIED HERO INTERACTIVE ZONE (Allows 360° drag across avatar & 3D text with zero page scroll) */}
      <div 
        ref={touchZoneRef} 
        className="hero-gaze-interactive-zone"
        aria-label="Interactive 3D Stage Touch Zone"
      >
        <div className={`avatar-touch-hint ${isDragging ? 'active' : ''}`}>
          <span className="avatar-hint-beacon"></span>
          <span>{isDragging ? 'TRACKING 360°' : 'DRAG TO INTERACT • 360°'}</span>
        </div>
      </div>
    </div>
  );
}
