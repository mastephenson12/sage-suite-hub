
import React, { useState, useRef, useEffect } from 'react';
import { Message, Source } from '../types';
import { geminiService } from '../services/gemini';
import { SAGESUITE_URL } from '../constants';

interface ChatInterfaceProps {
  initialMessage?: string;
  className?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ initialMessage, className = "" }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [leadEmail, setLeadEmail] = useState("");
  const [hasConsent, setHasConsent] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  useEffect(() => {
    if (initialMessage && messages.length === 0) {
      setMessages([{
        id: '1',
        role: 'assistant',
        content: initialMessage,
        timestamp: new Date(),
        type: 'text'
      }]);
    } else if (messages.length === 0) {
      setMessages([{
        id: '1',
        role: 'assistant',
        content: "Scout Portal Online. I'm trained in Arizona Trails, Wellness Directories, and Technical Setup for SageSuite. How can I assist you today?",
        timestamp: new Date(),
        type: 'text'
      }]);
    }
  }, [initialMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = async (customInput?: string) => {
    const textToSend = customInput || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const { text, sources, triggerLead } = await geminiService.sendMessage(messages, textToSend);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: text,
        timestamp: new Date(),
        sources: sources,
        type: triggerLead ? 'lead-capture' : 'text'
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Portal connection lost. Re-syncing...",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLead(true);
    setTimeout(() => {
      const successMsg: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Secure transmission to **${leadEmail}** complete. Your private guide is in your inbox. ${hasConsent ? "Welcome to the SageSuite community journal." : ""}`,
        timestamp: new Date(),
        type: 'success'
      };
      setMessages(prev => [...prev, successMsg]);
      setIsSubmittingLead(false);
      setLeadEmail("");
      setHasConsent(false);
    }, 1200);
  };

  const SUGGESTIONS = [
    { label: "GHL Subdomain Setup", action: "Give me the step-by-step for connecting sage.healthandtravels.com to GoHighLevel." },
    { label: "Vetted Directory", action: "Show me the SageSuite professional wellness directory." },
    { label: "Private Trail Doc", action: "Send me the private Clarkdale trail guide map." }
  ];

  return (
    <div className={`flex flex-col h-full overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/40 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-[#0d47a1] flex items-center justify-center text-white font-black text-[14px] shadow-lg shadow-[#0d47a1]/20">AI</div>
          <div>
            <h3 className="font-black text-black text-sm uppercase tracking-[0.2em]">Health & Travels Portal</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none">SageSuite Active Connection</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-12 bg-[#fafafa]/30">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
            <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-zinc-50 p-6 rounded-2xl border border-zinc-200/50 shadow-sm' : ''}`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-3 mb-5">
                   <div className="w-6 h-6 rounded bg-[#0d47a1]/10 flex items-center justify-center">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#0d47a1]" viewBox="0 0 20 20" fill="currentColor">
                       <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3.005 3.005 0 013.75-2.906z" />
                     </svg>
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0d47a1]">Portal Assistant</p>
                </div>
              )}
              
              <div className={`text-[17px] leading-relaxed ${msg.role === 'user' ? 'text-zinc-600 font-medium' : 'text-black serif-text font-medium italic'}`}>
                {msg.content}
              </div>
              
              {/* Lead Capture Form */}
              {msg.type === 'lead-capture' && msg.role === 'assistant' && (
                <form onSubmit={handleLeadSubmit} className="mt-8 p-8 bg-zinc-950 rounded-2xl text-white border border-white/5 shadow-2xl relative overflow-hidden group">
                   <div className="relative z-10">
                     <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-blue-400 mb-6">Secure Delivery</h4>
                     <div className="space-y-6">
                       <input 
                         required
                         type="email" 
                         value={leadEmail}
                         onChange={(e) => setLeadEmail(e.target.value)}
                         placeholder="your@email.com"
                         className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 text-sm font-semibold outline-none focus:border-blue-500"
                       />
                       <label className="flex items-start gap-4 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={hasConsent}
                            onChange={(e) => setHasConsent(e.target.checked)}
                            className="w-5 h-5 rounded border-zinc-800 bg-zinc-900 text-blue-600 focus:ring-0" 
                          />
                          <span className="text-[11px] text-zinc-400 font-bold leading-normal uppercase tracking-wide">
                            Deliver doc and join the SageSuite professional wellness journal.
                          </span>
                       </label>
                       <button className="w-full bg-blue-600 hover:bg-blue-500 py-4.5 rounded-xl font-black text-[11px] uppercase tracking-[0.2em]">
                         {isSubmittingLead ? "Processing..." : "Secure Delivery"}
                       </button>
                     </div>
                   </div>
                </form>
              )}

              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-wrap gap-2">
                  {msg.sources.map((source, idx) => (
                    <a key={idx} href={source.uri} target="_blank" className="px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-[10px] font-bold text-zinc-500 hover:border-blue-600 hover:text-white transition-all">
                      {source.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start items-center gap-3">
            <div className="flex space-x-1.5 animate-pulse">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full delay-75"></div>
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full delay-150"></div>
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-300">Searching AllTrails & SageSuite Knowledge...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 bg-white border-t border-zinc-100">
        <div className="flex flex-wrap gap-2 mb-6">
          {SUGGESTIONS.map((s, i) => (
            <button key={i} onClick={() => handleSend(s.action)} className="px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-full text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:bg-[#0d47a1] hover:text-white hover:border-[#0d47a1] transition-all">
              {s.label}
            </button>
          ))}
        </div>
        <div className="relative flex items-center bg-zinc-100/50 border border-zinc-200 rounded-2xl px-6 py-1 group focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/5 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Search trails, professionals, or setup help..."
            className="w-full py-5 outline-none text-[15px] font-semibold bg-transparent"
          />
          <button onClick={() => handleSend()} className="text-[#0d47a1] p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
  );
};

export default ChatInterface;
