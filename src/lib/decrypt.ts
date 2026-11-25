/**
 * The "decrypt" text effect: a block of text starts as scrambled glyphs and resolves left to right.
 *
 * It works on the element's text nodes in place (no span per character), so it costs the same for a long paragraph
 * as for a short one, and links, bold text and other markup inside the block keep working.
 *
 * Two things keep it from looking like a glitch:
 *  - Only letters and digits are scrambled, each into a glyph of the same case and a similar width. Spaces and
 *    punctuation stay put, so words keep their shape and lines wrap where they will when the text settles.
 *  - The reveal sweeps from the start with an ease-out, so the text is readable from the left while the tail is still
 *    resolving, instead of the whole block flickering and snapping at the end.
 */

const NARROW_LOWER = 'iljtfr';
const NARROW_UPPER = 'IJ';
const WIDE_LOWER = 'mw';
const WIDE_UPPER = 'MW';
const LOWER = 'abcdeghknopqsuvxyz';
const UPPER = 'ABCDEFGHKLNOPRSTUVXYZ';
const DIGITS = '0123456789';

const pick = (set: string) => set[(Math.random() * set.length) | 0];

/** A random glyph that takes about the same room as `ch`, or `ch` itself when it isn't a letter or digit. */
const scrambleChar = (ch: string): string => {
  if (ch >= '0' && ch <= '9') return pick(DIGITS);
  if (ch >= 'a' && ch <= 'z') {
    if (NARROW_LOWER.includes(ch)) return pick(NARROW_LOWER);
    if (WIDE_LOWER.includes(ch)) return pick(WIDE_LOWER);
    return pick(LOWER);
  }
  if (ch >= 'A' && ch <= 'Z') {
    if (NARROW_UPPER.includes(ch)) return pick(NARROW_UPPER);
    if (WIDE_UPPER.includes(ch)) return pick(WIDE_UPPER);
    return pick(UPPER);
  }
  return ch;
};

/** Text inside these is never scrambled. */
const SKIP_TEXT_IN = 'script, style, code, pre, kbd, samp, textarea, option, svg, [data-no-decrypt]';

/** The element is marked with this while it decrypts (CSS can style it). */
export const DECRYPTING_ATTR = 'data-decrypting';

/** Elements that run their own effect (DecryptedText) carry this, so the page-wide effect leaves them alone. */
export const OWNED_ATTR = 'data-decrypt';

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Crawlers and headless browsers render the page and read its text: they must never catch it scrambled.
 */
export const isAutomatedBrowser = (): boolean =>
  typeof navigator !== 'undefined' &&
  (navigator.webdriver || /bot|crawl|spider|slurp|headless|lighthouse|prerender/i.test(navigator.userAgent));

export const decryptDisabled = (): boolean => prefersReducedMotion() || isAutomatedBrowser();

const collectTextNodes = (root: HTMLElement, skipOwned: boolean): Text[] => {
  const nodes: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || !node.nodeValue || !/[A-Za-z0-9]/.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
      if (parent.closest(SKIP_TEXT_IN)) return NodeFilter.FILTER_REJECT;
      if (skipOwned && parent.closest(`[${OWNED_ATTR}]`)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  for (let n = walker.nextNode(); n; n = walker.nextNode()) nodes.push(n as Text);
  return nodes;
};

export interface DecryptOptions {
  /** Total time in ms. Defaults to a length-based time between 700 and 1500 ms. */
  duration?: number;
  /** How many characters ahead of the settled text still flicker; the rest of the tail holds its scrambled glyph. */
  band?: number;
  /** False when the element is a DecryptedText running its own effect on itself. */
  skipOwned?: boolean;
}

const FRAME_MS = 50; // re-roll the flickering glyphs about 20 times a second, not every frame

/**
 * Run the effect once on `el`. Returns a function that stops it early and puts the real text back.
 *
 * If something else changes one of the text nodes mid-run (React re-rendering with new text), that node is left with
 * its new value and the run ends: the effect never writes stale text back over React's.
 */
export function decryptElement(el: HTMLElement, { duration, band = 14, skipOwned = true }: DecryptOptions = {}): () => void {
  const nodes = collectTextNodes(el, skipOwned);
  if (!nodes.length) return () => {};

  const originals = nodes.map(n => n.nodeValue as string);
  const offsets: number[] = [];
  let total = 0;
  for (const text of originals) {
    offsets.push(total);
    total += text.length;
  }
  const time = duration ?? Math.min(1500, Math.max(700, 450 + total * 2.5));

  // A fixed scrambled copy: the tail holds these glyphs, only the band right before the reveal point keeps rolling.
  const held = originals.map(text => Array.from(text, scrambleChar));
  const written = originals.slice();

  // Lock the current height so a line that briefly wraps differently can't nudge the page.
  const prevMinHeight = el.style.minHeight;
  el.style.minHeight = `${el.getBoundingClientRect().height}px`;
  el.setAttribute(DECRYPTING_ATTR, '');

  let raf = 0;
  let lastFrame = -Infinity;
  let done = false;
  const start = performance.now();

  const finish = (restore: boolean) => {
    if (done) return;
    done = true;
    cancelAnimationFrame(raf);
    if (restore) {
      nodes.forEach((node, i) => {
        if (node.nodeValue === written[i]) node.nodeValue = originals[i];
      });
    }
    el.style.minHeight = prevMinHeight;
    el.removeAttribute(DECRYPTING_ATTR);
  };

  const render = (revealed: number) => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (!node.isConnected || node.nodeValue !== written[i]) {
        finish(true); // someone else owns this text now
        return false;
      }
      const original = originals[i];
      const base = offsets[i];
      let out = '';
      for (let c = 0; c < original.length; c++) {
        const at = base + c;
        if (at < revealed) out += original[c];
        else if (at < revealed + band) out += scrambleChar(original[c]);
        else out += held[i][c];
      }
      if (out !== written[i]) {
        node.nodeValue = out;
        written[i] = out;
      }
    }
    return true;
  };

  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / time);
    if (t >= 1) {
      finish(true);
      return;
    }
    if (now - lastFrame >= FRAME_MS) {
      lastFrame = now;
      const eased = 1 - (1 - t) * (1 - t); // gentle ease-out: an even sweep that settles softly
      if (!render(Math.floor(eased * (total + band)) - band)) return;
    }
    raf = requestAnimationFrame(tick);
  };

  render(-band);
  raf = requestAnimationFrame(tick);
  return () => finish(true);
}
