import { useRef, useEffect, useCallback } from 'react'

interface UseVideoScrollSyncOptions {
  containerRef: React.RefObject<HTMLElement>
  videoRef: React.RefObject<HTMLVideoElement>
  lerpFactor?: number // 0-1, how much to interpolate (0.1 = 10% toward target per frame)
  onMetadataLoaded?: () => void
}

/**
 * Hook para sincronizar un video con el scroll de un contenedor.
 * Utiliza requestAnimationFrame para evitar jank y Lerp para smoothness.
 * 
 * @param containerRef - Ref al contenedor scrollable
 * @param videoRef - Ref al elemento <video>
 * @param lerpFactor - Factor de interpolación (default: 0.1)
 * @param onMetadataLoaded - Callback cuando el video carga metadata
 * 
 * @example
 * const containerRef = useRef(null);
 * const videoRef = useRef(null);
 * useVideoScrollSync({ containerRef, videoRef });
 */
export function useVideoScrollSync({
  containerRef,
  videoRef,
  lerpFactor = 0.1,
  onMetadataLoaded,
  useWindowScroll = false,
}: UseVideoScrollSyncOptions) {
  const rafIdRef = useRef<number>(0)
  const targetTimeRef = useRef<number>(0)
  const currentTimeRef = useRef<number>(0)
  const isReadyRef = useRef<boolean>(false)

  // Listener para cuando el usuario scrollea en el contenedor
  const handleScroll = useCallback(() => {
    if (!containerRef.current || !videoRef.current) return

    const container = containerRef.current
    const video = videoRef.current

    if (!video.duration || video.duration === 0) return

    // Calcular el progreso de scroll (0 a 1)
    const maxScroll = container.scrollHeight - container.clientHeight
    if (maxScroll <= 0) return

    const scrollProgress = container.scrollTop / maxScroll

    // Mapear el progreso a la duración del video
    // Usar un pequeño buffer al final para evitar que se quede pegado
    targetTimeRef.current = scrollProgress * (video.duration - 0.1)
  }, [containerRef, videoRef])

  // Animation loop con RAF para actualizar el currentTime
  const animationLoop = useCallback(() => {
    if (!videoRef.current) return

    const video = videoRef.current

    // Solo actualizar si el video está listo
    if (video.readyState < 2) {
      rafIdRef.current = requestAnimationFrame(animationLoop)
      return
    }

    const diff = targetTimeRef.current - currentTimeRef.current

    // Si la diferencia es significativa, actualizar (evita actualizaciones innecesarias)
    if (Math.abs(diff) > 0.016) {
      // Lerp: mover un porcentaje hacia el target por frame
      currentTimeRef.current += diff * lerpFactor
      video.currentTime = currentTimeRef.current
    }

    rafIdRef.current = requestAnimationFrame(animationLoop)
  }, [lerpFactor])

  // Manejar cuando la metadata del video está lista
  const handleMetadataLoaded = useCallback(() => {
    if (!videoRef.current) return

    isReadyRef.current = true
    onMetadataLoaded?.()
  }, [onMetadataLoaded])

  // Setup del listener y animation loop
  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current

    if (!video || !container) return

    // Pausar el video (no queremos autoplay)
    video.pause()

    // Registrar listener de metadata
    video.addEventListener('loadedmetadata', handleMetadataLoaded)

    // Registrar listener de scroll (passive para mejor performance)
    container.addEventListener('scroll', handleScroll, { passive: true })

    // Iniciar el animation loop
    rafIdRef.current = requestAnimationFrame(animationLoop)

    // Cleanup
    return () => {
      video.removeEventListener('loadedmetadata', handleMetadataLoaded)
      container.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafIdRef.current)
    }
  }, [containerRef, videoRef, handleScroll, handleMetadataLoaded, animationLoop])

  return {
    isReady: isReadyRef.current,
  }
}
