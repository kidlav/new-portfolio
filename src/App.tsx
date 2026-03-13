import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { Github, Mail } from 'lucide-react'
import { NavbarDemo } from './components/NavbarDemo'
import { SectionHeading } from './components/SectionHeading'
import { HeroSection } from './components/HeroSection'
import { ScrollShowcase } from './components/ScrollShowcase'
import LightRays from './components/ui/LightRays'
import { HoverBorderGradient } from './components/ui/hover-border-gradient'
import { projects } from './data/projects'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

function App() {
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1,
      effects: true,
    })

    const splitWords = (element: HTMLElement) => {
      if (element.dataset.wordRevealReady === 'true') {
        return
      }

      const text = element.textContent?.trim()

      if (!text) {
        return
      }

      const words = text.split(/\s+/)
      element.innerHTML = words
        .map(
          (word) =>
            `<span class="reveal-word"><span class="reveal-word-inner">${word}</span></span>`,
        )
        .join(' ')

      element.dataset.wordRevealReady = 'true'
    }

    const wordTargets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-word-reveal]'),
    )

    wordTargets.forEach(splitWords)

    wordTargets.forEach((element) => {
      const words = element.querySelectorAll<HTMLElement>('.reveal-word-inner')

      gsap.fromTo(
        words,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.04,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 84%',
            end: 'bottom 68%',
            scrub: 0.35,
          },
        },
      )
    })

    const revealSections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal-section]'),
    )

    revealSections.forEach((section) => {
      const items = section.querySelectorAll<HTMLElement>('[data-reveal-item]')

      if (!items.length) {
        return
      }

      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.14,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            once: true,
          },
        },
      )
    })

    const heroLight = document.querySelector<HTMLElement>('.top-light-strip')
    const heroSection = document.querySelector<HTMLElement>('#hero')

    if (heroLight && heroSection) {
      gsap.fromTo(
        heroLight,
        { opacity: 0.95 },
        {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        },
      )
    }

    // ── Scroll Showcase pinned timeline ─────────────────────────────────────
    const showcaseSection = document.querySelector<HTMLElement>('[data-showcase]')

    if (showcaseSection) {
      const heading    = showcaseSection.querySelector<HTMLElement>('[data-showcase-heading]')
      const image      = showcaseSection.querySelector<HTMLElement>('[data-showcase-image]')
      const cmpSlider  = image!.querySelector<HTMLElement>('[data-cmp-slider]')
      const cmpStaticR = image!.querySelector<HTMLElement>('[data-cmp-static-r]')
      const cmpStaticL = image!.querySelector<HTMLElement>('[data-cmp-static-l]')
      const textLeft   = showcaseSection.querySelector<HTMLElement>('[data-showcase-text="left"]')
      const textRight  = showcaseSection.querySelector<HTMLElement>('[data-showcase-text="right"]')
      const dots       = Array.from(showcaseSection.querySelectorAll<HTMLElement>('[data-progress-dot]'))
      const card2    = showcaseSection.querySelector<HTMLElement>('[data-pg-card-2]')
      const card3    = showcaseSection.querySelector<HTMLElement>('[data-pg-card-3]')
      const pgTitle  = showcaseSection.querySelector<HTMLElement>('[data-pg-title]')

      // Image centered via xPercent/yPercent. Each state has its own y — adjust independently:
      //   imgY0 = initial center position (positive = lower, negative = higher)
      //   imgY1 = scale-up position (should be slightly above imgY0 — ~30px up)
      //   imgY2 = right-side position (lower, shown with left text)
      //   imgY3 = left-side position (higher, shown with right text)
      const VH = window.innerHeight / 100
      const imgY0 =  VH * 10    // initial: 10vh below viewport center
      const imgY1 =  VH *  2    // scale-up: 2vh below center (~30px up from imgY0)
      const imgY2 =  VH * 13    // right state: 10vh below center
      const imgY3 = -VH *  8    // left state: 8vh above center

      // Text panels have their own independent y values — adjust separately from images:
      //   txtY2 = left text vertical position (accompanies right-side image)
      //   txtY3 = right text vertical position (accompanies left-side image)
      const txtY2 =  VH * -6    // left text: 10vh below center
      const txtY3 = -VH *  -8    // right text: 8vh above center

      // Card grid layout — computed once for the projects transition
      const imgNaturalW = Math.min(window.innerWidth * 0.48, 620)
      const cardScale   = 0.54
      const cardW       = imgNaturalW * cardScale
      const cardGap     = Math.max(20, window.innerWidth * 0.018)
      const pos1X       = -(cardW + cardGap)  // leftmost card (card-1) center
      const pos3X       = cardW + cardGap     // rightmost card (card-3) center
      const cardY       = VH * 5              // 5vh below viewport center

      gsap.set(image,      { xPercent: -50, yPercent: -50, y: imgY0 })
      gsap.set(heading,    { opacity: 0, y: 30 })          // hidden until section enters
      // Static layers hidden until needed
      gsap.set(cmpStaticR, { opacity: 0 })
      gsap.set(cmpStaticL, { opacity: 0 })
      // Text panels positioned independently
      gsap.set(textLeft,   { opacity: 0, x: -50, y: txtY2 })
      gsap.set(textRight,  { opacity: 0, x:  50, y: txtY3 })
      // Stage cards and title — hidden until the projects transition
      if (card2) gsap.set(card2, { xPercent: -50, yPercent: -50, x: 0,    y: cardY + VH * 4, opacity: 0, scale: cardScale })
      if (card3) gsap.set(card3, { xPercent: -50, yPercent: -50, x: pos3X, y: cardY + VH * 4, opacity: 0, scale: cardScale })
      if (pgTitle) gsap.set(pgTitle, { y: VH * 4, opacity: 0 })

      // Showcase heading fades up as the section scrolls into view (before pin activates)
      gsap.to(heading, {
        opacity: 1, y: 0, ease: 'power2.out',
        scrollTrigger: {
          trigger: showcaseSection,
          start: 'top 60%',
          end: 'top 5%',
          scrub: 0.6,
        },
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: showcaseSection,
          start: 'top top',
          end: '+=1280%',
          pin: true,
          scrub: 1.8,
          anticipatePin: 1,
        },
      })

      // ── Rhythm: each hold ≈ 1.2 units, each transition ≈ 1.2 units ─────────
      // Total timeline ≈ 11.5 units → end: +=1000% (≈87% of viewport per unit)

      // Phase 0 (0→0.6) — heading fades out upward
      tl.to(heading, { opacity: 0, y: -40, ease: 'power1.in', duration: 0.6 }, 0)

      // hold ── 0→1.2  (center comparison image fully visible)

      // Phase 1a (0.9→1.2) — image scales up, brief prep before transition
      tl.to(image, { scale: 1.18, y: imgY1, duration: 0.3 }, 0.9)

      // Phase 1b (1.2→2.4) — image moves RIGHT+DOWN; slider → staticR
      tl.to(image,      { scale: 0.64, x: () => window.innerWidth * 0.22, y: imgY2, ease: 'power3.inOut', duration: 1.2 }, 1.2)
      tl.to(cmpSlider,  { opacity: 0, duration: 0.4 }, 1.2)
      tl.to(cmpStaticR, { opacity: 1, duration: 0.4 }, 1.2)

      // Phase 1c (2.0→2.7) — left text slides in as image settles
      tl.to(textLeft, { opacity: 1, x: 0, ease: 'power2.out', duration: 0.7 }, 2.0)

      // hold ── 2.7→3.9  (state 1: right image + left text, 1.2 units)

      // Phase 2a (3.9→4.2) — left text exits
      tl.to(textLeft, { opacity: 0, x: -36, duration: 0.3 }, 3.9)

      // Phase 2c (4.1→5.3) — image moves LEFT+UP; staticR → staticL
      tl.to(cmpStaticR, { opacity: 0, duration: 0.35 }, 4.1)
      tl.to(cmpStaticL, { opacity: 1, duration: 0.35 }, 4.1)
      tl.to(image, { x: () => -window.innerWidth * 0.22, y: imgY3, ease: 'power3.inOut', duration: 1.2 }, 4.1)

      // Phase 2d (5.0→5.7) — right text slides in as image settles
      tl.to(textRight, { opacity: 1, x: 0, ease: 'power2.out', duration: 0.7 }, 5.0)

      // hold ── 5.7→6.9  (state 2: left image + right text, 1.2 units)

      // Phase 3-exit (6.9→7.2) — text + dots fade; layer swap back to project 0
      tl.to(textRight,  { opacity: 0, y: -20, ease: 'power2.in', duration: 0.3 }, 6.9)
      tl.to(cmpStaticL, { opacity: 0, duration: 0.25 }, 7.0)
      tl.to(cmpStaticR, { opacity: 1, duration: 0.25 }, 7.0)

      // Phase 4 (7.2→8.5) — image shrinks to card scale, sweeps RIGHT (staging)
      tl.to(image, { scale: cardScale, x: pos3X, y: cardY, ease: 'power3.inOut', duration: 1.3 }, 7.2)

      // hold ── 8.5→9.1  (card rests on right briefly, 0.6 units)

      // Phase 5 (9.1→10.2) — card sweeps LEFT to card-1 final position
      tl.to(image, { x: pos1X, ease: 'power3.inOut', duration: 1.1 }, 9.1)

      // Phase 6a (9.6→10.3) — right card (card-3) rises in as image passes center
      if (card3) tl.to(card3, { opacity: 1, y: cardY, ease: 'power3.out', duration: 0.7 }, 9.6)

      // Phase 6b (10.2→10.9) — center card (card-2) rises in once image reaches left position
      if (card2) tl.to(card2, { opacity: 1, y: cardY, ease: 'power3.out', duration: 0.7 }, 10.2)

      // Phase 7 (10.8→11.4) — "Projects" title fades in, aligned with section heading height
      if (pgTitle) tl.to(pgTitle, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.6 }, 10.8)

      // hold ── 11.4→14.0  (projects grid rests — user has time to read cards)
      tl.to({}, { duration: 2.6 }, 11.4)

      // Progress dots — fire at state-change boundaries
      if (dots.length >= 3) {
        tl.to(dots[0], { opacity: 0.3, duration: 0.25 }, 2.4)
        tl.to(dots[1], { opacity: 1,   duration: 0.25 }, 2.4)
        tl.to(dots[1], { opacity: 0.3, duration: 0.25 }, 5.0)
        tl.to(dots[2], { opacity: 1,   duration: 0.25 }, 5.0)
        // All dots disappear with the text
        tl.to(dots, { opacity: 0, duration: 0.25 }, 6.9)
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      smoother.kill()
    }
  }, [])

  return (
    <>
      <div className="site-top-highlight" aria-hidden="true" />
      <NavbarDemo />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="page-shell">
            <main>
              <section className="hero-section section" id="hero">
          <div className="top-light-strip" aria-hidden="true">
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffff"
              raysSpeed={.8}
              lightSpread={2}
              rayLength={2}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0}
              distortion={0}
              className="custom-rays"
              pulsating={false}
              fadeDistance={1}
              saturation={2}
            />
          </div>
          <HeroSection />
        </section>

        <ScrollShowcase projects={projects} />

        <section className="section about-section" id="about" data-reveal-section>
          <SectionHeading
            eyebrow="About me"
            title="I like building interfaces that communicate clearly before anyone reads the code"
            description="I care about hierarchy, motion, spacing, and implementation quality at the same time. That is why I prefer presenting projects holistically instead of splitting design and frontend into separate stories."
          />

          <div className="about-grid">
            <article className="about-card">
              <h3 data-reveal-item>What I bring</h3>
              <p data-reveal-item>
                React interfaces, scalable component systems, API integration,
                backend thinking, and visual decisions that support the product.
              </p>
            </article>

            <article className="about-card">
              <h3 data-reveal-item>How I present work</h3>
              <p data-reveal-item>
                As complete case studies: challenge, solution, visual direction,
                and shipped implementation. That makes your value much easier to
                understand quickly.
              </p>
            </article>

            <article className="about-card">
              <h3 data-reveal-item>What this site aims to do</h3>
              <p data-reveal-item>
                Create a strong first impression, then guide the viewer through
                projects with calm animations and a clear narrative.
              </p>
            </article>
          </div>
        </section>

        <section className="section contact-section" id="contact" data-reveal-section>
          <div className="contact-card">
            <span className="eyebrow" data-reveal-item>Contact</span>
            <h2 data-reveal-item>Looking for a frontend or full-stack developer?</h2>
            <p data-reveal-item>
              I can help shape the interface, build the system, and turn an idea
              into a polished product experience.
            </p>

            <div className="contact-actions" data-reveal-item>
              <HoverBorderGradient
                as="a"
                href="mailto:hello@example.com"
                variant="primary"
                containerClassName="hbg-container"
                className="hbg-inner"
              >
                <Mail size={18} />
                hello@example.com
              </HoverBorderGradient>
              <HoverBorderGradient
                as="a"
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                variant="secondary"
                containerClassName="hbg-container"
                className="hbg-inner"
              >
                <Github size={18} />
                GitHub profile
              </HoverBorderGradient>
            </div>
          </div>
        </section>
      </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
