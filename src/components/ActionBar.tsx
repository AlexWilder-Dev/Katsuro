import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { contact, links } from '../data/katsuro'
import { useOrderSheet } from './OrderSheet'

/** Call · Book · Order, pinned to the bottom of the screen on phones once the first screen has scrolled past. */
export function ActionBar() {
  const [show, setShow] = useState(false)
  const { open } = useOrderSheet()

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="actionbar"
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
        >
          <a href={contact.phoneHref} className="actionbar__btn">
            <PhoneIcon />
            Call
          </a>
          <a href={links.dojo} target="_blank" rel="noopener" className="actionbar__btn actionbar__btn--main">
            Book a table
          </a>
          <button type="button" className="actionbar__btn" onClick={open}>
            <BagIcon />
            Order
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
      <path
        d="M6.6 3.5 9 3l1.8 4.3-2.1 1.5a12 12 0 0 0 6.5 6.5l1.5-2.1L21 15l-.5 2.4a2.4 2.4 0 0 1-2.4 1.9A15.6 15.6 0 0 1 4.7 5.9a2.4 2.4 0 0 1 1.9-2.4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
      <path d="M5 8h14l-1 12H6L5 8Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}
