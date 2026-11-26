import React, { useEffect, useRef, useState } from 'react';
import { asset } from '../../utils/asset';
import { useTheme } from '../../theme/ThemeProvider';
import './LiveIllustration.css';

/**
 * An illustration drawn inline, so its parts can move. Colours are as drawn: the light and dark themes each
 * have their own file, built by scripts/illustrations/build-live.mjs (public/resources/Illustrations/live/
 * <name>.svg and <name>.dark.svg); LiveIllustration.css holds the motion. ThemedImage uses this for every
 * illustration listed in src/theme/liveIllustrations.json. Loads when it comes near the screen, plays only
 * while on screen, and stays still for visitors who turn motion off.
 */

/** Each file is fetched once per visit, however many times it appears. */
const cache = new Map<string, Promise<string>>();
function loadSvg(file: string): Promise<string> {
  let p = cache.get(file);
  if (!p) {
    p = fetch(asset(`resources/Illustrations/live/${file}.svg`)).then((r) => {
      if (!r.ok) throw new Error(`live illustration ${file}: ${r.status}`);
      return r.text();
    });
    p.catch(() => cache.delete(file)); // let a later mount try again
    cache.set(file, p);
  }
  return p;
}

/** How long the entrances take; after this the parts stay put, even when the other theme's file swaps in. */
const SETTLE_MS = 2600;

type Props = {
  /** File name in public/resources/Illustrations/live, without .svg */
  name: string;
  alt: string;
  className?: string;
  /** The artwork's width / height (its viewBox), e.g. "3 / 2", so the space is held while it loads */
  ratio?: string;
  /** Called if the file can't be loaded, so the caller can show the plain image instead */
  onError?: () => void;
};

export default function LiveIllustration({ name, alt, className = '', ratio = '1 / 1', onError }: Props) {
  const { resolvedTheme } = useTheme();
  const file = resolvedTheme === 'dark' ? `${name}.dark` : name;
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false); // within reach of the screen: time to fetch
  const [svg, setSvg] = useState<string | null>(null);
  const [live, setLive] = useState(false); // has been on screen: entrance played, loops running
  const [inView, setInView] = useState(false); // on screen now: loops run only then
  const [settled, setSettled] = useState(false);
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  // Notice when it comes within reach of the screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setNear(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          setNear(true);
        }
      },
      { rootMargin: '600px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Fetch this theme's file (again when the theme changes; the old one stays until the new one is ready).
  useEffect(() => {
    if (!near) return undefined;
    let alive = true;
    loadSvg(file).then(
      (text) => {
        if (!alive) return;
        setSvg(text);
        // Have the other theme's file ready too, so switching is instant.
        const other = file.endsWith('.dark') ? name : `${name}.dark`;
        loadSvg(other).catch(() => undefined);
      },
      () => alive && onErrorRef.current?.()
    );
    return () => {
      alive = false;
    };
  }, [near, file, name]);

  // Start the motion when it is on screen, pause it when it leaves.
  const hasSvg = svg !== null;
  useEffect(() => {
    const el = ref.current;
    if (!el || !hasSvg) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setLive(true);
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (e.isIntersecting) setLive(true);
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasSvg]);

  useEffect(() => {
    if (!live) return undefined;
    const t = window.setTimeout(() => setSettled(true), SETTLE_MS);
    return () => window.clearTimeout(t);
  }, [live]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={alt}
      className={['illo', live && 'is-live', inView && 'is-inview', settled && 'is-settled', className].filter(Boolean).join(' ')}
      // Hold the space until the drawing arrives; then it sizes itself (a few dark copies are cropped differently).
      style={svg ? undefined : { aspectRatio: ratio }}
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    />
  );
}
