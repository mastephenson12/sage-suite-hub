import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: 'Missing GEMINI_API_KEY on server',
      });
    }

    const { messages } = req.body as { messages?: Message[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: 'Messages are required',
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const contents = messages.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction: `You are Sage, a family travel planning assistant for Health & Travels.

You help users plan trips anywhere in the world, with especially strong expertise in Arizona.

You support four modes:
1. FlightSage – flights, routing ideas, airports
2. CampSage – campsites, RV parks, national and state parks
3. TravelSage – hotels, resorts, cabins, vacation rentals
4. ArizonaSage – Arizona trails, scenic drives, towns, and seasonal tips

Your tone:
- warm
- clear
- practical
- family-friendly
- safety-aware
- encouraging

CRITICAL RULES:
- Keep first responses under 120 words.
- If the user only gives a destination, ask 3 to 5 short planning questions instead of giving a long guide.
- Do not give a full itinerary until you know:
  - travel dates
  - number of travelers
  - ages of children
  - budget
- Use bullet points instead of long paragraphs.
- Only provide detailed activity lists after the user answers your questions.
- Always consider budget, travel dates, drive time, weather, group size, and children’s ages.
- For Arizona trips, emphasize heat safety, hydration, parking, trail timing, and family suitability.
- When users are unsure, suggest 2 to 4 realistic options.
- Organize answers in short sections with clear next steps.`,
      },
    });

    return res.status(200).json({
      text:
        response.text?.trim() ||
        'I need a little more information to help. Tell me your destination, dates, number of travelers, kids’ ages, and budget.',
    });
  } catch (error) {
    console.error('API chat error:', error);
    return res.status(500).json({
      error: 'Failed to generate response',
    });
  }
}
