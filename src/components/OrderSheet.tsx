import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { contact, links } from '../data/katsuro'
import { PhoneIcon } from './ActionBar'

type Ctx = { open: () => void }
const OrderCtx = createContext<Ctx>({ open: () => {} })
export const useOrderSheet = () => useContext(OrderCtx)

/** "Get Katsu at Home": Deliveroo, Uber Eats, or ring ahead and collect. */
export function OrderSheetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const open = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])
  const sheetRef = useRef<HTMLDivElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return
    returnFocus.current = document.activeElement as HTMLElement
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    window.setTimeout(() => sheetRef.current?.querySelector<HTMLElement>('a, button')?.focus(), 50)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      returnFocus.current?.focus?.()
    }
  }, [isOpen, close])

  return (
    <OrderCtx.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div className="sheet-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
            <motion.div
              ref={sheetRef}
              className="sheet"
              role="dialog"
              aria-modal="true"
              aria-labelledby="order-title"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 360, damping: 36 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sheet__grip" aria-hidden="true" />
              <h2 id="order-title" className="sheet__title">Get Katsu at Home</h2>
              <p className="sheet__lede">Order takeaway or get delivery through Deliveroo or Uber Eats.</p>

              <div className="sheet__options">
                <a className="order-option" href={links.deliveroo} target="_blank" rel="noopener">
                  <span className="order-option__name">Deliveroo</span>
                  <span className="order-option__hint">Delivered</span>
                  <Arrow />
                </a>
                <a className="order-option" href={links.uberEats} target="_blank" rel="noopener">
                  <span className="order-option__name">Uber Eats</span>
                  <span className="order-option__hint">Delivered</span>
                  <Arrow />
                </a>
                <a className="order-option order-option--call" href={contact.phoneHref}>
                  <span className="order-option__name">
                    <PhoneIcon /> Call {contact.phoneDisplay}
                  </span>
                  <span className="order-option__hint">Place your order to collect them when you arrive.</span>
                </a>
              </div>

              <p className="sheet__small">Collecting from {contact.addressLine}.</p>
              <button type="button" className="sheet__close" onClick={close}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </OrderCtx.Provider>
  )
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" className="icon order-option__arrow" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
