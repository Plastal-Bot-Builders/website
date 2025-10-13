import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { asset } from '../utils/asset';
import ThemedImage from '../theme/ThemedImage';

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

  // Add these state variables
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  // Add these functions
  const handleShowBio = (index: number) => {
    setSelectedMember(index);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const handleCloseBio = () => {
    setSelectedMember(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const navigate = useNavigate();

  return (
    <section className="text-inherit">
      {/* Navigation Bar */}
      <Header />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
          {/* Text Content */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-hex">About</span> Plastal-Bot Builders Org
            </h1>

            <p className="my-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
              Empowering the next generation through robotics, technology, and sustainability
              lies at the heart of our mission. We believe that by equipping young minds with
              the tools to innovate, create, and solve problems, we can inspire a future driven
              by ingenuity and responsibility.
            </p>

            <p className="text-sm sm:text-base md:text-lg">
              Through our programs, we introduce students and young
              professionals to cutting-edge robotics and technology, fostering skills that are not
              only relevant but transformative in today's world. By integrating sustainability into
              our initiatives, we emphasize the importance of creating solutions that address
              real-world challenges while preserving the environment for generations to come.
            </p>
          </div>

          {/* Image Container */}
          <div className="w-full md:w-1/2">
            <div className="mt-4 md:mt-0">
              <ThemedImage
                src="resources/Illustrations/Storyboard-bro.svg"
                alt="Empowering Innovation Image"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between p-4 space-y-8 md:space-y-0 md:space-x-8 max-w-7xl mx-auto">
        <div className="w-full md:w-1/2 p-2">
          <div className="image mt-4">
            <ThemedImage
              alt="Empowering Innovation Image"
              src="resources/Illustrations/Connecting_teams_bro.svg"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        {/* Our Story */}
        <div className="w-full md:w-1/2 p-4">
          <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight md:text-4xl lg:text-5xl">
            <span className="text-hex "> Our </span> Story
          </h1>
          <p className="my-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
            Founded in Zambia, our organization began with a mission to empower young
            people by equipping them with the skills and knowledge needed to tackle
            modern challenges in an ever-evolving world. What started as a grassroots
            initiative driven by a passion for education and innovation has transformed
            into a dynamic movement with global ambitions.
          </p>
          <p className="my-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
            We are committed to addressing critical challenges not only in education but
            also in environmental sustainability, leveraging technology, creativity,
            and collaboration. Across Africa and beyond, we partner with communities,
            schools, and industry leaders to create opportunities that inspire the next
            generation of leaders, innovators, and problem-solvers. Our programs have evolved
            to include cutting-edge workshops, hands-on learning experiences, and initiatives
            that prioritize inclusivity and long-term impact.
          </p>
          <p className="my-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
            As we continue to grow, our vision remains rooted in the belief that equipping
            young people with the right tools today will shape a brighter, more sustainable
            future for all.
          </p>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">
        {/* Mission & Vision */}
        <div className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight md:text-4xl lg:text-5xl title">
              <span className="text-hex "> Our </span> Mission
            </h1>
            <p className="my-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
              Our mission is to empower young people to become innovators and change-makers by equipping them with the skills and knowledge to create sustainable solutions. Through technology, robotics, and environmental advocacy, we aim to inspire the next generation to tackle real-world challenges, drive impactful change, and contribute to a more equitable and sustainable future.
            </p>

            <img
              src={asset('resources/Photos/group.png')}
              alt="Bootcamp"
              className="w-full h-auto object-cover rounded-lg"
            />

            <p className="my-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
              By fostering creativity, critical thinking, and a sense of responsibility, we strive to nurture individuals who can harness the power of technology to address pressing global issues, from environmental conservation to social innovation. Our mission is rooted in the belief that young people hold the key to shaping a better world, and we are committed to providing them with the tools and opportunities to succeed.
            </p>
          </div>
          <div>
            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight md:text-4xl lg:text-5xl">
              <span className="text-hex "> Our </span> Vision
            </h1>
            <p className="my-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
              Our vision is to inspire and nurture a generation of bold problem-solvers and innovative thinkers who will harness the power of technology and robotics to create a brighter, more sustainable future for their communities and the world at large. We envision a future where young minds are empowered to think critically, dream big, and take decisive action to solve complex challenges with creativity and purpose.
            </p>

            <img
              src={asset('resources/Photos/dywen.jpg')}
              alt="Bootcamp"
              className="w-full h-auto object-cover rounded-lg"
            />
            <p className="my-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
              By fostering a culture of innovation, collaboration, and inclusivity, we aim to build a world where technology serves as a force for good—bridging gaps, addressing inequalities, and advancing sustainable development. Our vision extends beyond teaching technical skills; we strive to instill a mindset of resilience, adaptability, and ethical responsibility, ensuring that the leaders of tomorrow are equipped not just to succeed but to make a meaningful difference.
            </p>
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-12 our-team-section">
          <h1 className="mb-8 text-2xl font-extrabold leading-none tracking-tight md:text-4xl lg:text-5xl">
            <span className="text-hex"> Our </span> Team
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="team-member rounded-lg border-2 border-gray-300 hover:border-accent transition duration-300 ease-in-out p-6 flex flex-col items-center text-center transform hover:scale-105 hover:shadow-xl"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="relative mb-6 group">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-blue-500 opacity-75 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-300"></div>
                  <img
                    src={asset(member.imgSrc)}
                    alt={member.name}
                    className="relative w-32 h-32 rounded-full mb-4 border-4 border-accent hover:rotate-6 transition-transform duration-300 object-cover"
                  />
                  <div className="absolute -bottom-3 left-0 right-0 mx-auto flex justify-center gap-2 scale-0 group-hover:scale-100 transition-transform duration-300 origin-bottom">
                    {member.social && (
                      <>
                        {member.social.linkedin && (
                          <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer"
                            className="bg-accent w-8 h-8 rounded-full flex items-center justify-center text-black">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                          </a>
                        )}
                        {member.social.twitter && (
                          <a href={member.social.twitter} target="_blank" rel="noopener noreferrer"
                            className="bg-accent w-8 h-8 rounded-full flex items-center justify-center text-black">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.16a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                            </svg>
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-hex mb-3">{member.role}</p>

                <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-300">
                  <button
                    onClick={() => handleShowBio(index)}
                    className="text-sm text-accent hover:text-accent-dark transition-colors"
                  >
                    Read Bio
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bio Modal */}
          {selectedMember !== null && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={handleCloseBio}>
              <div
                className="bg-card max-w-lg w-full rounded-lg p-6 transform scale-in-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={asset(teamMembers[selectedMember].imgSrc)}
                    alt={teamMembers[selectedMember].name}
                    className="w-16 h-16 rounded-full border-2 border-accent"
                  />
                  <div>
                    <h3 className="text-xl font-bold">{teamMembers[selectedMember].name}</h3>
                    <p className="text-hex">{teamMembers[selectedMember].role}</p>
                  </div>
                </div>

                <p className="mb-4">
                  {teamMembers[selectedMember].bio ||
                    `${teamMembers[selectedMember].name} is a dedicated professional with extensive experience in their field. 
                   They bring valuable expertise to our team and are committed to our mission of empowering the next generation 
                   through robotics and technology.`}
                </p>

                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-accent text-black rounded hover:bg-opacity-80"
                    onClick={handleCloseBio}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="bg-accent on-accent text-center py-12 rounded-lg">
          <h2 className="text-2xl font-bold">Join Us</h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">Be part of the movement. Help us shape the future of robotics and technology in Africa.</p>
          <button
            className="mt-6 bg-gray-900 text-white py-2 px-6 rounded hover:bg-gray-700"
            onClick={() => navigate('/Learn_More')} // This route doesn't exist
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </section>
  );
};

export default About;
