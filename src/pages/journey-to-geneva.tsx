import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SEOConfig } from '../components/SEO';
import SmartImage from '../components/ui/SmartImage';
import FadeContent from '../components/ui/FadeContent';
import StoryChapter from '../components/Journey/StoryChapter';
import PhotoGrid, { Photo } from '../components/Journey/PhotoGrid';
import StoryVideo from '../components/Journey/StoryVideo';
import MediaBento from '../components/Journey/MediaBento';
import LogoPlate from '../components/Journey/LogoPlate';
import PartnerCard from '../components/Journey/PartnerCard';
import {
  FaTrophy, FaFlag, FaMapMarkerAlt, FaCalendarAlt, FaRobot,
  FaHandsHelping, FaLightbulb, FaUsers, FaHeart,
} from 'react-icons/fa';

const M = 'resources/Geneva2026/web';

const CHAPTERS = [
  { id: 'building', label: '01 · Building' },
  { id: 'nationals', label: '02 · National Champions' },
  { id: 'levelling-up', label: '03 · Levelling Up' },
  { id: 'partners', label: '04 · Our Partners' },
  { id: 'global-community', label: '05 · Global Community' },
  { id: 'geneva', label: '06 · Geneva' },
  { id: 'bringing-it-home', label: '07 · Bringing It Home' },
];

const BENTO_BUILD: Photo[] = [
  { src: `${M}/prep-build-01.jpg`, alt: 'The first competition robot mid-build, standing on the team’s practice field' },
  { src: `${M}/prep-build-04.jpg`, alt: 'A team member programming the robot on a laptop beside the practice field' },
];

const BUILD_PHOTOS: Photo[] = [
  { src: `${M}/prep-build-03.jpg`, alt: 'Measuring distances on the practice field with a tape measure to tune the robot’s movement' },
  { src: `${M}/prep-build-05.jpg`, alt: 'The robot lined up against coloured blocks during a mission run' },
  { src: `${M}/prep-build-02.jpg`, alt: 'Close-up of the robot’s drivetrain and attachment built from LEGO components' },
  { src: `${M}/prep-build-06.jpg`, alt: 'Hands placing the robot at the starting position for another test run' },
];

const BENTO_NATIONALS: Photo[] = [
  { src: `${M}/nationals-robot-01.jpg`, alt: 'The national competition robot photographed from the side, showing its arm mechanism' },
  { src: `${M}/nationals-robot-03.jpg`, alt: 'Top-down view of the competition robot and its lifting attachment' },
];

const NATIONALS_PHOTOS: Photo[] = [
  { src: `${M}/nationals-robot-02.jpg`, alt: 'The robot outdoors, fully assembled ahead of the national competition' },
  { src: `${M}/nationals-robot-04.jpg`, alt: 'Another angle of the finished national competition robot' },
];

const BENTO_SWISS: Photo[] = [
  { src: `${M}/swiss-prep-proto-01.jpg`, alt: 'A tall robot prototype built for the international competition' },
  { src: `${M}/swiss-prep-team-01.jpg`, alt: 'Team members and a mentor working through a build together at a workshop table' },
];

const PROTO_PHOTOS: Photo[] = [
  { src: `${M}/swiss-prep-proto-02.jpg`, alt: 'A second prototype with a different drivetrain layout' },
  { src: `${M}/swiss-prep-proto-03.jpg`, alt: 'A third prototype design being evaluated side by side with the others' },
  { src: `${M}/swiss-prep-proto-04.jpg`, alt: 'Overhead view of a prototype showing its sensor placement' },
];

const TEAM_PHOTOS: Photo[] = [
  { src: `${M}/swiss-prep-team-02.jpg`, alt: 'A mentoring session in progress, with robotics kits open on the table' },
  { src: `${M}/swiss-prep-team-03.jpg`, alt: 'The team working across several kits and laptops during a preparation session' },
  { src: `${M}/swiss-prep-site-01.jpg`, alt: 'Team members in hard hats and high-visibility vests during a site visit' },
];

const GENEVA_PHOTOS: Photo[] = [
  { src: `${M}/geneva-airport.jpg`, alt: 'A team member boarding the flight to Switzerland with luggage in hand' },
  { src: `${M}/geneva-booth.jpg`, alt: 'The team presenting their robot to visitors at the AI for Good Global Summit' },
  { src: `${M}/geneva-pit.jpg`, alt: 'Two team members working at their pit table during the competition' },
  { src: `${M}/geneva-prematch.jpg`, alt: 'Final checks on the robot and code shortly before a match' },
  { src: `${M}/geneva-programming.jpg`, alt: 'Team members programming the robot together at the competition venue' },
  { src: `${M}/geneva-teamwork.jpg`, alt: 'The team troubleshooting the robot side by side at the work table' },
  { src: `${M}/geneva-worktable.jpg`, alt: 'Rebuilding an attachment between rounds at the competition work table' },
  { src: `${M}/geneva-competition.jpg`, alt: 'Team Zambia competing at the robotics challenge tables in Geneva' },
  { src: `${M}/geneva-strategy.jpg`, alt: 'Team members reviewing strategy between competition rounds' },
  { src: `${M}/geneva-swiss-team.jpg`, alt: 'Plastal-Bot Builders members with a Swiss team at the competition venue' },
  { src: `${M}/geneva-ambassador.jpg`, alt: 'Guests visiting the team’s table to see the robot demonstrated' },
  { src: `${M}/geneva-summit-guest.jpg`, alt: 'Meeting fellow delegates on the summit exhibition floor' },
];

const HOME_PHOTOS: Photo[] = [
  { src: `${M}/home-recognition-02.jpg`, alt: 'A team member demonstrating the robot to government officials' },
  { src: `${M}/home-recognition-03.jpg`, alt: 'The team standing with officials and school pupils at the recognition event' },
  { src: `${M}/home-recognition-04.jpg`, alt: 'Guests viewing the robotics exhibits on display at the event' },
];

const SUPPORTERS = [
  { name: 'MTN Zambia', src: `${M}/logos/mtn-logo.svg`, role: 'Sponsorship', href: 'https://www.mtn.zm' },
  { name: 'Zamtel', src: `${M}/logos/zamtel_logo.webp`, role: 'Sponsorship', href: 'https://www.zamtel.zm' },
  { name: 'KoBold Metals', src: `${M}/logos/kobold-logo.svg`, role: 'Sponsorship', href: 'https://www.koboldmetals.com' },
  { name: 'Absa Bank Zambia', src: `${M}/logos/Absa_Logo.svg`, role: 'Sponsorship', href: 'https://www.absa.co.zm' },
  { name: 'E-Mark', src: `${M}/logos/E_Mark.webp`, role: 'Logistics & resources' },
  { name: 'EO Robotics Lab', src: `${M}/logos/EO_Robotics_Logo.webp`, role: 'Technical resources' },
  { name: 'Government of Zambia', src: `${M}/logos/ZambianGovernement.webp`, role: 'National support' },
  { name: 'AI for Good', src: `${M}/logos/AI_For_Good-logo.webp`, role: 'Competition host', href: 'https://aiforgood.itu.int' },
];

/** Breathing room between the floating header bar and the chapter nav bar */
const NAV_STACK_GAP = 12;

const JourneyToGeneva: React.FC = () => {
  const [active, setActive] = useState<string>(CHAPTERS[0].id);
  const [headerH, setHeaderH] = useState<number | null>(null);
  const [pinned, setPinned] = useState(false);
  const [navH, setNavH] = useState(0);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const pinTop = (headerH ?? 0) + NAV_STACK_GAP;

  /**
   * The site header floats and its height changes with the responsive logo, so
   * measure it. The measurement positions the pinned chapter nav and also
   * feeds --header-h, which anchor scroll-margins use.
   */
  useEffect(() => {
    const header = document.querySelector('.site-header') as HTMLElement | null;
    if (!header) return;
    const apply = () => {
      const h = header.offsetHeight;
      setHeaderH(h);
      document.documentElement.style.setProperty('--header-h', `${h}px`);
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(header);
    window.addEventListener('resize', apply);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', apply);
      document.documentElement.style.removeProperty('--header-h');
    };
  }, []);

  // Keep a spacer the same height as the bar so pinning doesn't jump the page
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setNavH(el.offsetHeight));
    ro.observe(el);
    setNavH(el.offsetHeight);
    return () => ro.disconnect();
  }, []);

  // Pin the bar once its place in the flow scrolls under the header
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !headerH) return;
    const io = new IntersectionObserver(
      ([entry]) => setPinned(!entry.isIntersecting),
      { rootMargin: `-${pinTop}px 0px 0px 0px`, threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [headerH, pinTop]);

  // Highlight the chapter currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.25, 0.5] }
    );
    CHAPTERS.forEach(c => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const jumpTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ block: 'start' });
  };

  return (
    <>
      <SEOConfig
        title="The Road to Geneva | Plastal-Bot Builders"
        description="How Plastal-Bot Builders went from a workshop in Zambia to representing the country at the AI for Good Robotics Competition in Geneva, Switzerland — the full story, from first build to the world stage."
        image="/resources/Geneva2026/web/geneva-stage-celebration.jpg"
      />
      <div className="scroll-smooth focus:scroll-auto">
        <Header />

        {/* ---------- Hero ---------- */}
        <FadeContent blur duration={900} easing="ease-out" initialOpacity={0}>
          <section className="w-full px-4 sm:px-6 lg:px-8 pt-8 pb-4" aria-labelledby="journey-title">
            <div className="max-w-7xl mx-auto">
              <div className="story-hero">
                <SmartImage
                  src={`${M}/geneva-stage-celebration.jpg`}
                  alt="The Plastal-Bot Builders team celebrating on stage with their robot and certificate at the AI for Good Global Summit in Geneva"
                  className="story-hero__img"
                  loading="eager"
                />
                <div className="story-hero__scrim" aria-hidden="true" />
                <div className="story-hero__body">
                  <span className="badge-accent mb-4">
                    <FaTrophy aria-hidden="true" /> Our Biggest Milestone
                  </span>
                  <h1 id="journey-title" className="type-h1 mb-3">
                    The Road to Geneva
                  </h1>
                  <p className="type-body max-w-2xl" style={{ color: 'rgba(255,255,255,.92)' }}>
                    Four months, one borrowed practice field, three robot generations and a
                    community that refused to let us go alone — this is how Plastal-Bot Builders
                    came to represent Zambia at the AI for Good Robotics Competition in Switzerland.
                  </p>
                </div>
              </div>

              {/* Key facts */}
              <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4">
                {[
                  { Icon: FaCalendarAlt, big: 'Mar – Jul 2026', small: 'From first build to world stage' },
                  { Icon: FaTrophy, big: 'National Champions', small: 'AI for Good National Edition' },
                  { Icon: FaFlag, big: 'Team Zambia', small: 'Country represented' },
                  { Icon: FaMapMarkerAlt, big: 'Geneva', small: 'Switzerland' },
                ].map(({ Icon, big, small }) => (
                  <li key={big} className="fact-tile">
                    <Icon aria-hidden="true" className="mx-auto mb-2 text-hex" />
                    <p className="text-sm font-bold">{big}</p>
                    <p className="text-xs opacity-75 mt-0.5">{small}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </FadeContent>

        {/* ---------- Chapter navigation ---------- */}
        {/* Sentinel marks where the bar sits in the flow; once it passes under
            the header the bar switches to fixed positioning. */}
        <div ref={sentinelRef} aria-hidden="true" />
        {pinned && <div style={{ height: navH }} aria-hidden="true" />}
        <nav
          ref={navRef}
          className={`chapter-nav px-4 sm:px-6 lg:px-8 ${pinned ? 'chapter-nav--pinned' : ''}`}
          aria-label="Story chapters"
          style={pinned ? { top: pinTop } : undefined}
        >
          <div className="chapter-nav__bar max-w-7xl mx-auto px-4">
            <div className="chapter-nav__track">
              {CHAPTERS.map(c => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  onClick={e => jumpTo(e, c.id)}
                  className={`chapter-nav__link ${active === c.id ? 'chapter-nav__link--active' : ''}`}
                  aria-current={active === c.id ? 'true' : undefined}
                >
                  {c.label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* ---------- 01 Building ---------- */}
        <StoryChapter
          id="building"
          number="01"
          timeframe="March 2026"
          title={<><span className="text-hex">Building the dream</span> on a hand-made practice field</>}
          lede="Before any stage, any flag and any flight, there was a wooden board, a roll of black tape and a lot of late evenings."
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center mb-8">
            <div className="lg:col-span-7">
              <p className="type-body mb-4">
                Preparation for the AI for Good National Edition began weeks before the event
                itself. The team designed, assembled, programmed and re-programmed their robot,
                marking out a competition field by hand so they could practise the missions over
                and over in their own workshop.
              </p>
              <p className="type-body mb-4">
                Every run taught them something: a gear ratio that slipped, an attachment that
                caught on a block, a line-following routine that drifted a few centimetres too far.
                They measured, adjusted, re-ran, and wrote it all down.
              </p>
              <p className="pull-quote">
                No imported practice kit, no dedicated lab — just careful engineering, repeated
                until it was reliable.
              </p>
            </div>
            <MediaBento
              className="lg:col-span-5"
              videoBase={`${M}/prep-programming`}
              videoLabel="The team programming and testing the robot on their practice field"
              videoCaption="Programming and testing on the practice field — block code on the tablet, robot on the board."
              photos={BENTO_BUILD}
            />
          </div>

          <h3 className="type-h4 mb-4">Build sessions</h3>
          <PhotoGrid photos={BUILD_PHOTOS} />
        </StoryChapter>

        {/* ---------- 02 Nationals ---------- */}
        <StoryChapter
          id="nationals"
          number="02"
          timeframe="April 2026"
          title={<><span className="text-hex">National champions</span> — and a ticket to Switzerland</>}
          lede="At the beginning of April, the team took their robot to the AI for Good National Edition. They won — earning the right to represent Zambia internationally."
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center mb-8">
            <div className="lg:col-span-7">
              <p className="type-body mb-4">
                Winning the national edition changed everything. It was validation that a team
                training on home-made equipment could out-engineer the field — and it came with a
                responsibility none of them had held before: carrying Zambia's name to an
                international competition in Geneva, Switzerland.
              </p>
              <p className="type-body mb-6">
                The celebration was short. The robot that won at home would not be enough for the
                world stage, and the team knew it.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { Icon: FaTrophy, t: '1st place', s: 'National Edition' },
                  { Icon: FaFlag, t: 'Qualified', s: 'To represent Zambia' },
                  { Icon: FaRobot, t: 'Next mission', s: 'Rebuild, stronger' },
                ].map(({ Icon, t, s }) => (
                  <li key={t} className="fact-tile">
                    <Icon aria-hidden="true" className="mx-auto mb-2 text-hex" />
                    <p className="text-sm font-bold">{t}</p>
                    <p className="text-xs opacity-75 mt-0.5">{s}</p>
                  </li>
                ))}
              </ul>
            </div>
            <MediaBento
              className="lg:col-span-5"
              videoBase={`${M}/nationals-robot-reveal`}
              videoLabel="Close-up walkaround of the national competition robot"
              videoCaption="The robot that won the national edition."
              photos={BENTO_NATIONALS}
            />
          </div>

          <h3 className="type-h4 mb-4">The national competition robot</h3>
          <PhotoGrid
            photos={NATIONALS_PHOTOS}
            className="grid grid-cols-2 gap-3 sm:gap-4"
            tileClassName="w-full h-40 sm:h-52 lg:h-60 object-cover rounded-lg"
          />
        </StoryChapter>

        {/* ---------- 03 Levelling up ---------- */}
        <StoryChapter
          id="levelling-up"
          number="03"
          timeframe="May – June 2026"
          title={<><span className="text-hex">Levelling up</span> for the world stage</>}
          lede="International competition meant more advanced engineering and far more testing. So the team rebuilt — not once, but through a series of prototypes."
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center mb-8">
            <div className="lg:col-span-7">
              <p className="type-body mb-4">
                With additional robotics kits available to them for the first time (see{' '}
                <a href="#global-community" onClick={e => jumpTo(e, 'global-community')} className="text-hex font-semibold hover:underline">
                  chapter 05
                </a>
                ), the team could finally do what serious robotics teams do: build several designs
                at once, run them against each other, and keep only what proved itself.
              </p>
              <p className="type-body mb-4">
                Weeks of iteration followed — refining drivetrains, re-thinking attachments,
                debugging sensor behaviour and drilling practice runs until the timings were
                consistent. Mentors and teachers joined the sessions, and the team documented
                each version as it evolved.
              </p>
              <p className="pull-quote">
                Three robot generations in four months. Each one taught us what the next one
                needed to be.
              </p>
            </div>
            <MediaBento
              className="lg:col-span-5"
              videoBase={`${M}/swiss-prep-run`}
              videoLabel="A practice run during preparation for the international competition"
              videoCaption="A practice run during the final weeks of preparation."
              photos={BENTO_SWISS}
            />
          </div>

          <h3 className="type-h4 mb-4">Prototypes and iterations</h3>
          <PhotoGrid photos={PROTO_PHOTOS} className="grid grid-cols-3 gap-3 sm:gap-4 mb-8" />

          <h3 className="type-h4 mb-4">Working sessions and collaboration</h3>
          <PhotoGrid photos={TEAM_PHOTOS} className="grid grid-cols-3 gap-3 sm:gap-4" />
        </StoryChapter>

        {/* ---------- 04 Partners ---------- */}
        <StoryChapter
          id="partners"
          number="04"
          timeframe="Throughout the journey"
          title={<><span className="text-hex">The partners</span> who made this journey possible</>}
          lede="A team from Lusaka does not reach Geneva alone. These organisations backed us with sponsorship, logistics and resources when it mattered most."
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 mb-10">
            <div className="lg:col-span-2">
              <p className="type-body mb-4">
                Travel, equipment, competition fees, connectivity, transport — an international
                robotics campaign has costs that no school club can absorb by itself. Zambian
                businesses, institutions and government offices stepped in at different points of
                the journey, each solving a different part of the puzzle.
              </p>
              <p className="type-body">
                Their support did not just send five young people to Switzerland; it demonstrated
                to every learner in our programmes that Zambian industry is willing to invest in
                Zambian innovation.
              </p>
            </div>
            <SmartImage
              src={`${M}/partners-with-team.jpg`}
              alt="The team photographed with a partner representative in front of sponsor banners"
              className="w-full h-56 lg:h-full object-cover rounded-lg"
            />
          </div>

          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {SUPPORTERS.map(s => (
              <LogoPlate key={s.name} src={s.src} name={s.name} role={s.role} href={s.href} />
            ))}
          </ul>

          <p className="type-caption mt-6 max-w-3xl">
            Are you an organisation that would like to support the next journey?{' '}
            <Link to="/support/sponsorships" className="text-hex font-semibold hover:underline">
              Explore sponsorship options
            </Link>
            .
          </p>
        </StoryChapter>

        {/* ---------- 05 Global community ---------- */}
        <StoryChapter
          id="global-community"
          number="05"
          timeframe="Mentorship & donations"
          title={<><span className="text-hex">International partners</span> in the global robotics community</>}
          lede="Innovation grows stronger through collaboration. Plastal-Bot Builders is grateful to the mentors, teams and organisations around the world whose generosity helped make our journey to Switzerland possible."
        >
          {/* Featured: Mr Chandra Polisetty */}
          <article className="interactive-card p-6 sm:p-8 lg:p-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">
              <div className="lg:col-span-3">
                <span className="badge-accent mb-4">
                  <FaHeart aria-hidden="true" /> Featured Supporter
                </span>
                <h3 className="type-h3 mb-2">Mr. Chandra Polisetty</h3>
                <p className="type-caption mb-5">
                  Mentor and supporter · FIRST Tech Challenge community
                </p>
                <p className="type-body mb-4">
                  When Plastal-Bot Builders qualified for the international competition, the team
                  owned exactly one LEGO robotics kit. A single kit means a single robot: you
                  cannot compare two designs, you cannot test one idea while building another, and
                  every experiment costs you the machine you already trust.
                </p>
                <p className="type-body mb-4">
                  Recognising that constraint, Mr. Polisetty went well beyond encouragement. He
                  purchased and donated:
                </p>
                <ul className="gift-list mb-5">
                  <li>Two complete LEGO robotics kits</li>
                  <li>Two LEGO expansion kits</li>
                </ul>
                <p className="type-body">
                  It is difficult to overstate what that changed. Suddenly the team could hold
                  three builds at once, iterate in parallel, and arrive in Geneva with a design
                  that had genuinely earned its place.
                </p>
              </div>

              <div className="lg:col-span-2">
                <h4 className="type-h4 mb-4">What the donation unlocked</h4>
                <ul className="grid gap-3">
                  {[
                    { Icon: FaRobot, t: 'Multiple prototypes', s: 'Build and test several robots side by side' },
                    { Icon: FaLightbulb, t: 'Design experiments', s: 'Try mechanical ideas without dismantling the working robot' },
                    { Icon: FaHandsHelping, t: 'Faster iteration', s: 'Shorter cycles between idea, build and test' },
                    { Icon: FaTrophy, t: 'A stronger robot', s: 'Our most competitive design reached the world stage' },
                  ].map(({ Icon, t, s }) => (
                    <li key={t} className="flex items-start gap-3 p-3 rounded-lg surface border border-surface">
                      <span className="w-9 h-9 flex-shrink-0 rounded-full bg-accent flex items-center justify-center">
                        <Icon aria-hidden="true" className="on-accent" />
                      </span>
                      <span>
                        <span className="block text-sm font-bold">{t}</span>
                        <span className="block text-xs opacity-80 mt-0.5 leading-relaxed">{s}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>

          {/* Partner teams.
              To show a team's real logo, save it as
              public/resources/Geneva2026/web/logos/partners/<team>.png and pass
              logo={`${M}/logos/partners/<team>.png`} below. Until then the card
              renders a branded monogram rather than requesting a missing file. */}
          <h3 className="type-h4 mb-4">The teams behind that support</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <PartnerCard
              name="Sounder Bots"
              subtitle="FIRST Tech Challenge · Team 23270"
              description="A FIRST Tech Challenge team from Sammamish, Washington, known for their community programmes — from free FTC and FLL coaching clinics to expert Tech Talks on robotics, sensors and control. Their encouragement and outreach spirit helped carry our team toward Geneva."
              monogram="SB"
              monogramBg="#111318"
              monogramFg="#EF4B4B"
              links={[
                { kind: 'website', label: 'sounderbots.com', href: 'https://www.sounderbots.com' },
                { kind: 'instagram', label: '@ftc23270', href: 'https://www.instagram.com/ftc23270' },
              ]}
            />
            <PartnerCard
              name="The Spartabots"
              subtitle="FIRST Robotics Competition · Team 2976"
              description="Skyline High School's robotics team from Sammamish, Washington and 2018 World Champions. Alongside their competitive record, they run summer FIRST LEGO League programmes for younger students — the same mission of widening access to robotics that drives our own work."
              monogram="2976"
              monogramBg="#14543F"
              monogramFg="#FFFFFF"
              links={[
                { kind: 'linktree', label: 'linktr.ee/spartabots2976', href: 'https://linktr.ee/spartabots2976' },
                { kind: 'instagram', label: '@spartabots2976', href: 'https://www.instagram.com/spartabots2976' },
              ]}
            />
          </div>

          {/* Technicbots mentorship */}
          <article className="interactive-card p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <span className="w-12 h-12 flex-shrink-0 rounded-full bg-accent flex items-center justify-center">
                <FaUsers aria-hidden="true" className="text-xl on-accent" />
              </span>
              <div>
                <h3 className="type-h4 mb-2">Ongoing technical mentorship — Technicbots, FTC Team 8565</h3>
                <p className="type-body mb-4">
                  Throughout development, Technicbots met with our team regularly, answering
                  questions and working through problems with us whenever we hit a wall. That
                  steady, patient guidance — available when it was actually needed — shaped both
                  our robot and how our members approach engineering problems.
                </p>
                <Link to="/team/technicbots" className="custom-button--ghost">
                  About our partnership with Technicbots
                </Link>
              </div>
            </div>
          </article>

          <p className="type-body mt-8 max-w-3xl opacity-90">
            To every mentor, team and family who sent a message, shared a design, answered a
            question or gave from their own resources: thank you. The FIRST community's habit of
            lifting other teams up is the reason a team from Lusaka stood on that stage in
            Geneva — and it is a habit we intend to pass on.
          </p>
        </StoryChapter>

        {/* ---------- 06 Geneva ---------- */}
        <StoryChapter
          id="geneva"
          number="06"
          timeframe="July 2026"
          title={<><span className="text-hex">Geneva</span> — representing Zambia on the world stage</>}
          lede="The AI for Good Global Summit, Switzerland. Teams from around the world, one competition floor, and five young Zambians with a robot they had rebuilt three times."
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center mb-10">
            <SmartImage
              src={`${M}/geneva-flag.jpg`}
              alt="The Plastal-Bot Builders team holding the Zambian flag while travelling to the competition"
              className="w-full h-64 sm:h-80 object-cover rounded-lg"
            />
            <div>
              <p className="type-body mb-4">
                They arrived carrying the flag — and the expectations of every learner back home
                who had watched the journey unfold. On the competition floor they set up their pit,
                ran their matches, repaired attachments between rounds and explained their design
                to delegates from dozens of countries.
              </p>
              <p className="type-body mb-4">
                They met teams from Switzerland, India, and across Africa and Asia; they showed
                visitors, officials and summit guests what Zambian students had engineered. And at
                the end of it, Plastal-Bot Builders was recognised as a{' '}
                <strong>Finalist Team</strong> at the AI for Good Robotics Competition.
              </p>
              <p className="pull-quote">
                We came to compete. We left having proved that world-class innovation can come
                out of Zambia.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-10">
            <StoryVideo
              base={`${M}/geneva-highlight`}
              label="Competition highlights from the AI for Good Robotics Competition in Geneva"
              caption="Competition highlights from the challenge floor in Geneva."
            />
            <figure>
              <SmartImage
                src={`${M}/geneva-certificate.jpg`}
                alt="The team’s AI for Good Robotics Competition Finalist Team certificate, alongside a robotics kit"
                className="w-full h-64 sm:h-80 object-cover rounded-lg"
              />
              <figcaption className="type-caption mt-2">
                Recognised as a Finalist Team at the AI for Good Robotics Competition.
              </figcaption>
            </figure>
          </div>

          <h3 className="type-h4 mb-4">From the competition floor</h3>
          <PhotoGrid photos={GENEVA_PHOTOS} />
        </StoryChapter>

        {/* ---------- 07 Bringing it home ---------- */}
        <StoryChapter
          id="bringing-it-home"
          number="07"
          timeframe="After the competition"
          title={<><span className="text-hex">Bringing it home</span> — and passing it on</>}
          lede="The story does not end in Switzerland. It ends — and begins again — in classrooms and community halls across Zambia."
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start mb-10">
            <SmartImage
              src={`${M}/home-recognition-01.jpg`}
              alt="The team and school pupils photographed with officials at Zambia’s Presidential Delivery Unit"
              className="w-full h-72 sm:h-96 object-cover rounded-lg"
            />
            <div>
              <p className="type-body mb-4">
                Back in Zambia, the team was hosted by the Presidential Delivery Unit, where they
                demonstrated their robot to government officials and shared the story of the
                journey with school pupils — the same pupils who now know that this path exists.
              </p>
              <p className="type-body mb-4">
                That is the part that matters most to us. A trophy sits on a shelf; a learner who
                has just watched someone from their own city compete internationally goes home and
                starts building.
              </p>
              <ul className="grid grid-cols-2 gap-3">
                {[
                  { big: '8,000+', small: 'Learners reached through our programmes' },
                  { big: '3', small: 'Robot generations built in four months' },
                  { big: '1st', small: 'Place at the national edition' },
                  { big: 'Finalist', small: 'AI for Good, Geneva' },
                ].map(f => (
                  <li key={f.small} className="fact-tile">
                    <p className="stat-value">{f.big}</p>
                    <p className="stat-label">{f.small}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <PhotoGrid photos={HOME_PHOTOS} className="grid grid-cols-1 sm:grid-cols-3 gap-4" tileClassName="w-full h-48 sm:h-56 object-cover rounded-lg" />
        </StoryChapter>

        {/* ---------- Closing CTA ---------- */}
        <FadeContent blur duration={900} easing="ease-out" initialOpacity={0}>
          <section className="w-full px-4 sm:px-6 lg:px-8 pb-12" aria-labelledby="journey-cta-title">
            <div className="max-w-7xl mx-auto">
              <div className="interactive-card p-6 sm:p-10 text-center">
                <h2 id="journey-cta-title" className="type-h2 mb-4">
                  <span className="text-hex">Help us build</span> the next journey
                </h2>
                <p className="type-body max-w-2xl mx-auto mb-8">
                  Geneva proved what is possible when a community backs its young engineers.
                  There are more competitions ahead, and many more learners waiting for their
                  first robotics kit.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/support" className="custom-button" style={{ textDecoration: 'none' }}>
                    Support Our Next Journey
                  </Link>
                  <Link to="/membershipform" className="custom-button--ghost">
                    Join the Team
                  </Link>
                  <Link to="/news" className="custom-button--ghost">
                    More News &amp; Achievements
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </FadeContent>

        <Footer />
      </div>
    </>
  );
};

export default JourneyToGeneva;
