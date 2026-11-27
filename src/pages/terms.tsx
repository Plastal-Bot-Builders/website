import React from 'react';
import { Link } from 'react-router-dom';
import { LuDownload, LuImage, LuScale, LuShare2 } from 'react-icons/lu';
import LegalPage, { ContactButtons, EMAIL, LegalSection } from '../components/LegalPage';

/** Terms of Use for the whole site (Plastal-Bot Builders and RoboCore pages). Plain language; Zambian law. */

const UPDATED = '27 November 2026';

const sections: LegalSection[] = [
  {
    id: 'about',
    title: 'Who runs this site',
    body: (
      <p>
        This website, including the RoboCore pages, is run by Plastal-Bot Builders, a registered company in Zambia,
        based in Lusaka.
      </p>
    ),
  },
  {
    id: 'using',
    title: 'Using the site',
    body: (
      <>
        <p>
          You're welcome to browse the site, share links to it and download what we offer for download. Please don't:
        </p>
        <ul>
          <li>try to break into, overload or disrupt the site or its server;</li>
          <li>send spam, or false, offensive or harmful content through our forms or chat;</li>
          <li>fill in a form with someone else's details without their permission.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'content',
    title: 'Our content',
    body: (
      <>
        <p>
          The text, photos, videos, logos and designs on this site belong to Plastal-Bot Builders or to the people who
          made them and let us use them. "Plastal-Bot Builders" and "RoboCore" and their logos are our names and marks.
          Please ask us before reusing our photos, logos or other content. You're welcome to quote short parts with a
          link back to the page.
        </p>
        <p>
          The illustrations are by <a href="https://storyset.com" target="_blank" rel="noopener noreferrer">Storyset</a>.
          Photos taken by others are credited where they appear.
        </p>
      </>
    ),
  },
  {
    id: 'downloads',
    title: 'RoboCore software and design files',
    body: (
      <p>
        The RoboCore app and the design files we publish are free to download. Where a download comes with its own
        licence, that licence applies to it. RoboCore is still in development: downloads are provided as they are,
        without guarantees, and you use them at your own risk.
      </p>
    ),
  },
  {
    id: 'forms',
    title: 'Forms, membership and events',
    body: (
      <p>
        Please give accurate information when you fill in a form. Membership depends on approval and on following our
        rules and code of conduct. Events and programmes can have their own conditions, such as a parent or guardian's
        consent for participants under 18. We will tell you about them when you register.
      </p>
    ),
  },
  {
    id: 'chat',
    title: 'The chat assistant',
    body: (
      <p>
        The chat assistant's answers are written by AI and can be wrong, so check anything important with us. Its
        answers are not professional, medical, legal or financial advice.
      </p>
    ),
  },
  {
    id: 'links',
    title: 'Links to other sites',
    body: (
      <p>
        We link to other websites, such as YouTube, GitHub, WhatsApp and social media. We are not responsible for their
        content or for how they handle your information.
      </p>
    ),
  },
  {
    id: 'no-guarantees',
    title: 'No guarantees',
    body: (
      <p>
        We work to keep the site accurate and available, but information can go out of date and the site may sometimes
        be unavailable. Plans described here, such as programmes, events and RoboCore, can change. As far as the law
        allows, we provide the site as it is and are not liable for losses that come from using it or relying on it.
        Nothing in these terms takes away rights you have under Zambian law that cannot be limited.
      </p>
    ),
  },
  {
    id: 'privacy',
    title: 'Your privacy',
    body: (
      <p>
        How we collect and use personal information is explained in our <Link to="/privacy">Privacy Policy</Link>.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    body: (
      <p>
        We may update these terms from time to time. The date at the top shows when they last changed. If you keep using
        the site after a change, the new terms apply.
      </p>
    ),
  },
  {
    id: 'law',
    title: 'The law that applies',
    body: (
      <>
        <p>
          These terms are governed by the laws of Zambia, and the courts of Zambia can hear any dispute about them. If
          something goes wrong, please talk to us first at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>: most things can be
          sorted out quickly.
        </p>
        <ContactButtons />
      </>
    ),
  },
];

const Terms: React.FC = () => (
  <LegalPage
    current="terms"
    title="Terms of Use"
    seoTitle="Terms of Use | Plastal-Bot Builders"
    description="The terms for using the Plastal-Bot Builders website, including the RoboCore pages and downloads."
    updated={UPDATED}
    lead={
      <p>
        The ground rules for using this website, including the RoboCore pages. By using the site you agree to them. How
        we handle personal information is in our <Link to="/privacy">Privacy Policy</Link>.
      </p>
    }
    glance={[
      { Icon: LuShare2, title: 'Browse, share, learn', text: 'Read anything here and share links freely.' },
      { Icon: LuImage, title: 'Ask before reusing', text: 'Our photos, logos and designs need our permission.' },
      { Icon: LuDownload, title: 'Free RoboCore downloads', text: 'Provided as they are, while RoboCore is in development.' },
      { Icon: LuScale, title: 'Zambian law applies', text: 'And if something goes wrong, talk to us first.' },
    ]}
    art={{
      src: 'resources/Illustrations/AcceptTerms.svg',
      alt: 'Illustration of a woman pressing Accept on a page of terms',
    }}
    sections={sections}
  />
);

export default Terms;
