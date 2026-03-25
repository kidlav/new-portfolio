export type Project = {
  title: string
  slug: string
  category: string
  description: string
  tags: string[]
  featured?: boolean
  isPlaceholder?: boolean
  liveUrl: string
  repoUrl: string
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
]
