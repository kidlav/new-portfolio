import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'

export function ContactPage() {
  return (
    <main>
      <div className="section contact-hero-section">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: 'transform' }}
        >
          <div className="section-eyebrow">Contact</div>
          <h1 className="section-title" style={{ maxWidth: '18ch' }}>
            Let's build something<br />great together
          </h1>
          <p className="section-desc" style={{ marginTop: 16 }}>
            Whether you have a project in mind, want to collaborate, or just want to say hi —
            I'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          className="contact-layout"
          style={{ marginTop: 64, willChange: 'transform' }}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          {/* Form */}
          <form
            className="contact-form"
            action="https://formsubmit.co/vladworktime@gmail.com"
            method="POST"
          >
            <input type="hidden" name="_subject" value="Portfolio contact form (Contact page)" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="cp-name">Name</label>
                <input id="cp-name" name="name" type="text" className="form-input" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="cp-email">Email</label>
                <input id="cp-email" name="email" type="email" className="form-input" placeholder="your@email.com" required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="cp-message">Project idea</label>
              <textarea
                id="cp-message"
                name="message"
                className="form-textarea"
                placeholder="Tell me about your project, idea, or what you need help with..."
                style={{ minHeight: 180 }}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary form-submit">
              Send message <ArrowRight size={16} />
            </button>
          </form>

          {/* Contact info */}
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

            <div style={{ padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', background: 'rgba(139,92,246,0.05)' }}>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                I typically respond within 24 hours. If you have a tight deadline,
                mention it in your message and I'll prioritise accordingly.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <footer className="footer">
        <span className="footer-logo">VK</span>
        <span className="footer-copy">© {new Date().getFullYear()} — Built with React & GSAP</span>
      </footer>
    </main>
  )
}
