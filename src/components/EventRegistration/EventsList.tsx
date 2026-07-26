import React, { useState, useEffect } from 'react';
import { fetchEvents, Event } from '../../api/events';
import { asset } from '../../utils/asset';
import { EventRegistrationForm } from './EventRegistrationForm';

export const EventsList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    async function loadEvents() {
      // Don't fetch if already loading
      if (loading) return;
      
      try {
        setLoading(true);
        const data = await fetchEvents();
        if (isMounted) {
          setEvents(Array.isArray(data) ? data : []);
        }
      } catch (e: any) {
        if (isMounted) {
          setError(e?.message || 'Failed to load events');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    
    loadEvents();
    
    return () => { isMounted = false; };
  }, []);
  
  if (loading) return <div className="text-center py-10">Loading events...</div>;
  if (error) return <div className="text-red-500 py-10 text-center">{error}</div>;
  if (events.length === 0) return <div className="text-center py-10">No upcoming events found.</div>;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {events.map(event => (
        <div key={event._id} className="p-6 rounded-lg interactive-card">
          {event.image && (
            <img 
              src={asset(event.image)} 
              alt={event.title} 
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}
          
          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
          <p className="mb-3">{event.description.substring(0, 150)}...</p>
          
          <div className="flex items-center space-x-2 mb-4">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center space-x-2 mb-4">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>{event.location}</span>
          </div>
          
          <button
            onClick={() => setSelectedEvent(selectedEvent === event._id ? null : event._id)}
            className="w-full py-2 px-4 bg-accent text-black font-bold rounded-md hover:bg-opacity-80 transition-colors"
          >
            {selectedEvent === event._id ? 'Hide Registration Form' : 'Register Now'}
          </button>
          
          {selectedEvent === event._id && (
            <div className="mt-6">
              <EventRegistrationForm 
                eventId={event._id} 
                eventName={event.title} 
                onSuccess={() => setSelectedEvent(null)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};