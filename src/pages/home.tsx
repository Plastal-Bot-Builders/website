import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageCarousel from '../components/ImageCarousel';
import LogoCarousel from '../components/LogoCarousel';
import Typewriter from '../components/Typewriter';
import Button from '../components/Button';
import styled from 'styled-components';

const InputField = styled.input`
  background-color: transparent;
  border: 1px solid #d1d5db; /* border-gray-300 */
  padding: 0.5rem 0.75rem; /* px-3 py-2 */
  border-radius: 0.375rem; /* rounded-md */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* shadow-sm */
  transition: border-color 0.3s ease;
  width: 100%; /* Full width */
  height: 3rem; /* Adjust height as needed */

  &:hover {
    border-color: #0CFFBB;

  &:focus {
    outline: none;
    border-color: #0CFFBB;
    box-shadow: 0 0 0 3px rgba(12, 255, 187, 0.5); /* focus:ring-blue-500 */
  }
`;

const Home: React.FC = () => {
    const navigate = useNavigate();
    return (
        <section className="scroll-smooth focus:scroll-auto">
            {/* Navigation Bar  */}
            <Header />
            {/* Main Content */}
            <div className="flex flex-col md:flex-row justify-between p-4 space-y-8 md:space-y-0 md:space-x-8 max-w-7xl mx-auto">
                <div className="w-full md:w-1/2 p-4">
                    <div className="text">
                        <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                            <span className="text-hex">Empowering</span> <span className="text-white">Innovation</span>
                        </h1>
                        <p className="my-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
                            Welcome to Plastal-Bot Builders! We're on a mission to transform technology education
                            in Zambia and beyond. Through our innovative robotics programs and hands-on learning
                            experiences, we're empowering young minds to become the tech leaders of tomorrow.
                            Whether you're a student passionate about coding, a teacher looking to bring robotics
                            to your classroom, or a parent seeking quality STEM education for your child,
                            you've come to the right place.
                        </p>
                        
                        <p className="mb-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
                            Our journey began with a simple belief: every young person deserves access to
                            quality technology education. Today, we're proud to offer comprehensive programs
                            in robotics, programming, and digital innovation. Through our partnerships with
                            schools, industry leaders, and tech communities, we're creating pathways for
                            students to turn their passion for technology into real-world opportunities.
                            Join us as we build the future of technology education in Africa.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-12">
                            <Button label="Become a Member" href="/membershipform" />
                            <Button label="Get Involved" href="/programs" />
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-2">
                    <div className="image mt-24">
                        <img alt="Empowering Innovation Image" height="200"
                            src="/resources/Illustrations/Data_extraction.svg"
                            width="800" className="w-full h-auto object-cover" />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6">
                <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                    <span className="text-hex">Innovating</span> <span className="text-white">Through Technology</span>
                </h1>
                
                {/* <!-- Section Introduction --> */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-hex mb-4">Empowering Zambia's Next Generation of Tech Leaders</h2>
                    
                    <p className="mb-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
                        At Plastal-Bot Builders, we're revolutionizing STEM education in Zambia through cutting-edge robotics 
                        and technology. Our innovative programs blend hands-on engineering experience with creative 
                        problem-solving, preparing young minds for the digital future.
                    </p>
                    
                    <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
                        We believe in learning by doing. Through our robotics workshops, coding bootcamps, and 
                        project-based learning initiatives, we're building a community of young innovators who are 
                        ready to tackle real-world challenges. Join us in shaping Zambia's technological future.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
                    {/* <!-- Large Block --> */}
                    <div className="col-span-1 md:col-span-2 md:row-span-2 mb-4">
                        {/* <!-- Image Carousel Container --> */}
                        <ImageCarousel />
                        <h1 className="mt-4 mb-8 text-2xl font-extrabold leading-none tracking-tight text-gray-300 md:text-3xl lg:text-3xl dark:text-white">
                            <span className="text-hex">Latest </span> Project Showcase
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg text-gray-100">
                            Our students recently completed an innovative robotics project focused on environmental monitoring. 
                            Using Arduino-based sensors and custom-built robots, they created a system to track air quality 
                            and water pollution levels in local communities. This project demonstrates how we're combining 
                            technical education with real-world problem solving.
                        </p>
                        <p className="mt-2 text-gray-100 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
                            The project not only enhanced our students' programming and engineering skills but also 
                            highlighted the potential of robotics in addressing environmental challenges. Through hands-on 
                            experience with sensors, data analysis, and robot construction, our students are developing 
                            solutions that could impact their communities.
                        </p>
                        <button 
                            className="mt-4 custom-button"
                            onClick={() => navigate('/project-details')} // This route doesn't exist
                        >
                            View Project Details
                        </button>
                    </div>
            
                    {/* <!-- Tall Block --> */}
                    <div className="col-span-1 md:row-span-2 flex justify-center items-center p-4 ">
                        <div className="text-center">
                            <img
                                src="/resources/Illustrations/Visionarytechnology.svg"
                                alt="Illustration of a visionary man"
                                className="w-full h-auto object-cover rounded-lg" 
                            />
                        </div>
                    </div>
            
                    {/* <!-- Small Block 1 - Mac Window Style --> */}
                    <div className="col-span-1 row-span-1 rounded-lg overflow-hidden bg-gray-800 shadow-xl">
                        {/* Window Controls */}
                        <div className="flex items-center space-x-2 p-3 bg-gray-900">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                    
                        {/* Content Container */}
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="w-full md:w-1/2">
                                <img src="/resources/illustrations/research.svg"
                                    alt="Students conducting research"
                                    className="w-full h-full object-cover p-2" />
                            </div>
                            <div className="w-full md:w-1/2 p-6">
                                <h1 className="break-words truncate mb-4 text-lg font-extrabold leading-none tracking-tight text-gray-300 md:text-base lg:text-base dark:text-white">
                                    <span className="text-hex">Research </span>Opportunities
                                </h1>
                                <p className="text-sm text-gray-100">
                                    Join our research programs in robotics, AI, and sustainable technology solutions.
                                </p>
                            </div>
                        </div>
                    </div>
            
                    {/* <!-- Small Block 2 - Mac Window Style --> */}
                    <div className="col-span-1 row-span-1 rounded-lg overflow-hidden bg-gray-800 shadow-xl">
                        {/* Window Controls */}
                        <div className="flex items-center space-x-2 p-3 bg-gray-900">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                    
                        {/* Content Container */}
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="w-full md:w-1/2">
                                <img src="/resources/illustrations/mentor.svg"
                                    alt="Mentorship session"
                                    className="w-full h-full object-cover p-2" />
                            </div>
                            <div className="w-full md:w-1/2 p-6">
                                <h1 className="break-words truncate mb-4 text-lg font-extrabold leading-none tracking-tight text-gray-300 md:text-base lg:text-base dark:text-white">
                                    <span className="text-hex">Mentorship </span>Program
                                </h1>
                                <p className="text-sm text-gray-100">
                                    Get guidance from industry experts and experienced tech professionals.
                                </p>
                            </div>
                        </div>
                    </div>
            
                    {/* <!-- Small Block 3 - Mac Window Style --> */}
                    <div className="col-span-1 row-span-1 rounded-lg overflow-hidden bg-gray-800 shadow-xl">
                        {/* Window Controls */}
                        <div className="flex items-center space-x-2 p-3 bg-gray-900">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                    
                        {/* Content Container */}
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="w-full md:w-1/2">
                                <img src="/resources/illustrations/team.svg"
                                    alt="Sponsorship event"
                                    className="w-full h-full object-cover p-2" />
                            </div>
                            <div className="w-full md:w-1/2 p-6">
                                <h1 className="break-words truncate mb-4 text-lg font-extrabold leading-none tracking-tight text-gray-300 md:text-base lg:text-base dark:text-white">
                                    <span className="text-hex">Partner </span>With Us
                                </h1>
                                <p className="text-sm text-gray-100">
                                    Support our mission to empower young tech innovators in Zambia.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between max-w-7xl mx-auto p-8 gap-8">
                {/* Innovation Section */}
                <div className="w-full md:w-1/2 flex flex-col">
                    <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                            <span className="text-hex">Fostering</span> <span className="text-white">Innovation</span>
                        </h1>
                    
                    <p className="text-gray-100 mb-8 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
                        At Plastal-Bot Builders, we empower young minds through practical technology 
                        education. Our hands-on approach combines robotics, programming, and creative 
                        problem-solving to develop the next generation of tech innovators in Zambia. 
                        Through our programs, students learn to build, code, and innovate while solving 
                        real-world challenges.
                    </p>
            
                    <img 
                        src="/resources/Illustrations/Cyborg-bro.svg"
                        alt="Robotics Innovation Illustration" 
                        className="w-4/5 h-auto mx-auto mt-auto" 
                    />
                </div>
            
                {/* Education Section */}
                <div className="w-full md:w-1/2 flex flex-col">
                    <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                        <span className="text-hex">Enhanicng</span> <span className="text-white">Education</span>
                    </h1>
            
                    <p className="text-gray-100 mb-8 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
                        Our innovative educational approach combines digital tools with hands-on 
                        experience. Through interactive workshops, project-based learning, and 
                        mentorship programs, we're making technology education accessible to all. 
                        Students gain practical skills in robotics, programming, and sustainable 
                        technology, preparing them for future careers in tech.
                    </p>
            
                    <img 
                        src="/resources/Illustrations/Mathematics-bro (1) 1.svg"
                        alt="Technology Education Illustration" 
                        className="w-4/5 h-auto mx-auto mt-auto" 
                    />
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6">
                <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                    <span className="text-hex">Discover Our</span> <span className="text-white">Impact</span>
                </h1>
                
                {/* <!-- Section Introduction --> */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-hex mb-4">Building Tomorrow's Tech Leaders Today</h2>
                    
                    <p className="text-white mb-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
                        At Plastal-Bot Builders, we're transforming education through innovative technology and hands-on learning. 
                        Our programs combine robotics, coding, and creative problem-solving to empower young minds across Zambia.
                    </p>
                    
                    <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg text-white">
                        From successful student projects to community outreach initiatives, explore how we're making technology 
                        education accessible, engaging, and impactful. Join us in our mission to create the next generation of 
                        tech innovators and change-makers in Africa.
                    </p>
                </div>
                {/* First Bento Box */}
                <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-2 gap-4">
                    {/* Large Block (2x2) */}
                    <div className="col-span-1 sm:col-span-2 row-span-2 pr-4">
                        <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-300 md:text-3xl lg:text-3xl dark:text-white">
                            <span className="text-hex">Empowering</span> Young <span className="text-hex">Innovators</span>
                        </h1>
                        <img
                            src="/resources/Photos/group.png"
                            alt="Students Learning Robotics"
                            className="w-full h-64 object-cover rounded-lg mb-4"
                        />
                        <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg text-gray-100">
                            At Plastal-Bot Builders, we're shaping the future of technology education in Zambia. 
                            Our innovative programs combine robotics, programming, and sustainable technology to 
                            create hands-on learning experiences that inspire the next generation of tech leaders.
                        </p>
                        <p className="mt-4 text-gray-100 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
                            Through our workshops and training programs, we've empowered hundreds of young minds 
                            with practical skills in robotics, coding, and digital innovation. Our approach focuses 
                            on real-world applications and problem-solving skills.
                        </p>
                        <div className="col-span-1 sm:col-span-2 row-span-2 pr-4 p-4 flex flex-col">
                        <button 
                            className="mt-auto custom-button"
                            onClick={() => navigate('/workshop-details')} // This route doesn't exist
                        >
                            Join Our Next Workshop
                        </button>
                           
                        </div>
                    </div>
                
                    {/* Small Block 1 */}
                    <div className="col-span-1 flex justify-center items-center p-4 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                        <div>
                            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-300 md:text-3xl lg:text-3xl dark:text-white flex justify-center items-center text-center">
                                <span className="text-hex">Tech</span> Training
                            </h1>
                            <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg text-gray-100">
                                Comprehensive courses in robotics, programming, and digital skills for all levels
                            </p>
                        </div>
                    </div>
                
                    {/* Small Block 2 */}
                    <div className="col-span-1 flex justify-center items-center p-4 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                        <div>
                            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-300 md:text-3xl lg:text-3xl dark:text-white flex justify-center items-center text-center">
                                <span className="text-hex">Innovation</span> Hub
                            </h1>
                            <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg text-gray-100">
                                A space where ideas come to life through hands-on projects and mentorship
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Second Bento Box */}
                <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-2 gap-4 mt-4">
                    {/* Small Block 1 (Top Left) */}
                    <div className="col-span-1 row-span-1 flex justify-center items-center p-4 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                        <div>
                            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-300 md:text-3xl lg:text-3xl dark:text-white flex justify-center items-center text-center">
                                <span className="text-hex">Youth</span> Programs
                            </h1>
                            <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg text-gray-100">
                                Specialized workshops and bootcamps designed for young tech enthusiasts aged 12-25
                            </p>
                        </div>
                    </div>
                
                    {/* Large Block (2x1) (Top Right) */}
                    <div className="col-span-1 sm:col-span-2 row-span-1">
                        <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-300 md:text-3xl lg:text-3xl dark:text-white">
                            <span className="text-hex">Our</span> Impact
                        </h1>
                        <img
                            src="/resources/Photos/dywen.jpg"
                            alt="Student Projects"
                            className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                        <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg text-gray-100">
                            Since our founding, we've trained over 500 students, launched 50+ successful projects, 
                            and partnered with leading tech companies to create opportunities for young innovators.
                        </p>
                        <button 
                            className="mt-4 custom-button"
                            onClick={() => navigate('/workshop-details')} // This route doesn't exist
                        >
                            Join Our Next Workshop
                        </button>
                    </div>
                
                    {/* Large Block (Bottom Left) (2x1) */}
                    <div className="mt-4 col-span-1 sm:col-span-2 row-span-1">
                        <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-300 md:text-3xl lg:text-3xl dark:text-white">
                            <span className="text-hex">Building</span> Tomorrow's <span className="text-hex">Leaders</span>
                        </h1>
                        <p className="mt-4 text-gray-100 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
                            Our comprehensive curriculum goes beyond technical skills. We focus on developing 
                            leadership, problem-solving, and entrepreneurial mindsets in our students.
                        </p>
                        <p className="mt-4 text-gray-100 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
                            Through partnerships with industry leaders and educational institutions, we create 
                            pathways for our graduates to access opportunities in the tech industry and higher education.
                        </p>
                    </div>
                
                    {/* Small Block 2 (Bottom Right) */}
                    <div className="mt-4 col-span-1 row-span-1 flex justify-center items-center p-4 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                        <div>
                            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-300 md:text-3xl lg:text-3xl dark:text-white flex justify-center items-center text-center">
                                <span className="text-hex">Join Us</span>
                            </h1>
                            <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg text-gray-100">
                                Begin your journey in tech innovation. Enroll in our upcoming programs and workshops.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-4">
                <div
                    className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-8">
                    <div className="w-full md:w-1/2 p-4">
                        <div className="text">
                            <h1
                                className="mb-6 text-4xl font-extrabold leading-none tracking-tight text-gray-300 md:text-5xl lg:text-6xl dark:text-white">
                                <span className="text-hex">Subscribe To Our</span>
                                <span
                                    className="text-gray-300"> Newsletter</span>
                            </h1>
                            <p className="my-4 text-gray-100 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
                                Stay connected with the latest in tech innovation and educational opportunities at Plastal-Bot Builders. 
                                Subscribe to our newsletter and be the first to know about:
                                • Upcoming workshops and bootcamps
                                • Success stories from our students
                                • New program launches
                                • Tech industry insights and trends
                                • Exclusive events and networking opportunities
                                
                                Join our growing community of tech enthusiasts and future innovators. Don't miss out on the chance 
                                to be part of Zambia's digital transformation journey.
                            </p>
                            <div
                                className="mt-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <div className="w-full sm:w-auto">
                                    <InputField
                                        id="large-input"
                                        type="text"
                                        placeholder="Enter your Email"
                                        required
                                    />
                                </div>
                                <button
                                    className="custom-button w-full sm:w-auto"> Send Email</button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 p-4">
                        <div className="image">
                            <img src="/resources/Illustrations/Subscriber1.svg"
                                alt="Introduction to Robotics" />
                        </div>
                    </div>
                </div>
            </div>
            <LogoCarousel />
            <Footer />
        </section>
    );
};

export default Home;
