import React from 'react';
import { asset } from '../../utils/asset';
import PhotoGrid, { Photo } from './PhotoGrid';

type MediaBentoProps = {
  /** Video path without extension; expects `<base>.mp4` and `<base>-poster.jpg` */
  videoBase: string;
  videoLabel: string;
  videoCaption?: string;
  /** Exactly two photos stack beside the video */
  photos: Photo[];
  className?: string;
};

/**
 * Media mosaic for a story chapter.
 *
 * The chapter clips are 9:16 phone video. Given a full column they tower over
 * the prose and leave a dead gap beside it, so the video takes a half-width
 * cell spanning two rows and two photos stack alongside — the 9:16 cell is
 * exactly the height of two stacked tiles, so the block ends up flush.
 */
const MediaBento: React.FC<MediaBentoProps> = ({
  videoBase,
  videoLabel,
  videoCaption,
  photos,
  className = '',
}) => (
  <figure className={className}>
    <div className="grid grid-cols-2 gap-3">
      <div className="row-span-2 aspect-[9/16] rounded-lg overflow-hidden border border-surface bg-black">
        <video
          className="w-full h-full object-cover"
          controls
          preload="none"
          playsInline
          poster={asset(`${videoBase}-poster.jpg`)}
          aria-label={videoLabel}
        >
          <source src={asset(`${videoBase}.mp4`)} type="video/mp4" />
          Your browser does not support embedded video.
        </video>
      </div>

      <PhotoGrid
        photos={photos.slice(0, 2)}
        className="col-start-2 row-span-2 grid grid-rows-2 gap-3 h-full"
        itemClassName="min-h-0"
        tileClassName="w-full h-full object-cover rounded-lg"
      />
    </div>
    {videoCaption && <figcaption className="type-caption mt-2">{videoCaption}</figcaption>}
  </figure>
);

export default MediaBento;
