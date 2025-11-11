import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DecryptedText from '../../components/ui/DecryptedText';
import { SEOConfig } from '../../components/SEO';

interface ProfileData {
  name: string;
  role_with_org: string;
  key_contributions: string[];
  projects_mentioned: string[];
  qualities: string[];
  contact_note: string;
}

const generateProfileData = (): {
  long_bio: string;
  profile_json: ProfileData;
} => {
  const long_bio = `David's story with Plastal-Bot Builders began in an unexpected place: the 2022 FIRST Global Robotics Competition in Geneva, Switzerland. When a young robotics team from Zambia faced a stubborn mechanism problem—getting their robot to dock reliably on an elevated platform—David and his teammates stepped in to help. Their collaboration didn't just solve a technical challenge; it sparked a friendship that would reshape opportunities for STEM education back in Zambia.
    After reconnecting on social media later that year, David became a cornerstone of Plastal-Bot Builders' growth. This youth-led initiative focuses on bringing hands-on robotics and innovation to schools and communities across Zambia, running workshops, bootcamps, and outreach programs in partnership with organizations like American Corner CBU and KCM Trust School in Chililabombwe. David's support proved instrumental when, in early 2024, Plastal-Bot Builders set out to raise funds for essential equipment. With help from fundraising partners including Technicbots, they secured about $2,000 to purchase LEGO Spike Prime kits, Arduino starter packs, and a 3D printer—tools that opened doors for dozens of aspiring young engineers.
    David's contributions extend far beyond fundraising. He guided students through ambitious projects like WasteWizard, an autonomous IoT smart bin; a self-balancing robot; and a smart EV dashboard. He also helped teams navigate Fusion 360, securing student licenses and walking them through CAD fundamentals. His patience and problem-solving skills made complex concepts accessible, while his communication style fostered collaboration and confidence among learners.
    What stands out most about David is his ability to listen. He doesn't just offer solutions—he mentors, encouraging students to think critically and iterate on their designs. For Plastal-Bot Builders and the young innovators they serve, David represents the power of cross-border collaboration and the impact one person can have when they choose to invest in others. (And yes, he's proven that Swiss robotics magic works just as well over a video call.)`;

  const profile_json: ProfileData = {
    name: "David",
    role_with_org: "International collaborator and mentor to Plastal-Bot Builders since 2022",
    key_contributions: [
      "Helped solve critical robot docking mechanism at FIRST Global 2022",
      "Supported $2,000 fundraising campaign for LEGO Spike Prime kits, Arduino kits, and 3D printer",
      "Mentored students on projects including WasteWizard, self-balancing robot, and smart EV dashboard",
      "Guided teams through Fusion 360 and student license procurement"
    ],
    projects_mentioned: [
      "WasteWizard (autonomous IoT smart bin)",
      "Self-balancing robot",
      "Smart EV dashboard",
      "Fusion 360 CAD training"
    ],
    qualities: [
      "Patient",
      "Good listener",
      "Effective communicator",
      "Problem-solver",
      "Collaborative mentor"
    ],
    contact_note: "Contact via Plastal-Bot Builders"
  };

  return { long_bio, profile_json };
};

const DavidProfile: React.FC = () => {
  const { long_bio, profile_json } = generateProfileData();
  const paragraphs = long_bio.split('\n').filter(p => p.trim());

  return (
    <>
      <SEOConfig
        title="David | Plastal-Bot Builders"
        description="Discover David's impactful journey with Plastal-Bot Builders, from FIRST Global 2022 to mentoring young Zambian innovators in robotics and STEM education."
        image="/resources/technicbots/DavidHue.jpg"
      />
      <div className="scroll-smooth focus:scroll-auto">
        <Header />
       
        {/* Hero Section */}
        <section className="relative py-20 px-4" style={{ backgroundColor: 'var(--surface-bg)' }}>
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 title">
              <DecryptedText text="David" />
            </h1>
            <p className="text-xl md:text-2xl mb-2 text-accent font-semibold">
              <DecryptedText text="International Collaborator & Mentor" />
            </p>
            <p className="text-lg text-current opacity-90">
              <DecryptedText text="Technicbots | FIRST Global 2022 | Plastal-Bot Builders" />
            </p>
          </div>
        </section>

        {/* Bento Grid Layout */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
            
            {/* Origin Story - Large Card */}
            <div className="md:col-span-2 lg:col-span-2 interactive-card p-8">
              <h2 className="text-3xl font-bold mb-4 text-accent">
                <DecryptedText text="Origin Story" />
              </h2>
              <p className="text-lg leading-relaxed text-current mb-4">
                <DecryptedText text={paragraphs[0]} />
              </p>
            </div>

            {/* Role Card */}
            <div className="interactive-card p-8 flex flex-col justify-center" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-dark, #1a5490) 100%)' }}>
              <div className="text-white text-center">
                <div className="text-5xl font-bold mb-4">🤝</div>
                <h3 className="text-xl font-bold mb-2">
                  <DecryptedText text="Mentor Since 2022" />
                </h3>
                <p className="opacity-90">
                  <DecryptedText text="Cross-border collaboration from Geneva to Zambia" />
                </p>
              </div>
            </div>

            {/* Impact & Growth */}
            <div className="md:col-span-2 interactive-card p-8">
              <h2 className="text-2xl font-bold mb-4 text-accent">
                <DecryptedText text="Impact & Growth" />
              </h2>
              <p className="text-current leading-relaxed mb-4">
                <DecryptedText text={paragraphs[1]} />
              </p>
            </div>

            {/* Qualities */}
            <div className="interactive-card p-8">
              <h2 className="text-2xl font-bold mb-4 text-accent">
                <DecryptedText text="Key Qualities" />
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile_json.qualities.map((quality, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-lg text-sm font-medium border hover:border-accent transition-colors"
                    style={{
                      backgroundColor: 'var(--surface-bg)',
                      border: '1px solid var(--surface-border)'
                    }}
                  >
                    <DecryptedText text={quality} />
                  </span>
                ))}
              </div>
            </div>

            {/* Key Projects */}
            <div className="lg:col-span-3 interactive-card p-8">
              <h2 className="text-3xl font-bold mb-6 text-accent border-b-2 border-accent pb-2">
                <DecryptedText text="Key Projects & Contributions" />
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Projects Column */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-current">
                    <DecryptedText text="Projects Mentored" />
                  </h3>
                  <div className="space-y-3">
                    {profile_json.projects_mentioned.map((project, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-lg surface-hover border-l-4 border-accent"
                        style={{ backgroundColor: 'var(--surface-bg)' }}
                      >
                        <DecryptedText text={project} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contributions Column */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-current">
                    <DecryptedText text="Major Contributions" />
                  </h3>
                  <div className="space-y-3">
                    {profile_json.key_contributions.map((contribution, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-lg surface-hover"
                        style={{ backgroundColor: 'var(--surface-bg)', border: '1px solid var(--surface-border)' }}
                      >
                        <span className="text-accent text-xl flex-shrink-0">✓</span>
                        <span className="text-current">
                          <DecryptedText text={contribution} />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mentorship Philosophy */}
            <div className="md:col-span-2 interactive-card p-8">
              <h2 className="text-2xl font-bold mb-4 text-accent">
                <DecryptedText text="Mentorship Philosophy" />
              </h2>
              <p className="text-current leading-relaxed mb-4">
                <DecryptedText text={paragraphs[2]} />
              </p>
            </div>

            {/* Quote Card */}
            <div className="interactive-card p-8 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--surface-bg) 0%, var(--surface-hover-bg) 100%)' }}>
              <blockquote className="text-center">
                <p className="text-lg italic text-current mb-4">
                  <DecryptedText text={'"Swiss robotics magic works just as well over a video call." 🤖'} />
                </p>
                <footer className="text-sm text-accent font-semibold">
                  <DecryptedText text="— Plastal-Bot Builders Team" />
                </footer>
              </blockquote>
            </div>

            {/* Impact Summary */}
            <div className="lg:col-span-3 interactive-card p-8">
              <h2 className="text-2xl font-bold mb-4 text-accent">
                <DecryptedText text="The Power of Collaboration" />
              </h2>
              <p className="text-lg leading-relaxed text-current mb-6">
                <DecryptedText text={paragraphs[3]} />
              </p>
            </div>

            {/* Call to Action */}
            <div className="lg:col-span-3 interactive-card p-12 text-center" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-dark, #1a5490) 100%)' }}>
              <h2 className="text-4xl font-bold mb-4 text-white">
                <DecryptedText text="Building Bridges Through Robotics" />
              </h2>
              <p className="text-lg text-white opacity-90 mb-8 max-w-2xl mx-auto">
                <DecryptedText text="From Geneva to Zambia, David's journey shows how one act of collaboration can create lasting impact across continents." />
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/technicbots"
                  className="bg-white text-accent px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
                >
                  Learn About Technicbots
                </a>
                <a
                  href="/#contact"
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-accent transition-all"
                >
                  Get in Touch
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

export default DavidProfile;