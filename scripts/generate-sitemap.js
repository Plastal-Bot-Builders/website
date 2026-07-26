#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration for sitemap generation
const config = {
  // Must match the <link rel="canonical"> host used in the app.
  baseUrl: 'https://plastalbotbuilders.com',
  routes: [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/home', priority: '1.0', changefreq: 'daily' },
    { path: '/about', priority: '0.8', changefreq: 'weekly' },
    { path: '/news', priority: '0.9', changefreq: 'weekly' },
    { path: '/journey-to-geneva', priority: '0.9', changefreq: 'monthly' },
    { path: '/membershipform', priority: '0.9', changefreq: 'monthly' },
    { path: '/blogs', priority: '0.8', changefreq: 'weekly' },
    { path: '/projects', priority: '0.8', changefreq: 'monthly' },
    { path: '/projects/gypul', priority: '0.6', changefreq: 'monthly' },
    { path: '/projects/enviro-monitor', priority: '0.6', changefreq: 'monthly' },
    { path: '/events', priority: '0.8', changefreq: 'weekly' },
    { path: '/support', priority: '0.6', changefreq: 'monthly' },
    { path: '/support/donations', priority: '0.6', changefreq: 'monthly' },
    { path: '/support/sponsorships', priority: '0.6', changefreq: 'monthly' },
    { path: '/programs', priority: '0.7', changefreq: 'monthly' },
    { path: '/team/technicbots', priority: '0.5', changefreq: 'monthly' }
  ],
  outputPath: path.join(__dirname, '../public/sitemap.xml')
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