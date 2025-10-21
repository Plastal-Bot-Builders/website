import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import {
    ArrowLeftIcon,
    WrenchIcon,
    CodeBracketIcon,
    RocketLaunchIcon, // For robot
    CircleStackIcon, // For network
    Cog6ToothIcon, // For cogs
    CpuChipIcon, // For microchip
    UserGroupIcon, // For users
    AcademicCapIcon, // For graduation cap
    UserIcon, // For teacher
    BugAntIcon, // For bug
    DocumentTextIcon, // For file code
} from '@heroicons/react/24/solid';
import ThemedImage from '../../theme/ThemedImage';

const TechnicalSupportPage: React.FC = () => {
    // Technical support types data
    const supportTypes = [
        {
            title: "Hardware Maintenance",
            description: "Assistance with robotics kits, electronics troubleshooting, and component repair.",
            icon: <WrenchIcon className="text-accent text-2xl" />,
            skills: "Electronics, mechanical engineering, 3D printing"
        },
        {
            title: "Software Development",
            description: "Support with programming, app development, and educational platforms.",
            icon: <CodeBracketIcon className="text-accent text-2xl" />,
            skills: "Python, JavaScript, Arduino, mobile app development"
        },
        {
            title: "Systems Integration",
            description: "Help connecting hardware with software for functional robotics systems.",
            icon: <Cog6ToothIcon className="text-accent text-2xl" />,
            skills: "IoT, embedded systems, sensor integration"
        },
        {
            title: "Technical Mentorship",
            description: "Guidance from experienced professionals for projects and problem-solving.",
            icon: <UserIcon className="text-accent text-2xl" />,
            skills: "Teaching experience, robotics expertise, AI/ML knowledge"
        },
        {
            title: "Resource Donations",
            description: "Contribution of components, tools, or digital services for educational use.",
            icon: <CpuChipIcon className="text-accent text-2xl" />,
            skills: "Hardware suppliers, cloud services, development tools"
        },
        {
            title: "Documentation & Training",
            description: "Creating technical guides and training materials for educators and students.",
            icon: <DocumentTextIcon className="text-accent text-2xl" />,
            skills: "Technical writing, curriculum development, video production"
        }
    ];

    // Current technical partners
    const technicalPartners = [
        {
            name: "ZamTech Solutions",
            contribution: "Provides monthly hardware maintenance workshops and donates electronic components for educational kits.",
            image: "resources/Partners/partner-zamtech.jpg",
            expertise: "Hardware & Electronics"
        },
        {
            name: "University of Zambia Engineering Department",
            contribution: "Offers student mentors and lab space for advanced robotics projects and prototype testing.",
            image: "resources/Partners/partner-unza.jpg",
            expertise: "Academic & Research"
        }
    ];

    // Most needed technical skills
    const neededSkills = [
        {
            category: "Programming & Software",
            skills: ["Python", "Arduino/C++", "JavaScript", "Mobile App Development", "Machine Learning"],
            icon: <CodeBracketIcon className="text-accent text-2xl" />
        },
        {
            category: "Hardware & Electronics",
            skills: ["Circuit Design", "Sensor Integration", "Microcontroller Programming", "3D Printing", "Robotics Assembly"],
            icon: <CpuChipIcon className="text-accent text-2xl" />
        },
        {
            category: "Systems & Networks",
            skills: ["IoT Implementation", "Cloud Services", "Database Management", "Network Setup", "Data Security"],
            icon: <CircleStackIcon className="text-accent text-2xl" />
        },
        {
            category: "Education & Documentation",
            skills: ["Technical Writing", "Curriculum Development", "Video Tutorials", "Workshop Facilitation", "Testing Protocols"],
            icon: <AcademicCapIcon className="text-accent text-2xl" />
        }
    ];

    return (
        <section className="scroll-smooth focus:scroll-auto">
            <Header />
            
            <div className="max-w-7xl mx-auto p-8">
                <Link to="/support" className="inline-flex items-center text-accent hover:text-accent-hover mb-6">
                    <ArrowLeftIcon className="mr-2 h-5 w-5"/> Back to Support
                </Link>
                
                {/* Hero Section */}
                <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
                    <div className="md:w-1/2">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            <Cog6ToothIcon className="h-8 w-8 inline-block mr-3" />
                            Technical Support
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
                            Help power our robotics programs with your technical expertise and resources.
                        </p>
                        <div className="bg-surface-hover-bg p-4 rounded-lg mb-6">
                            <p>
                                Technical support partnerships strengthen our capacity to deliver high-quality 
                                robotics programs, maintain our systems, and expand our innovation ecosystem.
                            </p>
                        </div>
                        <div className="mt-6">
                            <a 
                                href="#become-partner" 
                                className="bg-accent hover:bg-accent-hover text-black py-3 px-6 rounded-lg font-bold mr-4"
                            >
                                Become a Tech Partner
                            </a>
                            <a 
                                href="#support-network" 
                                className="border border-accent text-accent hover:bg-accent hover:text-black py-3 px-6 rounded-lg font-bold"
                            >
                                Join Support Network
                            </a>
                        </div>
                    </div>
                    
                    <div className="md:w-1/2">
                        <ThemedImage
                            src="resources/Illustrations/Support.svg"
                            alt="Technical support for robotics projects"
                            className="w-full h-auto object-cove"
                        />
                    </div>
                </div>
                
                {/* Why Technical Support Matters Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 pb-2">Why Technical Support Matters</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-surface-hover-bg rounded-lg">
                            <h3 className="text-xl font-bold mb-3">Empowering Innovation</h3>
                            <p className="mb-4">
                                Reliable technical infrastructure and expertise are the foundation of successful 
                                robotics education. With proper support, we can focus on what matters most: 
                                inspiring and teaching young innovators.
                            </p>
                            <p>
                                Your technical expertise ensures our systems work consistently, can scale to more 
                                communities, and remain up-to-date with technological advancements.
                            </p>
                        </div>
                        
                        <div className="bg-surface-hover-bg rounded-lg">
                            <h3 className="text-xl font-bold mb-3">Technical Challenges We Face</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span><strong>Hardware Durability</strong> - Maintaining functional robotics kits through repeated use</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span><strong>Software Reliability</strong> - Ensuring code works consistently across different environments</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span><strong>Scale & Adaptation</strong> - Customizing solutions for different age groups and contexts</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span><strong>Technical Training</strong> - Keeping educators and facilitators technically proficient</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                
                {/* Types of Technical Support */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 pb-2">Ways to Provide Technical Support</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {supportTypes.map((type, index) => (
                            <div key={index} className="interactive-card rounded-lg p-5 hover:border-accent transition-colors">
                                <div className="flex items-center mb-4">
                                    <div className="w-8 h-8 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3">
                                        {type.icon}
                                    </div>
                                    <h3 className="text-lg font-bold">{type.title}</h3>
                                </div>
                                
                                <p className="mb-3">{type.description}</p>
                                
                                <div className="bg-surface-hover-bg rounded-lg p-3">
                                    <p className="text-sm">
                                        <strong>Relevant skills:</strong> {type.skills}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Technical Support Network */}
                <section id="support-network" className="mb-12 bg-surface-hover-bg rounded-lg">
                    <h2 className="text-2xl font-bold mb-5">Our Technical Support Network</h2>        
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/2">
                            <h3 className="text-xl font-bold mb-3">A Community of Technical Experts</h3>
                            <p className="mb-4">
                                Our Technical Support Network is composed of volunteers and professionals who 
                                contribute their expertise to maintain and improve our educational tools and 
                                robotics platforms.
                            </p>
                            <p className="mb-4">
                                Members provide remote assistance, create documentation, develop open-source 
                                updates, and help troubleshoot technical issues as they arise.
                            </p>
                            <p>
                                Whether you have a few hours monthly or want to engage in deeper technical 
                                collaboration, your skills can make a tremendous difference.
                            </p>
                        </div>
                        
                        <div className="md:w-1/2">
                            <div className="bg-surface rounded-lg mb-4">
                                <h3 className="text-lg font-bold mb-3 flex items-center">
                                    <UserGroupIcon className="text-accent mr-2 h-8 w-8" /> Network Activities
                                </h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-accent mr-2">•</span>
                                        <span>Monthly virtual meetups to discuss technical challenges</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent mr-2">•</span>
                                        <span>Collaborative troubleshooting via our online forum</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent mr-2">•</span>
                                        <span>Code contribution to our open-source repositories</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent mr-2">•</span>
                                        <span>Quarterly in-person maintenance workshops</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent mr-2">•</span>
                                        <span>Technical documentation improvement initiatives</span>
                                    </li>
                                </ul>
                            </div>
                            <a 
                                href="#join-network" 
                                className="bg-accent hover:bg-accent-hover text-black py-2 px-4 ml-6 rounded-lg inline-block"
                            >
                                Join Our Support Network
                            </a>
                        </div>
                    </div>
                </section>
                
                {/* Technical Partners */}
                <section id="current-partners" className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 pb-2">Featured Technical Partners</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {technicalPartners.map((partner, index) => (
                            <div key={index} className="interactive-card rounded-lg overflow-hidden">
                                <div className="h-48 p-6 overflow-hidden">
                                    <ThemedImage
                                        src={partner.image}
                                        alt={partner.name}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                                <div className="p-5">
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="text-xl font-bold">{partner.name}</h3>
                                        <span className="bg-accent text-black text-sm py-1 px-2 rounded">{partner.expertise}</span>
                                    </div>
                                    <p className="mb-4">{partner.contribution}</p>
                                    
                                    <a 
                                        href="#partner-details"
                                        className="text-accent hover:underline"
                                    >
                                        Read partnership details →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                        <a href="#all-partners" className="text-accent hover:underline">
                            View all technical partners →
                        </a>
                    </div>
                </section>
                
                {/* Impact Story */}
                <section className="mb-12">
                    <div className="bg-surface-hover-bg rounded-lg overflow-hidden">
                            <h2 className="text-2xl font-bold mb-6">Technical Support Success Story</h2>
                            
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="md:w-1/2">
                                    <ThemedImage
                                        src="resources/Illustrations/Support.svg"
                                        alt="Students working with upgraded robotics kits"                       
                                        className="w-full h-auto object-cove"
                                    />
                                </div>
                                
                                <div className="md:w-1/2">
                                    <h3 className="text-xl font-bold mb-3">Kit Durability Breakthrough</h3>
                                    <p className="mb-4">
                                        When our robotics kits began showing wear after repeated workshops, 
                                        a team of volunteer engineers redesigned critical components using 
                                        more durable materials and improved connections.
                                    </p>
                                    
                                    <div className="bg-surface rounded-lg p-4 mb-4">
                                        <h4 className="font-bold mb-2">Results:</h4>
                                        <ul className="space-y-1">
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2">•</span>
                                                <span>Kit lifespan increased by over 300%</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2">•</span>
                                                <span>Reduced maintenance time by 70%</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2">•</span>
                                                <span>Created detailed assembly guides for students</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2">•</span>
                                                <span>Design shared with other educational programs</span>
                                            </li>
                                        </ul>
                                    </div>
                                    
                                    <blockquote className="italic border-l-4 border-accent pl-4">
                                        "The redesigned kits have been a game-changer. We can now run multiple 
                                        workshops without worrying about component failure."
                                        <p className="mt-2 font-bold">— Maria Tembo, Workshop Coordinator</p>
                                    </blockquote>
                                </div>
                            </div>
                    </div>
                </section>
                
                {/* Skills Needed */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 pb-2">Technical Skills in Demand</h2>
                    
                    <p className="mb-6">
                        We welcome technical support in many areas, but these are our highest current priorities:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {neededSkills.map((category, index) => (
                            <div key={index} className="interactive-card rounded-lg p-5">
                                <div className="flex items-center mb-4">
                                    <div className="w-8 h-8 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3">
                                        {category.icon}
                                    </div>
                                    <h3 className="text-lg font-bold">{category.category}</h3>
                                </div>
                                
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, skillIndex) => (
                                        <span 
                                            key={skillIndex} 
                                            className="bg-surface-hover-bg px-3 py-1 rounded-full text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Current Projects Needing Support */}
                <section className="mb-12 bg-surface-hover-bg rounded-lg">
                    <h2 className="text-2xl font-bold mb-5">Current Technical Projects</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-surface rounded-lg">
                            <h3 className="font-bold text-lg mb-2 flex items-center">
                                <RocketLaunchIcon className="text-accent mr-2 w-8 h-8"/> Sensor Kit Upgrade
                            </h3>
                            <p className="text-sm mb-3">
                                Enhancing our educational robots with improved sensors for environmental monitoring.
                            </p>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                <span className="block">Skills needed: Electronics, Arduino programming</span>
                                <span>Timeline: November 2025 - January 2026</span>
                            </div>
                        </div>
                        
                        <div className="bg-surface rounded-lg">
                            <h3 className="font-bold text-lg mb-2 flex items-center">
                                <CodeBracketIcon className="text-accent mr-2 w-8 h-8"/> Learning Platform 
                            </h3>
                            <p className="text-sm mb-3">
                                Building a web application to track student progress and showcase projects.
                            </p>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                <span className="block">Skills needed: Web development, database design</span>
                                <span>Timeline: Ongoing</span>
                            </div>
                        </div>
                        
                        <div className="bg-surface rounded-lg">
                            <h3 className="font-bold text-lg mb-2 flex items-center">
                                <BugAntIcon className="text-accent mr-2 w-8 h-8" /> Debugging Workshop
                            </h3>
                            <p className="text-sm mb-3">
                                Creating resources to teach troubleshooting skills to educators and students.
                            </p>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                <span className="block">Skills needed: Technical writing, electronics diagnostics</span>
                                <span>Timeline: December 2025</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-5 text-center">
                        <a href="/projects" className="text-accent hover:underline">
                            View all technical projects needing support →
                        </a>
                    </div>
                </section>
                
                {/* Partner Benefits */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 pb-2">Benefits for Technical Partners</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="flex items-start">
                            <div className="w-12 h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-4 shrink-0">
                                <CodeBracketIcon className="text-accent text-xl"/>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-2">Skills Application</h3>
                                <p>Apply technical expertise to meaningful educational projects with real community impact.</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start">
                            <div className="w-12 h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-4 shrink-0">
                                <UserGroupIcon className="text-accent text-xl"/>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-2">Network Expansion</h3>
                                <p>Connect with other technical professionals across various industries and specializations.</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start">
                            <div className="w-12 h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-4 shrink-0">
                                <AcademicCapIcon className="text-accent text-xl"/>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-2">Knowledge Transfer</h3>
                                <p>Share expertise while learning about educational technology applications and challenges.</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start">
                            <div className="w-12 h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-4 shrink-0">
                                <RocketLaunchIcon className="text-accent text-xl"/>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-2">Innovation Opportunity</h3>
                                <p>Collaborate on cutting-edge educational technology and robotics applications.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 p-5 bg-surface-hover-bg rounded-lg text-center">
                        <h3 className="font-bold mb-2">For Corporate Technical Partners</h3>
                        <p>
                            Companies providing significant technical support can be recognized through our 
                            Partner Spotlight program, including visibility at events, in educational materials, 
                            and through our digital channels.
                        </p>
                    </div>
                </section>
                
                {/* Become a Partner Form */}
                <section id="become-partner" className="mb-12 interactive-card rounded-lg overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-6">Offer Technical Support</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <p className="mb-4">
                                    Share your technical expertise to help us maintain, improve, and expand 
                                    our robotics and educational technology systems.
                                </p>
                                
                                <div className="mb-6">
                                    <h3 className="font-bold mb-2">Support Options:</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2">•</span>
                                            <span>One-time contributions to specific projects</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2">•</span>
                                            <span>Regular remote technical assistance</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2">•</span>
                                            <span>In-person maintenance workshops and training</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2">•</span>
                                            <span>Resource donations (components, software, services)</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2">•</span>
                                            <span>Technical documentation and training material creation</span>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div className="bg-surface-hover-bg p-4 rounded-lg">
                                    <h3 className="font-bold mb-2">Technical Support Contact:</h3>
                                    <p>Daniel Mulenga</p>
                                    <p>Technical Director</p>
                                    <a href="mailto:tech@plastalbotbuilders.org" className="text-accent hover:underline">
                                        tech@plastalbotbuilders.org
                                    </a>
                                    <p>+260 97 6543210</p>
                                </div>
                            </div>
                            
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="full-name" className="block mb-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        id="full-name" 
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
                                    <label htmlFor="organization" className="block mb-1">Organization (if applicable)</label>
                                    <input 
                                        type="text" 
                                        id="organization" 
                                        className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="expertise" className="block mb-1">Technical Expertise</label>
                                    <select 
                                        id="expertise" 
                                        multiple
                                        className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                    >
                                        <option value="hardware">Hardware & Electronics</option>
                                        <option value="software">Software Development</option>
                                        <option value="robotics">Robotics Systems</option>
                                        <option value="iot">IoT & Embedded Systems</option>
                                        <option value="documentation">Technical Documentation</option>
                                        <option value="training">Technical Training</option>
                                        <option value="other">Other Technical Skills</option>
                                    </select>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Hold Ctrl/Cmd to select multiple options</p>
                                </div>
                                
                                <div>
                                    <label htmlFor="specific-skills" className="block mb-1">Specific Technical Skills</label>
                                    <textarea 
                                        id="specific-skills" 
                                        rows={2}
                                        className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                        placeholder="Please list specific languages, tools, platforms you're familiar with..."
                                    ></textarea>
                                </div>
                                
                                <div>
                                    <label htmlFor="support-type" className="block mb-1">Support Type</label>
                                    <select 
                                        id="support-type" 
                                        className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                    >
                                        <option value="">Select how you'd like to help</option>
                                        <option value="remote">Remote Technical Support</option>
                                        <option value="in-person">In-Person Workshops & Training</option>
                                        <option value="project">Specific Project Contribution</option>
                                        <option value="documentation">Documentation Creation</option>
                                        <option value="resources">Resource Donation</option>
                                        <option value="other">Other (Please specify)</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label htmlFor="availability" className="block mb-1">Availability</label>
                                    <select 
                                        id="availability" 
                                        className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                    >
                                        <option value="">Select your availability</option>
                                        <option value="one-time">One-time contribution</option>
                                        <option value="monthly">A few hours monthly</option>
                                        <option value="weekly">Regular weekly support</option>
                                        <option value="project">Project-based (as needed)</option>
                                    </select>
                                </div>
                                
                                <button 
                                    type="submit" 
                                    className="bg-accent hover:bg-accent-hover text-black py-2 px-6 rounded-lg font-bold"
                                >
                                    Submit Support Offer
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
                
                {/* CTA Section */}
                <section className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Keep Our Technology Running Smoothly</h2>
                    <p className="mb-6 max-w-2xl mx-auto">
                        Your technical expertise ensures that our educational tools are reliable, 
                        sustainable, and ready to inspire the next generation of innovators.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a 
                            href="#become-partner" 
                            className="bg-accent hover:bg-accent-hover text-black py-3 px-6 rounded-lg font-bold"
                        >
                            Offer Technical Support
                        </a>
                        <a 
                            href="#support-network" 
                            className="border border-accent text-accent hover:bg-accent hover:text-black py-3 px-6 rounded-lg font-bold"
                        >
                            Join Support Network
                        </a>
                        <a 
                            href="/contact" 
                            className="border border-surface-border hover:border-accent py-3 px-6 rounded-lg font-bold"
                        >
                            Contact Technical Team
                        </a>
                    </div>
                </section>
            </div>
            
            <Footer />
        </section>
    );
};

export default TechnicalSupportPage;