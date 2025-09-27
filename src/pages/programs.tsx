import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { asset } from '../utils/asset';


const Programs: React.FC = () => {
    const [tab, setTab] = useState<'completed' | 'upcoming'>('completed');
    const url = (p: string) => encodeURI(asset(p));
    const spikeGallery = [
        'resources/SpikePrime/SCAVENGER HUNT (1 of 82).jpg',
        'resources/SpikePrime/SCAVENGER HUNT (5 of 82).jpg',
        'resources/SpikePrime/SCAVENGER HUNT (22 of 82).jpg',
        'resources/SpikePrime/SCAVENGER HUNT (3 of 82).jpg',
        'resources/SpikePrime/SCAVENGER HUNT (2 of 82).jpg',
        'resources/SpikePrime/SCAVENGER HUNT (4 of 82).jpg',
        'resources/SpikePrime/SCAVENGER HUNT (23 of 82).jpg',
        'resources/SpikePrime/SCAVENGER HUNT (6 of 82).jpg',
        'resources/SpikePrime/SCAVENGER HUNT (10 of 82).jpg',
        'resources/SpikePrime/SCAVENGER HUNT (11 of 82).jpg'
    ];
    interface Tool {
        icon: string | null;
        containerStyle?: {
          display: string;
          flexDirection: string;
          alignItems: string;
          gap: string;
        };
    }
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

            {/* Completed Program: Spike Prime Robotics Bootcamp */}
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
                    <img
                        key={i}
                        src={url(p)}
                        alt={`Spike Prime event ${i + 1}`}
                        className="w-full h-28 md:h-32 lg:h-36 object-cover rounded-lg img-hover-tilt"
                        loading="lazy"
                    />
                    ))}
                </div>
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
                <Button label="Register Now" href="/membershipform" />
              </div>
              <div className="w-full md:w-1/2">
                <img src={asset('resources/GIF/Robotarm.gif')} alt="Bootcamp" className="w-full"/>
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
              <Button label="Register Now" href="/membershipform" />
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