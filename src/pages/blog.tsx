import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { asset } from '../utils/asset';
import { SEOConfig } from '../components/SEO';
import FadeContent from '../components/ui/FadeContent';
import DecryptedText from '../components/ui/DecryptedText';

const Blog: React.FC = () => {
    const navigate = useNavigate();

    const blogPosts = [
        {
            id: 1,
            image: 'resources/blogs/blog2.png',
            title: 'Bridging the Digital Divide:',
            subtitle: 'Empowering Zambian Youth through Robotics and Programming',
            excerpt: "In Zambia, there's a common belief that teaching robotics isn't practical due to perceived infrastructural limitations, cultural clashes, and limited job prospects. However, robotics education can be a game-changer. By offering young Zambians the chance to dive into robotics, they gain skills vital for navigating today's tech-driven world.",
            author: {
                name: 'Plastal-Bot Builders',
                image: 'resources/blogs/1-04.png'
            }
        },
        {
            id: 2,
            image: 'resources/blogs/smartbin.png',
            title: 'WasteWizard:',
            subtitle: 'Revolutionizing Waste Management in Zambia',
            excerpt: "As Zambia experiences rapid urbanization and population growth, waste management challenges are becoming more severe. Introducing WasteWizard, an innovative autonomous smart bin system that leverages cutting-edge IoT technology to tackle these issues.",
            author: {
                name: 'Plastal-Bot Builders',
                image: 'resources/blogs/1-04.png'
            }
        },
        {
            id: 3,
            image: 'resources/blogs/sepoblog.jpeg',
            title: 'Reflecting:',
            subtitle: "'Introduction to Robotics and Programming'",
            excerpt: "When I started this journey three weeks ago, hosting the 'Introduction to Robotics and Programming' workshop, I was filled with excitement and a bit of nervousness. We aimed to introduce young minds to the fascinating world of robotics and programming.",
            author: {
                name: 'Sepo Konayuma',
                image: 'resources/founders/sepo.jpeg'
            }
        },
        {
            id: 4,
            image: 'resources/blogs/githubblog.webp',
            title: 'Unlocking Opportunities:',
            subtitle: 'Embracing the GitHub Student Developer Pack',
            excerpt: "I've poured my heart and soul into an insightful article, and I'd love for you to give it a read! In this piece, I delve into the opportunities that students can make use of, to expand their horizon in the tech space.",
            author: {
                name: 'Fredrick Mwepu',
                image: 'resources/blogs/Fredrickmwepu3.jpeg'
            }
        },
        {
            id: 5,
            image: 'resources/blogs/stackoverflowblog.jpeg',
            title: 'Life made simple:',
            subtitle: 'Stack and OpenAI Collaboration',
            excerpt: "The reliance on Stack Overflow as the go-to platform for developers grappling with bugs and technical hurdles often leads to more confusion than clarity. Despite its vast repository of solutions, the multitude of contributors can complicate matters further.",
            author: {
                name: 'Fredrick Mwepu',
                image: 'resources/blogs/Fredrickmwepu3.jpeg'
            }
        },
        {
            id: 6,
            image: 'resources/blogs/zambiarobotics.jpg',
            title: 'Geneva:',
            subtitle: 'My Zambia Robotics Experience',
            excerpt: "I was privileged to have been among a team of five that represented Zambia in a robotics competition hosted in Switzerland, Geneva. The event is organized by FIRST Global (IFCA), a non-profit organization that seeks to inspire STEM in the youth.",
            author: {
                name: 'Fredrick Mwepu',
                image: 'resources/blogs/Fredrickmwepu3.jpeg'
            }
        }
    ];
    
    return (
        <>
            <SEOConfig
                title="Blog | Plastal-Bot Builders"
                description="Stay updated with the latest from our robotics workshops, STEM events, and sustainability projects."
                image="/resources/Photos/fredmpelembe.jpeg"
            />
            <div className="scroll-smooth focus:scroll-auto">
                <Header />
                
                {/* Hero Section */}
                <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                        <div className="max-w-7xl mx-auto">
                            <h1 className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                                <span className="text-hex">Blog</span> Posts 
                            </h1>
                            
                            <DecryptedText
                                text="Stay updated with the latest from our robotics workshops, STEM events, and sustainability projects. Our blog covers event highlights, articles, and key updates on how we're making a difference through technology and education."
                                parentClassName="block mb-8"
                                className="text-sm sm:text-base md:text-lg leading-relaxed"
                                animateOn="view"
                                revealDirection="start"
                            />
                        </div>
                    </section>
                </FadeContent>

                {/* Blog Posts Grid */}
                <FadeContent blur={true} duration={1200} easing="ease-out" initialOpacity={0} delay={200}>
                    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                {blogPosts.map((post, index) => (
                                    <article
                                        key={post.id}
                                        className="interactive-card p-6 flex flex-col justify-between transform hover:scale-105 transition-all duration-300"
                                        style={{ transitionDelay: `${index * 50}ms` }}
                                    >
                                        {/* Image */}
                                        <div className="mb-4">
                                            <img 
                                                alt={post.subtitle}
                                                src={asset(post.image)}
                                                className="w-full h-48 sm:h-56 object-cover rounded-lg" 
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-grow">
                                            <h2 className="text-xl sm:text-2xl font-bold mb-3">
                                                <span className="text-hex">{post.title}</span> {post.subtitle}
                                            </h2>
                                            <p className="mb-4 text-sm sm:text-base leading-relaxed line-clamp-4">
                                                {post.excerpt}
                                            </p>
                                        </div>

                                        {/* Author Info */}
                                        <div className="mt-4">
                                            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-surface">
                                                <img 
                                                    src={asset(post.author.image)} 
                                                    alt={post.author.name}
                                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover" 
                                                />
                                                <div className="flex-grow">
                                                    <h3 className="text-sm sm:text-base font-bold">{post.author.name}</h3>
                                                    <div className="flex gap-3 mt-1">
                                                        <a 
                                                            href="#" 
                                                            className="text-current hover:text-accent transition-colors text-lg"
                                                            aria-label="Facebook"
                                                        >
                                                            <i className="fab fa-facebook-f"></i>
                                                        </a>
                                                        <a 
                                                            href="#" 
                                                            className="text-current hover:text-accent transition-colors text-lg"
                                                            aria-label="Instagram"
                                                        >
                                                            <i className="fab fa-instagram"></i>
                                                        </a>
                                                        <a 
                                                            href="#" 
                                                            className="text-current hover:text-accent transition-colors text-lg"
                                                            aria-label="Twitter"
                                                        >
                                                            <i className="fab fa-twitter"></i>
                                                        </a>
                                                        <a 
                                                            href="#" 
                                                            className="text-current hover:text-accent transition-colors text-lg"
                                                            aria-label="LinkedIn"
                                                        >
                                                            <i className="fab fa-linkedin-in"></i>
                                                        </a>
                                                        <a 
                                                            href="#" 
                                                            className="text-current hover:text-accent transition-colors text-lg"
                                                            aria-label="Medium"
                                                        >
                                                            <i className="fab fa-medium"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Read More Button */}
                                            <button 
                                                className="custom-button w-full"
                                                onClick={() => navigate(`/blog/${post.id}`)}
                                            >
                                                Read more →
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>
                </FadeContent>

                {/* Pagination */}
                <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={400}>
                    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
                        <div className="max-w-7xl mx-auto">
                            <nav className="flex justify-center items-center gap-2" aria-label="Pagination">
                                <button
                                    className="px-4 py-2 rounded-md border-2 border-surface hover:border-accent transition-all duration-300 ease-in-out text-sm sm:text-base"
                                    aria-label="Page 1"
                                >
                                    1
                                </button>
                                <button
                                    className="px-4 py-2 rounded-md border-2 border-surface hover:border-accent transition-all duration-300 ease-in-out text-sm sm:text-base"
                                    aria-label="Page 2"
                                >
                                    2
                                </button>
                                <button
                                    className="px-4 py-2 rounded-md border-2 border-surface hover:border-accent transition-all duration-300 ease-in-out text-sm sm:text-base"
                                    aria-label="Page 3"
                                >
                                    3
                                </button>
                            </nav>
                        </div>
                    </section>
                </FadeContent>

                <Footer />
            </div>
        </>
    );
};

export default Blog;