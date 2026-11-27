import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { LuCopy, LuMail } from 'react-icons/lu';
import { SEOConfig } from '../components/SEO';
import Tile from '../components/RoboCore/Tile';
import { CONTACT, SOCIALS, WHATSAPP, scrollToSection, whatsappLink } from '../components/RoboCore/shared';

/*
 * /robocore/pilot: where a school, a hub or a partner writes to us. Every "ask about a pilot" and "partner with us"
 * button on the RoboCore pages leads here (PILOT in shared.ts); "/robocore/pilot#partner" opens it for a partner.
 *
 * The form has no server behind it and stores nothing. It writes the visitor's message and hands it to WhatsApp
 * (WHATSAPP in shared.ts; no WhatsApp button while that is empty) or to their email app, where they press send.
 * "Copy the message" is for computers with no email app set up, where an email link does nothing.
 *
 * Wording: RoboCore is a prototype and pilots come next, so nothing here promises a pilot, a date or a price.
 */

type Kind = 'school' | 'hub' | 'partner' | 'other';
const KINDS: { value: Kind; label: string; heading: string }[] = [
  { value: 'school', label: 'A school', heading: 'RoboCore pilot enquiry' },
  { value: 'hub', label: 'An innovation hub or club', heading: 'RoboCore pilot enquiry' },
  { value: 'partner', label: 'A partner or sponsor', heading: 'RoboCore partnership enquiry' },
  { value: 'other', label: 'Someone else', heading: 'RoboCore enquiry' },
];

interface Fields {
  kind: Kind;
  name: string;
  org: string;
  town: string;
  learners: string;
  note: string;
}
type Needed = 'name' | 'org' | 'town';
const NEEDED: { key: Needed; error: string }[] = [
  { key: 'name', error: 'Please enter your name.' },
  { key: 'org', error: 'Please enter your school or organisation.' },
  { key: 'town', error: 'Please enter your town or city.' },
];
type Sent = 'whatsapp' | 'email' | 'copied' | 'copy-blocked';

const kindOf = (f: Fields) => KINDS.find((k) => k.value === f.kind) || KINDS[0];

/** The message as the visitor will send it: short lines that read well in WhatsApp and in an email. */
function messageOf(f: Fields): string {
  const kind = kindOf(f);
  return [
    kind.heading,
    `Name: ${f.name.trim()}`,
    `From: ${f.org.trim()} (${kind.label.toLowerCase()})`,
    `Town: ${f.town.trim()}`,
    f.learners.trim() && `Learners: ${f.learners.trim()}`,
    f.note.trim() && `\n${f.note.trim()}`,
  ]
    .filter(Boolean)
    .join('\n');
}

const RoboCorePilot: React.FC = () => {
  const { hash } = useLocation();
  const [f, setF] = useState<Fields>({ kind: 'school', name: '', org: '', town: '', learners: '', note: '' });
  const [errors, setErrors] = useState<Partial<Record<Needed, string>>>({});
  const [sent, setSent] = useState<Sent | null>(null);
  const form = useRef<HTMLFormElement>(null);

  // "/robocore/pilot#partner" (the partner buttons on the other pages) opens the form for a partner.
  useEffect(() => {
    if (hash === '#partner') setF((old) => ({ ...old, kind: 'partner' }));
  }, [hash]);

  const set =
    (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setF((old) => ({ ...old, [key]: value }));
      setSent(null);
      if (key in errors) setErrors((old) => ({ ...old, [key]: undefined }));
    };

  /** True when the three needed answers are there; otherwise shows what is missing and goes to the first one. */
  const complete = (): boolean => {
    const missing = NEEDED.filter(({ key }) => !f[key].trim());
    setErrors(Object.fromEntries(missing.map(({ key, error }) => [key, error])));
    if (missing.length) form.current?.querySelector<HTMLElement>(`#rc-pilot-${missing[0].key}`)?.focus();
    return !missing.length;
  };

  const send = (via: 'whatsapp' | 'email') => {
    if (!complete()) return;
    const text = messageOf(f);
    if (via === 'whatsapp') {
      window.open(whatsappLink(text), '_blank', 'noopener,noreferrer');
    } else {
      const subject = `${kindOf(f).heading}: ${f.org.trim()}`;
      // Email links want CRLF line ends (RFC 6068). '_self': the email app opens and this page stays as it is.
      const body = encodeURIComponent(text.replace(/\n/g, '\r\n'));
      window.open(`mailto:${CONTACT}?subject=${encodeURIComponent(subject)}&body=${body}`, '_self');
    }
    setSent(via);
  };

  const copy = async () => {
    if (!complete()) return;
    try {
      await navigator.clipboard.writeText(messageOf(f));
      setSent('copied');
    } catch {
      setSent('copy-blocked');
    }
  };

  const writeAsPartner = () => {
    setF((old) => ({ ...old, kind: 'partner' }));
    setSent(null);
    scrollToSection('rc-pilot-form');
    form.current?.querySelector<HTMLElement>('#rc-pilot-name')?.focus({ preventScroll: true });
  };

  const school = f.kind === 'school';
  const field = (key: Needed) => ({
    id: `rc-pilot-${key}`,
    className: 'rc-input',
    value: f[key],
    onChange: set(key),
    required: true,
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `rc-pilot-${key}-error` : undefined,
  });
  const problem = (key: Needed) =>
    errors[key] && (
      <p id={`rc-pilot-${key}-error`} className="rc-field-error">
        {errors[key]}
      </p>
    );

  return (
    <>
      <SEOConfig
        title="Bring RoboCore to your school | RoboCore"
        description="Ask about a RoboCore pilot for your school or innovation hub in Zambia, or about partnering with the team that builds it."
        image="/resources/social/og-robocore.jpg"
      />

      {/* ---------- the form ---------- */}
      <section className="rc-hero" aria-labelledby="rc-pilot-title">
        <div className="rc-wrap">
          <div className="rc-hero-card rc-sub-hero rc-pilot-hero">
            <div className="rc-contours" aria-hidden="true" />
            <div className="rc-hero-text">
              <p className="rc-eyebrow rc-sub-eyebrow">Get involved</p>
              <h1 id="rc-pilot-title" className="rc-display rc-sub-title">
                Bring RoboCore to your school
              </h1>
              <p className="rc-lead">Tell us about your school, hub or organisation, and we will get back to you.</p>
              <p className="rc-hero-status">
                RoboCore is a prototype. Pilots with schools and innovation hubs come next, so there are no dates or
                prices yet.
              </p>
              {WHATSAPP && (
                <div className="rc-hero-actions">
                  <a className="rc-btn rc-btn-outline" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp aria-hidden="true" /> Chat on WhatsApp
                  </a>
                </div>
              )}
            </div>

            <form
              id="rc-pilot-form"
              ref={form}
              className="rc-pilot-panel"
              noValidate
              aria-labelledby="rc-pilot-form-title"
              onSubmit={(e) => {
                e.preventDefault();
                send(WHATSAPP ? 'whatsapp' : 'email');
              }}
            >
              <h2 id="rc-pilot-form-title" className="rc-tile-title">
                Send us a message
              </h2>

              <div className="rc-field">
                <label htmlFor="rc-pilot-kind">I am writing from</label>
                <select id="rc-pilot-kind" className="rc-input" value={f.kind} onChange={set('kind')}>
                  {KINDS.map((k) => (
                    <option key={k.value} value={k.value}>
                      {k.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rc-field">
                <label htmlFor="rc-pilot-name">Your name</label>
                <input type="text" autoComplete="name" maxLength={80} {...field('name')} />
                {problem('name')}
              </div>

              <div className="rc-field-pair">
                <div className="rc-field">
                  <label htmlFor="rc-pilot-org">{school ? 'School' : 'Organisation'}</label>
                  <input type="text" autoComplete="organization" maxLength={120} {...field('org')} />
                  {problem('org')}
                </div>
                <div className="rc-field">
                  <label htmlFor="rc-pilot-town">Town or city</label>
                  <input type="text" autoComplete="address-level2" maxLength={80} {...field('town')} />
                  {problem('town')}
                </div>
              </div>

              <div className="rc-field">
                <label htmlFor="rc-pilot-learners">
                  About how many learners? <span className="rc-field-optional">(optional)</span>
                </label>
                <input
                  id="rc-pilot-learners"
                  className="rc-input"
                  type="text"
                  inputMode="numeric"
                  maxLength={20}
                  value={f.learners}
                  onChange={set('learners')}
                />
              </div>

              <div className="rc-field">
                <label htmlFor="rc-pilot-note">
                  Anything else we should know? <span className="rc-field-optional">(optional)</span>
                </label>
                <textarea id="rc-pilot-note" className="rc-input" rows={3} maxLength={600} value={f.note} onChange={set('note')} />
              </div>

              <div className="rc-pilot-actions">
                {WHATSAPP && (
                  <button type="submit" className="rc-btn rc-btn-primary">
                    <FaWhatsapp aria-hidden="true" /> Send on WhatsApp
                  </button>
                )}
                <button
                  type={WHATSAPP ? 'button' : 'submit'}
                  className={`rc-btn ${WHATSAPP ? 'rc-btn-outline' : 'rc-btn-primary'}`}
                  onClick={WHATSAPP ? () => send('email') : undefined}
                >
                  <LuMail aria-hidden="true" /> Send by email
                </button>
                <button type="button" className="rc-btn rc-btn-outline" onClick={copy}>
                  <LuCopy aria-hidden="true" /> Copy the message
                </button>
              </div>

              <p className="rc-pilot-status" role="status" hidden={!sent}>
                {sent === 'whatsapp' && 'WhatsApp has your message ready. Press send there to finish.'}
                {sent === 'email' &&
                  `Your email app has the message ready. Press send there to finish. If nothing opened, copy the message and email it to ${CONTACT}.`}
                {sent === 'copied' && `Message copied. Paste it into an email to ${CONTACT}.`}
                {sent === 'copy-blocked' && `This browser did not allow copying. Please write to ${CONTACT}.`}
              </p>

              <p className="rc-note">
                This page stores nothing. Your message opens in {WHATSAPP ? 'WhatsApp or your email app' : 'your email app'},
                and you send it from there.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ---------- what happens next ---------- */}
      <section className="rc-section rc-section--bento" aria-labelledby="rc-pilot-next">
        <div className="rc-wrap">
          <div className="rc-section-head">
            <p className="rc-eyebrow">What happens next</p>
            <h2 id="rc-pilot-next" className="rc-h2">
              After you write to us
            </h2>
          </div>
          <div className="rc-bento">
            <Tile span="rc-c4">
              <p className="rc-eyebrow">Step 1</p>
              <h3 className="rc-tile-title">You write to us</h3>
              <p className="rc-body">Tell us where you are and how many learners you have in mind.</p>
            </Tile>
            <Tile span="rc-c4">
              <p className="rc-eyebrow">Step 2</p>
              <h3 className="rc-tile-title">We reply</h3>
              <p className="rc-body">We ask about your learners, your classroom and what you would like to do with RoboCore.</p>
            </Tile>
            <Tile span="rc-c4">
              <p className="rc-eyebrow">Step 3</p>
              <h3 className="rc-tile-title">We keep you posted</h3>
              <p className="rc-body">RoboCore is still a prototype. We tell you when pilot kits are ready and what a pilot would involve.</p>
            </Tile>
            <Tile span="rc-c6 rc-full-md" tone="yellow" contours>
              <h3 className="rc-tile-title">Partners and sponsors</h3>
              <p className="rc-tile-text">Help us build and test the first RoboCore kits, and bring them to more schools.</p>
              <button type="button" className="rc-btn rc-btn-primary rc-tile-cta" onClick={writeAsPartner}>
                Write to us about partnering
              </button>
            </Tile>
            <Tile span="rc-c6 rc-full-md">
              <h3 className="rc-tile-title">Other ways to reach us</h3>
              <ul className="rc-contact-list">
                {WHATSAPP && (
                  <li>
                    <a className="rc-link" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                      <FaWhatsapp aria-hidden="true" /> Chat on WhatsApp
                    </a>
                  </li>
                )}
                <li>
                  <a className="rc-link" href={`mailto:${CONTACT}`}>
                    <LuMail aria-hidden="true" /> {CONTACT}
                  </a>
                </li>
                {SOCIALS.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a className="rc-link" href={href} target="_blank" rel="noopener noreferrer">
                      <Icon aria-hidden="true" /> {label}
                    </a>
                  </li>
                ))}
              </ul>
            </Tile>
          </div>
        </div>
      </section>
    </>
  );
};

export default RoboCorePilot;
