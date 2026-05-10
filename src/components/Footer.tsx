import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Github, ArrowUpRight } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <footer
      id="contact"
      style={{
        background: '#000',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '80px 16px',
      }}
    >
      <div style={{ maxWidth: '1300px', margin: '0 auto' }} ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.85, ease: EASE }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '48px',
            flexWrap: 'wrap',
          }}
        >
          {/* Left */}
          <div>
            <p
              style={{
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.25)',
                fontFamily: 'Almarai, sans-serif',
                marginBottom: '16px',
              }}
            >
              Gavanti
            </p>
            <h3
              style={{
                fontSize: 'clamp(40px, 7vw, 80px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 0.95,
                color: '#DEDBC8',
                fontFamily: 'Almarai, sans-serif',
                margin: '0 0 24px 0',
              }}
            >
              Let's build
              <br />
              <span
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  fontStyle: 'italic',
                  fontWeight: 400,
                }}
              >
                together.
              </span>
            </h3>
            <a
              href="mailto:support@gavanti.org"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.45)',
                textDecoration: 'none',
                fontFamily: 'Almarai, sans-serif',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
            >
              support@gavanti.org
              <ArrowUpRight size={12} />
            </a>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
            <img src="/LogoBlanco.svg" alt="Gavanti" style={{ height: '28px', opacity: 0.5 }} />
            <a
              href="https://github.com/gavanti"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.35)',
                textDecoration: 'none',
                fontFamily: 'Almarai, sans-serif',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
            >
              <Github size={13} />
              github.com/gavanti
              <ArrowUpRight size={11} />
            </a>
            <p
              style={{
                fontSize: '11px',
                color: 'rgba(255,255,255,0.18)',
                fontFamily: 'Almarai, sans-serif',
                margin: 0,
              }}
            >
              © 2025 Gavanti · Cuenca, Ecuador
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
