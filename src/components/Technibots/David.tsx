import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DecryptedText from '../../components/ui/DecryptedText';
import FadeContent from '../../components/ui/FadeContent';
import { SEOConfig } from '../../components/SEO';
import CountUp from '../../components/ui/CountUp';
import { FaRobot, FaTools, FaCar, FaPencilRuler, FaHandshake, FaGraduationCap, FaLightbulb, FaUsers } from 'react-icons/fa';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';  
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
                <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                        <div className="max-w-7xl mx-auto">
                            {/* Back Button */}
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
                                className="inline-flex items-center text-accent hover:text-accent-hover mb-6 transition-colors"
                                aria-label="Back to Partners"
                            >
                                <ArrowLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                <span className="text-sm sm:text-base">Back to Home</span>
                            </button>

                            {/* Hero Content - Centered */}
                            <div className="max-w-5xl mx-auto text-center">
                                <div 
                                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-accent mx-auto mb-4 sm:mb-6"
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
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 title">
                                    <DecryptedText text="David" />
                                </h1>
                                <p className="text-lg sm:text-xl md:text-2xl mb-2 text-accent font-semibold">
                                    <DecryptedText text="International Collaborator & Mentor" />
                                </p>
                                <p className="text-base sm:text-lg text-current opacity-90">
                                    <DecryptedText text="Plastal-Bot Builders Partner | Since 2022" />
                                </p>
                            </div>
                        </div>
                    </section>
                </FadeContent>

                {/* Story + Quick Facts */}
                <FadeContent blur={true} duration={1200} easing="ease-out" initialOpacity={0} delay={200}>
                    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                                {/* Main Story Card */}
                                <div className="lg:col-span-2 interactive-card p-6 sm:p-8">
                                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-accent border-b-2 border-accent pb-2">
                                        <DecryptedText text="The Geneva Connection" />
                                    </h2>
                                    <div className="space-y-4 text-current">
                                        <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                                            <DecryptedText 
                                                text="David's story with Plastal-Bot Builders began in an unexpected place: the 2022 FIRST Global Robotics Competition in Geneva, Switzerland. When a young robotics team from Zambia faced a stubborn mechanism problem—getting their robot to dock reliably on an elevated platform—David and his teammates stepped in to help. Their collaboration didn't just solve a technical challenge; it sparked a friendship that would reshape opportunities for STEM education back in Zambia."
                                                animateOn="view"
                                                revealDirection="start"
                                            />
                                        </p>
                                        <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                                            <DecryptedText 
                                                text="After reconnecting on social media later that year, David became a cornerstone of Plastal-Bot Builders' growth. This youth-led initiative focuses on bringing hands-on robotics and innovation to schools and communities across Zambia, running workshops, bootcamps, and outreach programs in partnership with organizations like American Corner CBU and KCM Trust School in Chililabombwe."
                                                animateOn="view"
                                                revealDirection="start"
                                            />
                                        </p>
                                    </div>
                                </div>

                                {/* Quick Facts Card */}
                                <div className="interactive-card p-4 sm:p-6" style={{ background: 'linear-gradient(135deg, var(--surface-bg) 0%, var(--surface-hover-bg) 100%)' }}>
                                    <h3 className="text-lg sm:text-xl font-bold mb-4 title text-center">
                                        <DecryptedText text="Impact Metrics" />
                                    </h3>
                                    <div className="space-y-3">
                                        {impactStats.map((stat, idx) => (
                                            <div key={idx} className="p-3 rounded-lg text-center" 
                                                style={{
                                                    backgroundColor: 'var(--surface-bg)',
                                                    border: '1px solid var(--surface-border)'
                                                }}>
                                                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-accent">
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
                                                <p className="text-xs sm:text-sm text-current opacity-80">{stat.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </FadeContent>

                {/* Journey Timeline */}
                <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={300}>
                    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-accent border-b-2 border-accent pb-2 inline-block">
                                <DecryptedText text="Journey Milestones" />
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {journeyMilestones.map((milestone, idx) => (
                                    <div key={idx} className="interactive-card p-5 sm:p-6 text-center">
                                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent flex items-center justify-center text-white text-lg sm:text-xl font-bold mx-auto mb-3 sm:mb-4">
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
                                        <h3 className="text-base sm:text-lg font-bold title mb-2">
                                            <DecryptedText text={milestone.title} />
                                        </h3>
                                        <p className="text-sm sm:text-base text-current opacity-80">
                                            <DecryptedText 
                                                text={milestone.desc}
                                                animateOn="view"
                                                revealDirection="start"
                                            />
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </FadeContent>

                {/* Key Projects */}
                <FadeContent blur={true} duration={1200} easing="ease-out" initialOpacity={0} delay={200}>
                    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-accent border-b-2 border-accent pb-2 inline-block">
                                <DecryptedText text="Key Projects" />
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                {profile_json.projects_mentioned.map((project, idx) => {
                                    const IconComponent = project.icon;
                                    return (
                                        <div key={idx} className="interactive-card p-5 sm:p-6 text-center hover:border-accent transition-colors">
                                            <div className="flex items-center justify-center mb-4">
                                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent flex items-center justify-center text-white">
                                                    <IconComponent className="text-2xl sm:text-3xl" />
                                                </div>
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold title mb-2">
                                                <DecryptedText text={project.name} />
                                            </h3>
                                            <p className="text-sm sm:text-base text-current opacity-80">
                                                <DecryptedText 
                                                    text={project.desc}
                                                    animateOn="view"
                                                    revealDirection="start"
                                                />
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                </FadeContent>

                {/* Beyond Fundraising + Qualities */}
                <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={300}>
                    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                {/* Impact Story */}
                                <div className="interactive-card p-6 sm:p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent flex items-center justify-center text-white flex-shrink-0">
                                            <FaHandshake className="text-lg sm:text-xl" />
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-accent">
                                            <DecryptedText text="Beyond Fundraising" />
                                        </h2>
                                    </div>
                                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-current mb-4">
                                        <DecryptedText 
                                            text="David's support proved instrumental when, in early 2024, Plastal-Bot Builders set out to raise funds for essential equipment. With help from fundraising partners including Technicbots, they secured about $2,000 to purchase LEGO Spike Prime kits, Arduino starter packs, and a 3D printer—tools that opened doors for dozens of aspiring young engineers."
                                            animateOn="view"
                                            revealDirection="start"
                                        />
                                    </p>
                                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-current">
                                        <DecryptedText 
                                            text="He guided students through ambitious projects like WasteWizard, a self-balancing robot, and a smart EV dashboard. He also helped teams navigate Fusion 360, securing student licenses and walking them through CAD fundamentals."
                                            animateOn="view"
                                            revealDirection="start"
                                        />
                                    </p>
                                </div>

                                {/* Qualities Card */}
                                <div className="interactive-card p-6 sm:p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent flex items-center justify-center text-white flex-shrink-0">
                                            <FaLightbulb className="text-lg sm:text-xl" />
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-accent">
                                            <DecryptedText text="What Makes David Stand Out" />
                                        </h2>
                                    </div>
                                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
                                        {profile_json.qualities.map((quality, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold"
                                                style={{
                                                    backgroundColor: 'var(--accent)',
                                                    color: 'white'
                                                }}
                                            >
                                                <DecryptedText text={quality} />
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-sm sm:text-base leading-relaxed text-current italic">
                                        <DecryptedText 
                                            text="What stands out most about David is his ability to listen. He doesn't just offer solutions—he mentors, encouraging students to think critically and iterate on their designs."
                                            animateOn="view"
                                            revealDirection="start"
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </FadeContent>

                {/* Key Contributions */}
                <FadeContent blur={true} duration={1200} easing="ease-out" initialOpacity={0} delay={200}>
                    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
                        <div className="max-w-7xl mx-auto">
                            <div className="interactive-card p-6 sm:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent flex items-center justify-center text-white flex-shrink-0">
                                        <FaUsers className="text-lg sm:text-xl" />
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-accent">
                                        <DecryptedText text="Key Contributions" />
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    {profile_json.key_contributions.map((contribution, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-3 p-3 sm:p-4 rounded-lg surface-hover"
                                            style={{ backgroundColor: 'var(--surface-bg)', border: '1px solid var(--surface-border)' }}
                                        >
                                            <HiCheckCircle className="text-accent text-xl sm:text-2xl flex-shrink-0 mt-1" />
                                            <span className="text-sm sm:text-base text-current">
                                                <DecryptedText 
                                                    text={contribution}
                                                    animateOn="view"
                                                    revealDirection="start"
                                                />
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </FadeContent>

                {/* Quote Card */}
                <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={300}>
                    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
                        <div className="max-w-7xl mx-auto">
                            <div className="interactive-card p-6 sm:p-8 lg:p-12" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--btn-hover-bg) 100%)' }}>
                                <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white text-center italic">
                                    <DecryptedText text='"Proof that Swiss robotics magic works just as well over a video call." 🤖' />
                                </blockquote>
                            </div>
                        </div>
                    </section>
                </FadeContent>

                {/* Legacy Statement */}
                <FadeContent blur={true} duration={1200} easing="ease-out" initialOpacity={0} delay={200}>
                    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
                        <div className="max-w-7xl mx-auto">
                            <div className="interactive-card p-6 sm:p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent flex items-center justify-center text-white flex-shrink-0">
                                        <FaGraduationCap className="text-lg sm:text-xl" />
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-accent">
                                        <DecryptedText text="A Testament to Cross-Border Collaboration" />
                                    </h2>
                                </div>
                                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-current">
                                    <DecryptedText 
                                        text="For Plastal-Bot Builders and the young innovators they serve, David represents the power of cross-border collaboration and the impact one person can have when they choose to invest in others. His patience and problem-solving skills made complex concepts accessible, while his communication style fostered collaboration and confidence among learners."
                                        animateOn="view"
                                        revealDirection="start"
                                    />
                                </p>
                            </div>
                        </div>
                    </section>
                </FadeContent>

                {/* Call to Action */}
                <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={400}>
                    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
                        <div className="max-w-7xl mx-auto text-center">
                            <p className="text-base sm:text-lg text-current mb-6">
                                <DecryptedText 
                                    text={profile_json.contact_note}
                                    animateOn="view"
                                    revealDirection="start"
                                />
                            </p>
                            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                                <a
                                    href="/team/technicbots"
                                    className="custom-button inline-block px-6 py-3 text-sm sm:text-base"
                                >
                                    Meet Technicbots Team
                                </a>
                                <a
                                    href="/support"
                                    className="custom-button inline-block px-6 py-3 text-sm sm:text-base"
                                >
                                    Support Our Mission
                                </a>
                            </div>
                        </div>
                    </section>
                </FadeContent>

                <Footer />
            </div>

            {/* Float Animation Styles */}
            <style>{`
                @keyframes float-rotate {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    25% {
                        transform: translateY(-8px) rotate(1deg);
                    }
                    50% {
                        transform: translateY(-15px) rotate(0deg);
                    }
                    75% {
                        transform: translateY(-8px) rotate(-1deg);
                    }
                }
            `}</style>
        </>
    );
};

export default DavidProfile;