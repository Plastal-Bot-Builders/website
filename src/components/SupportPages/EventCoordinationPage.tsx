import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { 
    FaArrowLeft, FaCalendarAlt, FaUsers, FaClipboardCheck, FaTrophy,
    FaRegLightbulb, FaTools, FaMicrophone, FaChalkboardTeacher,
    FaHandsHelping, FaChartLine, FaLaptop, FaCamera, FaLink, FaCogs
} from 'react-icons/fa';
import ThemedImage from '../../theme/ThemedImage';
import CountUp from '../../components/ui/CountUp';
import { SEOConfig } from '../../components/SEO';
import FadeContent from '../../components/ui/FadeContent';

const EventCoordinationPage: React.FC = () => {
    // Event types data
    const eventTypes = [
        {
            type: "Workshops & Bootcamps",
            description: "Short, skill-focused training sessions on robotics, coding, or AI.",
            example: "3-Day Robotics & AI Workshop",
            icon: <FaChalkboardTeacher className="text-accent text-xl sm:text-2xl"/>
        },
        {
            type: "Competitions",
            description: "Challenges that push innovation aligned with SDGs.",
            example: "Robotics for Good Youth Challenge",
            icon: <FaTrophy className="text-accent text-xl sm:text-2xl" />
        },
        {
            type: "Exhibitions & Tech Fairs",
            description: "Showcases of robotics projects, innovations, and partner initiatives.",
            example: "Plastal-Bot Innovation Expo",
            icon: <FaRegLightbulb className="text-accent text-xl sm:text-2xl" />
        },
        {
            type: "Training & Certification",
            description: "Targeted upskilling for teachers or youth.",
            example: "\"Train the Trainer\" Robotics Program",
            icon: <FaTools className="text-accent text-xl sm:text-2xl"/>
        },
        {
            type: "Community Outreach",
            description: "Introductory sessions in schools or communities.",
            example: "Robotics Awareness Day",
            icon: <FaUsers className="text-accent text-xl sm:text-2xl" />
        },
        {
            type: "Panel Talks & Lectures",
            description: "Sessions with field experts and innovators.",
            example: "AI in Africa Speaker Series",
            icon: <FaMicrophone className="text-accent text-xl sm:text-2xl"/>
        }
    ];

    // Coordination roles data
    const coordinationRoles = [
        {
            role: "Event Coordinator",
            responsibility: "Oversees event planning and execution.",
            icon: <FaClipboardCheck className="text-accent text-xl sm:text-2xl"/>
        },
        {
            role: "Technical Lead",
            responsibility: "Manages robotics demos, hardware, and training sessions.",
            icon: <FaCogs className="text-accent text-xl sm:text-2xl" />
        },
        {
            role: "Facilitators",
            responsibility: "Guide participants through hands-on activities.",
            icon: <FaHandsHelping className="text-accent text-xl sm:text-2xl" />
        },
        {
            role: "Partnerships Lead",
            responsibility: "Manages sponsors and collaborations.",
            icon: <FaLink className="text-accent text-xl sm:text-2xl" />
        },
        {
            role: "Media & Communications",
            responsibility: "Handles marketing, social media, and event documentation.",
            icon: <FaCamera className="text-accent text-xl sm:text-2xl" />
        },
        {
            role: "Logistics Officer",
            responsibility: "Coordinates venue setup, transport, and materials.",
            icon: <FaTools className="text-accent text-xl sm:text-2xl" />
        }
    ];

    return (
        <>
            <SEOConfig
                title="Event Coordination | Plastal-Bot Builders"
                description="Join Plastal-Bot Builders in bringing robotics and technology to life through impactful events that inspire and educate the next generation of innovators in Zambia."
                image="/resources/Photos/fredmpelembe.jpeg"
            />
            <section className="bg-surface">
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
                                    <FaCalendarAlt className="inline-block mr-2 sm:mr-3 text-2xl sm:text-3xl md:text-4xl"/>
                                    Event Coordination
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                                    Help us bring robotics and technology to life through impactful events.
                                </p>
                                <div className="bg-surface-hover-bg p-4 sm:p-6 rounded-lg">
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        Event coordination is at the heart of our mission — bringing people together to learn, 
                                        create, and collaborate through hands-on robotics and AI experiences.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <a 
                                        href="#volunteer" 
                                        className="bg-accent hover:bg-accent-hover text-black py-3 px-4 sm:px-6 rounded-lg font-bold text-center text-sm sm:text-base transition-colors"
                                    >
                                        Volunteer Now
                                    </a>
                                    <a 
                                        href="#upcoming" 
                                        className="border border-accent text-accent hover:bg-accent hover:text-black py-3 px-4 sm:px-6 rounded-lg font-bold text-center text-sm sm:text-base transition-colors"
                                    >
                                        Upcoming Events
                                    </a>
                                </div>
                            </div>
                            
                            <div className="w-full md:w-1/2">
                                <ThemedImage
                                    src="resources/Illustrations/Eventplan.svg"
                                    alt="Event coordination team in action"
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </div>
                    </FadeContent>

                    {/* Objectives Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={100}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">Our Event Objectives</h2>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                <div className="bg-surface-hover-bg rounded-lg p-4 sm:p-5 interactive-card">
                                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Quality & Impact</h3>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        Deliver high-quality, impactful STEM and robotics events that inspire learners 
                                        of all ages and backgrounds.
                                    </p>
                                </div>
                                
                                <div className="bg-surface-hover-bg rounded-lg p-4 sm:p-5 interactive-card">
                                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Replicable System</h3>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        Create a structured framework for planning and managing events that can be 
                                        easily scaled and repeated.
                                    </p>
                                </div>
                                
                                <div className="bg-surface-hover-bg rounded-lg p-4 sm:p-5 interactive-card">
                                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Community Building</h3>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        Strengthen community engagement through outreach activities and collaborative 
                                        learning experiences.
                                    </p>
                                </div>
                                
                                <div className="bg-surface-hover-bg rounded-lg p-4 sm:p-5 interactive-card">
                                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Sponsor Engagement</h3>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        Attract corporate and educational sponsors through well-organized events 
                                        with clear value propositions.
                                    </p>
                                </div>
                                
                                <div className="bg-surface-hover-bg rounded-lg p-4 sm:p-5 interactive-card">
                                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Brand Identity</h3>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        Build a recognizable brand identity for Plastal-Bot events known for 
                                        excellence and innovation.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </FadeContent>

                    {/* Event Types Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={200}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">Types of Events We Coordinate</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                {eventTypes.map((event, index) => (
                                    <div key={index} className="rounded-lg interactive-card p-4 sm:p-6">
                                        <div className="flex items-center mb-3 sm:mb-4">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 flex-shrink-0 border-2 border-accent p-2">
                                                {event.icon}
                                            </div>
                                            <h3 className="text-base sm:text-lg md:text-xl font-bold">{event.type}</h3>
                                        </div>
                                        
                                        <p className="mb-3 text-sm sm:text-base leading-relaxed">{event.description}</p>
                                        
                                        <div className="bg-surface-hover-bg rounded-lg p-3">
                                            <p className="text-xs sm:text-sm leading-relaxed">
                                                <strong>Example:</strong> {event.example}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </FadeContent>

                    {/* Event Coordination Structure */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={300}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">Event Coordination Structure</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                <div className="rounded-lg interactive-card p-4 sm:p-6">
                                    <div className="flex items-center mb-3 sm:mb-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 flex-shrink-0 border-2 border-accent p-2">
                                            <FaClipboardCheck className="text-accent text-xl sm:text-2xl"/>
                                        </div>
                                        <h3 className="text-base sm:text-lg md:text-xl font-bold">Planning & Pre-Event</h3>
                                    </div>
                                    
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-sm sm:text-base">Concept development and goal setting</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-sm sm:text-base">Budgeting and resource allocation</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-sm sm:text-base">Sponsorship and partnership outreach</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-sm sm:text-base">Venue selection and logistics planning</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-sm sm:text-base">Promotion and registration management</span>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div className="rounded-lg interactive-card p-4 sm:p-6">
                                    <div className="flex items-center mb-3 sm:mb-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 flex-shrink-0 border-2 border-accent p-2">
                                            <FaUsers className="text-accent text-xl sm:text-2xl" />
                                        </div>
                                        <h3 className="text-base sm:text-lg md:text-xl font-bold">During Event</h3>
                                    </div>
                                    
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-sm sm:text-base">Team assignments and coordination</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-sm sm:text-base">Participant engagement activities</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-sm sm:text-base">Technical demonstrations and workshops</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-sm sm:text-base">Media and documentation capture</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-sm sm:text-base">Logistics and troubleshooting</span>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div className="rounded-lg interactive-card p-4 sm:p-6">
                                    <div className="flex items-center mb-3 sm:mb-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 flex-shrink-0 border-2 border-accent p-2">
                                            <FaChartLine className="text-accent text-xl sm:text-2xl" />
                                        </div>
                                        <h3 className="text-base sm:text-lg md:text-xl font-bold">Post-Event</h3>
                                    </div>
                                    
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-sm sm:text-base">Participant feedback collection</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-sm sm:text-base">Impact evaluation and metrics</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-sm sm:text-base">Report compilation and sharing</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-sm sm:text-base">Success stories and publicity</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-sm sm:text-base">Follow-up with participants</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </FadeContent>      

                    {/* Impact Measurement */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={100}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">Measuring Our Success</h2>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                <div className="bg-surface rounded-lg p-4 text-center interactive-card">
                                    <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">
                                        <CountUp
                                            from={0}
                                            to={1200}
                                            separator=","
                                            duration={2.5}
                                            className="text-3xl sm:text-4xl font-bold text-accent"
                                            suffix="+"
                                        />
                                    </div>
                                    <p className="text-xs sm:text-sm md:text-base">Students trained in 2025</p>
                                </div>
                                
                                <div className="bg-surface rounded-lg p-4 text-center interactive-card">
                                    <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">
                                        <CountUp
                                            from={0}
                                            to={15}
                                            duration={1.5}
                                            className="text-3xl sm:text-4xl font-bold text-accent"
                                        />
                                    </div>
                                    <p className="text-xs sm:text-sm md:text-base">Schools engaged through workshops</p>
                                </div>
                                
                                <div className="bg-surface rounded-lg p-4 text-center interactive-card">
                                    <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">
                                        <CountUp
                                            from={0}
                                            to={38}
                                            duration={1.8}
                                            className="text-3xl sm:text-4xl font-bold text-accent"
                                        />
                                    </div>
                                    <p className="text-xs sm:text-sm md:text-base">Robotics projects completed</p>
                                </div>
                                
                                <div className="bg-surface rounded-lg p-4 text-center interactive-card">
                                    <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">
                                        <CountUp
                                            from={0}
                                            to={92}
                                            duration={2.2}
                                            className="text-3xl sm:text-4xl font-bold text-accent"
                                            suffix="%"
                                        />
                                    </div>
                                    <p className="text-xs sm:text-sm md:text-base">Participant satisfaction rating</p>
                                </div>
                                
                                <div className="bg-surface rounded-lg p-4 text-center interactive-card">
                                    <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">
                                        <CountUp
                                            from={0}
                                            to={28}
                                            duration={1.7}
                                            className="text-3xl sm:text-4xl font-bold text-accent"
                                        />
                                    </div>
                                    <p className="text-xs sm:text-sm md:text-base">Events coordinated last year</p>
                                </div>
                                
                                <div className="bg-surface rounded-lg p-4 text-center interactive-card">
                                    <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">
                                        <CountUp
                                            from={0}
                                            to={85}
                                            duration={2}
                                            className="text-3xl sm:text-4xl font-bold text-accent"
                                            suffix="%"
                                        />
                                    </div>
                                    <p className="text-xs sm:text-sm md:text-base">Students reporting increased STEM interest</p>
                                </div>
                            </div>
                            
                            <p className="mt-4 sm:mt-5 text-center text-sm sm:text-base">
                                These metrics help us improve our events and demonstrate impact to sponsors and partners.
                            </p>
                        </section>
                    </FadeContent>
                    
                    {/* Core Coordination Roles */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={200}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">Core Coordination Roles</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                {coordinationRoles.map((role, index) => (
                                    <div key={index} className="rounded-lg interactive-card p-4 flex items-start">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 flex-shrink-0 border-2 border-accent p-2">
                                            {role.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-base sm:text-lg font-bold mb-1">{role.role}</h3>
                                            <p className="text-sm sm:text-base leading-relaxed">{role.responsibility}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <p className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                Roles can be filled by Plastal-Bot members, student volunteers, or partner institution representatives.
                            </p>
                        </section>                    
                    </FadeContent>

                    {/* Tools and Systems */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={300}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">Tools and Systems We Use</h2>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                                <div className="bg-surface-hover-bg rounded-lg p-4 flex flex-col items-center text-center interactive-card">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent rounded-full flex items-center justify-center mb-3">
                                        <FaLaptop className="text-black text-xl sm:text-2xl" />
                                    </div>
                                    <h3 className="font-bold mb-2 text-sm sm:text-base">Planning & Organization</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">Google Workspace / Notion for task tracking and timelines</p>
                                </div>
                                
                                <div className="bg-surface-hover-bg rounded-lg p-4 flex flex-col items-center text-center interactive-card">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent rounded-full flex items-center justify-center mb-3">
                                        <FaRegLightbulb className="text-black text-xl sm:text-2xl" />
                                    </div>
                                    <h3 className="font-bold mb-2 text-sm sm:text-base">Design & Marketing</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">Canva / Figma for creating event posters and social media graphics</p>
                                </div>
                                
                                <div className="bg-surface-hover-bg rounded-lg p-4 flex flex-col items-center text-center interactive-card">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent rounded-full flex items-center justify-center mb-3">
                                        <FaClipboardCheck className="text-black text-xl sm:text-2xl" />
                                    </div>
                                    <h3 className="font-bold mb-2 text-sm sm:text-base">Registration</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">Eventbrite / Google Forms for managing participant sign-ups</p>
                                </div>
                                
                                <div className="bg-surface-hover-bg rounded-lg p-4 flex flex-col items-center text-center interactive-card">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent rounded-full flex items-center justify-center mb-3">
                                        <FaUsers className="text-black text-xl sm:text-2xl"/>
                                    </div>
                                    <h3 className="font-bold mb-2 text-sm sm:text-base">Team Management</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">Trello or Asana for task assignment among event facilitators</p>
                                </div>
                                
                                <div className="bg-surface-hover-bg rounded-lg p-4 flex flex-col items-center text-center interactive-card">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent rounded-full flex items-center justify-center mb-3">
                                        <FaMicrophone className="text-black text-xl sm:text-2xl" />
                                    </div>
                                    <h3 className="font-bold mb-2 text-sm sm:text-base">Communication</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">Mailchimp for follow-ups and automated event updates</p>
                                </div>
                                
                                <div className="bg-surface-hover-bg rounded-lg p-4 flex flex-col items-center text-center interactive-card">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent rounded-full flex items-center justify-center mb-3">
                                        <FaChartLine className="text-black text-xl sm:text-2xl" />
                                    </div>
                                    <h3 className="font-bold mb-2 text-sm sm:text-base">Analytics</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">Custom backend for tracking participation and impact metrics</p>
                                </div>
                            </div>
                        </section>
                    </FadeContent>

                    {/* Upcoming Events Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={100}>
                        <section id="upcoming" className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">Upcoming Events</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div className="interactive-card rounded-lg p-4 sm:p-5">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3 sm:mb-4">
                                        <h3 className="text-base sm:text-lg font-bold">Robotics for Good Youth Challenge</h3>
                                        <span className="bg-accent text-black text-xs sm:text-sm py-1 px-2 rounded self-start">Competition</span>
                                    </div>
                                    <p className="mb-3 text-sm sm:text-base leading-relaxed">A two-day challenge where young teams develop robot prototypes addressing local community needs.</p>
                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 text-xs sm:text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">November 18-19, 2025</span>
                                        <span className="text-gray-500 dark:text-gray-400">Ndola</span>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-surface-border flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                        <span className="text-xs sm:text-sm">Volunteers needed: <strong>8</strong></span>
                                        <a href="#volunteer" className="text-accent hover:underline text-xs sm:text-sm">Sign up to help</a>
                                    </div>
                                </div>
                                
                                <div className="rounded-lg interactive-card p-4 sm:p-5">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3 sm:mb-4">
                                        <h3 className="text-base sm:text-lg font-bold">3-Day Robotics & AI Workshop</h3>
                                        <span className="bg-accent text-black text-xs sm:text-sm py-1 px-2 rounded self-start">Workshop</span>
                                    </div>
                                    <p className="mb-3 text-sm sm:text-base leading-relaxed">Hands-on learning experience covering basic robotics principles, coding, and AI concepts for beginners.</p>
                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 text-xs sm:text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">December 7-9, 2025</span>
                                        <span className="text-gray-500 dark:text-gray-400">Lusaka</span>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-surface-border flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                        <span className="text-xs sm:text-sm">Volunteers needed: <strong>12</strong></span>
                                        <a href="#volunteer" className="text-accent hover:underline text-xs sm:text-sm">Sign up to help</a>
                                    </div>
                                </div>
                                
                                <div className="rounded-lg interactive-card p-4 sm:p-5">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3 sm:mb-4">
                                        <h3 className="text-base sm:text-lg font-bold">Train the Trainer: Robotics Education</h3>
                                        <span className="bg-accent text-black text-xs sm:text-sm py-1 px-2 rounded self-start">Training</span>
                                    </div>
                                    <p className="mb-3 text-sm sm:text-base leading-relaxed">Intensive program for teachers and educators to learn how to integrate robotics into their classrooms.</p>
                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 text-xs sm:text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">January 15-17, 2026</span>
                                        <span className="text-gray-500 dark:text-gray-400">Kitwe</span>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-surface-border flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                        <span className="text-xs sm:text-sm">Volunteers needed: <strong>6</strong></span>
                                        <a href="#volunteer" className="text-accent hover:underline text-xs sm:text-sm">Sign up to help</a>
                                    </div>
                                </div>
                                
                                <div className="rounded-lg interactive-card p-4 sm:p-5">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3 sm:mb-4">
                                        <h3 className="text-base sm:text-lg font-bold">Plastal-Bot Innovation Expo</h3>
                                        <span className="bg-accent text-black text-xs sm:text-sm py-1 px-2 rounded self-start">Exhibition</span>
                                    </div>
                                    <p className="mb-3 text-sm sm:text-base leading-relaxed">Showcase of student projects, innovations, and robotics demonstrations for the community.</p>
                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 text-xs sm:text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">February 22, 2026</span>
                                        <span className="text-gray-500 dark:text-gray-400">Lusaka</span>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-surface-border flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                        <span className="text-xs sm:text-sm">Volunteers needed: <strong>15</strong></span>
                                        <a href="#volunteer" className="text-accent hover:underline text-xs sm:text-sm">Sign up to help</a>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-4 sm:mt-6 text-center">
                                <a href="/events" className="inline-flex items-center text-accent hover:underline text-sm sm:text-base">
                                    View full events calendar <FaCalendarAlt className="ml-2" />
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

export default EventCoordinationPage;