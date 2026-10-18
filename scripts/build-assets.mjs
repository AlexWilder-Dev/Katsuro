// One-off: resize Katsuro's own photos from research/ into public/media/.
// Each photo gets a 640px and a 1280px width (WebP + JPEG).
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const W = 'research/images/'
const IG = 'research/instagram/'
const V = 'research/video/'
const OUT = 'public/media/'

// name: [source, crop as fractions {l, t, w, h} or null]
const photos = {
  tonkatsu: [W + 'ca4f4f_59b74eab8cf549c389ae542e1d940464~mv2.jpg', null],
  cheese: [W + 'ca4f4f_65909c91fc7543309b69d294361f286df000.jpg', { l: 0.02, t: 0.045, w: 0.96, h: 0.91 }],
  chicken: [W + 'ca4f4f_7baccf3509b0411aab7d1e56d7e4eb31~mv2.jpg', null],
  tofu: [W + 'ca4f4f_27924d44b807432292f072f71b5e247a~mv2.jpg', null],
  chefs: [W + 'ca4f4f_cc442be2299d4f4686813cf6e710245a~mv2.jpg', null],
  pounding: [W + 'ca4f4f_42ba200ebd804cf888176c43eec06bfe~mv2.jpg', null],
  shopfront: [W + 'ca4f4f_c3f431e262eb4afda92e6fa3099baa9d~mv2.jpg', null],
  drinks: [W + 'ca4f4f_0eecfdcaaf09405482bd26019023fa65~mv2.jpg', null],
  team: [W + 'ca4f4f_cd97b17dff7c404baa925024c82db8f1~mv2.jpg', null],
  'team-tall': [W + 'ca4f4f_de854cba7cee482a85ca4ffe84abb73e~mv2.jpg', null],
  counter: [IG + 'DdEP5XNjD_p_2.jpg', null],
  room: [IG + 'DdEP5XNjD_p_1.jpg', null],
  table: [IG + 'DdEP5XNjD_p_0.jpg', null],
  'ebi-tray': [IG + 'DeeXS92DEw0_2.jpg', null],
  ebi: [IG + 'DeeXS92DEw0_0.jpg', null],
  'ebi-close': [IG + 'DeeXS92DEw0_1.jpg', null],
  'tofu-curry': [IG + 'DeOfjbcMjH-.jpg', null],
  aburi: [IG + 'DeURwzvMjft.jpg', null],
  'cheese-pull': [IG + 'DdY1gcCskHN.jpg', null],
  'panko-reel': [IG + 'Ddgyp7rM0L6.jpg', null],
  noren: [V + 'frame_11.jpg', { l: 0, t: 0.035, w: 1, h: 0.93 }],
}

await mkdir(OUT, { recursive: true })
for (const [name, [src, crop]] of Object.entries(photos)) {
  const meta = await sharp(src).metadata()
  for (const width of [640, 1280]) {
    let img = sharp(src).rotate()
    if (crop) {
      img = img.extract({
        left: Math.round(crop.l * meta.width),
        top: Math.round(crop.t * meta.height),
        width: Math.round(crop.w * meta.width),
        height: Math.round(crop.h * meta.height),
      })
    }
    const w = Math.min(width, meta.width)
    img = img.resize({ width: w, withoutEnlargement: true })
    await img.clone().webp({ quality: 74 }).toFile(`${OUT}${name}-${width}.webp`)
    await img.clone().jpeg({ quality: 76, mozjpeg: true }).toFile(`${OUT}${name}-${width}.jpg`)
  }
  const done = await sharp(`${OUT}${name}-1280.jpg`).metadata()
  console.log(name, done.width + 'x' + done.height)
}
