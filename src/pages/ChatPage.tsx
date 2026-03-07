import React from 'react';
import { ChatInterface } from '../components/ChatInterface';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChatPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* Navigation */}
      <div className="bg-white border-b border-zinc-100 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-zinc-500 hover:text-black transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Return to Base</span>
        </Link>
        <div className="text-center">
          <h1 className="text-xs font-black uppercase tracking-[0.3em]">Adventure Command</h1>
          <p className="text-[8px] text-zinc-400 font-medium uppercase tracking-widest mt-1">Satellite Link: Established</p>
        </div>
        <div className="w-24"></div> {/* Spacer */}
      </div>

      {/* Main Chat Area */}
      <div className="flex-grow flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-4xl h-[800px] max-h-[85vh] bg-white rounded-[40px] shadow-2xl shadow-zinc-200/50 overflow-hidden border border-zinc-100 flex flex-col">
          <ChatInterface 
            className="flex-grow" 
            initialMessage="Scout Portal Active. I'm connected to the Arizona Command Center. How can I assist your expedition today?" 
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
