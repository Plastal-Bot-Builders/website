// src/components/SEO/DefaultSEO.tsx
import React from 'react';
import { SEOConfig } from './index';

const DefaultSEO: React.FC = () => {
  return (
    <SEOConfig
      title="Plastal-Bot Builders | Robotics Education"
      description="Plastal-Bot Builders provides robotics education and community programs for all ages. Learn coding, engineering, and problem-solving through hands-on building."
      keywords="robotics, education, coding, STEM, robot building"
      includeOrganizationData={true}
      includeWebsiteData={true}
    />
  );
};

export default DefaultSEO;