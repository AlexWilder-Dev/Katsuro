import type { Mark } from '../data/katsuro'

/** The green sprig their printed menus use for Vegetarian. */
export function VegMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 24" role="img" aria-label="Vegetarian">
      <title>Vegetarian</title>
      <path d="M8 23V2" stroke="var(--veg)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M8 6c-2.6-.3-4.4-1.6-5-3.6 2.4-.2 4.3.9 5 3.6Z" fill="var(--veg)" />
      <path d="M8 11c2.6-.3 4.4-1.6 5-3.6-2.4-.2-4.3.9-5 3.6Z" fill="var(--veg)" />
      <path d="M8 15.5c-2.6-.3-4.4-1.6-5-3.6 2.4-.2 4.3.9 5 3.6Z" fill="var(--veg)" />
      <path d="M8 20c2.6-.3 4.4-1.6 5-3.6-2.4-.2-4.3.9-5 3.6Z" fill="var(--veg)" />
    </svg>
  )
}

/** The circled GF their printed menus use for Gluten free. */
export function GfMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" role="img" aria-label="Gluten free">
      <title>Gluten free</title>
      <circle cx="12" cy="12" r="10.2" fill="none" stroke="var(--gf)" strokeWidth="1.8" />
      <text x="12" y="16" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--gf)" fontFamily="inherit">
        GF
      </text>
    </svg>
  )
}

/** Their blue snowflake: served cold. */
export function ColdMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" role="img" aria-label="Served cold">
      <title>Served cold</title>
      <g stroke="var(--gf)" strokeWidth="1.8" strokeLinecap="round" fill="none">
        <path d="M12 2v20M3.3 7l17.4 10M3.3 17l17.4-10" />
        <path d="M9.5 3.5 12 6l2.5-2.5M9.5 20.5 12 18l2.5 2.5M3.9 10.4 7.2 9.5 6.3 6.1M20.1 13.6l-3.3.9.9 3.4M3.9 13.6l3.3.9-.9 3.4M20.1 10.4l-3.3-.9.9-3.4" />
      </g>
    </svg>
  )
}

export function Marks({ marks, cold }: { marks?: Mark[]; cold?: boolean }) {
  if (!marks?.length && !cold) return null
  return (
    <span className="marks">
      {marks?.includes('GF') && <GfMark className="mark" />}
      {marks?.includes('V') && <VegMark className="mark mark--veg" />}
      {cold && <ColdMark className="mark" />}
    </span>
  )
}

export function MarksLegend() {
  return (
    <p className="legend">
      <span>
        <VegMark className="mark mark--veg" /> Vegetarian
      </span>
      <span>
        <GfMark className="mark" /> Gluten free
      </span>
      <span>
        <ColdMark className="mark" /> Served cold
      </span>
    </p>
  )
}
