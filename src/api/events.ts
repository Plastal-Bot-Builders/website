import { getJson, postJson, putJson, delJson } from './client';

// Base URL for all event endpoints
const BASE_PATH = '/events';

/**
 * Event interface
 */
export interface Event {
  _id: string;
  title: string;
  slug: string;
  description: string;
  date: string | Date;
  location: string;
  image?: string;
  capacity?: number;
  registrations?: string[];
  createdAt?: string;
}

/**
 * New Event payload
 */
export interface NewEvent {
  title: string;
  description: string;
  date: Date | string;
  location: string;
  image?: string;
  capacity?: number;
}

/**
 * Registration data
 */
export interface RegistrationData {
  fullName: string;
  email: string;
  phone?: string;
  institution?: string;
}

/**
 * Fetch all events
 */
export async function fetchEvents(): Promise<Event[]> {
  return getJson<Event[]>(BASE_PATH);
}

/**
 * Get an event by slug
 */
export async function getEventBySlug(slug: string): Promise<Event> {
  return getJson<Event>(`${BASE_PATH}/slug/${slug}`);
}

/**
 * Register for an event
 */
export async function registerForEvent(eventId: string, data: RegistrationData): Promise<any> {
  return postJson(`${BASE_PATH}/${eventId}/register`, data);
}

/**
 * Create a new event (admin only)
 */
export async function createEvent(event: NewEvent, token: string): Promise<Event> {
  return postJson(BASE_PATH, event, { Authorization: `Bearer ${token}` });
}

/**
 * Delete an event (admin only)
 */
export async function deleteEvent(id: string, token: string): Promise<void> {
  return delJson(`${BASE_PATH}/${id}`, { Authorization: `Bearer ${token}` });
}

/**
 * Update an event (admin only)
 */
export async function updateEvent(id: string, event: Partial<NewEvent>, token: string): Promise<Event> {
  return putJson(`${BASE_PATH}/${id}`, event, { Authorization: `Bearer ${token}` });
}