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
      // Safe retrieval of API key to handle environment variation
      const apiKey = (typeof process !== 'undefined' && process.env?.API_KEY) 
        ? process.env.API_KEY 
        : (window as any).process?.env?.API_KEY;
      
      this.ai = new GoogleGenAI({ apiKey: apiKey || '' });
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

  async generateTrailImage(trailName: string, description: string, difficulty: string): Promise<string> {
    try {
      const ai = this.getClient();
      const prompt = `Professional photography, national geographic style, ultra-high resolution. A breathtaking landscape vista of the ${trailName} in Arizona. The terrain is ${difficulty} with ${description}. Cinematic natural lighting, high desert vegetation, 8k resolution, Arizona wellness journal aesthetic. No people, just the trail and nature.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: {
          imageConfig: {
            aspectRatio: "16:9"
          }
        }
      });

      const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
      if (part?.inlineData?.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
      throw new Error("No image data returned from model.");
    } catch (error) {
      console.error("Image Generation Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
