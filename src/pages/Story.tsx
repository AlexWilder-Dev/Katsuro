import { Link } from 'react-router-dom'
import { contact, quotes } from '../data/katsuro'
import { Photo } from '../components/Photo'
import { QuoteLine } from '../components/QuoteLine'
import { InstagramStrip } from '../components/InstagramStrip'

export function Story() {
  return (
    <div className="page story-page">
      <header className="page__head">
        <p className="eyebrow">Hello!</p>
        <h1 className="page__title">At Katsuro, we do one thing, and we do it well.</h1>
      </header>

      <div className="story">
        <div className="story__copy">
          <p className="story__big">Japanese Katsu, our head chef / owner’s soul food.</p>
          <p>
            Whether it’s our crispy pork loin, juicy chicken thigh, or fresh breadcrumbs, every plate we serve starts with
            quality ingredients and is finished off with a lot of heart.
          </p>
          <p>
            We’re not trying to be fancy. We just want to make honest, good food in a place where you’ll always feel
            welcome, whether it’s your first visit or your fiftieth.
          </p>
          <p>
            We are proud of our small but almighty team, who have years of experience in kitchens across Japan, Korea and
            Australia and we can’t wait for you to meet them.
          </p>
        </div>
        <figure className="story__team">
          <Photo name="team" alt="Two of the Katsuro team in their denim and tan aprons outside the restaurant on St John’s Hill" sizes="(min-width: 900px) 40vw, 100vw" />
          <figcaption>Outside {contact.address[0]}.</figcaption>
        </figure>
      </div>

      <section className="story-steps" aria-label="From the kitchen">
        <figure>
          <Photo name="pounding" alt="Pork loin beaten flat by hand on red boards, a tray of cutlets and egg trays behind" sizes="(min-width: 900px) 33vw, 100vw" />
          <figcaption>
            <strong>The pork.</strong> Loin, beaten out by hand before it’s crumbed.
          </figcaption>
        </figure>
        <figure>
          <Photo name="panko-reel" alt="From a Katsuro reel: an ebi katsu set, a chef cutting katsu, a tonkatsu set and a tofu katsu curry" sizes="(min-width: 900px) 33vw, 100vw" />
          <figcaption>
            <strong>The crumb.</strong> Homemade breadcrumbs, from a Japanese panko machine.{' '}
            <a href="https://www.instagram.com/p/Ddgyp7rM0L6/" target="_blank" rel="noopener">
              Watch the reel
            </a>
          </figcaption>
        </figure>
        <figure>
          <Photo name="chefs" alt="Two chefs at the pass in black T-shirts and denim aprons printed with the orange cutlet" sizes="(min-width: 900px) 33vw, 100vw" />
          <figcaption>
            <strong>The pass.</strong> Plated where you can see it, from the open kitchen.
          </figcaption>
        </figure>
      </section>

      <section className="story-noren">
        <Photo name="noren" alt="The cream noren over the pass, printed with KATSURO, the カツ路 stamp and an outline of the cutlet" sizes="100vw" />
        <p>
          カツ路, katsu-ro, is on the noren over the pass, on the aprons and on the sign. It’s in the name: Katsuro.
        </p>
      </section>

      <section className="story-quotes" aria-label="What people say">
        <QuoteLine quote={quotes.best} />
        <QuoteLine quote={quotes.trek} />
        <QuoteLine quote={quotes.tofu} />
        <p className="fine">
          {contact.googleRating} on Google from {contact.googleReviewCount} reviews.
        </p>
      </section>

      <section className="story-drinks">
        <Photo name="drinks" alt="Bottles on the oak counter: Dassai 45 sake, Choya umeshu, white and red wines, and a cast-iron teapot" sizes="(min-width: 900px) 50vw, 100vw" />
        <div>
          <h2 className="section-title">A few drinks.</h2>
          <p>
            Draught beer, sake, umeshu, lemon sour, wine and tea. “A table full of katsu, a few drinks, and good people
            around it,” as we put it on Instagram.
          </p>
          <Link className="text-link" to="/visit">
            Come and find us
          </Link>
        </div>
      </section>

      <InstagramStrip />
    </div>
  )
}
