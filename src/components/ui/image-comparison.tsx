import { useState, useRef, useCallback, type ReactNode } from 'react'

interface ImageComparisonProps {
  /** The "before" visual — left side */
  before: ReactNode
  /** The "after" visual — right side */
  after: ReactNode
  /** Initial divider position as percentage 0–100 (default: 50) */
  initialPosition?: number
}

export function ImageComparison({ before, after, initialPosition = 50 }: ImageComparisonProps) {
  const [position, setPosition] = useState(initialPosition)
  const containerRef = useRef<HTMLDivElement>(null)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100))
    setPosition(pct)
  }, [])

  const startDrag = useCallback(
    (clientX: number) => {
      updatePosition(clientX)

      const onMove = (e: MouseEvent | TouchEvent) => {
        const x = 'touches' in e ? e.touches[0].clientX : e.clientX
        updatePosition(x)
      }
      const onUp = () => {
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('touchmove', onMove)
        window.removeEventListener('mouseup', onUp)
        window.removeEventListener('touchend', onUp)
      }

      window.addEventListener('mousemove', onMove)
      window.addEventListener('touchmove', onMove, { passive: true })
      window.addEventListener('mouseup', onUp)
      window.addEventListener('touchend', onUp)
    },
    [updatePosition],
  )

  return (
    <div ref={containerRef} className="img-cmp">
      {/* Back layer — "before" project (left side) */}
      <div className="img-cmp-layer img-cmp-before">{before}</div>

      {/* Front layer — "after" project (right side), clipped from left */}
      <div
        className="img-cmp-layer img-cmp-after"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        {after}
      </div>

      {/* Divider line + draggable handle */}
      <div className="img-cmp-divider" style={{ left: `${position}%` }}>
        <button
          className="img-cmp-handle"
          onMouseDown={(e) => {
            e.preventDefault()
            startDrag(e.clientX)
          }}
          onTouchStart={(e) => {
            startDrag(e.touches[0].clientX)
          }}
          aria-label="Drag to compare"
        >
          {/* Left chevron */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path
              d="M11 4L6 9L11 14"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* Right chevron */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path
              d="M7 4L12 9L7 14"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Label badges */}
        <span className="img-cmp-label img-cmp-label--left">01</span>
        <span className="img-cmp-label img-cmp-label--right">02</span>
      </div>
    </div>
  )
}
