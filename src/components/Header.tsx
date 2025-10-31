import React, { useState } from 'react';
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
    { path: '/blogs', label: '.blogs( )' },
    { path: '/support', label: '.support( )' },
    { path: '/programs', label: '.program( )' },

  ];

  // FIX: use Link, not <link>, and use "to"
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
    <nav className="w-full z-50 site-header">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex justify-between items-center py-2">
          {/* Logo (served from public/resources/...) */}
          <img
            src={logoSrc} // CHANGED from ./resources/... to absolute path
            alt="Plastal-Bot Builders Logo"
            className="h-24 w-24 md:h-36 md:w-36 lg:h-36 lg:w-36 xl:h-48 xl:w-48 2xl:h-64 2xl:w-64"
          />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            aria-label="Toggle navigation menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`w-6 h-0.5 bg-text mb-1 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-6 h-0.5 bg-text mb-1 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-text ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink key={link.path} {...link} />
            ))}

            {/* Theme Toggle (desktop) */}
            <button
              type="button"
              onClick={toggle}
              className="theme-toggle"
              title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>

          {/* Desktop Register Button */}
          <div className="hidden md:block">
            <Button label="Become a Member" href="/membershipform" />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="py-2 space-y-4">
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

            <div className="pt-2">
              <Button label="Become a Member" href="/membershipform" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;