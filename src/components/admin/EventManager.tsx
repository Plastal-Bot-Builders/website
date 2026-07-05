import React, { useState } from 'react';
import { 
  Panel, 
  FormGroup, 
  Label, 
  Input, 
  Button, 
  DeleteButton, 
  Table
} from '../../components/admin/AdminStyles';  // Fixed import path
import { createEvent, deleteEvent, Event } from '../../api/events';
import { getJson } from '../../api/client';

interface EventRegistration {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  institution?: string;
  createdAt: string;
}

interface EventManagerProps {
  events: Event[];
  token: string | null;
  onEventsChange: () => void;
  loading: boolean;
  setError: (error: string | null) => void;
}

export function EventManager({ 
  events, 
  token, 
  onEventsChange, 
  loading, 
  setError 
}: EventManagerProps) {
  // Event form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Event creation handler
  async function handleCreateEvent(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return setError('Not authenticated');
    setError(null);
    
    try {
      const payload = {
        title: title.trim(),
        description: description.trim(),
        date: new Date(date),
        location: location.trim(),
        capacity: capacity ? parseInt(capacity) : undefined,
        image: imageUrl || undefined
      };
      
      await createEvent(payload, token);
      
      // Reset form
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
      setCapacity('');
      setImageUrl('');
      
      // Refresh events list
      onEventsChange();
    } catch (e: any) {
      setError(e?.message || 'Failed to create event');
    }
  }

  // Registrations viewer state
  const [openEventId, setOpenEventId] = useState<string | null>(null);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [registrationsLoading, setRegistrationsLoading] = useState(false);

  async function handleViewRegistrations(event: Event) {
    if (openEventId === event._id) {
      setOpenEventId(null); // toggle closed
      return;
    }
    if (!token) return setError('Not authenticated');
    setError(null);
    setOpenEventId(event._id);
    setRegistrationsLoading(true);
    try {
      const response = await getJson<{ data?: EventRegistration[] }>(
        `/events/${event._id}/registrations`,
        { token }
      );
      setRegistrations(Array.isArray(response.data) ? response.data : []);
    } catch (e: any) {
      setError(e?.message || 'Failed to load registrations');
      setOpenEventId(null);
    } finally {
      setRegistrationsLoading(false);
    }
  }

  // Event deletion handler
  async function handleDeleteEvent(id: string) {
    if (!token) return setError('Not authenticated');
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    setError(null);
    
    try {
      await deleteEvent(id, token);
      onEventsChange();
    } catch (e: any) {
      setError(e?.message || 'Failed to delete event');
    }
  }

  return (
    <>
      <Panel style={{ marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '20px' }}>Create New Event</h2>
        <form onSubmit={handleCreateEvent}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <FormGroup>
              <Label>Title</Label>
              <Input 
                value={title} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} 
                required 
              />
            </FormGroup>
            <FormGroup>
              <Label>Date</Label>
              <Input 
                type="date" 
                value={date} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)} 
                required 
              />
            </FormGroup>
          </div>
          
          <FormGroup>
            <Label>Description</Label>
            <textarea 
              value={description} 
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} 
              required
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid var(--input-border)'
              }}
            />
          </FormGroup>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <FormGroup>
              <Label>Location</Label>
              <Input 
                value={location} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)} 
                required 
              />
            </FormGroup>
            <FormGroup>
              <Label>Capacity</Label>
              <Input 
                type="number"
                value={capacity} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCapacity(e.target.value)} 
              />
            </FormGroup>
          </div>
          
          <FormGroup>
            <Label>Image URL</Label>
            <Input 
              value={imageUrl} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value)} 
              placeholder="/resources/events/your-image.jpg"
            />
          </FormGroup>
          
          <Button type="submit">Create Event</Button>
        </form>
      </Panel>

      <Panel>
        <h2 style={{ marginBottom: '20px' }}>Manage Events</h2>
        {loading ? (
          <p>Loading events...</p>
        ) : events.length === 0 ? (
          <p>No events found. Create your first event above.</p>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Location</th>
                <th>Registrations</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>{event.title}</td>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td>{event.location}</td>
                  <td>{(event.registrations || []).length}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <Button onClick={() => handleViewRegistrations(event)}>
                        {openEventId === event._id ? 'Hide' : 'Registrations'}
                      </Button>
                      <DeleteButton onClick={() => handleDeleteEvent(event._id)}>
                        Delete
                      </DeleteButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Panel>

      {openEventId && (
        <Panel style={{ marginTop: '20px' }}>
          <h2 style={{ marginBottom: '20px' }}>
            Registrations for “{events.find(e => e._id === openEventId)?.title}”
            {registrationsLoading && <small> Loading…</small>}
          </h2>
          {!registrationsLoading && registrations.length === 0 && (
            <p>No one has registered for this event yet.</p>
          )}
          {registrations.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Institution</th>
                  <th>Registered on</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((r) => (
                  <tr key={r._id}>
                    <td>{r.fullName}</td>
                    <td>{r.email}</td>
                    <td>{r.phone || '—'}</td>
                    <td>{r.institution || '—'}</td>
                    <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Panel>
      )}
    </>
  );
}