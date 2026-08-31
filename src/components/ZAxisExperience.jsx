"use client";

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, useScroll, Text, Image, Html, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function Scene() {
  const scroll = useScroll();
  const { camera } = useThree();

  useFrame((state, delta) => {
    // scroll.offset goes from 0 to 1
    const offset = scroll.offset;
    
    // Move camera forward on Z axis
    // Start at z=20, end at z=-35 (flying past the text)
    camera.position.z = THREE.MathUtils.lerp(20, -35, offset);
    
    // Slight camera rotation for a dynamic feel
    camera.rotation.z = offset * 0.1;
    camera.rotation.y = Math.sin(offset * Math.PI) * 0.1;
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Massive Background Text */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <Text
          position={[0, 0, -10]}
          fontSize={14}
          color="rgba(255, 255, 255, 0.05)"
          anchorX="center"
          anchorY="middle"
          depthOffset={1}
          letterSpacing={-0.05}
          fillOpacity={0.8}
        >
          PORTFOLIO
        </Text>
      </Float>

      {/* Portrait Image (Using HTML to prevent WebGL crash from massive 21MB PNG) */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Html position={[0, -2, 5]} center transform distanceFactor={15}>
          <img 
            src="/hero.png" 
            alt="Hero Portrait" 
            style={{ width: '40vw', maxWidth: '600px', pointerEvents: 'none' }} 
          />
        </Html>
      </Float>

      {/* UI Elements (Floating HTML) */}
      <group position={[0, 0, 8]}>
        {/* Left Side */}
        <Html position={[-8, 0, 0]} transform sprite as="div" style={{ width: '350px' }}>
          <div style={{ color: 'white', textAlign: 'left' }}>
            <p style={{ color: '#10b981', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>Hello, I'm</p>
            <h1 style={{ fontSize: '5rem', fontFamily: 'Playfair Display, serif', lineHeight: '1', fontWeight: 700, margin: '0 0 1rem 0' }}>Adarsh<br/>Karmic</h1>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '0 0 1rem 0', lineHeight: 1.2 }}>WEB DESIGNER &<br/>UI/UX CREATOR</h2>
            <p style={{ fontSize: '1rem', color: '#ccc', lineHeight: 1.5 }}>
                I design and build stylish, user-focused web experiences that combine creativity with strategy. Passionate about clean design, smooth interactions, and details that make a difference.
            </p>
          </div>
        </Html>

        {/* Right Side */}
        <Html position={[8, 0, 0]} transform sprite as="div" style={{ width: '250px' }}>
          <div style={{ color: 'white' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '3rem' }}>
                <div style={{ color: '#10b981', fontSize: '2rem' }}>✦</div>
                <p style={{ fontSize: '1rem', fontWeight: 500, lineHeight: 1.4 }}>Turning ideas into powerful digital experiences.</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                    <h3 style={{ fontSize: '3rem', color: '#10b981', lineHeight: '1', margin: 0 }}>3+</h3>
                    <p style={{ fontSize: '0.9rem', letterSpacing: '1px', margin: 0, fontWeight: 600 }}>YEARS<br/>EXPERIENCE</p>
                </div>
                <div>
                    <h3 style={{ fontSize: '3rem', color: '#10b981', lineHeight: '1', margin: 0 }}>40+</h3>
                    <p style={{ fontSize: '0.9rem', letterSpacing: '1px', margin: 0, fontWeight: 600 }}>PROJECTS<br/>COMPLETED</p>
                </div>
                <div>
                    <h3 style={{ fontSize: '3rem', color: '#10b981', lineHeight: '1', margin: 0 }}>20+</h3>
                    <p style={{ fontSize: '0.9rem', letterSpacing: '1px', margin: 0, fontWeight: 600 }}>HAPPY<br/>CLIENTS</p>
                </div>
            </div>
          </div>
        </Html>
      </group>
      
      {/* Top Nav (Fixed to camera relative position inside scene, or just placed up high) */}
      <Html position={[0, 9, 12]} center transform as="div" style={{ width: '90vw', display: 'flex', justifyContent: 'space-between', pointerEvents: 'none' }}>
        <div style={{ color: '#888', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', lineHeight: 1.4 }}>
          <p style={{ color: '#10b981', margin: 0 }}>WEB DESIGNER</p>
          <p style={{ color: 'white', margin: 0 }}>DIGITAL CREATOR</p>
        </div>
        <div style={{ color: '#888', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px' }}>
          <p style={{ margin: 0 }}>AVAILABLE FOR FREELANCE <span style={{ color: '#10b981' }}>✦</span></p>
        </div>
      </Html>

      {/* Deep Space: Where the Next Section Lives */}
      <Html position={[0, 0, -30]} center transform distanceFactor={15} style={{ width: '80vw' }}>
        <div style={{ color: 'white', textAlign: 'center', background: 'rgba(255,255,255,0.03)', padding: '5rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
            <h2 style={{ fontSize: '4rem', color: '#10b981', marginBottom: '1rem', fontFamily: 'Anton, sans-serif', letterSpacing: '2px' }}>THE 3D SKILLS LAB</h2>
            <p style={{ fontSize: '1.5rem', opacity: 0.8 }}>Your Interactive Physics Blocks Will Drop Here.</p>
            <p style={{ fontSize: '1rem', opacity: 0.5, marginTop: '3rem', letterSpacing: '2px', textTransform: 'uppercase' }}>(Scroll up to fly back to reality)</p>
        </div>
      </Html>

      {/* Floating Particles/Stars for depth */}
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.random() - 0.5) * 40, 
            (Math.random() - 0.5) * 40, 
            (Math.random() - 0.5) * 60 + 10
          ]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={i % 3 === 0 ? "#10b981" : "#ffffff"} transparent opacity={Math.random() * 0.5 + 0.2} />
        </mesh>
      ))}
    </>
  );
}

export default function ZAxisExperience() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, background: '#0a0a0a', zIndex: 10 }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
        {/* damping adjusts how smooth the scroll catch-up is */}
        <Suspense fallback={<Html center><h1 style={{color: '#10b981', fontFamily: 'sans-serif'}}>Loading 3D Assets...</h1></Html>}>
          <ScrollControls pages={4} damping={0.15}>
            <Scene />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
