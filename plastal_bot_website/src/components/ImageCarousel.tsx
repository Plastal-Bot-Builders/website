import React, { useState, useEffect } from 'react';

const ImageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalTime = 4000;

  const images = [
    '/resources/Photos/femalerobotics.png',
    '/resources/Photos/foundation.jpg',
    '/resources/Photos/dywen.jpg',
    '/resources/Photos/momentofbliss.png',
    '/resources/Photos/IMG_4781.jpeg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, intervalTime);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  return (
    <div className="carousel relative w-full mx-auto rounded-lg h-64 overflow-hidden">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          className={`absolute w-full h-full object-cover ${index === currentIndex ? 'active' : ''}`}
          style={{ display: index === currentIndex ? 'block' : 'none' }}
        />
      ))}
    </div>
  );
};

export default ImageCarousel;
