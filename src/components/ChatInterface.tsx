import React, { useEffect, useRef, useState } from 'react';

type Message = {
  role: 'user' | 'model';
  content: string;
};

interface ChatInterfaceProps {
  className?: string;
  initialMessage?: string;
}

const DEFAULT_INITIAL_MESSAGE = `Hi, I’m Sage. I help families and groups plan trips anywhere in the world, with extra expertise in Arizona.

Tell me where you want to go, your dates, how many adults and kids are traveling, and your budget.`;

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  className = '',
  initialMessage = DEFAULT_INITIAL_MESSAGE,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: initialMessage },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages([{ role: 'model', content: initialMessage }]);
  }, [initialMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    console.log('RENDER MESSAGES:', messages);
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: trimmed,
    };

    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const rawText = await response.text();
      console.log('RAW /api/chat response:', rawText);

      let data: { text?: string; error?: string } = {};

      try {
        data = rawText ? JSON.parse(rawText) : {};
      } catch {
        throw new Error(`Server returned non-JSON: ${rawText || '(empty response)'}`);
      }

      if (!response.ok) {
        throw new Error(data.error || `Request failed with status ${response.status}`);
      }

      const reply =
        data.text?.trim() ||
        'I received a response, but it did not include usable text.';

      const modelMessage: Message = {
        role: 'model',
        content: reply,
      };

      console.log('SETTING MODEL MESSAGE:', modelMessage);
      setMessages([...nextMessages, modelMessage]);
    } catch (error: any) {
      console.error('Chat error:', error);

      const errorMessage: Message = {
        role: 'model',
        content:
          error?.message ||
          'I’m having trouble connecting right now. Please try again in a moment.',
      };

      setMessages([...nextMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="mx-auto flex h-full min-h-[70vh] w-full flex-col rounded-2xl border border-zinc-300 bg-white">
        <div className="border-b border-zinc-200 px-4 py-4">
          <h2 className="text-xl font-bold text-black">Sage Trip Builder</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Ask Sage to help plan your next trip.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-zinc-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`rounded-xl px-4 py-3 text-sm leading-6 ${
                msg.role === 'user'
                  ? 'ml-auto max-w-[80%] bg-black text-white'
                  : 'mr-auto max-w-[80%] border border-zinc-300 bg-white text-black'
              }`}
            >
              <div className="mb-1 text-xs font-bold uppercase opacity-70">
                {msg.role === 'user' ? 'You' : 'Sage'}
              </div>
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          ))}

          {isLoading && (
            <div className="mr-auto max-w-[80%] rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-black">
              <div className="mb-1 text-xs font-bold uppercase opacity-70">Sage</div>
              <div>Thinking...</div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-zinc-200 px-4 py-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            placeholder="Type your trip question here..."
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-base text-black"
          />

          <button
            type="button"
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="mt-3 rounded-xl bg-black px-5 py-3 text-sm font-bold text-white disabled:opacity-50"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
