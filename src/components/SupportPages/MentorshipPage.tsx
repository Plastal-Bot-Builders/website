import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import {
    FaArrowLeft, FaLightbulb, FaUsers, FaRegHandshake, FaGraduationCap,
    FaRobot, FaComment, FaBriefcase, FaChalkboardTeacher, FaUserTie, FaCalendarAlt
} from 'react-icons/fa';
import ThemedImage from '../../theme/ThemedImage';
import { asset } from '../../utils/asset';
import { SEOConfig } from '../../components/SEO';
import FadeContent from '../../components/ui/FadeContent';

const MentorshipPage: React.FC = () => {
    // Mentorship benefits data
    const mentorBenefits = [
        {
            title: "Make a Lasting Impact",
            description: "Shape the next generation of innovators and contribute to Zambia's growing tech ecosystem.",
            icon: <FaLightbulb className="text-accent text-xl sm:text-2xl" />
        },
        {
            title: "Develop Leadership Skills",
            description: "Enhance your communication, coaching, and leadership capabilities through guided mentorship.",
            icon: <FaUserTie className="text-accent text-xl sm:text-2xl" />
        },
        {
            title: "Access Innovation Networks",
            description: "Connect with other industry professionals, educators, and emerging talent.",
            icon: <FaUsers className="text-accent text-xl sm:text-2xl" />
        },
        {
            title: "Professional Recognition",
            description: "Receive certification and acknowledgment for your contributions to STEM education.",
            icon: <FaGraduationCap className="text-accent text-xl sm:text-2xl" />
        }
    ];

    const menteeBenefits = [
        {
            title: "Personalized Guidance",
            description: "Receive tailored support for your technical projects and career development goals.",
            icon: <FaChalkboardTeacher className="text-accent text-xl sm:text-2xl" />
        },
        {
            title: "Industry Insights",
            description: "Learn directly from professionals about real-world applications and career pathways.",
            icon: <FaBriefcase className="text-accent text-xl sm:text-2xl" />
        },
        {
            title: "Project Development",
            description: "Get expert feedback on your robotics, programming, and engineering projects.",
            icon: <FaRobot className="text-accent text-xl sm:text-2xl" />
        },
        {
            title: "Networking Opportunities",
            description: "Build valuable connections that can open doors to internships and job opportunities.",
            icon: <FaRegHandshake className="text-accent text-xl sm:text-2xl" />
        }
    ];

    // Mentorship opportunities data
    const mentorshipOpportunities = [
        {
            title: "One-on-One Mentorship",
            description: "Provide regular personalized guidance sessions with a dedicated mentee over 3-6 months.",
            commitment: "2-4 hours monthly",
            icon: <FaComment className="text-accent text-xl sm:text-2xl" />
        },
        {
            title: "Project Mentoring",
            description: "Support students through specific robotics or programming projects from concept to completion.",
            commitment: "5-10 hours per project",
            icon: <FaRobot className="text-accent text-xl sm:text-2xl" />
        },
        {
            title: "Tech Talks & Workshops",
            description: "Lead sessions sharing your expertise in specific technical areas or career development topics.",
            commitment: "2-3 hours per session",
            icon: <FaChalkboardTeacher className="text-accent text-xl sm:text-2xl" />
        },
        {
            title: "Competition Coaching",
            description: "Guide teams preparing for robotics competitions, hackathons, or innovation challenges.",
            commitment: "Varies by competition",
            icon: <FaUsers className="text-accent text-xl sm:text-2xl" />
        }
    ];

    // Success stories
    const successStories = [
        {
            name: "Your Name Here",
            role: "Future Founding Mentor",
            quote: "Imagine the impact you'll have as one of our inaugural mentors, guiding young innovators through their first robotics projects and watching them grow into tomorrow's engineers.",
            image: "resources/founders/fredrick.jpg"
        },
        {
            name: "Visionary Professional",
            role: "Potential Industry Mentor",
            quote: "As an early mentor, you'll help establish the framework for how we bridge academic theory with practical innovation—creating pathways that will serve thousands of students in years to come.",
            image: "resources/founders/fred.png"
        }
    ];

    return (
        <>
            <SEOConfig
                title="Mentorship | Plastal-Bot Builders"
                description="Join Plastal-Bot Builders' planned Mentorship Program to share your expertise or seek guidance in robotics and STEM innovation."
                image="/resources/Photos/fredmpelembe.jpeg"
            />
            <section className="scroll-smooth focus:scroll-auto">
                <Header />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                    <Link to="/support" className="inline-flex items-center text-accent hover:text-accent-hover mb-6 text-sm sm:text-base">
                        <FaArrowLeft className="mr-2" /> Back to Support
                    </Link>

                    {/* Hero Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-center mb-8 lg:mb-12">
                            <div className="w-full md:w-1/2 space-y-4 sm:space-y-6">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                                    <FaRegHandshake className="inline-block mr-2 sm:mr-3 text-2xl sm:text-3xl md:text-4xl" />
                                    Envisioned Mentorship Program
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                                    Be among the first to shape Zambia's next generation of innovators through our planned mentorship initiative.
                                </p>
                                <div className="bg-surface-hover-bg p-4 sm:p-6 rounded-lg">
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        Our mentorship program will connect students and emerging engineers with industry experts, 
                                        researchers, and university mentors to foster meaningful technical and professional growth 
                                        as we build this transformative platform.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <a
                                        href="#become-mentor"
                                        className="bg-accent hover:bg-accent-hover text-black py-3 px-4 sm:px-6 rounded-lg font-bold text-center text-sm sm:text-base transition-colors"
                                    >
                                        Join as Founding Mentor
                                    </a>
                                    <a
                                        href="#seek-mentorship"
                                        className="border border-accent text-accent hover:bg-accent hover:text-black py-3 px-4 sm:px-6 rounded-lg font-bold text-center text-sm sm:text-base transition-colors"
                                    >
                                        Express Interest as Mentee
                                    </a>
                                </div>
                            </div>

                            <div className="w-full md:w-1/2">
                                <ThemedImage
                                    src="resources/Illustrations/Mentorship.svg"
                                    alt="Future mentor working with students on a robotics project"
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </div>
                    </FadeContent>

                    {/* Program Overview */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={100}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">Program Vision</h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-xl sm:text-2xl font-bold">Our Mentorship Vision</h3>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        The planned Plastal-Bot Mentorship Program will bridge knowledge and opportunity by connecting 
                                        experienced professionals with talented young innovators passionate about technology.
                                    </p>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        Through structured guidance, mentees will develop technical skills, professional confidence, 
                                        and career direction while mentors make meaningful contributions to Zambia's tech future 
                                        as we establish this transformative initiative.
                                    </p>
                                </div>

                                <div className="bg-surface-hover-bg rounded-lg p-4 sm:p-5">
                                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Planned Focus Areas</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm"><strong>Technical Guidance</strong> - Robotics, programming, AI, and electronics mentorship</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm"><strong>Project Development</strong> - Supporting students from concept to prototype to completion</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm"><strong>Professional Growth</strong> - Career planning, skill development, and networking opportunities</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm"><strong>Innovation Mindset</strong> - Fostering problem-solving, creativity, and entrepreneurship</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </FadeContent>

                    {/* How It Works Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={200}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">How Our Program Will Work</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center rounded-lg interactive-card p-4 sm:p-5">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-surface-hover-bg rounded-full flex items-center justify-center border-2 border-accent">
                                        <span className="text-accent font-bold text-lg sm:text-xl">1</span>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Match</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">
                                        Our planned platform will connect mentors and mentees based on skills, interests, 
                                        experience level, and availability.
                                    </p>
                                </div>

                                <div className="text-center rounded-lg interactive-card p-4 sm:p-5">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-surface-hover-bg rounded-full flex items-center justify-center border-2 border-accent">
                                        <span className="text-accent font-bold text-lg sm:text-xl">2</span>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Connect</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">
                                        Pairs will establish goals, expectations, and a meeting schedule 
                                        that works for both mentor and mentee.
                                    </p>
                                </div>

                                <div className="text-center rounded-lg interactive-card p-4 sm:p-5">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-surface-hover-bg rounded-full flex items-center justify-center border-2 border-accent">
                                        <span className="text-accent font-bold text-lg sm:text-xl">3</span>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Grow</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">
                                        Engage in regular sessions, project work, and progress tracking 
                                        with support from our program coordinators as we launch.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 sm:mt-8 text-center">
                                <div className="relative">
                                    <ThemedImage
                                        src="resources/Illustrations/Mentorship.svg"
                                        alt="Envisioned mentorship matching platform interface"
                                        className="w-full max-w-2xl mx-auto h-auto object-contain rounded-lg shadow-lg"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg flex items-end justify-center">
                                        <p className="text-white font-semibold text-xs sm:text-sm p-3 sm:p-4">
                                            Our planned online mentorship platform will facilitate connections and track progress
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FadeContent>

                    {/* Benefits Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={100}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">Envisioned Program Benefits</h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
                                        <FaChalkboardTeacher className="text-accent mr-2 text-xl sm:text-2xl" /> For Founding Mentors
                                    </h3>

                                    <div className="space-y-4">
                                        {mentorBenefits.map((benefit, index) => (
                                            <div key={index} className="flex items-start bg-surface-hover-bg rounded-lg p-3 sm:p-4 interactive-card">
                                                <div className="mr-3 mt-1 border-2 border-accent rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
                                                    {benefit.icon}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold mb-1 text-sm sm:text-base">{benefit.title}</h4>
                                                    <p className="text-xs sm:text-sm leading-relaxed">{benefit.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
                                        <FaGraduationCap className="text-accent mr-2 text-xl sm:text-2xl" /> For Future Mentees
                                    </h3>

                                    <div className="space-y-4">
                                        {menteeBenefits.map((benefit, index) => (
                                            <div key={index} className="flex items-start bg-surface-hover-bg rounded-lg p-3 sm:p-4 interactive-card">
                                                <div className="mr-3 mt-1 border-2 border-accent rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
                                                    {benefit.icon}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold mb-1 text-sm sm:text-base">{benefit.title}</h4>
                                                    <p className="text-xs sm:text-sm leading-relaxed">{benefit.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FadeContent>

                    {/* Mentorship Opportunities Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={200}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">Planned Mentorship Opportunities</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {mentorshipOpportunities.map((opportunity, index) => (
                                    <div key={index} className="rounded-lg interactive-card p-4 sm:p-6 hover:border-accent transition-colors">
                                        <div className="flex items-center mb-4">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0 border-2 border-accent">
                                                {opportunity.icon}
                                            </div>
                                            <h3 className="text-base sm:text-lg md:text-xl font-bold">{opportunity.title}</h3>
                                        </div>

                                        <p className="mb-3 text-sm sm:text-base leading-relaxed">{opportunity.description}</p>

                                        <div className="bg-surface-hover-bg rounded-lg p-3 flex items-center">
                                            <FaCalendarAlt className="text-accent mr-2 flex-shrink-0" />
                                            <p className="text-xs sm:text-sm">
                                                <strong>Time Commitment:</strong> {opportunity.commitment}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </FadeContent>

                    {/* Success Stories */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={100}>
                        <section className="mb-8 lg:mb-12">
                            <div className="bg-surface-hover-bg rounded-lg p-4 sm:p-6 lg:p-8">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Envisioned Mentor Impact</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                    {successStories.map((story, index) => (
                                        <div key={index} className="bg-surface rounded-lg p-4 sm:p-5 flex flex-col md:flex-row gap-4">
                                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 mx-auto md:mx-0 border-2 border-accent">
                                                <ThemedImage
                                                    src={story.image}
                                                    alt={story.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="italic mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">"{story.quote}"</p>
                                                <p className="font-bold text-sm sm:text-base">{story.name}</p>
                                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{story.role}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 text-center">
                                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 italic">
                                        These are the opportunities awaiting our founding mentors and early participants
                                    </p>
                                </div>
                            </div>
                        </section>
                    </FadeContent>

                    {/* Quarterly Tech Talks */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={200}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">Planned Quarterly Tech Talks</h2>

                            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center">
                                <div className="w-full lg:w-1/2 space-y-4">
                                    <h3 className="text-lg sm:text-xl font-bold">Connecting Mentors and Mentees</h3>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        Our envisioned quarterly Tech Talk meetups will bring together mentors, mentees, and the wider 
                                        tech community for knowledge sharing and networking as we establish the program.
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">Lightning talks from industry professionals</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">Project showcases by mentees</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">Panel discussions on technology trends</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">Networking opportunities for all participants</span>
                                        </li>
                                    </ul>
                                    <a href="/events" className="text-accent hover:underline inline-block text-sm sm:text-base">
                                        Learn about our event plans →
                                    </a>
                                </div>

                                <div className="w-full lg:w-1/2 relative">
                                    <ThemedImage
                                        src="resources/Illustrations/Mentorship.svg"
                                        alt="Envisioned Tech Talk session"
                                        className="w-full h-auto object-contain rounded-lg shadow-lg"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg flex items-end justify-center">
                                        <p className="text-white font-semibold text-xs sm:text-sm p-3 sm:p-4 text-center">
                                            Future Tech Talk sessions will bring our community together quarterly
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FadeContent>

                    {/* Corporate Involvement */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={100}>
                        <section className="mb-8 lg:mb-12">
                            <div className="bg-surface-hover-bg rounded-lg p-4 sm:p-6 lg:p-8">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5">Envisioned Corporate Mentorship</h2>

                                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                                    <div className="w-full lg:w-1/2 relative">
                                        <ThemedImage
                                            src="resources/Illustrations/Mentorship.svg"
                                            alt="Planned corporate mentorship session"
                                            className="w-full h-auto object-contain rounded-lg shadow-lg"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg flex items-end justify-center">
                                            <p className="text-white font-semibold text-xs sm:text-sm p-3 sm:p-4 text-center">
                                                Companies will integrate mentorship into their CSR initiatives
                                            </p>
                                        </div>
                                    </div>

                                    <div className="w-full lg:w-1/2 space-y-4">
                                        <h3 className="text-lg sm:text-xl font-bold">Partner with Us from the Start</h3>
                                        <p className="text-sm sm:text-base leading-relaxed">
                                            Companies can integrate mentorship into their CSR initiatives, providing employees 
                                            with meaningful volunteer opportunities while supporting local tech talent as we establish programs.
                                        </p>
                                        <div className="space-y-3">
                                            <div className="bg-surface rounded-lg p-3 sm:p-4">
                                                <h4 className="font-bold mb-1 text-sm sm:text-base">Group Mentorship</h4>
                                                <p className="text-xs sm:text-sm leading-relaxed">Employees will mentor teams of students on specific projects or technologies</p>
                                            </div>
                                            <div className="bg-surface rounded-lg p-3 sm:p-4">
                                                <h4 className="font-bold mb-1 text-sm sm:text-base">Technical Workshops</h4>
                                                <p className="text-xs sm:text-sm leading-relaxed">Host specialized training sessions led by company experts</p>
                                            </div>
                                            <div className="bg-surface rounded-lg p-3 sm:p-4">
                                                <h4 className="font-bold mb-1 text-sm sm:text-base">Site Visits & Job Shadowing</h4>
                                                <p className="text-xs sm:text-sm leading-relaxed">Provide real-world workplace exposure for advanced students</p>
                                            </div>
                                        </div>
                                        <a
                                            href="/support/corporate-partnerships"
                                            className="bg-accent hover:bg-accent-hover text-black py-2 px-4 sm:px-6 rounded-lg inline-block font-medium text-sm sm:text-base transition-colors"
                                        >
                                            Corporate Partnership Info
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FadeContent>

                    {/* Get Involved Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={200}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12">
                            {/* Become a Mentor */}
                            <section id="become-mentor" className="rounded-lg interactive-card overflow-hidden">
                                <div className="p-4 sm:p-6">
                                    <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center">
                                        <FaChalkboardTeacher className="text-accent mr-2 sm:mr-3 text-xl sm:text-2xl" /> 
                                        Join as Founding Mentor
                                    </h2>

                                    <p className="mb-4 text-sm sm:text-base leading-relaxed">
                                        Express interest in becoming one of our inaugural mentors and help shape Zambia's technology future. 
                                        We welcome mentors from all technology-related fields.
                                    </p>

                                    <form className="space-y-4">
                                        <div>
                                            <label htmlFor="mentor-name" className="block mb-1 text-sm sm:text-base font-medium">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="mentor-name"
                                                required
                                                className="w-full p-2 sm:p-3 rounded-lg border border-surface-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-sm sm:text-base"
                                                placeholder="Enter your full name"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="mentor-email" className="block mb-1 text-sm sm:text-base font-medium">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                id="mentor-email"
                                                required
                                                className="w-full p-2 sm:p-3 rounded-lg border border-surface-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-sm sm:text-base"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="mentor-profession" className="block mb-1 text-sm sm:text-base font-medium">
                                                Profession *
                                            </label>
                                            <input
                                                type="text"
                                                id="mentor-profession"
                                                required
                                                className="w-full p-2 sm:p-3 rounded-lg border border-surface-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-sm sm:text-base"
                                                placeholder="e.g., Software Engineer, Robotics Researcher"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="mentor-expertise" className="block mb-1 text-sm sm:text-base font-medium">
                                                Areas of Expertise *
                                            </label>
                                            <select
                                                id="mentor-expertise"
                                                multiple
                                                required
                                                className="w-full p-2 sm:p-3 rounded-lg border border-surface-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
                                            >
                                                <option value="robotics">Robotics</option>
                                                <option value="programming">Programming</option>
                                                <option value="electronics">Electronics</option>
                                                <option value="ai-ml">AI & Machine Learning</option>
                                                <option value="iot">IoT</option>
                                                <option value="mechanical">Mechanical Engineering</option>
                                                <option value="career">Career Development</option>
                                            </select>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                Hold Ctrl/Cmd to select multiple options
                                            </p>
                                        </div>

                                        <div>
                                            <label htmlFor="mentor-availability" className="block mb-1 text-sm sm:text-base font-medium">
                                                Potential Availability *
                                            </label>
                                            <select
                                                id="mentor-availability"
                                                required
                                                className="w-full p-2 sm:p-3 rounded-lg border border-surface-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-sm sm:text-base"
                                            >
                                                <option value="">Select your availability</option>
                                                <option value="1-2hrs">1-2 hours per month</option>
                                                <option value="3-5hrs">3-5 hours per month</option>
                                                <option value="6-10hrs">6-10 hours per month</option>
                                                <option value="flexible">Flexible/Project-based</option>
                                            </select>
                                        </div>

                                        <button
                                            type="submit"
                                            className="bg-accent hover:bg-accent-hover text-black py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-bold w-full text-sm sm:text-base transition-colors"
                                        >
                                            Express Interest as Mentor
                                        </button>
                                    </form>
                                </div>
                            </section>

                            {/* Seek Mentorship */}
                            <section id="seek-mentorship" className="rounded-lg interactive-card overflow-hidden">
                                <div className="p-4 sm:p-6">
                                    <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center">
                                        <FaGraduationCap className="text-accent mr-2 sm:mr-3 text-xl sm:text-2xl" /> 
                                        Express Mentee Interest
                                    </h2>

                                    <p className="mb-4 text-sm sm:text-base leading-relaxed">
                                        Register your interest in receiving guidance from industry professionals as we establish 
                                        our mentorship program for robotics, programming, and technology innovation.
                                    </p>

                                    <form className="space-y-4">
                                        <div>
                                            <label htmlFor="mentee-name" className="block mb-1 text-sm sm:text-base font-medium">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="mentee-name"
                                                required
                                                className="w-full p-2 sm:p-3 rounded-lg border border-surface-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-sm sm:text-base"
                                                placeholder="Enter your full name"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="mentee-email" className="block mb-1 text-sm sm:text-base font-medium">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                id="mentee-email"
                                                required
                                                className="w-full p-2 sm:p-3 rounded-lg border border-surface-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-sm sm:text-base"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="mentee-age" className="block mb-1 text-sm sm:text-base font-medium">
                                                Age Group *
                                            </label>
                                            <select
                                                id="mentee-age"
                                                required
                                                className="w-full p-2 sm:p-3 rounded-lg border border-surface-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-sm sm:text-base"
                                            >
                                                <option value="">Select age group</option>
                                                <option value="13-15">13-15 years</option>
                                                <option value="16-18">16-18 years</option>
                                                <option value="19-22">19-22 years (University)</option>
                                                <option value="23+">23+ years (Young Professional)</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="mentee-interests" className="block mb-1 text-sm sm:text-base font-medium">
                                                Areas of Interest *
                                            </label>
                                            <select
                                                id="mentee-interests"
                                                multiple
                                                required
                                                className="w-full p-2 sm:p-3 rounded-lg border border-surface-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
                                            >
                                                <option value="robotics">Robotics</option>
                                                <option value="programming">Programming</option>
                                                <option value="electronics">Electronics</option>
                                                <option value="ai-ml">AI & Machine Learning</option>
                                                <option value="iot">IoT</option>
                                                <option value="mechanical">Mechanical Engineering</option>
                                                <option value="career">Career Guidance</option>
                                            </select>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                Hold Ctrl/Cmd to select multiple options
                                            </p>
                                        </div>

                                        <div>
                                            <label htmlFor="mentee-goals" className="block mb-1 text-sm sm:text-base font-medium">
                                                Your Mentorship Goals *
                                            </label>
                                            <textarea
                                                id="mentee-goals"
                                                rows={3}
                                                required
                                                className="w-full p-2 sm:p-3 rounded-lg border border-surface-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-sm sm:text-base"
                                                placeholder="Briefly describe what you hope to achieve through mentorship..."
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className="bg-accent hover:bg-accent-hover text-black py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-bold w-full text-sm sm:text-base transition-colors"
                                        >
                                            Express Interest as Mentee
                                        </button>
                                    </form>
                                </div>
                            </section>
                        </div>
                    </FadeContent>

                    {/* CTA Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={300}>
                        <section className="text-center">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to Shape the Future?</h2>
                            <p className="mb-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                                Whether you're sharing knowledge or seeking guidance, our planned mentorship program will create 
                                meaningful connections that strengthen Zambia's tech ecosystem from the ground up.
                            </p>
                            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                                <a
                                    href="#become-mentor"
                                    className="bg-accent hover:bg-accent-hover text-black py-3 px-4 sm:px-6 rounded-lg font-bold text-sm sm:text-base transition-colors"
                                >
                                    Join as Founding Mentor
                                </a>
                                <a
                                    href="#seek-mentorship"
                                    className="border border-accent text-accent hover:bg-accent hover:text-black py-3 px-4 sm:px-6 rounded-lg font-bold text-sm sm:text-base transition-colors"
                                >
                                    Express Mentee Interest
                                </a>
                                <a
                                    href="/contact"
                                    className="border border-surface-border hover:border-accent py-3 px-4 sm:px-6 rounded-lg font-bold text-sm sm:text-base transition-colors"
                                >
                                    Contact Our Team
                                </a>
                            </div>
                        </section>
                    </FadeContent>
                </div>

                <Footer />
            </section>
        </>
    );
};

export default MentorshipPage;