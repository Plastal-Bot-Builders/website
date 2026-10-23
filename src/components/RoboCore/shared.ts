/** Shared by the RoboCore frame (RoboCoreLayout) and its pages. */

export const CONTACT = 'info@plastalbotbuilders.com';
export const LINKEDIN = 'https://www.linkedin.com/company/plastal-bot-builders/';

/** The maker line, from the RoboCore print copy. */
export const ABOUT =
  'Plastal-Bot Builders is a robotics education team from Zambia. We design hands-on kits and tools that help young ' +
  'people learn engineering by building real things.';

/**
 * Scrolls a section of the current page into view. The site scrolls inside its own scroll view, not the window,
 * so the browser's own jump to #id is not enough. Returns false when the section is not on this page.
 */
export function scrollToSection(id: string, smooth = true): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  const motion = smooth && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: motion ? 'smooth' : 'auto', block: 'start' });
  return true;
}
