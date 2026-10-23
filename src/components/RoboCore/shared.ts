/** Shared by the RoboCore frame (RoboCoreLayout) and its pages. */

export const CONTACT = 'info@plastalbotbuilders.com';
export const LINKEDIN = 'https://www.linkedin.com/company/plastal-bot-builders/';

/** The maker line, from the RoboCore print copy. */
export const ABOUT =
  'Plastal-Bot Builders is a robotics education team from Zambia. We design hands-on kits and tools that help young ' +
  'people learn engineering by building real things.';

/** The RoboCore IDE's version (its pubspec.yaml), shown on the download page. */
export const IDE_VERSION = '1.0.0';

/** The IDE in the browser, published by the robocore-ide repository to GitHub Pages. */
export const WEB_IDE = 'https://plastal-bot-builders.github.io/robocore-ide/';

export type Platform = 'mac' | 'windows' | 'linux';

/**
 * The desktop app. The files are attached to the latest GitHub release of Plastal-Bot-Builders/robocore-ide, so the
 * links always fetch the newest version; the names match what that repository's CI builds (README.md here). Until a
 * release with these files exists, GitHub answers 404.
 */
const RELEASE = 'https://github.com/Plastal-Bot-Builders/robocore-ide/releases/latest/download/';
export const DOWNLOADS: Record<Platform, { name: string; file: string; url: string; needs: string; steps: string[] }> = {
  mac: {
    name: 'macOS',
    file: 'robocore-ide-macos.zip',
    url: RELEASE + 'robocore-ide-macos.zip',
    needs: 'macOS 12 Monterey or later, Apple silicon or Intel',
    steps: ['Open the downloaded .zip file.', 'Drag RoboCore into your Applications folder.', 'Open RoboCore from Applications.'],
  },
  windows: {
    name: 'Windows',
    file: 'robocore-ide-windows-x64.zip',
    url: RELEASE + 'robocore-ide-windows-x64.zip',
    needs: 'Windows 10 or 11, 64-bit',
    steps: ['Unzip the downloaded file.', 'Open the RoboCore folder.', 'Run RoboCore.exe. Keep it with the other files in its folder.'],
  },
  linux: {
    name: 'Linux',
    file: 'robocore-ide-linux-x64.tar.gz',
    url: RELEASE + 'robocore-ide-linux-x64.tar.gz',
    needs: '64-bit (x86-64) Linux with GTK 3, such as Ubuntu 24.04 or newer',
    steps: ['Extract the downloaded .tar.gz file.', 'Open the bundle folder in a terminal.', 'Run ./robocore'],
  },
};

/** The visitor's computer, from the browser: null on phones and tablets, which can't run the desktop app. */
export function detectPlatform(): Platform | null {
  if (typeof navigator === 'undefined') return null;
  const ua = navigator.userAgent;
  if (/Android|iPhone|iPad|iPod/i.test(ua)) return null;
  // iPadOS reports itself as a Mac; a touch screen gives it away.
  if (/Mac/i.test(ua)) return navigator.maxTouchPoints > 1 ? null : 'mac';
  if (/Win/i.test(ua)) return 'windows';
  if (/Linux|X11|CrOS/i.test(ua)) return /CrOS/i.test(ua) ? null : 'linux';
  return null;
}

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
