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
    async function loadEvents() {
      try {
        const data = await fetchEvents();
        setEvents(Array.isArray(data) ? data : []);
      } catch (e: any) {
        setError(e?.message || 'Failed to load events');
      } finally {
        setLoading(false);
      }
    }
    
    loadEvents();
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
          <p className="mb-3">{event.description}</p>
          
          <div className="flex items-center space-x-2 mb-4">
            <i className="fas fa-calendar-alt"></i>
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center space-x-2 mb-4">
            <i className="fas fa-map-marker-alt"></i>
            <span>{event.location}</span>
          </div>
          
          {event.capacity && (
            <div className="flex items-center space-x-2 mb-4">
              <i className="fas fa-users"></i>
              <span>Capacity: {event.capacity}</span>
            </div>
          )}
          
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