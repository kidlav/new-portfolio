import { motion, type Variants } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { HoverBorderGradient } from './ui/hover-border-gradient'

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
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
          <Sparkles size={16} />
          New Features Available
        </span>
      </motion.div>

      <div className="hero-title-shell">
        <motion.h1 variants={itemVariants} className="hero-v2-title">
          Build Amazing
          <br />
          <span>User Experiences</span>
        </motion.h1>
      </div>

      <motion.p variants={itemVariants} className="hero-v2-text">
        Create stunning, animated interfaces with a collection of
        production-ready components. Built with React, Framer Motion, and
        careful attention to detail.
      </motion.p>

      <motion.div variants={itemVariants} className="hero-v2-actions">
        <HoverBorderGradient
          as="a"
          href="#projects"
          containerClassName="hbg-container"
          className="hbg-inner"
        >
          <span>Get Started</span>
          <ArrowRight size={16} />
        </HoverBorderGradient>
      </motion.div>

      <motion.div variants={itemVariants} className="hero-v2-stats">
        <div>
          <div className="hero-v2-stat-value">10k+</div>
          <div>Downloads</div>
        </div>
        <div className="hero-v2-divider" />
        <div>
          <div className="hero-v2-stat-value">50+</div>
          <div>Components</div>
        </div>
        <div className="hero-v2-divider" />
        <div>
          <div className="hero-v2-stat-value">100%</div>
          <div>Open Source</div>
        </div>
      </motion.div>
    </motion.div>
  )
}