# RoboCore search and AI discovery

## Content and build

Edit RoboCore metadata, crawler summaries and FAQ in `scripts/seo/site-manifest.js`. Keep summaries faithful to the visible pages. `npm run build` generates `src/data/robocore-seo.json`, public AI-readable resources and static HTML for all routes. Do not edit generated files by hand. The visible FAQ and client-side metadata use the generated data; JSON-LD is identical in static and browser versions. The crawler-readable body inside `#root` is hidden by a stylesheet rule (not an inline style or the `hidden` attribute, which text extractors drop) so it never flashes before React mounts; a `<noscript>` override shows it to visitors without JavaScript.

Run `node scripts/check-robocore-seo.js` after building. This checks all five routes, canonical links, structured data parity, crawler content, sitemap entries and AI-readable resources. It does not replace browser QA or a live indexing check.

`REACT_APP_SITE_URL` must be the production HTTPS origin. Canonical URLs exclude query strings and fragments. No price, rating or availability offer is invented for the prototype. Sitemap lastmod is intentionally omitted until reliable content-change dates are maintained.

## Deployment and discovery

The existing Cloudflare Workers static-assets configuration serves each prerendered route directly, with no trailing slash. Publish the complete build, including `/llms.txt` and `/robocore/llms-full.txt`. Check production returns route-specific HTML rather than the SPA homepage for each RoboCore URL. Check robots.txt, sitemap.xml, text resources and social images return HTTP 200 with suitable content types. Check CDN bot protections separately: robots.txt permission cannot override a firewall challenge.

After deployment, submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools, inspect all five RoboCore URLs, and request indexing where available. Ownership verification requires the site's accounts; no verification tokens have been fabricated. Validate structured data using Schema.org Validator and Google's Rich Results Test. FAQ markup is not a promise of a Google FAQ rich result.

AI-search crawlers are explicitly allowed; the existing permissive policy for other crawlers is unchanged. This does not require granting new training permissions. `llms.txt` is an optional emerging convention, not an indexing API or ranking requirement. Crawlability cannot guarantee indexing, citations or model knowledge. Monitor Search Console, referral traffic and verified crawler logs after release.

References:
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.openai.com/api/docs/bots
