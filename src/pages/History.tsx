import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useVideoScrollSync } from '../hooks/useVideoScrollSync'

const EASE = [0.16, 1, 0.3, 1] as const

const CHAPTERS = [
  {
    year: '2021',
    title: 'A classroom in Cuenca.',
    body: "Inside UETS — Unidad Educativa Técnica Salesiana — a professor saw something rare: a handful of students who stayed after class not because they had to, but because they wanted to keep building. They weren't just learning to code. They were learning to think.",
  },
  {
    year: '2022',
    title: 'First projects. First failures.',
    body: "The group started shipping small things — internal tools, experimental apps, late-night prototypes. Most didn't work. All of them mattered. They were learning what it meant to build something real, not just something that compiles.",
  },
  {
    year: '2023',
    title: 'Friends became a collective.',
    body: 'What started as a study group became something harder to define. A shared sensibility. A shared standard. They formalized under the name Gavanti — and set their sights beyond Cuenca, toward global hackathons and high-impact software.',
  },
  {
    year: '2024 →',
    title: 'Engineering the future.',
    body: 'Today Gavanti competes internationally, builds production systems, and mentors the next generation of engineers from Ecuador. The classroom is still where it starts — but the ambition has no ceiling.',
  },
]

function Chapter({ year, title, body, index }: { year: string; title: string; body: string; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '0px 0px -60px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: 0.7, ease: EASE }}
      style={{
        display: 'grid',
        gridTemplateColumns: '72px 1fr',
        gap: '24px',
        paddingBottom: '52px',
        borderBottom: index < CHAPTERS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
        marginBottom: index < CHAPTERS.length - 1 ? '52px' : 0,
      }}
    >
      <span style={{
        fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.4)', fontFamily: 'Almarai, sans-serif',
        fontWeight: 400, paddingTop: '3px',
      }}>
        {year}
      </span>
      <div>
        <h2 style={{
          fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 700,
          letterSpacing: '-0.02em', lineHeight: 1.2, color: '#fff',
          fontFamily: 'Almarai, sans-serif', margin: '0 0 12px 0',
        }}>
          {title}
        </h2>
        <p style={{
          fontSize: 'clamp(14px, 1.3vw, 17px)', lineHeight: 1.75,
          color: 'rgba(255,255,255,0.6)', fontFamily: 'Almarai, sans-serif',
          fontWeight: 300, margin: 0, maxWidth: '500px',
        }}>
          {body}
        </p>
      </div>
    </motion.div>
  )
}

export function History() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const textScrollRef = useRef<HTMLDivElement>(null)

  // Usar el hook para sincronizar video con scroll del contenedor de texto
  // Nota: Si el video no tiene suficientes keyframes (GOP), usar:
  // ffmpeg -i input.mp4 -g 1 output.mp4
  useVideoScrollSync({
    containerRef: textScrollRef,
    videoRef,
    lerpFactor: 0.1,
  })

  // Permitir scroll del contenedor de texto desde cualquier parte de la pantalla
  useEffect(() => {
    const container = textScrollRef.current
    if (!container) return

    function handleWheel(e: WheelEvent) {
      const container = textScrollRef.current
      if (!container) return
      
      const canScrollDown = container.scrollTop < container.scrollHeight - container.clientHeight
      const canScrollUp = container.scrollTop > 0
      
      // Reducir el scroll 3x (factor 0.33) para que sea más lento
      const scrollFactor = 0.33
      
      // Si el delta es positivo (scroll down) y podemos scrollear, pasa el evento al contenedor
      if (e.deltaY > 0 && canScrollDown) {
        container.scrollTop += e.deltaY * scrollFactor
        e.preventDefault()
      } 
      // Si el delta es negativo (scroll up) y podemos scrollear, pasa el evento al contenedor
      else if (e.deltaY < 0 && canScrollUp) {
        container.scrollTop += e.deltaY * scrollFactor
        e.preventDefault()
      }
    }

    document.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      document.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#000' }}>

      {/* Video — fixed behind everything */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/6.mp4"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.52)' }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px', mixBlendMode: 'overlay', opacity: 0.35, pointerEvents: 'none',
        }} />
      </div>

      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        style={{ position: 'absolute', top: '28px', left: '28px', zIndex: 50 }}
      >
        <Link
          to="/"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontSize: '12px', color: 'rgba(255,255,255,0.45)', textDecoration: 'none',
            fontFamily: 'Almarai, sans-serif', letterSpacing: '0.04em', transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
        >
          <ArrowLeft size={13} />
          Gavanti
        </Link>
      </motion.div>

      {/*
        Text panel — scrollable, occupies top 50vh only.
        Overflows are hidden so text never enters the plant zone.
        The panel itself scrolls independently of the page.
        A mask-image fades the text as it scrolls toward the bottom edge.
      */}
      <div
        ref={textScrollRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50vh',
          overflowY: 'scroll',
          zIndex: 10,
          // Hide scrollbar
          scrollbarWidth: 'none',
          // Fade text out toward the bottom using CSS mask
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
        }}
      >
        <div style={{
          maxWidth: '860px',
          margin: '0 auto',
          padding: '7vh 32px 80px',
        }}>
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            style={{ marginBottom: '40px', textAlign: 'center' }}
          >
            <p style={{
              fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.38)', fontFamily: 'Almarai, sans-serif', marginBottom: '12px',
            }}>
              Our Story — 001
            </p>
            <h1 style={{
              fontSize: 'clamp(38px, 6.5vw, 84px)', fontWeight: 800,
              letterSpacing: '-0.035em', lineHeight: 0.9, color: '#fff',
              fontFamily: 'Almarai, sans-serif', margin: 0,
            }}>
              Where it all
              <br />
              <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontWeight: 400 }}>
                began.
              </span>
            </h1>
          </motion.div>

          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.22)', fontFamily: 'Almarai, sans-serif', marginBottom: '20px',
            }}
          >
            Gavanti · Cuenca, Ecuador
          </motion.p>

          {/* Timeline */}
          {CHAPTERS.map((ch, i) => (
            <Chapter key={ch.year} {...ch} index={i} />
          ))}
        </div>
      </div>

      {/* Hide scrollbar for webkit */}
      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}
