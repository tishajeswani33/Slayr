<div align="center">
  <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80" alt="Slayr Hero Banner" width="100%" style="border-radius: 12px; margin-bottom: 20px;" />
  
  # Slayr — The AI-Native Luxury Fashion Ecosystem
  
  **Reimagining how Gen-Z discovers, styles, and buys fashion.**

  [![React](https://img.shields.io/badge/React-18-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-5-purple.svg?style=for-the-badge&logo=vite)](https://vitejs.dev/)
  [![Gemini](https://img.shields.io/badge/Google_Gemini-Vision_AI-orange.svg?style=for-the-badge&logo=google)](https://ai.google.dev/)
  [![Firebase](https://img.shields.io/badge/Firebase-Hosting-yellow.svg?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
</div>

<br />

## 🚀 The Vision

Traditional fashion e-commerce (Myntra, Meesho, ASOS) is broken for the modern consumer. They provide a disjointed catalog of individual items, leaving users overwhelmed and guessing how to mix and match. 

**Slayr** bridges the massive gap between **inspiration (Pinterest/TikTok)** and **commerce (Myntra/Meesho)**. We don't just sell clothes; we provide complete, budget-aware, personalized *outfits* curated by an elite AI Stylist. 

## 💥 The Problem We Solve

| The Legacy Way (Myntra/Meesho) | The Slayr Way |
| :--- | :--- |
| **Endless Scrolling** through thousands of disconnected t-shirts and pants. | **Complete Outfits** curated head-to-toe, including accessories and footwear. |
| **Dumb Filters** (e.g., "Price < ₹5000" returns random, uncoordinated items). | **Intent-Driven AI** (e.g., "Sangeet outfit under ₹15k" returns a perfectly coordinated ethnic look). |
| **No Styling Advice**. You are on your own. | **Gemini-Powered Stylist** explains *why* the outfit works for your body type and event. |
| **Text-only search bar**. | **Voice-Native Interface**. Just speak to your AI stylist. |

## 🌟 Core Features & Technical Moat

### 1. 👗 The 100k+ Outfit Intelligence Engine
Unlike legacy platforms, Slayr's architecture is built around the "Outfit" as the atomic unit, not the "Item". 
- We hand-curate high-fidelity looks across 10+ categories (from *Traditional Wedding* to *Quiet Luxury*).
- Each look contains exact individual item pricing, accessory breakdowns, and color palettes.

### 2. 🧠 Gemini Vision AI Stylist
We leverage **Google Gemini 1.5 Flash** to provide real-time fashion consultation.
- **Visual Analysis:** Upload a photo, and Gemini acts as a high-end stylist, scoring your fit (1-100), identifying aesthetics, and suggesting precise improvements.
- **Budget Chatbot:** Chat with Slayr (e.g., "I need an office formal look under ₹8,000"). The AI queries our proprietary database and returns rich, interactive outfit cards within your budget.

### 3. 🎙️ Hands-Free Voice Assistant
Built natively using the **Web Speech API**. Gen-Z dictates rather than types. Users can tap the mic, speak their fashion dilemmas, and Slayr will transcribe, process via Gemini, and literally **speak the styling advice back to them**.

### 4. ⚡ Hyper-Optimized Architecture
- **Frontend:** React + Vite + TypeScript. 
- **Styling:** Tailwind CSS + Framer Motion for buttery-smooth 60fps animations, giving it an Apple/Cosmos level editorial feel.
- **Backend/Deploy:** Firebase Hosting + Firestore + Supabase (PostgreSQL) for edge-optimized, zero-latency content delivery.
- **Performance:** 12-second production builds with aggressive code-splitting and asset inlining.

## 📈 Market Opportunity

The Gen-Z fashion market is a multi-billion dollar opportunity. This demographic spends heavily on aesthetics but suffers from decision fatigue. By acting as a **Personal AI Stylist** rather than just a store, Slayr captures high-intent buyers *before* they even know what specific items they want to buy.

## 🛠️ Getting Started (For Developers & Investors)

Experience Slayr locally in under 60 seconds:

```bash
# 1. Clone the repository
git clone https://github.com/tishajeswani33/slayr.git
cd slayr

# 2. Install dependencies
npm install

# 3. Add your Gemini API Key
cp .env.example .env
# Edit .env and add: VITE_GEMINI_API_KEY="your_api_key_here"

# 4. Run the high-performance dev server
npm run dev
```

## 🌍 Production Deployment

Slayr is built for scale with 1-click deployment to Firebase edge networks.

```bash
# Build the optimized production bundle
npm run build

# Deploy to Firebase Hosting
npx firebase-tools deploy --only hosting
```

---

<div align="center">
  <i>"Fashion fades, but AI-driven style is eternal."</i><br>
  <b>— The Slayr Founding Team</b>
</div>
