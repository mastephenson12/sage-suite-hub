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
        content: initialMessage || "Scout Portal Online. How can I assist your journey?",
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
      <div className="px-6 py-3 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-blue-600 animate-pulse' : 'bg-green-500'}`}></div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
            {isLocalMode ? 'Local Intel Active' : 'Satellite Sync Active'}
          </span>
        </div>
        <div className="text-[9px] font-black text-zinc-300 uppercase tracking-widest">Portal Scout v2.5</div>
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
              <div className={`text-[17px] whitespace-pre-wrap leading-[1.6] ${msg.role === 'assistant' ? 'italic text-zinc-900 font-serif' : 'text-sm font-semibold text-zinc-700'}`}>
                {msg.content}
              </div>
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {msg.sources.map((s, i) => (
                    <a key={i} href={s.uri} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[9px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors uppercase tracking-tight">
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
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Scouting Arizona trails...</span>
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-zinc-100">
        <div className="max-w-4xl mx-auto relative">
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Query Scout about vacation plans or trail intel..."
            className="w-full bg-zinc-50 border border-zinc-200 rounded-[20px] px-6 py-5 pr-16 outline-none text-[15px] font-semibold text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all shadow-sm"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-[#0d47a1] text-white rounded-[14px] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-900/20 disabled:opacity-30"
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
