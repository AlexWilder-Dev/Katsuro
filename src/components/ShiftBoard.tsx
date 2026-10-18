import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { contact, links, lunchMenu, lunchMenuLabel, lunchUpgrade, mainMenu, quotes } from '../data/katsuro'
import { pounds } from '../lib/format'
import { useShift, type Mode } from '../lib/shift'
import { formatClock, formatTime, isWeekday, lunchMinutesLeft } from '../lib/time'
import { MenuSectionBlock } from './MenuList'
import { QuoteLine } from './QuoteLine'
import { useOrderSheet } from './OrderSheet'

const dayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const sets = mainMenu.find((s) => s.id === 'sets')!

/**
 * The lunch/dinner shift. Weekdays 12–3 the board is the lunch menu: sandos
 * and dons. The rest of the time it's the signature sets. It follows the
 * clock in Clapham Junction, and either can be picked by hand.
 */
export function ShiftBoard() {
  const { now, mode, autoMode, setOverride, overridden, status } = useShift()
  const reduce = useReducedMotion()
  const { open: openOrder } = useOrderSheet()
  const minsLeft = lunchMinutesLeft(now)

  const pick = (m: Mode) => setOverride(m === autoMode ? null : m)

  const clockLine = `${dayShort[now.day]} ${formatClock(now)} on St John’s Hill`
  let autoLine: string
  const weekend = !isWeekday(now)
  if (autoMode === 'lunch') {
    autoLine = minsLeft !== null && minsLeft <= 60 ? `Lunch menu for another ${minsLeft} minutes.` : 'The lunch menu is on until 3pm.'
  } else if (status.open) {
    autoLine = `${weekend ? 'Weekends are signature sets, all day. ' : ''}Open until ${formatTime(status.closes)}.`
  } else if (!weekend && now.minutes < 12 * 60) {
    autoLine = 'Opens at 12, with the lunch menu.'
  } else if (status.between) {
    autoLine = 'Lunch is done for today. Sets from 5.30pm.'
  } else {
    autoLine = `Closed now, ${status.detail}.`
  }

  return (
    <section className="shift" aria-labelledby="shift-title">
      <div className="shift__head">
        <div>
          <p className="eyebrow">
            <span className="shift__clock">{clockLine}</span>
          </p>
          <h2 id="shift-title" className="section-title">
            {mode === 'lunch' ? 'Weekday lunch' : 'The signature sets'}
          </h2>
          <p className="shift__auto">{overridden ? 'You’re looking at the other shift.' : autoLine}</p>
        </div>
        <div className="shift__toggle" role="tablist" aria-label="Lunch or sets">
          {(['lunch', 'sets'] as Mode[]).map((m) => (
            <button
              key={m}
              role="tab"
              type="button"
              aria-selected={mode === m}
              className={mode === m ? 'is-on' : ''}
              onClick={() => pick(m)}
            >
              {m === 'lunch' ? 'Lunch 12–3' : 'Sets, all day'}
              {m === autoMode && <span className="shift__now">now</span>}
              {mode === m && !reduce && <motion.span layoutId="shift-pill" className="shift__pill" />}
              {mode === m && reduce && <span className="shift__pill" />}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'lunch' ? (
          <motion.div
            key="lunch"
            className="board board--lunch"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28 }}
          >
            <div className="board__frame">
              <p className="board__title">
                Katsuro Lunch <span>{lunchMenuLabel}</span>
              </p>
              <div className="board__cols">
                <MenuSectionBlock section={lunchMenu[0]} compact />
                <MenuSectionBlock section={lunchMenu[1]} compact />
                <MenuSectionBlock section={lunchMenu[2]} compact>
                  <p className="menu-section__intro">{lunchUpgrade}</p>
                </MenuSectionBlock>
              </div>
            </div>
            <div className="board__side">
              <QuoteLine quote={quotes.lunch} />
              <p>
                The full set menu runs at lunch too. The Premium Tonkatsu is limited each day and can be gone by one, so
                ring ahead if you’re coming for it.
              </p>
              <div className="btn-row">
                <a className="btn btn--primary" href={contact.phoneHref}>
                  Call {contact.phoneDisplay}
                </a>
                <a className="btn" href={links.dojo} target="_blank" rel="noopener">
                  Book a table
                </a>
              </div>
              <Link className="text-link" to="/menu?lunch">
                Add-ons and the full menu
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="sets"
            className="board board--sets"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28 }}
          >
            <div className="board__frame">
              <p className="board__title">
                Katsuro Signature Set Menu <span>from {pounds(16)}</span>
              </p>
              <MenuSectionBlock section={sets} compact bare />
            </div>
            <div className="board__side">
              <QuoteLine quote={quotes.book} />
              <p>Evenings fill up. Book through Dojo for tables of 1 to 8, or walk in and try the counter.</p>
              <div className="btn-row">
                <a className="btn btn--primary" href={links.dojo} target="_blank" rel="noopener">
                  Book a table
                </a>
                <button type="button" className="btn" onClick={openOrder}>
                  Order
                </button>
              </div>
              <button
                type="button"
                className="text-link"
                onClick={() => document.getElementById('tray')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })}
              >
                Lay out a set below
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
