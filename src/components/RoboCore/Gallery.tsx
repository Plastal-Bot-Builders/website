import React, { useRef, useState } from 'react';
import { LuPlay } from 'react-icons/lu';
import { asset } from '../../utils/asset';

/*
 * A media gallery: one big picture and a row of thumbnails, like a product page. A video shows its poster and loads
 * YouTube (privacy-enhanced, youtube-nocookie.com) only when someone presses play, so nothing is sent to Google before
 * that. The CSP in public/_headers allows that one frame source. If YouTube sends a viewer to a check page instead (it
 * does that to traffic it thinks is automated), the frame is blocked, so the caption always links to the video itself.
 */

export type GalleryItem =
  | { kind: 'image'; src: string; alt: string; w: number; h: number; contain?: boolean }
  | { kind: 'video'; youtube: string; title: string; poster: string };

const Gallery: React.FC<{ items: GalleryItem[]; label: string }> = ({ items, label }) => {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = items[index];

  const show = (i: number, focus = false) => {
    const n = (i + items.length) % items.length;
    setIndex(n);
    setPlaying(false);
    if (focus) thumbs.current[n]?.focus();
  };

  return (
    <div className="rc-gallery" aria-roledescription="gallery" aria-label={label}>
      <div className="rc-gallery-stage">
        {item.kind === 'image' ? (
          <img
            key={item.src}
            src={asset(`resources/RoboCore/${item.src}`)}
            alt={item.alt}
            width={item.w}
            height={item.h}
            decoding="async"
            className={item.contain ? 'is-contain' : undefined}
          />
        ) : playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${item.youtube}?autoplay=1&rel=0`}
            title={item.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button type="button" className="rc-gallery-play" onClick={() => setPlaying(true)} aria-label={`Play the video: ${item.title}`}>
            <img src={asset(`resources/RoboCore/${item.poster}`)} alt="" width={1280} height={720} decoding="async" />
            <span className="rc-gallery-play-icon" aria-hidden="true">
              <LuPlay />
            </span>
          </button>
        )}
      </div>
      <p className="rc-gallery-caption">
        {item.kind === 'image' ? (
          item.alt
        ) : (
          <>
            {item.title}{' '}
            <a className="rc-link" href={`https://www.youtube.com/watch?v=${item.youtube}`} target="_blank" rel="noopener noreferrer">
              Watch on YouTube
            </a>
          </>
        )}
      </p>
      <div
        className="rc-gallery-thumbs"
        role="group"
        aria-label="Pictures and video"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1, true); }
          if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1, true); }
        }}
      >
        {items.map((it, i) => (
          <button
            key={it.kind === 'image' ? it.src : it.youtube}
            ref={(el) => (thumbs.current[i] = el)}
            type="button"
            className="rc-gallery-thumb"
            aria-current={i === index ? 'true' : undefined}
            aria-label={it.kind === 'image' ? it.alt : `Video: ${it.title}`}
            onClick={() => show(i)}
          >
            <img
              src={asset(`resources/RoboCore/${it.kind === 'image' ? it.src : it.poster}`)}
              alt=""
              loading="lazy"
              decoding="async"
              className={it.kind === 'image' && it.contain ? 'is-contain' : undefined}
            />
            {it.kind === 'video' && (
              <span className="rc-gallery-thumb-play" aria-hidden="true">
                <LuPlay />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
