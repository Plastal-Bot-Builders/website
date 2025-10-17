import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { 
    FaArrowLeft, FaLightbulb, FaUsers, FaRegHandshake, 
    FaGraduationCap, FaRobot, FaComment, FaLaptopCode,
    FaBriefcase, FaChalkboardTeacher, FaUserTie, FaCalendarAlt
} from 'react-icons/fa';
import ThemedImage from '../../theme/ThemedImage';

const MentorshipPage: React.FC = () => {
    // Mentorship benefits data
    const mentorBenefits = [
        {
            title: "Make a Lasting Impact",
            description: "Shape the next generation of innovators and contribute to Zambia's growing tech ecosystem.",
            icon: <FaLightbulb className="text-accent text-2xl" />
        },
        {
            title: "Develop Leadership Skills",
            description: "Enhance your communication, coaching, and leadership capabilities through guided mentorship.",
            icon: <FaUserTie className="text-accent text-2xl" />
        },
        {
            title: "Access Innovation Networks",
            description: "Connect with other industry professionals, educators, and emerging talent.",
            icon: <FaUsers className="text-accent text-2xl" />
        },
        {
            title: "Professional Recognition",
            description: "Receive certification and acknowledgment for your contributions to STEM education.",
            icon: <FaGraduationCap className="text-accent text-2xl" />
        }
    ];

    const menteeBenefits = [
        {
            title: "Personalized Guidance",
            description: "Receive tailored support for your technical projects and career development goals.",
            icon: <FaChalkboardTeacher className="text-accent text-2xl" />
        },
        {
            title: "Industry Insights",
            description: "Learn directly from professionals about real-world applications and career pathways.",
            icon: <FaBriefcase className="text-accent text-2xl" />
        },
        {
            title: "Project Development",
            description: "Get expert feedback on your robotics, programming, and engineering projects.",
            icon: <FaRobot className="text-accent text-2xl" />
        },
        {
            title: "Networking Opportunities",
            description: "Build valuable connections that can open doors to internships and job opportunities.",
            icon: <FaRegHandshake className="text-accent text-2xl" />
        }
    ];

    // Mentorship opportunities data
    const mentorshipOpportunities = [
        {
            title: "One-on-One Mentorship",
            description: "Regular personalized guidance sessions with a dedicated mentee over 3-6 months.",
            commitment: "2-4 hours monthly",
            icon: <FaComment className="text-accent text-2xl" />
        },
        {
            title: "Project Mentoring",
            description: "Support students through specific robotics or programming projects from concept to completion.",
            commitment: "5-10 hours per project",
            icon: <FaRobot className="text-accent text-2xl" />
        },
        {
            title: "Tech Talks & Workshops",
            description: "Lead sessions sharing your expertise in specific technical areas or career development topics.",
            commitment: "2-3 hours per session",
            icon: <FaChalkboardTeacher className="text-accent text-2xl" />
        },
        {
            title: "Competition Coaching",
            description: "Guide teams preparing for robotics competitions, hackathons, or innovation challenges.",
            commitment: "Varies by competition",
            icon: <FaUsers className="text-accent text-2xl" />
        }
    ];

    // Success stories
    const successStories = [
        {
            name: "Emmanuel Mutale",
            role: "Software Engineer at Microsoft",
            quote: "Mentoring young coders through Plastal-Bot has been incredibly rewarding. Seeing their growth from basic programming to building autonomous robots reminds me why I became an engineer.",
            image: "resources/Testimonials/mentor-1.jpg"
        },
        {
            name: "Dr. Nkonde Chilufya",
            role: "AI Researcher, University of Zambia",
            quote: "As an academic, connecting with young minds through the mentorship program has helped me bridge theory with practical applications, and even inspired new research directions.",
            image: "resources/Testimonials/mentor-2.jpg"
        }
    ];

    return (
        <section className="bg-surface">
            <Header />
            
            <div className="max-w-5xl mx-auto px-4 py-12">
                <Link to="/support" className="inline-flex items-center text-accent hover:text-accent-hover mb-6">
                    {FaArrowLeft ({className:"mr-2"})} Back to Support
                </Link>
                
                {/* Hero Section */}
                <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
                    <div className="md:w-1/2">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            {FaRegHandshake ({className:"inline-block mr-3" })}
                            Mentorship Program
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
                            Share your expertise and help shape Zambia's next generation of innovators.
                        </p>
                        <div className="bg-surface-hover-bg p-4 rounded-lg mb-6">
                            <p>
                                Our mentorship program connects students and emerging engineers with industry experts, 
                                researchers, and university mentors to foster meaningful technical and professional growth.
                            </p>
                        </div>
                        <div className="mt-6">
                            <a 
                                href="#become-mentor" 
                                className="bg-accent hover:bg-accent-hover text-black py-3 px-6 rounded-lg font-bold mr-4"
                            >
                                Become a Mentor
                            </a>
                            <a 
                                href="#seek-mentorship" 
                                className="border border-accent text-accent hover:bg-accent hover:text-black py-3 px-6 rounded-lg font-bold"
                            >
                                Seek Mentorship
                            </a>
                        </div>
                    </div>
                    
                    <div className="md:w-1/2">
                        <ThemedImage
                            src="resources/Illustrations/mentorship-hero.jpg"
                            alt="Mentor working with students on a robotics project"
                            className="w-full rounded-lg shadow-lg"
                        />
                    </div>
                </div>
                
                {/* Program Overview */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-surface-border pb-2">Program Overview</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                            <p className="mb-4">
                                The Plastal-Bot Mentorship Program bridges knowledge and opportunity by connecting 
                                experienced professionals with talented young innovators passionate about technology.
                            </p>
                            <p>
                                Through structured guidance, mentees develop technical skills, professional confidence, 
                                and career direction while mentors make meaningful contributions to Zambia's tech future.
                            </p>
                        </div>
                        
                        <div className="bg-surface-hover-bg rounded-lg p-5">
                            <h3 className="text-xl font-bold mb-3">Program Focus Areas</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span><strong>Technical Guidance</strong> - Robotics, programming, AI, and electronics</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span><strong>Project Development</strong> - From concept to prototype to completion</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span><strong>Professional Growth</strong> - Career planning, skill development, networking</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span><strong>Innovation Mindset</strong> - Problem-solving, creativity, entrepreneurship</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                
                {/* How It Works Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-surface-border pb-2">How It Works</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center bg-surface border border-surface-border rounded-lg p-5">
                            <div className="w-16 h-16 mx-auto mb-4 bg-surface-hover-bg rounded-full flex items-center justify-center">
                                <span className="text-accent font-bold text-xl">1</span>
                            </div>
                            <h3 className="text-lg font-bold mb-3">Match</h3>
                            <p>
                                Our platform connects mentors and mentees based on skills, interests, 
                                experience level, and availability.
                            </p>
                        </div>
                        
                        <div className="text-center bg-surface border border-surface-border rounded-lg p-5">
                            <div className="w-16 h-16 mx-auto mb-4 bg-surface-hover-bg rounded-full flex items-center justify-center">
                                <span className="text-accent font-bold text-xl">2</span>
                            </div>
                            <h3 className="text-lg font-bold mb-3">Connect</h3>
                            <p>
                                Establish goals, expectations, and a meeting schedule 
                                that works for both mentor and mentee.
                            </p>
                        </div>
                        
                        <div className="text-center bg-surface border border-surface-border rounded-lg p-5">
                            <div className="w-16 h-16 mx-auto mb-4 bg-surface-hover-bg rounded-full flex items-center justify-center">
                                <span className="text-accent font-bold text-xl">3</span>
                            </div>
                            <h3 className="text-lg font-bold mb-3">Grow</h3>
                            <p>
                                Engage in regular sessions, project work, and progress tracking 
                                with support from our program coordinators.
                            </p>
                        </div>
                    </div>
                    
                    <div className="mt-8 text-center">
                        <ThemedImage
                            src="resources/Illustrations/mentorship-platform.jpg"
                            alt="Mentorship matching platform interface"
                            className="max-w-2xl mx-auto rounded-lg shadow-lg"
                        />
                        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                            Our online mentorship platform facilitates connections and tracks progress throughout the program
                        </p>
                    </div>
                </section>
                
                {/* Benefits Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-surface-border pb-2">Program Benefits</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4 flex items-center">
                                {FaChalkboardTeacher ({className:"text-accent mr-2"})} For Mentors
                            </h3>
                            
                            <div className="space-y-4">
                                {mentorBenefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="mr-3 mt-1">
                                            {benefit.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-1">{benefit.title}</h4>
                                            <p className="text-sm">{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold mb-4 flex items-center">
                                {FaGraduationCap ({className:"text-accent mr-2" })} For Mentees
                            </h3>
                            
                            <div className="space-y-4">
                                {menteeBenefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="mr-3 mt-1">
                                            {benefit.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-1">{benefit.title}</h4>
                                            <p className="text-sm">{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Mentorship Opportunities Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-surface-border pb-2">Mentorship Opportunities</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mentorshipOpportunities.map((opportunity, index) => (
                            <div key={index} className="border border-surface-border rounded-lg p-6 hover:border-accent transition-colors">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-4">
                                        {opportunity.icon}
                                    </div>
                                    <h3 className="text-xl font-bold">{opportunity.title}</h3>
                                </div>
                                
                                <p className="mb-3">{opportunity.description}</p>
                                
                                <div className="bg-surface-hover-bg rounded-lg p-3 flex items-center">
                                    <FaCalendarAlt className="text-accent mr-2" />
                                    <p className="text-sm">
                                        <strong>Time Commitment:</strong> {opportunity.commitment}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Success Stories */}
                <section className="mb-12 bg-surface-hover-bg p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-6">Mentor Success Stories</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {successStories.map((story, index) => (
                            <div key={index} className="bg-surface rounded-lg p-5 flex flex-col md:flex-row gap-4">
                                <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 mx-auto md:mx-0">
                                    <ThemedImage
                                        src={story.image}
                                        alt={story.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="italic mb-4">"{story.quote}"</p>
                                    <p className="font-bold">{story.name}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{story.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                        <a href="#more-stories" className="text-accent hover:underline">
                            Read more mentor stories →
                        </a>
                    </div>
                </section>
                
                {/* Quarterly Tech Talks */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-surface-border pb-2">Quarterly Tech Talks</h2>
                    
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="md:w-1/2">
                            <h3 className="text-xl font-bold mb-3">Connecting Mentors and Mentees</h3>
                            <p className="mb-4">
                                Our quarterly Tech Talk meetups bring together mentors, mentees, and the wider 
                                tech community for knowledge sharing and networking.
                            </p>
                            <ul className="space-y-2 mb-4">
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span>Lightning talks from industry professionals</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span>Project showcases by mentees</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span>Panel discussions on technology trends</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-2">•</span>
                                    <span>Networking opportunities for all participants</span>
                                </li>
                            </ul>
                            <a href="/events" className="text-accent hover:underline">
                                View upcoming Tech Talks →
                            </a>
                        </div>
                        
                        <div className="md:w-1/2">
                            <ThemedImage
                                src="resources/Illustrations/tech-talk-event.jpg"
                                alt="Tech Talk session in progress"
                                className="w-full rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </section>
                
                {/* Corporate Involvement */}
                <section className="mb-12 bg-surface-hover-bg p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-5">Corporate Mentorship</h2>
                    
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/2">
                            <ThemedImage
                                src="resources/Illustrations/corporate-mentorship.jpg"
                                alt="Corporate mentorship session"
                                className="w-full rounded-lg shadow-lg"
                            />
                        </div>
                        
                        <div className="md:w-1/2">
                            <h3 className="text-xl font-bold mb-3">Partner with Us</h3>
                            <p className="mb-4">
                                Companies can integrate mentorship into their CSR initiatives, providing employees 
                                with meaningful volunteer opportunities while supporting local tech talent.
                            </p>
                            <div className="space-y-3 mb-4">
                                <div className="bg-surface rounded-lg p-3">
                                    <h4 className="font-bold">Group Mentorship</h4>
                                    <p className="text-sm">Employees mentor teams of students on specific projects or technologies</p>
                                </div>
                                <div className="bg-surface rounded-lg p-3">
                                    <h4 className="font-bold">Technical Workshops</h4>
                                    <p className="text-sm">Host specialized training sessions led by company experts</p>
                                </div>
                                <div className="bg-surface rounded-lg p-3">
                                    <h4 className="font-bold">Site Visits & Job Shadowing</h4>
                                    <p className="text-sm">Provide real-world workplace exposure for advanced students</p>
                                </div>
                            </div>
                            <a 
                                href="/support/corporate-partnerships" 
                                className="bg-accent hover:bg-accent-hover text-black py-2 px-4 rounded-lg inline-block"
                            >
                                Corporate Partnership Info
                            </a>
                        </div>
                    </div>
                </section>
                
                {/* Get Involved Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Become a Mentor */}
                    <section id="become-mentor" className="bg-surface border border-surface-border rounded-lg overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-4 flex items-center">
                                {FaChalkboardTeacher ({className:"text-accent mr-3"})} Become a Mentor
                            </h2>
                            
                            <p className="mb-4">
                                Share your expertise and make a lasting impact on Zambia's technology future. 
                                We welcome mentors from all technology-related fields.
                            </p>
                            
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="mentor-name" className="block mb-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        id="mentor-name" 
                                        className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="mentor-email" className="block mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        id="mentor-email" 
                                        className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="mentor-profession" className="block mb-1">Profession</label>
                                    <input 
                                        type="text" 
                                        id="mentor-profession" 
                                        className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="mentor-expertise" className="block mb-1">Areas of Expertise</label>
                                    <select 
                                        id="mentor-expertise" 
                                        multiple
                                        className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                    >
                                        <option value="robotics">Robotics</option>
                                        <option value="programming">Programming</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="ai-ml">AI & Machine Learning</option>
                                        <option value="iot">IoT</option>
                                        <option value="mechanical">Mechanical Engineering</option>
                                        <option value="career">Career Development</option>
                                    </select>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Hold Ctrl/Cmd to select multiple options</p>
                                </div>
                                
                                <div>
                                    <label htmlFor="mentor-availability" className="block mb-1">Availability</label>
                                    <select 
                                        id="mentor-availability" 
                                        className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                    >
                                        <option value="">Select your availability</option>
                                        <option value="1-2hrs">1-2 hours per month</option>
                                        <option value="3-5hrs">3-5 hours per month</option>
                                        <option value="6-10hrs">6-10 hours per month</option>
                                        <option value="flexible">Flexible/Project-based</option>
                                    </select>
                                </div>
                                
                                <button 
                                    type="submit" 
                                    className="bg-accent hover:bg-accent-hover text-black py-2 px-6 rounded-lg font-bold"
                                >
                                    Apply as Mentor
                                </button>
                            </form>
                        </div>
                    </section>
                    
                    {/* Seek Mentorship */}
                    <section id="seek-mentorship" className="bg-surface border border-surface-border rounded-lg overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-4 flex items-center">
                                {FaGraduationCap ({className:"text-accent mr-3" })} Seek Mentorship
                            </h2>
                            
                            <p className="mb-4">
                                Get guidance from industry professionals and accelerate your learning in 
                                robotics, programming, and technology innovation.
                            </p>
                            
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="mentee-name" className="block mb-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        id="mentee-name" 
                                        className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="mentee-email" className="block mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        id="mentee-email" 
                                        className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="mentee-age" className="block mb-1">Age Group</label>
                                    <select 
                                        id="mentee-age" 
                                        className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                    >
                                        <option value="">Select age group</option>
                                        <option value="13-15">13-15 years</option>
                                        <option value="16-18">16-18 years</option>
                                        <option value="19-22">19-22 years (University)</option>
                                        <option value="23+">23+ years (Young Professional)</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label htmlFor="mentee-interests" className="block mb-1">Areas of Interest</label>
                                    <select 
                                        id="mentee-interests" 
                                        multiple
                                        className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                    >
                                        <option value="robotics">Robotics</option>
                                        <option value="programming">Programming</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="ai-ml">AI & Machine Learning</option>
                                        <option value="iot">IoT</option>
                                        <option value="mechanical">Mechanical Engineering</option>
                                        <option value="career">Career Guidance</option>
                                    </select>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Hold Ctrl/Cmd to select multiple options</p>
                                </div>
                                
                                <div>
                                    <label htmlFor="mentee-goals" className="block mb-1">Your Mentorship Goals</label>
                                    <textarea 
                                        id="mentee-goals" 
                                        rows={3}
                                        className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                        placeholder="Briefly describe what you hope to achieve through mentorship..."
                                    ></textarea>
                                </div>
                                
                                <button 
                                    type="submit" 
                                    className="bg-accent hover:bg-accent-hover text-black py-2 px-6 rounded-lg font-bold"
                                >
                                    Request Mentorship
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
                
                {/* CTA Section */}
                <section className="text-center mb-12">
                    <h2 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h2>
                    <p className="mb-6 max-w-2xl mx-auto">
                        Whether you're sharing knowledge or seeking guidance, our mentorship program creates 
                        meaningful connections that strengthen Zambia's tech ecosystem.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a 
                            href="#become-mentor" 
                            className="bg-accent hover:bg-accent-hover text-black py-3 px-6 rounded-lg font-bold"
                        >
                            Become a Mentor
                        </a>
                        <a 
                            href="#seek-mentorship" 
                            className="border border-accent text-accent hover:bg-accent hover:text-black py-3 px-6 rounded-lg font-bold"
                        >
                            Apply for Mentorship
                        </a>
                        <a 
                            href="/contact" 
                            className="border border-surface-border hover:border-accent py-3 px-6 rounded-lg font-bold"
                        >
                            Contact Our Team
                        </a>
                    </div>
                </section>
            </div>
            
            <Footer />
        </section>
    );
};

export default MentorshipPage;