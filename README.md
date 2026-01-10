# ✈️ SageSuite: The Adventure Command Center

**The centralized intelligence hub for Flightsage, Travelsage, and Campsage.**

SageSuite is a high-performance integration platform designed to bridge the gap between customer reputation (Google My Business) and lead management. It empowers travel entrepreneurs to manage multiple brands from a single, AI-enhanced dashboard.

---

## 🌟 Core Pillars

### 🤖 1. AI Review Engine (GMB Integration)
Never let a review go unanswered. SageSuite uses **Google Gemini 3 Flash** to analyze sentiment and generate context-aware, brand-aligned responses for your Google My Business listings.
*   **Sentiment Analysis**: Automatically detects if a story is Positive, Neutral, or Negative.
*   **Tone Control**: Choose between *Professional*, *Friendly*, or *Witty* response styles.
*   **One-Click Publishing**: Draft and sync replies directly back to your customers.

### 🎯 2. Explorer Qualifying (Lead Integration)
Integrate your incoming group messages and booking requests. SageSuite acts as the "invisible plumbing" to qualify leads before they hit your main CRM.
*   **Lead Scoring**: AI-driven classification into *Hot Leads*, *Inquiries*, or *Support*.
*   **Dream Mapping**: Extracts the "vibe" and core travel wishes from messy customer inputs.

### 🎙️ 3. Real-Time Voice Concierge
A world-first **Gemini 2.5 Live** integration. A voice-activated guide that helps families and groups plan their next journey through natural conversation.
*   **Low-Latency Audio**: Human-like interaction for gear advice and itinerary planning.
*   **Brand Aware**: The concierge knows if you're talking about Campsage (tents/hiking) or Flightsage (reunions/airfare).

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Icons**: Lucide React
- **AI Brain**: Google Gemini API (`@google/genai`)
- **Real-time Audio**: Web Audio API (PCM 16-bit encoding/decoding)
- **Deployment**: Optimized for Vercel / Netlify

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/adventure-hub.git
cd adventure-hub
```

### 2. Environment Variables
You must provide a Gemini API Key to power the AI features. Create a `.env` file or add this to your deployment settings:

```env
API_KEY=your_google_gemini_api_key_here
```

### 3. Deploy to the Web
The easiest way to launch is using **Vercel**:
1. Connect your GitHub account.
2. Select the `adventure-hub` repository.
3. Add the `API_KEY` in the Environment Variables section.
4. Set your domain to `adventure.healthandtravels.com`.

---

## 📂 Project Structure

- `/components`: The UI modules (Sidebar, Dashboard, Reviews, etc.)
- `/services`: AI logic and API integration (`geminiService.ts`)
- `types.ts`: Centralized TypeScript definitions for brand consistency.
- `constants.ts`: Multi-brand configuration and mock data for simulation.

---

## 🌐 The Ecosystem

- **Flightsage**: Global reunions and airfare management.
- **Travelsage**: Luxury stays and permanent residence booking.
- **Campsage**: Primitive sites, park fees, and wilderness memories.

**Scale your adventure empire at [healthandtravels.com](https://healthandtravels.com)**
