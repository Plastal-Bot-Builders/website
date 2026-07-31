/// <reference types="react-scripts" />
import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';

import Home from './pages/home';

import { Grid } from 'react-loader-spinner';
import { Scrollbars } from 'rc-scrollbars';
import Chatbot from './components/Chatbot/Chatbot';
import ErrorBoundary from './components/ErrorBoundary';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { DefaultSEO } from './components/SEO';
import Squares from './components/ui/Squares';
import { SITE_URL } from './config/site';

// Route-level code splitting: each page loads only when visited.
const About = lazy(() => import('./pages/about'));
const Blog = lazy(() => import('./pages/blog'));
const Support = lazy(() => import('./pages/support'));
const Programs = lazy(() => import('./pages/programs'));
const MembershipForm = lazy(() => import('./pages/membershipform'));
const ProjectsPage = lazy(() => import('./pages/projects'));
const EventsPage = lazy(() => import('./pages/events'));
const NewsPage = lazy(() => import('./pages/news'));
const JourneyToGeneva = lazy(() => import('./pages/journey-to-geneva'));
const Error404 = lazy(() => import('./pages/error'));

// Project subpages
const GypulShowcase = lazy(() => import('./components/Projects/GypulShowcase'));
const EnviroMonitorShowcase = lazy(() => import('./components/Projects/EnviroMonitorShowcase'));

// Support subpages
const DonationsPage = lazy(() => import('./components/SupportPages/DonationsPage'));
const SponsorshipsPage = lazy(() => import('./components/SupportPages/SponsorshipsPage'));
const FundraisingPage = lazy(() => import('./components/SupportPages/FundraisingPage'));
const MentorshipPage = lazy(() => import('./components/SupportPages/MentorshipPage'));
const TechnicalSupportPage = lazy(() => import('./components/SupportPages/TechnicalSupportPage'));
const EventCoordinationPage = lazy(() => import('./components/SupportPages/EventCoordinationPage'));
const CorporatePartnershipsPage = lazy(() => import('./components/SupportPages/CorporatePartnershipsPage'));
const EducationalPartnershipsPage = lazy(() => import('./components/SupportPages/EducationalPartnershipsPage'));
const NonprofitPartnershipPage = lazy(() => import('./components/SupportPages/NonprofitPartnershipPage'));

// Team/Partner pages
const Technicbots = lazy(() => import('./components/Technibots/technicbots'));
const DavidProfile = lazy(() => import('./components/Technibots/David'));

const RouteLoader: React.FC = () => (
  <div
    className="loader-background visible"
    role="status"
    aria-live="polite"
    aria-label="Page loading"
  >
    <div className="loader-container">
      <Grid
        visible={true}
        height="80"
        width="80"
        color={'var(--loader-spinner, #0CFFBB)'}
        ariaLabel="page-loading"
        radius="12.5"
      />
      <span className="sr-only">Loading page content...</span>
    </div>
  </div>
);

const App: React.FC = () => {
  const location = useLocation();
  const scrollbarsRef = useRef<Scrollbars>(null);

  // Scroll back to the top whenever the route changes (the app scrolls
  // inside the rc-scrollbars view, not the window).
  useEffect(() => {
    if (!location.hash) {
      scrollbarsRef.current?.scrollToTop();
    }
  }, [location.pathname, location.hash]);

  return (
    <HelmetProvider>
      <DefaultSEO />
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Plastal-Bot Builders - Robotics education and community programs" />
        <link rel="canonical" href={SITE_URL} />
      </Helmet>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Scrollbars
        ref={scrollbarsRef}
        style={{ width: '100%', minHeight: '100vh' }}
        autoHide={false}
        renderView={({ style, ...props }) => (
          <div {...props} style={style} className="app-scroll-view" />
        )}
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
        <div style={{ position: 'relative', minHeight: '100vh' }} className="overflow-x-clip">
          <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
            <Squares
              speed={0.3}
              squareSize={50}
              direction="diagonal"
            />
          </div>

          {/* Render your routes */}
          <main id="main-content" className="relative" style={{ zIndex: 1 }}>
            <Suspense fallback={<RouteLoader />}>
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
                <Route path="/news" element={<NewsPage />} />
                <Route path="/journey-to-geneva" element={<JourneyToGeneva />} />

                {/* Support pages */}
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

                {/* Team/Partner Pages */}
                <Route path="/team/technicbots" element={
                  <ErrorBoundary>
                    <Technicbots />
                  </ErrorBoundary>
                } />
                <Route path="/team/david" element={
                  <ErrorBoundary>
                    <DavidProfile />
                  </ErrorBoundary>
                } />

                {/* Catch-all route for 404 */}
                <Route path="*" element={<Error404 />} />
              </Routes>
            </Suspense>
          </main>
        </div>
        <Chatbot />
      </Scrollbars>
    </HelmetProvider>
  );
};

export default App;
