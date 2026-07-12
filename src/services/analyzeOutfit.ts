import { GeminiAnalysisResult, analyzeOutfitWithGemini } from './gemini';
import { OutfitAnalysis } from '../types/outfit';
import { analyzeImageClientSide } from '../utils/imageUtils';

export async function analyzeAndSaveOutfit(
  imageFile: File,
  _userId: string = 'demo-user'
): Promise<OutfitAnalysis> {
  try {
    // 1. Convert image to base64
    const base64Image = await imageToBase64(imageFile);

    // 2. Query Gemini directly
    const o: GeminiAnalysisResult = await analyzeOutfitWithGemini(base64Image);

    return {
      id: 'demo-' + Date.now(),
      userId: _userId,
      imageUrl: URL.createObjectURL(imageFile),
      score: o.score,
      aesthetic: o.aesthetic,
      vibe: o.vibe,
      clothingItems: o.clothingItems,
      colorPalette: o.colorPalette,
      recommendations: o.recommendations,
      suggestedAccessories: o.suggestedAccessories,
      fashionTags: o.fashionTags,
    };
  } catch (error) {
    console.error('❌ Outfit analysis failed, falling back to client-side emulation:', error);
    return await analyzeImageClientSide(imageFile);
  }
}

// Convert File to Base64 String Helper
function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      const base64Data = base64.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

