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
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  // Expose sendMessage to parent components via ref
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
        content: initialMessage || "Scout Portal Online. I'm connected to the SageSuite directory and local AZ trail databases. How can I assist your journey?",
        timestamp: new Date(),
        type: 'text'
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

    setError(null);
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
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: text,
        timestamp: new Date(),
        sources: sources,
        type: triggerLead ? 'lead-capture' : 'text'
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      setError(err.message);
      setMessages(prev => [...prev, {
        id: 'error-' + Date.now(),
        role: 'assistant',
        content: err.message || "Connection interrupted. Scout is recalibrating.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-full bg-white ${className}`}>
      {/* Header Info */}
      <div className="px-6 py-3 bg-zinc-50 border-b border-zinc-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-blue-500 animate-pulse' : 'bg-green-500'}`}></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">SageSuite Sync Active</span>
        </div>
        <div className="text-[9px] font-bold text-zinc-300 uppercase tracking-widest">v2.5 Scout</div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 bg-[#fafafa]/20 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in`}>
            <div className={`max-w-[88%] ${msg.role === 'user' ? 'bg-zinc-100 p-5 rounded-2xl rounded-tr-none text-zinc-700 font-medium shadow-sm' : ''}`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-3">
                   <div className="w-4 h-4 rounded-md bg-[#0d47a1] flex items-center justify-center shadow-lg shadow-blue-900/10">
                     <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Scout Intel</p>
                </div>
              )}
              
              <div className={`text-[17px] leading-[1.6] ${msg.role === 'assistant' ? 'serif-text italic text-zinc-900' : 'text-sm font-semibold'}`}>
                {msg.content}
              </div>
              
              {msg.type === 'lead-capture' && (
                <div className="mt-6 p-6 bg-[#0d47a1] rounded-2xl text-white shadow-2xl shadow-blue-900/20 animate-in">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-200 mb-4">Request Portal Access</h4>
                  <form onSubmit={(e) => { e.preventDefault(); setIsSubmittingLead(true); setTimeout(() => { setMessages(prev => [...prev, { id: 'succ-' + Date.now(), role: 'assistant', content: "Intel dispatch complete. Check your inbox for access credentials.", timestamp: new Date(), type: 'success' }]); setIsSubmittingLead(false); }, 1500); }} className="space-y-3">
                    <input 
                      required type="email" placeholder="explorer@email.com" 
                      className="w-full bg-blue-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button className="w-full bg-white text-[#0d47a1] py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-zinc-100 transition-colors">
                      {isSubmittingLead ? "Verifying..." : "Connect Identity"}
                    </button>
                  </form>
                </div>
              )}

              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="w-full text-[9px] font-black text-zinc-300 uppercase tracking-widest mb-1">Grounding Intel:</span>
                  {msg.sources.map((s, i) => (
                    <a key={i} href={s.uri} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-bold text-blue-600 bg-blue-50/80 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-all border border-blue-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                      {s.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 px-2 text-[#0d47a1] animate-pulse">
            <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] ml-2">Searching Local Data...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 bg-white border-t border-zinc-100">
        <div className="max-w-4xl mx-auto flex items-center bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-2 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50 transition-all">
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Scout about Sedona trails or SageSuite setup..."
            className="flex-1 py-4 outline-none bg-transparent text-[15px] font-semibold text-zinc-800 placeholder:text-zinc-400"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="ml-3 w-10 h-10 bg-[#0d47a1] text-white rounded-xl flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-30 disabled:hover:scale-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
        <p className="text-center mt-4 text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em]">Health & Travels Intelligence Division</p>
      </div>
    </div>
  );
});

export default ChatInterface;
  );
});

export default ChatInterface;
