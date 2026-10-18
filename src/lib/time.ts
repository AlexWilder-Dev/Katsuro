import { lunchMenuDays, lunchMenuHours, weekHours, type Session } from '../data/katsuro'

export type LondonNow = { day: number; minutes: number; date: Date }

const dayIndex: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

/** Day of week and minutes after midnight in London, whatever the visitor's own timezone. */
export function londonNow(date = new Date()): LondonNow {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  return { day: dayIndex[get('weekday')] ?? 0, minutes: Number(get('hour')) * 60 + Number(get('minute')), date }
}

/** 12pm, 3pm, 5.30pm: the way their homepage writes times. */
export function formatTime(minutes: number): string {
  const hh = Math.floor(minutes / 60) % 24
  const mm = minutes % 60
  const suffix = hh >= 12 ? 'pm' : 'am'
  const h12 = hh % 12 === 0 ? 12 : hh % 12
  return mm ? `${h12}.${String(mm).padStart(2, '0')}${suffix}` : `${h12}${suffix}`
}

export function formatClock(now: LondonNow): string {
  return formatTime(now.minutes)
}

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export type Status =
  | { open: true; session: Session; closes: number; text: string; detail: string }
  | { open: false; text: string; detail: string; between: boolean }

export function getStatus(now: LondonNow): Status {
  const today = weekHours[now.day]
  const current = today.find((s) => now.minutes >= s.open && now.minutes < s.close)
  if (current) {
    return {
      open: true,
      session: current,
      closes: current.close,
      text: 'Open now',
      detail: `until ${formatTime(current.close)}`,
    }
  }
  const laterToday = today.find((s) => s.open > now.minutes)
  if (laterToday) {
    const between = today.some((s) => s.close <= now.minutes)
    return {
      open: false,
      between,
      text: between ? 'Between services' : 'Closed',
      detail: `${between ? 'back' : 'opens'} at ${formatTime(laterToday.open)}`,
    }
  }
  for (let i = 1; i <= 7; i++) {
    const d = (now.day + i) % 7
    const first = weekHours[d][0]
    if (first) {
      const when = i === 1 ? 'tomorrow' : dayNames[d]
      return { open: false, between: false, text: 'Closed', detail: `opens ${when} at ${formatTime(first.open)}` }
    }
  }
  return { open: false, between: false, text: 'Closed', detail: '' }
}

/** Weekday 12–3, when the lunch menu (sandos and dons) is on. */
export function isLunchMenuTime(now: LondonNow): boolean {
  return lunchMenuDays.includes(now.day) && now.minutes >= lunchMenuHours.open && now.minutes < lunchMenuHours.close
}

/** Minutes until the lunch menu stops today, or null. */
export function lunchMinutesLeft(now: LondonNow): number | null {
  return isLunchMenuTime(now) ? lunchMenuHours.close - now.minutes : null
}

/** After 5.30pm, or before 6am, the site switches to the shopfront-at-night palette. */
export function isEvening(now: LondonNow): boolean {
  return now.minutes >= 17 * 60 + 30 || now.minutes < 6 * 60
}

export function isWeekday(now: LondonNow): boolean {
  return now.day >= 1 && now.day <= 5
}
