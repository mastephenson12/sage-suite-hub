import React from 'react';
import ChatInterface from './ChatInterface';

interface ChatWidgetProps {
  className?: string;
  initialMessage?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({
  className = '',
  initialMessage,
}) => {
  return (
    <div className={className}>
      <ChatInterface initialMessage={initialMessage} />
    </div>
  );
};

export default ChatWidget;
