import { useEffect } from 'react';
import { asset } from '../../utils/asset';

/*
 * RoboCore's own browser icon and browser-bar colour. The icon is the Geared Ring app icon, the same files as the
 * RoboCore IDE's web app (robocore-ide web/favicon.svg, favicon.png, icons/apple-touch-icon.png): the SVG shows a
 * yellow plate in a light browser and a navy one in a dark browser by itself; the 32 px PNG is for browsers without
 * SVG icons. The bar colour is the RoboCore page colour, cream or navy.
 *
 * scripts/prerender.js writes the same tags into every /robocore page. The hook puts them in when a visitor comes
 * from the Plastal-Bot site, and gives the site its own back when they leave. The site's tags are switched off
 * rather than removed (rel / name move to data-site-rel / data-site-name), so browsers skip them.
 */
const TAGS: Array<[string, Record<string, string>]> = [
  ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'resources/RoboCore/icons/robocore-icon-32.png' }],
  ['link', { rel: 'icon', type: 'image/svg+xml', href: 'resources/RoboCore/icons/robocore-icon.svg' }],
  ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: 'resources/RoboCore/icons/robocore-apple-touch-icon.png' }],
  ['meta', { name: 'theme-color', content: '#F7F1E3', media: '(prefers-color-scheme: light)' }],
  ['meta', { name: 'theme-color', content: '#0F1828', media: '(prefers-color-scheme: dark)' }],
];

const SITE_TAGS = 'link[rel="icon"], link[rel="apple-touch-icon"], meta[name="theme-color"]';

export function useRoboCoreBrowserIcon(): void {
  useEffect(() => {
    const head = document.head;
    head.querySelectorAll<HTMLElement>(SITE_TAGS).forEach((el) => {
      if (el.hasAttribute('data-robocore')) return;
      if (el.tagName === 'LINK') {
        el.dataset.siteRel = el.getAttribute('rel') || '';
        el.removeAttribute('rel');
      } else {
        el.dataset.siteName = el.getAttribute('name') || '';
        el.removeAttribute('name');
      }
    });
    if (!head.querySelector('[data-robocore]')) {
      for (const [tag, attrs] of TAGS) {
        const el = document.createElement(tag);
        for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, k === 'href' ? asset(v) : v);
        el.setAttribute('data-robocore', '');
        head.appendChild(el);
      }
    }
    return () => {
      head.querySelectorAll('[data-robocore]').forEach((el) => el.remove());
      head.querySelectorAll<HTMLElement>('[data-site-rel]').forEach((el) => {
        el.setAttribute('rel', el.dataset.siteRel || '');
        delete el.dataset.siteRel;
      });
      head.querySelectorAll<HTMLElement>('[data-site-name]').forEach((el) => {
        el.setAttribute('name', el.dataset.siteName || '');
        delete el.dataset.siteName;
      });
    };
  }, []);
}
