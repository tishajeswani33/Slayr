import { ExtendedFashionOutfit, EventType, BudgetTier, AestheticStyle, FashionMood, AdvancedStyleDNA } from './fashion';

export interface AIRecommendationRequest {
  userId: string;
  eventType: EventType;
  budget: BudgetTier;
  preferredAesthetics: AestheticStyle[];
  gender: 'male' | 'female' | 'unisex';
  vibe: FashionMood;
  favoriteColors: string[];
  season?: string;
  weatherCondition?: string;
}

export interface AIRecommendationResponse {
  primaryOutfit: ExtendedFashionOutfit;
  accessories: string[];
  shoes: string[];
  layeringOptions: string[];
  hairstyleSuggestion: string;
  colorPalette: { hex: string; name: string }[];
  alternativeFits: ExtendedFashionOutfit[];
  luxuryVersion: ExtendedFashionOutfit | null;
  budgetVersion: ExtendedFashionOutfit | null;
  moodboardImages: string[];
  aiReasoning: string;
  matchScore: number;
  trendRelevance: number;
}

export interface TrendRadarData {
  aesthetic: AestheticStyle;
  velocity: number;
  popularity: number;
  growth: number;
  status: 'emerging' | 'trending' | 'peak' | 'declining';
  viralScore: number;
  engagementRate: number;
  saveRate: number;
  confidence: number;
  relatedTrends: string[];
  trendingColors: string[];
  topOutfits: ExtendedFashionOutfit[];
}

export interface StyleDNAReport {
  dna: AdvancedStyleDNA;
  insights: string[];
  recommendations: string[];
  aestheticMatch: { aesthetic: AestheticStyle; percentage: number }[];
  evolutionTimeline: { month: string; aesthetic: AestheticStyle }[];
  peerComparison: { metric: string; userScore: number; avgScore: number }[];
  userId?: string;
  generatedAt?: string;
  dominantAesthetic?: AestheticStyle;
  secondaryAesthetic?: AestheticStyle;
  aestheticBreakdown?: { aesthetic: AestheticStyle; percentage: number }[];
  colorDNA?: { hex: string; name: string; affinity: number }[];
  vibeSignature?: string[];
  fashionForwardScore?: number;
  versatilityIndex?: number;
  trendAdoptionSpeed?: 'early-adopter' | 'mainstream' | 'classic';
  stylePersonality?: string;
  compatibleAesthetics?: AestheticStyle[];
  avoidAesthetics?: AestheticStyle[];
}

export interface CreatorProfile {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  aesthetic: AestheticStyle;
  followers: number;
  outfitCount: number;
  vibeScore: number;
  isVerified: boolean;
  topOutfits: ExtendedFashionOutfit[];
}
