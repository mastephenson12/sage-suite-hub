return (
  <div className={`w-full ${className}`}>
    <div className="mx-auto grid h-[78vh] min-h-[680px] w-full grid-cols-1 md:grid-cols-3 gap-4">

      {/* LEFT: CHAT */}
      <div className="col-span-2 flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-lg">
        
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
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                    msg.role === 'user'
                      ? 'bg-zinc-900 text-white'
                      : 'border bg-white text-zinc-900'
                  }`}
                >
                  <div className="mb-1 text-xs font-bold opacity-60">
                    {msg.role === 'user' ? 'You' : 'Sage'}
                  </div>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="text-sm text-zinc-500">Sage is thinking...</div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT: INPUT PANEL */}
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
            className="w-full rounded-xl border-2 border-zinc-300 px-4 py-3 text-base"
            placeholder="Type your trip request..."
          />

          <p className="text-xs text-zinc-500">
            Press Enter to send. Shift+Enter for a new line.
          </p>

          <button
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
