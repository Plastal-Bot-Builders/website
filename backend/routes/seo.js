import { Router } from 'express';
import Post from '../models/Post.js';

const router = Router();

// Generate sitemap.xml
router.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = 'https://plastalbotbuilders.com';
    
    // Get all published posts
    const posts = await Post.find({ published: true })
      .select('slug updatedAt')
      .sort({ updatedAt: -1 });
    
    // Generate XML content
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Add static pages
    ['', '/home', '/about', '/programs', '/support', '/blogs', '/membershipform'].forEach(path => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${path}</loc>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.8</priority>\n';
      xml += '  </url>\n';
    });
    
    // Add blog posts
    posts.forEach(post => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/blogs/${post.slug}</loc>\n`;
      xml += `    <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>\n`;
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.6</priority>\n';
      xml += '  </url>\n';
    });
    
    xml += '</urlset>';
    
    // Send XML response
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
});

// Serve robots.txt
router.get('/robots.txt', (req, res) => {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://plastalbotbuilders.com/sitemap.xml
`;
  res.type('text/plain');
  res.send(robotsTxt);
});

export default router;