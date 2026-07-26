import React, { useState } from 'react';
import { asset } from '../../utils/asset';

type LogoPlateProps = {
  /** Path relative to public/, including extension */
  src: string;
  /** Organisation name — used as accessible text and as the visible fallback */
  name: string;
  /** Optional external link */
  href?: string;
  /** What they contributed, shown under the plate */
  role?: string;
};

/**
 * Sponsor/supporter logo on a light plate. Many brand logos are drawn in dark
 * ink for print, so a fixed light plate keeps every logo legible in both
 * themes instead of some disappearing in dark mode. If a logo file is missing,
 * the organisation name is rendered as a wordmark instead.
 */
const LogoPlate: React.FC<LogoPlateProps> = ({ src, name, href, role }) => {
  const [failed, setFailed] = useState(false);

  const plate = (
    <span className="logo-plate">
      {failed ? (
        <span className="logo-plate__wordmark">{name}</span>
      ) : (
        <img
          src={asset(src)}
          alt={`${name} logo`}
          loading="lazy"
          decoding="async"
          className="logo-plate__img"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );

  return (
    <li className="flex flex-col items-center text-center gap-2">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
          aria-label={`${name} (opens in a new tab)`}
        >
          {plate}
        </a>
      ) : (
        plate
      )}
      <span className="text-sm font-semibold">{name}</span>
      {role && <span className="type-caption">{role}</span>}
    </li>
  );
};

export default LogoPlate;
