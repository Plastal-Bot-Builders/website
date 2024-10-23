import React from 'react';
import { motion } from 'framer-motion';

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

const AnimatedShapes: React.FC = () => {
  const shapes = [];
  
  // Generate multiple shapes (4 columns) in a loop for infinite vertical repetition
  for (let i = 0; i < 20; i++) {
    shapes.push(
      <motion.g key={i} custom={i}>
        {/* First rectangle with diagonal lines */}
        <motion.rect x="10" y={i * 20} width="15" height="20" fill="none" stroke="blue" strokeWidth="0.5" variants={draw} />
        <motion.line x1="10" y1={i * 20} x2="25" y2={(i + 1) * 20} stroke="blue" strokeWidth="0.3" variants={draw} />
        <motion.line x1="25" y1={i * 20} x2="10" y2={(i + 1) * 20} stroke="blue" strokeWidth="0.3" variants={draw} />

        {/* Second rectangle with diagonal lines */}
        <motion.rect x="30" y={i * 20} width="15" height="20" fill="none" stroke="green" strokeWidth="0.5" variants={draw} />
        <motion.line x1="30" y1={i * 20} x2="45" y2={(i + 1) * 20} stroke="green" strokeWidth="0.3" variants={draw} />
        <motion.line x1="45" y1={i * 20} x2="30" y2={(i + 1) * 20} stroke="green" strokeWidth="0.3" variants={draw} />

        {/* Third rectangle with diagonal lines */}
        <motion.rect x="50" y={i * 20} width="15" height="20" fill="none" stroke="red" strokeWidth="0.5" variants={draw} />
        <motion.line x1="50" y1={i * 20} x2="65" y2={(i + 1) * 20} stroke="red" strokeWidth="0.3" variants={draw} />
        <motion.line x1="65" y1={i * 20} x2="50" y2={(i + 1) * 20} stroke="red" strokeWidth="0.3" variants={draw} />

        {/* Fourth rectangle with diagonal lines */}
        <motion.rect x="70" y={i * 20} width="15" height="20" fill="none" stroke="orange" strokeWidth="0.5" variants={draw} />
        <motion.line x1="70" y1={i * 20} x2="85" y2={(i + 1) * 20} stroke="orange" strokeWidth="0.3" variants={draw} />
        <motion.line x1="85" y1={i * 20} x2="70" y2={(i + 1) * 20} stroke="orange" strokeWidth="0.3" variants={draw} />
      </motion.g>
    );
  }

  return (
    <motion.svg
      width="100%"
      height="200%" // Set height larger for infinite downward scrolling
      viewBox="0 0 100 400" // Adjust viewBox to match the repeating patterns
      preserveAspectRatio="xMidYMid meet" // Center the shapes
      initial="hidden"
      animate="visible"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        overflow: 'hidden',
      }}
    >
      {/* Move shapes down in a loop */}
      {shapes}

      {/* Infinite downward scroll */}
      <motion.g
        animate={{ y: [0, -400] }} // Moves the shapes up
        transition={{
          repeat: Infinity,
          duration: 10, // Speed of downward motion
          ease: 'linear',
        }}
      />
    </motion.svg>
  );
};

export default AnimatedShapes;