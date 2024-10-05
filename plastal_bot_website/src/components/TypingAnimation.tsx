import React, { useEffect, useRef } from 'react';

const TypingAnimation: React.FC = () => {
  const elementRef = useRef<HTMLSpanElement | null>(null); // TypeScript ref type for the element

  // Function to reset the animation
  const resetAnimation = () => {
    if (elementRef.current) {
      elementRef.current.style.animation = 'none';
      void elementRef.current.offsetHeight; // Use 'void' to intentionally ignore the return value and trigger reflow
      elementRef.current.style.animation = ''; // Reset to original animation
    }
  };

  useEffect(() => {
    // Initial animation
    resetAnimation();

    // Repeat animation every 5 seconds
    const intervalId = setInterval(resetAnimation, 5000);

    // Cleanup function to clear interval
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array to run only once

  return (
    <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
      <span ref={elementRef} className="text-hex typing-animation">
        Empowering <span className="text-white">Innovation</span>
      </span>
    </h1>
  );
};

export default TypingAnimation;
