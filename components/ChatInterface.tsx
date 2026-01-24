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
      // The geminiService.sendMessage is now hardened and should not throw.
      const response = await geminiService.sendMessage([...messages, userMsg], textToSend);
      setIsLocalMode(!!response.isLocal);
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        timestamp: new Date(),
        sources: response.sources,
        type: response.triggerLead ? 'lead-capture' : 'text'
      }]);
    } catch (err: any) {
      console.error("Chat UI Error:", err);
      setMessages(prev => [...prev, {
        id: 'error-' + Date.now(),
        role: 'assistant',
        content: "Scout connection interrupted. Our backup protocols are currently providing local intel. How else can I help?",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-full bg-white ${className}`}>
      {/* Header Info */}
      <div className="px-6 py-3 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-blue-600 animate-pulse' : 'bg-green-500'}`}></div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
            {isLocalMode ? 'Local Intel Active' : 'Satellite Sync Active'}
          </span>
          {isLocalMode && (
             <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[8px] font-black uppercase tracking-widest rounded-full">Backup Uplink</span>
          )}
        </div>
        <div className="text-[9px] font-black text-zinc-300 uppercase tracking-widest">Portal Scout v2.5</div>
      </div>

      {/* Message Feed */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 bg-[#fafafa]/20 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in`}>
            <div className={`max-w-[88%] ${msg.role === 'user' ? 'bg-zinc-100 p-5 rounded-2xl rounded-tr-none shadow-sm' : ''}`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-3">
                   <div className="w-4 h-4 rounded-md bg-[#0d47a1] flex items-center justify-center">
                     <div className="relative w-1.5 h-1.5 rounded-full bg-white"></div>
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0d47a1]">Scout Intel</p>
                </div>
              )}
              
              <div className={`text-[17px] whitespace-pre-wrap leading-[1.6] ${msg.role === 'assistant' ? 'serif-text italic text-zinc-900' : 'text-sm font-semibold text-zinc-700'}`}>
                {msg.content}
              </div>
              
              {msg.type === 'lead-capture' && (
                <div className="mt-6 p-6 bg-[#0d47a1] rounded-2xl text-white shadow-2xl shadow-blue-900/20">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-blue-200 mb-4">Request Full Intel Access</h4>
                  <form onSubmit={(e) => { e.preventDefault(); handleSend("Sent credentials for newsletter."); }} className="flex flex-col sm:flex-row gap-2">
                    <input required type="email" placeholder="explorer@email.com" className="flex-1 bg-blue-900/40 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-400" />
                    <button className="bg-white text-[#0d47a1] px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-zinc-100 transition-colors">Join</button>
                  </form>
                </div>
              )}

              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {msg.sources.map((s, i) => (
                    <a key={i} href={s.uri} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[9px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors uppercase tracking-tight">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/></svg>
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
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Scouting Arizona trails...</span>
          </div>
        )}
      </div>

      {/* Input Console */}
      <div className="p-6 bg-white border-t border-zinc-100">
        <div className="max-w-4xl mx-auto relative group">
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
        <p className="text-center mt-4 text-[9px] font-black text-zinc-300 uppercase tracking-[0.4em]">Health & Travels Intel Division</p>
      </div>
    </div>
  );
});

export default ChatInterface;
