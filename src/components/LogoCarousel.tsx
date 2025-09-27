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
  { src: '/resources/Logo/AmericanCorner.png', alt: 'American Corner Logo' },
  { src: '/resources/Logo/AmericanEmbassy.png', alt: 'American Embassy Logo' },
  { src: '/resources/Logo/STEMFoundation.png', alt: 'STEM Foundation Logo' },
  { src: '/resources/Logo/TechnicBots.png', alt: 'Technic Bots Logo' },
  { src: '/resources/Logo/launcHER.png', alt: 'Luncher Engineers Hub' },
  { src: '/resources/Logo/1-02 (2).png', alt: 'Plastal-Bot Builders Logo' },
  { src: '/resources/Logo/AmericanCorner.png', alt: 'American Corner Logo' },
  { src: '/resources/Logo/AmericanEmbassy.png', alt: 'American Embassy Logo' },
  { src: '/resources/Logo/STEMFoundation.png', alt: 'STEM Foundation Logo' },
  { src: '/resources/Logo/TechnicBots.png', alt: 'Technic Bots Logo' },
  { src: '/resources/Logo/launcHER.png', alt: 'Luncher Engineers Hub' },
  { src: '/resources/Logo/1-02 (2).png', alt: 'Plastal-Bot Builders Logo' },
  { src: '/resources/Logo/AmericanCorner.png', alt: 'American Corner Logo' },
  { src: '/resources/Logo/AmericanEmbassy.png', alt: 'American Embassy Logo' },
  { src: '/resources/Logo/STEMFoundation.png', alt: 'STEM Foundation Logo' },
  { src: '/resources/Logo/TechnicBots.png', alt: 'Technic Bots Logo' },
  { src: '/resources/Logo/launcHER.png', alt: 'Luncher Engineers Hub' },
  { src: '/resources/Logo/1-02 (2).png', alt: 'Plastal-Bot Builders Logo' },
  // Add more logos as needed
];

const LogoCarousel: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-70" />
      <div className="carousel mx-auto">
        <div className="carousel-track flex items-center justify-center space-x-4">
        
          {logos.map((logo, index) => (

            <img
              key={index}
              src={asset(logo.src)}
              alt={logo.alt}
              className="h-12 w-auto"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;
