import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SEOConfig } from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEOConfig
        title="404 Not Found | Plastal-Bot Builders"
        description="The page you are looking for does not exist."
        image="/resources/Photos/fredmpelembe.jpeg"
        // The server answers every unknown address with the app (status 200), so this tag is what tells search
        // engines the page doesn't exist.
        noindex
      />
      {/* The site's own header, colours and buttons, in both themes; the page background shows through. */}
      <Header />
      <div className="min-h-[70vh] flex flex-col justify-center items-center px-4">
        <div className="max-w-lg text-center">
          {/* Error Code */}
          <h1 className="text-8xl font-extrabold text-hex mb-4">404</h1>

          {/* Error Message */}
          <h2 className="text-3xl font-bold mb-8">
            Oops! Page Not Found
          </h2>

          {/* Description */}
          <p className="opacity-75 mb-8">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="custom-button--ghost"
            >
              Go Back
            </button>

            <button
              onClick={() => navigate('/')}
              className="custom-button"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Error404;