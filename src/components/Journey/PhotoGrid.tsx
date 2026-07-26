import React, { useCallback, useEffect, useState } from 'react';
import SmartImage from '../ui/SmartImage';

export type Photo = {
  src: string;
  alt: string;
  /** Optional visible caption */
  caption?: string;
};

type PhotoGridProps = {
  photos: Photo[];
  /** Tailwind grid column classes; defaults to a 2/3-up responsive grid */
  className?: string;
  /** Uniform tile height classes */
  tileClassName?: string;
  /** Classes for each <li>, e.g. when tiles must fill a grid cell */
  itemClassName?: string;
};

/**
 * Responsive photo grid with an accessible lightbox. Images keep a fixed
 * aspect ratio so the grid never shifts as pictures load.
 */
const PhotoGrid: React.FC<PhotoGridProps> = ({
  photos,
  className = 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4',
  tileClassName = 'w-full h-32 sm:h-40 lg:h-44 object-cover rounded-lg',
  itemClassName = '',
}) => {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen(i => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, step]);

  return (
    <>
      <ul className={className}>
        {photos.map((p, i) => (
          <li key={p.src} className={itemClassName}>
            <button
              type="button"
              className="block w-full h-full rounded-lg overflow-hidden"
              onClick={() => setOpen(i)}
              aria-label={`Enlarge photo: ${p.alt}`}
            >
              <SmartImage src={p.src} alt={p.alt} className={`${tileClassName} img-hover-tilt`} />
            </button>
            {p.caption && <p className="type-caption mt-2">{p.caption}</p>}
          </li>
        ))}
      </ul>

      {open !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={photos[open].alt}
          onClick={close}
        >
          <figure className="lightbox__figure" onClick={e => e.stopPropagation()}>
            <SmartImage
              src={photos[open].src}
              alt={photos[open].alt}
              loading="eager"
              className="lightbox__img"
            />
            <figcaption className="lightbox__caption">
              {photos[open].caption || photos[open].alt}
            </figcaption>
          </figure>

          <button type="button" className="lightbox__btn lightbox__close" onClick={close} aria-label="Close">
            ✕
          </button>
          {photos.length > 1 && (
            <>
              <button
                type="button"
                className="lightbox__btn lightbox__prev"
                onClick={e => { e.stopPropagation(); step(-1); }}
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                type="button"
                className="lightbox__btn lightbox__next"
                onClick={e => { e.stopPropagation(); step(1); }}
                aria-label="Next photo"
              >
                ›
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default PhotoGrid;
