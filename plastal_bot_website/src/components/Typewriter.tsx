import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface TypewriterProps {
  text: string; // The text to be animated
  speed?: number; // Speed of the typing effect
  className?: string; // Custom CSS class
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 100, className }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [currentIndex, text, speed]);

  return (
    <motion.div
      className={twMerge(
        clsx(
          'inline-block', // Add any Tailwind classes here
          className
        )
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayedText}
      <span className="animate-pulse">|</span> {/* Blinking cursor */}
    </motion.div>
  );
};

export default Typewriter;
