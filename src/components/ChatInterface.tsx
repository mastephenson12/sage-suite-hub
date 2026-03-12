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
  initialMessage = "Hi, I’m Sage. I help families and groups plan trips anywhere in the world, with extra expertise in Arizona. Tell me where you want to go, your dates, how many adults and kids are traveling, and your budget."}) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: initialMessage }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const container = messagesEndRef.current?.parentElement;
  if (!container) return;

  const nearBottom =
    container.scrollHeight - container.scrollTop - container.clientHeight < 120;

  if (nearBottom) {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }
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
        throw new Error('Sage is not connected right now. Please configure your GEMINI API key in Vercel.');
      }
      const ai = new GoogleGenAI({ apiKey });
const response = await ai.models.generateContent({
  model: 'gemini-3-flash-preview',
  contents: [
    { role: 'user', parts: [{ text: userMessage }] }
  ],
  config: {
    systemInstruction: `You are Sage, a family travel planning assistant for Health & Travels.

You help users plan trips anywhere in the world, with especially strong expertise in Arizona.

You support four modes:
1. FlightSage – flights, routing ideas, airports
2. CampSage – campsites, RV parks, national and state parks
3. TravelSage – hotels, resorts, cabins, vacation rentals
4. ArizonaSage – Arizona trails, scenic drives, towns, and seasonal tips

Your tone:
- warm
- clear
- practical
- family-friendly
- safety-aware
- encouraging

CRITICAL RULES:
- Keep first responses under 120 words.
- If the user only gives a destination, like "Sedona", ask 3 to 5 short planning questions instead of giving a long guide.
- Do not give a full itinerary until you know:
  - travel dates
  - number of travelers
  - ages of children
  - budget
- Use bullet points instead of long paragraphs.
- Only provide detailed activity lists after the user answers your questions.
- Always consider budget, travel dates, drive time, weather, group size, and children’s ages.
- For Arizona trips, emphasize heat safety, hydration, parking, trail timing, and family suitability.
- When users are unsure, suggest 2 to 4 realistic options.
- Organize answers in short sections with clear next steps.`
  }
});

const modelResponse = response.text || "I'm having trouble planning that right now. Please try again.";
      setMessages(prev => [...prev, { role: 'model', content: modelResponse }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', content: "I’m having trouble connecting right now. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-full min-h-0 overflow-hidden bg-white ${className}`}>
      <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-6 scrollbar-hide">
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
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Planning your trip...</span>
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
            placeholder="Tell me where you want to go, your dates, and who is traveling..."
            className="w-full pl-6 pr-16 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all"
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
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-300">Family Trip Planning</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-3 h-3 text-zinc-300" />
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-300">Arizona Expertise</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-zinc-300" />
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-300">Flights • Camping • Hotels</span>
          </div>
        </div>
      </div>
    </div>
  );
};
