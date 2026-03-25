import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav className={`nav-wrapper${scrolled ? ' scrolled' : ''}`} aria-label="Main navigation">
        <div className="nav-inner">
          <Link to="/" className="nav-logo">VK</Link>

          <ul className="nav-links">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/projects">Projects</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
          </ul>

          <div className="nav-cta">
            <Link to="/contact" className="nav-cta-btn">
              Get in touch
            </Link>
          </div>

          <button
            className={`nav-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div className={`nav-mobile-menu${menuOpen ? ' open' : ''}`} role="dialog" aria-modal="true">
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <div className="nav-mobile-cta">
          <Link to="/contact" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
            Get in touch
          </Link>
        </div>
      </div>
    </>
  )
}
