import React, { useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { FaDonate, FaHandsHelping, FaRegHandshake, FaChalkboardTeacher, FaTools, FaCalendarAlt, FaBuilding, FaGraduationCap } from 'react-icons/fa';
import ReusableModal from '../components/ReusableModal';
import { Button } from 'flowbite-react';
import ThemedImage from '../theme/ThemedImage';
import { SEOConfig } from '../components/SEO';
import FadeContent from '../components/ui/FadeContent';

const Support: React.FC = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState<string | undefined>(undefined);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);
    const [modalTitle, setModalTitle] = useState<string>('More Information');
    const toggleModal = (image?: string, content?: React.ReactNode, title?: string) => {
        if (image) setModalImage(image);
        if (content) setModalContent(content);
        if (title) setModalTitle(title);
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <SEOConfig
                title="About | Plastal-Bot Builders"
                description="Learn more about Plastal-Bot Builders, our mission, and the team behind our innovative programs."
                image="/resources/Photos/fredmpelembe.jpeg"
            />
            <section className="scroll-smooth focus:scroll-auto">
                {/* Navigation Bar */}
                <Header />
                {/* Main Content */}
                <div className="max-w-7xl mx-auto p-8">
                    {/* Section: Support Us */}
                    <section className="mb-16">
                        <h1 className="mb-8 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight title">
                            <span className="text-hex">Support</span> Us
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Donate Card */}
                            <div className="p-6 border border-surface-border rounded-lg interactive-card flex flex-col h-full">
                                <div className="flex-grow">
                                    <div className="image mb-4">
                                        <ThemedImage
                                            alt="Donations Illustration"
                                            src="resources/Illustrations/donations.svg"
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        {FaDonate({ className: "inline-block mr-2" })} Donate
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-300 text-sm sm:text-base">
                                        Support us by making a donation to help fund our initiatives and projects.
                                    </p>
                                </div>
                                <button
                                    onClick={() => navigate('/support/donations')}
                                    className="text-current hover:text-accent mt-auto pt-4 block"
                                >
                                    More about donations →
                                </button>
                            </div>
                            {/* Sponsorship Card */}
                            <div className="p-6 border border-surface-border rounded-lg interactive-card flex flex-col h-full">
                                <div className="flex-grow">
                                    <div className="image mb-4">
                                        <ThemedImage
                                            alt="Sponsorship Illustration"
                                            src="resources/Illustrations/Sponsorship.svg"
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        {FaRegHandshake({ className: "inline-block mr-2" })} Sponsorship
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-300 text-sm sm:text-base">
                                        Become a sponsor and support specific programs or events tailored to your interests.
                                    </p>
                                </div>
                                <button
                                    onClick={() => navigate('/support/sponsorships')}
                                    className="text-current hover:text-accent mt-auto pt-4 block"
                                >
                                    More about sponsorships →
                                </button>
                            </div>
                            {/* Fundraising Card */}
                            <div className="p-6 border border-surface-border rounded-lg interactive-card flex flex-col h-full">
                                <div className="flex-grow">
                                    <div className="image mb-4">
                                        <ThemedImage
                                            alt="Fundraising Illustration"
                                            src="resources/Illustrations/Fundraising.svg"
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        {FaCalendarAlt({ className: "inline-block mr-2" })} Fundraising
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-300 text-sm sm:text-base">
                                        Organize fundraising events or campaigns to help us reach more people.
                                    </p>
                                </div>

                                <button
                                    onClick={() => navigate('/support/fundraising')}
                                    className="text-current hover:text-accent mt-auto pt-4 block"
                                >
                                    More about fundraising →
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Section: Volunteer Opportunities */}
                    <section className="mb-16">
                        <h1 className="mb-8 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight title">
                            <span className="text-hex">Volunteer</span> Opportunities
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Mentorship Card */}
                            <div className="p-6 border border-surface-border rounded-lg interactive-card flex flex-col h-full">
                                <div className="flex-grow">
                                    <div className="image mb-4">
                                        <ThemedImage
                                            alt="Mentorship Illustration"
                                            src="resources/Illustrations/Mentorship.svg"
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        {FaChalkboardTeacher({ className: "inline-block mr-2" })} Mentorship
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-300 text-sm sm:text-base">
                                        Become a mentor and help guide our youth in various technical and life skills.
                                    </p>
                                </div>

                                <button
                                    onClick={() => navigate('/support/mentorship')}
                                    className="text-current hover:text-accent mt-auto pt-4 block"
                                >
                                    More about mentorship →
                                </button>
                            </div>

                            {/* Technical Support Card */}
                            <div className="p-6 border border-surface-border rounded-lg interactive-card flex flex-col h-full">
                                <div className="flex-grow">
                                    <div className="image mb-4">
                                        <ThemedImage
                                            alt="Technical Support Illustration"
                                            src="resources/Illustrations/Support.svg"
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        {FaTools({ className: "inline-block mr-2" })} Technical Support
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-300 text-sm sm:text-base">
                                        Offer your expertise in technical areas like software development, electronics, or robotics.
                                    </p>
                                </div>
                                <button
                                    onClick={() => navigate('/support/technical-support')}
                                    className="text-current hover:text-accent mt-auto pt-4 block"
                                >
                                    More about technical support →
                                </button>
                            </div>

                            {/* Event Coordination Card */}
                            <div className="p-6 border border-surface-border rounded-lg interactive-card flex flex-col h-full">
                                <div className="flex-grow">
                                    <div className="image mb-4">
                                        <ThemedImage
                                            alt="Event Planning Illustration"
                                            src="resources/Illustrations/Eventplan.svg"
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        {FaCalendarAlt({ className: "inline-block mr-2" })} Event Coordination
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-300 text-sm sm:text-base">
                                        Help organize and coordinate events like workshops and competitions.
                                    </p>
                                </div>
                                <button
                                    onClick={() => navigate('/support/event-coordination')}
                                    className="text-current hover:text-accent mt-auto pt-4 block"
                                >
                                    More about event coordination →
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Section: Partnerships */}
                    <section className="mb-16">
                        <h1 className="mb-8 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight title">
                            <span className="text-hex">Collaborative</span> Partnership
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Corporate Partnerships Card */}
                            <div className="p-6 border border-surface-border rounded-lg interactive-card flex flex-col h-full">
                                <div className="flex-grow">
                                    <div className="image mb-4">
                                        <ThemedImage
                                            alt="Corporate Partnerships Illustration"
                                            src="resources/Illustrations/Partnerships.svg"
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        {FaBuilding({ className: "inline-block mr-2" })} Corporate Partnerships
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-300 text-sm sm:text-base">
                                        Collaborate with us on large-scale projects or sponsor key events.
                                    </p>
                                </div>
                                <button
                                    onClick={() => navigate('/support/corporate-partnerships')}
                                    className="text-current hover:text-accent mt-auto pt-4 block"
                                >
                                    More about corporate partnerships →
                                </button>
                            </div>

                            {/* Educational Institutions Card */}
                            <div className="p-6 border border-surface-border rounded-lg interactive-card flex flex-col h-full">
                                <div className="flex-grow">
                                    <div className="image mb-4">
                                        <ThemedImage
                                            alt="Educational Institutions Illustration"
                                            src="resources/Illustrations/Education.svg"
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        {FaGraduationCap({ className: "inline-block mr-2" })} Educational Institutions
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-300 text-sm sm:text-base">
                                        Partner with us to bring educational programs to students and communities.
                                    </p>
                                </div>
                                <button
                                    onClick={() => navigate('/support/educational-institutions')}
                                    className="text-current hover:text-accent mt-auto pt-4 block"
                                >
                                    More about educational partnerships →
                                </button>
                            </div>

                            {/* Nonprofits Card */}
                            <div className="p-6 border border-surface-border rounded-lg interactive-card flex flex-col h-full">
                                <div className="flex-grow">
                                    <div className="image mb-4">
                                        <ThemedImage
                                            alt="Nonprofits Illustration"
                                            src="resources/Illustrations/Nonprofit.svg"
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        {FaHandsHelping({ className: "inline-block mr-2" })} Nonprofits
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-300 text-sm sm:text-base">
                                        Work with us to address pressing local issues through joint initiatives.
                                    </p>
                                </div>
                                <button
                                    onClick={() => navigate('/support/nonprofits')}
                                    className="text-current hover:text-accent mt-auto pt-4 block"
                                >
                                    More about nonprofit partnerships →
                                </button>
                            </div>
                        </div>
                    </section>
                </div>

                <Footer />

                {/* Reusable Modal */}
                <ReusableModal
                    isOpen={isModalOpen}
                    onClose={() => toggleModal()}
                    title={modalTitle}
                    image={modalImage}
                    content={modalContent}
                    actions={
                        <>
                            <Button
                                onClick={() => toggleModal()}
                                className="bg-btn-bg text-btn-text hover:bg-btn-hover-bg focus:ring-4 focus:outline-none focus:ring-focus-ring font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                            >
                                Close
                            </Button>
                        </>
                    }
                />
            </section>
        </>
    );
};

export default Support;