import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { IconType } from 'react-icons';
import { LuCheck, LuChevronDown, LuMail } from 'react-icons/lu';
import { FaWhatsapp } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
import { SEOConfig } from './SEO';
import ThemedImage from '../theme/ThemedImage';
import './LegalPage.css';

/**
 * The frame for the Privacy Policy and Terms of Use (src/pages/privacy.tsx, terms.tsx): a header card with a
 * Privacy/Terms switch and an "at a glance" summary, then a contents list (sticky on wide screens, folded on phones)
 * beside the document. Each section has an id, so /privacy#your-rights links straight to it.
 */

export type LegalSection = { id: string; title: string; body: React.ReactNode };
export type GlanceItem = { Icon: IconType; title: string; text: string };

type Props = {
  current: 'privacy' | 'terms';
  title: string;
  seoTitle: string;
  description: string;
  lead: React.ReactNode;
  updated: string;
  glance: GlanceItem[];
  /** The illustration beside the title: resources/Illustrations/<Name>.svg with a live version in live/ */
  art: { src: string; alt: string };
  sections: LegalSection[];
};

export const EMAIL = 'plastalbotbuilders@gmail.com';
const WHATSAPP_URL = 'https://wa.me/260975608103';

/** Label + description rows, for lists of things (what we collect, who we share with, how long we keep it). */
export const Rows: React.FC<{ items: [React.ReactNode, React.ReactNode][] }> = ({ items }) => (
  <dl className="legal-rows">
    {items.map(([label, text], i) => (
      <div key={i} className="legal-row">
        <dt>{label}</dt>
        <dd>{text}</dd>
      </div>
    ))}
  </dl>
);

/** A ticked checklist (your rights). */
export const Checks: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
  <ul className="legal-checks">
    {items.map((item, i) => (
      <li key={i}>
        <LuCheck aria-hidden="true" /> {item}
      </li>
    ))}
  </ul>
);

/** Email and WhatsApp buttons. */
export const ContactButtons: React.FC = () => (
  <div className="legal-contact">
    <a href={`mailto:${EMAIL}`}>
      <LuMail aria-hidden="true" /> {EMAIL}
    </a>
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
      <FaWhatsapp aria-hidden="true" /> WhatsApp +260 975 608103
    </a>
  </div>
);

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isWide = () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches;

const LegalPage: React.FC<Props> = ({ current, title, seoTitle, description, lead, updated, glance, art, sections }) => {
  const [active, setActive] = useState(sections[0]?.id);
  const [tocOpen, setTocOpen] = useState(isWide);

  // Highlight the section being read.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const els = sections.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-140px 0px -55% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  // Arriving with a #section in the address: go to it once the page has drawn.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return undefined;
    const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }), 300);
    return () => window.clearTimeout(t);
  }, []);

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
    setActive(id);
    if (!isWide()) setTocOpen(false);
  };

  return (
    <>
      <SEOConfig title={seoTitle} description={description} />
      <div className="scroll-smooth focus:scroll-auto">
        <Header />
        <div className="legal w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Same width as the menu bar (Header.tsx, max-w-7xl) and the other pages, so the edges line up. */}
          <div className="max-w-7xl mx-auto">
            <header className="legal-hero">
              <div className="legal-hero-top">
                <div>
                  <nav className="legal-switch" aria-label="Legal pages">
                    <Link to="/privacy" aria-current={current === 'privacy' ? 'page' : undefined}>Privacy Policy</Link>
                    <Link to="/terms" aria-current={current === 'terms' ? 'page' : undefined}>Terms of Use</Link>
                  </nav>
                  <h1 className="legal-title">{title}</h1>
                  <div className="legal-lead">{lead}</div>
                  <p className="legal-meta">Last updated {updated}</p>
                </div>
                {/* A live (moving) Storyset illustration, in the site's colours for each theme */}
                <div className="legal-hero-art">
                  <ThemedImage src={art.src} alt={art.alt} className="w-full h-auto" />
                </div>
              </div>
              <ul className="legal-glance" aria-label="At a glance">
                {glance.map(({ Icon, title: t, text }) => (
                  <li key={t} className="legal-glance-item">
                    <span className="legal-glance-icon" aria-hidden="true"><Icon /></span>
                    <div>
                      <strong>{t}</strong>
                      <span>{text}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </header>

            <div className="legal-layout">
              <details
                className="legal-toc"
                open={tocOpen}
                onToggle={(e) => setTocOpen((e.currentTarget as HTMLDetailsElement).open)}
              >
                <summary>
                  On this page <LuChevronDown aria-hidden="true" />
                </summary>
                <nav aria-label="On this page">
                  <ol>
                    {sections.map((s, i) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className={active === s.id ? 'is-active' : undefined}
                          aria-current={active === s.id ? 'location' : undefined}
                          onClick={(e) => goTo(e, s.id)}
                        >
                          <span>{i + 1}</span>
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </details>

              <article className="legal-doc" aria-label={title}>
                {sections.map((s, i) => (
                  <section key={s.id} id={s.id} className="legal-section" aria-labelledby={`${s.id}-h`}>
                    <h2 id={`${s.id}-h`}>
                      <span className="legal-num" aria-hidden="true">{i + 1}</span>
                      {s.title}
                    </h2>
                    <div className="legal-prose">{s.body}</div>
                  </section>
                ))}
              </article>
            </div>

            <p className="legal-foot">
              Questions about this page? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LegalPage;
