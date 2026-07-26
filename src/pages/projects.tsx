import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SmartImage from '../components/ui/SmartImage';
import Button from '../components/Button';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SEOConfig } from '../components/SEO';
import FadeContent from '../components/ui/FadeContent';
import { FaRobot } from 'react-icons/fa';

type Project = {
  id: string;
  title: string;
  short: string;
  description: string;
  image?: string;
  tags?: string[];
  featured?: boolean;
  /** Set when the project has its own showcase route */
  route?: string;
};

const SAMPLE_PROJECTS: Project[] = [
  {
    id: 'gypul',
    title: 'Gypul — Self-Balancing Robot',
    short: 'Low-cost education robot with IMU stabilization and ESP32 control.',
    description:
      'Gypul is a self-balancing robot platform built for classrooms and makerspaces. It uses an IMU for stabilization, ESP32 for control, and 3D-printed parts for easy assembly. Students learn PID, sensor fusion and embedded programming.',
    image: '/resources/Projects/IMG_8952.JPG',
    tags: ['robotics', 'education', 'open-source'],
    featured: true,
    route: '/projects/gypul'
  },
  {
    id: 'enviro-monitor',
    title: 'Environmental Monitoring Rover',
    short: 'Arduino-based rover for air and water quality measurements.',
    description:
      'A student-built rover that logs environmental data using Arduino sensors and uploads results to a central dashboard for analysis and visualization.',
    image: '/resources/Photos/group.png',
    tags: ['sensors', 'sustainability'],
    route: '/projects/enviro-monitor'
  },
  {
    id: 'vision-bot',
    title: 'Vision Bot',
    short: 'Intro to CV: object detection and obstacle avoidance.',
    description:
      'An introductory computer vision project using Raspberry Pi and OpenCV to detect objects and navigate simple obstacle courses. Full showcase coming soon.',
    tags: ['computer-vision', 'pi']
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } }
};

export default function ProjectsPage(): JSX.Element {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <SEOConfig
        title="Projects | Plastal-Bot Builders"
        description="Explore hands-on projects from Plastal-Bot Builders — student showcases, open-source designs and classroom-ready builds."
        image="/resources/Photos/fredmpelembe.jpeg"
      />
      <section className="scroll-smooth focus:scroll-auto">
        {/* Navigation Bar */}
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
            <header className="mb-10 lg:mb-12">
              <h1 className="type-h1 mb-3">
                <span className="text-hex">Our</span> Projects
              </h1>
              <p className="type-body max-w-2xl">
                Explore hands-on projects from Plastal-Bot Builders — student showcases, open-source designs and classroom-ready builds.
              </p>
            </header>
          </FadeContent>

          <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
            <section className="mb-12" aria-label="Project list">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {SAMPLE_PROJECTS.map((p) => (
                  <motion.article
                    key={p.id}
                    className="interactive-card overflow-hidden flex flex-col"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={cardVariants}
                  >
                    <div className="relative">
                      {p.image ? (
                        <SmartImage
                          src={p.image}
                          alt={p.title}
                          className="card-media"
                        />
                      ) : (
                        <div className="card-media flex flex-col items-center justify-center gap-2 surface text-hex" role="img" aria-label={`${p.title} — photos coming soon`}>
                          <FaRobot aria-hidden="true" className="text-4xl" />
                          <span className="text-xs opacity-75">Photos coming soon</span>
                        </div>
                      )}
                      {p.featured && (
                        <span className="absolute left-3 top-3 badge-accent">Featured</span>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <h2 className="type-h4 mb-2">{p.title}</h2>
                      <p className="text-sm leading-relaxed opacity-90 mb-4 flex-grow">{p.short}</p>

                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex flex-wrap gap-2">
                          {p.tags?.slice(0, 3).map(tag => (
                            <span key={tag} className="tag">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {p.route ? (
                          <Link
                            to={p.route}
                            className="text-sm font-semibold text-hex hover:underline"
                            aria-label={`Open ${p.title} detail page`}
                          >
                            Details →
                          </Link>
                        ) : (
                          <button
                            type="button"
                            className="text-sm font-semibold text-hex hover:underline"
                            onClick={() => setSelected(p)}
                            aria-label={`Preview ${p.title}`}
                          >
                            Details →
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>
          </FadeContent>

          <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
            <section className="mb-12">
              <h2 className="type-h3 mb-3">More</h2>
              <p className="text-sm opacity-80 mb-4">Want to submit a project or request a workshop? Get in touch.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/programs" className="custom-button--ghost text-center">View Programs</Link>
                <Link to="/support" className="custom-button--ghost text-center">Support & Submit</Link>
              </div>
            </section>
          </FadeContent>

          {/* Modal / drawer for quick preview */}
          {selected && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              role="dialog"
              aria-modal="true"
              aria-label={selected.title}
            >
              <div
                className="absolute inset-0 bg-black/60"
                aria-hidden
              />
              <motion.div
                className="relative max-w-3xl w-full surface border border-surface rounded-xl overflow-hidden shadow-xl z-10"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                onClick={e => e.stopPropagation()}
              >
                <div className="md:flex">
                  <div className="md:w-1/2">
                    {selected.image ? (
                      <SmartImage src={selected.image} alt={selected.title} className="w-full h-52 md:h-full object-cover" />
                    ) : (
                      <div className="w-full h-52 md:h-full min-h-[13rem] flex flex-col items-center justify-center gap-2 surface text-hex">
                        <FaRobot aria-hidden="true" className="text-4xl" />
                        <span className="text-xs opacity-75">Photos coming soon</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 md:w-1/2">
                    <h3 className="type-h3 mb-2">{selected.title}</h3>
                    <p className="text-sm leading-relaxed opacity-90 mb-4">{selected.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selected.tags?.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {selected.route && (
                        <Button label="Open Project" href={selected.route} />
                      )}
                      <button
                        className="custom-button--ghost"
                        onClick={() => setSelected(null)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>

        <Footer />
      </section>
    </>
  );
}
