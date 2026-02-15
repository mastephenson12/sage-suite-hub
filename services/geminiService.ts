import { GoogleGenAI } from "@google/genai";
import { Message, Source } from "../types.ts";
import { GHL_CNAME_TARGET, GHL_A_RECORD_IP } from "../constants.ts";

const SYSTEM_INSTRUCTION = `You are "Scout", the precision intelligence portal for healthandtravels.com.
YOUR PRIMARY MISSION: Deliver high-utility, vetted Arizona exploration intelligence.

CORE DIRECTIVES:
1. Intelligence Density: Never provide generic filler. If a user asks for an itinerary, provide exact trail names, parking lot specifics, and recovery businesses.
2. Group-Specific Logic:
   - Families: Prioritize trails with high safety, shade, and interactive features (water/rocks). Suggest child-friendly recovery (ice cream/gentle salt rooms).
   - Groups: Prioritize scenic intensity, "hero shot" photography nodes, and proximity to high-end dining/recovery centers.
3. Mandatory Grounding: Always use googleSearch to verify current trail status, monsoon warnings, or fire bans.
4. Recovery Protocols: Every adventure MUST include a specific recommendation for a local Arizona wellness practitioner (Massage, Sauna, Stretching, etc.).

Tone: Authoritative, elite travel journal style. Be the definitive desert-refined expert.`;

export class GeminiService {
  getClient() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
  }

  async sendMessage(history: Message[], userInput: string): Promise<{ text: string; sources?: Source[]; isLocal?: boolean }> {
    const ai = this.getClient();
    if (!ai) return { text: "AI Node Offline. Please check Satellite Link (API Key).", isLocal: true };

    try {
      const contents = history.map(msg => ({
        role: (msg.role === 'user' ? 'user' : 'model') as 'user' | 'model',
        parts: [{ text: msg.content }]
      }));
      contents.push({ role: 'user', parts: [{ text: userInput }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents,
        config: { systemInstruction: SYSTEM_INSTRUCTION, tools: [{ googleSearch: {} }] }
      });

      const text = response.text || "No data packets received from Scout.";
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((c: any) => ({
        uri: c.web?.uri,
        title: c.web?.title || "Vetted Data Node"
      })).filter((s: any) => s && s.uri) || [];

      return { text, sources, isLocal: false };
    } catch (err) {
      console.error(err);
      return { text: "Satellite link interrupted. Check connection status.", isLocal: true };
    }
  }

  async generateTrailImage(name: string, description: string, difficulty?: string): Promise<string> {
    const ai = this.getClient();
    if (!ai) return "";
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts: [{ text: `A professional, ultra-high-resolution travel photograph of ${name} trail in Arizona. ${description}. ${difficulty ? `Difficulty: ${difficulty}. ` : ''}Cinematic desert lighting.` }] },
        config: { imageConfig: { aspectRatio: "16:9", imageSize: "1K" } }
      });
      const part = response.candidates?.[0]?.content?.parts.find((p: any) => p.inlineData);
      return part ? `data:image/png;base64,${part.inlineData.data}` : "";
    } catch { return ""; }
  }
}

export const geminiService = new GeminiService();
