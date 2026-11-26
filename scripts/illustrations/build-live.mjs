#!/usr/bin/env node
/**
 * Builds "live" illustrations: the site's illustrations with their moving parts grouped, so
 * src/components/ui/LiveIllustration.css can animate them. Colours stay as drawn: each theme gets its own
 * file, built from that theme's original copy (Name1.svg = light, Name.svg = dark).
 *
 *   node scripts/illustrations/build-live.mjs            (every recipe in scripts/illustrations/recipes)
 *   node scripts/illustrations/build-live.mjs Name ...   (only these)
 *
 * A recipe (recipes/<Name>.json):
 *   {
 *     "light": {
 *       "source": "public/resources/Illustrations/Name1.svg",
 *       "replace": { "#0CFFBB": "#D27D2D" },                  // optional: swap a colour everywhere
 *       "recolor": [ { "shape": 0, "fill": "#D27D2D" }, { "from": 3, "to": 5, "fill": "#fff" } ],  // optional fixes
 *       "parts": [ { "name": "arm", "from": 147, "to": 167, "anim": "sway", "origin": [698, 10], "duration": 6,
 *                    "phase": -1.2, "amp": 1.4, "enter": "drop", "delay": 0.2 } ]
 *     },
 *     "dark": { "source": "public/resources/Illustrations/Name.svg", "parts": "same" }   // or its own parts list
 *   }
 * "from"/"to" count shape elements (path, rect, circle, ellipse, line, polygon, polyline) in document order, from 0.
 * A part must cover whole elements and may sit inside another part. "origin" is the pivot in artwork units.
 *
 * Output: public/resources/Illustrations/live/<Name>.svg and <Name>.dark.svg, plus src/theme/liveIllustrations.json
 * (name → aspect ratio), which tells ThemedImage which illustrations have a live version.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..');
const OUT_DIR = join(ROOT, 'public/resources/Illustrations/live');
const MANIFEST = join(ROOT, 'src/theme/liveIllustrations.json');
const SHAPES = new Set(['path', 'rect', 'circle', 'ellipse', 'line', 'polygon', 'polyline']);

/* ---------- a small XML tree: enough for exported SVGs ---------- */
function parse(src) {
  const root = { tag: '#root', attrs: [], children: [] };
  const stack = [root];
  const re = /<!--[\s\S]*?-->|<\?[\s\S]*?\?>|<!DOCTYPE[\s\S]*?>|<!\[CDATA\[[\s\S]*?\]\]>|<\/[^>]+>|<[a-zA-Z][^>]*>|[^<]+/g;
  for (const m of src.matchAll(re)) {
    const tok = m[0];
    const top = stack[stack.length - 1];
    if (tok.startsWith('<!--') || tok.startsWith('<?') || tok.startsWith('<!DOCTYPE')) continue;
    if (tok.startsWith('</')) { stack.pop(); continue; }
    if (tok.startsWith('<') && !tok.startsWith('<![CDATA[')) {
      const tag = tok.match(/^<([a-zA-Z][\w:.-]*)/)[1];
      const attrs = [...tok.matchAll(/([\w:.-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map((a) => [a[1], a[2] ?? a[3]]);
      const node = { tag, attrs, children: [] };
      top.children.push(node);
      if (!tok.endsWith('/>')) stack.push(node);
      continue;
    }
    if (tok.trim()) top.children.push({ text: tok });
  }
  return root;
}

const getA = (n, k) => n.attrs?.find((a) => a[0] === k)?.[1];
const setA = (n, k, v) => {
  const a = n.attrs.find((x) => x[0] === k);
  if (v === null) n.attrs = n.attrs.filter((x) => x[0] !== k);
  else if (a) a[1] = v;
  else n.attrs.push([k, v]);
};

function serialize(n) {
  if (n.text !== undefined) return n.text;
  if (n.tag === '#root') return n.children.map(serialize).join('');
  const attrs = n.attrs.map(([k, v]) => ` ${k}="${v}"`).join('');
  if (!n.children.length) return `<${n.tag}${attrs}/>`;
  return `<${n.tag}${attrs}>${n.children.map(serialize).join('')}</${n.tag}>`;
}

/** Numbers every shape (document order) and records each node's shape range. */
function number(node, counter = { i: 0 }) {
  if (node.text !== undefined) return;
  const start = counter.i;
  if (SHAPES.has(node.tag)) node.shape = counter.i++;
  for (const c of node.children) number(c, counter);
  node.range = counter.i > start ? [start, counter.i - 1] : null;
}

/** Wraps the run of sibling elements that together hold exactly shapes [from, to] in a new <g>. */
function wrap(root, part) {
  const { from, to } = part;
  const visit = (node) => {
    if (!node.children?.length) return false;
    // One child holds the range and more besides: the run is further down.
    const holder = node.children.find((c) => c.range && c.range[0] <= from && c.range[1] >= to && (c.range[0] < from || c.range[1] > to));
    if (holder) return visit(holder);
    const run = node.children.map((c, i) => [c, i]).filter(([c]) => c.range && c.range[0] >= from && c.range[1] <= to);
    if (!run.length) return false;
    const first = run[0][1];
    const last = run[run.length - 1][1];
    const covered = [run[0][0].range[0], run[run.length - 1][0].range[1]];
    if (covered[0] !== from || covered[1] !== to) {
      throw new Error(`part "${part.name}" (${from}-${to}) does not line up with whole elements (got ${covered.join('-')})`);
    }
    // The motion group sits inside an optional entrance group, so both can use transform.
    const inner = { tag: 'g', attrs: [['data-part', part.name]], children: node.children.slice(first, last + 1), range: [from, to] };
    const style = [];
    if (part.anim) setA(inner, 'data-anim', part.anim);
    if (part.origin) style.push(`--o:${part.origin[0]}px ${part.origin[1]}px`);
    if (part.duration) style.push(`--dur:${part.duration}s`);
    if (part.phase !== undefined) style.push(`--ph:${part.phase}s`);
    if (part.amp !== undefined) style.push(`--amp:${part.amp}`);
    if (style.length) setA(inner, 'style', style.join(';'));
    let wrapped = inner;
    if (part.enter) {
      const est = [];
      if (part.origin) est.push(`--o:${part.origin[0]}px ${part.origin[1]}px`);
      if (part.delay !== undefined) est.push(`--delay:${part.delay}s`);
      wrapped = { tag: 'g', attrs: [['data-enter', part.enter]], children: [inner], range: [from, to] };
      if (est.length) setA(wrapped, 'style', est.join(';'));
    }
    node.children.splice(first, last - first + 1, wrapped);
    return true;
  };
  if (!visit(root)) throw new Error(`part "${part.name}" (${from}-${to}) not found`);
}

/**
 * Path data to 2 decimals. Exports often run numbers together ("1.23.5" = 1.23, 0.5; "1.2-.4" = 1.2, -0.4),
 * so when a rounded number no longer starts with "." or "-" and the one before ends in a digit, a space keeps
 * them apart ("1.23.004" must not become "1.230").
 */
const round = (d) => d.replace(/-?\d*\.\d+(?:e-?\d+)?/gi, (n, off, s) => {
  const r = Math.round(parseFloat(n) * 100) / 100;
  const out = String(r === 0 ? 0 : r);
  return off > 0 && /[\d.]/.test(s[off - 1]) && /^\d/.test(out) ? ` ${out}` : out;
});

const hex = (v) => {
  let c = String(v).trim().toLowerCase();
  if (c === 'white') c = '#ffffff';
  if (c === 'black') c = '#000000';
  if (/^#[0-9a-f]{3}$/.test(c)) c = '#' + [...c.slice(1)].map((x) => x + x).join('');
  return c;
};

/** Builds one theme's file; returns its viewBox. */
function buildTheme(name, theme, spec, lightParts) {
  const tree = parse(readFileSync(join(ROOT, spec.source), 'utf8'));
  const svg = tree.children.find((c) => c.tag === 'svg');
  if (!svg) throw new Error(`${spec.source}: no <svg>`);
  number(tree);

  const slug = `${name.replace(/[^A-Za-z0-9]/g, '').toLowerCase()}-${theme}`;
  const replace = Object.fromEntries(Object.entries(spec.replace || {}).map(([a, b]) => [hex(a), b]));
  const shapes = [];
  const walk = (n) => {
    if (n.text !== undefined) return;
    // Ids get a prefix, so illustrations on one page never clash.
    const id = getA(n, 'id');
    if (id) setA(n, 'id', `${slug}-${id}`);
    for (const k of ['clip-path', 'mask', 'fill', 'stroke', 'filter']) {
      const v = getA(n, k);
      if (v && v.includes('url(#')) setA(n, k, v.replace(/url\(#([^)]+)\)/g, (_, x) => `url(#${slug}-${x})`));
    }
    for (const k of ['href', 'xlink:href']) {
      const v = getA(n, k);
      if (v?.startsWith('#')) setA(n, k, `#${slug}-${v.slice(1)}`);
    }
    // Colour swaps, in attributes and inline styles.
    if (Object.keys(replace).length) {
      for (const k of ['fill', 'stroke']) {
        const v = getA(n, k);
        if (v && replace[hex(v)]) setA(n, k, replace[hex(v)]);
      }
      const st = getA(n, 'style');
      if (st) setA(n, 'style', st.replace(/(fill|stroke)\s*:\s*([^;]+)/g, (m, k, v) => (replace[hex(v)] ? `${k}:${replace[hex(v)]}` : m)));
    }
    if (SHAPES.has(n.tag)) {
      shapes[n.shape] = n;
      const d = getA(n, 'd');
      if (d) setA(n, 'd', round(d));
    }
    for (const c of n.children) walk(c);
  };
  walk(svg);

  // Fixes to single shapes or runs of shapes ({ shape } or { from, to }).
  for (const fix of spec.recolor || []) {
    const from = fix.shape ?? fix.from;
    const to = fix.shape ?? fix.to ?? from;
    for (let s = from; s <= to; s++) {
      const n = shapes[s];
      if (!n) throw new Error(`${theme} recolor: no shape ${s}`);
      for (const [k, v] of Object.entries(fix)) if (!['shape', 'from', 'to'].includes(k)) setA(n, k, String(v));
      // An inline style would beat the attribute just set.
      const st = getA(n, 'style');
      if (st) setA(n, 'style', st.split(';').filter((d) => !Object.keys(fix).includes(d.split(':')[0].trim())).join(';') || null);
    }
  }

  // Outer parts first, so inner ones are then found inside them.
  const list = spec.parts === 'same' ? lightParts : spec.parts || [];
  const parts = [...list].sort((a, b) => (a.from - b.from) || (b.to - a.to));
  for (const p of parts) wrap(tree, p);

  // Root: sized by the page, hidden from screen readers (the wrapper carries the label).
  setA(svg, 'width', null);
  setA(svg, 'height', null);
  setA(svg, 'aria-hidden', 'true');
  setA(svg, 'focusable', 'false');
  setA(svg, 'class', 'il-svg');

  const out = serialize(tree).replace(/>\s+</g, '><').trim() + '\n';
  const file = join(OUT_DIR, theme === 'dark' ? `${name}.dark.svg` : `${name}.svg`);
  writeFileSync(file, out);
  console.log(`${name} (${theme}): ${shapes.length} shapes, ${parts.length} parts, ${(out.length / 1024).toFixed(0)} KB → ${file.replace(ROOT + '/', '')}`);
  return getA(svg, 'viewBox');
}

function build(name, manifest) {
  const recipe = JSON.parse(readFileSync(join(HERE, 'recipes', `${name}.json`), 'utf8'));
  mkdirSync(OUT_DIR, { recursive: true });
  const viewBox = buildTheme(name, 'light', recipe.light, null);
  buildTheme(name, 'dark', recipe.dark, recipe.light.parts || []);
  const [, , w, h] = viewBox.split(/[\s,]+/).map(Number);
  manifest[name] = { ratio: `${w} / ${h}` };
}

const all = readdirSync(join(HERE, 'recipes')).filter((f) => f.endsWith('.json')).map((f) => basename(f, '.json'));
const names = process.argv.slice(2).length ? process.argv.slice(2) : all;
const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {};
for (const n of names) build(n, manifest);
// Keep only illustrations that still have a recipe.
const sorted = Object.fromEntries(Object.keys(manifest).filter((n) => all.includes(n)).sort().map((n) => [n, manifest[n]]));
writeFileSync(MANIFEST, JSON.stringify(sorted, null, 2) + '\n');
