import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { FaDonate, FaArrowLeft, FaRegLightbulb, FaUserGraduate, FaHandHoldingHeart, FaEnvelope, FaCheck } from 'react-icons/fa';
import ThemedImage from '../../theme/ThemedImage';

const DonationsPage: React.FC = () => {
    const [donationAmount, setDonationAmount] = useState<number>(200);
    const [isRecurring, setIsRecurring] = useState<boolean>(false);

    // Progress tracker data
    const goalAmount = 15000;
    const raisedAmount = 8000;
    const progressPercentage = (raisedAmount / goalAmount) * 100;

    // Testimonials
    const testimonials = [
        {
            name: "Mulenga, Grade 10",
            quote: "Building my first robot was the most exciting thing I've ever done. Now I want to study engineering!",
            image: "resources/testimonials/student1.jpg"
        },
        {
            name: "Ms. Banda, Teacher",
            quote: "Plastal-Bot helped our school start its first robotics program. Our students are now thriving in STEM subjects.",
            image: "resources/testimonials/teacher1.jpg"
        },
        {
            name: "Chipego, Grade 8",
            quote: "I never thought I could code until I joined the robotics workshop. Now I'm teaching others!",
            image: "resources/testimonials/student2.jpg"
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
                <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
                    <div className="md:w-1/2">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            <FaDonate className="inline-block mr-3" />
                            Support Young Innovators
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
                            Your financial support helps us prepare young Zambians for the future of technology.
                        </p>
                        <div className="bg-surface-hover-bg p-4 rounded-lg mb-6">
                            <div className="flex flex-col space-y-2">
                                <div className="flex justify-between">
                                    <span className="font-bold">2026 Outreach Workshop Goal:</span>
                                    <span className="font-bold">K{raisedAmount} of K{goalAmount}</span>
                                </div>
                                <div className="w-full bg-surface-border rounded-full h-4 overflow-hidden">
                                    <div 
                                        className="bg-accent h-full rounded-full" 
                                        style={{ width: `${progressPercentage}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm">Help us reach our goal to bring robotics to 10 more schools by July</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="md:w-1/2">
                        <ThemedImage
                            src="resources/Illustrations/workshop-impact.jpg"
                            alt="Students working on robots"
                            className="w-full rounded-lg shadow-lg"
                        />
                    </div>
                </div>
                
                {/* Real Stories Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-surface-border pb-2">Real Stories, Real Impact</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-surface-hover-bg rounded-lg p-4 flex flex-col">
                                <div className="h-48 mb-4 overflow-hidden rounded-lg">
                                    <ThemedImage
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="italic mb-2">"{testimonial.quote}"</p>
                                <p className="font-bold mt-auto">— {testimonial.name}</p>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* What Donations Do Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-surface-border pb-2">Your Donation Makes a Difference</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="border border-surface-border rounded-lg p-6 text-center hover:border-accent transition-colors">
                            <div className="text-accent text-xl font-bold mb-2">K200</div>
                            <div className="w-20 h-20 mx-auto mb-4 bg-surface-hover-bg rounded-full flex items-center justify-center">
                                {FaRegLightbulb ({className:"text-accent text-3xl"})}
                            </div>
                            <p>Provides one set of sensors for a student robot project</p>
                        </div>
                        
                        <div className="border border-surface-border rounded-lg p-6 text-center hover:border-accent transition-colors">
                            <div className="text-accent text-xl font-bold mb-2">K500</div>
                            <div className="w-20 h-20 mx-auto mb-4 bg-surface-hover-bg rounded-full flex items-center justify-center">
                                {FaUserGraduate ({className:"text-accent text-3xl"})}
                            </div>
                            <p>Covers workshop materials for one participant</p>
                        </div>
                        
                        <div className="border border-surface-border rounded-lg p-6 text-center hover:border-accent transition-colors">
                            <div className="text-accent text-xl font-bold mb-2">K1,000</div>
                            <div className="w-20 h-20 mx-auto mb-4 bg-surface-hover-bg rounded-full flex items-center justify-center">
                                {FaHandHoldingHeart ({className:"text-accent text-3xl"})}
                            </div>
                            <p>Sponsors a complete robotics kit for a school</p>
                        </div>
                    </div>
                </section>
                
                {/* Donation Form */}
                <section className="mb-12 bg-surface-hover-bg p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-6">Make Your Contribution</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">Choose Amount</h3>
                            
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                {[200, 500, 1000].map((amount) => (
                                    <button 
                                        key={amount}
                                        className={`py-2 px-4 rounded-lg border ${donationAmount === amount ? 'bg-accent text-black border-accent' : 'border-surface-border hover:border-accent'}`}
                                        onClick={() => setDonationAmount(amount)}
                                    >
                                        K{amount}
                                    </button>
                                ))}
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="custom-amount" className="block mb-2">Custom Amount (K)</label>
                                <input 
                                    type="number" 
                                    id="custom-amount" 
                                    className="w-full p-2 rounded-lg border border-surface-border bg-surface"
                                    value={donationAmount}
                                    onChange={(e) => setDonationAmount(Number(e.target.value))}
                                    min="10"
                                />
                            </div>
                            
                            <div className="mb-6">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={isRecurring} 
                                        onChange={() => setIsRecurring(!isRecurring)}
                                        className="rounded text-accent focus:ring-accent"
                                    />
                                    <span>Make this a monthly donation</span>
                                </label>
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold mb-4">Donor Levels</h3>
                            
                            <div className="space-y-3">
                                <div className={`p-3 rounded-lg border ${isRecurring && donationAmount >= 50 && donationAmount < 200 ? 'border-accent bg-accent bg-opacity-10' : 'border-surface-border'}`}>
                                    <div className="flex items-center">
                                        <div className="mr-3">
                                            {isRecurring && donationAmount >= 50 && donationAmount < 200 ? (
                                                {FaCheck ({className:"text-accent"})}
                                            ) : null}
                                        </div>
                                        <div>
                                            <h4 className="font-bold">STEM Friend</h4>
                                            <p className="text-sm">K50-K199 monthly</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className={`p-3 rounded-lg border ${isRecurring && donationAmount >= 200 && donationAmount < 500 ? 'border-accent bg-accent bg-opacity-10' : 'border-surface-border'}`}>
                                    <div className="flex items-center">
                                        <div className="mr-3">
                                            {isRecurring && donationAmount >= 200 && donationAmount < 500 ? (
                                                {FaCheck ({className:"text-accent"})}
                                            ) : null}
                                        </div>
                                        <div>
                                            <h4 className="font-bold">Innovator Partner</h4>
                                            <p className="text-sm">K200-K499 monthly</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className={`p-3 rounded-lg border ${isRecurring && donationAmount >= 500 ? 'border-accent bg-accent bg-opacity-10' : 'border-surface-border'}`}>
                                    <div className="flex items-center">
                                        <div className="mr-3">
                                            {isRecurring && donationAmount >= 500 ? (
                                                {FaCheck ({className:"text-accent"})}
                                            ) : null}
                                        </div>
                                        <div>
                                            <h4 className="font-bold">Education Champion</h4>
                                            <p className="text-sm">K500+ monthly</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8">
                        <button className="bg-accent hover:bg-accent-hover text-black py-3 px-6 rounded-lg font-bold w-full md:w-auto">
                            {isRecurring ? 'Start Monthly Support' : 'Donate Now'} - K{donationAmount}
                        </button>
                        
                        <div className="mt-4 flex items-center text-sm">
                            <div className="border border-surface-border p-1 rounded mr-2">
                                <img src="/resources/payment-methods.png" alt="Payment methods" className="h-6" />
                            </div>
                            <span>Secure payments via Mobile Money, Credit Card, and PayPal</span>
                        </div>
                    </div>
                </section>
                
                {/* Impact and Updates */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-surface-border pb-2">Recent Impact</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border border-surface-border rounded-lg p-6">
                            <h3 className="text-lg font-bold mb-2">Recent Workshop Success</h3>
                            <p className="mb-4">Your support helped 25 students in Ndola build and program their first autonomous robots last weekend!</p>
                            <ThemedImage
                                src="resources/Illustrations/recent-workshop.jpg"
                                alt="Recent workshop in Ndola"
                                className="w-full h-40 object-cover rounded-lg mb-3"
                            />
                            <a href="#" className="text-accent hover:underline">See more photos →</a>
                        </div>
                        
                        <div className="border border-surface-border rounded-lg p-6">
                            <h3 className="text-lg font-bold mb-2">2025 Impact Report</h3>
                            <ul className="space-y-2 mb-4">
                                <li className="flex items-center"><span className="text-accent mr-2">•</span> 4 schools equipped with robotics kits</li>
                                <li className="flex items-center"><span className="text-accent mr-2">•</span> 120 students trained this term</li>
                                <li className="flex items-center"><span className="text-accent mr-2">•</span> 8 teacher training workshops completed</li>
                                <li className="flex items-center"><span className="text-accent mr-2">•</span> 2 teams qualified for national competition</li>
                            </ul>
                            <a href="#" className="text-accent hover:underline">Read full report →</a>
                        </div>
                    </div>
                </section>
                
                {/* Newsletter Signup */}
                <section className="bg-surface-hover-bg p-6 rounded-lg">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="md:w-2/3">
                            <h3 className="text-xl font-bold mb-2">Stay Connected</h3>
                            <p className="mb-4">
                                Subscribe to our quarterly newsletter to see the impact of your donations and 
                                stay updated on our latest programs and success stories.
                            </p>
                        </div>
                        
                        <div className="md:w-1/3">
                            <form className="flex w-full">
                                <input 
                                    type="email" 
                                    placeholder="Your email address" 
                                    className="flex-grow p-2 rounded-l-lg border border-r-0 border-surface-border bg-surface"
                                />
                                <button type="submit" className="bg-accent hover:bg-accent-hover text-black p-2 rounded-r-lg">
                                    <FaEnvelope />
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
            
            <Footer />
        </section>
    );
};

export default DonationsPage;