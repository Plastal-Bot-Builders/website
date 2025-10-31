import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { asset } from '../utils/asset';
import ThemedImage from '../theme/ThemedImage';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';



type Project = {
  id: string;
  title: string;
  short: string;
  description: string;
  image?: string;
  tags?: string[];
  featured?: boolean;
};

const SAMPLE_PROJECTS: Project[] = [
  {
    id: 'gypul',
    title: 'Gypul — Self-Balancing Robot',
    short: 'Low-cost education robot with IMU stabilization and ESP32 control.',
    description:
      'Gypul is a self-balancing robot platform built for classrooms and makerspaces. It uses an IMU for stabilization, ESP32 for control, and 3D-printed parts for easy assembly. Students learn PID, sensor fusion and embedded programming.',
    image: '/resources/projects/IMG_8952.JPG',
    tags: ['robotics', 'education', 'open-source'],
    featured: true
  },
  {
    id: 'enviro-monitor',
    title: 'Environmental Monitoring Rover',
    short: 'Arduino-based rover for air and water quality measurements.',
    description:
      'A student-built rover that logs environmental data using Arduino sensors and uploads results to a central dashboard for analysis and visualization.',
    image: '/resources/Photos/group.png',
    tags: ['sensors', 'sustainability']
  },
  {
    id: 'vision-bot',
    title: 'Vision Bot',
    short: 'Intro to CV: object detection and obstacle avoidance.',
    description:
      'An introductory computer vision project using Raspberry Pi and OpenCV to detect objects and navigate simple obstacle courses.',
    image: '/assets/projects/vision-bot.jpg',
    tags: ['computer-vision', 'pi']
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } }
};

export default function ProjectsPage(): JSX.Element {
  const [selected, setSelected] = useState<Project | null>(null);
  const navigate = useNavigate();

  return (
    <section className="scroll-smooth focus:scroll-auto">
      {/* Navigation Bar */}
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">Projects</h1>
          <p className="max-w-2xl">
            Explore hands-on projects from Plastal-Bot Builders — student showcases, open-source designs and classroom-ready builds.
          </p>
        </header>

        <section className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_PROJECTS.map((p, i) => (
              <motion.article
                key={p.id}
                className="interactive-card rounded-lg overflow-hidden shadow-md"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={cardVariants}
              >
                <div className="relative h-44 bg-gray-800">
                  {p.image ? (
                    <img
                      src={asset(p.image)}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full ">No image</div>
                  )}
                  {p.featured && (
                    <span className="absolute left-3 top-3 bg-accent =text-xs px-2 py-1 rounded">Featured</span>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                  <p className="text-sm mb-4">{p.short}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {p.tags?.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs border border-white/10 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2">
                      <a
                        href={`/projects/${p.id}`}
                        className="text-sm underline hidden sm:inline"
                        aria-label={`Open ${p.title} detail page`}
                      >
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Quick filter / actions */}
        <section className="mb-12">
          <h4 className="text-xl font-semibold mb-3">More</h4>
          <p className="text-sm text-gray-400 mb-4">Want to submit a project or request a workshop? Get in touch.</p>
          <div className="flex gap-3">
            <a href="/programs" className="px-4 py-2 rounded bg-white/5 border border-white/5 text-sm">View Programs</a>
            <a href="/support" className="px-4 py-2 rounded bg-white/5 border border-white/5 text-sm">Support & Submit</a>
          </div>
        </section>

        {/* Modal / drawer for quick preview */}
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <div
              className="absolute inset-0 bg-black/60"
              aria-hidden
            />
            <motion.div
              className="relative max-w-3xl w-full bg-gray-900 border border-white/5 rounded-lg overflow-hidden shadow-xl z-10"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="md:flex">
                <div className="md:w-1/2">
                  {selected.image ? (
                    <ThemedImage src={selected.image} alt={selected.title} className="w-full h-64 object-cover" />
                  ) : (
                    <div className="w-full h-64 bg-gray-800 flex items-center justify-center text-gray-500">No image</div>
                  )}
                </div>

                <div className="p-6 md:w-1/2">
                  <h3 className="text-2xl font-bold mb-2">{selected.title}</h3>
                  <p className="text-sm text-gray-300 mb-4">{selected.description}</p>
                  <div className="flex gap-2 mb-4">
                    {selected.tags?.map(t => <span key={t} className="text-xs border border-white/10 px-2 py-1 rounded">{t}</span>)}
                  </div>
                  <div className="flex gap-3">
                    <Button label="Open Project" href={`/projects/${selected.id}`} />
                    <button
                      className="px-4 py-2 rounded border border-white/10 text-sm"
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
  );
}