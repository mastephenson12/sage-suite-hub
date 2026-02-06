import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Message } from '../types';
import { geminiService } from '../services/gemini';

export interface ChatInterfaceHandle { sendMessage: (text: string) => void; }

const ChatInterface = forwardRef<ChatInterfaceHandle, { initialMessage?: string, className?: string }>((props, ref) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestionChips = [
    { label: "Book a Sedona Trip", query: "Help me plan and book a 3-day wellness trip to Sedona." },
    { label: "Wellness Protocols", query: "What are the best health protocols for desert hiking?" },
    { label: "Retreat Directory", query: "Find me the top-rated wellness retreats in Arizona." }
  ];

  useImperativeHandle(ref, () => ({ sendMessage: (text: string) => handleSend(text) }));

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ id: '1', role: 'assistant', content: props.initialMessage || "Online.", timestamp: new Date() }]);
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
    const response = await geminiService.sendMessage(messages, text);
    setMessages(prev => [...prev, { id: 'bot-' + Date.now(), role: 'assistant', content: response.text, sources: response.sources, timestamp: new Date() }]);
    setIsLoading(false);
  };

  return (
    <div className={`flex flex-col h-full bg-white ${props.className}`}>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-6 ${msg.role === 'user' ? 'bg-zinc-100 rounded-3xl' : 'font-serif italic text-lg text-zinc-800'}`}>
              {msg.content}
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-4 pt-4 border-t border-zinc-100 flex flex-wrap gap-2">
                  {msg.sources.map((s, i) => (
                    <a key={i} href={s.uri} target="_blank" rel="noopener noreferrer" className="text-[9px] font-black text-brand-primary hover:underline uppercase tracking-tighter">
                      {s.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-6 bg-zinc-50 rounded-3xl animate-pulse">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-zinc-300 rounded-full"></div>
                <div className="w-2 h-2 bg-zinc-300 rounded-full"></div>
                <div className="w-2 h-2 bg-zinc-300 rounded-full"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="px-10 py-6 border-t border-zinc-100 bg-white">
        {!isLoading && messages.length < 5 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {suggestionChips.map((chip, i) => (
              <button
                key={i}
                onClick={() => handleSend(chip.query)}
                className="text-[10px] font-black uppercase tracking-widest bg-zinc-50 border border-zinc-200 px-4 py-2 rounded-full hover:bg-black hover:text-white hover:border-black transition-all"
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
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-full px-8 py-5 outline-none text-lg placeholder-zinc-300 focus:border-black transition-colors"
            placeholder="Ask Scout or issue a command..."
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 p-3 bg-black text-white rounded-full disabled:opacity-20 hover:scale-105 transition-transform"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>
        <p className="text-center mt-4 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-300">
          Powered by Gemini 3 Satellite Intel
        </p>
      </div>
    </div>
  );
});

export default ChatInterface;
