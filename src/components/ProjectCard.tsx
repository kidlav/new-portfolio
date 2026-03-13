import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../data/projects'

type ProjectCardProps = {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const reversed = index % 2 === 1
  const isPlaceholder = project.isPlaceholder ?? false

  return (
    <motion.article
      className={`project-card ${project.featured ? 'featured' : ''} ${reversed ? 'reversed' : ''}`.trim()}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="project-content">
        <div>
          <div className="project-meta">
            <span>{project.featured ? 'Flagship project' : 'Selected project'}</span>
            <span>{project.category}</span>
          </div>

          <h3>{project.title}</h3>
          <p className="project-description">{project.description}</p>
        </div>

        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="project-links">
          {isPlaceholder ? (
            <>
              <span className="inline-link inline-link-disabled">
                Live preview · coming soon
              </span>
              <span className="inline-link inline-link-disabled">
                Source code · coming soon
              </span>
            </>
          ) : (
            <>
              <a className="inline-link" href={project.liveUrl} target="_blank" rel="noreferrer">
                Live preview
                <ArrowUpRight size={16} />
              </a>
              <a className="inline-link" href={project.repoUrl} target="_blank" rel="noreferrer">
                Source code
                <ArrowUpRight size={16} />
              </a>
            </>
          )}
        </div>
      </div>

      <motion.div
        className="project-visual"
        initial={{ opacity: 0, x: reversed ? -28 : 28 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="visual-sidebar" />
        <div className="visual-window">
          <div className="visual-header">
            <span />
            <span />
            <span />
          </div>

          <div className="visual-body">
            <div className="visual-line" />
            <div className="visual-line short" />
            <div className="visual-cards">
              <div className="visual-card" />
              <div className="visual-card" />
            </div>
          </div>
        </div>
        <div className="visual-chart" />
        <div className="visual-floating-card" />
        <div className="project-visual-placeholder">Project visual placeholder</div>
      </motion.div>
    </motion.article>
  )
}