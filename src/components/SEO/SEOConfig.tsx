import React from 'react';
import MetaTags from './MetaTags';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import roboSeo from '../../data/robocore-seo.json';
import { OrganizationStructuredData, WebsiteStructuredData } from './StructuredData';
import { SITE_URL } from '../../config/site';

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
const { pathname } = useLocation();
const robo = roboSeo[pathname.replace(/\/+$/, '') as keyof typeof roboSeo];
const organizationData = {
  name: "Plastal-Bot Builders",
  url: SITE_URL,
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
  url: SITE_URL,
  description: "Robotics education and community programs for all ages",
  publisher: "Plastal-Bot Builders"
};

  return (
    <>
      <MetaTags
        title={robo?.title || title}
        description={robo?.description || description}
        keywords={keywords}
        image={robo?.image || image}
        url={url}
        type={type}
      />
      
      {robo && <Helmet><script type="application/ld+json">{JSON.stringify(robo.graph).replace(/</g, '\\u003c')}</script></Helmet>}
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