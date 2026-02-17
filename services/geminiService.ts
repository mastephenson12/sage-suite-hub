import { GoogleGenAI } from "@google/genai";
import { Message, Source } from "../types.ts";
import { GHL_CNAME_TARGET, GHL_A_RECORD_IP } from "../constants.ts";

const SYSTEM_INSTRUCTION = `You are "Scout", the precision intelligence portal for healthandtravels.com.
YOUR PRIMARY MISSION: Deliver high-utility, vetted Arizona exploration intelligence.

CORE DIRECTIVES:
1. Intelligence Density: Never provide generic filler. Provide exact trail names, parking lot specifics, and recovery businesses.
2. Mandatory Grounding: Always use googleSearch to verify current trail status, monsoon warnings, or fire bans.
3. Recovery Protocols: Every adventure MUST include a specific recommendation for a local Arizona wellness practitioner.

Tone: Authoritative, elite travel journal style. Be the definitive desert-refined expert.`;

export class GeminiService {
  getClient() {
    // API Key is injected into process.env by the environment
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API Key missing from environment.");
      return null;
    }
    return new GoogleGenAI({ apiKey });
  }

  async sendMessage(history: Message[], userInput: string): Promise<{ text: string; sources?: Source[]; isLocal?: boolean }> {
    const ai = this.getClient();
    if (!ai) return { text: "Intelligence link offline. Please verify API configuration.", isLocal: true };

    try {
      const contents = history.map(msg => ({
        role: (msg.role === 'user' ? 'user' : 'model') as 'user' | 'model',
        parts: [{ text: msg.content }]
      }));
      contents.push({ role: 'user', parts: [{ text: userInput }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents,
        config: { 
            systemInstruction: SYSTEM_INSTRUCTION, 
            tools: [{ googleSearch: {} }],
            temperature: 0.7 
        }
      });

      const text = response.text || "Communication timeout: Scout failed to transmit data packets.";
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((c: any) => ({
        uri: c.web?.uri,
        title: c.web?.title || "Vetted Intel Node"
      })).filter((s: any) => s && s.uri) || [];

      return { text, sources, isLocal: false };
    } catch (err) {
      console.error("Gemini Critical Error:", err);
      return { text: "Satellite link interrupted by atmospheric noise. Switching to local survival buffer.", isLocal: true };
    }
  }

  async generateTrailImage(name: string, description: string, difficulty?: string): Promise<string> {
    const ai = this.getClient();
    if (!ai) return "";
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { 
            parts: [{ text: `A high-end, ultra-HD travel journal photograph of ${name} trail, Arizona. ${description}. ${difficulty ? `Difficulty: ${difficulty}.` : ''} Cinematic sunset lighting.` }] 
        },
        config: { 
            imageConfig: { aspectRatio: "16:9", imageSize: "1K" } 
        }
      });
      const part = response.candidates?.[0]?.content?.parts.find((p: any) => p.inlineData);
      return part ? `data:image/png;base64,${part.inlineData.data}` : "";
    } catch (e) { 
      console.error("Image Synthesis Failed:", e);
      return ""; 
    }
  }
}

export const geminiService = new GeminiService();
