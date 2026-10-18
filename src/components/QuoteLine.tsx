import type { Quote } from '../data/katsuro'

/** A real Google review line, credited, set in the margin rather than a testimonials block. */
export function QuoteLine({ quote, className }: { quote: Quote; className?: string }) {
  return (
    <figure className={`quote ${className ?? ''}`}>
      <blockquote>“{quote.text}”</blockquote>
      <figcaption>
        {quote.name}, Google review, {quote.date}
      </figcaption>
    </figure>
  )
}
