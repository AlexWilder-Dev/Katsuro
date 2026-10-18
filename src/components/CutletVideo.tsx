import { useEffect, useRef } from 'react'
import { useReducedMotion, useScroll } from 'framer-motion'
import { CUTLET_BOX, CUTLET_SLICES } from '../assets/logoPaths'
import { media } from '../lib/format'

/**
 * Katsuro's own kitchen footage, cut into the six slices of the cutlet in
 * their logo. The slices drop in one by one (like a katsu being cut and laid
 * down), start out in the logo's orange, and the video fades up inside them.
 * Scrolling away spreads the slices apart a little.
 */
export function CutletVideo({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end start'] })

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    const video = videoRef.current
    if (!canvas || !wrap || !video) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const paths = CUTLET_SLICES.map((d) => new Path2D(d))
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    const useVideo = !reduce && !saveData

    const poster = new Image()
    poster.src = media('katsu-cut-poster.jpg')

    let width = 0
    let height = 0
    let dpr = 1
    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    // Only fade the footage in once a frame has actually been decoded, so the
    // slices never flash black.
    let videoReadyAt = 0
    type FrameVideo = HTMLVideoElement & { requestVideoFrameCallback?: (cb: () => void) => number }
    const fv = video as FrameVideo
    const markReady = () => {
      if (!videoReadyAt) videoReadyAt = performance.now()
    }
    const onPlaying = () => {
      if (fv.requestVideoFrameCallback) fv.requestVideoFrameCallback(markReady)
      else window.setTimeout(markReady, 200)
    }
    video.addEventListener('playing', onPlaying)

    let visible = true
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (!useVideo) return
      if (visible) video.play().catch(() => {})
      else video.pause()
    })
    io.observe(wrap)

    if (useVideo) {
      video.src = video.canPlayType('video/webm; codecs="vp9"') ? media('katsu-cut.webm') : media('katsu-cut.mp4')
      video.play().catch(() => {})
    }

    const start = performance.now()
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)
    let raf = 0

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw)
      if (!visible || !width) return
      const s = width / CUTLET_BOX.w
      const spread = reduce ? 0 : scrollYProgress.get()
      const fade = videoReadyAt ? Math.min(1, (t - videoReadyAt) / 700) : 0
      const hasFrame = video.readyState >= 2
      const posterReady = poster.complete && poster.naturalWidth > 0

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      paths.forEach((path, i) => {
        const p = reduce ? 1 : ease(Math.min(1, Math.max(0, (t - start - 120 - i * 75) / 650)))
        if (p <= 0) return
        const dx = (i - 2.5) * spread * width * 0.035
        const dy = (1 - p) * -height * 0.22 + spread * height * 0.04 * (i % 2 ? 1 : -1)
        ctx.save()
        ctx.globalAlpha = p
        ctx.setTransform(dpr * s, 0, 0, dpr * s, dpr * dx, dpr * dy)
        ctx.translate(-CUTLET_BOX.x, -CUTLET_BOX.y)
        ctx.clip(path)
        ctx.fillStyle = '#EE9145'
        ctx.fillRect(CUTLET_BOX.x, CUTLET_BOX.y, CUTLET_BOX.w, CUTLET_BOX.h)
        if (useVideo && hasFrame && fade > 0) {
          ctx.globalAlpha = p * fade
          ctx.drawImage(video, CUTLET_BOX.x, CUTLET_BOX.y, CUTLET_BOX.w, CUTLET_BOX.h)
        } else if (posterReady && (!useVideo || t - start > 2500)) {
          // No video (reduced motion, Save-Data, or autoplay refused): their still frame instead.
          const since = useVideo ? t - start - 2500 : t - start
          ctx.globalAlpha = p * Math.min(1, since / 700)
          ctx.drawImage(poster, CUTLET_BOX.x, CUTLET_BOX.y, CUTLET_BOX.w, CUTLET_BOX.h)
        }
        ctx.restore()
      })
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      video.removeEventListener('playing', onPlaying)
      video.pause()
    }
  }, [reduce, scrollYProgress])

  return (
    <div ref={wrapRef} className={`cutlet-video ${className ?? ''}`}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Katsuro's kitchen: cheese katsu, plating, katsu resting over the fryer and a sliced tonkatsu, shown inside the six slices of the logo's cutlet"
      />
      <video ref={videoRef} muted playsInline loop preload="auto" aria-hidden="true" tabIndex={-1} />
    </div>
  )
}
