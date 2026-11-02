const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const data = require('../src/data/robocore-seo.json');
const build = path.join(__dirname, '../build');
const read = p => fs.readFileSync(path.join(build, p), 'utf8');
for (const [route, seo] of Object.entries(data)) {
  const html = read(`${route.slice(1)}/index.html`);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, `${route}: one canonical`);
  assert(html.includes(`href="${seo.graph['@graph'].find(n => n['@type'] === 'WebPage').url}"`));
  assert(html.includes('id="prerendered-content"'), `${route}: readable without JS`);
  assert(html.includes('max-image-preview:large'));
  const scripts = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)];
  assert.equal(scripts.length, 1, `${route}: one graph`);
  assert.deepEqual(JSON.parse(scripts[0][1]), seo.graph, `${route}: browser and static schema agree`);
  for (const faq of seo.faq) assert(html.includes(faq.q), `${route}: FAQ is in HTML`);
  if (route.endsWith('/ide') || route.endsWith('/download')) {
    assert(seo.graph['@graph'].some(n => n['@type'] === 'SoftwareApplication'));
  }
  assert(read('sitemap.xml').includes(`${route}</loc>`));
  assert(read('llms.txt').includes(route));
}
assert(!read('sitemap.xml').includes('<lastmod>'), 'No fabricated modification dates');
for (const bot of ['OAI-SearchBot', 'PerplexityBot', 'Claude-SearchBot']) {
  assert(read('robots.txt').includes(`User-agent: ${bot}\nAllow: /`));
}
assert(read('robocore/llms-full.txt').includes('prototype'));
console.log('Passed SEO checks for all five RoboCore pages, structured data, sitemap and AI-readable assets.');
