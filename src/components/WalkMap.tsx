import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { busStops, contact, walk } from '../data/katsuro'
import { Cutlet } from './Logo'

const W = 520
const H = 400
const PAD = 56

// Project the TfL walking route onto the SVG. Equirectangular is plenty at this scale.
const all: [number, number][] = [...walk.path, ...busStops.map((b) => [b.lat, b.lng] as [number, number])]
const lat0 = (Math.max(...all.map((p) => p[0])) + Math.min(...all.map((p) => p[0]))) / 2
const kx = Math.cos((lat0 * Math.PI) / 180)
const xs = all.map((p) => p[1] * kx)
const ys = all.map((p) => p[0])
const minX = Math.min(...xs)
const maxX = Math.max(...xs)
const minY = Math.min(...ys)
const maxY = Math.max(...ys)
const scale = Math.min((W - PAD * 2) / (maxX - minX), (H - PAD * 2) / (maxY - minY))
const offX = (W - (maxX - minX) * scale) / 2
const offY = (H - (maxY - minY) * scale) / 2
const project = (lat: number, lng: number): [number, number] => [
  offX + (lng * kx - minX) * scale,
  offY + (maxY - lat) * scale,
]

const pts = walk.path.map(([lat, lng]) => project(lat, lng))
const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join('')
// The street name runs left to right, so it follows the route reversed.
const dText = [...pts].reverse().map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join('')
const start = pts[0]
const end = pts[pts.length - 1]
// 100 m in SVG units: one degree of latitude is about 111,320 m.
const hundredMetres = (100 / 111320) * scale

/** Clapham Junction to the door: TfL's walking route, 639 m along St John's Hill. */
export function WalkMap() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const reduce = useReducedMotion()
  const go = inView || reduce

  return (
    <figure className="walkmap">
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Walking route from Clapham Junction station to Katsuro: ${walk.metres} metres, about ${walk.minutes} minutes, along St John’s Hill`}>
        <defs>
          <path id="walk-path" d={dText} />
        </defs>
        <path d={d} fill="none" stroke="var(--line-strong)" strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" />
        <motion.path
          d={d}
          fill="none"
          stroke="var(--katsu)"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: go ? 1 : 0 }}
          transition={{ duration: 2.4, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
        />
        <text className="walkmap__street" dy={-18}>
          <textPath href="#walk-path" startOffset="44%" textAnchor="middle">
            ST JOHN’S HILL
          </textPath>
        </text>

        {busStops.map((b, i) => {
          const [x, y] = project(b.lat, b.lng)
          return (
            <g key={b.name} className="walkmap__bus">
              <rect x={x - 8} y={y - 8} width={16} height={16} rx={3} />
              <text x={i === 0 ? x + 14 : x - 12} y={y + 34} textAnchor={i === 0 ? 'start' : 'start'}>
                {b.name}
              </text>
            </g>
          )
        })}

        <g className="walkmap__start">
          <circle cx={start[0]} cy={start[1]} r={13} />
          <circle cx={start[0]} cy={start[1]} r={5} className="walkmap__start-dot" />
          <text x={start[0] + 4} y={start[1] - 26} textAnchor="end">
            Clapham Junction
          </text>
        </g>

        <motion.g
          initial={reduce ? false : { opacity: 0, scale: 0.4 }}
          animate={go ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
          transition={{ delay: 2.3, type: 'spring', stiffness: 260, damping: 14 }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        >
          <g transform={`translate(${end[0] - 36} ${end[1] - 64})`}>
            <Cutlet width={72} height={46} />
          </g>
        </motion.g>
        <text x={end[0]} y={end[1] - 76} textAnchor="middle" className="walkmap__end-label">
          Katsuro
        </text>

        <g className="walkmap__scale" transform={`translate(${W - PAD - hundredMetres} ${H - 22})`}>
          <line x1={0} y1={0} x2={hundredMetres} y2={0} />
          <line x1={0} y1={-5} x2={0} y2={5} />
          <line x1={hundredMetres} y1={-5} x2={hundredMetres} y2={5} />
          <text x={hundredMetres / 2} y={-9} textAnchor="middle">
            100 m
          </text>
        </g>
        <g className="walkmap__north" transform={`translate(${PAD - 30} 24)`}>
          <path d="M0 14 L7 -8 L14 14 L7 9 Z" />
          <text x={7} y={30} textAnchor="middle">
            N
          </text>
        </g>
      </svg>
      <figcaption>
        <strong>
          {walk.minutes} minutes, {walk.metres} m
        </strong>{' '}
        from Clapham Junction, straight along St John’s Hill to {contact.address[0]}. Route from TfL; blue squares are bus stops.
      </figcaption>
    </figure>
  )
}
