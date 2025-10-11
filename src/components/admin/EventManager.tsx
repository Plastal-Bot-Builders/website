import React, { useState } from 'react';
import { 
  Panel, 
  FormGroup, 
  Label, 
  Input, 
  Button, 
  DeleteButton, 
  Table
} from '../../admin/AdminStyles';
import { createEvent, deleteEvent, Event } from '../../../api/events';

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
                onChange={(e) => setTitle(e.target.value)} 
                required 
              />
            </FormGroup>
            <FormGroup>
              <Label>Date</Label>
              <Input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                required 
              />
            </FormGroup>
          </div>
          
          <FormGroup>
            <Label>Description</Label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
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
                onChange={(e) => setLocation(e.target.value)} 
                required 
              />
            </FormGroup>
            <FormGroup>
              <Label>Capacity</Label>
              <Input 
                type="number"
                value={capacity} 
                onChange={(e) => setCapacity(e.target.value)} 
              />
            </FormGroup>
          </div>
          
          <FormGroup>
            <Label>Image URL</Label>
            <Input 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)} 
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
                    <DeleteButton onClick={() => handleDeleteEvent(event._id)}>
                      Delete
                    </DeleteButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Panel>
    </>
  );
}