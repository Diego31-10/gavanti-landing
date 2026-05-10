import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { WordsPullUpMultiStyle } from './WordsPullUpMultiStyle'
import { usePingPong } from '../hooks/usePingPong'

const EASE = [0.16, 1, 0.3, 1] as const

interface PingPongVideoCardProps {
  fwd: string
  rev: string
  label: string
  title: string
  href?: string
  delay?: number
}

function PingPongVideoCard({ fwd, rev, label, title, href = '#', delay = 0 }: PingPongVideoCardProps) {
  const fwdRef = useRef<HTMLVideoElement>(null)
  const revRef = useRef<HTMLVideoElement>(null)
  const wrapRef = useRef(null)
  const isInView = useInView(wrapRef, { once: true, margin: '-8% 0px' })

  usePingPong(fwdRef, revRef, isInView)

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.85, ease: EASE, delay }}
      style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', minHeight: '320px' }}
    >
      {/* Videos */}
      <video
        ref={fwdRef}
        muted
        playsInline
        preload="auto"
        src={fwd}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 1 }}
      />
      <video
        ref={revRef}
        muted
        playsInline
        preload="auto"
        src={rev}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0 }}
      />

      {/* Base gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
          zIndex: 1,
        }}
      />

      {/* Hover effects layer — scale + glow + content animate via group */}
      <motion.div
        whileHover="hover"
        initial="rest"
        style={{ position: 'absolute', inset: 0, zIndex: 2, cursor: 'pointer' }}
      >
        {/* Cream tint on hover */}
        <motion.div
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(222,219,200,0.07)',
            pointerEvents: 'none',
          }}
        />

        {/* Border glow ring */}
        <motion.div
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '20px',
            boxShadow: 'inset 0 0 0 1px rgba(222,219,200,0.35)',
            pointerEvents: 'none',
          }}
        />

        {/* Content row */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '24px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          {/* Text — slides up on hover */}
          <motion.div
            variants={{ rest: { y: 0 }, hover: { y: -4 } }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <p
              style={{
                fontSize: '10px',
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: 'Almarai, sans-serif',
                marginBottom: '6px',
              }}
            >
              {label}
            </p>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#DEDBC8',
                fontFamily: 'Almarai, sans-serif',
                margin: 0,
              }}
            >
              {title}
            </h3>
          </motion.div>

          {/* Arrow button — scales + rotates on hover */}
          <motion.div
            variants={{
              rest: { scale: 1, rotate: 0, background: 'rgba(222,219,200,0.1)', borderColor: 'rgba(222,219,200,0.18)' },
              hover: { scale: 1.18, rotate: 45, background: 'rgba(222,219,200,1)', borderColor: 'rgba(222,219,200,1)' },
            }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '42px',
              height: '42px',
              borderRadius: '9999px',
              border: '1px solid rgba(222,219,200,0.18)',
              flexShrink: 0,
            }}
          >
            <motion.div
              variants={{
                rest: { color: '#DEDBC8' },
                hover: { color: '#000' },
              }}
              transition={{ duration: 0.25 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ArrowUpRight size={17} />
            </motion.div>
          </motion.div>
        </div>

        {/* Full-card link */}
        <a
          href={href}
          aria-label={title}
          style={{ position: 'absolute', inset: 0, zIndex: 10 }}
        />
      </motion.div>
    </motion.div>
  )
}

const VIDEO_CARDS: PingPongVideoCardProps[] = [
  { fwd: '/videos/2.mp4', rev: '/videos/2REVERSE.mov', label: 'Core', title: 'Our Technical Core.', delay: 0 },
  { fwd: '/videos/3.mp4', rev: '/videos/3REVERSE.mov', label: 'Projects', title: 'What We Ship.', delay: 0.08 },
  { fwd: '/videos/4.mp4', rev: '/videos/4REVERSE.mov', label: 'History', title: 'Where It All Began.', href: '/history', delay: 0.16 },
  { fwd: '/videos/5.mp4', rev: '/videos/5REVERSE.mov', label: 'Culture', title: 'Made in Cuenca.', delay: 0.24 },
]

export function Forge() {
  return (
    <section
      id="projects"
      style={{ position: 'relative', background: '#000', padding: '80px 16px' }}
    >
      {/* Noise bg */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          opacity: 0.12,
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', maxWidth: '1300px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '56px', maxWidth: '800px' }}>
          <p
            style={{
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)',
              fontFamily: 'Almarai, sans-serif',
              marginBottom: '20px',
            }}
          >
            The Forge — 003
          </p>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              fontFamily: 'Almarai, sans-serif',
              margin: 0,
            }}
          >
            <WordsPullUpMultiStyle
              segments={[{ text: 'Engineering the future from Cuenca.', color: '#DEDBC8' }]}
              stagger={0.06}
            />
            <br />
            <WordsPullUpMultiStyle
              segments={[{ text: 'Built for performance. Powered by community.', color: '#555' }]}
              stagger={0.05}
              delay={0.3}
            />
          </h2>
        </div>

        {/* 4-col video grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
          }}
        >
          {VIDEO_CARDS.map((card) => (
            <PingPongVideoCard key={card.fwd} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}
