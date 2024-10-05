import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Support from './pages/Support';
import Programs from './pages/Programs';
import Projects from './pages/Projects';
import MembershipForm from './pages/MembershipForm';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* Define your routes here */}
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
    </Router>
  );
}

export default App;
