import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SEOConfig } from '../components/SEO';
import { fetchEvents, Event } from '../api/events';
import { EventRegistrationForm } from '../components/EventRegistration/EventRegistrationForm';
import { asset } from '../utils/asset';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaClock } from 'react-icons/fa';

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  
  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);
        const data = await fetchEvents();
        setEvents(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err?.message || 'Failed to load events');
      } finally {
        setLoading(false);
      }
    }
    
    loadEvents();
  }, []);
  
  return (
    <section className="flex flex-col min-h-screen">
      <SEOConfig
        title="Events | Plastal-Bot Builders"
        description="Join our upcoming robotics workshops, bootcamps, and technology events."
        keywords="robotics events, tech workshops, coding bootcamps, technology education"
      />
      <Header />
      
      <div className="flex-grow max-w-7xl mx-auto px-4 py-12 w-full">
        <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight">
          <span className="text-hex">Upcoming</span> Events
        </h1>
        <p className="my-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
          Join us for hands-on learning experiences, workshops, and competitions. Register for upcoming events below.
        </p>
        
        <div className="mt-10">
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
          )}
          
          {error && (
            <div className="text-center py-10 text-red-500">
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-accent text-black rounded-md hover:bg-opacity-80"
              >
                Try Again
              </button>
            </div>
          )}
          
          {!loading && !error && events.length === 0 && (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-4">No Upcoming Events</h2>
              <p>Check back soon for new events or sign up for our newsletter to stay informed.</p>
            </div>
          )}
          
          {!loading && !error && events.length > 0 && (
            <div className="grid grid-cols-1 gap-8">
              {events.map((event) => (
                <div key={event._id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md">
                  <div className="flex flex-col md:flex-row">
                    {/* Event Image */}
                    <div className="md:w-1/3">
                      <img 
                        src={event.image ? asset(event.image) : asset('/resources/Photos/placeholder-event.jpg')} 
                        alt={event.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    
                    {/* Event Details */}
                    <div className="md:w-2/3 p-6">
                      <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
                      
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center">
                          {FaCalendarAlt ({className:"text-accent mr-2"})}
                          <span>{new Date(event.date).toLocaleDateString(undefined, { 
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</span>
                        </div>
                        
                        <div className="flex items-center">
                          {FaMapMarkerAlt ({className:"text-accent mr-2"})}
                          <span>{event.location}</span>
                        </div>
                        
                        {event.capacity && (
                          <div className="flex items-center">
                            {FaUsers ({className:"text-accent mr-2"})} 
                            <span>Capacity: {event.capacity}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Countdown Timer */}
                      <EventCountdown date={new Date(event.date)} />
                      
                      <p className="mb-6">{event.description}</p>
                      
                      <button
                        onClick={() => setSelectedEvent(selectedEvent === event._id ? null : event._id)}
                        className="px-6 py-2 bg-accent text-black font-bold rounded-md hover:bg-opacity-80 transition-colors"
                      >
                        {selectedEvent === event._id ? 'Hide Registration Form' : 'Register Now'}
                      </button>
                    </div>
                  </div>
                  
                  {/* Registration Form (conditionally rendered) */}
                  {selectedEvent === event._id && (
                    <div className="px-6 pb-6">
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <EventRegistrationForm 
                          eventId={event._id} 
                          eventName={event.title} 
                          onSuccess={() => {
                            // Optionally reset the form visibility after successful submission
                            // setSelectedEvent(null);
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </section>
  );
};

// Countdown Timer Component
interface CountdownProps {
  date: Date;
}

const EventCountdown: React.FC<CountdownProps> = ({ date }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(date));
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(date));
    }, 1000);
    
    return () => clearTimeout(timer);
  });
  
  function calculateTimeLeft(targetDate: Date): { days: number; hours: number; minutes: number; seconds: number } {
    const difference = +targetDate - +new Date();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }
  
  const isPast = +date - +new Date() <= 0;
  
  if (isPast) {
    return (
      <div className="mb-4 p-3 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 rounded-md">
        <div className="flex items-center">
          {FaClock ({className:"mr-2"})}
          <span className="font-medium">This event has started or already passed</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md">
      <p className="font-medium mb-2 flex items-center">
        {FaClock ({className:"mr-2 text-accent"})} Registration closes in:
      </p>
      
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="flex flex-col">
          <span className="text-xl font-bold">{timeLeft.days}</span>
          <span className="text-xs uppercase">Days</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold">{timeLeft.hours}</span>
          <span className="text-xs uppercase">Hours</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold">{timeLeft.minutes}</span>
          <span className="text-xs uppercase">Minutes</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold">{timeLeft.seconds}</span>
          <span className="text-xs uppercase">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;