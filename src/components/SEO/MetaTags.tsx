// src/components/SEO/MetaTags.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from '../../config/site';

interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  keywords,
  image = '/resources/Logo/logo.png',
  url, // Remove default value that uses window
  type = 'website'
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
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <meta name="author" content="Plastal-Bot Builders" />
      <link rel="canonical" href={currentUrl} />
    </Helmet>
  );
};

export default MetaTags;