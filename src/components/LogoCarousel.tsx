import React from 'react';
import { asset } from '../utils/asset';

interface Logo {
  src: string;
  alt: string;
}

const logos: Logo[] = [
  { src: '/resources/Logo/AmericanCorner.png', alt: 'American Corner Logo' },
  { src: '/resources/Logo/AmericanEmbassy.png', alt: 'American Embassy Logo' },
  { src: '/resources/Logo/STEMFoundation.png', alt: 'STEM Foundation Logo' },
  { src: '/resources/Logo/TechnicBots.png', alt: 'Technic Bots Logo' },
  { src: '/resources/Logo/1-02 (2).png', alt: 'Plastal-Bot Builders Logo' },
  { src: '/resources/Logo/launcHER.png', alt: 'Luncher Engineers Hub' },
  // ...existing code...
];

const LogoCarousel: React.FC = () => {
  // Duplicate the list so the animation can loop seamlessly to 50%
  const looped = React.useMemo(() => [...logos, ...logos], []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* ...existing code... */}
      <div className="logo-marquee mx-auto">
        <div className="logo-marquee__track">
          {looped.map((logo, index) => (
            <img
              key={`${logo.src}-${index}`}
              src={asset(logo.src)}
              alt={logo.alt}
              className="logo-marquee__item h-12 w-auto"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;