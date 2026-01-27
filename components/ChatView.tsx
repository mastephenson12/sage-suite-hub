
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message } from '../types';

export const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: 'Hello! I am Sage, your advanced AI assistant. How can I help you synchronize your command center today?', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          systemInstruction: 'You are Sage, an elite AI assistant for the Health & Travels Journal and the Sage Suite Hub. You are concise, intelligent, and editorial in your tone. You help manage travel brands like Flightsage, Travelsage, and Campsage.',
        },
      });

      let responseText = '';
      setMessages(prev => [...prev, { role: 'model', content: '', timestamp: new Date() }]);

      const stream = await chat.sendMessageStream({ message: inputValue });
      
      for await (const chunk of stream) {
        const c = chunk as GenerateContentResponse;
        responseText += c.text || '';
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMsg = newMessages[newMessages.length - 1];
          if (lastMsg && lastMsg.role === 'model') {
            lastMsg.content = responseText;
          }
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', content: 'I encountered an error synchronizing with the command center. Please try again.', timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto animate-in fade-in duration-700">
      <header className="mb-10">
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-4">Command Console</p>
        <h2 className="text-3xl font-black tracking-tighter">AI Assistant</h2>
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
          <p className="text-[9px] font-black uppercase tracking-widest text-zinc-300 italic">Connected to Gemini 3 Pro</p>
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
