import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { analyzeOutfitWithGemini, imageToBase64 } from './gemini';
import { OutfitAnalysis } from '../types/outfit';
import { getDemoAnalysis } from './demoData';

const isDemoMode = !import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY === 'demo-key';

export async function analyzeAndSaveOutfit(
  imageFile: File,
  userId: string = 'demo-user'
): Promise<OutfitAnalysis> {
  try {
    // Demo mode - use mock data
    if (isDemoMode) {
      console.warn('Running in demo mode - using mock analysis data');
      const demoAnalysis = await getDemoAnalysis();
      
      // Create a local URL for the image
      const imageUrl = URL.createObjectURL(imageFile);
      
      return {
        ...demoAnalysis,
        imageUrl,
        id: 'demo-' + Date.now(),
      };
    }

    // Production mode - use real APIs
    // 1. Convert image to base64 for Gemini
    const base64Image = await imageToBase64(imageFile);

    // 2. Analyze with Gemini Vision
    const analysis = await analyzeOutfitWithGemini(base64Image);

    // 3. Upload image to Firebase Storage
    const timestamp = Date.now();
    const storageRef = ref(storage, `outfits/${userId}/${timestamp}.jpg`);
    await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(storageRef);

    // 4. Create outfit analysis object
    const outfitAnalysis: OutfitAnalysis = {
      userId,
      imageUrl,
      score: analysis.score,
      aesthetic: analysis.aesthetic,
      vibe: analysis.vibe,
      clothingItems: analysis.clothingItems,
      colorPalette: analysis.colorPalette,
      recommendations: analysis.recommendations,
      suggestedAccessories: analysis.suggestedAccessories,
      fashionTags: analysis.fashionTags,
    };

    // 5. Save to Firestore
    const docRef = await addDoc(collection(db, 'outfits'), {
      ...outfitAnalysis,
      timestamp: serverTimestamp(),
    });

    return {
      ...outfitAnalysis,
      id: docRef.id,
    };
  } catch (error) {
    console.error('Outfit analysis error:', error);
    throw error;
  }
}
