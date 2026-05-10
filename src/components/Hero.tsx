import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { usePingPong } from '../hooks/usePingPong'

const EASE = [0.16, 1, 0.3, 1] as const

const NAV_LINKS = ['Our Story', 'Projects', 'Hackathons', 'Team', 'Contact']

const VIDEO_FWD = '/videos/1.mp4'
const VIDEO_REV = '/videos/1REVERSE.mov'

export function Hero() {
  const fwdRef = useRef<HTMLVideoElement>(null)
  const revRef = useRef<HTMLVideoElement>(null)
  usePingPong(fwdRef, revRef)

  return (
    <section
      style={{
        height: '100svh',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        background: '#000',
      }}
    >
      {/* Inset card */}
      <div
        style={{
          position: 'relative',
          flex: 1,
          borderRadius: '24px',
          overflow: 'hidden',
          background: '#0a0a0a',
        }}
      >
        {/* Forward video */}
        <video
          ref={fwdRef}
          muted
          playsInline
          preload="auto"
          src={VIDEO_FWD}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 1,
          }}
        />

        {/* Reverse video */}
        <video
          ref={revRef}
          muted
          playsInline
          preload="auto"
          src={VIDEO_REV}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0,
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 40%, rgba(0,0,0,0.65) 100%)',
            zIndex: 1,
          }}
        />

        {/* Noise overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '256px 256px',
            mixBlendMode: 'overlay',
            opacity: 0.7,
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* Navbar wrapper — full width, flex center */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          style={{
            position: 'absolute',
            top: '20px',
            left: 0,
            right: 0,
            zIndex: 20,
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
        <nav
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(12px)',
            borderRadius: '9999px',
            padding: '12px 24px',
            border: '1px solid rgba(255,255,255,0.08)',
            whiteSpace: 'nowrap',
            pointerEvents: 'auto',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.65)',
                textDecoration: 'none',
                padding: '2px 10px',
                transition: 'color 0.2s',
                fontFamily: 'Almarai, sans-serif',
                fontWeight: 400,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.95)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
            >
              {link}
            </a>
          ))}
        </nav>
        </motion.div>

        {/* Hero content — full height grid */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            height: '100%',
            display: 'grid',
            gridTemplateRows: 'auto 1fr auto',
            padding: '28px 36px 32px',
          }}
        >
          {/* Row 1 — Logo top-left */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <img
              src="/LogoBlanco.svg"
              alt="Gavanti"
              style={{ height: '56px', opacity: 1 }}
            />
          </motion.div>

          {/* Row 2 — empty middle (video breathes here) */}
          <div />

          {/* Row 3 — bottom: title left, description+CTA right */}
          <div>
            {/* Main bottom row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '24px',
              }}
            >
              {/* Left — giant title */}
              <h1
                style={{
                  fontSize: 'clamp(4.5rem, 16vw, 16vw)',
                  fontWeight: 800,
                  lineHeight: 0.88,
                  letterSpacing: '-0.03em',
                  color: '#DEDBC8',
                  fontFamily: 'Almarai, sans-serif',
                  margin: 0,
                  padding: 0,
                  flexShrink: 0,
                }}
              >
                {['G', 'a', 'v', 'a', 'n', 't'].map((char, i) => (
                  <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
                    <motion.span
                      style={{ display: 'inline-block' }}
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 1.1, ease: EASE, delay: 0.35 + i * 0.045 }}
                    >
                      {char}
                    </motion.span>
                  </span>
                ))}
                <span style={{ overflow: 'hidden', display: 'inline-block' }}>
                  <motion.span
                    style={{ display: 'inline-block' }}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1.1, ease: EASE, delay: 0.35 + 6 * 0.045 }}
                  >
                    i
                    <sup
                      style={{
                        fontSize: '0.18em',
                        verticalAlign: 'super',
                        fontFamily: '"Instrument Serif", serif',
                        fontStyle: 'italic',
                        opacity: 0.55,
                        letterSpacing: 'normal',
                      }}
                    >
                      *
                    </sup>
                  </motion.span>
                </span>
              </h1>

              {/* Right — description stacked above CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.8 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '16px',
                  maxWidth: '320px',
                  flexShrink: 0,
                }}
              >
                <p
                  style={{
                    fontSize: '13px',
                    lineHeight: 1.65,
                    color: 'rgba(225,224,204,0.75)',
                    fontFamily: 'Almarai, sans-serif',
                    fontWeight: 300,
                    margin: 0,
                    textAlign: 'right',
                  }}
                >
                  Gavanti is a software collective based in Cuenca, Ecuador — a network of
                  developers and creators building high-impact software and competing in global
                  hackathons.
                </p>

                {/* CTA */}
                <motion.a
                  href="#projects"
                  whileHover="hover"
                  initial="rest"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: '#DEDBC8',
                    color: '#000',
                    borderRadius: '9999px',
                    paddingLeft: '20px',
                    paddingRight: '8px',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    fontFamily: 'Almarai, sans-serif',
                    fontWeight: 700,
                    fontSize: '13px',
                    letterSpacing: '0.02em',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  <span>Explore the Lab</span>
                  <motion.span
                    variants={{ rest: { scale: 1 }, hover: { scale: 1.15 } }}
                    transition={{ duration: 0.4, ease: EASE }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '9999px',
                      background: '#000',
                    }}
                  >
                    <ArrowRight size={14} style={{ color: '#DEDBC8' }} />
                  </motion.span>
                </motion.a>
              </motion.div>
            </div>

            {/* Bottom metadata bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 1.2 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '24px',
                paddingTop: '18px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {['Cuenca, Ecuador', 'Est. 2023', 'gavanti.org'].map((item) => (
                <span
                  key={item}
                  style={{
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.3)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontFamily: 'Almarai, sans-serif',
                  }}
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
