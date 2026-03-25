import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LightRays from '../components/ui/LightRays'
import { projects } from '../data/projects'
import { FadeIn } from '../components/FadeIn'

gsap.registerPlugin(ScrollTrigger)

// ── Palettes for card preview mockups ─────────────────────────────────────
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

// ── Animation variants ─────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1 },
  }),
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

// ── Component ──────────────────────────────────────────────────────────────
export function HomePage() {
  useEffect(() => {
    // Word reveal
    const wordTargets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-word-reveal]'),
    )
    wordTargets.forEach((el) => {
      if (el.dataset.wordRevealReady === 'true') return
      const words = (el.textContent ?? '').trim().split(/\s+/)
      el.innerHTML = words
        .map((w) => `<span class="reveal-word"><span class="reveal-word-inner">${w}</span></span>`)
        .join(' ')
      el.dataset.wordRevealReady = 'true'
      gsap.fromTo(
        el.querySelectorAll('.reveal-word-inner'),
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.04, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 86%', end: 'bottom 62%', scrub: 0.4 },
        },
      )
    })

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()) }
  }, [])

  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="hero-section" id="hero">
        <div className="top-light-strip" aria-hidden="true">
          <LightRays
            raysOrigin="top-center"
            raysColor="#F1F1FF"
            raysSpeed={0.6}
            lightSpread={2.2}
            rayLength={1.8}
            followMouse
            mouseInfluence={0.08}
            noiseAmount={0}
            distortion={0}
            className="custom-rays"
            pulsating={false}
            fadeDistance={1.1}
            saturation={1.8}
          />
        </div>

        <motion.div
          className="hero-content"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} className="hero-eyebrow">
            <span className="hero-dot" />
            Available for work
          </motion.div>

          <motion.h1 variants={fadeUp} className="hero-title">
            I build interfaces<br />
            that <em>feel right</em>
          </motion.h1>

          <motion.p variants={fadeUp} className="hero-sub">
            Frontend and fullstack developer focused on clean architecture,
            thoughtful motion, and interfaces that are both functional and
            delightful to use.
          </motion.p>

          <motion.div variants={fadeUp} className="hero-actions">
            <Link to="/projects" className="btn btn-primary">
              View Projects <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Get in touch
            </Link>
          </motion.div>
        </motion.div>

        <div className="hero-scroll-hint" aria-hidden="true">
          <span className="hero-scroll-line" />
          <span className="hero-scroll-label">Scroll</span>
        </div>
      </section>

      {/* ── ABOUT PREVIEW ────────────────────────────────────────────── */}
      <section className="section" id="about">
        <FadeIn>
        <div className="about-preview">
          {/* Left: intro + bio */}
          <div className="about-preview-left">
            <div>
              <div className="section-eyebrow">About me</div>
              <h2 className="about-preview-name" style={{ marginTop: 20 }}>
                Vladislav Kovalenko<br /><em>Full-Stack</em><br />Developer
              </h2>
            </div>

            <div>
              <p className="about-preview-bio">
                Final-year FDIT student at KPU, originally from Kazakhstan.
                I build thoughtful web interfaces where clarity, layout, and
                interaction work together — not just functional, but intentional.
              </p>
              <div style={{ marginTop: 28 }}>
                <Link to="/about" className="btn btn-secondary" style={{ display: 'inline-flex' }}>
                  Learn more <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Right: stats + skills */}
          <div className="about-preview-right">
            <div className="about-preview-right-top">
              <div className="about-stat-label">Skills & tools</div>
              <div className="about-skill-list">
                {['Figma', 'HTML / CSS / JavaScript', 'React + TypeScript', 'GSAP + Tailwind CSS', 'Jira'].map((s) => (
                  <div key={s} className="about-skill-row">
                    <span className="about-skill-dot" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
              <div className="about-tags-row" style={{ marginTop: 8 }}>
                {['Frontend', 'Mobile First', 'Motion', 'UX Clarity'].map((t) => (
                  <span key={t} className="about-tag">{t}</span>
                ))}
              </div>
            </div>

            <div className="about-preview-right-bottom">
              <div>
                <div className="about-stat-label">Currently at</div>
                <div className="about-stat-value">KPU</div>
              </div>
              <div>
                <div className="about-stat-label">Status</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                  <span className="hero-dot" />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text)' }}>Open to opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </FadeIn>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────── */}
      <section className="section" id="projects">
        <FadeIn>
          <div className="projects-header">
            <div className="projects-header-text">
              <div className="section-eyebrow">Selected Work</div>
              <h2 className="section-title" data-word-reveal>Projects I've built</h2>
              <p className="projects-subtitle">A selection of recent projects I've worked on</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
        <div className="projects-grid">
          {projects.map((project, i) => (
            <Link
              key={project.title}
              to={`/projects/${project.slug ?? 'project'}`}
              className="project-card"
            >
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
                  {project.tags.slice(0, 3).map((t) => (
                    <span key={t} className="project-tag">{t}</span>
                  ))}
                </div>
              </div>
              <div className="project-card-footer">
                <span className="project-link-arrow">View project <ArrowRight size={14} /></span>
              </div>
            </Link>
          ))}
        </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="projects-cta">
            <Link to="/projects" className="btn btn-secondary">
              View all projects →
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────── */}
      <section className="section" id="contact">
        <div className="contact-layout">
          {/* Form */}
          <div>
            <FadeIn>
              <div className="contact-heading-block">
                <div className="section-eyebrow">Let's work together</div>
                <h2 className="section-title">Have a project<br />in mind?</h2>
                <p className="section-desc" style={{ marginTop: 12 }}>
                  I'm open to freelance projects, internships, and full-time roles.
                  Drop me a message and let's talk.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
            <form
              className="contact-form"
              action="https://formsubmit.co/vladworktime@gmail.com"
              method="POST"
            >
              <input type="hidden" name="_subject" value="Portfolio contact form (Home)" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" className="form-input" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" className="form-input" placeholder="your@email.com" required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="message">Project idea</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder="Tell me about your project, idea, or what you need help with..."
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary form-submit">
                Send message <ArrowRight size={16} />
              </button>
            </form>
            </FadeIn>
          </div>

          {/* Contact info */}
          <FadeIn delay={0.15}>
          <div className="contact-info">
            <div>
              <p className="contact-info-heading">Or reach me directly</p>
              <div className="contact-info-links">
                <a href="mailto:vladworktime@gmail.com" className="contact-info-link">
                  <Mail size={18} />
                  vladworktime@gmail.com
                </a>
                <a href="https://github.com/kidlav" target="_blank" rel="noreferrer" className="contact-info-link">
                  <Github size={18} />
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/vlad03/" target="_blank" rel="noreferrer" className="contact-info-link">
                  <Linkedin size={18} />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="footer">
        <span className="footer-logo">VK</span>
        <span className="footer-copy">© {new Date().getFullYear()} — Built with React & GSAP</span>
      </footer>
    </main>
  )
}
