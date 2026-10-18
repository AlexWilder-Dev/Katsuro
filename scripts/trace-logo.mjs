// One-off: trace the Katsuro logo PNG into SVG layers (cutlet, wordmark, stamp).
import sharp from 'sharp'
import potrace from 'potrace'
import { writeFile } from 'node:fs/promises'
import { promisify } from 'node:util'

const SRC = 'research/images/ca4f4f_74ef0dbef939431aad366a0f708d27e4~mv2.png'
const trace = promisify(potrace.trace)

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { width, height } = info

// Build a black-on-white mask for pixels that match a test.
async function mask(test) {
  const out = Buffer.alloc(width * height)
  for (let i = 0; i < width * height; i++) {
    const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2], a = data[i * 4 + 3]
    out[i] = a > 128 && test(r, g, b, i % width, Math.floor(i / width)) ? 0 : 255
  }
  return sharp(out, { raw: { width, height, channels: 1 } }).png().toBuffer()
}

const layers = {
  cutlet: (r, g, b) => r > 200 && g > 110 && g < 180 && b < 110,
  wordmark: (r, g, b) => r < 80 && g < 80 && b < 80,
  stamp: (r, g, b) => r > 140 && g < 90 && b < 90,
}

// White kanji sit inside the red stamp; only look inside its box.
const stampBox = { x0: 1576, x1: 1768, y0: 1358, y1: 1704 }

layers.kanji = (r, g, b, x, y) =>
  r > 220 && g > 220 && b > 220 && x > stampBox.x0 && x < stampBox.x1 && y > stampBox.y0 && y < stampBox.y1

// Pixel bounds of each layer, so components can crop the viewBox.
function bounds(test) {
  let x0 = width, y0 = height, x1 = 0, y1 = 0
  for (let i = 0; i < width * height; i++) {
    const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2], a = data[i * 4 + 3]
    const x = i % width, y = Math.floor(i / width)
    if (a > 128 && test(r, g, b, x, y)) {
      if (x < x0) x0 = x
      if (x > x1) x1 = x
      if (y < y0) y0 = y
      if (y > y1) y1 = y
    }
  }
  return [x0, y0, x1 - x0 + 1, y1 - y0 + 1]
}

const result = {}
const boxes = {}
for (const [name, test] of Object.entries(layers)) {
  const png = await mask(test)
  const svg = await trace(png, { turdSize: 20, optTolerance: 0.3, threshold: 128 })
  const d = svg.match(/ d="([^"]+)"/)[1]
  result[name] = d
  boxes[name] = bounds(test)
  console.log(name, d.length, boxes[name])
}
await writeFile('scripts/logo-paths.json', JSON.stringify({ width, height, boxes, ...result }, null, 1))
