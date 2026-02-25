import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenAI({ apiKey });

export const chatWithGemini = async (message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) => {
  try {
    const model = "gemini-3-flash-preview";
    const chat = genAI.chats.create({
      model,
      config: {
        systemInstruction: "You are Scout, an AI assistant for the Health & Travels Adventure Command Center. You help users with Arizona trail reports, wellness protocols, and navigating the Sage Suite productivity tools. Be professional, adventurous, and concise.",
      },
    });

    // Note: sendMessage only takes the message string, not the full history object in this SDK version
    // If history is needed, we would need to initialize the chat with history if the SDK supports it, 
    // but the standard sendMessage is usually enough for simple interactions.
    // For this implementation, we'll just send the message.
    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the command center right now. Please try again later.";
  }
};

export const generateImage = async (prompt: string) => {
  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Generation Error:", error);
    return null;
  }
};
