"use client";

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Text, RoundedBox, Float, PerspectiveCamera } from '@react-three/drei';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';

const skills = [
  "Figma", "React", "Next.js", "Three.js", "GSAP", "Framer", "Spline", "Tailwind"
];

function SkillBlock({ text, position }) {
  const api = useRef();

  // Apply a random upward force when clicked
  const handlePointerDown = () => {
    if (api.current) {
      api.current.applyImpulse({ x: (Math.random() - 0.5) * 5, y: 10 + Math.random() * 5, z: (Math.random() - 0.5) * 5 }, true);
      api.current.applyTorqueImpulse({ x: Math.random() - 0.5, y: Math.random() - 0.5, z: Math.random() - 0.5 }, true);
    }
  };

  return (
    <RigidBody 
      ref={api} 
      position={position} 
      colliders="hull" 
      restitution={0.5} 
      friction={0.5}
    >
      <RoundedBox args={[3, 1, 1]} radius={0.2} smoothness={4} onPointerDown={handlePointerDown} cursor="pointer">
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        <Text
          position={[0, 0, 0.51]}
          fontSize={0.4}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
        >
          {text}
        </Text>
      </RoundedBox>
    </RigidBody>
  );
}

function InvisibleBoundaries() {
  return (
    <>
      {/* Floor */}
      <RigidBody type="fixed" position={[0, -5, 0]}>
        <CuboidCollider args={[15, 1, 15]} />
      </RigidBody>
      {/* Walls */}
      <RigidBody type="fixed" position={[-15, 0, 0]}>
        <CuboidCollider args={[1, 10, 15]} />
      </RigidBody>
      <RigidBody type="fixed" position={[15, 0, 0]}>
        <CuboidCollider args={[1, 10, 15]} />
      </RigidBody>
      {/* Front/Back */}
      <RigidBody type="fixed" position={[0, 0, -5]}>
        <CuboidCollider args={[15, 10, 1]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, 0, 5]}>
        <CuboidCollider args={[15, 10, 1]} />
      </RigidBody>
    </>
  );
}

export default function SkillPhysicsBox() {
  return (
    <div style={{ width: '100%', height: '100vh', background: '#0a0a0a', position: 'relative' }}>
      
      {/* Section Title */}
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', zIndex: 10, textAlign: 'center', pointerEvents: 'none' }}>
        <h2 style={{ fontSize: '3rem', color: '#ffffff', marginBottom: '0.5rem', fontFamily: 'Playfair Display, serif' }}>
          My <span style={{ color: '#10b981', fontStyle: 'italic' }}>Arsenal</span>
        </h2>
        <p style={{ color: '#888', letterSpacing: '2px', fontSize: '0.9rem', textTransform: 'uppercase' }}>
          Click the blocks to interact
        </p>
      </div>

      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={40} />
        
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#10b981" />

          <Physics gravity={[0, -9.81, 0]}>
            {skills.map((skill, index) => (
              <SkillBlock 
                key={skill} 
                text={skill} 
                position={[
                  (Math.random() - 0.5) * 10, 
                  10 + index * 2, 
                  (Math.random() - 0.5) * 2
                ]} 
              />
            ))}
            <InvisibleBoundaries />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}
