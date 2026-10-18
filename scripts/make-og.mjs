// One-off: build public/og.jpg (1200x630 link-preview card) and the favicons
// from Katsuro's own share photo and the traced logo.
import sharp from 'sharp'
import { readFile, stat, writeFile } from 'node:fs/promises'

const paths = JSON.parse(await readFile('scripts/logo-paths.json', 'utf8'))
const slices = paths.cutlet
const NOREN = '#EADBB9'

const logoSvg = (w) => {
  const vb = [315, 378, 1455, 1330]
  const h = Math.round((w * vb[3]) / vb[2])
  return {
    h,
    svg: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${vb.join(' ')}">
  <path d="${slices}" fill="#EE9145" fill-rule="evenodd"/>
  <path d="${paths.wordmark}" fill="#17120E" fill-rule="evenodd"/>
  <path d="${paths.stamp}" fill="#B50000" fill-rule="evenodd"/>
  <path d="${paths.kanji}" fill="#FFFFFF" fill-rule="evenodd"/>
</svg>`),
  }
}

// --- og.jpg -----------------------------------------------------------------
const W = 1200
const H = 630
const PANEL = 430
const photo = await sharp('research/images/ca4f4f_59b74eab8cf549c389ae542e1d940464~mv2.jpg')
  .extract({ left: 700, top: 0, width: 2089, height: 1687 })
  .resize(W - PANEL, H)
  .modulate({ brightness: 1.03, saturation: 1.05 })
  .toBuffer()

const logo = logoSvg(330)
await sharp({ create: { width: W, height: H, channels: 3, background: NOREN } })
  .composite([
    { input: photo, left: PANEL, top: 0 },
    // the rod shadow along the top of the noren, as on the site header
    {
      input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${PANEL}" height="${H}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A2420" stop-opacity="0.16"/><stop offset="0.12" stop-color="#2A2420" stop-opacity="0"/></linearGradient></defs><rect width="${PANEL}" height="${H}" fill="url(#g)"/><rect x="${PANEL - 6}" width="6" height="${H}" fill="#17120E"/></svg>`),
      left: 0,
      top: 0,
    },
    { input: logo.svg, left: Math.round((PANEL - 330) / 2), top: Math.round((H - logo.h) / 2) },
  ])
  .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:4:4' })
  .toFile('public/og.jpg')

const og = await sharp('public/og.jpg').metadata()
const { size } = await stat('public/og.jpg')
console.log('og.jpg', og.width + 'x' + og.height, og.format, Math.round(size / 1024) + 'KB')

// --- favicons ----------------------------------------------------------------
const cb = paths.boxes.cutlet // [x, y, w, h]
const side = Math.round(cb[2] * 1.08)
const fx = cb[0] - (side - cb[2]) / 2
const fy = cb[1] - (side - cb[3]) / 2
const favSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${fx} ${fy} ${side} ${side}"><path d="${slices}" fill="#EE9145" fill-rule="evenodd"/></svg>`
await writeFile('public/favicon.svg', favSvg)
await sharp(Buffer.from(favSvg)).resize(32, 32).png().toFile('public/favicon-32.png')

// Touch icons sit on the noren cream, cutlet in the middle.
const tile = (px) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="${cb[0] - cb[2] * 0.22} ${cb[1] - (cb[2] * 1.44 - cb[3]) / 2} ${cb[2] * 1.44} ${cb[2] * 1.44}"><rect x="-5000" y="-5000" width="10000" height="10000" fill="${NOREN}"/><path d="${slices}" fill="#EE9145" fill-rule="evenodd"/></svg>`)
await sharp(tile(180)).png().toFile('public/apple-touch-icon.png')
await sharp(tile(192)).png().toFile('public/icon-192.png')
await sharp(tile(512)).png().toFile('public/icon-512.png')
console.log('favicons done')
