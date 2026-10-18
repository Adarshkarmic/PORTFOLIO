export const PROJECT_SPECS = {
  '01': {
    id: '01',
    title: 'TRENDY PIXEL',
    subtitle: 'INTERACTIVE 3D WEBGL STUDIO & CREATIVE PLATFORM',
    domain: 'trendypixel.de',
    liveUrl: 'https://trendypixel.de',
    coverImage: '/trendypixel-cover.webp?v=20261016_hq',
    mobileCoverImage: '/trendypixel-mobile.webp',
    canIframe: true,
    badges: [
      { text: 'Three.js / WebGL 2.0', primary: true },
      { text: 'Real-Time GLSL Shaders', primary: false },
      { text: 'Next.js 16 & React 19', primary: false },
      { text: 'Tailwind CSS v4', primary: false }
    ],
    flow: [
      { label: 'Client Inbound', primary: false },
      { label: 'Next.js 16 SSR Shell', primary: false },
      { label: 'Three.js WebGL Canvas', primary: true },
      { label: 'GLSL Vertex & Fragment Shaders', primary: true },
      { label: 'CubeCamera Reflection Probes', primary: false },
      { label: '60 FPS Hardware Render', primary: true }
    ],
    metrics: [
      { label: '3D Engine', val: 'WebGL 2.0 / Three.js' },
      { label: 'Frame Budget', val: '60 FPS Solid' },
      { label: 'Shader Pipeline', val: 'Custom GLSL' },
      { label: 'Core Framework', val: 'Next.js 16' }
    ],
    narrative: 'Interactive 3D digital agency flagship engineered with hardware-accelerated WebGL viewports. Features Three.js reflection probes, custom GLSL vertex and fragment shaders, and high-impact cyber typography. Built on Next.js 16 with Turbopack for optimal performance with zero server maintenance overhead.',
    tech: ['Three.js', 'WebGL 2.0', 'GLSL Shaders', 'Next.js 16', 'React 19', 'Tailwind CSS v4', 'CubeCamera Probes', 'GSAP']
  },
  '02': {
    id: '02',
    title: 'TRENDY PIXEL ART VAULT',
    subtitle: 'AUTONOMOUS POD FULFILLMENT & SECURE R2 VAULT',
    domain: 'art.trendypixel.de',
    liveUrl: 'https://art.trendypixel.de',
    coverImage: '/trendy-pixel-art.webp?v=20261016_hq',
    mobileCoverImage: '/trendy-pixel-art-mobile.webp',
    canIframe: true,
    badges: [
      { text: 'Cloudflare R2 Storage', primary: true },
      { text: 'Prodigi POD API', primary: false },
      { text: 'HMAC Webhooks', primary: true },
      { text: 'Firestore Transactions', primary: false }
    ],
    flow: [
      { label: 'Customer Checkout', primary: false },
      { label: 'Razorpay HMAC-SHA256 Auth', primary: true },
      { label: 'Upstash Rate-Limit Defense', primary: false },
      { label: 'Firestore Atomic runTransaction()', primary: true },
      { label: 'Cloudflare R2 Presigned S3 URLs', primary: true },
      { label: 'Prodigi Global POD Dispatch', primary: true }
    ],
    metrics: [
      { label: 'Webhook Security', val: 'HMAC-SHA256' },
      { label: 'Concurrency Isolation', val: 'Atomic Lock' },
      { label: 'Vault Expiry', val: '15-Min Presigned URLs' },
      { label: 'Global POD', val: 'Prodigi API' }
    ],
    narrative: 'Autonomous digital art commerce engine and automated global print-on-demand fulfillment pipeline. Employs zero-trust HMAC-SHA256 signature verification for Razorpay payment webhooks, Upstash Redis rate limiting to mitigate replay attacks, Firestore atomic transactions to prevent race conditions, and secure expiring S3 presigned URLs generated against Cloudflare R2 object storage.',
    tech: ['Cloudflare R2', 'Prodigi POD API', 'Razorpay HMAC-SHA256', 'Google Firestore', 'Upstash Redis', 'Resend SMTP', 'Next.js API', 'TypeScript']
  },
  '03': {
    id: '03',
    title: 'SUDAMA INTERIORS',
    subtitle: 'LUXURY ARCHITECTURAL MONOGRAPH & EDITORIAL SHOWCASE',
    domain: 'sudama-interiors.vercel.app',
    liveUrl: 'https://sudama-interiors.vercel.app/',
    coverImage: '/sudama-cover.webp?v=20261016_hq',
    mobileCoverImage: '/sudama-mobile.webp',
    canIframe: false,
    badges: [
      { text: 'Editorial Layout', primary: false },
      { text: 'Lenis Inertial Scroll', primary: true },
      { text: 'LocalBusiness SEO', primary: false }
    ],
    flow: [
      { label: 'Visitor Land', primary: false },
      { label: 'Optimized WebP Assets', primary: false },
      { label: 'Lenis Smooth Scroll Physics', primary: true },
      { label: 'Editorial Grid Reveal', primary: true },
      { label: 'Structured Schema Markup', primary: false },
      { label: 'Direct Consultation Intake', primary: true }
    ],
    metrics: [
      { label: 'First Contentful Paint', val: '< 0.8s Instant' },
      { label: 'SEO Structure', val: 'LocalBusiness JSON-LD' },
      { label: 'Motion Physics', val: 'Lenis Inertial' },
      { label: 'Layout Standard', val: 'Editorial Monograph' }
    ],
    narrative: 'Luxury interior architecture monograph crafted with high-contrast editorial hierarchy and buttery-smooth Lenis inertial scroll physics. Implements structured LocalBusiness JSON-LD metadata for hyper-targeted search engine indexing, fast-loading optimized WebP assets, and seamless high-ticket consultation intake.',
    tech: ['Lenis Scroll', 'LocalBusiness JSON-LD', 'Semantic HTML5', 'Responsive Editorial Grid', 'Optimized WebP Assets', 'CSS Grid']
  },
  '04': {
    id: '04',
    title: 'PDC DENTAL CLINIC',
    subtitle: 'INTERACTIVE 3D CLINICAL EXPERIENCE & MOTION SUITE',
    domain: 'pcd-dental-clinic.vercel.app',
    liveUrl: 'https://pcd-dental-clinic.vercel.app/',
    coverImage: '/pdc-dental-cover.webp?v=20261016_hq',
    mobileCoverImage: '/pdc-dental-mobile.webp',
    canIframe: true,
    badges: [
      { text: 'React Three Fiber', primary: true },
      { text: 'Interactive 3D Mesh', primary: true },
      { text: 'Framer Motion', primary: false },
      { text: 'Lenis Smooth Scroll', primary: false }
    ],
    flow: [
      { label: 'Visitor Mount', primary: false },
      { label: 'R3F WebGL Canvas', primary: true },
      { label: 'Interactive 3D Dental Mesh', primary: true },
      { label: 'Clamped OrbitControls Pitch/Yaw', primary: false },
      { label: 'Framer Motion Reveal Masks', primary: false },
      { label: 'Before/After Comparison Slider', primary: true }
    ],
    metrics: [
      { label: '3D Runtime', val: 'React Three Fiber' },
      { label: 'Camera Kinematics', val: 'OrbitControls' },
      { label: 'Motion Suite', val: 'Framer Motion' },
      { label: 'Framerate', val: '60 FPS Solid' }
    ],
    narrative: 'Interactive 3D clinical portal engineered with React Three Fiber (@react-three/fiber & @react-three/drei). Features a real-time rotatable dental mesh with constrained OrbitControls pitch/yaw, Framer Motion staggered reveals, an interactive before/after treatment slider, and Lenis momentum scrolling.',
    tech: ['React Three Fiber', '@react-three/drei', 'Three.js', 'Framer Motion', 'Lenis Momentum', 'Tailwind CSS', 'Next.js']
  }
};
