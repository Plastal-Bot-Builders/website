import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About: React.FC = () => {

  const teamMembers = [
    { imgSrc: "/resources/founders/sepo.jpeg", name: "Sepo Konayuma", role: "Co-Founder & CEO" },
    { imgSrc: "/resources/founders/fred.png", name: "Fred M'Kuna", role: "Lead-Trainer" },
    { imgSrc: "/resources/founders/Wazingwa Mugala.jpeg", name: "Wazingwa Mungala", role: "Creative Director" },
    { imgSrc: "/resources/founders/fredrick1.png", name: "Fredrick Mwepu", role: "Co-Founder & CTO" },
    { imgSrc: "/resources/founders/sepo.jpeg", name: "Mapalo Kazembe", role: "Tech Lead Instructor" },
    { imgSrc: "/resources/founders/madam_pamela.jpg", name: "Pamala Mutale", role: "Advisor" },
  ];

  const milestonesData = [
    {
      title: "Introduction to Robotics and Programming Workshop",
      date: "18th May 2024",
      description: "We conducted the first workshop introducing students to the basics of programming and robotics. This included hands-on experiences with Python, Scratch, and robotics kits.",
    },
    {
      title: "Next Workshop",
      date: "Coming Soon",
      description: "Stay tuned for updates...",
    },
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
   
  return (
    <section className="text-white">
      {/* Navigation Bar */}
      <Header />

      {/* Hero Section */}
      <div className="flex flex-row max-w-7xl mx-auto p-8">
        <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                <span className="text-hex"> About </span> Plastal-Bot Builders Org
            </h1>
            <p className="mb-6">
              Empowering the next generation through robotics, technology, and sustainability
              lies at the heart of our mission. We believe that by equipping young minds with 
              the tools to innovate, create, and solve problems, we can inspire a future driven 
              by ingenuity and responsibility. 
            </p>

            <p className="my-4">
              Through our programs, we introduce students and young 
              professionals to cutting-edge robotics and technology, fostering skills that are not 
              only relevant but transformative in today’s world. By integrating sustainability into 
              our initiatives, we emphasize the importance of creating solutions that address 
              real-world challenges while preserving the environment for generations to come.
            </p>
        </div>
        <div className="w-full md:w-1/2 p-2">
            <img src="/resources/Logo/logo_trans.png" alt="Bootcamp" className="w-full h-auto object-cover"/>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">
        {/* Our Story */}
        <div className="mb-12">

          <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
            <span className="text-hex "> Our<span className="text-white"> Story </span></span>
          </h1>
          <p className="my-4">
            Founded in Zambia, our organization began with a mission to empower young 
            people by equipping them with the skills and knowledge needed to tackle 
            modern challenges in an ever-evolving world. What started as a grassroots 
            initiative driven by a passion for education and innovation has transformed
            into a dynamic movement with global ambitions.
          </p>
          <p className="my-4">
            We are committed to addressing critical challenges not only in education but 
            also in environmental sustainability, leveraging technology, creativity, 
            and collaboration. Across Africa and beyond, we partner with communities, 
            schools, and industry leaders to create opportunities that inspire the next 
            generation of leaders, innovators, and problem-solvers. Our programs have evolved 
            to include cutting-edge workshops, hands-on learning experiences, and initiatives 
            that prioritize inclusivity and long-term impact.
          </p>
          <p className="my-4">
            As we continue to grow, our vision remains rooted in the belief that equipping 
            young people with the right tools today will shape a brighter, more sustainable 
            future for all.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
              <span className="text-hex "> Our <span className="text-white"> Mission</span></span>
            </h1>
          
            <p>
              Our mission is to empower young people by teaching them the skills they need to create
              sustainable solutions through technology, robotics, and environmental advocacy.
            </p>
          </div>
          <div>
          <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
              <span className="text-hex "> Our <span className="text-white"> Vision </span></span>
            </h1>
            <p>
              To inspire a generation of problem-solvers and innovators who will use technology and
              robotics to create a better future for their communities and the world.
            </p>
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-12">
          <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
            <span className="text-hex "> Our <span className="text-white"> Team </span></span>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="rounded-lg  border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out p-6 flex flex-col items-center text-center"
              >
                <img
                  src={member.imgSrc}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mb-4 border-4 border-[#0CFFBB]"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-[#0CFFBB]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold border-b-2 border-[#0CFFBB] inline-block mb-4">Milestones</h2>
          <ol className="relative border-l border-gray-200 dark:border-gray-700">
            {milestonesData.map((milestone, index) => (
              <li key={index} className="mb-10 ml-6">
                <div className="absolute w-4 h-4 bg-[#0CFFBB] rounded-full -left-2.5 border border-white"></div>
                <h3 className="text-lg font-semibold">{milestone.title}</h3>
                <time className="block mb-2 text-sm text-gray-400">{milestone.date}</time>
                <p>{milestone.description}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Call to Action */}
        <div className="bg-[#0CFFBB] text-black text-center py-12 rounded-lg">
          <h2 className="text-2xl font-bold">Join Us</h2>
          <p className="mt-4">Be part of the movement. Help us shape the future of robotics and technology in Africa.</p>
          <button className="mt-6 bg-gray-900 text-white py-2 px-6 rounded hover:bg-gray-700">
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
