import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Map, Shield, Zap } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

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
  initialMessage = "Command Center active. I am Portal Scout, your high-desert intelligence asset. What trail intel or wellness protocols do you require for your next Arizona deployment?"
}) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: initialMessage }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
      if (!apiKey) {
        throw new Error('Intelligence Link Offline: GEMINI_API_KEY is missing. Please configure your Vercel Environment Variables.');
      }
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: `You are Portal Scout, a highly advanced AI intelligence asset for "Health & Travels". 
          Your tone is professional, tactical, and slightly futuristic. You specialize in Arizona hiking trails, desert survival, and high-altitude wellness protocols.
          
          Guidelines:
          - Use tactical terminology (e.g., "intel", "deployment", "protocol", "coordinates").
          - Be extremely precise about Arizona geography (Sedona, Flagstaff, Superstition Mountains).
          - Always prioritize safety and hydration in your advice.
          - Keep responses concise and scannable.
          - If asked about specific trails, provide "Strategic Intel" and "Wellness Protocols".`
        }
      });

      const modelResponse = response.text || "Communication link unstable. Please retry transmission.";
      setMessages(prev => [...prev, { role: 'model', content: modelResponse }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', content: "CRITICAL ERROR: Intelligence stream interrupted. Check your uplink." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center shadow-sm ${
                msg.role === 'user' ? 'bg-zinc-100' : 'bg-zinc-950'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-zinc-500" /> : <Bot className="w-5 h-5 text-white" />}
              </div>
              <div className={`p-5 rounded-[24px] text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-brand-primary text-white rounded-tr-none' 
                  : 'bg-zinc-50 text-zinc-800 border border-zinc-100 rounded-tl-none font-serif italic'
              }`}>
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
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Decrypting Intel...</span>
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
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Request Intel..."
            className="w-full pl-6 pr-16 py-5 bg-zinc-50 border border-zinc-100 rounded-2xl text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-zinc-950 text-white rounded-xl flex items-center justify-center hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-4 flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <Map className="w-3 h-3 text-zinc-300" />
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-300">Topo Mapping</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-3 h-3 text-zinc-300" />
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-300">Survival Protocol</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-zinc-300" />
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-300">Real-time Stream</span>
          </div>
        </div>
      </div>
    </div>
  );
};
