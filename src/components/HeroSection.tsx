import { motion, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { HoverBorderGradient } from './ui/hover-border-gradient'

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="hero-v2"
    >
      <motion.div variants={itemVariants} className="hero-v2-badge-wrap">
        <span className="hero-v2-badge">
          <span className="hero-v2-badge-dot" />
          Available for work
        </span>
      </motion.div>

      <div className="hero-title-shell">
        <motion.h1 variants={itemVariants} className="hero-v2-title">
          I build interfaces
          <br />
          <span>that feel right</span>
        </motion.h1>
      </div>

      <motion.p variants={itemVariants} className="hero-v2-text">
        Frontend and fullstack developer focused on clean architecture,
        thoughtful motion, and visual quality. I care about the details
        that make interfaces enjoyable to use.
      </motion.p>

      <motion.div variants={itemVariants} className="hero-v2-actions">
        <HoverBorderGradient
          as="a"
          href="#projects"
          containerClassName="hbg-container"
          className="hbg-inner"
        >
          <span>View Projects</span>
          <ArrowRight size={16} />
        </HoverBorderGradient>
        <a href="#contact" className="hero-v2-ghost-link">
          Get in touch
        </a>
      </motion.div>

      <motion.div variants={itemVariants} className="hero-v2-scroll-hint">
        <span className="hero-v2-scroll-line" />
        <span className="hero-v2-scroll-label">Scroll</span>
      </motion.div>
    </motion.div>
  )
}
