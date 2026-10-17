# BRIVIO — AI-Native Creative Marketplace 🇮🇳

> Connecting elite AI creators (filmmakers, animators, generative designers) with brands and agencies under **ASCI Synthetic Media Disclosure** and **Clear-to-Air™** certified enterprise standards.

---

## 🌟 Key Features


1. **Dual Perspective "Role Switcher"**: Seamless toggle between **"Brand / Agency"** view and **"AI Creator"** view.
2. **Creator Discovery & Smart Filtering**: Real-time filtering by AI Tools (*Kling 1.5, Runway Gen-3, Midjourney v6.1, Flux.1, ComfyUI, ElevenLabs, Sora, Adobe Firefly, Topaz 4K*), Specializations, and **Clear-to-Air™** safety certification with intelligent toolchain fallbacks.
3. **"Recipe-First" AI Portfolios**: Inspectable generative production recipes detailing:
   - Multi-node base model stacks (*Latent generators, frame orchestrators, upscalers*)
   - Custom LoRA & ControlNet weights (*Face anchor geometry, texture fidelity*)
   - Audio pipelines (*ElevenLabs speech synthesis + spatial sound design*)
   - ASCI & MeitY C2PA cryptographic provenance manifests
   - Locked Seed IDs and prompt architecture snippets
4. **AI-Assisted Interactive Brief Builder**: 3-step commissioning wizard featuring **"⚡ AI Auto-Deconstruct Brief"** to analyze concepts into technical style tokens, model stacks, and **₹ INR** escrow budgets.
5. **Brand Briefs Board**: Marketplace board with locked escrow budgets and creator pitch treatment submissions.
6. **The "Seed Board" Delivery & Revision Studio**: Milestone iteration environment featuring:
   - Interactive **Split Scrubber Slider** comparing Seed A vs Seed B
   - Visual inpainting / reroll coordinate feedback pins
   - Version history prompt token diff viewer  
   - Milestone escrow approval and release workflow

---

## 🚀 Tech Stack

- **Frontend**: React 19, Vite 8, Tailwind CSS v4, Lucide React, Canvas Confetti
- **Backend**: Express.js REST API, CORS, Dotenv, File-based persistent DB (`server/data/db.json`)
- **AI Engine**: Google Gemini 1.5 Flash API (optional) + Built-in Indian Creative Heuristics Engine

---

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dhruvgupt02/synapse.git
   cd synapse
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment (Optional)**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   *(No API key is required by default. You can optionally add `GEMINI_API_KEY` for live LLM completions).*

4. **Start the Development Servers**:
   - Start the Express backend (Port 5001):
     ```bash
     npm run server
     ```
   - Start the Vite frontend (Port 5173):
     ```bash
     npm run dev
     ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Compliance & Legal
- **ASCI Guidelines**: Compliant with Advertising Standards Council of India synthetic media disclosures.
- **Clear-to-Air™ Protocol**: Zero-copyright-infringement commercial training warranty.
- **C2PA ISO Standard**: Content credentials cryptographic verification.
