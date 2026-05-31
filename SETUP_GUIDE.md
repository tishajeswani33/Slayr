# Complete Setup Guide for slayr

This guide will walk you through setting up the slayr AI fashion analysis app from scratch.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Google account (for Firebase and Gemini API)
- A code editor (VS Code recommended)

## Step 1: Firebase Setup

### 1.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Enter project name: `slayr-app` (or your choice)
4. Disable Google Analytics (optional)
5. Click "Create project"

### 1.2 Register Web App

1. In your Firebase project, click the web icon (`</>`)
2. Register app name: `slayr`
3. Don't check "Firebase Hosting" yet
4. Click "Register app"
5. Copy the Firebase config object - you'll need this!

### 1.3 Enable Firestore

1. In Firebase Console, go to "Build" → "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a location (choose closest to your users)
5. Click "Enable"

### 1.4 Configure Firestore Rules

Go to the "Rules" tab and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /outfits/{outfitId} {
      allow read: if true;
      allow create: if true;
      allow update: if request.auth != null;
      allow delete: if request.auth != null;
    }
  }
}
```

Click "Publish"

### 1.5 Enable Storage

1. Go to "Build" → "Storage"
2. Click "Get started"
3. Use production mode rules
4. Select same location as Firestore
5. Click "Done"

### 1.6 Configure Storage Rules

Go to "Rules" tab:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /outfits/{userId}/{fileName} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

Click "Publish"

## Step 2: Google Gemini API Setup

### 2.1 Get Gemini API Key

1. Go to [Google AI Studio](https://ai.google.dev/aistudio)
2. Click "Get API key" in the top right
3. Click "Create API key in new project" or select existing
4. Copy your API key - keep it safe!

### 2.2 Test Your API Key (Optional)

You can test your Gemini API key works:
```bash
curl https://generativelanguage.googleapis.com/v1/models?key=YOUR_API_KEY
```

## Step 3: Local Development Setup

### 3.1 Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd slayr

# Install dependencies
npm install
```

### 3.2 Create Environment File

Create `.env` file in the project root:

```bash
cp .env.example .env
```

### 3.3 Configure Environment Variables

Edit `.env` with your credentials:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=slayr-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=slayr-app
VITE_FIREBASE_STORAGE_BUCKET=slayr-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# Google Gemini API
VITE_GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**Where to find these values:**
- All Firebase values are in your Firebase project settings (⚙️ icon → Project settings)
- Gemini API key is from Google AI Studio

### 3.4 Run Development Server

```bash
npm run dev
```

Open http://localhost:5173 in your browser

## Step 4: Testing the App

### 4.1 Test Image Upload

1. Take a photo of an outfit or use a fashion image
2. Upload it using the drag & drop area
3. Click "Analyze Outfit"
4. Wait for AI analysis (3-10 seconds)
5. View results!

### 4.2 Demo Mode

If you don't have API keys yet, the app runs in demo mode with mock data automatically.

## Step 5: Production Build

### 5.1 Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized files.

### 5.2 Test Production Build

```bash
npm run preview
```

## Step 6: Deployment Options

### Option A: Firebase Hosting (Recommended)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize hosting
firebase init hosting

# Select your project
# Set public directory to: dist
# Configure as single-page app: Yes
# Set up automatic builds: No

# Deploy
npm run build
firebase deploy
```

Your app will be live at: `https://your-project.web.app`

### Option B: Vercel

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Option C: Netlify

1. Push code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Import your repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Add environment variables
7. Deploy!

## Troubleshooting

### Firebase Connection Issues

**Error: "Firebase: Error (auth/api-key-not-valid)"**
- Check your `VITE_FIREBASE_API_KEY` is correct
- Make sure it's the Web API key from Firebase settings

**Error: "Missing or insufficient permissions"**
- Update Firestore rules (see Step 1.4)
- Check Storage rules (see Step 1.6)

### Gemini API Issues

**Error: "Failed to analyze outfit"**
- Verify your Gemini API key is correct
- Check API key has Gemini API enabled
- Ensure you have quota remaining

**Error: "API key not valid"**
- Get a new API key from Google AI Studio
- Make sure you're using the correct environment variable name

### Build Issues

**Error: "env does not exist on type ImportMeta"**
- Make sure `src/vite-env.d.ts` exists
- Restart TypeScript server in VS Code

**Error: Module not found**
- Run `npm install` again
- Delete `node_modules` and reinstall

## Environment Variables Reference

| Variable | Description | Where to Find |
|----------|-------------|---------------|
| `VITE_FIREBASE_API_KEY` | Firebase Web API Key | Firebase Console → Project Settings → Web apps |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | Same as above |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID | Same as above |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | Same as above |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Sender ID | Same as above |
| `VITE_FIREBASE_APP_ID` | Firebase App ID | Same as above |
| `VITE_GEMINI_API_KEY` | Google Gemini API Key | Google AI Studio |

## Security Best Practices

1. **Never commit `.env` file** - Already in `.gitignore`
2. **Use environment-specific keys** - Different keys for dev/prod
3. **Implement authentication** - Add Firebase Auth before production
4. **Set up proper Firestore rules** - Restrict write access
5. **Monitor API usage** - Check Firebase and Gemini quotas
6. **Rate limit requests** - Add request throttling for production

## Next Steps

Once your app is running:

1. **Add Authentication**
   - Implement Firebase Auth
   - Create user profiles
   - Save outfits to user accounts

2. **Add More Features**
   - Outfit history
   - Favorites/Moodboards
   - Social sharing
   - Compare outfits

3. **Optimize Performance**
   - Image compression
   - Lazy loading
   - CDN for assets

4. **Analytics**
   - Add Google Analytics
   - Track user behavior
   - Monitor errors

## Support

If you run into issues:
1. Check the troubleshooting section
2. Review Firebase and Gemini documentation
3. Check browser console for errors
4. Verify all environment variables are set

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)

Happy building! 🚀
