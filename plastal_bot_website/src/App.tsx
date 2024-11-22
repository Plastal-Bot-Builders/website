import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import About from './pages/about';
import Blog from './pages/blog';
import Support from './pages/support';
import Programs from './pages/programs';
import Projects from './pages/projects';
import MembershipForm from './pages/membershipform';
import { Grid } from 'react-loader-spinner'; // Import the spinner component
import { Scrollbars } from 'rc-scrollbars'; // Import the Scrollbars component
import AnimatedShapes from "./components/AnimatedShapes";
import ParallaxText from "./components/ParallaxText"; 

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // Track the route change

  useEffect(() => {
    // Show loader immediately when location changes
    setLoading(true);

    // Hide loader after a delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Set a delay of 1 second for demo purposes

    return () => clearTimeout(timer); // Cleanup the timer
  }, [location]);

  return (
      <Scrollbars
        style={{ width: '100%', height: '100vh' }}
        renderThumbVertical={({ style, ...props }) =>
          <div {...props} style={{ ...style, backgroundColor: '#0CFFBB', borderRadius: '4px' }} />
        }
      >
        <div style={{ position: 'relative', height: '100vh' }}>
          {/* Animated shapes in the background */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: -1, // Ensure it's behind everything
              opacity: 0.1, // Subtle background effect
            }}
          >
            <AnimatedShapes />
          </div>

          {/* Conditionally render the Grid spinner when loading is true */}
          {loading && (
            <div className="loader-background visible">
              <div className="loader-container">
                <Grid
                  visible={true}
                  height="100"
                  width="100"
                  color="#0cffbb"
                  ariaLabel="grid-loading"
                  radius="12.5"
                  wrapperStyle={{}}
                  wrapperClass="grid-wrapper"
                />
              </div>
            </div>
          )}

          {/* Render your routes */}
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/membershipform" element={<MembershipForm />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/support" element={<Support />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </div>
        <section>
          <ParallaxText baseVelocity={-5}>Framer Motion</ParallaxText>
          <ParallaxText baseVelocity={5}>Scroll velocity</ParallaxText>
        </section>
      </Scrollbars>
  );
};

export default App;
