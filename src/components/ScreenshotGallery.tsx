import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react'
import { lenis } from '../App'

export type Screenshot = {
  /** Display label shown on the placeholder card */
  label: string
  /**
   * Path to the actual image file once you're ready to swap in real screenshots.
   * Example: "/images/arrivalio-screen-1.png"
   * Place the file at: /public/images/arrivalio-screen-1.png
   */
  src: string
}

interface ScreenshotGalleryProps {
  screenshots: Screenshot[]
  accent: string
  accentBorder: string
}

export function ScreenshotGallery({ screenshots, accent, accentBorder }: ScreenshotGalleryProps) {
  const [active, setActive] = useState<number | null>(null)
  const [failed, setFailed] = useState<Record<number, boolean>>({})
  const [carouselIdx, setCarouselIdx] = useState(0)
  const touchStartX = useRef(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const count = screenshots.length

  const close = useCallback(() => setActive(null), [])

  const goPrev = useCallback(() =>
    setActive((i) => (i !== null ? (i - 1 + count) % count : null)), [count])

  const goNext = useCallback(() =>
    setActive((i) => (i !== null ? (i + 1) % count : null)), [count])

  // Track which slide is snapped into view
  const handleCarouselScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const items = el.querySelectorAll<HTMLElement>('.sg-thumb')
    if (!items.length) return
    const containerLeft = el.getBoundingClientRect().left
    let closest = 0
    let minDist = Infinity
    items.forEach((item, i) => {
      const dist = Math.abs(item.getBoundingClientRect().left - containerLeft)
      if (dist < minDist) { minDist = dist; closest = i }
    })
    setCarouselIdx(closest)
  }, [])

  // Scroll carousel to a specific slide
  const scrollToSlide = useCallback((i: number) => {
    const el = scrollRef.current
    if (!el) return
    const items = el.querySelectorAll<HTMLElement>('.sg-thumb')
    if (items[i]) {
      el.scrollTo({ left: (items[i] as HTMLElement).offsetLeft, behavior: 'smooth' })
    }
  }, [])

  // Keyboard: Escape / ArrowLeft / ArrowRight
  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      close()
      if (e.key === 'ArrowLeft')   goPrev()
      if (e.key === 'ArrowRight')  goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, close, goPrev, goNext])

  // Scroll lock — stop Lenis + lock <html> overflow so nothing scrolls behind
  useEffect(() => {
    if (active !== null) {
      lenis?.stop()
      document.documentElement.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.documentElement.style.overflow = ''
    }
    return () => {
      lenis?.start()
      document.documentElement.style.overflow = ''
    }
  }, [active])

  useEffect(() => {
    setFailed({})
  }, [screenshots])

  // ── Lightbox (rendered via portal so z-index is never clipped by parent) ──
  const portal = (
    <AnimatePresence>
      {active !== null && (
        // Dark overlay — clicking it closes the lightbox
        <motion.div
          className="sg-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${active + 1} of ${count}: ${screenshots[active].label}`}
        >
          {/* Prev arrow */}
          <button
            className="sg-nav sg-nav--prev"
            style={{ color: accent, borderColor: accentBorder }}
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image box — stopPropagation so clicking it doesn't close */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="sg-lightbox"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              // Touch/swipe: left = next, right = prev
              onTouchStart={(e) => { touchStartX.current = e.changedTouches[0].clientX }}
              onTouchEnd={(e) => {
                const delta = touchStartX.current - e.changedTouches[0].clientX
                if (Math.abs(delta) > 48) delta > 0 ? goNext() : goPrev()
              }}
            >
              {screenshots[active].src && !failed[active] ? (
                <img
                  src={screenshots[active].src}
                  alt={screenshots[active].label}
                  className="sg-lightbox-img"
                  onError={() => setFailed((prev) => ({ ...prev, [active]: true }))}
                />
              ) : (
                <div className="sg-lightbox-placeholder">
                  <ImageIcon size={28} className="sg-icon" />
                  <span className="sg-thumb-label">{screenshots[active].label}</span>
                  <span className="sg-thumb-path">
                    {screenshots[active].src || 'Empty slot'}
                  </span>
                </div>
              )}

              {/* X close button */}
              <button
                className="sg-close"
                style={{ color: accent, borderColor: accentBorder }}
                onClick={close}
                aria-label="Close preview"
              >
                <X size={15} />
              </button>

              {/* Image counter */}
              <div className="sg-counter">{active + 1} / {count}</div>
            </motion.div>
          </AnimatePresence>

          {/* Next arrow */}
          <button
            className="sg-nav sg-nav--next"
            style={{ color: accent, borderColor: accentBorder }}
            onClick={(e) => { e.stopPropagation(); goNext() }}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      {/* ── Thumbnail grid / mobile swipe carousel ──────────────────────────── */}
      <div
        className="sg-grid"
        ref={scrollRef}
        onScroll={handleCarouselScroll}
      >
        {screenshots.map((shot, i) => (
          <button
            key={i}
            className="sg-thumb"
            onClick={() => setActive(i)}
            aria-label={`View ${shot.label} fullscreen`}
          >
            {shot.src && !failed[i] ? (
              <img
                src={shot.src}
                alt={shot.label}
                className="sg-thumb-img"
                loading="lazy"
                onError={() => setFailed((prev) => ({ ...prev, [i]: true }))}
              />
            ) : (
              <div className="sg-thumb-inner">
                <ImageIcon size={18} className="sg-icon" />
                <span className="sg-thumb-label">{shot.label}</span>
                <span className="sg-thumb-path">{shot.src || 'Empty slot'}</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Dot indicators — visible on mobile only (hidden via CSS on desktop) */}
      {count > 1 && (
        <div className="sg-dots" aria-hidden="true">
          {screenshots.map((_, i) => (
            <button
              key={i}
              className={`sg-dot${i === carouselIdx ? ' sg-dot--active' : ''}`}
              onClick={() => scrollToSlide(i)}
              style={i === carouselIdx ? { background: accent } : undefined}
            />
          ))}
        </div>
      )}

      {/* Portal renders lightbox directly on <body> — no z-index clipping */}
      {createPortal(portal, document.body)}
    </>
  )
}
