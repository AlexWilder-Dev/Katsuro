import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { contact, drinksSeen, lunchMenu, lunchMenuLabel, lunchUpgrade, mainMenu, premiumNote, quotes, serviceNote } from '../data/katsuro'
import { useShift } from '../lib/shift'
import { MenuSectionBlock } from '../components/MenuList'
import { MarksLegend } from '../components/Marks'
import { QuoteLine } from '../components/QuoteLine'

type Tab = 'main' | 'lunch'

export function Menu() {
  const { autoMode } = useShift()
  const location = useLocation()
  const reduce = useReducedMotion()
  const [tab, setTab] = useState<Tab>(() => (location.search.includes('lunch') || autoMode === 'lunch' ? 'lunch' : 'main'))
  const sections = tab === 'main' ? mainMenu : lunchMenu
  const [activeId, setActiveId] = useState(sections[0].id)

  useEffect(() => {
    setActiveId(sections[0].id)
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (top) setActiveId(top.target.id.replace(/^m-/, ''))
      },
      { rootMargin: '-120px 0px -60% 0px' },
    )
    sections.forEach((s) => {
      const el = document.getElementById(`m-${s.id}`)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [sections])

  const jump = (id: string) => {
    const el = document.getElementById(`m-${id}`)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 118
    window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <div className="page menu-page">
      <header className="page__head">
        <p className="eyebrow">Menu</p>
        <h1 className="page__title">Katsu, and everything that goes with it.</h1>
        <p className="section__lede">
          The main menu runs all day, every day. Katsuro Lunch adds sandos and dons, Mon – Fri, 12pm – 3pm.
        </p>
        <div className="menu-tabs" role="tablist" aria-label="Which menu">
          {(['main', 'lunch'] as Tab[]).map((t) => (
            <button key={t} role="tab" type="button" aria-selected={tab === t} className={tab === t ? 'is-on' : ''} onClick={() => setTab(t)}>
              {t === 'main' ? 'Main menu' : 'Katsuro Lunch'}
              <span>{t === 'main' ? 'every day' : 'Mon–Fri 12–3'}</span>
            </button>
          ))}
        </div>
      </header>

      <nav className="menu-jump" aria-label="Menu sections">
        <div className="menu-jump__inner">
          {sections.map((s) => (
            <button key={s.id} type="button" className={activeId === s.id ? 'is-on' : ''} onClick={() => jump(s.id)}>
              {s.title.replace(/\s*\(.*\)/, '').replace(' / Extra', '')}
            </button>
          ))}
        </div>
      </nav>

      <motion.div
        key={tab}
        className="menu-sheet"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {tab === 'lunch' && (
          <p className="menu-sheet__banner">
            Katsuro Lunch <span>{lunchMenuLabel}</span>
          </p>
        )}
        {sections.map((s) => (
          <MenuSectionBlock key={s.id} section={s}>
            {s.id === 'sets' && (
              <div className="menu-aside">
                <p>
                  <strong>Premium Tonkatsu:</strong> {premiumNote.toLowerCase().replace('our premium tonkatsu is', 'it’s')}. Coming
                  for it? <a href={contact.phoneHref}>Ring ahead</a> to check it’s still on.
                </p>
                <QuoteLine quote={quotes.soldOutByOne} />
              </div>
            )}
            {s.id === 'lunch-curry' && <p className="menu-section__intro">{lunchUpgrade}</p>}
            {s.id === 'noodles' && <QuoteLine quote={quotes.udon} />}
          </MenuSectionBlock>
        ))}

        <section className="menu-section">
          <h3 className="menu-section__title">Drinks</h3>
          <p className="menu-section__intro">
            Not on the printed menu: {drinksSeen.slice(0, -1).join(', ')} and {drinksSeen[drinksSeen.length - 1]}. Ask the team
            what’s on.
          </p>
        </section>

        <MarksLegend />
        <p className="fine menu-sheet__service">{serviceNote}</p>
      </motion.div>
    </div>
  )
}
