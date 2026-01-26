
import { GoogleGenAI } from "@google/genai";
import { Message, Source } from "../types.ts";
import { GHL_CNAME_TARGET, SAGESUITE_URL } from "../constants.ts";

const SYSTEM_INSTRUCTION = `You are "Scout", the high-desert intelligence portal for healthandtravels.com.
PERSONALITY: Expert, technical, professional, inviting. Arizona trail specialist.
PORTAL: ${SAGESUITE_URL}. CNAME: 'sage' to '${GHL_CNAME_TARGET}'.`;

export class GeminiService {
  private getClient() {
    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey || apiKey.length < 10) return null;
      return new GoogleGenAI({ apiKey });
    } catch { return null; }
  }

  async sendMessage(history: Message[], userInput: string): Promise<{ text: string; sources?: Source[]; triggerLead?: boolean; isLocal?: boolean }> {
    try {
      const ai = this.getClient();
      if (!ai) return { ...this.getSimulationResponse(userInput), isLocal: true };

      // Ensure the history passed to Gemini starts with a 'user' turn.
      const firstUserIndex = history.findIndex(m => m.role === 'user');
      const filteredHistory = firstUserIndex === -1 ? [] : history.slice(firstUserIndex);

      const contents = filteredHistory
        .map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }));
      
      // Add the current user turn.
      contents.push({ role: 'user', parts: [{ text: userInput }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents as any,
        config: { systemInstruction: SYSTEM_INSTRUCTION, tools: [{ googleSearch: {} }] }
      });

      const text = response.text || "Portal sync hazy. Recalibrating.";
      const triggerLead = /membership|join|access|email/i.test(userInput + " " + text);
      const sources: Source[] = [];
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        chunks.forEach((c: any) => {
          if (c.web?.uri) sources.push({ uri: c.web.uri, title: c.web.title || "Vetted Intel" });
        });
      }
      return { text, sources, triggerLead, isLocal: false };
    } catch (err) {
      console.error("Gemini Error:", err);
      return { ...this.getSimulationResponse(userInput), isLocal: true };
    }
  }

  private getSimulationResponse(input: string) {
    const lower = input.toLowerCase();
    const sources: Source[] = [{ title: "Health & Travels", uri: "https://healthandtravels.com" }];
    let text = "Scout Local Mode Active. Monitoring Arizona trails and SageSuite directory nodes. How can I assist your journey?";

    if (lower.includes('vacation')) {
      text = "I've drafted a premium Sedona High-Desert Vacation Protocol:\n1. Sunrise at Cathedral Rock\n2. Recovery at a Sage retreat\n3. Evening Stargazing.";
    } else if (lower.includes('sage')) {
      text = `To sync your SageSuite portal, point your 'sage' CNAME to ${GHL_CNAME_TARGET}.`;
    }

    return { text, sources, triggerLead: false, isLocal: true };
  }

  async generateTrailImage(trailName: string, description: string, difficulty: string): Promise<string> {
    try {
      const ai = this.getClient();
      if (!ai) return "";
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: `Cinematic Arizona trail photo: ${trailName}. ${description}. Difficulty: ${difficulty}.` }] },
        config: { imageConfig: { aspectRatio: "16:9" } }
      });
      const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
      return part?.inlineData ? `data:image/png;base64,${part.inlineData.data}` : "";
    } catch { return ""; }
  }
}

export const geminiService = new GeminiService();
