import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import './Workbench.css';

/**
 * The Plastal-Bot site's background: an engineer's workbench. A measured grid (a bolder line every fifth), rulers
 * along the left and bottom edges, and a crosshair that reads the pointer's position and fades when it rests.
 * It draws only when something changes (pointer, size, theme), so it costs nothing while the page is still.
 *
 * It also switches on the workbench details in Workbench.css for the pages it sits behind: sheet numbers and a
 * ruler line on section headings, the measured size on cards, a meter that fills under each counted number
 * when it is seen, and the glint that follows the pointer across glass plates.
 * Our own drawing, in the spirit of technical grids and instrument screens; no third-party artwork.
 */

const MINOR = 20; // px between grid lines
const MAJOR = 5; // every 5th line is bolder
const REST_MS = 1800; // the crosshair starts to fade this long after the pointer stops
const FADE_MS = 700;
const MONO = '11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

const pad4 = (n: number) => ('0000' + Math.max(0, Math.round(n))).slice(-4);

const WorkbenchGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  // ---- the canvas: grid, rulers, crosshair
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext('2d') : null;
    if (!canvas || !ctx) return;
    const dark = resolvedTheme === 'dark';
    const ink = (a: number) => (dark ? `rgba(255, 255, 255, ${a})` : `rgba(17, 24, 39, ${a})`);
    // The accent colour is read when a frame is drawn, not here. A theme switch changes <html>'s class in an effect
    // that runs after this one, so reading it now returns the colour of the theme being left: the crosshair stayed
    // mint after switching to light. It is read again whenever that class changes.
    const root = document.documentElement;
    let accent = '';
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: -1, y: -1, at: 0 };
    let request = 0;
    let timer = 0;

    const line = (x1: number, y1: number, x2: number, y2: number, style: string, width = 1) => {
      ctx.strokeStyle = style;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };
    const schedule = () => {
      if (!request) request = window.requestAnimationFrame(draw);
    };
    const themed = new MutationObserver(() => {
      accent = '';
      schedule();
    });
    themed.observe(root, { attributes: true, attributeFilter: ['class'] });

    function draw() {
      request = 0;
      if (!canvas || !ctx) return;
      if (!accent) accent = getComputedStyle(root).getPropertyValue('--accent').trim() || (dark ? '#0CFFBB' : '#D27D2D');
      // Sharp on phones and laptops, but never more than about six million pixels to clear and redraw: a large
      // high-density monitor would otherwise repaint a 14-megapixel canvas on every pointer move.
      const ratio = Math.max(1, Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(6e6 / Math.max(1, canvas.clientWidth * canvas.clientHeight))));
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * ratio) || canvas.height !== Math.round(h * ratio)) {
        canvas.width = Math.round(w * ratio);
        canvas.height = Math.round(h * ratio);
      }
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // How visible the crosshair is: full while the pointer moves, fading once it rests.
      const rested = performance.now() - pointer.at;
      const fading = Math.min(1, Math.max(0, 1 - (rested - REST_MS) / FADE_MS));
      const live = pointer.x < 0 ? 0 : still ? (rested < REST_MS ? 1 : 0) : fading;

      // The grid cell under the pointer.
      if (live > 0) {
        ctx.globalAlpha = 0.14 * live;
        ctx.fillStyle = accent;
        ctx.fillRect(Math.floor(pointer.x / MINOR) * MINOR, Math.floor(pointer.y / MINOR) * MINOR, MINOR, MINOR);
        ctx.globalAlpha = 1;
      }

      // Measured grid: 0.5 px offsets keep 1 px lines crisp.
      // On a phone the text sits right on the grid with a narrow margin, so the grid is quieter there and the
      // registration crosses and rulers are left out: they crowded the words.
      const phone = w < 640;
      const quiet = phone ? 0.7 : 1;
      const thin = ink((dark ? 0.055 : 0.045) * quiet);
      const bold = ink((dark ? 0.13 : 0.1) * quiet);
      for (let i = 0, x = 0; x <= w; i++, x += MINOR) line(x + 0.5, 0, x + 0.5, h, i % MAJOR === 0 ? bold : thin);
      for (let j = 0, y = 0; y <= h; j++, y += MINOR) line(0, y + 0.5, w, y + 0.5, j % MAJOR === 0 ? bold : thin);
      // Registration crosses where bold lines meet.
      const step = MINOR * MAJOR;
      const mark = ink(dark ? 0.34 : 0.26);
      for (let x = step; !phone && x < w; x += step) {
        for (let y = step; y < h; y += step) {
          line(x - 3.5, y + 0.5, x + 4.5, y + 0.5, mark);
          line(x + 0.5, y - 3.5, x + 0.5, y + 4.5, mark);
        }
      }

      // Rulers: left and bottom edges, a longer tick every 50 px and a number every 100. No rulers on phones. The
      // left ruler's numbers need a real side margin (the page's content is at most 1280 px wide), or they sit
      // on top of the cards' edges, so they wait for a wide window; the bottom ruler's start at tablet width.
      const tick = ink(dark ? 0.4 : 0.32);
      const numbers = w >= 768;
      const sideNumbers = w >= 1400;
      const rulers = !phone;
      ctx.font = MONO;
      ctx.fillStyle = ink(dark ? 0.42 : 0.36);
      for (let y = 0; rulers && y <= h; y += 10) {
        line(0, y + 0.5, y % 100 === 0 ? 12 : y % 50 === 0 ? 8 : 4, y + 0.5, tick);
        if (sideNumbers && y % 100 === 0 && y > 0 && y < h - 30) ctx.fillText(String(y), 15, y + 4);
      }
      for (let x = 0; rulers && x <= w; x += 10) {
        line(x + 0.5, h, x + 0.5, h - (x % 100 === 0 ? 12 : x % 50 === 0 ? 8 : 4), tick);
        if (numbers && x % 100 === 0 && x > 0 && x < w - 40) ctx.fillText(String(x), x + 4, h - 15);
      }

      // The crosshair, its marks on the rulers, and the reading.
      if (live > 0) {
        const x = Math.round(pointer.x) + 0.5;
        const y = Math.round(pointer.y) + 0.5;
        ctx.globalAlpha = 0.34 * live;
        line(x, 0, x, h, accent);
        line(0, y, w, y, accent);
        ctx.globalAlpha = live;
        if (rulers) {
          line(0, y, 16, y, accent, 2);
          line(x, h, x, h - 16, accent, 2);
        }
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1;
        ctx.strokeRect(x - 5, y - 5, 10, 10);
        const reading = `x ${pad4(pointer.x)}  y ${pad4(pointer.y)}`;
        ctx.font = MONO;
        ctx.fillStyle = accent;
        ctx.fillText(reading, Math.min(x + 12, w - ctx.measureText(reading).width - 10), y > 30 ? y - 10 : y + 22);
        ctx.globalAlpha = 1;
        // Come back to fade it: once when the pointer has rested, then every frame of the fade.
        if (rested < REST_MS) {
          window.clearTimeout(timer);
          timer = window.setTimeout(schedule, REST_MS - rested + 16);
        } else if (!still) {
          schedule();
        }
      }
    }

    const moved = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.at = performance.now();
      schedule();
    };
    const left = () => {
      pointer.x = -1;
      schedule();
    };
    if (finePointer) {
      window.addEventListener('pointermove', moved, { passive: true });
      document.documentElement.addEventListener('pointerleave', left);
    }
    window.addEventListener('resize', schedule);
    schedule();
    return () => {
      if (request) window.cancelAnimationFrame(request);
      window.clearTimeout(timer);
      themed.disconnect();
      window.removeEventListener('pointermove', moved);
      document.documentElement.removeEventListener('pointerleave', left);
      window.removeEventListener('resize', schedule);
    };
  }, [resolvedTheme]);

  // ---- the page details: mark what has come into view, and measure a card when the pointer enters it
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-workbench', '');
    const seen = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('wb-seen');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.3 })
      : null;
    const watched = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll('#main-content h2, #main-content .count-up').forEach((el) => {
        if (watched.has(el)) return;
        watched.add(el);
        if (seen) seen.observe(el);
        else el.classList.add('wb-seen');
      });
    };
    // Pages arrive later (lazy routes, moving between pages): look again whenever the content changes.
    let pending = 0;
    const main = document.getElementById('main-content');
    const changed = new MutationObserver(() => {
      if (!pending) {
        pending = window.requestAnimationFrame(() => {
          pending = 0;
          scan();
        });
      }
    });
    if (main) changed.observe(main, { childList: true, subtree: true });
    scan();

    const measure = (event: Event) => {
      const target = event.target as Element | null;
      const card = target && target.closest ? (target.closest('.interactive-card') as HTMLElement | null) : null;
      if (card) card.setAttribute('data-wb-size', `${Math.round(card.offsetWidth)} × ${Math.round(card.offsetHeight)}`);
    };
    document.addEventListener('pointerover', measure, { passive: true });

    // Glass plates (centred cards, .wb-glass cards, the header bar): a glint follows the pointer across the plate. One write per
    // frame at most; Workbench.css reads --wb-gx / --wb-gy.
    let glintFrame = 0;
    let glintAt: PointerEvent | null = null;
    const glint = () => {
      glintFrame = 0;
      const event = glintAt;
      const target = event ? (event.target as Element | null) : null;
      const plate = target && target.closest ? (target.closest('.wb-glass, .interactive-card.text-center, .site-header__bar') as HTMLElement | null) : null;
      if (!event || !plate) return;
      const box = plate.getBoundingClientRect();
      plate.style.setProperty('--wb-gx', `${Math.round(event.clientX - box.left)}px`);
      plate.style.setProperty('--wb-gy', `${Math.round(event.clientY - box.top)}px`);
    };
    const overGlass = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      glintAt = event;
      if (!glintFrame) glintFrame = window.requestAnimationFrame(glint);
    };
    document.addEventListener('pointermove', overGlass, { passive: true });

    return () => {
      root.removeAttribute('data-workbench');
      if (seen) seen.disconnect();
      changed.disconnect();
      if (pending) window.cancelAnimationFrame(pending);
      document.removeEventListener('pointerover', measure);
      document.removeEventListener('pointermove', overGlass);
      if (glintFrame) window.cancelAnimationFrame(glintFrame);
    };
  }, []);

  return (
    <>
      {/* The sheet itself: paper grain under the drawn grid (Workbench.css). */}
      <div className="wb-paper" aria-hidden="true" />
      <canvas ref={canvasRef} className="wb-grid" aria-hidden="true" />
    </>
  );
};

export default WorkbenchGrid;
