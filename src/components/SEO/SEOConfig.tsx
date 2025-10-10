import React from 'react';
import MetaTags from './MetaTags';
import { OrganizationStructuredData, WebsiteStructuredData } from './StructuredData';

interface SEOConfigProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  includeOrganizationData?: boolean;
  includeWebsiteData?: boolean;
}

const SEOConfig: React.FC<SEOConfigProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  includeOrganizationData = false,
  includeWebsiteData = false
}) => {
  const organizationData = {
    name: "Your Organization Name",
    url: "https://yourwebsite.com",
    logo: "/resources/Logo/logo.png",
    description: "Your organization description",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-XXX-XXX-XXXX",
      contactType: "customer service"
    }
  };

  const websiteData = {
    name: "Your Website Name",
    url: "https://yourwebsite.com",
    description: "Your website description",
    publisher: "Your Organization Name"
  };

  return (
    <>
      <MetaTags
        title={title}
        description={description}
        keywords={keywords}
        image={image}
        url={url}
        type={type}
      />
      
      {includeOrganizationData && (
        <OrganizationStructuredData {...organizationData} />
      )}
      
      {includeWebsiteData && (
        <WebsiteStructuredData {...websiteData} />
      )}
    </>
  );
};

export default SEOConfig;