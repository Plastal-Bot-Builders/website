import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import './App.css';
import App from './App';
import { ThemeProvider } from './theme/ThemeProvider';
import Admin from './pages/admin';

const container = document.getElementById('root')!;
const root = createRoot(container);

// Optional: set if deploying under a subpath (e.g., GitHub Pages)
const basename = process.env.PUBLIC_URL || undefined;

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter basename={basename}>
        <Suspense fallback={<div className="loader-background visible"><div className="loader-container">Loading…</div></div>}>
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/*" element={<App />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);