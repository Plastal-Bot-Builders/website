import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import {
    FaArrowLeft, FaHandHoldingHeart, FaBuilding, FaGraduationCap,
    FaUsers, FaTshirt, FaBullhorn, FaChartLine,
    FaRegLightbulb, FaRobot, FaLaptopCode, FaSchool
} from 'react-icons/fa';
import ThemedImage from '../../theme/ThemedImage';
import { asset } from '../../utils/asset';
import CountUp from '../../components/ui/CountUp';
import { SEOConfig } from '../../components/SEO';
import FadeContent from '../../components/ui/FadeContent';

const FundraisingPage: React.FC = () => {
    // Fundraising channels data
    const fundraisingChannels = [
        {
            title: "Individual Donations",
            description: "Support from everyday champions who believe in our mission to make robotics accessible.",
            icon: <FaHandHoldingHeart className="text-accent text-2xl" />,
            example: "Your K200 helps one student build their first robot.",
            link: "/support/donations"
        },
        {
            title: "Corporate Sponsorships",
            description: "Partnerships with companies supporting education, innovation and CSR initiatives.",
            icon: <FaBuilding className="text-accent text-2xl" />,
            example: "Sponsor a workshop series with branding and media recognition.",
            link: "/support/corporate-partnerships"
        },
        {
            title: "Educational Grants",
            description: "Funding from local and international institutions supporting STEM education.",
            icon: <FaGraduationCap className="text-accent text-2xl" />,
            example: "Projects funded by UNICEF, World Bank Education Grants, or Huawei ICT Academy.",
            link: "#grants"
        },
        {
            title: "Community & Alumni",
            description: "Support from our network of past participants, mentors and supporters.",
            icon: <FaUsers className="text-accent text-2xl" />,
            example: "Our \"Alumni Give Back\" campaign helps fund new student workshops.",
            link: "#alumni"
        },
        {
            title: "Merchandise & Kits",
            description: "Self-sustaining income through educational materials and branded items.",
            icon: <FaTshirt className="text-accent text-2xl" />,
            example: "DIY robotics kits, training manuals, and Plastal-Bot merchandise.",
            link: "/shop"
        },
        {
            title: "Crowdfunding",
            description: "Targeted online campaigns that reach wider global audiences.",
            icon: <FaBullhorn className="text-accent text-2xl" />,
            example: "Our \"Train 500 Students\" campaign on GlobalGiving reached 120% of goal.",
            link: "#crowdfunding"
        }
    ];

    // Impact metrics
    const impactMetrics = [
        {
            metric: "5,000+",
            description: "Students we aim to reach by 2027",
            icon: <FaUsers className="text-accent text-3xl" />
        },
        {
            metric: "50+",
            description: "Schools to equip with robotics kits annually",
            icon: <FaSchool className="text-accent text-3xl" />
        },
        {
            metric: "100%",
            description: "Workshops and programs funded sustainably",
            icon: <FaChartLine className="text-accent text-3xl" />
        },
        {
            metric: "25",
            description: "Scholarships for promising innovators each year",
            icon: <FaGraduationCap className="text-accent text-3xl" />
        }
    ];

    return (
        <>
            <SEOConfig
                title="Fundraising | Plastal-Bot Builders"
                description="Support our mission to empower young Zambians through robotics and STEM education."
                image="/resources/Photos/fredmpelembe.jpeg"
            />
            <section className="scroll-smooth focus:scroll-auto">
                <Header />

                <div className="max-w-7xl mx-auto p-8">
                    <Link to="/support" className="inline-flex items-center text-accent hover:text-accent-hover mb-6">
                        {FaArrowLeft({ className: "mr-2" })} Back to Support
                    </Link>

                    {/* Hero Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                        <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
                            <div className="md:w-1/2">
                                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                    {FaHandHoldingHeart({ className: "inline-block mr-3" })}
                                    Support Our Mission
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
                                    Help us make robotics and AI education accessible to young people across Zambia and beyond.
                                </p>
                                <div className="bg-surface-hover-bg p-4 rounded-lg mb-6">
                                    <p className="italic">
                                        "Every child deserves the chance to explore technology and innovation.
                                        Your support provides materials, mentorship, and opportunities for young innovators across Zambia."
                                    </p>
                                </div>
                                <div className="mt-6">
                                    <a
                                        href="/support/donations"
                                        className="bg-accent hover:bg-accent-hover text-black py-3 px-6 rounded-lg font-bold mr-4"
                                    >
                                        Donate Now
                                    </a>
                                    <a
                                        href="#fundraising-channels"
                                        className="border border-accent text-accent hover:bg-accent hover:text-black py-3 px-6 rounded-lg font-bold"
                                    >
                                        Explore Ways to Help
                                    </a>
                                </div>
                            </div>

                            <div className="md:w-1/2">
                                <ThemedImage
                                    alt="Fundraising Illustration"
                                    src="resources/Illustrations/Fundraising.svg"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    </FadeContent>
                    {/* Fundraising Objectives */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 pb-2">Our Fundraising Objectives</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="bg-surface-hover-bg rounded-lg">
                                    <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center mb-4 border-2 border-accent">
                                        {FaRegLightbulb({ className: "text-accent text-xl" })}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Sustainable Programs</h3>
                                    <p>
                                        Secure consistent funding for workshops, school programs,
                                        and community outreach across Zambia.
                                    </p>
                                </div>

                                <div className="bg-surface-hover-bg rounded-lg">
                                    <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center mb-4 border-2 border-accent">
                                        {FaUsers({ className: "text-accent text-xl" })}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Donor Network</h3>
                                    <p>
                                        Build reliable partnerships with individuals, companies,
                                        and institutions who share our vision.
                                    </p>
                                </div>

                                <div className="bg-surface-hover-bg rounded-lg">
                                    <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center mb-4 border-2 border-accent">
                                        {FaRobot({ className: "text-accent text-xl" })}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Equipment & Materials</h3>
                                    <p>
                                        Fund robotics equipment, training kits, and travel support
                                        for youth events and competitions.
                                    </p>
                                </div>

                                <div className="bg-surface-hover-bg rounded-lg">
                                    <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center mb-4 border-2 border-accent">
                                        {FaChartLine({ className: "text-accent text-xl" })}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Transparency</h3>
                                    <p>
                                        Increase visibility and credibility through transparent
                                        reporting and impact measurement.
                                    </p>
                                </div>

                                <div className="bg-surface-hover-bg rounded-lg">
                                    <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center mb-4 border-2 border-accent">
                                        {FaLaptopCode({ className: "text-accent text-xl" })}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Innovation Projects</h3>
                                    <p>
                                        Create a financial foundation for future expansion and
                                        innovation initiatives across Africa.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </FadeContent>
                    {/* Fundraising Channels */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                        <section id="fundraising-channels" className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 pb-2">Ways to Support Our Work</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {fundraisingChannels.map((channel, index) => (
                                    <div key={index} className="rounded-lg interactive-card p-4 transition-colors">
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-12 bg-surface-hover-bg rounded-full flex items-center justify-center mr-4">
                                                {channel.icon}
                                            </div>
                                            <h3 className="text-xl font-bold">{channel.title}</h3>
                                        </div>

                                        <p className="mb-3">{channel.description}</p>

                                        <div className="bg-surface-hover-bg rounded-lg p-3 mb-4">
                                            <p className="text-sm italic">
                                                <strong>Example:</strong> {channel.example}
                                            </p>
                                        </div>

                                        <a href={channel.link} className="text-accent hover:underline">Learn more →</a>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </FadeContent>
                    {/* Current Campaigns */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 pb-2">Current Fundraising Campaigns</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="rounded-lg interactive-card overflow-hidden">
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={asset('resources/Photos/IMG_5087.jpg')}
                                            alt="School outreach program"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <div className="flex justify-between items-center mb-3">
                                            <h3 className="text-xl font-bold">Adopt-a-School Program</h3>
                                            <span className="bg-accent text-black text-sm py-1 px-2 rounded">Featured</span>
                                        </div>
                                        <p className="mb-4">Help us bring complete robotics kits to 10 schools in rural Zambia by July 2026.</p>

                                        <div className="mb-4">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>Progress: K45,000 of K80,000</span>
                                                <span>56%</span>
                                            </div>
                                            <div className="w-full bg-surface-border rounded-full h-2 overflow-hidden">
                                                <div
                                                    className="bg-accent h-full rounded-full"
                                                    style={{ width: "56%" }}
                                                ></div>
                                            </div>
                                        </div>

                                        <a
                                            href="/support/donations"
                                            className="block text-center bg-accent hover:bg-accent-hover text-black py-2 px-4 rounded-lg"
                                        >
                                            Support This Campaign
                                        </a>
                                    </div>
                                </div>

                                <div className="rounded-lg interactive-card overflow-hidden">
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={asset('resources/Photos/IMG_5043.jpg')}
                                            alt="Robotics competition"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <div className="flex justify-between items-center mb-3">
                                            <h3 className="text-xl font-bold">National Competition Fund</h3>
                                            <span className="bg-surface-border text-sm py-1 px-2 rounded">Ongoing</span>
                                        </div>
                                        <p className="mb-4">Support travel and participation costs for students attending the Pan-African Robotics Challenge.</p>

                                        <div className="mb-4">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>Progress: K12,000 of K30,000</span>
                                                <span>40%</span>
                                            </div>
                                            <div className="w-full bg-surface-border rounded-full h-2 overflow-hidden">
                                                <div
                                                    className="bg-accent h-full rounded-full"
                                                    style={{ width: "40%" }}
                                                ></div>
                                            </div>
                                        </div>

                                        <a
                                            href="/support/donations"
                                            className="block text-center bg-accent hover:bg-accent-hover text-black py-2 px-4 rounded-lg"
                                        >
                                            Support This Campaign
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FadeContent>
                    {/* Donor Engagement Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                        <section className="mb-12 bg-surface-hover-bg rounded-lg">
                            <h2 className="text-2xl font-bold mb-6">How We Engage Our Supporters</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <div className="mb-6">
                                        <h3 className="text-xl font-bold mb-3">Regular Updates</h3>
                                        <p>
                                            We keep our supporters informed through newsletters and
                                            social media updates that showcase the impact of their contributions.
                                        </p>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-xl font-bold mb-3">Transparency</h3>
                                        <p>
                                            We publish detailed reports and infographics showing exactly
                                            how funds were used and what impact they created.
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-6">
                                        <h3 className="text-xl font-bold mb-3">Recognition</h3>
                                        <p>
                                            We publicly acknowledge our supporters (with consent) on our
                                            website, social media, and at events.
                                        </p>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-xl font-bold mb-3">Exclusive Access</h3>
                                        <p>
                                            Major supporters receive early invitations to events and
                                            behind-the-scenes previews of our work and impact.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-surface-border mt-4 pt-4">
                                <blockquote className="italic text-center">
                                    "A big thank you to everyone who contributed to our Ndola Robotics Workshop —
                                    your support helped 40 young innovators learn to build their first autonomous robots!"
                                </blockquote>
                            </div>
                        </section>
                    </FadeContent>
                    {/* Impact Vision */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 pb-2">Our Impact Vision</h2>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                                {impactMetrics.map((item, index) => (
                                    <div key={index} className="text-center p-4">
                                        <div className="flex justify-center mb-4">
                                            {item.icon}
                                        </div>
                                        <div className="text-3xl font-bold text-accent mb-2">
                                            {/* Replace static metrics with CountUp */}
                                            {item.metric === "5,000+" ? (
                                                <CountUp
                                                    from={0}
                                                    to={5000}
                                                    separator=","
                                                    suffix="+"
                                                    duration={2.5}
                                                />
                                            ) : item.metric === "50+" ? (
                                                <CountUp
                                                    from={0}
                                                    to={50}
                                                    suffix="+"
                                                    duration={1.5}
                                                />
                                            ) : item.metric === "100%" ? (
                                                <CountUp
                                                    from={0}
                                                    to={100}
                                                    suffix="%"
                                                    duration={2}
                                                />
                                            ) : item.metric === "25" ? (
                                                <CountUp
                                                    from={0}
                                                    to={25}
                                                    duration={1.5}
                                                />
                                            ) : (
                                                item.metric
                                            )}
                                        </div>
                                        <p className="text-sm">{item.description}</p>
                                    </div>
                                ))}
                            </div>

                            <p className="text-center text-lg">
                                Through our fundraising efforts, we're building Zambia's strongest youth-driven
                                robotics movement — powered by community and generosity.
                            </p>
                        </section>
                    </FadeContent>
                    {/* Accountability Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                        <section id="accountability" className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 pb-2">Our Commitment to Accountability</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="rounded-lg interactive-card p-5">
                                    <h3 className="text-lg font-bold mb-3">Annual Reports</h3>
                                    <p className="mb-4">We publish yearly impact and financial summaries showing how funds were used.</p>
                                    <a href="#reports" className="text-accent hover:underline">View our latest report →</a>
                                </div>

                                <div className="rounded-lg interactive-card p-5">
                                    <h3 className="text-lg font-bold mb-3">Visual Documentation</h3>
                                    <p className="mb-4">We create videos and photo galleries of all funded activities and their outcomes.</p>
                                    <a href="/gallery" className="text-accent hover:underline">Browse our media gallery →</a>
                                </div>

                                <div className="rounded-lg interactive-card p-5">
                                    <h3 className="text-lg font-bold mb-3">Sponsor Reports</h3>
                                    <p className="mb-4">Corporate sponsors receive detailed summaries of what their funds achieved.</p>
                                    <a href="/support/corporate-partnerships" className="text-accent hover:underline">Learn about sponsorships →</a>
                                </div>
                            </div>
                        </section>
                    </FadeContent>
                    {/* Long-Term Sustainability */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                        <section className="mb-12 bg-surface-hover-bg rounded-lg">
                            <h2 className="text-2xl font-bold mb-5">Long-Term Sustainability Plan</h2>

                            <div className="space-y-4">
                                <p>
                                    We're building a sustainable future for Plastal-Bot Builders through:
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-surface rounded-lg">
                                        <h3 className="font-bold mb-2">Recurring Support</h3>
                                        <p className="text-sm">
                                            Building a supporter database for consistent monthly donations and
                                            sustained program funding.
                                        </p>
                                    </div>

                                    <div className="bg-surface rounded-lg">
                                        <h3 className="font-bold mb-2">Digital Learning Platform</h3>
                                        <p className="text-sm">
                                            Creating a subscription-based platform to provide ongoing
                                            education and generate revenue.
                                        </p>
                                    </div>

                                    <div className="bg-surface rounded-lg">
                                        <h3 className="font-bold mb-2">Corporate Training</h3>
                                        <p className="text-sm">
                                            Introducing tech and robotics training services for companies
                                            to fund our youth programs.
                                        </p>
                                    </div>

                                    <div className="bg-surface rounded-lg">
                                        <h3 className="font-bold mb-2">Plastal-Bot Foundation</h3>
                                        <p className="text-sm">
                                            Forming a legal foundation to manage large grants and ensure
                                            long-term financial stability.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FadeContent>
                    {/* CTA Section */}
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                        <section className="bg-surface border-2 border-accent rounded-lg overflow-hidden">
                            <div className="p-6 md:p-8 text-center">
                                <h2 className="text-3xl font-bold mb-4">Turn Curiosity into Creation</h2>
                                <p className="text-lg mb-6 max-w-2xl mx-auto">
                                    Support Plastal-Bot Builders today and help us empower the next generation of
                                    innovators, one robot at a time.
                                </p>

                                <div className="flex flex-col md:flex-row gap-4 justify-center">
                                    <a
                                        href="/support/donations"
                                        className="bg-accent hover:bg-accent-hover text-black py-3 px-6 rounded-lg font-bold"
                                    >
                                        Make a Donation
                                    </a>
                                    <a
                                        href="/support/corporate-partnerships"
                                        className="border border-accent text-accent hover:bg-accent hover:text-black py-3 px-6 rounded-lg font-bold"
                                    >
                                        Become a Sponsor
                                    </a>
                                    <a
                                        href="/contact"
                                        className="border border-surface-border hover:border-accent py-3 px-6 rounded-lg font-bold"
                                    >
                                        Contact Us
                                    </a>
                                </div>
                            </div>
                        </section>
                    </FadeContent>
                </div>

                <Footer />
            </section>
        </>
    );
};

export default FundraisingPage;