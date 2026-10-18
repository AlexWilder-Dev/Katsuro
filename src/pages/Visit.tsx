import { busRoutes, contact, links, quotes, walk } from '../data/katsuro'
import { HoursTable } from '../components/HoursTable'
import { WalkMap } from '../components/WalkMap'
import { Photo } from '../components/Photo'
import { QuoteLine } from '../components/QuoteLine'
import { GroupForm } from '../components/GroupForm'
import { PhoneIcon } from '../components/ActionBar'

export function Visit() {
  return (
    <div className="page visit-page">
      <header className="page__head">
        <p className="eyebrow">Visit</p>
        <h1 className="page__title">{contact.address[0]}, Clapham Junction.</h1>
        <p className="section__lede">
          {contact.address[1]}. Look for the black awning and the lit-up cutlet.
        </p>
      </header>

      <div className="visit-grid">
        <section className="visit-card" aria-labelledby="hours-title">
          <h2 id="hours-title" className="card-title">
            Hours
          </h2>
          <HoursTable />
        </section>

        <section className="visit-card visit-card--book" aria-labelledby="book-title">
          <h2 id="book-title" className="card-title">
            Book a table
          </h2>
          <p>Online through Dojo, for 1 to 8 people. Evenings get busy, so book ahead.</p>
          <a className="btn btn--primary btn--big" href={links.dojo} target="_blank" rel="noopener">
            Book on Dojo
          </a>
          <QuoteLine quote={quotes.book} />
        </section>

        <section className="visit-card" aria-labelledby="contact-title">
          <h2 id="contact-title" className="card-title">
            Call or write
          </h2>
          <p className="visit-contact">
            <a href={contact.phoneHref} className="visit-contact__phone">
              <PhoneIcon /> {contact.phoneDisplay}
            </a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={contact.instagramUrl} target="_blank" rel="noopener">
              {contact.instagram}
            </a>
          </p>
          <p className="fine">Ring to order for collection, or to check the Premium Tonkatsu hasn’t sold out.</p>
        </section>
      </div>

      <section className="section visit-walk" aria-labelledby="walk-title">
        <div className="section__head">
          <h2 id="walk-title" className="section-title">
            From Clapham Junction
          </h2>
          <p className="section__lede">
            It’s one road: St John’s Hill, from the station to the door. {walk.metres} m, about {walk.minutes} minutes on
            foot.
          </p>
        </div>
        <div className="findus__grid">
          <WalkMap />
          <div className="findus__side">
            <div className="btn-row btn-row--stack">
              <a className="btn btn--primary" href={links.googleWalk} target="_blank" rel="noopener">
                Google Maps walking route
              </a>
              <a className="btn" href={links.appleMaps} target="_blank" rel="noopener">
                Apple Maps
              </a>
              <a className="btn" href={links.citymapper} target="_blank" rel="noopener">
                Citymapper
              </a>
            </div>
            <p>
              <strong>By bus:</strong> {busRoutes.slice(0, -1).join(', ')} and {busRoutes[busRoutes.length - 1]} stop on St
              John’s Hill at Brussels Road and Marcilly Road, either side of us.
            </p>
            <p>
              <strong>With a dog:</strong> welcome inside, on a lead.
            </p>
            <QuoteLine quote={quotes.dog} />
          </div>
        </div>
      </section>

      <section className="section visit-front">
        <Photo name="shopfront" alt="Katsuro at dusk: black awning with white KATSURO lettering, the lit cutlet sign, oak chairs through the glass" sizes="(min-width: 900px) 60vw, 100vw" />
        <div>
          <h2 className="section-title">At home instead?</h2>
          <p>Order takeaway or get delivery through Deliveroo or Uber Eats.</p>
          <div className="btn-row">
            <a className="btn" href={links.deliveroo} target="_blank" rel="noopener">
              Deliveroo
            </a>
            <a className="btn" href={links.uberEats} target="_blank" rel="noopener">
              Uber Eats
            </a>
          </div>
          <p>
            Or call <a href={contact.phoneHref}>{contact.phoneDisplay}</a>. Place your order to collect them when you arrive.
          </p>
        </div>
      </section>

      <section className="section visit-groups" aria-labelledby="groups-title">
        <div className="section__head">
          <h2 id="groups-title" className="section-title">
            More than eight of you?
          </h2>
          <p className="section__lede">Online booking stops at eight. Tell us the date and how many, and the team will come back to you.</p>
        </div>
        <GroupForm />
      </section>
    </div>
  )
}
