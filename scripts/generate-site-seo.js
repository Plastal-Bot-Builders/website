#!/usr/bin/env node
/**
 * Writes src/data/site-seo.json: every manifest route's title, description, share image and JSON-LD nodes, for the
 * running app (src/components/SEO/SEOConfig.tsx).
 *
 * WHY: scripts/prerender.js puts the manifest's tags in the static HTML, but when React mounts, react-helmet takes
 * over the head and writes whatever the page component passes. Google indexes the page as it runs, so a page whose
 * component said "Home | Plastal-Bot Builders" was indexed under that, not under the manifest's title. With this
 * file the app sets the manifest's values itself, and the static and the running page agree.
 *
 * Runs in `prebuild`. The file is committed so `npm start` works without a build; re-run this script (or build)
 * after editing scripts/seo/site-manifest.js.
 */
const fs = require('fs');
const path = require('path');
require('./seo/load-env').loadEnv();
const { ROUTES } = require('./seo/site-manifest');
const { routeMeta, sharedNodes, routeNodes } = require('./prerender');

const origin = (process.env.REACT_APP_SITE_URL || '').replace(/\/+$/, '');
if (!/^https:\/\//.test(origin)) {
  throw new Error('Set REACT_APP_SITE_URL to the public HTTPS origin before generating SEO resources.');
}

const data = {
  // Organization + WebSite: the same on every page, so stored once.
  shared: sharedNodes(),
  routes: Object.fromEntries(ROUTES.map(route => {
    const { title, description, image, isCard, imageAlt, robots } = routeMeta(route);
    return [route.path, { title, description, image, isCard, imageAlt, robots, nodes: routeNodes(route) }];
  })),
};

const out = path.join(__dirname, '../src/data/site-seo.json');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(data, null, 2) + '\n');
console.log(`Generated SEO data for the app: ${ROUTES.length} routes.`);
