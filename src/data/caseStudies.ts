export type ProcessStep = {
  title: string
  detail: string
}

export type Screenshot = {
  label: string
  /** Path relative to /public — e.g. "/images/arrivalio-screen-1.png" */
  src: string
}

export type CaseStudyData = {
  slug: string
  title: string
  oneliner: string
  tags: string[]
  /** RGB triplet e.g. '241, 241, 255' — used for accent tints on this page */
  accentRgb: string
  /** Live URL — set to '#' or omit if not deployed yet */
  liveUrl?: string
  /** GitHub repo URL — set to '#' or omit if private */
  repoUrl?: string
  hasVideo?: boolean
  /** Optional main hero image path (relative to /public) */
  heroImage?: string
  /** Set true to hide the hero image placeholder (e.g. when the video already shows the project) */
  hideHeroImage?: boolean
  /** Gallery shown between the hero and the Overview section */
  screenshots?: Screenshot[]
  overview: string[]
  /** Optional intro paragraph shown between the Process heading and the stepper */
  processIntro?: string
  /** Optional screenshots shown inside process step cards (mapped by step index) */
  processScreenshots?: Screenshot[]
  steps: ProcessStep[]
  keyDecisions: string[]
  result: string[]
  note?: string
  prevProject?: { slug: string; title: string }
  nextProject?: { slug: string; title: string }
}

export const caseStudies: CaseStudyData[] = [
  {
    slug: 'arrivalio',
    title: 'Arrivalio',
    oneliner: 'A guided platform for newcomers navigating their first months in Canada',
    tags: ['React', 'TypeScript', 'Tailwind', 'Firebase', 'Figma Make', 'Claude', 'ChatGPT'],
    accentRgb: '110, 231, 160',
    liveUrl: 'https://arrivalio.online/',
    hasVideo: false,
    heroImage: '/Arrivalio/card_image.png',
    screenshots: [
      // Place files at: /public/Arrivalio/[file].jpeg
      { label: 'Mobile screenshot 1', src: '/Arrivalio/screenshots_mobile_1.jpeg' },
      { label: 'Mobile screenshot 2', src: '/Arrivalio/screenshots_mobile_2.jpeg' },
      { label: 'Desktop screenshot 1', src: '/Arrivalio/Screenshot_desctop_1.jpeg' },
      { label: 'Desktop screenshot 2', src: '/Arrivalio/Screenshot_desctop_2.jpeg' },
    ],
    overview: [
      'Arrivalio is a web app that helps newcomers get through their first months in Canada with a clear, step-by-step plan.',
      'The project started from my own research into what newcomers actually struggle with. There is a lot of useful information out there — government websites, support guides, community resources — but it is all spread across different places and thrown at people all at once. For someone who just arrived in a new country, that is overwhelming.',
      'So instead of adding more information, I focused on organizing what already exists. The design approach was Mobile First, so the core experience stays clear and usable on phones — where most newcomers actually access support resources. Arrivalio takes those scattered resources and turns them into a simple checklist with clear priorities, step-by-step instructions, and tasks in the right order. It helps people understand not just what to do, but what to do first.',
      'The app was built step by step, with usability testing shaping the design and features along the way.',
    ],
    note: 'AI tools were used throughout this project — Figma Make for design, Claude and ChatGPT for coding assistance and problem-solving',
    processIntro: 'This project followed a research-driven process. Each stage built on the one before, and usability testing shaped both design and code decisions throughout.',
    processScreenshots: [
      { label: 'Problem', src: '/Arrivalio/p_card_1.jpeg' },
      { label: 'Research', src: '/Arrivalio/p_card_2.png' },
      { label: 'Lo-fi wireframes', src: '/Arrivalio/p_card_3.png' },
      { label: 'Hi-fi design', src: '/Arrivalio/p_card_4.jpeg' },
      { label: 'Development', src: '/Arrivalio/p_card_5.jpeg' },
      { label: 'Testing & iteration', src: '/Arrivalio/p_card_6.jpeg' },
    ],
    steps: [
      {
        title: 'Problem',
        detail: 'Newcomers in Canada face dozens of urgent tasks — SIN, bank account, healthcare, housing — but information is scattered across different websites with no clear order. This leads to confusion and missed steps.',
      },
      {
        title: 'Research',
        detail: 'Researched the newcomer experience through online sources, community forums, and existing settlement guides. Created user personas and journey maps to find the key pain points — especially information overload and not knowing what to do first.',
      },
      {
        title: 'Lo-fi wireframes',
        detail: 'Sketched different approaches — open task lists vs guided flows. Focus was on making it clear what to do first and reducing overwhelm.',
      },
      {
        title: 'Hi-fi design',
        detail: 'Designed the full interface in Figma using Figma Make to speed up layouts, then refined by hand. Goal: a calm, clear interface that helps users make decisions without feeling overwhelmed.',
      },
      {
        title: 'Development',
        detail: 'Built with React, TypeScript, Tailwind, and Firebase. Development and design happened in parallel — building, testing, and adjusting at the same time. Used Claude and ChatGPT for debugging and speeding things up.',
      },
      {
        title: 'Testing & iteration',
        detail: 'Continued testing with people who went through the settlement process. Found specific issues: task completion vs exploration confusion, unclear priority labels, hard-to-find features. Each issue became a tracked fix.',
      },
    ],
    keyDecisions: [
      'The biggest decision was choosing between a flexible system and a guided experience. Testing showed that too much freedom made things harder, not easier. Users wanted someone to tell them what to do first. So I built a guided checklist with priorities and task dependencies.',
      'Another important decision was using AI tools throughout the workflow — not to replace my work, but to move faster. AI-assisted design and coding let me explore more ideas in less time while keeping full control over the final result.',
    ],
    result: [
      'The final product is a guided checklist platform designed for the first 90 days of a newcomer\'s life in Canada. It combines structured task flows, step-by-step guidance, and curated resources into one clear experience.',
      'Beyond the product itself, this project taught me a lot about working with real stakeholders, turning research into product decisions, and managing a full development workflow with continuous testing and iteration.',
    ],
    nextProject: { slug: 'dashboard', title: 'Vancouver City Dashboard' },
    prevProject: { slug: 'velocita', title: 'Velocità' },
  },

  {
    slug: 'dashboard',
    title: 'Vancouver City Dashboard',
    oneliner: 'A redesigned, simplified interface for the City of Vancouver\'s public data dashboard.',
    tags: ['HTML', 'CSS', 'JavaScript', 'ECharts', 'Figma'],
    accentRgb: '82, 180, 255',
    liveUrl: 'https://modeshare.netlify.app',
    hasVideo: false,
    heroImage: '/VanociverModeShare/modeshare_card_image.png',
    screenshots: [
      // Place files at: /public/VanociverModeShare/[file].png
      { label: 'Screenshot 1', src: '/VanociverModeShare/Screenshot_1.png' },
      { label: 'Screenshot 2', src: '/VanociverModeShare/Screenshot_2.png' },
      { label: 'Screenshot 3', src: '/VanociverModeShare/Screenshot_3.png' },
      { label: 'Screenshot 4', src: '/VanociverModeShare/Screenshot_4.png' },
    ],
    overview: [
      'A redesign of the City of Vancouver\'s public data dashboard — simplifying a cluttered, data-heavy page into a focused, accessible interface built around what residents actually want to see.',
      'The original dashboard presented too much information without clear visual hierarchy, making it difficult for everyday users to extract the specific data they were looking for. Our goal was to strip it back to what matters for the primary persona: a Vancouver resident checking local transit, housing, or environmental data.',
      'This was a school project done in collaboration with a classmate. We divided the design and development work, bringing different perspectives to problem-solving and research.',
    ],
    note: 'This was a collaborative school project done with a classmate. No AI tools were used — this was a fully self-directed research, design, and development project.',
    processIntro: 'This project started with understanding the problem — too much data, unclear priorities. We worked through research and persona development to strip the interface back to what residents actually need, then designed and built a cleaner, more usable version of the dashboard.',
    processScreenshots: [
      { label: 'Analysis', src: '/VanociverModeShare/p_card_1.jpeg' },
      { label: 'Personas', src: '/VanociverModeShare/p_card_2.png' },
      { label: 'Simplification', src: '/VanociverModeShare/p_card_3.jpeg' },
      { label: 'Lo-fi wireframes', src: '/VanociverModeShare/p_card_4.jpeg' },
      { label: 'Hi-fi design', src: '/VanociverModeShare/p_card_5.jpeg' },
      { label: 'Development', src: '/VanociverModeShare/p_card_6.jpeg' },
    ],
    steps: [
      {
        title: 'Analysis',
        detail: 'Analyzed the original Vancouver city dashboard — catalogued every data point shown, identified inconsistencies in visual hierarchy, and documented where the UX breaks down for a general audience.',
      },
      {
        title: 'Personas',
        detail: 'Created user personas to understand who actually uses this data and what they need. The primary persona was a Vancouver resident — not a data analyst — checking a specific local stat.',
      },
      {
        title: 'Simplification',
        detail: 'Realized our persona doesn\'t need the majority of the information on the original page. Made the bold decision to cut roughly two-thirds of the data, focusing on what the primary user would realistically look for.',
      },
      {
        title: 'Lo-fi wireframes',
        detail: 'Sketched the simplified layout — a cleaner sidebar navigation, fewer but more readable charts, and a clear information hierarchy that guides the eye from summary to detail.',
      },
      {
        title: 'Hi-fi design',
        detail: 'Designed the modernized, minimalist interface in Figma. Focused on whitespace, consistent type scale, and color used sparingly to draw attention to key data points.',
      },
      {
        title: 'Development',
        detail: 'Built with React for structure and D3.js for interactive data visualization. Chose D3 over a charting library for full visual control, matching the design exactly.',
      },
    ],
    keyDecisions: [
      'The biggest design decision was what to cut. After building personas, it became clear that our primary user — a resident checking local transit or housing data — didn\'t need 80% of the charts on the original dashboard. Simplification was the main design move, and defending that decision required going back to the persona work repeatedly.',
      'Choosing D3.js over a higher-level charting library like Recharts was a deliberate decision that gave us full control over the visual output. The tradeoff was a steeper learning curve, but the result was far more aligned with our design vision and taught me a lot about how data visualization works under the hood.',
    ],
    result: [
      'The redesigned dashboard is significantly cleaner, faster to read, and more aligned with what residents actually need from city data. The simplified layout reduces cognitive load dramatically compared to the original, and the interactive D3 charts feel polished and intentional.',
      'Working collaboratively on this project taught me how to divide design responsibilities between two people and merge different creative perspectives into a coherent final design. It was also a good reminder that less is often more — the hardest part of the project was deciding what not to show.',
    ],
    nextProject: { slug: 'surveyapp', title: 'SurveyApp' },
    prevProject: { slug: 'arrivalio', title: 'Arrivalio' },
  },

  {
    slug: 'surveyapp',
    title: 'SurveyApp',
    oneliner: 'A lightweight survey tool with auto-translation to English, Russian, French, and Spanish for accessible user research.',
    tags: ['ChatGPT', 'Copilot', 'React', 'TypeScript', 'Supabase', 'Figma Make'],
    accentRgb: '237, 237, 252',
    liveUrl: 'https://fromsurvey.lat/',
    heroImage: '/SurveyApp/surveyapp_hero_image.png',
    screenshots: [
      // Place files at: /public/SurveyApp/Screenshot_*.jpeg
      { label: 'Screenshot 1', src: '/SurveyApp/Screenshot_1.jpeg' },
      { label: 'Screenshot 2', src: '/SurveyApp/Screenshot_2.jpeg' },
      { label: 'Screenshot 3', src: '/SurveyApp/Screenshot_3.jpeg' },
      { label: 'Screenshot 4', src: '/SurveyApp/Screenshot_4.jpeg' },
    ],
    overview: [
      'SurveyApp is a lightweight survey tool I built to collect user research data for my capstone project, Arrivalio.',
      'Since Arrivalio is designed for newcomers to Canada, many of my target users speak different languages. I did not want to create separate surveys for each language manually. So I built a feature where the app automatically translates survey questions into multiple languages using a translation API.',
      'When you type a question in any language — English, Russian, French, or Spanish — the app instantly translates it into the other three. This way, every participant can take the survey in their own language without extra work from the researcher.',
      'I chose these four languages because they cover a large portion of newcomers in Canada, and because I wanted to test how well automatic translation works in a real survey context.',
    ],
    note: 'Built as a side project to support capstone research. Figma Make was used for UI design and AI coding tools assisted in development.',
    processIntro: 'This project was built quickly to support my capstone research, and walked through a focused cycle: understanding what I needed, designing a clean interface, building the core functionality, and learning critical lessons about infrastructure along the way.',
    processScreenshots: [
      { label: 'Need', src: '/SurveyApp/p_card_1.jpeg' },
      { label: 'Design', src: '/SurveyApp/p_card_2.jpeg' },
      { label: 'Development', src: '/SurveyApp/p_card_3.jpeg' },
      { label: 'Database lessons', src: '/SurveyApp/p_card_4.jpeg' },
    ],
    steps: [
      {
        title: 'Need',
        detail: 'For my capstone I needed to survey target users, but instead of using SurveyMonkey or Google Forms, I decided to build my own tool — both to collect the data I needed and to practice building a real product.',
      },
      {
        title: 'Design',
        detail: 'Designed the UI using Figma Make — the clean survey interface, the response collection view, and the simple admin dashboard to review results. Refined the AI output to match my design style.',
      },
      {
        title: 'Development',
        detail: 'Built the survey logic and form state management with React and TypeScript. Connected to Supabase for storing survey responses with a simple schema.',
      },
      {
        title: 'Database lessons',
        detail: 'Learned that free database tiers (Supabase\'s free plan) can pause after a period of inactivity, which caused reliability issues when participants tried to submit responses after the project had been idle. An important lesson about infrastructure decisions for real-world projects.',
      },
    ],
    keyDecisions: [
      'The main decision was scope — keeping the feature set minimal: survey creation, response collection, and a basic results view. Adding more would have taken time away from the capstone itself. A focused tool that does a few things well was exactly right for a project within a project.',
      'Using Figma Make to design the UI was a natural choice given the time constraints. It let me go from concept to high-fidelity mockup quickly, and the AI-generated components gave me a solid starting point that I refined to match my design preferences.',
    ],
    result: [
      'SurveyApp collected the responses needed for Arrivalio\'s user research phase and worked exactly as intended. The codebase stayed small enough that extending it would be straightforward.',
      'The biggest takeaway was about database reliability: free infrastructure tiers have limitations that matter in production. For any real project where data continuity is critical, this needs to be a deliberate decision made early — not discovered after a deployment issue.',
    ],
    nextProject: { slug: 'apex-trading', title: 'Apex Algorithmic Trading Engine' },
    prevProject: { slug: 'dashboard', title: 'Vancouver City Dashboard' },
  },

  {
    slug: 'apex-trading',
    title: 'Apex Algorithmic Trading Engine',
    oneliner: 'A high-performance Node.js system for automated market liquidity analysis and trade execution.',
    tags: ['Node.js', 'Binance API', 'WebSockets', 'Telegram API', 'GCP', 'Linux', 'Git'],
    accentRgb: '212, 175, 55',
    hasVideo: false,
    heroImage: '/ApexTrading/card-image.png',
    screenshots: [],
    processScreenshots: [
      { label: 'Multi-Zone Liquidity Logic', src: '/ApexTrading/p-c-1.png' },
      { label: 'Market Health Check', src: '/ApexTrading/p-c-2.png' },
      { label: 'Real-time Monitoring', src: '/ApexTrading/p-c-3.png' },
      { label: 'Cloud Infrastructure', src: '/ApexTrading/p-c-4.png' },
    ],
    overview: [
      'The cryptocurrency market operates 24/7, making it impossible for a human trader to maintain constant discipline and react to volatility spikes across multiple time zones. Manual trading often leads to emotional decision-making and missed opportunities during institutional liquidity windows.',
      'I engineered an autonomous trading ecosystem that executes the ICT Silver Bullet strategy. The system monitors the market around the clock, identifying "Kill Zones" — high-probability liquidity windows — and executing trades with surgical precision, removing human error from the equation entirely.',
      'The result is a self-contained engine that combines custom volatility analysis, multi-session scheduling, and real-time Telegram reporting into a single, resilient system deployed on Google Cloud Platform.',
    ],
    processIntro: 'This project was built bottom-up: starting with core strategy logic, layering in validation and filtering, then adding observability and cloud deployment for 24/7 reliability.',
    steps: [
      {
        title: 'Multi-Zone Liquidity Logic',
        detail: 'Programmed a custom scheduler to track 7 distinct global liquidity windows — from Daily Open to New York PM sessions. Each zone has its own timing rules and trade parameters, reflecting the different institutional behaviors active in each session.',
      },
      {
        title: 'Market Health Check',
        detail: 'Developed a multi-layered validation engine using ATR (Average True Range) and volume analysis. The bot autonomously identifies and skips low-probability "dead zones," significantly preserving capital during flat market conditions before a trade is ever placed.',
      },
      {
        title: 'Real-time Monitoring',
        detail: 'Integrated with the Telegram Bot API for instant reporting. The system delivers detailed session summaries, trade execution confirmations, and performance metrics directly to my mobile device — full observability without any manual log-checking.',
      },
    ],
    keyDecisions: [
      'Choosing Node.js as the runtime was deliberate — its event-driven, non-blocking architecture handles concurrent WebSocket streams from Binance and outbound Telegram calls without thread contention, keeping latency minimal during fast market moves.',
      'Building a custom ATR-based "Smart Filter" was the most impactful engineering decision. Rather than trading every session blindly, the system only enters the market when volatility and volume conditions meet strict thresholds — a simple rule that dramatically reduced false signals and capital exposure.',
    ],
    result: [
      'The engine runs autonomously across all global sessions, executing the ICT Silver Bullet strategy without manual intervention. The Telegram integration provides complete operational visibility, and the GCP deployment has maintained continuous uptime since launch.',
      'Beyond the trading results, this project deepened my understanding of real-time data pipelines, financial API integration, and the engineering discipline required to build reliable automated systems — where a bug is not just a UX issue but a direct financial risk.',
    ],
    prevProject: { slug: 'surveyapp', title: 'SurveyApp' },
    nextProject: { slug: 'apex-grid-bot', title: 'Apex Grid Bot' },
  },

  {
    slug: 'apex-grid-bot',
    title: 'Apex Grid Bot',
    oneliner: 'Automated Algorithmic Trading System & Infrastructure.',
    tags: ['Node.js', 'Telegram API', 'GCP', 'PM2', 'DevOps', 'Systems Design'],
    accentRgb: '37, 99, 235',
    heroImage: '/ApexGridBot/hero.png',
    screenshots: [],
    processScreenshots: [
      { label: 'Engine & Infrastructure', src: '/ApexGridBot/p-c-1.png' },
      { label: 'Telegram Dashboard', src: '/ApexGridBot/p-c-2.png' },
      { label: 'Smart Notifications', src: '/ApexGridBot/p-c-3.png' },
      { label: 'Precision & Concurrency', src: '/ApexGridBot/p-c-4.png' },
    ],
    overview: [
      'Apex Grid Bot eliminates emotional bias and manual overhead by executing a fully autonomous grid trading strategy. The system places and manages a calculated mathematical grid of orders 24/7, ensuring consistent market participation without any human intervention.',
      'The project demonstrates how backend engineering and thoughtful UX design can work together: a robust Node.js engine running on GCP handles all trading logic invisibly in the background, while a custom-built Telegram dashboard gives the operator complete visibility and control from a mobile device.',
      'Apex Grid Bot bridges the gap between complex algorithmic trading and intuitive user control — transforming a high-stress manual task into a silent background process with full transparency through a simple mobile interface.',
    ],
    processIntro: 'The system was built in four layers: a high-performance execution engine, resilient cloud infrastructure, a smart notification system, and critical engineering fixes that made it reliable in production.',
    steps: [
      {
        title: 'Engine & Infrastructure',
        detail: 'Built with Node.js using high-performance asynchronous logic for real-time order execution and market monitoring. Deployed on GCP in a North American region for low-latency connections. Managed via PM2 for automated process recovery, resource monitoring, and 99.9% uptime. State persistence via custom JSON storage allows the bot to recover its exact grid position and order history instantly after reboots.',
      },
      {
        title: 'Telegram Dashboard',
        detail: 'Leveraged the Telegram Bot API to create a custom command-line interface accessible from any mobile device. Users can monitor balances, view active grids, and reboot systems via interactive inline_keyboard menus. Financial data is formatted with HTML-style parsing for high readability, including color-coded indicators for BUY (🟢) and SELL (🔴) actions.',
      },
      {
        title: 'Smart Notifications',
        detail: 'Engineered a priority-based notification system that filters noise and only alerts the operator for critical events: filled orders, completed grid cycles, or boundary warnings. This keeps the interface actionable rather than overwhelming — a deliberate UX decision applied to a backend system.',
      },
    ],
    keyDecisions: [
      'Choosing PM2 over a simple process manager was deliberate. Its built-in crash recovery, log rotation, and resource monitoring meant I got production-grade reliability without building those systems from scratch — the right tool for a 24/7 autonomous process.',
      'Building a custom Telegram interface instead of a web dashboard was a constraint that turned into a strength. Telegram is always accessible, requires no authentication UI, and the inline_keyboard system is powerful enough to handle all the control flows needed — all while keeping the architecture simple.',
    ],
    result: [
      'The bot runs autonomously 24/7, executing its grid strategy with no manual intervention. The Telegram dashboard gives full operational visibility and control from anywhere, and PM2 on GCP has maintained consistent uptime through reboots and updates.',
      'This project sharpened my understanding of distributed systems reliability, API security patterns, and concurrency management — engineering problems where the cost of a bug is immediate and financial. It also reinforced how UX thinking applies beyond interfaces: the notification system and dashboard design required the same discipline as any frontend product.',
    ],
    prevProject: { slug: 'apex-trading', title: 'Apex Algorithmic Trading Engine' },
    nextProject: { slug: 'velocita', title: 'Velocità' },
  },

  {
    slug: 'velocita',
    title: 'Velocità',
    oneliner: 'A high-end, minimalist portfolio for a professional automotive and motorcycle photographer.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Firebase', 'Vercel', 'TDD'],
    accentRgb: '220, 38, 38',
    liveUrl: '#',
    hasVideo: false,
    heroImage: '/Velocita/hero.png',
    processScreenshots: [
      { label: 'Visual Identity & Architecture', src: '/Velocita/p-c-1.png' },
      { label: 'Mobile-First UX', src: '/Velocita/p-c-2.png' },
      { label: 'Stealth CMS', src: '/Velocita/p-c-3.png' },
    ],
    overview: [
      'Velocità is a high-end portfolio platform designed for a professional automotive and motorcycle photographer. The brief was clear: visual impact first, everything else second. The design prioritizes the photography and gets out of its own way.',
      'The visual identity is deliberately extreme — an ultra-minimalist black-and-white palette with a single Racing Red accent. Typography pairs Inter Tight for headlines with JetBrains Mono for photo metadata (ISO, shutter speed, aperture), creating a professional “technical spec” aesthetic that feels native to the automotive world.',
      'Behind the clean public-facing portfolio sits a fully functional stealth CMS: a protected /manage route with Firebase Google Authentication, allowing the photographer to upload shoots, write metadata, and organize albums through a custom dashboard — with no external CMS subscription required.',
    ],
    processIntro: 'The project was built in four phases: establishing the visual identity and architecture, engineering the mobile-first UX, building the stealth CMS, and ensuring reliability through test-driven development.',
    steps: [
      {
        title: 'Visual Identity & Architecture',
        detail: 'Defined the ultra-minimalist black-and-white palette with Racing Red as the sole accent. Established a project-based architecture where each entry functions as a standalone cinematic album with its own metadata, rather than a flat image gallery. This structural decision shapes the entire UX.',
      },
      {
        title: 'Mobile-First UX',
        detail: 'Engineered specifically for touch devices by replacing hover-dependent metadata with static and scroll-triggered information. Implemented buttery-smooth inertial scrolling with Lenis and staggered entrance animations via Framer Motion. Every interaction was tested on mobile first.',
      },
      {
        title: 'Stealth CMS',
        detail: 'Built a full content management system hidden from the public UI. Firebase Google Authentication protects the /manage route, and a custom dashboard allows the photographer to upload media, write metadata, and organize shoots. Firebase Storage handles optimized media delivery and Firestore manages all structured data.',
      },
    ],
    keyDecisions: [
      'The stealth CMS approach was the right call over a third-party solution like Contentful or Sanity. It keeps the photographer’s workflow entirely within the app, avoids subscription costs, and allowed the dashboard UX to be designed specifically around how a photographer actually thinks about organizing shoots — not around a generic CMS paradigm.',
      'Adopting TDD for a portfolio project was deliberate. The authentication gating and gallery filter logic are exactly the kind of stateful behavior that breaks subtly. Writing tests first forced clearer thinking about edge cases and gave confidence when refactoring the routing architecture mid-project.',
    ],
    result: [
      'The result is a portfolio that feels as considered as the photography it presents. The minimalist design keeps the focus entirely on the images, while the stealth CMS gives the client full editorial control through a clean dashboard — no technical knowledge required after handoff.',
      'This project sharpened my ability to design for a specific visual brand under strict constraints, build production-grade authentication flows, and apply TDD in a real frontend codebase. It also reinforced that the best portfolio sites are invisible — the design should never compete with the work it displays.',
    ],
    prevProject: { slug: 'apex-grid-bot', title: 'Apex Grid Bot' },
    nextProject: { slug: 'arrivalio', title: 'Arrivalio' },
  },
]
