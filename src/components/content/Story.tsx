import React from 'react';
import { API_BASE } from '../../api/client';
import './story.css';
export type StorySection = { type: 'text' | 'image' | 'quote' | 'list'; heading: string; text: string; image: string; alt: string; caption: string };
export function imageSource(value?: string): string | undefined {
  if (!value) return undefined;
  if (value.startsWith('/uploads/')) return new URL(value, API_BASE).href;
  if (/^https?:\/\//i.test(value) || /^\/(?!\/)/.test(value)) return value;
  return undefined;
}
export function Story({ title, summary, image, sections = [], content = '' }: { title?: string; summary?: string; image?: string; sections?: StorySection[]; content?: string }) {
 return <article className="story">
  {title && <h1>{title}</h1>}{summary && <p className="story-lead">{summary}</p>}
  {imageSource(image) && <img className="story-cover" src={imageSource(image)} alt={title || ''} />}
  {content && <div className="story-copy">{content}</div>}
  {sections.map((section, i) => <section key={i}>
   {section.heading && <h2>{section.heading}</h2>}
   {section.type === 'image' ? <figure>{imageSource(section.image) && <img src={imageSource(section.image)} alt={section.alt} loading="lazy" />}{section.caption && <figcaption>{section.caption}</figcaption>}</figure>
    : section.type === 'quote' ? <blockquote>{section.text}{section.caption && <cite>{section.caption}</cite>}</blockquote>
    : section.type === 'list' ? <ul>{section.text.split('\n').filter(t => t.trim()).map((text, j) => <li key={j}>{text}</li>)}</ul>
    : <div className="story-copy">{section.text}</div>}
  </section>)}
 </article>;
}
