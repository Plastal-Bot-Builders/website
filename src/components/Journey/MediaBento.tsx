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
 * Media mosaic for a story chapter: the 9:16 phone clip on the left, two photos stacked on the right.
 *
 * It takes the height of the prose beside it rather than its own: the chapter's grid row stretches the figure, and
 * the video and photos are drawn absolutely inside their cells (object-cover), so tall portrait photos can no longer
 * push the block far past the text (Nationals was 926 px tall beside 347 px of text). On phones, where it sits
 * under the text, it gets a fixed height instead.
 */
const MediaBento: React.FC<MediaBentoProps> = ({
  videoBase,
  videoLabel,
  videoCaption,
  photos,
  className = '',
}) => (
  <figure className={`flex flex-col ${className}`}>
    {/* Column split and height per screen size keep the video cell close to the clip's own 9:16 shape. */}
    <div className="grid grid-cols-2 sm:grid-cols-[2fr_3fr] lg:grid-cols-2 xl:grid-cols-[2fr_3fr] gap-3 flex-1 min-h-[22rem] sm:min-h-[34rem] lg:min-h-[20rem]">
      <div className="relative rounded-lg overflow-hidden border border-surface bg-black">
        <video
          className="absolute inset-0 w-full h-full object-cover"
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
        className="grid grid-rows-2 gap-3"
        itemClassName="relative min-h-0"
        tileClassName="absolute inset-0 w-full h-full object-cover rounded-lg"
      />
    </div>
    {videoCaption && <figcaption className="type-caption mt-2">{videoCaption}</figcaption>}
  </figure>
);

export default MediaBento;
