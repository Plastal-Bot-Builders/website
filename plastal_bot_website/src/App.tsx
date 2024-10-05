import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import About from '.pages/about';
import Blogs from './pages/blogs';
import Support from './pages/support';
import Programs from './pages/programs';
import Projects from './pages/projects';
import Membership from './pages/membershipform';


const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* Define your routes here */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/membershipform" element={<MembershipFormPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
