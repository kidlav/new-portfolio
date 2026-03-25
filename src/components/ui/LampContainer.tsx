import { useRef, type PointerEvent, type PropsWithChildren } from 'react'

export function LampContainer({ children }: PropsWithChildren) {
  const lampRef = useRef<HTMLDivElement>(null)

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const element = lampRef.current

    if (!element) {
      return
    }

    const rect = element.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    const clampedX = Math.max(0, Math.min(100, x))
    const clampedY = Math.max(0, Math.min(60, y))

    element.style.setProperty('--lamp-x', `${clampedX}%`)
    element.style.setProperty('--lamp-y', `${clampedY}%`)
  }

  const resetLampPosition = () => {
    const element = lampRef.current

    if (!element) {
      return
    }

    element.style.setProperty('--lamp-x', '50%')
    element.style.setProperty('--lamp-y', '0%')
  }

  return (
    <div
      ref={lampRef}
      className="lamp-container"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetLampPosition}
    >
      <div className="lamp-glow lamp-glow-white" />
      <div className="lamp-glow lamp-glow-accent" />
      <div className="lamp-beam" />
      {children}
    </div>
  )
}