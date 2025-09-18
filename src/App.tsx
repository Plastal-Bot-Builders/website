import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import About from './pages/about';
import Blog from './pages/blog';
import Support from './pages/support';
import Programs from './pages/programs';
import MembershipForm from './pages/membershipform';
import { Grid } from 'react-loader-spinner'; 
import { Scrollbars } from 'rc-scrollbars';
import Error404 from './pages/error';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // Track the route change

  useEffect(() => {
    // Show loader immediately when location changes
    setLoading(true);

    // Hide loader after a delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Set a delay of 1 second for demo purposes

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
          {/* Conditionally render the Grid spinner when loading is true */}
          {loading && (
            <div className="loader-background visible" role="status" aria-live="polite">
              <div className="loader-container">
                <Grid
                  visible={true}
                  height="100"
                  width="100"
                  color={'var(--loader-spinner, #0CFFBB)'}
                  ariaLabel="app-loading"
                  radius="12.5"
                  wrapperStyle={{}}
                  wrapperClass="grid-wrapper"
                />
              </div>
            </div>
          )}

          {/* Render your routes */}
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/membershipform" element={<MembershipForm />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/support" element={<Support />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </Scrollbars>
  );
};

export default App;
