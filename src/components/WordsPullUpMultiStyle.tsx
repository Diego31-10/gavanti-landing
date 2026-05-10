import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

export interface Segment {
  text: string
  italic?: boolean
  color?: string
  className?: string
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[]
  className?: string
  delay?: number
  stagger?: number
}

export function WordsPullUpMultiStyle({
  segments,
  className = '',
  delay = 0,
  stagger = 0.07,
}: WordsPullUpMultiStyleProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  // Flatten all words with their style info
  const allWords: { word: string; italic: boolean; color?: string; extraClass?: string }[] = []
  for (const seg of segments) {
    const words = seg.text.trim().split(/\s+/)
    words.forEach((word, i) => {
      allWords.push({
        word: i < words.length - 1 ? word + ' ' : word,
        italic: seg.italic ?? false,
        color: seg.color,
        extraClass: seg.className,
      })
    })
    // Add space between segments if last word doesn't already have it
    if (allWords.length > 0 && !allWords[allWords.length - 1].word.endsWith(' ')) {
      allWords[allWords.length - 1].word += ' '
    }
  }

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  const wordVariant = {
    hidden: { y: '110%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: { duration: 0.95, ease: EASE },
    },
  }

  return (
    <motion.span
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`inline ${className}`}
    >
      {allWords.map((item, i) => (
        <span key={i} className="overflow-hidden inline-block" style={{ verticalAlign: 'bottom' }}>
          <motion.span
            variants={wordVariant}
            className={`inline-block ${item.italic ? 'font-serif italic' : ''} ${item.extraClass ?? ''}`}
            style={item.color ? { color: item.color } : undefined}
          >
            {item.word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
