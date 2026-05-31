# Quick Start Guide

Get slayr running in 5 minutes!

## 🚀 Option 1: Demo Mode (No API Keys Required)

```bash
npm install
npm run dev
```

Open http://localhost:5173 and start uploading outfits!

The app will run in **demo mode** with mock AI responses. Perfect for testing the UI!

## 🔑 Option 2: Full Setup (With AI)

### 1. Get Your API Keys

**Firebase (2 minutes):**
1. Go to https://console.firebase.google.com
2. Create new project
3. Enable Firestore Database
4. Enable Storage
5. Copy your config

**Gemini API (1 minute):**
1. Go to https://ai.google.dev/aistudio
2. Click "Get API key"
3. Copy your key

### 2. Configure Environment

Create `.env` file:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 3. Run the App

```bash
npm install
npm run dev
```

## 📱 How to Use

1. **Upload** - Drag & drop an outfit photo
2. **Analyze** - Click "Analyze Outfit" button
3. **Results** - View AI insights in 5-10 seconds

## 🎨 What You'll Get

- ⚡ Outfit score (1-100)
- 🏷️ Fashion aesthetic classification
- 👔 Detected clothing items
- 🎨 Color palette analysis
- 💡 Styling recommendations
- ✨ Accessory suggestions

## 🛠️ Tech Stack

- React + TypeScript
- Tailwind CSS
- Framer Motion
- Firebase (Firestore + Storage)
- Google Gemini Vision AI
- Zustand (State)

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 🚢 Deploy

**Firebase Hosting:**
```bash
npm install -g firebase-tools
firebase init hosting
npm run build
firebase deploy
```

**Vercel/Netlify:**
- Push to GitHub
- Connect repository
- Deploy automatically

## 🐛 Troubleshooting

**App shows demo data?**
- Check your `.env` file exists
- Verify `VITE_GEMINI_API_KEY` is set correctly

**Build errors?**
- Run `npm install` again
- Delete `node_modules` and reinstall
- Check Node version (needs v18+)

**Can't upload images?**
- Check Firebase Storage is enabled
- Verify Storage rules allow writes

## 📚 Full Documentation

See `SETUP_GUIDE.md` for complete setup instructions.

## 💡 Pro Tips

1. Use high-quality outfit photos for best results
2. Ensure good lighting in photos
3. Full-body shots work better than close-ups
4. Try different fashion aesthetics!

---

**Need help?** Check the complete `SETUP_GUIDE.md` or review the code comments.

Built with ❤️ for fashion enthusiasts
