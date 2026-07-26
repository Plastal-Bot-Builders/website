import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SmartImage from '../components/ui/SmartImage';
import { SEOConfig } from '../components/SEO';
import FadeContent from '../components/ui/FadeContent';
import { FaTrophy, FaMapMarkerAlt, FaFlag, FaCalendarAlt } from 'react-icons/fa';

const M = 'resources/Geneva2026/web';

/**
 * Reusable, CMS-like news data. To publish an update, add an entry here —
 * newest first. Entries with `link` render a call-to-action.
 */
type NewsItem = {
  id: string;
  date: string;
  category: 'Competition' | 'Workshop' | 'Event' | 'Partnership' | 'Launch' | 'Outreach' | 'Recognition';
  title: string;
  summary: string;
  image?: string;
  link?: { to: string; label: string };
};

const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'pdu-recognition',
    date: 'July 2026',
    category: 'Recognition',
    title: 'Hosted by Zambia’s Presidential Delivery Unit',
    summary:
      'Back home after Geneva, the team demonstrated their robot to government officials and shared the story of the journey with school pupils at the Presidential Delivery Unit.',
    image: `${M}/home-recognition-01.jpg`,
    link: { to: '/journey-to-geneva#bringing-it-home', label: 'Read this chapter' },
  },
  {
    id: 'geneva-2026',
    date: 'July 2026',
    category: 'Competition',
    title: 'Finalist Team at the AI for Good Robotics Competition, Geneva',
    summary:
      'Representing Zambia at the AI for Good Global Summit in Switzerland, the team competed against teams from around the world and was recognised as a Finalist Team.',
    image: `${M}/geneva-competition.jpg`,
    link: { to: '/journey-to-geneva#geneva', label: 'Read this chapter' },
  },
  {
    id: 'nationals-2026',
    date: 'April 2026',
    category: 'Competition',
    title: 'National champions at the AI for Good National Edition',
    summary:
      'The team won Zambia’s national edition of the competition, earning the right to represent the country at the international competition in Geneva.',
    image: `${M}/nationals-robot-01.jpg`,
    link: { to: '/journey-to-geneva#nationals', label: 'Read this chapter' },
  },
  {
    id: 'international-support',
    date: 'May – June 2026',
    category: 'Partnership',
    title: 'International robotics community backs the team',
    summary:
      'Mr. Chandra Polisetty donated two LEGO robotics kits and two expansion kits, while Technicbots provided ongoing technical mentorship — transforming what the team could build and test.',
    image: `${M}/swiss-prep-team-01.jpg`,
    link: { to: '/journey-to-geneva#global-community', label: 'Meet our partners' },
  },
  {
    id: 'spike-prime-bootcamp',
    date: '2025',
    category: 'Workshop',
    title: 'Spike Prime Robotics Bootcamp completed with CBU Robotics Club',
    summary:
      'A 6-week, hands-on bootcamp with 50+ learners covering LEGO Spike Prime robotics, programming, CAD and 3D printing — capped off with a scavenger hunt and a final team competition.',
    image: 'resources/SpikePrime/SCAVENGERHUNT1.jpg',
    link: { to: '/programs', label: 'Explore the program' },
  },
  {
    id: 'intro-robotics-workshop',
    date: '2024',
    category: 'Workshop',
    title: 'Introduction to Robotics & Programming Workshop',
    summary:
      'Learners as young as six built and programmed their first robots, exploring electronics, Tinkercad simulation and Arduino programming in a hands-on community workshop.',
    image: 'resources/IntroRoboticsWorkshop/IMG_4428.jpg',
    link: { to: '/programs', label: 'Explore the program' },
  },
  {
    id: 'technicbots-partnership',
    date: 'Ongoing',
    category: 'Partnership',
    title: 'International partnership with Technicbots — FTC Team 8565',
    summary:
      'Our collaboration with the FIRST Hall of Fame team from Plano, Texas continues to unlock equipment support, technical mentorship and international competition pathways for Zambian students.',
    image: 'resources/technicbots/teamphoto.png',
    link: { to: '/team/technicbots', label: 'About the partnership' },
  },
];

const NewsCard: React.FC<{ item: NewsItem }> = ({ item }) => (
  <article className="interactive-card overflow-hidden flex flex-col h-full">
    {item.image && <SmartImage src={item.image} alt={item.title} className="card-media" />}
    <div className="p-5 sm:p-6 flex flex-col flex-grow">
      <div className="flex items-center gap-3 mb-3">
        <span className="tag">{item.category}</span>
        <span className="type-caption">{item.date}</span>
      </div>
      <h3 className="type-h4 mb-2">{item.title}</h3>
      <p className="text-sm leading-relaxed opacity-90 mb-4 flex-grow">{item.summary}</p>
      {item.link && (
        <Link to={item.link.to} className="text-hex font-semibold text-sm hover:underline mt-auto">
          {item.link.label} →
        </Link>
      )}
    </div>
  </article>
);

const NewsPage: React.FC = () => {
  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash.substring(1))?.scrollIntoView({ block: 'start' });
      }, 150);
    }
  }, []);

  return (
    <>
      <SEOConfig
        title="News & Achievements | Plastal-Bot Builders"
        description="Milestones from Plastal-Bot Builders — international competitions, workshops, partnerships and community outreach across Zambia and beyond."
        image="/resources/Geneva2026/web/geneva-stage-celebration.jpg"
      />
      <div className="scroll-smooth focus:scroll-auto">
        <Header />

        {/* Hero */}
        <FadeContent blur duration={1000} easing="ease-out" initialOpacity={0}>
          <section className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <div className="max-w-7xl mx-auto">
              <h1 className="type-h1 mb-4">
                <span className="text-hex">News &</span> Achievements
              </h1>
              <p className="type-body max-w-2xl">
                Milestones from our journey — competitions, workshops, partnerships and
                community outreach. This page grows with every step we take.
              </p>
            </div>
          </section>
        </FadeContent>

        {/* Featured story — teaser into the full journey page */}
        <FadeContent blur duration={1000} easing="ease-out" initialOpacity={0} delay={100}>
          <section
            id="featured"
            className="w-full px-4 sm:px-6 lg:px-8 py-6"
            aria-labelledby="featured-story-title"
          >
            <div className="max-w-7xl mx-auto">
              <div className="interactive-card overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative min-h-[16rem] sm:min-h-[20rem]">
                    <SmartImage
                      src={`${M}/geneva-stage-celebration.jpg`}
                      alt="The Plastal-Bot Builders team celebrating on stage with their robot at the AI for Good Global Summit in Geneva"
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                  <div className="p-6 sm:p-8 lg:p-10">
                    <span className="badge-accent mb-4">
                      <FaTrophy aria-hidden="true" /> Featured Story
                    </span>
                    <h2 id="featured-story-title" className="type-h2 mb-4">
                      <span className="text-hex">The Road to Geneva</span>
                    </h2>
                    <p className="type-body mb-4">
                      The complete story of our biggest milestone — from the first robot built on a
                      hand-made practice field, through winning the national competition, to
                      representing Zambia at the AI for Good Robotics Competition in Switzerland.
                    </p>
                    <ul className="flex flex-wrap gap-2 mb-6">
                      <li className="tag"><FaMapMarkerAlt aria-hidden="true" />&nbsp;Geneva, Switzerland</li>
                      <li className="tag"><FaFlag aria-hidden="true" />&nbsp;Team Zambia</li>
                      <li className="tag"><FaCalendarAlt aria-hidden="true" />&nbsp;Mar – Jul 2026</li>
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to="/journey-to-geneva"
                        className="custom-button text-center"
                        style={{ textDecoration: 'none' }}
                      >
                        Read the Full Story
                      </Link>
                      <Link to="/journey-to-geneva#geneva" className="custom-button--ghost text-center">
                        Competition Highlights
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* All updates */}
        <FadeContent blur duration={1000} easing="ease-out" initialOpacity={0} delay={150}>
          <section
            className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
            aria-labelledby="all-updates-title"
          >
            <div className="max-w-7xl mx-auto">
              <h2 id="all-updates-title" className="type-h2 mb-8">
                <span className="text-hex">All</span> Updates
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {NEWS_ITEMS.map(item => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </section>
        </FadeContent>

        <Footer />
      </div>
    </>
  );
};

export default NewsPage;
