import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DecryptedText from '../../components/ui/DecryptedText';
import { SEOConfig } from '../../components/SEO';

const Technicbots: React.FC = () => {
    const navigate = useNavigate();
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
        { emoji: "🎓", title: "FLYSET Workshop", desc: "Hands-on learning experiences" },
        { emoji: "💬", title: "Monthly Mentoring Forums", desc: "Knowledge sharing sessions" },
        { emoji: "🤝", title: "FLL to FTC Pipeline", desc: "Supporting all FIRST levels" },
        { emoji: "👥", title: "Youth Mentor Programs", desc: "Developing future leaders" },
        { emoji: "🌐", title: "Cross-Team Collaboration", desc: "Building global connections" }
    ];

    const stats = [
        { value: "2022", label: "FIRST Championship" },
        { value: "8,000+", label: "Students Impacted" },
        { value: "2,000+", label: "Outreach Hours" },
        { value: "16+", label: "Years Active" }
    ];

    const teamPhotos = [
        {
            src: "/resources/technicbots/teamphoto2.jpg",
            alt: "Technicbots Team Photo",
            caption: "Team 8565 - Building the Future"
        },
        {
            src: "/resources/technicbots/teamphoto1.jpg",
            alt: "Robot Demonstration",
            caption: "Competition Demo Day"
        },
        {
            src: "/resources/technicbots/teamphoto2.jpg",
            alt: "Robot Design",
            caption: "Award-Winning Robot Design"
        },
        {
            src: "/resources/technicbots/teamphoto2.jpg",
            alt: "Team Working on Robot",
            caption: "Engineering in Action"
        }
    ];

    const workshopPhotos = [
        {
            src: "/resources/IntroRoboticsWorkshop/teamphoto2.jpg",
            alt: "FLYSET Workshop",
            caption: "FLYSET Workshop - Hands-on Learning"
        },
        {
            src: "/resources/IntroRoboticsWorkshop/teamphoto2.jpg",
            alt: "Student Mentoring",
            caption: "Mentoring Future Engineers"
        },
        {
            src: "/resources/IntroRoboticsWorkshop/teamphoto2.jpg",
            alt: "Robotics Training",
            caption: "Building Skills Together"
        }
    ];

    const competitionPhotos = [
        {
            src: "/resources/Robotics/teamphoto2.jpg",
            alt: "FIRST Global Competition",
            caption: "FIRST Global Challenge - Geneva 2023"
        },
        {
            src: "/resources/Robotics/teamphoto2.jpg",
            alt: "Team USA",
            caption: "Representing Team USA"
        },
        {
            src: "/resources/Robotics/teamphoto2.jpg",
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
                <section className="relative py-20 px-4" style={{ backgroundColor: 'var(--surface-bg)' }}>
                    <div className="max-w-7xl mx-auto">
                        {/* Back Button - Top Left */}
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
                            className="flex items-center text-sm hover:text-accent transition-colors mb-6"
                            aria-label="Go back to Partners section"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Partners
                        </button>
                        
                        {/* Hero Content - Centered */}
                        <div className="text-center">
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
                    </div>
                </section>

                {/* Bento Grid Section 1: Main Story + Stats */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {/* Large Story Card */}
                        <div className="md:col-span-2 interactive-card p-8">
                            <h2 className="text-3xl font-bold mb-6 text-accent border-b-2 border-accent pb-2">
                                <DecryptedText text="About Technicbots" />
                            </h2>
                            <p className="text-lg leading-relaxed text-current mb-4">
                                <DecryptedText text="Technicbots, officially known as FIRST Tech Challenge Team 8565, is a pioneering youth robotics team based in Plano, Texas, dedicated to advancing STEM education and fostering innovation among students. Since its founding in 2009, the team has become a powerhouse of creativity, collaboration, and technical excellence—serving as both a competitive robotics team and a community-driven platform for inspiring future engineers, programmers, and innovators." />
                            </p>
                        </div>

                        {/* Stats Card */}
                        <div className="interactive-card p-6">
                            <h3 className="text-xl font-bold mb-4 title text-center">
                                <DecryptedText text="Impact at a Glance" />
                            </h3>
                            <div className="space-y-4">
                                {stats.map((stat, idx) => (
                                    <div key={idx} className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--surface-bg)' }}>
                                        <p className="text-3xl font-bold text-accent">{stat.value}</p>
                                        <p className="text-sm text-current">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Team Photos Gallery - Bento Grid */}
                    <div className="mb-4">
                        <h2 className="text-3xl font-bold mb-4 text-accent">
                            <DecryptedText text="Our Team in Action" />
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {teamPhotos.map((photo, idx) => (
                                <div key={idx} className="interactive-card overflow-hidden group">
                                    <div className="relative aspect-square overflow-hidden">
                                        <img
                                            src={photo.src}
                                            alt={photo.alt}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            onError={(e) => {
                                                e.currentTarget.src = '/resources/Logo/logo.png';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                                <p className="text-white font-semibold text-sm">
                                                    <DecryptedText text={photo.caption} />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bento Grid Section 2: Championship + Leadership */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* Championship Card */}
                        <div className="interactive-card p-8">
                            <h2 className="text-2xl font-bold mb-4 text-accent border-b-2 border-accent pb-2">
                                <DecryptedText text="Championship Legacy" />
                            </h2>
                            <p className="text-base leading-relaxed text-current mb-4">
                                <DecryptedText text="Over the years, Technicbots has earned a reputation for excellence on both national and international stages. In the 2021–2022 season, the team received the prestigious Inspire Award at the FIRST World Championship, a recognition that secured their place in the FIRST Hall of Fame—a rare honor that celebrates teams whose work embodies the ideals of the FIRST mission." />
                            </p>
                            <p className="text-base leading-relaxed text-current">
                                <DecryptedText text="The following year, they proudly represented Team USA at the FIRST Global Challenge in Geneva, Switzerland, where they achieved a Gold Medal victory in partnership with Team Zimbabwe, symbolizing the power of international collaboration and technological unity." />
                            </p>
                        </div>

                        {/* Leadership Card */}
                        <div className="interactive-card p-8" style={{ background: 'linear-gradient(135deg, var(--surface-bg) 0%, var(--surface-hover-bg) 100%)' }}>
                            <h2 className="text-2xl font-bold mb-4 text-accent border-b-2 border-accent pb-2">
                                <DecryptedText text="Leadership & Mentorship" />
                            </h2>
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                                    FW
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold title mb-1">
                                        <DecryptedText text="Dr. Fang Wang" />
                                    </h3>
                                    <p className="text-sm text-current mb-2 opacity-80">
                                        <DecryptedText text="Founder & Lead Mentor | Software Engineer" />
                                    </p>
                                </div>
                            </div>
                            <p className="text-base leading-relaxed text-current">
                                <DecryptedText text="Under the dedicated mentorship of Dr. Fang Wang, the team continues to embody excellence in both engineering and outreach. Dr. Wang's leadership emphasizes not only technical proficiency but also teamwork, leadership, and community impact. Her experience as Vice President of the ACP Foundation and founder of the ACP Robotics Program has enriched Technicbots' mentoring culture, enabling students to thrive beyond competition." />
                            </p>
                        </div>
                    </div>

                    {/* Competition Photos Gallery */}
                    <div className="mb-4">
                        <h2 className="text-3xl font-bold mb-4 text-accent">
                            <DecryptedText text="Competition Highlights" />
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {competitionPhotos.map((photo, idx) => (
                                <div key={idx} className="interactive-card overflow-hidden group">
                                    <div className="relative aspect-video overflow-hidden">
                                        <img
                                            src={photo.src}
                                            alt={photo.alt}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            onError={(e) => {
                                                e.currentTarget.src = '/resources/Logo/logo.png';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                                <p className="text-white font-semibold">
                                                    <DecryptedText text={photo.caption} />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bento Grid Section 3: Initiatives Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                        {keyInitiatives.map((initiative, idx) => (
                            <div
                                key={idx}
                                className="interactive-card p-6 text-center surface-hover"
                            >
                                <div className="text-4xl mb-3">{initiative.emoji}</div>
                                <h3 className="text-base font-bold title mb-2">
                                    <DecryptedText text={initiative.title} />
                                </h3>
                                <p className="text-sm text-current opacity-80">
                                    <DecryptedText text={initiative.desc} />
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Workshop Photos Gallery */}
                    <div className="mb-4">
                        <h2 className="text-3xl font-bold mb-4 text-accent">
                            <DecryptedText text="Community Workshops & Outreach" />
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {workshopPhotos.map((photo, idx) => (
                                <div key={idx} className="interactive-card overflow-hidden group">
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={photo.src}
                                            alt={photo.alt}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            onError={(e) => {
                                                e.currentTarget.src = '/resources/Logo/logo.png';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                                <p className="text-white font-semibold">
                                                    <DecryptedText text={photo.caption} />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bento Grid Section 4: Community + Team Structure */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {/* Community Impact */}
                        <div className="md:col-span-2 interactive-card p-8">
                            <h2 className="text-2xl font-bold mb-4 text-accent border-b-2 border-accent pb-2">
                                <DecryptedText text="Community Impact" />
                            </h2>
                            <p className="text-base leading-relaxed text-current mb-4">
                                <DecryptedText text="Each year, the team invests over 2,000 hours in outreach, impacting more than 8,000 people through workshops, mentorship programs, and STEM events. Initiatives like the FLYSET Workshop and Monthly Mentoring Forums bring together students, educators, and professionals to share knowledge, build skills, and nurture curiosity." />
                            </p>
                            <p className="text-base leading-relaxed text-current">
                                <DecryptedText text="From FLL Explore to FTC, Technicbots supports every level of the FIRST pipeline, ensuring that younger teams receive the guidance they need to grow." />
                            </p>
                        </div>

                        {/* Team Structure */}
                        <div className="interactive-card p-8">
                            <h2 className="text-2xl font-bold mb-4 text-accent border-b-2 border-accent pb-2">
                                <DecryptedText text="Team Structure" />
                            </h2>
                            <p className="text-base leading-relaxed text-current">
                                <DecryptedText text="Students from schools across North Texas take on specialized roles in hardware, software, CAD design, business, and scouting, learning to operate as an integrated engineering unit." />
                            </p>
                        </div>
                    </div>

                    {/* Achievements Grid */}
                    <div className="interactive-card p-8 mb-4">
                        <h2 className="text-2xl font-bold mb-6 text-accent border-b-2 border-accent pb-2">
                            <DecryptedText text="Key Achievements" />
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {achievements.map((achievement, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-start gap-3 p-4 rounded-lg surface-hover"
                                    style={{ backgroundColor: 'var(--surface-bg)', border: '1px solid var(--surface-border)' }}
                                >
                                    <span className="text-accent text-2xl flex-shrink-0">✓</span>
                                    <span className="text-current text-sm">
                                        <DecryptedText text={achievement} />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Legacy Card */}
                    <div className="interactive-card p-8 mb-4" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)' }}>
                        <h2 className="text-3xl font-bold mb-4 text-white text-center">
                            <DecryptedText text="A Legacy of Excellence" />
                        </h2>
                        <p className="text-lg leading-relaxed text-white text-center max-w-4xl mx-auto">
                            <DecryptedText text="With over 16 years of activity, countless innovations, and a growing legacy of community leadership, Technicbots stands as a testament to what young people can achieve when guided by passion, purpose, and teamwork. Whether competing on the world stage or hosting a local workshop, Team 8565 remains committed to building robots that inspire—and a future that empowers." />
                        </p>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center py-8">
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
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
};

export default Technicbots;