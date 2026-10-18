import { Link } from 'react-router-dom'
import { contact, hoursRows } from '../data/katsuro'
import { Wordmark } from './Logo'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <Wordmark className="footer__logo" />
        <div className="footer__cols">
          <address>
            {contact.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={contact.instagramUrl} target="_blank" rel="noopener">
              {contact.instagram}
            </a>
          </address>
          <dl className="footer__hours">
            {hoursRows.map((r) => (
              <div key={r.days}>
                <dt>{r.days}</dt>
                <dd>{r.times.join(', ')}</dd>
              </div>
            ))}
          </dl>
          <nav className="footer__nav" aria-label="Footer">
            <Link to="/menu">Menu</Link>
            <Link to="/story">Story</Link>
            <Link to="/visit">Visit</Link>
          </nav>
        </div>
        <p className="footer__credit">Site by AlexWilder-Dev</p>
      </div>
    </footer>
  )
}
