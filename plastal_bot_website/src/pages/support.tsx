import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Support: React.FC = () => {
    return (
        <section className="scroll-smooth focus:scroll-auto">
            {/* Navigation Bar */}
            <Header />
            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-8">
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                {/* Section: Support Us */}
                <section className="mb-6">
                    <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                        <span className="text-hex"> Support<span className="text-white"> Us</span></span>
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="p-6 border-2 rounded-lg border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                            <h3 className="text-xl font-semibold mb-2">Donate</h3>
                            <div className="image">
                                <img alt="Empowering Innovation Image" height="200" src="/resources/Illustrations/Cyborg-bro.svg" width="800" className="w-full h-auto object-cover" />
                            </div>
                            <p className="text-gray-600">Support us by making a donation to help fund our initiatives and projects.</p>
                            <a href="#" className="text-white hover:text-[#0CFFBB] mt-4 block">More about donations →</a>
                        </div>
                        <div className="p-6 border-2 rounded-lg border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                            <h3 className="text-xl font-semibold mb-2">Sponsorship</h3>
                            <div className="image">
                                <img alt="Empowering Innovation Image" height="200" src="/resources/Illustrations/Cyborg-bro.svg" width="800" className="w-full h-auto object-cover" />
                            </div>
                            <p className="text-gray-600">Become a sponsor and support specific programs or events tailored to your interests.</p>
                            <a href="#" className="text-white hover:text-[#0CFFBB] mt-4 block">More about sponsorships →</a>
                        </div>
                        <div className="p-6 border-2 rounded-lg border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                            <h3 className="text-xl font-semibold mb-2">Fundraising</h3>
                            <div className="image">
                                <img alt="Empowering Innovation Image" height="200" src="/resources/Illustrations/Cyborg-bro.svg" width="800" className="w-full h-auto object-cover" />
                            </div>
                            <p className="text-gray-600">Organize fundraising events or campaigns to help us reach more people.</p>
                            <a href="#" className="text-white hover:text-[#0CFFBB] mt-4 block">More about fundraising →</a>
                        </div>
                    </div>
                </section>

                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

                {/* Section: Volunteer Opportunities */}
                <section className="mb-6">
                    <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                        <span className="text-hex"> Volunteer<span className="text-white"> Opportunities</span></span>
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="p-6 border-2 rounded-lg border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                            <h3 className="text-xl font-semibold mb-2">Mentorship</h3>
                            <div className="image">
                                <img alt="Empowering Innovation Image" height="200" src="/resources/Illustrations/Cyborg-bro.svg" width="800" className="w-full h-auto object-cover" />
                            </div>
                            <p className="text-gray-600">Become a mentor and help guide our youth in various technical and life skills.</p>
                            <a href="#" className="text-white hover:text-[#0CFFBB] mt-4 block">More about mentorship →</a>
                        </div>
                        <div className="p-6 border-2 rounded-lg border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                            <h3 className="text-xl font-semibold mb-2">Technical Support</h3>
                            <div className="image">
                                <img alt="Empowering Innovation Image" height="200" src="/resources/Illustrations/Cyborg-bro.svg" width="800" className="w-full h-auto object-cover" />
                            </div>
                            <p className="text-gray-600">Offer your expertise in technical areas like software development, electronics, or robotics.</p>
                            <a href="#" className="text-white hover:text-[#0CFFBB] mt-4 block">More about technical support →</a>
                        </div>
                        <div className="p-6 border-2 rounded-lg border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                            <h3 className="text-xl font-semibold mb-2">Event Coordination</h3>
                            <div className="image">
                                <img alt="Empowering Innovation Image" height="200" src="/resources/Illustrations/Cyborg-bro.svg" width="800" className="w-full h-auto object-cover" />
                            </div>
                            <p className="text-gray-600">Help organize and coordinate events like workshops and competitions.</p>
                            <a href="#" className="text-white hover:text-[#0CFFBB] mt-4 block">More about event coordination →</a>
                        </div>
                    </div>
                </section>

                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

                {/* Section: Partnerships */}
                <section className="mb-6">
                    <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                        <span className="text-hex"> Collaborative <span className="text-white"> Partnership</span></span>
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="p-6 border-2 rounded-lg border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                            <h3 className="text-xl font-semibold mb-2">Corporate Partnerships</h3>
                            <div className="image">
                                <img alt="Empowering Innovation Image" height="200" src="/resources/Illustrations/Cyborg-bro.svg" width="800" className="w-full h-auto object-cover" />
                            </div>
                            <p className="text-gray-600">Collaborate with us on large-scale projects or sponsor key events.</p>
                            <a href="#" className="text-white hover:text-[#0CFFBB] mt-4 block">More about corporate partnerships →</a>
                        </div>
                        <div className="p-6 border-2 rounded-lg border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                            <h3 className="text-xl font-semibold mb-2">Educational Institutions</h3>
                            <div className="image">
                                <img alt="Empowering Innovation Image" height="200" src="/resources/Illustrations/Cyborg-bro.svg" width="800" className="w-full h-auto object-cover" />
                            </div>
                            <p className="text-gray-600">Partner with us to bring educational programs to students and communities.</p>
                            <a href="#" className="text-white hover:text-[#0CFFBB] mt-4 block">More about educational partnerships →</a>
                        </div>
                        <div className="p-6 border-2 rounded-lg border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                            <h3 className="text-xl font-semibold mb-2">Nonprofits</h3>
                            <div className="image">
                                <img alt="Empowering Innovation Image" height="200" src="/resources/Illustrations/Cyborg-bro.svg" width="800" className="w-full h-auto object-cover" />
                            </div>
                            <p className="text-gray-600">Work with us to address pressing local issues through joint initiatives.</p>
                            <a href="#" className="text-white hover:text-[#0CFFBB] mt-4 block">More about nonprofit partnerships →</a>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </section>
    );
};

export default Support;