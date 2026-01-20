import { GoogleGenAI } from "@google/genai";
import { Message, Source } from "../types.ts";
import { SAGESUITE_URL, GHL_CNAME_TARGET } from "../constants.ts";

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
  private ai: GoogleGenAI | null = null;

  private getClient() {
    if (!this.ai) {
      this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return this.ai;
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
}

export const geminiService = new GeminiService();
