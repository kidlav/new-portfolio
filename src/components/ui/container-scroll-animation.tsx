import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, type PropsWithChildren, type ReactNode } from 'react'

type ContainerScrollProps = PropsWithChildren<{
  titleComponent: ReactNode
}>

export function ContainerScroll({ titleComponent, children }: ContainerScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const mediaScale = useTransform(scrollYProgress, [0, 0.55, 1], [0.92, 1, 0.96])
  const mediaY = useTransform(scrollYProgress, [0, 1], [48, -36])
  const mediaOpacity = useTransform(scrollYProgress, [0, 0.12, 1], [0.45, 1, 0.96])
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -46])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.8])

  return (
    <section ref={sectionRef} className="container-scroll-section">
      <div className="container-scroll-sticky">
        <motion.div
          className="container-scroll-title"
          style={{ y: titleY, opacity: titleOpacity }}
        >
          {titleComponent}
        </motion.div>

        <motion.div
          className="container-scroll-media"
          style={{ scale: mediaScale, y: mediaY, opacity: mediaOpacity }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}
