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
export const IDE_VERSION = '1.0.2';

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
 * The desktop app: the files the robocore-ide CI attaches to the GitHub release of version IDE_VERSION (its
 * release-assets job names them RoboCore-<version>-…). Their names carry the version, so a new release needs
 * IDE_VERSION raised here (README.md here).
 */
const RELEASE = `https://github.com/Plastal-Bot-Builders/robocore-ide/releases/download/v${IDE_VERSION}/`;
const MAC = `RoboCore-${IDE_VERSION}-mac-apple-silicon.dmg`;
const MAC_INTEL = `RoboCore-${IDE_VERSION}-mac-intel.dmg`;
const WINDOWS = `RoboCore-Setup-${IDE_VERSION}.exe`;
const RPM = `RoboCore-${IDE_VERSION}-linux-x64.rpm`;
const TARBALL = `RoboCore-${IDE_VERSION}-linux-x64.tar.gz`;
export const DOWNLOADS: Record<Platform, PlatformDownload> = {
  mac: {
    name: 'macOS',
    file: MAC,
    url: RELEASE + MAC,
    label: 'Download for Apple silicon',
    altFile: MAC_INTEL,
    altUrl: RELEASE + MAC_INTEL,
    altLabel: 'Download for Intel Macs',
    needs: 'macOS 12 Monterey or later. About 420 MB: the compilers come inside, so it works offline.',
    steps: [
      'Pick your Mac: in Apple menu > About This Mac, a Chip line means Apple silicon; a Processor line naming Intel means Intel.',
      'Open the downloaded .dmg file and drag RoboCore into Applications.',
      'Open RoboCore from Applications. The first time, macOS may stop it because Apple has not checked it yet: open System Settings, then Privacy & Security, and click Open Anyway.',
      'On an Apple silicon Mac, the Arduino Uno needs Apple’s Rosetta. RoboCore tells you how to install it the first time you build for the Uno.',
    ],
  },
  windows: {
    name: 'Windows',
    file: WINDOWS,
    url: RELEASE + WINDOWS,
    needs: 'Windows 10 or 11, 64-bit',
    steps: [
      'Run the downloaded installer.',
      'If Windows says it protected your PC, click More info, then Run anyway.',
      'Open RoboCore from the Start menu.',
    ],
  },
  linux: {
    name: 'Linux',
    file: RPM,
    url: RELEASE + RPM,
    label: 'Download .rpm (Fedora)',
    altFile: TARBALL,
    altUrl: RELEASE + TARBALL,
    altLabel: 'Download .tar.gz (other Linux)',
    needs: '64-bit (x86-64) Linux with GTK 3, such as Fedora, Ubuntu 24.04 or newer',
    steps: [
      `On Fedora or RPM Linux: install the .rpm package (sudo dnf install ./${RPM}), then open RoboCore from Applications.`,
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
