import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Membership: React.FC = () => {
    return (
        <section className="container scroll-smooth focus:scroll-auto">
            <Header />
            <div className="max-w-7xl mx-auto px-4">
                <h1
                    className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                    <span className="text-hex "> Membership <span className="text-white"> Application Form </span></span>
                </h1>
                {/* Form Application Introduction */}
                <div className="mb-12">
                    <p className="text-lg text-white">Our goal is to bridge the technology gap and foster self-sufficiency in
                        young people. The stronger our community, the better positioned we are to move the needle for diversity
                        in tech and entrepreneurship. Thank you for joining us.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Card 1: Section 1 - Personal Information */}
                    <div className="p-6 rounded-lg  border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                        <h2 className="text-xl font-semibold mb-4"> <span className="text-hex "> Section 1: </span> Personal
                            Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fas fa-user mr-2"></i> Full Name
                                </label>
                                <input id="large-input" type="text"
                                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer hover:border-[#0CFFBB]"
                                    placeholder="John Doe" required />
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fas fa-calendar-alt mr-2"></i> Date of Birth
                                </label>
                                <input type="date"
                                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer hover:border-[#0CFFBB]"
                                    required />
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fas fa-venus-mars mr-2"></i> Gender
                                </label>
                                <select
                                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer hover:border-[#0CFFBB]"
                                    required>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Prefer not to say</option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fas fa-envelope mr-2"></i> Email Address
                                </label>
                                <input type="email"
                                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer hover:border-[#0CFFBB]"
                                    required placeholder="example@domain.com" />
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fas fa-phone mr-2"></i> Phone Number
                                </label>
                                <input type="text"
                                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer hover:border-[#0CFFBB]"
                                    required placeholder="+260 123 456 789" />
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fas fa-city mr-2"></i> City & Country
                                </label>
                                <input type="text"
                                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer hover:border-[#0CFFBB]"
                                    required placeholder="Lusaka, Zambia" />
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fas fa-briefcase mr-2"></i> Occupation/Profession (if applicable)
                                </label>
                                <input type="text"
                                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer hover:border-[#0CFFBB]"
                                    required placeholder="Student, Engineer, etc." />
                            </div>
                        </div>
                    </div>
                    {/* Card 2: Section 2 - Membership Type */}
                    <div className="p-6 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                        <h2 className="text-xl font-semibold mb-4">
                            <span className="text-hex"> Section 3: </span>Membership Type
                        </h2>
                        <div className="space-y-4">
                            {/* Membership Selection */}
                            <div>
                                <label className="block mb-2">Please select the type of membership you are applying for:</label>
                                <div className="space-y-2">
                                    <label>
                                        <input
                                            type="radio"
                                            name="membership"
                                            className="mr-2 w-4 h-4 custom-color rounded focus:ring-2"
                                        />
                                        Student Member
                                    </label><br />
                                    <label>
                                        <input
                                            type="radio"
                                            name="membership"
                                            className="mr-2 w-4 h-4 custom-color rounded focus:ring-2"
                                        />
                                        Professional Member
                                    </label><br />
                                    <label>
                                        <input
                                            type="radio"
                                            name="membership"
                                            className="mr-2 w-4 h-4 custom-color rounded focus:ring-2"
                                        />
                                        Mentor/Volunteer Member
                                    </label><br />
                                    <label>
                                        <input
                                            type="radio"
                                            name="membership"
                                            className="mr-2 w-4 h-4 custom-color rounded focus:ring-2"
                                        />
                                        Partner/Supporter Member
                                    </label>
                                </div>
                            </div>

                            {/* Educational Background */}
                            <div>
                                <label className="block mb-4">
                                    Educational Background/Current Institution (For Student Members)
                                </label>
                                <input
                                    type="text"
                                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer hover:border-[#0CFFBB]"
                                    placeholder="University of Zambia"
                                />
                            </div>

                            {/* Professional Expertise */}
                            <div>
                                <label className="block mb-2">
                                    If applying as a Professional or Mentor, please specify your expertise or skill areas:
                                </label>
                                <div className="space-y-2">
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="mr-2 w-4 h-4 custom-color rounded focus:ring-2"
                                        />
                                        Engineering
                                    </label><br />
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="mr-2 w-4 h-4 custom-color rounded focus:ring-2"
                                        />
                                        Programming/Coding
                                    </label><br />
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="mr-2 w-4 h-4 custom-color rounded focus:ring-2"
                                        />
                                        Environmental Sciences
                                    </label><br />
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="mr-2 w-4 h-4 custom-color rounded focus:ring-2"
                                        />
                                        Education
                                    </label><br />
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="mr-2 w-4 h-4 custom-color rounded focus:ring-2"
                                        />
                                        Project Management
                                    </label><br />

                                    {/* Other Expertise */}
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            className="mr-2 w-4 h-4 custom-color rounded focus:ring-2"
                                        />
                                        <span>Other:</span>
                                        <input
                                            type="text"
                                            className="block p-1 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer hover:border-[#0CFFBB]"
                                            placeholder="Specify"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Card 3: Section 3 - Social Media Links --> */}
                    <div
                        className="p-6 rounded-lg  border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                        <h2 className="text-xl font-semibold mb-4"> <span className="text-hex "> Section 2: </span>Social Media
                            Links ( Optional ) </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fab fa-linkedin mr-2"></i> LinkedIn Profile
                                </label>
                                <input type="url"
                                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer hover:border-[#0CFFBB]"
                                    placeholder="https://www.linkedin.com/in/username" />
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fab fa-facebook mr-2"></i> Facebook Profile
                                </label>
                                <input type="url"
                                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer hover:border-[#0CFFBB]"
                                    placeholder="https://www.facebook.com/username" />
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fab fa-instagram mr-2"></i> Instagram Profile
                                </label>
                                <input type="url"
                                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer hover:border-[#0CFFBB]"
                                    placeholder="https://www.instagram.com/username" />
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fab fa-twitter mr-2"></i> Twitter Profile
                                </label>
                                <input type="url"
                                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer hover:border-[#0CFFBB]"
                                    placeholder="https://www.twitter.com/username" />
                            </div>
                            <div>
                                <label className="mb-4 flex items-center">
                                    <i className="fas fa-globe mr-2"></i> Other Platform
                                </label>
                                <input type="url"
                                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer hover:border-[#0CFFBB]"
                                    placeholder="https://example.com/username" />
                            </div>
                        </div>
                    </div>
                    {/* Card 4: Section 4 - Interest & Motivation */}
                    <div className="p-6 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                        <h2 className="text-xl font-semibold mb-4">
                            <span className="text-hex"> Section 4: </span> Interest & Motivation
                        </h2>
                        <div className="space-y-4">

                            {/* Inspiration to join */}
                            <div>
                                <label className="block mb-2">What inspired you to join Plastal-Bot Builders?</label>
                                <div className="space-y-2">
                                    <label>
                                        <input
                                            id="bordered-checkbox-1"
                                            value="Interest in Robotics"
                                            name="inspiration"
                                            type="checkbox"
                                            className="mr-2 w-4 h-4 custom-color rounded focus:ring-2"
                                        />
                                        Interest in Robotics
                                    </label><br />

                                    <label>
                                        <input
                                            id="bordered-checkbox-2"
                                            value="Passion for STEM Education"
                                            name="inspiration"
                                            type="checkbox"
                                            className="mr-2 w-4 h-4 custom-color rounded focus:ring-2"
                                        />
                                        Passion for STEM Education
                                    </label><br />

                                    <label>
                                        <input
                                            id="bordered-checkbox-3"
                                            value="Environmental Advocacy"
                                            name="inspiration"
                                            type="checkbox"
                                            className="mr-2 w-4 h-4 custom-color rounded focus:ring-2"
                                        />
                                        Environmental Advocacy
                                    </label><br />

                                    <label>
                                        <input
                                            id="bordered-checkbox-4"
                                            value="Desire to Mentor Young People"
                                            name="inspiration"
                                            type="checkbox"
                                            className="mr-2 w-4 h-4 custom-color rounded focus:ring-2"
                                        />
                                        Desire to Mentor Young People
                                    </label><br />

                                    <label>
                                        <input
                                            id="bordered-checkbox-5"
                                            value="Networking and Professional Growth"
                                            name="inspiration"
                                            type="checkbox"
                                            className="mr-2 w-4 h-4 custom-color rounded focus:ring-2"
                                        />
                                        Networking and Professional Growth
                                    </label><br />

                                    <label className="flex items-center">
                                        <input
                                            id="bordered-checkbox-6"
                                            value="Other"
                                            name="inspiration"
                                            type="checkbox"
                                            className="mr-2 w-4 h-4 custom-color rounded focus:ring-2"
                                        />
                                        <span>Other:</span>
                                        <input
                                            type="text"
                                            className="ml-2 p-1 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer hover:border-[#0CFFBB]"
                                            placeholder="Specify"
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Motivation to join */}
                            <div>
                                <label className="block mb-2">Why do you want to become a member of Plastal-Bot Builders?</label>
                                <textarea
                                    className="w-full mt-1 p-2 text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer hover:border-[#0CFFBB]"
                                    rows={3}
                                ></textarea>
                            </div>

                            {/* Experience in robotics or STEM */}
                            <div>
                                <label className="block mb-2">Do you have any previous experience in robotics, coding, or STEM-related projects?</label>
                                <div className="space-y-2">
                                    <label>
                                        <input
                                            type="radio"
                                            name="experience"
                                            className="mr-2 w-4 h-4 custom-color rounded focus:ring-2"
                                        />
                                        Yes
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="experience"
                                            className="mr-2 w-4 h-4 custom-color rounded focus:ring-2"
                                        />
                                        No
                                    </label>
                                </div>
                                <textarea
                                    className="w-full mt-4 p-2 text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer hover:border-[#0CFFBB]"
                                    rows={3}
                                    placeholder="If Yes, please provide a brief description"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Card 5: Section 5 - Membership Commitments --> */}
                    <div
                        className="p-6 rounded-lg  border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                        <h2 className="text-xl font-semibold mb-4"> <span className="text-hex "> Section 5: </span> Membership
                            Commitments</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2">Time Availability</label>
                                <select
                                    className="w-full mt-1 p-2  text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer hover:border-[#0CFFBB]">
                                    <option>1-2 hours</option>
                                    <option>3-5 hours</option>
                                    <option>5-10 hours</option>
                                    <option>10+ hours</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2">In what ways do you think you can contribute to the
                                    organization?</label>
                                <textarea
                                    className="w-full mt-1 p-2  text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer hover:border-[#0CFFBB]"
                                    rows={3}></textarea>
                            </div>
                            <div>
                                <label className="block mb-2">Are you willing to participate in virtual or in-person
                                    events?</label>
                                <div className="space-y-4">
                                    <label><input type="radio" name="participation"
                                        className="mr-2 w-4 h-4 custom-color rounded focus:ring-2" /> Yes</label>
                                    <label><input type="radio" name="participation"
                                        className="mr-2 w-4 h-4 custom-color rounded focus:ring-2" /> No</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Card 6: Section 6 - Additional Information --> */}
                    <div
                        className="p-6 rounded-lg  border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                        <h2 className="text-xl font-semibold mb-4"> <span className="text-hex "> Section 6: </span> Additional
                            Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2">How did you hear about Plastal-Bot Builders?</label>
                                <select
                                    className="w-full mt-1 p-2  text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer hover:border-[#0CFFBB]">
                                    <option>Website</option>
                                    <option>Social Media</option>
                                    <option>Friend/Colleague</option>
                                    <option>Event/Workshop</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2">Do you have any other comments or questions?</label>
                                <textarea
                                    className="w-full mt-1 p-2 text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer hover:border-[#0CFFBB]"
                                    rows={3}>
                                </textarea>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Card 6: Section 6 - Declaration & Consent --> */}
                    <div
                        className="p-6 rounded-lg  border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out lg:col-span-2">
                        <h2 className="text-xl font-semibold mb-4"> <span className="text-hex "> Section 6: </span> Declaration
                            & Consent</h2>
                        <div className="space-y-4">
                            <label><input type="checkbox" className="mr-2 w-4 h-4 custom-color rounded focus:ring-2" /> I hereby
                                declare that the information provided is true
                                and accurate to the best of my knowledge.</label><br />
                                <label>
                                    <input 
                                        type="checkbox" 
                                        className="mr-2 w-4 h-4 custom-color rounded focus:ring-2" 
                                    /> 
                                    I agree to abide by the rules and regulations of Plastal-Bot Builders.
                                </label> 
                                <br />
                                <label>
                                    <input 
                                        type="checkbox" 
                                        className="mr-2 w-4 h-4 custom-color rounded focus:ring-2" 
                                    /> 
                                    I consent to the processing of my personal data in accordance with the organization's data privacy policy.
                                </label>
                        </div>
                    </div>
                    {/* <!-- Submit Button --> */}
                    <div className="text-center mt-8 mb-6">
                        <button className="custom-button">Submit
                            Application</button>
                    </div>
                </div>
                <Footer />
            </div>
        </section>
    );
}