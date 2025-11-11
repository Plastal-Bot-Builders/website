import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DecryptedText from '../../components/ui/DecryptedText';
import { SEOConfig } from '../../components/SEO';

interface ProfileData {
  name: string;
  role_with_org: string;
  key_contributions: string[];
  projects_mentioned: { emoji: string; name: string; desc: string }[];
  qualities: string[];
  contact_note: string;
}

const DavidProfile: React.FC = () => {
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

  const journeyMilestones = [
    {
      year: "2022",
      title: "Geneva Connection",
      desc: "Met Plastal-Bot Builders at FIRST Global Competition, solving critical robot docking challenge"
    },
    {
      year: "2024",
      title: "Equipment Drive",
      desc: "Helped secure $2,000 for LEGO Spike Prime kits, Arduino packs, and 3D printer"
    },
    {
      year: "2024+",
      title: "Ongoing Mentorship",
      desc: "Guiding students through IoT projects, CAD design, and engineering fundamentals"
    }
  ];

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
          <div className="max-w-5xl mx-auto text-center">
            <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6">
              D
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 title">
              <DecryptedText text="David" />
            </h1>
            <p className="text-xl md:text-2xl mb-2 text-accent font-semibold">
              <DecryptedText text="International Collaborator & Mentor" />
            </p>
            <p className="text-lg text-current opacity-90">
              <DecryptedText text="Plastal-Bot Builders Partner | Since 2022" />
            </p>
          </div>
        </section>

        {/* Bento Grid Section 1: Story + Quick Facts */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Main Story Card */}
            <div className="md:col-span-2 interactive-card p-8">
              <h2 className="text-3xl font-bold mb-6 text-accent border-b-2 border-accent pb-2">
                <DecryptedText text="The Geneva Connection" />
              </h2>
              <div className="space-y-4 text-current">
                <p className="text-lg leading-relaxed">
                  <DecryptedText text="David's story with Plastal-Bot Builders began in an unexpected place: the 2022 FIRST Global Robotics Competition in Geneva, Switzerland. When a young robotics team from Zambia faced a stubborn mechanism problem—getting their robot to dock reliably on an elevated platform—David and his teammates stepped in to help. Their collaboration didn't just solve a technical challenge; it sparked a friendship that would reshape opportunities for STEM education back in Zambia." />
                </p>
                <p className="text-lg leading-relaxed">
                  <DecryptedText text="After reconnecting on social media later that year, David became a cornerstone of Plastal-Bot Builders' growth. This youth-led initiative focuses on bringing hands-on robotics and innovation to schools and communities across Zambia, running workshops, bootcamps, and outreach programs in partnership with organizations like American Corner CBU and KCM Trust School in Chililabombwe." />
                </p>
              </div>
            </div>

            {/* Quick Facts Card */}
            <div className="interactive-card p-6" style={{ background: 'linear-gradient(135deg, var(--surface-bg) 0%, var(--surface-hover-bg) 100%)' }}>
              <h3 className="text-xl font-bold mb-4 title text-center">
                <DecryptedText text="At a Glance" />
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--surface-bg)' }}>
                  <p className="text-sm text-current opacity-80 mb-1">Role</p>
                  <p className="font-semibold text-accent">Mentor & Collaborator</p>
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--surface-bg)' }}>
                  <p className="text-sm text-current opacity-80 mb-1">Since</p>
                  <p className="font-semibold text-accent">2022</p>
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--surface-bg)' }}>
                  <p className="text-sm text-current opacity-80 mb-1">Impact</p>
                  <p className="font-semibold text-accent">$2,000 Fundraising</p>
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--surface-bg)' }}>
                  <p className="text-sm text-current opacity-80 mb-1">Specialty</p>
                  <p className="font-semibold text-accent">IoT & CAD Design</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Grid Section 2: Journey Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {journeyMilestones.map((milestone, idx) => (
              <div key={idx} className="interactive-card p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {milestone.year}
                </div>
                <h3 className="text-xl font-bold title mb-2">
                  <DecryptedText text={milestone.title} />
                </h3>
                <p className="text-sm text-current opacity-80">
                  <DecryptedText text={milestone.desc} />
                </p>
              </div>
            ))}
          </div>

          {/* Bento Grid Section 3: Projects Grid */}
          <div className="mb-4">
            <h2 className="text-3xl font-bold mb-4 text-accent">
              <DecryptedText text="Key Projects" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {profile_json.projects_mentioned.map((project, idx) => (
                <div key={idx} className="interactive-card p-6 text-center surface-hover">
                  <div className="text-5xl mb-3">{project.emoji}</div>
                  <h3 className="text-lg font-bold title mb-2">
                    <DecryptedText text={project.name} />
                  </h3>
                  <p className="text-sm text-current opacity-80">
                    <DecryptedText text={project.desc} />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bento Grid Section 4: Impact + Qualities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Impact Story */}
            <div className="interactive-card p-8">
              <h2 className="text-2xl font-bold mb-4 text-accent border-b-2 border-accent pb-2">
                <DecryptedText text="Beyond Fundraising" />
              </h2>
              <p className="text-base leading-relaxed text-current mb-4">
                <DecryptedText text="David's support proved instrumental when, in early 2024, Plastal-Bot Builders set out to raise funds for essential equipment. With help from fundraising partners including Technicbots, they secured about $2,000 to purchase LEGO Spike Prime kits, Arduino starter packs, and a 3D printer—tools that opened doors for dozens of aspiring young engineers." />
              </p>
              <p className="text-base leading-relaxed text-current">
                <DecryptedText text="He guided students through ambitious projects like WasteWizard, a self-balancing robot, and a smart EV dashboard. He also helped teams navigate Fusion 360, securing student licenses and walking them through CAD fundamentals." />
              </p>
            </div>

            {/* Qualities Card */}
            <div className="interactive-card p-8">
              <h2 className="text-2xl font-bold mb-4 text-accent border-b-2 border-accent pb-2">
                <DecryptedText text="What Makes David Stand Out" />
              </h2>
              <div className="flex flex-wrap gap-3 mb-6">
                {profile_json.qualities.map((quality, idx) => (
                  <span 
                    key={idx}
                    className="px-4 py-2 rounded-full text-sm font-semibold"
                    style={{ 
                      backgroundColor: 'var(--accent)',
                      color: 'white'
                    }}
                  >
                    <DecryptedText text={quality} />
                  </span>
                ))}
              </div>
              <p className="text-base leading-relaxed text-current italic">
                <DecryptedText text="What stands out most about David is his ability to listen. He doesn't just offer solutions—he mentors, encouraging students to think critically and iterate on their designs." />
              </p>
            </div>
          </div>

          {/* Key Contributions Grid */}
          <div className="interactive-card p-8 mb-4">
            <h2 className="text-2xl font-bold mb-6 text-accent border-b-2 border-accent pb-2">
              <DecryptedText text="Key Contributions" />
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {profile_json.key_contributions.map((contribution, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-lg surface-hover"
                  style={{ backgroundColor: 'var(--surface-bg)', border: '1px solid var(--surface-border)' }}
                >
                  <span className="text-accent text-2xl flex-shrink-0">✓</span>
                  <span className="text-current">
                    <DecryptedText text={contribution} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quote Card */}
          <div className="interactive-card p-8 mb-4" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)' }}>
            <blockquote className="text-2xl md:text-3xl font-bold text-white text-center italic">
              <DecryptedText text=" Proof that Swiss robotics magic works just as well over a video call.🤖" />
            </blockquote>
          </div>

          {/* Legacy Statement */}
          <div className="interactive-card p-8 mb-4">
            <h2 className="text-2xl font-bold mb-4 text-accent border-b-2 border-accent pb-2">
              <DecryptedText text="A Testament to Cross-Border Collaboration" />
            </h2>
            <p className="text-lg leading-relaxed text-current">
              <DecryptedText text="For Plastal-Bot Builders and the young innovators they serve, David represents the power of cross-border collaboration and the impact one person can have when they choose to invest in others. His patience and problem-solving skills made complex concepts accessible, while his communication style fostered collaboration and confidence among learners." />
            </p>
          </div>

          {/* Call to Action */}
          <div className="text-center py-8">
            <p className="text-lg text-current mb-6">
              <DecryptedText text={profile_json.contact_note} />
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/team/technicbots"
                className="custom-button"
              >
                Meet Technicbots Team
              </a>
              <a
                href="/support"
                className="custom-button"
              >
                Support Our Mission
              </a>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default DavidProfile;