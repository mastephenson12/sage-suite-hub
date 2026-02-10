import { GoogleGenAI } from "@google/genai";
import { Message, Source } from "../types.ts";
import { GHL_CNAME_TARGET, GHL_A_RECORD_IP, SAGESUITE_URL } from "../constants.ts";

const SYSTEM_INSTRUCTION = `You are "Scout", the premium intelligence portal for healthandtravels.com.
YOUR PRIMARY GOAL: Provide useful, actionable information. 

Intel categories:
1. Arizona Trail Specialist: Provide parking tips, hydration requirements, and seasonal warnings for AZ trails (Sedona, Phoenix, Flagstaff).
2. Wellness Recovery: Suggest specific local protocols like salt rooms, red light therapy, or sports massage nearby.
3. SageSuite Technical: Guide users on subdomain setup using CNAME ${GHL_CNAME_TARGET} and A Record ${GHL_A_RECORD_IP}.

Tone: Professional, high-desert aesthetic, efficient, and authoritative. 
Grounding: ALWAYS use googleSearch to verify current trail conditions, weather alerts, or business hours before recommending.`;

export class GeminiService {
  getClient() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
  }

  async sendMessage(history: Message[], userInput: string): Promise<{ text: string; sources?: Source[]; triggerLead?: boolean; isLocal?: boolean }> {
    const ai = this.getClient();
    if (!ai) return { text: "Local buffer mode active. Please ensure an API key is present.", isLocal: true };

    try {
      const contents = history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));
      contents.push({ role: 'user', parts: [{ text: userInput }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents,
        config: { 
          systemInstruction: SYSTEM_INSTRUCTION, 
          tools: [{ googleSearch: {} }] 
        }
      });

      const text = response.text || "Connection hazy. Satellite link returned an empty signal.";
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((c: any) => ({
        uri: c.web?.uri,
        title: c.web?.title || "Vetted Source"
      })).filter((s: any) => s && s.uri) || [];

      return { text, sources, isLocal: false };
    } catch (err) {
      console.error("Gemini Service Fault:", err);
      return { text: "Satellite link interrupted. Switching to local emergency frequency.", isLocal: true };
    }
  }

  async generateTrailImage(name: string, description: string, difficulty: string): Promise<string> {
    const ai = this.getClient();
    if (!ai) return "";
    try {
      const prompt = `A cinematic, high-res photo of the ${name} trail in Arizona. ${description}. Difficulty: ${difficulty}. 4k, realistic terrain, golden hour lighting.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio: "16:9" } }
      });
      
      const part = response.candidates?.[0]?.content?.parts.find((p: any) => p.inlineData);
      return part ? `data:image/png;base64,${part.inlineData.data}` : "";
    } catch { 
      return ""; 
    }
  }
}

export const geminiService = new GeminiService();
