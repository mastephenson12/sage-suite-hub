import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatInterface from './components/ChatInterface';
import ChatWidget from './components/ChatWidget';
import Archive from './pages/Archive';
import TrailGuides from './pages/TrailGuides';
import About from './pages/About';
import Community from './pages/Community';
import ChatPage from './pages/ChatPage';
import { SAGESUITE_URL, BEEHIIV_URL, LOGO_DATA_URL, BRAND_NAME } from './constants';

const Home: React.FC = () => {
  const [logoError, setLogoError] = useState(false);
  
  return (
    <main className="flex-grow">
      {/* Main Command Center Hero */}
      <section className="pt-20 pb-32 border-b border-zinc-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            <div className="lg:col-span-5 pt-4">
              <div className="mb-8">
                {!logoError ? (
                  <img 
                    src={LOGO_DATA_URL} 
                    alt={BRAND_NAME} 
                    className="w-20 h-20 object-contain"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <div className="w-20 h-20 bg-[#0d47a1] rounded-2xl flex items-center justify-center text-white font-black">
                    H&T
                  </div>
                )}
              </div>

              <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-blue-50 border border-blue-100 text-[#0d47a1] text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-8">
                <span className="w-1.5 h-1.5 bg-[#0d47a1] rounded-full animate-pulse"></span>
                AI Powered Explorer Center
              </div>
              
              <h1 className="text-6xl md:text-7xl font-[900] text-black mb-8 leading-[0.9] tracking-tighter">
                Your Voice <br/>In The Desert.
              </h1>
              
              <p className="text-xl text-zinc-500 serif-text mb-12 leading-relaxed italic font-medium">
                Welcome to the **Health & Travels** AI Command Center. Ask for trail reports, wellness retreat bookings, or explore our community archives.
              </p>

              <div className="space-y-4 mb-12">
                <Link to="/chat" className="block p-5 bg-white border border-zinc-200 rounded-xl shadow-sm hover:border-[#0d47a1]/50 hover:shadow-md transition-all group">
                  <h4 className="text-[11px] font-[900] uppercase tracking-widest text-[#0d47a1] mb-2 flex justify-between">
                    Full Chat Portal
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </h4>
                  <p className="text-[14px] text-zinc-600 font-medium">Enter our dedicated research hub for a deep dive into Arizona medical tourism and wellness.</p>
                </Link>
                <div className="p-5 bg-white border border-zinc-200 rounded-xl shadow-sm">
                  <h4 className="text-[11px] font-[900] uppercase tracking-widest text-[#0d47a1] mb-2">Knowledge Integrated</h4>
                  <p className="text-[14px] text-zinc-600 font-medium">Our AI is trained on local Arizona trails and the SageSuite professional directory.</p>
                </div>
              </div>

              <div className="p-8 bg-zinc-950 rounded-2xl text-white shadow-2xl shadow-blue-900/10">
                <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Never Miss A Trail</h3>
                <p className="text-zinc-400 text-sm mb-6 font-medium">Join 5,000+ others getting the best AZ hiking guides every Tuesday.</p>
                <form 
                  className="flex flex-col gap-3"
                  onSubmit={(e) => { e.preventDefault(); window.location.href = BEEHIIV_URL; }}
                >
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    className="px-5 py-3.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm outline-none focus:border-[#0d47a1] transition-colors"
                    required
                  />
                  <button className="bg-[#0d47a1] hover:bg-[#0a3a85] text-white py-3.5 rounded-lg font-black text-xs uppercase tracking-widest transition-all">
                    Join the Journal
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-7 h-[800px]">
              <ChatInterface className="shadow-2xl shadow-blue-900/10 border-zinc-200 h-full" />
            </div>

          </div>
        </div>
      </section>

      {/* Association Section */}
      <section className="py-32 bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#0d47a1]/10 blur-[150px] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-white/10 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest text-blue-400 border border-white/5">Association Partner</div>
                <div className="h-px w-8 bg-white/20"></div>
                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Powered by SageSuite</div>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-black mb-8 leading-[0.95] tracking-tighter">
                The Wellness <br/>Network Portal.
              </h2>
              <p className="text-xl text-zinc-400 serif-text mb-12 leading-relaxed italic font-medium">
                Our professional association management is powered by SageSuite. Access the member directory, manage your credentials, and connect with Arizona’s elite wellness practitioners.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                 {[
                   { title: "Member Directory", desc: "Vetted professionals only" },
                   { title: "Credential Vault", desc: "Verified AZ certifications" },
                   { title: "Private Events", desc: "SageSuite exclusive access" },
                   { title: "Network Chat", desc: "Real-time practitioner sync" }
                 ].map((item, idx) => (
                   <div key={idx} className="p-5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                      <h4 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-1">{item.title}</h4>
                      <p className="text-[11px] text-zinc-500 uppercase font-bold tracking-tight">{item.desc}</p>
                   </div>
                 ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={SAGESUITE_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#0d47a1] hover:bg-[#0a3a85] text-white px-10 py-5 rounded-lg font-black text-sm uppercase tracking-widest transition-all text-center shadow-lg shadow-blue-900/20"
                >
                  Enter Member Portal
                </a>
                <a 
                  href={`${SAGESUITE_URL}/apply`}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-10 py-5 rounded-lg font-black text-sm uppercase tracking-widest transition-all text-center"
                >
                  Membership Info
                </a>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-zinc-900 to-black rounded-3xl border border-white/10 shadow-2xl p-1 shadow-blue-900/20 overflow-hidden group">
                 <div className="h-full w-full rounded-[calc(1.5rem-4px)] bg-zinc-900/50 backdrop-blur-3xl p-10 flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
                      <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">SageSuite <br/>Experience</h3>
                      <p className="text-zinc-500 font-medium text-sm leading-relaxed">Your professional profile, community interactions, and association benefits are seamlessly synced here.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 animate-pulse">
                        <div className="w-10 h-10 rounded-full bg-[#0d47a1] flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="w-24 h-2 bg-zinc-800 rounded-full mb-2"></div>
                          <div className="w-16 h-1.5 bg-zinc-800/50 rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 opacity-50">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="w-20 h-2 bg-zinc-800 rounded-full mb-2"></div>
                          <div className="w-12 h-1.5 bg-zinc-800/50 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isChatPage = location.pathname === '/chat';

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#0d47a1] selection:text-white bg-white">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/trail-guides" element={<TrailGuides />} />
        <Route path="/community" element={<Community />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <footer className="bg-white border-t border-zinc-100 py-24 mt-auto">
        <div className="max-w-6xl mx-auto px-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16">
            <div className="max-w-sm">
              <div className="flex items-center gap-3 mb-8">
                 <img src={LOGO_DATA_URL} alt={BRAND_NAME} className="w-10 h-10 object-contain" />
                 <h3 className="text-xl font-[1000] tracking-tighter uppercase">{BRAND_NAME}</h3>
              </div>
              <p className="text-zinc-500 text-base serif-text leading-relaxed mb-8">
                Arizona's premier community journal for outdoor wellness, family-friendly trail guides, and high-desert living.
              </p>
              
              <div className="flex justify-center md:justify-start items-center gap-6 mt-8">
                <div className="flex gap-4">
                  {['X', 'IG', 'YT'].map(social => (
                    <div key={social} className="w-9 h-9 bg-zinc-50 rounded border border-zinc-200 flex items-center justify-center font-black text-[10px] hover:bg-[#0d47a1] hover:text-white transition-all cursor-pointer">
                      {social}
                    </div>
                  ))}
                </div>
                <div className="h-4 w-px bg-zinc-200"></div>
                <div className="text-[9px] font-black uppercase tracking-widest text-zinc-400">
                  Networked via <span className="text-black">SageSuite</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-20 mx-auto md:mx-0">
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-widest text-black mb-8">Journal</h4>
                <ul className="space-y-4 text-[13px] text-zinc-500 font-bold uppercase tracking-widest">
                  <li><a href={BEEHIIV_URL} className="hover:text-[#0d47a1] transition-colors">Newsletter</a></li>
                  <li><Link to="/trail-guides" className="hover:text-[#0d47a1] transition-colors">Trail Map</Link></li>
                  <li><Link to="/archive" className="hover:text-[#0d47a1] transition-colors">Archive</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-widest text-black mb-8">Association</h4>
                <ul className="space-y-4 text-[13px] text-zinc-500 font-bold uppercase tracking-widest">
                  <li><Link to="/community" className="hover:text-[#0d47a1] transition-colors">Community</Link></li>
                  <li><a href={`${SAGESUITE_URL}/directory`} className="hover:text-[#0d47a1] transition-colors">Directory</a></li>
                  <li><Link to="/about" className="hover:text-[#0d47a1] transition-colors">Support</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-24 pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-300 font-black uppercase tracking-[0.3em]">
            <p>© {new Date().getFullYear()} Health & Travels Journal</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <span className="text-zinc-400 uppercase tracking-widest">Arizona's #1 Wellness Network</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Conditionally render Widget */}
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
