import React, { useState } from 'react';
import ChatInterface from './ChatInterface.tsx';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-[9999]">
      {isOpen && (
        <div className="mb-6 w-[360px] sm:w-[480px] h-[680px] max-h-[85vh] animate-in slide-in-from-bottom-10 fade-in duration-500 shadow-2xl">
          <ChatInterface 
            className="h-full border border-zinc-200 rounded-[32px] overflow-hidden bg-white" 
            initialMessage="Scout Portal Active. Looking for Arizona trail reports or wellness protocols?" 
          />
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-16 h-16 rounded-2xl transition-all active:scale-90 shadow-2xl ${
          isOpen ? 'bg-white text-blue-900 border border-zinc-200' : 'bg-blue-900 text-white'
        }`}
      >
        {isOpen ? '✕' : 'S'}
      </button>
    </div>
  );
};
export default ChatWidget;
