import type { StorySection } from '../components/content/Story';
import { getJson, postJson, putJson, delJson } from './client';

// Base URL for all event endpoints
const BASE_PATH = '/events';
interface EventResponse<T> { status: string; data: T; }

/**
 * Event interface
 */
export interface Event {
  _id: string;
  title: string;
  slug: string;
  description: string;
  sections?: StorySection[];
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
  sections?: StorySection[];
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
  const result = await getJson<EventResponse<Event[]>>(BASE_PATH);
  return result.data;
}

/**
 * Get an event by slug
 */
export async function getEventBySlug(slug: string): Promise<Event> {
  const result = await getJson<EventResponse<Event>>(`${BASE_PATH}/slug/${encodeURIComponent(slug)}`);
  return result.data;
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
  const result = await postJson<EventResponse<Event>>(BASE_PATH, event, { token });
  return result.data;
}

/**
 * Delete an event (admin only)
 */
export async function deleteEvent(id: string, token: string): Promise<void> {
  return delJson(`${BASE_PATH}/${id}`, { token }); // Fixed: use { token } instead of { Authorization }
}

/**
 * Update an event (admin only)
 */
export async function updateEvent(id: string, event: Partial<NewEvent>, token: string): Promise<Event> {
  const result = await putJson<EventResponse<Event>>(`${BASE_PATH}/${encodeURIComponent(id)}`, event, { token });
  return result.data;
}