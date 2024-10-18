import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Projects: React.FC = () => {
    return (
    <section className="scroll-smooth focus:scroll-auto">
        {/* Navigation Bar */}
        <Header />
        {/* Main Content */}
        <div className="max-w-7xl mx-auto p-8">
            <h1
            className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
            <span className="text-hex "> Innovation<span
                    className="text-white"> Projects </span></span>
            </h1>
            {/* <!-- Projects Page Grid Layout --> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                {/* Face-Recognition Home Security System */}
                <div className="p-6 rounded-lg  border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                    <h2 className="text-2xl font-bold mb-4">Face-Recognition Home Security System</h2>
                    <p className="mb-4">This project enhances home security using face-recognition technology. It uses a Raspberry Pi and OpenCV for real-time detection, offering a smart solution for home safety.</p>
                    <div className="image">
                        <img alt="Empowering Innovation Image" height="200"
                            src="/resources/Illustrations/Deconstructedrobot.svg" width="800"
                            className="w-full h-auto object-cover" />
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Project Overview:</h3>
                        <p className="mb-4">Built to recognize faces and notify homeowners of visitors or intruders. It's designed for low-cost implementation in Zambian households.</p>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Media:</h3>
                        <a href="#" className="text-blue-500 hover:underline">Watch project video</a> | 
                        <a href="#" className="text-blue-500 hover:underline">View photos</a>
                    </div>
                </div>

                {/* <!-- Waste Management Robotics & Sustainability --> */}
                <div className="p-6  border-2 rounded-lg border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                    <h2 className="text-2xl font-bold mb-4">Robotics for Waste Management & Sustainability</h2>
                    <p className="mb-4 ">This project merges robotics and sustainability to address urban waste management. Autonomous robots are used to efficiently sort waste, promoting recycling and environmental conservation.</p>
                    <div className="image">
                        <img alt="Empowering Innovation Image" height="200"
                            src="/resources/Illustrations/Deconstructedrobot.svg" width="800"
                            className="w-full h-auto object-cover" />
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Project Highlights:</h3>
                        <p className="mb-4">Deployed in public areas, these robots help reduce manual labor and promote efficient waste sorting in urban settings, leading to a cleaner environment.</p>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Media:</h3>
                        <a href="#" className="text-blue-500 hover:underline">Watch the robots in action</a> | 
                        <a href="#" className="text-blue-500 hover:underline">View project photos</a>
                    </div>
                </div>

                {/* <!-- Placeholder for Future Projects --> */}
                <div className="p-6  border-2 rounded-lg border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                    <h2 className="text-2xl font-bold mb-4">Future Innovation Projects</h2>
                    <p className="mb-4">We are constantly working on new ways to use robotics, AI, and sustainable technology to solve real-world problems. Stay tuned for updates on upcoming projects focused on education, sustainability, and more.</p>
                    <div className="image">
                        <img alt="Empowering Innovation Image" height="200"
                            src="/resources/Illustrations/Deconstructedrobot.svg" width="800"
                            className="w-full h-auto object-cover" />
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Get Involved:</h3>
                        <a href="#" className="text-blue-500 hover:underline">Join our innovation team</a> | 
                        <a href="#" className="text-blue-500 hover:underline">Contact us for partnerships</a>
                    </div>
                </div>

                {/* <!-- Testimonials or More Projects --> */}
                <div className="p-6  border-2 rounded-lg border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                    <h2 className="text-2xl font-bold mb-4">Project Testimonials</h2>
                    <p className="mb-4 ">"The face-recognition system is a breakthrough in home security, providing us peace of mind knowing our home is monitored." – Jonathan S.</p>
                    <p className="">"The waste management robots have transformed the way we manage waste in our community." – Lisa M.</p>
                    <div className="image">
                        <img alt="Empowering Innovation Image" height="200"
                            src="/resources/Illustrations/Deconstructedrobot.svg" width="800"
                            className="w-full h-auto object-cover" />
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Explore More:</h3>
                        <a href="#" className="text-blue-500 hover:underline">Read more testimonials</a> | 
                        <a href="#" className="text-blue-500 hover:underline">See more projects</a>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </section>
    );
};

export default Projects;
