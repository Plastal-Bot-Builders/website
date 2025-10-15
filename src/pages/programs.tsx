import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { asset } from '../utils/asset';
import ThemedImage from '../theme/ThemedImage';


const Programs: React.FC = () => {
  const [tab, setTab] = useState<'completed' | 'upcoming'>('completed');
  const url = (p: string) => encodeURI(asset(p));
  const spikeGallery = [
    'resources/SpikePrime/SCAVENGERHUNT1.jpg',
    'resources/SpikePrime/SCAVENGERHUNT2.jpg',
    'resources/SpikePrime/SCAVENGERHUNT3.jpg',
    'resources/SpikePrime/SCAVENGERHUNT4.jpg',
    'resources/SpikePrime/SCAVENGERHUNT5.jpg',
    'resources/SpikePrime/SCAVENGERHUNT6.jpg',
    'resources/SpikePrime/SCAVENGERHUNT7.jpg',
    'resources/SpikePrime/SCAVENGERHUNT8.jpg',
    'resources/SpikePrime/SCAVENGERHUNT9.jpg',
    'resources/SpikePrime/SCAVENGERHUNT10.jpg'
  ];
  const introGallery = [
    'resources/IntroRoboticsWorkshop/IMG_4428.jpg',
    'resources/IntroRoboticsWorkshop/IMG_4433.jpg',
    'resources/IntroRoboticsWorkshop/IMG_4555.jpg',
    'resources/IntroRoboticsWorkshop/IMG_4565.jpg',
    'resources/IntroRoboticsWorkshop/IMG_4592.jpg',
    'resources/IntroRoboticsWorkshop/IMG_4622.jpg',
    'resources/IntroRoboticsWorkshop/IMG_4754.jpg',
    'resources/IntroRoboticsWorkshop/IMG_4765.jpg',
    'resources/IntroRoboticsWorkshop/IMG_4596.jpg'
  ];

  const days = [
    {
      day: "Day 1",
      title: "Introduction to Robotics & Electronics",
      topics: ["Robotics fundamentals", "Basic electronics", "Circuit simulation", "TinkerCad hands-on"],
      tools: [
        {
          icon: "/resources/Icons/tinkercad.svg",
          containerStyle: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px"
          }
        },
        {
          icon: "/resources/Icons/arduino.svg",
          containerStyle: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px"
          }
        },
        {
          icon: "/resources/Icons/RaspberryPi.svg",
          containerStyle: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px"
          }
        },
        {
          icon: "/resources/Icons/esp32.svg",
          containerStyle: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px"
          }
        },
      ]
    },
    {
      day: "Day 2",
      title: "CAD Modeling and Prototyping",
      topics: ["CAD basics", "Robot component design", "3D modeling", "Assembly techniques"],
      tools: [
        {
          icon: "/resources/Icons/tinkercad.svg",
          containerStyle: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px"
          }
        },
        {
          icon: "/resources/Icons/Fusion360.svg",
          containerStyle: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px"
          }
        }
      ]
    },
    {
      day: "Day 3",
      title: "Programming & AI Fundamentals",
      topics: ["Python basics", "Machine Learning intro", "Arduino programming", "AI concepts"],
      tools: [
        {
          icon: "/resources/Icons/tinkercad.svg",
          containerStyle: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px"
          }
        },
        {
          icon: "/resources/Icons/tensorflow.svg",
          containerStyle: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px"
          }
        },
        {
          icon: "/resources/Icons/googlecolab.svg",
          containerStyle: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px"
          }
        }
      ]
    },
    {
      day: "Day 4",
      title: "Advanced Robotics & Automation",
      topics: ["Computer Vision", "ROS2 basics", "Robot navigation", "Automation"],
      tools: [
        {
          icon: "/resources/Icons/tinkercad.svg",
          containerStyle: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px"
          }
        },
        {
          icon: "/resources/Icons/yolo.svg",
          containerStyle: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px"
          }
        },
        {
          icon: "/resources/Icons/Ros.svg",
          containerStyle: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px"
          }
        },
        {
          icon: "/resources/Icons/Gazebo.svg",
          containerStyle: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px"
          }
        }
      ]
    },
    {
      day: "Day 5",
      title: "Project Development & Showcase",
      topics: ["Group projects", "Project presentation", "LiveA demos", "Certificate ceremony"],
      tools: [
        { name: "All previous tools", icon: null }
      ]
    }
  ];
  const ImageWithFallback: React.FC<{
    src: string;
    alt: string;
    className?: string;
    loading?: 'lazy' | 'eager';
  }> = ({ src, alt, className, loading = 'lazy' }) => {
    const candidates = useMemo(() => {
      const lower = src.toLowerCase();
      if (lower.endsWith('.HEIC')) {
        const base = src.slice(0, -5);
        return [`${base}.webp`, `${base}.jpg`, src];
      }
      if (/\.(png|jpe?g)$/i.test(lower)) {
        const base = src.replace(/\.(png|jpe?g)$/i, '');
        return [`${base}.webp`, src];
      }
      return [src];
    }, [src]);

    const [idx, setIdx] = React.useState(0);
    const current = candidates[idx];

    return (
      <img
        src={encodeURI(asset(current))}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
        onError={() => setIdx(i => (i + 1 < candidates.length ? i + 1 : i))}
      />
    );
  };
  return (
    <section className="scroll-smooth focus:scroll-auto">
      <Header />
      {/* Program tabs */}
      <div className="max-w-7xl mx-auto px-4 pt-10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTab('completed')}
            className={`px-4 py-2 rounded-md border transition
                        ${tab === 'completed' ? 'bg-accent on-accent border-accent' : 'border-accent'}`}
            aria-pressed={tab === 'completed'}
          >
            Completed Program
          </button>
          <button
            type="button"
            onClick={() => setTab('upcoming')}
            className={`px-4 py-2 rounded-md border transition
                        ${tab === 'upcoming' ? 'bg-accent on-accent border-accent' : 'border-accent'}`}
            aria-pressed={tab === 'upcoming'}
          >
            Upcoming Program
          </button>
        </div>
      </div>
      {/* Completed tab: quick in-page nav to multiple completed programs */}
      {tab === 'completed' && (
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <div className="flex flex-wrap gap-3">
            <a href="#spike-prime" className="px-3 py-1 rounded-md border border-accent">Spike Prime Bootcamp</a>
            <a href="#intro-workshop" className="px-3 py-1 rounded-md border border-accent">Intro to Robotics Workshop</a>
          </div>
        </div>
      )}
      {tab === 'completed' && (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-full md:w-2/3">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 title">
                <span className="text-hex">Spike Prime</span> Robotics Bootcamp
              </h1>
              <span className="inline-block text-sm font-medium px-3 py-1 rounded-md border border-accent mb-6">
                Completed Program
              </span>
              <p className="mb-4 text-sm sm:text-base md:text-lg">
                A 6-week, hands-on learning experience focused on LEGO Spike Prime robotics,
                programming, and team-based problem solving. Hosted in collaboration with the
                CBU Robotics Club, the bootcamp blended workshops, a scavenger hunt, CAD and
                3D printing, and a final team competition.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
                {[
                  { label: 'Duration', value: '6 weeks' },
                  { label: 'Participants', value: '50+ learners' },
                  { label: 'Highlights', value: 'Competition, Workshops, CBU Robotics Club' }
                ].map((h, i) => (
                  <div key={i} className="p-4 interactive-card">
                    <p className="text-xs uppercase tracking-wide opacity-75">{h.label}</p>
                    <p className="mt-1 text-lg font-semibold">{h.value}</p>
                  </div>
                ))}
              </div>

              {/* Activities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Workshops',
                    desc: 'Core modules on building, programming, and sensor integration with Spike Prime.'
                  },
                  {
                    title: 'Scavenger Hunt',
                    desc: 'Teams solved engineering clues while applying robotics concepts in the field.'
                  },
                  {
                    title: 'CAD & 3D Printing',
                    desc: 'Introduced simple CAD workflows to prototype attachments and parts.'
                  },
                  {
                    title: 'Final Competition',
                    desc: 'Showcase event with challenges testing speed, precision, and teamwork.'
                  }
                ].map((a, i) => (
                  <div key={i} className="p-6 interactive-card">
                    <h3 className="text-hex text-xl font-bold mb-2">{a.title}</h3>
                    <p className="opacity-90">{a.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="w-full md:w-1/3">
              <h2 className="text-2xl font-bold mb-4">Event Gallery</h2>
              <div className="grid grid-cols-2 gap-3">
                {spikeGallery.map((p, i) => (
                  <ImageWithFallback
                    key={i}
                    src={p}
                    alt={`Spike Prime event ${i + 1}`}
                    className="w-full h-28 md:h-32 lg:h-36 object-cover rounded-lg img-hover-tilt"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* New Completed Program: Introduction to Robotics and Programming Workshop */}
      {tab === 'completed' && (
        <div id="intro-workshop" className="max-w-7xl mx-auto px-4 py-12">
          {/* Hero / Introduction */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-3 title">
              Introduction to Robotics and Programming Workshop – <span className="text-hex">Completed Program</span>
            </h1>
            <span className="inline-block text-sm font-medium px-3 py-1 rounded-md border border-accent mb-4">
              Completed Program
            </span>
            <p className="text-sm sm:text-base md:text-lg max-w-3xl">
              Robotics education is a powerful catalyst for opportunity in Zambia. Despite perceptions about limited infrastructure
              and job prospects, hands-on robotics and programming help learners build critical thinking, creativity, and problem-solving
              skills. These workshops bridge the digital divide and open pathways to innovation, entrepreneurship, and future-ready careers.
            </p>
            {/* Optional banner (replace with an existing file in your folder) */}
            <div className="mt-6 rounded-xl overflow-hidden interactive-card">
              <img
                src={url('resources/IntroRoboticsWorkshop/IMG_4428.jpg')}
                alt="Introduction to Robotics and Programming Workshop"
                className="w-full h-56 md:h-72 object-cover"
                loading="lazy"
              />
            </div>
          </div>
          {/* Program Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="interactive-card p-6">
              <h3 className="text-xl font-bold mb-2 text-hex">Why Robotics in Zambia?</h3>
              <p className="opacity-90">
                Beyond the myths that robotics is impractical, the field develops transferable skills and stimulates local innovation.
                It supports economic growth by nurturing problem solvers who can tackle community challenges with technology.
              </p>
            </div>
            <div className="interactive-card p-6">
              <h3 className="text-xl font-bold mb-2 text-hex">Workshop Goals</h3>
              <ul className="list-disc list-inside space-y-1 opacity-90">
                <li>Ignite curiosity and confidence with hands-on builds</li>
                <li>Bridge the digital divide using accessible tools</li>
                <li>Foster teamwork, communication, and leadership</li>
                <li>Promote STEM pathways for long-term growth</li>
              </ul>
            </div>
          </div>
          {/* Impact Areas */}
          <h2 className="text-2xl font-bold mb-4">Impact Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {[
              {
                title: 'Addressing Challenges in the Zambian Landscape',
                points: [
                  'Filling educational gaps with blended learning',
                  'Tinkercad integration for safe circuit prototyping',
                  'Hands-on activities for lasting understanding'
                ]
              },
              {
                title: 'Tackling Youth Unemployment',
                points: [
                  'Alignment with market skills: Python, C++, Arduino',
                  'Foundations in microcontrollers and robotics',
                  'Portfolio-building through practical projects'
                ]
              },
              {
                title: 'Improving Education Quality',
                points: [
                  'Critical thinking and problem-solving',
                  'Collaborative teamwork and peer learning',
                  'Creativity through design and iteration'
                ]
              },
              {
                title: 'Promoting Inclusivity and Community Development',
                points: [
                  'Broad age range participation (as young as 6)',
                  'Reducing gender disparities via outreach',
                  'Community showcases and parent engagement'
                ]
              }
            ].map((block, i) => (
              <div key={i} className="interactive-card p-6">
                <h3 className="text-xl font-bold mb-2 text-hex">{block.title}</h3>
                <ul className="list-disc list-inside space-y-1 opacity-90">
                  {block.points.map((pt, j) => <li key={j}>{pt}</li>)}
                </ul>
              </div>
            ))}
          </div>

          {/* Unique Insights */}
          <h2 className="text-2xl font-bold mb-4">Unique Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { title: 'Empowering Local Innovators', desc: 'Learners prototype solutions to local challenges, building agency and ownership.' },
              { title: 'Sustainable Development (SDGs)', desc: 'Aligns with quality education, decent work, and industry innovation.' },
              { title: 'Global Collaboration', desc: 'Encourages partnerships with clubs, universities, and global mentors.' }
            ].map((item, i) => (
              <div key={i} className="interactive-card p-6">
                <h3 className="text-xl font-bold mb-2 text-hex">{item.title}</h3>
                <p className="opacity-90">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Community & National Impact */}
          <div className="interactive-card p-6 mb-10">
            <h2 className="text-2xl font-bold mb-2">Community & National Impact</h2>
            <p className="opacity-90">
              Robotics education strengthens the local economy, attracts investment, and nurtures an innovation culture.
              By equipping youth with modern skills, workshops like this accelerate Zambia’s progress and competitiveness.
            </p>
          </div>

          {/* Role of Stakeholders */}
          <h2 className="text-2xl font-bold mb-4">Role of Stakeholders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {[
              { title: 'Educators', desc: 'Integrate project-based robotics and encourage experimentation.' },
              { title: 'Parents & Community', desc: 'Support participation and celebrate achievements.' },
              { title: 'Policymakers', desc: 'Invest in STEM infrastructure and teacher training.' },
              { title: 'Private Sector & Non-profits', desc: 'Provide mentorships, internships, and sponsorships.' }
            ].map((s, i) => (
              <div key={i} className="interactive-card p-6">
                <h3 className="text-xl font-bold mb-2 text-hex">{s.title}</h3>
                <p className="opacity-90">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Conclusion */}
          <div className="interactive-card p-6 mb-10">
            <h2 className="text-2xl font-bold mb-2">Conclusion</h2>
            <p className="opacity-90">
              This completed workshop prepared youth for future careers, fostered innovation, and contributed to national development.
              Its lasting impact continues as learners apply their skills in schools, clubs, and community projects.
            </p>
          </div>
          {/* Gallery */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Workshop Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {introGallery.map((p, i) => (
                <ImageWithFallback
                  key={i}
                  src={p}
                  alt={`Intro Robotics Workshop ${i + 1}`}
                  className="w-full h-28 md:h-40 object-cover rounded-lg img-hover-tilt"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Program: wraps your existing section */}
      {tab === 'upcoming' && (
        <>
          {/* Hero Section */}
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  <span className="text-hex">Plastal-Bot</span> 5-Day Robotics & AI Bootcamp
                </h1>
                <p className="mb-6 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
                  Experience an intensive hands-on journey into robotics and AI. Master essential tools
                  like TinkerCad, Fusion 360, ROS2, and more while building real-world projects.
                </p>
                <Button label="Register Now" href="/events" />
              </div>
              <div className="w-full md:w-1/2">
                <ThemedImage
                  alt="Empowering Innovation"
                  src="resources/Illustrations/Robotarmbro.svg"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Daily Schedule */}
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Daily Schedule</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 table-head">
                  <tr className="text-left">
                    <th className="p-4 font-bold table-cell">Day & Title</th>
                    <th className="p-4 font-bold table-cell">Topics</th>
                    <th className="p-4 font-bold table-cell">Tools</th>
                  </tr>
                </thead>
                <tbody>
                  {days.map((day, index) => (
                    <tr key={index} className="table-row">
                      <td className="p-4">
                        <h3 className="text-hex text-xl font-bold">{day.day}</h3>
                        <p className="font-medium">{day.title}</p>
                      </td>
                      <td className="p-4">
                        <ul className="list-disc list-inside space-y-2">
                          {day.topics.map((topic, i) => (
                            <li key={i}>{topic}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="p-4">
                        <p className="mb-2">Tools:</p>
                        <div className="flex flex-wrap gap-3">
                          {day.tools.map((tool, i) =>
                            tool.icon ? (
                              <img
                                key={i}
                                src={asset(tool.icon)}
                                alt="Tool icon"
                                className="w-8 h-8 hover:scale-110 transition-transform"
                              />
                            ) : null
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold mb-8">What You'll Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Practical Skills', desc: 'Hands-on experience with industry-standard tools and technologies' },
                { title: 'Project Experience', desc: 'Complete a real-world robotics project from concept to implementation' },
                { title: 'Technical Knowledge', desc: 'Master fundamentals of robotics, electronics, and AI integration' },
                { title: 'Career Growth', desc: 'Certificate and portfolio piece to showcase your capabilities' }
              ].map((item, index) => (
                <div key={index} className="p-6 rounded-lg interactive-card">
                  <h3 className="text-hex text-xl font-bold mb-4">{item.title}</h3>
                  <p className="opacity-90">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-7xl mx-auto px-4 text-center mb-4">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="mb-8 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
              Limited spots available. Secure your place in this transformative
              5-day bootcamp and take your first step into the world of robotics and AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Button label="Register Now" href="/events" />
              <Button label="Download Syllabus" href="#" />
            </div>
          </div>
        </>
      )}

      <Footer />
    </section>
  );

};

export default Programs;