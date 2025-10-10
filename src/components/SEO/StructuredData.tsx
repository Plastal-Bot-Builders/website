import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'Organization' | 'WebPage' | 'Article' | 'Event' | 'Person' | 'Website' | 'BlogPosting';
  data: Record<string, any>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

// Predefined structured data generators
export const OrganizationStructuredData: React.FC<{
  name: string;
  url: string;
  logo: string;
  description: string;
  contactPoint?: any;
}> = ({ name, url, logo, description, contactPoint }) => (
  <StructuredData
    type="Organization"
    data={{
      name,
      url,
      logo,
      description,
      ...(contactPoint && { contactPoint })
    }}
  />
);

export const ArticleStructuredData: React.FC<{
  headline: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image: string;
  description: string;
}> = ({ headline, author, datePublished, dateModified, image, description }) => (
  <StructuredData
    type="Article"
    data={{
      headline,
      author: {
        '@type': 'Person',
        name: author
      },
      datePublished,
      ...(dateModified && { dateModified }),
      image,
      description
    }}
  />
);

export const WebsiteStructuredData: React.FC<{
  name: string;
  url: string;
  description: string;
  publisher?: string;
}> = ({ name, url, description, publisher }) => (
  <StructuredData
    type="Website"
    data={{
      name,
      url,
      description,
      ...(publisher && { 
        publisher: {
          '@type': 'Organization',
          name: publisher
        }
      })
    }}
  />
);

export default StructuredData;