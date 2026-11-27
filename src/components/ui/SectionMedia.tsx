import React from 'react';
import SmartImage from './SmartImage';

/**
 * Visuals that break up text-heavy sections (support pages, programmes): a strip of captioned photos and a
 * numbered step flow. Photos are web copies in resources/<source>/web/ (scripts/media/make_web_derivatives.py).
 */

export type StripPhoto = { src: string; alt: string; caption?: string };

/** One to three captioned photos in a row (stacked on phones). */
export const PhotoStrip: React.FC<{ photos: StripPhoto[]; className?: string; tall?: boolean }> = ({
  photos,
  className = '',
  tall = false,
}) => (
  <div
    className={`grid grid-cols-1 gap-4 ${photos.length === 2 ? 'sm:grid-cols-2' : ''} ${
      photos.length >= 3 ? 'sm:grid-cols-3' : ''
    } ${className}`}
  >
    {photos.map(p => (
      <figure key={p.src} className="m-0">
        <SmartImage
          src={p.src}
          alt={p.alt}
          className={`w-full ${tall ? 'h-64 sm:h-80' : 'h-48 sm:h-56'} object-cover rounded-lg interactive-card`}
        />
        {p.caption && <figcaption className="mt-2 text-xs sm:text-sm opacity-75">{p.caption}</figcaption>}
      </figure>
    ))}
  </div>
);

export type Step = { title: string; text?: string; tag?: string };

/**
 * A numbered sequence: across the page on wide screens, down it on phones, joined by a line in the accent colour.
 * `tag` is a small label above the title (a date, "Done", …). `vertical` keeps it a top-to-bottom list on every screen.
 */
export const StepFlow: React.FC<{ steps: Step[]; className?: string; vertical?: boolean }> = ({
  steps,
  className = '',
  vertical = false,
}) => (
  <ol
    className={`step-flow grid grid-cols-1 gap-6 ${
      vertical
        ? 'step-flow--vertical'
        : steps.length >= 5
          ? 'lg:grid-cols-5'
          : steps.length === 4
            ? 'lg:grid-cols-4'
            : 'lg:grid-cols-3'
    } ${className}`}
  >
    {steps.map((s, i) => (
      <li key={s.title} className={`step-flow__item relative pl-14 ${vertical ? '' : 'lg:pl-0 lg:pt-14'}`}>
        <span className="step-flow__num absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent font-bold text-accent">
          {i + 1}
        </span>
        {s.tag && <p className="text-xs uppercase tracking-wide opacity-70 mb-1">{s.tag}</p>}
        <h3 className="text-base sm:text-lg font-bold mb-1">{s.title}</h3>
        {s.text && <p className="text-sm leading-relaxed opacity-90">{s.text}</p>}
      </li>
    ))}
  </ol>
);
