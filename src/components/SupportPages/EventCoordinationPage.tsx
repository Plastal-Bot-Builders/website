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

const EventCoordinationPage: React.FC = () => {
    // Event types data
    const eventTypes = [
        {
            type: "Workshops & Bootcamps",
            description: "Short, skill-focused training sessions on robotics, coding, or AI.",
            example: "3-Day Robotics & AI Workshop",
            icon: <FaChalkboardTeacher className="text-accent text-2xl"/>
        },
        {
            type: "Competitions",
            description: "Challenges that push innovation aligned with SDGs.",
            example: "Robotics for Good Youth Challenge",
            icon: <FaTrophy className="text-accent text-2xl" />
        },
        {
            type: "Exhibitions & Tech Fairs",
            description: "Showcases of robotics projects, innovations, and partner initiatives.",
            example: "Plastal-Bot Innovation Expo",
            icon: <FaRegLightbulb className="text-accent text-2xl" />
        },
        {
            type: "Training & Certification",
            description: "Targeted upskilling for teachers or youth.",
            example: "\"Train the Trainer\" Robotics Program",
            icon: <FaTools className="text-accent text-2xl"/>
        },
        {
            type: "Community Outreach",
            description: "Introductory sessions in schools or communities.",
            example: "Robotics Awareness Day",
            icon: <FaUsers className="text-accent text-2xl" />
        },
        {
            type: "Panel Talks & Lectures",
            description: "Sessions with field experts and innovators.",
            example: "AI in Africa Speaker Series",
            icon: <FaMicrophone className="text-accent text-2xl"/>
        }
    ];

    // Coordination roles data
    const coordinationRoles = [
        {
            role: "Event Coordinator",
            responsibility: "Oversees event planning and execution.",
            icon: <FaClipboardCheck className="text-accent text-2xl"/>
        },
        {
            role: "Technical Lead",
            responsibility: "Manages robotics demos, hardware, and training sessions.",
            icon: <FaCogs className="text-accent text-2xl" />
        },
        {
            role: "Facilitators",
            responsibility: "Guide participants through hands-on activities.",
            icon: <FaHandsHelping className="text-accent text-2xl" />
        },
        {
            role: "Partnerships Lead",
            responsibility: "Manages sponsors and collaborations.",
            icon: <FaLink className="text-accent text-2xl" />
        },
        {
            role: "Media & Communications",
            responsibility: "Handles marketing, social media, and event documentation.",
            icon: <FaCamera className="text-accent text-2xl" />
        },
        {
            role: "Logistics Officer",
            responsibility: "Coordinates venue setup, transport, and materials.",
            icon: <FaTools className="text-accent text-2xl" />
        }
    ];

    return (
        <section className="bg-surface">
            <Header />
            
            <div className="max-w-7xl mx-auto p-8">
                <Link to="/support" className="inline-flex items-center text-accent hover:text-accent-hover mb-6">
                    {FaArrowLeft ({className:"mr-2" })} Back to Support
                </Link>                
                {/* Hero Section */}
                <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
                    <div className="md:w-1/2">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            {FaCalendarAlt ({className:"inline-block mr-3"})}
                            Event Coordination
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
                            Help us bring robotics and technology to life through impactful events.
                        </p>
                        <div className="bg-surface-hover-bg p-4 rounded-lg mb-6">
                            <p>
                                Event coordination is at the heart of our mission — bringing people together to learn, 
                                create, and collaborate through hands-on robotics and AI experiences.
                            </p>
                        </div>
                        <div className="mt-6">
                            <a 
                                href="#volunteer" 
                                className="bg-accent hover:bg-accent-hover text-black py-3 px-6 rounded-lg font-bold mr-4"
                            >
                                Volunteer Now
                            </a>
                            <a 
                                href="#upcoming" 
                                className="border border-accent text-accent hover:bg-accent hover:text-black py-3 px-6 rounded-lg font-bold"
                            >
                                Upcoming Events
                            </a>
                        </div>
                    </div>
                    
                    <div className="md:w-1/2">
                        <ThemedImage
                            src="resources/Illustrations/event-coordination.jpg"
                            alt="Event coordination team in action"
                            className="w-full rounded-lg shadow-lg"
                        />
                    </div>
                </div>
                
                {/* Objectives Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-surface-border pb-2">Our Event Objectives</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-surface-hover-bg rounded-lg p-5">
                            <h3 className="text-xl font-bold mb-3">Quality & Impact</h3>
                            <p>
                                Deliver high-quality, impactful STEM and robotics events that inspire learners 
                                of all ages and backgrounds.
                            </p>
                        </div>
                        
                        <div className="bg-surface-hover-bg rounded-lg p-5">
                            <h3 className="text-xl font-bold mb-3">Replicable System</h3>
                            <p>
                                Create a structured framework for planning and managing events that can be 
                                easily scaled and repeated.
                            </p>
                        </div>
                        
                        <div className="bg-surface-hover-bg rounded-lg p-5">
                            <h3 className="text-xl font-bold mb-3">Community Building</h3>
                            <p>
                                Strengthen community engagement through outreach activities and collaborative 
                                learning experiences.
                            </p>
                        </div>
                        
                        <div className="bg-surface-hover-bg rounded-lg p-5">
                            <h3 className="text-xl font-bold mb-3">Sponsor Engagement</h3>
                            <p>
                                Attract corporate and educational sponsors through well-organized events 
                                with clear value propositions.
                            </p>
                        </div>
                        
                        <div className="bg-surface-hover-bg rounded-lg p-5">
                            <h3 className="text-xl font-bold mb-3">Brand Identity</h3>
                            <p>
                                Build a recognizable brand identity for Plastal-Bot events known for 
                                excellence and innovation.
                            </p>
                        </div>
                    </div>
                </section>
                
                {/* Event Types Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-surface-border pb-2">Types of Events We Coordinate</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {eventTypes.map((event, index) => (
                            <div key={index} className="border border-surface-border rounded-lg p-6 hover:border-accent transition-colors">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-4">
                                        {event.icon}
                                    </div>
                                    <h3 className="text-xl font-bold">{event.type}</h3>
                                </div>
                                
                                <p className="mb-3">{event.description}</p>
                                
                                <div className="bg-surface-hover-bg rounded-lg p-3">
                                    <p className="text-sm">
                                        <strong>Example:</strong> {event.example}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Event Coordination Structure */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-surface-border pb-2">Event Coordination Structure</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-surface border border-surface-border rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3">
                                    {FaClipboardCheck ({className:"text-accent text-2xl"})}
                                </div>
                                <h3 className="text-xl font-bold">Planning & Pre-Event</h3>
                            </div>
                            
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span>Concept development and goal setting</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span>Budgeting and resource allocation</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span>Sponsorship and partnership outreach</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span>Venue selection and logistics planning</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span>Promotion and registration management</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="bg-surface border border-surface-border rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3">
                                    {FaUsers ({className:"text-accent text-2xl" })}
                                </div>
                                <h3 className="text-xl font-bold">During Event</h3>
                            </div>
                            
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span>Team assignments and coordination</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span>Participant engagement activities</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span>Technical demonstrations and workshops</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span>Media and documentation capture</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span>Logistics and troubleshooting</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="bg-surface border border-surface-border rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3">
                                    {FaChartLine ({className:"text-accent text-2xl" })}
                                </div>
                                <h3 className="text-xl font-bold">Post-Event</h3>
                            </div>
                            
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span>Participant feedback collection</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span>Impact evaluation and metrics</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span>Report compilation and sharing</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span>Success stories and publicity</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span>Follow-up with participants</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                
                {/* Core Coordination Roles */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-surface-border pb-2">Core Coordination Roles</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {coordinationRoles.map((role, index) => (
                            <div key={index} className="border border-surface-border rounded-lg p-4 flex items-start">
                                <div className="w-12 h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-4 shrink-0">
                                    {role.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-1">{role.role}</h3>
                                    <p>{role.responsibility}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <p className="mt-6 text-center text-gray-500 dark:text-gray-400">
                        Roles can be filled by Plastal-Bot members, student volunteers, or partner institution representatives.
                    </p>
                </section>
                
                {/* Tools and Systems */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-surface-border pb-2">Tools and Systems We Use</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className="bg-surface-hover-bg rounded-lg p-4 flex flex-col items-center text-center">
                            {FaLaptop ({className:"text-accent text-3xl mb-3" })}
                            <h3 className="font-bold mb-2">Planning & Organization</h3>
                            <p className="text-sm">Google Workspace / Notion for task tracking and timelines</p>
                        </div>
                        
                        <div className="bg-surface-hover-bg rounded-lg p-4 flex flex-col items-center text-center">
                            {FaRegLightbulb ({className:"text-accent text-3xl mb-3" })}
                            <h3 className="font-bold mb-2">Design & Marketing</h3>
                            <p className="text-sm">Canva / Figma for creating event posters and social media graphics</p>
                        </div>
                        
                        <div className="bg-surface-hover-bg rounded-lg p-4 flex flex-col items-center text-center">
                            {FaClipboardCheck ({className:"text-accent text-3xl mb-3" })}
                            <h3 className="font-bold mb-2">Registration</h3>
                            <p className="text-sm">Eventbrite / Google Forms for managing participant sign-ups</p>
                        </div>
                        
                        <div className="bg-surface-hover-bg rounded-lg p-4 flex flex-col items-center text-center">
                            {FaUsers ({className:"text-accent text-3xl mb-3"})}
                            <h3 className="font-bold mb-2">Team Management</h3>
                            <p className="text-sm">Trello or Asana for task assignment among event facilitators</p>
                        </div>
                        
                        <div className="bg-surface-hover-bg rounded-lg p-4 flex flex-col items-center text-center">
                            {FaRegLightbulb ({className:"text-accent text-3xl mb-3" })}
                            <h3 className="font-bold mb-2">Communication</h3>
                            <p className="text-sm">Mailchimp for follow-ups and automated event updates</p>
                        </div>
                        
                        <div className="bg-surface-hover-bg rounded-lg p-4 flex flex-col items-center text-center">
                            {FaChartLine ({className:"text-accent text-3xl mb-3" })}
                            <h3 className="font-bold mb-2">Analytics</h3>
                            <p className="text-sm">Custom backend for tracking participation and impact metrics</p>
                        </div>
                    </div>
                </section>
                
                {/* Impact Measurement */}
                <section className="mb-12 bg-surface-hover-bg p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-5">Measuring Our Success</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-surface rounded-lg p-4 text-center">
                            <div className="text-4xl font-bold text-accent mb-2">1,200+</div>
                            <p>Students trained in 2025</p>
                        </div>
                        
                        <div className="bg-surface rounded-lg p-4 text-center">
                            <div className="text-4xl font-bold text-accent mb-2">15</div>
                            <p>Schools engaged through workshops</p>
                        </div>
                        
                        <div className="bg-surface rounded-lg p-4 text-center">
                            <div className="text-4xl font-bold text-accent mb-2">38</div>
                            <p>Robotics projects completed</p>
                        </div>
                        
                        <div className="bg-surface rounded-lg p-4 text-center">
                            <div className="text-4xl font-bold text-accent mb-2">92%</div>
                            <p>Participant satisfaction rating</p>
                        </div>
                        
                        <div className="bg-surface rounded-lg p-4 text-center">
                            <div className="text-4xl font-bold text-accent mb-2">28</div>
                            <p>Events coordinated last year</p>
                        </div>
                        
                        <div className="bg-surface rounded-lg p-4 text-center">
                            <div className="text-4xl font-bold text-accent mb-2">85%</div>
                            <p>Students reporting increased STEM interest</p>
                        </div>
                    </div>
                    
                    <p className="mt-5 text-center">
                        These metrics help us improve our events and demonstrate impact to sponsors and partners.
                    </p>
                </section>
                
                {/* Upcoming Events Section */}
                <section id="upcoming" className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-surface-border pb-2">Upcoming Events</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border border-surface-border rounded-lg p-5">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-bold">Robotics for Good Youth Challenge</h3>
                                <span className="bg-accent text-black text-sm py-1 px-2 rounded">Competition</span>
                            </div>
                            <p className="mb-3">A two-day challenge where young teams develop robot prototypes addressing local community needs.</p>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400">November 18-19, 2025</span>
                                <span className="text-gray-500 dark:text-gray-400">Ndola</span>
                            </div>
                            <div className="mt-4 pt-4 border-t border-surface-border flex justify-between items-center">
                                <span className="text-sm">Volunteers needed: <strong>8</strong></span>
                                <a href="#volunteer" className="text-accent hover:underline">Sign up to help</a>
                            </div>
                        </div>
                        
                        <div className="border border-surface-border rounded-lg p-5">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-bold">3-Day Robotics & AI Workshop</h3>
                                <span className="bg-accent text-black text-sm py-1 px-2 rounded">Workshop</span>
                            </div>
                            <p className="mb-3">Hands-on learning experience covering basic robotics principles, coding, and AI concepts for beginners.</p>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400">December 7-9, 2025</span>
                                <span className="text-gray-500 dark:text-gray-400">Lusaka</span>
                            </div>
                            <div className="mt-4 pt-4 border-t border-surface-border flex justify-between items-center">
                                <span className="text-sm">Volunteers needed: <strong>12</strong></span>
                                <a href="#volunteer" className="text-accent hover:underline">Sign up to help</a>
                            </div>
                        </div>
                        
                        <div className="border border-surface-border rounded-lg p-5">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-bold">Train the Trainer: Robotics Education</h3>
                                <span className="bg-accent text-black text-sm py-1 px-2 rounded">Training</span>
                            </div>
                            <p className="mb-3">Intensive program for teachers and educators to learn how to integrate robotics into their classrooms.</p>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400">January 15-17, 2026</span>
                                <span className="text-gray-500 dark:text-gray-400">Kitwe</span>
                            </div>
                            <div className="mt-4 pt-4 border-t border-surface-border flex justify-between items-center">
                                <span className="text-sm">Volunteers needed: <strong>6</strong></span>
                                <a href="#volunteer" className="text-accent hover:underline">Sign up to help</a>
                            </div>
                        </div>
                        
                        <div className="border border-surface-border rounded-lg p-5">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-bold">Plastal-Bot Innovation Expo</h3>
                                <span className="bg-accent text-black text-sm py-1 px-2 rounded">Exhibition</span>
                            </div>
                            <p className="mb-3">Showcase of student projects, innovations, and robotics demonstrations for the community.</p>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400">February 22, 2026</span>
                                <span className="text-gray-500 dark:text-gray-400">Lusaka</span>
                            </div>
                            <div className="mt-4 pt-4 border-t border-surface-border flex justify-between items-center">
                                <span className="text-sm">Volunteers needed: <strong>15</strong></span>
                                <a href="#volunteer" className="text-accent hover:underline">Sign up to help</a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                        <a href="/events" className="inline-flex items-center text-accent hover:underline">
                            View full events calendar {FaCalendarAlt ({className:"ml-2" })}
                        </a>
                    </div>
                </section>
                
                {/* Long-Term Vision */}
                <section className="mb-12 bg-surface-hover-bg p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-5 text-center">Our Long-Term Vision</h2>
                    
                    <p className="text-center mb-6">
                        Plastal-Bot is building a dedicated Events Division responsible for scaling our impact 
                        across Zambia and eventually the region.
                    </p>
                    
                    <div className="max-w-3xl mx-auto">
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <span className="text-accent mr-2 mt-1">•</span>
                                <span>Establish an annual calendar of robotics events across multiple provinces</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-accent mr-2 mt-1">•</span>
                                <span>Create a certified team of event coordinators specializing in STEM engagement</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-accent mr-2 mt-1">•</span>
                                <span>Scale workshops into regional robotics festivals with international participation</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-accent mr-2 mt-1">•</span>
                                <span>Launch a National Youth Robotics Conference bringing together schools, partners, and policymakers</span>
                            </li>
                        </ul>
                    </div>
                </section>
                
                {/* Volunteer Form Section */}
                <section id="volunteer" className="bg-surface border border-surface-border rounded-lg overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-6">Volunteer as an Event Coordinator</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <p className="mb-4">
                                    Join our team of event coordinators and help bring robotics education to life! 
                                    We welcome volunteers with various skills and experience levels.
                                </p>
                                
                                <div className="mb-6">
                                    <h3 className="font-bold mb-2">What you'll gain:</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2">•</span>
                                            <span>Hands-on event management experience</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2">•</span>
                                            <span>Technical skills in robotics and technology</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2">•</span>
                                            <span>Network with industry professionals and educators</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2">•</span>
                                            <span>Make a difference in young people's lives</span>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div className="bg-surface-hover-bg p-4 rounded-lg">
                                    <h3 className="font-bold mb-2">Event Team Contact:</h3>
                                    <p>Emmanuel Mwaba</p>
                                    <p>Event Coordination Lead</p>
                                    <a href="mailto:events@plastalbotbuilders.org" className="text-accent hover:underline">
                                        events@plastalbotbuilders.org
                                    </a>
                                    <p>+260 97 9876543</p>
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
                                    <label htmlFor="phone" className="block mb-1">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        id="phone" 
                                        className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="skills" className="block mb-1">Skills & Experience</label>
                                    <select 
                                        id="skills" 
                                        className="w-full p-2 rounded-lg border border-surface-border bg-surface mb-2"
                                        multiple
                                    >
                                        <option value="event-planning">Event Planning</option>
                                        <option value="robotics">Robotics Knowledge</option>
                                        <option value="teaching">Teaching/Facilitation</option>
                                        <option value="media">Photography/Videography</option>
                                        <option value="logistics">Logistics Management</option>
                                        <option value="marketing">Marketing & Promotion</option>
                                    </select>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Hold Ctrl/Cmd to select multiple options</p>
                                </div>
                                
                                <div>
                                    <label htmlFor="availability" className="block mb-1">Availability</label>
                                    <select 
                                        id="availability" 
                                        className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                    >
                                        <option value="">Select availability</option>
                                        <option value="weekends">Weekends Only</option>
                                        <option value="weekdays">Weekdays Only</option>
                                        <option value="both">Both Weekdays & Weekends</option>
                                        <option value="specific">Specific Events Only</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label htmlFor="message" className="block mb-1">Why you'd like to volunteer</label>
                                    <textarea 
                                        id="message" 
                                        rows={3}
                                        className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                    ></textarea>
                                </div>
                                
                                <button 
                                    type="submit" 
                                    className="bg-accent hover:bg-accent-hover text-black py-2 px-6 rounded-lg font-bold"
                                >
                                    Submit Application
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
            
            <Footer />
        </section>
    );
};

export default EventCoordinationPage;