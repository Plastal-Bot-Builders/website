import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DecryptedText from '../../components/ui/DecryptedText';
import FadeContent from '../../components/ui/FadeContent';
import { SEOConfig } from '../../components/SEO';
import { FaGraduationCap, FaHandshake, FaUserGraduate, FaGlobe } from 'react-icons/fa';
import { HiChatAlt2 } from 'react-icons/hi';
import CountUp from '../../components/ui/CountUp';
import { asset } from '../../utils/asset';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';  

const Technicbots: React.FC = () => {
    const navigate = useNavigate();
    const achievements = [
        "2022 FIRST World Championship Inspire Award",
        "FIRST Hall of Fame Inductees",
        "2023 FIRST Global Challenge Gold Medal (Team USA)",
        "Over 2,000 hours of annual community outreach",
        "Impact on 8,000+ people through STEM programs",
        "16+ years of continuous innovation and excellence"
    ];

    const keyInitiatives = [
        { icon: FaGraduationCap, title: "FLYSET Workshop", desc: "Hands-on learning experiences" },
        { icon: HiChatAlt2, title: "Monthly Mentoring Forums", desc: "Knowledge sharing sessions" },
        { icon: FaHandshake, title: "FLL to FTC Pipeline", desc: "Supporting all FIRST levels" },
        { icon: FaUserGraduate, title: "Youth Mentor Programs", desc: "Developing future leaders" },
        { icon: FaGlobe, title: "Cross-Team Collaboration", desc: "Building global connections" }
    ];

    const stats = [
        { value: 2022, label: "FIRST Championship", suffix: "" },
        { value: 8000, label: "Students Impacted", suffix: "+" },
        { value: 2000, label: "Outreach Hours", suffix: "+" },
        { value: 16, label: "Years Active", suffix: "+" }
    ];

    const teamPhotos = [
        {
            src: "/resources/technicbots/teamphoto.png",
            alt: "Technicbots Team Photo",
            caption: "Team 8565 - Building the Future"
        },
        {
            src: "/resources/technicbots/fixingrobot.jpg",
            alt: "Robot Demonstration",
            caption: "Competition Demo Day"
        },
        {
            src: "/resources/technicbots/awards.jpg",
            alt: "Robot Design",
            caption: "Award-Winning Robot Design"
        },
        {
            src: "/resources/technicbots/robot.jpg",
            alt: "Team Working on Robot",
            caption: "Engineering in Action"
        }
    ];

    const workshopPhotos = [
        {
            src: "/resources/technicbots/withpolice.jpg",
            alt: "FLYSET Workshop",
            caption: "FLYSET Workshop - Hands-on Learning"
        },
        {
            src: "/resources/technicbots/tedtalk.jpg",
            alt: "Student Mentoring",
            caption: "Mentoring Future Engineers"
        },
        {
            src: "/resources/technicbots/withman.jpg",
            alt: "Robotics Training",
            caption: "Building Skills Together"
        }
    ];

    const competitionPhotos = [
        {
            src: "/resources/technicbots/competitions.jpg",
            alt: "FIRST Global Competition",
            caption: "FIRST Global Challenge - Geneva 2023"
        },
        {
            src: "/resources/technicbots/competition1.jpg",
            alt: "Team USA",
            caption: "Representing Team USA"
        },
        {
            src: "/resources/technicbots/kidsplaying.jpg",
            alt: "Gold Medal Victory",
            caption: "Gold Medal Victory with Team Zimbabwe"
        }
    ];

    return (
        <>
            <SEOConfig
                title="Technicbots - FTC Team 8565 | Plastal-Bot Builders"
                description="Meet Technicbots (FTC 8565), a FIRST Hall of Fame team from Plano, Texas. FIRST World Championship Inspire Award winners, FIRST Global Challenge gold medalists, and dedicated STEM mentors impacting 8,000+ students annually."
                image="/resources/technicbots/teamphoto2.jpg"
            />

            <div className="scroll-smooth focus:scroll-auto">
                <Header />

                {/* Hero Section */}
                <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                    <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            {/* Back Button */}
                            <button
                                onClick={() => {
                                    navigate('/home');
                                    setTimeout(() => {
                                        const partnersSection = document.getElementById('partners');
                                        if (partnersSection) {
                                            partnersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }
                                    }, 300);
                                }}
                                className="inline-flex items-center text-sm sm:text-base hover:text-accent transition-colors mb-6"
                                aria-label="Go back to Partners section"
                            >
                                <ArrowLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                <span className="text-sm sm:text-base">Back to Home</span>

                            </button>
                            
                            {/* Hero Content - Centered */}
                            <div className="text-center">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 title">
                                    <DecryptedText text="Technicbots" />
                                </h1>
                                <div
                                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-accent mx-auto mb-4 sm:mb-6"
                                    style={{
                                        animation: 'float-rotate 3s ease-in-out infinite'
                                    }}
                                >
                                    <img
                                        src={asset('resources/technicbots/technicbotslogo.jpg')}
                                        alt="Technicbots Logo"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="text-lg sm:text-xl md:text-2xl mb-2 text-accent font-semibold">
                                    <DecryptedText text="FIRST Tech Challenge Team 8565" />
                                </p>
                                <p className="text-base sm:text-lg text-current opacity-90">
                                    <DecryptedText text="Plano, Texas | FIRST Hall of Fame | Est. 2009" />
                                </p>
                            </div>
                        </div>
                    </section>
                </FadeContent>

                {/* Main Story + Stats */}
                <FadeContent blur={true} duration={1200} easing="ease-out" initialOpacity={0} delay={200}>
                    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                                {/* Large Story Card */}
                                <div className="lg:col-span-2 interactive-card p-6 sm:p-8">
                                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-accent border-b-2 border-accent pb-2">
                                        <DecryptedText text="About Technicbots" />
                                    </h2>
                                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-current">
                                        <DecryptedText 
                                            text="Technicbots, officially known as FIRST Tech Challenge Team 8565, is a pioneering youth robotics team based in Plano, Texas, dedicated to advancing STEM education and fostering innovation among students. Since its founding in 2009, the team has become a powerhouse of creativity, collaboration, and technical excellence—serving as both a competitive robotics team and a community-driven platform for inspiring future engineers, programmers, and innovators."
                                            animateOn="view"
                                            revealDirection="start"
                                        />
                                    </p>
                                </div>

                                {/* Stats Card */}
                                <div className="interactive-card p-4 sm:p-6" style={{ background: 'linear-gradient(135deg, var(--surface-bg) 0%, var(--surface-hover-bg) 100%)' }}>
                                    <h3 className="text-lg sm:text-xl font-bold mb-4 title text-center">
                                        <DecryptedText text="Impact at a Glance" />
                                    </h3>
                                    <div className="space-y-3">
                                        {stats.map((stat, idx) => (
                                            <div key={idx} className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--surface-bg)', border: '1px solid var(--surface-border)' }}>
                                                <p className="text-2xl sm:text-3xl font-bold text-accent">
                                                    <CountUp
                                                        from={0}
                                                        to={stat.value}
                                                        separator={stat.value >= 1000 ? "," : ""}
                                                        suffix={stat.suffix}
                                                        duration={2.5}
                                                        className="inline"
                                                    />
                                                </p>
                                                <p className="text-xs sm:text-sm text-current">{stat.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </FadeContent>

                {/* Team Photos Gallery */}
                <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={300}>
                    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-accent">
                                <DecryptedText text="Our Team in Action" />
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                                {teamPhotos.map((photo, idx) => (
                                    <div key={idx} className="interactive-card overflow-hidden group">
                                        <div className="relative aspect-square overflow-hidden">
                                            <img
                                                src={asset(photo.src)}
                                                alt={photo.alt}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                onError={(e) => {
                                                    e.currentTarget.src = '/resources/Logo/logo.png';
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                                                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                                                    <p className="text-white font-semibold text-xs sm:text-sm">
                                                        <DecryptedText text={photo.caption} />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </FadeContent>

                {/* Championship + Leadership */}
                <FadeContent blur={true} duration={1200} easing="ease-out" initialOpacity={0} delay={200}>
                    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                {/* Championship Card */}
                                <div className="interactive-card p-6 sm:p-8">
                                    <h2 className="text-xl sm:text-2xl font-bold mb-4 text-accent border-b-2 border-accent pb-2">
                                        <DecryptedText text="Championship Legacy" />
                                    </h2>
                                    <p className="text-sm sm:text-base leading-relaxed text-current mb-4">
                                        <DecryptedText 
                                            text="Over the years, Technicbots has earned a reputation for excellence on both national and international stages. In the 2021–2022 season, the team received the prestigious Inspire Award at the FIRST World Championship, a recognition that secured their place in the FIRST Hall of Fame—a rare honor that celebrates teams whose work embodies the ideals of the FIRST mission."
                                            animateOn="view"
                                            revealDirection="start"
                                        />
                                    </p>
                                    <p className="text-sm sm:text-base leading-relaxed text-current">
                                        <DecryptedText 
                                            text="The following year, they proudly represented Team USA at the FIRST Global Challenge in Geneva, Switzerland, where they achieved a Gold Medal victory in partnership with Team Zimbabwe, symbolizing the power of international collaboration and technological unity."
                                            animateOn="view"
                                            revealDirection="start"
                                        />
                                    </p>
                                </div>

                                {/* Leadership Card */}
                                <div className="interactive-card p-6 sm:p-8" style={{ background: 'linear-gradient(135deg, var(--surface-bg) 0%, var(--surface-hover-bg) 100%)' }}>
                                    <h2 className="text-xl sm:text-2xl font-bold mb-4 text-accent border-b-2 border-accent pb-2">
                                        <DecryptedText text="Leadership & Mentorship" />
                                    </h2>
                                    <div className="flex items-start gap-3 sm:gap-4 mb-4">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-accent flex items-center justify-center text-white text-lg sm:text-2xl font-bold flex-shrink-0">
                                            FW
                                        </div>
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-bold title mb-1">
                                                <DecryptedText text="Dr. Fang Wang" />
                                            </h3>
                                            <p className="text-xs sm:text-sm text-current mb-2 opacity-80">
                                                <DecryptedText text="Founder & Lead Mentor | Software Engineer" />
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm sm:text-base leading-relaxed text-current">
                                        <DecryptedText 
                                            text="Under the dedicated mentorship of Dr. Fang Wang, the team continues to embody excellence in both engineering and outreach. Dr. Wang's leadership emphasizes not only technical proficiency but also teamwork, leadership, and community impact. Her experience as Vice President of the ACP Foundation and founder of the ACP Robotics Program has enriched Technicbots' mentoring culture, enabling students to thrive beyond competition."
                                            animateOn="view"
                                            revealDirection="start"
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </FadeContent>

                {/* Competition Photos Gallery */}
                <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={300}>
                    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-accent">
                                <DecryptedText text="Competition Highlights" />
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                {competitionPhotos.map((photo, idx) => (
                                    <div key={idx} className="interactive-card overflow-hidden group">
                                        <div className="relative aspect-video overflow-hidden">
                                            <img
                                                src={asset(photo.src)}
                                                alt={photo.alt}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                onError={(e) => {
                                                    e.currentTarget.src = '/resources/Logo/logo.png';
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                                                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                                                    <p className="text-white font-semibold text-xs sm:text-sm">
                                                        <DecryptedText text={photo.caption} />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </FadeContent>

                {/* Key Initiatives Grid */}
                <FadeContent blur={true} duration={1200} easing="ease-out" initialOpacity={0} delay={200}>
                    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-accent">
                                <DecryptedText text="Key Initiatives" />
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                                {keyInitiatives.map((initiative, idx) => {
                                    const IconComponent = initiative.icon;
                                    return (
                                        <div
                                            key={idx}
                                            className="interactive-card p-4 sm:p-6 text-center surface-hover"
                                        >
                                            <div className="flex items-center justify-center mb-3">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent flex items-center justify-center text-white">
                                                    <IconComponent className="text-xl sm:text-2xl" />
                                                </div>
                                            </div>
                                            <h3 className="text-sm sm:text-base font-bold title mb-2">
                                                <DecryptedText text={initiative.title} />
                                            </h3>
                                            <p className="text-xs sm:text-sm text-current opacity-80">
                                                <DecryptedText text={initiative.desc} />
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                </FadeContent>

                {/* Workshop Photos Gallery */}
                <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={300}>
                    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-accent">
                                <DecryptedText text="Community Workshops & Outreach" />
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                {workshopPhotos.map((photo, idx) => (
                                    <div key={idx} className="interactive-card overflow-hidden group">
                                        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                                            <img
                                                src={asset(photo.src)}
                                                alt={photo.alt}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                onError={(e) => {
                                                    e.currentTarget.src = '/resources/Logo/logo.png';
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                                                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                                                    <p className="text-white font-semibold text-xs sm:text-sm">
                                                        <DecryptedText text={photo.caption} />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </FadeContent>

                {/* Community Impact + Team Structure */}
                <FadeContent blur={true} duration={1200} easing="ease-out" initialOpacity={0} delay={200}>
                    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                                {/* Community Impact */}
                                <div className="lg:col-span-2 interactive-card p-6 sm:p-8">
                                    <h2 className="text-xl sm:text-2xl font-bold mb-4 text-accent border-b-2 border-accent pb-2">
                                        <DecryptedText text="Community Impact" />
                                    </h2>
                                    <p className="text-sm sm:text-base leading-relaxed text-current mb-4">
                                        <DecryptedText 
                                            text="Each year, the team invests over 2,000 hours in outreach, impacting more than 8,000 people through workshops, mentorship programs, and STEM events. Initiatives like the FLYSET Workshop and Monthly Mentoring Forums bring together students, educators, and professionals to share knowledge, build skills, and nurture curiosity."
                                            animateOn="view"
                                            revealDirection="start"
                                        />
                                    </p>
                                    <p className="text-sm sm:text-base leading-relaxed text-current">
                                        <DecryptedText 
                                            text="From FLL Explore to FTC, Technicbots supports every level of the FIRST pipeline, ensuring that younger teams receive the guidance they need to grow."
                                            animateOn="view"
                                            revealDirection="start"
                                        />
                                    </p>
                                </div>

                                {/* Team Structure */}
                                <div className="interactive-card p-6 sm:p-8">
                                    <h2 className="text-xl sm:text-2xl font-bold mb-4 text-accent border-b-2 border-accent pb-2">
                                        <DecryptedText text="Team Structure" />
                                    </h2>
                                    <p className="text-sm sm:text-base leading-relaxed text-current">
                                        <DecryptedText 
                                            text="Students from schools across North Texas take on specialized roles in hardware, software, CAD design, business, and scouting, learning to operate as an integrated engineering unit."
                                            animateOn="view"
                                            revealDirection="start"
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </FadeContent>

                {/* Achievements Grid */}
                <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={300}>
                    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
                        <div className="max-w-7xl mx-auto">
                            <div className="interactive-card p-6 sm:p-8">
                                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-accent border-b-2 border-accent pb-2">
                                    <DecryptedText text="Key Achievements" />
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                    {achievements.map((achievement, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg surface-hover"
                                            style={{ backgroundColor: 'var(--surface-bg)', border: '1px solid var(--surface-border)' }}
                                        >
                                            <span className="text-accent text-xl sm:text-2xl flex-shrink-0">✓</span>
                                            <span className="text-current text-xs sm:text-sm">
                                                <DecryptedText text={achievement} />
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </FadeContent>

                {/* Legacy Card */}
                <FadeContent blur={true} duration={1200} easing="ease-out" initialOpacity={0} delay={200}>
                    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
                        <div className="max-w-7xl mx-auto">
                            <div className="interactive-card p-6 sm:p-8 lg:p-12" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)' }}>
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-accent text-center">
                                    <DecryptedText text="A Legacy of Excellence" />
                                </h2>
                                <p className="text-accent text-sm sm:text-accent md:text-lg leading-relaxed text-center max-w-4xl mx-auto">
                                    <DecryptedText 
                                        text="With over 16 years of activity, countless innovations, and a growing legacy of community leadership, Technicbots stands as a testament to what young people can achieve when guided by passion, purpose, and teamwork. Whether competing on the world stage or hosting a local workshop, Team 8565 remains committed to building robots that inspire—and a future that empowers."
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
                            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                                <a
                                    href="https://www.technicbots.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="custom-button inline-block px-6 py-3 text-sm sm:text-base"
                                >
                                    Visit Technicbots Website
                                </a>
                                <a
                                    href="/team/david"
                                    className="custom-button inline-block px-6 py-3 text-sm sm:text-base"
                                >
                                    Meet Our Collaborator David
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

export default Technicbots;