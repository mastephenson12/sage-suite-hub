type ChatMessage = {
  role: "user" | "model";
  parts: { text: string }[];
};

function normalizeHistory(history: ChatMessage[] = []): ChatMessage[] {
  return history
    .filter(
      (msg) =>
        msg &&
        (msg.role === "user" || msg.role === "model") &&
        Array.isArray(msg.parts) &&
        msg.parts.length > 0 &&
        typeof msg.parts[0]?.text === "string" &&
        msg.parts[0].text.trim().length > 0
    )
    .map((msg) => ({
      role: msg.role,
      parts: msg.parts.map((part) => ({
        text: String(part.text ?? "").trim(),
      })),
    }));
}

export const chatWithGemini = async (
  message: string,
  history: ChatMessage[] = []
): Promise<string> => {
  try {
    const cleanMessage = message.trim();

    if (!cleanMessage) {
      return "Please type a message so I can help plan your trip.";
    }

    const messages = [
      ...normalizeHistory(history).map((msg) => ({
        role: msg.role,
        content: msg.parts.map((part) => part.text).join("\n"),
      })),
      {
        role: "user" as const,
        content: cleanMessage,
      },
    ];

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    const data: { text?: string; error?: string } = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Request failed with status ${response.status}`);
    }

    return data.text || "I’m having trouble planning that right now. Please try again.";
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return (
      error?.message ||
      "I’m having trouble connecting right now. Please try again in a moment."
    );
  }
};

export const generateImage = async (_prompt: string): Promise<string | null> => {
  console.warn("generateImage is not wired to a secure server endpoint yet.");
  return null;
};
