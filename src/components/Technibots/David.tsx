import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DecryptedText from '../../components/ui/DecryptedText';
import { SEOConfig } from '../../components/SEO';
import CountUp from '../../components/ui/CountUp';
import { FaRobot, FaTools, FaCar, FaPencilRuler, FaHandshake, FaGraduationCap, FaLightbulb, FaUsers } from 'react-icons/fa';
import { HiCheckCircle } from 'react-icons/hi';
import { asset } from '../../utils/asset';

interface Project {
    icon: React.ComponentType<{ className?: string }>;
    name: string;
    desc: string;
}

interface ProfileData {
    name: string;
    role_with_org: string;
    key_contributions: string[];
    projects_mentioned: Project[];
    qualities: string[];
    contact_note: string;
}

const DavidProfile: React.FC = () => {
    const navigate = useNavigate();
    
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
            { icon: FaRobot, name: "WasteWizard", desc: "Autonomous IoT smart bin" },
            { icon: FaTools, name: "Self-balancing Robot", desc: "Advanced control systems" },
            { icon: FaCar, name: "Smart EV Dashboard", desc: "Electric vehicle interface" },
            { icon: FaPencilRuler, name: "Fusion 360 CAD", desc: "Design & training programs" }
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
            year: 2022,
            title: "Geneva Connection",
            desc: "Met Plastal-Bot Builders at FIRST Global Competition, solving critical robot docking challenge"
        },
        {
            year: 2024,
            title: "Equipment Drive",
            desc: "Helped secure $2,000 for LEGO Spike Prime kits, Arduino packs, and 3D printer"
        },
        {
            year: 2024,
            title: "Ongoing Mentorship",
            desc: "Guiding students through IoT projects, CAD design, and engineering fundamentals",
            isCurrent: true
        }
    ];

    const impactStats = [
        { value: 2000, label: "Fundraising ($)", prefix: "$", suffix: "" },
        { value: 4, label: "Major Projects", suffix: "" },
        { value: 2022, label: "Partnership Since", suffix: "", isYear: true }
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
                <section className="relative py-20 px-4">
                    <div className="max-w-7xl mx-auto">
                        {/* Back Button - Top Left */}
                        <button
                            onClick={() => {
                                navigate('/home');
                                setTimeout(() => {
                                    const partnersSection = document.getElementById('david');
                                    if (partnersSection) {
                                        partnersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }
                                }, 300);
                            }}
                            className="flex items-center text-sm hover:text-accent transition-colors mb-6"
                            aria-label="Back to Partners"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Home
                        </button>

                        {/* Hero Content - Centered */}
                        <div className="max-w-5xl mx-auto text-center">
                            <div 
                                className="w-24 h-24 rounded-full overflow-hidden border-4 border-accent mx-auto mb-6"
                                style={{
                                    animation: 'float-rotate 3s ease-in-out infinite'
                                }}
                            >
                                <img 
                                    src={asset('resources/technicbots/DavidHue.jpg')}
                                    alt="David"
                                    className="w-full h-full object-cover"
                                />
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
                                <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg leading-relaxed">
                                    <DecryptedText text="David's story with Plastal-Bot Builders began in an unexpected place: the 2022 FIRST Global Robotics Competition in Geneva, Switzerland. When a young robotics team from Zambia faced a stubborn mechanism problem—getting their robot to dock reliably on an elevated platform—David and his teammates stepped in to help. Their collaboration didn't just solve a technical challenge; it sparked a friendship that would reshape opportunities for STEM education back in Zambia." />
                                </p>
                                <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg leading-relaxed">
                                    <DecryptedText text="After reconnecting on social media later that year, David became a cornerstone of Plastal-Bot Builders' growth. This youth-led initiative focuses on bringing hands-on robotics and innovation to schools and communities across Zambia, running workshops, bootcamps, and outreach programs in partnership with organizations like American Corner CBU and KCM Trust School in Chililabombwe." />
                                </p>
                            </div>
                        </div>

                        {/* Quick Facts Card */}
                        <div className="interactive-card p-6" style={{ background: 'linear-gradient(135deg, var(--surface-bg) 0%, var(--surface-hover-bg) 100%)' }}>
                            <h3 className="text-xl font-bold mb-4 title text-center">
                                <DecryptedText text="Impact Metrics" />
                            </h3>
                            <div className="space-y-3">
                                {impactStats.map((stat, idx) => (
                                    <div key={idx} className="p-3 rounded-lg text-center" 
                                        style={{
                                            backgroundColor: 'var(--surface-bg)',
                                            border: '1px solid var(--surface-border)'
                                        }}>
                                            <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg font-bold text-accent">
                                                {stat.isYear ? (
                                                    stat.value
                                                ) : (
                                                    <>
                                                        {stat.prefix}
                                                        <CountUp
                                                            from={0}
                                                            to={stat.value}
                                                            separator={stat.value >= 1000 ? "," : ""}
                                                            suffix={stat.suffix}
                                                            duration={2.5}
                                                            className="inline"
                                                        />
                                                    </>
                                                )}
                                            </p>
                                        <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg text-current opacity-80">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                            
                        </div>
                    </div>

                    {/* Bento Grid Section 2: Journey Timeline */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {journeyMilestones.map((milestone, idx) => (
                            <div key={idx} className="interactive-card p-6 text-center">
                                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                                    {milestone.isCurrent ? (
                                        <CountUp
                                            from={2022}
                                            to={milestone.year}
                                            duration={2}
                                            suffix="+"
                                            className="inline"
                                        />
                                    ) : (
                                        milestone.year
                                    )}
                                </div>
                                <h3 className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg font-bold title mb-2">
                                    <DecryptedText text={milestone.title} />
                                </h3>
                                <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg text-current opacity-80">
                                    <DecryptedText text={milestone.desc} />
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Bento Grid Section 3: Projects Grid with Icons */}
                    <div className="mb-4">
                        <h2 className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg font-bold mb-4 text-accent">
                            <DecryptedText text="Key Projects" />
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {profile_json.projects_mentioned.map((project, idx) => {
                                const IconComponent = project.icon;
                                return (
                                    <div key={idx} className="interactive-card p-6 text-center surface-hover">
                                        <div className="flex items-center justify-center mb-4">
                                            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-white">
                                                <IconComponent className="text-3xl" />
                                            </div>
                                        </div>
                                        <h3 className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg font-bold title mb-2">
                                            <DecryptedText text={project.name} />
                                        </h3>
                                        <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg text-current opacity-80">
                                            <DecryptedText text={project.desc} />
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Bento Grid Section 4: Impact + Qualities */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* Impact Story */}
                        <div className="interactive-card p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white">
                                    <FaHandshake className="text-xl" />
                                </div>
                                <h2 className="text-2xl font-bold text-accent">
                                    <DecryptedText text="Beyond Fundraising" />
                                </h2>
                            </div>
                            <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg leading-relaxed text-current mb-4">
                                <DecryptedText text="David's support proved instrumental when, in early 2024, Plastal-Bot Builders set out to raise funds for essential equipment. With help from fundraising partners including Technicbots, they secured about $2,000 to purchase LEGO Spike Prime kits, Arduino starter packs, and a 3D printer—tools that opened doors for dozens of aspiring young engineers." />
                            </p>
                            <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg leading-relaxed text-current">
                                <DecryptedText text="He guided students through ambitious projects like WasteWizard, a self-balancing robot, and a smart EV dashboard. He also helped teams navigate Fusion 360, securing student licenses and walking them through CAD fundamentals." />
                            </p>
                        </div>

                        {/* Qualities Card */}
                        <div className="interactive-card p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white">
                                    <FaLightbulb className="text-xl" />
                                </div>
                                <h2 className="text-2xl font-bold text-accent">
                                    <DecryptedText text="What Makes David Stand Out" />
                                </h2>
                            </div>
                            <div className="flex flex-wrap gap-3 mb-6">
                                {profile_json.qualities.map((quality, idx) => (
                                    <span
                                        key={idx}
                                        className="px-4 py-2 border border-white/10 rounded text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg font-semibold"
                                        style={{
                                            backgroundColor: 'var(--surface-bg)',
                                            border: '1px solid var(--surface-border)'
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

                    {/* Key Contributions Grid with Icons */}
                    <div className="interactive-card p-8 mb-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white">
                                <FaUsers className="text-xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-accent">
                                <DecryptedText text="Key Contributions" />
                            </h2>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {profile_json.key_contributions.map((contribution, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-start gap-3 p-4 rounded-lg surface-hover"
                                    style={{ backgroundColor: 'var(--surface-bg)', border: '1px solid var(--surface-border)' }}
                                >
                                    <HiCheckCircle className="text-accent text-2xl flex-shrink-0 mt-1" />
                                    <span className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg text-current">
                                        <DecryptedText text={contribution} />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quote Card */}
                    <div className="interactive-card p-8 mb-4" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--btn-hover-bg) 100%)' }}>
                        <blockquote className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg font-bold text-center italic">
                            <DecryptedText text='"Proof that Swiss robotics magic works just as well over a video call." 🤖' />
                        </blockquote>
                    </div>

                    {/* Legacy Statement */}
                    <div className="interactive-card p-8 mb-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white">
                                <FaGraduationCap className="text-xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-accent">
                                <DecryptedText text="A Testament to Cross-Border Collaboration" />
                            </h2>
                        </div>
                        <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg leading-relaxed text-current">
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