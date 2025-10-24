import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import ThemedImage from '../../theme/ThemedImage';
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
            icon: <CalendarIcon className="h-8 w-8 text-accent" />
        },
        {
            title: "Plastal-Bot Innovation Grant",
            description: "Fund mini-grants for exceptional student projects, helping young innovators bring their ideas to life.",
            icon: <GiftIcon className="h-8 w-8 text-accent" />
        },
        {
            title: "STEM Outreach Truck",
            description: "Co-brand our mobile robotics lab that brings technology education to remote communities.",
            icon: <AcademicCapIcon className="h-8 w-8 text-accent" />
        },
        {
            title: "National Robotics Challenge",
            description: "Title sponsorship for Zambia's premier student robotics competition with nationwide participation.",
            icon: <TagIcon className="h-8 w-8 text-accent" />
        }
    ];

    return (
        <section className="scroll-smooth focus:scroll-auto">
            <Header />
            
            <div className="max-w-7xl mx-auto p-8">
                <Link to="/support" className="inline-flex items-center text-accent hover:text-accent-hover mb-6">
                    <ArrowLeftIcon className="h-5 w-5 mr-2 inline" /> Back to Support
                </Link>
                
                {/* Hero Section */}
                <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
                    <div className="md:w-1/2">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            <BuildingOfficeIcon className="h-8 w-8 inline-block mr-3" /> Corporate Partnerships
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
                            Join us in shaping Zambia's next generation of innovators, engineers, and problem solvers.
                        </p>
                        <div className="bg-surface-hover-bg p-4 rounded-lg mb-6">
                            <p className="font-medium">
                                Partner with Plastal-Bot Builders to make a measurable impact on STEM education while 
                                fulfilling your Corporate Social Responsibility goals.
                            </p>
                        </div>
                        <div className="mt-6">
                            <a 
                                href="#contact" 
                                className="bg-accent hover:bg-accent-hover text-black py-3 px-6 rounded-lg font-bold mr-4"
                            >
                                Become a Partner
                            </a>
                            <a 
                                href="#download-brochure" 
                                className="border border-accent text-accent hover:bg-accent hover:text-black py-3 px-6 rounded-lg font-bold"
                            >
                                Download Brochure
                            </a>
                        </div>
                    </div>
                    
                    <div className="md:w-1/2">
                        <ThemedImage
                            src="resources/Illustrations/Partnerships.svg"
                            className="w-full h-auto object-cover"
                            alt="Corporate partnership in action"
                          
                        />
                    </div>
                </div>
                
                {/* Core Objectives Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 pb-2">Our Partnership Objectives</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-surface-hover-bg rounded-lg">
                            <h3 className="text-xl font-bold mb-3">Support STEM Education</h3>
                            <p>
                                Together, we can provide access to quality robotics and technology 
                                education in underserved communities across Zambia.
                            </p>
                        </div>
                        
                        <div className="bg-surface-hover-bg rounded-lg">
                            <h3 className="text-xl font-bold mb-3">Equip Future Innovators</h3>
                            <p>
                                Help students develop critical robotics, programming, and problem-solving 
                                skills needed in the 21st century workforce.
                            </p>
                        </div>
                        
                        <div className="bg-surface-hover-bg rounded-lg">
                            <h3 className="text-xl font-bold mb-3">Promote Local Talent</h3>
                            <p>
                                Nurture homegrown technology and engineering talent to drive 
                                innovation in Zambia's growing digital economy.
                            </p>
                        </div>
                        
                        <div className="bg-surface-hover-bg rounded-lg">
                            <h3 className="text-xl font-bold mb-3">Strengthen Our Reach</h3>
                            <p>
                                Enable Plastal-Bot to expand workshops, competitions, and outreach 
                                programs to reach more schools and communities.
                            </p>
                        </div>
                    </div>
                </section>
                
                {/* Partnership Types Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 pb-2">Types of Partnership</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="interactive-card rounded-lg p-6 hover:border-accent transition-colors flex flex-col h-full">
                            <div className="w-16 h-16 mb-4 bg-surface-hover-bg rounded-full flex items-center justify-center">
                                <HandRaisedIcon className="h-8 w-8 text-accent" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Funding Partnerships</h3>
                            <p className="mb-4 flex-grow">
                                Direct financial support for specific projects, workshops, or annual programs. Your company logo 
                                will appear on event materials, banners, and our website.
                            </p>
                            <a href="#contact" className="text-accent hover:underline mt-auto">Learn more →</a>
                        </div>
                        
                        <div className="interactive-card rounded-lg p-6 hover:border-accent transition-colors flex flex-col h-full">
                            <div className="w-16 h-16 mb-4 bg-surface-hover-bg rounded-full flex items-center justify-center">
                                <GiftIcon className="h-8 w-8 text-accent text-2xl"/>
                            </div>
                            <h3 className="text-xl font-bold mb-3">In-Kind Support</h3>
                            <p className="mb-4 flex-grow">
                                Donate equipment, software, or materials for our workshops and programs. We'll feature your company 
                                in social media spotlights and event acknowledgments.
                            </p>
                            <a href="#contact" className="text-accent hover:underline mt-auto">Learn more →</a>
                        </div>
                        
                        <div className="interactive-card rounded-lg p-6 hover:border-accent transition-colors flex flex-col h-full">
                            <div className="w-16 h-16 mb-4 bg-surface-hover-bg rounded-full flex items-center justify-center">
                                <UserGroupIcon className="h-8 w-8 text-accent text-2xl"/>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Skill-Based Volunteering</h3>
                            <p className="mb-4 flex-grow">
                                Offer your employees' expertise as mentors, judges, or guest speakers for our programs, 
                                connecting students with real-world industry insights.
                            </p>
                            <a href="#contact" className="text-accent hover:underline mt-auto">Learn more →</a>
                        </div>
                        
                        <div className="interactive-card rounded-lg p-6 hover:border-accent transition-colors flex flex-col h-full">
                            <div className="w-16 h-16 mb-4 bg-surface-hover-bg rounded-full flex items-center justify-center">
                                <TagIcon className="h-8 w-8 text-accent text-2xl"/>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Program Co-Branding</h3>
                            <p className="mb-4 flex-grow">
                                Co-develop signature programs like "The [Your Company] Robotics Challenge" or 
                                "AI for Good Bootcamp powered by [Your Company]."
                            </p>
                            <a href="#contact" className="text-accent hover:underline mt-auto">Learn more →</a>
                        </div>
                        
                        <div className="interactive-card rounded-lg p-6 hover:border-accent transition-colors flex flex-col h-full">
                            <div className="w-16 h-16 mb-4 bg-surface-hover-bg rounded-full flex items-center justify-center">
                                <AcademicCapIcon className="h-8 w-8 text-accent text-2xl"/>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Adopt-a-School Model</h3>
                            <p className="mb-4 flex-grow">
                                "Adopt" a local school by sponsoring robotics kits, teacher training, and 
                                workshops, creating a lasting legacy of technology education.
                            </p>
                            <a href="#contact" className="text-accent hover:underline mt-auto">Learn more →</a>
                        </div>
                    </div>
                </section>
                
                {/* Partnership Tiers Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 pb-2">Partnership Packages</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        {partnershipTiers.map((tier, index) => (
                            <div 
                                key={index} 
                                className={`interactive-card rounded-lg p-6 flex flex-col ${index === 2 ? 'relative bg-surface-hover-bg' : ''}`}
                            >
                                {index === 2 && (
                                    <div className="absolute top-0 right-0 bg-accent text-black text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                                        POPULAR
                                    </div>
                                )}
                                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                                <div className="text-lg font-bold text-accent mb-4">{tier.contribution}</div>
                                <ul className="mb-4 flex-grow">
                                    {tier.benefits.map((benefit, i) => (
                                        <li key={i} className="mb-2 flex items-start">
                                            <span className="text-accent mr-2">•</span> 
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                                <a 
                                    href="#contact" 
                                    className={`mt-auto py-2 px-4 rounded-lg text-center ${
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
                
                {/* Value Proposition */}
                <section className="mb-12 bg-surface-hover-bg rounded-lg">
                    <h2 className="text-2xl font-bold mb-6">The Value of Partnership</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-bold mb-3">For Your Organization</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span><strong>High social ROI</strong> with measurable impact on youth education and skills</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span><strong>Brand goodwill</strong> through visibility in events, media coverage, and social media</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span><strong>Employee engagement</strong> via volunteering opportunities and team-building</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span><strong>Innovation branding</strong> through association with robotics and future technology</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold mb-3">How We Measure Success</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span>Detailed impact reports with photos, feedback, and outcomes</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span>Quantifiable metrics on students trained, schools reached, and programs delivered</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span>Beneficiary testimonials from students, teachers, and communities</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span>Regular updates and progress reporting throughout partnership duration</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                
                {/* Partnership Opportunities */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 pb-2">2025-2026 Partnership Opportunities</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {partnershipOpportunities.map((opportunity, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="shrink-0 mt-1">
                                    {opportunity.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{opportunity.title}</h3>
                                    <p>{opportunity.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Long-term Vision */}
                <section className="mb-12 bg-surface-hover-bg rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Our Long-Term Vision</h2>
                    <p className="mb-4">
                        Through sustained partnerships, we aim to create lasting change in Zambia's technology landscape:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="interactive-card rounded-lg p-4 text-center">
                            <h3 className="font-bold mb-2">Permanent Training Lab</h3>
                            <p className="text-sm">Establish a permanent robotics training lab accessible to schools and community clubs</p>
                        </div>
                        
                        <div className="interactive-card rounded-lg p-4 text-center">
                            <h3 className="font-bold mb-2">National Expansion</h3>
                            <p className="text-sm">Expand programs beyond Copperbelt to all provinces across Zambia</p>
                        </div>
                        
                        <div className="interactive-card rounded-lg p-4 text-center">
                            <h3 className="font-bold mb-2">Regional Hub</h3>
                            <p className="text-sm">Build a regional hub for robotics innovation and education in Southern Africa</p>
                        </div>
                    </div>
                    
                    <p className="text-center italic">
                        Join us in making this vision a reality.
                    </p>
                </section>
                
                {/* Download Brochure Section */}
                <section id="download-brochure" className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 pb-2">Download Our Partnership Brochure</h2>
                    
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="md:w-1/3">
                            <ThemedImage
                                src="resources/Illustrations/Partnerships.svg"
                                className="w-full h-auto object-cover"
                                alt="Partnership Brochure"                               
                            />
                        </div>
                        
                        <div className="md:w-2/3">
                            <h3 className="text-xl font-bold mb-3">Complete Partnership Information</h3>
                            <p className="mb-4">
                                Download our detailed corporate partnership brochure to learn more about our programs, 
                                impact metrics, and how your organization can get involved.
                            </p>
                            <a 
                                href="/resources/plastal-bot-corporate-partnership-brochure.pdf" 
                                className="inline-flex items-center bg-accent hover:bg-accent-hover text-black py-3 px-6 rounded-lg font-bold"
                            >
                                <DocumentArrowDownIcon className="mr-2 h-8 w-8"/> Download Brochure
                            </a>
                        </div>
                    </div>
                </section>
                
                {/* Contact Section */}
                <section id="contact" className="interactive-card p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-6">Start a Partnership Conversation</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <p className="mb-4">
                                Ready to discuss how your organization can partner with Plastal-Bot Builders? 
                                Our partnerships team is ready to develop a custom collaboration that aligns with your 
                                goals and maximizes your impact.
                            </p>
                            
                            <div className="mb-4">
                                <h3 className="font-bold">Partnership Contact:</h3>
                                <p>Mwape Kapambwe</p>
                                <p>Corporate Partnerships Manager</p>
                                <a href="mailto:partnerships@plastalbotbuilders.org" className="text-accent hover:underline">
                                    partnerships@plastalbotbuilders.org
                                </a>
                                <p>+260 97 1234567</p>
                            </div>
                        </div>
                        
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="company-name" className="block mb-1">Company Name</label>
                                <input 
                                    type="text" 
                                    id="company-name" 
                                    className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="contact-name" className="block mb-1">Contact Person</label>
                                <input 
                                    type="text" 
                                    id="contact-name" 
                                    className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block mb-1">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="interests" className="block mb-1">Partnership Interests</label>
                                <textarea 
                                    id="interests" 
                                    rows={4}
                                    className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                    placeholder="Tell us about your organization's goals and interests..."
                                ></textarea>
                            </div>
                            
                            <button 
                                type="submit" 
                                className="bg-accent hover:bg-accent-hover text-black py-2 px-6 rounded-lg font-bold"
                            >
                                Submit Inquiry
                            </button>
                        </form>
                    </div>
                </section>
            </div>
            
            <Footer />
        </section>
    );
};

export default CorporatePartnershipsPage;