import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import { Hero } from './components/Hero';
import Archive from './pages/Archive';
import TrailGuides from './pages/TrailGuides';
import About from './pages/About';
import Community from './pages/Community';
import ChatPage from './pages/ChatPage';
import SuiteDashboard from './pages/SuiteDashboard';
import ArticlePage from './pages/ArticlePage';
import TrailPage from './pages/TrailPage';
import Arizona from './pages/Arizona';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import TripBuilder from './pages/TripBuilder';

function AppContent() {
  const location = useLocation();

  React.useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    const id = window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 0);

    return () => window.clearTimeout(id);
  }, [location.pathname]);

  const isChatPage = location.pathname === '/chat';
  const isSuitePage = location.pathname.startsWith('/suite');
  const hideSiteChrome = isChatPage || isSuitePage;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!hideSiteChrome && <Navbar />}

      <main className="flex-grow pb-24">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/trip-builder" element={<TripBuilder />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/suite/*" element={<SuiteDashboard />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/archive/:id" element={<ArticlePage />} />
          <Route path="/trail-guides" element={<TrailGuides />} />
          <Route path="/trail-guides/:id" element={<TrailPage />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
          <Route path="/arizona" element={<Arizona />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </main>

      {!hideSiteChrome && (
        <footer className="mt-auto border-t border-zinc-100 bg-white py-16">
          <div className="mx-auto max-w-6xl px-6 text-center md:text-left">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
              <div>
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                  © {new Date().getFullYear()} Health & Travels Journal
                </p>
                <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-300">
                  Trip planning powered by Sage • Health & Travels
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-400 md:justify-end">
                <Link to="/archive" className="hover:text-black transition-colors">
                  Archive
                </Link>
                <Link to="/trail-guides" className="hover:text-black transition-colors">
                  Trails
                </Link>
                <Link to="/community" className="hover:text-black transition-colors">
                  Community
                </Link>
                <Link to="/privacy-policy" className="hover:text-black transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" className="hover:text-black transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </footer>
      )}

      {!hideSiteChrome && <ChatWidget />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
