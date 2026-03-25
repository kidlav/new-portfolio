import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import Lenis from 'lenis'
import { NavbarDemo } from './components/NavbarDemo'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { ContactPage } from './pages/ContactPage'
import { CaseStudyRouter } from './pages/CaseStudyRouter'

// Shared Lenis instance — pages can import this to call scrollTo if needed
export let lenis: Lenis | null = null

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '')

      let tries = 0
      const maxTries = 120

      const scrollToHashTarget = () => {
        const target = document.getElementById(targetId)

        if (target) {
          if (lenis) {
            lenis.scrollTo(target, { offset: -20 })
          } else {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
          return
        }

        tries += 1
        if (tries < maxTries) {
          window.setTimeout(scrollToHashTarget, 40)
        }
      }

      scrollToHashTarget()

      return
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = () => {
    if (lenis) {
      lenis.scrollTo(0)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <button
      type="button"
      className={`scroll-top-btn ${isVisible ? 'is-visible' : ''}`}
      onClick={handleClick}
      aria-label="Scroll to top"
    >
      <ArrowUp size={18} />
    </button>
  )
}

function App() {
  const rafRef = useRef<number>(0)

  useEffect(() => {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis!.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafRef.current)
      lenis!.destroy()
      lenis = null
    }
  }, [])

  return (
    <>
      <div className="site-top-highlight" aria-hidden="true" />
      <NavbarDemo />
      <ScrollToTop />
      <ScrollToTopButton />
      {/* Gradient fade below navbar so content doesn't bleed into it */}
      <div className="nav-top-fade" aria-hidden="true" />
      <div className="page-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<CaseStudyRouter />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
