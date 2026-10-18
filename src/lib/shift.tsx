import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { getStatus, isEvening, isLunchMenuTime, londonNow, type LondonNow, type Status } from './time'

/**
 * The lunch/dinner shift. On weekdays from 12 to 3 the site leads with the
 * lunch menu in the daytime palette; from 5.30pm it leads with the signature
 * sets in the night palette. Visitors can flip it by hand.
 */
export type Mode = 'lunch' | 'sets'
export type Theme = 'day' | 'night'

type ShiftValue = {
  now: LondonNow
  status: Status
  autoMode: Mode
  autoTheme: Theme
  mode: Mode
  theme: Theme
  overridden: boolean
  setOverride: (mode: Mode | null) => void
}

const ShiftContext = createContext<ShiftValue | null>(null)

export function ShiftProvider({ children }: { children: ReactNode }) {
  const [now, setNow] = useState(() => londonNow())
  const [override, setOverride] = useState<Mode | null>(null)

  useEffect(() => {
    const id = window.setInterval(() => setNow(londonNow()), 30_000)
    return () => window.clearInterval(id)
  }, [])

  const value = useMemo<ShiftValue>(() => {
    const autoMode: Mode = isLunchMenuTime(now) ? 'lunch' : 'sets'
    const autoTheme: Theme = isEvening(now) ? 'night' : 'day'
    const mode = override ?? autoMode
    const theme: Theme = override ? (override === 'lunch' ? 'day' : 'night') : autoTheme
    return { now, status: getStatus(now), autoMode, autoTheme, mode, theme, overridden: override !== null, setOverride }
  }, [now, override])

  useEffect(() => {
    document.documentElement.dataset.theme = value.theme
    const meta = document.querySelector('meta[name="theme-color"]')
    meta?.setAttribute('content', value.theme === 'night' ? '#130f0c' : '#f6eedf')
  }, [value.theme])

  return <ShiftContext.Provider value={value}>{children}</ShiftContext.Provider>
}

export function useShift(): ShiftValue {
  const v = useContext(ShiftContext)
  if (!v) throw new Error('useShift outside ShiftProvider')
  return v
}
