import { useState } from 'react';
import { asset } from '../utils/asset';

type Props = {
  src: string;
  alt: string;
  className?: string;
};

const withLightSuffix = (p: string) => p.replace(/(\.[a-z0-9]+)$/i, '1$1');

/**
 * Renders the light-theme variant ("name1.ext") in light mode and the base
 * asset in dark mode. If a variant is missing, it gracefully falls back to
 * the other file instead of showing a broken image.
 */
export default function ThemedImage({ src, alt, className }: Props) {
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
