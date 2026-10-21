"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroSpatialCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;
    const isMobile = width < 1024;

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
    container.appendChild(renderer.domElement);

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
      textCanvas.width = 1400;
      textCanvas.height = 400;
      const tCtx = textCanvas.getContext('2d');
      tCtx.fillStyle = '#000000';
      tCtx.fillRect(0, 0, 1400, 400);

      tCtx.fillStyle = '#ffffff';
      tCtx.font = '900 180px Anton, Impact, sans-serif';
      tCtx.textBaseline = 'middle';

      const letters = 'PORTFOLIO'.split('');
      const letterGap = 26;
      const widths = letters.map(char => tCtx.measureText(char).width);
      const totalLettersWidth = widths.reduce((sum, w) => sum + w, 0);
      const totalWordWidth = totalLettersWidth + (letters.length - 1) * letterGap;

      let currentX = (1400 - totalWordWidth) / 2;
      for (let i = 0; i < letters.length; i++) {
        tCtx.fillText(letters[i], currentX, 200);
        currentX += widths[i] + letterGap;
      }

      const imgData = tCtx.getImageData(0, 0, 1400, 400).data;
      const step = 7;
      const scaleX = 0.38;
      const scaleY = 0.38;
      const offsetY = 8;

      for (let y = 0; y < 400; y += step) {
        for (let x = 0; x < 1400; x += step) {
          const index = (y * 1400 + x) * 4;
          if (imgData[index] > 128) {
            const posX = (x - 700) * scaleX;
            const posY = -(y - 200) * scaleY + offsetY;
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

    const emerald = new THREE.Color('#10b981');
    const cyan = new THREE.Color('#06b6d4');
    const white = new THREE.Color('#f8fafc');

    for (let i = 0; i < count; i++) {
      const p = pointsList[i];
      posArray[i * 3] = p.x;
      posArray[i * 3 + 1] = p.y;
      posArray[i * 3 + 2] = p.z;

      // Color variation across letters / stacked words
      const ratio = isMobile ? ((p.oy + 50) / 100) : ((p.ox + 220) / 440);
      const col = ratio < 0.4 ? emerald : ratio < 0.75 ? cyan : white;
      colArray[i * 3] = col.r;
      colArray[i * 3 + 1] = col.g;
      colArray[i * 3 + 2] = col.b;
    }

    const textGeometry = new THREE.BufferGeometry();
    const posAttribute = new THREE.BufferAttribute(posArray, 3);
    textGeometry.setAttribute('position', posAttribute);
    textGeometry.setAttribute('color', new THREE.BufferAttribute(colArray, 3));

    // Particle sprite
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const radGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    radGrad.addColorStop(0, 'rgba(255,255,255,1)');
    radGrad.addColorStop(0.3, 'rgba(16,185,129,0.9)');
    radGrad.addColorStop(0.7, 'rgba(6,182,212,0.3)');
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
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.08
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
      size: 2.2,
      color: 0x10b981,
      transparent: true,
      opacity: 0.35,
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

    const updatePointerCoords = (clientX, clientY) => {
      const rect = container.getBoundingClientRect();
      const x = (clientX - rect.left) / width;
      const y = (clientY - rect.top) / height;

      mouse2D.x = (x * 2) - 1;
      mouse2D.y = -(y * 2) + 1;

      mouseNormX = mouse2D.x;
      mouseNormY = mouse2D.y;
      isPointerEngaged = true;

      raycaster.setFromCamera(mouse2D, camera);
      raycaster.ray.intersectPlane(plane, mouse3D);
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
      // Smoothly release coordinates so particles spring back
      mouse2D.set(-999, -999);
      mouse3D.set(-999, -999, -45);
      mouseNormX = 0;
      mouseNormY = 0;
      isPointerEngaged = false;
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

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });
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

      // Camera lerp - calm, cinematic luxury camera parallax
      targetNormX += (mouseNormX - targetNormX) * 0.04;
      targetNormY += (mouseNormY - targetNormY) * 0.04;
      camera.position.x = targetNormX * 12;
      camera.position.y = targetNormY * 7;
      camera.lookAt(0, 0, -45);

      // Floor grid perspective wave - subtle ambient depth
      floorGrid.position.z = -35 + targetNormY * 8;

      // Dust float
      dustSystem.rotation.y = elapsedTime * 0.015;

      // -----------------------------------------------------------
      // LUMINOUS HOLOGRAPHIC PARTICLE TYPOGRAPHY ("PORTFOLIO")
      // -----------------------------------------------------------
      const positions = posAttribute.array;
      const radius = 48; // Gentle proximity radius
      const radiusSq = radius * radius;
      let hasActiveMotion = isPointerEngaged;

      for (let i = 0; i < count; i++) {
        const p = pointsList[i];

        // 1. Subtle, Soft Magnetic Displacement
        const dx = p.x - mouse3D.x;
        const dy = p.y - mouse3D.y;
        const dSq = dx * dx + dy * dy;

        if (dSq < radiusSq && dSq > 0.01) {
          const d = Math.sqrt(dSq);
          const force = (1.0 - d / radius) * 1.6;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
          hasActiveMotion = true;
        }

        // 2. Elegant Living Matrix Wave (Clean, subtle breathing rhythm)
        const wave = Math.sin(p.ox * 0.03 + elapsedTime * 1.1) * 0.7;
        const waveY = Math.cos(p.oy * 0.04 + elapsedTime * 0.9) * 0.5;

        // 3. Smooth Elastic Spring Force back to Home
        const homeX = p.ox;
        const homeY = p.oy + wave;
        const homeZ = p.oz + waveY;

        p.vx += (homeX - p.x) * 0.08;
        p.vy += (homeY - p.y) * 0.08;
        p.vz += (homeZ - p.z) * 0.08;

        // 4. Smooth Velocity Damping
        p.vx *= 0.88;
        p.vy *= 0.88;
        p.vz *= 0.88;

        // 5. Update Particle Coordinates
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        positions[i * 3] = p.x;
        positions[i * 3 + 1] = p.y;
        positions[i * 3 + 2] = p.z;

        if (Math.abs(p.vx) > 0.005 || Math.abs(p.vy) > 0.005) {
          hasActiveMotion = true;
        }
      }

      if (hasActiveMotion) {
        posAttribute.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
        window.removeEventListener('deviceorientation', onDeviceOrientation);
      }
      window.removeEventListener('resize', onResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
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
        overflow: 'hidden'
      }}
    />
  );
}
