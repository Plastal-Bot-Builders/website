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
  name: "Plastal-Bot Builders",
  url: "https://plastalbotbuilders.com",
  logo: "/resources/Logo/fred.svg",
  description: "Empowering the next generation through robotics education and technology literacy",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+260 975 608103",
    contactType: "customer service"
  }
};

const websiteData = {
  name: "Plastal-Bot Builders",
  url: "https://plastalbotbuilders.com",
  description: "Robotics education and community programs for all ages",
  publisher: "Plastal-Bot Builders"
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