import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { 
    FaArrowLeft, FaHandsHelping, FaUsers, FaLightbulb, 
    FaGraduationCap, FaLeaf, FaGlobe, FaHandshake,
    FaRobot, FaChalkboardTeacher, FaSeedling, FaExchangeAlt
} from 'react-icons/fa';
import ThemedImage from '../../theme/ThemedImage';

const NonprofitPartnershipPage: React.FC = () => {
    // Partnership types data
    const partnershipTypes = [
        {
            title: "Community Programs",
            description: "Co-organize workshops and events to reach underserved communities lacking STEM resources.",
            icon: <FaUsers className="text-accent text-2xl" />,
            example: "Joint tech workshops in rural schools"
        },
        {
            title: "Resource Exchange",
            description: "Share expertise, materials, and networks to strengthen both organizations' impacts.",
            icon: <FaExchangeAlt className="text-accent text-2xl" />,
            example: "Robotics kits + outreach networks"
        },
        {
            title: "Grant Collaboration",
            description: "Jointly apply for funding opportunities supporting youth innovation and digital literacy.",
            icon: <FaHandshake className="text-accent text-2xl" />,
            example: "Combined proposal for UNICEF funding"
        },
        {
            title: "Impact Campaigns",
            description: "Launch collaborative initiatives that highlight collective efforts and attract supporters.",
            icon: <FaLightbulb className="text-accent text-2xl" />,
            example: "\"Tech for Change\" awareness campaign"
        },
        {
            title: "Sustainable Innovation",
            description: "Partner with environmental nonprofits to align robotics with sustainability goals.",
            icon: <FaLeaf className="text-accent text-2xl" />,
            example: "Recycling robots educational program"
        }
    ];

    // Featured partnerships
    const featuredPartnerships = [
        {
            name: "Zambia STEM Foundation",
            description: "Collaborative workshop series reaching 12 schools across three provinces, introducing over 500 students to robotics basics.",
            image: "resources/Partners/partner-stem-foundation.jpg",
            focus: "Education Access"
        },
        {
            name: "TechAfrica Innovation Hub",
            description: "Joint mentorship program connecting young innovators with tech professionals and providing access to shared makerspace resources.",
            image: "resources/Partners/partner-tech-africa.jpg",
            focus: "Youth Innovation"
        }
    ];

    // SDGs we align with
    const sdgs = [
        {
            number: 4,
            title: "Quality Education",
            description: "Ensuring inclusive and equitable quality education for all",
            icon: <FaGraduationCap className="text-accent text-2xl" />
        },
        {
            number: 9,
            title: "Industry, Innovation & Infrastructure",
            description: "Building resilient infrastructure and fostering innovation",
            icon: <FaRobot className="text-accent text-2xl" />
        },
        {
            number: 11,
            title: "Sustainable Communities",
            description: "Making cities inclusive, safe, resilient and sustainable",
            icon: <FaUsers className="text-accent text-2xl" />
        },
        {
            number: 17,
            title: "Partnerships for the Goals",
            description: "Strengthening global partnerships for sustainable development",
            icon: <FaHandshake className="text-accent text-2xl" />
        }
    ];

    return (
        <section className="bg-surface">
            <Header />
            
            <div className="max-w-5xl mx-auto px-4 py-12">
                <Link to="/support" className="inline-flex items-center text-accent hover:text-accent-hover mb-6">
                    {FaArrowLeft ({className:"mr-2" })} Back to Support
                </Link>
                
                {/* Hero Section */}
                <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
                    <div className="md:w-1/2">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            {FaHandsHelping ({className:"inline-block mr-3" })}
                            Nonprofit Partnerships
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
                            Together, we can expand our reach and create lasting impact in STEM education.
                        </p>
                        <div className="bg-surface-hover-bg p-4 rounded-lg mb-6">
                            <p>
                                Plastal-Bot Builders collaborates with mission-aligned organizations to 
                                pool resources, share expertise, and strengthen community-based impact.
                            </p>
                        </div>
                        <div className="mt-6">
                            <a 
                                href="#become-partner" 
                                className="bg-accent hover:bg-accent-hover text-black py-3 px-6 rounded-lg font-bold mr-4"
                            >
                                Become a Partner
                            </a>
                            <a 
                                href="#current-partners" 
                                className="border border-accent text-accent hover:bg-accent hover:text-black py-3 px-6 rounded-lg font-bold"
                            >
                                View Our Partners
                            </a>
                        </div>
                    </div>
                    
                    <div className="md:w-1/2">
                        <ThemedImage
                            src="resources/Illustrations/nonprofit-partnership.jpg"
                            alt="Organizations working together on technology education"
                            className="w-full rounded-lg shadow-lg"
                        />
                    </div>
                </div>
                
                {/* Partnership Value Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-surface-border pb-2">The Power of Partnership</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-3">Why Partner With Us?</h3>
                            <p className="mb-4">
                                By forming strategic alliances with organizations that share similar goals, 
                                we can multiply our collective impact and reach communities that would benefit 
                                most from STEM education and innovation opportunities.
                            </p>
                            <p>
                                Our partnerships focus on creating sustainable, community-driven initiatives 
                                that address local needs while building technical skills and innovation capacity.
                            </p>
                        </div>
                        
                        <div className="bg-surface-hover-bg rounded-lg p-5">
                            <h3 className="text-xl font-bold mb-3">Partnership Focus Areas</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span><strong>STEM Education</strong> - Making technology learning accessible to all</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span><strong>Youth Empowerment</strong> - Building skills and confidence in young innovators</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span><strong>Environmental Sustainability</strong> - Using technology for climate solutions</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span><strong>Community Innovation</strong> - Solving local challenges through technology</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                
                {/* Partnership Types */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-surface-border pb-2">Collaboration Opportunities</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {partnershipTypes.map((type, index) => (
                            <div key={index} className="border border-surface-border rounded-lg p-5 hover:border-accent transition-colors">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3">
                                        {type.icon}
                                    </div>
                                    <h3 className="text-lg font-bold">{type.title}</h3>
                                </div>
                                
                                <p className="mb-3">{type.description}</p>
                                
                                <div className="bg-surface-hover-bg rounded-lg p-3">
                                    <p className="text-sm">
                                        <strong>Example:</strong> {type.example}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Partner Benefits */}
                <section className="mb-12 bg-surface-hover-bg rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-5">Benefits for Partners</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-surface rounded-lg p-5">
                            <h3 className="text-xl font-bold mb-3">What Plastal-Bot Brings</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <div className="w-8 h-8 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 mt-1 shrink-0">
                                        {FaRobot ({className:"text-accent" })}
                                    </div>
                                    <div>
                                        <strong>Technical Expertise</strong>
                                        <p className="text-sm">Robotics curriculum, hardware resources, and trained facilitators</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-8 h-8 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 mt-1 shrink-0">
                                        {FaChalkboardTeacher ({className:"text-accent" })}
                                    </div>
                                    <div>
                                        <strong>Training Capacity</strong>
                                        <p className="text-sm">Proven workshop models and educational content for various age groups</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-8 h-8 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 mt-1 shrink-0">
                                        {FaSeedling ({className:"text-accent" })}
                                    </div>
                                    <div>
                                        <strong>Innovation Framework</strong>
                                        <p className="text-sm">Methods for nurturing creativity and problem-solving abilities</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="bg-surface rounded-lg p-5">
                            <h3 className="text-xl font-bold mb-3">How Partners Benefit</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <div className="w-8 h-8 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 mt-1 shrink-0">
                                        {FaUsers ({className:"text-accent" })}
                                    </div>
                                    <div>
                                        <strong>Extended Reach</strong>
                                        <p className="text-sm">Access new communities and demographics through collaborative programs</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-8 h-8 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 mt-1 shrink-0">
                                        {FaHandshake ({className:"text-accent" })}
                                    </div>
                                    <div>
                                        <strong>Resource Sharing</strong>
                                        <p className="text-sm">Leverage combined assets, networks, and expertise for greater impact</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-8 h-8 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 mt-1 shrink-0">
                                        {FaLightbulb ({className:"text-accent" })}
                                    </div>
                                    <div>
                                        <strong>Enhanced Programming</strong>
                                        <p className="text-sm">Integrate technology components into existing community initiatives</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                
                {/* Featured Partnerships */}
                <section id="current-partners" className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-surface-border pb-2">Featured Partnerships</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {featuredPartnerships.map((partnership, index) => (
                            <div key={index} className="bg-surface border border-surface-border rounded-lg overflow-hidden">
                                <div className="h-48 overflow-hidden">
                                    <ThemedImage
                                        src={partnership.image}
                                        alt={partnership.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-5">
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="text-xl font-bold">{partnership.name}</h3>
                                        <span className="bg-accent text-black text-sm py-1 px-2 rounded">{partnership.focus}</span>
                                    </div>
                                    <p className="mb-4">{partnership.description}</p>
                                    
                                    <a 
                                        href="#case-study"
                                        className="text-accent hover:underline"
                                    >
                                        View full case study →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                        <a href="#all-partners" className="text-accent hover:underline">
                            View all of our nonprofit partners →
                        </a>
                    </div>
                </section>
                
                {/* SDG Alignment */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-surface-border pb-2">Aligned with Global Goals</h2>
                    
                    <p className="mb-6">
                        Our partnerships contribute to broader sustainable development goals, ensuring that
                        our collective work supports global priorities for a better world.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {sdgs.map((sdg, index) => (
                            <div key={index} className="bg-surface-hover-bg rounded-lg p-4 text-center">
                                <div className="w-12 h-12 bg-accent text-black rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="font-bold">{sdg.number}</span>
                                </div>
                                <h3 className="font-bold mb-2">{sdg.title}</h3>
                                <p className="text-sm">{sdg.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Impact Story */}
                <section className="mb-12">
                    <div className="bg-surface-hover-bg rounded-lg overflow-hidden">
                        <div className="p-6 md:p-8">
                            <h2 className="text-2xl font-bold mb-6">Partnership Impact Story</h2>
                            
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="md:w-1/2">
                                    <ThemedImage
                                        src="resources/Illustrations/partnership-impact.jpg"
                                        alt="Partnership project in action"
                                        className="w-full rounded-lg shadow-lg"
                                    />
                                </div>
                                
                                <div className="md:w-1/2">
                                    <h3 className="text-xl font-bold mb-3">Robotics for Environmental Monitoring</h3>
                                    <p className="mb-4">
                                        In partnership with EcoTech Zambia, we developed a program teaching 
                                        students to build simple water quality monitoring robots. The initiative 
                                        combined environmental education with practical technology skills.
                                    </p>
                                    
                                    <div className="bg-surface rounded-lg p-4 mb-4">
                                        <h4 className="font-bold mb-2">Results:</h4>
                                        <ul className="space-y-1">
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2">•</span>
                                                <span>120 students trained across 6 communities</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2">•</span>
                                                <span>15 functional water monitoring devices built and deployed</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2">•</span>
                                                <span>Data collected now used by local environmental agencies</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2">•</span>
                                                <span>Project featured in national environmental conference</span>
                                            </li>
                                        </ul>
                                    </div>
                                    
                                    <a href="#case-studies" className="text-accent hover:underline">
                                        Read more partnership stories →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Partnership Process */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-surface-border pb-2">Partnership Process</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center bg-surface border border-surface-border rounded-lg p-5">
                            <div className="w-16 h-16 mx-auto mb-4 bg-surface-hover-bg rounded-full flex items-center justify-center">
                                <span className="text-accent font-bold text-xl">1</span>
                            </div>
                            <h3 className="text-lg font-bold mb-3">Connect</h3>
                            <p className="text-sm">
                                Initial discussion to explore mutual goals, values, and potential collaboration areas.
                            </p>
                        </div>
                        
                        <div className="text-center bg-surface border border-surface-border rounded-lg p-5">
                            <div className="w-16 h-16 mx-auto mb-4 bg-surface-hover-bg rounded-full flex items-center justify-center">
                                <span className="text-accent font-bold text-xl">2</span>
                            </div>
                            <h3 className="text-lg font-bold mb-3">Design</h3>
                            <p className="text-sm">
                                Collaboratively develop a partnership plan with clear objectives and contributions.
                            </p>
                        </div>
                        
                        <div className="text-center bg-surface border border-surface-border rounded-lg p-5">
                            <div className="w-16 h-16 mx-auto mb-4 bg-surface-hover-bg rounded-full flex items-center justify-center">
                                <span className="text-accent font-bold text-xl">3</span>
                            </div>
                            <h3 className="text-lg font-bold mb-3">Implement</h3>
                            <p className="text-sm">
                                Execute joint initiatives with regular communication and coordinated efforts.
                            </p>
                        </div>
                        
                        <div className="text-center bg-surface border border-surface-border rounded-lg p-5">
                            <div className="w-16 h-16 mx-auto mb-4 bg-surface-hover-bg rounded-full flex items-center justify-center">
                                <span className="text-accent font-bold text-xl">4</span>
                            </div>
                            <h3 className="text-lg font-bold mb-3">Evaluate & Grow</h3>
                            <p className="text-sm">
                                Assess outcomes, document learnings, and explore opportunities for expansion.
                            </p>
                        </div>
                    </div>
                </section>
                
                {/* Become a Partner Section */}
                <section id="become-partner" className="mb-12 bg-surface border border-surface-border rounded-lg overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-6">Become a Partner</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <p className="mb-4">
                                    We're always looking to collaborate with nonprofits and community organizations 
                                    that share our passion for education, technology, and youth empowerment.
                                </p>
                                
                                <div className="mb-6">
                                    <h3 className="font-bold mb-2">Ideal Partners Include:</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2">•</span>
                                            <span>Youth-focused education and empowerment organizations</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2">•</span>
                                            <span>Community development and outreach nonprofits</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2">•</span>
                                            <span>Environmental and sustainability initiatives</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2">•</span>
                                            <span>Innovation hubs and entrepreneurship programs</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2">•</span>
                                            <span>Digital literacy and technology access organizations</span>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div className="bg-surface-hover-bg p-4 rounded-lg">
                                    <h3 className="font-bold mb-2">Partnership Contact:</h3>
                                    <p>Niza Mukumbi</p>
                                    <p>Partnerships Coordinator</p>
                                    <a href="mailto:partnerships@plastalbotbuilders.org" className="text-accent hover:underline">
                                        partnerships@plastalbotbuilders.org
                                    </a>
                                    <p>+260 97 8765432</p>
                                </div>
                            </div>
                            
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="org-name" className="block mb-1">Organization Name</label>
                                    <input 
                                        type="text" 
                                        id="org-name" 
                                        className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="contact-person" className="block mb-1">Contact Person</label>
                                    <input 
                                        type="text" 
                                        id="contact-person" 
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
                                    <label htmlFor="org-focus" className="block mb-1">Organization Focus</label>
                                    <select 
                                        id="org-focus" 
                                        className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                    >
                                        <option value="">Select primary focus area</option>
                                        <option value="education">Education</option>
                                        <option value="youth">Youth Development</option>
                                        <option value="environment">Environmental/Sustainability</option>
                                        <option value="innovation">Innovation/Technology</option>
                                        <option value="community">Community Development</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label htmlFor="partnership-interest" className="block mb-1">Partnership Interest</label>
                                    <select 
                                        id="partnership-interest" 
                                        multiple
                                        className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                    >
                                        <option value="workshops">Joint Workshops</option>
                                        <option value="resources">Resource Sharing</option>
                                        <option value="grants">Grant Collaboration</option>
                                        <option value="campaigns">Impact Campaigns</option>
                                        <option value="projects">Collaborative Projects</option>
                                    </select>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Hold Ctrl/Cmd to select multiple options</p>
                                </div>
                                
                                <div>
                                    <label htmlFor="message" className="block mb-1">Partnership Vision</label>
                                    <textarea 
                                        id="message" 
                                        rows={4}
                                        className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                        placeholder="Briefly describe your organization and how you envision collaborating with Plastal-Bot Builders..."
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
                    </div>
                </section>
                
                {/* CTA Section */}
                <section className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Together We Can Do More</h2>
                    <p className="mb-6 max-w-2xl mx-auto">
                        By working hand in hand with organizations that share our passion for empowerment and innovation, 
                        we can build a stronger ecosystem that drives inclusive and sustainable progress.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a 
                            href="#become-partner" 
                            className="bg-accent hover:bg-accent-hover text-black py-3 px-6 rounded-lg font-bold"
                        >
                            Start a Partnership
                        </a>
                        <a 
                            href="#current-partners" 
                            className="border border-accent text-accent hover:bg-accent hover:text-black py-3 px-6 rounded-lg font-bold"
                        >
                            See Our Impact
                        </a>
                        <a 
                            href="/contact" 
                            className="border border-surface-border hover:border-accent py-3 px-6 rounded-lg font-bold"
                        >
                            Contact Us
                        </a>
                    </div>
                </section>
            </div>
            
            <Footer />
        </section>
    );
};

export default NonprofitPartnershipPage;