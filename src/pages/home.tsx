import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageCarousel from '../components/ImageCarousel';
import LogoCarousel from '../components/LogoCarousel';
import Button from '../components/Button';
import styled from 'styled-components';
import { asset } from '../utils/asset';
import ThemedImage from '../theme/ThemedImage';

const InputField = styled.input`
  background-color: transparent;
  border: 1px solid #d1d5db;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: border-color 0.3s ease;
  width: 100%;
  height: 3rem;
  &:hover {
    border-color: #0CFFBB;
  }
  &:focus {
    outline: none;
    border-color: #0CFFBB;
    box-shadow: 0 0 0 3px rgba(12, 255, 187, 0.5);
  }
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;
    setStatus('loading');
    try {
      const resp = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (resp.ok) {
        setStatus('ok');
        setEmail('');
      } else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="scroll-smooth focus:scroll-auto">
      <Header />

      {/* Hero */}
      <div className="flex flex-col md:flex-row justify-between p-4 space-y-8 md:space-y-0 md:space-x-8 max-w-7xl mx-auto">
        <div className="w-full md:w-1/2 p-4">
          <div className="text">
            <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight title">
              <span className="text-hex">Empowering</span> <span className="text-current">Innovation</span>
            </h1>
            <p className="my-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
              Welcome to Plastal-Bot Builders! We're on a mission to transform technology education
              in Zambia and beyond. Through our innovative robotics programs and hands-on learning
              experiences, we're empowering young minds to become the tech leaders of tomorrow.
            </p>
            <p className="mb-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
              Our journey began with a simple belief: every young person deserves access to quality technology
              education. Today, we offer programs in robotics, programming, and digital innovation—building real pathways
              into the tech ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-12">
              <Button label="Become a Member" href="/membershipform" />
              <Button label="Get Involved" href="/programs" />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-2">
          <div className="image mt-24">
            <ThemedImage 
              alt="Empowering Innovation"
              src="resources/Illustrations/Data_extraction.svg"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Section: Innovating Through Technology */}
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight title">
          <span className="text-hex">Innovating</span> <span className="text-current">Through Technology</span>
        </h1>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-hex mb-4">
            Empowering Zambia's Next Generation of Tech Leaders
          </h2>
          <p className="mb-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
            We blend hands-on engineering with creative problem-solving in robotics, coding, and digital innovation.
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
            Through workshops, bootcamps, and project-based learning, we’re preparing young innovators to tackle real-world challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
          {/* Large Showcase */}
          <div className="col-span-1 md:col-span-2 md:row-span-2 mb-4">
            <ImageCarousel />
            <h1 className="mt-4 mb-8 text-2xl md:text-3xl font-extrabold leading-none tracking-tight title">
              <span className="text-hex">Latest </span> Project Showcase
            </h1>
            <p className="my-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
              Students built an environmental monitoring robotics system using Arduino-based sensors to track air and water quality.
            </p>
            <p className="my-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
              The project strengthened engineering, coding, and analytical skills while exploring sustainability-focused solutions.
            </p>
            <button
              className="mt-4 custom-button"
              type="button"
              onClick={() => navigate('/project-details')}
            >
              View Project Details
            </button>
          </div>

            {/* Tall Illustration */}
            <div className="col-span-1 md:row-span-2 flex justify-center items-center p-4">
              <ThemedImage
                src="resources/Illustrations/Visionarytechnology.svg"
                alt="Visionary technology illustration"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>

            {/* Mac Window Cards */}
            {[{
              img: 'research.svg',
              title: 'Research Opportunities',
              text: 'Join programs in robotics, AI, and sustainable technology.'
            },{
              img: 'mentor.svg',
              title: 'Mentorship Program',
              text: 'Guidance from experienced engineers and tech professionals.'
            },{
              img: 'team.svg',
              title: 'Partner With Us',
              text: 'Support our mission to empower young innovators.'
            }].map((c, i) => (
              <div
                key={i}
                className="col-span-1 row-span-1 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center space-x-2 p-3 bg-gray-100 dark:bg-gray-900">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="w-full md:w-1/2">
                    <ThemedImage
                      src={`resources/Illustrations/${c.img}`}
                      alt={c.title}
                      className="w-full h-full object-cover p-2"
                    />
                  </div>
                  <div className="w-full md:w-1/2 p-6">
                    <h2 className="mb-4 text-lg font-extrabold leading-none tracking-tight text-gray-800 dark:text-gray-100">
                      <span className="text-hex">{c.title.split(' ')[0]} </span>
                      {c.title.split(' ').slice(1).join(' ')}
                    </h2>
                    <p className="text-sm text-gray-700 dark:text-gray-100">
                      {c.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Fostering Innovation / Enhancing Education */}
      <div className="flex flex-col md:flex-row justify-between max-w-7xl mx-auto p-8 gap-8">
        <div className="w-full md:w-1/2 flex flex-col">
          <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight title">
            <span className="text-hex">Fostering</span> <span className="text-current">Innovation</span>
          </h1>
          <p className="my-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
            We empower young minds through robotics, programming, and problem-solving—building future-ready creators.
          </p>
          <ThemedImage
            src="resources/Illustrations/Cyborg-bro.svg"
            alt="Robotics innovation"
            className="w-4/5 h-auto mx-auto mt-auto"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col">
          <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight title">
            <span className="text-hex">Enhancing</span> <span className="text-current">Education</span>
          </h1>
          <p className="my-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
            Interactive workshops and mentorship make technology education accessible and practical for all.
          </p>
          <ThemedImage
            src="resources/Illustrations/Mathematics-bro.svg"
            // Consider renaming file to remove spaces: Mathematics-bro-1.svg
            alt="Technology education"
            className="w-4/5 h-auto mx-auto mt-auto"
          />
        </div>
      </div>

      {/* Discover Impact */}
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight title">
          <span className="text-hex">Discover Our</span> <span className="text-current">Impact</span>
        </h1>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-hex mb-4">
            Building Tomorrow's Tech Leaders Today
          </h2>
          <p className="my-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
            We combine robotics, coding, and creative problem-solving to transform education.
          </p>
          <p className="my-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
            Explore how student projects and outreach are making tech education impactful and inclusive.
          </p>
        </div>

        {/* Impact Bento */}
        <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-2 gap-4">
          <div className="col-span-1 sm:col-span-2 row-span-2 pr-4">
            <h1 className="mb-4 text-2xl md:text-3xl font-extrabold leading-none tracking-tight title">
              <span className="text-hex">Empowering</span> Young <span className="text-hex">Innovators</span>
            </h1>
            <img
              src={asset('resources/Photos/group.png')}
              alt="Students learning robotics"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
              We’ve created hands-on pathways in robotics, programming, and sustainability-focused tech learning.
            </p>
            <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
              Hundreds of learners have gained applied skills through our workshops and training series.
            </p>
            <div className="p-4 flex flex-col">
              <button
                className="mt-auto custom-button"
                type="button"
                onClick={() => navigate('/workshop-details')}
              >
                Join Our Next Workshop
              </button>
            </div>
          </div>

          <div className="col-span-1 flex justify-center items-center p-4 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
            <div>
              <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight title text-center">
                <span className="text-hex">Tech</span> Training
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg text-center">
                Robotics, programming, and digital skills for all levels.
              </p>
            </div>
          </div>

          <div className="col-span-1 flex justify-center items-center p-4 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
            <div>
              <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight title text-center">
                <span className="text-hex">Innovation</span> Hub
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg text-center">
                A space where ideas come alive through mentorship and builds.
              </p>
            </div>
          </div>
        </div>

        {/* Second Bento */}
        <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-2 gap-4 mt-4">
          <div className="col-span-1 row-span-1 flex justify-center items-center p-4 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
            <div>
              <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight title text-center">
                <span className="text-hex">Youth</span> Programs
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg text-center">
                Specialized bootcamps for learners aged 12–25.
              </p>
            </div>
          </div>

          <div className="col-span-1 sm:col-span-2 row-span-1">
            <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight title">
              <span className="text-hex">Our</span> Impact
            </h2>
            <img
              src="resources/Photos/dywen.jpg"
              alt="Student project"
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
              500+ students trained, 50+ projects launched, and growing partnerships across tech.
            </p>
            <button
              className="mt-4 custom-button"
              type="button"
              onClick={() => navigate('/workshop-details')}
            >
              Join Our Next Workshop
            </button>
          </div>

          <div className="mt-4 col-span-1 sm:col-span-2 row-span-1">
            <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight title">
              <span className="text-hex">Building</span> Tomorrow's <span className="text-hex">Leaders</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
              Beyond technical skills, we foster leadership and entrepreneurial thinking.
            </p>
            <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
              Partnerships open pathways to industry exposure and advanced study opportunities.
            </p>
          </div>

          <div className="mt-4 col-span-1 row-span-1 flex justify-center items-center p-4 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
            <div>
              <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight title text-center">
                <span className="text-hex">Join Us</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg text-center">
                Begin your journey—enroll in upcoming programs and workshops.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/2 p-4">
            <div className="text">
              <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-tight title">
                <span className="text-hex">Subscribe To Our</span> <span className="text-current">Newsletter</span>
              </h1>
              <p className="my-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
                Stay connected—get updates on learning opportunities and innovation.
              </p>
              <ul className="list-disc pl-6 my-4 space-y-1 text-sm sm:text-base md:text-lg">
                <li>Upcoming workshops and bootcamps</li>
                <li>Success stories</li>
                <li>New program launches</li>
                <li>Tech insights & trends</li>
                <li>Exclusive events & networking</li>
              </ul>
              <p className="my-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
                Join a growing community of innovators shaping Zambia’s digital future.
              </p>
              <form
                onSubmit={handleSubscribe}
                className="mt-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full"
              >
                <div className="w-full sm:w-auto flex-1">
                  <InputField
                    id="newsletter-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    aria-label="Email address"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="custom-button w-full sm:w-auto disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Email'}
                </button>
              </form>
              {status === 'ok' && (
                <p className="mt-2 text-sm text-green-500">Subscribed successfully.</p>
              )}
              {status === 'error' && (
                <p className="mt-2 text-sm text-red-500">Something went wrong. Try again.</p>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <ThemedImage
              src="resources/Illustrations/Subscriber.svg"
              alt="Newsletter illustration"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>

      <LogoCarousel />
      <Footer />
    </section>
  );
};

export default Home;