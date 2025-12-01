import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageCarousel from '../components/ImageCarousel';
import LogoCarousel from '../components/LogoCarousel';
import Button from '../components/Button';
import { asset } from '../utils/asset';
import ThemedImage from '../theme/ThemedImage';
import { SEOConfig } from '../components/SEO';
import DecryptedText from '../components/ui/DecryptedText';
import CountUp from '../components/ui/CountUp';
import { FaHandshake, FaGraduationCap, FaGlobe } from 'react-icons/fa';
import FadeContent from '../components/ui/FadeContent';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  useEffect(() => {
    const hash = window.location.hash;
    if(hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if(element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

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
    <>
      <SEOConfig
        title="Home | Plastal-Bot Builders"
        description="Welcome to Plastal-Bot Builders, where we inspire the next generation of innovators through robotics and technology education."
        image="/resources/home-featured-image.jpg"
      />
      <div className="scroll-smooth focus:scroll-auto">
        <Header />
        
        {/* Hero Section */}
        <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
          <section className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 lg:gap-12">
                <div className="w-full md:w-1/2 space-y-6">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                    <span className="text-hex">Empowering</span> Innovation
                  </h1>

                  <DecryptedText
                    text="Welcome to Plastal-Bot Builders! We're on a mission to transform technology education in Zambia and beyond. Through our innovative robotics programs and hands-on learning experiences, we're empowering young minds to become the tech leaders of tomorrow."
                    parentClassName="block"
                    className="text-sm sm:text-base md:text-lg leading-relaxed"
                    animateOn="view"
                    revealDirection="start"
                  />
                  
                  <DecryptedText
                    text="Our journey began with a simple belief: every young person deserves access to quality technology education. Today, we offer programs in robotics, programming, and digital innovation—building real pathways into the tech ecosystem."
                    parentClassName="block"
                    className="text-sm sm:text-base md:text-lg leading-relaxed"
                    animateOn="view"
                    revealDirection="start"
                  />
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button label="Become a Member" href="/membershipform" />
                    <Button label="Get Involved" href="/programs" />
                  </div>
                </div>

                <div className="w-full md:w-1/2 flex items-center justify-center">
                  <ThemedImage
                    alt="Empowering Innovation"
                    src="resources/Illustrations/EmpoweringInnovation.svg"
                    className="w-full max-w-lg h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Section: Innovating Through Technology */}
        <FadeContent blur={true} duration={1200} easing="ease-out" initialOpacity={0} delay={200}>
          <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
                <span className="text-hex">Innovating</span> Through Technology
              </h2>

              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-semibold text-hex mb-3">
                  Empowering Zambia's Next Generation of Tech Leaders
                </h3>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  We blend hands-on engineering with creative problem-solving in robotics, coding, and digital innovation.
                  Through workshops, bootcamps, and project-based learning, we're preparing young innovators to tackle real-world challenges.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Large Project Showcase */}
                <div className="lg:col-span-2 interactive-card p-6 sm:p-8">
                  <ImageCarousel />
                  <h3 className="mt-6 mb-4 text-2xl sm:text-3xl font-extrabold leading-tight title">
                    <span className="text-hex">Latest</span> Project Showcase
                  </h3>
                  <DecryptedText
                    text="Students built an environmental monitoring robotics system using Arduino-based sensors to track air and water quality."
                    parentClassName="block mb-4"
                    className="text-sm sm:text-base md:text-lg leading-relaxed"
                    animateOn="view"
                    revealDirection="start"
                  />
                  <DecryptedText
                    text="The project strengthened engineering, coding, and analytical skills while exploring sustainability-focused solutions."
                    parentClassName="block mb-6"
                    className="text-sm sm:text-base md:text-lg leading-relaxed"
                    animateOn="view"
                    revealDirection="start"
                  />
                  <button
                    className="custom-button"
                    type="button"
                    onClick={() => navigate('/projects')}
                  >
                    View Project Details
                  </button>
                </div>

                {/* Illustration Column */}
                <div className="flex justify-center items-center p-4">
                  <ThemedImage
                    src="resources/Illustrations/Visionarytechnology.svg"
                    alt="Visionary technology illustration"
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </div>
              </div>

              {/* Feature Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {[{
                  img: 'research.svg',
                  title: 'Research Opportunities',
                  text: 'Join programs in robotics, AI, and sustainable technology.'
                }, {
                  img: 'mentor.svg',
                  title: 'Mentorship Program',
                  text: 'Guidance from experienced engineers and tech professionals.'
                }, {
                  img: 'team.svg',
                  title: 'Partner With Us',
                  text: 'Support our mission to empower young innovators.'
                }].map((c, i) => (
                  <div
                    key={i}
                    className="interactive-card overflow-hidden"
                  >
                    <div className="flex items-center space-x-2 p-3 bg-gray-100 dark:bg-gray-900">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="w-full md:w-1/2 p-4">
                        <ThemedImage
                          src={`resources/Illustrations/${c.img}`}
                          alt={c.title}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                      <div className="w-full md:w-1/2 p-6">
                        <h4 className="mb-3 text-lg font-extrabold leading-tight">
                          <span className="text-hex">{c.title.split(' ')[0]} </span>
                          {c.title.split(' ').slice(1).join(' ')}
                        </h4>
                        <p className="text-sm leading-relaxed">
                          {c.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Fostering Innovation / Enhancing Education */}
        <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={300}>
          <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
                <div className="flex flex-col space-y-6">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                    <span className="text-hex">Fostering</span> Innovation
                  </h2>
                  <DecryptedText
                    text="We empower young minds through robotics, programming, and problem-solving—building future-ready creators."
                    parentClassName="block"
                    className="text-sm sm:text-base md:text-lg leading-relaxed"
                    animateOn="view"
                    revealDirection="start"
                  />
                  <ThemedImage
                    src="resources/Illustrations/Cyborg-bro.svg"
                    alt="Robotics innovation"
                    className="w-full max-w-md h-auto mx-auto mt-auto"
                  />
                </div>

                <div className="flex flex-col space-y-6">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                    <span className="text-hex">Enhancing</span> Education
                  </h2>
                  <DecryptedText
                    text="Interactive workshops and mentorship make technology education accessible and practical for all."
                    parentClassName="block"
                    className="text-sm sm:text-base md:text-lg leading-relaxed"
                    animateOn="view"
                    revealDirection="start"
                  />
                  <ThemedImage
                    src="resources/Illustrations/Mathematics-bro.svg"
                    alt="Technology education"
                    className="w-full max-w-md h-auto mx-auto mt-auto"
                  />
                </div>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Discover Impact */}
        <FadeContent blur={true} duration={1200} easing="ease-out" initialOpacity={0} delay={200}>
          <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
                <span className="text-hex">Discover Our</span> Impact
              </h2>

              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-semibold text-hex mb-3">
                  Building Tomorrow's Tech Leaders Today
                </h3>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                  We combine robotics, coding, and creative problem-solving to transform education.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  Explore how student projects and outreach are making tech education impactful and inclusive.
                </p>
              </div>

              {/* Impact Bento Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                <div className="lg:col-span-2 interactive-card p-6 sm:p-8">
                  <h3 className="mb-4 text-2xl sm:text-3xl font-extrabold leading-tight">
                    <span className="text-hex">Empowering</span> Young Innovators
                  </h3>
                  <div className="relative mb-4">
                    <img
                      src={asset('resources/Photos/group.png')}
                      alt="Students learning robotics"
                      className="w-full h-48 sm:h-64 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg">
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                        <p className="text-white font-semibold text-xs sm:text-sm">
                          <DecryptedText text="Students collaborating during a hands-on robotics workshop" />
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                    We've created hands-on pathways in robotics, programming, and sustainability-focused tech learning.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6">
                    Hundreds of learners have gained applied skills through our workshops and training series.
                  </p>
                  <button
                    className="custom-button"
                    type="button"
                    onClick={() => navigate('/events')}
                  >
                    Join Our Next Workshop
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="interactive-card p-6 flex flex-col justify-center items-center text-center h-full">
                    <h4 className="mb-3 text-xl sm:text-2xl font-extrabold title">
                      <span className="text-hex">Tech</span> Training
                    </h4>
                    <p className="text-sm sm:text-base leading-relaxed">
                      Robotics, programming, and digital skills for all levels.
                    </p>
                  </div>
                </div>
              </div>

              {/* Second Bento Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="interactive-card p-6 flex flex-col justify-center items-center text-center">
                  <h4 className="mb-3 text-xl sm:text-2xl font-extrabold title">
                    <span className="text-hex">Youth</span> Programs
                  </h4>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Specialized bootcamps for learners aged 12–25.
                  </p>
                </div>

                <div className="lg:col-span-2 interactive-card p-6 sm:p-8">
                  <h4 className="mb-4 text-xl sm:text-2xl font-extrabold title">
                    <span className="text-hex">Our</span> Impact
                  </h4>
                  <div className="relative mb-4">
                    <img
                      src={asset('resources/Photos/dywen.jpg')}
                      alt="Student project"
                      className="w-full h-32 sm:h-40 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg">
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                        <p className="text-white font-semibold text-xs sm:text-sm">
                          <DecryptedText text="Student showcasing innovative robotics project" />
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                    500+ students trained, 50+ projects launched, and growing partnerships across tech.
                  </p>
                  <button
                    className="custom-button"
                    type="button"
                    onClick={() => navigate('/workshop-details')}
                  >
                    Join Our Next Workshop
                  </button>
                </div>
              </div>

              {/* Leadership Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                <div className="lg:col-span-2 interactive-card p-6 sm:p-8">
                  <h4 className="mb-4 text-xl sm:text-2xl font-extrabold">
                    <span className="text-hex">Building</span> Tomorrow's Leaders
                  </h4>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                    Beyond technical skills, we foster leadership and entrepreneurial thinking.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                    Partnerships open pathways to industry exposure and advanced study opportunities.
                  </p>
                </div>

                <div className="interactive-card p-6 flex flex-col justify-center items-center text-center">
                  <h4 className="mb-3 text-xl sm:text-2xl font-extrabold title">
                    <span className="text-hex">Join</span> Us
                  </h4>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Begin your journey—enroll in upcoming programs and workshops.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Partners Section */}
        <FadeContent blur={true} duration={1200} easing="ease-out" initialOpacity={0} delay={300}>
          <section id="partners" className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
                <span className="text-hex">Our Partners</span> in Innovation
              </h2>

              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-semibold text-hex mb-3">
                  Global Collaboration Driving Local Impact
                </h3>
                <DecryptedText
                  text="We collaborate with world-class robotics teams and mentors to bring international expertise to Zambian students. Through these partnerships, we unlock opportunities in STEM education, technical mentorship, and cross-cultural innovation."
                  parentClassName="block"
                  className="text-sm sm:text-base md:text-lg leading-relaxed"
                  animateOn="view"
                  revealDirection="start"
                />
              </div>

              {/* Technicbots Bento Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                {/* Large Feature Card - Technicbots Team */}
                <div className="lg:col-span-2 interactive-card p-6 sm:p-8">
                  <h3 className="mb-4 text-2xl sm:text-3xl font-extrabold leading-tight title">
                    <span className="text-hex">Technicbots</span> - FTC Team 8565
                  </h3>
                  <div className="relative mb-4">
                    <img
                      src={asset('resources/technicbots/teamphoto.png')}
                      alt="Technicbots team at competition"
                      className="w-full h-48 sm:h-64 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg">
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                        <p className="text-white font-semibold text-xs sm:text-sm">
                          <DecryptedText text="Technicbots FTC Team 8565 at international robotics competition" />
                        </p>
                      </div>
                    </div>
                  </div>
                  <DecryptedText
                    text="Based in Plano, Texas, Technicbots is a FIRST Hall of Fame team with 16+ years of excellence in robotics competition and community outreach. Their 2022 FIRST World Championship Inspire Award and 2023 FIRST Global Challenge Gold Medal demonstrate their commitment to innovation and collaboration."
                    parentClassName="block mb-4"
                    className="text-sm sm:text-base md:text-lg leading-relaxed"
                    animateOn="view"
                    revealDirection="start"
                  />
                  <DecryptedText
                    text="Through partnerships with Plastal-Bot Builders, Technicbots shares resources, mentorship expertise, and technical guidance—helping Zambian students access world-class robotics education and international competition opportunities."
                    parentClassName="block mb-6"
                    className="text-sm sm:text-base md:text-lg leading-relaxed"
                    animateOn="view"
                    revealDirection="start"
                  />
                  <button
                    className="custom-button"
                    type="button"
                    onClick={() => navigate('/team/technicbots')}
                  >
                    Learn More About Technicbots
                  </button>
                </div>

                {/* Tall Card - David Profile */}
                <div id="david" className="interactive-card p-6 sm:p-8 flex flex-col">
                  <h3 className="mb-4 text-xl sm:text-2xl font-extrabold leading-tight title">
                    <span className="text-hex">Meet</span> David
                  </h3>
                  <div className="relative mb-4">
                    <img
                      src={asset('resources/technicbots/DavidHue.jpg')}
                      alt="David - International Mentor"
                      className="w-full h-48 sm:h-64 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg">
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                        <p className="text-white font-semibold text-xs sm:text-sm">
                          <DecryptedText text="David - International mentor and robotics education advocate" />
                        </p>
                      </div>
                    </div>
                  </div>
                  <DecryptedText
                    text="International collaborator and mentor who first met the Plastal-Bot Builders team at the 2022 FIRST Global Competition in Geneva. David has been instrumental in our growth—supporting fundraising, guiding student projects, and making advanced tools like Fusion 360 accessible."
                    parentClassName="block mb-6"
                    className="text-sm sm:text-base md:text-lg leading-relaxed"
                    animateOn="view"
                    revealDirection="start"
                  />
                  <button
                    className="mt-auto custom-button"
                    type="button"
                    onClick={() => navigate('/team/david')}
                  >
                    Read David's Story
                  </button>
                </div>
              </div>

              {/* Impact Stats Card */}
              <div className="interactive-card p-6 sm:p-8 mb-4">
                <h3 className="mb-6 text-xl sm:text-2xl font-extrabold leading-tight title">
                  <span className="text-hex">Partnership</span> Impact
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-accent">
                      <CountUp
                        from={0}
                        to={2000}
                        separator=","
                        prefix="$"
                        duration={2.5}
                        className="inline"
                      />
                    </p>
                    <p className="text-xs sm:text-sm text-current mt-1">Fundraising Support</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-accent">
                      <CountUp
                        from={0}
                        to={2000}
                        separator=","
                        suffix="+"
                        duration={2.5}
                        className="inline"
                      />
                    </p>
                    <p className="text-xs sm:text-sm text-current mt-1">Outreach Hours</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-accent">
                      <CountUp
                        from={0}
                        to={8000}
                        separator=","
                        suffix="+"
                        duration={2.5}
                        className="inline"
                      />
                    </p>
                    <p className="text-xs sm:text-sm text-current mt-1">Students Impacted</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-accent">
                      <CountUp
                        from={0}
                        to={16}
                        separator=","
                        suffix="+"
                        duration={2.5}
                        className="inline"
                      />
                    </p>
                    <p className="text-xs sm:text-sm text-current mt-1">Years of Excellence</p>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-surface">
                  <DecryptedText
                    text="Through 16+ years of dedicated service, our partners have contributed over $2,000 in fundraising support, invested 2,000+ outreach hours, and positively impacted more than 8,000 students. This collaboration continues to strengthen STEM education and create lasting opportunities for young innovators across Zambia and beyond."
                    parentClassName="block"
                    className="text-sm sm:text-base md:text-lg text-center leading-relaxed"
                    animateOn="view"
                    revealDirection="start"
                  />
                </div>
              </div>

              {/* Global Reach Card */}
              <div className="interactive-card p-6 flex flex-col justify-center items-center text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent flex items-center justify-center text-white mb-4">
                  <FaGlobe className="text-3xl sm:text-4xl" />
                </div>
                <h4 className="mb-3 text-xl sm:text-2xl font-extrabold title">
                  <span className="text-hex">Global</span> Reach
                </h4>
                <p className="text-sm sm:text-base leading-relaxed">
                  From Geneva to Zambia—building bridges through robotics
                </p>
              </div>

              {/* Key Initiatives Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="interactive-card p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent flex items-center justify-center text-white flex-shrink-0">
                      <FaHandshake className="text-xl sm:text-2xl" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold title">Equipment Support</h4>
                  </div>
                  <DecryptedText
                    text="LEGO Spike Prime kits, Arduino sets, and 3D printers funded through collaborative fundraising."
                    parentClassName="block"
                    className="text-sm sm:text-base leading-relaxed"
                    animateOn="view"
                    revealDirection="start"
                  />
                </div>

                <div className="interactive-card p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent flex items-center justify-center text-white flex-shrink-0">
                      <FaGraduationCap className="text-xl sm:text-2xl" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold title">Mentorship Programs</h4>
                  </div>
                  <DecryptedText
                    text="Direct guidance on projects like WasteWizard, self-balancing robots, and smart EV dashboards."
                    parentClassName="block"
                    className="text-sm sm:text-base leading-relaxed"
                    animateOn="view"
                    revealDirection="start"
                  />
                </div>

                <div className="interactive-card p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent flex items-center justify-center text-white flex-shrink-0">
                      <FaGlobe className="text-xl sm:text-2xl" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold title">International Exchange</h4>
                  </div>
                  <DecryptedText
                    text="Cross-border collaboration exposing Zambian students to global robotics standards and competition pathways."
                    parentClassName="block"
                    className="text-sm sm:text-base leading-relaxed"
                    animateOn="view"
                    revealDirection="start"
                  />
                </div>
              </div>

              {/* Quote/Testimonial Section */}
              <div className="mt-6 interactive-card p-6 sm:p-8" style={{ background: 'linear-gradient(135deg, var(--surface-bg) 0%, var(--surface-hover-bg) 100%)' }}>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-full md:w-1/3 relative">
                    <img
                      src={asset('resources/technicbots/withman.jpg')}
                      alt="Partnership in action"
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg">
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                        <p className="text-white font-semibold text-xs sm:text-sm">
                          <DecryptedText text="Collaboration between Plastal-Bot Builders and international partners" />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <blockquote className="mb-4">
                      <DecryptedText
                        text="The partnership with Technicbots has opened doors we didn't know existed. From fundraising to technical mentorship, their support has accelerated our mission to make robotics education accessible across Zambia."
                        parentClassName="block"
                        className="text-base sm:text-lg md:text-xl italic leading-relaxed"
                        animateOn="view"
                        revealDirection="start"
                      />
                    </blockquote>
                    <p className="text-accent font-semibold text-sm sm:text-base">
                      — Plastal-Bot Builders Team
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeContent>

        {/* Newsletter */}
        <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={400}>
          <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                    <span className="text-hex">Subscribe To Our</span> Newsletter
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                    Stay connected—get updates on learning opportunities and innovation.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
                    <li>Upcoming workshops and bootcamps</li>
                    <li>Success stories</li>
                    <li>New program launches</li>
                    <li>Tech insights & trends</li>
                    <li>Exclusive events & networking</li>
                  </ul>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                    Join a growing community of innovators shaping Zambia's digital future.
                  </p>
                  <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-4"
                  >
                    <input
                      id="newsletter-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      aria-label="Email address"
                      className="newsletter-input flex-1"
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="custom-button disabled:opacity-50"
                    >
                      {status === 'loading' ? 'Sending...' : 'Subscribe'}
                    </button>
                  </form>
                  {status === 'ok' && (
                    <p className="text-sm text-green-500">Subscribed successfully!</p>
                  )}
                  {status === 'error' && (
                    <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
                  )}
                </div>
                <div className="flex items-center justify-center">
                  <ThemedImage
                    src="resources/Illustrations/Subscriber.svg"
                    alt="Newsletter illustration"
                    className="w-full max-w-lg h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </section>
        </FadeContent>

        <LogoCarousel />
        <Footer />
      </div>
    </>
  );
};

export default Home;