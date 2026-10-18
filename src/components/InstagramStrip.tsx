import { contact, instagramPosts } from '../data/katsuro'
import { Photo } from './Photo'

/** Their six latest posts, captions as they wrote them. */
export function InstagramStrip() {
  return (
    <section className="ig" aria-labelledby="ig-title">
      <div className="ig__head">
        <h2 id="ig-title" className="section-title">
          Lately, on {contact.instagram}
        </h2>
        <a className="text-link" href={contact.instagramUrl} target="_blank" rel="noopener">
          Follow on Instagram
        </a>
      </div>
      <ul className="ig__list">
        {instagramPosts.map((p) => (
          <li key={p.code}>
            <a href={`https://www.instagram.com/p/${p.code}/`} target="_blank" rel="noopener" className="ig__post">
              <Photo name={p.img} alt="" sizes="(min-width: 900px) 16vw, 60vw" />
              <span className="ig__caption">{p.caption.split('\n').filter(Boolean)[0]}</span>
              <span className="ig__date">{p.date}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
