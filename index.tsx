import React, { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

// --- Types & Constants ---
type Role = 'user' | 'assistant' | 'system';
type MessageType = 'text' | 'lead-capture' | 'success';

interface Source {
  uri: string;
  title: string;
}

interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
  type?: MessageType;
  sources?: Source[];
}

const BRAND_NAME = 'Health & Travels';
const SAGESUITE_URL = 'https://sage.healthandtravels.com';
const GHL_CNAME_TARGET = 'flash.funnels.msgsndr.com';

const SYSTEM_INSTRUCTION = `You are the Arizona Trail & Wellness Expert for healthandtravels.com.
IDENTITY: You are "Scout", the portal assistant.
TECHNICAL PORTAL (SageSuite): Located at sage.healthandtravels.com.
If users ask how to connect the subdomain: 1. Create CNAME 'sage' pointing to '${GHL_CNAME_TARGET}'. 2. In GoHighLevel, select 'Client Portal'.
TONE: Professional, technical, inviting. Use Google Search for trail conditions or wellness news.`;

// --- Services ---
class GeminiService {
  private ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  async sendMessage(history: Message[], userInput: string) {
    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));
    contents.push({ role: 'user', parts: [{ text: userInput }] });

    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents as any,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        tools: [{ googleSearch: {} }],
      }
    });

    const text = response.text || "I'm having trouble syncing with the portal. One moment.";
    const triggerLead = /email|subscribe|membership|join/i.test(text);
    const sources: Source[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web?.uri && chunk.web?.title) {
          sources.push({ uri: chunk.web.uri, title: chunk.web.title });
        }
      });
    }

    return { text, sources, triggerLead };
  }
}

const gemini = new GeminiService();

// --- Components ---
const ChatInterface: React.FC<{ initialMessage?: string; className?: string }> = ({ initialMessage, className = "" }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [leadEmail, setLeadEmail] = useState("");

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: '1', role: 'assistant', timestamp: new Date(), type: 'text',
        content: initialMessage || "Portal Scout Online. How can I assist your Arizona journey today?"
      }]);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date() };
    setMessages(p => [...p, userMsg]);
    setInput("");
    setIsLoading(true);
    try {
      const { text, sources, triggerLead } = await gemini.sendMessage(messages, input);
      setMessages(p => [...p, {
        id: (Date.now() + 1).toString(), role: 'assistant', content: text, 
        timestamp: new Date(), sources, type: triggerLead ? 'lead-capture' : 'text'
      }]);
    } catch {
      setMessages(p => [...p, { id: 'err', role: 'assistant', content: "Scout connection interrupted. Retrying...", timestamp: new Date() }]);
    } finally { setIsLoading(false); }
  };

  return (
    <div className={`flex flex-col h-full bg-white ${className}`}>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#fafafa]/50">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in`}>
            <div className={`max-w-[90%] ${msg.role === 'user' ? 'bg-zinc-100 p-3 rounded-xl' : ''}`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-1 rounded-full bg-blue-600"></div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Portal Scout</span>
                </div>
              )}
              <div className={`text-sm leading-relaxed ${msg.role === 'user' ? 'text-zinc-600' : 'text-black serif-text italic'}`}>
                {msg.content}
              </div>
              {msg.type === 'lead-capture' && (
                <div className="mt-4 p-4 bg-zinc-950 rounded-xl text-white">
                  <p className="text-[10px] font-black uppercase mb-2 text-blue-400">Join the Dispatch</p>
                  <input type="email" placeholder="Email..." className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-xs mb-2 outline-none" />
                  <button className="w-full bg-blue-600 p-2 rounded text-[10px] font-black uppercase tracking-widest">Subscribe</button>
                </div>
              )}
              {msg.sources?.length ? (
                <div className="mt-3 flex flex-wrap gap-1">
                  {msg.sources.map((s, i) => (
                    <a key={i} href={s.uri} target="_blank" className="text-[8px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded uppercase">{s.title}</a>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-[9px] font-black text-blue-600 animate-pulse uppercase tracking-widest">Scouting...</div>}
      </div>
      <div className="p-3 border-t border-zinc-100">
        <div className="flex bg-zinc-100 rounded-lg px-3 py-1">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Ask Scout..." className="flex-1 bg-transparent py-2 text-sm outline-none" />
          <button onClick={handleSend} className="text-blue-600 ml-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-white border-b border-zinc-100 py-3 px-6 flex justify-between items-center backdrop-blur-md">
    <Link to="/" className="text-xl font-black tracking-tighter uppercase">Health & Travels</Link>
    <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">
      <Link to="/chat" className="text-blue-600">Scout</Link>
      <Link to="/archive">Archive</Link>
      <Link to="/community">Community</Link>
    </div>
  </nav>
);

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 h-[500px] border border-zinc-200 shadow-2xl rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <ChatInterface initialMessage="How can I help you find a trail or setup your portal?" />
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 bg-blue-600 text-white rounded-2xl shadow-xl flex items-center justify-center hover:scale-105 transition-transform">
        {isOpen ? <span className="text-2xl font-bold">&times;</span> : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>}
      </button>
    </div>
  );
};

const Home = () => (
  <div className="py-24 px-6 text-center max-w-4xl mx-auto">
    <h1 className="text-7xl font-black tracking-tighter mb-8 leading-[0.9]">Wellness, Trails & Desert Skies.</h1>
    <p className="text-xl serif-text italic text-zinc-500 mb-12">Arizona's premier community journal for modern explorers.</p>
    <Link to="/chat" className="bg-blue-600 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-sm inline-block shadow-lg hover:bg-blue-700 transition-colors">Ask Scout Assistant</Link>
  </div>
);

const ChatPage = () => (
  <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-150px)]">
    <div className="lg:w-1/3 space-y-4">
      <div className="p-8 bg-zinc-950 text-white rounded-3xl shadow-xl">
        <h2 className="text-2xl font-black uppercase text-blue-400 mb-2">Portal Scout</h2>
        <p className="text-zinc-400 serif-text italic">Your intelligent guide to Arizona health and high-desert setup.</p>
      </div>
      <div className="p-6 bg-white border border-zinc-200 rounded-2xl">
        <h4 className="text-[10px] font-black uppercase mb-4 text-zinc-400">Quick Inquiries</h4>
        <ul className="space-y-3 text-xs font-bold text-zinc-500">
          <li>• Sedona trail recommendations</li>
          <li>• Connecting sage subdomain</li>
          <li>• Arizona recovery practitioners</li>
        </ul>
      </div>
    </div>
    <div className="lg:w-2/3 border border-zinc-200 rounded-3xl overflow-hidden shadow-sm h-[600px]">
      <ChatInterface className="h-full border-none shadow-none" initialMessage="Scout Portal Active. Ready for trail reports and SageSuite support." />
    </div>
  </div>
);

const App = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <footer className="py-10 border-t border-zinc-100 text-center text-[9px] font-black uppercase text-zinc-300 tracking-[0.3em]">
        &copy; 2024 Health & Travels Journal • Powered by SageSuite
      </footer>
      {location.pathname !== '/chat' && <ChatWidget />}
    </div>
  );
};

// --- Bootstrap ---
const root = createRoot(document.getElementById('root')!);
root.render(<Router><App /></Router>);
