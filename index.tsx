import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { geminiService } from './services/gemini.ts';
import { BRAND_NAME, BEEHIIV_URL } from './constants.ts';
import { Message } from './types.ts';

// --- Components ---

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-100 py-3">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#0d47a1] text-white rounded-xl flex items-center justify-center text-[11px] font-black shadow-lg shadow-blue-900/10 group-hover:scale-110 transition-transform">
              HT
            </div>
            <span className="text-xl font-[900] tracking-tighter uppercase text-black hidden sm:block">
              {BRAND_NAME}
            </span>
          </Link>
          <div className="hidden lg:flex items-center gap-8 text-[12px] font-bold text-zinc-500 uppercase tracking-widest">
            <Link to="/archive" className="hover:text-black transition-colors">Archive</Link>
            <Link to="/trail-guides" className="hover:text-black transition-colors">Trail Guides</Link>
            <Link to="/community" className="hover:text-[#0d47a1] transition-colors">Community</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/chat" className="hidden md:block bg-zinc-50 text-zinc-800 px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest border border-zinc-200 hover:bg-zinc-100 transition-colors">Portal Scout</Link>
          <a href={BEEHIIV_URL} target="_blank" rel="noopener noreferrer" className="bg-[#0d47a1] hover:bg-[#0a3a85] text-white px-6 py-2.5 rounded-lg text-[13px] font-black uppercase tracking-wider transition-all shadow-lg shadow-blue-900/10 active:scale-95">
            Subscribe
          </a>
        </div>
      </div>
    </nav>
  );
}

const ChatInterface = forwardRef(function ChatInterface(props: { initialMessage?: string; className?: string }, ref) {
  const { initialMessage, className = "" } = props;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    sendMessage: (text: string) => handleSend(text)
  }));

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        role: 'assistant',
        content: initialMessage || "Scout Portal Online.",
        timestamp: new Date(),
      }]);
    }
  }, [initialMessage]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  async function handleSend(overrideInput?: string) {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!overrideInput) setInput("");
    setIsLoading(true);

    try {
      const response = await geminiService.sendMessage(messages, textToSend);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        timestamp: new Date(),
        sources: response.sources,
        type: response.triggerLead ? 'lead-capture' : 'text'
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        id: 'err-' + Date.now(),
        role: 'assistant',
        content: "Satellite sync interrupted. Recalibrating local intelligence...",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={`flex flex-col h-full bg-white ${className}`}>
      <div className="px-6 py-3 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-blue-600 animate-pulse' : 'bg-green-500'}`}></div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Portal Link Active</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in`}>
            <div className={`max-w-[90%] ${msg.role === 'user' ? 'bg-zinc-100 p-4 rounded-2xl rounded-tr-none' : ''}`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-4 h-4 rounded bg-[#0d47a1]"></div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-[#0d47a1]">Scout Intel</p>
                </div>
              )}
              <div className={`text-[16px] leading-relaxed ${msg.role === 'assistant' ? 'serif-text italic' : 'font-semibold text-zinc-700'}`}>
                {msg.content}
              </div>
              {msg.sources && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {msg.sources.map((s, i) => (
                    <a key={i} href={s.uri} target="_blank" className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase">{s.title}</a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t border-zinc-100">
        <div className="relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Scout..."
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 pr-12 outline-none focus:bg-white transition-all"
          />
          <button onClick={() => handleSend()} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#0d47a1]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
});

function Hero() {
  return (
    <div className="bg-white pt-24 pb-24 border-b border-zinc-100 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-6xl md:text-[88px] font-[900] text-black mb-12 leading-[0.85] tracking-tighter uppercase">
          Health, Trails, and <br/>Arizona Skies.
        </h1>
        <p className="text-xl md:text-2xl text-zinc-500 serif-text italic mb-16">
          Exploring the High Desert’s most breathtaking trails and hidden wellness retreats.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/chat" className="bg-[#0d47a1] text-white px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl">Ask Portal Scout</Link>
          <Link to="/trail-guides" className="bg-zinc-100 text-black px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em]">Trail Guides</Link>
        </div>
      </div>
    </div>
  );
}

function TrailGuidesPage() {
  const trails = [
    { name: "Devil's Bridge", loc: "Sedona, AZ", diff: "Moderate", length: "4.2 mi" },
    { name: "Flatiron", loc: "Apache Junction, AZ", diff: "Hard", length: "6.2 mi" },
    { name: "Tom's Thumb", loc: "Scottsdale, AZ", diff: "Moderate", length: "4.0 mi" }
  ];

  return (
    <div className="pt-24 pb-32 max-w-6xl mx-auto px-6">
      <h1 className="text-5xl font-black uppercase tracking-tighter mb-12">Trail Intel</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {trails.map(t => (
          <div key={t.name} className="p-8 border border-zinc-100 rounded-[32px] bg-white shadow-sm hover:shadow-xl transition-all">
            <h3 className="text-2xl font-black mb-2">{t.name}</h3>
            <p className="text-[#0d47a1] text-[10px] font-black uppercase mb-4">{t.loc}</p>
            <div className="flex justify-between text-xs font-bold text-zinc-400">
              <span>{t.diff}</span>
              <span>{t.length}</span>
            </div>
            <Link to="/chat" state={{ initialQuery: `Tell me more about ${t.name} trail conditions.` }} className="mt-8 block w-full py-4 bg-zinc-950 text-white rounded-xl text-[10px] font-black uppercase text-center">Access Full Intel</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatPage() {
  const chatRef = useRef<any>(null);
  const location = useLocation();
  const state = location.state as { initialQuery?: string };

  useEffect(() => {
    if (state?.initialQuery && chatRef.current) {
      setTimeout(() => chatRef.current.sendMessage(state.initialQuery), 500);
    }
  }, [state]);

  return (
    <div className="flex-grow bg-[#fafafa] flex flex-col min-h-[calc(100vh-73px)]">
      <div className="max-w-7xl mx-auto w-full px-6 py-10 flex-grow flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4 space-y-6">
          <div className="p-8 bg-zinc-950 rounded-[32px] text-white">
            <h3 className="text-2xl font-black uppercase mb-4">Portal Scout</h3>
            <p className="text-zinc-400 serif-text italic">Your definitive companion for trail discovery and recovery.</p>
          </div>
          <div className="p-6 bg-white border border-zinc-200 rounded-[32px]">
            <h4 className="text-[10px] font-black uppercase mb-6 text-[#0d47a1]">Quick Queries</h4>
            <ul className="space-y-4 text-xs font-bold text-zinc-500">
              <li onClick={() => chatRef.current.sendMessage("Sedona vacation plan")} className="cursor-pointer hover:text-black">3-day Sedona plan</li>
              <li onClick={() => chatRef.current.sendMessage("GHL Community setup")} className="cursor-pointer hover:text-black">Setup Sage Portal</li>
            </ul>
          </div>
        </div>
        <div className="lg:w-3/4 flex-grow bg-white border border-zinc-200 rounded-[40px] overflow-hidden shadow-2xl">
          <ChatInterface ref={chatRef} initialMessage="Identity Verified. Scout Online. Monitoring Arizona trail alerts... How can I assist?" />
        </div>
      </div>
    </div>
  );
}

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed bottom-8 right-8 z-[9999]">
      {isOpen && (
        <div className="mb-6 w-[360px] h-[600px] shadow-2xl rounded-[32px] overflow-hidden border border-zinc-200">
          <ChatInterface initialMessage="Scout Portal Active. Query trail intel below..." />
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${isOpen ? 'bg-white text-[#0d47a1] border border-zinc-200' : 'bg-[#0d47a1] text-white shadow-xl hover:scale-105'}`}>
        {isOpen ? '✕' : 'AI'}
      </button>
    </div>
  );
}

function App() {
  const location = useLocation();
  const isChatPage = location.pathname === '/chat';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/trail-guides" element={<TrailGuidesPage />} />
          <Route path="/archive" element={<div className="p-24 text-center">Archive coming soon.</div>} />
          <Route path="/community" element={<div className="p-24 text-center">Community portal opening soon.</div>} />
          <Route path="/about" element={<div className="p-24 text-center italic serif-text">Wellness meeting the Wild.</div>} />
        </Routes>
      </main>
      {!isChatPage && <ChatWidget />}
      <footer className="p-8 text-center text-[10px] font-black uppercase text-zinc-400 border-t border-zinc-50">
        © {new Date().getFullYear()} Health & Travels • SageSuite
      </footer>
    </div>
  );
}

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <Router>
      <App />
    </Router>
  );
}
