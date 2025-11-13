import React from 'react';
import { Routes, Route } from 'react-router-dom';

export default (
  <Routes>
    {/* Main Pages */}
    <Route path="/" />
    <Route path="/home" />
    <Route path="/about" />
    <Route path="/membershipform" />
    <Route path="/blogs" />
    <Route path="/programs" />
    <Route path="/events" />
    <Route path="/projects" />
    
    {/* Support Pages */}
    <Route path="/support" />
    <Route path="/support/donations" />
    <Route path="/support/sponsorships" />
    <Route path="/support/fundraising" />
    <Route path="/support/mentorship" />
    <Route path="/support/technical-support" />
    <Route path="/support/event-coordination" />
    <Route path="/support/corporate-partnerships" />
    <Route path="/support/educational-institutions" />
    <Route path="/support/nonprofits" />
    
    {/* Project Showcase Pages */}
    <Route path="/projects/gypul" />
    <Route path="/projects/enviro-monitor" />
    
    {/* Team/Partner Pages */}
    <Route path="/team/technicbots" />
    <Route path="/team/david" />
    
    {/* Hash/Section Navigation (for SEO) */}
    <Route path="/home#partners" />
    <Route path="/home#david" />
    <Route path="/home#team" />
  </Routes>
);