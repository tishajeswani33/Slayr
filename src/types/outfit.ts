export interface ClothingItem {
  type: string;
  color: string;
  description: string;
}

export interface ColorPalette {
  hex: string;
  name: string;
  dominance: number; // percentage
}

export interface Recommendation {
  category: string;
  suggestion: string;
  reasoning: string;
}

export interface OutfitAnalysis {
  id?: string;
  userId?: string;
  imageUrl: string;
  score: number;
  aesthetic: string;
  vibe: string;
  clothingItems: ClothingItem[];
  colorPalette: ColorPalette[];
  recommendations: Recommendation[];
  suggestedAccessories: string[];
  fashionTags: string[];
  timestamp?: Date;
}

export type AestheticType =
  | 'Streetwear'
  | 'Old Money'
  | 'Clean Girl'
  | 'Y2K'
  | 'Dark Academia'
  | 'Minimal Luxury'
  | 'Techwear'
  | 'Vintage'
  | 'Scandinavian Minimal'
  | 'Korean Casual';
