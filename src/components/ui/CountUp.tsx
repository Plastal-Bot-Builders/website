import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

interface CountUpProps {
  to: number;
  from?: number;
  direction?: 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  useEasing?: boolean;
  easingFn?: (t: number) => number;
  onStart?: () => void;
  onEnd?: () => void;
}

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  prefix = '',
  suffix = '',
  decimals,
  useEasing = true,
  easingFn,
  onStart,
  onEnd
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(direction === 'down' ? to : from);
  const isInView = useInView(ref, { once: true, margin: '0px' });

  const getDecimalPlaces = (num: number): number => {
    const str = num.toString();
    if (str.includes('.')) {
      const decimals = str.split('.')[1];
      if (parseInt(decimals) !== 0) {
        return decimals.length;
      }
    }
    return 0;
  };

  // Use provided decimals or calculate from input values
  const calculatedDecimals = decimals !== undefined ? 
    decimals : 
    Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  // Format the displayed value
  const formatValue = (value: number) => {
    const hasDecimals = calculatedDecimals > 0;
    const options: Intl.NumberFormatOptions = {
      useGrouping: !!separator,
      minimumFractionDigits: hasDecimals ? calculatedDecimals : 0,
      maximumFractionDigits: hasDecimals ? calculatedDecimals : 0
    };

    const formattedNumber = Intl.NumberFormat('en-US', options).format(value);
    return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
  };

  // Initialize with starting value
  useEffect(() => {
    if (ref.current) {
      const initialValue = direction === 'down' ? to : from;
      ref.current.textContent = `${prefix}${formatValue(initialValue)}${suffix}`;
    }
  }, [from, to, direction, separator, calculatedDecimals, prefix, suffix]);

  // Animate the counting
  useEffect(() => {
    if (!isInView || !startWhen) return;

    if (typeof onStart === 'function') {
      onStart();
    }

    const startValue = direction === 'down' ? to : from;
    const endValue = direction === 'down' ? from : to;
    const range = endValue - startValue;
    const increment = range / (duration * 60); // 60fps
    let currentValue = startValue;
    let startTime: number | null = null;
    
    const easeOutQuad = (t: number): number => {
      return t * (2 - t);
    };

    const easeFunction = useEasing ? (easingFn || easeOutQuad) : (t: number) => t;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const easedProgress = easeFunction(progress);
      
      currentValue = startValue + range * easedProgress;
      
      if (ref.current) {
        ref.current.textContent = `${prefix}${formatValue(currentValue)}${suffix}`;
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        // Ensure final value is exact
        if (ref.current) {
          ref.current.textContent = `${prefix}${formatValue(endValue)}${suffix}`;
        }
        
        if (typeof onEnd === 'function') {
          onEnd();
        }
      }
    };

    const animationDelayId = setTimeout(() => {
      window.requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(animationDelayId);
    };
  }, [isInView, startWhen, from, to, duration, delay, direction, onStart, onEnd, prefix, suffix, useEasing, easingFn]);

  return <span className={className} ref={ref} />;
}