import React from 'react';
import { asset } from '../utils/asset';
import { useTheme } from '../theme/ThemeProvider';

interface Logo {
  lightSrc: string;
  darkSrc: string;
  alt: string;
}

const logos: Logo[] = [
  {
    lightSrc: '/resources/Logo/AmericanCorner.png',
    darkSrc: '/resources/Logo/AmericanCorner.png', 
    alt: 'American Corner Logo' 
  },
  { 
    lightSrc: '/resources/Logo/AmericanEmbassy.png',
    darkSrc: '/resources/Logo/AmericanEmbassy.png', 
    alt: 'American Embassy Logo' 
  },
  { 
    lightSrc: '/resources/Logo/STEMFoundation.png',
    darkSrc: '/resources/Logo/STEMFoundation.png', 
    alt: 'STEM Foundation Logo' 
  },
  { 
    lightSrc: '/resources/Logo/TechnicBots.png',
    darkSrc: '/resources/Logo/TechnicBots.png', 
    alt: 'Technic Bots Logo' 
  },
  { 
    lightSrc: '/resources/Logo/logo_light.svg',
    darkSrc: '/resources/Logo/baselLogo.png', 
    alt: 'Plastal-Bot Builders Logo' 
  },
  { 
    lightSrc: '/resources/Logo/launcHER.png',
    darkSrc: '/resources/Logo/launcHER.png', 
    alt: 'Luncher Engineers Hub' 
  },
  {
    lightSrc: '/resources/Logo/EO_Robotics_Logo.png',
    darkSrc: 'resources/Logo/EO_Robotics_Logo.png',
    alt: 'EO Robotics Lab'
  },
  {
    lightSrc: '/resources/Logo/makerspace_icon.jpg',
    darkSrc: '/resources/Logo/makerspace_icon.jpg',
    alt: 'Makerspace Zambia'
  },
];

const LogoCarousel: React.FC = () => {
  // Duplicate the list so the animation can loop seamlessly to 50%
  const looped = React.useMemo(() => [...logos, ...logos], []);
  const { resolvedTheme, toggle } = useTheme();

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* ...existing code... */}
      <div className="logo-marquee mx-auto">
        <div className="logo-marquee__track">
          {looped.map((logo, index) => (
            <img
              key={`${logo.lightSrc}-${index}`}
              src={asset(resolvedTheme === 'dark' ? logo.darkSrc : logo.lightSrc)}
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