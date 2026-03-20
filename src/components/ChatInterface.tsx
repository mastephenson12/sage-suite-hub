import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Map, Shield, Zap } from 'lucide-react';
import { chatWithGemini } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface ChatInterfaceProps {
  className?: string;
  initialMessage?: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  className = '',
  initialMessage = "Hi, I’m Sage. I help families and groups plan trips anywhere in the world, with extra expertise in Arizona. Tell me where you want to go, your dates, how many adults and kids are traveling, and your budget.",
}) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem('sage-chat-messages');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to load saved chat messages:', error);
    }

    return [{ role: 'model', content: initialMessage }];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messagesEndRef.current?.parentElement;
    if (!container) return;

    if (container.scrollHeight > container.clientHeight) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    try {
      localStorage.setItem('sage-chat-messages', JSON.stringify(messages));
    } catch (error) {
      console.error('Failed to save chat messages:', error);
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const nextUserMessage: Message = { role: 'user', content: userMessage };

    setInput('');
    setMessages((prev) => [...prev, nextUserMessage]);
    setIsLoading(true);

    try {
      const history = messages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      }));

      const modelResponse = await chatWithGemini(userMessage, history);

      setMessages((prev) => [
        ...prev,
        { role: 'model', content: modelResponse },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: 'I’m having trouble connecting right now. Please try again in a moment.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-full min-h-0 overflow-hidden bg-white ${className}`}>
      <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] flex gap-4 ${
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center shadow-sm ${
                  msg.role === 'user' ? 'bg-zinc-100' : 'bg-zinc-950'
                }`}
              >
                {msg.role === 'user' ? (
                  <User className="w-5 h-5 text-zinc-500" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>

              <div
                className={`p-5 rounded-[24px] text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-brand-primary text-white rounded-tr-none'
                    : 'bg-zinc-50 text-zinc-800 border border-zinc-100 rounded-tl-none font-serif italic'
                }`}
              >
                {msg.content}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center shadow-sm">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="p-5 rounded-[24px] rounded-tl-none bg-zinc-50 border border-zinc-100 flex items-center gap-3">
                <Loader2 className="w-4 h-4 animate-spin text-brand-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  Planning your trip...
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 border-t border-zinc-100 bg-white">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
            placeholder="Example: Sedona in April, 2 adults and 2 kids, hotel, moderate budget"
            className="w-full pl-6 pr-16 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all"
          />

          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-zinc-950 text-white rounded-xl flex items-center justify-center hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <Map className="w-3 h-3 text-zinc-300" />
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-300">
              Family Trip Planning
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Shield className="w-3 h-3 text-zinc-300" />
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-300">
              Arizona Expertise
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-zinc-300" />
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-300">
              Flights • Camping • Hotels
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
