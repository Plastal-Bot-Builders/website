// src/components/SEO/DefaultSEO.tsx
import React from 'react';
import { SEOConfig } from './index';

const DefaultSEO: React.FC = () => {
  return (
    <SEOConfig
      title="Plastal-Bot Builders | Robotics Education"
      description="Plastal-Bot Builders provides robotics education and community programs for all ages. Learn coding, engineering, and problem-solving through hands-on building."
      keywords="robotics, education, coding, STEM, robot building"
      // Organization and WebSite JSON-LD are part of each listed page's @graph: scripts/prerender.js writes it
      // into the static HTML and SEOConfig sets the same graph in the running app (src/data/site-seo.json).
      // Emitting them again here would create duplicate nodes.
      includeOrganizationData={false}
      includeWebsiteData={false}
      // This default is mounted on every address, also ones that don't exist, so it only gives a canonical link
      // to pages the manifest lists. Other real pages set their own through their own SEOConfig.
      canonical={false}
    />
  );
};

export default DefaultSEO;