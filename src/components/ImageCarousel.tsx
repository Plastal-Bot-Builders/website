import React, { useEffect, useState } from 'react';
import SmartImage from './ui/SmartImage';

const slides = [
  { src: '/resources/Photos/femalerobotics.png', alt: 'Girls building robots during a robotics workshop' },
  { src: '/resources/Photos/foundation.jpg', alt: 'Plastal-Bot Builders team at a community event' },
  { src: '/resources/Photos/dywen.jpg', alt: 'Student presenting a robotics project' },
  { src: '/resources/Photos/momentofbliss.png', alt: 'Students celebrating a successful robot test' },
  { src: '/resources/Photos/IMG_4781.jpeg', alt: 'Hands-on electronics session with learners' },
];

const INTERVAL_MS = 4000;

const ImageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="carousel relative w-full mx-auto rounded-lg h-56 sm:h-64 overflow-hidden"
      role="region"
      aria-label="Photo highlights from our programs"
    >
      {slides.map((slide, index) => (
        <SmartImage
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          loading={index === 0 ? 'eager' : 'lazy'}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
          style={{ opacity: index === currentIndex ? 1 : 0 }}
          aria-hidden={index !== currentIndex}
        />
      ))}
    </div>
  );
};

export default ImageCarousel;
