import { media } from '../lib/format'

type Props = {
  name: string
  alt: string
  className?: string
  sizes?: string
  eager?: boolean
  width?: number
  height?: number
}

/** One of Katsuro's own photos, from public/media (built by scripts/build-assets.mjs). */
export function Photo({ name, alt, className, sizes = '(min-width: 900px) 50vw, 100vw', eager, width, height }: Props) {
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={`${media(name + '-640.webp')} 640w, ${media(name + '-1280.webp')} 1280w`} sizes={sizes} />
      <img
        src={media(name + '-1280.jpg')}
        srcSet={`${media(name + '-640.jpg')} 640w, ${media(name + '-1280.jpg')} 1280w`}
        sizes={sizes}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        width={width}
        height={height}
      />
    </picture>
  )
}
