import React from 'react';
import MetaTags from './MetaTags';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import siteSeo from '../../data/site-seo.json';
import { OrganizationStructuredData, WebsiteStructuredData } from './StructuredData';
import { SITE_URL } from '../../config/site';

/**
 * Sets the page's head tags (title, description, share preview, canonical, structured data).
 *
 * For a page listed in scripts/seo/site-manifest.js the MANIFEST WINS: the title, description, image and JSON-LD
 * come from src/data/site-seo.json (written from the manifest by scripts/generate-site-seo.js), and the props below
 * are ignored. That keeps the running page the same as the static HTML scripts/prerender.js writes, which matters
 * because Google indexes the page as it runs. To change what a listed page says in search, edit the manifest.
 *
 * The props are used only for pages the manifest doesn't list (support sub-pages, blog and event stories, …).
 */
interface SEOConfigProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  includeOrganizationData?: boolean;
  includeWebsiteData?: boolean;
  /** Ask search engines not to index this page (the "not found" page). Leaves the canonical link out too. */
  noindex?: boolean;
  /**
   * False for the site-wide default (DefaultSEO), which is mounted on every address, real or not: it then gives a
   * canonical link only to pages the manifest lists.
   */
  canonical?: boolean;
}

type RouteSeo = {
  title: string;
  description: string;
  image: string;
  isCard: boolean;
  imageAlt: string;
  robots: string;
  nodes: unknown[];
};

const ROUTES_SEO = siteSeo.routes as unknown as Record<string, RouteSeo | undefined>;

const SEOConfig: React.FC<SEOConfigProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  includeOrganizationData = false,
  includeWebsiteData = false,
  noindex = false,
  canonical = true,
}) => {
const { pathname } = useLocation();
const listed = noindex ? undefined : ROUTES_SEO[pathname.replace(/\/+$/, '') || '/'];
const graph = listed && { '@context': 'https://schema.org', '@graph': [...siteSeo.shared, ...listed.nodes] };
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
        title={listed?.title || title}
        description={listed?.description || description}
        keywords={keywords}
        image={listed?.image || image}
        imageAlt={listed?.imageAlt}
        imageIsCard={listed?.isCard}
        url={url}
        type={type}
        robots={noindex ? 'noindex, follow' : listed?.robots}
        canonical={!noindex && (canonical || !!listed)}
      />
      
      {graph && <Helmet><script type="application/ld+json">{JSON.stringify(graph).replace(/</g, '\\u003c')}</script></Helmet>}
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
