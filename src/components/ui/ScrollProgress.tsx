import { useEffect, useRef } from 'react';

/**
 * A thin accent line along the bottom of the header bar that fills as the page scrolls.
 *
 * The site scrolls inside the rc-scrollbars view (.app-scroll-view), never the window, so this listens for scroll
 * events in the capture phase and reads that element. It writes a transform directly: no React render per frame.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const bar = barRef.current;
      const view = document.querySelector<HTMLElement>('.app-scroll-view');
      if (!bar || !view) return;
      const max = view.scrollHeight - view.clientHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, view.scrollTop / max)) : 0;
      bar.style.transform = `scaleX(${progress})`;
      bar.parentElement?.toggleAttribute('data-active', max > 40 && progress > 0.005);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { capture: true, passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <span className="scroll-progress" aria-hidden="true">
      <span ref={barRef} className="scroll-progress__bar" />
    </span>
  );
}
