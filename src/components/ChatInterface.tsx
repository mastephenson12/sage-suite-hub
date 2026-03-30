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

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages([{ role: 'model', content: initialMessage }]);
  }, [initialMessage]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [messages, isLoading]);

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

      setMessages([...nextMessages, modelMessage]);
    } catch (error: any) {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="mx-auto grid h-[78vh] min-h-[680px] w-full grid-cols-1 gap-4 md:grid-cols-3">
        <div className="col-span-1 flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-lg md:col-span-2">
          <div className="border-b border-zinc-200 px-5 py-4">
            <h2 className="text-xl font-bold text-zinc-900">Sage Trip Builder</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Ask Sage to help plan your next trip.
            </p>
          </div>

          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto bg-zinc-50 px-4 py-4"
          >
            <div className="mx-auto flex max-w-2xl flex-col gap-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-zinc-900 text-white'
                        : 'border border-zinc-200 bg-white text-zinc-900'
                    }`}
                  >
                    <div className="mb-1 text-xs font-bold opacity-60">
                      {msg.role === 'user' ? 'You' : 'Sage'}
                    </div>
                    <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 shadow-sm">
                    <div className="mb-1 text-xs font-bold opacity-60">Sage</div>
                    <div>Thinking...</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-1 flex flex-col justify-between rounded-3xl border border-zinc-200 bg-white p-4 shadow-lg">
          <div>
            <h3 className="text-lg font-bold text-zinc-900">Your message</h3>
            <p className="mt-1 text-sm text-zinc-500">
              Example: Plan a Sedona trip in April for 2 adults and 2 kids with a moderate budget.
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={6}
              placeholder="Type your trip request..."
              className="w-full rounded-xl border-2 border-zinc-300 px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none"
            />

            <p className="text-xs text-zinc-500">
              Press Enter to send. Shift+Enter for a new line.
            </p>

            <button
              type="button"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="rounded-xl bg-black px-5 py-3 font-bold text-white disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
