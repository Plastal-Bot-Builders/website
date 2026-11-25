import { RefObject, useEffect } from 'react';
import { decryptDisabled, decryptElement, OWNED_ATTR } from './decrypt';
import { typeElement } from './typewriter';

/**
 * The site's page-wide scroll motion. Each element runs once, the first time it scrolls into view:
 *
 *  - body text (p, li, blockquote, figcaption, dd) decrypts      → src/lib/decrypt.ts
 *  - section headings (h1, h2) type out behind a caret          → src/lib/typewriter.ts
 *  - the items of a grid rise in one after another (stagger)     → [data-reveal] rules in App.css
 *
 * Elements added later (a new route, a lazily loaded section, posts fetched from the API) are picked up too.
 * Nothing runs for visitors who prefer reduced motion, nor for crawlers. Opt an element out with data-no-decrypt.
 */

const TEXT = 'p, li, blockquote, figcaption, dd';
const HEADINGS = 'h1, h2';
const GRIDS = '.grid';

/** Nothing inside these moves: site chrome, forms, dialogs, and anything opted out. */
const EXCLUDED = `header, nav, footer, form, button, [role="dialog"], [contenteditable], [data-no-decrypt], [${OWNED_ATTR}]`;

/** FadeContent's wrapper. */
const FADED = '[data-motion="fade"]';

type Kind = 'text' | 'heading' | 'grid';

const STAGGER_MS = 80;
const MAX_STAGGER_MS = 560;

export function useSiteMotion(rootRef: RefObject<HTMLElement>, enabled: boolean, resetKey?: unknown) {
  useEffect(() => {
    const root = rootRef.current;
    if (!enabled || !root || decryptDisabled() || typeof IntersectionObserver === 'undefined') return;

    const kinds = new WeakMap<Element, Kind>();
    const stops = new Set<() => void>();
    const timers = new Set<number>();
    const pendingGrids = new Set<HTMLElement>();

    const revealGrid = (grid: HTMLElement) => {
      pendingGrids.delete(grid);
      grid.setAttribute('data-reveal', 'in');
      // Clear the hold-back attributes once the last item has landed, so hover transforms etc. work as before.
      const t = window.setTimeout(() => {
        grid.removeAttribute('data-reveal');
        Array.from(grid.children).forEach(c => (c as HTMLElement).style.removeProperty('--reveal-delay'));
      }, MAX_STAGGER_MS + 900);
      timers.add(t);
    };

    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          const kind = kinds.get(el);
          if (kind === 'text') stops.add(decryptElement(el));
          else if (kind === 'heading') stops.add(typeElement(el));
          else if (kind === 'grid') revealGrid(el);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    );

    const viewportBottom = () => window.innerHeight * 0.92;

    const track = (el: HTMLElement, kind: Kind) => {
      if (kinds.has(el)) return;
      // A grid whose items haven't arrived yet (fetched posts) is looked at again on a later scan.
      if (kind === 'grid' && el.children.length < 2) return;
      kinds.set(el, kind);
      if (el.closest(EXCLUDED)) return;

      if (kind === 'grid') {
        // Items that FadeContent already fades one by one are left to it. (A grid inside a section-wide FadeContent
        // still staggers: the section fades in as a whole, then its items rise in turn.)
        if (el.querySelector(FADED)) return;
        if (el.parentElement?.closest(GRIDS)) return; // the outer grid's stagger covers a nested one
        // Only hold back a grid that is still below the fold: one already on screen never blinks out.
        if (el.getBoundingClientRect().top < viewportBottom()) return;
        Array.from(el.children).forEach((child, i) => {
          (child as HTMLElement).style.setProperty('--reveal-delay', `${Math.min(i * STAGGER_MS, MAX_STAGGER_MS)}ms`);
        });
        el.setAttribute('data-reveal', 'hold');
        pendingGrids.add(el);
      } else if (kind === 'text') {
        const outer = el.parentElement?.closest(TEXT); // a <p> inside an <li> is covered by the <li>
        if (outer && root.contains(outer)) return;
      }
      io.observe(el);
    };

    const scan = () => {
      root.querySelectorAll<HTMLElement>(GRIDS).forEach(el => track(el, 'grid'));
      root.querySelectorAll<HTMLElement>(HEADINGS).forEach(el => track(el, 'heading'));
      root.querySelectorAll<HTMLElement>(TEXT).forEach(el => track(el, 'text'));
    };

    let pending = 0;
    const mo = new MutationObserver(() => {
      if (!pending) pending = requestAnimationFrame(() => { pending = 0; scan(); });
    });
    mo.observe(root, { childList: true, subtree: true });
    scan();

    return () => {
      mo.disconnect();
      io.disconnect();
      cancelAnimationFrame(pending);
      stops.forEach(stop => stop());
      timers.forEach(t => clearTimeout(t));
      // Never leave a grid hidden behind: anything still held back shows at once.
      pendingGrids.forEach(grid => grid.removeAttribute('data-reveal'));
    };
  }, [rootRef, enabled, resetKey]);
}
