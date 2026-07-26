import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import ThemedImage from '../../theme/ThemedImage';
import { SEOConfig } from '../../components/SEO';
import { 
  BuildingOfficeIcon, 
  ArrowLeftIcon,
  HandRaisedIcon, 
  GiftIcon, 
  UserGroupIcon, 
  TagIcon,
  AcademicCapIcon,  
  DocumentArrowDownIcon, 
  CalendarIcon 
} from '@heroicons/react/24/solid';
import FadeContent from '../../components/ui/FadeContent';

const CorporatePartnershipsPage: React.FC = () => {
    const partnershipTiers = [
        {
            name: "Bronze Partner",
            contribution: "K5,000 - K15,000",
            benefits: [
                "Logo on workshop materials",
                "Social media appreciation",
                "Annual impact report",
                "Invitation to showcase events"
            ]
        },
        {
            name: "Silver Partner",
            contribution: "K20,000 - K40,000",
            benefits: [
                "All Bronze benefits",
                "Logo on event banner",
                "Mention in press releases",
                "Quarterly impact reports",
                "Employee volunteering opportunities"
            ]
        },
        {
            name: "Gold Partner",
            contribution: "K50,000 - K80,000",
            benefits: [
                "All Silver benefits",
                "Co-branded outreach program",
                "Featured website profile",
                "Media inclusion in program coverage",
                "Recognition at all major events",
                "Seat on advisory board"
            ]
        },
        {
            name: "Platinum Partner",
            contribution: "K100,000+",
            benefits: [
                "All Gold benefits",
                "Naming rights on an annual program",
                "Dedicated partnership manager",
                "Custom program development",
                "First right of renewal",
                "VIP access to all Plastal-Bot events"
            ]
        }
    ];

    const partnershipOpportunities = [
        {
            title: "Annual Robotics & AI Workshop Series",
            description: "Support workshops across different regions of Zambia, reaching students with hands-on technology experience.",
            icon: <CalendarIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-accent" />
        },
        {
            title: "Plastal-Bot Innovation Grant",
            description: "Fund mini-grants for exceptional student projects, helping young innovators bring their ideas to life.",
            icon: <GiftIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-accent" />
        },
        {
            title: "STEM Outreach Truck",
            description: "Co-brand our mobile robotics lab that brings technology education to remote communities.",
            icon: <AcademicCapIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-accent" />
        },
        {
            title: "National Robotics Challenge",
            description: "Title sponsorship for Zambia's premier student robotics competition with nationwide participation.",
            icon: <TagIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-accent" />
        }
    ];

    return (
        <>
            <SEOConfig
                title="Corporate Partnerships | Plastal-Bot Builders"
                description="Join Plastal-Bot Builders in shaping Zambia's next generation of innovators through impactful corporate partnerships."
            />
            <section className="scroll-smooth focus:scroll-auto">
                <Header />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                    <Link to="/support" className="inline-flex items-center text-accent hover:text-accent-hover mb-6 text-sm sm:text-base">
                        <ArrowLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Back to Support
                    </Link>
                    
                    {/* Hero Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-center mb-8 lg:mb-12">
                            <div className="w-full md:w-1/2 space-y-4 sm:space-y-6">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                                    <BuildingOfficeIcon className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 inline-block mr-2 sm:mr-3" /> 
                                    Corporate Partnerships
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                                    Join us in shaping Zambia's next generation of innovators, engineers, and problem solvers.
                                </p>
                                <div className="bg-surface-hover-bg p-4 sm:p-6 rounded-lg">
                                    <p className="font-medium text-sm sm:text-base leading-relaxed">
                                        Partner with Plastal-Bot Builders to make a measurable impact on STEM education while 
                                        fulfilling your Corporate Social Responsibility goals.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <a 
                                        href="#contact" 
                                        className="bg-accent hover:bg-accent-hover text-black py-3 px-4 sm:px-6 rounded-lg font-bold text-center text-sm sm:text-base transition-colors"
                                    >
                                        Become a Partner
                                    </a>
                                    <a 
                                        href="#download-brochure" 
                                        className="border border-accent text-accent hover:bg-accent hover:text-black py-3 px-4 sm:px-6 rounded-lg font-bold text-center text-sm sm:text-base transition-colors"
                                    >
                                        Download Brochure
                                    </a>
                                </div>
                            </div>
                            
                            <div className="w-full md:w-1/2">
                                <ThemedImage
                                    src="resources/Illustrations/Partnerships.svg"
                                    className="w-full h-auto object-contain"
                                    alt="Corporate partnership in action"
                                />
                            </div>
                        </div>
                    </FadeContent>

                    {/* Core Objectives Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={100}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">Our Partnership Objectives</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div className="bg-surface-hover-bg rounded-lg p-4 sm:p-5">
                                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Support STEM Education</h3>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        Together, we can provide access to quality robotics and technology 
                                        education in underserved communities across Zambia.
                                    </p>
                                </div>
                                
                                <div className="bg-surface-hover-bg rounded-lg p-4 sm:p-5">
                                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Equip Future Innovators</h3>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        Help students develop critical robotics, programming, and problem-solving 
                                        skills needed in the 21st century workforce.
                                    </p>
                                </div>
                                
                                <div className="bg-surface-hover-bg rounded-lg p-4 sm:p-5">
                                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Promote Local Talent</h3>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        Nurture homegrown technology and engineering talent to drive 
                                        innovation in Zambia's growing digital economy.
                                    </p>
                                </div>
                                
                                <div className="bg-surface-hover-bg rounded-lg p-4 sm:p-5">
                                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Strengthen Our Reach</h3>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        Enable Plastal-Bot to expand workshops, competitions, and outreach 
                                        programs to reach more schools and communities.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </FadeContent>

                    {/* Partnership Types Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={200}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">Types of Partnership</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                <div className="interactive-card rounded-lg p-4 sm:p-5 lg:p-6 hover:border-accent transition-colors flex flex-col h-full">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 bg-surface-hover-bg rounded-full flex items-center justify-center border-2 border-accent p-2 flex-shrink-0">
                                        <HandRaisedIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-accent" />
                                    </div>
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">Funding Partnerships</h3>
                                    <p className="mb-3 sm:mb-4 flex-grow text-xs sm:text-sm md:text-base leading-relaxed">
                                        Direct financial support for specific projects, workshops, or annual programs. Your company logo 
                                        will appear on event materials, banners, and our website.
                                    </p>
                                    <a href="#contact" className="text-accent hover:underline mt-auto text-sm sm:text-base">Learn more →</a>
                                </div>
                                
                                <div className="interactive-card rounded-lg p-4 sm:p-5 lg:p-6 hover:border-accent transition-colors flex flex-col h-full">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 bg-surface-hover-bg rounded-full flex items-center justify-center border-2 border-accent p-2 flex-shrink-0">
                                        <GiftIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-accent"/>
                                    </div>
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">In-Kind Support</h3>
                                    <p className="mb-3 sm:mb-4 flex-grow text-xs sm:text-sm md:text-base leading-relaxed">
                                        Donate equipment, software, or materials for our workshops and programs. We'll feature your company 
                                        in social media spotlights and event acknowledgments.
                                    </p>
                                    <a href="#contact" className="text-accent hover:underline mt-auto text-sm sm:text-base">Learn more →</a>
                                </div>
                                
                                <div className="interactive-card rounded-lg p-4 sm:p-5 lg:p-6 hover:border-accent transition-colors flex flex-col h-full">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 bg-surface-hover-bg rounded-full flex items-center justify-center border-2 border-accent p-2 flex-shrink-0">
                                        <UserGroupIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-accent"/>
                                    </div>
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">Skill-Based Volunteering</h3>
                                    <p className="mb-3 sm:mb-4 flex-grow text-xs sm:text-sm md:text-base leading-relaxed">
                                        Offer your employees' expertise as mentors, judges, or guest speakers for our programs, 
                                        connecting students with real-world industry insights.
                                    </p>
                                    <a href="#contact" className="text-accent hover:underline mt-auto text-sm sm:text-base">Learn more →</a>
                                </div>
                                
                                <div className="interactive-card rounded-lg p-4 sm:p-5 lg:p-6 hover:border-accent transition-colors flex flex-col h-full">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 bg-surface-hover-bg rounded-full flex items-center justify-center border-2 border-accent p-2 flex-shrink-0">
                                        <TagIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-accent"/>
                                    </div>
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">Program Co-Branding</h3>
                                    <p className="mb-3 sm:mb-4 flex-grow text-xs sm:text-sm md:text-base leading-relaxed">
                                        Co-develop signature programs like "The [Your Company] Robotics Challenge" or 
                                        "AI for Good Bootcamp powered by [Your Company]."
                                    </p>
                                    <a href="#contact" className="text-accent hover:underline mt-auto text-sm sm:text-base">Learn more →</a>
                                </div>
                                
                                <div className="interactive-card rounded-lg p-4 sm:p-5 lg:p-6 hover:border-accent transition-colors flex flex-col h-full md:col-span-2 lg:col-span-1">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 bg-surface-hover-bg rounded-full flex items-center justify-center border-2 border-accent p-2 flex-shrink-0">
                                        <AcademicCapIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-accent"/>
                                    </div>
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">Adopt-a-School Model</h3>
                                    <p className="mb-3 sm:mb-4 flex-grow text-xs sm:text-sm md:text-base leading-relaxed">
                                        "Adopt" a local school by sponsoring robotics kits, teacher training, and 
                                        workshops, creating a lasting legacy of technology education.
                                    </p>
                                    <a href="#contact" className="text-accent hover:underline mt-auto text-sm sm:text-base">Learn more →</a>
                                </div>
                            </div>
                        </section>
                    </FadeContent>

                    {/* Partnership Tiers Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={300}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">Partnership Packages</h2>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                {partnershipTiers.map((tier, index) => (
                                    <div 
                                        key={index} 
                                        className={`interactive-card rounded-lg p-4 sm:p-5 lg:p-6 flex flex-col ${index === 2 ? 'relative bg-surface-hover-bg' : ''}`}
                                    >
                                        {index === 2 && (
                                            <div className="absolute top-0 right-0 bg-accent text-black text-xs font-bold px-2 sm:px-3 py-1 rounded-bl-lg rounded-tr-lg">
                                                POPULAR
                                            </div>
                                        )}
                                        <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">{tier.name}</h3>
                                        <div className="text-base sm:text-lg font-bold text-accent mb-3 sm:mb-4">{tier.contribution}</div>
                                        <ul className="mb-4 flex-grow space-y-2">
                                            {tier.benefits.map((benefit, i) => (
                                                <li key={i} className="flex items-start text-xs sm:text-sm">
                                                    <span className="text-accent mr-2 flex-shrink-0">•</span> 
                                                    <span>{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <a 
                                            href="#contact" 
                                            className={`mt-auto py-2 sm:py-3 px-3 sm:px-4 rounded-lg text-center font-bold text-xs sm:text-sm transition-colors ${
                                                index === 2 
                                                    ? 'bg-accent hover:bg-accent-hover text-black' 
                                                    : 'border border-accent text-accent hover:bg-accent hover:text-black'
                                            }`}
                                        >
                                            Select This Tier
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </FadeContent>

                    {/* Value Proposition */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={100}>
                        <section className="mb-8 lg:mb-12 bg-surface-hover-bg rounded-lg p-4 sm:p-6 lg:p-8">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">The Value of Partnership</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">For Your Organization</h3>
                                    <ul className="space-y-2 sm:space-y-3">
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm"><strong>High social ROI</strong> with measurable impact on youth education and skills</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm"><strong>Brand goodwill</strong> through visibility in events, media coverage, and social media</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm"><strong>Employee engagement</strong> via volunteering opportunities and team-building</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm"><strong>Innovation branding</strong> through association with robotics and future technology</span>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">How We Measure Success</h3>
                                    <ul className="space-y-2 sm:space-y-3">
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">Detailed impact reports with photos, feedback, and outcomes</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">Quantifiable metrics on students trained, schools reached, and programs delivered</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">Beneficiary testimonials from students, teachers, and communities</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">Regular updates and progress reporting throughout partnership duration</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </FadeContent>

                    {/* Partnership Opportunities */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={200}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">2025-2026 Partnership Opportunities</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                {partnershipOpportunities.map((opportunity, index) => (
                                    <div key={index} className="flex gap-3 sm:gap-4">
                                        <div className="shrink-0 mt-1 w-10 h-10 sm:w-12 sm:h-12 border-2 border-accent bg-surface-hover-bg rounded-full flex items-center justify-center p-2">
                                            {opportunity.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">{opportunity.title}</h3>
                                            <p className="text-xs sm:text-sm md:text-base leading-relaxed">{opportunity.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </FadeContent>

                    {/* Long-term Vision */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={300}>
                        <section className="mb-8 lg:mb-12 bg-surface-hover-bg rounded-lg p-4 sm:p-6 lg:p-8">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Our Long-Term Vision</h2>
                            <p className="mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                                Through sustained partnerships, we aim to create lasting change in Zambia's technology landscape:
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
                                <div className="interactive-card rounded-lg p-4 sm:p-5 text-center">
                                    <h3 className="font-bold mb-2 text-sm sm:text-base">Permanent Training Lab</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">Establish a permanent robotics training lab accessible to schools and community clubs</p>
                                </div>
                                
                                <div className="interactive-card rounded-lg p-4 sm:p-5 text-center">
                                    <h3 className="font-bold mb-2 text-sm sm:text-base">National Expansion</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">Expand programs beyond Copperbelt to all provinces across Zambia</p>
                                </div>
                                
                                <div className="interactive-card rounded-lg p-4 sm:p-5 text-center sm:col-span-2 lg:col-span-1">
                                    <h3 className="font-bold mb-2 text-sm sm:text-base">Regional Hub</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">Build a regional hub for robotics innovation and education in Southern Africa</p>
                                </div>
                            </div>
                            
                            <p className="text-center italic text-sm sm:text-base">
                                Join us in making this vision a reality.
                            </p>
                        </section>
                    </FadeContent>

                    {/* Download Brochure Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={100}>
                        <section id="download-brochure" className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">Download Our Partnership Brochure</h2>
                            
                            <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-center">
                                <div className="w-full md:w-1/3">
                                    <ThemedImage
                                        src="resources/Illustrations/Partnerships.svg"
                                        className="w-full h-auto object-contain"
                                        alt="Partnership Brochure"                               
                                    />
                                </div>
                                
                                <div className="w-full md:w-2/3">
                                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Complete Partnership Information</h3>
                                    <p className="mb-4 text-sm sm:text-base leading-relaxed">
                                        Download our detailed corporate partnership brochure to learn more about our programs, 
                                        impact metrics, and how your organization can get involved.
                                    </p>
                                    <a 
                                        href="/resources/plastal-bot-corporate-partnership-brochure.pdf" 
                                        className="inline-flex items-center bg-accent hover:bg-accent-hover text-black py-3 px-4 sm:px-6 rounded-lg font-bold text-sm sm:text-base transition-colors"
                                    >
                                        <DocumentArrowDownIcon className="mr-2 w-5 h-5 sm:w-6 sm:h-6"/> Download Brochure
                                    </a>
                                </div>
                            </div>
                        </section>
                    </FadeContent>
                </div>
                
                <Footer />
            </section>
        </>    
    );
};

export default CorporatePartnershipsPage;