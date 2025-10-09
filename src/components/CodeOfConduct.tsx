import { useRef } from 'react';
import { asset } from '../utils/asset';
import { useTheme } from '../theme/ThemeProvider';

interface CodeOfConductProps {
  standalone?: boolean; // Controls whether to use form element for dialog
}

const CodeOfConduct: React.FC<CodeOfConductProps> = ({ standalone = true }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { resolvedTheme, toggle } = useTheme();

  const handleOpenModal = () => {
    dialogRef.current?.showModal();
  };

  const handleCloseModal = () => {
    dialogRef.current?.close();
  };

  const logoSrc =
    resolvedTheme == 'dark'
      ? asset('resources/Logo/fred.svg')
      : asset('resources/Logo/fred1.svg')

  return (
    <>
      <div className="mb-4 p-6 rounded-lg interactive-card lg:col-span-2">
        <p className="text-base text-current">
          Code of Conduct and Terms and Conditions - By submitting this form, you agree to abide by our{' '}
          <button
            onClick={handleOpenModal}
            className="accent-hover cursor-pointer underline"
            aria-haspopup="dialog"
            type="button"
          >
            Code of Conduct
          </button>
        </p>
      </div>

      <dialog
        ref={dialogRef}
        className="p-0 rounded-lg backdrop:bg-black backdrop:bg-opacity-50 surface border border-surface-border"
        aria-labelledby="modal-title"
      >
        <div className="p-6">
          <div className="relative mb-16">
            {/* Decorative background elements */}
            <div className="absolute -left-6 -right-6 top-1/2 transform -translate-y-1/2 h-32 bg-surface-hover-bg -z-10 rounded-lg opacity-40"></div>
            <div className="absolute w-48 h-48 -top-6 -right-6 bg-accent opacity-5 rounded-full blur-3xl"></div>
            
            {/* Floating geometric shapes */}
            <div className="hidden md:block absolute -bottom-8 left-12 w-8 h-8 bg-accent opacity-10 rounded-md transform rotate-45"></div>
            <div className="hidden md:block absolute top-10 right-20 w-6 h-6 border-2 border-accent opacity-20 rounded-full"></div>
            
            {/* Title and logo container with modern layout */}
            <div className="grid md:grid-cols-[1fr,auto] items-center gap-8 relative z-10 py-4">
              {/* Title area with stacked elements and animation */}
              <div className="flex flex-col items-center md:items-start space-y-2 relative">
                {/* Small badge above title */}
                <div className="px-3 py-1 rounded-full bg-accent/10 text-xs font-medium text-accent tracking-wider mb-2">
                  OFFICIAL DOCUMENT
                </div>
                
                {/* Main title with modern typography */}
                <h1 id="modal-title" className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-2 text-center md:text-left">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-text to-accent">Our</span> Code of Conduct
                </h1>
                
                {/* Animated accent bar */}
                <div className="relative h-1 w-20 mx-auto md:mx-0 overflow-hidden rounded-full bg-surface-border">
                  <div className="absolute inset-0 bg-accent animate-pulse"></div>
                </div>
                
                {/* Subtle caption */}
                <p className="text-sm opacity-70 mt-4 max-w-lg text-center md:text-left">
                  Guidelines that define how we work together as a community
                </p>
              </div>
              
              {/* Logo with modern hover and focus effects */}
              <div className="relative group mx-auto md:mx-0">
                {/* Logo container with pseudo-3D effect */}
                <div className="relative z-10 p-2 rounded-full bg-surface shadow-lg transform transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-full"></div>
                  <img
                    src={logoSrc}
                    alt="Plastal-Bot Builders Logo"
                    className="h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 relative z-10"
                  />
                </div>
                
                {/* Animated ring around logo */}
                <div className="absolute inset-0 border-2 border-accent/30 rounded-full scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700"></div>
              </div>
            </div>
          </div>
          <div className="text-current max-w-2xl mx-auto">
            <div className="relative border-l-4 border-accent pl-6 mb-8">
              <h4 className="font-bold text-lg mb-3">Purpose</h4>
              <p className="mb-4 leading-relaxed">
                We are committed to providing a welcoming and inclusive environment for everyone. 
                All participants in our community must adhere to the following code of conduct:
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-surface-hover-bg p-4 rounded-lg">
                <h5 className="font-semibold text-base mb-3 flex items-center">
                  <span className="inline-flex justify-center items-center w-6 h-6 rounded-full bg-accent text-black font-bold mr-3 text-xs">1</span>
                  Expected Behavior
                </h5>
                <ul className="space-y-3 pl-9">
                  <li className="relative before:absolute before:content-['•'] before:-left-5 before:text-accent">
                    Be respectful and inclusive of all participants
                  </li>
                  <li className="relative before:absolute before:content-['•'] before:-left-5 before:text-accent">
                    Exercise consideration and empathy in your speech and actions
                  </li>
                  <li className="relative before:absolute before:content-['•'] before:-left-5 before:text-accent">
                    Participate in an authentic and active way
                  </li>
                </ul>
              </div>
              
              <div className="bg-surface-hover-bg p-4 rounded-lg">
                <h5 className="font-semibold text-base mb-3 flex items-center">
                  <span className="inline-flex justify-center items-center w-6 h-6 rounded-full bg-accent text-black font-bold mr-3 text-xs">2</span>
                  Unacceptable Behavior
                </h5>
                <ul className="space-y-3 pl-9">
                  <li className="relative before:absolute before:content-['•'] before:-left-5 before:text-accent">
                    Refrain from demeaning, discriminatory, or harassing behavior
                  </li>
                  <li className="relative before:absolute before:content-['•'] before:-left-5 before:text-accent">
                    Alert community leaders if you notice violations of this code of conduct
                  </li>
                </ul>
              </div>
            </div>
          
            <div className="mt-8 p-4 border border-surface-border rounded-lg bg-surface-hover-bg/30">
              <h5 className="font-semibold text-base mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Enforcement
              </h5>
              <p className="pl-7">
                Failure to comply with these guidelines may result in temporary or permanent exclusion from community participation.
              </p>
            </div>
          
            <div className="mt-8 text-sm text-center opacity-75">
              Last updated: October 2025 • <span className="text-accent">Version 1.2</span>
            </div>
          </div>
          {!standalone && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="custom-button"
                type="button"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
};

export default CodeOfConduct;