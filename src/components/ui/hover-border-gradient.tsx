import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

type Direction = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'
const DIRS: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT']

interface HoverBorderGradientProps {
  as?: React.ElementType
  containerClassName?: string
  className?: string
  duration?: number
  clockwise?: boolean
  variant?: 'primary' | 'secondary'
  children?: React.ReactNode
  style?: React.CSSProperties
  [key: string]: unknown
}

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = 'button',
  duration = 1,
  clockwise = true,
  variant = 'primary',
  style,
  ...props
}: HoverBorderGradientProps) {
  const [hovered, setHovered] = useState(false)
  const [direction, setDirection] = useState<Direction>('TOP')

  const rotateDirection = useCallback(
    (current: Direction): Direction => {
      const idx = DIRS.indexOf(current)
      const next = clockwise
        ? (idx - 1 + DIRS.length) % DIRS.length
        : (idx + 1) % DIRS.length
      return DIRS[next]
    },
    [clockwise],
  )

  // Accent color (#9b8dff) used for secondary border
  const ACCENT = '#9b8dff'

  const movingMap: Record<Direction, string> = {
    TOP: 'radial-gradient(20.7% 50% at 50% 0%, hsl(0,0%,100%) 0%, rgba(255,255,255,0) 100%)',
    LEFT: 'radial-gradient(16.6% 43.1% at 0% 50%, hsl(0,0%,100%) 0%, rgba(255,255,255,0) 100%)',
    BOTTOM: 'radial-gradient(20.7% 50% at 50% 100%, hsl(0,0%,100%) 0%, rgba(255,255,255,0) 100%)',
    RIGHT: 'radial-gradient(16.2% 41.2% at 100% 50%, hsl(0,0%,100%) 0%, rgba(255,255,255,0) 100%)',
  }

  const highlight = 'radial-gradient(75% 181% at 50% 50%, #3275F8 0%, rgba(255,255,255,0) 100%)'

  // Secondary: static accent border, glows on hover
  const secondaryBorder = `radial-gradient(circle, ${ACCENT} 0%, ${ACCENT}88 50%, transparent 100%)`
  const secondaryHover = `radial-gradient(75% 181% at 50% 50%, ${ACCENT} 0%, rgba(155,141,255,0) 100%)`

  useEffect(() => {
    if (hovered) return
    const interval = setInterval(() => {
      setDirection((prev) => rotateDirection(prev))
    }, duration * 1000)
    return () => clearInterval(interval)
  }, [hovered, duration, rotateDirection])

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '9999px',
        padding: '1px',
        overflow: 'visible',
        cursor: 'pointer',
        border: variant === 'secondary' ? '1px solid rgba(155,141,255,0.35)' : '1px solid rgba(255,255,255,0.12)',
        background: 'rgba(0,0,0,0.2)',
        width: 'fit-content',
        ...style,
      }}
      className={containerClassName}
      {...props}
    >
      {/* Content — sits on top with explicit black bg */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          borderRadius: 'inherit',
          background: '#000',
        }}
        className={className}
      >
        {children}
      </div>

      {/* Animated gradient border layer */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: 'inherit',
          filter: 'blur(2px)',
          zIndex: 0,
        }}
        initial={{ background: variant === 'secondary' ? secondaryBorder : movingMap[direction] }}
        animate={{
          background: variant === 'secondary'
            ? (hovered ? secondaryHover : secondaryBorder)
            : (hovered ? [movingMap[direction], highlight] : movingMap[direction]),
        }}
        transition={{ ease: 'linear', duration }}
      />

      {/* Inner dark background — creates the 2px "border" gap */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '2px',
          borderRadius: '100px',
          background: '#000',
          zIndex: 1,
        }}
      />
    </Tag>
  )
}
