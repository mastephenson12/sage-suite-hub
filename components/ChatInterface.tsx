import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Message, Source } from '../types';
import { geminiService } from '../services/gemini';

export interface ChatInterfaceHandle {
  sendMessage: (text: string) => void;
}

interface ChatInterfaceProps {
  initialMessage?: string;
  className?: string;
}

const ChatInterface = forwardRef<ChatInterfaceHandle, ChatInterfaceProps>((props, ref) => {
  const { initialMessage, className = "" } = props;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLocalMode, setIsLocalMode] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    sendMessage: (text: string) => {
      handleSend(text);
    }
  }));

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        role: 'assistant',
        content: initialMessage || "Scout Portal Online. Monitoring Arizona trail nodes. How can I assist your journey?",
        timestamp: new Date(),
      }]);
    }
  }, [initialMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
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
      setIsLocalMode(!!response.isLocal);
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        timestamp: new Date(),
        sources: response.sources,
        type: response.triggerLead ? 'lead-capture' : 'text'
      }]);
    } catch (err) {
      console.error("Scout Session Error:", err);
      setMessages(prev => [...prev, {
        id: 'err-' + Date.now(),
        role: 'assistant',
        content: "Satellite link interrupted. Switched to high-desert backup protocols.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={`flex flex-col h-full bg-white ${className}`}>
      <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${isLoading ? 'bg-brand-accent animate-pulse' : isLocalMode ? 'bg-orange-400' : 'bg-green-500 shadow-sm'}`}></div>
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">
            {isLocalMode ? 'Local Relay Mode' : 'Satellite Link Active'}
          </span>
        </div>
        <div className="text-[9px] font-black text-zinc-300 uppercase tracking-widest hidden sm:block">Scout Terminal v2.5.4</div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-10 space-y-12 bg-[#fafafa]/20 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
            <div className={`max-w-[90%] ${msg.role === 'user' ? 'bg-zinc-100 p-6 rounded-3xl rounded-tr-none shadow-sm' : ''}`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-5 h-5 rounded-lg bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/10">
                     <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-primary">Portal Scout</p>
                </div>
              )}
              <div className={`text-[17px] whitespace-pre-wrap leading-relaxed ${msg.role === 'assistant' ? 'italic text-zinc-900 font-serif' : 'text-sm font-semibold text-zinc-700'}`}>
                {msg.content}
              </div>
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-zinc-100">
                  {msg.sources.map((s, i) => (
                    <a key={i} href={s.uri} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-bold text-brand-primary bg-brand-primary/5 border border-brand-primary/10 px-4 py-2 rounded-xl hover:bg-brand-primary hover:text-white transition-all uppercase tracking-tight">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      {s.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-3 px-2 text-brand-primary animate-pulse">
            <div className="flex gap-1">
              <span className="w-1 h-1 bg-brand-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1 h-1 bg-brand-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1 h-1 bg-brand-primary rounded-full animate-bounce"></span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Analyzing high-desert terrain...</span>
          </div>
        )}
      </div>

      <div className="p-8 bg-white border-t border-zinc-100">
        <div className="max-w-4xl mx-auto relative">
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Scout about trail conditions, gear, or recovery retreats..."
            className="w-full bg-zinc-50 border border-zinc-200 rounded-[24px] px-8 py-6 pr-20 outline-none text-[16px] font-semibold text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary/20 transition-all shadow-sm"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 w-14 h-14 bg-brand-primary text-white rounded-[20px] flex items-center justify-center hover:bg-brand-dark hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-primary/20 disabled:opacity-30 disabled:scale-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
        <p className="text-center mt-4 text-[9px] font-bold text-zinc-300 uppercase tracking-widest">
          Vetted Intelligence Grounded by Google Search
        </p>
      </div>
    </div>
  );
});

export default ChatInterface;
