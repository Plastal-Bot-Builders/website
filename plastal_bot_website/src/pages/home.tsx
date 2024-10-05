import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const home: React.FC = () => {
    return (
        <section className = "flex flex-col md:flex-row justify-between p-4 space-y-8 md:space-y-0 md:space-x-8 max-w-7xl mx-auto" >
            {/* Include Header */ }
            <Header />
            {/* Hero Section */ }
            <div className="w-full md:w-1/2 p-4">
                <div className="text">
                    <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                        <span className="text-hex typing-animation">Empowering <span
                            className="text-white">Innovation</span></span>
                    </h1>
                    <p className="my-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-500">
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
                    <p className="mb-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-500">
                        That’s why we are equally dedicated to fostering
                        job-ready skills, bridging the gap between
                        education and the workforce. Through partnerships with
                        industry leaders, internships, and career
                        development initiatives, we help learners turn their
                        newfound expertise into tangible career success.
                    </p>
                    <div className="button-container space-y-2">
                        <button className="custom-button">Become a Member</button>
                        <button className="custom-button">Get Involved</button>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2 p-4">
                <div className="image">
                    <img alt="Empowering Innovation Image" height="200"
                        src="/Resources/Illustrations/Cyborg-bro.svg"
                        width="800" className="w-full h-auto object-cover" />
                </div>
            </div>
            {/* Include Footer */ }
            <Footer />
        </section >
    );
};

export default home;
