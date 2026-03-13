export type Project = {
  title: string
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
    title: 'Main flagship project (placeholder)',
    category: 'Flagship case study',
    description:
      'Temporary placeholder for the primary project. Final screenshots, production metrics, and full case-study narrative will be added next.',
    tags: ['Placeholder', 'Case study', 'Full-stack', 'Frontend'],
    featured: true,
    isPlaceholder: true,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Secondary project A (placeholder)',
    category: 'Supporting project',
    description:
      'Temporary placeholder for the second project. The final version will show implementation details and polished interface decisions.',
    tags: ['Placeholder', 'UI', 'Motion', 'Responsive'],
    isPlaceholder: true,
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Secondary project B (placeholder)',
    category: 'Supporting project',
    description:
      'Temporary placeholder for the third project. Content will be replaced with a real project and end-to-end delivery story.',
    tags: ['Placeholder', 'Frontend', 'API', 'Product'],
    isPlaceholder: true,
    liveUrl: '#',
    repoUrl: '#',
  },
]