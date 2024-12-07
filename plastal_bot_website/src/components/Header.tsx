import React, { useState } from 'react';
import Button from './Button';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/home', label: '.home()' },
    { path: '/about', label: '.about()' },
    { path: '/blogs', label: '.blogs()' },
    { path: '/support', label: '.support()' },
    { path: '/programs', label: '.program()' }
  ];

  const NavLink = ({ path, label }: { path: string; label: string }) => (
    <a
      href={path}
      className={`transition-colors duration-300 ${
        location.pathname === path
          ? 'text-[#0CFFBB]'
          : 'text-gray-400 hover:text-[#0CFFBB]'
      }`}
      onClick={() => setIsMenuOpen(false)}
    >
      {label}
    </a>
  );

  return (
    <nav className="w-full z-50 bg-[#100D3B]/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <img 
            src="./resources/Logo/fred.svg" 
            alt="Plastal-Bot Builders Logo" 
            className="h-24 w-24 md:h-36 md:w-36 lg:h-36 lg:w-36 xl:h-48 xl:w-48 2xl:h-64 2xl:w-64" 
          />

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`w-6 h-0.5 bg-white mb-1 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white mb-1 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink key={link.path} {...link} />
            ))}
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
            <div className="pt-4">
              <Button label="Become a Member" href="/membershipform" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;