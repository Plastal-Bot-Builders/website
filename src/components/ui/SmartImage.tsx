import React, { useMemo, useState } from 'react';
import { asset } from '../../utils/asset';

/**
 * Branded inline SVG shown when every candidate source fails —
 * prevents the browser's broken-image icon from ever appearing.
 */
const FALLBACK_SVG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
      <rect width="800" height="500" fill="#9ca3af" fill-opacity="0.12"/>
      <g fill="none" stroke="#9ca3af" stroke-width="14" stroke-linecap="round" opacity="0.55">
        <rect x="305" y="175" width="190" height="140" rx="18"/>
        <circle cx="360" cy="230" r="14" fill="#9ca3af" stroke="none"/>
        <circle cx="440" cy="230" r="14" fill="#9ca3af" stroke="none"/>
        <path d="M355 285 h90"/>
        <path d="M400 175 v-40"/>
        <circle cx="400" cy="122" r="10" fill="#9ca3af" stroke="none"/>
      </g>
      <text x="400" y="390" text-anchor="middle" font-family="monospace" font-size="26" fill="#9ca3af" opacity="0.8">Image unavailable</text>
    </svg>`
  );

type SmartImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  /** Skip trying a .webp sibling first (default: tries .webp for png/jpg sources) */
  noWebp?: boolean;
};

/**
 * Drop-in <img> replacement used across the site:
 * - serves a .webp sibling first when one exists (falls back to the original)
 * - lazy loads + async decodes by default
 * - shows a branded placeholder instead of a broken-image icon
 */
const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  noWebp = false,
  loading = 'lazy',
  decoding = 'async',
  ...rest
}) => {
  const candidates = useMemo(() => {
    const list: string[] = [];
    if (!noWebp && /\.(png|jpe?g)$/i.test(src)) {
      list.push(src.replace(/\.(png|jpe?g)$/i, '.webp'));
    }
    list.push(src);
    return list;
  }, [src, noWebp]);

  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(false);

  const current = failed ? FALLBACK_SVG : encodeURI(asset(candidates[idx]));

  return (
    <img
      src={current}
      alt={alt}
      loading={loading}
      decoding={decoding}
      onError={() => {
        if (idx + 1 < candidates.length) setIdx(i => i + 1);
        else setFailed(true);
      }}
      {...rest}
    />
  );
};

export default SmartImage;
