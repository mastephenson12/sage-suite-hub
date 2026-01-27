
import React, { useState } from 'react';
import ChatInterface from './ChatInterface.tsx';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-[9999]">
      {isOpen && (
        <div className="mb-6 w-[360px] sm:w-[480px] h-[680px] max-h-[85vh] animate-in slide-in-from-bottom-10 fade-in duration-500 shadow-[0_40px_100px_-20px_rgba(13,71,161,0.3)]">
          <ChatInterface 
            className="h-full border border-zinc-200 rounded-[32px] overflow-hidden shadow-2xl" 
            initialMessage="Scout Portal Minimized Active. Searching local trail reports and SageSuite directory... How can I assist?" 
          />
        </div>
      )}
      
      <div className="flex justify-end items-center gap-4">
        {!isOpen && (
          <div className="bg-zinc-950 text-white px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl border border-white/10 animate-in fade-in slide-in-from-right-4">
            Ask Scout Portal
          </div>
        )}
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group relative flex items-center justify-center w-16 h-16 rounded-2xl transition-all active:scale-90 border-2 shadow-2xl ${
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
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 border-2 border-white"></span>
              </span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;
