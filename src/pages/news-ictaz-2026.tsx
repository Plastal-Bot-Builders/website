import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SEOConfig } from '../components/SEO';
import FadeContent from '../components/ui/FadeContent';
import SmartImage from '../components/ui/SmartImage';
import PhotoGrid, { Photo } from '../components/Journey/PhotoGrid';
import { FaCalendarAlt, FaMapMarkerAlt, FaRobot } from 'react-icons/fa';
import { LuPlay } from 'react-icons/lu';

/**
 * News story: RoboCore at the ICTAZ Tech Fair, Lusaka, 13 November 2026 (its first public showing).
 * Photos by Avant Media ZM, the fair's photographer; web copies made from the originals in
 * RoboCore_Social/posts/linkedin_series/ictaz_photos. Linked from the News page; crawlable copy in site-manifest.js.
 */
const P = 'resources/ICTAZ2026/web';

const PHOTOS: Photo[] = [
  {
    src: `${P}/ictaz-stand-visitors.jpg`,
    alt: 'Fredrick Mwepu (white shirt) and Fred Mukuna (yellow shirt) show RoboCore to two visitors at the ICTAZ Tech Fair, with the robot’s parts on the table between them.',
  },
  {
    src: `${P}/ictaz-first-global-student.jpg`,
    alt: 'Fredrick Mwepu and Fred Mukuna talk with a student wearing a FIRST Global Zambia jersey.',
  },
  {
    src: `${P}/ictaz-fredrick-explains.jpg`,
    alt: 'Fredrick Mwepu explains RoboCore at the stand, with the robot’s parts in front of him.',
  },
  {
    src: `${P}/ictaz-interview.jpg`,
    alt: 'Fredrick Mwepu is interviewed on camera at the ICTAZ Tech Fair.',
  },
  {
    src: `${P}/ictaz-fred-mukuna-laptop.jpg`,
    alt: 'Fred Mukuna works at a laptop at the RoboCore stand.',
  },
  {
    src: `${P}/ictaz-group-photo.jpg`,
    alt: 'A large group photo of participants at the ICTAZ Tech Fair 2026 in Lusaka.',
  },
];

/** ICTAZ's own video of Fredrick at the stand (ICT Association of Zambia channel). */
const VIDEO = { youtube: '9J71Q-bwPAo', title: 'Fredrick Mwepu - Plastal Bot Builders : RoboCore Zambia' };

/**
 * The video shows our photo of the interview and loads YouTube (privacy-enhanced, youtube-nocookie.com) only when
 * someone presses play, so nothing is sent to Google before that — as the RoboCore gallery does. public/_headers
 * already allows that frame (CSP frame-src, Permissions-Policy autoplay).
 */
const IctazVideo: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-black" style={{ aspectRatio: '16 / 9' }}>
      {playing ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${VIDEO.youtube}?autoplay=1&rel=0`}
          title={VIDEO.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="group absolute inset-0 w-full h-full"
          onClick={() => setPlaying(true)}
          aria-label={`Play the video: ${VIDEO.title}`}
        >
          <SmartImage src={`${P}/ictaz-interview.jpg`} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <span className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" aria-hidden="true" />
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent text-black text-3xl shadow-lg group-hover:scale-105 transition-transform"
            aria-hidden="true"
          >
            <LuPlay />
          </span>
        </button>
      )}
    </div>
  );
};

const IctazTechFair2026: React.FC = () => (
  <>
    <SEOConfig
      title="RoboCore at the ICTAZ Tech Fair 2026 | Plastal-Bot Builders"
      description="On 13 November 2026 Plastal-Bot Builders brought RoboCore, its classroom robotics platform, to the ICTAZ Tech Fair in Lusaka: its first public showing. Photos and the story."
      image="/resources/social/og-ictaz.jpg"
    />
    <div className="scroll-smooth focus:scroll-auto">
      <Header />

      {/* Opening: the story beside the best photo */}
      <FadeContent blur duration={1000} easing="ease-out" initialOpacity={0}>
        <section className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12" aria-labelledby="ictaz-title">
          <div className="max-w-7xl mx-auto">
            <Link to="/news" className="text-hex font-semibold text-sm hover:underline">
              ← News &amp; Achievements
            </Link>
            <div className="interactive-card overflow-hidden mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative min-h-[16rem] sm:min-h-[22rem]">
                  <SmartImage
                    src={PHOTOS[0].src}
                    alt={PHOTOS[0].alt}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
                <div className="p-6 sm:p-8 lg:p-10">
                  <span className="badge-accent mb-4">
                    <FaRobot aria-hidden="true" /> Event
                  </span>
                  <h1 id="ictaz-title" className="type-h1 mb-4">
                    <span className="text-hex">RoboCore</span> meets the public at the ICTAZ Tech Fair
                  </h1>
                  <p className="type-body mb-4">
                    On 13 November 2026 we brought RoboCore, our classroom robotics platform, to the ICTAZ Tech Fair
                    in Lusaka. It was the first time the public could get their hands on it.
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    <li className="tag"><FaCalendarAlt aria-hidden="true" />&nbsp;13 November 2026</li>
                    <li className="tag"><FaMapMarkerAlt aria-hidden="true" />&nbsp;Lusaka, Zambia</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeContent>

      {/* The story */}
      <FadeContent blur duration={1000} easing="ease-out" initialOpacity={0} delay={100}>
        <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-8" aria-labelledby="ictaz-hands-on">
          <div className="max-w-7xl mx-auto">
            <h2 id="ictaz-hands-on" className="type-h2 mb-4">
              <span className="text-hex">Hands on</span> the board
            </h2>
            <p className="max-w-3xl type-body mb-4">
              Visitors picked up the RoboCore controller board and played Ring Run, a game where you tilt the board to
              fly a plane through rings on screen. The moment someone picks it up and starts playing is exactly what we
              want for every classroom.
            </p>
            <p className="max-w-3xl type-body">
              People stopped by to see the robot’s parts up close, ask how it works and give us honest feedback on the
              board and the robot’s frame, among them a student from FIRST Global Zambia.
            </p>
          </div>
        </section>
      </FadeContent>

      {/* ICTAZ's interview with Fredrick at the stand */}
      <FadeContent blur duration={1000} easing="ease-out" initialOpacity={0} delay={120}>
        <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-8" aria-labelledby="ictaz-video">
          <div className="max-w-7xl mx-auto">
            <h2 id="ictaz-video" className="type-h2 mb-4">
              <span className="text-hex">Watch:</span> RoboCore at our stand
            </h2>
            <p className="max-w-3xl type-body mb-6">
              ICTAZ filmed Fredrick Mwepu at our stand, explaining RoboCore, the controller board at its heart, and
              how far the work has come.
            </p>
            <div className="max-w-4xl">
              <IctazVideo />
            </div>
            <p className="type-caption mt-3">
              Video: ICT Association of Zambia.{' '}
              <a
                className="text-hex hover:underline"
                href={`https://www.youtube.com/watch?v=${VIDEO.youtube}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube
              </a>
            </p>
          </div>
        </section>
      </FadeContent>

      {/* Photos, with the lightbox */}
      <FadeContent blur duration={1000} easing="ease-out" initialOpacity={0} delay={150}>
        <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-8" aria-labelledby="ictaz-photos">
          <div className="max-w-7xl mx-auto">
            <h2 id="ictaz-photos" className="type-h2 mb-6">
              <span className="text-hex">Photos</span> from the fair
            </h2>
            <PhotoGrid
              photos={PHOTOS}
              className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
              tileClassName="w-full h-40 sm:h-56 lg:h-64 object-cover rounded-lg"
            />
            <p className="type-caption mt-4">Photos: Avant Media ZM</p>
          </div>
        </section>
      </FadeContent>

      {/* What's next */}
      <FadeContent blur duration={1000} easing="ease-out" initialOpacity={0} delay={200}>
        <section className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12" aria-labelledby="ictaz-next">
          <div className="max-w-7xl mx-auto">
            <h2 id="ictaz-next" className="type-h2 mb-4">
              <span className="text-hex">What</span> comes next
            </h2>
            <p className="max-w-3xl type-body mb-6">
              Next, RoboCore goes into its first school pilots. If your school or innovation hub would like to be one
              of them, tell us. Thank you to ICTAZ for the platform, and to everyone who stopped by our stand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/robocore/pilot" className="custom-button text-center" style={{ textDecoration: 'none' }}>
                Bring RoboCore to your school
              </Link>
              <Link to="/robocore" className="custom-button--ghost text-center">
                Meet RoboCore
              </Link>
            </div>
          </div>
        </section>
      </FadeContent>

      <Footer />
    </div>
  </>
);

export default IctazTechFair2026;
