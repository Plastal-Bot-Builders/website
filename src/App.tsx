/// <reference types="react-scripts" />
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import About from './pages/about';
import Blog from './pages/blog';
import Support from './pages/support';
import Programs from './pages/programs';
import MembershipForm from './pages/membershipform';
import { Grid } from 'react-loader-spinner';
import { Scrollbars } from 'rc-scrollbars';
import Error404 from './pages/error';
import Chatbot from './components/Chatbot/Chatbot';
import ErrorBoundary from './components/ErrorBoundary';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { DefaultSEO } from './components/SEO';
import EventsPage from './pages/events';
import Squares from './components/ui/Squares';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // Track the route change

  useEffect(() => {
    // Show loader immediately when location changes
    setLoading(true);

    // Hide loader after a delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Set a delay of 1 second for demo purposes

    return () => clearTimeout(timer); // Cleanup the timer
  }, [location]);

  return (
    <HelmetProvider>
      <DefaultSEO />
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Plastal-Bot Builders - Robotics education and community programs" />
        <link rel="canonical" href="https://plastalbotbuilders.com" />
      </Helmet>

      <Scrollbars
        style={{ width: '100%', height: '100vh' }}
        renderThumbVertical={({ style, ...props }) =>
          <div {...props} style={{ ...style, backgroundColor: '#0CFFBB', borderRadius: '4px' }} />
        }
      >
        <div style={{ position: 'relative', height: '100vh' }}>
          {/* Conditionally render the Grid spinner when loading is true */}
          {loading && (
            <div
              className="loader-background visible"
              role="status"
              aria-live="polite"
              aria-label="Page loading"
            >
              <div className="loader-container">
                <Grid
                  visible={true}
                  height="100"
                  width="100"
                  color={'var(--loader-spinner, #0CFFBB)'}
                  ariaLabel="page-loading"
                  radius="12.5"
                  wrapperStyle={{}}
                  wrapperClass="grid-wrapper"
                />
                <span className="sr-only">Loading page content...</span>
              </div>
            </div>
          )}

          <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
            <Squares
              speed={0.3}
              squareSize={50}
              direction="diagonal"
            />
          </div>

          {/* Render your routes */}
          <div className="relative" style={{ zIndex: 1 }}>
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/membershipform" element={
                <ErrorBoundary>
                  <MembershipForm />
                </ErrorBoundary>
              } />
              <Route path="/blogs" element={<Blog />} />
              <Route path="/support" element={<Support />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </div>
        </div>
        <Chatbot />
      </Scrollbars>
    </HelmetProvider>
  );
};

export default App;
