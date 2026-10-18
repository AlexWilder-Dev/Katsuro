import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { busRoutes, contact, links, quotes, setIncludesLine, walk } from '../data/katsuro'
import { useShift } from '../lib/shift'
import { formatTime } from '../lib/time'
import { CutletVideo } from '../components/CutletVideo'
import { Wordmark } from '../components/Logo'
import { StatusPill } from '../components/StatusPill'
import { ShiftBoard } from '../components/ShiftBoard'
import { SetTray } from '../components/tray/SetTray'
import { Photo } from '../components/Photo'
import { QuoteLine } from '../components/QuoteLine'
import { HoursTable } from '../components/HoursTable'
import { WalkMap } from '../components/WalkMap'
import { InstagramStrip } from '../components/InstagramStrip'
import { useOrderSheet } from '../components/OrderSheet'
import { PhoneIcon } from '../components/ActionBar'

function Hero() {
  const { mode, status } = useShift()
  const { open: openOrder } = useOrderSheet()
  const reduce = useReducedMotion()
  const rise = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.55 + i * 0.08, ease: [0.2, 0.7, 0.2, 1] as const },
  })

  let lead: string
  if (status.open && mode === 'lunch') lead = `Lunch is on: katsu sandos from £10, dons from £12, until ${formatTime(15 * 60)}.`
  else if (status.open) lead = `Signature sets from £16, until ${formatTime(status.closes)}. Premium Tonkatsu while it lasts.`
  else lead = `Signature sets from £16. Weekday lunch 12 to 3, sandos from £10.`

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__logo">
        <CutletVideo className="hero__cutlet" />
        <motion.div {...rise(0)}>
          <Wordmark className="hero__wordmark" />
        </motion.div>
      </div>
      <div className="hero__text">
        <motion.h1 id="hero-title" className="hero__title" {...rise(1)}>
          We make real Japanese Katsu<span>crispy, tender, unforgettable.</span>
        </motion.h1>
        <motion.div className="hero__status" {...rise(2)}>
          <StatusPill />
          <p>{lead}</p>
        </motion.div>
        <motion.div className="btn-row hero__ctas" {...rise(3)}>
          <a className="btn btn--primary btn--big" href={links.dojo} target="_blank" rel="noopener">
            Book a table
          </a>
          <button type="button" className="btn btn--big" onClick={openOrder}>
            Order
          </button>
        </motion.div>
        <motion.p className="hero__meta" {...rise(4)}>
          <a href={contact.phoneHref}>
            <PhoneIcon /> {contact.phoneDisplay}
          </a>
          <Link to="/visit">
            {contact.address[0]}, {walk.minutes} min from Clapham Junction
          </Link>
        </motion.p>
      </div>
    </section>
  )
}

export function Home() {
  return (
    <>
      <Hero />
      <ShiftBoard />

      <section className="section tray-section" id="tray" aria-labelledby="tray-title">
        <div className="section__head">
          <p className="eyebrow">The set, laid out</p>
          <h2 id="tray-title" className="section-title">
            One katsu. Seven things around it.
          </h2>
          <p className="section__lede">{setIncludesLine}. Pick yours.</p>
        </div>
        <SetTray />
      </section>

      <section className="section story-teaser" aria-labelledby="story-title">
        <div className="story-teaser__text">
          <p className="eyebrow">Hello!</p>
          <h2 id="story-title" className="section-title">
            We do one thing, and we do it well.
          </h2>
          <p className="section__lede">Japanese Katsu, our head chef / owner’s soul food.</p>
          <p>
            Pork loin, beaten out by hand. Chicken thigh. Breadcrumbs made here, on a Japanese panko machine. A small
            but almighty team who have cooked in kitchens across Japan, Korea and Australia.
          </p>
          <p>
            “We’re not trying to be fancy. We just want to make honest, good food in a place where you’ll always feel
            welcome, whether it’s your first visit or your fiftieth.”
          </p>
          <Link to="/story" className="text-link">
            Our story and the team
          </Link>
        </div>
        <div className="story-teaser__photos">
          <Photo name="pounding" alt="Pork loin being beaten flat on red boards in the Katsuro kitchen, eggs stacked beside" className="ph ph--a" />
          <Photo name="chefs" alt="Two Katsuro chefs in denim aprons with the cutlet logo, plating at the pass" className="ph ph--b" />
        </div>
      </section>

      <section className="section counter" aria-labelledby="counter-title">
        <div className="counter__photos">
          <Photo name="counter" alt="Diners at the pale-oak counter facing the open kitchen, under the cream noren printed with KATSURO" className="ph" />
          <Photo name="room" alt="The dining room: ledge seats along the wall, oak tables and chairs, wall lights" className="ph" />
        </div>
        <div className="counter__text">
          <p className="eyebrow">The room</p>
          <h2 id="counter-title" className="section-title">
            Pull up at the counter.
          </h2>
          <p>
            The long oak counter looks straight into the open kitchen, under the noren with our cutlet on it. There are
            tables too, and seats along the wall. Good on your own, good with friends.
          </p>
          <ul className="facts">
            <li>
              <strong>Free rice &amp; salad refill.</strong> It says so on the orange poster at the counter.
            </li>
            <li>
              <strong>Dogs welcome</strong>, on a lead.
            </li>
            <li>
              <strong>Draught beer, sake, umeshu</strong> and tea to drink.
            </li>
          </ul>
          <QuoteLine quote={quotes.twentyYears} />
        </div>
      </section>

      <section className="section findus" aria-labelledby="findus-title">
        <div className="section__head">
          <p className="eyebrow">Find us</p>
          <h2 id="findus-title" className="section-title">
            {contact.address[0]}
          </h2>
          <p className="section__lede">
            {contact.address[1]}. {walk.minutes} minutes’ walk from Clapham Junction.
          </p>
        </div>
        <div className="findus__grid">
          <WalkMap />
          <div className="findus__side">
            <HoursTable />
            <div className="btn-row">
              <a className="btn btn--primary" href={links.googleWalk} target="_blank" rel="noopener">
                Walking directions
              </a>
              <a className="btn" href={contact.phoneHref}>
                Call
              </a>
            </div>
            <p className="fine">
              Buses {busRoutes.slice(0, -1).join(', ')} and {busRoutes[busRoutes.length - 1]} stop on St John’s Hill at Brussels Road
              and Marcilly Road.
            </p>
            <QuoteLine quote={quotes.walk} />
          </div>
        </div>
      </section>

      <InstagramStrip />
    </>
  )
}
