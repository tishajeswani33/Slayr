import { ExtendedFashionOutfit, UserPreferences, AestheticStyle, EventType, BudgetTier, AdvancedStyleDNA, Season } from '../types/fashion';
import { AIRecommendationRequest, AIRecommendationResponse, StyleDNAReport } from '../types/aiTypes';
import { calculateOutfitScore, calculateTrendRelevance } from '../utils/recommendationScoring';

// ─── Constants ──────────────────────────────────────────────────────

const AESTHETIC_COMPATIBILITY: Record<string, AestheticStyle[]> = {
  'Minimal Luxury': ['Quiet Luxury', 'Scandinavian Minimal', 'Old Money', 'Monochrome Minimal'],
  'Streetwear': ['Techwear', 'Korean Casual', 'Y2K', 'TikTok Viral'],
  'Korean Casual': ['Streetwear', 'Y2K', 'Clean Girl', 'Soft Girl'],
  'Old Money': ['Minimal Luxury', 'Quiet Luxury', 'Dark Academia', 'Scandinavian Minimal'],
  'Scandinavian Minimal': ['Minimal Luxury', 'Old Money', 'Monochrome Minimal', 'Quiet Luxury'],
  'Dark Academia': ['Old Money', 'Coquette', 'Scandinavian Minimal'],
  'Clean Girl': ['Minimal Luxury', 'Coquette', 'Soft Girl', 'Pinterest Core'],
  'Techwear': ['Streetwear', 'Cyber Minimal', 'Futuristic Editorial'],
  'Coquette': ['Soft Girl', 'Clean Girl', 'Dark Academia', 'Pinterest Core'],
  'Soft Girl': ['Coquette', 'Clean Girl', 'Korean Casual', 'Pinterest Core'],
  'Y2K': ['Streetwear', 'Korean Casual', 'TikTok Viral', 'Coquette'],
  'Futuristic Editorial': ['Techwear', 'Cyber Minimal', 'Monochrome Minimal'],
  'Cyber Minimal': ['Techwear', 'Futuristic Editorial', 'Monochrome Minimal'],
  'Quiet Luxury': ['Minimal Luxury', 'Old Money', 'Scandinavian Minimal'],
  'Pinterest Core': ['Clean Girl', 'Coquette', 'Soft Girl', 'Quiet Luxury'],
  'TikTok Viral': ['Streetwear', 'Y2K', 'Korean Casual'],
  'Monochrome Minimal': ['Minimal Luxury', 'Scandinavian Minimal', 'Cyber Minimal'],
};

const EVENT_AESTHETIC_MAP: Partial<Record<EventType, AestheticStyle[]>> = {
  'casual': ['Clean Girl', 'Korean Casual', 'Streetwear', 'Soft Girl', 'Pinterest Core'],
  'work': ['Minimal Luxury', 'Old Money', 'Scandinavian Minimal', 'Quiet Luxury', 'Monochrome Minimal'],
  'date-night': ['Coquette', 'Minimal Luxury', 'Dark Academia', 'Old Money', 'Quiet Luxury'],
  'party': ['Streetwear', 'Y2K', 'TikTok Viral', 'Coquette', 'Futuristic Editorial'],
  'formal': ['Old Money', 'Minimal Luxury', 'Quiet Luxury', 'Scandinavian Minimal'],
  'wedding': ['Old Money', 'Coquette', 'Minimal Luxury', 'Quiet Luxury'],
  'brunch': ['Clean Girl', 'Coquette', 'Korean Casual', 'Pinterest Core', 'Soft Girl'],
  'travel': ['Scandinavian Minimal', 'Korean Casual', 'Streetwear', 'Clean Girl', 'Techwear'],
  'gym': ['Techwear', 'Streetwear', 'Clean Girl'],
  'festival': ['Y2K', 'Streetwear', 'TikTok Viral', 'Coquette', 'Futuristic Editorial'],
};

const COLOR_HARMONY_MAP: Record<string, string[]> = {
  '#FFFFFF': ['#F5F5F5', '#E8E8E8', '#2C2C2C', '#000000', '#C9B896'],
  '#000000': ['#2C2C2C', '#FFFFFF', '#FF6B6B', '#808080', '#3D3D3D'],
  '#F5F5F5': ['#FFFFFF', '#E8E8E8', '#2C2C2C', '#D4B5A0', '#C9B896'],
  '#2C2C2C': ['#000000', '#FFFFFF', '#F5F5F5', '#1A1A1A', '#808080'],
  '#FF6B6B': ['#000000', '#FFFFFF', '#FFB6C1', '#FF1493'],
  '#FFB6C1': ['#FFC0CB', '#FFFFFF', '#FF6B6B', '#FFE4E1', '#F8F8F8'],
  '#E8D5C4': ['#9B6B6B', '#F0F0F0', '#C9B896', '#FFFFFF', '#D4B5A0'],
  '#C9B896': ['#1C1C1C', '#FFFFFF', '#E8D5C4', '#F5F5F5', '#2F4F4F'],
  '#D4B5A0': ['#F8F8F8', '#FFFFFF', '#E8D5C4', '#9B6B6B'],
};

const BUDGET_MULTIPLIERS: Record<BudgetTier, { min: number; max: number }> = {
  'budget': { min: 0, max: 0.35 },
  'mid-range': { min: 0.3, max: 0.65 },
  'premium': { min: 0.6, max: 0.85 },
  'luxury': { min: 0.8, max: 1.0 },
};

const STYLE_ARCHETYPES: Record<string, { name: string; description: string; aesthetics: AestheticStyle[] }> = {
  'The Minimalist': {
    name: 'The Minimalist',
    description: 'You believe less is more. Quality over quantity defines your wardrobe.',
    aesthetics: ['Minimal Luxury', 'Scandinavian Minimal', 'Monochrome Minimal', 'Quiet Luxury'],
  },
  'The Trendsetter': {
    name: 'The Trendsetter',
    description: 'You lead the charge on new styles. Your wardrobe is a living mood board.',
    aesthetics: ['TikTok Viral', 'Y2K', 'Streetwear', 'Korean Casual'],
  },
  'The Romantic': {
    name: 'The Romantic',
    description: 'Softness and femininity guide your aesthetic. Details matter.',
    aesthetics: ['Coquette', 'Soft Girl', 'Clean Girl', 'Pinterest Core'],
  },
  'The Classic': {
    name: 'The Classic',
    description: 'Timeless elegance is your signature. You dress for legacy, not trends.',
    aesthetics: ['Old Money', 'Dark Academia', 'Minimal Luxury', 'Quiet Luxury'],
  },
  'The Futurist': {
    name: 'The Futurist',
    description: 'Tech-forward and boundary-pushing. Fashion is your interface.',
    aesthetics: ['Techwear', 'Cyber Minimal', 'Futuristic Editorial'],
  },
};

const ACCESSORY_SUGGESTIONS: Record<string, string[]> = {
  'Minimal Luxury': ['Gold cuff bracelet', 'Leather tote', 'Silk scarf', 'Structured sunglasses'],
  'Streetwear': ['Chunky chain', 'Crossbody bag', 'Statement sneakers', 'Beanie'],
  'Korean Casual': ['Canvas tote', 'Bucket hat', 'Layered necklaces', 'Round sunglasses'],
  'Old Money': ['Pearl studs', 'Leather belt', 'Gold watch', 'Structured handbag'],
  'Clean Girl': ['Gold hoops', 'Claw clip', 'Minimal tote', 'Dainty chain necklace'],
  'Coquette': ['Bow hair clips', 'Pearl necklace', 'Ribbon choker', 'Mini bag'],
  'Dark Academia': ['Wire-rim glasses', 'Leather satchel', 'Vintage brooch', 'Pocket watch chain'],
  'Y2K': ['Butterfly clips', 'Mini shoulder bag', 'Tinted sunglasses', 'Chunky rings'],
  'Techwear': ['Utility belt', 'Tactical backpack', 'Sports watch', 'Face mask'],
  'Soft Girl': ['Pastel hair clips', 'Cloud bag', 'Flower ring', 'Heart necklace'],
  'Scandinavian Minimal': ['Leather watch', 'Wool scarf', 'Tote bag', 'Simple studs'],
  'Futuristic Editorial': ['Geometric earrings', 'Metallic clutch', 'Statement cuff', 'Shield sunglasses'],
  'Cyber Minimal': ['LED watch', 'Holographic wallet', 'Minimalist ring', 'Tech pouch'],
  'Quiet Luxury': ['Cashmere scarf', 'Heritage watch', 'Leather card holder', 'Subtle signet ring'],
  'Pinterest Core': ['Woven bag', 'Hair bow', 'Layered bracelets', 'Vintage sunglasses'],
  'TikTok Viral': ['Phone crossbody', 'Statement earrings', 'Colorful beads', 'Trendy cap'],
  'Monochrome Minimal': ['Black leather watch', 'Single stud earring', 'Geometric bag', 'Thin belt'],
};

const SHOE_SUGGESTIONS: Record<string, string[]> = {
  'Minimal Luxury': ['Leather loafers', 'Pointed-toe flats', 'Suede mules'],
  'Streetwear': ['Chunky sneakers', 'High-top trainers', 'Platform shoes'],
  'Korean Casual': ['White sneakers', 'Mary Janes', 'Platform loafers'],
  'Old Money': ['Leather penny loafers', 'Classic pumps', 'Oxford shoes'],
  'Clean Girl': ['White sneakers', 'Strappy sandals', 'Minimal mules'],
  'Coquette': ['Ballet flats', 'Kitten heels', 'Mary Janes'],
  'Dark Academia': ['Oxford brogues', 'Chelsea boots', 'Loafers'],
  'Y2K': ['Platform sneakers', 'Strappy heels', 'Knee-high boots'],
  'Techwear': ['Technical runners', 'Gore-Tex boots', 'Utility sneakers'],
  'Soft Girl': ['Pastel sneakers', 'Platform sandals', 'Canvas shoes'],
  'Scandinavian Minimal': ['Leather sneakers', 'Ankle boots', 'Wooden clogs'],
  'Futuristic Editorial': ['Sculptural heels', 'Metallic boots', 'Avant-garde sneakers'],
  'Cyber Minimal': ['Monochrome runners', 'Sleek boots', 'Geometric sneakers'],
  'Quiet Luxury': ['Suede loafers', 'Leather sandals', 'Cashmere-lined boots'],
  'Pinterest Core': ['Ballet flats', 'Espadrilles', 'Woven sandals'],
  'TikTok Viral': ['Platform UGGs', 'Colorful sneakers', 'Trending mules'],
  'Monochrome Minimal': ['Black leather boots', 'White minimal sneakers', 'Pointed flats'],
};

const HAIRSTYLE_TIPS: Record<string, string[]> = {
  'Minimal Luxury': ['Sleek low bun', 'Straight blowout', 'Clean middle part'],
  'Streetwear': ['Messy bun with tendrils', 'Box braids', 'Buzz cut'],
  'Korean Casual': ['Curtain bangs', 'Soft waves', 'Half-up half-down'],
  'Old Money': ['Polished blowout', 'Low chignon', 'Side-swept waves'],
  'Clean Girl': ['Slicked-back bun', 'Natural waves', 'Claw clip updo'],
  'Coquette': ['Ribbon-tied ponytail', 'Soft curls', 'Half-up with bow'],
  'Dark Academia': ['Loose braid', 'Vintage pin curls', 'Messy updo'],
  'Y2K': ['Butterfly clips', 'Space buns', 'Chunky highlights'],
  'Techwear': ['Sleek ponytail', 'Undercut', 'Minimalist cut'],
  'Soft Girl': ['Loose waves with clips', 'Twin braids', 'Pastel highlights'],
  'Scandinavian Minimal': ['Air-dried texture', 'Simple ponytail', 'Natural part'],
  'Futuristic Editorial': ['Sculptural updo', 'Wet-look slick', 'Geometric bob'],
  'Cyber Minimal': ['Sharp bob', 'Sleek straight', 'Metallic accents'],
  'Quiet Luxury': ['Polished ponytail', 'Effortless chignon', 'Natural shine blowout'],
  'Pinterest Core': ['Soft braid crown', 'Loose ponytail', 'Beach waves'],
  'TikTok Viral': ['Heatless curls', 'Claw clip tutorial look', 'Curtain bangs'],
  'Monochrome Minimal': ['Sleek center part', 'Blunt bob', 'Minimal bun'],
};

const COLOR_NAMES: Record<string, string> = {
  '#FFFFFF': 'White', '#000000': 'Black', '#F5F5F5': 'Off White', '#2C2C2C': 'Charcoal',
  '#1A1A1A': 'Near Black', '#E8E8E8': 'Light Gray', '#808080': 'Gray',
  '#FF6B6B': 'Coral Red', '#FFB6C1': 'Light Pink', '#FFC0CB': 'Pink',
  '#FFE4E1': 'Misty Rose', '#F8F8F8': 'Ghost White', '#E8D5C4': 'Warm Sand',
  '#9B6B6B': 'Rose Taupe', '#F0F0F0': 'Platinum', '#4A4A4A': 'Dark Gray',
  '#C9B896': 'Sand Gold', '#D4B5A0': 'Warm Beige', '#1C1C1C': 'Eerie Black',
  '#2F4F4F': 'Dark Slate', '#8B4513': 'Saddle Brown', '#D4A574': 'Warm Tan',
  '#3D3D3D': 'Jet Gray', '#00FF00': 'Neon Green', '#FF00FF': 'Magenta',
  '#FF1493': 'Deep Pink', '#00FFFF': 'Cyan', '#FFF5EE': 'Seashell',
  '#0A0A0A': 'Rich Black',
};

// ─── Helpers ────────────────────────────────────────────────────────

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function colorDistance(a: string, b: string): number {
  const parseHex = (h: string) => ({
    r: parseInt(h.slice(1, 3), 16),
    g: parseInt(h.slice(3, 5), 16),
    b: parseInt(h.slice(5, 7), 16),
  });

  const ca = parseHex(a);
  const cb = parseHex(b);

  return Math.sqrt(
    Math.pow(ca.r - cb.r, 2) +
    Math.pow(ca.g - cb.g, 2) +
    Math.pow(ca.b - cb.b, 2)
  );
}

function computeColorHarmony(outfitColors: string[], preferredColors: string[]): number {
  if (preferredColors.length === 0 || outfitColors.length === 0) return 0.5;

  let totalScore = 0;
  let comparisons = 0;

  for (const oc of outfitColors) {
    // Direct match
    if (preferredColors.includes(oc)) {
      totalScore += 1.0;
      comparisons++;
      continue;
    }

    // Check harmony map
    const harmonious = COLOR_HARMONY_MAP[oc] || [];
    const hasHarmony = preferredColors.some(pc => harmonious.includes(pc));
    if (hasHarmony) {
      totalScore += 0.7;
      comparisons++;
      continue;
    }

    // Distance-based similarity
    let bestDistance = 765; // max possible
    for (const pc of preferredColors) {
      const dist = colorDistance(oc, pc);
      if (dist < bestDistance) bestDistance = dist;
    }
    totalScore += Math.max(0, 1 - bestDistance / 500);
    comparisons++;
  }

  return comparisons > 0 ? totalScore / comparisons : 0.5;
}

function getCurrentSeason(): Season {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  return 'winter';
}

function detectArchetype(preferences: UserPreferences): string {
  let bestMatch = 'The Minimalist';
  let bestScore = 0;

  for (const [name, archetype] of Object.entries(STYLE_ARCHETYPES)) {
    const overlapCount = preferences.favoriteAesthetics.filter(a =>
      archetype.aesthetics.includes(a)
    ).length;
    const score = overlapCount / Math.max(1, preferences.favoriteAesthetics.length);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = name;
    }
  }

  return bestMatch;
}

// ─── Collaborative Filtering ───────────────────────────────────────

export function findSimilarProfiles(
  preferences: UserPreferences,
  profilePool: UserPreferences[]
): UserPreferences[] {
  const scored = profilePool
    .filter(p => p.userId !== preferences.userId)
    .map(profile => {
      // Aesthetic overlap
      const sharedAesthetics = profile.favoriteAesthetics.filter(a =>
        preferences.favoriteAesthetics.includes(a)
      ).length;
      const aestheticScore = sharedAesthetics / Math.max(1,
        Math.max(profile.favoriteAesthetics.length, preferences.favoriteAesthetics.length)
      );

      // Color overlap
      const sharedColors = profile.favoriteColors.filter(c =>
        preferences.favoriteColors.includes(c)
      ).length;
      const colorScore = sharedColors / Math.max(1,
        Math.max(profile.favoriteColors.length, preferences.favoriteColors.length)
      );

      // Vibe overlap
      const sharedVibes = profile.favoriteVibes.filter(v =>
        preferences.favoriteVibes.includes(v)
      ).length;
      const vibeScore = sharedVibes / Math.max(1,
        Math.max(profile.favoriteVibes.length, preferences.favoriteVibes.length)
      );

      // Style maturity proximity
      const maturityDiff = Math.abs(profile.styleMaturity - preferences.styleMaturity);
      const maturityScore = 1 - maturityDiff / 10;

      // Disliked styles penalty
      const dislikedOverlap = profile.favoriteAesthetics.filter(a =>
        preferences.dislikedStyles.includes(a)
      ).length;

      const similarity =
        aestheticScore * 0.4 +
        colorScore * 0.2 +
        vibeScore * 0.2 +
        maturityScore * 0.2 -
        dislikedOverlap * 0.15;

      return { profile, similarity };
    });

  return scored
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 10)
    .map(s => s.profile);
}

// ─── Content-Based Recommendation ───────────────────────────────────

export function contentBasedRecommendation(
  preferences: UserPreferences,
  dataset: ExtendedFashionOutfit[],
  count: number = 20
): ExtendedFashionOutfit[] {
  const currentSeason = getCurrentSeason();

  const scored = dataset.map(outfit => {
    // 1. Aesthetic match (40%)
    let aestheticScore = 0;
    if (preferences.favoriteAesthetics.includes(outfit.aesthetic)) {
      const idx = preferences.favoriteAesthetics.indexOf(outfit.aesthetic);
      aestheticScore = 1.0 - idx * 0.15;
    } else {
      // Check compatible aesthetics
      const compatible = AESTHETIC_COMPATIBILITY[preferences.favoriteAesthetics[0]] || [];
      if (compatible.includes(outfit.aesthetic)) {
        aestheticScore = 0.4;
      }
    }
    // Penalize disliked styles
    if (preferences.dislikedStyles.includes(outfit.aesthetic)) {
      aestheticScore = -0.5;
    }

    // 2. Color harmony (20%)
    const colorHarmonyScore = computeColorHarmony(outfit.colors, preferences.favoriteColors);

    // 3. Vibe match (15%)
    const vibeMatch = preferences.favoriteVibes.some(v =>
      outfit.vibe.toLowerCase().includes(v.toLowerCase()) ||
      v.toLowerCase().includes(outfit.vibe.toLowerCase())
    ) ? 1.0 : 0;
    const moodTagMatch = outfit.moodTags.some(tag =>
      preferences.favoriteVibes.some(v => v.toLowerCase() === tag.toLowerCase())
    ) ? 0.5 : 0;
    const vibeScore = Math.min(1.0, vibeMatch + moodTagMatch);

    // 4. Trend relevance (15%)
    const trendScore = (outfit.trendVelocity / 100) * 0.6 + (outfit.engagementScore / 100) * 0.4;

    // 5. Season match (10%)
    let seasonScore = 0;
    if (outfit.season === 'all-season') {
      seasonScore = 0.7;
    } else if (preferences.preferredSeasons.includes(outfit.season)) {
      seasonScore = 1.0;
    } else if (outfit.season === currentSeason) {
      seasonScore = 0.8;
    }

    // Gender filter
    const genderMultiplier = !preferences.gender || outfit.gender === preferences.gender || outfit.gender === 'unisex' ? 1.0 : 0.1;

    const totalScore = (
      aestheticScore * 0.4 +
      colorHarmonyScore * 0.2 +
      vibeScore * 0.15 +
      trendScore * 0.15 +
      seasonScore * 0.1
    ) * genderMultiplier;

    return { outfit, totalScore };
  });

  return scored
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, count)
    .map(s => s.outfit);
}

// ─── Generate AI Recommendation ─────────────────────────────────────

export function generateRecommendation(
  request: AIRecommendationRequest,
  dataset: ExtendedFashionOutfit[]
): AIRecommendationResponse {
  // 1. Gender filter
  let filtered = dataset.filter(o => o.gender === request.gender || o.gender === 'unisex');

  // 2. Season filter (optional fallback to current)
  const season = request.season || getCurrentSeason();
  filtered = filtered.filter(o => o.season === 'all-season' || o.season === season);

  // 3. Build a temporary preference model to calculate match scores
  const userPreferences: UserPreferences = {
    userId: request.userId,
    gender: request.gender,
    favoriteAesthetics: request.preferredAesthetics,
    favoriteColors: request.favoriteColors,
    favoriteVibes: [request.vibe],
    dislikedStyles: [],
    styleMaturity: 6,
    preferredSeasons: [season as Season],
  };

  // 4. Score all candidate outfits
  const scored = filtered.map(outfit => {
    const personalScore = calculateOutfitScore(outfit, userPreferences);
    const trend = calculateTrendRelevance(outfit);
    // Combine personalization and trendSurge
    const score = personalScore * 0.7 + trend * 0.3;
    return { outfit, score };
  });

  // Sort candidates
  scored.sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    // Return empty fallback structure if dataset is empty (should not happen)
    throw new Error('No compatible outfits found in the fashion dataset');
  }

  // 5. Select primary outfit
  const primaryOutfit = scored[0].outfit;
  const primaryAesthetic = primaryOutfit.aesthetic;

  // 6. Generate alternatives
  const alternativeFits = scored.slice(1, 4).map(s => s.outfit);

  // 7. Budget versions
  // Luxury alternative: highest scoring luxury outfit
  const luxuryOutfits = scored
    .filter(s => s.outfit.personalizationMeta?.budgetTier === 'luxury' || s.outfit.recommendationWeight > 0.75)
    .map(s => s.outfit);
  const luxuryVersion = luxuryOutfits.length > 0 ? luxuryOutfits[0] : null;

  // Budget alternative: highest scoring budget outfit
  const budgetOutfits = scored
    .filter(s => s.outfit.personalizationMeta?.budgetTier === 'budget' || s.outfit.recommendationWeight < 0.35)
    .map(s => s.outfit);
  const budgetVersion = budgetOutfits.length > 0 ? budgetOutfits[0] : null;

  // 8. Style mapping suggestions
  const accessories = ACCESSORY_SUGGESTIONS[primaryAesthetic] || ['Minimal watch', 'Simple bag'];
  const shoes = SHOE_SUGGESTIONS[primaryAesthetic] || ['Clean sneakers', 'Versatile boots'];
  const hairstyleSuggestion = (HAIRSTYLE_TIPS[primaryAesthetic] || ['Sleek blowout'])[0];

  // Layering suggestions
  const layeringOptions = primaryOutfit.clothingItems.filter(i => 
    i.toLowerCase().includes('jacket') || 
    i.toLowerCase().includes('coat') || 
    i.toLowerCase().includes('cardigan') ||
    i.toLowerCase().includes('knit') ||
    i.toLowerCase().includes('sweatshirt')
  );
  if (layeringOptions.length === 0) {
    layeringOptions.push('Minimal Trench Coat', 'Cropped Cardigan');
  }

  // Color palette
  const colorPalette = primaryOutfit.colors.map(hex => ({
    hex,
    name: COLOR_NAMES[hex] || 'Custom Swatch',
  }));

  // Moodboard images (visual layout references)
  const moodboardImages = [
    primaryOutfit.imageUrl,
    ...alternativeFits.map(a => a.imageUrl),
  ].slice(0, 4);

  // AI Reasoning text
  const occasionText = `for your ${request.eventType} occasion`;
  const aestheticText = request.preferredAesthetics.length > 0 
    ? `blending ${request.preferredAesthetics.join(' and ')} aesthetics`
    : `focusing on high-end Gen Z style`;

  const aiReasoning = `Based on your style preference profile, I've curated a bespoke outfit ${occasionText} ${aestheticText}. ` +
    `The primary choice is "${primaryOutfit.title}" in ${primaryAesthetic}, which perfectly embodies a "${request.vibe}" energy. ` +
    `It offers a ${primaryOutfit.vibe.toLowerCase()} look with a highly harmonious ${colorPalette.map(c => c.name).join('-')} color theme. ` +
    `For styling, I highly recommend styling with a ${accessories[0].toLowerCase()} and ${shoes[0].toLowerCase()} ` +
    `to complete the aesthetic. The trend relevance is exceptionally strong, meaning you'll be well ahead of the curve.`;

  // General scores
  const matchScore = Math.round(scored[0].score * 100);
  const trendRelevance = Math.round(calculateTrendRelevance(primaryOutfit) * 100);

  return {
    primaryOutfit,
    accessories,
    shoes,
    layeringOptions,
    hairstyleSuggestion,
    colorPalette,
    alternativeFits,
    luxuryVersion,
    budgetVersion,
    moodboardImages,
    aiReasoning,
    matchScore,
    trendRelevance,
  };
}

// ─── Event-Aware Personalization ────────────────────────────────────

export function getEventRecommendations(
  eventType: EventType,
  preferences: UserPreferences,
  dataset: ExtendedFashionOutfit[]
): ExtendedFashionOutfit[] {
  const eventAesthetics = EVENT_AESTHETIC_MAP[eventType] || [];

  // Merge user preferred aesthetics with event-appropriate ones
  const mergedAesthetics = new Set([
    ...preferences.favoriteAesthetics.filter(a => eventAesthetics.includes(a)),
    ...eventAesthetics,
  ]);

  // Score outfits combining event relevance and personal preference
  const scored = dataset.map(outfit => {
    let score = 0;

    // Event aesthetic match
    if (mergedAesthetics.has(outfit.aesthetic)) {
      const isUserFav = preferences.favoriteAesthetics.includes(outfit.aesthetic);
      score += isUserFav ? 1.0 : 0.6;
    }

    // Occasion tags from personalization meta
    const occasionMatch = (outfit.personalizationMeta?.occasionTags || []).some(
      tag => tag.toLowerCase().includes(eventType.replace('-', ' '))
    );
    if (occasionMatch) score += 0.3;

    // Versatility score bonus
    score += (outfit.personalizationMeta?.versatilityScore ?? 0.5) * 0.2;

    // Engagement & trend bonus
    score += (outfit.engagementScore / 100) * 0.15;

    // Color harmony with user
    score += computeColorHarmony(outfit.colors, preferences.favoriteColors) * 0.15;

    // Penalize disliked
    if (preferences.dislikedStyles.includes(outfit.aesthetic)) {
      score -= 0.5;
    }

    // Gender filter
    if (preferences.gender && outfit.gender !== preferences.gender && outfit.gender !== 'unisex') {
      score *= 0.1;
    }

    return { outfit, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map(s => s.outfit);
}

// ─── Budget Optimization ────────────────────────────────────────────

export function optimizeForBudget(
  outfits: ExtendedFashionOutfit[],
  budgetTier: BudgetTier
): ExtendedFashionOutfit[] {
  const range = BUDGET_MULTIPLIERS[budgetTier];

  return outfits.filter(outfit => {
    // Use recommendationWeight as a proxy for price tier (0-1)
    const priceProxy = outfit.recommendationWeight;
    return priceProxy >= range.min && priceProxy <= range.max;
  });
}

// ─── Generate Advanced Style DNA ────────────────────────────────────

export function generateAdvancedStyleDNA(preferences: UserPreferences): AdvancedStyleDNA {
  const dominant = preferences.favoriteAesthetics[0] || 'Minimal Luxury' as AestheticStyle;
  const secondary = preferences.favoriteAesthetics[1] || 'Scandinavian Minimal' as AestheticStyle;
  const tertiary = preferences.favoriteAesthetics[2] ||
    (AESTHETIC_COMPATIBILITY[dominant] || [])[0] ||
    'Clean Girl' as AestheticStyle;

  // Color profile from preferences
  const colorProfile = preferences.favoriteColors.map((hex, i) => ({
    hex,
    weight: 1.0 - i * 0.15,
  }));
  if (colorProfile.length === 0) {
    colorProfile.push({ hex: '#FFFFFF', weight: 1.0 }, { hex: '#2C2C2C', weight: 0.8 });
  }

  // Vibe fingerprint
  const vibeFingerprint = preferences.favoriteVibes.length > 0
    ? preferences.favoriteVibes
    : ['Sophisticated', 'Modern', 'Effortless'];

  // Fashion forward score based on trend-forward aesthetics
  const trendForwardAesthetics: AestheticStyle[] = ['TikTok Viral', 'Y2K', 'Streetwear', 'Korean Casual', 'Coquette'];
  const trendOverlap = preferences.favoriteAesthetics.filter(a =>
    trendForwardAesthetics.includes(a)
  ).length;
  const fashionForwardScore = Math.min(100,
    50 + trendOverlap * 15 + preferences.styleMaturity * 3
  );

  // Risk appetite
  const boldAesthetics: AestheticStyle[] = ['TikTok Viral', 'Y2K', 'Futuristic Editorial', 'Streetwear'];
  const boldOverlap = preferences.favoriteAesthetics.filter(a =>
    boldAesthetics.includes(a)
  ).length;
  const riskAppetite = Math.min(100,
    30 + boldOverlap * 20 + preferences.styleMaturity * 2
  );

  // Seasonal preference
  const seasonalPreference = preferences.preferredSeasons[0] || getCurrentSeason();

  // Style archetype
  const archetype = detectArchetype(preferences);

  // Influencer alignment
  const influencerMap: Record<string, string[]> = {
    'Minimal Luxury': ['Hailey Bieber', 'Rosie Huntington-Whiteley'],
    'Streetwear': ['A$AP Rocky', 'Billie Eilish'],
    'Korean Casual': ['Blackpink', 'BTS'],
    'Old Money': ['Sofia Richie', 'Princess Diana'],
    'Clean Girl': ['Matilda Djerf', 'Hailey Bieber'],
    'Coquette': ['Lana Del Rey', 'Alexa Demie'],
    'Dark Academia': ['Timothée Chalamet', 'Emma Watson'],
    'Y2K': ['Bella Hadid', 'Dua Lipa'],
    'Techwear': ['Errolson Hugh', 'SCARLXRD'],
    'Quiet Luxury': ['Gwyneth Paltrow', 'Amal Clooney'],
    'Pinterest Core': ['Zendaya', 'Sydney Sweeney'],
    'TikTok Viral': ['Addison Rae', 'Charli D\'Amelio'],
  };
  const influencerAlignment = influencerMap[dominant] || ['Style-forward creators'];

  // Sustainability score (higher for minimal, lower for fast-fashion driven)
  const sustainableAesthetics: AestheticStyle[] = ['Scandinavian Minimal', 'Minimal Luxury', 'Old Money', 'Quiet Luxury'];
  const sustainableOverlap = preferences.favoriteAesthetics.filter(a =>
    sustainableAesthetics.includes(a)
  ).length;
  const sustainabilityScore = Math.min(100,
    40 + sustainableOverlap * 20 + preferences.styleMaturity * 2
  );

  return {
    dominantAesthetic: dominant,
    secondaryAesthetic: secondary,
    tertiaryAesthetic: tertiary,
    colorProfile,
    vibeFingerprint,
    fashionForwardScore,
    riskAppetite,
    seasonalPreference,
    styleArchetype: archetype,
    influencerAlignment,
    sustainabilityScore,
  };
}

// ─── Generate Style DNA Report ──────────────────────────────────────

export function generateStyleDNAReport(preferences: UserPreferences): StyleDNAReport {
  const advancedDNA = generateAdvancedStyleDNA(preferences);
  const archetype = STYLE_ARCHETYPES[advancedDNA.styleArchetype] || STYLE_ARCHETYPES['The Minimalist'];

  // Aesthetic breakdown
  const totalAesthetics = preferences.favoriteAesthetics.length || 1;
  const aestheticBreakdown = preferences.favoriteAesthetics.map((aesthetic, i) => ({
    aesthetic,
    percentage: Math.round((1 - i * 0.2) / totalAesthetics * 100),
  }));
  if (aestheticBreakdown.length === 0) {
    aestheticBreakdown.push({ aesthetic: 'Minimal Luxury' as AestheticStyle, percentage: 100 });
  }

  // Color DNA
  const colorDNA = advancedDNA.colorProfile.map(c => ({
    hex: c.hex,
    name: COLOR_NAMES[c.hex] || 'Custom',
    affinity: c.weight,
  }));

  // Trend adoption speed
  let trendAdoptionSpeed: 'early-adopter' | 'mainstream' | 'classic' = 'mainstream';
  if (advancedDNA.fashionForwardScore > 75) {
    trendAdoptionSpeed = 'early-adopter';
  } else if (advancedDNA.fashionForwardScore < 40) {
    trendAdoptionSpeed = 'classic';
  }

  // Versatility index
  const versatilityIndex = Math.min(100,
    preferences.favoriteAesthetics.length * 15 +
    preferences.preferredSeasons.length * 10 +
    preferences.styleMaturity * 5
  );

  // Recommendations
  const compatible = AESTHETIC_COMPATIBILITY[advancedDNA.dominantAesthetic] || [];
  const recommendations = [
    `Try incorporating ${compatible[0] || 'Scandinavian Minimal'} elements into your ${advancedDNA.dominantAesthetic} looks for fresh variation.`,
    `Your color DNA suggests experimenting with ${colorDNA.length > 1 ? colorDNA[1].name : 'neutral'} tones as accent pieces.`,
    `Based on your ${archetype.name.toLowerCase()} archetype, focus on quality layering pieces this season.`,
    `Explore ${compatible[1] || 'Clean Girl'} accessories to add subtle dimension to your outfits.`,
  ];

  // Avoid aesthetics (opposite of preferences)
  const allAesthetics: AestheticStyle[] = [
    'Minimal Luxury', 'Streetwear', 'Korean Casual', 'Old Money', 'Scandinavian Minimal',
    'Dark Academia', 'Clean Girl', 'Techwear', 'Coquette', 'Soft Girl', 'Y2K',
    'Futuristic Editorial', 'Cyber Minimal', 'Quiet Luxury', 'Pinterest Core',
    'TikTok Viral', 'Monochrome Minimal',
  ];
  const avoidAesthetics = [
    ...preferences.dislikedStyles,
    ...allAesthetics.filter(a =>
      !preferences.favoriteAesthetics.includes(a) &&
      !compatible.includes(a) &&
      !preferences.dislikedStyles.includes(a)
    ).slice(0, 2),
  ].slice(0, 4);

  return {
    dna: advancedDNA,
    insights: [
      `Your dominant aesthetic is ${advancedDNA.dominantAesthetic}. You favor clean silhouettes and high-quality textures.`,
      `You are a "${archetype.name}" — leaning toward high compatibility with creators like ${advancedDNA.influencerAlignment.join(' or ')}.`,
    ],
    recommendations,
    aestheticMatch: aestheticBreakdown,
    evolutionTimeline: [
      { month: 'Jan', aesthetic: advancedDNA.dominantAesthetic },
      { month: 'Mar', aesthetic: advancedDNA.secondaryAesthetic },
      { month: 'May', aesthetic: advancedDNA.dominantAesthetic },
    ],
    peerComparison: [
      { metric: 'Style Maturity', userScore: preferences.styleMaturity, avgScore: 6.2 },
      { metric: 'Trend Surging', userScore: advancedDNA.fashionForwardScore / 10, avgScore: 6.8 },
      { metric: 'Risk Appetite', userScore: advancedDNA.riskAppetite / 10, avgScore: 5.5 },
    ],
    userId: preferences.userId,
    generatedAt: new Date().toISOString(),
    dominantAesthetic: advancedDNA.dominantAesthetic,
    secondaryAesthetic: advancedDNA.secondaryAesthetic,
    aestheticBreakdown,
    colorDNA,
    vibeSignature: advancedDNA.vibeFingerprint,
    fashionForwardScore: advancedDNA.fashionForwardScore,
    versatilityIndex,
    trendAdoptionSpeed,
    stylePersonality: archetype.description,
    compatibleAesthetics: compatible.slice(0, 4),
    avoidAesthetics,
  };
}

// ─── Learn from Interactions ────────────────────────────────────────

export function updatePreferencesFromInteraction(
  preferences: UserPreferences,
  outfitId: string,
  action: 'like' | 'save' | 'skip'
): UserPreferences {
  // Extract aesthetic from outfit ID pattern (deterministic for demo)
  const seed = outfitId.split('').reduce((s, c) => s + c.charCodeAt(0), 0);
  const allAesthetics: AestheticStyle[] = [
    'Minimal Luxury', 'Streetwear', 'Korean Casual', 'Old Money', 'Scandinavian Minimal',
    'Dark Academia', 'Clean Girl', 'Techwear', 'Coquette', 'Soft Girl', 'Y2K',
    'Futuristic Editorial', 'Cyber Minimal', 'Quiet Luxury', 'Pinterest Core',
    'TikTok Viral', 'Monochrome Minimal',
  ];
  const inferredAesthetic = allAesthetics[seed % allAesthetics.length];

  const updated = { ...preferences };

  if (action === 'like' || action === 'save') {
    // Boost the aesthetic if not already in favorites
    if (!updated.favoriteAesthetics.includes(inferredAesthetic)) {
      // 'save' is a stronger signal than 'like'
      if (action === 'save') {
        updated.favoriteAesthetics = [
          ...updated.favoriteAesthetics.slice(0, 2),
          inferredAesthetic,
          ...updated.favoriteAesthetics.slice(2),
        ];
      } else {
        updated.favoriteAesthetics = [...updated.favoriteAesthetics, inferredAesthetic];
      }
    }

    // Remove from disliked if it was there
    updated.dislikedStyles = updated.dislikedStyles.filter(s => s !== inferredAesthetic);

    // Slightly increase style maturity
    updated.styleMaturity = Math.min(10, updated.styleMaturity + 0.1);
  } else if (action === 'skip') {
    // Penalize the aesthetic — if skipped multiple times, may become disliked
    const skipSeed = seededRandom(seed + 999);
    if (skipSeed > 0.7 && !updated.dislikedStyles.includes(inferredAesthetic)) {
      updated.dislikedStyles = [...updated.dislikedStyles, inferredAesthetic];
    }

    // Remove from favorites if present and not primary
    if (updated.favoriteAesthetics.length > 1) {
      const idx = updated.favoriteAesthetics.indexOf(inferredAesthetic);
      if (idx > 0) {
        updated.favoriteAesthetics = updated.favoriteAesthetics.filter((_, i) => i !== idx);
      }
    }
  }

  return updated;
}
