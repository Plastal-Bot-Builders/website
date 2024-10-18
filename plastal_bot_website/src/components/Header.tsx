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
            <a href="/home" className="text-gray-400 hover:text-[#0CFFBB]">.home ( )</a>
            <a href="/about" className="text-gray-400 hover:text-[#0CFFBB]">.about ( )</a>
            <a href="/blogs" className="text-gray-400 hover:text-[#0CFFBB]">.blogs ( )</a>
            <a href="/support" className="text-gray-400 hover:text-[#0CFFBB]">.support ( )</a>
            <a href="/programs" className="text-gray-400 hover:text-[#0CFFBB]">.program ( )</a>
            <a href="/projects" className="text-gray-400 hover:text-[#0CFFBB]">.project ( )</a>
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
