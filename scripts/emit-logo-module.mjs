// One-off: turn scripts/logo-paths.json into src/assets/logoPaths.ts.
import { readFile, writeFile } from 'node:fs/promises'

const p = JSON.parse(await readFile('scripts/logo-paths.json', 'utf8'))
const round = (d) => d.replace(/-?\d+\.\d+/g, (n) => (+n).toFixed(1).replace(/\.0$/, ''))

function bbox(d) {
  const nums = d.match(/-?\d+(\.\d+)?/g).map(Number)
  const xs = nums.filter((_, i) => i % 2 === 0)
  const ys = nums.filter((_, i) => i % 2 === 1)
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)].map(Math.round)
}

const slices = p.cutlet.split(/(?=M)/).map((s) => round(s.trim())).filter(Boolean)
slices.sort((a, b) => bbox(a)[0] - bbox(b)[0])
const sliceBoxes = slices.map(bbox)

const out = `// Traced from the Katsuro logo (scripts/trace-logo.mjs). Coordinates are in the
// original 2084px logo canvas; use the viewBox constants below to crop.
export const LOGO_VIEWBOX = '315 378 1455 1330'
export const CUTLET_VIEWBOX = '${p.boxes.cutlet.join(' ')}'
export const WORDMARK_VIEWBOX = '315 1356 1455 350'

/** The six slices of the cutlet, left to right. */
export const CUTLET_SLICES: string[] = ${JSON.stringify(slices, null, 1)}

/** [minX, minY, maxX, maxY] for each slice. */
export const CUTLET_SLICE_BOXES: [number, number, number, number][] = ${JSON.stringify(sliceBoxes)}

export const CUTLET_BOX = { x: ${p.boxes.cutlet[0]}, y: ${p.boxes.cutlet[1]}, w: ${p.boxes.cutlet[2]}, h: ${p.boxes.cutlet[3]} }

export const WORDMARK_PATH = ${JSON.stringify(round(p.wordmark))}
export const STAMP_PATH = ${JSON.stringify(round(p.stamp))}
export const KANJI_PATH = ${JSON.stringify(round(p.kanji))}
`
await writeFile('src/assets/logoPaths.ts', out)
console.log('slices', slices.length, sliceBoxes)
