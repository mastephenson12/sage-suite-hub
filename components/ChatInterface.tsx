import React, { useState, useRef, useEffect } from 'react';
import { Message, Source } from '../types.ts';
import { geminiService } from '../services/gemini.ts';

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
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        role: 'assistant',
        content: initialMessage || "Portal Scout Online. How can I assist your journey through the Arizona high desert today?",
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

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const { text, sources, triggerLead } = await geminiService.sendMessage(messages, input);
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
        content: "Scout connection temporarily interrupted. Re-syncing with the portal...",
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
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Thank you. Member credentials for **${leadEmail}** are being generated. Expect a dispatch shortly.`,
        timestamp: new Date(),
        type: 'success'
      }]);
      setIsSubmittingLead(false);
      setLeadEmail("");
    }, 1500);
  };

  return (
    <div className={`flex flex-col h-full bg-white ${className}`}>
      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 bg-[#fafafa]/30">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in`}>
            <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-zinc-100 p-4 rounded-2xl' : ''}`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Portal Scout</p>
                </div>
              )}
              <div className={`text-base leading-relaxed ${msg.role === 'user' ? 'text-zinc-600 font-medium' : 'text-black serif-text italic'}`}>
                {msg.content}
              </div>
              
              {msg.type === 'lead-capture' && (
                <form onSubmit={handleLeadSubmit} className="mt-4 p-5 bg-zinc-950 rounded-2xl text-white shadow-xl">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-3">Join the Dispatch</h4>
                  <div className="flex flex-col gap-3">
                    <input 
                      required
                      type="email" 
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      placeholder="Your email address..."
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button className="w-full bg-blue-600 hover:bg-blue-500 py-2.5 rounded-lg font-black text-[10px] uppercase tracking-widest transition-colors">
                      {isSubmittingLead ? "Submitting..." : "Get Access"}
                    </button>
                  </div>
                </form>
              )}

              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {msg.sources.map((s, i) => (
                    <a key={i} href={s.uri} target="_blank" className="text-[9px] font-bold text-blue-600 border border-blue-100 bg-blue-50/50 px-2 py-0.5 rounded uppercase hover:bg-blue-100 transition-colors">
                      {s.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-1.5 px-2">
            <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-zinc-100 bg-white">
        <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-1 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Search trails or ask for portal help..."
            className="flex-1 py-3 outline-none bg-transparent text-sm font-medium"
          />
          <button onClick={handleSend} className="text-blue-600 hover:scale-110 transition-transform p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
