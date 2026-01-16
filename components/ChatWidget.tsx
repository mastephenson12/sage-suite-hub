import React, { useState } from 'react';
import ChatInterface from './ChatInterface.tsx';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9999]">
      {isOpen && (
        <div className="mb-6 w-[350px] sm:w-[450px] h-[650px] max-h-[80vh] animate-in slide-in-from-bottom-8 fade-in duration-300">
          <ChatInterface 
            className="h-full border-zinc-200 shadow-[0_32px_80px_-16px_rgba(13,71,161,0.25)] rounded-2xl" 
            initialMessage="Portal Scout Active. I'm searching local trail reports and the SageSuite directory for you. What's on your mind?" 
          />
        </div>
      )}
      
      <div className="flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group flex items-center justify-center w-16 h-16 rounded-2xl shadow-2xl transition-all active:scale-95 border-2 ${
            isOpen 
              ? 'bg-white text-[#0d47a1] border-zinc-200 hover:bg-zinc-50' 
              : 'bg-[#0d47a1] text-white border-[#0d47a1] hover:bg-[#0a3a85] hover:scale-105'
          }`}
          aria-label="Toggle Scout Portal"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <div className="relative">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
            </div>
          )}
          
          {!isOpen && (
            <div className="absolute right-20 bg-zinc-950 text-white px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-white/10 whitespace-nowrap">
              Portal Scout
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;
export default ChatWidget;
};

export default ChatWidget;
