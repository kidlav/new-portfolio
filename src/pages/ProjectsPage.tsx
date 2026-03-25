import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { projects } from '../data/projects'

const palettes = [
  { glow: 'rgba(241,241,255,0.18)', card: 'rgba(241,241,255,0.1)',  active: 'rgba(241,241,255,0.5)'  },
  { glow: 'rgba(82,180,255,0.20)',  card: 'rgba(82,180,255,0.12)',  active: 'rgba(82,180,255,0.6)'   },
  { glow: 'rgba(110,231,160,0.18)', card: 'rgba(110,231,160,0.1)',  active: 'rgba(110,231,160,0.55)' },
]

function CardPreview({ index, slug }: { index: number; slug: string }) {
  const previewBySlug: Record<string, string> = {
    arrivalio: '/Arrivalio/card_image.png',
    dashboard: '/VanociverModeShare/modeshare_card_image.png',
    surveyapp: '/SurveyApp/surveyapp_hero_image.png',
  }

  const previewSrc = previewBySlug[slug]

  if (previewSrc) {
    return (
      <img
        src={previewSrc}
        alt={`${slug} preview`}
        className="card-preview-image"
        loading="lazy"
      />
    )
  }

  const p = palettes[index] ?? palettes[0]
  return (
    <div className="card-preview">
      <div className="card-preview-bar">
        <span className="card-preview-dot" />
        <span className="card-preview-dot" />
        <span className="card-preview-dot" />
        <div className="card-preview-url" />
      </div>
      <div className="card-preview-body">
        <div className="card-preview-sidebar">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="card-preview-nav"
              style={i === 1 ? { background: p.active, width: '20px' } : undefined} />
          ))}
        </div>
        <div className="card-preview-content">
          <div className="card-preview-header" style={{ background: p.glow }} />
          <div className="card-preview-cards">
            <div className="card-preview-card" style={{ background: p.card }} />
            <div className="card-preview-card card-preview-card--tall" style={{ background: p.card }} />
          </div>
          <div className="card-preview-rows">
            <div className="card-preview-row" />
            <div className="card-preview-row card-preview-row--short" />
          </div>
        </div>
      </div>
      <div className="card-preview-glow"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${p.glow} 0%, transparent 65%)` }} />
    </div>
  )
}

export function ProjectsPage() {
  return (
    <main>
      <div className="section projects-page-header">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: 'transform' }}
        >
          <div className="section-eyebrow">All projects</div>
          <h1 className="section-title" style={{ maxWidth: '16ch' }}>
            Things I've designed & built
          </h1>
          <p className="section-desc" style={{ marginTop: 16 }}>
            A collection of projects ranging from full-stack applications to UI systems and open-source tools.
          </p>
        </motion.div>
      </div>

      <div className="section" style={{ paddingTop: 0 }}>
        <div className="projects-page-grid">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              style={{ willChange: 'transform' }}
            >
              <Link to={`/projects/${project.slug}`} className="project-card">
                <div className="project-card-preview">
                  <CardPreview index={i} slug={project.slug} />
                </div>
                <div className="project-card-body">
                  <span className="project-eyebrow">
                    {String(i + 1).padStart(2, '0')} — {project.category}
                  </span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((t) => (
                      <span key={t} className="project-tag">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="project-card-footer">
                  <span className="project-link-arrow">View case study <ArrowRight size={14} /></span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <span className="footer-logo">VK</span>
        <span className="footer-copy">© {new Date().getFullYear()} — Built with React & GSAP</span>
      </footer>
    </main>
  )
}
