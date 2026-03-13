import type { Project } from '../data/projects'

// ── Decorative mock UI preview for each card ──────────────────────────────
function CardPreview({ index }: { index: number }) {
  const palettes = [
    { glow: 'rgba(155,141,255,0.22)', card: 'rgba(155,141,255,0.12)', active: 'rgba(155,141,255,0.55)' },
    { glow: 'rgba(82,180,255,0.20)',  card: 'rgba(82,180,255,0.11)',  active: 'rgba(82,180,255,0.55)'  },
    { glow: 'rgba(98,255,175,0.18)',  card: 'rgba(98,255,175,0.10)',  active: 'rgba(98,255,175,0.50)'  },
  ]
  const p = palettes[index] ?? palettes[0]

  return (
    <div className="pg-preview">
      <div className="pg-preview-bar">
        <span className="pg-preview-dot" />
        <span className="pg-preview-dot" />
        <span className="pg-preview-dot" />
        <div className="pg-preview-url" />
      </div>
      <div className="pg-preview-body">
        <div className="pg-preview-sidebar">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="pg-preview-nav"
              style={i === 1 ? { background: p.active, width: '22px' } : undefined}
            />
          ))}
        </div>
        <div className="pg-preview-content">
          <div className="pg-preview-header" style={{ background: p.glow }} />
          <div className="pg-preview-cards">
            <div className="pg-preview-card" style={{ background: p.card }} />
            <div className="pg-preview-card pg-preview-card--tall" style={{ background: p.card }} />
          </div>
          <div className="pg-preview-rows">
            <div className="pg-preview-row" />
            <div className="pg-preview-row pg-preview-row--short" />
            <div className="pg-preview-row" />
          </div>
        </div>
      </div>
      <div
        className="pg-preview-glow"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${p.glow} 0%, transparent 70%)` }}
      />
    </div>
  )
}

// ── Component ─────────────────────────────────────────────────────────────
interface ProjectsGridProps {
  projects: Project[]
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const visible = projects.slice(0, 3)

  return (
    <section className="section pg-section" id="projects" data-pg-section>
      <div className="pg-grid">
        {visible.map((p, i) => (
          <article key={p.title} className="pg-card" data-pg-card={i + 1}>
            <div className="pg-card-preview">
              <CardPreview index={i} />
            </div>
            <div className="pg-card-body">
              <span className="pg-card-eyebrow">
                {String(i + 1).padStart(2, '0')} — {p.category}
              </span>
              <h3 className="pg-card-title">{p.title}</h3>
              <p className="pg-card-desc">{p.description}</p>
              <div className="pg-card-tags">
                {p.tags.slice(0, 3).map((t) => (
                  <span key={t} className="pg-card-tag">{t}</span>
                ))}
              </div>
            </div>
            <div className="pg-card-footer">
              <a href={p.liveUrl} className="pg-card-link">View project →</a>
            </div>
          </article>
        ))}
      </div>

      <div className="pg-cta">
        <a href="#" className="pg-view-all">View All Projects</a>
      </div>
    </section>
  )
}
