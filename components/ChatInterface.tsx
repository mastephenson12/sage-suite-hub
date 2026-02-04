import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Message } from '../types';
import { geminiService } from '../services/gemini';

export interface ChatInterfaceHandle { sendMessage: (text: string) => void; }

const ChatInterface = forwardRef<ChatInterfaceHandle, { initialMessage?: string, className?: string }>((props, ref) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({ sendMessage: (text: string) => handleSend(text) }));

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ id: '1', role: 'assistant', content: props.initialMessage || "Online.", timestamp: new Date() }]);
    }
  }, []);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, isLoading]);

  const handleSend = async (override?: string) => {
    const text = override || input;
    if (!text.trim() || isLoading) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    const response = await geminiService.sendMessage(messages, text);
    setMessages(prev => [...prev, { id: 'bot-' + Date.now(), role: 'assistant', content: response.text, sources: response.sources, timestamp: new Date() }]);
    setIsLoading(false);
  };

  return (
    <div className={`flex flex-col h-full bg-white ${props.className}`}>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-6 ${msg.role === 'user' ? 'bg-zinc-100 rounded-3xl' : 'font-serif italic text-lg text-zinc-800'}`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div className="p-8 border-t border-zinc-100 relative">
        <input 
          value={input} 
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          className="w-full bg-zinc-50 border border-zinc-200 rounded-full px-8 py-4 outline-none text-lg"
          placeholder="Ask Scout..."
        />
      </div>
    </div>
  );
});

export default ChatInterface;
