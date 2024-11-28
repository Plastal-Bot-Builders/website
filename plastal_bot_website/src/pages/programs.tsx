import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollAnimation from '../components/ScrollAnimation/ScrollAnimation';
import Button from '../components/Button';

const Programs: React.FC = () => {
    return (
        <section className="scroll-smooth focus:scroll-auto">
            <Header />

            {/* Hero Section */}
            <ScrollAnimation>
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-full md:w-1/2">
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                                <span className="text-hex">Plastal-Bot</span> 5-Day Robotics & AI Bootcamp
                            </h1>
                            <p className="text-gray-300 mb-6">
                                Experience an intensive hands-on journey into robotics and AI. Master essential tools 
                                like TinkerCad, Fusion 360, ROS2, and more while building real-world projects.
                            </p>
                            <Button label="Register Now" href="/membershipform" />
                        </div>
                        <div className="w-full md:w-1/2">
                            <img src="/resources/Illustrations/robotics_bootcamp.svg" alt="Bootcamp" className="w-full"/>
                        </div>
                    </div>
                </div>
            </ScrollAnimation>

            {/* Daily Schedule */}
            <ScrollAnimation>
                <div className="bg-gray-900 py-16">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-white mb-8">Daily Schedule</h2>
                        <div className="space-y-6">
                            {[
                                {
                                    day: "Day 1",
                                    title: "Introduction to Robotics & Electronics",
                                    topics: ["Robotics fundamentals", "Basic electronics", "Circuit simulation", "TinkerCad hands-on"],
                                    tools: ["TinkerCad", "Arduino IDE"]
                                },
                                {
                                    day: "Day 2",
                                    title: "CAD Modeling and Prototyping",
                                    topics: ["CAD basics", "Robot component design", "3D modeling", "Assembly techniques"],
                                    tools: ["Fusion 360", "TinkerCad"]
                                },
                                {
                                    day: "Day 3",
                                    title: "Programming & AI Fundamentals",
                                    topics: ["Python basics", "Machine Learning intro", "Arduino programming", "AI concepts"],
                                    tools: ["Python", "TensorFlow", "Google Colab"]
                                },
                                {
                                    day: "Day 4",
                                    title: "Advanced Robotics & Automation",
                                    topics: ["Computer Vision", "ROS2 basics", "Robot navigation", "Automation"],
                                    tools: ["OpenCV", "ROS2", "Gazebo"]
                                },
                                {
                                    day: "Day 5",
                                    title: "Project Development & Showcase",
                                    topics: ["Group projects", "Project presentation", "Live demos", "Certificate ceremony"],
                                    tools: ["All previous tools"]
                                }
                            ].map((day, index) => (
                                <div key={index} className="p-6 border-2 border-gray-300 hover:border-[#0CFFBB] rounded-lg transition-all">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="md:w-1/4">
                                            <h3 className="text-hex text-xl font-bold">{day.day}</h3>
                                            <p className="text-white font-medium">{day.title}</p>
                                        </div>
                                        <div className="md:w-2/4">
                                            <ul className="list-disc list-inside text-gray-300 space-y-2">
                                                {day.topics.map((topic, i) => (
                                                    <li key={i}>{topic}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="md:w-1/4">
                                            <p className="text-gray-400">Tools:</p>
                                            <p className="text-hex">{day.tools.join(", ")}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollAnimation>

            {/* Key Takeaways */}
            <ScrollAnimation>
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <h2 className="text-3xl font-bold text-white mb-8">What You'll Learn</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Practical Skills",
                                desc: "Hands-on experience with industry-standard tools and technologies"
                            },
                            {
                                title: "Project Experience",
                                desc: "Complete a real-world robotics project from concept to implementation"
                            },
                            {
                                title: "Technical Knowledge",
                                desc: "Master fundamentals of robotics, electronics, and AI integration"
                            },
                            {
                                title: "Career Growth",
                                desc: "Certificate and portfolio piece to showcase your capabilities"
                            }
                        ].map((item, index) => (
                            <div key={index} className="p-6 border-2 border-gray-300 hover:border-[#0CFFBB] rounded-lg transition-all">
                                <h3 className="text-hex text-xl font-bold mb-4">{item.title}</h3>
                                <p className="text-gray-300">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollAnimation>

            {/* CTA Section */}
            <ScrollAnimation>
                <div className="bg-gray-900 py-16">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                            Limited spots available. Secure your place in this transformative 
                            5-day bootcamp and take your first step into the world of robotics and AI.
                        </p>
                        <div className="space-x-4">
                            <Button label="Register Now" href="/membershipform" />
                            <Button label="Download Syllabus" href="#" />
                        </div>
                    </div>
                </div>
            </ScrollAnimation>

            <Footer />
        </section>
    );
};

export default Programs;