"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroSpatialCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    let cleanup = () => {};

    (async () => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;
    const isMobile = width < 1024;

    // Pre-load Anton font so canvas text renders with correct letterforms
    await document.fonts.load('900 180px Anton');

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06080a, 0.0035);

    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 1000);
    camera.position.set(0, 0, 160);

    // Renderer - Capped DPR & antialias tuning for mobile 60-120 FPS
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 1.25) : Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    // Context Loss / Restoration Resilience
    const onContextLost = (e) => {
      e.preventDefault();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
    const onContextRestored = () => {
      if (isHeroVisible) animate();
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost, false);
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored, false);

    // ==============================================================
    // 1. KINETIC 3D PARTICLE TYPOGRAPHY ("PORT" & "FOLIO" STACKED ON MOBILE)
    // ==============================================================
    const textCanvas = document.createElement('canvas');
    const pointsList = [];

    if (isMobile) {
      // Split into two stacked kinetic lines: "PORT" (top) and "FOLIO" (bottom)
      // Optimized 600x600 canvas with step=9 yields ~800 particles (ultra smooth on mobile CPU)
      textCanvas.width = 600;
      textCanvas.height = 600;
      const tCtx = textCanvas.getContext('2d');
      tCtx.fillStyle = '#000000';
      tCtx.fillRect(0, 0, 600, 600);

      tCtx.fillStyle = '#ffffff';
      tCtx.font = '900 175px Anton, Impact, sans-serif';
      tCtx.textBaseline = 'middle';
      tCtx.textAlign = 'center';

      // Line 1: "PORT" upper half
      tCtx.fillText('PORT', 300, 205);
      // Line 2: "FOLIO" lower half
      tCtx.fillText('FOLIO', 300, 395);

      const imgData = tCtx.getImageData(0, 0, 600, 600).data;
      const step = 9;
      const scaleX = 0.28;
      const scaleY = 0.28;
      const offsetY = 6;

      for (let y = 0; y < 600; y += step) {
        for (let x = 0; x < 600; x += step) {
          const index = (y * 600 + x) * 4;
          if (imgData[index] > 128) {
            const posX = (x - 300) * scaleX;
            const posY = -(y - 300) * scaleY + offsetY;
            const posZ = -45;
            pointsList.push({
              ox: posX,
              oy: posY,
              oz: posZ,
              x: posX,
              y: posY,
              z: posZ,
              vx: 0,
              vy: 0,
              vz: 0
            });
          }
        }
      }
    } else {
      textCanvas.width = 1600;
      textCanvas.height = 380;
      const tCtx = textCanvas.getContext('2d');
      tCtx.fillStyle = '#000000';
      tCtx.fillRect(0, 0, 1600, 380);

      tCtx.fillStyle = '#ffffff';
      tCtx.font = '900 200px Anton, Impact, sans-serif';
      tCtx.textBaseline = 'middle';
      tCtx.textAlign = 'center';
      tCtx.letterSpacing = '8px';
      tCtx.fillText('PORTFOLIO', 800, 190);

      const imgData = tCtx.getImageData(0, 0, 1600, 380).data;
      const step = 6;
      const scaleX = 0.36;
      const scaleY = 0.36;
      const offsetY = 8;

      for (let y = 0; y < 380; y += step) {
        for (let x = 0; x < 1600; x += step) {
          const index = (y * 1600 + x) * 4;
          if (imgData[index] > 128) {
            const posX = (x - 800) * scaleX;
            const posY = -(y - 190) * scaleY + offsetY;
            const posZ = -45;
            pointsList.push({
              ox: posX,
              oy: posY,
              oz: posZ,
              x: posX,
              y: posY,
              z: posZ,
              vx: 0,
              vy: 0,
              vz: 0
            });
          }
        }
      }
    }

    const count = pointsList.length;
    const posArray = new Float32Array(count * 3);
    const colArray = new Float32Array(count * 3);

    const cyan = new THREE.Color('#00e5ff');
    const teal = new THREE.Color('#06b6d4');
    const iceWhite = new THREE.Color('#f8fafc');

    for (let i = 0; i < count; i++) {
      const p = pointsList[i];
      posArray[i * 3] = p.x;
      posArray[i * 3 + 1] = p.y;
      posArray[i * 3 + 2] = p.z;

      // Restrained teal-to-cyan visual treatment across letterforms
      const ratio = isMobile ? ((p.oy + 50) / 100) : ((p.ox + 220) / 440);
      const col = ratio < 0.4 ? cyan : ratio < 0.75 ? teal : iceWhite;
      colArray[i * 3] = col.r;
      colArray[i * 3 + 1] = col.g;
      colArray[i * 3 + 2] = col.b;
    }

    const textGeometry = new THREE.BufferGeometry();
    const posAttribute = new THREE.BufferAttribute(posArray, 3);
    textGeometry.setAttribute('position', posAttribute);
    textGeometry.setAttribute('color', new THREE.BufferAttribute(colArray, 3));

    // Particle sprite with crisp electric cyan & ice glow
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const radGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    radGrad.addColorStop(0, 'rgba(255,255,255,1)');
    radGrad.addColorStop(0.3, 'rgba(0,229,255,0.85)');
    radGrad.addColorStop(0.7, 'rgba(6,182,212,0.25)');
    radGrad.addColorStop(1, 'rgba(0,0,0,0)');
    pCtx.fillStyle = radGrad;
    pCtx.fillRect(0, 0, 32, 32);

    const pTex = new THREE.CanvasTexture(pCanvas);
    const textMaterial = new THREE.PointsMaterial({
      size: isMobile ? 4.3 : 4.4,
      map: pTex,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: isMobile ? 0.90 : 0.94
    });

    const textParticles = new THREE.Points(textGeometry, textMaterial);
    scene.add(textParticles);

    // ==============================================================
    // 2. INFINITE 3D PERSPECTIVE CYBER GRID (GROUND PLANE)
    // ==============================================================
    const gridGeo = new THREE.PlaneGeometry(600, 600, isMobile ? 14 : 32, isMobile ? 14 : 32);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.045
    });
    const floorGrid = new THREE.Mesh(gridGeo, gridMat);
    floorGrid.position.set(0, -78, -35);
    floorGrid.rotation.x = -Math.PI / 2.15;
    scene.add(floorGrid);

    // ==============================================================
    // 3. AMBIENT ATMOSPHERIC STARDUST
    // ==============================================================
    const dustCount = isMobile ? 35 : 80;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 380;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 220;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 220;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: isMobile ? 1.8 : 2.2,
      color: 0x00e5ff,
      transparent: true,
      opacity: isMobile ? 0.22 : 0.32,
      blending: THREE.AdditiveBlending
    });
    const dustSystem = new THREE.Points(dustGeo, dustMat);
    scene.add(dustSystem);

    // Mouse & Touch Tracking in 3D Space
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 45); // Plane at z = -45
    const mouse2D = new THREE.Vector2(-999, -999);
    const mouse3D = new THREE.Vector3(-999, -999, -45);

    let mouseNormX = 0;
    let mouseNormY = 0;
    let targetNormX = 0;
    let targetNormY = 0;
    let isPointerEngaged = false;
    let pointerEnergy = 0.0;
    let touchDecayTimer = null;

    const resetPointer = () => {
      if (touchDecayTimer) {
        clearTimeout(touchDecayTimer);
        touchDecayTimer = null;
      }
      isPointerEngaged = false;
      pointerEnergy = 0.0;
      mouse2D.set(-999, -999);
      mouse3D.set(-999, -999, -45);
      mouseNormX = 0;
      mouseNormY = 0;
    };

    const updatePointerCoords = (clientX, clientY) => {
      const rect = container.getBoundingClientRect();
      const x = (clientX - rect.left) / width;
      const y = (clientY - rect.top) / height;

      mouse2D.x = (x * 2) - 1;
      mouse2D.y = -(y * 2) + 1;

      mouseNormX = mouse2D.x;
      mouseNormY = mouse2D.y;
      isPointerEngaged = true;
      pointerEnergy = 1.0;

      raycaster.setFromCamera(mouse2D, camera);
      raycaster.ray.intersectPlane(plane, mouse3D);

      // Mobile & Desktop Watchdog: Auto-decay/reset if no further motion occurs
      // Prevents stationary taps or lost touchend events from causing permanent particle swelling
      if (touchDecayTimer) {
        clearTimeout(touchDecayTimer);
      }
      touchDecayTimer = setTimeout(() => {
        resetPointer();
      }, isMobile ? 140 : 250);
    };

    const onMouseMove = (e) => {
      updatePointerCoords(e.clientX, e.clientY);
    };

    const onTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        updatePointerCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        updatePointerCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchEnd = () => {
      resetPointer();
    };

    // Mobile Gyroscope / Device Tilt Parallax
    const onDeviceOrientation = (e) => {
      if (!isPointerEngaged && e.gamma !== null && e.beta !== null) {
        const tiltX = Math.max(-1, Math.min(1, e.gamma / 30));
        const tiltY = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
        mouseNormX = tiltX * 0.7;
        mouseNormY = -tiltY * 0.5;
      }
    };

    const onHeroPointerMove = (e) => {
      if (e.detail) {
        updatePointerCoords(e.detail.clientX, e.detail.clientY);
      }
    };
    const onHeroPointerEnd = () => {
      resetPointer();
    };

    window.addEventListener('hero-pointer-move', onHeroPointerMove, { passive: true });
    window.addEventListener('hero-pointer-end', onHeroPointerEnd, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', resetPointer, { passive: true });
    window.addEventListener('mouseup', resetPointer, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });
    window.addEventListener('pointerup', resetPointer, { passive: true });
    window.addEventListener('pointercancel', resetPointer, { passive: true });
    window.addEventListener('blur', resetPointer, { passive: true });
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });
    }

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize);

    // Render Loop with Off-Screen Pause (100% CPU/GPU relief when viewing projects)
    let animationFrameId = null;
    let isHeroVisible = true;
    const startTime = performance.now();

    const observer = new IntersectionObserver(([entry]) => {
      isHeroVisible = entry.isIntersecting;
      if (isHeroVisible && !animationFrameId) {
        animate();
      }
    }, { threshold: 0.05 });

    observer.observe(container);

    const animate = () => {
      if (!isHeroVisible) {
        animationFrameId = null;
        return;
      }
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Camera lerp - calm, cinematic luxury camera parallax
      if (!prefersReducedMotion) {
        targetNormX += (mouseNormX - targetNormX) * 0.04;
        targetNormY += (mouseNormY - targetNormY) * 0.04;
        camera.position.x = targetNormX * 14;
        camera.position.y = targetNormY * 8;
        camera.lookAt(0, 0, -45);

        // Floor grid perspective wave - subtle ambient depth
        floorGrid.position.z = -35 + targetNormY * 6;
        floorGrid.rotation.z = Math.sin(elapsedTime * 0.25) * 0.012;

        // Ambient stardust drift & breathing
        dustSystem.rotation.y = elapsedTime * 0.02;
        dustSystem.position.y = Math.sin(elapsedTime * 0.4) * 3.5;
      }

      // Pointer energy decays smoothly each frame so stationary taps cannot continuously accumulate force
      if (isPointerEngaged) {
        pointerEnergy *= isMobile ? 0.88 : 0.94;
        if (pointerEnergy < 0.01) {
          pointerEnergy = 0.0;
        }
      } else {
        pointerEnergy = 0.0;
      }

      // -----------------------------------------------------------
      // LUMINOUS HOLOGRAPHIC PARTICLE TYPOGRAPHY ("PORTFOLIO")
      // Restored organic sine-wave undulation & fluid magnetic interaction
      // -----------------------------------------------------------
      const positions = posAttribute.array;
      const radius = isMobile ? 38 : 54;
      const radiusSq = radius * radius;
      const maxDisplacement = isMobile ? 16 : 26;
      const forceScale = isMobile ? 1.8 : 2.6;

      for (let i = 0; i < count; i++) {
        const p = pointsList[i];

        if (prefersReducedMotion) {
          positions[i * 3] = p.ox;
          positions[i * 3 + 1] = p.oy;
          positions[i * 3 + 2] = p.oz;
          continue;
        }

        // 1. Organic Living Wave Undulation (2.5px vertical wave, multi-harmonic)
        const waveY = Math.sin(p.ox * 0.04 + elapsedTime * 1.5) * 2.5 + Math.cos(p.oy * 0.05 + elapsedTime * 1.0) * 1.1;
        // 2. Subtle spatial depth movement (Z-axis breathing)
        const waveZ = Math.cos(p.ox * 0.03 + p.oy * 0.03 + elapsedTime * 1.2) * 3.6;
        // 3. Micro horizontal shimmer (X-axis)
        const waveX = Math.sin(p.oy * 0.06 + elapsedTime * 0.8) * 0.7;

        let homeX = p.ox + waveX;
        let homeY = p.oy + waveY;
        let homeZ = p.oz + waveZ;

        // 4. Interactive Magnetic Repulsion (Desktop hover & Mobile touch)
        // Bounded displacement guarantees particles NEVER explode or stay swollen in a bubble
        if (isPointerEngaged) {
          const dx = p.x - mouse3D.x;
          const dy = p.y - mouse3D.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < radiusSq && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const normDist = 1.0 - (dist / radius); // 1.0 at center, 0.0 at edge
            const dirX = dx / dist;
            const dirY = dy / dist;

            // Bounded target displacement (elastic push - physically impossible to exceed maxDisplacement)
            const pushDist = normDist * maxDisplacement;
            homeX += dirX * pushDist;
            homeY += dirY * pushDist;
            homeZ += normDist * (isMobile ? 10.0 : 18.0);

            // Dynamic velocity impulse modulated by pointer energy
            // Fluid scattering on movement; rapidly decays on tap to eliminate swelling bug
            if (pointerEnergy > 0.02) {
              const impulse = normDist * forceScale * pointerEnergy;
              p.vx += dirX * impulse;
              p.vy += dirY * impulse;
            }
          }
        }

        // 5. Smooth Elastic Spring & Damping (Liquid mercury snap-back, zero residual overshoot)
        const springStrength = isMobile ? 0.095 : 0.09;
        p.vx += (homeX - p.x) * springStrength;
        p.vy += (homeY - p.y) * springStrength;
        p.vz += (homeZ - p.z) * springStrength;

        const damping = isMobile ? 0.74 : 0.78;
        p.vx *= damping;
        p.vy *= damping;
        p.vz *= damping;

        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        positions[i * 3] = p.x;
        positions[i * 3 + 1] = p.y;
        positions[i * 3 + 2] = p.z;
      }

      if (!prefersReducedMotion) {
        posAttribute.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

      cleanup = () => {
        observer.disconnect();
        if (touchDecayTimer) {
          clearTimeout(touchDecayTimer);
        }
        window.removeEventListener('hero-pointer-move', onHeroPointerMove);
        window.removeEventListener('hero-pointer-end', onHeroPointerEnd);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseleave', resetPointer);
        window.removeEventListener('mouseup', resetPointer);
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
        window.removeEventListener('touchcancel', onTouchEnd);
        window.removeEventListener('pointerup', resetPointer);
        window.removeEventListener('pointercancel', resetPointer);
        window.removeEventListener('blur', resetPointer);
        if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
          window.removeEventListener('deviceorientation', onDeviceOrientation);
        }
        window.removeEventListener('resize', onResize);
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        if (renderer.domElement) {
          renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
          renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);
        }
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        textGeometry.dispose();
        textMaterial.dispose();
        gridGeo.dispose();
        gridMat.dispose();
        dustGeo.dispose();
        dustMat.dispose();
        pTex.dispose();
        renderer.dispose();
      };
    })();

    return () => cleanup();
  }, []);

  return (
    <div
      ref={mountRef}
      className="hero-spatial-canvas-container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
        contain: 'paint'
      }}
    />
  );
}
