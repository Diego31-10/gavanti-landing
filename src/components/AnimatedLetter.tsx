import { motion, MotionValue, useTransform } from 'framer-motion'

interface AnimatedLetterProps {
  char: string
  progress: MotionValue<number>
  start: number
  end: number
}

export function AnimatedLetter({ char, progress, start, end }: AnimatedLetterProps) {
  const opacity = useTransform(progress, [start, end], [0.15, 1])

  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre">
      {char}
    </motion.span>
  )
}
