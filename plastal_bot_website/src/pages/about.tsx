import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About: React.FC = () => {
  return (
    <section className="container scroll-smooth focus:scroll-auto text-white">
      {/* Navigation Bar  */}
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">
        {/* Flexbox-based bento box layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Box 1: Our Story (Large) */}
          <div className="p-6 rounded-lg col-span-2 flex flex-col justify-between border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
            <h3 className="text-3xl font-bold">
              <span className="text-hex">Our <span className="text-white">Story</span></span>
            </h3>
            <p>
              Founded in Zambia, our organization began with a mission to provide young people with
              skills and knowledge to tackle modern challenges. What started as a local initiative
              has now grown to have global ambitions, addressing educational and environmental
              challenges across Africa and beyond.
            </p>
          </div>

          {/* Box 2: Mission & Vision (Small) */}
          <div className="p-6 rounded-lg col-span-1 border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
            <h3 className="text-3xl font-bold mb-4">
              <span className="text-hex">Mission & <span className="text-white">Projects</span></span>
            </h3>
            <p>
              Our mission is to empower young people by teaching them the skills they need to create
              sustainable solutions through technology, robotics, and environmental advocacy.
            </p>
          </div>

          {/* Box 3: Core Team (Small) */}
          <div className="p-6 rounded-lg col-span-1 border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-hex">Our</span> Team
            </h2>
            <p>
              Meet the amazing people leading our organization to success, with backgrounds in
              technology, education, and environmental advocacy.
            </p>
          </div>

          {/* Box 4: Team Member 1 */}
          <div className="p-6 rounded-lg col-span-1 flex items-center border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
            <img src="/Resources/founders/sepo.jpeg" alt="Sepo Konayuma" className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h3 className="text-lg font-semibold">
                <span className="text-hex">Sepo <span className="text-white">Konayuma</span></span>
              </h3>
              <p>Co-Founder & CEO</p>
            </div>
          </div>

          {/* Box 5: Team Member 2 */}
          <div className="p-6 rounded-lg col-span-1 flex items-center border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
            <img src="/Resources/founders/fred.png" alt="Fred" className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h3 className="text-lg font-semibold">
                <span className="text-hex">Fred <span className="text-white">M'Kuna</span></span>
              </h3>
              <p>Lead-Trainer</p>
            </div>
          </div>

          {/* Box 6: Team Member 3 */}
          <div className="p-6 rounded-lg col-span-1 flex items-center border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
            <img src="/Resources/founders/Wazingwa Mugala.jpeg" alt="Wazingwa Mungala" className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h3 className="text-lg font-semibold">
                <span className="text-hex">Wazingwa <span className="text-white">Mungala</span></span>
              </h3>
              <p>Creative Director</p>
            </div>
          </div>

          {/* Box 7: Team Member 4 */}
          <div className="p-6 rounded-lg col-span-1 flex items-center border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
            <img src="/Resources/founders/fredrick1.png" alt="Fredrick Mwepu" className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h3 className="text-lg font-semibold">
                <span className="text-hex">Fredrick <span className="text-white">Mwepu</span></span>
              </h3>
              <p>Co-Founder & CTO</p>
            </div>
          </div>

          {/* Box 8: Team Member 5 */}
          <div className="p-6 rounded-lg col-span-1 flex items-center border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
            <img src="/Resources/founders/sepo.jpeg" alt="Mapalo Kazembe" className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h3 className="text-lg font-semibold">
                <span className="text-hex">Mapalo <span className="text-white">Kazembe</span></span>
              </h3>
              <p>Tech Lead Instructor</p>
            </div>
          </div>

          {/* Box 9: Team Member 6 */}
          <div className="p-6 rounded-lg col-span-1 flex items-center border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
            <img src="/Resources/founders/madam_pamela.jpg" alt="Pamala Mutale" className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h3 className="text-lg font-semibold">
                <span className="text-hex">Pamala <span className="text-white">Mutale</span></span>
              </h3>
              <p>Advisor</p>
            </div>
          </div>

          {/* Box 10: Milestones (Large) */}
          <div className="p-6 rounded-lg col-span-2 flex flex-col justify-between border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
            <div className="rounded-lg col-span-1 mb-4">
              <h2 className="text-3xl font-bold mb-4">Milestones</h2>
            </div>
            <ol className="ml-4 relative border-s border-gray-200 dark:border-gray-700">
              <li className="mb-10 ms-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">Introduction to Robotics and Programming Workshop</h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">18th May 2024</time>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Details of the workshop...</p>
              </li>
              <li className="mb-10 ms-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">Next Workshop</h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Coming Soon</time>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">Stay tuned for updates...</p>
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </section>
  );
};

export default About;
