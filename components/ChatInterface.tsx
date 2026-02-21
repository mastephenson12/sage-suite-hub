import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Message } from '../types';
import { geminiService } from '../services/geminiService';

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
      setMessages(prev => [...prev, { 
        id: 'error-' + Date.now(), 
        role: 'assistant', 
        content: "Scout link interrupted by atmospheric noise. Satellite re-acquisition in progress.", 
        timestamp: new Date() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-full bg-white ${props.className}`}>
      {/* Message Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-12 space-y-16 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-fade-in`}>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-300 mb-4">
              {msg.role === 'user' ? 'Direct Inquiry' : 'Scout Dispatch'} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <div className={`max-w-[95%] md:max-w-[80%] ${
              msg.role === 'user' 
              ? 'bg-zinc-100 rounded-[24px] px-8 py-6 text-black border border-zinc-200' 
              : 'font-serif text-xl md:text-2xl text-zinc-800 leading-relaxed italic'
            }`}>
              <div className="whitespace-pre-wrap">{msg.content}</div>
              
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-10 pt-8 border-t border-zinc-100 font-sans italic not-italic">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">Vetted Intel Nodes:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {msg.sources.map((s, i) => (
                      <a 
                        key={i} 
                        href={s.uri} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center justify-between text-[10px] font-black bg-zinc-50 border border-zinc-100 px-5 py-3 rounded-xl text-brand-primary hover:bg-brand-primary hover:text-white transition-all uppercase tracking-tighter shadow-sm"
                      >
                        <span className="truncate mr-2">{s.title}</span>
                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
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
            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-300 mb-4">Scout Syncing Data Packets...</p>
            <div className="max-w-[80%] p-8 bg-zinc-50 rounded-[32px] flex space-x-3">
              <div className="w-2.5 h-2.5 bg-zinc-200 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2.5 h-2.5 bg-zinc-200 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2.5 h-2.5 bg-zinc-200 rounded-full animate-bounce"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="px-6 md:px-12 py-10 border-t border-zinc-100 bg-white/90 backdrop-blur-2xl">
        {!isLoading && messages.length < 5 && (
          <div className="flex flex-wrap gap-3 mb-8">
            {suggestionChips.map((chip, i) => (
              <button
                key={i}
                onClick={() => handleSend(chip.query)}
                className="text-[10px] font-black uppercase tracking-widest bg-zinc-50 border border-zinc-100 px-6 py-3 rounded-full hover:bg-black hover:text-white hover:border-black transition-all shadow-sm active:scale-95"
              >
                {chip.label}
              </button>
            ))}
          </div>
        )}
        <div className="relative flex items-center group">
          <input 
            value={input} 
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-[28px] pl-10 pr-20 py-7 outline-none text-xl placeholder-zinc-300 focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/5 transition-all duration-300"
            placeholder="Issue a command or ask Scout..."
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="absolute right-4 w-14 h-14 flex items-center justify-center bg-black text-white rounded-[20px] disabled:opacity-20 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
        <div className="flex justify-between items-center mt-6">
          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-300">
            Satellite Grounding Engine: Synchronized
          </p>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Linked to Gemini 3</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ChatInterface;
