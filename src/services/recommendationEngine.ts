import { FashionOutfit, UserPreferences, StyleDNA, AestheticStyle } from '../types/fashion';
import { generateFashionDataset } from '../data/fashionDatasetGenerator';

// Generate Style DNA from user preferences
export function generateStyleDNA(preferences: UserPreferences): StyleDNA {
  const dominantAesthetic = preferences.favoriteAesthetics[0] || 'Minimal Luxury';
  const secondaryAesthetic = preferences.favoriteAesthetics[1] || 'Scandinavian Minimal';

  const vibeProfile = preferences.favoriteVibes.length > 0
    ? preferences.favoriteVibes
    : ['Sophisticated', 'Timeless', 'Modern'];

  const colorPalette = preferences.favoriteColors.length > 0
    ? preferences.favoriteColors
    : ['#FFFFFF', '#2C2C2C', '#F5F5F5'];

  const fashionCompatibilityScore = calculateCompatibilityScore(preferences);

  const styleEvolution = [
    dominantAesthetic,
    secondaryAesthetic,
    ...preferences.favoriteAesthetics.slice(2, 5),
  ].filter(Boolean) as AestheticStyle[];

  const personalityTraits = derivePersonalityTraits(preferences);

  return {
    dominantAesthetic,
    secondaryAesthetic,
    vibeProfile,
    colorPalette,
    fashionCompatibilityScore,
    styleEvolution,
    personalityTraits,
  };
}

// Calculate compatibility score based on preferences
function calculateCompatibilityScore(preferences: UserPreferences): number {
  let score = 50; // Base score

  // Bonus for having clear preferences
  if (preferences.favoriteAesthetics.length >= 2) score += 10;
  if (preferences.favoriteColors.length >= 3) score += 10;
  if (preferences.favoriteVibes.length >= 2) score += 10;

  // Bonus for style maturity
  score += preferences.styleMaturity * 2;

  // Cap at 100
  return Math.min(score, 100);
}

// Derive personality traits from aesthetic preferences
function derivePersonalityTraits(preferences: UserPreferences): string[] {
  const aestheticTraits: Record<string, string[]> = {
    'Minimal Luxury': ['Sophisticated', 'Refined', 'Quality-focused'],
    'Streetwear': ['Bold', 'Creative', 'Urban'],
    'Korean Casual': ['Trendy', 'Youthful', 'Experimental'],
    'Old Money': ['Classic', 'Traditional', 'Elegant'],
    'Clean Girl': ['Natural', 'Fresh', 'Minimalist'],
    'Techwear': ['Functional', 'Futuristic', 'Athletic'],
  };

  const traits = new Set<string>();
  preferences.favoriteAesthetics.forEach((aesthetic) => {
    const aestheticSpecificTraits = aestheticTraits[aesthetic] || [];
    aestheticSpecificTraits.forEach((trait) => traits.add(trait));
  });

  return Array.from(traits).slice(0, 5);
}

// Get personalized recommendations
export function getPersonalizedRecommendations(
  preferences: UserPreferences,
  count: number = 50
): FashionOutfit[] {
  // Generate large dataset
  const allOutfits = generateFashionDataset(10000);

  // Score each outfit
  const scoredOutfits = allOutfits.map((outfit) => ({
    outfit,
    score: scoreOutfit(outfit, preferences),
  }));

  // Sort by score
  scoredOutfits.sort((a, b) => b.score - a.score);

  // Return top recommendations
  return scoredOutfits.slice(0, count).map((item) => item.outfit);
}

// Score outfit based on user preferences
function scoreOutfit(outfit: FashionOutfit, preferences: UserPreferences): number {
  let score = 0;

  // Gender match
  if (preferences.gender && outfit.gender === preferences.gender) {
    score += 30;
  }

  // Aesthetic match
  if (preferences.favoriteAesthetics.includes(outfit.aesthetic)) {
    const aestheticIndex = preferences.favoriteAesthetics.indexOf(outfit.aesthetic);
    score += 40 - (aestheticIndex * 10); // First choice gets 40, second 30, etc.
  }

  // Color match
  const colorMatches = outfit.colors.filter((color) =>
    preferences.favoriteColors.includes(color)
  ).length;
  score += colorMatches * 5;

  // Vibe match
  if (preferences.favoriteVibes.includes(outfit.vibe)) {
    score += 15;
  }

  // Avoid disliked styles
  if (preferences.dislikedStyles.includes(outfit.aesthetic)) {
    score -= 50;
  }

  // Season preference
  if (preferences.preferredSeasons.includes(outfit.season)) {
    score += 10;
  }

  // Popularity bonus
  score += outfit.popularityScore * 0.1;

  // Recommendation weight
  score += outfit.recommendationWeight * 10;

  return score;
}

// Filter outfits by aesthetic
export function filterByAesthetic(
  aesthetic: AestheticStyle,
  count: number = 100
): FashionOutfit[] {
  const dataset = generateFashionDataset(5000);
  return dataset.filter((outfit) => outfit.aesthetic === aesthetic).slice(0, count);
}

// Search outfits
export function searchOutfits(query: string, count: number = 50): FashionOutfit[] {
  const dataset = generateFashionDataset(5000);
  const lowerQuery = query.toLowerCase();

  return dataset
    .filter(
      (outfit) =>
        outfit.title.toLowerCase().includes(lowerQuery) ||
        outfit.aesthetic.toLowerCase().includes(lowerQuery) ||
        outfit.vibe.toLowerCase().includes(lowerQuery) ||
        outfit.moodTags.some((tag) => tag.includes(lowerQuery))
    )
    .slice(0, count);
}
