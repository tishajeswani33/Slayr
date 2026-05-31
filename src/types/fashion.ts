export type Gender = 'male' | 'female' | 'unisex';

export type AestheticStyle =
  | 'Minimal Luxury'
  | 'Streetwear'
  | 'Korean Casual'
  | 'Old Money'
  | 'Scandinavian Minimal'
  | 'Dark Academia'
  | 'Clean Girl'
  | 'Techwear'
  | 'Coquette'
  | 'Soft Girl'
  | 'Y2K'
  | 'Futuristic Editorial'
  | 'Cyber Minimal'
  | 'Quiet Luxury'
  | 'Pinterest Core'
  | 'TikTok Viral'
  | 'Monochrome Minimal';

export type Season = 'spring' | 'summer' | 'fall' | 'winter' | 'all-season';

export type FashionMood =
  | 'confident'
  | 'mysterious'
  | 'romantic'
  | 'edgy'
  | 'playful'
  | 'sophisticated'
  | 'rebellious'
  | 'dreamy'
  | 'powerful'
  | 'serene';

export type EventType =
  | 'casual'
  | 'work'
  | 'date-night'
  | 'party'
  | 'formal'
  | 'wedding'
  | 'brunch'
  | 'travel'
  | 'gym'
  | 'festival'
  | 'concert'
  | 'photoshoot'
  | 'college-fest'
  | 'luxury-dinner'
  | 'airport'
  | 'club'
  | 'office';

export type BudgetTier =
  | 'budget'
  | 'mid-range'
  | 'premium'
  | 'luxury';

export interface FashionOutfit {
  id: string;
  title: string;
  gender: Gender;
  aesthetic: AestheticStyle;
  colors: string[];
  clothingItems: string[];
  accessories: string[];
  vibe: string;
  popularityScore: number;
  season: Season;
  moodTags: string[];
  recommendationWeight: number;
  imageUrl: string;
}

export interface ExtendedFashionOutfit extends FashionOutfit {
  trendVelocity: number;
  engagementScore: number;
  saveRate: number;
  genZTrendTags: string[];
  fashionMood: FashionMood;
  creatorInspiration: string;
  aestheticClusterId: number;
  personalizationMeta: {
    targetAge?: string;
    styleComplexity?: number;
    versatilityScore?: number;
    occasionTags?: string[];
    ageGroup?: string;
    bodyTypes?: string[];
    occasions?: EventType[];
    budgetTier?: BudgetTier;
  };
}

export interface UserPreferences {
  userId: string;
  gender?: Gender;
  favoriteAesthetics: AestheticStyle[];
  favoriteColors: string[];
  favoriteVibes: string[];
  dislikedStyles: AestheticStyle[];
  styleMaturity: number; // 1-10
  preferredSeasons: Season[];
}

export interface StyleDNA {
  dominantAesthetic: AestheticStyle;
  secondaryAesthetic: AestheticStyle;
  vibeProfile: string[];
  colorPalette: string[];
  fashionCompatibilityScore: number;
  styleEvolution: AestheticStyle[];
  personalityTraits: string[];
}

export interface AdvancedStyleDNA {
  dominantAesthetic: AestheticStyle;
  secondaryAesthetic: AestheticStyle;
  tertiaryAesthetic: AestheticStyle;
  colorProfile: { hex: string; weight: number }[];
  vibeFingerprint: string[];
  fashionForwardScore: number;
  riskAppetite: number;
  seasonalPreference: Season;
  styleArchetype: string;
  influencerAlignment: string[];
  sustainabilityScore: number;
}
