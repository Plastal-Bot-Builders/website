import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { FaRegHandshake, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import ThemedImage from '../../theme/ThemedImage';

const SponsorshipsPage: React.FC = () => {
    return (
        <section>
            <Header />
            
            <div className="max-w-4xl mx-auto px-4 py-12">
                <Link to="/support" className="inline-flex items-center text-accent hover:text-accent-hover mb-6">
                    {FaArrowLeft {(className:"mr-2"})} Back to Support
                </Link>
                
                <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
                    <div className="md:w-1/3">
                        <ThemedImage
                            src="resources/Illustrations/Sponsorship.svg"
                            alt="Sponsorships"
                            className="w-full rounded-lg"
                        />
                    </div>
                    
                    <div className="md:w-2/3">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            <FaRegHandshake className="inline-block mr-3" />
                            Sponsorship Opportunities
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Partner with us to create meaningful impact while gaining visibility for your brand.
                        </p>
                    </div>
                </div>
                
                <div className="prose dark:prose-invert max-w-none mb-12">
                    <h2>Why Sponsor Plastal-Bot Builders?</h2>
                    <p>
                        Sponsoring our programs and events provides your organization with a unique opportunity to connect with 
                        the next generation of innovators and technologists. Your support helps us expand our reach while giving 
                        your brand visibility among technology enthusiasts, educators, and young people interested in STEM.
                    </p>
                    
                    <h3>Benefits of Sponsorship:</h3>
                    <ul>
                        <li><strong>Brand Visibility</strong> - Your logo and name featured at events and on materials</li>
                        <li><strong>Community Engagement</strong> - Connect directly with participants and their families</li>
                        <li><strong>CSR Goals</strong> - Meet corporate social responsibility objectives</li>
                        <li><strong>Talent Pipeline</strong> - Early access to emerging tech talent</li>
                        <li><strong>Media Coverage</strong> - Recognition in press releases and media about our events</li>
                    </ul>
                    
                    <h2>Sponsorship Packages</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose my-6">
                        <div className="border border-surface-border rounded-lg p-6">
                            <h3 className="text-xl font-bold mb-2">Bronze Partner</h3>
                            <ul className="space-y-2 mb-4">
                                <li className="flex items-center"><FaCheckCircle className="text-accent mr-2" /> Logo on website</li>
                                <li className="flex items-center"><FaCheckCircle className="text-accent mr-2" /> Social media mentions</li>
                                <li className="flex items-center"><FaCheckCircle className="text-accent mr-2" /> Event day recognition</li>
                            </ul>
                            <button className="bg-accent hover:bg-accent-hover text-black py-2 px-4 rounded w-full">
                                Learn More
                            </button>
                        </div>
                        
                        <div className="border border-surface-border rounded-lg p-6 relative">
                            <div className="absolute top-0 right-0 bg-accent text-black text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                                POPULAR
                            </div>
                            <h3 className="text-xl font-bold mb-2">Silver Partner</h3>
                            <ul className="space-y-2 mb-4">
                                <li className="flex items-center"><FaCheckCircle className="text-accent mr-2" /> All Bronze benefits</li>
                                <li className="flex items-center"><FaCheckCircle className="text-accent mr-2" /> Workshop branding</li>
                                <li className="flex items-center"><FaCheckCircle className="text-accent mr-2" /> Demo opportunity</li>
                                <li className="flex items-center"><FaCheckCircle className="text-accent mr-2" /> Newsletter feature</li>
                            </ul>
                            <button className="bg-accent hover:bg-accent-hover text-black py-2 px-4 rounded w-full">
                                Learn More
                            </button>
                        </div>
                        
                        <div className="border border-surface-border rounded-lg p-6">
                            <h3 className="text-xl font-bold mb-2">Gold Partner</h3>
                            <ul className="space-y-2 mb-4">
                                <li className="flex items-center"><FaCheckCircle className="text-accent mr-2" /> All Silver benefits</li>
                                <li className="flex items-center"><FaCheckCircle className="text-accent mr-2" /> Speaking opportunity</li>
                                <li className="flex items-center"><FaCheckCircle className="text-accent mr-2" /> Named scholarship</li>
                                <li className="flex items-center"><FaCheckCircle className="text-accent mr-2" /> Press release</li>
                                <li className="flex items-center"><FaCheckCircle className="text-accent mr-2" /> Employee engagement</li>
                            </ul>
                            <button className="bg-accent hover:bg-accent-hover text-black py-2 px-4 rounded w-full">
                                Learn More
                            </button>
                        </div>
                    </div>
                    
                    <h2>Custom Sponsorship</h2>
                    <p>
                        We're happy to work with you to create a custom sponsorship package that aligns with your 
                        specific goals and budget. Contact us to discuss tailored opportunities.
                    </p>
                </div>
                
                <div className="bg-surface-hover-bg p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">Become a Sponsor Today</h3>
                    <p className="mb-4">
                        Ready to support innovation and education? Reach out to discuss how we can work together.
                    </p>
                    <a href="mailto:partnerships@plastalbotbuilders.org" className="text-accent hover:underline">
                        partnerships@plastalbotbuilders.org
                    </a>
                </div>
            </div>
            
            <Footer />
        </section>
    );
};

export default SponsorshipsPage;