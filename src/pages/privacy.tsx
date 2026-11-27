import React from 'react';
import { Link } from 'react-router-dom';
import { LuCookie, LuShieldCheck, LuUserCheck, LuUsers } from 'react-icons/lu';
import LegalPage, { Checks, ContactButtons, EMAIL, LegalSection, Rows } from '../components/LegalPage';

/**
 * Privacy Policy. Written from what the site really does (checked in the code on 27 Nov 2026): the membership,
 * event and newsletter forms post to our backend (Render, database); approval emails go out by SMTP; the chat
 * assistant sends questions to Ollama and saves nothing; Cloudflare Web Analytics (no cookies); YouTube embeds are
 * click-to-play from youtube-nocookie.com; localStorage holds the theme (and the admin sign-in token). If any of
 * that changes, change this page and its date.
 */

const UPDATED = '27 November 2026';

const sections: LegalSection[] = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    body: (
      <p>
        Plastal-Bot Builders is a registered company in Zambia, based in Lusaka. We are responsible for the personal
        information collected through this website, including the RoboCore pages.
      </p>
    ),
  },
  {
    id: 'what-we-collect',
    title: 'What we collect and why',
    body: (
      <>
        <p>We only collect what you choose to send us, plus anonymous visit counts.</p>
        <Rows
          items={[
            [
              'Membership applications',
              <>
                Your name, email, phone number, date of birth, gender, city and country, occupation, social media links
                (if you add them), background, skills and interests, experience, availability, how you heard about us
                and any comments. We use them to review your application, contact you about it and, if you join, run
                your membership. We email you when we approve or decline an application.
              </>,
            ],
            [
              'Event registrations',
              'Your name and email, plus your phone number and school or organisation if you give them. We use them to organise the event and contact you about it.',
            ],
            ['Newsletter', 'Your email address, to send you news from Plastal-Bot Builders and RoboCore.'],
            [
              'Messages to us',
              "What you send us by email or WhatsApp, so we can reply. The RoboCore pilot page doesn't send anything itself: it opens your own email or WhatsApp app with a message for you to send.",
            ],
            [
              'Chat assistant',
              "The questions you type are sent to an AI service (Ollama) to write an answer. We don't save your chats. Please don't type personal or sensitive information into it.",
            ],
            [
              'Visitor statistics',
              "Cloudflare Web Analytics counts visits and pages viewed. It uses no cookies and doesn't build a profile of you.",
            ],
          ]}
        />
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies and your browser',
    body: (
      <>
        <p>
          We don't use advertising or tracking cookies. The site remembers your light or dark theme in your browser's
          storage. Team members who sign in to edit the site also keep a sign-in token there.
        </p>
        <p>
          Videos only load from YouTube when you press play, using YouTube's privacy-enhanced mode
          (youtube-nocookie.com). Once a video plays, YouTube's own privacy policy applies.
        </p>
      </>
    ),
  },
  {
    id: 'legal-basis',
    title: 'Why we may use it',
    body: (
      <p>
        We follow Zambia's Data Protection Act No. 3 of 2021. We use your information because you agreed to it (when
        you fill in a form or subscribe), to do what you asked us to do (such as registering you for an event), and to
        keep the site running and secure. You can withdraw your agreement at any time.
      </p>
    ),
  },
  {
    id: 'children',
    title: 'Children and young people',
    body: (
      <p>
        Many of the young people we work with are under 18. If you are under 18, please ask a parent or guardian to
        agree before you fill in a form on this site, and to help you with it. If we find we hold information about
        someone under 18 without that agreement, we will delete it or ask a parent or guardian to confirm.
      </p>
    ),
  },
  {
    id: 'sharing',
    title: 'Who we share it with',
    body: (
      <>
        <p>
          We never sell your information or share it with other organisations for their own use. These service
          providers handle it for us, only so we can run the website and our programmes:
        </p>
        <Rows
          items={[
            ['Cloudflare', 'Hosts this website and provides the visitor statistics.'],
            ['Render', 'Runs the server that receives our forms. Our database provider stores what you submit.'],
            ['Email', 'Our email provider sends membership emails. Emails you send us are handled by Google (Gmail).'],
            ['Ollama', "Writes the chat assistant's answers."],
            ['WhatsApp (Meta)', 'Carries your messages if you contact us on WhatsApp.'],
          ]}
        />
        <p>
          Some of these companies store information outside Zambia, for example in the United States or Europe. We
          only use well-established providers with their own security and privacy commitments. We may also share
          information when the law requires it.
        </p>
      </>
    ),
  },
  {
    id: 'how-long',
    title: 'How long we keep it',
    body: (
      <>
        <Rows
          items={[
            ['Membership', 'While you are a member, and up to two years after you leave.'],
            ['Declined applications', 'Up to 12 months.'],
            ['Event registrations', 'Up to 12 months after the event.'],
            ['Newsletter', 'Until you ask us to remove you.'],
            ['Messages', 'As long as we need them to answer and follow up.'],
          ]}
        />
        <p>After that, we delete the information or remove anything that identifies you.</p>
      </>
    ),
  },
  {
    id: 'security',
    title: 'Keeping it safe',
    body: (
      <p>
        The site uses an encrypted connection (HTTPS). Only team members who need to see form submissions can see them,
        and our editing tools are password-protected. No system is perfectly secure: if something goes wrong that
        affects your information, we will tell you, and the authorities where the law requires.
      </p>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    body: (
      <>
        <p>You can ask us to:</p>
        <Checks
          items={[
            'Show you what we hold about you, and give you a copy',
            'Correct anything that is wrong',
            'Delete your information',
            'Stop using it, or stop emailing you',
            'Withdraw an agreement you gave earlier',
            'Explain anything in this policy',
          ]}
        />
        <p>
          Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. We may need to check that it's you, and we will reply as soon as
          we can, within 30 days. If you're not happy with how we handled your information, you can complain to
          Zambia's Office of the Data Protection Commissioner.
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        When what we collect or how we use it changes, we will update this page and the date at the top. If a change
        matters to you, we will say so on the site or tell you by email.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact us',
    body: (
      <>
        <p>Questions or requests about your information? Get in touch:</p>
        <ContactButtons />
      </>
    ),
  },
];

const Privacy: React.FC = () => (
  <LegalPage
    current="privacy"
    title="Privacy Policy"
    seoTitle="Privacy Policy | Plastal-Bot Builders"
    description="How Plastal-Bot Builders collects, uses and protects personal information on its website, and the choices you have."
    updated={UPDATED}
    lead={
      <p>
        What personal information we collect through this website, why, who helps us handle it, and the choices you
        have. How you may use the site is covered in our <Link to="/terms">Terms of Use</Link>.
      </p>
    }
    glance={[
      { Icon: LuShieldCheck, title: 'We never sell your data', text: 'Only a few service providers handle it, to run the site for us.' },
      { Icon: LuCookie, title: 'No tracking cookies', text: 'Visit counts are anonymous and cookie-free.' },
      { Icon: LuUserCheck, title: "You're in control", text: 'Ask for a copy, a correction or deletion at any time.' },
      { Icon: LuUsers, title: 'Under 18?', text: 'A parent or guardian agrees before you fill in a form.' },
    ]}
    art={{
      src: 'resources/Illustrations/PrivacyPolicy.svg',
      alt: 'Illustration of a woman beside a web page showing a privacy shield',
    }}
    sections={sections}
  />
);

export default Privacy;
