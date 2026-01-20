import { GoogleGenAI } from "@google/genai";
import { Message, Source } from "../types.ts";
import { GHL_CNAME_TARGET } from "../constants.ts";

const SYSTEM_INSTRUCTION = `You are the Arizona Trail & Wellness Expert for healthandtravels.com.

IDENTITY:
- You are "Scout", the portal assistant.
- You specialize in Arizona trail reports, high-desert wellness, and technical setup for member portals.

TECHNICAL PORTAL (SageSuite):
- The portal is at sage.healthandtravels.com.
- If users ask how to connect the subdomain:
  1. Login to domain registrar.
  2. Create CNAME: Name 'sage', Value '${GHL_CNAME_TARGET}'.
  3. In GoHighLevel, ALWAYS select 'Client Portal' when setting up the community hub.

MEMBER SERVICES:
- Direct users to sage.healthandtravels.com for the directory, community, and exclusive guides.

TONE:
- Professional, technically precise, yet inviting. Use Google Search to find real-time trail conditions or local wellness news.`;

export class GeminiService {
  private getClient() {
    // Safely access process.env.API_KEY
    const apiKey = (typeof process !== 'undefined' ? process.env.API_KEY : (window as any).process?.env?.API_KEY) || "";
    return new GoogleGenAI({ apiKey });
  }

  async sendMessage(history: Message[], userInput: string): Promise<{ text: string; sources?: Source[]; triggerLead?: boolean }> {
    try {
      const ai = this.getClient();
      const contents = history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      contents.push({
        role: 'user',
        parts: [{ text: userInput }]
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents as any,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
          tools: [{ googleSearch: {} }],
        }
      });

      const text = response.text || "Connection to the portal is a bit hazy. Let me try to re-sync.";
      const triggerLead = text.toLowerCase().includes("email") || 
                          text.toLowerCase().includes("subscribe") ||
                          text.toLowerCase().includes("membership");

      const sources: Source[] = [];
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        chunks.forEach((chunk: any) => {
          if (chunk.web?.uri && chunk.web?.title) {
            sources.push({ uri: chunk.web.uri, title: chunk.web.title });
          }
        });
      }

      return { text, sources, triggerLead };
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("Failed to communicate with Scout.");
    }
  }

  async generateTrailImage(trailName: string, description: string, difficulty: string): Promise<string> {
    try {
      const ai = this.getClient();
      const prompt = `A breathtaking, cinematic photograph of the ${trailName} trail in Arizona. Landscape vista showing the unique terrain, including ${description}. The lighting should be golden hour, capturing the high-desert essence. National Geographic style. Trail difficulty: ${difficulty}. High resolution, 4k.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: {
          imageConfig: {
            aspectRatio: "16:9"
          }
        }
      });

      // Find the image part in the response
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
      throw new Error("No image data generated.");
    } catch (error) {
      console.error("Image Generation Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
