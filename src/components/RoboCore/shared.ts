/** Shared by the RoboCore frame (RoboCoreLayout) and its pages. */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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

export interface PlatformDownload {
  name: string;
  file: string;
  url: string;
  label?: string;
  altFile?: string;
  altUrl?: string;
  altLabel?: string;
  needs: string;
  steps: string[];
}

/**
 * The desktop app. The files are attached to the latest GitHub release of Plastal-Bot-Builders/robocore-ide, so the
 * links always fetch the newest version; the names match what that repository's CI builds (README.md here). Until a
 * release with these files exists, GitHub answers 404.
 */
const RELEASE = 'https://github.com/Plastal-Bot-Builders/robocore-ide/releases/latest/download/';
export const DOWNLOADS: Record<Platform, PlatformDownload> = {
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
    file: 'robocore-ide-linux-x64.rpm',
    url: RELEASE + 'robocore-ide-linux-x64.rpm',
    label: 'Download .rpm (Fedora)',
    altFile: 'robocore-ide-linux-x64.tar.gz',
    altUrl: RELEASE + 'robocore-ide-linux-x64.tar.gz',
    altLabel: 'Download .tar.gz (other Linux)',
    needs: '64-bit (x86-64) Linux with GTK 3, such as Fedora, Ubuntu 24.04 or newer',
    steps: [
      'On Fedora or RPM Linux: install the .rpm package (sudo dnf install ./robocore-ide-linux-x64.rpm), then open RoboCore from Applications.',
      'On Ubuntu or other Linux: extract the .tar.gz file and run ./bundle/robocore.',
    ],
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

/**
 * For a page opened as /robocore/...#section (from another RoboCore page, a QR code or a link): scroll to that section
 * once the page has rendered.
 */
export function useScrollToHash(): void {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const t = window.setTimeout(() => scrollToSection(hash.slice(1), false), 60);
    return () => window.clearTimeout(t);
  }, [hash]);
}
