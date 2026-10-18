import { useId, type ReactNode } from 'react'
import { CUTLET_BOX, CUTLET_SLICE_BOXES, CUTLET_SLICES } from '../../assets/logoPaths'

// Drawing helpers for the tray. Everything is flat colour in the spirit of
// the logo: the katsu is the logo's sliced cutlet, the dishes are the ones on
// Katsuro's real trays (see research/instagram/DeeXS92DEw0_2.jpg).

export function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** A smooth blob with a crumbed, irregular edge. */
export function blob(cx: number, cy: number, rx: number, ry: number, opts: { rot?: number; jitter?: number; n?: number; seed?: number } = {}) {
  const { rot = 0, jitter = 0.12, n = 28, seed = 1 } = opts
  const r = rng(seed)
  const cos = Math.cos((rot * Math.PI) / 180)
  const sin = Math.sin((rot * Math.PI) / 180)
  const pts: [number, number][] = []
  for (let k = 0; k < n; k++) {
    const th = (k / n) * Math.PI * 2
    const f = 1 + (r() - 0.5) * jitter
    const x = Math.cos(th) * rx * f
    const y = Math.sin(th) * ry * f
    pts.push([cx + x * cos - y * sin, cy + x * sin + y * cos])
  }
  const mid = (a: [number, number], b: [number, number]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
  let d = ''
  for (let k = 0; k < n; k++) {
    const p = pts[k]
    const q = pts[(k + 1) % n]
    const m = mid(p, q)
    if (k === 0) {
      const m0 = mid(pts[n - 1], p)
      d += `M${m0[0].toFixed(1)} ${m0[1].toFixed(1)}`
    }
    d += `Q${p[0].toFixed(1)} ${p[1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`
  }
  return d + 'Z'
}

export const colours = {
  crust: '#E98A3D',
  crustDark: '#C2621F',
  crustLight: '#F4A65B',
  pork: '#F2E2CF',
  pink: '#E7A79C',
  chicken: '#F6E8D6',
  cheese: '#F6E39A',
  egg: '#F3CD4C',
  tofu: '#F8F4EA',
  menchi: '#A5694A',
  pumpkin: '#E8A23C',
  prawnTail: '#DE5B36',
  oyster: '#D9C7A4',
  bowl: '#181514',
  bowlRim: '#2C2826',
}

const crumbDots = (() => {
  const r = rng(7)
  return Array.from({ length: 22 }, () => ({
    x: r() * 26,
    y: r() * 26,
    rr: 0.8 + r() * 1.8,
    c: r() > 0.5 ? colours.crustDark : colours.crustLight,
    o: 0.35 + r() * 0.45,
  }))
})()

function CrumbPattern({ id, scale = 1 }: { id: string; scale?: number }) {
  return (
    <pattern id={id} width="26" height="26" patternUnits="userSpaceOnUse" patternTransform={scale === 1 ? undefined : `scale(${scale})`}>
      {crumbDots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.rr} fill={d.c} opacity={d.o} />
      ))}
    </pattern>
  )
}

/** Shared <defs>: the crumb texture laid over every fried piece. */
export function TrayDefs() {
  return (
    <defs>
      <CrumbPattern id="crumb" />
      <radialGradient id="miso" cx="45%" cy="40%" r="65%">
        <stop offset="0%" stopColor="#D49A4C" />
        <stop offset="100%" stopColor="#A2642A" />
      </radialGradient>
      <radialGradient id="curry" cx="45%" cy="40%" r="65%">
        <stop offset="0%" stopColor="#B67A30" />
        <stop offset="100%" stopColor="#874F1C" />
      </radialGradient>
      <radialGradient id="glaze" cx="38%" cy="32%" r="75%">
        <stop offset="0%" stopColor="#6B8692" />
        <stop offset="100%" stopColor="#4B6470" />
      </radialGradient>
      <clipPath id="rack-clip">
        <rect x="-150" y="-160" width="300" height="320" rx="10" />
      </clipPath>
    </defs>
  )
}

/** A crumbed piece: crust, crumb texture, and optionally a cut face. */
export function Fried({ d, face, faceD, extra }: { d: string; face?: string; faceD?: string; extra?: ReactNode }) {
  return (
    <g>
      <path d={d} fill={colours.crust} />
      <path d={d} fill="url(#crumb)" />
      {face && faceD && <path d={faceD} fill={face} />}
      {extra}
    </g>
  )
}

/** One slice of the logo's cutlet, scaled into tray units, with a cut face. */
export function CutletSlices({
  width,
  face,
  inner,
  only,
  cheese,
}: {
  width: number
  face: string
  inner?: string
  only?: number[]
  cheese?: boolean
}) {
  const s = width / CUTLET_BOX.w
  const crumbId = useId().replace(/:/g, '')
  return (
    <g transform={`scale(${s}) translate(${-CUTLET_BOX.x - CUTLET_BOX.w / 2} ${-CUTLET_BOX.y - CUTLET_BOX.h / 2})`}>
      <defs>
        <CrumbPattern id={crumbId} scale={1 / s} />
      </defs>
      {CUTLET_SLICES.map((d, i) => {
        if (only && !only.includes(i)) return null
        const [x0, y0, x1, y1] = CUTLET_SLICE_BOXES[i]
        const cx = (x0 + x1) / 2
        const cy = (y0 + y1) / 2
        const faceT = `translate(${cx} ${cy}) scale(0.5 0.82) translate(${-cx} ${-cy})`
        const innerT = `translate(${cx} ${cy}) scale(0.24 0.6) translate(${-cx} ${-cy})`
        return (
          <g key={i} className="tray__slice" style={{ ['--i' as string]: i }}>
            <path d={d} fill={colours.crust} />
            <path d={d} fill={`url(#${crumbId})`} />
            <path d={d} fill={face} transform={faceT} />
            {inner && <path d={d} fill={inner} transform={innerT} opacity={0.9} />}
            {cheese && (
              <path
                d={`M${cx - 40} ${y1 - 120} q 20 160 40 150 q 22 -6 26 -150 Z`}
                fill={colours.cheese}
              />
            )}
          </g>
        )
      })}
    </g>
  )
}

/** Ring of ridges on the glazed plate, like Katsuro's ribbed plates. */
export function PlateRidges({ r0, r1, n = 132 }: { r0: number; r1: number; n?: number }) {
  const lines = []
  for (let k = 0; k < n; k++) {
    const th = (k / n) * Math.PI * 2
    const c = Math.cos(th)
    const s = Math.sin(th)
    lines.push(
      <line
        key={k}
        x1={c * r0}
        y1={s * r0}
        x2={c * r1}
        y2={s * r1}
        stroke={k % 2 ? 'rgba(255,255,255,0.11)' : 'rgba(10,20,25,0.16)'}
        strokeWidth={k % 2 ? 2.4 : 3}
      />,
    )
  }
  return <g>{lines}</g>
}
