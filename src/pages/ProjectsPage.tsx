import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePingPong } from '../hooks/usePingPong'

const EASE = [0.16, 1, 0.3, 1] as const

// ─── Data ────────────────────────────────────────────────────────────────────

interface Project {
  label: string
  title: string
  description: string
  fwd: string
  rev: string
  href: string
}

const PROJECTS: Project[] = [
  {
    label: 'Technical Core',
    title: 'Engineering Depth',
    description: 'Systems built for scale, precision, and long-term durability.',
    fwd: '/videos/2.mp4',
    rev: '/videos/2REVERSE.mov',
    href: '#',
  },
  {
    label: 'What We Ship',
    title: 'Production Work',
    description: 'Real products, shipped to real users. No demos.',
    fwd: '/videos/3.mp4',
    rev: '/videos/3REVERSE.mov',
    href: '#',
  },
  {
    label: 'Culture',
    title: 'Made in Cuenca',
    description: 'Built from the heart of Ecuador, competing globally.',
    fwd: '/videos/4.mp4',
    rev: '/videos/4REVERSE.mov',
    href: '#',
  },
  {
    label: 'History',
    title: 'Where It Began',
    description: 'A classroom. A few engineers. One relentless standard.',
    fwd: '/videos/5.mp4',
    rev: '/videos/5REVERSE.mov',
    href: '/history',
  },
]

const BIG_WORDS = 'GAVANTI  PROJECTS  COLLECTIVE  GAVANTI  PROJECTS'

// ─── Video Card content ───────────────────────────────────────────────────────

function VideoSlideCard({ project, active }: { project: Project; active: boolean }) {
  const fwdRef = useRef<HTMLVideoElement>(null)
  const revRef = useRef<HTMLVideoElement>(null)
  usePingPong(fwdRef, revRef, active)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <video
        ref={fwdRef}
        muted
        playsInline
        preload="auto"
        src={project.fwd}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <video
        ref={revRef}
        muted
        playsInline
        preload="auto"
        src={project.rev}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0 }}
      />

      {/* Gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.22) 55%, transparent 100%)',
        zIndex: 1,
      }} />

      {/* Text content */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: 'clamp(24px, 4vw, 52px)', gap: '20px',
      }}>
        <div>
          <p style={{
            fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)', fontFamily: 'Almarai, sans-serif', margin: '0 0 10px 0',
          }}>
            {project.label}
          </p>
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 72px)', fontWeight: 900,
            letterSpacing: '-0.04em', lineHeight: 0.88, textTransform: 'uppercase',
            color: '#fff', fontFamily: 'Almarai, sans-serif', margin: '0 0 12px 0',
            textShadow: '0 2px 32px rgba(0,0,0,0.6)',
          }}>
            {project.title}
          </h2>
          <p style={{
            fontSize: 'clamp(11px, 1vw, 14px)', color: 'rgba(255,255,255,0.5)',
            fontFamily: 'Almarai, sans-serif', fontWeight: 300, lineHeight: 1.6,
            margin: 0, maxWidth: '360px',
          }}>
            {project.description}
          </p>
        </div>

        <Link
          to={project.href}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px', alignSelf: 'flex-start',
            padding: '13px 24px', background: '#fff', color: '#000', borderRadius: '9999px',
            fontSize: '10px', fontWeight: 900, letterSpacing: '0.16em', textTransform: 'uppercase',
            fontFamily: 'Almarai, sans-serif', textDecoration: 'none', transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          <span>View Project</span>
          <ArrowUpRight size={12} />
        </Link>
      </div>
    </div>
  )
}

// ─── Single slide with scroll-driven position ─────────────────────────────────
//
// The trick matching Armchairs exactly:
// - scrollProgress 0→1 maps to "which slide is active" (0 → N-1)
// - activeFloat = scrollProgress * (N-1)
// - relativePos = index - activeFloat  →  0 = centered, ±1 = one slot away
// - x  = relativePos * SLOT_WIDTH  (slides live off-screen when not active)
// - scale = 1 when centered, 0.85 when one slot away
// - rotateZ = slight tilt based on position
// - opacity = 1 when centered, 0.4 when one slot away

const SLOT_VW = 72   // vw distance between slide centers

function AnimatedSlide({
  project,
  index,
  total,
  scrollProgress,
}: {
  project: Project
  index: number
  total: number
  scrollProgress: MotionValue<number>
}) {
  // Convert scroll 0-1 to activeFloat 0-(N-1)
  const activeFloat = useTransform(scrollProgress, [0, 1], [0, total - 1])

  const x = useTransform(activeFloat, (af) => {
    const rel = index - af          // 0 = I'm active, ±1 = one slot away
    return rel * SLOT_VW + 'vw'
  })

  const scale = useTransform(activeFloat, (af) => {
    const dist = Math.abs(index - af)
    return 1 - Math.min(dist, 1) * 0.17   // 1.0 → 0.83 at ±1 slot
  })

  const opacity = useTransform(activeFloat, (af) => {
    const dist = Math.abs(index - af)
    return 1 - Math.min(dist, 1) * 0.62   // 1.0 → 0.38 at ±1 slot
  })

  const rotateZ = useTransform(activeFloat, (af) => {
    const rel = index - af
    // Tilt away from center — matches the slight rotation in Armchairs
    const tilt = index % 2 === 0 ? 1 : -1
    return rel * tilt * 4.5
  })

  const isActive = useTransform(activeFloat, (af) => Math.round(af) === index)

  return (
    <motion.div
      style={{
        position: 'absolute',
        // Center in the sticky viewport
        top: '50%',
        left: '50%',
        translateX: '-50%',
        translateY: '-50%',
        width: 'clamp(280px, 58vw, 800px)',
        height: 'clamp(200px, 60vh, 480px)',
        x,
        scale,
        opacity,
        rotateZ,
        transformOrigin: 'center center',
        willChange: 'transform, opacity',
        borderRadius: '48px',
        overflow: 'hidden',
        background: '#0a0a0a',
        boxShadow: '0 80px 150px -30px rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.07)',
        zIndex: 10 - index,
      }}
    >
      <VideoSlideCard project={project} active={false} />
    </motion.div>
  )
}

// ─── Dot indicator ────────────────────────────────────────────────────────────

function Dot({ index, total, scrollProgress }: {
  index: number
  total: number
  scrollProgress: MotionValue<number>
}) {
  const activeFloat = useTransform(scrollProgress, [0, 1], [0, total - 1])

  const width = useTransform(activeFloat, (af) => {
    const dist = Math.abs(index - af)
    return dist < 0.5 ? 24 : 8
  })
  const op = useTransform(activeFloat, (af) => {
    const dist = Math.abs(index - af)
    return dist < 0.5 ? 1 : 0.25
  })

  return (
    <motion.div style={{
      height: '4px', borderRadius: '9999px', background: 'currentColor',
      width, opacity: op, transition: 'width 0.3s ease',
    }} />
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const total = PROJECTS.length

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.5, 0.85, 1],
    ['rgb(0,0,0)', 'rgb(0,0,0)', 'rgb(240,240,238)', 'rgb(240,240,238)']
  )

  const textColor = useTransform(
    scrollYProgress,
    [0.6, 0.85],
    ['rgb(255,255,255)', 'rgb(0,0,0)']
  )

  const bigTextX = useTransform(scrollYProgress, [0, 1], ['2%', '-28%'])

  return (
    <div
      ref={containerRef}
      style={{ height: `${(total + 1.5) * 100}vh`, position: 'relative' }}
    >
      <motion.div
        style={{
          position: 'sticky',
          top: 0,
          height: '100dvh',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: bgColor,
          color: textColor,
        }}
      >
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          style={{ position: 'absolute', top: '28px', left: '28px', zIndex: 50 }}
        >
          <Link
            to="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '11px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
              fontFamily: 'Almarai, sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
          >
            <ArrowLeft size={13} />
            Gavanti
          </Link>
        </motion.div>

        {/* Big watermark text */}
        <motion.div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
          overflow: 'hidden', pointerEvents: 'none', zIndex: 0, x: bigTextX,
        }}>
          <span style={{
            fontSize: '38vw', fontWeight: 900, fontFamily: 'Almarai, sans-serif',
            textTransform: 'uppercase', whiteSpace: 'nowrap', color: 'currentColor',
            opacity: 0.028, userSelect: 'none', lineHeight: 1,
          }}>
            {BIG_WORDS}
          </span>
        </motion.div>

        {/* Ambient glow */}
        <div style={{
          position: 'absolute', top: '20%', left: '-15%',
          width: '70vw', height: '70vw',
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)',
          filter: 'blur(80px)', pointerEvents: 'none', zIndex: 1,
        }} />

        {/* Slides — all absolutely centered, x-offset drives which is visible */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 20 }}>
          {PROJECTS.map((project, i) => (
            <AnimatedSlide
              key={i}
              project={project}
              index={i}
              total={total}
              scrollProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Bottom bar */}
        <motion.div style={{
          position: 'absolute', bottom: '40px', left: '40px', right: '40px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          zIndex: 30, color: textColor,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{
              fontSize: '8px', fontWeight: 900, letterSpacing: '0.22em',
              textTransform: 'uppercase', opacity: 0.35, fontFamily: 'Almarai, sans-serif',
            }}>
              Projects // 04
            </span>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              {PROJECTS.map((_, i) => (
                <Dot key={i} index={i} total={total} scrollProgress={scrollYProgress} />
              ))}
            </div>
          </div>

          <motion.span style={{
            fontSize: '10px', fontFamily: 'Almarai, sans-serif',
            letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.35,
          }}>
            {PROJECTS.length} Projects
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  )
}
