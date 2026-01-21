import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Message, Source } from '../types.ts';
import { geminiService } from '../services/gemini.ts';

interface ChatInterfaceProps {
  initialMessage?: string;
  className?: string;
}

export interface ChatInterfaceHandle {
  sendMessage: (text: string) => void;
}

const ChatInterface = forwardRef<ChatInterfaceHandle, ChatInterfaceProps>(({ initialMessage, className = "" }, ref) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
        content: initialMessage || "Scout Online. How can I help your journey?",
        timestamp: new Date(),
      }]);
    }
  }, [initialMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (overrideInput?: string) => {
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
      const { text, sources, triggerLead } = await geminiService.sendMessage([...messages, userMsg], textToSend);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: text,
        timestamp: new Date(),
        sources: sources,
        type: triggerLead ? 'lead-capture' : 'text'
      }]);
    } catch (err: any) {
      setMessages(prev => [...prev, {
        id: 'error-' + Date.now(),
        role: 'assistant',
        content: "Scout connection interrupted. Recalibrating portal sensors... Please try again.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-full bg-white ${className}`}>
      {/* Header Info */}
      <div className="px-6 py-4 bg-zinc-50 border-b border-zinc-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-blue-600 animate-pulse' : 'bg-green-500'}`}></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">SageSuite Sync Active</span>
        </div>
        <div className="text-[9px] font-bold text-zinc-300 uppercase tracking-widest">v2.5 Scout</div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 bg-[#fafafa]/20 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in`}>
            <div className={`max-w-[88%] ${msg.role === 'user' ? 'bg-zinc-100 p-5 rounded-2xl rounded-tr-none shadow-sm' : ''}`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-3">
                   <div className="w-4 h-4 rounded-md bg-[#0d47a1] flex items-center justify-center">
                     <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0d47a1]">Scout Intel</p>
                </div>
              )}
              
              <div className={`text-[17px] leading-[1.6] ${msg.role === 'assistant' ? 'serif-text italic text-zinc-900' : 'text-sm font-semibold text-zinc-700'}`}>
                {msg.content}
              </div>
              
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {msg.sources.map((s, i) => (
                    <a key={i} href={s.uri} target="_blank" className="inline-flex items-center gap-2 text-[9px] font-bold text-blue-600 bg-blue-50/50 px-2 py-1 rounded border border-blue-100 hover:bg-blue-100 uppercase tracking-tighter">
                      {s.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-3 px-2 text-[#0d47a1] animate-pulse">
            <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Scout is thinking...</span>
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-zinc-100">
        <div className="max-w-4xl mx-auto flex items-center bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-2 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50 transition-all">
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Scout about Sedona or SageSuite..."
            className="flex-1 py-4 outline-none bg-transparent text-[15px] font-semibold text-zinc-800 placeholder:text-zinc-400"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="ml-3 w-10 h-10 bg-[#0d47a1] text-white rounded-xl flex items-center justify-center hover:scale-105 transition-all disabled:opacity-30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});

export default ChatInterface;
