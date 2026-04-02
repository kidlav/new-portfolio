import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Linkedin } from 'lucide-react'

const skills = [
  'Figma',
  'HTML / CSS / JavaScript',
  'React',
  'TypeScript',
  'GSAP',
  'Tailwind CSS',
  'Jira',
]

const aiTools = [
  { name: 'Claude', desc: 'AI-assisted coding, writing, problem-solving' },
  { name: 'ChatGPT', desc: 'Research, brainstorming, content drafting' },
  { name: 'Figma Make', desc: 'AI-powered design-to-code workflow' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08 },
  }),
}

export function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <div className="section about-hero-section" style={{ paddingBottom: 64, textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{ willChange: 'transform' }}
        >
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>About me</div>
          <h1 className="section-title">
            Design + code,<br />working as one system
          </h1>
          <p className="section-desc" style={{ margin: '20px auto 0', textAlign: 'center' }}>
            Design. Structure. Interaction.
          </p>
        </motion.div>
      </div>

      {/* Body */}
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="about-page-body">
          {/* Sidebar */}
          <motion.div
            className="about-page-sidebar"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            style={{ willChange: 'transform' }}
          >
            <div className="about-avatar-box">
              <img
                src="/Adobe Express - file.png"
                alt="Vladislav Kovalenko"
                className="about-avatar-img"
              />
            </div>

            <div className="about-sidebar-links">
              <a
                href="/Master%20Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{ justifyContent: 'center' }}
              >
                View Resume (PDF)
              </a>
              <a
                href="https://www.linkedin.com/in/vlad03/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
                style={{ justifyContent: 'center' }}
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
              <Link
                to="/contact"
                className="btn btn-secondary"
                style={{ justifyContent: 'center' }}
              >
                Get in touch <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="about-page-content"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{ willChange: 'transform' }}
          >
            <div className="about-content-block">
              <h3>Who I am</h3>
              <p>
                Vladislav Kovalenko — Full-Stack Developer. I'm a final-year student in the
                Front-End Web Development (FDIT) program at Kwantlen Polytechnic University (KPU),
                originally from Kazakhstan. I moved to Canada as an international student, and over
                the past few years I found my place at the intersection of design and code.
              </p>
              <p>
                I care about building web experiences that are not just functional, but thoughtful
                — the kind of interfaces where everything feels like it belongs exactly where it is,
                and every interaction tells a story.
              </p>
            </div>

            <div className="about-content-block">
              <h3>How I work</h3>
              <p>
                I approach every project as a full process, not just coding. It always starts with
                understanding the problem — who is this for, what do they need, and what would make
                their experience easier. From there I move into low-fidelity wireframes to explore
                different directions, then refine the best ideas into high-fidelity designs in Figma
                before writing a single line of code.
              </p>
              <p>
                For me, design and development are not separate steps — they are part of the same
                system. I go back and forth between them, testing and adjusting as I go. I also
                actively use AI tools throughout my workflow — not as a shortcut, but as a way to
                move faster while keeping full control over the result.
              </p>
            </div>

            <div className="about-content-block">
              <h3>What I build</h3>
              <p>
                I work on frontend interfaces and interactive web experiences. I'm drawn to projects
                where layout, interaction, and clarity matter — where the structure of the interface
                is just as important as what it does.
              </p>
              <p>
                Whether it is a guided app for newcomers, a data dashboard, or a custom survey tool,
                I enjoy turning complex problems into clean, usable solutions.
              </p>
            </div>

            <div className="about-content-block">
              <h3>Skills & tools</h3>
              <div className="skills-grid">
                {skills.map((skill) => (
                  <div key={skill} className="skill-item">
                    <span className="skill-dot" />
                    {skill}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 24 }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12 }}>
                  AI tools
                </p>
                <div className="skills-grid">
                  {aiTools.map((tool) => (
                    <div key={tool.name} className="skill-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 4, padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className="skill-dot" style={{ background: 'var(--accent-light)' }} />
                        <span style={{ fontWeight: 600 }}>{tool.name}</span>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.5, paddingLeft: 14 }}>{tool.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="about-content-block">
              <h3>Currently</h3>
              <p>
                Looking for frontend or fullstack roles where I can contribute to a product I believe
                in, work with a team that values craft, and keep growing as a developer. Open to
                internships, co-ops, and junior positions.
              </p>
              <div style={{ marginTop: 20 }}>
                <Link to="/projects" className="btn btn-secondary">
                  See my work <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="footer">
        <span className="footer-logo">VK</span>
        <span className="footer-copy">© {new Date().getFullYear()} — Built with React & GSAP</span>
      </footer>
    </main>
  )
}
