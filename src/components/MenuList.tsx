import type { ReactNode } from 'react'
import type { MenuItem, MenuSection } from '../data/katsuro'
import { price } from '../lib/format'
import { Marks } from './Marks'

export function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <li className="menu-item">
      <div className="menu-item__line">
        <span className="menu-item__name">
          <Marks marks={item.marks} cold={item.cold} />
          {item.name}
        </span>
        <span className="menu-item__leader" aria-hidden="true" />
        {typeof item.price === 'number' ? (
          <span className="menu-item__price">
            <span className="sr-only">£</span>
            {price(item.price)}
          </span>
        ) : (
          <span className="menu-item__price menu-item__price--multi">
            {item.price.map((p) => (
              <span key={p.label}>
                {p.label} <b>{price(p.price)}</b>
              </span>
            ))}
          </span>
        )}
      </div>
      {item.desc && <p className="menu-item__desc">{item.desc}</p>}
      {item.note && <p className="menu-item__note">{item.note}</p>}
    </li>
  )
}

export function MenuSectionBlock({
  section,
  children,
  compact,
  bare,
}: {
  section: MenuSection
  children?: ReactNode
  compact?: boolean
  bare?: boolean
}) {
  return (
    <section className={`menu-section ${compact ? 'menu-section--compact' : ''}`} id={`m-${section.id}`} aria-labelledby={`h-${section.id}`}>
      <h3 className={`menu-section__title ${bare ? 'sr-only' : ''}`} id={`h-${section.id}`}>
        {section.title}
      </h3>
      {section.intro && <p className="menu-section__intro">{section.intro}</p>}
      <ul className="menu-section__items">
        {section.items.map((item) => (
          <MenuItemRow key={item.name} item={item} />
        ))}
      </ul>
      {children}
    </section>
  )
}
