# slayr - AI Fashion Analysis

A premium luxury fashion-tech web app that analyzes outfit images using Google Gemini Vision API.

## Features

- 🎨 AI-powered outfit analysis
- 📊 Fashion scoring system (1-100)
- 🏷️ Aesthetic classification (10+ styles)
- 🎨 Color palette detection
- 👔 Clothing item identification
- 💡 Personalized recommendations
- ✨ Accessory suggestions
- 🏷️ Fashion tag generation

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Firebase** - Backend (Firestore + Storage)
- **Google Gemini Vision** - AI analysis
- **Zustand** - State management

## Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd slayr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Firestore Database
   - Enable Firebase Storage
   - Copy your Firebase config

4. **Get Gemini API Key**
   - Visit https://ai.google.dev/
   - Create a new API key for Gemini
   - Copy your API key

5. **Create .env file**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` with your credentials:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_GEMINI_API_KEY=your_gemini_key
   ```

6. **Run development server**
   ```bash
   npm run dev
   ```

7. **Build for production**
   ```bash
   npm run build
   ```

## Supported Aesthetics

- Streetwear
- Old Money
- Clean Girl
- Y2K
- Dark Academia
- Minimal Luxury
- Techwear
- Vintage
- Scandinavian Minimal
- Korean Casual

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ScoreCard.tsx
│   ├── AestheticBadge.tsx
│   ├── ColorPalette.tsx
│   ├── ClothingItems.tsx
│   ├── RecommendationCard.tsx
│   ├── AccessorySuggestions.tsx
│   ├── FashionTags.tsx
│   └── AnalyzingScreen.tsx
├── screens/             # Main app screens
│   ├── UploadScreen.tsx
│   └── ResultScreen.tsx
├── services/            # API services
│   ├── gemini.ts
│   └── analyzeOutfit.ts
├── store/              # State management
│   └── useOutfitStore.ts
├── types/              # TypeScript types
│   └── outfit.ts
└── config/             # Configuration
    └── firebase.ts
```

## How It Works

1. **Upload** - User uploads an outfit photo
2. **Analyze** - Image is sent to Gemini Vision API
3. **Process** - AI analyzes fashion elements, colors, style
4. **Store** - Results saved to Firebase Firestore
5. **Display** - Beautiful UI shows insights and recommendations

## Design Philosophy

- **Premium Luxury** - Matte black UI, elegant typography
- **Editorial Feel** - Pinterest/Cosmos/Apple aesthetic
- **Smooth Interactions** - Framer Motion animations
- **Production Ready** - Not a prototype, feels like a real startup

## License

MIT

## Credits

Powered by Google Gemini Vision AI
