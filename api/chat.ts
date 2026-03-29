import { GoogleGenAI } from "@google/genai";

type Message = {
  role: "user" | "model";
  content: string;
};

function isValidMessageArray(value: unknown): value is Message[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(
      (msg) =>
        msg &&
        typeof msg === "object" &&
        (msg.role === "user" || msg.role === "model") &&
        typeof msg.content === "string" &&
        msg.content.trim().length > 0
    )
  );
}

export async function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "Missing GEMINI_API_KEY on server" },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => null);
    const messages = body?.messages;

    if (!isValidMessageArray(messages)) {
      return Response.json(
        {
          error: "Messages are required and must be a valid non-empty array.",
        },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const conversation = messages
      .map((msg) => `${msg.role === "user" ? "User" : "Sage"}: ${msg.content}`)
      .join("\n\n");

    const prompt = `You are Sage, a family travel planning assistant for Health & Travels.

You help users plan trips anywhere in the world, with especially strong expertise in Arizona.

Your tone:
- warm
- clear
- practical
- family-friendly
- safety-aware
- encouraging

Critical rules:
- Keep first responses under 120 words.
- If the user only gives a destination, ask 3 to 5 short planning questions.
- Do not give a full itinerary until you know travel dates, number of travelers, ages of children, and budget.
- Use bullet points instead of long paragraphs when helpful.
- Suggest 2 to 4 realistic options when the user is unsure.
- For Arizona trips, mention heat safety, hydration, parking, trail timing, and family suitability when relevant.
- Organize answers in short sections with clear next steps.

Conversation so far:
${conversation}

Respond as Sage to the latest user message only.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const text =
      response.text?.trim() ||
      "I need a little more information to help. Tell me your destination, dates, number of travelers, kids’ ages, and budget.";

    return Response.json({ text }, { status: 200 });
  } catch (error: any) {
    console.error("API chat error:", error);

    const message =
      typeof error?.message === "string" && error.message.trim().length > 0
        ? error.message
        : "Failed to generate response";

    return Response.json({ error: message }, { status: 500 });
  }
}
