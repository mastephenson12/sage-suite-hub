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
  console.log('chat route hit', { method: req.method });

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    console.log('has api key?', Boolean(apiKey));

    if (!apiKey) {
      return res.status(500).json({ error: 'Missing GEMINI_API_KEY on server' });
    }

    const { messages } = req.body as { messages?: Message[] };
    console.log('messages received?', Array.isArray(messages), messages?.length);

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages are required' });
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

Keep first responses under 120 words.
If the user only gives a destination, ask 3 to 5 short planning questions.
Do not give a full itinerary until you know travel dates, number of travelers, ages of children, and budget.
Use bullet points instead of long paragraphs.
Organize answers in short sections with clear next steps.`,
      },
    });

    const text =
      response.text?.trim() ||
      'I need a little more information to help. Tell me your destination, dates, number of travelers, kids’ ages, and budget.';

    console.log('response length', text.length);

    return res.status(200).json({ text });
  } catch (error) {
    console.error('API chat error:', error);
    return res.status(500).json({ error: 'Failed to generate response' });
  }
}
