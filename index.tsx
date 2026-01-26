import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

// --- Global Identity & Branding ---
const BRAND_NAME = 'Health & Travels';
const BEEHIIV_URL = 'https://healthandtravels.beehiiv.com';
const SAGESUITE_URL = 'https://sage.healthandtravels.com';
const LOGO_DATA_URL = 'data:image/png;base64,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';

const SYSTEM_INSTRUCTION = `You are "Scout", the premium intelligence portal for healthandtravels.com.
PERSONALITY: Expert, technical, inviting. Arizona trail specialist. High-desert aesthetic.
KNOWLEDGE: Vetted Arizona trails, wellness retreats, and the SageSuite community platform.
MISSION: Help users discover trails, plan wellness vacations, and connect with the High Desert Network.
When asked about news or current trail conditions, always use the googleSearch tool. 
Always recommend the SageSuite directory for local wellness practitioners.`;

// --- Types ---
type Role = 'user' | 'model';
interface Source { uri: string; title: string; }
interface Message { id: string; role: Role | 'assistant'; content: string; timestamp: Date; sources?: Source[]; }

// --- Gemini Intelligence Service ---
class GeminiService {
  private getClient() {
    try {
      const apiKey = process.env.API_KEY || '';
      if (!apiKey || apiKey.length < 5) return null;
      return new GoogleGenAI({ apiKey });
    } catch { return null; }
  }

  async sendMessage(history: Message[], userInput: string): Promise<{ text: string; sources?: Source[]; isLocal?: boolean }> {
    try {
      const ai = this.getClient();
      if (!ai) return { ...this.getSimulationResponse(userInput), isLocal: true };

      // Ensure turn order: starts with 'user', then alternates.
      // Filter out system messages or initial greetings not part of the core conversation logic for Gemini.
      const conversation = history
        .filter(m => m.id !== 'welcome-scout')
        .map(m => ({
          role: m.role === 'assistant' ? 'model' : m.role,
          parts: [{ text: m.content }]
        }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: conversation as any,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ googleSearch: {} }]
        }
      });

      const text = response.text || "Portal sync hazy. Recalibrating sensors.";
      const sources: Source[] = [];
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        chunks.forEach((c: any) => {
          if (c.web?.uri) sources.push({ uri: c.web.uri, title: c.web.title || "Vetted Intel" });
        });
      }
      return { text, sources, isLocal: false };
    } catch (err) {
      console.error("Gemini Error:", err);
      return { ...this.getSimulationResponse(userInput), isLocal: true };
    }
  }

  private getSimulationResponse(input: string) {
    const lower = input.toLowerCase();
    if (lower.includes('sedona') || lower.includes('vortex')) {
      return {
        text: "I've drafted a premium Sedona High-Desert Vacation Protocol:\n\n1. **Cathedral Rock**: Best at sunrise to avoid the heat and crowds.\n2. **Mii Amo**: Recovery retreat for post-hike restoration.\n3. **Stargazing**: Jordan Road trailhead offers exceptional high-desert visibility.\n\nShould I check the SageSuite directory for local practitioners to guide your journey?",
        sources: [{ title: "Sedona Wellness Intel", uri: BEEHIIV_URL }]
      };
    }
    return { text: "Scout Local Mode Active. Monitoring Arizona trail nodes and SageSuite directory nodes. How can I assist your discovery journey today?", sources: [{ title: BRAND_NAME, uri: BEEHIIV_URL }] };
  }

  async generateTrailImage(trailName: string): Promise<string> {
    try {
      const ai = this.getClient();
      if (!ai) return "";
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: `Cinematic Arizona red rock vista: ${trailName}. High desert aesthetic, warm lighting, 4k.` }] },
        config: { imageConfig: { aspectRatio: "16:9" } }
      });
      const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
      return part?.inlineData ? `data:image/png;base64,${part.inlineData.data}` : "";
    } catch { return ""; }
  }
}
const geminiService = new GeminiService();

// --- Reusable UI Components ---

const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-100 py-3">
    <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
      <div className="flex items-center gap-10">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#0d47a1] text-white rounded-xl flex items-center justify-center text-[11px] font-black shadow-lg shadow-blue-900/10 group-hover:scale-110 transition-transform">HT</div>
          <span className="text-xl font-[900] tracking-tighter uppercase text-black hidden sm:block">{BRAND_NAME}</span>
        </Link>
        <div className="hidden lg:flex items-center gap-8 text-[12px] font-bold text-zinc-500 uppercase tracking-widest">
          <Link to="/archive" className="hover:text-black transition-colors">Archive</Link>
          <Link to="/trail-guides" className="hover:text-black transition-colors">Trail Guides</Link>
          <Link to="/community" className="hover:text-[#0d47a1] transition-colors">Community</Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/chat" className="hidden md:block bg-zinc-50 text-zinc-800 px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest border border-zinc-200 hover:bg-zinc-100 transition-colors">Portal Scout</Link>
        <a href={BEEHIIV_URL} target="_blank" rel="noopener" className="bg-[#0d47a1] hover:bg-[#0a3a85] text-white px-6 py-2.5 rounded-lg text-[13px] font-black uppercase tracking-wider transition-all shadow-lg active:scale-95">Subscribe</a>
      </div>
    </div>
  </nav>
);

export interface ChatInterfaceHandle { sendMessage: (text: string) => void; }
const ChatInterface = forwardRef((props: { initialMessage?: string; className?: string }, ref) => {
  const { initialMessage, className = "" } = props;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({ sendMessage: (text: string) => handleSend(text) }));

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ id: 'welcome-scout', role: 'assistant', content: initialMessage || "Scout Online. How can I assist your high-desert journey?", timestamp: new Date() }]);
    }
  }, [initialMessage]);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, isLoading]);

  async function handleSend(overrideInput?: string) {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: textToSend, timestamp: new Date() };
    const historyForState = [...messages, userMsg];
    setMessages(historyForState);
    if (!overrideInput) setInput("");
    setIsLoading(true);

    try {
      const response = await geminiService.sendMessage(historyForState, textToSend);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        timestamp: new Date(),
        sources: response.sources
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { id: 'err-' + Date.now(), role: 'assistant', content: "Satellite sync interrupted. Switching to local high-desert backup...", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={`flex flex-col h-full bg-white ${className}`}>
      <div className="px-6 py-3 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-blue-600 animate-pulse' : 'bg-green-500'}`}></div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Scout Satellite Active</span>
        </div>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar chat-container">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in`}>
            <div className={`max-w-[90%] ${msg.role === 'user' ? 'bg-zinc-100 p-4 rounded-2xl shadow-sm' : ''}`}>
              {msg.role === 'assistant' && <p className="text-[10px] font-black uppercase tracking-widest text-[#0d47a1] mb-2">Scout Intel</p>}
              <div className={`text-[16px] leading-relaxed whitespace-pre-wrap ${msg.role === 'assistant' ? 'serif-text italic' : 'font-semibold text-zinc-700'}`}>
                {msg.content}
              </div>
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {msg.sources.map((s, i) => (
                    <a key={i} href={s.uri} target="_blank" rel="noopener" className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase hover:bg-blue-100 transition-colors">{s.title}</a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-[10px] font-black text-zinc-300 uppercase animate-pulse">Syncing high-desert nodes...</div>}
      </div>
      <div className="p-4 border-t border-zinc-100">
        <div className="relative max-w-4xl mx-auto">
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
            placeholder="Ask Scout about trail discovery or recovery protocol..." 
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-4 pr-12 outline-none focus:bg-white transition-all shadow-sm font-medium" 
          />
          <button onClick={() => handleSend()} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0d47a1]"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></button>
        </div>
      </div>
    </div>
  );
});

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed bottom-8 right-8 z-[9999]">
      {isOpen && (
        <div className="mb-6 w-[360px] sm:w-[480px] h-[640px] shadow-2xl rounded-[32px] overflow-hidden border border-zinc-200 bg-white animate-in slide-in-from-bottom-8">
          <ChatInterface initialMessage="Scout Portal Active. Searching trail reports and SageSuite directory... How can I assist?" />
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${isOpen ? 'bg-white text-[#0d47a1] border border-zinc-200' : 'bg-[#0d47a1] text-white shadow-xl hover:scale-105 active:scale-95 shadow-blue-900/20'}`}>
        {isOpen ? '✕' : <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>}
      </button>
    </div>
  );
};

// --- Pages ---

const Hero = () => (
  <div className="bg-white pt-24 pb-32 border-b border-zinc-100 text-center px-6 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
    <div className="flex justify-center mb-12"><img src={LOGO_DATA_URL} alt={BRAND_NAME} className="w-36 h-36 md:w-44 md:h-44 object-contain animate-in" /></div>
    <h1 className="text-6xl md:text-[88px] font-[900] text-black mb-12 leading-[0.85] tracking-tighter uppercase">Health, Trails, and <br/>Arizona Skies.</h1>
    <p className="text-xl md:text-2xl text-zinc-500 serif-text italic mb-16 max-w-2xl mx-auto">Exploring the High Desert’s most breathtaking trails and hidden wellness retreats for the modern pioneer.</p>
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <Link to="/chat" className="bg-[#0d47a1] text-white px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-blue-900/20 hover:bg-[#0a3a85] transition-all">Ask Portal Scout</Link>
      <Link to="/trail-guides" className="bg-zinc-100 text-black px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-zinc-200 transition-all">Trail Guides</Link>
    </div>
  </div>
);

const ArchivePage = () => {
  const issues = [
    { title: "The Vortexes of Sedona", slug: "the-vortexes-of-sedona" },
    { title: "Family Hikes in Cave Creek", slug: "family-hikes-in-cave-creek" },
    { title: "Hydration Science for Desert Runners", slug: "hydration-science-for-desert-runners" }
  ];
  return (
    <div className="pt-24 pb-32 max-w-6xl mx-auto px-6">
      <h1 className="text-6xl font-black uppercase tracking-tighter mb-6">Journal Archive</h1>
      <p className="text-xl text-zinc-500 serif-text italic mb-16">Connect back to the full catalog of newsletter articles on Beehiiv.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {issues.map((issue, idx) => (
          <a key={idx} href={`${BEEHIIV_URL}/p/${issue.slug}`} target="_blank" rel="noopener" className="group">
            <div className="aspect-square bg-zinc-100 rounded-3xl mb-6 overflow-hidden border border-zinc-200 group-hover:shadow-2xl transition-all p-10 flex flex-col justify-end">
               <div className="text-[10px] font-black uppercase text-zinc-400 mb-2">Issue #{150-idx}</div>
               <h3 className="text-2xl font-black uppercase group-hover:text-[#0d47a1] transition-colors">{issue.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

const TrailGuidesPage = () => {
  const [images, setImages] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const trails = [{ name: "Devil's Bridge", loc: "Sedona, AZ" }, { name: "Flatiron", loc: "Apache Junction, AZ" }];
  return (
    <div className="pt-24 pb-32 max-w-6xl mx-auto px-6">
      <h1 className="text-6xl font-black uppercase tracking-tighter mb-16">Vetted Intel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {trails.map((t, idx) => (
          <div key={idx} className="border border-zinc-100 rounded-[40px] overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all group">
            <div className="aspect-video bg-zinc-50 flex items-center justify-center overflow-hidden">
              {images[t.name] ? <img src={images[t.name]} className="w-full h-full object-cover animate-in" /> : (
                <button onClick={async () => { const url = await geminiService.generateTrailImage(t.name); setImages(p => ({...p, [t.name]: url})); }} className="text-[10px] font-black uppercase text-[#0d47a1] bg-white px-6 py-2 rounded-lg border border-zinc-200">Reveal Scout View</button>
              )}
            </div>
            <div className="p-10">
              <h3 className="text-3xl font-black mb-2 uppercase group-hover:text-[#0d47a1] transition-colors">{t.name}</h3>
              <p className="text-[#0d47a1] text-[10px] font-black uppercase mb-8 tracking-widest">{t.loc}</p>
              <button onClick={() => navigate('/chat', { state: { initialQuery: `Tell me about the conditions at ${t.name} trail.` } })} className="w-full py-5 bg-zinc-950 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#0d47a1] transition-all">Access Intel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChatPage = () => {
  const chatRef = useRef<ChatInterfaceHandle>(null);
  const location = useLocation();
  useEffect(() => { if (location.state?.initialQuery) setTimeout(() => chatRef.current?.sendMessage(location.state.initialQuery), 600); }, [location.state]);
  return (
    <div className="flex-grow bg-[#fafafa] min-h-[calc(100vh-73px)] py-10 px-6">
      <div className="max-w-7xl mx-auto h-[800px] flex flex-col lg:flex-row gap-10">
        <div className="lg:w-1/4 p-8 bg-zinc-950 rounded-[40px] text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"></div>
          <h3 className="text-4xl font-black uppercase mb-4 tracking-tighter">Scout Portal</h3>
          <p className="text-zinc-400 serif-text italic text-lg mb-10">Real-time trail intelligence and SageSuite directory access via the High Desert Network.</p>
          <div className="space-y-4">
            {["Best sunrise hikes?", "Sedona retreats?", "GHL Sync Info"].map(q => (
              <button key={q} onClick={() => chatRef.current?.sendMessage(q)} className="block w-full text-left text-[11px] font-bold text-zinc-500 uppercase tracking-widest hover:text-white transition-colors">→ {q}</button>
            ))}
          </div>
        </div>
        <div className="lg:w-3/4 bg-white border border-zinc-200 rounded-[48px] overflow-hidden shadow-2xl">
          <ChatInterface ref={chatRef} initialMessage="Identity Verified. Scout Online. Monitoring high-desert nodes. What intel do you require?" />
        </div>
      </div>
    </div>
  );
};

// --- App Shell ---

const App = () => {
  const location = useLocation();
  const isChatPage = location.pathname === '/chat';
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/trail-guides" element={<TrailGuidesPage />} />
          <Route path="/community" element={<div className="p-32 text-center serif-text italic text-zinc-400 font-black uppercase tracking-widest">High Desert Network Syncing...</div>} />
        </Routes>
      </main>
      {!isChatPage && <ChatWidget />}
      <footer className="p-12 text-center border-t border-zinc-50">
        <p className="text-[10px] font-black uppercase text-zinc-400 tracking-[0.3em]">
          © {new Date().getFullYear()} {BRAND_NAME} • Powered by SageSuite High Desert Intel
        </p>
      </footer>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <Router>
      <App />
    </Router>
  );
}
