import type { ReactNode } from 'react'
import type { KatsuShape } from '../../data/katsuro'
import { blob, colours, CutletSlices, Fried, rng } from './art'

/** A rounded rectangle with a slightly uneven, crumbed edge. */
export function rrect(cx: number, cy: number, w: number, h: number, opts: { rot?: number; seed?: number; jitter?: number } = {}) {
  const { rot = 0, seed = 1, jitter = 2.2 } = opts
  const r = rng(seed)
  const rad = Math.min(w, h) * 0.22
  const hw = w / 2 - rad
  const hh = h / 2 - rad
  const pts: [number, number][] = []
  const corners: [number, number, number][] = [
    [hw, hh, 0],
    [-hw, hh, 90],
    [-hw, -hh, 180],
    [hw, -hh, 270],
  ]
  for (const [ox, oy, a0] of corners) {
    for (let k = 0; k <= 4; k++) {
      const a = ((a0 + k * 22.5) * Math.PI) / 180
      const j = (r() - 0.5) * jitter * 2
      pts.push([ox + Math.cos(a) * (rad + j), oy + Math.sin(a) * (rad + j)])
    }
  }
  const c = Math.cos((rot * Math.PI) / 180)
  const s = Math.sin((rot * Math.PI) / 180)
  return (
    pts
      .map(([x, y], i) => `${i ? 'L' : 'M'}${(cx + x * c - y * s).toFixed(1)} ${(cy + x * s + y * c).toFixed(1)}`)
      .join('') + 'Z'
  )
}

function Prawn({ x, y, len, rot, seed }: { x: number; y: number; len: number; rot: number; seed: number }) {
  const rad = (rot * Math.PI) / 180
  const tx = x + Math.cos(rad) * (len / 2 + 4)
  const ty = y + Math.sin(rad) * (len / 2 + 4)
  return (
    <g>
      <g transform={`translate(${tx} ${ty}) rotate(${rot})`}>
        <path d="M-6 0 L34 -22 L27 0 L34 22 Z" fill={colours.prawnTail} />
        <path d="M-4 0 L26 -11 L21 0 L26 11 Z" fill="#F28A62" />
      </g>
      <Fried d={blob(x, y, len / 2, len * 0.13, { rot, seed, jitter: 0.26, n: 44 })} />
      <path
        d={blob(x - Math.cos(rad) * len * 0.05, y - Math.sin(rad) * len * 0.05, len * 0.36, len * 0.05, { rot, seed: seed + 5, jitter: 0.4 })}
        fill={colours.crustLight}
        opacity={0.55}
      />
    </g>
  )
}

function Tofu({ x, y, w, h, rot, seed }: { x: number; y: number; w: number; h: number; rot: number; seed: number }) {
  const r = rng(seed + 100)
  const rad = (rot * Math.PI) / 180
  return (
    <Fried
      d={rrect(x, y, w, h, { rot, seed })}
      face={colours.tofu}
      faceD={rrect(x, y, w * 0.72, h * 0.66, { rot, seed: seed + 1, jitter: 1 })}
      extra={Array.from({ length: 3 }, (_, i) => {
        const ox = (r() - 0.5) * w * 0.4
        const oy = (r() - 0.5) * h * 0.3
        return (
          <ellipse
            key={i}
            cx={x + ox * Math.cos(rad) - oy * Math.sin(rad)}
            cy={y + ox * Math.sin(rad) + oy * Math.cos(rad)}
            rx={2.6}
            ry={1.5}
            fill="#1C1A18"
            transform={`rotate(${r() * 180} ${x + ox} ${y + oy})`}
          />
        )
      })}
    />
  )
}

function Tamago({ x, y, w, h, rot, seed }: { x: number; y: number; w: number; h: number; rot: number; seed: number }) {
  return (
    <Fried
      d={rrect(x, y, w, h, { rot, seed })}
      face={colours.egg}
      faceD={rrect(x, y, w * 0.76, h * 0.64, { rot, seed: seed + 1, jitter: 1 })}
      extra={
        <g transform={`rotate(${rot} ${x} ${y})`} stroke="#E0B12E" strokeWidth={2}>
          <line x1={x - w * 0.32} y1={y - h * 0.1} x2={x + w * 0.32} y2={y - h * 0.1} />
          <line x1={x - w * 0.32} y1={y + h * 0.12} x2={x + w * 0.32} y2={y + h * 0.12} />
        </g>
      }
    />
  )
}

function Menchi({ x, y, r, seed, cut }: { x: number; y: number; r: number; seed: number; cut?: boolean }) {
  return (
    <Fried
      d={blob(x, y, r, r * 0.9, { seed, jitter: 0.14 })}
      face={cut ? colours.menchi : undefined}
      faceD={cut ? blob(x, y, r * 0.62, r * 0.5, { seed: seed + 1, jitter: 0.3 }) : undefined}
    />
  )
}

const CENTRE = { x: 430, y: 400 }

/** The pieces on the rack for each set, as separate nodes so they can land one at a time. */
export function katsuPieces(shape: KatsuShape): ReactNode[] {
  const at = (x: number, y: number, node: ReactNode, key: string) => (
    <g key={key} transform={`translate(${x} ${y})`}>
      {node}
    </g>
  )
  switch (shape) {
    case 'premium':
      return [at(CENTRE.x, CENTRE.y, <CutletSlices width={310} face={colours.pork} inner={colours.pink} />, 'c')]
    case 'cutlet':
      return [at(CENTRE.x, CENTRE.y, <CutletSlices width={300} face={colours.pork} />, 'c')]
    case 'cheese':
      return [at(CENTRE.x, CENTRE.y, <CutletSlices width={300} face={colours.cheese} cheese />, 'c')]
    case 'chicken':
      return [at(CENTRE.x - 14, CENTRE.y + 6, <CutletSlices width={290} face={colours.chicken} only={[1, 2, 3, 4, 5]} />, 'c')]
    case 'combo':
      return [
        at(CENTRE.x - 20, CENTRE.y - 24, <CutletSlices width={262} face={colours.pork} />, 'c'),
        <Menchi key="m" x={520} y={548} r={44} seed={5} cut />,
      ]
    case 'menchi':
      return [
        <Menchi key="a" x={352} y={344} r={58} seed={2} />,
        <Menchi key="b" x={492} y={366} r={58} seed={3} cut />,
        <Menchi key="c" x={408} y={478} r={58} seed={4} />,
      ]
    case 'ebi':
      return [0, 1, 2, 3].map((i) => (
        <Prawn key={i} x={322 + i * 62} y={418 - i * 8} len={236} rot={-62 + i * 4} seed={20 + i} />
      ))
    case 'tofu':
      return [0, 1, 2, 3, 4, 5].map((i) => {
        const col = i % 3
        const row = Math.floor(i / 3)
        return <Tofu key={i} x={330 + col * 98} y={350 + row * 102 + (col % 2) * 10} w={84} h={70} rot={-8 + i * 4} seed={30 + i} />
      })
    case 'tamago':
      return [
        <Tamago key="a" x={372} y={392} w={128} h={92} rot={-12} seed={41} />,
        <Tamago key="b" x={498} y={416} w={128} h={92} rot={8} seed={42} />,
      ]
    case 'veg-combo':
      return [
        ...[0, 1, 2, 3, 4, 5].map((i) => {
          const col = i % 2
          const row = Math.floor(i / 2)
          return <Tofu key={'t' + i} x={318 + col * 72} y={318 + row * 74} w={64} h={54} rot={-6 + i * 3} seed={50 + i} />
        }),
        <Tamago key="ta" x={510} y={352} w={92} h={66} rot={-10} seed={61} />,
        <Tamago key="tb" x={514} y={452} w={92} h={66} rot={6} seed={62} />,
      ]
  }
}

/** Where add-ons land: around the lower rim of the plate. */
export const ADD_ON_SLOTS: [number, number][] = [
  [490, 600],
  [405, 581],
  [575, 581],
  [337, 529],
  [643, 529],
  [302, 468],
  [678, 468],
  [337, 271],
]

/** A small drawing of each add-on katsu, centred on 0,0. */
export function addOnPiece(name: string): ReactNode {
  switch (name) {
    case 'Cheese Katsu (2pcs)':
      return (
        <>
          <Fried d={rrect(-20, 0, 36, 52, { rot: -8, seed: 71 })} face={colours.cheese} faceD={rrect(-20, 0, 18, 38, { rot: -8, seed: 72 })} />
          <Fried d={rrect(20, 2, 36, 52, { rot: 6, seed: 73 })} face={colours.cheese} faceD={rrect(20, 2, 18, 38, { rot: 6, seed: 74 })} />
        </>
      )
    case 'Menchi Katsu (1pc)':
      return <Menchi x={0} y={0} r={30} seed={75} />
    case 'Chicken Katsu (1pc)':
      return <Fried d={blob(0, 0, 40, 27, { seed: 76, rot: -14 })} face={colours.chicken} faceD={blob(0, 0, 22, 12, { seed: 77, rot: -14 })} />
    case 'Kaki Fry (2pcs)':
      return (
        <>
          <Fried d={blob(-18, 0, 20, 26, { seed: 78, rot: 20, jitter: 0.3 })} />
          <Fried d={blob(18, 2, 20, 26, { seed: 79, rot: -16, jitter: 0.3 })} />
        </>
      )
    case 'Ebi Katsu (1pc)':
      return <Prawn x={-8} y={0} len={92} rot={-20} seed={80} />
    case 'Tamago Katsu (2pcs)':
      return (
        <>
          <Tamago x={-20} y={0} w={38} h={30} rot={-10} seed={81} />
          <Tamago x={20} y={4} w={38} h={30} rot={8} seed={82} />
        </>
      )
    case 'Tofu Katsu (2pcs)':
      return (
        <>
          <Tofu x={-20} y={0} w={36} h={30} rot={-6} seed={83} />
          <Tofu x={19} y={3} w={36} h={30} rot={10} seed={84} />
        </>
      )
    case 'Pumpkin croquettes (1pc)':
      return <Fried d={blob(0, 0, 34, 24, { seed: 85, rot: 10 })} face={colours.pumpkin} faceD={blob(0, 0, 16, 10, { seed: 86, rot: 10 })} />
    default:
      return null
  }
}
