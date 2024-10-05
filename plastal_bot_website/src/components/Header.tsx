import React from 'react';
import Button from './Button'

const Header: React.FC = () => {
  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            <img 
              src="./resources/Logo/logo_trans.png" 
              alt="Plastal-Bot Builders Logo" 
              className="h-48 w-48" 
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <a href="/home" className="text-white hover:text-[#0CFFBB]">.HOME ( )</a>
            <a href="/about" className="text-white hover:text-[#0CFFBB]">.ABOUT ( )</a>
            <a href="/blogs" className="text-white hover:text-[#0CFFBB]">.BLOGS ( )</a>
            <a href="/support" className="text-white hover:text-[#0CFFBB]">.SUPPORT ( )</a>
            <a href="/programs" className="text-white hover:text-[#0CFFBB]">.PROGRAMS ( )</a>
            <a href="/projects" className="text-white hover:text-[#0CFFBB]">.PROJECTS ( )</a>
          </div>

          {/* Register Button */}
          <div>
            <Button label="Become a Member" href="/membershipform" />
          </div>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      </div>
    </nav>
  );
};

export default Header;
