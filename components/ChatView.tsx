import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types.ts';
import { geminiService } from '../services/gemini.ts';

export const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: 'Hello! I am Sage, your advanced AI assistant. How can I help you synchronize your command center today?', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLocal, setIsLocal] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await geminiService.sendMessage(messages, inputValue);
      setIsLocal(!!response.isLocal);
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: response.text, 
        timestamp: new Date(),
        sources: response.sources 
      }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', content: 'I encountered an error synchronizing with the command center. Please try again.', timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto animate-in fade-in duration-700">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-4">Command Console</p>
          <h2 className="text-3xl font-black tracking-tighter">AI Assistant</h2>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-full">
          <div className={`w-2 h-2 rounded-full ${isLocal ? 'bg-orange-400' : 'bg-green-500 animate-pulse'}`}></div>
          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">
            {isLocal ? 'Local Buffer' : 'Satellite Link'}
          </span>
        </div>
      </header>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto custom-scrollbar space-y-12 mb-8 pr-4"
      >
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-300 mb-2">
              {msg.role === 'user' ? 'Direct Inquiry' : 'Sage Response'} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <div className={`max-w-[85%] rounded-sm p-6 ${
              msg.role === 'user' 
              ? 'bg-zinc-50 border border-zinc-100 text-black' 
              : 'bg-white border border-black/5 shadow-xl shadow-black/5 text-zinc-800'
            }`}>
              <div className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                {msg.content || (isLoading && idx === messages.length - 1 ? 'Typing...' : '')}
              </div>
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-zinc-50">
                  {msg.sources.map((s, i) => (
                    <a key={i} href={s.uri} target="_blank" rel="noopener noreferrer" className="text-[9px] font-bold text-brand-primary uppercase tracking-tighter hover:underline">
                      {s.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="relative pt-6 border-t border-zinc-100 bg-white">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Issue a command or ask a question..."
          className="w-full bg-transparent text-xl font-medium text-black placeholder-zinc-200 focus:outline-none resize-none h-20 leading-snug"
        />
        <div className="flex justify-between items-center mt-4">
          <p className="text-[9px] font-black uppercase tracking-widest text-zinc-300 italic">Connected to Gemini 3 Intelligence</p>
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="px-8 py-3 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-80 disabled:opacity-20 transition-all shadow-xl shadow-black/5"
          >
            {isLoading ? 'Processing' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};
