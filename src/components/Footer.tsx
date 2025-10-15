import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Social Links */}
          <div className="social-links flex space-x-4 mb-4 md:mb-0">
            <a
              href="https://www.linkedin.com/company/plastal-bot-builders/?originalSubdomain=zm"
              target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="accent-hover"
            >
              <i className="fab fa-linkedin icon-size"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="accent-hover">
              <i className="fab fa-instagram icon-size"></i>
            </a>
            <a href="https://www.facebook.com/plastalbotbuiders" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="accent-hover">
              <i className="fab fa-facebook icon-size"></i>
            </a>
            <a href="https://medium.com/@plastalbotbuilders" target="_blank" rel="noopener noreferrer" aria-label="Medium" className="accent-hover">
              <i className="fab fa-medium icon-size"></i>
            </a>
          </div>

          {/* Copyright */}
          <div>
            <p className="text-center md:text-left">
              ©️2024 Plastal-Bot Builders All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;