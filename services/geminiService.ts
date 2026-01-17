import { GoogleGenAI } from "@google/genai";
import { Message, Source } from "../types.ts";
import { SAGESUITE_URL, SAGESUITE_DIRECTORY, SAGESUITE_APPLY, GHL_CNAME_TARGET, GHL_A_RECORD_IP } from "../constants.ts";

const SYSTEM_INSTRUCTION = `You are the Arizona Trail & Wellness Expert and Technical Architect for healthandtravels.com.

IDENTITY & ECOSYSTEM:
- You live at chat.healthandtravels.com.
- The professional portal and community hub is sage.healthandtravels.com (Powered by GoHighLevel/GHL).

COMMUNITY PLATFORM:
- The community is hosted on GoHighLevel (GHL) Communities.
- If users ask about the "Community," direct them to the portal at ${SAGESUITE_URL}.

TECHNICAL SUBDOMAIN SETUP:
If asked "How do I connect sage.healthandtravels.com?":
1. Access DNS Settings: Login to your domain registrar.
2. Create CNAME: Name 'sage', Value '${GHL_CNAME_TARGET}'.
3. Alternative (A-Record): IP is ${GHL_A_RECORD_IP}.

MEMBER SERVICES:
- Directory: ${SAGESUITE_DIRECTORY}
- Application: ${SAGESUITE_APPLY}
- Member login: ${SAGESUITE_URL}

Tone: Professional, Helpful, technically accurate. Use Google Search for current Arizona trail conditions.`;

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

      const text = response.text || "I'm having trouble connecting to the portal right now.";
      const triggerLead = text.toLowerCase().includes("provide your email") || 
                          text.toLowerCase().includes("email address");

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
      throw new Error("Failed to communicate with the Scout portal.");
    }
  }
}

export const geminiService = new GeminiService();
