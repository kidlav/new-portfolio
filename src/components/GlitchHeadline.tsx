import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

// ── Config ────────────────────────────────────────────────────────────────────
const ORIGINAL = 'notice'
const SWAP     = 'read'
const CHARS    = '#$x@z%!?&'
const STEPS    = 7        // scramble frames per phase
const FRAME_MS = 38       // ms between scramble frames
const HOLD_MS  = 260      // ms to hold the swapped word

// ── Helpers ───────────────────────────────────────────────────────────────────
function rand(str: string) {
  return str[Math.floor(Math.random() * str.length)]
}

/** Scramble `from` → `to`, calling `onFrame(text)` each step, `onDone` when finished. */
function scrambleTo(
  from: string,
  to: string,
  steps: number,
  onFrame: (t: string) => void,
  onDone: () => void,
): ReturnType<typeof setInterval> {
  let step = 0
  const id = setInterval(() => {
    step++
    const progress = step / steps
    const len = Math.round(from.length + (to.length - from.length) * progress)
    const text = Array.from({ length: len }, (_, i) => {
      if (progress > (i + 1) / to.length && i < to.length) return to[i]
      return rand(CHARS)
    }).join('')
    onFrame(text)
    if (step >= steps) {
      clearInterval(id)
      onFrame(to)
      onDone()
    }
  }, FRAME_MS)
  return id
}

// ── Component ─────────────────────────────────────────────────────────────────
export function GlitchHeadline() {
  const [word, setWord]   = useState(ORIGINAL)
  const [busy, setBusy]   = useState(false)
  const [lit,  setLit]    = useState(false)   // drives framer-motion colour flicker
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const ivRef    = useRef<ReturnType<typeof setInterval> | null>(null)

  const clear = useCallback(() => {
    if (ivRef.current)    clearInterval(ivRef.current)
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  const trigger = useCallback(() => {
    if (busy) return
    setBusy(true)
    setLit(true)
    clear()

    // Phase 1 — scramble notice → read
    ivRef.current = scrambleTo(ORIGINAL, SWAP, STEPS, setWord, () => {
      // Phase 2 — hold on "read"
      timerRef.current = setTimeout(() => {
        // Phase 3 — scramble read → notice
        ivRef.current = scrambleTo(SWAP, ORIGINAL, STEPS, setWord, () => {
          setBusy(false)
          setLit(false)
        })
      }, HOLD_MS)
    })
  }, [busy, clear])

  // Cleanup on unmount
  useEffect(() => () => clear(), [clear])

  return (
    <h1 className="hero-title">
      I solve problems before you{' '}
      <motion.em
        style={{
          display: 'inline-block',
          cursor: 'default',
          userSelect: 'none',
          color: 'var(--accent-light)',
          fontStyle: 'italic',
        }}
        animate={lit ? { opacity: [1, 0.55, 1, 0.7, 1] } : { opacity: 1 }}
        transition={{ duration: STEPS * FRAME_MS * 2 / 1000, ease: 'linear' }}
        onHoverStart={trigger}
        onTap={trigger}
        aria-label={ORIGINAL}
      >
        {word}
      </motion.em>{' '}
      they exist.
    </h1>
  )
}
