import { Link } from 'react-router-dom'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Play, ImageIcon, Info, ExternalLink, Github } from 'lucide-react'
import { FadeIn } from './FadeIn'
import { ScreenshotGallery } from './ScreenshotGallery'
import { preloadImages } from '../utils/imageOptimization'
import type { CaseStudyData, Screenshot } from '../data/caseStudies'

// ── Screenshot placeholder inside step cards ──────────────────────────────────
function ScreenshotPlaceholder({ screenshot }: { screenshot?: Screenshot }) {
  const [failed, setFailed] = useState(false)
  const [loading, setLoading] = useState(true)

  if (screenshot && screenshot.src && !failed) {
    return (
      <div className="cs-screenshot">
        {loading && (
          <div className="cs-screenshot-skeleton" aria-hidden="true">
            <div className="cs-skeleton-shimmer" />
          </div>
        )}
        <img
          src={screenshot.src}
          alt={screenshot.label}
          className="cs-screenshot-img"
          loading="lazy"
          onLoad={() => setLoading(false)}
          onError={() => {
            setFailed(true)
            setLoading(false)
          }}
          style={{ 
            opacity: loading ? 0 : 1,
            transition: 'opacity 0.3s ease-in'
          }}
        />
      </div>
    )
  }

  return (
    <div className="cs-screenshot" aria-hidden="true">
      <ImageIcon size={20} className="cs-placeholder-icon" />
      <span>{screenshot?.src ? 'Failed to load' : 'Screenshot placeholder'}</span>
    </div>
  )
}

// ── Hero image placeholder ────────────────────────────────────────────────────
// Replace with your screenshot: /public/images/[project]-hero.png
function HeroImagePlaceholder({ slug, heroImage }: { slug: string; heroImage?: string }) {
  if (heroImage) {
    return (
      <div className="cs-hero-image cs-hero-image--has-image">
        <img
          src={heroImage}
          alt={`${slug} hero`}
          className="cs-hero-image-img"
          style={{ objectFit: slug === 'surveyapp' ? 'contain' : 'cover' }}
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div className="cs-hero-image" aria-hidden="true">
      <ImageIcon size={32} className="cs-placeholder-icon" />
      {/* Replace with: <img src={`/images/${slug}-hero.png`} alt="..." /> */}
      <span>Replace with screenshot: /public/images/{slug}-hero.png</span>
    </div>
  )
}

// ── Video placeholder (Arrivalio only) ───────────────────────────────────────
function VideoPlaceholder({
  accentBorder,
  accent,
}: {
  accentBorder: string
  accent: string
}) {
  return (
    <div className="cs-video-placeholder">
      <div className="cs-video-play" style={{ borderColor: accentBorder, color: accent }}>
        <Play size={36} fill="currentColor" />
      </div>
      <p className="cs-video-label">Video coming soon</p>
    </div>
  )
}

// ── The template ─────────────────────────────────────────────────────────────
export function CaseStudyPage({ data }: { data: CaseStudyData }) {
  const {
    slug,
    title,
    oneliner,
    tags,
    accentRgb,
    liveUrl,
    repoUrl,
    hasVideo,
    heroImage,
    hideHeroImage,
    screenshots,
    overview,
    processIntro,
    processScreenshots,
    steps,
    keyDecisions,
    result,
    note,
    prevProject,
    nextProject,
  } = data

  const accent = `rgba(${accentRgb}, 1)`
  const accentFaint = `rgba(${accentRgb}, 0.07)`
  const accentBorder = `rgba(${accentRgb}, 0.25)`
  const accentDot = `rgba(${accentRgb}, 0.5)`

  // ── Mobile carousel for process steps ─────────────────────────────────────
  const stepsRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  const handleStepsScroll = useCallback(() => {
    const el = stepsRef.current
    if (!el) return
    const items = el.querySelectorAll<HTMLElement>('.cs-step-wrapper')
    if (!items.length) return
    const containerLeft = el.getBoundingClientRect().left
    let closest = 0
    let minDist = Infinity
    items.forEach((item, i) => {
      const dist = Math.abs(item.getBoundingClientRect().left - containerLeft)
      if (dist < minDist) { minDist = dist; closest = i }
    })
    setActiveStep(closest)
  }, [])

  const scrollToStep = useCallback((i: number) => {
    const el = stepsRef.current
    if (!el) return
    const items = el.querySelectorAll<HTMLElement>('.cs-step-wrapper')
    if (items[i]) {
      el.scrollTo({ left: (items[i] as HTMLElement).offsetLeft, behavior: 'smooth' })
    }
  }, [])

  // Preload images for better perceived performance
  useEffect(() => {
    const imagesToPreload: string[] = []
    
    if (heroImage) imagesToPreload.push(heroImage)
    if (screenshots) {
      screenshots.forEach(s => imagesToPreload.push(s.src))
    }
    if (processScreenshots) {
      processScreenshots.forEach(s => imagesToPreload.push(s.src))
    }
    
    if (imagesToPreload.length > 0) {
      preloadImages(imagesToPreload).catch(() => {
        // Preloading failed, but images will still load on demand
      })
    }
  }, [heroImage, screenshots, processScreenshots])

  return (
    <main
      className="cs-main"
      style={
        {
          '--cs-accent': accent,
          '--cs-accent-faint': accentFaint,
          '--cs-accent-border': accentBorder,
        } as React.CSSProperties
      }
    >
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="cs-hero">
        <div className="container">
          <Link to="/projects" className="cs-back-link">
            <ArrowLeft size={16} />
            Back to all projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: 'transform' }}
          >
            <div className="section-eyebrow">Case Study</div>
            <h1 className="cs-hero-title">{title}</h1>
            <p className="cs-hero-desc">{oneliner}</p>
            <div className="cs-hero-tags">
              {tags.map((t) => (
                <span key={t} className="project-tag cs-tag">{t}</span>
              ))}
            </div>

            {(liveUrl || repoUrl) && (
              <div className="cs-hero-links">
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`cs-hero-link${liveUrl === '#' ? ' cs-hero-link--disabled' : ''}`}
                    aria-disabled={liveUrl === '#'}
                    onClick={liveUrl === '#' ? (e) => e.preventDefault() : undefined}
                  >
                    <ExternalLink size={14} />
                    Live site
                  </a>
                )}
                {repoUrl && (
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`cs-hero-link${repoUrl === '#' ? ' cs-hero-link--disabled' : ''}`}
                    aria-disabled={repoUrl === '#'}
                    onClick={repoUrl === '#' ? (e) => e.preventDefault() : undefined}
                  >
                    <Github size={14} />
                    GitHub
                  </a>
                )}
              </div>
            )}
          </motion.div>

          {/* Video first (Arrivalio only), then hero image */}
          {hasVideo && (
            <FadeIn delay={0.1}>
              <VideoPlaceholder accentBorder={accentBorder} accent={accent} />
            </FadeIn>
          )}

          {!hideHeroImage && (
            <FadeIn delay={hasVideo ? 0.18 : 0.15}>
              <HeroImagePlaceholder slug={slug} heroImage={heroImage} />
            </FadeIn>
          )}
        </div>
      </section>

      {/* ── SCREENSHOT GALLERY ────────────────────────────────────────────── */}
      {screenshots && screenshots.length > 0 && (
        <section className="cs-gallery-section">
          <div className="container">
            <FadeIn>
              <div className="section-eyebrow">Screenshots</div>
              <ScreenshotGallery
                screenshots={screenshots}
                accent={accent}
                accentBorder={accentBorder}
              />
            </FadeIn>
          </div>
        </section>
      )}

      {/* ── OVERVIEW ──────────────────────────────────────────────────────── */}
      <section className="cs-section">
        <div className="container cs-two-col">
          <FadeIn>
            <div className="section-eyebrow">Overview</div>
            <h2 className="cs-section-title">What this project is</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="cs-body-stack">
              {overview.map((para, i) => (
                <p key={i} className="cs-body-text">{para}</p>
              ))}
              {note && (
                <div className="cs-note">
                  <Info size={14} style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{note}</span>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── TIMELINE / PROCESS ────────────────────────────────────────────── */}
      <section className="cs-section">
        <div className="container">
          <FadeIn>
            <div className="section-eyebrow">Process</div>
            <h2 className="cs-section-title">How it came together</h2>
            {processIntro && (
              <p className="cs-process-intro">{processIntro}</p>
            )}
          </FadeIn>

          {/* Track: dots + step names connected by lines */}
          <FadeIn delay={0.05}>
            <div className="cs-stepper-track" role="list" aria-label="Process steps">
              {steps.map((step, i) => (
                <div key={i} className="cs-stepper-segment">
                  <div
                    className={`cs-stepper-dot${activeStep === i ? ' cs-stepper-dot--active' : ''}`}
                    style={{
                      borderColor: activeStep === i ? accent : accentDot,
                      color: activeStep === i ? accent : accentDot,
                      background: activeStep === i ? `rgba(${accentRgb}, 0.12)` : 'var(--bg)',
                    }}
                    role="listitem"
                    aria-label={`Step ${i + 1}: ${step.title}`}
                    onClick={() => scrollToStep(i)}
                  >
                    {i + 1}
                  </div>
                  <span className="cs-stepper-step-name">{step.title}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Step cards — grid on desktop, swipe carousel on mobile */}
          <div className="cs-steps-grid" ref={stepsRef} onScroll={handleStepsScroll}>
            {steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.05} className="cs-step-wrapper">
                <div className="cs-step">
                  <div className="cs-step-num" style={{ color: accent }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="cs-step-title">{step.title}</h3>
                  <p className="cs-step-detail">{step.detail}</p>
                  <ScreenshotPlaceholder screenshot={processScreenshots?.[i]} />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEY DECISIONS ─────────────────────────────────────────────────── */}
      <section className="cs-section">
        <div className="container cs-two-col">
          <FadeIn>
            <div className="section-eyebrow">Key Decisions</div>
            <h2 className="cs-section-title">Choices that shaped it</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="cs-body-stack">
              {keyDecisions.map((para, i) => (
                <p key={i} className="cs-body-text">{para}</p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── RESULT ────────────────────────────────────────────────────────── */}
      <section className="cs-section">
        <div className="container cs-two-col">
          <FadeIn>
            <div className="section-eyebrow">Outcome</div>
            <h2 className="cs-section-title">What I built & learned</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="cs-body-stack">
              {result.map((para, i) => (
                <p key={i} className="cs-body-text">{para}</p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── NAVIGATION ────────────────────────────────────────────────────── */}
      <section className="cs-nav-section">
        <div className="container cs-nav-inner">
          {prevProject && (
            <Link to={`/projects/${prevProject.slug}`} className="cs-nav-link">
              <ArrowLeft size={16} />
              Back: {prevProject.title}
            </Link>
          )}
          {nextProject && (
            <Link to={`/projects/${nextProject.slug}`} className="cs-nav-link cs-nav-next">
              Next: {nextProject.title}
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </section>

      <footer className="footer">
        <span className="footer-logo">VK</span>
        <span className="footer-copy">
          © {new Date().getFullYear()} — Built with React & GSAP
        </span>
      </footer>
    </main>
  )
}
