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
  const [hasConsent, setHasConsent] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        role: 'assistant',
        content: initialMessage || "Portal Scout Online. I'm searching local trail reports and the SageSuite directory. How can I assist your journey today?",
        timestamp: new Date(),
        type: 'text'
      }]);
    }
  }, [initialMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = async (customInput?: string) => {
    const textToSend = customInput || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const { text, sources, triggerLead } = await geminiService.sendMessage(messages, textToSend);
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
      const successMsg: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Transmission to **${leadEmail}** complete. Your private guide and member credentials are on their way.`,
        timestamp: new Date(),
        type: 'success'
      };
      setMessages(prev => [...prev, successMsg]);
      setIsSubmittingLead(false);
      setLeadEmail("");
      setHasConsent(false);
    }, 1200);
  };

  return (
    <div className={`flex flex-col h-full overflow-hidden bg-white ${className}`}>
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10 bg-[#fafafa]/50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
            <div className={`max-w-[90%] md:max-w-[80%] ${msg.role === 'user' ? 'bg-zinc-100 p-5 rounded-2xl' : ''}`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-3">
                   <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                   <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Portal Scout</p>
                </div>
              )}
              <div className={`text-[16px] leading-relaxed ${msg.role === 'user' ? 'text-zinc-600 font-semibold' : 'text-black serif-text italic'}`}>
                {msg.content}
              </div>
              
              {msg.type === 'lead-capture' && (
                <form onSubmit={handleLeadSubmit} className="mt-6 p-6 bg-zinc-950 rounded-2xl text-white shadow-xl">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-4">Secure Delivery</h4>
                  <div className="space-y-4">
                    <input 
                      required
                      type="email" 
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      placeholder="Enter your email..."
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none"
                    />
                    <button className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-colors">
                      {isSubmittingLead ? "Processing..." : "Get Access"}
                    </button>
                  </div>
                </form>
              )}

              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {msg.sources.map((s, i) => (
                    <a key={i} href={s.uri} target="_blank" className="text-[10px] font-bold text-blue-600 hover:underline">
                      [{s.title}]
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce delay-100"></div>
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce delay-200"></div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 md:p-6 bg-white border-t border-zinc-100">
        <div className="relative flex items-center bg-zinc-50 border border-zinc-200 rounded-xl px-4 group focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything..."
            className="w-full py-4 outline-none bg-transparent text-sm font-medium"
          />
          <button onClick={() => handleSend()} className="text-blue-600 p-2">
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
