import { GoogleGenAI } from "@google/genai";

type ChatMessage = {
  role: "user" | "model";
  parts: { text: string }[];
};

const apiKey =
  process.env.GEMINI_API_KEY ||
  (import.meta as any).env?.VITE_GEMINI_API_KEY ||
  "";

const genAI = apiKey ? new GoogleGenAI({ apiKey }) : null;

const SYSTEM_INSTRUCTION = `
You are Sage, a family travel planning assistant for Health & Travels.

You help families and groups plan trips anywhere in the world, with especially strong expertise in Arizona.

You support four modes:
1. FlightSage - flights, routing ideas, airports
2. CampSage - campsites, RV parks, national parks, state parks
3. TravelSage - hotels, resorts, cabins, vacation rentals
4. ArizonaSage - Arizona trails, scenic drives, towns, seasons, and family-friendly planning

Your tone:
- warm
- clear
- practical
- family-friendly
- safety-aware
- encouraging

Critical rules:
- Keep first responses short and easy to read.
- If the user only gives a destination, ask 3 to 5 short planning questions.
- Do not give a full itinerary until you know travel dates, number of travelers, ages of children, and budget.
- Use bullet points instead of long paragraphs when helpful.
- Suggest 2 to 4 realistic options when the user is unsure.
- For Arizona trips, mention heat safety, hydration, parking, trail timing, and family suitability when relevant.
- Organize answers in short sections with clear next steps.
`;

const MODEL_NAME = "gemini-3-flash-preview";

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
    if (!genAI) {
      throw new Error("Missing Gemini API key.");
    }

    const cleanMessage = message.trim();
    if (!cleanMessage) {
      return "Please type a message so I can help plan your trip.";
    }

    const contents: ChatMessage[] = [
      ...normalizeHistory(history),
      {
        role: "user",
        parts: [{ text: cleanMessage }],
      },
    ];

    const response = await genAI.models.generateContent({
      model: MODEL_NAME,
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return (
      response.text ||
      "I’m having trouble planning that right now. Please try again."
    );
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I’m having trouble connecting right now. Please try again in a moment.";
  }
};

export const generateImage = async (prompt: string): Promise<string | null> => {
  try {
    if (!genAI) {
      throw new Error("Missing Gemini API key.");
    }

    const cleanPrompt = prompt.trim();
    if (!cleanPrompt) {
      return null;
    }

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: [
        {
          role: "user",
          parts: [{ text: cleanPrompt }],
        },
      ],
    });

    const parts = response.candidates?.[0]?.content?.parts || [];

    for (const part of parts) {
      if (part.inlineData?.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    return null;
  } catch (error) {
    console.error("Image Generation Error:", error);
    return null;
  }
};
