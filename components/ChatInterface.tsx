import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Message } from '../types.ts';
import { geminiService } from '../services/gemini.ts';

export interface ChatInterfaceHandle { sendMessage: (text: string) => void; }

const ChatInterface = forwardRef<ChatInterfaceHandle, { initialMessage?: string, className?: string }>((props, ref) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestionChips = [
    { label: "Book a Sedona Trip", query: "Plan a 3-day high-end wellness trip to Sedona with specific trail recommendations." },
    { label: "Desert Recovery Protocols", query: "What are the best recovery protocols for hikers in Arizona?" },
    { label: "Community Domain Sync", query: "How do I setup my GHL Community subdomain for SageSuite?" }
  ];

  useImperativeHandle(ref, () => ({ sendMessage: (text: string) => handleSend(text) }));

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ id: '1', role: 'assistant', content: props.initialMessage || "Scout Portal Online. Awaiting trail or wellness inquiry.", timestamp: new Date() }]);
    }
  }, []);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, isLoading]);

  const handleSend = async (override?: string) => {
    const text = override || input;
    if (!text.trim() || isLoading) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    
    try {
      const response = await geminiService.sendMessage(messages, text);
      setMessages(prev => [...prev, { 
        id: 'bot-' + Date.now(), 
        role: 'assistant', 
        content: response.text, 
        sources: response.sources, 
        timestamp: new Date() 
      }]);
    } catch (error) {
      console.error("Chat Fault:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-full bg-white ${props.className}`}>
      {/* Message Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-10 space-y-12 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-300 mb-2">
              {msg.role === 'user' ? 'Direct Inquiry' : 'Scout Dispatch'} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <div className={`max-w-[90%] md:max-w-[80%] p-6 ${
              msg.role === 'user' 
              ? 'bg-zinc-100 rounded-2xl border border-zinc-200 text-black' 
              : 'font-serif italic text-lg md:text-xl text-zinc-800 leading-relaxed'
            }`}>
              {msg.content}
              
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-8 pt-6 border-t border-zinc-100">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4">Vetted Intelligence Sources:</p>
                  <div className="flex flex-wrap gap-2">
                    {msg.sources.map((s, i) => (
                      <a 
                        key={i} 
                        href={s.uri} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[9px] font-black bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-sm text-brand-primary hover:bg-brand-primary hover:text-white transition-all uppercase tracking-tighter"
                      >
                        {s.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex flex-col items-start animate-pulse">
            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-300 mb-2">Scout Decoding Satellite Packets...</p>
            <div className="max-w-[80%] p-6 bg-zinc-50 rounded-2xl flex space-x-2">
              <div className="w-2 h-2 bg-zinc-200 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-zinc-200 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-zinc-200 rounded-full animate-bounce"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="px-6 md:px-10 py-8 border-t border-zinc-100 bg-white/80 backdrop-blur-xl">
        {!isLoading && messages.length < 5 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {suggestionChips.map((chip, i) => (
              <button
                key={i}
                onClick={() => handleSend(chip.query)}
                className="text-[10px] font-black uppercase tracking-widest bg-zinc-50 border border-zinc-200 px-4 py-2.5 rounded-full hover:bg-black hover:text-white hover:border-black transition-all shadow-sm"
              >
                {chip.label}
              </button>
            ))}
          </div>
        )}
        <div className="relative flex items-center">
          <input 
            value={input} 
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-8 py-5 outline-none text-lg placeholder-zinc-300 focus:border-black focus:ring-1 focus:ring-black/5 transition-all"
            placeholder="Issue a command or ask Scout..."
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 p-4 bg-black text-white rounded-xl disabled:opacity-20 hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-300">
            Powered by Gemini 3 Synthetic Intelligence
          </p>
          <div className="flex items-center gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
             <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Grounding Active</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ChatInterface;
