import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DecryptedText from '../../components/ui/DecryptedText';
import { SEOConfig } from '../../components/SEO';


const Technicbots: React.FC = () => {
  const sections = [
    {
      title: "About Technicbots",
      content: `Technicbots, officially known as FIRST Tech Challenge Team 8565, is a pioneering youth robotics team based in Plano, Texas, dedicated to advancing STEM education and fostering innovation among students. Since its founding in 2009, the team has become a powerhouse of creativity, collaboration, and technical excellence—serving as both a competitive robotics team and a community-driven platform for inspiring future engineers, programmers, and innovators.`
    },
    {
      title: "Championship Legacy",
      content: `Over the years, Technicbots has earned a reputation for excellence on both national and international stages. In the 2021–2022 season, the team received the prestigious Inspire Award at the FIRST World Championship, a recognition that secured their place in the FIRST Hall of Fame—a rare honor that celebrates teams whose work embodies the ideals of the FIRST mission. The following year, they proudly represented Team USA at the FIRST Global Challenge in Geneva, Switzerland, where they achieved a Gold Medal victory in partnership with Team Zimbabwe, symbolizing the power of international collaboration and technological unity.`
    },
    {
      title: "Leadership & Mentorship",
      content: `Under the dedicated mentorship of Dr. Fang Wang, a seasoned software engineer and founder of the Technicbots, the team continues to embody excellence in both engineering and outreach. Dr. Wang's leadership emphasizes not only technical proficiency but also teamwork, leadership, and community impact. Her experience as Vice President of the ACP Foundation and founder of the ACP Robotics Program has enriched Technicbots' mentoring culture, enabling students to thrive beyond competition.`
    },
    {
      title: "Community Impact",
      content: `Each year, the team invests over 2,000 hours in outreach, impacting more than 8,000 people through workshops, mentorship programs, and STEM events. Initiatives like the FLYSET Workshop and Monthly Mentoring Forums bring together students, educators, and professionals to share knowledge, build skills, and nurture curiosity. From FLL Explore to FTC, Technicbots supports every level of the FIRST pipeline, ensuring that younger teams receive the guidance they need to grow.`
    },
    {
      title: "Team Structure & Innovation",
      content: `Technicbots' members—students from schools across North Texas—take on specialized roles in hardware, software, CAD design, business, and scouting, learning to operate as an integrated engineering unit. Their success lies not only in building award-winning robots but also in cultivating a culture of mentorship, innovation, and inclusivity. Supported by youth mentors, alumni, guiding faculties, and generous sponsors, the team continues to expand its impact with each passing season.`
    },
    {
      title: "A Legacy of Excellence",
      content: `With over 16 years of activity, countless innovations, and a growing legacy of community leadership, Technicbots stands as a testament to what young people can achieve when guided by passion, purpose, and teamwork. Whether competing on the world stage or hosting a local workshop, Team 8565 remains committed to building robots that inspire—and a future that empowers.`
    }
  ];


  const achievements = [
    "2022 FIRST World Championship Inspire Award",
    "FIRST Hall of Fame Inductees",
    "2023 FIRST Global Challenge Gold Medal (Team USA)",
    "International collaboration with Team Zimbabwe",
    "Over 2,000 hours of annual community outreach",
    "Impact on 8,000+ people through STEM programs",
    "16+ years of continuous innovation and excellence"
  ];


  const keyInitiatives = [
    "FLYSET Workshop",
    "Monthly Mentoring Forums",
    "FLL Explore to FTC Pipeline Support",
    "Youth Mentor Development Programs",
    "Cross-Team Knowledge Sharing Sessions"
  ];


  return (
    <>
      <SEOConfig
        title="Technicbots - FTC Team 8565 | Plastal-Bot Builders"
        description="Meet Technicbots (FTC 8565), a FIRST Hall of Fame team from Plano, Texas. FIRST World Championship Inspire Award winners, FIRST Global Challenge gold medalists, and dedicated STEM mentors impacting 8,000+ students annually."
        image="/resources/technicbots/teamphoto4.jpg"
      />
      
      <div className="scroll-smooth focus:scroll-auto">
        <Header />

        {/* Hero Section */}
        <section className="relative py-20 px-4" style={{ backgroundColor: 'var(--surface-bg)' }}>
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 title">
              <DecryptedText text="Technicbots" />
            </h1>
            <p className="text-xl md:text-2xl mb-2 text-accent font-semibold">
              <DecryptedText text="FIRST Tech Challenge Team 8565" />
            </p>
            <p className="text-lg text-current opacity-90">
              <DecryptedText text="Plano, Texas | FIRST Hall of Fame | Est. 2009" />
            </p>
          </div>
        </section>


        {/* Main Content Sections */}
        <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
          {sections.map((section, idx) => (
            <section key={idx} className="interactive-card p-8">
              <h2 className="text-3xl font-bold mb-6 text-accent border-b-2 border-accent pb-2">
                <DecryptedText text={section.title} />
              </h2>
              <p className="text-lg leading-relaxed text-current">
                <DecryptedText text="Technicbots, officially known as FIRST Tech Challenge Team 8565, is a pioneering youth robotics team based in Plano, Texas, dedicated to advancing STEM education and fostering innovation among students. Since its founding in 2009, the team has become a powerhouse of creativity, collaboration, and technical excellence—serving as both a competitive robotics team and a community-driven platform for inspiring future engineers, programmers, and innovators." />
              </p>
            </section>
          ))}


          {/* Achievements Grid */}
          <section className="interactive-card p-8">
            <h2 className="text-3xl font-bold mb-6 text-accent border-b-2 border-accent pb-2">
              <DecryptedText text="Key Achievements" />
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map((achievement, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-lg surface-hover"
                  style={{ backgroundColor: 'var(--surface-bg)', border: '1px solid var(--surface-border)' }}
                >
                  <span className="text-accent text-2xl flex-shrink-0">✓</span>
                  <span className="text-current">
                    <DecryptedText text={achievement} />
                  </span>
                </div>
              ))}
            </div>
          </section>


          {/* Key Initiatives */}
          <section className="interactive-card p-8">
            <h2 className="text-3xl font-bold mb-6 text-accent border-b-2 border-accent pb-2">
              <DecryptedText text="Community Initiatives" />
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {keyInitiatives.map((initiative, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg text-center surface-hover"
                  style={{ backgroundColor: 'var(--surface-bg)', border: '2px solid var(--surface-border)' }}
                >
                  <p className="font-semibold text-current">
                    <DecryptedText text={initiative} />
                  </p>
                </div>
              ))}
            </div>
          </section>


          {/* Leadership Highlight */}
          <section className="interactive-card p-8" style={{ background: 'linear-gradient(135deg, var(--surface-bg) 0%, var(--surface-hover-bg) 100%)' }}>
            <h2 className="text-3xl font-bold mb-6 text-accent border-b-2 border-accent pb-2">
              <DecryptedText text="Leadership & Mentorship" />
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  FW
                </div>
                <div>
                  <h3 className="text-xl font-bold title mb-2">
                    <DecryptedText text="Dr. Fang Wang" />
                  </h3>
                  <p className="text-current mb-2">
                    <DecryptedText text="Founder & Lead Mentor | Software Engineer" />
                  </p>
                  <p className="text-current opacity-90 leading-relaxed">
                    <DecryptedText text="Vice President of the ACP Foundation and founder of the ACP Robotics Program. Dr. Wang's leadership emphasizes technical proficiency, teamwork, leadership, and community impact—building a mentoring culture that enables students to thrive beyond competition." />
                  </p>
                </div>
              </div>
            </div>
          </section>


          {/* Call to Action */}
          <section className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4 title">
              <DecryptedText text="Building Robots That Inspire" />
            </h2>
            <p className="text-lg text-current mb-8 max-w-2xl mx-auto">
              <DecryptedText text="From the workshop to the world stage, Technicbots continues to empower the next generation of innovators through robotics, mentorship, and community leadership." />
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.technicbots.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="custom-button"
              >
                Visit Technicbots Website
              </a>
              <a
                href="/team/david"
                className="custom-button"
              >
                Meet Our Collaborator David
              </a>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Technicbots;


