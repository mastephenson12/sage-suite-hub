import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import ChatWidget from './components/ChatWidget.tsx';
import Hero from './components/Hero.tsx';
import Archive from './pages/Archive.tsx';
import TrailGuides from './pages/TrailGuides.tsx';
import About from './pages/About.tsx';
import Community from './pages/Community.tsx';
import ChatPage from './pages/ChatPage.tsx';

const AppContent: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isChatPage = currentPath === '/chat';

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#0d47a1] selection:text-white bg-white">
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/trail-guides" element={<TrailGuides />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <footer className="bg-white border-t border-zinc-100 py-16 mt-auto">
        <div className="max-w-6xl mx-auto px-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] text-zinc-400 font-black uppercase tracking-[0.3em]">
              © {new Date().getFullYear()} Health & Travels Journal • Powered by SageSuite
            </p>
            <div className="flex gap-6">
              {['Archive', 'Trails', 'Community'].map(item => (
                <span key={item} className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black cursor-pointer transition-colors">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Persistent Widget (Hidden on the full-screen chat route) */}
      {!isChatPage && <ChatWidget />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
  );
};

export default App;
