import { ExtendedFashionOutfit, UserPreferences, EventType, BudgetTier, AestheticStyle } from '../types/fashion';

// A mapping of compatible aesthetics for similarity scoring
const AESTHETIC_SIMILARITY_MATRIX: Record<string, Record<string, number>> = {
  'Minimal Luxury': { 'Quiet Luxury': 0.9, 'Scandinavian Minimal': 0.8, 'Old Money': 0.7, 'Monochrome Minimal': 0.8 },
  'Streetwear': { 'Techwear': 0.8, 'Korean Casual': 0.7, 'Y2K': 0.6, 'TikTok Viral': 0.7 },
  'Korean Casual': { 'Streetwear': 0.7, 'Y2K': 0.5, 'Clean Girl': 0.6, 'Soft Girl': 0.6 },
  'Old Money': { 'Minimal Luxury': 0.7, 'Quiet Luxury': 0.8, 'Dark Academia': 0.6, 'Scandinavian Minimal': 0.5 },
  'Scandinavian Minimal': { 'Minimal Luxury': 0.8, 'Old Money': 0.5, 'Monochrome Minimal': 0.9, 'Quiet Luxury': 0.7 },
  'Dark Academia': { 'Old Money': 0.6, 'Coquette': 0.4, 'Scandinavian Minimal': 0.5 },
  'Clean Girl': { 'Minimal Luxury': 0.7, 'Coquette': 0.5, 'Soft Girl': 0.6, 'Pinterest Core': 0.8 },
  'Techwear': { 'Streetwear': 0.8, 'Cyber Minimal': 0.9, 'Futuristic Editorial': 0.7 },
  'Coquette': { 'Soft Girl': 0.8, 'Clean Girl': 0.5, 'Dark Academia': 0.4, 'Pinterest Core': 0.7 },
  'Soft Girl': { 'Coquette': 0.8, 'Clean Girl': 0.6, 'Korean Casual': 0.6, 'Pinterest Core': 0.7 },
  'Y2K': { 'Streetwear': 0.6, 'Korean Casual': 0.5, 'TikTok Viral': 0.8, 'Coquette': 0.5 },
  'Futuristic Editorial': { 'Techwear': 0.7, 'Cyber Minimal': 0.8, 'Monochrome Minimal': 0.6 },
  'Cyber Minimal': { 'Techwear': 0.9, 'Futuristic Editorial': 0.8, 'Monochrome Minimal': 0.7 },
  'Quiet Luxury': { 'Minimal Luxury': 0.9, 'Old Money': 0.8, 'Scandinavian Minimal': 0.7 },
  'Pinterest Core': { 'Clean Girl': 0.8, 'Coquette': 0.7, 'Soft Girl': 0.7, 'Quiet Luxury': 0.6 },
  'TikTok Viral': { 'Streetwear': 0.7, 'Y2K': 0.8, 'Korean Casual': 0.6 },
  'Monochrome Minimal': { 'Minimal Luxury': 0.8, 'Scandinavian Minimal': 0.9, 'Cyber Minimal': 0.7 },
};

// Event aesthetic appropriateness map
const EVENT_AESTHETIC_SCORES: Partial<Record<EventType, Record<string, number>>> = {
  'casual': { 'Clean Girl': 1.0, 'Korean Casual': 1.0, 'Streetwear': 0.9, 'Soft Girl': 0.9, 'Pinterest Core': 0.9, 'Scandinavian Minimal': 0.8, 'Y2K': 0.7 },
  'work': { 'Minimal Luxury': 1.0, 'Old Money': 0.9, 'Scandinavian Minimal': 1.0, 'Quiet Luxury': 1.0, 'Monochrome Minimal': 1.0, 'Dark Academia': 0.7 },
  'date-night': { 'Coquette': 1.0, 'Minimal Luxury': 0.9, 'Dark Academia': 0.8, 'Old Money': 0.8, 'Quiet Luxury': 0.9, 'Korean Casual': 0.7 },
  'party': { 'Streetwear': 1.0, 'Y2K': 1.0, 'TikTok Viral': 1.0, 'Coquette': 0.8, 'Futuristic Editorial': 0.9, 'Techwear': 0.7 },
  'formal': { 'Old Money': 1.0, 'Minimal Luxury': 0.9, 'Quiet Luxury': 1.0, 'Scandinavian Minimal': 0.8 },
  'wedding': { 'Old Money': 1.0, 'Coquette': 0.8, 'Minimal Luxury': 0.9, 'Quiet Luxury': 1.0 },
  'brunch': { 'Clean Girl': 1.0, 'Coquette': 0.9, 'Korean Casual': 1.0, 'Pinterest Core': 1.0, 'Soft Girl': 0.9, 'Minimal Luxury': 0.8 },
  'travel': { 'Scandinavian Minimal': 1.0, 'Korean Casual': 1.0, 'Streetwear': 0.9, 'Clean Girl': 0.9, 'Techwear': 0.8 },
  'gym': { 'Techwear': 1.0, 'Streetwear': 0.8, 'Clean Girl': 0.7 },
  'festival': { 'Y2K': 1.0, 'Streetwear': 0.9, 'TikTok Viral': 1.0, 'Coquette': 0.8, 'Futuristic Editorial': 0.9, 'Techwear': 0.8 },
};

// Budget pricing range proxies
const BUDGET_TIER_PROXIES: Record<BudgetTier, { min: number; max: number }> = {
  'budget': { min: 0, max: 0.35 },
  'mid-range': { min: 0.3, max: 0.65 },
  'premium': { min: 0.6, max: 0.85 },
  'luxury': { min: 0.8, max: 1.0 },
};

// Pure function to calculate direct/indirect color similarity
export function calculateColorHarmony(colors1: string[], colors2: string[]): number {
  if (colors1.length === 0 || colors2.length === 0) return 0.5;

  let matches = 0;
  for (const c1 of colors1) {
    if (colors2.some(c2 => c2.toLowerCase() === c1.toLowerCase())) {
      matches += 1.0;
    } else {
      // Check for partial hex proximity
      for (const c2 of colors2) {
        if (c1.startsWith('#') && c2.startsWith('#')) {
          const r1 = parseInt(c1.substring(1, 3), 16);
          const g1 = parseInt(c1.substring(3, 5), 16);
          const b1 = parseInt(c1.substring(5, 7), 16);

          const r2 = parseInt(c2.substring(1, 3), 16);
          const g2 = parseInt(c2.substring(3, 5), 16);
          const b2 = parseInt(c2.substring(5, 7), 16);

          const distance = Math.sqrt(Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2));
          if (distance < 60) {
            matches += 0.5; // partial harmony
            break;
          }
        }
      }
    }
  }

  return Math.min(1.0, matches / Math.max(colors1.length, 1));
}

// Calculate aesthetic similarity based on matrix lookup
export function calculateAestheticSimilarity(a: string, b: string): number {
  if (a === b) return 1.0;
  
  const scoreA = AESTHETIC_SIMILARITY_MATRIX[a]?.[b];
  if (scoreA !== undefined) return scoreA;

  const scoreB = AESTHETIC_SIMILARITY_MATRIX[b]?.[a];
  if (scoreB !== undefined) return scoreB;

  return 0.2; // default low similarity
}

// Trend relevance score (0-1) based on velocity and engagement
export function calculateTrendRelevance(outfit: ExtendedFashionOutfit): number {
  const velocity = outfit.trendVelocity || 0;
  const engagement = outfit.engagementScore || 0;
  const saveRate = outfit.saveRate || 0;

  // Normalized combination
  return (velocity * 0.4 + engagement * 0.3 + saveRate * 100 * 0.3) / 100;
}

// Event appropriateness match
export function calculateEventMatch(outfit: ExtendedFashionOutfit, event: EventType): number {
  const aesthetic = outfit.aesthetic;
  const eventScores = EVENT_AESTHETIC_SCORES[event] || {};
  
  // 1. Direct aesthetic match for event
  let score = eventScores[aesthetic] || 0.2;

  // 2. Occasion tag match within outfit metadata
  const occasionTags = outfit.personalizationMeta?.occasionTags || [];
  const normalizedEvent = event.toLowerCase().replace('-', ' ');
  const hasOccasionTag = occasionTags.some(tag => 
    tag.toLowerCase().includes(normalizedEvent) || normalizedEvent.includes(tag.toLowerCase())
  );
  
  if (hasOccasionTag) {
    score = Math.min(1.0, score + 0.2);
  }

  return score;
}

// Budget tier scoring (distance from budget tier range)
export function calculateBudgetMatch(outfit: ExtendedFashionOutfit, budget: BudgetTier): number {
  const priceProxy = outfit.recommendationWeight || 0.5; // weight is used as proxy for luxury level (0 to 1)
  const range = BUDGET_TIER_PROXIES[budget];

  if (priceProxy >= range.min && priceProxy <= range.max) {
    return 1.0; // perfect budget match
  }

  // Calculate distance penalty
  const distance = priceProxy < range.min ? range.min - priceProxy : priceProxy - range.max;
  return Math.max(0, 1 - distance * 2);
}

// Normalize value between min and max bounds
export function normalizeScore(score: number, min: number, max: number): number {
  if (max === min) return 1.0;
  return Math.min(1.0, Math.max(0.0, (score - min) / (max - min)));
}

// Cosine similarity between two numerical vectors
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length || vecA.length === 0) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Convert an outfit into a standardized 8-dimensional numerical vector for mathematical clustering/matching
// Dimensions:
// 0: Gender appropriateness (0=male, 0.5=unisex, 1=female)
// 1: Minimal vs Bold (0=minimal, 1=maximalist/bold)
// 2: Casual vs Formal (0=casual/streetwear, 1=formal/editorial)
// 3: Warm vs Cool colors (ratio of warm hex colors)
// 4: Social velocity (0 to 1)
// 5: Wearability complexity (0=simple basic, 1=highly layered/complex)
// 6: Price/Luxury tier (0=budget, 1=luxury)
// 7: Trend Score (0 to 1)
export function outfitToVector(outfit: ExtendedFashionOutfit): number[] {
  const vector = new Array(8).fill(0);

  // 0. Gender
  vector[0] = outfit.gender === 'female' ? 1.0 : outfit.gender === 'male' ? 0.0 : 0.5;

  // 1. Minimal vs Bold
  const boldAesthetics: AestheticStyle[] = ['Streetwear', 'Y2K', 'TikTok Viral', 'Futuristic Editorial', 'Coquette'];
  vector[1] = boldAesthetics.includes(outfit.aesthetic) ? 0.8 : 0.2;

  // 2. Casual vs Formal
  const formalAesthetics: AestheticStyle[] = ['Minimal Luxury', 'Old Money', 'Quiet Luxury', 'Futuristic Editorial'];
  vector[2] = formalAesthetics.includes(outfit.aesthetic) ? 0.85 : 0.25;

  // 3. Warm vs Cool Colors (approximate ratio)
  const warmColors = ['#FF6B6B', '#FFB6C1', '#FFC0CB', '#E8D5C4', '#C9B896', '#D4B5A0', '#D4A574'];
  const warmCount = outfit.colors.filter(c => warmColors.includes(c.toUpperCase())).length;
  vector[3] = warmCount / Math.max(1, outfit.colors.length);

  // 4. Social Velocity
  vector[4] = (outfit.trendVelocity || 0) / 100;

  // 5. Complexity
  vector[5] = (outfit.personalizationMeta?.styleComplexity || 5) / 10;

  // 6. Price/Luxury level
  vector[6] = outfit.recommendationWeight || 0.5;

  // 7. Trend Score
  vector[7] = calculateTrendRelevance(outfit);

  return vector;
}

// Standard unified preference scorer combining color, aesthetic, trend, event and budget matches
export function calculateOutfitScore(outfit: ExtendedFashionOutfit, preferences: UserPreferences): number {
  let score = 0;

  // 1. Gender check (hard filter proxy)
  if (preferences.gender && outfit.gender !== preferences.gender && outfit.gender !== 'unisex') {
    return 0; // major penalty
  }

  // 2. Aesthetic match
  const favAesthetics = preferences.favoriteAesthetics || [];
  let aestheticScore = 0;
  if (favAesthetics.includes(outfit.aesthetic)) {
    const idx = favAesthetics.indexOf(outfit.aesthetic);
    aestheticScore = 1.0 - idx * 0.15;
  } else {
    // Check matrix compatibility with primary favorite
    if (favAesthetics.length > 0) {
      aestheticScore = calculateAestheticSimilarity(favAesthetics[0], outfit.aesthetic) * 0.5;
    }
  }

  // Penalty for disliked styles
  const dislikedStyles = preferences.dislikedStyles || [];
  if (dislikedStyles.includes(outfit.aesthetic)) {
    aestheticScore -= 0.8;
  }

  // 3. Color Harmony
  const colorScore = calculateColorHarmony(outfit.colors, preferences.favoriteColors || []);

  // 4. Vibe and mood match
  const favVibes = preferences.favoriteVibes || [];
  let vibeScore = 0;
  if (favVibes.some(v => outfit.vibe.toLowerCase().includes(v.toLowerCase()))) {
    vibeScore += 0.6;
  }
  const moodTagMatch = outfit.moodTags?.some(tag => 
    favVibes.some(v => v.toLowerCase() === tag.toLowerCase())
  );
  if (moodTagMatch) {
    vibeScore += 0.4;
  }

  // 5. Trend Score
  const trendScore = calculateTrendRelevance(outfit);

  // Weighted Combination
  score = (
    aestheticScore * 0.4 +
    colorScore * 0.2 +
    vibeScore * 0.2 +
    trendScore * 0.2
  );

  return Math.max(0.0, score);
}
