#!/usr/bin/env node

const { loadEnv } = require('./seo/load-env');
loadEnv();

const fs = require('fs');
const path = require('path');

// Configuration for sitemap generation
const { ROUTES } = require('./seo/site-manifest');

// Configuration for sitemap generation.
// Routes come from scripts/seo/site-manifest.js — the same source the
// prerenderer uses — so a new page appears in the sitemap automatically.
const config = {
  // Must match the <link rel="canonical"> host used in the app.
  // Set REACT_APP_SITE_URL (see .env.production) once the domain is chosen.
  baseUrl: (process.env.REACT_APP_SITE_URL || 'https://plastalbotbuilders.com').replace(/\/+$/, ''),
  routes: [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    ...ROUTES.map(r => ({
      path: r.path,
      priority: r.priority || '0.7',
      changefreq: r.changefreq || 'monthly',
    })),
  ],
  outputPath: path.join(__dirname, '../public/sitemap.xml'),
};

// Generate sitemap XML
function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  config.routes.forEach(route => {
    sitemapContent += `  <url>
    <loc>${config.baseUrl}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`;
  });

  sitemapContent += `</urlset>`;

  // Write sitemap to file
  fs.writeFileSync(config.outputPath, sitemapContent, 'utf8');
  console.log(`✅ Sitemap generated successfully at: ${config.outputPath}`);
  console.log(`📊 Generated ${config.routes.length} URLs`);
}

// Generate robots.txt
function generateRobotsTxt() {
  const robotsContent = `User-agent: *
Allow: /

Sitemap: ${config.baseUrl}/sitemap.xml
`;

  const robotsPath = path.join(__dirname, '../public/robots.txt');
  fs.writeFileSync(robotsPath, robotsContent, 'utf8');
  console.log(`✅ Robots.txt generated successfully at: ${robotsPath}`);
}

// Main execution
try {
  generateSitemap();
  generateRobotsTxt();
  console.log('\n🎉 SEO files generated successfully!');
  console.log('📝 Next steps:');
  console.log('1. Update the baseUrl in this script with your actual domain');
  console.log('2. Add more routes as your site grows');
  console.log('3. Run this script whenever you add new pages');
} catch (error) {
  console.error('❌ Error generating SEO files:', error);
  process.exit(1);
}