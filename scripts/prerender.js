#!/usr/bin/env node
/**
 * Post-build prerenderer.
 *
 * WHY THIS EXISTS
 * ---------------
 * This is a Create React App SPA: the built index.html contains an empty
 * <div id="root"> and 46 characters of text ("You need to enable JavaScript").
 * Google renders JavaScript, but the AI crawlers that increasingly drive
 * discovery — GPTBot (ChatGPT), ClaudeBot, PerplexityBot, Bingbot for Copilot
 * grounding, Google-Extended — largely do NOT. Any <title>, meta tag or JSON-LD
 * injected client-side by react-helmet is therefore invisible to them.
 *
 * This script writes a real static HTML file per route containing:
 *   - a unique <title>, meta description, canonical and robots directive
 *   - Open Graph + Twitter card tags
 *   - a JSON-LD @graph (Organization, WebSite+SearchAction, BreadcrumbList and
 *     page-specific types such as Article, Event, Course, FAQPage, VideoObject)
 *   - real, readable body content inside #root so a non-JS client sees the page
 *
 * React replaces the fallback content when it mounts, so users see no change —
 * but the static markup also means something meaningful paints before the
 * bundle arrives.
 *
 * Run automatically via `postbuild`. Add routes in scripts/seo/site-manifest.js.
 */

const { loadEnv } = require('./seo/load-env');
loadEnv();

const fs = require('fs');
const path = require('path');
const { ORG, UNVERIFIED, ROUTES, DEFAULT_IMAGE } = require('./seo/site-manifest');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const SITE_URL = (process.env.REACT_APP_SITE_URL || '').replace(/\/+$/, '');

/** Escape for use in HTML text/attribute positions. */
const esc = s =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Absolute URL when the site origin is known, otherwise root-relative. */
const abs = p => (SITE_URL ? `${SITE_URL}${p}` : p);

// ── JSON-LD builders ────────────────────────────────────────────────────────

function organizationNode() {
  const node = {
    '@type': ['Organization', 'EducationalOrganization'],
    '@id': abs('/#organization'),
    name: ORG.name,
    legalName: ORG.legalName,
    description: ORG.description,
    url: abs('/'),
    logo: { '@type': 'ImageObject', url: abs(ORG.logo) },
    email: ORG.email,
    telephone: ORG.telephone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: ORG.city,
      addressCountry: ORG.country,
    },
    areaServed: { '@type': 'Country', name: ORG.countryName },
    knowsAbout: [
      'Robotics education',
      'STEM education',
      'Embedded systems',
      'Arduino',
      'LEGO Spike Prime',
      'Youth innovation',
    ],
    sameAs: ORG.sameAs,
  };
  // Only published once confirmed — see UNVERIFIED in the manifest.
  if (UNVERIFIED.publish && UNVERIFIED.foundingDate) {
    node.foundingDate = UNVERIFIED.foundingDate;
  }
  return node;
}

function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': abs('/#website'),
    name: ORG.name,
    description: ORG.description,
    url: abs('/'),
    publisher: { '@id': abs('/#organization') },
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: abs('/news?q={search_term_string}') },
      'query-input': 'required name=search_term_string',
    },
  };
}

function breadcrumbNode(route) {
  const crumbs = [{ name: 'Home', path: '/home' }, ...(route.breadcrumb || [])];
  return {
    '@type': 'BreadcrumbList',
    '@id': abs(`${route.path}#breadcrumbs`),
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

function pageNodes(route) {
  const nodes = [];
  const image = route.image || DEFAULT_IMAGE;
  const has = t => (route.schema || []).includes(t);

  nodes.push({
    '@type': has('CollectionPage') ? 'CollectionPage' : 'WebPage',
    '@id': abs(`${route.path}#webpage`),
    url: abs(route.path),
    name: route.title,
    description: route.description,
    isPartOf: { '@id': abs('/#website') },
    about: { '@id': abs('/#organization') },
    primaryImageOfPage: { '@type': 'ImageObject', url: abs(image) },
    breadcrumb: { '@id': abs(`${route.path}#breadcrumbs`) },
    inLanguage: 'en',
  });

  if (has('Article') && route.article) {
    nodes.push({
      '@type': 'Article',
      '@id': abs(`${route.path}#article`),
      headline: route.article.headline,
      description: route.description,
      image: abs(image),
      datePublished: route.article.datePublished,
      dateModified: route.article.dateModified || route.article.datePublished,
      articleSection: route.article.section,
      author: { '@id': abs('/#organization') },
      publisher: { '@id': abs('/#organization') },
      mainEntityOfPage: { '@id': abs(`${route.path}#webpage`) },
      inLanguage: 'en',
    });
  }

  if (has('Event') && route.event) {
    nodes.push({
      '@type': 'Event',
      '@id': abs(`${route.path}#event`),
      name: route.event.name,
      description: route.event.description,
      startDate: route.event.startDate,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: route.event.location.name,
        address: {
          '@type': 'PostalAddress',
          addressLocality: route.event.location.city,
          addressCountry: route.event.location.country,
        },
      },
      performer: { '@id': abs('/#organization') },
      image: abs(image),
    });
  }

  if (has('Video') && route.video) {
    nodes.push({
      '@type': 'VideoObject',
      '@id': abs(`${route.path}#video`),
      name: route.video.name,
      description: route.video.description,
      contentUrl: abs(route.video.contentUrl),
      thumbnailUrl: abs(route.video.thumbnailUrl),
      uploadDate: route.video.uploadDate,
      publisher: { '@id': abs('/#organization') },
    });
  }

  if (has('Course')) {
    nodes.push({
      '@type': 'Course',
      '@id': abs(`${route.path}#course`),
      name: 'Robotics and programming programmes',
      description: route.description,
      provider: { '@id': abs('/#organization') },
      inLanguage: 'en',
    });
  }

  if (has('CreativeWork')) {
    nodes.push({
      '@type': 'CreativeWork',
      '@id': abs(`${route.path}#project`),
      name: route.body.h1,
      description: route.description,
      creator: { '@id': abs('/#organization') },
      image: abs(image),
    });
  }

  if (route.faq && route.faq.length) {
    nodes.push({
      '@type': 'FAQPage',
      '@id': abs(`${route.path}#faq`),
      mainEntity: route.faq.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  return nodes;
}

function jsonLd(route) {
  const graph = [
    organizationNode(),
    websiteNode(),
    breadcrumbNode(route),
    ...pageNodes(route),
  ];
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

// ── HTML builders ───────────────────────────────────────────────────────────

function headTags(route) {
  const image = abs(route.image || DEFAULT_IMAGE);
  const url = abs(route.path);
  const robots = route.robots || 'index, follow, max-image-preview:large, max-snippet:-1';
  return [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}"/>`,
    `<meta name="robots" content="${esc(robots)}"/>`,
    `<link rel="canonical" href="${esc(url)}"/>`,
    `<meta property="og:type" content="website"/>`,
    `<meta property="og:site_name" content="${esc(ORG.name)}"/>`,
    `<meta property="og:title" content="${esc(route.title)}"/>`,
    `<meta property="og:description" content="${esc(route.description)}"/>`,
    `<meta property="og:url" content="${esc(url)}"/>`,
    `<meta property="og:image" content="${esc(image)}"/>`,
    `<meta property="og:locale" content="en_ZM"/>`,
    `<meta name="twitter:card" content="summary_large_image"/>`,
    `<meta name="twitter:title" content="${esc(route.title)}"/>`,
    `<meta name="twitter:description" content="${esc(route.description)}"/>`,
    `<meta name="twitter:image" content="${esc(image)}"/>`,
    `<script type="application/ld+json">${jsonLd(route)}</script>`,
  ].join('\n    ');
}

/** Readable content served to clients that don't execute JavaScript. */
function fallbackBody(route) {
  const b = route.body || {};
  const crumbs = [{ name: 'Home', path: '/home' }, ...(route.breadcrumb || [])];
  const parts = [];

  parts.push(
    `<nav aria-label="Breadcrumb"><ol>` +
      crumbs.map(c => `<li><a href="${c.path}">${esc(c.name)}</a></li>`).join('') +
      `</ol></nav>`
  );

  parts.push('<main>');
  if (b.h1) parts.push(`<h1>${esc(b.h1)}</h1>`);
  if (b.summary) parts.push(`<p>${esc(b.summary)}</p>`);

  for (const s of b.sections || []) {
    parts.push('<section>');
    if (s.h2) parts.push(`<h2>${esc(s.h2)}</h2>`);
    if (s.p) parts.push(`<p>${esc(s.p)}</p>`);
    if (s.list) parts.push('<ul>' + s.list.map(i => `<li>${esc(i)}</li>`).join('') + '</ul>');
    parts.push('</section>');
  }

  if (route.faq && route.faq.length) {
    parts.push('<section><h2>Frequently asked questions</h2>');
    for (const f of route.faq) {
      parts.push(`<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`);
    }
    parts.push('</section>');
  }
  parts.push('</main>');

  // Internal linking: every page reachable from every page for crawlers.
  parts.push(
    `<nav aria-label="Site"><ul>` +
      ROUTES.filter(r => r.path !== route.path)
        .map(r => `<li><a href="${r.path}">${esc(r.title.split('—')[0].trim())}</a></li>`)
        .join('') +
      `</ul></nav>`
  );

  parts.push(
    `<address>${esc(ORG.name)}, ${esc(ORG.city)}, ${esc(ORG.countryName)} — ` +
      `<a href="mailto:${ORG.email}">${esc(ORG.email)}</a></address>`
  );

  return `<div id="prerendered-content">${parts.join('')}</div>`;
}

// ── Main ────────────────────────────────────────────────────────────────────

function main() {
  const shellPath = path.join(BUILD_DIR, 'index.html');
  if (!fs.existsSync(shellPath)) {
    console.error('✖ build/index.html not found — run `npm run build` first.');
    process.exit(1);
  }
  const shell = fs.readFileSync(shellPath, 'utf8');

  if (!SITE_URL) {
    console.warn(
      '⚠ REACT_APP_SITE_URL is not set — canonical/OG URLs will be root-relative.\n' +
        '  Set it in .env.production once the domain is chosen for absolute URLs.'
    );
  }

  let count = 0;
  for (const route of ROUTES) {
    let html = shell;

    // Replace the generic title/description from the shell with per-route tags
    html = html.replace(/<title>.*?<\/title>/s, '');
    html = html.replace(/<meta\s+name="description"[^>]*\/?>/gi, '');
    html = html.replace('</head>', `  ${headTags(route)}\n</head>`);

    // Give non-JS clients real content; React clears this when it mounts.
    html = html.replace('<div id="root"></div>', `<div id="root">${fallbackBody(route)}</div>`);

    const outDir = path.join(BUILD_DIR, route.path.replace(/^\//, ''));
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
    count++;
  }

  // The SPA fallback (_redirects) serves build/index.html for unknown paths;
  // give it the homepage's metadata rather than the generic shell.
  const home = ROUTES.find(r => r.path === '/home');
  if (home) {
    let html = shell;
    html = html.replace(/<title>.*?<\/title>/s, '');
    html = html.replace(/<meta\s+name="description"[^>]*\/?>/gi, '');
    html = html.replace('</head>', `  ${headTags(home)}\n</head>`);
    html = html.replace('<div id="root"></div>', `<div id="root">${fallbackBody(home)}</div>`);
    fs.writeFileSync(shellPath, html, 'utf8');
  }

  console.log(`✅ Prerendered ${count} routes with metadata, JSON-LD and crawlable content`);
}

main();
