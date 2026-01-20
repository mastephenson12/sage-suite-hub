import React, { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

// --- Constants & Types ---
const BRAND_NAME = 'Health & Travels';
const LOGO_DATA_URL = 'data:image/png;base64,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_fX4/Y/NVuZrBnR3Nx11/p9EByIJDxN/xHfpjC4jI3kl+yCKaqK7vB6Wsxq7x3ArDuhS79qWsZISDSCCDInIBk4LZrUlpwRo1+CEn7xKyLjOA8GmRlfRe04wLzUCCjiEz64O6A1mMLATkbmU4igoVK3VtqTXlAhSktjqIpg0HnNHClypi0QssNTiiBlg/II/bGBmQyeBj76I+GXKJiqfNhN/kUt+TGElVmU7DoomLp9MJlCo5lC4YNYOpzyYQG1P3ORqlQOTtxHViWqeQihsUl24JSESnNA3OVZtvEQ38xEBQ/DK2Cx02JiGuz53rZRhp+zxp0012k0D69KelyRLxnh1Yz7PSIdMm0T3RQQ+CJ4gXqGINqlLGj6kBVFf3oKlUU7zBykNacn/W8Z4nX3muE4DSuRIOGjCNsgCJnzIZW7hg+8K1AE8rNpS3XZa00wLstKzDM4rUta9Nr2GTAxAHS/jALiA7mEXkKGYRXjB4gYLIRqV9gOraQS5CRRVj8EwdyQPoNFwKciCaYPeT2g825LD19vz4+fdvfgvq//MJ4GsdFX6uH33/vKdVo7PxS7p9MXpS7rFT97/N91XqKxXfXW/UvXUuPfc63S6XG2at9u6I5h6fX98E8Pnb7898YpYn/vL6j/7i8Y7/mF+mKInXfS0pBSDPHz978vRDR08SADAI/98uK6YAD9wU787f7yzPyy6v7e7f7C+N+X+vO8V/SInFfBv5fX78V6fH5+vT928/ePnixXv3H97/ycN7D8dP7V8TFSfAnuP79fKjM/97/P7p0/unYpLCHv8Yf3fS2G/pW1vX0OeePXz9i9evvP7K90v6/w9pBv7K+X9l8O38XyUAUh6VzP8v738Lp69fefzV67/+P3p/S0YvYF6UqYAfGf97Bf97f+2vP29m7C8T/9/75h8U+fN/XpIAG9f0X3pL+u27L7v43fPnF/9S/E/Vv0L/p0+evP/86e9eY38L70fG9986A/YfX5yYfvPd/66R9T96fvXF06v3HhL+U/9HAs6fPf3v+R9S+5v+T07A+7fX3/0E/7PfvfT7x99/O6b/V07vP3V699K9d77p8T6z8v0v//v8n//87P9vOn0X+fG7X6YAnDt97urK48uXFzYmJzYmX7f6m96/X/u7H//yU5fPv9B/9K6L129fWp3S77f726emUf8fX19f7E79/9/9H/v36O679w/6+7vX9/T09M6pE+uH9u7uT6en+pP7+7p6fX3XfP0AAtn9p8/f+vD6/99/AALZ/cfPv/XvR6++fOf6P7/+669fvrYxOfn66989fvvpX67f+O///Pr9918/f+MvX9fX9fXP9U6MTe7fOnHq9N6XJ06c27p29eDExH8B5p0P/+O+x6L6L/n66U/unfXQvXvunXun93707v0Hzv3fT394e+f0D09/eLp/7p3757/7408++eTjP/77v9/55Wc0UPr/AfrV8Y0/eOPfO/4DHzmF/7f+z5Xp2W7619X/XN7//fX9/0v605On7r/8lUf+U+OfvN7P4/W///Xm5tU/vOfx9e7K/9rU/38X/0W/VvL/9H9r7/f37v70H38j8A/Vf54S/0P/N396e9Y/2zN/+dO9O3fOXOzs7O7879rM/N3Xv3r8/m9uH2u933h46pGntn39yYevXj39f977p+f/+8+XN1f29/bX9zfPrVz9/7y/Xm8VpS6HnK9XU1fO9+9evvjO8vLly7///O/Xfv7o0X07vj6xvnf9ypXPv/LixXv37n197969p+8/eHjvP+/ce+fXf/u3f/761z995X77p77+z3/889f/9re/vPH/uHfv/v3379//j5v/C+/ff/H+/Vfvv7//5On96z9+p2Y7tVf/5S+vX7pUatYvLpU+p//S+t69+0dPXnx27P6f/f7q/X9fWvjNHz/+h+O/9y3s/9vG91+99vS//8ev/vCHX/3hP//560+88fOf/8m73vXe++57+n//78r04/2p7p7O7u7O7n9d6+p67pG59fX796fGxsfHxsfHr169enV8fOn7v3/xH9/v3/9/P3f9669fvfrq6lW9p6urvX1td986Ojo6vX9/rS0tLQ2377/p/NfVq/3O6v8d2vP/C+p97f9V6f/W7n/X9L878D8W96+XvH/7+S89/7Gnf6P6//P8+U9n5f99X//9z3/+446+f7WpA3/qgP/3/1WrfX3//29ra6vN/6urq80/N93W/3S9n0239V9v9z9t9T/9P31767Xv/P7vT8D9f19v9r/9f2tW/f///8Xq/9/fXy89///rS/v7f/L/Af997//fP0Yf/qf68H+q9/8UAAAAADs=';
const SAGESUITE_URL = 'https://sage.healthandtravels.com';
const GHL_CNAME_TARGET = 'flash.funnels.msgsndr.com';

type Role = 'user' | 'assistant';
type MessageType = 'text' | 'lead-capture' | 'success';
interface Source { uri: string; title: string; }
interface Message { id: string; role: Role; content: string; timestamp: Date; type?: MessageType; sources?: Source[]; }

// --- Service: Gemini ---
const SYSTEM_INSTRUCTION = `You are the Arizona Trail & Wellness Expert for healthandtravels.com.
IDENTITY: You are "Scout", the portal assistant.
TECHNICAL: Portal is at sage.healthandtravels.com. Connection: CNAME 'sage' to '${GHL_CNAME_TARGET}', select 'Client Portal' in GoHighLevel.
TONE: Professional and inviting. Use Google Search for current trail conditions.`;

class GeminiService {
  private getClient() {
    const apiKey = (window as any).process?.env?.API_KEY || "";
    return new GoogleGenAI({ apiKey });
  }

  async sendMessage(history: Message[], userInput: string) {
    const ai = this.getClient();
    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));
    contents.push({ role: 'user', parts: [{ text: userInput }] });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents as any,
      config: { systemInstruction: SYSTEM_INSTRUCTION, tools: [{ googleSearch: {} }] }
    });

    const text = response.text || "Portal sync lost...";
    const triggerLead = /email|subscribe|membership/i.test(text);
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.filter((c: any) => c.web?.uri)
      ?.map((c: any) => ({ uri: c.web.uri, title: c.web.title })) || [];

    return { text, sources, triggerLead };
  }

  async generateTrailImage(trailName: string, description: string, difficulty: string) {
    const ai = this.getClient();
    const prompt = `Cinematic 4k photo of ${trailName} in Arizona. ${description}. Trail difficulty: ${difficulty}. High desert vibes, golden hour.`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: { imageConfig: { aspectRatio: "16:9" } }
    });
    const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    return part?.inlineData ? `data:image/png;base64,${part.inlineData.data}` : "";
  }
}
const geminiService = new GeminiService();

// --- Shared Components ---
const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 py-3">
    <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 bg-[#0d47a1] text-white rounded flex items-center justify-center text-[11px] font-black">HT</div>
        <span className="text-xl font-[900] tracking-tighter uppercase text-black">Health & Travels</span>
      </Link>
      <div className="hidden lg:flex items-center gap-8 text-[12px] font-bold text-zinc-500 uppercase tracking-widest">
        <Link to="/archive" className="hover:text-black">Archive</Link>
        <Link to="/trail-guides" className="hover:text-black">Trail Guides</Link>
        <Link to="/community" className="hover:text-[#0d47a1]">Community</Link>
      </div>
      <a href="https://healthandtravels.com/subscribe" className="bg-[#0d47a1] text-white px-6 py-2.5 rounded-md text-[13px] font-black uppercase tracking-wider">Subscribe</a>
    </div>
  </nav>
);

const ChatInterface: React.FC<{ initialMessage?: string; className?: string }> = ({ initialMessage, className = "" }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ id: '1', role: 'assistant', content: initialMessage || "Scout Online.", timestamp: new Date() }]);
  }, [initialMessage]);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    try {
      const { text, sources, triggerLead } = await geminiService.sendMessage(messages, input);
      setMessages(prev => [...prev, { id: (Date.now()+1).toString(), role: 'assistant', content: text, timestamp: new Date(), sources, type: triggerLead ? 'lead-capture' : 'text' }]);
    } catch {
      setMessages(prev => [...prev, { id: 'err', role: 'assistant', content: "Scout connection interrupted.", timestamp: new Date() }]);
    } finally { setIsLoading(false); }
  };

  return (
    <div className={`flex flex-col h-full bg-white ${className}`}>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 bg-[#fafafa]/30 custom-scrollbar">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in`}>
            <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-zinc-100 p-4 rounded-2xl' : ''}`}>
              {msg.role === 'assistant' && <div className="flex items-center gap-2 mb-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div><p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Portal Scout</p></div>}
              <div className={`text-base leading-relaxed ${msg.role === 'user' ? 'text-zinc-600 font-medium' : 'text-black serif-text italic'}`}>{msg.content}</div>
              {msg.sources?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {msg.sources.map((s, i) => <a key={i} href={s.uri} target="_blank" className="text-[9px] font-bold text-blue-600 border border-blue-100 bg-blue-50/50 px-2 py-0.5 rounded uppercase">{s.title}</a>)}
                </div>
              ) : null}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-xs font-black text-blue-600 animate-pulse uppercase tracking-widest">Searching Trails...</div>}
      </div>
      <div className="p-4 border-t border-zinc-100"><input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Ask Scout..." className="w-full bg-zinc-50 rounded-xl px-4 py-3 outline-none text-sm" /></div>
    </div>
  );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {isOpen && (
        <div className="mb-6 w-[350px] sm:w-[450px] h-[600px] border border-zinc-200 shadow-2xl rounded-2xl overflow-hidden bg-white animate-in slide-in-from-bottom-4">
          <ChatInterface initialMessage="Scout Active. How can I help?" />
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="w-16 h-16 bg-[#0d47a1] text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-105 transition-all">
        {isOpen ? <span>&times;</span> : <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>}
      </button>
    </div>
  );
};

// --- Pages ---
const Hero = () => (
  <div className="pt-32 pb-24 text-center max-w-4xl mx-auto px-6">
    <h1 className="text-6xl md:text-[84px] font-[900] text-black mb-10 leading-[0.9] tracking-tighter">Health, Trails, and <br/>Arizona Skies.</h1>
    <p className="text-xl serif-text italic text-zinc-500 mb-14">Exploring the High Desert’s most breathtaking trails and wellness retreats.</p>
    <div className="flex justify-center gap-4">
      <Link to="/chat" className="bg-[#0d47a1] text-white px-10 py-4 rounded-xl font-black uppercase text-sm">Ask Portal Scout</Link>
      <Link to="/trail-guides" className="bg-zinc-100 text-black px-10 py-4 rounded-xl font-black uppercase text-sm">Browse Guides</Link>
    </div>
  </div>
);

const TrailGuides = () => {
  const [images, setImages] = useState<any>({});
  const [loading, setLoading] = useState<string|null>(null);
  const trails = [
    { name: "Devil's Bridge", loc: "Sedona, AZ", diff: "Moderate", length: "4.2 mi", description: "Natural sandstone arch." },
    { name: "Flatiron", loc: "Apache Junction, AZ", diff: "Hard", length: "6.2 mi", description: "Steep granite scramble." }
  ];
  const generate = async (trail: any) => {
    setLoading(trail.name);
    try { const url = await geminiService.generateTrailImage(trail.name, trail.description, trail.diff); setImages((p:any) => ({...p, [trail.name]: url})); }
    catch { alert("Image error"); } finally { setLoading(null); }
  };
  return (
    <div className="py-24 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
      {trails.map(t => (
        <div key={t.name} className="border border-zinc-100 rounded-[32px] overflow-hidden bg-white shadow-lg">
          <div className="aspect-video bg-zinc-50 flex items-center justify-center relative">
            {images[t.name] ? <img src={images[t.name]} className="w-full h-full object-cover" /> : 
              <button onClick={() => generate(t)} className="text-blue-600 font-black uppercase text-xs">{loading === t.name ? "Scouting..." : "Reveal Scout View"}</button>}
          </div>
          <div className="p-10">
            <h3 className="text-3xl font-black mb-2">{t.name}</h3>
            <p className="text-blue-600 uppercase text-[10px] font-black mb-4">{t.loc} • {t.length}</p>
            <p className="serif-text italic text-zinc-600">"{t.description}"</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const ChatPage = () => (
  <div className="min-h-screen bg-[#fafafa] pt-12 px-6 flex flex-col items-center">
    <div className="w-full max-w-5xl h-[700px] border border-zinc-200 rounded-[40px] overflow-hidden shadow-2xl bg-white">
      <ChatInterface initialMessage="Scout Portal Active. How can I help your journey?" />
    </div>
  </div>
);

// --- App ---
const App = () => {
  const location = useLocation();
  const isChat = location.pathname === '/chat';
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/trail-guides" element={<TrailGuides />} />
          <Route path="*" element={<Hero />} />
        </Routes>
      </main>
      {!isChat && <ChatWidget />}
    </div>
  );
};

const container = document.getElementById('root');
if (container) { createRoot(container).render(<Router><App /></Router>); }
