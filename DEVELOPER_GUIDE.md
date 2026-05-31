# Developer Guide

Quick reference for developers working on slayr.

## 🚀 Quick Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Firebase (if using)
firebase login          # Login to Firebase
firebase init           # Initialize Firebase
firebase deploy         # Deploy to hosting
```

## 📁 Key Files

### Configuration
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript settings
- `.env` - Environment variables (create from `.env.example`)
- `tailwind.config.js` - Tailwind settings (auto-generated)

### Entry Points
- `index.html` - HTML template
- `src/main.tsx` - App entry point
- `src/App.tsx` - Main app component

### Core Services
- `src/services/gemini.ts` - AI analysis
- `src/services/analyzeOutfit.ts` - Complete workflow
- `src/services/demoData.ts` - Mock data

### State
- `src/store/useOutfitStore.ts` - Global state

### Types
- `src/types/outfit.ts` - TypeScript definitions
- `src/vite-env.d.ts` - Environment types

## 🎨 Component Library

### UI Components
```typescript
import ScoreCard from './components/ScoreCard';
import AestheticBadge from './components/AestheticBadge';
import ColorPalette from './components/ColorPalette';
import ClothingItems from './components/ClothingItems';
import RecommendationCard from './components/RecommendationCard';
import AccessorySuggestions from './components/AccessorySuggestions';
import FashionTags from './components/FashionTags';
```

### Screens
```typescript
import UploadScreen from './screens/UploadScreen';
import ResultScreen from './screens/ResultScreen';
import AnalyzingScreen from './components/AnalyzingScreen';
```

## 🔧 Common Tasks

### Adding a New Component

1. Create file in `src/components/`:
```typescript
// src/components/MyComponent.tsx
import { motion } from 'framer-motion';

interface MyComponentProps {
  data: string;
}

export default function MyComponent({ data }: MyComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800"
    >
      <p className="text-white">{data}</p>
    </motion.div>
  );
}
```

2. Import and use:
```typescript
import MyComponent from './components/MyComponent';

<MyComponent data="Hello" />
```

### Adding a New Service

1. Create file in `src/services/`:
```typescript
// src/services/myService.ts
export async function myFunction(param: string): Promise<string> {
  try {
    // Your logic here
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

2. Import and use:
```typescript
import { myFunction } from './services/myService';

const result = await myFunction('test');
```

### Adding State to Store

```typescript
// src/store/useOutfitStore.ts
interface OutfitStore {
  // Add new state
  myData: string | null;
  
  // Add new action
  setMyData: (data: string) => void;
}

export const useOutfitStore = create<OutfitStore>((set) => ({
  myData: null,
  setMyData: (data) => set({ myData: data }),
  // ... existing state
}));
```

### Using State in Components

```typescript
import { useOutfitStore } from './store/useOutfitStore';

function MyComponent() {
  const { myData, setMyData } = useOutfitStore();
  
  return (
    <button onClick={() => setMyData('new value')}>
      {myData}
    </button>
  );
}
```

### Adding New Types

```typescript
// src/types/outfit.ts
export interface MyNewType {
  id: string;
  name: string;
  value: number;
}
```

### Creating Animated Components

```typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="..."
>
  Content
</motion.div>
```

### Using Tailwind Classes

```typescript
// Combine classes with cn utility
import { cn } from './utils/cn';

<div className={cn(
  'bg-neutral-900',
  'rounded-3xl',
  'p-8',
  isActive && 'border-white'
)}>
```

## 🎨 Design Tokens

### Colors
```css
/* Backgrounds */
bg-black         /* #000000 */
bg-neutral-900   /* #171717 */
bg-neutral-800   /* #262626 */

/* Text */
text-white       /* #FFFFFF */
text-neutral-400 /* #A3A3A3 */
text-neutral-500 /* #737373 */
text-neutral-600 /* #525252 */

/* Borders */
border-neutral-800  /* #262626 */
border-neutral-700  /* #404040 */
border-white/20     /* White 20% opacity */
```

### Spacing
```css
/* Common paddings */
p-4   /* 1rem / 16px */
p-6   /* 1.5rem / 24px */
p-8   /* 2rem / 32px */
p-12  /* 3rem / 48px */

/* Common gaps */
gap-2   /* 0.5rem / 8px */
gap-4   /* 1rem / 16px */
gap-6   /* 1.5rem / 24px */
gap-8   /* 2rem / 32px */
```

### Border Radius
```css
rounded-full  /* 9999px (perfect circle) */
rounded-3xl   /* 1.5rem / 24px */
rounded-2xl   /* 1rem / 16px */
rounded-xl    /* 0.75rem / 12px */
```

### Typography
```css
/* Sizes */
text-xs   /* 0.75rem / 12px */
text-sm   /* 0.875rem / 14px */
text-base /* 1rem / 16px */
text-lg   /* 1.125rem / 18px */
text-xl   /* 1.25rem / 20px */
text-2xl  /* 1.5rem / 24px */
text-3xl  /* 1.875rem / 30px */
text-4xl  /* 2.25rem / 36px */
text-5xl  /* 3rem / 48px */

/* Weights */
font-light   /* 300 */
font-normal  /* 400 */
font-medium  /* 500 */

/* Tracking */
tracking-tight   /* -0.025em */
tracking-wide    /* 0.025em */
tracking-widest  /* 0.1em */
```

## 🔄 State Flow

### Upload Flow
```
User selects image
  ↓
UploadScreen: setSelectedImage()
  ↓
User clicks "Analyze"
  ↓
setAnalyzing(true)
  ↓
analyzeAndSaveOutfit()
  ↓
Gemini API call
  ↓
Firebase upload
  ↓
Firestore save
  ↓
setAnalysis(result)
  ↓
Navigate to ResultScreen
```

### Error Flow
```
Error occurs
  ↓
catch (error)
  ↓
setError(message)
  ↓
Error toast appears
  ↓
User dismisses
  ↓
setError(null)
```

## 🌐 API Integration

### Gemini API Call
```typescript
import { analyzeOutfitWithGemini } from './services/gemini';

const base64Image = await imageToBase64(file);
const analysis = await analyzeOutfitWithGemini(base64Image);
```

### Firebase Upload
```typescript
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './config/firebase';

const storageRef = ref(storage, `outfits/user/${Date.now()}.jpg`);
await uploadBytes(storageRef, file);
const url = await getDownloadURL(storageRef);
```

### Firestore Save
```typescript
import { collection, addDoc } from 'firebase/firestore';
import { db } from './config/firebase';

const docRef = await addDoc(collection(db, 'outfits'), {
  ...data,
  timestamp: serverTimestamp(),
});
```

## 🧪 Testing

### Demo Mode
Set in `.env`:
```env
VITE_GEMINI_API_KEY=demo-key
```

### Manual Testing Checklist
- [ ] Upload image via drag & drop
- [ ] Upload image via click
- [ ] Remove image preview
- [ ] Analyze outfit
- [ ] View results
- [ ] Try all aesthetics
- [ ] Test error states
- [ ] Test on mobile
- [ ] Test on tablet
- [ ] Test on desktop

## 🐛 Debugging

### Common Issues

**"env does not exist on type ImportMeta"**
```bash
# Make sure src/vite-env.d.ts exists
# Restart TypeScript server in VS Code
```

**"Failed to analyze outfit"**
```typescript
// Check console for actual error
console.log('Gemini API Key:', import.meta.env.VITE_GEMINI_API_KEY);
console.log('Firebase Config:', firebaseConfig);
```

**Build errors**
```bash
# Clear and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

### Debug Logging

Add logging:
```typescript
console.log('State:', useOutfitStore.getState());
console.log('Analysis:', analysis);
console.error('Error:', error);
```

## 📦 Building for Production

### Environment Setup
1. Create production `.env`:
```env
VITE_FIREBASE_API_KEY=prod_key
VITE_GEMINI_API_KEY=prod_key
```

2. Build:
```bash
npm run build
```

3. Test build:
```bash
npm run preview
```

### Deployment

**Vercel:**
```bash
vercel
```

**Netlify:**
```bash
netlify deploy --prod
```

**Firebase:**
```bash
firebase deploy
```

## 🔐 Security Best Practices

1. **Never commit .env**
   - Already in `.gitignore`

2. **Use environment variables**
   ```typescript
   const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
   ```

3. **Validate inputs**
   ```typescript
   const validation = validateImageFile(file);
   if (!validation.valid) throw new Error(validation.error);
   ```

4. **Handle errors gracefully**
   ```typescript
   try {
     await riskyOperation();
   } catch (error) {
     setError('User-friendly message');
   }
   ```

## 💡 Pro Tips

### Performance
- Use `React.memo()` for expensive components
- Lazy load screens with `React.lazy()`
- Debounce user inputs
- Use `useCallback` for event handlers
- Optimize images before upload

### Code Style
- Use TypeScript everywhere
- Keep components small (< 200 lines)
- Extract reusable logic to hooks
- Use descriptive variable names
- Add comments for complex logic

### Git Workflow
```bash
git checkout -b feature/my-feature
# Make changes
git add .
git commit -m "feat: add new feature"
git push origin feature/my-feature
# Create pull request
```

## 📚 Resources

### Documentation
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Firebase](https://firebase.google.com/docs)
- [Gemini API](https://ai.google.dev/docs)
- [Zustand](https://github.com/pmndrs/zustand)

### VS Code Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Error Translator
- Auto Rename Tag
- GitLens

### Useful Commands
```bash
# Find all TODOs
grep -r "TODO" src/

# Count lines of code
find src -name "*.tsx" -o -name "*.ts" | xargs wc -l

# Check bundle size
npm run build && ls -lh dist/

# Type check without build
npx tsc --noEmit
```

## 🎯 Next Steps

1. Read the full `SETUP_GUIDE.md`
2. Review `API_DOCUMENTATION.md`
3. Check out `FEATURES.md`
4. Start building!

---

Happy coding! 🚀
