import React, { Suspense, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LuLinkedin, LuMail, LuMenu, LuMoon, LuSun, LuX } from 'react-icons/lu';
import { useTheme } from '../../theme/ThemeProvider';
import { asset } from '../../utils/asset';
import RoboCoreLogo from './RoboCoreLogo';
import { ABOUT, CONTACT, LINKEDIN, scrollToSection } from './shared';
import './robocore.css';

/*
 * RoboCore's own frame around every /robocore page: its header and footer instead of the Plastal-Bot site's.
 * RoboCore stands on its own: the Plastal-Bot site links in (its menu, the Projects page), but nothing here leads back;
 * Plastal-Bot Builders appears only as the maker. New pages go in as child routes of /robocore in App.tsx and get a
 * link in NAV.
 */

/** The header's links: sections of the overview for now; later pages are plain paths such as '/robocore/kit'. */
const NAV = [
  { label: 'What it is', to: '/robocore#what' },
  { label: 'Inside', to: '/robocore#inside' },
  { label: 'The app', to: '/robocore#ide' },
  { label: 'Where we are', to: '/robocore#now' },
  { label: 'Download', to: '/robocore/download' },
];

/**
 * A link to a page or to a section of one. On the page already, it scrolls to the section; from another page it
 * navigates, and the page scrolls to the section once it has loaded (see the overview's hash effect).
 */
const SectionLink: React.FC<{ to: string; className?: string; onGo?: () => void; children: React.ReactNode }> = ({
  to,
  className,
  onGo,
  children,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [path, id] = to.split('#');
  return (
    <a
      href={to}
      className={className}
      aria-current={!id && location.pathname === path ? 'page' : undefined}
      onClick={(e) => {
        e.preventDefault();
        onGo?.();
        if (!(id && location.pathname === path && scrollToSection(id))) navigate(to);
      }}
    >
      {children}
    </a>
  );
};

const RoboCoreHeader: React.FC = () => {
  const { resolvedTheme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const dark = resolvedTheme === 'dark';

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="rc-header">
      <div className="rc-wrap rc-header-bar">
        <Link to="/robocore" className="rc-header-logo" aria-label="RoboCore home" onClick={() => setOpen(false)}>
          <RoboCoreLogo zambia={false} title="RoboCore" />
        </Link>
        <nav className="rc-header-nav" aria-label="RoboCore">
          {NAV.map((n) => (
            <SectionLink key={n.to} to={n.to} className="rc-header-link">
              {n.label}
            </SectionLink>
          ))}
        </nav>
        <div className="rc-header-actions">
          <button
            type="button"
            className="rc-icon-btn"
            onClick={toggle}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={dark ? 'Light mode' : 'Dark mode'}
          >
            {dark ? <LuSun aria-hidden="true" /> : <LuMoon aria-hidden="true" />}
          </button>
          <SectionLink to="/robocore#get-involved" className="rc-btn rc-btn-small rc-header-cta" onGo={() => setOpen(false)}>
            Get involved
          </SectionLink>
          <button
            type="button"
            className="rc-icon-btn rc-menu-btn"
            aria-expanded={open}
            aria-controls="rc-menu"
            aria-label={open ? 'Close the menu' : 'Open the menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <LuX aria-hidden="true" /> : <LuMenu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <div id="rc-menu" className="rc-menu" hidden={!open}>
        <nav className="rc-wrap" aria-label="RoboCore">
          {NAV.map((n) => (
            <SectionLink key={n.to} to={n.to} className="rc-menu-link" onGo={() => setOpen(false)}>
              {n.label}
            </SectionLink>
          ))}
          <SectionLink to="/robocore#get-involved" className="rc-btn rc-btn-small rc-header-cta" onGo={() => setOpen(false)}>
            Get involved
          </SectionLink>
        </nav>
      </div>
    </header>
  );
};

const RoboCoreFooter: React.FC = () => (
  <footer className="rc-footer">
    <div className="rc-contours" aria-hidden="true" />
    <div className="rc-wrap rc-footer-inner">
      <div className="rc-footer-about">
        <RoboCoreLogo className="rc-footer-logo" title="RoboCore" />
        <p>{ABOUT}</p>
      </div>
      <div className="rc-footer-contact">
        <p className="rc-footer-head">Contact</p>
        <a className="rc-link" href={`mailto:${CONTACT}`}>
          <LuMail aria-hidden="true" /> {CONTACT}
        </a>
        <a className="rc-link" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
          <LuLinkedin aria-hidden="true" /> LinkedIn
        </a>
      </div>
    </div>
    <div className="rc-wrap rc-footer-base">
      <span className="rc-maker">
        Designed in Zambia by
        <img src={asset('resources/RoboCore/plastal-bot-builders-navy.svg')} alt="Plastal-Bot Builders" width={98} height={34} />
      </span>
      <span>© {new Date().getFullYear()} Plastal-Bot Builders</span>
    </div>
  </footer>
);

const RoboCoreLayout: React.FC = () => (
  <div className="rc">
    <RoboCoreHeader />
    {/* App.tsx already wraps every route in <main id="main-content">. The header and footer stay put while a page loads. */}
    <div className="rc-page">
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
    <RoboCoreFooter />
  </div>
);

export default RoboCoreLayout;
