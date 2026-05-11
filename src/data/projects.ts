export type Project = {
  title: string
  slug: string
  category: string
  description: string
  tags: string[]
  featured?: boolean
  isPlaceholder?: boolean
  liveUrl?: string
  repoUrl?: string
}

export const projects: Project[] = [
  {
    title: 'Arrivalio',
    slug: 'arrivalio',
    category: 'My capstone',
    description:
      'A full-stack guided checklist platform helping newcomers to Canada navigate their first months — from SIN numbers to healthcare.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Firebase', 'Figma', 'Claude'],
    featured: true,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Vancouver City Dashboard',
    slug: 'dashboard',
    category: 'Data visualization',
    description:
      'A redesigned, simplified interface for the City of Vancouver\'s public data dashboard — focused on what residents actually need.',
    tags: ['HTML', 'CSS', 'JavaScript', 'ECharts', 'Figma'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'SurveyApp',
    slug: 'surveyapp',
    category: 'Capstone extras',
    description:
      'A lightweight self-built survey tool for collecting user research data. Built instead of using SurveyMonkey — to learn by doing.',
    tags: ['React', 'TypeScript', 'Supabase', 'Figma', 'ChatGPT'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Apex Algorithmic Trading Engine',
    slug: 'apex-trading',
    category: 'Systems engineering',
    description:
      'A high-performance Node.js system for automated market liquidity analysis and trade execution — running 24/7 on GCP with zero human intervention.',
    tags: ['Node.js', 'Binance API', 'Telegram API', 'GCP', 'Linux'],
  },
  {
    title: 'Apex Grid Bot',
    slug: 'apex-grid-bot',
    category: 'Systems engineering',
    description:
      'A fully autonomous grid trading system that executes high-frequency trades 24/7 based on a calculated mathematical grid — with a custom Telegram dashboard for full mobile control.',
    tags: ['Node.js', 'Telegram API', 'GCP', 'PM2', 'DevOps'],
  },
  {
    title: 'Velocità',
    slug: 'velocita',
    category: 'Frontend & UX/UI',
    description:
      'A high-end, minimalist portfolio for a professional automotive photographer — built with a stealth CMS, Firebase backend, and a cinematic mobile-first experience.',
    tags: ['React', 'Tailwind CSS', 'Firebase', 'Framer Motion', 'Vercel'],
    liveUrl: '#',
  },
]
