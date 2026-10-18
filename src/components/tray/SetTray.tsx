import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import {
  contact,
  links,
  mainMenu,
  premiumNote,
  quotes,
  refillNote,
  setAddOnIds,
  setChoices,
  setIncludesLine,
  type MenuItem,
} from '../../data/katsuro'
import { pounds } from '../../lib/format'
import { Marks } from '../Marks'
import { Photo } from '../Photo'
import { QuoteLine } from '../QuoteLine'
import { useOrderSheet } from '../OrderSheet'
import { PlateRidges, TrayDefs } from './art'
import { CurryBowl, Cabbage, Garnish, Miso, PART_POS, Pickles, Rice, Salt, Sauce, Slate, Wasabi } from './dishes'
import { ADD_ON_SLOTS, addOnPiece, katsuPieces } from './katsu'

const sets = mainMenu.find((s) => s.id === 'sets')!.items
const addOnItems = mainMenu.find((s) => s.id === 'add-ons')!.items
const addOns = setAddOnIds.map((name) => addOnItems.find((i) => i.name === name)!).filter(Boolean)

type PartKey = 'rice' | 'cabbage' | 'sauce' | 'miso' | 'salt' | 'pickles' | 'wasabi'

// Numbered in the order their menu lists them.
const PARTS: { key: PartKey; label: string; from: [number, number]; badge: [number, number] }[] = [
  { key: 'rice', label: 'Rice', from: [-90, 80], badge: [236, 530] },
  { key: 'cabbage', label: 'Cabbage salad', from: [40, 0], badge: [700, 300] },
  { key: 'sauce', label: 'Katsu sauce', from: [90, 0], badge: [930, 340] },
  { key: 'miso', label: 'Miso soup', from: [90, 80], badge: [920, 530] },
  { key: 'salt', label: 'Pink salt', from: [80, -80], badge: [936, 92] },
  { key: 'pickles', label: 'Pickles', from: [-90, -80], badge: [226, 82] },
  { key: 'wasabi', label: 'Wasabi', from: [60, -90], badge: [770, 92] },
]

const priceOf = (item: MenuItem) => (typeof item.price === 'number' ? item.price : 0)

/**
 * The set, laid out. Pick a katsu; it lands on the rack of a ridged plate and
 * the seven things every set comes with sit around it where they sit on
 * Katsuro's real tray. Add-ons from the printed menu can join it, with a total.
 */
export function SetTray({ initial = 'tonkatsu' }: { initial?: string }) {
  const [setId, setSetId] = useState(initial)
  const [extras, setExtras] = useState<string[]>([])
  const [active, setActive] = useState<PartKey | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const inView = useInView(wrapRef, { once: true, margin: '-15% 0px' })
  const reduce = useReducedMotion()
  const { open: openOrder } = useOrderSheet()

  const choice = setChoices.find((c) => c.id === setId)!
  const item = sets.find((s) => s.name === choice.name)!
  const total = useMemo(
    () => priceOf(item) + extras.reduce((sum, name) => sum + priceOf(addOns.find((a) => a.name === name)!), 0),
    [item, extras],
  )
  const pieces = katsuPieces(choice.shape)
  const katsuExtras = extras.filter((e) => e !== 'Curry sauce')
  const hasCurry = extras.includes('Curry sauce')

  const toggleExtra = (name: string) =>
    setExtras((xs) => (xs.includes(name) ? xs.filter((x) => x !== name) : [...xs, name]))

  const shown = inView || reduce
  const partMotion = (i: number, from: [number, number], key?: PartKey) => ({
    initial: reduce ? false : { opacity: 0, x: from[0], y: from[1] },
    animate: shown
      ? { opacity: active && key && active !== key ? 0.28 : 1, x: 0, y: 0 }
      : { opacity: 0, x: from[0], y: from[1] },
    transition: { type: 'spring' as const, stiffness: 120, damping: 18, delay: shown && !active ? 0.25 + i * 0.09 : 0 },
  })

  const dimKatsu = active !== null

  return (
    <div className="tray-block" ref={wrapRef}>
      <div className="picker" role="radiogroup" aria-label="Choose a katsu set">
        {setChoices.map((c) => {
          const it = sets.find((s) => s.name === c.name)!
          return (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={c.id === setId}
              className={`picker__chip ${c.id === setId ? 'is-on' : ''}`}
              onClick={() => setSetId(c.id)}
            >
              <span>{c.short}</span>
              <span className="picker__price">{pounds(priceOf(it))}</span>
            </button>
          )
        })}
      </div>

      <div className="tray-layout">
        <figure className="tray">
          <svg viewBox="0 0 1000 780" className="tray__svg" role="img" aria-label={`${item.name} set laid out on a tray, with ${setIncludesLine.replace('All Katsu sets are served with ', '')}`}>
            <TrayDefs />
            {/* tray */}
            <rect x="16" y="16" width="968" height="748" rx="24" fill="#3F1C12" />
            <rect x="36" y="36" width="928" height="708" rx="12" fill="#55271A" />
            {Array.from({ length: 16 }, (_, k) => (
              <path
                key={k}
                d={`M36 ${70 + k * 42} C 300 ${76 + k * 42 + (k % 3) * 4}, 650 ${62 + k * 42}, 964 ${72 + k * 42}`}
                stroke="#3E1A10"
                strokeWidth={k % 4 ? 1.4 : 2.4}
                opacity={0.45}
                fill="none"
              />
            ))}

            {/* plate */}
            <g transform="translate(490 400)" opacity={dimKatsu && active !== 'cabbage' ? 0.55 : 1} style={{ transition: 'opacity .3s' }}>
              <circle r={270} fill="#2C2622" opacity={0.35} transform="translate(8 10)" />
              <circle r={268} fill="#B49863" />
              <circle r={261} fill="url(#glaze)" />
              <PlateRidges r0={64} r1={258} />
              <circle r={62} fill="#56707C" />
              {/* wire rack */}
              <g transform="translate(-60 0) rotate(-6)">
                <g clipPath="url(#rack-clip)" stroke="#CBD1D4" strokeWidth={1.6} opacity={0.85}>
                  {Array.from({ length: 16 }, (_, k) => (
                    <line key={'v' + k} x1={-150 + k * 20} y1={-160} x2={-150 + k * 20} y2={160} />
                  ))}
                  {Array.from({ length: 17 }, (_, k) => (
                    <line key={'h' + k} x1={-150} y1={-160 + k * 20} x2={150} y2={-160 + k * 20} />
                  ))}
                </g>
                <rect x="-150" y="-160" width="300" height="320" rx="10" fill="none" stroke="#DDE2E4" strokeWidth={5} />
              </g>
            </g>

            {/* 2 cabbage salad, on the plate */}
            <motion.g {...partMotion(1, PARTS[1].from, 'cabbage')}>
              <g transform={`translate(${PART_POS.cabbage.x} ${PART_POS.cabbage.y})`}>
                <Cabbage />
              </g>
              <Garnish />
            </motion.g>

            {/* the katsu */}
            <g opacity={dimKatsu ? 0.4 : 1} style={{ transition: 'opacity .3s' }}>
              <AnimatePresence mode="sync">
                {pieces.map((node, i) => (
                  <motion.g
                    key={`${setId}-${i}`}
                    className={reduce ? undefined : 'tray__piece'}
                    initial={reduce ? false : { opacity: 0, y: -46 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 70, transition: { duration: 0.22 } }}
                    transition={{ type: 'spring', stiffness: 220, damping: 20, delay: 0.12 + i * 0.07 }}
                  >
                    {node}
                  </motion.g>
                ))}
                {katsuExtras.map((name, i) => {
                  const [x, y] = ADD_ON_SLOTS[i % ADD_ON_SLOTS.length]
                  return (
                    <motion.g
                      key={`extra-${name}`}
                      initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.18 } }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    >
                      <g transform={`translate(${x} ${y})`}>{addOnPiece(name)}</g>
                    </motion.g>
                  )
                })}
              </AnimatePresence>
            </g>

            {/* curry sauce add-on gets its own bowl */}
            <AnimatePresence>
              {hasCurry && (
                <motion.g
                  key="curry"
                  initial={reduce ? false : { opacity: 0, x: -60 }}
                  animate={{ opacity: dimKatsu ? 0.4 : 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                >
                  <g transform={`translate(${PART_POS.curry.x} ${PART_POS.curry.y})`}>
                    <CurryBowl />
                  </g>
                </motion.g>
              )}
            </AnimatePresence>

            {/* 6 pickles */}
            <motion.g {...partMotion(5, PARTS[5].from, 'pickles')}>
              <g transform={`translate(${PART_POS.pickles.x} ${PART_POS.pickles.y})`}>
                <Pickles />
              </g>
            </motion.g>

            {/* slate with 7 wasabi and 5 pink salt */}
            <motion.g {...partMotion(4, PARTS[4].from)} animate={{ ...partMotion(4, PARTS[4].from).animate, opacity: active && active !== 'salt' && active !== 'wasabi' ? 0.28 : shown ? 1 : 0 }}>
              <g transform="translate(852 142)">
                <Slate />
              </g>
              <motion.g animate={{ opacity: active === 'salt' ? 0.3 : 1 }}>
                <g transform={`translate(${PART_POS.wasabi.x} ${PART_POS.wasabi.y})`}>
                  <Wasabi />
                </g>
              </motion.g>
              <motion.g animate={{ opacity: active === 'wasabi' ? 0.3 : 1 }}>
                <g transform={`translate(${PART_POS.salt.x} ${PART_POS.salt.y})`}>
                  <Salt />
                </g>
              </motion.g>
            </motion.g>

            {/* 3 katsu sauce */}
            <motion.g {...partMotion(2, PARTS[2].from, 'sauce')}>
              <g transform={`translate(${PART_POS.sauce.x} ${PART_POS.sauce.y})`}>
                <Sauce />
              </g>
            </motion.g>

            {/* 4 miso soup */}
            <motion.g {...partMotion(3, PARTS[3].from, 'miso')}>
              <g transform={`translate(${PART_POS.miso.x} ${PART_POS.miso.y})`}>
                <Miso />
              </g>
            </motion.g>

            {/* 1 rice */}
            <motion.g {...partMotion(0, PARTS[0].from, 'rice')}>
              <g transform={`translate(${PART_POS.rice.x} ${PART_POS.rice.y})`}>
                <Rice />
              </g>
            </motion.g>

            {/* number badges */}
            {PARTS.map((p, i) => (
              <motion.g
                key={p.key}
                initial={reduce ? false : { opacity: 0, scale: 0.4 }}
                animate={shown ? { opacity: active && active !== p.key ? 0.35 : 1, scale: active === p.key ? 1.25 : 1 } : { opacity: 0, scale: 0.4 }}
                transition={{ delay: shown && !active ? 0.6 + i * 0.09 : 0, type: 'spring', stiffness: 260, damping: 16 }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              >
                <circle cx={p.badge[0]} cy={p.badge[1]} r={21} fill="var(--tray-badge)" stroke="#F6EEDF" strokeWidth={3} />
                <text x={p.badge[0]} y={p.badge[1] + 7.5} textAnchor="middle" fontSize={22} fontWeight={700} fill="#F6EEDF">
                  {i + 1}
                </text>
              </motion.g>
            ))}
          </svg>
          <figcaption className="tray__caption">
            Drawn from a real Katsuro tray: the plate on its rack in the middle, rice front left, miso front right.
          </figcaption>
        </figure>

        <div className="tray-details" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={setId}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <p className="eyebrow">Set {setChoices.findIndex((c) => c.id === setId) + 1} of {setChoices.length}</p>
              <h3 className="tray-details__name">
                {item.name} <Marks marks={item.marks} />
              </h3>
              <p className="tray-details__desc">{item.desc}</p>
              <p className="tray-details__price">{pounds(priceOf(item))}</p>
              {item.note && (
                <div className="limited">
                  <span className="limited__stamp">Limited daily</span>
                  <p>
                    {item.note}. {premiumNote}.
                  </p>
                  <QuoteLine quote={quotes.premium} />
                  <a className="text-link" href={contact.phoneHref}>
                    Ring {contact.phoneDisplay} to check it’s still on
                  </a>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <ol className="tray-legend">
            {PARTS.map((p, i) => (
              <li key={p.key}>
                <button
                  type="button"
                  className={active === p.key ? 'is-on' : ''}
                  onMouseEnter={() => setActive(p.key)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(p.key)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive((a) => (a === p.key ? null : p.key))}
                  aria-pressed={active === p.key}
                >
                  <span className="tray-legend__num">{i + 1}</span>
                  {p.label}
                </button>
              </li>
            ))}
          </ol>
          <p className="refill">{refillNote}</p>

          <fieldset className="extras">
            <legend>Add on katsu or extra</legend>
            <div className="extras__chips">
              {addOns.map((a) => (
                <button
                  key={a.name}
                  type="button"
                  className={`extra-chip ${extras.includes(a.name) ? 'is-on' : ''}`}
                  aria-pressed={extras.includes(a.name)}
                  onClick={() => toggleExtra(a.name)}
                >
                  <span className="extra-chip__plus" aria-hidden="true">
                    {extras.includes(a.name) ? '✓' : '+'}
                  </span>
                  {a.name}
                  <Marks marks={a.marks} />
                  <span className="extra-chip__price">£{priceOf(a).toFixed(2).replace(/\.00$/, '')}</span>
                </button>
              ))}
            </div>
            <p className="extras__note">For add-on only - not available on their own</p>
          </fieldset>

          <div className="tray-total">
            <span>Your tray</span>
            <motion.strong key={total} initial={reduce ? false : { scale: 1.12 }} animate={{ scale: 1 }}>
              {pounds(total)}
            </motion.strong>
          </div>
          <p className="fine">A discretionary 12.5% service charge will be added to your bill.</p>
          <div className="btn-row">
            <a className="btn btn--primary" href={links.dojo} target="_blank" rel="noopener">
              Book a table
            </a>
            <button type="button" className="btn" onClick={openOrder}>
              Order
            </button>
          </div>

          {choice.photo && (
            <figure className="real-one">
              <Photo name={choice.photo.src} alt={choice.photo.alt} sizes="(min-width: 900px) 30vw, 90vw" />
              <figcaption>The real {item.name}, photographed at Katsuro.</figcaption>
            </figure>
          )}
        </div>
      </div>
    </div>
  )
}
