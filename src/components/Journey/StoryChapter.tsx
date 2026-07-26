import React from 'react';
import FadeContent from '../ui/FadeContent';

type StoryChapterProps = {
  /** Anchor id used by the chapter navigation */
  id: string;
  /** Two-digit chapter marker, e.g. "01" */
  number?: string;
  /** Short date range, e.g. "March 2026" */
  timeframe?: string;
  title: React.ReactNode;
  /** Short standfirst shown under the title */
  lede?: React.ReactNode;
  children: React.ReactNode;
};

/**
 * One chapter of the Journey to Geneva story. Keeps heading levels, spacing
 * and reveal animation identical across every chapter.
 */
const StoryChapter: React.FC<StoryChapterProps> = ({
  id,
  number,
  timeframe,
  title,
  lede,
  children,
}) => (
  <FadeContent blur duration={900} easing="ease-out" initialOpacity={0}>
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-16 chapter-anchor"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {number && (
            <span
              aria-hidden="true"
              className="text-hex font-extrabold tracking-[0.2em] text-sm"
            >
              CHAPTER {number}
            </span>
          )}
          {timeframe && <span className="tag">{timeframe}</span>}
        </div>

        <h2 id={`${id}-title`} className="type-h2 mb-4 max-w-4xl">
          {title}
        </h2>

        {lede && <p className="type-body max-w-3xl mb-8 opacity-90">{lede}</p>}

        {children}
      </div>
    </section>
  </FadeContent>
);

export default StoryChapter;
