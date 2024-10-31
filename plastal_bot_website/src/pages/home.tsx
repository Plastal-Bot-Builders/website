import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageCarousel from '../components/ImageCarousel';
import LogoCarousel from '../components/LogoCarousel';
import Typewriter from '../components/Typewriter';
import Button from '../components/Button'
import { cn } from "../lib/utils";
import ScrollAnimation from '../components/ScrollAnimation/ScrollAnimation';


const Home: React.FC = () => {
    return (
               
        <section className="scroll-smooth focus:scroll-auto">
                {/* Navigation Bar  */}
                <Header />
                {/* Main Content */}
                <ScrollAnimation> 
                    <div
                        className="flex flex-col md:flex-row justify-between p-4 space-y-8 md:space-y-0 md:space-x-8 max-w-7xl mx-auto">
                        <div className="w-full md:w-1/2 p-4">
                            <div className="text">
                                <Typewriter text="Empowering Innovation" speed={150} className="text-4xl text-hex mb-4 font-extrabold leading-none tracking-tight  md:text-5xl lg:text-6xl dark:text-white" />
                                <p className="my-4 text-sm">
                                    We’re committed to making life-changing technology
                                    education accessible to all, regardless of
                                    background or location. By offering innovative and
                                    inclusive learning opportunities, we aim to equip
                                    individuals with the critical skills needed to thrive in
                                    today’s digital economy. From foundational courses
                                    in coding and data science to advanced programs in
                                    artificial intelligence, cybersecurity, and
                                    cloud computing, our goal is to break down barriers to
                                    education and create a pathway for
                                    everyone to explore their potential.
                                    But our mission doesn’t stop at education. We recognize
                                    that learning is only the first step;
                                    real empowerment comes when individuals can translate
                                    their knowledge into meaningful employment
                                    opportunities.
                                </p>
                                <p
                                    className="mb-4 text-sm">
                                    That’s why we are equally dedicated to fostering
                                    job-ready skills, bridging the gap between
                                    education and the workforce. Through partnerships with
                                    industry leaders, internships, and career
                                    development initiatives, we help learners turn their
                                    newfound expertise into tangible career success.
                                </p>
                                <div className="button-container space-x-6 mt-12">
                                    <Button label="Become a Member" href="/membershipform" />                        
                                    <Button label="Get Involved" href="/programs" />                           
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 p-4">
                            <div className="image">
                                <img alt="Empowering Innovation Image" height="200"
                                    src="/resources/Illustrations/Cyborg-bro.svg"
                                    width="800" className="w-full h-auto object-cover" />
                            </div>
                        </div>
                    </div>
                </ScrollAnimation>
                <ScrollAnimation> 
                    <div
                        className="flex flex-col md:flex-row justify-between p-4 space-y-8 md:space-y-0 md:space-x-8 max-w-7xl mx-auto">
                        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-70" />       
                        {/* Sub-div 1 */}
                        <div className="w-full md:w-1/2 p-4">
                            <div>
                                <h1
                                    className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                                    <Typewriter text="Fostering Innovation" className="text-4xl text-hex mb-4 font-extrabold leading-none tracking-tight  md:text-5xl lg:text-6xl dark:text-white"/>
                                </h1>
                                <p className="mt-4 text-gray-100 text-lg">
                                    Technology empowers people to think creatively and push
                                    boundaries. It opens new avenues for innovation,
                                    allowing entrepreneurs and researchers to develop
                                    solutions that were once thought impossible. Whether
                                    it’s artificial intelligence revolutionizing healthcare
                                    or renewable energy transforming our environmental
                                    practices, technology enables us to dream big and
                                    achieve even more.
                                </p>
                                <div className="ml-8 p-6 rounded-lg mb-4">
                                    {/* <!-- First child of first sub-div --> */}
                                    <img src="/resources/Illustrations/Cyborg-bro.svg"
                                        alt="Introduction to Robotics" className="mb-4" />
                                </div>
                                <h1
                                    className="mt-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                                    <span className="text-hex"> Bridging </span> Gaps
                                </h1>
                                <p className="mt-4 text-gray-100 text-lg">
                                    One of the most significant impacts of technology is its
                                    ability to connect people and resources. Through digital
                                    platforms, communities are no longer constrained by
                                    geographical boundaries. Remote working, virtual
                                    collaboration, and online learning platforms have made
                                    it possible for people to engage, learn, and grow from
                                    anywhere in the world. This empowerment extends beyond
                                    individuals, enabling businesses and governments to
                                    collaborate on a global scale.
                                </p>
                            </div>
                        </div>

                        {/* <!-- Sub-div 2 --> */}
                        <div className="w-full md:w-1/2 p-4">
                            <h1
                                className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                                <Typewriter text="Enhancing Education" className="text-4xl text-hex mb-4 font-extrabold leading-none tracking-tight  md:text-5xl lg:text-6xl dark:text-white"/>
                            </h1>
                            <div className="ml-8 p-6 rounded-lg mb-4">
                                {/* <!-- First child of first sub-div --> */}
                                <img
                                    src="/resources/Illustrations/Mathematics-bro (1) 1.svg"
                                    alt="Introduction to Robotics" className="mb-4" />
                            </div>
                            <p className="mt-4 text-gray-100 text-lg">
                                In education, technology has become a catalyst for change.
                                Digital tools such as interactive software, online courses,
                                and e-learning platforms provide personalized learning
                                experiences, making education more accessible to all.
                                Students can now gain knowledge and skills from world-className
                                institutions, regardless of their location or socioeconomic
                                background, further leveling the playing field for future
                                generations. Empowering technology plays a critical role in
                                addressing climate change, resource depletion, and other
                                global environmental challenges. Through advancements in
                                clean energy, sustainable agriculture, and waste management
                                technologies, we are creating a more sustainable world.
                                These innovations empower individuals and industries to
                                reduce their environmental impact and contribute to a
                                healthier planet.
                            </p>
                        </div>
                    </div>
                </ScrollAnimation> 
                <ScrollAnimation> 
                    <div className="max-w-7xl mx-auto p-6">
                    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-70" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* <!-- First Bento Box --> */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-2 gap-4">
                                {/* <!-- Large Block (2x2) --> */}
                                <div
                                    className="col-span-1 sm:col-span-2 row-span-2 pr-4 p-4 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                                    <h1
                                        className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
                                        <span className="text-hex"> What </span> is <span
                                            className="text-hex"> Robotics? </span>
                                    </h1>
                                    <img
                                        src="/resources/Robotics/jelleke-vanooteghem-6NUlOHM40w8-unsplash.jpg"
                                        alt="Introduction to Robotics"
                                        className="w-full h-64 object-cover rounded-lg mb-4" />
                                    <p className="text-lg text-gray-100">The applications of
                                        robotics are vast and diverse, ranging from
                                        industrial automation, where robots perform
                                        repetitive tasks on assembly lines, to healthcare,
                                        where they assist in surgeries or provide patient
                                        care. Other sectors include agriculture, space
                                        exploration, logistics, and entertainment,
                                        showcasing the potential of robotics to
                                        revolutionize how we work and live.</p>
                                    <p className="mt-4 text-lg text-gray-100">As robotics
                                        continues to evolve, it poses exciting challenges
                                        and opportunities, pushing the boundaries of
                                        innovation and shaping the future of technology.
                                        With ongoing research and development, the
                                        integration of advanced robotics into everyday life
                                        promises to enhance efficiency, safety, and
                                        productivity across various domains.</p>
                                    <button 
                                        className="mt-4 custom-button">Learn more about
                                        Robotics...</button>
                                </div>

                                {/* <!-- Small Block 1 --> */}
                                <div
                                    className="col-span-1 flex justify-center items-center p-4 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                                    <h1
                                        className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
                                        <span className="text-hex"> Electrical </span>
                                        Engineering
                                    </h1>
                                </div>

                                {/* <!-- Small Block 2 --> */}
                                <div
                                    className="col-span-1 flex justify-center items-center p-4 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                                    <div>
                                        <h1
                                            className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
                                            <span className="text-hex"> Electrical </span>
                                            Engineering
                                        </h1>
                                        <p className="text-sm text-gray-100">Electrical
                                            engineers focus on the circuitry, power systems,
                                            and control mechanisms that bring robots to
                                            life.</p>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Second Bento Box (New Arrangement) --> */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-2 gap-4">
                                {/* <!-- Small Block 1 (Top Left) -- */}
                                <div
                                    className="col-span-1 row-span-1 flex justify-center items-center p-4 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out" >
                                    <div>
                                        <h1
                                            className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
                                            <span className="text-hex"> Artificial </span>
                                            Intelligence (AI)
                                        </h1>
                                        <p className="text-sm text-gray-100">AI plays a pivotal
                                            role in robotics, enabling robots to learn,
                                            adapt, and perform tasks with greater
                                            precision.</p>
                                    </div>
                                </div>

                                {/* <!-- Large Block (2x1) (Top Right) --> */}
                                <div
                                    className="col-span-1 sm:col-span-2 row-span-1 p-4 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                                    <h1
                                        className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
                                        <span className="text-hex"> Application </span> of <span
                                            className="text-hex"> Robotics </span>
                                    </h1>
                                    <img
                                        src="/resources/Robotics/jelleke-vanooteghem-6NUlOHM40w8-unsplash.jpg"
                                        alt="Robotics Applications"
                                        className="w-full h-32 object-cover rounded-lg mb-4" />
                                    <p className="text-lg text-gray-100">Robotics is used in
                                        various industries, from manufacturing and
                                        healthcare to space exploration. Robots automate
                                        processes and perform tasks too dangerous or precise
                                        for humans.</p>
                                    <button className="mt-4 btn custom-button">Explore
                                        applications of Robotics...</button>
                                </div>

                                {/* <!-- Large Block (Bottom Left) (2x1) --> */}
                                <div
                                    className="col-span-1 sm:col-span-2 row-span-1 p-4 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                                    <h1
                                        className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
                                        <span className="text-hex"> Ethics </span> in <span
                                            className="text-hex"> Robotics </span>
                                    </h1>
                                    <p className="mt-4 text-gray-100 text-sm">As robots become
                                        more integrated into society, ethical concerns about
                                        autonomy, safety, and human rights arise.
                                        Understanding these issues is essential as robotics
                                        advances.</p>
                                    <p className="mt-4 text-gray-100 text-sm">As robots become
                                        more integrated into society, ethical concerns about
                                        autonomy, safety, and human rights arise.
                                        Understanding these issues is essential as robotics
                                        advances.</p>
                                    <p className="mt-4 text-gray-100 text-sm">Understanding
                                        these ethical concerns is essential as robotics
                                        advances. It is imperative for researchers,
                                        developers, policymakers, and society at large to
                                        engage in open dialogue about the implications of
                                        robotics on human values. By proactively addressing
                                        these issues, we can work towards creating a future
                                        where robotics serves humanity positively and
                                        responsibly, enhancing quality of life while
                                        safeguarding fundamental ethical principles.</p>
                                </div>

                                {/* <!-- Small Block 2 (Bottom Right) --> */}
                                <div
                                    className="col-span-1 row-span-1 flex justify-center items-center p-4 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                                    <div>
                                        <h1
                                            className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
                                            <span className="text-hex">Sensors</span>
                                        </h1>
                                        <p className="text-sm text-gray-100">Sensors allow
                                            robots to interact with their environment. These
                                            include vision, touch, and auditory sensors,
                                            helping robots understand and adapt to their
                                            surroundings.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollAnimation> 
                <ScrollAnimation> 
                    <div className="max-w-7xl mx-auto p-6">
                    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-70" />
                        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
                            {/* <!-- Large Block --> */}
                            <div className="col-span-1 md:col-span-2 md:row-span-2 mb-4 p-4 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                                {/* <!-- Image Carousel Container --> */}
                                <ImageCarousel />
                                <h1
                                    className="mt-4 mb-8 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
                                    <span className="text-hex">Featured </span> Article
                                </h1>
                                <p className="text-lg text-gray-100">Robots play an increasingly
                                    vital role in the building, maintenance, and
                                    optimization of renewable energy systems, such as wind
                                    turbines, solar panels, and other sustainable
                                    technologies. As the world shifts towards cleaner energy
                                    sources to combat climate change, robotics is proving to
                                    be a key enabler in making these technologies more
                                    efficient and cost-effective, ultimately contributing to
                                    the reduction of carbon emissions.</p>
                                <p className="mt-2 text-gray-100 text-lg">As renewable energy
                                    systems continue to grow in scale and importance, the
                                    role of robotics will only expand, further driving
                                    innovations in sustainability and helping to meet global
                                    carbon reduction goals. By improving the efficiency and
                                    reliability of these systems, robots are paving the way
                                    for a greener, more sustainable future.</p>
                                <button className="mt-4 custom-button">Read
                                    More...</button>
                            </div>

                            {/* <!-- Tall Block --> */}
                            <div
                                className="col-span-1 md:row-span-2 flex justify-center items-center p-4 ">
                                <div className="text-center">
                                    <img
                                        src="/resources/Illustrations/Visionarytechnology.svg"
                                        alt="Introduction to Robotics" />
                                </div>
                            </div>

                            {/* <!-- Small Block 1 --> */}
                            <div
                                className="col-span-1 row-span-1 flex flex-col md:flex-row items-center p-6 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                                <div className="w-full md:w-1/2 h-full">
                                    <img src="/resources/Photos/IMG_4781.jpeg"
                                        alt="Reference Image"
                                        className="w-full h-full object-cover" />
                                </div>
                                <div className="w-full md:w-1/2 p-6">
                                    <h1
                                        className="break-words truncate mb-4 text-sm font-extrabold leading-none tracking-tight text-gray-900 md:text-base lg:text-base dark:text-white">
                                        <span className="text-hex">Research </span>
                                        Opportunities
                                    </h1>
                                    <p className="text-xxs text-gray-600 break-words truncate">
                                        Description for block 1 goes here.</p>
                                </div>
                            </div>

                            {/* <!-- Small Block 2 --> */}
                            <div
                                className="col-span-1 row-span-1 flex flex-col md:flex-row items-center p-6 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                                <div className="w-full md:w-1/2 h-full">
                                    <img src="/resources/Photos/IMG_4781.jpeg"
                                        alt="Reference Image"
                                        className="w-full h-full object-cover"/>
                                </div>
                                <div className="w-full md:w-1/2 p-6">
                                    <h1
                                        className="break-words truncate mb-4 text-sm font-extrabold leading-none tracking-tight text-gray-900 md:text-base lg:text-base dark:text-white break-words truncate"
                                        >
                                        <span className="text-hex">Mentorship </span>
                                        Opportunities
                                    </h1>
                                    <p className="text-xxs text-gray-600 break-words truncate">
                                        Description for block 2 goes here.</p>
                                </div>
                            </div>

                            {/* <!-- Small Block 3 --> */}
                            <div
                                className="col-span-1 row-span-1 flex flex-col md:flex-row items-center p-6 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                                <div className="w-full md:w-1/2 h-full">
                                    <img src="/resources/Photos/IMG_4781.jpeg"
                                        alt="Reference Image"
                                        className="w-full h-full object-cover"/>
                                </div>
                                <div className="w-full md:w-1/2 p-6">
                                    <h1
                                        className="mb-4 text-sm font-extrabold leading-none tracking-tight text-gray-900 md:text-base lg:text-base dark:text-white break-words truncate"
                                        >
                                        <span className="text-hex">Sponsorship </span>
                                        Opportunities
                                    </h1>
                                    <p className="text-xxs text-gray-600 break-words truncate"
                                        >Description
                                        for block 3 goes here.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollAnimation> 
                <ScrollAnimation> 
                    <div className="max-w-7xl mx-auto p-6">
                    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-70" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div
                                className="flex flex-col md:flex-row justify-between mt-8 space-y-8 md:space-y-0 md:space-x-8">
                                <div className="w-full md:w-1/2 p-4">
                                    <div className="text">
                                        <h1
                                            className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                                            <span className="text-hex"> What Our </span>
                                            <span className="text-white">Students Say</span>
                                        </h1>
                                        <p className="my-4 text-lg text-gray-500">
                                            Our students share their experiences and
                                            thoughts about our programs and services.
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 p-4">
                                    <div className="image">
                                        <img src="/resources/Photos/review2.png" />
                                    </div>
                                </div>
                            </div>
                            <div
                                className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
                                <div
                                    className="col-span-1 row-span-1 flex justify-center items-center p-4 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                                    <div>
                                        <p
                                            className="italic text-gray-600 dark:text-gray-300">"Great design skills and attention to detail."</p>
                                        <div className="mt-4">
                                            <p
                                                className="text-sm font-medium text-gray-500 dark:text-gray-400">Mwiza
                                                Nyondo</p>
                                            <p
                                                className="text-sm font-medium text-gray-900 dark:text-white">Pupil</p>
                                            <p
                                                className="text-sm font-medium text-gray-500 dark:text-gray-400">Konkola
                                                Secondary School</p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="col-span-1 row-span-1 flex justify-center items-center p-4 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                                    <div>
                                        <p
                                            className="italic text-gray-600 dark:text-gray-300">"Amazing at UX writing and brand strategy."</p>
                                        <div className="mt-4">
                                            <p
                                                className="text-sm font-medium text-gray-500 dark:text-gray-400">Alice
                                                Cooper</p>
                                            <p
                                                className="text-sm font-medium text-gray-900 dark:text-white">Senior
                                                Product Designer</p>
                                            <p
                                                className="text-sm font-medium text-gray-500 dark:text-gray-400">UX
                                                | Writing | Branding</p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="col-span-1 row-span-1 flex justify-center items-center p-4 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                                    <div>
                                        <p
                                            className="italic text-gray-600 dark:text-gray-300">"Brilliant with illustrations and product design."</p>
                                        <div className="mt-4">
                                            <p
                                                className="text-sm font-medium text-gray-500 dark:text-gray-400">Colin
                                                Peter</p>
                                            <p
                                                className="text-sm font-medium text-gray-900 dark:text-white">Senior
                                                Product Designer</p>
                                            <p
                                                className="text-sm font-medium text-gray-500 dark:text-gray-400">UX
                                                | Branding | Illustration</p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="col-span-1 row-span-1 flex justify-center items-center p-4 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                                    <div>
                                        <p
                                            className="italic text-gray-600 dark:text-gray-300">"Creative and talented with motion design."</p>
                                        <div className="mt-4">
                                            <p
                                                className="text-sm font-medium text-gray-500 dark:text-gray-400">Gaelle
                                                De Martin</p>
                                            <p
                                                className="text-sm font-medium text-gray-900 dark:text-white">Product
                                                Designer</p>
                                            <p
                                                className="text-sm font-medium text-gray-500 dark:text-gray-400">UX
                                                | Illustration | Motion</p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="col-span-1 row-span-1 flex justify-center items-center p-4 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                                    <div>
                                        <p
                                            className="italic text-gray-600 dark:text-gray-300">"Top-notch branding and UX skills."</p>
                                        <div className="mt-4">
                                            <p
                                                className="text-sm font-medium text-gray-500 dark:text-gray-400">Gabriel
                                                Petersen</p>
                                            <p
                                                className="text-sm font-medium text-gray-900 dark:text-white">Product
                                                Designer</p>
                                            <p
                                                className="text-sm font-medium text-gray-500 dark:text-gray-400">UI
                                                | UX | Branding</p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="col-span-1 row-span-1 flex justify-center items-center p-4 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out">
                                    <div>
                                        <p
                                            className="italic text-gray-600 dark:text-gray-300">"A brilliant illustrator with a unique style."</p>
                                        <div className="mt-4">
                                            <p
                                                className="text-sm font-medium text-gray-500 dark:text-gray-400">Deirdre
                                                Robinson</p>
                                            <p
                                                className="text-sm font-medium text-gray-900 dark:text-white">Illustrator</p>
                                            <p
                                                className="text-sm font-medium text-gray-500 dark:text-gray-400">Branding
                                                | Illustration | Motion</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollAnimation> 
                <ScrollAnimation> 
                    <div className="max-w-7xl mx-auto p-4">
                    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-70" />
                        <div
                            className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-8">
                            <div className="w-full md:w-1/2 p-4">
                                <div className="text">
                                    <h1
                                        className="mb-6 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                                        <span className="text-hex">Subscribe To Our</span>
                                        Newsletter
                                    </h1>
                                    <p className="my-4 text-lg text-gray-500">
                                        We’re committed to making life-changing
                                        technology education accessible to all,
                                        regardless of
                                        background or location. By offering innovative
                                        and inclusive learning opportunities, we aim to
                                        equip individuals with the critical skills
                                        needed to thrive in today’s digital economy.
                                        From
                                        foundational courses in coding and data science
                                        to advanced programs in artificial intelligence,
                                        cybersecurity, and cloud computing, our goal is
                                        to break down barriers to education and create a
                                        pathway for everyone to explore their potential.
                                        But our mission doesn’t stop at education. We
                                        recognize that learning is only the first step;
                                        real empowerment comes when individuals can
                                        translate their knowledge into meaningful
                                        employment opportunities.
                                    </p>
                                    <p
                                        className="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400">
                                        That’s why we are equally dedicated to fostering
                                        job-ready skills, bridging the gap between
                                        education and the workforce. Through
                                        partnerships with industry leaders, internships,
                                        and career
                                        development initiatives, we help learners turn
                                        their newfound expertise into tangible career
                                        success.
                                    </p>
                                    <div
                                        className="mt-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                        <div className="w-full sm:w-auto">
                                            <input type="text"
                                                placeholder="Enter your Email"
                                                id="floating_outlined"
                                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer hover:border-[#0CFFBB]" />
                                        </div>
                                        <button
                                            className="custom-button w-full sm:w-auto"> Send Email</button>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 p-4">
                                <div className="image">
                                    <img src="/resources/Illustrations/Subscriber1.svg"
                                        alt="Introduction to Robotics" />
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollAnimation> 
                <ScrollAnimation>
                    <LogoCarousel />
                </ScrollAnimation>
                <Footer />
        </section>
    );
};

export default Home;
