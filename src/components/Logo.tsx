import {
  CUTLET_SLICES,
  CUTLET_VIEWBOX,
  KANJI_PATH,
  LOGO_VIEWBOX,
  STAMP_PATH,
  WORDMARK_PATH,
  WORDMARK_VIEWBOX,
} from '../assets/logoPaths'

type SvgProps = { className?: string; title?: string }

/** KATSURO / Japanese restaurant with the カツ路 stamp. The lettering takes currentColor. */
export function Wordmark({ className, title = 'Katsuro, Japanese restaurant' }: SvgProps) {
  return (
    <svg className={className} viewBox={WORDMARK_VIEWBOX} role="img" aria-label={title}>
      <path d={WORDMARK_PATH} fill="currentColor" fillRule="evenodd" />
      <path d={STAMP_PATH} fill="var(--hanko)" fillRule="evenodd" />
      <path d={KANJI_PATH} fill="#fff" fillRule="evenodd" />
    </svg>
  )
}

/** The six-slice cutlet from the logo. */
export function Cutlet({ className, title, width, height }: SvgProps & { width?: number; height?: number }) {
  return (
    <svg
      className={className}
      viewBox={CUTLET_VIEWBOX}
      width={width}
      height={height}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {CUTLET_SLICES.map((d, i) => (
        <path key={i} d={d} fill="var(--katsu)" />
      ))}
    </svg>
  )
}

/** The outlined cutlet printed on their noren. */
export function CutletOutline({ className }: SvgProps) {
  return (
    <svg className={className} viewBox={CUTLET_VIEWBOX} aria-hidden="true">
      {CUTLET_SLICES.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth={34} strokeLinejoin="round" />
      ))}
    </svg>
  )
}

export function FullLogo({ className }: SvgProps) {
  return (
    <svg className={className} viewBox={LOGO_VIEWBOX} role="img" aria-label="Katsuro, Japanese restaurant">
      {CUTLET_SLICES.map((d, i) => (
        <path key={i} d={d} fill="var(--katsu)" />
      ))}
      <path d={WORDMARK_PATH} fill="currentColor" fillRule="evenodd" />
      <path d={STAMP_PATH} fill="var(--hanko)" fillRule="evenodd" />
      <path d={KANJI_PATH} fill="#fff" fillRule="evenodd" />
    </svg>
  )
}

/** The カツ路 stamp on its own, as it sits on the noren. */
export function Stamp({ className, tone = 'hanko' }: SvgProps & { tone?: 'hanko' | 'ink' }) {
  return (
    <svg className={className} viewBox="1570 1352 205 359" role="img" aria-label="カツ路">
      <path d={STAMP_PATH} fill={tone === 'hanko' ? 'var(--hanko)' : 'var(--noren-ink)'} fillRule="evenodd" />
      <path d={KANJI_PATH} fill={tone === 'hanko' ? '#fff' : 'var(--noren)'} fillRule="evenodd" />
    </svg>
  )
}
