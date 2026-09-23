"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export default function Home() {
  const containerRef = useRef();
  const orb1Ref = useRef();
  const orb2Ref = useRef();
  const orb3Ref = useRef();

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

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Background parallax scroll effect
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (orb1Ref.current) orb1Ref.current.style.transform = `translate(${scrollY * 0.15}px, ${scrollY * 0.3}px)`;
      if (orb2Ref.current) orb2Ref.current.style.transform = `translate(${scrollY * -0.1}px, ${scrollY * -0.2}px)`;
      if (orb3Ref.current) orb3Ref.current.style.transform = `translate(${scrollY * -0.2}px, ${scrollY * 0.15}px)`;
    };
    
    window.addEventListener('scroll', handleScroll);

    // GSAP Scroll Animations
    let ctx = gsap.context(() => {

      // Content Reveal Animations removed to prevent disappearing elements

    }, containerRef);

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
      ctx.revert(); // Clean up all GSAP animations
    };
  }, []);

  return (
    <div ref={containerRef}>

      {/* HERO SECTION */}
      <section className="hero">
          <header className="top-nav">
              <div className="nav-left">
                  <p>CREATIVE ENGINEER<br/>SERVERLESS ARCHITECT</p>
              </div>
              <div className="nav-right">
                  <p>AVAILABLE FOR FREELANCE <span className="star-icon">✦</span></p>
              </div>
          </header>

          <div className="hero-bg-text">PORT<br className="mobile-br" />FOLIO</div>
          
          <div className="hero-content">
              <div className="hero-left">
                  <p className="greeting">Hello, I'm</p>
                  <h1>Adarsh<br/>Karmic</h1>
                  <h2 className="sub-heading">CREATIVE ENGINEER &<br/>SERVERLESS ARCHITECT</h2>
                  <p className="desc">
                      I engineer high-performance, immersive web experiences by combining cutting-edge 3D frontends with infinitely scalable serverless architectures. Passionate about pushing the boundaries of modern digital design.
                  </p>
                  <div className="availability">
                      <span className="globe-icon">🌐</span> AVAILABLE WORLDWIDE
                  </div>
              </div>

              <div className="hero-center">
                  <img src="/hero.webp" alt="Adarsh Karmic" className="hero-image" />
              </div>

              <div className="hero-right">
                  <div className="experience-badge">
                      <div className="badge-icon">✦</div>
                      <p>Turning ideas into powerful digital experiences.</p>
                  </div>
                  
                  <div className="stats">
                      <div className="stat-item">
                          <h3>3+</h3>
                          <p>YEARS<br/>EXPERIENCE</p>
                      </div>
                      <div className="stat-item">
                          <h3>12+</h3>
                          <p>PREMIUM DIGITAL<br/>PRODUCTS</p>
                      </div>
                      <div className="stat-item">
                          <h3>5+</h3>
                          <p>HAPPY<br/>CLIENTS</p>
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
      <section className="projects-section">
        <div className="section-header">
          <h2>RECENT PROJECTS</h2>
        </div>
        <div className="projects-grid">
          <a href="https://sudama-interiors.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="project-card">
              <div className="project-image-box" style={{ position: 'relative', overflow: 'hidden' }}>
                <iframe
                  src="https://sudama-interiors.vercel.app/"
                  title="Sudama Interiors"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '400%',
                    height: '400%',
                    transform: 'scale(0.25)',
                    transformOrigin: 'top left',
                    border: 'none',
                    pointerEvents: 'none'
                  }}
                  scrolling="no"
                />
              </div>
              <div className="project-info">
                <span className="project-num">01</span>
                <div>
                  <h3>SUDAMA INTERIORS</h3>
                  <p>INTERIOR DESIGN WEBSITE</p>
                </div>
                <span className="project-arrow">&rarr;</span>
              </div>
            </div>
          </a>
          <a href="https://trendypixel.de" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="project-card">
              <div className="project-image-box" style={{ position: 'relative', overflow: 'hidden' }}>
                <iframe 
                  src="https://trendypixel.de" 
                  title="Trendy Pixel Art Store"
                  style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '400%', 
                    height: '400%', 
                    transform: 'scale(0.25)', 
                    transformOrigin: 'top left',
                    border: 'none', 
                    pointerEvents: 'none' 
                  }}
                  scrolling="no"
                />
              </div>
              <div className="project-info">
                <span className="project-num">02</span>
                <div>
                  <h3>TRENDY PIXEL</h3>
                  <p>PIXEL ART E-COMMERCE</p>
                </div>
                <span className="project-arrow">&rarr;</span>
              </div>
            </div>
          </a>
          <a href="https://pcd-dental-clinic.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="project-card">
              <div className="project-image-box" style={{ position: 'relative', overflow: 'hidden' }}>
                <iframe 
                  src="https://pcd-dental-clinic.vercel.app/" 
                  title="Ivory Dental Clinic"
                  style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '400%', 
                    height: '400%', 
                    transform: 'scale(0.25)', 
                    transformOrigin: 'top left',
                    border: 'none', 
                    pointerEvents: 'none' 
                  }}
                  scrolling="no"
                />
              </div>
              <div className="project-info">
                <span className="project-num">03</span>
                <div>
                  <h3>IVORY DENTAL</h3>
                  <p>PREMIUM CLINIC 3D</p>
                </div>
                <span className="project-arrow">&rarr;</span>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* EDUCATION, SKILLS & PROCESS SECTION */}
      <section className="details-section">
        <div className="details-grid">
          {/* Column 1: Education & Skills */}
          <div className="col-education">
            <h2>EDUCATION & SKILLS</h2>
            
            <div className="education-list">
              <h4 className="accent-heading">EDUCATION</h4>
              <div className="edu-item">
                <div>
                  <h5>Full-Stack Creative Developer</h5>
                  <p>Architecting end-to-end solutions from UI design to deployment</p>
                </div>
                <span className="edu-year">2020 - Present</span>
              </div>
              <div className="edu-item">
                <div>
                  <h5>Advanced WebGL & UI Animation</h5>
                  <p>Mastering Three.js, GSAP, and Custom Shaders for immersive web</p>
                </div>
                <span className="edu-year">Ongoing</span>
              </div>
              <div className="edu-item">
                <div>
                  <h5>Serverless Architecture</h5>
                  <p>Building Scalable Serverless Backends</p>
                </div>
                <span className="edu-year">2022 - Present</span>
              </div>
            </div>

            <div className="skills-list">
              <h4 className="accent-heading">TECH STACK</h4>
              <div className="skills-tags">
                <span>UI/UX DESIGN</span>
                <span>FIGMA</span>
                <span>AFFINITY</span>
                <span>REACT / NEXT.JS</span>
                <span>TYPESCRIPT</span>
                <span>NODE.JS</span>
                <span>SCSS</span>
                <span>THREE.JS / WEBGL</span>
                <span>SPLINE 3D</span>
                <span>GSAP / LENIS</span>
                <span>FIREBASE</span>
                <span>SUPABASE</span>
                <span>AWS / VERCEL</span>
                <span>REDIS / UPSTASH</span>
              </div>
            </div>
          </div>

          {/* Column 2: Work Process */}
          <div className="col-process">
            <h2>WORK PROCESS</h2>
            <div className="process-timeline">
              <div className="process-item">
                <span className="process-num">01</span>
                <div className="process-icon">🎯</div>
                <div className="process-text">
                  <h5>STRATEGY</h5>
                  <p>Defining brand goals, target audience, and architecture requirements.</p>
                </div>
              </div>

              <div className="process-item">
                <span className="process-num">02</span>
                <div className="process-icon">✨</div>
                <div className="process-text">
                  <h5>DESIGN</h5>
                  <p>Crafting premium UI/UX, wireframes, and stunning 3D visual concepts.</p>
                </div>
              </div>

              <div className="process-item">
                <span className="process-num">03</span>
                <div className="process-icon">⚡</div>
                <div className="process-text">
                  <h5>FRONTEND</h5>
                  <p>Building immersive, high-performance interfaces using modern WebGL and React.</p>
                </div>
              </div>

              <div className="process-item">
                <span className="process-num">04</span>
                <div className="process-icon">☁️</div>
                <div className="process-text">
                  <h5>SERVERLESS</h5>
                  <p>Implementing robust, infinitely scalable backend systems and databases.</p>
                </div>
              </div>

              <div className="process-item">
                <span className="process-num">05</span>
                <div className="process-icon">🚀</div>
                <div className="process-text">
                  <h5>LAUNCH</h5>
                  <p>Optimization, SEO, and flawless global deployment via edge networks.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Quote Box */}
          <div className="col-quote">
            <div className="quote-box">
              <div className="quote-icon">“</div>
              <p className="quote-text">Crafting digital masterpieces where uncompromising performance meets visionary design.</p>
              <div className="quote-icon-close">”</div>
              <div className="signature">Adarsh Karmic</div>
              <div className="quote-footer">
                LET'S CREATE<br/>SOMETHING GREAT<br/>TOGETHER.
                <span className="star-icon">✦</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="footer-section">
        <div className="footer-left">
          <h2>LET'S BUILD<br/>THE FUTURE <span className="star-icon">✦</span></h2>
          <p>Ready to elevate your digital presence with cutting-edge<br/>3D and scalable architecture? Let's create something amazing.</p>
          <a href="#" className="freelance-btn"><span>&rarr;</span> AVAILABLE FOR FREELANCE</a>
        </div>
        <div className="footer-middle">
          <ul className="contact-list">
            <li><span className="icon">✉</span> adarshkarmic111@gmail.com</li>
            <li><span className="icon">🌐</span> adarshkarmic.vercel.app</li>
            <li><span className="icon">📞</span> +91 91175 55175</li>
            <li><span className="icon">📍</span> Darbhanga, INDIA</li>
          </ul>
        </div>
        <div className="footer-right">
          {/* We'll use coding.jpg as a placeholder for the laptop image */}
          <div className="laptop-placeholder">
            <img src="/coding.webp" alt="Digital Experiences" />
            <div className="laptop-text">
              <h4>WE DESIGN DIGITAL EXPERIENCES</h4>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
