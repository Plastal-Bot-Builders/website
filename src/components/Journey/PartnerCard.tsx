import React, { useState } from 'react';
import { asset } from '../../utils/asset';
import { FaGlobe, FaInstagram, FaLink } from 'react-icons/fa';

export type PartnerLink = {
  label: string;
  href: string;
  kind: 'website' | 'instagram' | 'linktree';
};

type PartnerCardProps = {
  name: string;
  /** e.g. "FTC Team 23270" */
  subtitle?: string;
  description: string;
  links: PartnerLink[];
  /**
   * Optional logo path relative to public/. If the file is absent the card
   * shows a branded monogram instead, so the layout is never broken.
   */
  logo?: string;
  /** Monogram text used when no logo file is available, e.g. "SB" */
  monogram: string;
  /** Background + foreground for the monogram tile */
  monogramBg: string;
  monogramFg: string;
};

const ICONS = {
  website: FaGlobe,
  instagram: FaInstagram,
  linktree: FaLink,
} as const;

const PartnerCard: React.FC<PartnerCardProps> = ({
  name,
  subtitle,
  description,
  links,
  logo,
  monogram,
  monogramBg,
  monogramFg,
}) => {
  const [logoFailed, setLogoFailed] = useState(!logo);

  return (
    <article className="interactive-card p-6 flex flex-col h-full">
      <div className="flex items-center gap-4 mb-4">
        {logoFailed ? (
          <span
            className="partner-monogram"
            style={{ background: monogramBg, color: monogramFg }}
            aria-hidden="true"
          >
            {monogram}
          </span>
        ) : (
          <img
            src={asset(logo as string)}
            alt={`${name} logo`}
            loading="lazy"
            decoding="async"
            className="partner-logo"
            onError={() => setLogoFailed(true)}
          />
        )}
        <div className="min-w-0">
          <h3 className="type-h4 break-words">{name}</h3>
          {subtitle && <p className="type-caption">{subtitle}</p>}
        </div>
      </div>

      <p className="text-sm leading-relaxed opacity-90 mb-5 flex-grow">{description}</p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {links.map(l => {
          const Icon = ICONS[l.kind];
          return (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="partner-link"
              aria-label={`${name} — ${l.label} (opens in a new tab)`}
            >
              <Icon aria-hidden="true" />
              {l.label}
            </a>
          );
        })}
      </div>
    </article>
  );
};

export default PartnerCard;
