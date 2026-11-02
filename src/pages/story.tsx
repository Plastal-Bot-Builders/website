import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Story, imageSource } from '../components/content/Story';
import { fetchPostBySlug, Post } from '../api/posts';
import { getEventBySlug, Event } from '../api/events';
import { SEOConfig } from '../components/SEO';
import { EventRegistrationForm } from '../components/EventRegistration/EventRegistrationForm';
export default function StoryPage({ kind }: { kind: 'blog' | 'event' }) {
 const { slug = '' } = useParams();
 const [post, setPost] = useState<Post | null>(null);
 const [event, setEvent] = useState<Event | null>(null);
 const [error, setError] = useState('');
 useEffect(() => { let active = true; setPost(null); setEvent(null); setError('');
  (async () => { try { if (kind === 'blog') { const response = await fetchPostBySlug(slug); if (active) setPost(response.data); } else { const response = await getEventBySlug(slug); if (active) setEvent(response); } } catch (e) { if (active) setError(e instanceof Error ? e.message : 'Could not load this page.'); } })();
  return () => { active = false; };
 }, [kind, slug]);
 const item = post || event;
 return <><Header /><main style={{padding:'48px 24px',maxWidth:1000,margin:'auto'}}>
 <Link to={kind === 'blog' ? '/blogs' : '/events'}>← Back to {kind === 'blog' ? 'blogs' : 'events'}</Link>
 {error ? <p role="alert">{error}</p> : !item ? <p role="status">Loading…</p> : <>
 <SEOConfig title={`${item.title} | Plastal-Bot Builders`} description={post?.excerpt || event?.description || post?.content.slice(0,160) || item.title} image={imageSource(post?.coverImage || event?.image)} />
 {post && <p style={{margin:'24px 0'}}>By {post.author}</p>}
 {event && <p style={{margin:'24px 0'}}>{new Date(event.date).toLocaleDateString()} · {event.location}</p>}
 <Story title={item.title} summary={post?.excerpt || event?.description} image={post?.coverImage || event?.image} content={post?.content} sections={item.sections} />
 {event && (new Date(event.date) >= new Date() ? <section style={{marginTop:48}}><h2>Register for this event</h2><EventRegistrationForm eventId={event._id} eventName={event.title} /></section> : <p>Registration for this event has closed.</p>)}
 </>}
 </main><Footer /></>;
}
