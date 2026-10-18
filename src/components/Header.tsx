import { Link, NavLink } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { CutletOutline, Stamp } from './Logo'
import { StatusPill } from './StatusPill'

/**
 * The noren over Katsuro's pass: three cream panels printed with KATSURO,
 * the カツ路 stamp and the outlined cutlet. It hangs at the top of every page.
 */
export function Noren() {
  const reduce = useReducedMotion()
  const panels = [
    <span className="noren__word" key="w">KATSURO</span>,
    <Stamp className="noren__stamp" tone="ink" key="s" />,
    <CutletOutline className="noren__cutlet" key="c" />,
  ]
  return (
    <Link to="/" className="noren" aria-label="Katsuro home">
      {panels.map((content, i) => (
        <motion.span
          key={i}
          className="noren__panel"
          style={{ transformOrigin: '50% 0%' }}
          initial={reduce ? false : { rotate: i === 1 ? 0 : i === 0 ? -2.2 : 2.2, y: -6 }}
          animate={{ rotate: 0, y: 0 }}
          transition={{ type: 'spring', stiffness: 60, damping: 6, mass: 0.6, delay: 0.1 + i * 0.08 }}
        >
          {content}
        </motion.span>
      ))}
    </Link>
  )
}

export function NavBar() {
  return (
    <nav className="navbar" aria-label="Main">
      <div className="navbar__inner">
        <NavLink to="/" end className="navbar__home" aria-label="Home">
          <CutletOutline className="navbar__icon" />
        </NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/story">Story</NavLink>
        <NavLink to="/visit">Visit</NavLink>
        <StatusPill compact />
      </div>
    </nav>
  )
}
