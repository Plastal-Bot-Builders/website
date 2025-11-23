import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { 
    FaArrowLeft, FaGraduationCap, FaSchool, FaUniversity, 
    FaLaptopCode, FaBook, FaGlobeAfrica, FaChalkboardTeacher,
    FaUsers, FaHandshake, FaAward, FaRocket
} from 'react-icons/fa';
import ThemedImage from '../../theme/ThemedImage';
import { SEOConfig } from '../../components/SEO';
import FadeContent from '../../components/ui/FadeContent';

const EducationalPartnershipsPage: React.FC = () => {
    // Partnership models data
    const partnershipModels = [
        {
            name: "Academic Alliance",
            description: "Joint programs, research, or competitions with universities",
            example: "Robotics Innovation Challenge with CBU & UNZA",
            icon: <FaUniversity className="text-accent text-xl sm:text-2xl"/>
        },
        {
            name: "STEM School Program",
            description: "Long-term support for school robotics clubs",
            example: "School kit sponsorship + mentor visits",
            icon: <FaSchool className="text-accent text-xl sm:text-2xl"/>
        },
        {
            name: "Teacher Empowerment Program",
            description: "Train educators in robotics and IoT basics",
            example: "3-day \"Train the Trainer\" bootcamp",
            icon: <FaChalkboardTeacher className="text-accent text-xl sm:text-2xl"/>
        },
        {
            name: "Regional Learning Hubs",
            description: "Co-host workshops at partner institutions",
            example: "Mobile robotics labs rotating by province",
            icon: <FaGlobeAfrica className="text-accent text-xl sm:text-2xl"/>
        }
    ];
    
    return (
        <>
            <SEOConfig
                title="Educational Partnerships | Plastal-Bot Builders"
                description="Join Plastal-Bot Builders in creating hands-on learning opportunities, strengthening teacher capacity, and cultivating a new generation of innovators in Zambia."
                image="/resources/Photos/fredmpelembe.jpeg"
            />
            <section className="scroll-smooth focus:scroll-auto">
                <Header />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                    <Link to="/support" className="inline-flex items-center text-accent hover:text-accent-hover mb-6 text-sm sm:text-base">
                        <FaArrowLeft className="mr-2"/> Back to Support
                    </Link>
                    
                    {/* Hero Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>  
                        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-center mb-8 lg:mb-12">
                            <div className="w-full md:w-1/2 space-y-4 sm:space-y-6">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                                    <FaGraduationCap className="inline-block mr-2 sm:mr-3 text-2xl sm:text-3xl md:text-4xl"/>
                                    Educational Partnerships
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                                    Collaborating to transform robotics and AI education across Zambia.
                                </p>
                                <div className="bg-surface-hover-bg p-4 sm:p-6 rounded-lg">
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        Join Plastal-Bot Builders in creating hands-on learning opportunities, 
                                        strengthening teacher capacity, and cultivating a new generation of innovators.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <a 
                                        href="#contact" 
                                        className="bg-accent hover:bg-accent-hover text-black py-3 px-4 sm:px-6 rounded-lg font-bold text-center text-sm sm:text-base transition-colors"
                                    >
                                        Partner With Us
                                    </a>
                                    <a 
                                        href="#models" 
                                        className="border border-accent text-accent hover:bg-accent hover:text-black py-3 px-4 sm:px-6 rounded-lg font-bold text-center text-sm sm:text-base transition-colors"
                                    >
                                        View Partnership Models
                                    </a>
                                </div>
                            </div>
                            
                            <div className="w-full md:w-1/2">
                                <ThemedImage
                                    src="resources/Illustrations/Education.svg"
                                    className="w-full h-auto object-contain"
                                    alt="Students engaged in a robotics learning session"
                                />
                            </div>
                        </div>
                    </FadeContent>

                    {/* Objectives Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={100}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">Partnership Objectives</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                <div className="bg-surface-hover-bg rounded-lg p-4 sm:p-5">
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 flex items-center">
                                        <span className="text-accent mr-2 flex-shrink-0">1</span> 
                                        <span>Integrate Technology</span>
                                    </h3>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        Integrate robotics and AI education into existing school 
                                        and university programs, enhancing STEM curriculum.
                                    </p>
                                </div>
                                
                                <div className="bg-surface-hover-bg rounded-lg p-4 sm:p-5">
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 flex items-center">
                                        <span className="text-accent mr-2 flex-shrink-0">2</span> 
                                        <span>Build Teacher Capacity</span>
                                    </h3>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        Equip teachers and lecturers with the technical skills 
                                        needed to lead robotics and technology education.
                                    </p>
                                </div>
                                
                                <div className="bg-surface-hover-bg rounded-lg p-4 sm:p-5">
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 flex items-center">
                                        <span className="text-accent mr-2 flex-shrink-0">3</span> 
                                        <span>Project-Based Learning</span>
                                    </h3>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        Offer students real-world, project-based learning experiences
                                        that build practical technology skills.
                                    </p>
                                </div>
                                
                                <div className="bg-surface-hover-bg rounded-lg p-4 sm:p-5">
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 flex items-center">
                                        <span className="text-accent mr-2 flex-shrink-0">4</span> 
                                        <span>Research & Innovation</span>
                                    </h3>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        Strengthen institutional linkages that promote research, 
                                        innovation, and participation in competitions.
                                    </p>
                                </div>
                                
                                <div className="bg-surface-hover-bg rounded-lg p-4 sm:p-5">
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 flex items-center">
                                        <span className="text-accent mr-2 flex-shrink-0">5</span> 
                                        <span>Youth Development</span>
                                    </h3>
                                    <p className="text-sm sm:text-base leading-relaxed">
                                        Support youth in transitioning from learners to creators 
                                        and leaders in technology and engineering.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </FadeContent>

                    {/* Partnership Types Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={200}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">Key Partnership Types</h2>
                            
                            <div className="space-y-6 lg:space-y-8">
                                {/* School Collaborations */}
                                <div className="interactive-card rounded-lg overflow-hidden">
                                    <div className="p-4 sm:p-5 lg:p-6">
                                        <div className="flex items-center mb-3 sm:mb-4">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 flex-shrink-0 border-2 border-accent p-2">
                                                <FaSchool className="text-accent text-lg sm:text-xl"/>
                                            </div>
                                            <h3 className="text-base sm:text-lg md:text-xl font-bold">School Collaborations</h3>
                                        </div>
                                        
                                        <p className="mb-4 text-sm sm:text-base leading-relaxed">
                                            Work with primary and secondary schools to establish robotics programs, 
                                            train teachers, and engage students in hands-on technology learning.
                                        </p>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4">
                                            <div>
                                                <h4 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base">We offer schools:</h4>
                                                <ul className="space-y-2">
                                                    <li className="flex items-start">
                                                        <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                        <span className="text-xs sm:text-sm">Robotics club establishment under Plastal-Bot mentorship</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                        <span className="text-xs sm:text-sm">Affordable STEM kits and basic robotic components</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                        <span className="text-xs sm:text-sm">Teacher training for sustainable in-house programs</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                        <span className="text-xs sm:text-sm">Co-hosting of inter-school competitions and innovation fairs</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            
                                            <div className="bg-surface-hover-bg p-4 rounded-lg">
                                                <h4 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base">Success Story:</h4>
                                                <p className="italic text-xs sm:text-sm mb-2 leading-relaxed">
                                                    "Since partnering with Plastal-Bot, our students have built their first robots and 
                                                    even won a provincial competition. The excitement for STEM subjects has transformed our school."
                                                </p>
                                                <p className="text-xs sm:text-sm font-bold">— Mrs. Banda, Head Teacher, Ndola STEM Academy</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* University & College Partnerships */}
                                <div className="interactive-card rounded-lg overflow-hidden">
                                    <div className="p-4 sm:p-5 lg:p-6">
                                        <div className="flex items-center mb-3 sm:mb-4">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 flex-shrink-0 border-2 border-accent p-2">
                                                <FaUniversity className="text-accent text-lg sm:text-xl"/>
                                            </div>
                                            <h3 className="text-base sm:text-lg md:text-xl font-bold">University & College Partnerships</h3>
                                        </div>
                                        
                                        <p className="mb-4 text-sm sm:text-base leading-relaxed">
                                            Collaborate with higher learning institutions on research, internships, and 
                                            advanced technology education programs.
                                        </p>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4">
                                            <div>
                                                <h4 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base">Collaboration opportunities:</h4>
                                                <ul className="space-y-2">
                                                    <li className="flex items-start">
                                                        <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                        <span className="text-xs sm:text-sm">Joint research or capstone projects in robotics and AI</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                        <span className="text-xs sm:text-sm">Internship placements on real Plastal-Bot projects</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                        <span className="text-xs sm:text-sm">Guest lectures, seminars, and innovation bootcamps</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                        <span className="text-xs sm:text-sm">Co-designed certification programs for advanced learning</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            
                                            <div className="bg-surface-hover-bg p-4 rounded-lg">
                                                <h4 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base">Current Partner:</h4>
                                                <p className="text-xs sm:text-sm mb-2">
                                                    <strong>Copperbelt University</strong>
                                                </p>
                                                <p className="text-xs sm:text-sm leading-relaxed">
                                                    Our flagship university partnership includes joint robotics workshops, 
                                                    student mentorship, and collaborative research projects with the 
                                                    Engineering Department.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Training and Innovation Centers */}
                                <div className="interactive-card rounded-lg overflow-hidden">
                                    <div className="p-4 sm:p-5 lg:p-6">
                                        <div className="flex items-center mb-3 sm:mb-4">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 flex-shrink-0 border-2 border-accent p-2">
                                                <FaLaptopCode className="text-accent text-lg sm:text-xl"/>
                                            </div>
                                            <h3 className="text-base sm:text-lg md:text-xl font-bold">Training and Innovation Centers</h3>
                                        </div>
                                        
                                        <p className="mb-4 text-sm sm:text-base leading-relaxed">
                                            Collaborate with coding hubs, community labs, and technical institutes to 
                                            deliver specialized training and expand regional outreach.
                                        </p>
                                        
                                        <ul className="space-y-2">
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                <span className="text-xs sm:text-sm">Short courses and certifications in robotics, electronics, and 3D design</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                <span className="text-xs sm:text-sm">Shared resources such as 3D printers, tools, and development boards</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                <span className="text-xs sm:text-sm">Regional outreach bases for STEM activities and community engagement</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="interactive-card rounded-lg overflow-hidden">
                                        <div className="p-4 sm:p-5 lg:p-6">
                                            <div className="flex items-center mb-3 sm:mb-4">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 flex-shrink-0 border-2 border-accent p-2">
                                                    <FaBook className="text-accent text-lg sm:text-xl"/>
                                                </div>
                                                <h3 className="text-base sm:text-lg md:text-xl font-bold">Curriculum Integration</h3>
                                            </div>
                                            
                                            <p className="mb-4 text-sm sm:text-base leading-relaxed">
                                                Work with education boards and ministries to develop and implement 
                                                robotics and AI curricula aligned with national education goals.
                                            </p>
                                            
                                            <ul className="space-y-2">
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                    <span className="text-xs sm:text-sm">Co-develop robotics curricula aligned with national STEM goals</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                    <span className="text-xs sm:text-sm">Contribute to policy recommendations for technology education</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                    <span className="text-xs sm:text-sm">Pilot "Robotics in Schools" programs that can scale nationally</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div className="interactive-card rounded-lg overflow-hidden">
                                        <div className="p-4 sm:p-5 lg:p-6">
                                            <div className="flex items-center mb-3 sm:mb-4">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 flex-shrink-0 border-2 border-accent p-2">
                                                    <FaGlobeAfrica className="text-accent text-lg sm:text-xl"/>
                                                </div>
                                                <h3 className="text-base sm:text-lg md:text-xl font-bold">Exchange & Mentorship</h3>
                                            </div>
                                            
                                            <p className="mb-4 text-sm sm:text-base leading-relaxed">
                                                Link Zambian students and educators to international counterparts
                                                through virtual exchange programs and global networks.
                                            </p>
                                            
                                            <ul className="space-y-2">
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                    <span className="text-xs sm:text-sm">Virtual exchange programs with global robotics clubs</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                    <span className="text-xs sm:text-sm">Partnerships with FIRST Robotics, ITU AI for Good, and African Robotics Network</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2 flex-shrink-0">•</span>
                                                    <span className="text-xs sm:text-sm">International mentorship and exposure opportunities for students</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FadeContent>

                    {/* Value Proposition Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={300}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">The Value of Partnership</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div className="bg-surface-hover-bg rounded-lg p-4 sm:p-5">
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface rounded-full flex items-center justify-center mr-3 flex-shrink-0 border-2 border-accent p-2">
                                            <FaUniversity className="text-accent text-lg sm:text-xl"/>
                                        </div>
                                        <span>For Schools & Universities</span>
                                    </h3>
                                    
                                    <ul className="space-y-2 sm:space-y-3">
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">Access to training, mentorship, and STEM learning resources</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">Opportunities for students to compete and gain recognition</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">Improved visibility through Plastal-Bot media coverage</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">Enhanced STEM offerings without significant infrastructure investment</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">Connection to a wider network of technology education providers</span>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div className="bg-surface-hover-bg rounded-lg p-4 sm:p-5">
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface rounded-full flex items-center justify-center mr-3 flex-shrink-0 border-2 border-accent p-2">
                                            <FaRocket className="text-accent text-lg sm:text-xl"/>
                                        </div>
                                        <span>For Plastal-Bot Builders</span>
                                    </h3>
                                    
                                    <ul className="space-y-2 sm:space-y-3">
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">Wider outreach and local presence across institutions</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">Sustainable impact through embedded learning programs</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">Stronger credibility as a national leader in robotics education</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">Access to educational spaces and learning facilities</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">Connection to students interested in technology careers</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </FadeContent>

                    {/* Partnership Models Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={100}>
                        <section id="models" className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">Partnership Models</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                {partnershipModels.map((model, index) => (
                                    <div key={index} className="interactive-card rounded-lg p-4 sm:p-5 hover:border-accent transition-colors">
                                        <div className="flex items-center mb-3 sm:mb-4">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-3 flex-shrink-0 border-2 border-accent p-2">
                                                {model.icon}
                                            </div>
                                            <h3 className="text-base sm:text-lg md:text-xl font-bold">{model.name}</h3>
                                        </div>
                                        
                                        <p className="mb-3 text-sm sm:text-base leading-relaxed">{model.description}</p>
                                        
                                        <div className="bg-surface-hover-bg rounded-lg p-3">
                                            <p className="text-xs sm:text-sm leading-relaxed">
                                                <strong>Example:</strong> {model.example}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </FadeContent>

                    {/* Recognition Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={200}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">Recognition & Incentives</h2>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                <div className="text-center bg-surface-hover-bg rounded-lg p-4 sm:p-5 interactive-card">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center border-2 border-accent">
                                        <FaUsers className="text-accent text-lg sm:text-xl md:text-2xl"/>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold mb-2">Visibility</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">Featured on Plastal-Bot's website, newsletters, and social media channels</p>
                                </div>
                                
                                <div className="text-center bg-surface-hover-bg rounded-lg p-4 sm:p-5 interactive-card">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center border-2 border-accent">
                                        <FaAward className="text-accent text-lg sm:text-xl md:text-2xl"/>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold mb-2">Annual Awards</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">"Educational Partner of the Year" awards presented at our annual celebration event</p>
                                </div>
                                
                                <div className="text-center bg-surface-hover-bg rounded-lg p-4 sm:p-5 interactive-card">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center border-2 border-accent">
                                        <FaHandshake className="text-accent text-lg sm:text-xl md:text-2xl"/>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold mb-2">Certificates</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">Certificates of collaboration for participating teachers and institutions</p>
                                </div>
                            </div>
                        </section>
                    </FadeContent>

                    {/* Potential Partners Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={300}>
                        <section className="mb-8 lg:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 pb-2">Potential Partners</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                <div>
                                    <h3 className="text-base sm:text-lg font-bold mb-3">Universities & Colleges</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">Copperbelt University – existing collaboration expansion</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">University of Zambia (UNZA) – joint research hub</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">Eden University – tech entrepreneurship programs</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">Mulungushi University – rural outreach initiatives</span>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div>
                                    <h3 className="text-base sm:text-lg font-bold mb-3">Innovation Centers</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">American Corners Zambia – community engagement</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">Jacaranda Hub – startup and innovation training</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">BongoHive – tech community partnerships</span>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div>
                                    <h3 className="text-base sm:text-lg font-bold mb-3">Schools</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">KCM Trust School – STEM program development</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">Ndola Girls STEM – women in technology initiatives</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">Hillcrest Technical School – vocational robotics</span>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div>
                                    <h3 className="text-base sm:text-lg font-bold mb-3">Regional Institutions</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">Universities in Malawi and Botswana – cross-border programs</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2 flex-shrink-0">•</span>
                                            <span className="text-xs sm:text-sm">African Robotics Network – continental collaboration</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </FadeContent>

                    {/* Vision Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={100}>
                        <section className="mb-8 lg:mb-12 bg-surface-hover-bg rounded-lg p-4 sm:p-6 lg:p-8">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Long-Term Vision</h2>
                            
                            <p className="mb-6 text-sm sm:text-base leading-relaxed">
                                Plastal-Bot Builders envisions an educational ecosystem where robotics and AI are integrated 
                                into mainstream education across Zambia. Through strategic partnerships, we are building:
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                <div className="bg-surface rounded-lg p-4 sm:p-5 text-center interactive-card">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center border-2 border-accent">
                                        <FaSchool className="text-accent text-lg sm:text-xl md:text-2xl"/>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold mb-2">National Network</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">A connected network of school robotics clubs across all provinces</p>
                                </div>
                                
                                <div className="bg-surface rounded-lg p-4 sm:p-5 text-center interactive-card">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center border-2 border-accent">
                                        <FaChalkboardTeacher className="text-accent text-lg sm:text-xl md:text-2xl"/>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold mb-2">Teacher Leaders</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">Certified teacher trainers in robotics education throughout Zambia</p>
                                </div>
                                
                                <div className="bg-surface rounded-lg p-4 sm:p-5 text-center interactive-card">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center border-2 border-accent">
                                        <FaBook className="text-accent text-lg sm:text-xl md:text-2xl"/>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold mb-2">Shared Curriculum</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed">A common innovation curriculum designed for African learners</p>
                                </div>
                            </div>
                            
                            <p className="mt-6 text-center font-bold text-sm sm:text-base">
                                Join us in creating a generation of problem-solvers and technologists driving local innovation.
                            </p>
                        </section>
                    </FadeContent>
                </div>             
                <Footer />
            </section>
        </>
    );
};

export default EducationalPartnershipsPage;