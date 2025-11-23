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
            description: "Showcase your brand to diverse audiences across Zambia's innovation ecosystem.",
            icon: <FaRegImage className="text-accent text-xl sm:text-2xl" />
        },
        {
            title: "Social Impact",
            description: "Contribute directly to youth development and technological advancement in Africa.",
            icon: <FaUsers className="text-accent text-xl sm:text-2xl" />
        },
        {
            title: "Community Engagement",
            description: "Connect with the next generation of innovators, engineers, and technology leaders.",
            icon: <FaHandshake className="text-accent text-xl sm:text-2xl" />
        },
        {
            title: "Corporate Responsibility",
            description: "Demonstrate your commitment to education, innovation, and sustainable development.",
            icon: <FaBuilding className="text-accent text-xl sm:text-2xl" />
        }
    ];

    // Sponsorship packages data
    const sponsorshipPackages = [
        {
            tier: "Platinum",
            contribution: "K50,000+ / $2,500+",
            benefits: [
                "Premier logo placement on all event materials and website",
                "Speaking opportunity at major events",
                "Co-branded marketing campaigns",
                "VIP access to all Plastal-Bot events",
                "Dedicated social media features",
                "Annual impact report presentation",
                "Employee engagement opportunities",
                "Named scholarship for promising students"
            ],
            highlight: true
        },
        {
            tier: "Gold",
            contribution: "K25,000+ / $1,250+",
            benefits: [
                "Prominent logo placement on selected events and website",
                "Sponsor recognition in event speeches",
                "Regular social media mentions",
                "Access to Plastal-Bot showcases",
                "Quarterly impact updates",
                "Employee volunteer opportunities",
                "Workshop naming rights"
            ],
            highlight: false
        },
        {
            tier: "Silver",
            contribution: "K10,000+ / $500+",
            benefits: [
                "Logo on event materials and website",
                "Social media acknowledgment",
                "Invitation to annual showcase events",
                "Sponsor certificate",
                "Impact highlight report",
                "Employee engagement opportunity"
            ],
            highlight: false
        }
    ];

    // Sponsorship opportunities data
    const sponsorshipTypes = [
        {
            title: "Financial Sponsorship",
            description: "Direct funding support for programs, workshops, and organizational sustainability.",
            icon: <FaChartLine className="text-accent text-xl sm:text-2xl" />,
            example: "Annual program funding or specific event sponsorship"
        },
        {
            title: "Equipment Sponsorship",
            description: "Donation of technology, tools, and materials for robotics education.",
            icon: <FaRobot className="text-accent text-xl sm:text-2xl" />,
            example: "Laptops, 3D printers, electronic components, robotics kits"
        },
        {
            title: "Challenge Sponsorship",
            description: "Fund competitions that inspire innovation and problem-solving skills.",
            icon: <FaTrophy className="text-accent text-xl sm:text-2xl" />,
            example: "Robotics contests, hackathons, or innovation challenges"
        },
        {
            title: "Venue & Logistics",
            description: "Provide spaces, transportation, or infrastructure for events and workshops.",
            icon: <FaBuilding className="text-accent text-xl sm:text-2xl" />,
            example: "Event spaces, internet access, transportation for participants"
        }
    ];

    // Featured sponsors
    const featuredSponsors = [
        {
            name: "TechCorp Zambia",
            contribution: "Platinum sponsor providing annual funding and equipment for our Innovation Hub.",
            image: "resources/Photos/fredmpelembe.jpeg",
            level: "Platinum Sponsor"
        },
        {
            name: "Global Education Initiative",
            contribution: "Gold sponsor supporting our rural outreach program reaching 15 schools annually.",
            image: "resources/Photos/group.png",
            level: "Gold Sponsor"
        }
    ];

    // Impact metrics
    const impactMetrics = [
        {
            metric: "1,200+",
            description: "Students reached through sponsored programs in 2024",
            icon: <FaUsers className="text-accent text-2xl sm:text-3xl" />
        },
        {
            metric: "25",
            description: "Schools equipped with robotics kits through sponsorships",
            icon: <FaGraduationCap className="text-accent text-2xl sm:text-3xl" />
        },
        {
            metric: "8",
            description: "Sponsored competitions driving innovation solutions",
            icon: <FaTrophy className="text-accent text-2xl sm:text-3xl" />
        },
        {
            metric: "6",
            description: "Regions across Zambia reached with your support",
            icon: <FaGlobe className="text-accent text-2xl sm:text-3xl" />
        }
    ];

    return (
        <>
            <SEOConfig
                title="Sponsorship | Plastal-Bot Builders"
                description="Join Plastal-Bot Builders' Sponsorship Program to share your expertise or seek guidance in robotics and STEM innovation."
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
                                    Sponsorship Partnerships
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                                    Align your brand with innovation and make a meaningful impact on Africa's tech future.
                                </p>
                                <div className="bg-surface-hover-bg p-4 sm:p-6 rounded-lg">
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        Sponsorship partnerships sustain our programs, expand our outreach, and create
                                        meaningful visibility for organizations that share our vision for advancing
                                        STEM education in Zambia.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <a
                                        href="#become-sponsor"
                                        className="bg-accent hover:bg-accent-hover text-black py-3 px-4 sm:px-6 rounded-lg font-bold text-center text-sm sm:text-base transition-colors"
                                    >
                                        Become a Sponsor
                                    </a>
                                    <a
                                        href="#sponsorship-packages"
                                        className="border border-accent text-accent hover:bg-accent hover:text-black py-3 px-4 sm:px-6 rounded-lg font-bold text-center text-sm sm:text-base transition-colors"
                                    >
                                        View Packages
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
                                Why Sponsor Plastal-Bot Builders?
                            </h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-xl sm:text-2xl font-bold">Strategic Alignment</h3>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        By partnering with Plastal-Bot Builders, your organization aligns with
                                        educational innovation, youth empowerment, and technological advancement
                                        in one of Africa's emerging innovation ecosystems.
                                    </p>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        Our sponsors don't just provide resources – they become integral parts of a
                                        movement that's building the next generation of engineers, inventors, and
                                        problem-solvers in Zambia and beyond.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {sponsorshipBenefits.map((benefit, index) => (
                                        <div key={index} className="bg-surface-hover-bg rounded-lg p-4 interactive-card">
                                            <div className="flex items-center mb-3">
                                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-surface rounded-full flex items-center justify-center mr-3 flex-shrink-0">
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
                                Sponsorship Packages
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
                                                    Choose {pkg.tier}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-4 sm:p-6 bg-surface-hover-bg rounded-lg text-center">
                                <p className="text-sm sm:text-base mb-3">
                                    Need a custom sponsorship solution? Contact our partnerships team to create a
                                    package tailored to your organization's goals and budget.
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
                                Sponsorship Opportunities
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {sponsorshipTypes.map((type, index) => (
                                    <div key={index} className="rounded-lg interactive-card p-4 sm:p-5 hover:border-accent transition-colors">
                                        <div className="flex items-center mb-4">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 flex-shrink-0">
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

                    {/* Featured Sponsors */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={100}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">
                                Our Valued Sponsors
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                {featuredSponsors.map((sponsor, index) => (
                                    <div key={index} className="rounded-lg interactive-card overflow-hidden">
                                        <div className="h-40 sm:h-48 overflow-hidden">
                                            <img
                                                src={asset(sponsor.image)}
                                                alt={sponsor.name}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
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
                                                href="#sponsor-profile"
                                                className="text-accent hover:underline text-sm sm:text-base"
                                            >
                                                View sponsor profile →
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 text-center">
                                <a href="#all-sponsors" className="text-accent hover:underline text-sm sm:text-base">
                                    View all of our sponsors →
                                </a>
                            </div>
                        </section>
                    </FadeContent>

                    {/* Sponsor Benefits Showcase */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={200}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                                Sponsor Visibility & Benefits
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-surface rounded-lg p-4 sm:p-5 text-center interactive-card">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                                        <FaRegImage className="text-black text-xl sm:text-2xl" />
                                    </div>
                                    <h3 className="font-bold mb-2 text-base sm:text-lg">Brand Presence</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">
                                        Logo placement on event materials, website, t-shirts, and promotional content.
                                    </p>
                                </div>

                                <div className="bg-surface rounded-lg p-4 sm:p-5 text-center interactive-card">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                                        <FaMicrophone className="text-black text-xl sm:text-2xl" />
                                    </div>
                                    <h3 className="font-bold mb-2 text-base sm:text-lg">Speaking Platforms</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">
                                        Opportunities to address audiences at events and showcase your organization's vision.
                                    </p>
                                </div>

                                <div className="bg-surface rounded-lg p-4 sm:p-5 text-center interactive-card">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                                        <FaRegLightbulb className="text-black text-xl sm:text-2xl" />
                                    </div>
                                    <h3 className="font-bold mb-2 text-base sm:text-lg">Content Collaboration</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">
                                        Co-created stories, social media features, and impact reporting highlighting your support.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-xl sm:text-2xl font-bold mb-4">Sponsor Showcase</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-surface rounded-lg overflow-hidden interactive-card">
                                        <img
                                            src={asset('resources/Outsourced_photos/girlchild.jpg')}
                                            alt="Sponsor branding at event"
                                            className="w-full h-40 sm:h-48 object-cover"
                                            loading="lazy"
                                        />
                                        <div className="p-4">
                                            <h4 className="font-bold mb-2 text-sm sm:text-base">Event Branding</h4>
                                            <p className="text-xs sm:text-sm leading-relaxed">
                                                Prominent logo placement during our nationwide robotics competition
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-surface rounded-lg overflow-hidden interactive-card">
                                        <img
                                            src={asset('resources/Outsourced_photos/kidswithvrglasses.jpg')}
                                            alt="Sponsor speaking at event"
                                            className="w-full h-40 sm:h-48 object-cover"
                                            loading="lazy"
                                        />
                                        <div className="p-4">
                                            <h4 className="font-bold mb-2 text-sm sm:text-base">Keynote Opportunity</h4>
                                            <p className="text-xs sm:text-sm leading-relaxed">
                                                Platinum sponsors presenting at our annual technology showcase
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
                                Impact & Accountability
                            </h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-xl sm:text-2xl font-bold">Transparent Impact Reporting</h3>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        We believe in showing our sponsors exactly how their contributions make a difference.
                                        Every sponsorship includes comprehensive reporting that demonstrates the tangible
                                        outcomes of your support.
                                    </p>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        Our impact reporting includes quantitative metrics, qualitative stories,
                                        and visual documentation of programs, allowing sponsors to clearly communicate
                                        their social impact to stakeholders.
                                    </p>
                                    <div className="bg-surface-hover-bg p-4 rounded-lg">
                                        <h4 className="font-bold mb-3 text-sm sm:text-base">Report Components:</h4>
                                        <ul className="space-y-2">
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                <span className="text-xs sm:text-sm">Detailed participation demographics</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                <span className="text-xs sm:text-sm">Skills development assessment</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                <span className="text-xs sm:text-sm">Project outcomes and innovations</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                <span className="text-xs sm:text-sm">Community and educational impact</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                <span className="text-xs sm:text-sm">Photo and video documentation</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xl sm:text-2xl font-bold">Your Support Creates Impact</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {impactMetrics.map((item, index) => (
                                            <div key={index} className="rounded-lg interactive-card p-4 text-center">
                                                <div className="flex justify-center mb-2">
                                                    {item.icon}
                                                </div>
                                                <div className="text-xl sm:text-2xl font-bold text-accent mb-1">{item.metric}</div>
                                                <p className="text-xs sm:text-sm leading-relaxed">{item.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 text-center">
                                        <a
                                            href="#impact-report"
                                            className="text-accent hover:underline text-sm sm:text-base inline-block"
                                        >
                                            Download our latest impact report →
                                        </a>
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
                                    Sponsorship Success Story
                                </h2>

                                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                                    <div className="lg:w-1/2">
                                        <img
                                            src={asset('resources/Photos/IMG_5087.jpg')}
                                            alt="Tech Challenge sponsored event"
                                            className="w-full h-48 sm:h-64 lg:h-auto rounded-lg shadow-lg object-cover"
                                            loading="lazy"
                                        />
                                    </div>

                                    <div className="lg:w-1/2 space-y-4">
                                        <h3 className="text-xl sm:text-2xl font-bold">Technicbots Innovation Program</h3>
                                        <p className="text-sm sm:text-base leading-relaxed">
                                            When telecommunications provider ZamTel sponsored our Rural Innovation
                                            Challenge in 2024, they weren't just providing funding – they were
                                            catalyzing a movement that reached five previously underserved provinces.
                                        </p>

                                        <div className="bg-surface rounded-lg p-4">
                                            <h4 className="font-bold mb-3 text-sm sm:text-base">Outcomes:</h4>
                                            <ul className="space-y-2">
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                    <span className="text-xs sm:text-sm">350 students participated across 15 rural schools</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                    <span className="text-xs sm:text-sm">12 agriculture-focused robotics solutions developed</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                    <span className="text-xs sm:text-sm">National media coverage across 3 TV networks</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                    <span className="text-xs sm:text-sm">Winning team presented at National Innovation Summit</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <blockquote className="italic border-l-4 border-accent pl-4 text-sm sm:text-base leading-relaxed">
                                            "Our sponsorship of Plastal-Bot's Rural Innovation Challenge aligned
                                            perfectly with our mission to connect all of Zambia. The visibility
                                            was tremendous, but the real value was seeing young innovators from
                                            rural areas develop technology solutions for their communities."
                                            <p className="mt-2 font-bold not-italic">— Sarah Mwanza, CSR Director, ZamTel</p>
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FadeContent>

                    {/* Become a Sponsor Form */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={200}>
                        <section id="become-sponsor" className="mb-8 lg:mb-12 rounded-lg interactive-card overflow-hidden">
                            <div className="p-4 sm:p-6 lg:p-8">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                                    Become a Sponsor
                                </h2>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                                    <div className="space-y-4 sm:space-y-6">
                                        <p className="text-sm sm:text-base leading-relaxed">
                                            Partner with Plastal-Bot Builders to support Zambia's next generation of
                                            innovators while gaining meaningful visibility for your organization.
                                        </p>

                                        <div>
                                            <h3 className="font-bold mb-3 text-base sm:text-lg">Why Organizations Choose Us:</h3>
                                            <ul className="space-y-2">
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                    <span className="text-xs sm:text-sm">Authentic connection with youth and education stakeholders</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                    <span className="text-xs sm:text-sm">High-visibility events across multiple regions</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                    <span className="text-xs sm:text-sm">Documented impact with comprehensive reporting</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                    <span className="text-xs sm:text-sm">Alignment with innovation and sustainable development</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                    <span className="text-xs sm:text-sm">Flexibility to design custom sponsorship packages</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="bg-surface-hover-bg p-4 rounded-lg">
                                            <h3 className="font-bold mb-2 text-sm sm:text-base">Sponsorship Contact:</h3>
                                            <p className="text-xs sm:text-sm">Martha Chileshe</p>
                                            <p className="text-xs sm:text-sm">Partnerships Director</p>
                                            <a href="mailto:partnerships@plastalbotbuilders.org" className="text-accent hover:underline text-xs sm:text-sm">
                                                partnerships@plastalbotbuilders.org
                                            </a>
                                            <p className="text-xs sm:text-sm">+260 97 1234567</p>
                                        </div>
                                    </div>

                                    <form className="space-y-4">
                                        <div>
                                            <label htmlFor="organization-name" className="block mb-2 text-sm sm:text-base font-medium">
                                                Organization Name
                                            </label>
                                            <input
                                                type="text"
                                                id="organization-name"
                                                className="w-full p-2 sm:p-3 rounded-lg border border-surface-border bg-surface text-sm sm:text-base"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="contact-name" className="block mb-2 text-sm sm:text-base font-medium">
                                                Contact Person
                                            </label>
                                            <input
                                                type="text"
                                                id="contact-name"
                                                className="w-full p-2 sm:p-3 rounded-lg border border-surface-border bg-surface text-sm sm:text-base"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="position" className="block mb-2 text-sm sm:text-base font-medium">
                                                Position
                                            </label>
                                            <input
                                                type="text"
                                                id="position"
                                                className="w-full p-2 sm:p-3 rounded-lg border border-surface-border bg-surface text-sm sm:text-base"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm sm:text-base font-medium">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="w-full p-2 sm:p-3 rounded-lg border border-surface-border bg-surface text-sm sm:text-base"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="phone" className="block mb-2 text-sm sm:text-base font-medium">
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                className="w-full p-2 sm:p-3 rounded-lg border border-surface-border bg-surface text-sm sm:text-base"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="sponsorship-interest" className="block mb-2 text-sm sm:text-base font-medium">
                                                Sponsorship Interest
                                            </label>
                                            <select
                                                id="sponsorship-interest"
                                                className="w-full p-2 sm:p-3 rounded-lg border border-surface-border bg-surface text-sm sm:text-base"
                                            >
                                                <option value="">Select package of interest</option>
                                                <option value="platinum">Platinum Sponsor (K50,000+)</option>
                                                <option value="gold">Gold Sponsor (K25,000+)</option>
                                                <option value="silver">Silver Sponsor (K10,000+)</option>
                                                <option value="custom">Custom Sponsorship Package</option>
                                                <option value="in-kind">In-Kind Support (Equipment, Services)</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="sponsorship-goals" className="block mb-2 text-sm sm:text-base font-medium">
                                                Sponsorship Goals
                                            </label>
                                            <textarea
                                                id="sponsorship-goals"
                                                rows={3}
                                                className="w-full p-2 sm:p-3 rounded-lg border border-surface-border bg-surface text-sm sm:text-base"
                                                placeholder="What does your organization hope to achieve through this partnership?"
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full sm:w-auto bg-accent hover:bg-accent-hover text-black py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-bold text-sm sm:text-base transition-colors"
                                        >
                                            Submit Inquiry
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </section>
                    </FadeContent>

                    {/* CTA Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={300}>
                        <section className="text-center">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Partner with Purpose</h2>
                            <p className="mb-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                                Your sponsorship creates opportunities for young innovators while showcasing
                                your commitment to technology education and Zambia's future.
                            </p>
                            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                                <a
                                    href="#become-sponsor"
                                    className="bg-accent hover:bg-accent-hover text-black py-3 px-4 sm:px-6 rounded-lg font-bold text-sm sm:text-base transition-colors"
                                >
                                    Become a Sponsor
                                </a>
                                <a
                                    href="#sponsorship-packages"
                                    className="border border-accent text-accent hover:bg-accent hover:text-black py-3 px-4 sm:px-6 rounded-lg font-bold text-sm sm:text-base transition-colors"
                                >
                                    View Sponsorship Options
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

export default SponsorshipPage;