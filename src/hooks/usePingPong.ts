import { useEffect } from 'react'

export function usePingPong(
  fwdRef: React.RefObject<HTMLVideoElement | null>,
  revRef: React.RefObject<HTMLVideoElement | null>,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return
    if (!fwdRef.current || !revRef.current) return
    const fwd: HTMLVideoElement = fwdRef.current
    const rev: HTMLVideoElement = revRef.current

    let switched = false

    function reset() {
      switched = false
      fwd.style.opacity = '1'
      rev.style.opacity = '0'
      fwd.style.transition = 'none'
      rev.style.transition = 'none'
    }

    function showOnly(show: HTMLVideoElement, hide: HTMLVideoElement) {
      show.style.transition = 'none'
      hide.style.transition = 'none'
      show.style.opacity = '1'
      hide.style.opacity = '0'
    }

    // Pre-seek reverse to 0 so its first frame is decoded
    function primeReverse() {
      rev.currentTime = 0
      rev.load()
    }

    function onFwdTimeUpdate() {
      if (switched) return
      const remaining = fwd.duration - fwd.currentTime
      if (!isNaN(remaining) && remaining <= 0.08) {
        switched = true
        rev.currentTime = 0
        const p = rev.play()
        if (p) {
          p.then(() => showOnly(rev, fwd)).catch(() => {})
        } else {
          showOnly(rev, fwd)
        }
      }
    }

    function onRevEnded() {
      switched = false
      fwd.currentTime = 0
      const p = fwd.play()
      if (p) {
        p.then(() => showOnly(fwd, rev)).catch(() => {})
      } else {
        showOnly(fwd, rev)
      }
    }

    reset()
    primeReverse()

    fwd.addEventListener('timeupdate', onFwdTimeUpdate)
    rev.addEventListener('ended', onRevEnded)
    fwd.play().catch(() => {})

    return () => {
      fwd.removeEventListener('timeupdate', onFwdTimeUpdate)
      rev.removeEventListener('ended', onRevEnded)
      fwd.pause()
      rev.pause()
    }
  }, [fwdRef, revRef, enabled])
}
