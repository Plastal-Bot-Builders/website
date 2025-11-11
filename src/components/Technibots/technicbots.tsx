import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DecryptedText from '../../components/ui/DecryptedText';
import { SEOConfig } from '../../components/SEO';

const Technicbots: React.FC = () => {
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

        {/* Bento Grid Layout */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
            
            {/* Large Feature Card - About */}
            <div className="md:col-span-2 lg:col-span-2 interactive-card p-8">
              <h2 className="text-3xl font-bold mb-4 text-accent">
                <DecryptedText text="About Technicbots" />
              </h2>
              <p className="text-lg leading-relaxed text-current">
                <DecryptedText text="Technicbots, officially known as FIRST Tech Challenge Team 8565, is a pioneering youth robotics team based in Plano, Texas, dedicated to advancing STEM education and fostering innovation among students. Since its founding in 2009, the team has become a powerhouse of creativity, collaboration, and technical excellence—serving as both a competitive robotics team and a community-driven platform for inspiring future engineers, programmers, and innovators." />
              </p>
            </div>

            {/* Stats Card */}
            <div className="interactive-card p-8 text-center flex flex-col justify-center" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-dark, #1a5490) 100%)' }}>
              <div className="text-white">
                <div className="text-5xl font-bold mb-2">2000+</div>
                <p className="text-lg opacity-90">Annual Outreach Hours</p>
              </div>
              <div className="mt-6 text-white">
                <div className="text-5xl font-bold mb-2">8000+</div>
                <p className="text-lg opacity-90">People Impacted</p>
              </div>
            </div>

            {/* Championship Legacy */}
            <div className="interactive-card p-8">
              <h2 className="text-2xl font-bold mb-4 text-accent">
                <DecryptedText text="Championship Legacy" />
              </h2>
              <p className="text-current leading-relaxed">
                <DecryptedText text="In the 2021–2022 season, the team received the prestigious Inspire Award at the FIRST World Championship, securing their place in the FIRST Hall of Fame. The following year, they represented Team USA at the FIRST Global Challenge in Geneva, achieving a Gold Medal victory with Team Zimbabwe." />
              </p>
            </div>

            {/* Leadership Card */}
            <div className="md:col-span-2 interactive-card p-8" style={{ background: 'linear-gradient(135deg, var(--surface-bg) 0%, var(--surface-hover-bg) 100%)' }}>
              <h2 className="text-2xl font-bold mb-6 text-accent">
                <DecryptedText text="Leadership & Mentorship" />
              </h2>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  FW
                </div>
                <div>
                  <h3 className="text-xl font-bold title mb-2">
                    <DecryptedText text="Dr. Fang Wang" />
                  </h3>
                  <p className="text-current mb-2 font-semibold">
                    <DecryptedText text="Founder & Lead Mentor | Software Engineer" />
                  </p>
                  <p className="text-current opacity-90 leading-relaxed">
                    <DecryptedText text="Vice President of the ACP Foundation and founder of the ACP Robotics Program. Dr. Wang's leadership emphasizes technical proficiency, teamwork, and community impact—building a mentoring culture that enables students to thrive beyond competition." />
                  </p>
                </div>
              </div>
            </div>

            {/* Key Achievements */}
            <div className="lg:col-span-3 interactive-card p-8">
              <h2 className="text-3xl font-bold mb-6 text-accent border-b-2 border-accent pb-2">
                <DecryptedText text="Key Achievements" />
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "2022 FIRST World Championship Inspire Award",
                  "FIRST Hall of Fame Inductees",
                  "2023 FIRST Global Challenge Gold Medal",
                  "International Collaboration with Team Zimbabwe",
                  "16+ Years of Innovation",
                  "Impacting 8,000+ Students Annually"
                ].map((achievement, idx) => (
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
            </div>

            {/* Community Impact */}
            <div className="md:col-span-2 interactive-card p-8">
              <h2 className="text-2xl font-bold mb-4 text-accent">
                <DecryptedText text="Community Impact" />
              </h2>
              <p className="text-current leading-relaxed mb-6">
                <DecryptedText text="Each year, the team invests over 2,000 hours in outreach through workshops, mentorship programs, and STEM events. From FLL Explore to FTC, Technicbots supports every level of the FIRST pipeline." />
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "FLYSET Workshop",
                  "Monthly Mentoring Forums",
                  "FLL to FTC Pipeline Support",
                  "Youth Mentor Development"
                ].map((initiative, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg surface-hover border-l-4 border-accent"
                    style={{ backgroundColor: 'var(--surface-bg)' }}
                  >
                    <p className="font-semibold text-current">
                      <DecryptedText text={initiative} />
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Structure */}
            <div className="interactive-card p-8">
              <h2 className="text-2xl font-bold mb-4 text-accent">
                <DecryptedText text="Team Structure" />
              </h2>
              <p className="text-current leading-relaxed">
                <DecryptedText text="Students take on specialized roles in hardware, software, CAD design, business, and scouting—learning to operate as an integrated engineering unit. Success lies in building award-winning robots and cultivating a culture of mentorship and innovation." />
              </p>
            </div>

            {/* Call to Action - Full Width */}
            <div className="lg:col-span-3 interactive-card p-12 text-center" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-dark, #1a5490) 100%)' }}>
              <h2 className="text-4xl font-bold mb-4 text-white">
                <DecryptedText text="Building Robots That Inspire" />
              </h2>
              <p className="text-lg text-white opacity-90 mb-8 max-w-2xl mx-auto">
                <DecryptedText text="From the workshop to the world stage, Technicbots continues to empower the next generation of innovators through robotics, mentorship, and community leadership." />
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://www.technicbots.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-accent px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
                >
                  Visit Technicbots Website
                </a>
                <a
                  href="/team/david"
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-accent transition-all"
                >
                  Meet Our Collaborator David
                </a>
              </div>
            </div>

          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Technicbots;