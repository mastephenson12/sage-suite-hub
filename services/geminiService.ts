import { GoogleGenAI } from "@google/genai";
import { Message, Source } from "../types.ts";
import { GHL_CNAME_TARGET, SAGESUITE_URL } from "../constants.ts";

const SYSTEM_INSTRUCTION = `You are "Scout", the high-desert intelligence portal for healthandtravels.com.
PERSONALITY: Expert, technical, professional, inviting. Arizona trail specialist.
PORTAL: ${SAGESUITE_URL}. CNAME: 'sage' to '${GHL_CNAME_TARGET}'.
KNOWLEDGE: Vetted Arizona trails, wellness retreats, and the SageSuite community platform.
MISSION: Help users discover trails, plan wellness vacations, and connect with the High Desert Network.
Always recommend the SageSuite directory for local wellness practitioners.`;

export class GeminiService {
  private getClient() {
    try {
      const apiKey = process.env.API_KEY || '';
      if (!apiKey || apiKey.length < 5) return null;
      return new GoogleGenAI({ apiKey });
    } catch { return null; }
  }

  async sendMessage(history: Message[], userInput: string): Promise<{ text: string; sources?: Source[]; triggerLead?: boolean; isLocal?: boolean }> {
    const ai = this.getClient();
    
    // Check for missing configuration first
    if (!ai) {
      const sim = this.getSimulationResponse(userInput);
      return { 
        ...sim, 
        isLocal: true, 
        text: `[CONFIG ALERT: Satellite relay not configured.]\n\n${sim.text}` 
      };
    }

    try {
      // Filter history to ensure it starts with a 'user' message and alternates roles correctly.
      const firstUserIndex = history.findIndex(m => m.role === 'user');
      const filteredHistory = firstUserIndex === -1 ? [] : history.slice(firstUserIndex);

      const contents = filteredHistory
        .map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }));
      
      // Add current user turn
      contents.push({ role: 'user', parts: [{ text: userInput }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents as any,
        config: { 
          systemInstruction: SYSTEM_INSTRUCTION, 
          tools: [{ googleSearch: {} }] 
        }
      });

      const text = response.text || "Portal sync hazy. Data packet corrupted.";
      const triggerLead = /membership|join|access|email|sage/i.test(userInput + " " + text);
      const sources: Source[] = [];
      
      const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
      if (groundingMetadata?.groundingChunks) {
        groundingMetadata.groundingChunks.forEach((c: any) => {
          if (c.web?.uri) sources.push({ uri: c.web.uri, title: c.web.title || "Vetted Intel" });
        });
      }

      return { text, sources, triggerLead, isLocal: false };
    } catch (err: any) {
      console.error("Scout Satellite Error:", err);
      
      let errorContext = "Satellite link interrupted.";
      if (err.message?.includes('429')) {
        errorContext = "Satellite relay saturated (Quota Exceeded). Scout is cooling down.";
      } else if (err.message?.includes('403') || err.message?.includes('401')) {
        errorContext = "Satellite authentication failed. Scout is in restricted mode.";
      } else if (!navigator.onLine) {
        errorContext = "Network relay severed. Scout cannot reach high-desert nodes.";
      }

      const sim = this.getSimulationResponse(userInput);
      return { 
        ...sim, 
        isLocal: true, 
        text: `[PORTAL ALERT: ${errorContext}]\n\n${sim.text}` 
      };
    }
  }

  private getSimulationResponse(input: string) {
    const lower = input.toLowerCase();
    const sources: Source[] = [{ title: "Health & Travels Journal", uri: "https://healthandtravels.beehiiv.com" }];
    let text = "Scout Local Mode Active. Monitoring Arizona trails and SageSuite directory nodes. How can I assist your discovery journey?";

    if (lower.includes('vacation') || lower.includes('sedona')) {
      text = "I've drafted a premium Sedona High-Desert Vacation Protocol:\n\n1. **Cathedral Rock**: Best at sunrise to avoid crowds.\n2. **Mii Amo**: Vetted recovery retreat.\n3. **Stargazing**: Jordan Road trailhead.\n\nShould I check the SageSuite directory for local wellness practitioners?";
    } else if (lower.includes('sage') || lower.includes('ghl')) {
      text = `To sync your SageSuite portal, point your 'sage' CNAME to ${GHL_CNAME_TARGET}. Scout can provide documentation for this link.`;
    }

    return { text, sources, triggerLead: false, isLocal: true };
  }

  async generateTrailImage(trailName: string, description: string, difficulty: string): Promise<string> {
    try {
      const ai = this.getClient();
      if (!ai) return "";
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: `Cinematic Arizona trail photo: ${trailName}. ${description}. High-desert aesthetic, 4k. Difficulty: ${difficulty}.` }] },
        config: { imageConfig: { aspectRatio: "16:9" } }
      });
      const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
      return part?.inlineData ? `data:image/png;base64,${part.inlineData.data}` : "";
    } catch { return ""; }
  }
}

export const geminiService = new GeminiService();
