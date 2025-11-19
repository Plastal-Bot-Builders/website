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
            icon: <FaUniversity className="text-accent text-2xl"/>
        },
        {
            name: "STEM School Program",
            description: "Long-term support for school robotics clubs",
            example: "School kit sponsorship + mentor visits",
            icon: <FaSchool className="text-accent text-2xl"/>
        },
        {
            name: "Teacher Empowerment Program",
            description: "Train educators in robotics and IoT basics",
            example: "3-day \"Train the Trainer\" bootcamp",
            icon: <FaChalkboardTeacher className="text-accent text-2xl"/>
        },
        {
            name: "Regional Learning Hubs",
            description: "Co-host workshops at partner institutions",
            example: "Mobile robotics labs rotating by province",
            icon: <FaGlobeAfrica className="text-accent text-2xl"/>
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
                
                <div className="max-w-7xl mx-auto p-8">
                    <Link to="/support" className="inline-flex items-center text-accent hover:text-accent-hover mb-6">
                        {FaArrowLeft ({className:"mr-2"})} Back to Support
                    </Link>
                    
                    {/* Hero Section */}
                    <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
                        <div className="md:w-1/2">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                {FaGraduationCap ({className:"inline-block mr-3"})}
                                Educational Partnerships
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
                                Collaborating to transform robotics and AI education across Zambia.
                            </p>
                            <div className="bg-surface-hover-bg p-4 rounded-lg mb-6">
                                <p>
                                    Join Plastal-Bot Builders in creating hands-on learning opportunities, 
                                    strengthening teacher capacity, and cultivating a new generation of innovators.
                                </p>
                            </div>
                            <div className="mt-6">
                                <a 
                                    href="#contact" 
                                    className="bg-accent hover:bg-accent-hover text-black py-3 px-6 rounded-lg font-bold mr-4"
                                >
                                    Partner With Us
                                </a>
                                <a 
                                    href="#models" 
                                    className="border border-accent text-accent hover:bg-accent hover:text-black py-3 px-6 rounded-lg font-bold"
                                >
                                    View Partnership Models
                                </a>
                            </div>
                        </div>
                        
                        <div className="md:w-1/2">
                            <ThemedImage
                                src="resources/Illustrations/Education.svg"
                                className="w-full h-auto object-cover"
                                alt="Students engaged in a robotics learning session"
                            />
                        </div>
                    </div>
                    
                    {/* Objectives Section */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 pb-2">Partnership Objectives</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-surface-hover-bg rounded-lg">
                                <h3 className="text-xl font-bold mb-3 flex items-center">
                                    <span className="text-accent mr-2">1</span> Integrate Technology
                                </h3>
                                <p>
                                    Integrate robotics and AI education into existing school 
                                    and university programs, enhancing STEM curriculum.
                                </p>
                            </div>
                            
                            <div className="bg-surface-hover-bg rounded-lg">
                                <h3 className="text-xl font-bold mb-3 flex items-center">
                                    <span className="text-accent mr-2">2</span> Build Teacher Capacity
                                </h3>
                                <p>
                                    Equip teachers and lecturers with the technical skills 
                                    needed to lead robotics and technology education.
                                </p>
                            </div>
                            
                            <div className="bg-surface-hover-bg rounded-lg">
                                <h3 className="text-xl font-bold mb-3 flex items-center">
                                    <span className="text-accent mr-2">3</span> Project-Based Learning
                                </h3>
                                <p>
                                    Offer students real-world, project-based learning experiences
                                    that build practical technology skills.
                                </p>
                            </div>
                            
                            <div className="bg-surface-hover-bg rounded-lg">
                                <h3 className="text-xl font-bold mb-3 flex items-center">
                                    <span className="text-accent mr-2">4</span> Research & Innovation
                                </h3>
                                <p>
                                    Strengthen institutional linkages that promote research, 
                                    innovation, and participation in competitions.
                                </p>
                            </div>
                            
                            <div className="bg-surface-hover-bg rounded-lg">
                                <h3 className="text-xl font-bold mb-3 flex items-center">
                                    <span className="text-accent mr-2">5</span> Youth Development
                                </h3>
                                <p>
                                    Support youth in transitioning from learners to creators 
                                    and leaders in technology and engineering.
                                </p>
                            </div>
                        </div>
                    </section>
                    
                    {/* Partnership Types Section */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 pb-2">Key Partnership Types</h2>
                        
                        <div className="space-y-8">
                            {/* School Collaborations */}
                            <div className="interactive-card rounded-lg overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-4">
                                            {FaSchool ({className:"text-accent text-2xl"})}
                                        </div>
                                        <h3 className="text-xl font-bold">School Collaborations</h3>
                                    </div>
                                    
                                    <p className="mb-4">
                                        Work with primary and secondary schools to establish robotics programs, 
                                        train teachers, and engage students in hands-on technology learning.
                                    </p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <div>
                                            <h4 className="font-bold mb-2">We offer schools:</h4>
                                            <ul className="space-y-2">
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2">•</span>
                                                    <span>Robotics club establishment under Plastal-Bot mentorship</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2">•</span>
                                                    <span>Affordable STEM kits and basic robotic components</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2">•</span>
                                                    <span>Teacher training for sustainable in-house programs</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2">•</span>
                                                    <span>Co-hosting of inter-school competitions and innovation fairs</span>
                                                </li>
                                            </ul>
                                        </div>
                                        
                                        <div className="bg-surface-hover-bg p-4 rounded-lg">
                                            <h4 className="font-bold mb-2">Success Story:</h4>
                                            <p className="italic text-sm">
                                                "Since partnering with Plastal-Bot, our students have built their first robots and 
                                                even won a provincial competition. The excitement for STEM subjects has transformed our school."
                                            </p>
                                            <p className="text-sm font-bold mt-2">— Mrs. Banda, Head Teacher, Ndola STEM Academy</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* University & College Partnerships */}
                            <div className="interactive-card rounded-lg overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-4">
                                            {FaUniversity ({className:"text-accent text-2xl"})}
                                        </div>
                                        <h3 className="text-xl font-bold">University & College Partnerships</h3>
                                    </div>
                                    
                                    <p className="mb-4">
                                        Collaborate with higher learning institutions on research, internships, and 
                                        advanced technology education programs.
                                    </p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <div>
                                            <h4 className="font-bold mb-2">Collaboration opportunities:</h4>
                                            <ul className="space-y-2">
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2">•</span>
                                                    <span>Joint research or capstone projects in robotics and AI</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2">•</span>
                                                    <span>Internship placements on real Plastal-Bot projects</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2">•</span>
                                                    <span>Guest lectures, seminars, and innovation bootcamps</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-accent mr-2">•</span>
                                                    <span>Co-designed certification programs for advanced learning</span>
                                                </li>
                                            </ul>
                                        </div>
                                        
                                        <div className="bg-surface-hover-bg p-4 rounded-lg">
                                            <h4 className="font-bold mb-2">Current Partner:</h4>
                                            <p className="text-sm mb-2">
                                                <strong>Copperbelt University</strong>
                                            </p>
                                            <p className="text-sm">
                                                Our flagship university partnership includes joint robotics workshops, 
                                                student mentorship, and collaborative research projects with the 
                                                Engineering Department.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Other partnership types with similar structure */}
                            <div className="interactive-card rounded-lg overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-4">
                                            {FaLaptopCode ({className:"text-accent text-2xl" })}
                                        </div>
                                        <h3 className="text-xl font-bold">Training and Innovation Centers</h3>
                                    </div>
                                    
                                    <p className="mb-4">
                                        Collaborate with coding hubs, community labs, and technical institutes to 
                                        deliver specialized training and expand regional outreach.
                                    </p>
                                    
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2">•</span>
                                            <span>Short courses and certifications in robotics, electronics, and 3D design</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2">•</span>
                                            <span>Shared resources such as 3D printers, tools, and development boards</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-accent mr-2">•</span>
                                            <span>Regional outreach bases for STEM activities and community engagement</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="interactive-card rounded-lg overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-4">
                                                {FaBook ({className:"text-accent text-2xl" })}
                                            </div>
                                            <h3 className="text-xl font-bold">Curriculum Integration</h3>
                                        </div>
                                        
                                        <p className="mb-4">
                                            Work with education boards and ministries to develop and implement 
                                            robotics and AI curricula aligned with national education goals.
                                        </p>
                                        
                                        <ul className="space-y-2">
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2">•</span>
                                                <span>Co-develop robotics curricula aligned with national STEM goals</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2">•</span>
                                                <span>Contribute to policy recommendations for technology education</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2">•</span>
                                                <span>Pilot "Robotics in Schools" programs that can scale nationally</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div className="interactive-card rounded-lg overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-4">
                                                {FaGlobeAfrica ({className:"text-accent text-2xl"})}
                                            </div>
                                            <h3 className="text-xl font-bold">Exchange & Mentorship</h3>
                                        </div>
                                        
                                        <p className="mb-4">
                                            Link Zambian students and educators to international counterparts
                                            through virtual exchange programs and global networks.
                                        </p>
                                        
                                        <ul className="space-y-2">
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2">•</span>
                                                <span>Virtual exchange programs with global robotics clubs</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2">•</span>
                                                <span>Partnerships with FIRST Robotics, ITU AI for Good, and African Robotics Network</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-accent mr-2">•</span>
                                                <span>International mentorship and exposure opportunities for students</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    {/* Value Proposition Section */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 pb-2">The Value of Partnership</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-surface-hover-bg rounded-lg">
                                <h3 className="text-xl font-bold mb-4 flex items-center">
                                    {FaUniversity ({className:"text-accent mr-3" })} For Schools & Universities
                                </h3>
                                
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-accent mr-2">•</span>
                                        <span>Access to training, mentorship, and STEM learning resources</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent mr-2">•</span>
                                        <span>Opportunities for students to compete and gain recognition</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent mr-2">•</span>
                                        <span>Improved visibility through Plastal-Bot media coverage</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent mr-2">•</span>
                                        <span>Enhanced STEM offerings without significant infrastructure investment</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent mr-2">•</span>
                                        <span>Connection to a wider network of technology education providers</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-surface-hover-bg rounded-lg">
                                <h3 className="text-xl font-bold mb-4 flex items-center">
                                    {FaRocket ({className:"text-accent mr-3"})} For Plastal-Bot Builders
                                </h3>
                                
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-accent mr-2">•</span>
                                        <span>Wider outreach and local presence across institutions</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent mr-2">•</span>
                                        <span>Sustainable impact through embedded learning programs</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent mr-2">•</span>
                                        <span>Stronger credibility as a national leader in robotics education</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent mr-2">•</span>
                                        <span>Access to educational spaces and learning facilities</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent mr-2">•</span>
                                        <span>Connection to students interested in technology careers</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    
                    {/* Partnership Models Section */}
                    <section id="models" className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 pb-2">Partnership Models</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {partnershipModels.map((model, index) => (
                                <div key={index} className="interactive-card rounded-lg p-6 hover:border-accent transition-colors">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-4">
                                            {model.icon}
                                        </div>
                                        <h3 className="text-xl font-bold">{model.name}</h3>
                                    </div>
                                    
                                    <p className="mb-3">{model.description}</p>
                                    
                                    <div className="bg-surface-hover-bg rounded-lg p-3">
                                        <p className="text-sm">
                                            <strong>Example:</strong> {model.example}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    
                    {/* Recognition Section */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 pb-2">Recognition & Incentives</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center border-2 border-accent">
                                    {FaUsers ({className:"text-accent text-2xl"})}
                                </div>
                                <h3 className="text-lg font-bold mb-2">Visibility</h3>
                                <p>Featured on Plastal-Bot's website, newsletters, and social media channels</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center border-2 border-accent">
                                    {FaAward ({className:"text-accent text-2xl"})}
                                </div>
                                <h3 className="text-lg font-bold mb-2">Annual Awards</h3>
                                <p>"Educational Partner of the Year" awards presented at our annual celebration event</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center border-2 border-accent">
                                    {FaHandshake ({className:"text-accent text-2xl"})}
                                </div>
                                <h3 className="text-lg font-bold mb-2">Certificates</h3>
                                <p>Certificates of collaboration for participating teachers and institutions</p>
                            </div>
                        </div>
                    </section>
                    
                    {/* Potential Partners Section */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 pb-2">Potential Partners</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                            <div>
                                <h3 className="text-lg font-bold mb-3">Universities & Colleges</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <span className="text-accent mr-2">•</span>
                                        <span>Copperbelt University – existing collaboration expansion</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-accent mr-2">•</span>
                                        <span>University of Zambia (UNZA) – joint research hub</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-accent mr-2">•</span>
                                        <span>Eden University – tech entrepreneurship programs</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-accent mr-2">•</span>
                                        <span>Mulungushi University – rural outreach initiatives</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-bold mb-3">Innovation Centers</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <span className="text-accent mr-2">•</span>
                                        <span>American Corners Zambia – community engagement</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-accent mr-2">•</span>
                                        <span>Jacaranda Hub – startup and innovation training</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-accent mr-2">•</span>
                                        <span>BongoHive – tech community partnerships</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-bold mb-3">Schools</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <span className="text-accent mr-2">•</span>
                                        <span>KCM Trust School – STEM program development</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-accent mr-2">•</span>
                                        <span>Ndola Girls STEM – women in technology initiatives</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-accent mr-2">•</span>
                                        <span>Hillcrest Technical School – vocational robotics</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-bold mb-3">Regional Institutions</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <span className="text-accent mr-2">•</span>
                                        <span>Universities in Malawi and Botswana – cross-border programs</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-accent mr-2">•</span>
                                        <span>African Robotics Network – continental collaboration</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    
                    {/* Vision Section */}
                    <section className="mb-12 bg-surface-hover-bg rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Our Long-Term Vision</h2>
                        
                        <p className="mb-6">
                            Plastal-Bot Builders envisions an educational ecosystem where robotics and AI are integrated 
                            into mainstream education across Zambia. Through strategic partnerships, we are building:
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-surface rounded-lg p-5 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center border-2 border-accent">
                                    {FaSchool ({className:"text-accent text-2xl"})}
                                </div>
                                <h3 className="text-lg font-bold mb-2">National Network</h3>
                                <p className="text-sm">A connected network of school robotics clubs across all provinces</p>
                            </div>
                            
                            <div className="bg-surface rounded-lg p-5 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center border-2 border-accent">
                                    {FaChalkboardTeacher ({className:"text-accent text-2xl"})}
                                </div>
                                <h3 className="text-lg font-bold mb-2">Teacher Leaders</h3>
                                <p className="text-sm">Certified teacher trainers in robotics education throughout Zambia</p>
                            </div>
                            
                            <div className="bg-surface rounded-lg p-5 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center border-2 border-accent">
                                    {FaBook ({className:"text-accent text-2xl"})}
                                </div>
                                <h3 className="text-lg font-bold mb-2">Shared Curriculum</h3>
                                <p className="text-sm">A common innovation curriculum designed for African learners</p>
                            </div>
                        </div>
                        
                        <p className="mt-6 text-center font-bold">
                            Join us in creating a generation of problem-solvers and technologists driving local innovation.
                        </p>
                    </section>
                    
                    {/* Contact Section */}
                    <section id="contact" className="interactive-card rounded-lg overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-6">Start a Partnership Conversation</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <p className="mb-4">
                                        Interested in partnering with Plastal-Bot Builders? We're looking for educational 
                                        institutions that share our vision for technology education in Zambia.
                                    </p>
                                    
                                    <div className="mb-6">
                                        <h3 className="font-bold mb-1">Partnership Contact:</h3>
                                        <p>Lupupa Mulenga</p>
                                        <p>Educational Partnerships Coordinator</p>
                                        <a href="mailto:education@plastalbotbuilders.org" className="text-accent hover:underline">
                                            education@plastalbotbuilders.org
                                        </a>
                                        <p>+260 97 5678901</p>
                                    </div>
                                    
                                    <div className="bg-surface-hover-bg p-4 rounded-lg">
                                        <h3 className="font-bold mb-2">Our Partnership Process:</h3>
                                        <ol className="list-decimal pl-4 space-y-1">
                                            <li>Initial consultation to understand your needs</li>
                                            <li>Customized partnership proposal</li>
                                            <li>Planning meeting with key stakeholders</li>
                                            <li>Partnership agreement and implementation timeline</li>
                                            <li>Launch of joint activities and regular assessment</li>
                                        </ol>
                                    </div>
                                </div>
                                
                                <form className="space-y-4">
                                    <div>
                                        <label htmlFor="institution-name" className="block mb-1">Institution Name</label>
                                        <input 
                                            type="text" 
                                            id="institution-name" 
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
                                        <label htmlFor="position" className="block mb-1">Position</label>
                                        <input 
                                            type="text" 
                                            id="position" 
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
                                        <label htmlFor="partnership-interest" className="block mb-1">Areas of Interest</label>
                                        <select 
                                            id="partnership-interest" 
                                            className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                        >
                                            <option value="">Select an option</option>
                                            <option value="school">School Robotics Program</option>
                                            <option value="university">University Research Collaboration</option>
                                            <option value="teacher">Teacher Training</option>
                                            <option value="curriculum">Curriculum Development</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="message" className="block mb-1">Message</label>
                                        <textarea 
                                            id="message" 
                                            rows={4}
                                            className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                            placeholder="Tell us about your institution and partnership interests..."
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
                </div>
                
                <Footer />
            </section>
        </>
    );
};

export default EducationalPartnershipsPage;