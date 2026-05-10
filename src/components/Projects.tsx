import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface Project {
  title: string
  label: string
  description: string
  image?: string
  href?: string
  bg: string
}

const PROJECTS: Project[] = [
  {
    title: 'Coming Soon',
    label: 'Project 01',
    description: 'Our first product is in stealth mode. Stay tuned.',
    bg: '#0a0a0a',
    href: '#',
  },
  {
    title: 'Coming Soon',
    label: 'Project 02',
    description: 'Building something that matters. More details soon.',
    bg: '#0d0d0d',
    href: '#',
  },
  {
    title: 'Coming Soon',
    label: 'Project 03',
    description: 'A system for the Andes. Work in progress.',
    bg: '#111',
    href: '#',
  },
]

const BIG_WORDS = ['GAVANTI', 'PROJECTS', 'COLLECTIVE']

// Per-slide animation based on scroll progress
function SlideCard({
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
  // Each slide occupies 1/total of the scroll range
  // center of this slide's range
  const center = index / (total - 1)
  const spread = 0.55 / (total - 1)

  const scale = useTransform(
    scrollProgress,
    [center - spread, center, center + spread],
    [0.82, 1, 0.82],
    { clamp: true }
  )
  const opacity = useTransform(
    scrollProgress,
    [center - spread, center, center + spread],
    [0.25, 1, 0.25],
    { clamp: true }
  )
  const rotateZ = useTransform(
    scrollProgress,
    [center - spread, center, center + spread],
    [index % 2 === 0 ? 4 : -4, 0, index % 2 === 0 ? -4 : 4],
    { clamp: true }
  )
  const translateX = useTransform(
    scrollProgress,
    [center - spread * 1.5, center, center + spread * 1.5],
    [(index - Math.floor(total / 2)) * 120, 0, (index - Math.floor(total / 2)) * -80],
    { clamp: true }
  )

  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        scale,
        opacity,
        rotateZ,
        x: translateX,
        transformOrigin: 'center center',
      }}
    >
      <div
        style={{
          width: 'clamp(300px, 55vw, 780px)',
          height: 'clamp(200px, 55vh, 470px)',
          borderRadius: '48px',
          overflow: 'hidden',
          position: 'relative',
          background: project.bg,
          boxShadow: '0 80px 150px -30px rgba(0,0,0,0.35)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(24px)',
          cursor: 'pointer',
        }}
        className="group"
      >
        {/* Image fill if provided */}
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              transform: 'scale(1.05)',
              transition: 'transform 0.7s ease',
            }}
          />
        )}

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            padding: 'clamp(24px, 4vw, 48px)',
            gap: '20px',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '10px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                fontFamily: 'Almarai, sans-serif',
                marginBottom: '8px',
              }}
            >
              {project.label}
            </p>
            <h3
              style={{
                fontSize: 'clamp(28px, 5vw, 72px)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
                textTransform: 'uppercase',
                color: '#fff',
                fontFamily: 'Almarai, sans-serif',
                margin: 0,
                textShadow: '0 2px 20px rgba(0,0,0,0.5)',
              }}
            >
              {project.title}
            </h3>
          </div>

          {/* CTA button */}
          <a
            href={project.href ?? '#'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 28px',
              background: '#fff',
              color: '#000',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: 900,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontFamily: 'Almarai, sans-serif',
              textDecoration: 'none',
              transition: 'background 0.25s, color 0.25s',
            }}
          >
            <span>View Project</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const total = PROJECTS.length

  // Background color: black → white as scroll progresses
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.4, 0.85, 1],
    ['rgb(0,0,0)', 'rgb(0,0,0)', 'rgb(255,255,255)', 'rgb(255,255,255)']
  )

  // Big background text translates left as scroll progresses
  const bigTextX = useTransform(scrollYProgress, [0, 1], ['0%', '-35%'])

  // Dot active index
  const activeIndex = useTransform(scrollYProgress, (v) =>
    Math.min(Math.round(v * (total - 1)), total - 1)
  )

  return (
    <div
      ref={containerRef}
      id="projects"
      style={{ height: `${(total + 1) * 100}vh`, position: 'relative' }}
    >
      <motion.section
        style={{
          position: 'sticky',
          top: 0,
          height: '100dvh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: bgColor,
        }}
      >
        {/* Big watermark text */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            pointerEvents: 'none',
            overflow: 'hidden',
            zIndex: 0,
            x: bigTextX,
          }}
        >
          <span
            style={{
              fontSize: '40vw',
              fontWeight: 900,
              fontFamily: 'Almarai, sans-serif',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              color: 'currentColor',
              opacity: 0.025,
              userSelect: 'none',
              lineHeight: 1,
            }}
          >
            {BIG_WORDS.join('  ')}
          </span>
        </motion.div>

        {/* Radial glow */}
        <div
          style={{
            position: 'absolute',
            top: '25%',
            left: '-10%',
            width: '80vw',
            height: '80vw',
            background:
              'radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Slides stack */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 20,
          }}
        >
          {PROJECTS.map((project, i) => (
            <SlideCard
              key={i}
              project={project}
              index={i}
              total={total}
              scrollProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Bottom bar: section label + dots */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            left: '48px',
            right: '48px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            zIndex: 30,
          }}
        >
          {/* Section label */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span
              style={{
                fontSize: '8px',
                fontWeight: 900,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                opacity: 0.4,
                fontFamily: 'Almarai, sans-serif',
              }}
            >
              Section // 04
            </span>
            {/* Progress dots */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {PROJECTS.map((_, i) => (
                <ActiveDot key={i} index={i} activeIndex={activeIndex} />
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

function ActiveDot({
  index,
  activeIndex,
}: {
  index: number
  activeIndex: MotionValue<number>
}) {
  const width = useTransform(activeIndex, (v) => (Math.round(v) === index ? 24 : 8))
  const opacity = useTransform(activeIndex, (v) => (Math.round(v) === index ? 1 : 0.2))

  return (
    <motion.div
      style={{
        height: '4px',
        borderRadius: '9999px',
        backgroundColor: 'currentColor',
        width,
        opacity,
      }}
    />
  )
}
