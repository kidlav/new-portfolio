import { motion } from 'framer-motion'
import type { ReactNode, CSSProperties } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  style?: CSSProperties
  /** Pass data-* or other HTML attrs via extra */
  dataAttr?: Record<string, string>
}

export function FadeIn({
  children,
  delay = 0,
  y = 40,
  className,
  style,
  dataAttr,
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      style={{ willChange: 'transform', ...style }}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      {...dataAttr}
    >
      {children}
    </motion.div>
  )
}
