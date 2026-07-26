import React from 'react';
import { asset } from '../../utils/asset';

type StoryVideoProps = {
  /** Path without extension, e.g. "resources/Geneva2026/web/prep-programming" */
  base: string;
  label: string;
  caption?: string;
  className?: string;
};

/**
 * Lazy video player: nothing downloads until the visitor presses play, and a
 * poster frame holds the layout so there is no shift.
 */
const StoryVideo: React.FC<StoryVideoProps> = ({ base, label, caption, className = '' }) => (
  <figure className={className}>
    <video
      className="video-frame"
      controls
      preload="none"
      playsInline
      poster={asset(`${base}-poster.jpg`)}
      aria-label={label}
    >
      <source src={asset(`${base}.mp4`)} type="video/mp4" />
      Your browser does not support embedded video.
    </video>
    {caption && <figcaption className="type-caption mt-2">{caption}</figcaption>}
  </figure>
);

export default StoryVideo;
