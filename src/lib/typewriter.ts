/**
 * The "typed" heading effect: a heading types itself out behind a `_` caret, then the caret blinks a few times.
 *
 * Like the decrypt effect it rewrites the heading's text nodes in place, so markup inside the heading (an accent
 * <span>, a link) keeps working. The layout never moves: characters not typed yet are held by no-break spaces,
 * which in the site's monospace font take exactly the room of the letters they stand in for, and real spaces stay
 * spaces so the heading wraps where it will when it is done. Headings in a font that isn't monospace are left alone.
 */

import { OWNED_ATTR } from './decrypt';

/** The heading carries this while it types, and `caret` while the caret blinks afterwards (see App.css). */
export const TYPING_ATTR = 'data-typing';

const NBSP = ' ';
const CARET = '_';

let canvas: HTMLCanvasElement | null = null;
const isMonospace = (el: HTMLElement): boolean => {
  const ctx = (canvas ??= document.createElement('canvas')).getContext('2d');
  if (!ctx) return false;
  ctx.font = getComputedStyle(el).font;
  return Math.abs(ctx.measureText('iiiiii').width - ctx.measureText('MMMMMM').width) < 0.5;
};

const collect = (root: HTMLElement): Text[] => {
  const nodes: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || !node.nodeValue?.trim()) return NodeFilter.FILTER_REJECT;
      if (parent.closest(`svg, [data-no-decrypt], [${OWNED_ATTR}]`)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  for (let n = walker.nextNode(); n; n = walker.nextNode()) nodes.push(n as Text);
  return nodes;
};

/** Only plain single-width characters can be swapped for a no-break space without changing the layout. */
const SAFE = /^[ -ɏ‐-‧ ]*$/;

export interface TypeOptions {
  /** Ms per character (it speeds up for long headings so none takes more than about a second). */
  perChar?: number;
}

/** Type out `el` once. Returns a function that stops early and puts the real text back. */
export function typeElement(el: HTMLElement, { perChar = 38 }: TypeOptions = {}): () => void {
  const nodes = collect(el);
  const originals = nodes.map(n => n.nodeValue as string);
  if (!nodes.length || !originals.every(t => SAFE.test(t)) || !isMonospace(el)) return () => {};

  const total = originals.reduce((sum, t) => sum + t.length, 0);
  const step = Math.min(perChar, 1000 / total);
  const written = originals.slice();
  let raf = 0;
  let caretTimer = 0;
  let done = false;

  const restore = () => {
    nodes.forEach((node, i) => {
      if (node.nodeValue === written[i]) node.nodeValue = originals[i];
    });
  };

  const stop = () => {
    if (done) return;
    done = true;
    cancelAnimationFrame(raf);
    clearTimeout(caretTimer);
    restore();
    el.removeAttribute(TYPING_ATTR);
  };

  const render = (typed: number): boolean => {
    let offset = 0;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (!node.isConnected || node.nodeValue !== written[i]) {
        stop(); // React changed this text: leave its new value alone
        return false;
      }
      const original = originals[i];
      let out = '';
      for (let c = 0; c < original.length; c++) {
        const at = offset + c;
        const ch = original[c];
        if (at < typed || ch === ' ' || ch === '\n') out += ch;
        else if (at === typed) out += CARET;
        else out += NBSP;
      }
      offset += original.length;
      if (out !== written[i]) {
        node.nodeValue = out;
        written[i] = out;
      }
    }
    return true;
  };

  el.setAttribute(TYPING_ATTR, '');
  if (!render(0)) return stop;
  const start = performance.now();

  const tick = (now: number) => {
    const typed = Math.floor((now - start) / step);
    if (typed >= total) {
      restore();
      done = true;
      // Blink the caret after the last letter for a moment (CSS, no layout change), then clear it.
      el.setAttribute(TYPING_ATTR, 'caret');
      caretTimer = window.setTimeout(() => el.removeAttribute(TYPING_ATTR), 1600);
      return;
    }
    if (!render(typed)) return;
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  return () => {
    if (!done) stop();
    else {
      clearTimeout(caretTimer);
      el.removeAttribute(TYPING_ATTR);
    }
  };
}
