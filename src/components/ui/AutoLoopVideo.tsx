import React, { useCallback, useEffect, useRef, useState } from 'react';
import { asset } from '../../utils/asset';
import { FaPause, FaPlay } from 'react-icons/fa';

type AutoLoopVideoProps = {
  /** Path without extension, e.g. "resources/.../geneva-celebration-loop".
   *  Expects `<base>.mp4` and `<base>-poster.jpg` to exist. */
  base: string;
  /** Describes the footage for screen readers */
  label: string;
  /** Classes applied to the video (and to the still fallback) */
  className?: string;
};

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Muted, looping background video used as a "living photo".
 *
 * - Falls back to the poster still (and downloads no video) when the visitor
 *   prefers reduced motion.
 * - Pauses while scrolled out of view so it costs nothing in the background.
 * - Ships a pause/play control: WCAG 2.2.2 requires a way to stop motion that
 *   starts automatically and runs for more than five seconds.
 */
const AutoLoopVideo: React.FC<AutoLoopVideoProps> = ({ base, label, className = '' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByUser = useRef(false);
  const [reduced, setReduced] = useState(reducedMotion);
  const [playing, setPlaying] = useState(true);

  // Honour the preference changing while the page is open
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener?.('change', onChange);
    return () => mql.removeEventListener?.('change', onChange);
  }, []);

  // Don't decode frames while the card is off screen
  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!pausedByUser.current) el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const toggle = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      pausedByUser.current = false;
      el.play().catch(() => {});
      setPlaying(true);
    } else {
      pausedByUser.current = true;
      el.pause();
      setPlaying(false);
    }
  }, []);

  if (reduced) {
    return (
      <img
        src={asset(`${base}-poster.jpg`)}
        alt={label}
        className={className}
        loading="eager"
        decoding="async"
      />
    );
  }

  return (
    <>
      <video
        ref={videoRef}
        className={className}
        poster={asset(`${base}-poster.jpg`)}
        aria-label={label}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={asset(`${base}.mp4`)} type="video/mp4" />
      </video>
      <button
        type="button"
        className="video-loop__toggle"
        onClick={toggle}
        aria-label={playing ? 'Pause the looping video' : 'Play the looping video'}
      >
        {playing ? <FaPause aria-hidden="true" /> : <FaPlay aria-hidden="true" />}
      </button>
    </>
  );
};

export default AutoLoopVideo;
