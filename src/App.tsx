import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
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

function AppContent() {
  const location = useLocation();
  const isSuite = location.pathname.startsWith('/suite') || 
                  location.pathname === '/chat' || 
                  location.pathname.startsWith('/archive/') ||
                  location.pathname.startsWith('/trail-guides/');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!isSuite && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/suite/*" element={<SuiteDashboard />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/archive/:id" element={<ArticlePage />} />
          <Route path="/trail-guides" element={<TrailGuides />} />
          <Route path="/trail-guides/:id" element={<TrailPage />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      {!isSuite && (
        <footer className="bg-white border-t border-zinc-100 py-16 mt-auto">
          <div className="max-w-6xl mx-auto px-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <p className="text-[10px] text-zinc-400 font-black uppercase tracking-[0.3em] mb-2">
                  © {new Date().getFullYear()} Health & Travels Journal
                </p>
                <p className="text-[10px] text-zinc-300 font-medium uppercase tracking-[0.1em]">
                  Trip planning powered by Sage • Health & Travels
                </p>
              </div>
              <div className="flex gap-8 text-zinc-400 font-black uppercase tracking-widest text-[10px]">
                <Link to="/archive" className="hover:text-black">Archive</Link>
                <Link to="/trail-guides" className="hover:text-black">Trails</Link>
                <Link to="/community" className="hover:text-black">Community</Link>
              </div>
            </div>
          </div>
        </footer>
      )}

      {!isSuite && <ChatWidget />}
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
