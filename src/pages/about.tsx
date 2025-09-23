import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { asset } from '../utils/asset';

const About: React.FC = () => {

  const teamMembers = [
    { imgSrc: "/resources/founders/sepo.jpeg", name: "Sepo Konayuma", role: "Co-Founder & CEO" },
    { imgSrc: "/resources/founders/fred.png", name: "Fred M'Kuna", role: "Lead-Trainer" },
    { imgSrc: "/resources/founders/Wazingwa Mugala.jpeg", name: "Wazingwa Mungala", role: "Creative Director" },
    { imgSrc: "/resources/founders/fredrick1.png", name: "Fredrick Mwepu", role: "Co-Founder & CTO" },
    { imgSrc: "/resources/founders/sepo.jpeg", name: "Mapalo Kazembe", role: "Tech Lead Instructor" },
    { imgSrc: "/resources/founders/madam_pamela.jpg", name: "Pamala Mutale", role: "Advisor" },
  ];

  useEffect(() => {
    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Animate the "Our Story" section
    gsap.from(".our-story", {
      scrollTrigger: {
        trigger: ".our-story",
        start: "top 80%", // Start animation when 80% of the section is visible
        end: "top 20%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 50,
      duration: 1,
    });

    // Animate each team member
    gsap.from(".team-member", {
      scrollTrigger: {
        trigger: ".team-member",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      scale: 0.8,
      stagger: 0.2,
      duration: 0.8,
    });

    // Animate milestones
    gsap.from(".milestone", {
      scrollTrigger: {
        trigger: ".milestones",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      x: 100,
      stagger: 0.3,
      duration: 1,
    });
  }, []);
  
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 title">
              <span className="text-hex">About</span> <span className="text-current"> Plastal-Bot Builders Org </span>
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
              <img 
                src={asset('resources/Illustrations/Storyboard-bro.svg')}
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
              <img alt="Empowering Innovation Image" height="200"
                      src={asset('resources/Illustrations/Connecting_teams_bro.svg')}
                      width="800" className="w-full h-auto object-cover" />
          </div>
        </div>
        {/* Our Story */}
        <div className="w-full md:w-1/2 p-4">
          <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight md:text-4xl lg:text-5xl dark:text-white title">
            <span className="text-hex "> Our </span> <span className="text-current"> Story </span>
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
            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
              <span className="text-hex "> Our <span className="text-white"> Mission</span></span>
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
            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
              <span className="text-hex "> Our <span className="text-white"> Vision </span></span>
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
        <div className="mb-12">
          <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight md:text-4xl lg:text-5xl title">
            <span className="text-hex "> Our </span> <span className="text-current"> Team </span>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out p-6 flex flex-col items-center text-center"
              >
                <img
                  src={asset(member.imgSrc)}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mb-4 border-4 border-[#0CFFBB]"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-[#0CFFBB]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-[#0CFFBB] text-black text-center py-12 rounded-lg">
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
