import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hidden, setHidden] = useState(true)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { stiffness: 400, damping: 28 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      setHidden(false)
    }

    const handleMouseLeave = () => setHidden(true)
    const handleMouseEnter = () => setHidden(false)

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Glow trail */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-sky-400/40 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          boxShadow: '0 0 15px rgba(14, 165, 233, 0.3)',
          opacity: hidden ? 0 : 1,
        }}
      />
      {/* Tiny center dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[var(--color-brand-primary)] rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: useSpring(useMotionValue(0), springConfig),
          y: useSpring(useMotionValue(0), springConfig),
          opacity: hidden ? 0 : 1,
        }}
        animate={{
          x: cursorX.get() + 12,
          y: cursorY.get() + 12
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />
    </>
  )
}
