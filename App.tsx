import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import { Hero } from './components/Hero';
import Archive from './pages/Archive';
import TrailGuides from './pages/TrailGuides';
import About from './pages/About';
import Community from './pages/Community';
import ChatPage from './pages/ChatPage';
import SuiteDashboard from './pages/SuiteDashboard';

function AppContent() {
  const location = useLocation();
  const isSuite = location.pathname.startsWith('/suite') || location.pathname === '/chat';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!isSuite && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/suite/*" element={<SuiteDashboard />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/trail-guides" element={<TrailGuides />} />
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
                  Adventure Command Center Powered by SageSuite
                </p>
              </div>
              <div className="flex gap-8">
                {['Archive', 'Trails', 'Community'].map(item => (
                  <span key={item} className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black cursor-pointer transition-colors">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </footer>
      )}

      {!isSuite && <ChatWidget />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
