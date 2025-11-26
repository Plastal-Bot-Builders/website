import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import {
    FaArrowLeft, FaHandshake, FaRegLightbulb,
    FaTrophy, FaUsers, FaChartLine, FaRegImage, FaMicrophone,
    FaRobot, FaGraduationCap, FaBuilding, FaGlobe
} from 'react-icons/fa';
import ThemedImage from '../../theme/ThemedImage';
import { asset } from '../../utils/asset';
import { SEOConfig } from '../../components/SEO';
import FadeContent from '../../components/ui/FadeContent';

const SponsorshipPage: React.FC = () => {
    // Sponsorship benefits data
    const sponsorshipBenefits = [
        {
            title: "Brand Visibility",
            description: "Position your brand at the forefront of Zambia's emerging innovation ecosystem from day one.",
            icon: <FaRegImage className="text-accent text-xl sm:text-2xl" />
        },
        {
            title: "Social Impact",
            description: "Be a founding partner in shaping Africa's next generation of tech leaders and innovators.",
            icon: <FaUsers className="text-accent text-xl sm:text-2xl" />
        },
        {
            title: "Community Engagement",
            description: "Connect early with tomorrow's engineers, inventors, and technology pioneers.",
            icon: <FaHandshake className="text-accent text-xl sm:text-2xl" />
        },
        {
            title: "Corporate Responsibility",
            description: "Demonstrate forward-thinking commitment to education, innovation, and sustainable development.",
            icon: <FaBuilding className="text-accent text-xl sm:text-2xl" />
        }
    ];

    // Sponsorship packages data
    const sponsorshipPackages = [
        {
            tier: "Platinum",
            contribution: "K50,000+ / $2,500+",
            benefits: [
                "Premier founding partner logo placement across all future platforms",
                "Speaking opportunities at our inaugural major events",
                "Co-branded marketing campaigns as we launch",
                "VIP access to all Plastal-Bot events as they develop",
                "Dedicated social media features throughout our growth",
                "Annual impact reports showing your investment's outcomes",
                "Employee engagement opportunities in pilot programs",
                "Naming rights for inaugural scholarships"
            ],
            highlight: true
        },
        {
            tier: "Gold",
            contribution: "K25,000+ / $1,250+",
            benefits: [
                "Prominent founding partner logo on our growing platforms",
                "Recognition in event speeches and presentations",
                "Regular social media mentions as we build momentum",
                "Priority access to program showcases",
                "Quarterly progress and impact updates",
                "Employee volunteer opportunities in emerging programs",
                "Workshop naming rights as we expand"
            ],
            highlight: false
        },
        {
            tier: "Silver",
            contribution: "K10,000+ / $500+",
            benefits: [
                "Supporting partner logo on materials and digital platforms",
                "Social media acknowledgment and appreciation",
                "Invitations to annual showcase events",
                "Official sponsor certificate",
                "Impact highlight reports",
                "Employee engagement opportunity"
            ],
            highlight: false
        }
    ];

    // Sponsorship opportunities data
    const sponsorshipTypes = [
        {
            title: "Financial Sponsorship",
            description: "Provide seed funding to launch sustainable programs, workshops, and organizational infrastructure.",
            icon: <FaChartLine className="text-accent text-xl sm:text-2xl" />,
            example: "Help fund our first full-scale annual program or sponsor a specific regional workshop series"
        },
        {
            title: "Equipment Sponsorship",
            description: "Donate foundational technology and tools to establish our robotics education capabilities.",
            icon: <FaRobot className="text-accent text-xl sm:text-2xl" />,
            example: "Laptops, 3D printers, electronic components, robotics kits to equip our first learning labs"
        },
        {
            title: "Challenge Sponsorship",
            description: "Fund inaugural competitions that will establish Plastal-Bot as a leader in innovation challenges.",
            icon: <FaTrophy className="text-accent text-xl sm:text-2xl" />,
            example: "Launch our first annual robotics contest, hackathon, or innovation challenge"
        },
        {
            title: "Venue & Logistics",
            description: "Provide essential spaces and infrastructure as we establish our program footprint.",
            icon: <FaBuilding className="text-accent text-xl sm:text-2xl" />,
            example: "Event spaces, reliable internet access, transportation for pilot program participants"
        }
    ];

    // Featured sponsors (aspirational examples)
    const featuredSponsors = [
        {
            name: "Your Organization Here",
            contribution: "Become a Platinum founding partner and help us establish our Innovation Hub, reaching students across Zambia from the very beginning.",
            image: "resources/Photos/fredmpelembe.jpeg",
            level: "Platinum Opportunity"
        },
        {
            name: "Your Company Here",
            contribution: "Join as a Gold founding partner supporting our rural outreach vision to connect with 15+ schools in our inaugural year.",
            image: "resources/Photos/group.png",
            level: "Gold Opportunity"
        }
    ];

    // Impact metrics (projected goals)
    const impactMetrics = [
        {
            metric: "1,200+",
            description: "Students we aim to reach in our first full year with sponsor support",
            icon: <FaUsers className="text-accent text-2xl sm:text-3xl" />
        },
        {
            metric: "25",
            description: "Schools we plan to equip with robotics kits through partnerships",
            icon: <FaGraduationCap className="text-accent text-2xl sm:text-3xl" />
        },
        {
            metric: "8",
            description: "Competitions we envision launching with sponsor backing",
            icon: <FaTrophy className="text-accent text-2xl sm:text-3xl" />
        },
        {
            metric: "6",
            description: "Regions across Zambia we plan to expand into with your help",
            icon: <FaGlobe className="text-accent text-2xl sm:text-3xl" />
        }
    ];

    return (
        <>
            <SEOConfig
                title="Sponsorship | Plastal-Bot Builders"
                description="Join Plastal-Bot Builders as a founding sponsor and help shape the future of STEM education in Zambia."
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
                                    <FaHandshake className="inline-block mr-2 sm:mr-3 text-2xl sm:text-3xl md:text-4xl" />
                                    Founding Sponsorship Opportunities
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                                    Be among the first to invest in Africa's tech future. Your early support will establish the foundation for transformative STEM education across Zambia.
                                </p>
                                <div className="bg-surface-hover-bg p-4 sm:p-6 rounded-lg">
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        <strong>Join us from the beginning.</strong> As we build sustainable programs and expand our reach, 
                                        founding sponsors will gain unparalleled visibility and the satisfaction of knowing they made 
                                        innovation education possible for thousands of young Zambians.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <a
                                        href="#become-sponsor"
                                        className="bg-accent hover:bg-accent-hover text-black py-3 px-4 sm:px-6 rounded-lg font-bold text-center text-sm sm:text-base transition-colors"
                                    >
                                        Become a Founding Sponsor
                                    </a>
                                    <a
                                        href="#sponsorship-packages"
                                        className="border border-accent text-accent hover:bg-accent hover:text-black py-3 px-4 sm:px-6 rounded-lg font-bold text-center text-sm sm:text-base transition-colors"
                                    >
                                        View Investment Packages
                                    </a>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <ThemedImage
                                    alt="Sponsorship Illustration"
                                    src="resources/Illustrations/Sponsorship.svg"
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </div>
                    </FadeContent>

                    {/* Why Sponsor Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={100}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">
                                Why Become a Founding Sponsor?
                            </h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-xl sm:text-2xl font-bold">Strategic Growth Partnership</h3>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        By partnering with Plastal-Bot Builders at this foundational stage, your organization 
                                        positions itself alongside educational innovation, youth empowerment, and technological 
                                        advancement as we build one of Zambia's most impactful STEM initiatives.
                                    </p>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        <strong>Founding sponsors aren't just providing resources – you're co-creating</strong> a movement 
                                        that will cultivate the next generation of engineers, inventors, and problem-solvers. 
                                        Your early investment will be recognized throughout our growth journey.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {sponsorshipBenefits.map((benefit, index) => (
                                        <div key={index} className="bg-surface-hover-bg rounded-lg p-4 interactive-card">
                                            <div className="flex items-center mb-3">
                                                <div className="w-12 h-12 sm:w-10 sm:h-10 bg-surface rounded-full flex items-center justify-center mr-3 flex-shrink-0 border-2 border-accent">
                                                    {benefit.icon}
                                                </div>
                                                <h4 className="font-bold text-sm sm:text-base">{benefit.title}</h4>
                                            </div>
                                            <p className="text-xs sm:text-sm leading-relaxed">{benefit.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </FadeContent>

                    {/* Sponsorship Packages */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={200}>
                        <section id="sponsorship-packages" className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">
                                Founding Sponsor Investment Tiers
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sponsorshipPackages.map((pkg, index) => (
                                    <div
                                        key={index}
                                        className={`border ${pkg.highlight ? 'border-accent' : 'border-surface-border'} rounded-lg interactive-card overflow-hidden flex flex-col h-full`}
                                    >
                                        <div className={`p-4 text-center ${pkg.highlight ? 'bg-accent text-black' : 'bg-surface-hover-bg'}`}>
                                            <h3 className="text-lg sm:text-xl font-bold">{pkg.tier}</h3>
                                            <p className="font-medium text-sm sm:text-base">{pkg.contribution}</p>
                                        </div>

                                        <div className="p-4 sm:p-5 flex flex-col flex-grow">
                                            <ul className="space-y-2 mb-auto">
                                                {pkg.benefits.map((benefit, benefitIndex) => (
                                                    <li key={benefitIndex} className="flex items-start">
                                                        <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                        <span className="text-xs sm:text-sm leading-relaxed">{benefit}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="pt-4 sm:pt-6 mt-auto">
                                                <a
                                                    href="#become-sponsor"
                                                    className={`block text-center py-2 px-4 rounded-lg text-sm sm:text-base font-medium transition-colors ${pkg.highlight
                                                        ? 'bg-accent hover:bg-accent-hover text-black'
                                                        : 'border border-accent text-accent hover:bg-accent hover:text-black'
                                                        }`}
                                                >
                                                    Invest as {pkg.tier} Partner
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-4 sm:p-6 bg-surface-hover-bg rounded-lg text-center">
                                <p className="text-sm sm:text-base mb-3">
                                    <strong>Want to create a custom founding partnership?</strong> Let's design an investment 
                                    package tailored to your organization's vision and our shared growth objectives.
                                </p>
                                <a
                                    href="mailto:partnerships@plastalbotbuilders.org"
                                    className="text-accent hover:underline font-medium text-sm sm:text-base inline-block"
                                >
                                    partnerships@plastalbotbuilders.org
                                </a>
                            </div>
                        </section>
                    </FadeContent>

                    {/* Types of Sponsorships */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={300}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">
                                Investment Opportunities to Launch Our Vision
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {sponsorshipTypes.map((type, index) => (
                                    <div key={index} className="rounded-lg interactive-card p-4 sm:p-5 hover:border-accent transition-colors">
                                        <div className="flex items-center mb-4">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 flex-shrink-0 border-2 border-accent">
                                                {type.icon}
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold">{type.title}</h3>
                                        </div>

                                        <p className="mb-3 text-sm sm:text-base leading-relaxed">{type.description}</p>

                                        <div className="bg-surface-hover-bg rounded-lg p-3">
                                            <p className="text-xs sm:text-sm leading-relaxed">
                                                <strong>Example Impact:</strong> {type.example}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </FadeContent>

                    {/* Featured Sponsors */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={100}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">
                                Become a Founding Partner
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                {featuredSponsors.map((sponsor, index) => (
                                    <div key={index} className="rounded-lg interactive-card overflow-hidden">
                                        <div className="h-40 sm:h-48 overflow-hidden relative">
                                            <img
                                                src={asset(sponsor.image)}
                                                alt={sponsor.name}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                                                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                                                    <p className="text-white font-semibold text-xs sm:text-sm">
                                                        Your brand could be featured here as a founding partner
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 sm:p-5">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                                                <h3 className="text-lg sm:text-xl font-bold">{sponsor.name}</h3>
                                                <span className="bg-accent text-black text-xs sm:text-sm py-1 px-2 rounded self-start">
                                                    {sponsor.level}
                                                </span>
                                            </div>
                                            <p className="mb-4 text-sm sm:text-base leading-relaxed">{sponsor.contribution}</p>

                                            <a
                                                href="#become-sponsor"
                                                className="text-accent hover:underline text-sm sm:text-base"
                                            >
                                                Claim this opportunity →
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 text-center">
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                                    <em>These partnerships are awaiting visionary organizations ready to invest in Zambia's future</em>
                                </p>
                            </div>
                        </section>
                    </FadeContent>

                    {/* Sponsor Benefits Showcase */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={200}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                                Founding Sponsor Visibility & Recognition
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-surface rounded-lg p-4 sm:p-5 text-center interactive-card">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full flex items-center justify-center border-2 border-accent">
                                        <FaRegImage className="text-accent text-xl sm:text-2xl" />
                                    </div>
                                    <h3 className="font-bold mb-2 text-base sm:text-lg">Pioneering Brand Presence</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">
                                        Logo featured across all future event materials, digital platforms, promotional content, and merchandise as we launch.
                                    </p>
                                </div>

                                <div className="bg-surface rounded-lg p-4 sm:p-5 text-center interactive-card">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full flex items-center justify-center border-2 border-accent">
                                        <FaMicrophone className="text-accent text-xl sm:text-2xl" />
                                    </div>
                                    <h3 className="font-bold mb-2 text-base sm:text-lg">Keynote Opportunities</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">
                                        Platform to address audiences at our inaugural events and share your organization's vision for Zambia's tech future.
                                    </p>
                                </div>

                                <div className="bg-surface rounded-lg p-4 sm:p-5 text-center interactive-card">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full flex items-center justify-center border-2 border-accent">
                                        <FaRegLightbulb className="text-accent text-xl sm:text-2xl" />
                                    </div>
                                    <h3 className="font-bold mb-2 text-base sm:text-lg">Story Co-Creation</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">
                                        Collaborative storytelling, social media campaigns, and impact documentation celebrating your foundational support.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-xl sm:text-2xl font-bold mb-4">Envisioned Sponsor Showcase</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-surface rounded-lg overflow-hidden interactive-card">
                                        <div className="relative">
                                            <img
                                                src={asset('resources/Outsourced_photos/girlchild.jpg')}
                                                alt="Future event branding"
                                                className="w-full h-40 sm:h-48 object-cover"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                                                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                                                    <p className="text-white font-semibold text-xs sm:text-sm">
                                                        Founding sponsors will have prominent branding at our first major competition
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h4 className="font-bold mb-2 text-sm sm:text-base">Launch Event Branding</h4>
                                            <p className="text-xs sm:text-sm leading-relaxed">
                                                Your logo featured prominently at our inaugural nationwide robotics competition
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-surface rounded-lg overflow-hidden interactive-card">
                                        <div className="relative">
                                            <img
                                                src={asset('resources/Outsourced_photos/kidswithvrglasses.jpg')}
                                                alt="Future speaking opportunity"
                                                className="w-full h-40 sm:h-48 object-cover"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                                                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                                                    <p className="text-white font-semibold text-xs sm:text-sm">
                                                        Platinum partners will deliver keynotes at our annual showcase
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h4 className="font-bold mb-2 text-sm sm:text-base">Keynote Platform</h4>
                                            <p className="text-xs sm:text-sm leading-relaxed">
                                                Founding Platinum sponsors presenting at our inaugural technology showcase event
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FadeContent>

                    {/* Impact Reporting */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={300}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">
                                Transparent Growth & Impact Tracking
                            </h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-xl sm:text-2xl font-bold">Building Accountability from Day One</h3>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        <strong>We're committed to showing you exactly how your investment builds our organization.</strong> Every 
                                        founding sponsorship will include comprehensive progress reporting that demonstrates the tangible 
                                        outcomes of your early support as we grow.
                                    </p>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        Our impact reporting framework is designed to give sponsors clear visibility into how we're 
                                        developing programs, reaching students, and achieving our mission milestones—allowing you to 
                                        communicate your social investment to stakeholders with confidence.
                                    </p>
                                    <div className="bg-surface-hover-bg p-4 rounded-lg">
                                        <h4 className="font-bold mb-3 text-sm sm:text-base">Our Reporting Will Include:</h4>
                                        <ul className="space-y-2">
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                <span className="text-xs sm:text-sm">Quarterly progress updates on program development</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                <span className="text-xs sm:text-sm">Detailed participation demographics as we launch</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                <span className="text-xs sm:text-sm">Skills development assessment frameworks</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                <span className="text-xs sm:text-sm">Early project outcomes and student innovations</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                <span className="text-xs sm:text-sm">Photo and video documentation of all initiatives</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xl sm:text-2xl font-bold">Your Investment Will Help Us Achieve</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {impactMetrics.map((item, index) => (
                                            <div key={index} className="rounded-lg interactive-card p-4 text-center">
                                                <div className="flex justify-center mb-2 border-2 border-accent w-12 h-12 sm:w-16 sm:h-16 rounded-full items-center mx-auto">
                                                    {item.icon}
                                                </div>
                                                <div className="text-xl sm:text-2xl font-bold text-accent mb-1">{item.metric}</div>
                                                <p className="text-xs sm:text-sm leading-relaxed">{item.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 bg-surface-hover-bg p-4 rounded-lg text-center">
                                        <p className="text-sm font-semibold mb-2">These Are Our Ambitious First-Year Goals</p>
                                        <p className="text-xs sm:text-sm leading-relaxed">
                                            With founding sponsor support, we'll track and report progress toward these objectives quarterly, 
                                            demonstrating the direct impact of your investment.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FadeContent>

                    {/* Sponsorship Success Story */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={100}>
                        <section className="mb-8 lg:mb-12">
                            <div className="bg-surface-hover-bg rounded-lg overflow-hidden p-4 sm:p-6 lg:p-8">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                                    Envisioned Sponsorship Success Story
                                </h2>

                                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                                    <div className="lg:w-1/2 relative">
                                        <img
                                            src={asset('resources/Photos/IMG_5087.jpg')}
                                            alt="Future sponsored event"
                                            className="w-full h-48 sm:h-64 lg:h-auto rounded-lg shadow-lg object-cover"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg">
                                            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                                                <p className="text-white font-semibold text-xs sm:text-sm">
                                                    Imagine your organization launching our first Rural Innovation Challenge
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:w-1/2 space-y-4">
                                        <h3 className="text-xl sm:text-2xl font-bold">The Future We're Building Together</h3>
                                        <p className="text-sm sm:text-base leading-relaxed">
                                            <strong>Picture this:</strong> A leading Zambian organization becomes our inaugural Platinum sponsor, 
                                            helping us launch our first Rural Innovation Challenge. Their support doesn't just provide funding—it 
                                            catalyzes a movement that reaches five underserved provinces in our very first year.
                                        </p>

                                        <div className="bg-surface rounded-lg p-4">
                                            <h4 className="font-bold mb-3 text-sm sm:text-base">Projected First-Year Outcomes:</h4>
                                            <ul className="space-y-2">
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                    <span className="text-xs sm:text-sm">350+ students participating across 15 rural schools</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                    <span className="text-xs sm:text-sm">12+ agriculture-focused robotics solutions in development</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                    <span className="text-xs sm:text-sm">Anticipated national media coverage across multiple platforms</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                    <span className="text-xs sm:text-sm">Winning teams presenting at National Innovation Summit</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <blockquote className="italic border-l-4 border-accent pl-4 text-sm sm:text-base leading-relaxed">
                                            "Imagine being the organization that makes this vision a reality. As a founding sponsor, 
                                            your brand won't just be associated with innovation—you'll be recognized as the catalyst 
                                            that made transformative STEM education accessible across rural Zambia."
                                            <p className="mt-2 font-bold not-italic">— The Opportunity Awaiting Your Organization</p>
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FadeContent>

                    {/* CTA Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={300}>
                        <section className="text-center">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Invest in Tomorrow's Innovators Today</h2>
                            <p className="mb-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                                Your founding sponsorship will establish the foundation for transformative STEM education 
                                while positioning your organization at the forefront of Zambia's innovation future.
                            </p>
                            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                                <a
                                    href="#become-sponsor"
                                    className="bg-accent hover:bg-accent-hover text-black py-3 px-4 sm:px-6 rounded-lg font-bold text-sm sm:text-base transition-colors"
                                >
                                    Become a Founding Sponsor
                                </a>
                                <a
                                    href="#sponsorship-packages"
                                    className="border border-accent text-accent hover:bg-accent hover:text-black py-3 px-4 sm:px-6 rounded-lg font-bold text-sm sm:text-base transition-colors"
                                >
                                    Explore Investment Tiers
                                </a>
                                <a
                                    href="/contact"
                                    className="border border-surface-border hover:border-accent py-3 px:px-4 sm:px-6 rounded-lg font-bold text-sm sm:text-base transition-colors"
                                >
                                    Schedule a Conversation
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

export default SponsorshipPage;