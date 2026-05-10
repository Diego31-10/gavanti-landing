import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import { WordsPullUpMultiStyle } from './WordsPullUpMultiStyle'
import { AnimatedLetter } from './AnimatedLetter'

const BODY_TEXT =
  'Over the last few years, we have evolved from a group of friends into a structured organization. Based in the heart of Ecuador, we craft digital products that bridge the gap between complex engineering and human-centric design.'

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'end 0.4'],
  })

  const chars = BODY_TEXT.split('')
  const total = chars.length

  return (
    <section
      id="our-story"
      style={{ background: '#000', padding: '80px 16px' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Card */}
        <div
          style={{
            background: '#101010',
            borderRadius: '24px',
            padding: 'clamp(32px, 5vw, 80px)',
          }}
        >
          {/* Heading */}
          <h2
            style={{
              fontSize: 'clamp(28px, 4.5vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.025em',
              color: '#DEDBC8',
              fontFamily: 'Almarai, sans-serif',
              margin: '0 0 64px 0',
            }}
          >
            <WordsPullUpMultiStyle
              segments={[
                { text: 'We are Gavanti,' },
                { text: 'a software collective from the Andes.', italic: true },
                {
                  text: 'Focused on building systems, mastering hackathons, and fostering tech culture in Cuenca.',
                  color: '#666',
                },
              ]}
              stagger={0.05}
            />
          </h2>

          {/* Scroll-animated body text */}
          <div ref={containerRef} style={{ maxWidth: '720px' }}>
            <p
              style={{
                fontSize: 'clamp(22px, 3vw, 36px)',
                fontWeight: 300,
                lineHeight: 1.55,
                letterSpacing: '-0.015em',
                color: '#DEDBC8',
                fontFamily: 'Almarai, sans-serif',
                margin: 0,
              }}
            >
              {chars.map((char, i) => {
                const start = i / total
                const end = Math.min(start + 0.04, 1)
                return (
                  <AnimatedLetter
                    key={i}
                    char={char}
                    progress={scrollYProgress}
                    start={start}
                    end={end}
                  />
                )
              })}
            </p>
          </div>

          {/* Footnote */}
          <div
            style={{
              marginTop: '56px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            <span
              style={{
                fontSize: '10px',
                color: 'rgba(255,255,255,0.25)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: 'Almarai, sans-serif',
              }}
            >
              Software Collective
            </span>
            <div style={{ height: '1px', flex: 1, background: 'rgba(255,255,255,0.05)' }} />
            <span
              style={{
                fontSize: '10px',
                color: 'rgba(255,255,255,0.25)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: 'Almarai, sans-serif',
              }}
            >
              Cuenca · Ecuador
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
