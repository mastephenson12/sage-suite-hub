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
      setMessages(prev => [...prev, {
        id: 'error-' + Date.now(),
        role: 'assistant',
        content: "Scout connection interrupted. Please check your network and try again.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-full bg-white ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-blue-600 animate-pulse' : 'bg-green-500'}`}></div>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Portal Scout</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-gray-50/30 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in`}>
            <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-zinc-100 p-4 rounded-2xl rounded-tr-none shadow-sm' : ''}`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Portal Scout</p>
                </div>
              )}
              
              <div className={`text-base leading-relaxed ${msg.role === 'user' ? 'text-zinc-600 font-medium' : 'text-black'}`}>
                {msg.content}
              </div>
              
              {msg.type === 'lead-capture' && (
                <div className="mt-4 p-5 bg-[#0d47a1] rounded-2xl text-white shadow-xl">
                  <h4 className="text-[11px] font-bold uppercase tracking-widest mb-3">Request Portal Access</h4>
                  <form onSubmit={(e) => { e.preventDefault(); handleSend("I've submitted my email for portal access."); }} className="flex gap-2">
                    <input required type="email" placeholder="email@address.com" className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm outline-none" />
                    <button className="bg-white text-[#0d47a1] px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest">Join</button>
                  </form>
                </div>
              )}

              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {msg.sources.map((s, i) => (
                    <a key={i} href={s.uri} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-md hover:bg-blue-100 transition-colors">
                      {s.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-[10px] font-black text-blue-600 animate-pulse uppercase tracking-widest">
            Searching...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 md:p-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto relative">
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Scout anything..."
            className="w-full bg-gray-50 rounded-2xl px-5 py-4 pr-16 outline-none text-[15px] font-medium text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all border border-gray-100"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0d47a1] text-white rounded-xl flex items-center justify-center hover:scale-105 transition-all disabled:opacity-30"
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
