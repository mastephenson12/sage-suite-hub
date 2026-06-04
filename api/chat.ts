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

    const siteLinks = {
      scoutPortal: "https://sage.healthandtravels.com/chat",
      archive: "https://sage.healthandtravels.com/archive",
      trails: "https://sage.healthandtravels.com/trail-guides",
      arizona: "https://sage.healthandtravels.com/arizona",
      tripBuilder: "https://sage.healthandtravels.com/trip-builder",
      community: "https://sage.healthandtravels.com/community",
    };

    const affiliateLinks = {
      stays: process.env.AGODA_AFFILIATE_URL || "https://www.agoda.com/",
      tours: process.env.GETYOURGUIDE_AFFILIATE_URL || "https://www.getyourguide.com/",
      hikes:
        process.env.ALLTRAILS_AFFILIATE_URL || "https://www.alltrails.com/",
      gear: process.env.REI_AFFILIATE_URL || "https://www.rei.com/",
    };

    const internalResources = [
      {
        topic: "sedona",
        label: "Archive",
        title: "Browse Health & Travels destination guides",
        url: siteLinks.archive,
      },
      {
        topic: "flagstaff",
        label: "Archive",
        title: "Browse Health & Travels destination guides",
        url: siteLinks.archive,
      },
      {
        topic: "grand canyon",
        label: "Archive",
        title: "Browse Health & Travels destination guides",
        url: siteLinks.archive,
      },
      {
        topic: "arizona",
        label: "Arizona",
        title: "Explore Arizona trip ideas",
        url: siteLinks.arizona,
      },
      {
        topic: "hike",
        label: "Trail Guides",
        title: "Explore Arizona trail guides",
        url: siteLinks.trails,
      },
      {
        topic: "trail",
        label: "Trail Guides",
        title: "Explore Arizona trail guides",
        url: siteLinks.trails,
      },
      {
        topic: "camping",
        label: "Trail Guides",
        title: "Explore Arizona trail guides",
        url: siteLinks.trails,
      },
      {
        topic: "road trip",
        label: "Trip Builder",
        title: "Build a custom Arizona trip plan",
        url: siteLinks.tripBuilder,
      },
      {
        topic: "community",
        label: "Community",
        title: "Join the Arizona adventure community",
        url: siteLinks.community,
      },
    ];

    const conversation = messages
      .map((msg) => `${msg.role === "user" ? "User" : "Scout"}: ${msg.content}`)
      .join("\n\n");

    const latestUserMessage =
      [...messages].reverse().find((msg) => msg.role === "user")?.content || "";

    const lowerContext = `${conversation}\n\n${latestUserMessage}`.toLowerCase();

    const matchedInternalResources = internalResources.filter((item) =>
      lowerContext.includes(item.topic)
    );

    const internalLinksText =
      matchedInternalResources.length > 0
        ? matchedInternalResources
            .slice(0, 4)
            .map((item) => `- ${item.label}: ${item.title} — ${item.url}`)
            .join("\n")
        : `- Trip Builder: Build a custom Arizona trip plan — ${siteLinks.tripBuilder}
- Archive: Browse destination guides — ${siteLinks.archive}
- Trail Guides: Explore Arizona trail guides — ${siteLinks.trails}
- Arizona: Explore Arizona trip ideas — ${siteLinks.arizona}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Conversation so far:

${conversation}

User email on file: ${email || "not provided"}

Internal Health & Travels destinations and resources:
${internalLinksText}

Main Scout portal:
${siteLinks.scoutPortal}

Use affiliate links only when genuinely relevant:
- Stays: ${affiliateLinks.stays}
- Tours and experiences: ${affiliateLinks.tours}
- Trails and hike discovery: ${affiliateLinks.hikes}
- Gear and essentials: ${affiliateLinks.gear}

Respond as Scout to the latest user message only.`,
      config: {
        systemInstruction: `You are Scout, a family travel planning assistant for Health & Travels.

Your role:
- You are the GUIDE layer, not the hard-sell layer.
- Help users plan trips anywhere in the world, with especially strong expertise in Arizona.
- Personalize trips, explain options, and guide users toward the best next step.
- When useful, point users toward Health & Travels internal pages like Archive, Trail Guides, Arizona, Trip Builder, or the Scout Portal.

Your tone:
- warm
- clear
- practical
- family-friendly
- safety-aware
- encouraging

Core rules:
- Keep first responses under 160 words unless the user asks for more detail.
- If the user only gives a destination or vague idea, ask 3 to 5 short planning questions.
- Do not give a full itinerary until you know travel dates, number of travelers, ages of children, and budget.
- Use bullets and short sections when helpful.
- Suggest 2 to 4 realistic options when the user is unsure.
- For Arizona trips, mention heat safety, hydration, parking, trail timing, and family suitability when relevant.
- Organize answers with useful headings when needed.

Important business behavior:
- Prefer linking users to INTERNAL Health & Travels pages over Beehiiv article URLs.
- Do not push Beehiiv post URLs as the main call to action.
- When relevant, end with a short section called "Helpful next steps" and include 1 to 3 internal Health & Travels links.
- Use internal links naturally, not in every response.
- Treat Archive, Trail Guides, Trip Builder, and Arizona as places where users can continue planning and find actionable resources.
- Scout should feel helpful first, commercial second.

Affiliate behavior:
- Affiliate links are optional and should be used sparingly.
- Only include an affiliate link if the user is clearly asking for booking help, places to stay, tours, things to do, hike tools, or gear.
- When including affiliate links, place them in a short section like "Helpful booking links" or "Helpful gear links."
- Do not overload the answer with links.
- Do not mention that links are affiliate links unless explicitly asked.

Formatting rules:
- If internal Health & Travels links are relevant, add:
  Helpful next steps
  - [short title]&#58; full URL

- If affiliate links are relevant, add:
  Helpful booking links
  - [short title]&#58; full URL

- If neither is useful, do not force a links section.

Your goal:
- Help the user make progress
- Keep answers practical
- Move people naturally from question → plan → internal site resources → optional booking help`,
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
