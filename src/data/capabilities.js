/**
 * ADARSH KARMIC — SINGLE SOURCE OF TRUTH (SSOT)
 * Centralized Capabilities Configuration — Portfolio V4.5
 *
 * Locked 5 Customer-Facing Capabilities:
 * 01 — WEB EXPERIENCES       (web-experiences)       #00e5ff
 * 02 — AI CAMPAIGNS          (ai-campaigns)          #f59e0b
 * 03 — AUTOMATION SYSTEMS    (automation-systems)    #10b981
 * 04 — AI AGENTS             (ai-agents)             #a855f7
 * 05 — CREATIVE EXPERIMENTS  (creative-experiments)  #f43f5e
 */

export const DEFAULT_CAPABILITY_SLUG = 'web-experiences';

export const CAPABILITIES_LIST = [
  'web-experiences',
  'ai-campaigns',
  'automation-systems',
  'ai-agents',
  'creative-experiments',
];

export const CAPABILITIES_DATA = {
  'web-experiences': {
    id: 'web-experiences',
    index: 0,
    number: '01',
    title: 'WEB EXPERIENCES',
    shortName: 'WEB EXPERIENCES',
    accent: '#00e5ff',
    secondaryAccent: '#0077ff',
    glow: 'rgba(0, 229, 255, 0.45)',
    icon: '◈',
    badge: 'FLAGSHIPS & WEB APPS',
    heroTagline: 'Interactive Web Experiences Built with Modern Frontend Architecture',
    heroSubhead: 'Where creative design meets Next.js full-stack engineering and custom browser interactions.',
    primaryCta: 'Explore Web Projects',
    intro: {
      categoryIdentifier: '01 — WEB EXPERIENCES',
      headline: 'Interactive web experiences built with modern frontend architecture and thoughtful engineering.',
      businessProblem:
        'Modern websites often struggle with two extremes: generic templates that fail to leave a lasting impression, or unoptimized animations that slow down mobile performance.',
      manifesto:
        'I build responsive, high-performance web applications using Next.js, modern React, and custom WebGL interactions. Every interface is crafted to load smoothly, look distinct, and provide an engaging, effortless user experience across all devices.',
      stats: [
        { label: 'RUNTIME TARGET', value: 'FLUID 60 FPS' },
        { label: 'STACK ARCHITECTURE', value: 'NEXT.JS & REACT' },
        { label: 'VIEWPORT RANGE', value: '360PX TO 4K' },
      ],
    },
    projects: [
      {
        id: 'tp-flagship',
        title: 'Trendy Pixel Studio Flagship',
        category: 'Digital Studio & Interactive Web',
        projectType: 'Commercial Flagship',
        status: 'LIVE',
        description:
          'Official digital studio website featuring interactive 3D elements, responsive typography, and structured service showcases.',
        objective: 'Build a distinctive, polished web presence for a creative technology and design studio.',
        workPerformed: 'Full-stack Next.js development, 3D spatial canvas integration, responsive layout system, and deployment.',
        technology: ['Next.js 16', 'React 19', 'Three.js', 'Tailwind CSS', 'Lenis'],
        architecture: 'Next.js application with interactive client-side WebGL canvas mounts and global edge hosting.',
        liveUrl: 'https://trendypixel.de',
        isLive: true,
        caseStudy: {
          overview:
            'A production digital platform built to showcase studio capabilities and project case studies with clean visual design and responsive performance.',
          challenge:
            'Maintaining smooth interactive canvas graphics without compromising mobile scrolling speed.',
          approach:
            'Implemented optimized particle buffers and responsive canvas density scaling tailored to device capabilities.',
          implementation:
            'Engineered modular components, integrated smooth inertia scrolling with Lenis, and structured clear project walkthroughs.',
          deliverable: 'Complete live studio flagship website with full responsive mobile and desktop coverage.',
          statusNote: 'Live commercial deployment accessible at trendypixel.de.',
        },
      },
      {
        id: 'spatial-portfolio',
        title: 'Cinematic Founder Portfolio V1',
        category: 'Interactive WebGL & Spatial UI',
        projectType: 'Personal Flagship',
        status: 'LIVE',
        description:
          'Personal portfolio featuring an interactive 100-frame gaze tracking canvas, 3D particle typography, and a 5-node capability dialer.',
        objective: 'Create an engaging personal web monograph demonstrating creative technology and interactive frontend development.',
        workPerformed: 'Gaze interpolation logic, Canvas2D blitting, Three.js particle typography, and responsive touch dialer.',
        technology: ['Next.js 16', 'Three.js', 'Web Audio API', 'Canvas2D', 'GSAP'],
        architecture: 'Layered interactive stages: Canvas2D gaze tracking, WebGL particle field, and hardware-accelerated CSS 3D reticles.',
        liveUrl: 'https://adarshkarmic.trendypixel.de',
        isLive: true,
        caseStudy: {
          overview:
            'An experimental personal website engineered to demonstrate browser graphics, mathematical gaze tracking, and real-time audio interaction.',
          challenge:
            'Handling 100 photographic frames smoothly in memory while preserving fast initial page load and clean mobile touch handling.',
          approach:
            'Built progressive cardinal frame preloading with minimum-jerk interpolation curves for natural ocular motion.',
          implementation:
            'Developed direct Canvas2D render loops, Web Audio synthesizer clicks, and URL-synchronized state management.',
          deliverable: 'Interactive personal portfolio demonstrating frontend craft and creative engineering.',
          statusNote: 'Active live deployment currently running this website.',
        },
      },
      {
        id: 'dental-flagship',
        title: 'Bespoke Healthcare Flagship (Levy Goldman)',
        category: 'Healthcare & Web Design',
        projectType: 'UI Prototype',
        status: 'IN DEVELOPMENT',
        description:
          'Clean luxury medical web interface and patient inquiry layout featuring clear typographic hierarchy and consultation request flows.',
        objective: 'Explore a calm, patient-centric design concept for an aesthetic healthcare practice.',
        workPerformed: 'UI component hierarchy, appointment request interface, accessible color palette, and form structure.',
        technology: ['React', 'Next.js', 'Tailwind CSS'],
        architecture: 'Component-based frontend prototype with client-side form validation and accessible layout patterns.',
        liveUrl: null,
        isLive: false,
        caseStudy: {
          overview:
            'A functional interface exploration demonstrating how modern healthcare practices can present consultation options clearly.',
          challenge:
            'Creating an aesthetic layout while prioritizing readability and clear accessibility standards.',
          approach:
            'Utilized high-contrast editorial typography, soothing neutral tones, and simple multi-step form fields.',
          implementation:
            'Constructed responsive booking cards, field validation logic, and streamlined layout containers.',
          deliverable: 'Interactive frontend prototype demonstrating patient inquiry flows.',
          statusNote: 'Prototype in active development.',
        },
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'REQUIREMENTS & DISCOVERY',
        desc: 'Understanding project goals, content hierarchy, target user flows, and technical requirements.',
      },
      {
        step: '02',
        title: 'INTERFACE & PROTOTYPING',
        desc: 'Structuring layout grids, establishing typography scales, and prototyping key interactions.',
      },
      {
        step: '03',
        title: 'FRONTEND DEVELOPMENT',
        desc: 'Building modular React/Next.js components, writing clean responsive CSS, and connecting APIs.',
      },
      {
        step: '04',
        title: 'TESTING & DEPLOYMENT',
        desc: 'Validating mobile responsiveness across viewports, checking contrast, and deploying to global hosting.',
      },
    ],
    deliverables: [
      {
        title: 'Custom Web Applications',
        desc: 'Tailored websites and web applications built with Next.js, modern React, and clean semantic markup.',
      },
      {
        title: 'Campaign & Portfolio Pages',
        desc: 'Focused single-page interfaces designed for product launches, creative presentations, and personal brands.',
      },
      {
        title: 'Interactive 3D & Canvas Graphics',
        desc: 'Three.js particle displays and custom canvas elements that add visual depth without slowing down the page.',
      },
      {
        title: 'Responsive Frontend Systems',
        desc: 'Fully adaptive interfaces tested across mobile viewports, tablets, laptops, and ultra-wide screens.',
      },
      {
        title: 'Accessibility & SEO Foundations',
        desc: 'Structured schema markup, sensible heading hierarchies, and accessible contrast ratios.',
      },
    ],
    tools: [
      { category: 'Frontend Frameworks', items: ['Next.js 16', 'React 19', 'JavaScript', 'Tailwind CSS'] },
      { category: 'Graphics & Motion', items: ['Three.js', 'WebGL', 'HTML5 Canvas', 'GSAP', 'Lenis'] },
      { category: 'Backend & APIs', items: ['Node.js', 'REST APIs', 'Serverless Functions', 'Webhooks'] },
      { category: 'Tooling & Deployment', items: ['Git', 'Vercel Edge', 'Figma', 'VS Code'] },
    ],
    contactContext: {
      topic: 'Web Experiences & Frontend Engineering',
      defaultMessage:
        "Hi Adarsh, I'd like to discuss a web development project or engineering opportunity. Let's connect.",
    },
  },

  'ai-campaigns': {
    id: 'ai-campaigns',
    index: 1,
    number: '02',
    title: 'AI CAMPAIGNS',
    shortName: 'AI CAMPAIGNS',
    accent: '#f59e0b',
    secondaryAccent: '#ef4444',
    glow: 'rgba(245, 158, 11, 0.45)',
    icon: '⚡',
    badge: 'VISUAL CONCEPTS & MEDIA',
    heroTagline: 'AI-Assisted Visual Storytelling & Short-Form Video Concepts',
    heroSubhead: 'Exploring creative video storyboards, generative media concepts, and modern digital campaign assets.',
    primaryCta: 'Explore Creative Work',
    intro: {
      categoryIdentifier: '02 — AI CAMPAIGNS',
      headline: 'AI-assisted visual storytelling and video concepts for modern digital campaigns.',
      businessProblem:
        'Producing engaging video and visual concepts often demands significant time, equipment, and manual editing, making it difficult to test fresh creative ideas and iterate quickly.',
      manifesto:
        'I use AI-assisted tools like Google Flow and Google Vids to craft engaging video concepts, storyboard visual ideas, and explore creative formats. By combining clear visual direction with clean typography and motion, I build dynamic campaign assets that help ideas stand out on modern digital channels.',
      stats: [
        { label: 'WORKFLOW CRAFT', value: 'AI STORYBOARDING' },
        { label: 'CORE TOOLS', value: 'GOOGLE VIDS & FLOW' },
        { label: 'ASSET RATIOS', value: '9:16 VERTICAL & 16:9' },
      ],
    },
    projects: [
      {
        id: 'ai-commercial-concept',
        title: 'Cinematic AI Visual Storyboard Concept',
        category: 'Creative Video & Storyboarding',
        projectType: 'Creative Concept',
        status: 'CONCEPT',
        description:
          'Exploratory video storyboard concept testing narrative pacing, visual prompts, and scene transitions for product presentations.',
        objective: 'Test generative video tools for rapid storyboarding and campaign concept validation.',
        workPerformed: 'Visual prompt development, scene sequence planning, timing calibration, and audio integration.',
        technology: ['Google Flow', 'Google Vids', 'Figma'],
        architecture: 'Creative sequencing workflow: Prompt concept generation → Storyboard assembly → Video concept rendering.',
        liveUrl: null,
        isLive: false,
        caseStudy: {
          overview:
            'A creative exploration examining how AI video generation tools can assist in rapid ideation and storyboarding for brand campaigns.',
          challenge:
            'Maintaining consistent visual tone and pacing across sequential narrative scenes.',
          approach:
            'Structured scene prompts with clear framing constraints and assembled transitions in Google Vids.',
          implementation:
            'Generated candidate scene sequences, selected the most cohesive shots, and synchronized background music pacing.',
          deliverable: 'Visual storyboard sequence demonstrating narrative video concepts.',
          statusNote: 'Creative concept exploration demonstrating visual storytelling workflows.',
        },
      },
      {
        id: 'virtual-creator-pipeline',
        title: 'Short-Form Video Presentation Prototype',
        category: 'Social Video & Presentation',
        projectType: 'Working Prototype',
        status: 'PROTOTYPE',
        description:
          'Automated presentation video concept designed for vertical social formats with clean captions and dynamic visual transitions.',
        objective: 'Build an efficient workflow for producing short-form video explainers and social highlights.',
        workPerformed: 'Script structuring, voiceover timing, caption layout, and multi-format vertical video export.',
        technology: ['Google Vids', 'Google Flow', 'Motion Design'],
        architecture: 'Template-driven video generation pipeline combining text prompts with automated captioning and layout.',
        liveUrl: null,
        isLive: false,
        caseStudy: {
          overview:
            'A workflow exploration demonstrating how creators can transform written summaries into engaging vertical video formats for social channels.',
          challenge:
            'Ensuring high visual clarity on mobile screens while maintaining natural pacing and readable text overlays.',
          approach:
            'Focused on high-contrast bold typography and concise 15-second chapter segments.',
          implementation:
            'Developed modular layout templates and tested audio-visual sync across several test topic scripts.',
          deliverable: 'Short-form video prototype suitable for rapid social publishing.',
          statusNote: 'Working prototype tested across experimental social formats.',
        },
      },
      {
        id: 'dynamic-product-suite',
        title: 'Multi-Format Campaign Creative Bundle',
        category: 'Digital Advertising Design',
        projectType: 'Design Concept',
        status: 'COMING SOON',
        description:
          'Planned creative asset workflow rendering 9:16 vertical, 1:1 square, and 16:9 banner formats from a single campaign concept.',
        objective: 'Speed up the assembly of multi-channel promotional asset bundles for web launches.',
        workPerformed: 'Layout framework planning, aspect ratio adaptation rules, and graphic asset styling.',
        technology: ['Google Flow', 'Figma', 'Digital Design'],
        architecture: 'Systematic multi-ratio layout system ensuring consistent brand presence across social platforms.',
        liveUrl: null,
        isLive: false,
        caseStudy: {
          overview:
            'An upcoming design template system intended to produce matching campaign bundles across social feeds, stories, and banner placements.',
          challenge: 'Preserving visual focus across wildly different canvas aspect ratios.',
          approach: 'Establishing core focal safe-zones with flexible outer background margins.',
          implementation: 'Defining design token rules and layout grids in Figma.',
          deliverable: 'Multi-format design asset bundle specifications.',
          statusNote: 'Currently being developed as a repeatable creative system.',
        },
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'CONCEPT & STORYBOARDING',
        desc: 'Defining core visual angles, message hooks, and narrative progression for the campaign.',
      },
      {
        step: '02',
        title: 'VISUAL ASSET GENERATION',
        desc: 'Exploring scene prompts, visual styles, and background textures using Google Flow.',
      },
      {
        step: '03',
        title: 'VIDEO EDITING & ASSEMBLY',
        desc: 'Sequencing scenes in Google Vids, pacing transitions, and adding readable captions.',
      },
      {
        step: '04',
        title: 'FORMAT ADAPTATION & EXPORT',
        desc: 'Exporting optimized video files tailored for vertical feeds, stories, and wide screens.',
      },
    ],
    deliverables: [
      {
        title: 'AI-Assisted Video Storyboards',
        desc: 'Visual proof-of-concept videos testing campaign narratives before production.',
      },
      {
        title: 'Short-Form Social Video Assets',
        desc: '9:16 vertical video explainers with dynamic text overlays and clean pacing.',
      },
      {
        title: 'Creative Visual Concepts',
        desc: 'Generative imagery and visual mood boards exploring unique creative directions.',
      },
      {
        title: 'Multi-Format Campaign Layouts',
        desc: 'Cohesive visual asset bundles adapted for feeds, banners, and presentation decks.',
      },
      {
        title: 'Visual Prompt Workflows',
        desc: 'Documented visual prompt workflows that produce consistent stylistic themes.',
      },
    ],
    tools: [
      { category: 'AI Video & Generation', items: ['Google Flow', 'Google Vids'] },
      { category: 'Visual & UI Design', items: ['Figma', 'Digital Design', 'Typography Layout'] },
      { category: 'Formats & Aspect Ratios', items: ['9:16 Vertical', '16:9 Landscape', '1:1 Square'] },
      { category: 'Production Workflow', items: ['Storyboarding', 'Captioning', 'Audio-Visual Timing'] },
    ],
    contactContext: {
      topic: 'AI Video Concepts & Visual Campaigns',
      defaultMessage:
        "Hi Adarsh, I'm interested in exploring video concepts or AI-assisted creative assets for an upcoming campaign. Let's chat.",
    },
  },

  'automation-systems': {
    id: 'automation-systems',
    index: 2,
    number: '03',
    title: 'AUTOMATION SYSTEMS',
    shortName: 'AUTOMATIONS',
    accent: '#10b981',
    secondaryAccent: '#06b6d4',
    glow: 'rgba(16, 185, 129, 0.45)',
    icon: '⚙',
    badge: 'WORKFLOWS & INTEGRATIONS',
    heroTagline: 'Connecting Tools, APIs & Workflows to Reduce Repetitive Digital Tasks',
    heroSubhead: 'Building practical automated pipelines with n8n, webhooks, and REST APIs.',
    primaryCta: 'Explore Automations',
    intro: {
      categoryIdentifier: '03 — AUTOMATION SYSTEMS',
      headline: 'Connecting tools, APIs, and workflows to reduce repetitive digital tasks.',
      businessProblem:
        'Growing workflows often get slowed down by manual data entry, disconnected web tools, and missed notifications between apps.',
      manifesto:
        'I design practical automation pipelines using n8n, webhooks, and REST APIs. By connecting forms, databases, spreadsheets, and notification channels into reliable automated workflows, routine tasks run smoothly in the background without constant manual oversight.',
      stats: [
        { label: 'WORKFLOW ENGINE', value: 'N8N ORCHESTRATION' },
        { label: 'INTEGRATION METHOD', value: 'WEBHOOKS & REST APIS' },
        { label: 'EXECUTION TARGET', value: 'BACKGROUND RUNS' },
      ],
    },
    projects: [
      {
        id: 'n8n-lead-enrichment',
        title: 'Inbound Inquiry & Notification Pipeline',
        category: 'Workflow Automation & APIs',
        projectType: 'Working Prototype',
        status: 'PROTOTYPE',
        description:
          'n8n workflow capturing form submissions via webhooks, validating data fields, updating records, and sending team notifications.',
        objective: 'Automate the capture and notification process for website contact inquiries.',
        workPerformed: 'Webhook setup, JSON payload transformation, notification formatting, and testing.',
        technology: ['n8n', 'Webhooks', 'REST APIs', 'JSON Parsing'],
        architecture: 'Webhook listener triggering data validation, record creation, and instant alert dispatch.',
        liveUrl: null,
        isLive: false,
        caseStudy: {
          overview:
            'A practical automation prototype built to connect website contact forms with communication channels instantly.',
          challenge:
            'Ensuring clean data formatting and avoiding dropped submissions during network interruptions.',
          approach:
            'Configured structured validation nodes with conditional branches for error tracking.',
          implementation:
            'Built custom JavaScript function nodes in n8n to format inbound payloads into clean notifications.',
          deliverable: 'Exportable n8n workflow JSON with documentation for self-hosted execution.',
          statusNote: 'Active prototype running on testbed n8n setup.',
        },
      },
      {
        id: 'content-repurposing-engine',
        title: 'Automated Content Summary Workflow',
        category: 'Content Ops & APIs',
        projectType: 'Working Prototype',
        status: 'PROTOTYPE',
        description:
          'Automated workflow reading article drafts, generating structured bullet summaries via LLM APIs, and drafting review records.',
        objective: 'Streamline the creation of concise summary notes and social takeaways from long-form content.',
        workPerformed: 'API integration, prompt structuring, JSON schema output parsing, and storage connection.',
        technology: ['n8n', 'OpenAI API', 'Airtable', 'REST APIs'],
        architecture: 'Scheduled trigger parsing article text, passing it through bounded prompts, and saving structured records.',
        liveUrl: null,
        isLive: false,
        caseStudy: {
          overview:
            'A workflow designed to help creators extract key points and brief social snippets from published articles.',
          challenge: 'Keeping extracted summaries focused and strictly faithful to the original source text.',
          approach: 'Used structured few-shot prompt templates that require concise bullet outputs.',
          implementation: 'Connected text input to API calls and stored formatted output in an Airtable review queue.',
          deliverable: 'Functional content automation workflow.',
          statusNote: 'Working prototype used for internal project notes.',
        },
      },
      {
        id: 'ecommerce-sync-bridge',
        title: 'Order Notification & Confirmation Flow',
        category: 'Operations & Webhooks',
        projectType: 'Integration Concept',
        status: 'COMING SOON',
        description:
          'Planned webhook bridge connecting checkout events with automated confirmation emails and spreadsheet records.',
        objective: 'Demonstrate hands-free post-order notification and record-keeping workflows.',
        workPerformed: 'Webhook payload mapping, email notification templates, and spreadsheet API schema.',
        technology: ['Webhooks', 'REST APIs', 'Node.js', 'Google Sheets API'],
        architecture: 'Event-driven service listening for payment webhooks and triggering confirmation flows.',
        liveUrl: null,
        isLive: false,
        caseStudy: {
          overview:
            'A planned integration blueprint illustrating how service providers can automate order logging upon client payment.',
          challenge: 'Handling asynchronous webhook retries without creating duplicate entries.',
          approach: 'Designed unique transaction ID checking before writing rows to the spreadsheet.',
          implementation: 'Mapping API endpoints and preparing template notifications.',
          deliverable: 'Complete workflow architecture and endpoint specification.',
          statusNote: 'Integration concept planned for upcoming implementation.',
        },
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'WORKFLOW AUDIT & MAPPING',
        desc: 'Identifying the manual data steps, involved tools, and trigger events to be connected.',
      },
      {
        step: '02',
        title: 'DATA SCHEMA DESIGN',
        desc: 'Defining clean JSON payloads, required fields, and error handling branches.',
      },
      {
        step: '03',
        title: 'N8N & API CONFIGURATION',
        desc: 'Configuring webhook listeners, setting up API authentication, and assembling workflow nodes.',
      },
      {
        step: '04',
        title: 'TESTING & DEPLOYMENT',
        desc: 'Testing edge cases with sample payloads and monitoring live execution logs.',
      },
    ],
    deliverables: [
      {
        title: 'n8n Workflow Automation',
        desc: 'Custom automated pipelines connecting form inputs, cloud tools, and notification channels.',
      },
      {
        title: 'Webhook & API Integrations',
        desc: 'Event-driven connections that transfer and transform data between disparate web services.',
      },
      {
        title: 'Automated Notification Alerts',
        desc: 'Instant alert feeds to Slack, Discord, or email whenever key user actions occur.',
      },
      {
        title: 'Data Synchronization & Logging',
        desc: 'Pipelines that record entries into Google Sheets, Airtable, or custom databases automatically.',
      },
      {
        title: 'Documentation & Setup Notes',
        desc: 'Clear diagrams and setup instructions for maintaining and extending automations.',
      },
    ],
    tools: [
      { category: 'Orchestration & Logic', items: ['n8n', 'Node.js', 'JSON Parsing', 'JavaScript'] },
      { category: 'Connectivity', items: ['Webhooks', 'REST APIs', 'HTTP Requests', 'OAuth'] },
      { category: 'Services & Storage', items: ['Airtable', 'Google Sheets API', 'Slack Webhooks', 'Email APIs'] },
      { category: 'Environment', items: ['Self-Hosted n8n', 'Cloud Hosting', 'Git', 'Postman'] },
    ],
    contactContext: {
      topic: 'Workflow Automation & API Integrations',
      defaultMessage:
        "Hi Adarsh, I have a set of manual workflows or tools I'd like to automate. Let's discuss requirements.",
    },
  },

  'ai-agents': {
    id: 'ai-agents',
    index: 3,
    number: '04',
    title: 'AI AGENTS',
    shortName: 'AI AGENTS',
    accent: '#a855f7',
    secondaryAccent: '#ec4899',
    glow: 'rgba(168, 85, 247, 0.45)',
    icon: '🗲',
    badge: 'CONVERSATIONAL PROTOTYPES',
    heroTagline: 'Conversational AI Prototypes & Intelligent Web Interfaces',
    heroSubhead: 'Exploring document-grounded chat interfaces, voice prototypes, and smart conversational flows.',
    primaryCta: 'Explore AI Prototypes',
    intro: {
      categoryIdentifier: '04 — AI AGENTS',
      headline: 'Conversational AI prototypes designed to make digital interactions more useful.',
      businessProblem:
        'Standard scripted chatbots often fail to understand context, while manual communication is not always instant when visitors have specific questions.',
      manifesto:
        'I build conversational AI prototypes and chat interfaces powered by modern language models and prompt engineering. By grounding assistants in verified project documentation and clear boundaries, these prototypes demonstrate how conversational interfaces can provide helpful, direct answers and assist visitors smoothly.',
      stats: [
        { label: 'CONVERSATION ARCHITECTURE', value: 'PROMPT-GROUNDED' },
        { label: 'INTERFACE TYPES', value: 'WEB CHAT & PROTOTYPES' },
        { label: 'CORE OBJECTIVE', value: 'ACCURATE RECALL' },
      ],
    },
    projects: [
      {
        id: 'voice-booking-agent',
        title: 'Conversational Voice Assistant Prototype',
        category: 'Voice AI & Interface Prototyping',
        projectType: 'Interactive Prototype',
        status: 'PROTOTYPE',
        description:
          'Voice interaction prototype exploring natural conversation flow, service questions, and appointment scheduling steps.',
        objective: 'Test speech input and conversational responses for guided booking interactions.',
        workPerformed: 'Conversation flow design, prompt calibration, response timing tests, and tool mapping.',
        technology: ['Vapi', 'ElevenLabs', 'Node.js', 'REST APIs'],
        architecture: 'Speech-to-text pipeline connected to language model inference and audio playback.',
        liveUrl: null,
        isLive: false,
        caseStudy: {
          overview:
            'A functional voice prototype built to test how conversational audio can explain services and guide users through inquiry steps.',
          challenge: 'Minimizing response pauses between conversational turns for a natural feel.',
          approach: 'Configured streaming voice outputs and concise conversational prompts.',
          implementation: 'Integrated service Q&A logic with appointment slot booking triggers.',
          deliverable: 'Voice assistant prototype demonstrating conversational scheduling.',
          statusNote: 'Working prototype available for demonstration.',
        },
      },
      {
        id: 'context-studio-chat',
        title: 'Context-Aware Website Knowledge Assistant',
        category: 'Web Chat & Knowledge Retrieval',
        projectType: 'Interactive Prototype',
        status: 'PROTOTYPE',
        description:
          'Specialized website chat prototype answering questions about services, capabilities, and project workflows using grounded documentation.',
        objective: 'Provide visitors with an instant conversational guide to capabilities and technical stack.',
        workPerformed: 'Knowledge documentation setup, prompt engineering, chat UI component, and state handling.',
        technology: ['Next.js', 'React', 'OpenAI API', 'Tailwind CSS'],
        architecture: 'Serverless API route processing messages with system prompt boundaries and returning responses to the UI.',
        liveUrl: null,
        isLive: false,
        caseStudy: {
          overview:
            'A web chat widget prototype designed to answer visitor questions directly based on pre-defined portfolio documentation.',
          challenge: 'Preventing off-topic answers and keeping responses accurate and helpful.',
          approach: 'Enforced clear system prompt boundaries with fallback links to direct contact.',
          implementation: 'Built a clean chat interface with suggestion pills and capability tags.',
          deliverable: 'Embeddable website chat prototype with customizable documentation.',
          statusNote: 'Active prototype for portfolio visitor assistance.',
        },
      },
      {
        id: 'inbound-triage-phone',
        title: 'Interactive Call Flow & Triage Concept',
        category: 'Conversational Flow Design',
        projectType: 'System Concept',
        status: 'COMING SOON',
        description:
          'Architectural concept exploring how automated phone workflows can triage inquiries and summarize caller preferences.',
        objective: 'Map out an automated inquiry triage process that routes urgent requests efficiently.',
        workPerformed: 'Call state tree design, caller intent mapping, and summary webhook structure.',
        technology: ['Twilio Voice', 'REST APIs', 'Webhooks'],
        architecture: 'Telephony webhook gateway routing inbound calls through a stateful conversational engine.',
        liveUrl: null,
        isLive: false,
        caseStudy: {
          overview:
            'A conceptual framework detailing how small studios can log incoming phone inquiries and organize caller notes automatically.',
          challenge: 'Designing clear verbal options without overwhelming callers.',
          approach: 'Structured brief, human-sounding menu options with immediate operator fallback.',
          implementation: 'Prepared state machine diagrams and JSON payload models.',
          deliverable: 'Conversational blueprint and triage flow specification.',
          statusNote: 'System concept planned for future prototype build.',
        },
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'KNOWLEDGE & GOAL AUDIT',
        desc: 'Defining the assistant role, knowledge documentation, boundary constraints, and response tone.',
      },
      {
        step: '02',
        title: 'PROMPT & FLOW DESIGN',
        desc: 'Writing structured system prompts, defining tool calls, and mapping conversational branches.',
      },
      {
        step: '03',
        title: 'INTERFACE INTEGRATION',
        desc: 'Building the chat widget or connecting voice services with responsive frontend controls.',
      },
      {
        step: '04',
        title: 'TESTING & BOUNDARY REVIEW',
        desc: 'Stress-testing edge cases, refining fallback responses, and reviewing accuracy.',
      },
    ],
    deliverables: [
      {
        title: 'Document-Grounded Chat Widgets',
        desc: 'Web chat assistants customized to answer questions based on your specific documentation.',
      },
      {
        title: 'Voice Interaction Prototypes',
        desc: 'Conversational phone and browser voice prototypes for guided user interactions.',
      },
      {
        title: 'System Prompt Engineering',
        desc: 'Carefully tuned system instructions with strict boundaries and error-handling fallbacks.',
      },
      {
        title: 'Interactive UI Chat Integrations',
        desc: 'Responsive, lightweight chat components built for seamless Next.js embedding.',
      },
      {
        title: 'Conversational Flow Diagrams',
        desc: 'Clear visual trees mapping out user intent branches, escalation rules, and data capture.',
      },
    ],
    tools: [
      { category: 'AI Models & APIs', items: ['OpenAI API', 'Prompt Engineering', 'Context Grounding'] },
      { category: 'Voice Prototyping', items: ['Vapi', 'ElevenLabs', 'Audio Streaming'] },
      { category: 'Frontend Chat UI', items: ['React', 'Next.js', 'Tailwind CSS', 'State Management'] },
      { category: 'Integration & Testing', items: ['REST APIs', 'Webhooks', 'JSON Schema', 'Postman'] },
    ],
    contactContext: {
      topic: 'AI Chat Prototypes & Conversational Interfaces',
      defaultMessage:
        "Hi Adarsh, I'm interested in discussing an AI chat prototype or conversational web interface. Let's talk.",
    },
  },

  'creative-experiments': {
    id: 'creative-experiments',
    index: 4,
    number: '05',
    title: 'CREATIVE EXPERIMENTS',
    shortName: 'FOUNDER LAB',
    accent: '#f43f5e',
    secondaryAccent: '#fb923c',
    glow: 'rgba(244, 63, 94, 0.45)',
    icon: '◉',
    badge: "FOUNDER'S LAB R&D",
    heroTagline: 'Experimental Browser Graphics, Vector Math & Interactive Canvas UI',
    heroSubhead: "The Founder's Lab sandbox where creative code, mathematical animations, and browser experiments come alive.",
    primaryCta: 'Explore Experiments',
    intro: {
      categoryIdentifier: "05 — FOUNDER'S LAB R&D",
      headline: "An experimental space for exploring browser graphics, motion, and unconventional interactions.",
      businessProblem:
        'Standard web layouts often rely on repetitive templates. Without dedicated experimentation in browser graphics, canvas math, and creative interactions, digital products miss opportunities to truly engage users.',
      manifesto:
        "The Founder's Lab is my personal experimental space. Here, I test unconventional interaction patterns, build custom Canvas2D animations, explore Three.js particle systems, and experiment with Web Audio synthesis. The techniques developed here inform both personal projects and client work.",
      stats: [
        { label: 'GRAPHICS STACK', value: 'CANVAS2D & THREE.JS' },
        { label: 'INTERACTION MATH', value: 'VECTOR LERP & EULER' },
        { label: 'AUDIO SYNTHESIS', value: 'WEB AUDIO OSCILLATORS' },
      ],
    },
    projects: [
      {
        id: 'gaze-engine',
        title: 'Biological Gaze Orientation Engine',
        category: 'Interactive Canvas2D Math',
        projectType: 'Live Flagship Feature',
        status: 'LIVE',
        description:
          '100-frame photographic portrait orientation engine tracking cursor and touch vectors with biological saccade curves and idle drift.',
        objective: 'Create an engaging, lifelike avatar interaction running purely in client-side Canvas2D with instant response.',
        workPerformed: '100-frame photographic sequence, polar coordinate math, saccadic curve interpolation, and touch optimization.',
        technology: ['HTML5 Canvas', 'WebP Frame Sequence', 'Vector Math', 'JavaScript'],
        architecture: 'Canvas2D image rendering driven by cursor vector coordinates and optimized to avoid DOM reflows.',
        liveUrl: 'https://adarshkarmic.trendypixel.de',
        isLive: true,
        caseStudy: {
          overview:
            'The centerpiece hero avatar for this portfolio, designed to replace static headshots with an interactive subject that maintains natural eye contact with visitors.',
          challenge:
            'Eliminating jerky jumps when tracking cursor coordinates and ensuring smooth frame delivery without memory leaks on mobile devices.',
          approach:
            'Modeled human eye acceleration curves combined with priority loading for cardinal keyframes.',
          implementation:
            'Created an idle gaze cycle that naturally rests attention when the cursor stops, immediately resuming tracking on movement.',
          deliverable: 'Complete interactive biological gaze engine integrated directly into the portfolio hero.',
          statusNote: 'Live flagship feature actively running in this portfolio.',
        },
      },
      {
        id: 'kinetic-typography',
        title: 'Kinetic Particle Matrix Typography',
        category: 'Three.js & Particle Systems',
        projectType: 'Live Flagship Feature',
        status: 'LIVE',
        description:
          'Spatial typography rendering thousands of glowing points in 3D perspective with harmonic sine wave oscillation and camera parallax.',
        objective: 'Construct a subtle, cinematic typographic background that stays strictly contained within the hero section.',
        workPerformed: 'Three.js particle buffer generation, font raster sampling, perspective projection, and responsive density scaling.',
        technology: ['Three.js', 'Perspective Camera', 'Particle Buffers', 'Anton Font'],
        architecture: 'WebGL buffer geometry rendering glowing dotted font matrices with GPU-assisted harmonic floating drift.',
        liveUrl: 'https://adarshkarmic.trendypixel.de',
        isLive: true,
        caseStudy: {
          overview:
            'The "PORTFOLIO" spatial backdrop that anchors the hero section, demonstrating high-performance WebGL typography.',
          challenge:
            'Ensuring particles do not leak into downstream sections and scaling particle count gracefully from mobile phones to high-DPI screens.',
          approach:
            'Strictly contained the canvas inside the hero boundary and dynamically scaled particle density based on device width.',
          implementation:
            'Sampled vector font outlines to generate point coordinate arrays, applying subtle sinusoidal wave offsets to position attributes.',
          deliverable: 'Fluid 60 FPS kinetic typography canvas functioning as the hero architectural backdrop.',
          statusNote: 'Live flagship feature actively running in this portfolio.',
        },
      },
      {
        id: 'kinetic-halo-dialer',
        title: 'Orbital Capability Halo Dialer & Audio Haptics',
        category: 'CSS 3D & Web Audio API',
        projectType: 'Live Flagship Feature',
        status: 'LIVE',
        description:
          'Multi-layered counter-rotating planetary orbit systems with nested reticle rings and synthesized Web Audio click feedback.',
        objective: 'Design an intuitive, non-traditional navigation system inviting playful discovery of capabilities.',
        workPerformed: '3D CSS transform geometry, SVG concentric rings, Web Audio API frequency chord synthesis, and touch arbitration.',
        technology: ['CSS 3D Transforms', 'Web Audio API', 'SVG Math', 'React State'],
        architecture: 'Hardware-accelerated CSS keyframe transforms coupled with a whisper-quiet Web Audio oscillator gain network.',
        liveUrl: 'https://adarshkarmic.trendypixel.de',
        isLive: true,
        caseStudy: {
          overview:
            'The 5-node capability dialer that surrounds the founder portrait, turning portfolio navigation into a tactile instrument.',
          challenge:
            'Balancing complex counter-rotating animations with instant clickability, mobile touch reliability, and subtle audio feedback.',
          approach:
            'Separated visual rotation chassis from interactive hit targets and synthesized pure sine wave harmonic clicks at 0.02 gain.',
          implementation:
            'Engineered full URL query synchronization (?focus=...) so every dialer selection updates the entire page while preserving browser history.',
          deliverable: 'Complete interactive capability halo dialer with audio haptic feedback.',
          statusNote: 'Live flagship feature actively running in this portfolio.',
        },
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'CONCEPT & MATHEMATICAL MODEL',
        desc: 'Exploring an unconventional visual, mathematical, or sensory interaction idea.',
      },
      {
        step: '02',
        title: 'CANVAS & SHADER PROTOTYPE',
        desc: 'Writing native Canvas2D or Three.js routines in an isolated testing environment.',
      },
      {
        step: '03',
        title: 'TOUCH & HARDWARE TUNING',
        desc: 'Refining event listeners, optimizing GPU draw calls, and calibrating mobile touch gestures.',
      },
      {
        step: '04',
        title: 'INTEGRATION & HARDENING',
        desc: 'Packaging the experiment into a clean React component with accessibility and reduced-motion fallbacks.',
      },
    ],
    deliverables: [
      {
        title: 'Interactive WebGL Canvases',
        desc: 'Custom 3D graphics and particle environments designed for memorable web experiences.',
      },
      {
        title: 'Mathematical Animation Systems',
        desc: 'Vector interpolation, polar coordinate motion, and harmonic wave mechanics for fluid UI motion.',
      },
      {
        title: 'Web Audio Sound Effects',
        desc: 'Micro-synthesized click haptics and ambient audio built natively with the browser Web Audio API.',
      },
      {
        title: 'Experimental UI Controls',
        desc: 'Unconventional interactive navigation instruments such as the 5-node orbital Halo Dialer.',
      },
      {
        title: 'Research & Feasibility Spikes',
        desc: 'Proof-of-concept R&D demonstrating technical feasibility for creative and ambitious digital ideas.',
      },
    ],
    tools: [
      { category: 'Graphics & Canvas', items: ['Three.js', 'HTML5 Canvas', 'WebGL', 'Vector Math'] },
      { category: 'Motion & Animation', items: ['CSS 3D Transforms', 'GSAP', 'Easing Mathematics', 'Interpolation'] },
      { category: 'Sound Synthesis', items: ['Web Audio API', 'Sine Oscillators', 'Gain Envelopes'] },
      { category: 'Profiling & Tooling', items: ['Chrome DevTools', 'Performance Profiler', 'VS Code', 'Git'] },
    ],
    contactContext: {
      topic: 'Creative Experiments & Custom R&D',
      defaultMessage:
        "Hi Adarsh, I'm interested in exploring an experimental WebGL build or creative technology prototype. Let's talk.",
    },
  },
};

export default CAPABILITIES_DATA;
