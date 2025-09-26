import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaDonate, FaHandsHelping, FaRegHandshake, FaChalkboardTeacher, FaTools, FaCalendarAlt, FaBuilding, FaGraduationCap } from 'react-icons/fa';
import ReusableModal from '../components/ReusableModal';
import { Button } from 'flowbite-react'; 
import ThemedImage from '../theme/ThemedImage';


const Support: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState<string | undefined>(undefined);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);

    const toggleModal = (image?: string, content?: React.ReactNode) => {
        setModalImage(image);
        setModalContent(content);
        setIsModalOpen(!isModalOpen);
    };

    return (
        <section className="scroll-smooth focus:scroll-auto">
            {/* Navigation Bar */}
            <Header />
            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-8">

                {/* Section: Support Us */}
                
                <section className="mb-6">
                    <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight title">
                        <span className="text-hex"> Support<span className="text-current"> Us</span></span>
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="p-6 border-2 rounded-lg border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                            <div className="image">
                                <ThemedImage
                                    alt="Empowering Innovation Image" 
                                    src="resources/Illustrations/donations.svg" 
                                    className="w-full h-auto object-cover" 
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 mt-4"><FaDonate className="inline-block mr-2" /> Donate</h3>
                            <p className="text-gray text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">Support us by making a donation to help fund our initiatives and projects.</p>
                            <button onClick={() => toggleModal('/resources/Illustrations/donations.svg', <p> Support us by making a donation to help fund our initiatives and projects. Your contributions make a significant impact on our ability to achieve our goals.</p>)} className="text-white hover:text-[#0CFFBB] mt-4 block"> 
                                More about donations →
                            </button>
                        </div>
                        <div className="p-6 border-2 rounded-lg border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                            <div className="image">
                                <ThemedImage
                                    alt="Empowering Innovation Image"  
                                    src="resources/Illustrations/Sponsorship.svg"                           
                                    className="w-full h-auto object-cover" 
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 mt-4"><FaRegHandshake className="inline-block mr-2" /> Sponsorship</h3>
                            <p className="text-gray text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">Become a sponsor and support specific programs or events tailored to your interests.</p>
                            <button onClick={() => toggleModal('/resources/Illustrations/Sponsorship.svg', <p>Become a sponsor and support specific programs or events tailored to your interests. Your sponsorship helps us reach more people and make a greater impact.</p>)} className="text-white hover:text-[#0CFFBB] mt-4 block">More about sponsorships →</button>
                        </div>
                        <div className="p-6 border-2 rounded-lg border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                            <div className="image">
                                <ThemedImage 
                                    alt="Empowering Innovation Image" 
                                    src="resources/Illustrations/Fundraising.svg" 
                                    className="w-full h-auto object-cover" 
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 mt-4"><FaCalendarAlt className="inline-block mr-2" /> Fundraising</h3>
                            <p className="text-gray text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">Organize fundraising events or campaigns to help us reach more people.</p>
                            <button onClick={() => toggleModal('/resources/Illustrations/Fundraising.svg', <p>Organize fundraising events or campaigns to help us reach more people. Your efforts in fundraising make a significant difference in our ability to achieve our goals.</p>)} className="text-white hover:text-[#0CFFBB] mt-4 block">More about fundraising →</button>
                        </div>
                    </div>
                </section>                

                {/* Section: Volunteer Opportunities */}
                
                <section className="mb-6">
                    <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight title">
                        <span className="text-hex"> Volunteer<span className="text-current"> Opportunities</span></span>
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="p-6 border-2 rounded-lg border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                            <div className="image">
                                <ThemedImage 
                                    alt="Empowering Innovation Image" 
                                    src="resources/Illustrations/Mentorship.svg" 
                                    className="w-full h-auto object-cover" 
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 mt-4"><FaChalkboardTeacher className="inline-block mr-2" /> Mentorship</h3>
                            <p className="text-gray text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">Become a mentor and help guide our youth in various technical and life skills.</p>
                            <div className="mb-4 flex items-center space-x-4">
                                <button onClick={() => toggleModal('/resources/Illustrations/Mentorship.svg', <p>Become a mentor and help guide our youth in various technical and life skills. Your mentorship can make a lasting impact on the lives of young people.</p>)} className="text-white hover:text-[#0CFFBB] mt-4 block">More about mentorship →</button>
                            </div>
                        </div>
                        <div className="p-6 border-2 rounded-lg border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                            <div className="image">
                                <ThemedImage 
                                    alt="Empowering Innovation Image" 
                                    src="resources/Illustrations/Support.svg" 
                                    className="w-full h-auto object-cover" 
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 mt-4"><FaTools className="inline-block mr-2" /> Technical Support</h3>
                            <p className="text-gray text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">Offer your expertise in technical areas like software development, electronics, or robotics.</p>
                            <div className="mb-4 flex items-center space-x-4">
                                <button onClick={() => toggleModal('/resources/Illustrations/Support.svg', <p>Offer your expertise in technical areas like software development, electronics, or robotics. Your technical support can help us achieve our goals more effectively.</p>)} className="text-white hover:text-[#0CFFBB] mt-4 block">More about technical support →</button>
                            </div>
                        </div>
                        <div className="p-6 border-2 rounded-lg border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                            <div className="image">
                                <ThemedImage 
                                    alt="Empowering Innovation Image" 
                                    src="resources/Illustrations/Eventplan.svg"
                                    className="w-full h-auto object-cover" 
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 mt-4"><FaCalendarAlt className="inline-block mr-2" /> Event Coordination</h3>
                            <p className="text-gray text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">Help organize and coordinate events like workshops and competitions.</p>
                            <div className="mb-4 flex items-center space-x-4">
                                <button onClick={() => toggleModal('/resources/Illustrations/Eventplan.svg', <p>Help organize and coordinate events like workshops and competitions. Your event coordination skills can help us create impactful and successful events.</p>)} className="text-white hover:text-[#0CFFBB] mt-4 block">More about event coordination →</button>
                            </div>
                        </div>
                    </div>
                </section>              

                {/* Section: Partnerships */}
               
                <section className="mb-6">
                    <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight title">
                        <span className="text-hex"> Collaborative <span className="text-current"> Partnership</span></span>
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="p-6 border-2 rounded-lg border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                            <div className="image">
                                <ThemedImage 
                                    alt="Empowering Innovation Image" 
                                    src="resources/Illustrations/Partnerships.svg" 
                                    className="w-full h-auto object-cover" 
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 mt-4"><FaBuilding className="inline-block mr-2" /> Corporate Partnerships</h3>
                            <p className="text-gray text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">Collaborate with us on large-scale projects or sponsor key events.</p>
                            <button onClick={() => toggleModal('/resources/Illustrations/Partnerships.svg', <p>Collaborate with us on large-scale projects or sponsor key events. Your corporate partnership can help us achieve our goals and make a significant impact.</p>)} className="text-white hover:text-[#0CFFBB] mt-4 block">More about corporate partnerships →</button>
                        </div>
                        <div className="p-6 border-2 rounded-lg border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                            <div className="image">
                                <ThemedImage 
                                    alt="Empowering Innovation Image" 
                                    src="resources/Illustrations/Education.svg" 
                                    className="w-full h-auto object-cover" 
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 mt-4"><FaGraduationCap className="inline-block mr-2" /> Educational Institutions</h3>
                            <p className="text-gray text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">Partner with us to bring educational programs to students and communities.</p>
                            <button onClick={() => toggleModal('/resources/Illustrations/Education.svg', <p>Partner with us to bring educational programs to students and communities. Your collaboration with educational institutions can help us reach more students and make a greater impact.</p>)} className="text-white hover:text-[#0CFFBB] mt-4 block">More about educational partnerships →</button>
                        </div>
                        <div className="p-6 border-2 rounded-lg border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                            <div className="image">
                                <ThemedImage 
                                    alt="Empowering Innovation Image" 
                                    src="resources/Illustrations/Nonprofit.svg" 
                                    className="w-full h-auto object-cover" 
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 mt-4"><FaHandsHelping className="inline-block mr-2" /> Nonprofits</h3>
                            <p className="text-gray text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg">Work with us to address pressing local issues through joint initiatives.</p>
                            <button onClick={() => toggleModal('/resources/Illustrations/Nonprofit.svg', <p>Work with us to address pressing local issues through joint initiatives. Your collaboration with nonprofits can help us create meaningful and impactful projects.</p>)} className="text-white hover:text-[#0CFFBB] mt-4 block">More about nonprofit partnerships →</button>
                        </div>
                    </div>
                </section>              
            </div>
            <Footer />

            {/* Reusable Modal */}
            <ReusableModal
                isOpen={isModalOpen}
                onClose={() => toggleModal()}
                title="More about donations"
                image={modalImage} // Pass the image URL
                content={modalContent} // Pass the content
                actions={
                    <>
                        <Button onClick={() => toggleModal()} className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                            Close
                        </Button>
                    </>
                }
            />
        </section>
    );
};

export default Support;