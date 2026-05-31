import { ExtendedFashionOutfit, UserPreferences, EventType, BudgetTier, AestheticStyle } from '../types/fashion';

// ─── Interfaces ─────────────────────────────────────────────────────

export interface RankingFactors {
  aestheticMatch: number;
  colorHarmony: number;
  trendVelocity: number;
  engagementScore: number;
  personalizationScore: number;
  eventRelevance: number;
  budgetMatch: number;
  diversityBonus: number;
}

export interface RankedOutfit {
  outfit: ExtendedFashionOutfit;
  totalScore: number;
  factors: RankingFactors;
  rank: number;
}

export interface RankingOptions {
  eventType?: EventType;
  budgetTier?: BudgetTier;
  weights?: Partial<RankingWeights>;
  maxPerAesthetic?: number;
  boostRising?: boolean;
}

interface RankingWeights {
  aestheticMatch: number;
  colorHarmony: number;
  trendVelocity: number;
  engagementScore: number;
  personalizationScore: number;
  eventRelevance: number;
  budgetMatch: number;
  diversityBonus: number;
}

// ─── Constants ──────────────────────────────────────────────────────

const DEFAULT_WEIGHTS: RankingWeights = {
  aestheticMatch: 0.25,
  colorHarmony: 0.12,
  trendVelocity: 0.15,
  engagementScore: 0.12,
  personalizationScore: 0.15,
  eventRelevance: 0.08,
  budgetMatch: 0.05,
  diversityBonus: 0.08,
};

const EVENT_AESTHETIC_AFFINITY: Partial<Record<EventType, AestheticStyle[]>> = {
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

const BUDGET_RANGES: Record<BudgetTier, { min: number; max: number }> = {
  'budget': { min: 0, max: 0.35 },
  'mid-range': { min: 0.25, max: 0.65 },
  'premium': { min: 0.55, max: 0.85 },
  'luxury': { min: 0.75, max: 1.0 },
};

const COLOR_HARMONY_GROUPS: string[][] = [
  ['#FFFFFF', '#F5F5F5', '#E8E8E8', '#F8F8F8', '#FFF5EE', '#F0F0F0'],
  ['#000000', '#1A1A1A', '#2C2C2C', '#0A0A0A', '#1C1C1C', '#3D3D3D', '#4A4A4A'],
  ['#FFB6C1', '#FFC0CB', '#FFE4E1', '#FF6B6B', '#FF1493'],
  ['#E8D5C4', '#C9B896', '#D4B5A0', '#D4A574', '#8B4513', '#9B6B6B'],
  ['#00FF00', '#00FFFF', '#FF00FF'],
];

// ─── Helpers ────────────────────────────────────────────────────────

function colorHarmonyScore(outfitColors: string[], preferredColors: string[]): number {
  if (preferredColors.length === 0) return 0.5;

  let score = 0;
  let matches = 0;

  for (const oc of outfitColors) {
    // Direct match
    if (preferredColors.includes(oc)) {
      score += 1.0;
      matches++;
      continue;
    }

    // Same harmony group
    const ocGroup = COLOR_HARMONY_GROUPS.find(g => g.includes(oc));
    if (ocGroup) {
      const groupMatch = preferredColors.some(pc => ocGroup.includes(pc));
      if (groupMatch) {
        score += 0.65;
        matches++;
        continue;
      }
    }

    // Fallback: low affinity
    score += 0.15;
    matches++;
  }

  return matches > 0 ? score / matches : 0.5;
}

function computePersonalizationScore(outfit: ExtendedFashionOutfit, preferences: UserPreferences): number {
  let score = 0;

  // Vibe alignment
  const vibeMatch = preferences.favoriteVibes.some(v =>
    outfit.vibe.toLowerCase().includes(v.toLowerCase())
  );
  if (vibeMatch) score += 0.35;

  // Mood tag overlap
  const moodOverlap = outfit.moodTags.filter(tag =>
    preferences.favoriteVibes.some(v => v.toLowerCase() === tag.toLowerCase())
  ).length;
  score += Math.min(0.25, moodOverlap * 0.1);

  // Style maturity alignment
  const complexityDiff = Math.abs(
    ((outfit.personalizationMeta?.styleComplexity ?? 5) / 10) - (preferences.styleMaturity / 10)
  );
  score += (1 - complexityDiff) * 0.2;

  // Save rate as quality proxy
  score += outfit.saveRate * 0.2;

  return Math.min(1.0, score);
}

function computeEventRelevance(outfit: ExtendedFashionOutfit, eventType?: EventType): number {
  if (!eventType) return 0.5;

  const affinityList = EVENT_AESTHETIC_AFFINITY[eventType] || [];
  let score = 0;

  // Aesthetic fit for event
  const idx = affinityList.indexOf(outfit.aesthetic);
  if (idx >= 0) {
    score += 1.0 - idx * 0.15;
  }

  // Occasion tags
  const occasionMatch = (outfit.personalizationMeta?.occasionTags || []).some(
    tag => tag.toLowerCase().includes(eventType.replace('-', ' '))
  );
  if (occasionMatch) score += 0.25;

  // Versatility bonus for formal/work events
  if (['work', 'formal', 'wedding'].includes(eventType)) {
    score += (outfit.personalizationMeta?.versatilityScore ?? 0.5) * 0.15;
  }

  return Math.min(1.0, score);
}

function computeBudgetMatch(outfit: ExtendedFashionOutfit, budgetTier?: BudgetTier): number {
  if (!budgetTier) return 0.5;

  const range = BUDGET_RANGES[budgetTier];
  const price = outfit.recommendationWeight;

  if (price >= range.min && price <= range.max) {
    // Perfect fit — score based on how centered in range
    const center = (range.min + range.max) / 2;
    const dist = Math.abs(price - center) / ((range.max - range.min) / 2);
    return 1.0 - dist * 0.3;
  }

  // Out of range
  const overMin = Math.max(0, range.min - price);
  const overMax = Math.max(0, price - range.max);
  const penalty = Math.min(1.0, (overMin + overMax) * 3);
  return Math.max(0, 0.3 - penalty);
}

// ─── Multi-Factor Outfit Ranking ─────────────────────────────────────

export function rankOutfits(
  outfits: ExtendedFashionOutfit[],
  preferences: UserPreferences,
  options?: RankingOptions
): RankedOutfit[] {
  const weights = { ...DEFAULT_WEIGHTS, ...options?.weights };
  const seenAesthetics: Record<string, number> = {};
  const maxPerAesthetic = options?.maxPerAesthetic ?? Infinity;

  const scored = outfits.map(outfit => {
    // 1. Aesthetic match
    let aestheticMatch = 0;
    if (preferences.favoriteAesthetics.includes(outfit.aesthetic)) {
      const idx = preferences.favoriteAesthetics.indexOf(outfit.aesthetic);
      aestheticMatch = 1.0 - idx * 0.12;
    }
    if (preferences.dislikedStyles.includes(outfit.aesthetic)) {
      aestheticMatch = -0.5;
    }

    // Gender filter
    if (preferences.gender && outfit.gender !== preferences.gender && outfit.gender !== 'unisex') {
      aestheticMatch *= 0.1;
    }

    // 2. Color harmony
    const colorHarmony = colorHarmonyScore(outfit.colors, preferences.favoriteColors);

    // 3. Trend velocity (normalized 0-1)
    let trendVelocity = outfit.trendVelocity / 100;
    if (options?.boostRising && outfit.trendVelocity > 60) {
      trendVelocity = Math.min(1.0, trendVelocity * 1.2);
    }

    // 4. Engagement score
    const engagementScore = outfit.engagementScore / 100;

    // 5. Personalization score
    const personalizationScore = computePersonalizationScore(outfit, preferences);

    // 6. Event relevance
    const eventRelevance = computeEventRelevance(outfit, options?.eventType);

    // 7. Budget match
    const budgetMatch = computeBudgetMatch(outfit, options?.budgetTier);

    // 8. Diversity bonus (calculated after sorting, placeholder)
    const diversityBonus = 0;

    const factors: RankingFactors = {
      aestheticMatch,
      colorHarmony,
      trendVelocity,
      engagementScore,
      personalizationScore,
      eventRelevance,
      budgetMatch,
      diversityBonus,
    };

    const totalScore =
      aestheticMatch * weights.aestheticMatch +
      colorHarmony * weights.colorHarmony +
      trendVelocity * weights.trendVelocity +
      engagementScore * weights.engagementScore +
      personalizationScore * weights.personalizationScore +
      eventRelevance * weights.eventRelevance +
      budgetMatch * weights.budgetMatch;

    return { outfit, totalScore, factors, rank: 0 };
  });

  // Sort by total score
  scored.sort((a, b) => b.totalScore - a.totalScore);

  // Apply diversity bonus and max-per-aesthetic filtering
  const results: RankedOutfit[] = [];
  for (const item of scored) {
    const aes = item.outfit.aesthetic;
    const count = seenAesthetics[aes] || 0;

    if (count >= maxPerAesthetic) continue;

    // Diversity bonus: reward first occurrence, diminish repeats
    const diversityBonus = count === 0 ? 0.1 : Math.max(0, 0.05 - count * 0.02);
    item.factors.diversityBonus = diversityBonus;
    item.totalScore += diversityBonus * weights.diversityBonus;

    seenAesthetics[aes] = count + 1;
    item.rank = results.length + 1;
    results.push(item);
  }

  return results;
}

// ─── Event-Specific Ranking ─────────────────────────────────────────

export function rankForEvent(
  outfits: ExtendedFashionOutfit[],
  eventType: EventType
): RankedOutfit[] {
  // Create default preferences biased toward event aesthetics
  const eventAesthetics = EVENT_AESTHETIC_AFFINITY[eventType] || [];
  const eventPreferences: UserPreferences = {
    userId: 'event-ranking',
    favoriteAesthetics: eventAesthetics,
    favoriteColors: [],
    favoriteVibes: [],
    dislikedStyles: [],
    styleMaturity: 5,
    preferredSeasons: [],
  };

  return rankOutfits(outfits, eventPreferences, {
    eventType,
    weights: {
      eventRelevance: 0.35,
      aestheticMatch: 0.25,
      engagementScore: 0.15,
      trendVelocity: 0.1,
      personalizationScore: 0.05,
      colorHarmony: 0.05,
      budgetMatch: 0.0,
      diversityBonus: 0.05,
    },
  });
}

// ─── Budget-Aware Ranking ───────────────────────────────────────────

export function rankWithBudget(
  outfits: ExtendedFashionOutfit[],
  budgetTier: BudgetTier
): RankedOutfit[] {
  const defaultPreferences: UserPreferences = {
    userId: 'budget-ranking',
    favoriteAesthetics: [],
    favoriteColors: [],
    favoriteVibes: [],
    dislikedStyles: [],
    styleMaturity: 5,
    preferredSeasons: [],
  };

  return rankOutfits(outfits, defaultPreferences, {
    budgetTier,
    weights: {
      budgetMatch: 0.35,
      engagementScore: 0.2,
      trendVelocity: 0.15,
      aestheticMatch: 0.1,
      personalizationScore: 0.1,
      colorHarmony: 0.05,
      eventRelevance: 0.0,
      diversityBonus: 0.05,
    },
  });
}

// ─── Diversity Injection ────────────────────────────────────────────

export function diversifyResults(
  ranked: RankedOutfit[],
  maxPerAesthetic: number = 3
): RankedOutfit[] {
  const counts: Record<string, number> = {};
  const diversified: RankedOutfit[] = [];

  for (const item of ranked) {
    const aes = item.outfit.aesthetic;
    const current = counts[aes] || 0;

    if (current >= maxPerAesthetic) continue;

    counts[aes] = current + 1;
    diversified.push({
      ...item,
      rank: diversified.length + 1,
    });
  }

  return diversified;
}

// ─── Top Picks ──────────────────────────────────────────────────────

export function getTopPicks(
  outfits: ExtendedFashionOutfit[],
  preferences: UserPreferences,
  count: number = 10
): RankedOutfit[] {
  const ranked = rankOutfits(outfits, preferences, {
    boostRising: true,
    maxPerAesthetic: 3,
  });

  // Diversify the top results
  const diversified = diversifyResults(ranked, 2);

  return diversified.slice(0, count);
}
