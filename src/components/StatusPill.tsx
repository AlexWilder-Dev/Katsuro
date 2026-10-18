import { Link } from 'react-router-dom'
import { useShift } from '../lib/shift'

/** Open now / closed, from their hours and London time. */
export function StatusPill({ compact }: { compact?: boolean }) {
  const { status } = useShift()
  const cls = `status ${status.open ? 'status--open' : 'status--closed'} ${compact ? 'status--compact' : ''}`
  return (
    <Link to="/visit" className={cls} aria-live="polite">
      <span className="status__dot" aria-hidden="true" />
      <span className="status__text">{status.text}</span>
      <span className="status__detail">{status.detail}</span>
    </Link>
  )
}
