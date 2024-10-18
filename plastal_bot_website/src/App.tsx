import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Support from './pages/Support';
import Programs from './pages/Programs';
import Projects from './pages/Projects';
import MembershipForm from './pages/MembershipForm';
import { Grid } from 'react-loader-spinner'; // Import the spinner component
import { Scrollbars } from 'rc-scrollbars'; // Import the Scrollbars component
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggleButton from './components/ThemeToggleButton';


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
    <ThemeProvider> {/* Wrap the entire app with ThemeProvider */}
      <Scrollbars
        style={{ width: '100%', height: '100vh' }}
        renderThumbVertical={({ style, ...props }) =>
          <div {...props} style={{ ...style, backgroundColor: '#0CFFBB', borderRadius: '4px' }} />
        }
      >
        <div>
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
      </Scrollbars>

      {/* Theme toggle button */}
      <ThemeToggleButton />
    </ThemeProvider>
  );
};

export default App;
