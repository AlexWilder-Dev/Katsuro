/** 18.5 → "18.5", 24 → "24": prices read the way the printed menu prints them. */
export function price(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/0$/, '')
}

/** For totals: always pounds and pence. */
export function pounds(n: number): string {
  return `£${n.toFixed(2).replace(/\.00$/, '')}`
}

export const media = (file: string) => `${import.meta.env.BASE_URL}media/${file}`
