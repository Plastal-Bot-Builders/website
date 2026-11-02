const fs = require('fs');
const path = require('path');
require('./seo/load-env').loadEnv();
const { ROUTES } = require('./seo/site-manifest');
const { jsonLd } = require('./prerender');
const origin = (process.env.REACT_APP_SITE_URL || '').replace(/\/+$/, '');
if (!/^https:\/\//.test(origin)) throw new Error('Set REACT_APP_SITE_URL to the public HTTPS origin before generating SEO resources.');
const routes = ROUTES.filter(r => r.path === '/robocore' || r.path.startsWith('/robocore/'));
const data = Object.fromEntries(routes.map(r => [r.path, {
  title: r.title, description: r.description, image: r.image,
  graph: JSON.parse(jsonLd(r)), faq: r.faq || [],
}]));
fs.mkdirSync(path.join(__dirname, '../src/data'), { recursive: true });
fs.writeFileSync(path.join(__dirname, '../src/data/robocore-seo.json'), JSON.stringify(data, null, 2) + '\n');
const index = '# Plastal-Bot Builders — RoboCore\n\n> RoboCore is a robot kit and coding app for young makers, made in Zambia. V2 is a prototype; school and innovation-hub pilots come next.\n\n## RoboCore pages\n\n' + routes.map(r => `- [${r.body.h1}](${origin}${r.path}): ${r.description}`).join('\n') + `\n\n## Optional\n\n- [RoboCore text reference](${origin}/robocore/llms-full.txt): Plain-text summaries of the public pages.\n`;
fs.writeFileSync(path.join(__dirname, '../public/llms.txt'), index);
const directory = path.join(__dirname, '../public/robocore');
fs.mkdirSync(directory, { recursive: true });
fs.writeFileSync(path.join(directory, 'llms-full.txt'), routes.map(r => [
  `# ${r.body.h1}`, `Source: ${origin}${r.path}`, r.body.summary,
  ...r.body.sections.flatMap(s => [`## ${s.h2}`, s.p || '', ...(s.list || []).map(i => `- ${i}`)]),
  ...(r.faq || []).flatMap(f => [`## ${f.q}`, f.a]),
].join('\n\n')).join('\n\n---\n\n') + '\n');
console.log('Generated RoboCore SEO data, llms.txt and plain-text reference.');
