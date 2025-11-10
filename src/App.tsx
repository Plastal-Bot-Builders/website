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
import ProjectsPage from './pages/projects';


import { Grid } from 'react-loader-spinner';
import { Scrollbars } from 'rc-scrollbars';
import Error404 from './pages/error';
import Chatbot from './components/Chatbot/Chatbot';
import ErrorBoundary from './components/ErrorBoundary';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { DefaultSEO } from './components/SEO';
import EventsPage from './pages/events';
import Squares from './components/ui/Squares';

// Import Project Subpages
import GypulShowcase from './components/Projects/GypulShowcase';
import EnviroMonitorShowcase from './components/Projects/EnviroMonitorShowcase';


// Import Support subpages
import DonationsPage from './components/SupportPages/DonationsPage';
import SponsorshipsPage from './components/SupportPages/SponsorshipsPage';
import FundraisingPage from './components/SupportPages/FundraisingPage';
import MentorshipPage from './components/SupportPages/MentorshipPage';
import TechnicalSupportPage from './components/SupportPages/TechnicalSupportPage';
import EventCoordinationPage from './components/SupportPages/EventCoordinationPage';
import CorporatePartnershipsPage from './components/SupportPages/CorporatePartnershipsPage';
import EducationalPartnershipsPage from './components/SupportPages/EducationalPartnershipsPage';
import NonprofitPartnershipPage from './components/SupportPages/NonprofitPartnershipPage';


const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation(); 

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); 

    return () => clearTimeout(timer); 
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
          <div
            {...props}
            style={{ ...style, backgroundColor: 'var(--scrollbar-thumb)', borderRadius: '4px' }}
            className="custom-scrollbar-thumb"
          />
        }
        renderThumbHorizontal={({ style, ...props }) =>
          <div
            {...props}
            style={{ ...style, backgroundColor: 'var(--scrollbar-thumb)', borderRadius: '4px' }}
            className="custom-scrollbar-thumb"
          />
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
              <Route path="/projects" element={<ProjectsPage />} />
              
              {/* Support pages */}
              <Route path="/support" element={<Support />} />
              <Route path="/support/donations" element={<DonationsPage />} />
              <Route path="/support/sponsorships" element={<SponsorshipsPage />} />
              <Route path="/support/fundraising" element={<FundraisingPage />} />
              <Route path="/support/mentorship" element={<MentorshipPage />} />
              <Route path="/support/technical-support" element={<TechnicalSupportPage />} />
              <Route path="/support/event-coordination" element={<EventCoordinationPage />} />
              <Route path="/support/corporate-partnerships" element={<CorporatePartnershipsPage />} />
              <Route path="/support/educational-institutions" element={<EducationalPartnershipsPage />} />
              <Route path="/support/nonprofits" element={<NonprofitPartnershipPage />} />
              
              {/* Project Pages */}
              <Route path="/projects/gypul" element={
                <ErrorBoundary>
                  <GypulShowcase />
                </ErrorBoundary>
                } />
              <Route path="/projects/enviro-monitor" element={
                <ErrorBoundary>
                  <EnviroMonitorShowcase />
                </ErrorBoundary>
              } />
              {/* Catch-all route for 404 */}
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
