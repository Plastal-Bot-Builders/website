import React from 'react';
import { asset } from '../utils/asset';

type Props = {
  src: string;      // base path, e.g., resources/Illustrations/Data_extraction.svg
  alt: string;
  className?: string;
};

const withLightSuffix = (p: string) => p.replace(/(\.[a-z0-9]+)$/i, '1$1');

export default function ThemedImage({ src, alt, className }: Props) {
  // Light: base1.svg | Dark: base.svg (controlled by Tailwind .dark)
  const lightSrc = asset(withLightSuffix(src));
  const darkSrc = asset(src);
  return (
    <>
      <img src={lightSrc} alt={alt} className={`${className ?? ''} block dark:hidden`} />
      <img src={darkSrc} alt={alt} className={`${className ?? ''} hidden dark:block`} />
    </>
  );
}