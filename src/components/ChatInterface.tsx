import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Image as ImageIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { chatWithGemini, generateImage } from '../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  type?: 'text' | 'image';
}

interface ChatInterfaceProps {
  className?: string;
  initialMessage?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ className = '', initialMessage }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialMessage && messages.length === 0) {
      setMessages([{
        id: 'initial',
        role: 'model',
        content: initialMessage,
        timestamp: new Date()
      }]);
    }
  }, [initialMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Check if it's an image request
    const isImageRequest = input.toLowerCase().startsWith('/image') || input.toLowerCase().includes('generate an image');
    
    if (isImageRequest) {
      const imageUrl = await generateImage(input);
      if (imageUrl) {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'model',
          content: imageUrl,
          timestamp: new Date(),
          type: 'image'
        }]);
      } else {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'model',
          content: "I couldn't generate that image for you. There might be a technical issue or content restriction.",
          timestamp: new Date()
        }]);
      }
    } else {
      const response = await chatWithGemini(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: response || "I'm sorry, I couldn't process that request.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }

    setIsLoading(false);
  };

  return (
    <div className={`flex flex-col bg-white ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-black">Portal Scout</h3>
            <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">Intelligence Node 3.1</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Active</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto px-6 py-8 space-y-8 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
              msg.role === 'user' ? 'bg-zinc-100' : 'bg-blue-50'
            }`}>
              {msg.role === 'user' ? <User className="w-4 h-4 text-zinc-600" /> : <Bot className="w-4 h-4 text-brand-primary" />}
            </div>
            <div className={`max-w-[80%] space-y-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
              <div className={`inline-block px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-zinc-900 text-white rounded-tr-none' 
                  : 'bg-zinc-50 text-zinc-800 border border-zinc-100 rounded-tl-none'
              }`}>
                {msg.type === 'image' ? (
                  <img src={msg.content} alt="Generated" className="rounded-lg max-w-full h-auto shadow-sm" />
                ) : (
                  <div className="markdown-body prose prose-sm max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                  </div>
                )}
              </div>
              <p className="text-[9px] text-zinc-400 font-medium uppercase tracking-widest">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <Loader2 className="w-4 h-4 text-brand-primary animate-spin" />
            </div>
            <div className="bg-zinc-50 border border-zinc-100 px-4 py-3 rounded-2xl rounded-tl-none">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-6 border-t border-zinc-100 bg-white">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Scout about trails, wellness, or generate an image..."
            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 pr-24 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
            disabled={isLoading}
          />
          <div className="absolute right-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setInput('/image ')}
              className="p-2 text-zinc-400 hover:text-brand-primary transition-colors"
              title="Generate Image"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-brand-primary text-white p-2.5 rounded-xl hover:bg-brand-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-primary/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="mt-3 text-[9px] text-zinc-400 text-center font-medium uppercase tracking-[0.2em]">
          Powered by Sage Intelligence Node 3.1 • Arizona Command
        </p>
      </form>
    </div>
  );
};

export default ChatInterface;
