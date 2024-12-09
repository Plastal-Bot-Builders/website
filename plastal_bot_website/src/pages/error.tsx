import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center px-4">
      <div className="max-w-lg text-center">
        {/* Error Code */}
        <h1 className="text-8xl font-extrabold text-hex mb-4">404</h1>
        
        {/* Error Message */}
        <h2 className="text-3xl font-bold text-white mb-8">
          Oops! Page Not Found
        </h2>
        
        {/* Description */}
        <p className="text-gray-400 mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        
        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Go Back
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-hex text-white rounded-lg hover:bg-hex/90 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error404;