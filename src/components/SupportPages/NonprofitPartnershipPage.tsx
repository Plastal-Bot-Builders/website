import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import {
    FaArrowLeft, FaHandsHelping, FaUsers, FaLightbulb,
    FaGraduationCap, FaLeaf, FaHandshake,
    FaRobot, FaChalkboardTeacher, FaSeedling, FaExchangeAlt
} from 'react-icons/fa';
import ThemedImage from '../../theme/ThemedImage';
import { asset } from '../../utils/asset';
import { SEOConfig } from '../../components/SEO';
import FadeContent from '../../components/ui/FadeContent';

const NonprofitPartnershipPage: React.FC = () => {
    // Partnership types data
    const partnershipTypes = [
        {
            title: "Community Programs",
            description: "Co-organize workshops and events to reach underserved communities lacking STEM resources.",
            icon: <FaUsers className="text-accent text-xl sm:text-2xl" />,
            example: "Joint tech workshops in rural schools"
        },
        {
            title: "Resource Exchange",
            description: "Share expertise, materials, and networks to strengthen both organizations' impacts.",
            icon: <FaExchangeAlt className="text-accent text-xl sm:text-2xl" />,
            example: "Robotics kits + outreach networks"
        },
        {
            title: "Grant Collaboration",
            description: "Jointly apply for funding opportunities supporting youth innovation and digital literacy.",
            icon: <FaHandshake className="text-accent text-xl sm:text-2xl" />,
            example: "Combined proposal for UNICEF funding"
        },
        {
            title: "Impact Campaigns",
            description: "Launch collaborative initiatives that highlight collective efforts and attract supporters.",
            icon: <FaLightbulb className="text-accent text-xl sm:text-2xl" />,
            example: "\"Tech for Change\" awareness campaign"
        },
        {
            title: "Sustainable Innovation",
            description: "Partner with environmental nonprofits to align robotics with sustainability goals.",
            icon: <FaLeaf className="text-accent text-xl sm:text-2xl" />,
            example: "Recycling robots educational program"
        }
    ];

    // Featured partnerships
    const featuredPartnerships = [
        {
            name: "Zambia STEM Foundation",
            description: "Collaborative workshop series reaching 12 schools across three provinces, introducing over 500 students to robotics basics.",
            image: "resources/Photos/sepoteaching.jpeg",
            focus: "Education Access"
        },
        {
            name: "TechAfrica Innovation Hub",
            description: "Joint mentorship program connecting young innovators with tech professionals and providing access to shared makerspace resources.",
            image: "resources/Photos/unnclerextalk.jpg",
            focus: "Youth Innovation"
        }
    ];

    // SDGs we align with
    const sdgs = [
        {
            number: 4,
            title: "Quality Education",
            description: "Ensuring inclusive and equitable quality education for all",
            image: "resources/SDGs/SDG_4.png",
            icon: <FaGraduationCap className="text-accent text-xl sm:text-2xl" />
        },
        {
            number: 9,
            title: "Industry, Innovation & Infrastructure",
            description: "Building resilient infrastructure and fostering innovation",
            image: "resources/SDGs/SDG_7.png",
            icon: <FaRobot className="text-accent text-xl sm:text-2xl" />
        },
        {
            number: 11,
            title: "Sustainable Communities",
            description: "Making cities inclusive, safe, resilient and sustainable",
            image: "resources/SDGs/SDG_9.png",
            icon: <FaUsers className="text-accent text-xl sm:text-2xl" />
        },
        {
            number: 17,
            title: "Partnerships for the Goals",
            description: "Strengthening global partnerships for sustainable development",
            image: "resources/SDGs/SDG_13.png",
            icon: <FaHandshake className="text-accent text-xl sm:text-2xl" />
        }
    ];

    return (
        <>
            <SEOConfig
                title="Nonprofit Partnerships | Plastal-Bot Builders"
                description="Join Plastal-Bot Builders' Nonprofit Partnerships to share your expertise or seek guidance in robotics and STEM innovation."
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
                                    <FaHandsHelping className="inline-block mr-2 sm:mr-3 text-2xl sm:text-3xl md:text-4xl"/>
                                    Nonprofit Partnerships
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                                    Together, we can expand our reach and create lasting impact in STEM education.
                                </p>
                                <div className="bg-surface-hover-bg p-4 sm:p-6 rounded-lg">
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        Plastal-Bot Builders collaborates with mission-aligned organizations to
                                        pool resources, share expertise, and strengthen community-based impact.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <a
                                        href="#become-partner"
                                        className="bg-accent hover:bg-accent-hover text-black py-3 px-4 sm:px-6 rounded-lg font-bold text-center text-sm sm:text-base transition-colors"
                                    >
                                        Become a Partner
                                    </a>
                                    <a
                                        href="#current-partners"
                                        className="border border-accent text-accent hover:bg-accent hover:text-black py-3 px-4 sm:px-6 rounded-lg font-bold text-center text-sm sm:text-base transition-colors"
                                    >
                                        View Our Partners
                                    </a>
                                </div>
                            </div>

                            <div className="w-full md:w-1/2">
                                <ThemedImage
                                    src="resources/Illustrations/Nonprofit.svg"
                                    className="w-full h-auto object-contain"
                                    alt="Organizations working together on technology education"
                                />
                            </div>
                        </div>
                    </FadeContent>

                    {/* Partnership Value Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={100}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">The Power of Partnership</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-lg sm:text-xl font-bold">Why Partner With Us?</h3>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        By forming strategic alliances with organizations that share similar goals,
                                        we can multiply our collective impact and reach communities that would benefit
                                        most from STEM education and innovation opportunities.
                                    </p>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        Our partnerships focus on creating sustainable, community-driven initiatives
                                        that address local needs while building technical skills and innovation capacity.
                                    </p>
                                </div>

                                <div className="bg-surface-hover-bg rounded-lg p-4 sm:p-5">
                                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Partnership Focus Areas</h3>
                                    <ul className="space-y-2 sm:space-y-3">
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-sm sm:text-base"><strong>STEM Education</strong> - Making technology learning accessible to all</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-sm sm:text-base"><strong>Youth Empowerment</strong> - Building skills and confidence in young innovators</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-sm sm:text-base"><strong>Environmental Sustainability</strong> - Using technology for climate solutions</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-sm sm:text-base"><strong>Community Innovation</strong> - Solving local challenges through technology</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </FadeContent>

                    {/* Partnership Types */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={200}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">Collaboration Opportunities</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {partnershipTypes.map((type, index) => (
                                    <div key={index} className="interactive-card rounded-lg p-4 sm:p-5 hover:border-accent transition-colors">
                                        <div className="flex items-center mb-3 sm:mb-4">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 flex-shrink-0 border-2 border-accent p-2">
                                                {type.icon}
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold">{type.title}</h3>
                                        </div>

                                        <p className="mb-3 text-sm sm:text-base leading-relaxed">{type.description}</p>

                                        <div className="bg-surface-hover-bg rounded-lg p-3">
                                            <p className="text-xs sm:text-sm leading-relaxed">
                                                <strong>Example:</strong> {type.example}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </FadeContent>

                    {/* Partner Benefits */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={300}>
                        <section className="mb-8 lg:mb-12 bg-surface-hover-bg rounded-lg p-4 sm:p-6 lg:p-8">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5">Benefits for Partners</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                <div className="bg-surface rounded-lg p-4 sm:p-5">
                                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">What Plastal-Bot Brings</h3>
                                    <ul className="space-y-3 sm:space-y-4">
                                        <li className="flex items-start">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 flex-shrink-0 border-2 border-accent p-2">
                                                <FaRobot className="text-accent text-lg sm:text-xl" />
                                            </div>
                                            <div>
                                                <strong className="text-sm sm:text-base">Technical Expertise</strong>
                                                <p className="text-xs sm:text-sm mt-1">Robotics curriculum, hardware resources, and trained facilitators</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 flex-shrink-0 border-2 border-accent p-2">
                                                <FaChalkboardTeacher className="text-accent text-lg sm:text-xl" />
                                            </div>
                                            <div>
                                                <strong className="text-sm sm:text-base">Training Capacity</strong>
                                                <p className="text-xs sm:text-sm mt-1">Proven workshop models and educational content for various age groups</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 flex-shrink-0 border-2 border-accent p-2">
                                                <FaSeedling className="text-accent text-lg sm:text-xl" />
                                            </div>
                                            <div>
                                                <strong className="text-sm sm:text-base">Innovation Framework</strong>
                                                <p className="text-xs sm:text-sm mt-1">Methods for nurturing creativity and problem-solving abilities</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-surface rounded-lg p-4 sm:p-5">
                                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">How Partners Benefit</h3>
                                    <ul className="space-y-3 sm:space-y-4">
                                        <li className="flex items-start">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 flex-shrink-0 border-2 border-accent p-2">
                                                <FaUsers className="text-accent text-lg sm:text-xl" />
                                            </div>
                                            <div>
                                                <strong className="text-sm sm:text-base">Extended Reach</strong>
                                                <p className="text-xs sm:text-sm mt-1">Access new communities and demographics through collaborative programs</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 flex-shrink-0 border-2 border-accent p-2">
                                                <FaHandshake className="text-accent text-lg sm:text-xl" />
                                            </div>
                                            <div>
                                                <strong className="text-sm sm:text-base">Resource Sharing</strong>
                                                <p className="text-xs sm:text-sm mt-1">Leverage combined assets, networks, and expertise for greater impact</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 flex-shrink-0 border-2 border-accent p-2">
                                                <FaLightbulb className="text-accent text-lg sm:text-xl" />
                                            </div>
                                            <div>
                                                <strong className="text-sm sm:text-base">Enhanced Programming</strong>
                                                <p className="text-xs sm:text-sm mt-1">Integrate technology components into existing community initiatives</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </FadeContent>

                    {/* Featured Partnerships */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={100}>
                        <section id="current-partners" className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">Featured Partnerships</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                {featuredPartnerships.map((partnership, index) => (
                                    <div key={index} className="interactive-card rounded-lg overflow-hidden">
                                        <div className="h-40 sm:h-48 overflow-hidden">
                                            <img
                                                src={asset(partnership.image)}
                                                alt={partnership.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-4 sm:p-5">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                                                <h3 className="text-lg sm:text-xl font-bold">{partnership.name}</h3>
                                                <span className="bg-accent text-black text-xs sm:text-sm py-1 px-2 rounded self-start">{partnership.focus}</span>
                                            </div>
                                            <p className="mb-4 text-sm sm:text-base leading-relaxed">{partnership.description}</p>

                                            <a
                                                href="#case-study"
                                                className="text-accent hover:underline text-sm sm:text-base inline-block"
                                            >
                                                View full case study →
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 sm:mt-6 text-center">
                                <a href="#all-partners" className="text-accent hover:underline text-sm sm:text-base">
                                    View all of our nonprofit partners →
                                </a>
                            </div>
                        </section>
                    </FadeContent>

                    {/* SDG Alignment */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={200}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">Aligned with Global Goals</h2>

                            <p className="mb-6 text-sm sm:text-base leading-relaxed">
                                Our partnerships contribute to broader sustainable development goals, ensuring that
                                our collective work supports global priorities for a better world.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                {sdgs.map((sdg, index) => (
                                    <div key={index} className="bg-surface-hover-bg rounded-lg p-4 text-center interactive-card">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3">
                                            <img
                                                src={asset(sdg.image)}
                                                alt={sdg.title}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <h3 className="font-bold mb-2 text-sm sm:text-base">{sdg.title}</h3>
                                        <p className="text-xs sm:text-sm leading-relaxed">{sdg.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </FadeContent>

                    {/* Impact Story */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={300}>
                        <section className="mb-8 lg:mb-12">
                            <div className="bg-surface-hover-bg rounded-lg overflow-hidden p-4 sm:p-6 lg:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Partnership Impact Story</h2>

                                <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
                                    <div className="w-full md:w-1/2">
                                        <ThemedImage
                                            src="resources/Illustrations/Nonprofit.svg"
                                            className="w-full h-auto object-contain rounded-lg"
                                            alt="Partnership project in action"
                                        />
                                    </div>

                                    <div className="w-full md:w-1/2 space-y-4">
                                        <h3 className="text-lg sm:text-xl font-bold">Robotics for Environmental Monitoring</h3>
                                        <p className="text-sm sm:text-base leading-relaxed">
                                            In partnership with EcoTech Zambia, we developed a program teaching
                                            students to build simple water quality monitoring robots. The initiative
                                            combined environmental education with practical technology skills.
                                        </p>

                                        <div className="bg-surface rounded-lg p-4">
                                            <h4 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base">Results:</h4>
                                            <ul className="space-y-1 sm:space-y-2">
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                    <span className="text-xs sm:text-sm">120 students trained across 6 communities</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                    <span className="text-xs sm:text-sm">15 functional water monitoring devices built and deployed</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                    <span className="text-xs sm:text-sm">Data collected now used by local environmental agencies</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                    <span className="text-xs sm:text-sm">Project featured in national environmental conference</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <a href="#case-studies" className="text-accent hover:underline text-sm sm:text-base inline-block">
                                            Read more partnership stories →
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FadeContent>

                    {/* Partnership Process */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={100}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">Partnership Process</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                <div className="text-center interactive-card rounded-lg p-4 sm:p-5">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span className="text-black font-bold text-lg sm:text-xl">1</span>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Connect</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">
                                        Initial discussion to explore mutual goals, values, and potential collaboration areas.
                                    </p>
                                </div>

                                <div className="text-center interactive-card rounded-lg p-4 sm:p-5">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span className="text-black font-bold text-lg sm:text-xl">2</span>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Design</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">
                                        Collaboratively develop a partnership plan with clear objectives and contributions.
                                    </p>
                                </div>

                                <div className="text-center interactive-card rounded-lg p-4 sm:p-5">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span className="text-black font-bold text-lg sm:text-xl">3</span>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Implement</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">
                                        Execute joint initiatives with regular communication and coordinated efforts.
                                    </p>
                                </div>

                                <div className="text-center interactive-card rounded-lg p-4 sm:p-5">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span className="text-black font-bold text-lg sm:text-xl">4</span>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Evaluate & Grow</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">
                                        Assess outcomes, document learnings, and explore opportunities for expansion.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </FadeContent>

                    {/* CTA Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={200}>
                        <section className="text-center">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Together We Can Do More</h2>
                            <p className="mb-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                                By working hand in hand with organizations that share our passion for empowerment and innovation,
                                we can build a stronger ecosystem that drives inclusive and sustainable progress.
                            </p>
                            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                                <a
                                    href="#become-partner"
                                    className="bg-accent hover:bg-accent-hover text-black py-3 px-4 sm:px-6 rounded-lg font-bold text-sm sm:text-base transition-colors"
                                >
                                    Start a Partnership
                                </a>
                                <a
                                    href="#current-partners"
                                    className="border border-accent text-accent hover:bg-accent hover:text-black py-3 px-4 sm:px-6 rounded-lg font-bold text-sm sm:text-base transition-colors"
                                >
                                    See Our Impact
                                </a>
                                <a
                                    href="/contact"
                                    className="border border-surface-border hover:border-accent py-3 px-4 sm:px-6 rounded-lg font-bold text-sm sm:text-base transition-colors"
                                >
                                    Contact Us
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

export default NonprofitPartnershipPage;