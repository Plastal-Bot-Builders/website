import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { asset } from '../utils/asset';
import ThemedImage from '../theme/ThemedImage';
import DecryptedText from '../components/ui/DecryptedText';
import { SEOConfig } from '../components/SEO';
import FadeContent from '../components/ui/FadeContent';

const About: React.FC = () => {

  const teamMembers = [
    {
      imgSrc: "/resources/founders/sepo.jpeg",
      name: "Sepo Konayuma",
      role: "Co-Founder & CEO",
      bio: "Sepo is a visionary leader with a passion for technology education. With over 10 years of experience in the tech industry, he co-founded Plastal-Bot Builders to empower youth through robotics and innovation.",
      social: {
        linkedin: "https://linkedin.com/in/sepo-konayuma",
        twitter: "https://twitter.com/sepokonayuma"
      }
    },
    { 
      imgSrc: "/resources/founders/fred.png", 
      name: "Fred M'Kuna", 
      role: "Lead-Trainer",
      bio: "Fred M'kuna is a visionary leader with a passion for technology education. With over 10 years of experience in the tech industry, he co-founded Plastal-Bot Builders to empower youth through robotics and innovation.",
      social: {
        linkedin: "https://linkedin.com/in/sepo-konayuma",
        twitter: "https://twitter.com/sepokonayuma"
      } 
    },
    { 
      imgSrc: "/resources/founders/WazingwaMugala.jpeg", 
      name: "Wazingwa Mungala", 
      role: "Creative Director",
      bio: "Sepo is a visionary leader with a passion for technology education. With over 10 years of experience in the tech industry, he co-founded Plastal-Bot Builders to empower youth through robotics and innovation.",
      social: {
        linkedin: "https://linkedin.com/in/sepo-konayuma",
        twitter: "https://twitter.com/sepokonayuma"
      } 
    },
    { 
      imgSrc: "/resources/founders/fredrick1.png", 
      name: "Fredrick Mwepu", 
      role: "Co-Founder & CTO", 
      bio: "Fredrick Mwepu is a visionary leader with a passion for technology education. With over 10 years of experience in the tech industry, he co-founded Plastal-Bot Builders to empower youth through robotics and innovation.",
      social: {
        linkedin: "https://linkedin.com/in/sepo-konayuma",
        twitter: "https://twitter.com/sepokonayuma"
      }      
    },
    { 
      imgSrc: "/resources/founders/sepo.jpeg", 
      name: "Mapalo Kazembe", 
      role: "Tech Lead Instructor",
      bio: "Sepo is a visionary leader with a passion for technology education. With over 10 years of experience in the tech industry, he co-founded Plastal-Bot Builders to empower youth through robotics and innovation.",
      social: {
        linkedin: "https://linkedin.com/in/sepo-konayuma",
        twitter: "https://twitter.com/sepokonayuma"
      } 
    },
    { 
      imgSrc: "/resources/founders/madam_pamela.jpg", 
      name: "Pamala Mutale", 
      role: "Advisor",
      bio: "Sepo is a visionary leader with a passion for technology education. With over 10 years of experience in the tech industry, he co-founded Plastal-Bot Builders to empower youth through robotics and innovation.",
      social: {
        linkedin: "https://linkedin.com/in/sepo-konayuma",
        twitter: "https://twitter.com/sepokonayuma"
      } 
    }, 
  ];

  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleShowBio = (index: number) => {
    setSelectedMember(index);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseBio = () => {
    setSelectedMember(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <SEOConfig
        title="About | Plastal-Bot Builders"
        description="Learn more about Plastal-Bot Builders, our mission, and the team behind our innovative programs."
        image="/resources/Photos/fredmpelembe.jpeg"
      />
      
      <div className="scroll-smooth focus:scroll-auto">
        <Header />
        
        {/* Hero Section */}
        <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
          <section className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 lg:gap-12">
                {/* Text Content */}
                <div className="w-full md:w-1/2 space-y-6">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                    <span className="text-hex">About</span> Plastal-Bot Builders Org
                  </h1>
                  <DecryptedText
                    text="Empowering the next generation through robotics, technology, and sustainability lies at the heart of our mission. We believe that by equipping young minds with the tools to innovate, create, and solve problems, we can inspire a future driven by ingenuity and responsibility."
                    parentClassName="block"
                    className="text-sm sm:text-base md:text-lg leading-relaxed"
                    animateOn="view"
                    revealDirection="start"
                  />
                  <DecryptedText
                    text="Through hands-on learning experiences, mentorship, and community engagement, we strive to cultivate a passion for STEM fields while fostering a deep appreciation for environmental stewardship. Our programs are designed to empower youth to become proactive problem-solvers who can leverage technology to address real-world challenges, ultimately contributing to a more sustainable and equitable future for all."
                    parentClassName="block"
                    className="text-sm sm:text-base md:text-lg leading-relaxed"
                    animateOn="view"
                    revealDirection="start"
                  />
                </div>
                
                {/* Image Container */}
                <div className="w-full md:w-1/2 flex items-center justify-center">
                  <ThemedImage
                    src="resources/Illustrations/Storyboard-bro.svg"
                    alt="Empowering Innovation Image"
                    className="w-full max-w-lg h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Our Story Section */}
        <FadeContent blur={true} duration={1200} easing="ease-out" initialOpacity={0} delay={200}>
          <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 lg:gap-12">
                {/* Image First on Desktop */}
                <div className="w-full md:w-1/2 order-2 md:order-1 flex items-center justify-center">
                  <ThemedImage
                    alt="Connecting Teams"
                    src="resources/Illustrations/Connecting_teams_bro.svg"
                    className="w-full max-w-lg h-auto object-contain"
                  />
                </div>
                
                {/* Our Story Text */}
                <div className="w-full md:w-1/2 order-1 md:order-2 space-y-6">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                    <span className="text-hex">Our</span> Story
                  </h2>
                  <DecryptedText
                    text="Founded in Zambia, our organization began with a mission to empower young people by equipping them with the skills and knowledge needed to tackle modern challenges in an ever-evolving world. What started as a grassroots initiative driven by a passion for education and innovation has transformed into a dynamic movement with global ambitions."
                    className="text-sm sm:text-base md:text-lg leading-relaxed"
                    parentClassName="block"
                    animateOn="view"
                    revealDirection="start"
                  />
                  <DecryptedText
                    text="We are committed to addressing critical challenges not only in education but also in environmental sustainability, leveraging technology, creativity, and collaboration. Across Africa and beyond, we partner with communities, schools, and industry leaders to create opportunities that inspire the next generation of leaders, innovators, and problem-solvers. Our programs have evolved"
                    className="text-sm sm:text-base md:text-lg leading-relaxed"
                    parentClassName="block"
                    animateOn="view"
                    revealDirection="start"
                  />
                  <DecryptedText
                    className="text-sm sm:text-base md:text-lg leading-relaxed"
                    text="As we continue to grow, our vision remains rooted in the belief that equipping young people with the right tools today will shape a brighter, more sustainable future for all."
                    parentClassName="block"
                    animateOn="view"
                    revealDirection="start"
                  />
                </div>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Mission & Vision Section */}
        <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={300}>
          <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
                {/* Mission */}
                <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight title">
                    <span className="text-hex">Our</span> Mission
                  </h2>
                  <DecryptedText
                    className="text-sm sm:text-base md:text-lg leading-relaxed"
                    text="Our mission is to empower young people to become innovators and change-makers by equipping them with the skills and knowledge to create sustainable solutions. Through technology, robotics, and environmental advocacy, we aim to inspire the next generation to tackle real-world challenges, drive impactful change, and contribute to a more equitable and sustainable future."
                    parentClassName="block"
                    animateOn="view"
                    revealDirection="start"
                  />

                  <img
                    src={asset('resources/Photos/group.png')}
                    alt="Team collaboration"
                    className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-lg"
                  />

                  <DecryptedText 
                    className="text-sm sm:text-base md:text-lg leading-relaxed"
                    text="By fostering creativity, critical thinking, and a sense of responsibility, we strive to nurture individuals who can harness the power of technology to address pressing global issues, from environmental conservation to social innovation. Our mission is rooted in the belief that young people hold the key to shaping a better world, and we are committed to providing them with the tools and opportunities to succeed."
                    parentClassName="block"
                    animateOn="view"
                    revealDirection="start"
                  />
                </div>

                {/* Vision */}
                <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                    <span className="text-hex">Our</span> Vision
                  </h2>
                  <DecryptedText 
                    className="text-sm sm:text-base md:text-lg leading-relaxed"
                    text="Our vision is to inspire and nurture a generation of bold problem-solvers and innovative thinkers who will harness the power of technology and robotics to create a brighter, more sustainable future for their communities and the world at large. We envision a future where young minds are empowered to think critically, dream big, and take decisive action to solve complex challenges with creativity and purpose."
                    parentClassName="block"
                    animateOn="view"
                    revealDirection="start"
                  />

                  <img
                    src={asset('resources/Photos/dywen.jpg')}
                    alt="Student project"
                    className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-lg"
                  />
                  
                  <DecryptedText 
                    className="text-sm sm:text-base md:text-lg leading-relaxed"
                    text="By fostering a culture of innovation, collaboration, and inclusivity, we aim to build a world where technology serves as a force for good—bridging gaps, addressing inequalities, and advancing sustainable development. Our vision extends beyond teaching technical skills; we strive to instill a mindset of resilience, adaptability, and ethical responsibility, ensuring that the leaders of tomorrow are equipped not just to succeed but to make a meaningful difference."
                    parentClassName="block"
                    animateOn="view"
                    revealDirection="start"
                  />
                </div>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Our Team Section */}
        <FadeContent blur={true} duration={1200} easing="ease-out" initialOpacity={0} delay={200}>
          <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
            <div className="max-w-7xl mx-auto">
              <h2 className="mb-8 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                <span className="text-hex">Our</span> Team
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="interactive-card p-6 flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="relative mb-6 group">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-blue-500 opacity-75 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-300"></div>
                      <img
                        src={asset(member.imgSrc)}
                        alt={member.name}
                        className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-accent hover:rotate-6 transition-transform duration-300 object-cover"
                      />
                      <div className="absolute -bottom-3 left-0 right-0 mx-auto flex justify-center gap-2 scale-0 group-hover:scale-100 transition-transform duration-300 origin-bottom">
                        {member.social && (
                          <>
                            {member.social.linkedin && (
                              <a 
                                href={member.social.linkedin} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-accent w-8 h-8 rounded-full flex items-center justify-center text-black hover:bg-accent-dark transition-colors"
                                aria-label={`${member.name}'s LinkedIn`}
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                              </a>
                            )}
                            {member.social.twitter && (
                              <a 
                                href={member.social.twitter} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-accent w-8 h-8 rounded-full flex items-center justify-center text-black hover:bg-accent-dark transition-colors"
                                aria-label={`${member.name}'s Twitter`}
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.16a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                                </svg>
                              </a>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-hex mb-3 text-sm sm:text-base">{member.role}</p>

                    <button
                      onClick={() => handleShowBio(index)}
                      className="mt-auto text-sm text-accent hover:text-accent-dark transition-colors"
                    >
                      Read Bio
                    </button>
                  </div>
                ))}
              </div>

              {/* Bio Modal */}
              {selectedMember !== null && (
                <div 
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm" 
                  onClick={handleCloseBio}
                >
                  <div
                    className="interactive-card max-w-lg w-full rounded-lg p-6 sm:p-8 transform scale-in-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={asset(teamMembers[selectedMember].imgSrc)}
                        alt={teamMembers[selectedMember].name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-accent object-cover"
                      />
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold">{teamMembers[selectedMember].name}</h3>
                        <p className="text-hex text-sm sm:text-base">{teamMembers[selectedMember].role}</p>
                      </div>
                    </div>

                    <p className="mb-6 text-sm sm:text-base leading-relaxed">
                      {teamMembers[selectedMember].bio ||
                        `${teamMembers[selectedMember].name} is a dedicated professional with extensive experience in their field. 
                      They bring valuable expertise to our team and are committed to our mission of empowering the next generation 
                      through robotics and technology.`}
                    </p>

                    <div className="flex justify-end">
                      <button
                        className="px-4 py-2 bg-accent text-black rounded hover:bg-accent-dark transition-colors"
                        onClick={handleCloseBio}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </FadeContent>

        {/* Call to Action */}
        <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={400}>
          <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
            <div className="max-w-7xl mx-auto">
              <div className="interactive-card p-8 sm:p-12 text-center" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)' }}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Join Us</h2>
                <p className="text-sm sm:text-base md:text-lg text-white mb-6">
                  Be part of the movement. Help us shape the future of robotics and technology in Africa.
                </p>
                <button
                  className="bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
                  onClick={() => navigate('/programs')}
                >
                  Learn More
                </button>
              </div>
            </div>
          </section>
        </FadeContent>

        <Footer />
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes scale-in-center {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .scale-in-center {
          animation: scale-in-center 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        }
      `}</style>
    </>
  );
};

export default About;