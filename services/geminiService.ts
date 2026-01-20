import { GoogleGenAI } from "@google/genai";
import { Message, Source } from "../types.ts";
import { GHL_CNAME_TARGET } from "../constants.ts";

const SYSTEM_INSTRUCTION = `You are "Scout", the intelligent portal assistant for healthandtravels.com.

PERSONALITY:
- Professional, technically expert, inviting, and slightly adventurous.
- You speak with the authority of a seasoned Arizona trail guide and a web systems engineer.

CORE KNOWLEDGE:
1. ARIZONA TRAILS: Provide expert advice on hiking in Sedona, Phoenix, and the high desert. Mention specific trails like Flatiron or West Fork when relevant.
2. SAGESUITE: This is the technical backbone. The portal is at sage.healthandtravels.com.
3. TECHNICAL SETUP: To connect a domain: CNAME 'sage' to '${GHL_CNAME_TARGET}'. In GoHighLevel, always use 'Client Portal' for the hub.

BEHAVIOR:
- Use Google Search to find real-time trail conditions (heat advisories, closures).
- If a user asks about joining or membership, explain the benefits of the SageSuite community.
- Keep responses concise but information-dense.`;

export class GeminiService {
  private getClient() {
    // Robust key retrieval for browser/node environments
    const apiKey = (typeof process !== 'undefined' && process.env?.API_KEY) 
      ? process.env.API_KEY 
      : (window as any).process?.env?.API_KEY;
    
    return new GoogleGenAI({ apiKey: apiKey || '' });
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

      const text = response.text || "Portal connection hazy. Let's re-sync.";
      const triggerLead = /membership|join|access|subscribe|email/i.test(text);

      const sources: Source[] = [];
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        chunks.forEach((chunk: any) => {
          if (chunk.web?.uri) {
            sources.push({ uri: chunk.web.uri, title: chunk.web.title || "Reference" });
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
      const prompt = `Cinematic National Geographic style photograph of ${trailName} in Arizona. ${description}. Trail difficulty: ${difficulty}. Captured at golden hour, high desert atmosphere, ultra-high resolution.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: {
          imageConfig: {
            aspectRatio: "16:9"
          }
        }
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
      return "";
    } catch (error) {
      console.error("Image Gen Error:", error);
      return "";
    }
  }
}

export const geminiService = new GeminiService();
