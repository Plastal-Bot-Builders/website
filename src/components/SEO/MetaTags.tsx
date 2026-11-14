// src/components/SEO/MetaTags.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from '../../config/site';

const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1';

interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  /** Describes the share image. */
  imageAlt?: string;
  /** True for the 1200 x 630 share cards in /resources/social; only those state a size. */
  imageIsCard?: boolean;
  url?: string;
  type?: string;
  robots?: string;
  /** False leaves the canonical link out (a page that should not be indexed, or a default that doesn't know the page). */
  canonical?: boolean;
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  keywords,
  image = '/resources/Logo/logo.png',
  imageAlt,
  imageIsCard = false,
  url, // Remove default value that uses window
  type = 'website',
  robots = DEFAULT_ROBOTS,
  canonical = true,
}) => {
  // Safely determine URL if not provided
  const { pathname } = useLocation();
  const currentUrl = new URL(url || pathname.replace(/\/+$/, '') || '/', SITE_URL).href.split(/[?#]/)[0];
  const imageUrl = new URL(image, SITE_URL).href;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:site_name" content="Plastal-Bot Builders" />
      <meta property="og:locale" content="en_ZM" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      {imageIsCard && <meta property="og:image:width" content="1200" />}
      {imageIsCard && <meta property="og:image:height" content="630" />}
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}
      
      {/* Additional SEO Tags */}
      <meta name="robots" content={robots} />
      <meta name="author" content="Plastal-Bot Builders" />
      {canonical && <link rel="canonical" href={currentUrl} />}
    </Helmet>
  );
};

export default MetaTags;
