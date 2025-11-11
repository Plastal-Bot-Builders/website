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
  html_card: string;
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


  const html_card = `
    <div style="max-width: 600px; margin: 2rem auto; padding: 1.5rem; border: 2px solid #D27D2D; border-radius: 12px; background: linear-gradient(135deg, #FFFEF2 0%, #FFF7D1 100%); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <h2 style="margin: 0 0 0.5rem 0; color: #111827; font-size: 1.75rem;">David</h2>
      <p style="margin: 0 0 1rem 0; color: #6B7280; font-style: italic;">International collaborator & mentor since 2022</p>
     
      <p style="line-height: 1.6; color: #374151; margin-bottom: 1rem;">
        David met the Plastal-Bot Builders team at the 2022 FIRST Global Competition in Geneva, where he helped solve a tricky robot docking problem. Since reconnecting, he's been instrumental in the organization's growth—supporting fundraising efforts, mentoring students on IoT and robotics projects, and making Fusion 360 feel less intimidating.
      </p>
     
      <h3 style="margin: 1.5rem 0 0.75rem 0; color: #D27D2D; font-size: 1.25rem; border-bottom: 2px solid #D27D2D; padding-bottom: 0.25rem;">Key Projects</h3>
      <ul style="margin: 0; padding-left: 1.5rem; color: #374151; line-height: 1.8;">
        <li>WasteWizard (autonomous IoT smart bin)</li>
        <li>Self-balancing robot</li>
        <li>Smart EV dashboard</li>
        <li>Fusion 360 CAD training & student licenses</li>
      </ul>
     
      <p style="margin-top: 1.5rem; padding: 1rem; background: #FFF; border-left: 4px solid #D27D2D; color: #6B7280; font-style: italic; border-radius: 4px;">
        "Proof that Swiss robotics magic works just as well over a video call." 🤖
      </p>
     
      <p style="margin-top: 1rem; font-size: 0.875rem; color: #9CA3AF; text-align: center;">
        Contact via Plastal-Bot Builders
      </p>
    </div>
  `;


  return { long_bio, profile_json, html_card };
};


const DavidProfile: React.FC = () => {
  const { long_bio, profile_json, html_card } = generateProfileData();


  return (
    <>
      <SEOConfig
        title="David | Plastal-Bot Builders"
        description="Discover David's impactful journey with Plastal-Bot Builders, from FIRST Global 2022 to mentoring young Zambian innovators in robotics and STEM education."
        image="/resources/technicbots/DavidHue.jpg"
      />
      <div className="scroll-smooth focus:scroll-auto">
        <Header />
       
        {/* Long Bio Section */}
        <section className="max-w-4xl mx-auto mb-12 px-4 pt-8">
          <h1 className="text-4xl font-bold mb-6 title">
            <DecryptedText text="David" />
          </h1>
          <div className="interactive-card p-6">
            <div className="prose prose-lg" style={{ color: 'var(--text)' }}>
              {long_bio.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4 leading-relaxed">
                  <DecryptedText text={paragraph} />
                </p>
              ))}
            </div>
          </div>
        </section>
        {/* Profile JSON Display */}
        <section className="max-w-4xl mx-auto mb-12 px-4">
          <h2 className="text-2xl font-bold mb-4 title">
            <DecryptedText text="Profile Summary" />
          </h2>
          <div className="interactive-card p-6">
            <dl className="space-y-4">
              <div>
                <dt className="font-semibold text-accent mb-1">
                  <DecryptedText text="Role" />
                </dt>
                <dd className="text-current">
                  <DecryptedText text={profile_json.role_with_org} />
                </dd>
              </div>
             
              <div>
                <dt className="font-semibold text-accent mb-1">
                  <DecryptedText text="Key Contributions" />
                </dt>
                <dd>
                  <ul className="list-disc list-inside space-y-1 text-current">
                    {profile_json.key_contributions.map((item, idx) => (
                      <li key={idx}>
                        <DecryptedText text={item} />
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
             
              <div>
                <dt className="font-semibold text-accent mb-1">
                  <DecryptedText text="Projects" />
                </dt>
                <dd>
                  <ul className="list-disc list-inside space-y-1 text-current">
                    {profile_json.projects_mentioned.map((item, idx) => (
                      <li key={idx}>
                        <DecryptedText text={item} />
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
             
              <div>
                <dt className="font-semibold text-accent mb-1">
                  <DecryptedText text="Qualities" />
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {profile_json.qualities.map((quality, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor: 'var(--surface-bg)',
                        border: '1px solid var(--surface-border)'
                      }}
                    >
                      <DecryptedText text={quality} />
                    </span>
                  ))}
                </dd>
              </div>
             
              <div>
                <dt className="font-semibold text-accent mb-1">
                  <DecryptedText text="Contact" />
                </dt>
                <dd className="text-current">
                  <DecryptedText text={profile_json.contact_note} />
                </dd>
              </div>
            </dl>
          </div>
        </section>


        {/* HTML Card Preview */}
        <section className="max-w-4xl mx-auto mb-12 px-4">
          <h2 className="text-2xl font-bold mb-4 title">
            <DecryptedText text="Profile Card" />
          </h2>
          <div dangerouslySetInnerHTML={{ __html: html_card }} />
        </section>


        {/* JSON Export */}
        <section className="max-w-4xl mx-auto mb-12 px-4 pb-8">
          <h2 className="text-2xl font-bold mb-4 title">
            <DecryptedText text="JSON Export" />
          </h2>
          <div className="interactive-card p-6">
            <pre className="text-sm overflow-x-auto p-4 rounded" style={{ backgroundColor: 'var(--surface-bg)' }}>
              {JSON.stringify(profile_json, null, 2)}
            </pre>
          </div>
        </section>


        <Footer />
      </div>
    </>
  );
};


export default DavidProfile;