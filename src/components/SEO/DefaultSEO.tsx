// src/components/SEO/DefaultSEO.tsx
import React from 'react';
import { SEOConfig } from './index';

const DefaultSEO: React.FC = () => {
  return (
    <SEOConfig
      title="Plastal-Bot Builders | Robotics Education"
      description="Plastal-Bot Builders provides robotics education and community programs for all ages. Learn coding, engineering, and problem-solving through hands-on building."
      keywords="robotics, education, coding, STEM, robot building"
      // Organization and WebSite JSON-LD are emitted once per route in the
      // prerendered @graph (scripts/prerender.js) so every crawler — including
      // those that don't run JavaScript — sees them. Emitting them again here
      // would create duplicate nodes.
      includeOrganizationData={false}
      includeWebsiteData={false}
    />
  );
};

export default DefaultSEO;