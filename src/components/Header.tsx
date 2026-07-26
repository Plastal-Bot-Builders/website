import React, { useEffect, useState } from 'react';
import Button from './Button';
import { useLocation, Link } from 'react-router-dom';
import { useTheme } from '../theme/ThemeProvider';
import { asset } from '../utils/asset';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { resolvedTheme, toggle } = useTheme();

  const navLinks = [
    { path: '/home', label: '.home( )' },
    { path: '/about', label: '.about( )' },
    { path: '/news', label: '.news( )' },
    { path: '/blogs', label: '.blogs( )' },
    { path: '/support', label: '.support( )' },
    { path: '/programs', label: '.program( )' },
  ];

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  const NavLink = ({ path, label }: { path: string; label: string }) => {
    const active = location.pathname.startsWith(path);
    return (
      <Link
        to={path}
        className={`nav-link ${active ? 'nav-link--active' : ''}`}
        aria-current={active ? 'page' : undefined}
        onClick={() => setIsMenuOpen(false)}
      >
        {label}
      </Link>
    );
  };

  const logoSrc =
    resolvedTheme === 'dark'
    ? asset('resources/Logo/fred.svg')
    : asset('resources/Logo/fred1.svg')

  return (
    <nav className="w-full z-50 site-header max-sm:pt-2 pt-4 px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
      {/* The visible bar is constrained to the content width so it lines up
          with the page container rather than running edge to edge. */}
      <div className="site-header__bar max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center gap-4 max-sm:py-1.5 py-2">
          {/* Logo (served from public/resources/...) */}
          <Link to="/home" className="flex-shrink-0" aria-label="Plastal-Bot Builders — Home">
            <img
              src={logoSrc}
              alt="Plastal-Bot Builders Logo"
              width={112}
              height={112}
              className="h-12 w-12 sm:h-20 sm:w-20 lg:h-24 lg:w-24 object-contain"
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex h-11 w-11 flex-col items-center justify-center rounded-md"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`w-6 h-0.5 bg-text mb-1 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-6 h-0.5 bg-text mb-1 transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-text transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {navLinks.map((link) => (
              <NavLink key={link.path} {...link} />
            ))}

            {/* Theme Toggle (desktop) */}
            <button
              type="button"
              onClick={toggle}
              className="theme-toggle ml-2"
              title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>

          {/* Desktop Register Button */}
          <div className="hidden md:block flex-shrink-0">
            <Button label="Become a Member" href="/membershipform" />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden mobile-menu ${isMenuOpen ? 'mobile-menu--open' : ''}`}
        >
          <div className="py-2 space-y-1">
            {navLinks.map((link) => (
              <div key={link.path} className="block py-2">
                <NavLink {...link} />
              </div>
            ))}

            {/* Theme Toggle (mobile) */}
            <button
              type="button"
              onClick={() => { toggle(); setIsMenuOpen(false); }}
              className="w-full text-left theme-toggle"
              aria-label="Toggle theme"
            >
              Theme: {resolvedTheme === 'dark' ? 'Dark 🌙' : 'Light ☀️'}
            </button>

            <div className="pt-3 pb-2">
              <Button label="Become a Member" href="/membershipform" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
