import { GoogleGenAI } from "@google/genai";
import { Message, Source } from "../types.ts";
import { SAGESUITE_URL, SAGESUITE_DIRECTORY, SAGESUITE_APPLY, GHL_CNAME_TARGET, GHL_A_RECORD_IP } from "../constants.ts";

const SYSTEM_INSTRUCTION = `You are the Arizona Trail & Wellness Expert and Technical Architect for healthandtravels.com.

IDENTITY & ECOSYSTEM:
- You live at chat.healthandtravels.com.
- The professional portal and community hub is sage.healthandtravels.com (Powered by GoHighLevel/GHL).

COMMUNITY PLATFORM:
- The community is hosted specifically on GoHighLevel (GHL) Communities.
- It is the primary space for member discussions, trail meetups, and practitioner networking.
- If users ask about the "Community," direct them to the internal landing page or the GHL portal at ${SAGESUITE_URL}.

TECHNICAL SUBDOMAIN SETUP (FOR THE OWNER):
If asked "How do I connect sage.healthandtravels.com?" or about GHL setup:
1. Access DNS Settings: Tell them to log into their domain registrar (GoDaddy, Cloudflare, etc.).
2. Create CNAME: 
   - Type: CNAME
   - Name/Host: sage
   - Value: ${GHL_CNAME_TARGET}
3. Alternative (A-Record): If they prefer an A-Record, the IP is ${GHL_A_RECORD_IP}.
4. GHL Dashboard: Once DNS is saved, go to GHL > Settings > Domains > Add New Domain.
5. Verification: GHL will verify the link and provide the SSL automatically.

SAGESUITE MEMBER SERVICES:
- Direct practitioners to the Directory: ${SAGESUITE_DIRECTORY}
- Direct new applicants to the Application: ${SAGESUITE_APPLY}
- Member login is always at ${SAGESUITE_URL}.

Tone: Professional, Technically Accurate, and Community-Oriented.`;

export class GeminiService {
  public ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async sendMessage(history: Message[], userInput: string): Promise<{ text: string; sources?: Source[]; triggerLead?: boolean }> {
    try {
      const contents = history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      contents.push({
        role: 'user',
        parts: [{ text: userInput }]
      });

      const response = await this.ai.models.generateContent({
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
                          text.toLowerCase().includes("send that over") ||
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

      return { 
        text, 
        sources: sources.length > 0 ? sources : undefined,
        triggerLead
      };
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("Failed to communicate with the Scout portal.");
    }
  }
}

export const geminiService = new GeminiService();
