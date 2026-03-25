import type { Project } from '../data/projects'
import { ImageComparison } from './ui/image-comparison'

interface ScrollShowcaseProps {
  projects: Project[]
}

function ProjectMock({ index }: { index: number }) {
  return (
    <div className="sc-mock">
      <div className="sc-mock-bar">
        <span className="sc-mock-dot" />
        <span className="sc-mock-dot" />
        <span className="sc-mock-dot" />
        <div className="sc-mock-url" />
      </div>
      <div className="sc-mock-body">
        <div className="sc-mock-sidebar">
          <div className="sc-mock-nav-item" />
          <div className="sc-mock-nav-item sc-mock-nav-item--active" />
          <div className="sc-mock-nav-item" />
          <div className="sc-mock-nav-item" />
        </div>
        <div className="sc-mock-content">
          <div className="sc-mock-header-row">
            <div className="sc-mock-title-block" />
            <div className="sc-mock-badge" style={{ background: index === 0 ? 'rgba(155,141,255,0.3)' : 'rgba(171,215,255,0.2)' }} />
          </div>
          <div className="sc-mock-card-row">
            <div className="sc-mock-card" />
            <div className="sc-mock-card sc-mock-card--tall" />
            <div className="sc-mock-card" />
          </div>
          <div className="sc-mock-list">
            <div className="sc-mock-list-item" />
            <div className="sc-mock-list-item sc-mock-list-item--wide" />
            <div className="sc-mock-list-item" />
          </div>
        </div>
      </div>
      <div
        className="sc-mock-glow"
        style={{
          background: index === 0
            ? 'radial-gradient(circle at 30% 40%, rgba(155,141,255,0.18) 0%, transparent 65%)'
            : 'radial-gradient(circle at 70% 30%, rgba(171,215,255,0.14) 0%, transparent 65%)',
        }}
      />
    </div>
  )
}

export function ScrollShowcase({ projects }: ScrollShowcaseProps) {
  const p1 = projects[0]
  const p2 = projects[1]

  return (
    <section className="scroll-showcase" data-showcase>
      <div className="showcase-stage">

        {/* Intro heading — fades out in phase 0 */}
        <div className="showcase-heading" data-showcase-heading>
          <span className="eyebrow">Selected Work</span>
          <h2>Two projects. One story.</h2>
          <p className="showcase-heading-sub">Scroll to explore</p>
        </div>

        {/* The central moving image */}
        <div className="showcase-image" data-showcase-image>
          {/* Layer 1: comparison slider — visible in the initial center state */}
          <div className="img-cmp-wrap" data-cmp-slider>
            <ImageComparison
              before={<ProjectMock index={0} />}
              after={<ProjectMock index={1} />}
            />
          </div>
          {/* Layer 2: static project 0 — shown when image is on the RIGHT */}
          <div className="img-cmp-wrap" data-cmp-static-r>
            <ProjectMock index={0} />
          </div>
          {/* Layer 3: static project 1 — shown when image is on the LEFT */}
          <div className="img-cmp-wrap" data-cmp-static-l>
            <ProjectMock index={1} />
          </div>
        </div>

        {/* Text panel: left — appears in phase 1 */}
        <div className="showcase-text showcase-text--left" data-showcase-text="left">
          <span className="showcase-index">01</span>
          <div className="showcase-tags">
            {p1.tags.slice(0, 3).map((t) => (
              <span key={t} className="showcase-tag">{t}</span>
            ))}
          </div>
          <h3 className="showcase-project-title">{p1.title}</h3>
          <p className="showcase-project-desc">{p1.description}</p>
          <div className="showcase-links">
            <a href={p1.liveUrl} className="showcase-link">View live →</a>
          </div>
        </div>

        {/* Text panel: right — appears in phase 2 */}
        <div className="showcase-text showcase-text--right" data-showcase-text="right">
          <span className="showcase-index">02</span>
          <div className="showcase-tags">
            {p2.tags.slice(0, 3).map((t) => (
              <span key={t} className="showcase-tag">{t}</span>
            ))}
          </div>
          <h3 className="showcase-project-title">{p2.title}</h3>
          <p className="showcase-project-desc">{p2.description}</p>
          <div className="showcase-links">
            <a href={p2.liveUrl} className="showcase-link">View live →</a>
          </div>
        </div>

        {/* Scroll progress dots */}
        <div className="showcase-progress" data-showcase-progress>
          <span className="showcase-progress-dot showcase-progress-dot--active" data-progress-dot="0" />
          <span className="showcase-progress-dot" data-progress-dot="1" />
          <span className="showcase-progress-dot" data-progress-dot="2" />
        </div>

        {/* Stage cards — revealed during the projects grid transition */}
        <div className="pg-stage-card" data-pg-card-2>
          <ProjectMock index={1} />
        </div>
        <div className="pg-stage-card" data-pg-card-3>
          <ProjectMock index={2} />
        </div>

        {/* Projects section title — appears after cards settle */}
        <div className="pg-stage-title" data-pg-title>
          <span className="eyebrow">Selected work</span>
          <h2>Projects</h2>
        </div>

      </div>
    </section>
  )
}
