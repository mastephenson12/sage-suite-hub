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
      <div className="mx-auto flex h-[78vh] min-h-[680px] w-full flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-lg">
        <div className="border-b border-zinc-200 bg-white px-5 py-4">
          <h2 className="text-xl font-bold text-zinc-900">Sage Trip Builder</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Ask Sage to help plan your next trip.
          </p>
        </div>

        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto bg-zinc-50 px-4 py-4"
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
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
                  <div className="mb-1 text-[11px] font-bold uppercase tracking-wide opacity-60">
                    {msg.role === 'user' ? 'You' : 'Sage'}
                  </div>
                  <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 shadow-sm">
                  <div className="mb-1 text-[11px] font-bold uppercase tracking-wide opacity-60">
                    Sage
                  </div>
                  <div>Thinking...</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-zinc-200 bg-white px-4 py-4">
          <div className="mx-auto max-w-3xl">
            <label
              htmlFor="sage-chat-input"
              className="mb-2 block text-sm font-semibold text-zinc-800"
            >
              Your message
            </label>

            <textarea
              id="sage-chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={5}
              placeholder="Example: Plan a Sedona trip in April for 2 adults and 2 kids with a moderate budget."
              className="block w-full resize-none rounded-2xl border-2 border-zinc-400 bg-white px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none"
            />

            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-zinc-500">
                Press Enter to send. Press Shift+Enter for a new line.
              </p>

              <button
                type="button"
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
