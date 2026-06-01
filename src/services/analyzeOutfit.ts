import { apiRequest } from './api';
import { OutfitAnalysis } from '../types/outfit';

export async function analyzeAndSaveOutfit(
  imageFile: File,
  _userId: string = 'demo-user'
): Promise<OutfitAnalysis> {
  try {
    // 1. Convert image to base64
    const base64Image = await imageToBase64(imageFile);

    // 2. Query our Express AI Vision backend API
    const res = await apiRequest<{ outfit: any }>('/api/outfits/analyze', 'POST', {
      imageBase64: base64Image,
    });

    const o = res.outfit;
    return {
      id: o.id,
      userId: o.userId,
      imageUrl: o.imageUrl,
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
    return getMockAnalysis(imageFile);
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

function getMockAnalysis(file: File): OutfitAnalysis {
  return {
    id: 'demo-' + Date.now(),
    imageUrl: URL.createObjectURL(file),
    score: 88,
    aesthetic: 'Minimal Luxury',
    vibe: 'Sophisticated minimalist layout with neutral tonal contrast.',
    clothingItems: [
      { type: 'Coat', color: 'Camel', description: 'Tailored wool coat' }
    ],
    colorPalette: [
      { hex: '#C9B896', name: 'Camel Beige', dominance: 60 }
    ],
    recommendations: [
      { category: 'Fit', suggestion: 'Contrast high shapes', reasoning: 'Accents broad contrast coordinates' }
    ],
    suggestedAccessories: ['Gold watch', 'Black sunglasses'],
    fashionTags: ['cohesive', 'tonal', 'understated'],
  };
}
