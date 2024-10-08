import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Programs: React.FC = () => {
    useEffect(() => {
        // JavaScript for Carousel Functionality
        const images = document.querySelectorAll('.carousel img');
        let currentIndex = 0;
        const intervalTime = 4000;

        function changeImage() {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }

        const interval = setInterval(changeImage, intervalTime);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // JavaScript for Countdown
        const eventDate = new Date("December 8, 2024 15:00:00").getTime();

        const countdownFunction = setInterval(function () {
            const now = new Date().getTime();
            const distance = eventDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (document.getElementById("days")) document.getElementById("days")!.innerHTML = days.toString();
            if (document.getElementById("hours")) document.getElementById("hours")!.innerHTML = hours.toString();
            if (document.getElementById("minutes")) document.getElementById("minutes")!.innerHTML = minutes.toString();
            if (document.getElementById("seconds")) document.getElementById("seconds")!.innerHTML = seconds.toString();

            if (distance < 0) {
                clearInterval(countdownFunction);
                if (document.querySelector(".countdown")) document.querySelector(".countdown")!.innerHTML = "The event has started!";
            }
        }, 1000);

        return () => clearInterval(countdownFunction);
    }, []);
    return (
        <section className="container mx-auto p-8">
            <Header />
            <div className="max-w-7xl mx-auto p-8">
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Robotics Workshops Section */}
                    <div className="p-8 border-2 rounded-lg border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                        <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                            <span className="text-hex"> Robotics</span> <span className="text-white"> Workshops </span>
                        </h1>
                        <div className="image">
                            <img alt="Empowering Innovation Image" height="200" src="/resources/outsourced_photos/roboticsworkshop.jpg" width="800" className="w-full h-auto object-cover" />
                        </div>
                        <p className="mb-4">Learn hands-on skills in:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Mechanical design</li>
                            <li>Coding</li>
                            <li>Electronics</li>
                        </ul>
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">Age Group:</h3>
                            <p>Workshops are aimed at students aged 10-18.</p>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">How to Sign Up:</h3>
                            <a href="#" className="text-blue-500 hover:underline">Register here</a>
                        </div>
                    </div>

                    {/* Competitions & Hackathons Section */}
                    <div className="p-8 border-2 rounded-lg border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                        <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                            <span className="text-hex"> Competitions <span className="text-white"> &</span> Hackathons</span>
                        </h1>
                        <div className="image">
                            <img alt="Empowering Innovation Image" height="200" src="/resources/outsourced_photos/gaming.jpg" width="800" className="w-full h-auto object-cover" />
                        </div>
                        <p className="mb-4">Encouraging innovation through robotics competitions. Show your creativity and technical skills!</p>
                        <h3 className="text-lg font-semibold">Past Winners:</h3>
                        <p>Check out our <a href="#" className="text-blue-500 hover:underline">gallery of past winners</a>.</p>
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">Testimonials:</h3>
                            <blockquote className="italic">"Winning the hackathon changed the way I think about robotics!" – Sarah K.</blockquote>
                        </div>
                    </div>

                    {/* Outreach Programs Section */}
                    <div className="p-8 border-2 rounded-lg border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                        <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                            <span className="text-hex"> Outreach <span className="text-white"> Programs</span></span>
                        </h1>
                        <div className="image">
                            <img alt="Empowering Innovation Image" height="200" src="/resources/Illustrations/Cyborg-bro.svg" width="800" className="w-full h-auto object-cover" />
                        </div>
                        <p className="mb-4">Bringing STEM education to underserved communities through school-based outreach programs.</p>
                        <h3 className="text-lg font-semibold">Our Mission:</h3>
                        <p>We aim to inspire the next generation of engineers, innovators, and problem-solvers.</p>
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">How to Get Involved:</h3>
                            <a href="#" className="text-blue-500 hover:underline">Join our outreach team</a>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Section (Main Event Content) */}
                <div className="lg:col-span-2">
                    {/* Event Banner */}
                    <div className="p-6 shadow-lg rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                        <div className="carousel relative w-full mx-auto rounded-lg h-64 overflow-hidden">
                            <img src="/resources/Photos/femalerobotics.png" alt="Image 1" className="absolute w-full h-full object-cover active" />
                            <img src="/resources/Photos/foundation.jpg" alt="Image 2" className="absolute w-full h-full object-cover" />
                            <img src="/resources/Photos/dywen.jpg" alt="Image 3" className="absolute w-full h-full object-cover" />
                            <img src="/resources/Photos/momentofbliss.png" alt="Image 4" className="absolute w-full h-full object-cover" />
                            <img src="/resources/Photos/IMG_4781.jpeg" alt="Featured Image" className="absolute w-full h-full object-cover" />
                        </div>
                        <h3 className="text-3xl font-bold mb-4">
                            <span className="text-hex">MathDance:<span className="text-white"> Hands-on workshop to learn Math, Coding, and AI</span></span>
                        </h3>
                        <p className="text-gray-700 mb-4">Artificial Intelligence (AI) is impacting our everyday lives and transforming the world. This hands-on MathDance workshop is an opportunity for future leaders to learn mathematics, computer science, and AI in a holistic and integrated manner...</p>
                        <a href="#" className="text-blue-600 font-medium">Read more &rarr;</a>
                    </div>

                    {/* Additional Event Details */}
                    <div className="mt-6 p-6 shadow-lg rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                        <h3 className="text-3xl font-bold mb-2">
                            <span className="text-hex">Workshop<span className="text-white"> Requirements</span></span>
                        </h3>
                        <ul className="list-disc list-inside text-gray-700 mb-4">
                            <li>PC (Windows or Mac) with webcam and internet connection.</li>
                            <li>Tablet computers also fine. Cell phones not recommended.</li>
                            <li>Technical questions answered via Neural Network.</li>
                            <li>Eligibility: At least a week of Scratch coding or 1 month of any programming experience.</li>
                        </ul>
                        <p className="text-gray-700 mb-2">Target Audience: Students in grades 6-12, teachers, parents, and adults.</p>
                    </div>

                    {/* Speaker Section */}
                    <div className="mt-6 p-6 shadow-lg rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                        <h3 className="text-3xl font-bold mb-4">
                            <span className="text-hex">Guest <span className="text-white"> Instructor </span></span>
                        </h3>
                        <div className="flex items-center">
                            <img className="w-16 h-16 rounded-full mr-4" src="/resources/founders/fred.png" alt="Speaker Image" />
                            <div>
                                <h4 className="text-lg font-semibold text-white">CJ Chung</h4>
                                <p className="text-gray-700">Professor of Computer Science, Director of CS & AI Robotics (CAR) Lab, Lawrence Technological University.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section (Event Info & Countdown) */}
                <aside className="p-6 shadow-lg rounded-lg sticky top-4 border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                    {/* Countdown Timer */}
                    <div className="countdown flex justify-center items-center p-6">
                        <div className="mx-2 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                            <span id="days">00</span>
                            <p className="p-1">Days</p>
                        </div>
                        <div className="mx-2 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                            <span id="hours">00</span>
                            <p className="p-1">Hours</p>
                        </div>
                        <div className="mx-2 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                            <span id="minutes">00</span>
                            <p className="p-1">Minutes</p>
                        </div>
                        <div className="mx-2 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                            <span id="seconds">00</span>
                            <p className="p-1">Seconds</p>
                        </div>
                    </div>

                    {/* Event Date & Time */}
                    <div className="mb-6">
                        <h3 className="text-3xl font-bold mb-4">
                            <span className="text-hex">Event Date <span className="text-white"> & Time </span></span>
                        </h3>
                        <p className="text-gray-700">8th December 2024 | 15:00 - 17:00 (Geneva CEST)</p>
                    </div>

                    {/* Event Duration */}
                    <div className="mb-6">
                        <h3 className="text-3xl font-bold mb-4">
                            <span className="text-hex">Duration</span>
                        </h3>
                        <p className="text-gray-700">120 minutes</p>
                    </div>

                    {/* Programme Stream */}
                    <div className="mb-6">
                        <h3 className="text-3xl font-bold mb-4">
                            <span className="text-hex">Programme <span className="text-white"> Stream</span></span>
                        </h3>
                        <p className="text-gray-700">Discovery - AI and Robotics</p>
                    </div>

                    {/* Event Topics */}
                    <div className="mb-6">
                        <h3 className="text-3xl font-bold mb-4">
                            <span className="text-hex">Topics</span>
                        </h3>
                        <p className="text-gray-700">Machine Learning</p>
                        <p className="text-gray-700">Robotics for Good</p>
                        <p className="text-gray-700">Youth & AI</p>
                    </div>

                    {/* UN SDGs */}
                    <div className="mb-6">
                        <h3 className="text-3xl font-bold mb-4">
                            <span className="text-hex">UN <span className="text-white"> SDGs</span></span>
                        </h3>
                        <div className="flex space-x-2">
                            <img className="w-20 h-20" src="/resources/SDGs/SDG_4.png" alt="SDG 4" />
                            <img className="w-20 h-20" src="/resources/SDGs/SDG_9.png" alt="SDG 9" />
                            <img className="w-20 h-20" src="/resources/SDGs/SDG_13.png" alt="SDG 13" />
                            <img className="w-20 h-20" src="/resources/SDGs/SDG_7.png" alt="SDG 7" />
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-6 mt-8">
                        <a href="#" className="text-gray-500 text-2xl"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="text-gray-500 text-2xl"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="text-gray-500 text-2xl"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    {/* Centered Registration Button */}
                    <div className="flex justify-center mt-8">
                        <button className="mt-4 custom-button">Register Now !!!</button>
                    </div>
                </aside>
            </main>

            <div className="max-w-7xl mx-auto p-8">
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                    <span className="text-hex typing-animation">Our <span className="text-white">Events</span></span>
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Event */}
                    <div className="flex items-center p-4 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                        <div className="w-1/3">
                            <img src="/Flayers/plastal-bot-builders.jpg" alt="Event 1" className="rounded-lg" />
                        </div>
                        <div className="ml-4 w-2/3">
                            <h3 className="text-xl font-semibold">
                                <span className="text-hex"> Kitwe Edition: </span> Introduction to Robotics and Programming Fundamentals
                            </h3>
                            <p className="text-lg text-gray-400 flex items-center">
                                <img src="/resources/Icons/Location.svg" alt="Location icon" className="w-6 h-6 mr-2" />
                                American Corner - CBU, Kitwe
                            </p>
                            <p className="font-bold text-lg mt-2 flex items-center">
                                <img src="/resources/Icons/Calender.svg" alt="calendar icon" className="w-6 h-6 mr-2" />
                                18, 25 May 2024 and 1 June 2024
                            </p>
                            <p className="text-sm text-gray-500">Start Date</p>
                            <p className="text-sm bg-gray-700 rounded-lg py-1 px-3 inline-block mt-2">3 days event</p>
                            <p className="text-xs text-gray-500 mt-2">Completed</p>
                        </div>
                    </div>
                    {/* Second Event */}
                    <div className="flex items-center p-4 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                        {/* Event Image */}
                        <div className="w-1/3">
                            <img src="/Flayers/plastal-bot-builders.jpg" alt="Event 2" className="rounded-lg" />
                        </div>
                        {/* Event Details */}
                        <div className="ml-4 w-2/3">
                            <h3 className="text-xl font-semibold">
                                <span className="text-hex">Outreach Program:</span> Mpelember Secondary School
                            </h3>
                            <p className="text-sm text-gray-400">Mpelembe Secondary School - Kitwe</p>
                            <p className="font-bold text-lg mt-2 flex items-center">
                                <img src="/resources/Icons/Calender.svg" alt="calendar icon" className="w-6 h-6 mr-2" />
                                22 October 2024
                            </p>
                            <p className="text-sm text-gray-500">Start Date</p>
                            <p className="text-sm bg-gray-700 rounded-lg py-1 px-3 inline-block mt-2">3 days event</p>
                            <p className="text-xs text-green-500 mt-2">Coming Soon..</p>
                        </div>
                    </div>
                    {/* Third Event */}
                    <div className="flex items-center p-4 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                        {/* Event Image */}
                        <div className="w-1/3">
                            <img src="/Flayers/plastal-bot-builders.jpg" alt="Event 3" className="rounded-lg" />
                        </div>
                        {/* Event Details */}
                        <div className="ml-4 w-2/3">
                            <h3 className="text-xl font-semibold">
                                <span className="text-hex">Outreach Program:</span> Konkola Secondary School
                            </h3>
                            <p className="text-lg text-gray-400 flex items-center">
                                <img src="/resources/Icons/Location.svg" alt="Location icon" className="w-6 h-6 mr-2" />
                                Konkola Trust - Chililabombwe
                            </p>
                            <p className="font-bold text-lg mt-2 flex items-center">
                                <img src="/resources/Icons/Calender.svg" alt="calendar icon" className="w-6 h-6 mr-2" />
                                10 June 2024
                            </p>
                            <p className="text-sm text-gray-500">Start Date</p>
                            <p className="text-sm bg-gray-700 rounded-lg py-1 px-3 inline-block mt-2">3 days event</p>
                            <p className="text-xs text-gray-500 mt-2">Completed</p>
                        </div>
                    </div>
                    {/* Fourth Event */}
                    <div className="flex items-center p-4 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                        {/* Event Image */}
                        <div className="w-1/3">
                            <img src="/Flayers/plastal-bot-builders.jpg" alt="Event 4" className="rounded-lg" />
                        </div>
                        {/* Event Details */}
                        <div className="ml-4 w-2/3">
                            <h3 className="text-xl font-semibold">
                                <span className="text-hex">Lusaka Edition:</span> Introduction to Robotics and Programming Fundamentals
                            </h3>
                            <p className="text-lg text-gray-400 flex items-center">
                                <img src="/resources/Icons/Location.svg" alt="Location icon" className="w-6 h-6 mr-2" />
                                American Corner - CBU, Kitwe
                            </p>
                            <p className="font-bold text-lg mt-2 flex items-center">
                                <img src="/resources/Icons/Calender.svg" alt="calendar icon" className="w-6 h-6 mr-2" />
                                09 December 2024
                            </p>
                            <p className="text-sm text-gray-500">Start Date</p>
                            <p className="text-sm bg-gray-700 rounded-lg py-1 px-3 inline-block mt-2">3 days event</p>
                            <p className="text-xs text-green-500 mt-2">Coming Soon..</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default Programs;