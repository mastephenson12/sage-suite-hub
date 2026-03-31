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
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    if (!isValidMessageArray(messages)) {
      return Response.json(
        { error: "Messages are required and must be a valid non-empty array." },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const affiliateLinks = {
      agoda: process.env.AGODA_AFFILIATE_URL || "https://www.agoda.com/",
      alltrails:
        process.env.ALLTRAILS_AFFILIATE_URL || "https://www.alltrails.com/",
      viator: process.env.VIATOR_AFFILIATE_URL || "https://www.viator.com/",
      rei: process.env.REI_AFFILIATE_URL || "https://www.rei.com/",
    };

    // Replace these with your real live article URLs as needed.
    const helpfulReads = [
      {
        topic: "sedona",
        title: "Sedona Family Adventure Guide",
        url: "https://healthandtravels.com/p/sedona-in-april",
      },
      {
        topic: "grand canyon",
        title: "Grand Canyon Family Travel Ideas",
        url: "https://healthandtravels.com/",
      },
      {
        topic: "williams",
        title: "Williams, Arizona Family Getaway Guide",
        url: "https://healthandtravels.com/p/williams-az",
      },
      {
        topic: "tombstone",
        title: "Tombstone, Arizona Adventure Guide",
        url: "https://healthandtravels.com/",
      },
      {
        topic: "ajo",
        title: "Ajo Outdoor Adventure Guide",
        url: "https://healthandtravels.com/p/discover-ajo-arizona-and-organ-pipe",
      },
      {
        topic: "arizona",
        title: "Arizona Family Trip Ideas",
        url: "https://healthandtravels.com/",
      },
      {
        topic: "hiking",
        title: "Arizona Hiking and Outdoor Ideas",
        url: "https://healthandtravels.com/",
      },
    ];

    const conversation = messages
      .map((msg) => `${msg.role === "user" ? "User" : "Scout"}: ${msg.content}`)
      .join("\n\n");

    const latestUserMessage =
      [...messages].reverse().find((msg) => msg.role === "user")?.content || "";

    const lowerContext = `${conversation}\n\n${latestUserMessage}`.toLowerCase();

    const matchedReads = helpfulReads.filter((item) =>
      lowerContext.includes(item.topic)
    );

    const readsText =
      matchedReads.length > 0
        ? matchedReads
            .map((item) => `- ${item.title}: ${item.url}`)
            .join("\n")
        : "- Arizona Family Trip Ideas: https://healthandtravels.com/";

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Conversation so far:

${conversation}

User email on file: ${email || "not provided"}

Relevant Health & Travels article links you may include when useful:
${readsText}

Respond as Scout to the latest user message only.`,
      config: {
        systemInstruction: `You are Scout, a family travel planning assistant for Health & Travels.

You help users plan trips anywhere in the world, with especially strong expertise in Arizona.

Your tone:
- warm
- clear
- practical
- family-friendly
- safety-aware
- encouraging

Critical rules:
- Keep first responses under 160 words unless the user asks for more detail.
- If the user only gives a destination, ask 3 to 5 short planning questions.
- Do not give a full itinerary until you know travel dates, number of travelers, ages of children, and budget.
- Use bullet points when helpful.
- Suggest 2 to 4 realistic options when the user is unsure.
- For Arizona trips, mention heat safety, hydration, parking, trail timing, and family suitability when relevant.
- Organize answers in short sections with clear next steps.
- When relevant, you may include helpful booking or activity links using full raw URLs.
- Only include affiliate links if they are truly relevant to the answer.
- Do not mention that links are affiliate links unless explicitly asked.
- If one of the Health & Travels article links is relevant, add a short section at the end called: Helpful reads from Health & Travels
- In that section, include 1 to 3 relevant article links, not more.
- Do not force article links into every response. Only include them when genuinely relevant.

Use these links when relevant:
- Hotels / stays: ${affiliateLinks.agoda}
- Trails / hike discovery: ${affiliateLinks.alltrails}
- Tours / activities: ${affiliateLinks.viator}
- Gear / travel essentials: ${affiliateLinks.rei}`,
      },
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
