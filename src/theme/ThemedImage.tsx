import { useState } from 'react';
import { asset } from '../utils/asset';
import LiveIllustration from '../components/ui/LiveIllustration';
import liveIllustrations from './liveIllustrations.json';

type Props = {
  src: string;
  alt: string;
  className?: string;
};

const withLightSuffix = (p: string) => p.replace(/(\.[a-z0-9]+)$/i, '1$1');

/** Illustrations with a moving version (scripts/illustrations/build-live.mjs writes the list). */
const LIVE = liveIllustrations as Record<string, { ratio: string }>;
const liveName = (src: string) => {
  const m = src.match(/(?:^|\/)resources\/Illustrations\/([^/]+)\.svg$/);
  return m && LIVE[m[1]] ? m[1] : null;
};

/**
 * Renders the light-theme variant ("name1.ext") in light mode and the base
 * asset in dark mode. If a variant is missing, it gracefully falls back to
 * the other file instead of showing a broken image. Illustrations that have a
 * live version are drawn by LiveIllustration instead (same colours, with
 * motion), and fall back to these images if it can't load.
 */
export default function ThemedImage({ src, alt, className }: Props) {
  const live = liveName(src);
  const [liveFailed, setLiveFailed] = useState(false);
  if (live && !liveFailed) {
    return (
      <LiveIllustration
        name={live}
        alt={alt}
        ratio={LIVE[live].ratio}
        className={className}
        onError={() => setLiveFailed(true)}
      />
    );
  }
  return <StaticThemedImage src={src} alt={alt} className={className} />;
}

function StaticThemedImage({ src, alt, className }: Props) {
  const darkSrc = asset(src);
  const [lightSrc, setLightSrc] = useState(asset(withLightSuffix(src)));
  const [dark, setDark] = useState(darkSrc);

  return (
    <>
      <img
        src={lightSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`${className ?? ''} block dark:hidden`}
        onError={() => {
          if (lightSrc !== darkSrc) setLightSrc(darkSrc);
        }}
      />
      <img
        src={dark}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`${className ?? ''} hidden dark:block`}
        onError={() => {
          const light = asset(withLightSuffix(src));
          if (dark !== light) setDark(light);
        }}
      />
    </>
  );
}
