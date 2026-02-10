import { GoogleGenAI } from "@google/genai";
import { Message, Source } from "../types.ts";
import { GHL_CNAME_TARGET, GHL_A_RECORD_IP } from "../constants.ts";

const SYSTEM_INSTRUCTION = `You are "Scout", the precision intelligence portal for healthandtravels.com.
YOUR PRIMARY MISSION: Provide high-utility, vetted intelligence. Never be generic.

Intelligence Protocols:
1. Arizona Trail Expert: 
   - GROUNDING MANDATORY: Always use googleSearch to verify current trail status, fire bans, or water levels.
   - Precision Parking: Give specific lot names (e.g., "Soldier Pass Trailhead") and mention if a Red Rock Pass is required.
   - Hydration Metrics: Provide exact water volume recommendations based on temperature and distance (e.g., "Carry 4L of water for this loop in current 95° conditions").
   - Safety Nodes: Mention rattlesnake activity periods or flash flood warnings for canyon hikes.

2. Wellness & Recovery:
   - Specificity: Recommend specific local Arizona recovery centers (e.g., "Post-hike, visit Sedona Salt Room for electrolyte recovery").
   - Categorization: Match the recovery technique to the specific physical toll of the hike.

3. Technical Support:
   - Domain Setup: Instruct users to point CNAME to ${GHL_CNAME_TARGET} or A Record to ${GHL_A_RECORD_IP}.
   - GHL Sync: Provide clear steps for GoHighLevel Community integration.

Tone: Authoritative, elite journal style, desert-refined. Be the partner the traveler relies on.`;

export class GeminiService {
  getClient() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
  }

  async sendMessage(history: Message[], userInput: string): Promise<{ text: string; sources?: Source[]; triggerLead?: boolean; isLocal?: boolean }> {
    const ai = this.getClient();
    if (!ai) return { text: "Link established but API Key missing. Please check your AI Studio environment.", isLocal: true };

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

      const text = response.text || "Connection active, but no text packets received from Scout.";
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((c: any) => ({
        uri: c.web?.uri,
        title: c.web?.title || "Vetted Intelligence Node"
      })).filter((s: any) => s && s.uri) || [];

      return { text, sources, isLocal: false };
    } catch (err) {
      console.error("Sage Intel System Fault:", err);
      return { text: "Atmospheric interference detected. Switching to emergency local cache.", isLocal: true };
    }
  }

  async generateTrailImage(name: string, description: string, difficulty: string): Promise<string> {
    const ai = this.getClient();
    if (!ai) return "";
    try {
      const prompt = `A cinematic, ultra-high-resolution photograph of the ${name} trail in Arizona. ${description}. Trail Difficulty: ${difficulty}. High-desert aesthetic, professional travel photography lighting.`;
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
