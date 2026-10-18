import { blob, colours, rng } from './art'

// The seven things that come with every set, drawn where they sit on
// Katsuro's real tray: pickles top left, wasabi and pink salt top right,
// katsu sauce on the right, miso bottom right, rice bottom left, cabbage on
// the plate beside the katsu.

export const PART_POS = {
  rice: { x: 152, y: 612 },
  cabbage: { x: 636, y: 392 },
  sauce: { x: 880, y: 396 },
  miso: { x: 846, y: 614 },
  salt: { x: 892, y: 142 },
  pickles: { x: 150, y: 150 },
  wasabi: { x: 812, y: 142 },
  curry: { x: 118, y: 394 },
}

export function Rice() {
  const r = rng(11)
  const grains = Array.from({ length: 150 }, () => {
    const a = r() * Math.PI * 2
    const d = Math.sqrt(r()) * 80
    return { x: Math.cos(a) * d, y: Math.sin(a) * d, rot: r() * 180, c: r() > 0.7 ? '#F1ECE1' : '#FFFFFF' }
  })
  const sesame = Array.from({ length: 8 }, () => ({ x: (r() - 0.5) * 50, y: (r() - 0.7) * 40, rot: r() * 180 }))
  return (
    <g>
      <circle r={106} fill={colours.bowl} />
      <circle r={97} fill="none" stroke={colours.bowlRim} strokeWidth={4} />
      <circle r={88} fill="#E4DCCA" />
      {grains.map((g, i) => (
        <ellipse key={i} cx={g.x} cy={g.y} rx={5.5} ry={2.6} fill={g.c} transform={`rotate(${g.rot} ${g.x} ${g.y})`} />
      ))}
      {sesame.map((g, i) => (
        <ellipse key={i} cx={g.x} cy={g.y} rx={3} ry={1.6} fill="#1C1A18" transform={`rotate(${g.rot} ${g.x} ${g.y})`} />
      ))}
    </g>
  )
}

export function Cabbage() {
  const r = rng(23)
  const tones = ['#EEF0C9', '#DDE6AC', '#F6F3DC', '#CBDB93', '#E6EDBA']
  const strands = Array.from({ length: 90 }, () => {
    const x = (r() - 0.5) * 150
    const y = (r() - 0.5) * 230
    const len = 26 + r() * 40
    const a = (-60 + r() * 120) * (Math.PI / 180)
    const bend = (r() - 0.5) * 24
    return {
      d: `M${x} ${y} q ${Math.cos(a) * len * 0.5 + bend} ${Math.sin(a) * len * 0.5} ${Math.cos(a) * len} ${Math.sin(a) * len}`,
      c: tones[Math.floor(r() * tones.length)],
    }
  })
  const seeds = Array.from({ length: 26 }, () => ({ x: (r() - 0.5) * 130, y: (r() - 0.5) * 200, rot: r() * 180 }))
  return (
    <g>
      <ellipse rx={86} ry={128} fill="#E3E8B4" opacity={0.55} />
      {strands.map((s, i) => (
        <path key={i} d={s.d} stroke={s.c} strokeWidth={3.6} strokeLinecap="round" fill="none" />
      ))}
      {seeds.map((g, i) => (
        <ellipse key={i} cx={g.x} cy={g.y} rx={2.6} ry={1.5} fill={i % 3 ? '#E6D3A0' : '#C79552'} transform={`rotate(${g.rot} ${g.x} ${g.y})`} />
      ))}
    </g>
  )
}

/** Lemon and tomato sit on the plate in their photos; they aren't part of the seven. */
export function Garnish() {
  return (
    <g>
      <g transform="translate(588 246) rotate(-150)">
        <path d="M-34 0 A34 34 0 0 1 34 0 Z" fill="#F2D35E" />
        <path d="M-27 -2 A27 27 0 0 1 27 -2 Z" fill="#F7E79A" />
        <path d="M0 -2 L-18 -20 M0 -2 L0 -26 M0 -2 L18 -20" stroke="#EDC94A" strokeWidth="2" />
      </g>
      <circle cx={668} cy={262} r={18} fill="#D3402E" />
      <ellipse cx={662} cy={255} rx={6} ry={4} fill="#F08A78" opacity={0.7} />
    </g>
  )
}

export function Sauce() {
  const ticks = Array.from({ length: 22 }, (_, k) => k)
  const r = rng(5)
  return (
    <g>
      <circle r={62} fill="#F1EEE6" />
      {ticks.map((k) => {
        const a = (k / ticks.length) * Math.PI * 2
        const x = Math.cos(a) * 55
        const y = Math.sin(a) * 55
        return <path key={k} d="M-4 3 L0 -4 L4 3 Z" fill="#2D5D96" transform={`translate(${x} ${y}) rotate(${(a * 180) / Math.PI + 90})`} />
      })}
      <circle r={45} fill="#3A1C0F" />
      <ellipse cx={-14} cy={-16} rx={14} ry={7} fill="#7A4326" opacity={0.6} />
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse key={i} cx={(r() - 0.5) * 60} cy={(r() - 0.5) * 60} rx={2.2} ry={1.3} fill="#DCC69C" />
      ))}
    </g>
  )
}

export function Miso() {
  const r = rng(31)
  return (
    <g>
      <circle r={101} fill={colours.bowl} />
      <circle r={92} fill="none" stroke={colours.bowlRim} strokeWidth={4} />
      <circle r={84} fill="url(#miso)" />
      {[[-26, -12], [10, 22], [28, -26], [-6, 34]].map(([x, y], i) => (
        <rect key={i} x={x - 9} y={y - 9} width={18} height={18} rx={3} fill="#F2E8D0" transform={`rotate(${i * 21} ${x} ${y})`} />
      ))}
      {Array.from({ length: 5 }, (_, i) => (
        <path key={i} d={blob((r() - 0.5) * 100, (r() - 0.5) * 100, 12, 6, { rot: r() * 180, seed: 40 + i, jitter: 0.5 })} fill="#2F4A2B" opacity={0.85} />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <circle key={i} cx={(r() - 0.5) * 110} cy={(r() - 0.5) * 110} r={5} fill="none" stroke="#9CC46A" strokeWidth={2.6} />
      ))}
    </g>
  )
}

export function Pickles() {
  const lobes = 5
  let d = ''
  for (let k = 0; k <= lobes * 12; k++) {
    const th = (k / (lobes * 12)) * Math.PI * 2 - Math.PI / 2
    const rr = 74 + 12 * Math.cos(th * lobes)
    d += `${k ? 'L' : 'M'}${(Math.cos(th) * rr).toFixed(1)} ${(Math.sin(th) * rr).toFixed(1)}`
  }
  return (
    <g>
      <path d={d + 'Z'} fill="#A79F8C" />
      <path d={d + 'Z'} fill="#C2B9A4" transform="scale(0.84)" />
      <path d={blob(18, -14, 30, 22, { seed: 3, jitter: 0.3 })} fill="#F1E3AC" />
      <path d={blob(-24, -18, 22, 14, { rot: 30, seed: 4, jitter: 0.3 })} fill="#E9A1A9" />
      <path d={blob(-30, 8, 18, 12, { rot: -20, seed: 5, jitter: 0.3 })} fill="#E28E98" />
      {[[-6, 26], [20, 22], [34, 2], [-34, 34]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={14} fill="#6E9A4D" />
          <circle cx={x} cy={y} r={9} fill="#B7D18E" />
        </g>
      ))}
    </g>
  )
}

/** The small slate dish: wasabi on the left, pink salt on the right. */
export function Slate() {
  return <path d={blob(-40, 0, 94, 58, { seed: 9, jitter: 0.08, n: 18 })} transform="translate(40 0)" fill="#474A4F" />
}

export function Wasabi() {
  return (
    <g>
      <path d={blob(0, 0, 25, 21, { seed: 12, jitter: 0.25 })} fill="#A9C24F" />
      <path d={blob(-5, -6, 12, 8, { seed: 13, jitter: 0.4 })} fill="#C5D877" />
    </g>
  )
}

export function Salt() {
  const r = rng(17)
  return (
    <g>
      {Array.from({ length: 60 }, (_, i) => {
        const a = r() * Math.PI * 2
        const d = Math.sqrt(r()) * 24
        return <circle key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d * 0.8} r={1.6 + r() * 1.6} fill={['#EBCBC3', '#F5E3DE', '#D8A79E'][i % 3]} />
      })}
    </g>
  )
}

export function CurryBowl() {
  return (
    <g>
      <circle r={64} fill={colours.bowl} />
      <circle r={52} fill="url(#curry)" />
      <ellipse cx={-14} cy={-16} rx={16} ry={8} fill="#C99146" opacity={0.6} />
    </g>
  )
}
