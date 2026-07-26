import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaInstagram, FaFacebook, FaMediumM, FaArrowUp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const quickLinks = [
  { to: '/home', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/news', label: 'News & Achievements' },
  { to: '/journey-to-geneva', label: 'The Road to Geneva' },
  { to: '/projects', label: 'Projects' },
  { to: '/events', label: 'Events' },
  { to: '/blogs', label: 'Blog' },
];

const programLinks = [
  { to: '/programs', label: 'Programs' },
  { to: '/membershipform', label: 'Become a Member' },
  { to: '/support/mentorship', label: 'Mentorship' },
  { to: '/support/technical-support', label: 'Volunteer' },
];

const supportLinks = [
  { to: '/support', label: 'Support Us' },
  { to: '/support/donations', label: 'Donate' },
  { to: '/support/sponsorships', label: 'Sponsorships' },
  { to: '/support/corporate-partnerships', label: 'Partnerships' },
];

const socials = [
  {
    href: 'https://www.linkedin.com/company/plastal-bot-builders/?originalSubdomain=zm',
    label: 'LinkedIn',
    Icon: FaLinkedin,
  },
  { href: 'https://www.instagram.com', label: 'Instagram', Icon: FaInstagram },
  { href: 'https://www.facebook.com/plastalbotbuiders', label: 'Facebook', Icon: FaFacebook },
  { href: 'https://medium.com/@plastalbotbuilders', label: 'Medium', Icon: FaMediumM },
];

// The app scrolls inside the rc-scrollbars view (not the window), where
// native smooth scrollTo is unreliable — animate manually via rAF instead.
const scrollAppToTop = () => {
  const view = document.querySelector('.app-scroll-view') as HTMLElement | null;
  if (!view) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    view.scrollTop = 0;
    return;
  }
  const start = view.scrollTop;
  const duration = Math.min(700, 200 + start / 15);
  const t0 = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - t0) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    view.scrollTop = start * (1 - eased);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Top: brand + link columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand / mission */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-lg font-extrabold title mb-3">
              <span className="text-hex">Plastal-Bot</span> Builders
            </p>
            <p className="text-sm leading-relaxed opacity-85 mb-5 max-w-xs">
              Empowering Zambia's next generation of innovators through robotics,
              programming and hands-on STEM education.
            </p>
            <div className="social-links flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                >
                  <Icon aria-hidden="true" size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <p className="footer-heading">Explore</p>
            <ul className="space-y-1">
              {quickLinks.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="footer-link text-sm">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Programs */}
          <nav aria-label="Programs">
            <p className="footer-heading">Get Involved</p>
            <ul className="space-y-1">
              {programLinks.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="footer-link text-sm">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support + contact */}
          <div>
            <p className="footer-heading">Support</p>
            <ul className="space-y-1 mb-5">
              {supportLinks.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="footer-link text-sm">{l.label}</Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2 text-sm opacity-85">
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt aria-hidden="true" className="text-hex flex-shrink-0" />
                Lusaka, Zambia
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope aria-hidden="true" className="text-hex flex-shrink-0" />
                <a href="mailto:info@plastalbotbuilders.com" className="footer-link">
                  info@plastalbotbuilders.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-surface flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-80 text-center sm:text-left">
            ©️{year} Plastal-Bot Builders. All rights reserved.
          </p>
          <button type="button" className="back-to-top" onClick={scrollAppToTop}>
            <FaArrowUp aria-hidden="true" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
