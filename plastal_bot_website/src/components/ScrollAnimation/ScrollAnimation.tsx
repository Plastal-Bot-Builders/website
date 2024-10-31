// ScrollAnimation.tsx
import React, { useEffect, useRef, useState } from "react";
import styles from "./ScrollAnimation.module.css";

type ScrollAnimationProps = {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
};

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  threshold = 0.3,
  rootMargin = "0px",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false); // Reset visibility when the element leaves the viewport
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, rootMargin]);

  return (
    <div
      ref={elementRef}
      className={isVisible ? styles.appear : styles.hidden}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;
