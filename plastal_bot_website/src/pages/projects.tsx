import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

const Projects: React.FC = () => {
  const projectsData = [
    {
      title: "Face-Recognition Home Security System",
      description:
        "This project enhances home security using face-recognition technology. It uses a Raspberry Pi and OpenCV for real-time detection, offering a smart solution for home safety.",
      overview:
        "Built to recognize faces and notify homeowners of visitors or intruders. It's designed for low-cost implementation in Zambian households.",
      mediaLinks: [
        { label: "Watch project video", href: "#" },
      ],
      buttonLabel: "Read More",
      buttonLink: "/ProjectDetail",
      imgSrc: "/resources/Illustrations/Deconstructedrobot.svg",
    },
    {
      title: "Robotics for Waste Management & Sustainability",
      description:
        "This project merges robotics and sustainability to address urban waste management. Autonomous robots are used to efficiently sort waste, promoting recycling and environmental conservation.",
      highlights:
        "Deployed in public areas, these robots help reduce manual labor and promote efficient waste sorting in urban settings, leading to a cleaner environment.",
      mediaLinks: [
        { label: "Watch the robots in action", href: "#" },
        { label: "View project photos", href: "#" },
      ],
      imgSrc: "/resources/Illustrations/Deconstructedrobot.svg",
    },
    {
      title: "Future Innovation Projects",
      description:
        "We are constantly working on new ways to use robotics, AI, and sustainable technology to solve real-world problems. Stay tuned for updates on upcoming projects focused on education, sustainability, and more.",
      involvement:
        "Join our innovation team or contact us for partnerships to help shape the future of innovation.",
      mediaLinks: [
        { label: "Join our innovation team", href: "#" },
        { label: "Contact us for partnerships", href: "#" },
      ],
      imgSrc: "/resources/Illustrations/Deconstructedrobot.svg",
    },
    {
      title: "Project Testimonials",
      description:
        "\"The face-recognition system is a breakthrough in home security, providing us peace of mind knowing our home is monitored.\" – Jonathan S.\n\"The waste management robots have transformed the way we manage waste in our community.\" – Lisa M.",
      mediaLinks: [
        { label: "Read more testimonials", href: "#" },
        { label: "See more projects", href: "#" },
      ],
      imgSrc: "/resources/Illustrations/Deconstructedrobot.svg",
    },
  ];

  return (
    <section className="scroll-smooth focus:scroll-auto">
      {/* Navigation Bar */}
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">
        <h1
          className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white"
        >
          <span className="text-hex">
            Innovation<span className="text-white"> Projects</span>
          </span>
        </h1>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out"
            >
              <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
              <p className="mb-4">{project.description}</p>
              <div className="image">
                <img
                  alt={project.title}
                  height="200"
                  src={project.imgSrc}
                  width="800"
                  className="w-full h-auto object-cover"
                />
              </div>

              {project.overview && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Project Overview:</h3>
                  <p>{project.overview}</p>
                </div>
              )}

              {project.highlights && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Project Highlights:</h3>
                  <p>{project.highlights}</p>
                </div>
              )}

              {project.involvement && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Get Involved:</h3>
                  <p>{project.involvement}</p>
                </div>
              )}

              {project.mediaLinks && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Media:</h3>
                  <div>
                    {project.mediaLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.href}
                        className="text-blue-500 hover:underline mr-2"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {project.buttonLabel && project.buttonLink && (
                <div className="mt-4">
                  <Button label={project.buttonLabel} href={project.buttonLink} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </section>
  );
};

export default Projects;
