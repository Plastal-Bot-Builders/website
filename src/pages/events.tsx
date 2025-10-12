import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SEOConfig } from '../components/SEO';

const EventsPage: React.FC = () => {
  return (
    <section className="scroll-smooth focus:scroll-auto">
      <SEOConfig
        title="Events | Plastal-Bot Builders"
        description="Join our upcoming robotics workshops, bootcamps, and technology events."
        keywords="robotics events, tech workshops, coding bootcamps, technology education"
      />
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight">
          <span className="text-hex">Upcoming</span> Events
        </h1>
        <p className="my-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
          Join us for hands-on learning experiences, workshops, and competitions. Register for upcoming events below.
        </p>
        
        <div className="mt-10">
          {/* We'll implement the event listing component later */}
          <p>Event listings coming soon!</p>
        </div>
      </div>
      
      <Footer />
    </section>
  );
};

export default EventsPage;