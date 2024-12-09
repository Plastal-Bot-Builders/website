import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';


const Programs: React.FC = () => {
    interface Tool {
        icon: string | null;
        containerStyle?: {
          display: string;
          flexDirection: string;
          alignItems: string;
          gap: string;
        };
    }
    const days = [
        {
            day: "Day 1",
            title: "Introduction to Robotics & Electronics",
            topics: ["Robotics fundamentals", "Basic electronics", "Circuit simulation", "TinkerCad hands-on"],
            tools: [
                {   
                    icon: "/resources/Icons/tinkercad.svg", 
                    containerStyle: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px"
                    }
                },
                {    
                    icon: "/resources/Icons/arduino.svg", 
                    containerStyle: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px"
                    }
                },
                {    
                    icon: "/resources/Icons/RaspberryPi.svg", 
                    containerStyle: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px"
                    }
                },
                {   
                    icon: "/resources/Icons/esp32.svg",
                    containerStyle: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px"
                    }
                },
            ]
        },
        {
            day: "Day 2",
            title: "CAD Modeling and Prototyping",
            topics: ["CAD basics", "Robot component design", "3D modeling", "Assembly techniques"],
            tools: [
                {    
                    icon: "/resources/Icons/tinkercad.svg", 
                    containerStyle: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px"
                    } 
                },
                {    
                    icon: "/resources/Icons/Fusion360.svg",  
                    containerStyle: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px"
                    }
                }
            ]
        },
        {
            day: "Day 3",
            title: "Programming & AI Fundamentals",
            topics: ["Python basics", "Machine Learning intro", "Arduino programming", "AI concepts"],
            tools: [
                {    
                    icon: "/resources/Icons/tinkercad.svg", 
                    containerStyle: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px"
                    } 
                },
                {   
                    icon: "/resources/Icons/tensorflow.svg",  
                    containerStyle: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px"
                    }
                },
                {    
                    icon: "/resources/Icons/googlecolab.svg", 
                    containerStyle: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px"
                    }
                }
            ]
        },
        {
            day: "Day 4",
            title: "Advanced Robotics & Automation",
            topics: ["Computer Vision", "ROS2 basics", "Robot navigation", "Automation"],
            tools: [
                {   
                    icon: "/resources/Icons/tinkercad.svg",
                    containerStyle: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px"
                    }
                },
                {    
                    icon: "/resources/Icons/yolo.svg",
                    containerStyle: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px"
                    }
                },
                {  
                    icon: "/resources/Icons/Ros.svg",
                    containerStyle: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px"
                    }
                },
                {   
                    icon: "/resources/Icons/Gazebo.svg",
                    containerStyle: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px"
                    }
                }
            ]
        },
        {
            day: "Day 5",
            title: "Project Development & Showcase",
            topics: ["Group projects", "Project presentation", "LiveA demos", "Certificate ceremony"],
            tools: [
                { name: "All previous tools", icon: null }
            ]
        }
    ];

    return (
        <section className="scroll-smooth focus:scroll-auto">
            <Header />
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-1/2">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            <span className="text-hex">Plastal-Bot</span> 5-Day Robotics & AI Bootcamp
                        </h1>
                        <p className="text-gray-300 mb-6 text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
                            Experience an intensive hands-on journey into robotics and AI. Master essential tools 
                            like TinkerCad, Fusion 360, ROS2, and more while building real-world projects.
                        </p>
                        <Button label="Register Now" href="/membershipform" />
                    </div>
                    <div className="w-full md:w-1/2">
                        <img src="/resources/GIF/Robotarm.gif" alt="Bootcamp" className="w-full"/>
                    </div>
                </div>
            </div>
            {/* Daily Schedule */}           
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-white mb-8">Daily Schedule</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead className="sticky top-0 bg-gray-800">
                            <tr className="text-left">
                                <th className="p-4 text-white font-bold border-b border-gray-700">Day & Title</th>
                                <th className="p-4 text-white font-bold border-b border-gray-700">Topics</th>
                                <th className="p-4 text-white font-bold border-b border-gray-700">Tools</th>
                            </tr>
                        </thead>
                        <tbody>
                            {days.map((day, index) => (
                                <tr 
                                    key={index} 
                                    className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
                                >
                                    <td className="p-4">
                                        <h3 className="text-hex text-xl font-bold">{day.day}</h3>
                                        <p className="text-white font-medium">{day.title}</p>
                                    </td>
                                    <td className="p-4">
                                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                                            {day.topics.map((topic, i) => (
                                                <li key={i}>{topic}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-gray-400 mb-2">Tools:</p>
                                        <div className="flex flex-wrap gap-3">
                                            {day.tools.map((tool, i) => (
                                                tool.icon ? (
                                                    <img 
                                                        key={i} 
                                                        src={tool.icon} 
                                                        alt="Tool icon" 
                                                        className="w-8 h-8 hover:scale-110 transition-transform"
                                                    />
                                                ) : null
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>           
            {/* Key Takeaways */}
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
            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-4 text-center mb-4">
                <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">
                    Limited spots available. Secure your place in this transformative 
                    5-day bootcamp and take your first step into the world of robotics and AI.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                    <Button label="Register Now" href="/membershipform" />
                    <Button label="Download Syllabus" href="#" />
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default Programs;