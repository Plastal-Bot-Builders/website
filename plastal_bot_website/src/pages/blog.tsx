import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollAnimation from '../components/ScrollAnimation/ScrollAnimation';

const Blog: React.FC = () => {
    return (
    <section className="scroll-smooth focus:scroll-auto">
        {/* Navigation Bar */}
        <Header />
        <div className="max-w-7xl mx-auto p-8">
            
                <h1
                    className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                    <span className="text-hex "> Blog<span className="text-white"> Posts </span></span>
                </h1>
            

                {/* <!-- Blog Introduction --> */}
            
                <div className="mb-12">
                    <p className="text-lg text-white">Stay updated with the latest from our robotics workshops, STEM events, and
                        sustainability projects. Our blog covers event highlights, articles, and key updates on how we’re making
                        a difference through technology and education.</p>
                </div>
            

            {/* <!-- Blog Post Grid --> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* <!-- Blog Post 1: Event Highlights --> */}
                
                <div
                    className="flex flex-col justify-between p-6 rounded-lg  border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                    <div>
                        <div className="image mb-4">
                            <img alt="Empowering Innovation Image" src="/resources/blogs/blog2.png"
                                className="w-full h-48 object-cover rounded-lg mb-4" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4"> <span className="text-hex "> Bridging the Digital Divide:</span>
                            Empowering Zambian Youth through Robotics and Programming</h2>
                        <p className="mb-4">In Zambia, there’s a common belief that teaching robotics isn’t practical due to
                            perceived infrastructural limitations, cultural clashes, and limited job prospects. However,
                            robotics education can be a game-changer. By offering young Zambians the chance to dive into
                            robotics, they gain skills vital for navigating today’s tech-driven world. Whether solving local
                            issues or innovating globally, they learn critical thinking, creativity, and problem-solving —
                            skills with immense value. </p>
                        <p className="mb-4">Plus, investing in robotics education doesn’t just sound cool; it boosts the
                            economy, attracts investment, and bridges the digital gap, ensuring everyone has a shot at
                            shaping the future...</p>
                    </div>
                    <div>
                        <div className="flex items-center space-x-4 mb-4">
                            <img src="/resources/blogs/1-04.png" alt="Author Image" className="w-16 h-16 rounded-full" />
                            <div>
                                <h3 className="text-sm font-bold">Plastal-Bot Builders</h3>
                                <div className="flex space-x-4 mt-2">
                                    <a href="#" className="text-gray-500 text-2xl"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#" className="text-gray-500 text-2xl"><i className="fab fa-instagram"></i></a>
                                    <a href="#" className="text-gray-500 text-2xl"><i className="fab fa-twitter"></i></a>
                                    <a href="#" className="text-gray-500 text-2xl"><i className="fab fa-linkedin-in"></i></a>
                                    <a href="#" className="text-gray-500 text-2xl"><i className="fab fa-medium"></i></a>
                                </div>
                            </div>
                        </div>
                        <button className="custom-button">Read more &rarr;</button>
                    </div>
                </div>
                
                
                {/* <!-- Blog Post 2: STEM and Sustainability --> */}
                
                <div
                    className="flex flex-col justify-between p-6 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out h-full">
                    <div>
                        <div className="image mb-4">
                            <img alt="Empowering Innovation Image" src="/resources/blogs/smartbin.png"
                                className="w-full h-48 object-cover rounded-lg mb-4" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4"> <span className="text-hex "> WasteWizard: </span> Revolutionizing
                            Waste Management in Zambia</h2>
                        <p className="mb-4">As Zambia experiences rapid urbanization and population growth, waste management
                            challenges are becoming more severe. Introducing WasteWizard, an innovative autonomous smart bin
                            system that leverages cutting-edge IoT technology to tackle these issues. Equipped with sensors,
                            microcontrollers, and servo motors, WasteWizard detects waste levels and automates lid
                            operations. </p>
                        <p className="mb-4">Using wireless communication protocols like Wi-Fi or LoRaWAN, it facilitates
                            real-time data transfer to a cloud-based platform that optimizes waste collection routes and
                            provides actionable insights. This system is designed to improve waste collection, promote
                            recycling initiatives, and create job opportunities, making it a sustainable and efficient
                            solution tailored to Zambia's needs.</p>
                    </div>
                    <div>
                        <div className="flex items-center space-x-4 mb-4">
                            <img src="/resources/blogs/1-04.png" alt="Author Image" className="w-16 h-16 rounded-full" />
                            <div>
                                <h3 className="text-sm font-bold">Plastal-Bot Builders</h3>
                                <div className="flex space-x-4 mt-2">
                                    <a href="#" className="text-gray-500 text-2xl"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#" className="text-gray-500 text-2xl"><i className="fab fa-instagram"></i></a>
                                    <a href="#" className="text-gray-500 text-2xl"><i className="fab fa-twitter"></i></a>
                                    <a href="#" className="text-gray-500 text-2xl"><i className="fab fa-linkedin-in"></i></a>
                                    <a href="#" className="text-gray-500 text-2xl"><i className="fab fa-medium"></i></a>
                                </div>
                            </div>
                        </div>
                        <button className="custom-button">Read more &rarr;</button>
                    </div>
                </div>
                
                {/* <!-- Blog Post Container --> */}
                
                <div
                    className="flex flex-col justify-between h-full p-6 rounded-lg  border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">

                    {/* <!-- Blog Post Title and Paragraph --> */}
                    <div className="image mb-4">
                        <img alt="Empowering Innovation Image" src="/resources/blogs/sepoblog.jpeg"
                            className="w-full h-48 object-cover rounded-lg mb-4" />
                    </div>
                    <div className="flex-grow">
                        <h2 className="text-2xl font-bold mb-4"> <span className="text-hex "> Reflecting: </span>'Introduction to
                            Robotics and Programming'</h2>
                        <p className="mb-4">When I started this journey three weeks ago, hosting the "Introduction to Robotics
                            and Programming" workshop, I was filled with excitement and a bit of nervousness. We aimed to
                            introduce young minds to the fascinating world of robotics and programming, igniting their
                            passion for technology and innovation.</p>
                    </div>

                    {/* <!-- Author Info and Social Links --> */}
                    <div className="mt-4 mb-4 flex items-center space-x-4">
                        {/* <!-- Author Image --> */}
                        <img src="/resources/founders/sepo.jpeg" alt="Author Image" className="w-16 h-16 rounded-full" />
                        {/* <!-- Author Details --> */}
                        <div>
                            <h3 className="text-sm font-bold">Sepo Konayuma</h3>
                            <div className="flex space-x-4 mt-2">
                                <a href="https://www.facebook.com/author" className="text-gray-500 text-2xl"><i
                                        className="fab fa-facebook-f"></i></a>
                                <a href="https://www.instagram.com/author" className="text-gray-500 text-2xl"><i
                                        className="fab fa-instagram"></i></a>
                                <a href="https://www.twitter.com/author" className="text-gray-500 text-2xl"><i
                                        className="fab fa-twitter"></i></a>
                                <a href="https://www.linkedin.com/in/author" className="text-gray-500 text-2xl"><i
                                        className="fab fa-linkedin-in"></i></a>
                                <a href="https://www.medium.com/@author" className="text-gray-500 text-2xl"><i
                                        className="fab fa-medium"></i></a>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Read More Button --> */}
                    <div className="flex items-end">
                        <a href="#" className="custom-button mt-auto">Read more &rarr;</a>
                    </div>
                </div>
                

                {/* <!-- Blog Post 4: Upcoming Events --> */}
                
                <div
                    className="flex flex-col justify-between h-full p-6 rounded-lg  border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                    <div className="image">
                        <img alt="Empowering Innovation Image" src="/resources/blogs/githubblog.webp"
                            className="w-full h-48 object-cover mb-4 rounded-lg" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4"> <span className="text-hex "> Unlocking Opportunities: </span> Embracing
                        the GitHub Student Developer Pack</h2>
                    <p className="mb-4">I've poured my heart and soul into an insightful article, and I'd love for you to give
                        it a read!</p>
                    <p className="mb-4"> In this piece, I delve into the opportunities that students can make use of, to expand
                        their horizon in the tech space. This is a topic I'm incredibly passionate about, and I believe it's
                        worth your time. So, if you have a moment to spare, I'd greatly appreciate it if you could check it
                        out. Your support means the world to me...</p>
                    <div className="flex items-center space-x-4 mb-4">
                        {/* <!-- Author Image --> */}
                        <img src="/resources/blogs/Fredrickmwepu3.jpeg" alt="Author Image" className="w-16 h-16 rounded-full" />
                        {/* <!-- Author Info --> */}
                        <div>
                            <h3 className="text-sm font-bold">Fredrick Mwepu</h3>
                            <div className="flex space-x-4 mt-2">
                                <a href="https://www.facebook.com/author" className="text-gray-500 text-2xl"><i
                                        className="fab fa-facebook-f"></i></a>
                                <a href="https://www.instagram.com/author" className="text-gray-500 text-2xl"><i
                                        className="fab fa-instagram"></i></a>
                                <a href="https://www.twitter.com/author" className="text-gray-500 text-2xl"><i
                                        className="fab fa-twitter"></i></a>
                                <a href="https://www.linkedin.com/in/author" className="text-gray-500 text-2xl"><i
                                        className="fab fa-linkedin-in"></i></a>
                                <a href="https://www.medium.com/@author" className="text-gray-500 text-2xl"><i
                                        className="fab fa-medium"></i></a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="custom-button">Read more &rarr;</button>
                    </div>
                </div>
                

                {/* <!-- Blog Post 5: STEM Education in Underserved Communities --> */}
                
                <div
                    className="flex flex-col justify-between h-full p-6 rounded-lg  border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                    <div className="image">
                        <img alt="Empowering Innovation Image" src="/resources/blogs/stackoverflowblog.jpeg"
                            className="w-full h-48 object-cover mb-4 rounded-lg" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4"> <span className="text-hex "> Life made simple: </span> Stack and OpenAI
                        Collaboration</h2>
                    <p className="mb-4">The reliance on Stack Overflow as the go-to platform for developers grappling with bugs
                        and technical hurdles often leads to more confusion than clarity. Despite its vast repository of
                        solutions, the multitude of contributors and their varied approaches can complicate matters further,
                        making it a daunting task to sift through for the most relevant information. This not only consumes
                        precious time but also adds unnecessary stress to the already challenging work of developers...</p>
                    <div className="flex items-center space-x-4 mb-4">
                        {/* <!-- Author Image --> */}
                        <img src="/resources/blogs/Fredrickmwepu3.jpeg" alt="Author Image" className="w-16 h-16 rounded-full" />
                        {/* <!-- Author Info --> */}
                        <div>
                            <h3 className="text-sm font-bold">Fredrick Mwepu</h3>
                            <div className="flex space-x-4 mt-2">
                                <a href="https://www.facebook.com/author" className="text-gray-500 text-2xl"><i
                                        className="fab fa-facebook-f"></i></a>
                                <a href="https://www.instagram.com/author" className="text-gray-500 text-2xl"><i
                                        className="fab fa-instagram"></i></a>
                                <a href="https://www.twitter.com/author" className="text-gray-500 text-2xl"><i
                                        className="fab fa-twitter"></i></a>
                                <a href="https://www.linkedin.com/in/author" className="text-gray-500 text-2xl"><i
                                        className="fab fa-linkedin-in"></i></a>
                                <a href="https://www.medium.com/@author" className="text-gray-500 text-2xl"><i
                                        className="fab fa-medium"></i></a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="custom-button">Read more &rarr;</button>
                    </div>
                </div>
                

                {/* <!-- Blog Post 6: Robotics and AI --> */}               
                <div
                    className="flex flex-col justify-between h-full p-6 rounded-lg  border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                    <div className="image">
                        <img alt="Empowering Innovation Image" src="/resources/blogs/zambiarobotics.jpg"
                            className="w-full h-48 object-cover mb-4 rounded-lg" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4"> <span className="text-hex "> Geneva: </span> My Zambia Robotics
                        Experience </h2>
                    <p className="mb-4">I was privileged to have been among a team of five that represented Zambia in a robotics
                        competition hosted in Switzerland, Geneva. The event is organized by FIRST Global (IFCA), a
                        non-profit organization that seeks to inspire STEM in the youth. The event is an Olympic-styled
                        robotics competition that attracts STEM enthusiasts and innovators from over 180+ countries across
                        the globe annually, with all roads leading to Geneva from the 13th to the 16th of October 2022...
                    </p>
                    <div className="flex items-center space-x-4 mb-4">
                        {/* <!-- Author Image --> */}
                        <img src="/resources/blogs/Fredrickmwepu3.jpeg" alt="Author Image" className="w-16 h-16 rounded-full" />
                        {/* <!-- Author Info --> */}
                        <div>
                            <h3 className="text-sm font-bold">Fredrick Mwepu</h3>
                            <div className="flex space-x-4 mt-2">
                                <a href="https://www.facebook.com/author" className="text-gray-500 text-2xl"><i
                                        className="fab fa-facebook-f"></i></a>
                                <a href="https://www.instagram.com/author" className="text-gray-500 text-2xl"><i
                                        className="fab fa-instagram"></i></a>
                                <a href="https://www.twitter.com/author" className="text-gray-500 text-2xl"><i
                                        className="fab fa-twitter"></i></a>
                                <a href="https://www.linkedin.com/in/author" className="text-gray-500 text-2xl"><i
                                        className="fab fa-linkedin-in"></i></a>
                                <a href="https://www.medium.com/@author" className="text-gray-500 text-2xl"><i
                                        className="fab fa-medium"></i></a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="custom-button">Read more &rarr;</button>
                    </div>
                </div>
                    
            </div>


            {/* <!-- Pagination --> */}
            <div className="flex justify-center mt-12">
                <nav className="inline-flex items-center">
                    <a href="#"
                        className="px-3 py-1 rounded-md border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">1</a>
                    <a href="#"
                        className="px-3 py-1 rounded-md border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">2</a>
                    <a href="#"
                        className="px-3 py-1 rounded-md border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">3</a>
                </nav>
            </div>
        </div>
        <Footer />
    </section>
    );
};

export default Blog;
