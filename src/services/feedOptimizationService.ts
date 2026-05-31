import { ExtendedFashionOutfit, UserPreferences, AestheticStyle } from '../types/fashion';
import { calculateOutfitScore, calculateTrendRelevance } from '../utils/recommendationScoring';

export interface FeedConfig {
  pageSize: number;
  diversityFactor: number;
  trendBoost: number;
  personalizedRatio: number;
  maxSameAesthetic: number;
}

const DEFAULT_CONFIG: FeedConfig = {
  pageSize: 20,
  diversityFactor: 0.6,
  trendBoost: 0.25,
  personalizedRatio: 0.65,
  maxSameAesthetic: 3,
};

export interface FeedPage {
  items: ExtendedFashionOutfit[];
  page: number;
  hasMore: boolean;
  totalAvailable: number;
  appliedFilters: string[];
}

export interface FeedFilters {
  aesthetics?: AestheticStyle[];
  gender?: string;
  season?: string;
  minPopularity?: number;
  sortBy?: 'trending' | 'newest' | 'popular' | 'personalized';
  searchQuery?: string;
}

// Predict engagement probability (0 to 100) based on user similarity history
export function predictEngagement(outfit: ExtendedFashionOutfit, preferences: UserPreferences): number {
  const matchScore = calculateOutfitScore(outfit, preferences); // 0 to 1 range
  const popularityFactor = outfit.popularityScore / 100; // 0 to 1
  const saveRateFactor = outfit.saveRate * 1.5; // saveRate typically 0-0.4

  const rawEngagement = matchScore * 50 + popularityFactor * 30 + saveRateFactor * 20;
  return Math.min(99.0, Math.max(10.0, rawEngagement));
}

// Content diversity balance: prevents flooding the feed with identical aesthetics
export function balanceDiversity(items: ExtendedFashionOutfit[], maxPerAesthetic: number = 3): ExtendedFashionOutfit[] {
  const result: ExtendedFashionOutfit[] = [];
  const countMap: Record<string, number> = {};
  const overflow: ExtendedFashionOutfit[] = [];

  for (const item of items) {
    const key = item.aesthetic;
    const count = countMap[key] || 0;
    if (count < maxPerAesthetic) {
      countMap[key] = count + 1;
      result.push(item);
    } else {
      overflow.push(item);
    }
  }

  // Inject remaining overflow at the tail of the list
  return [...result, ...overflow];
}

// Optimized feed ranking combining user interests, current trend surges, and diversity
export function generateOptimizedFeed(
  dataset: ExtendedFashionOutfit[],
  preferences: UserPreferences,
  config?: Partial<FeedConfig>
): ExtendedFashionOutfit[] {
  const cfg = { ...DEFAULT_CONFIG, ...config };

  // 1. Core scoring
  const scored = dataset.map(outfit => {
    const personalization = calculateOutfitScore(outfit, preferences);
    const trend = calculateTrendRelevance(outfit);
    
    // Weighted combination of personal interest + viral trends
    const feedScore = personalization * cfg.personalizedRatio + trend * cfg.trendBoost;
    return { outfit, feedScore };
  });

  // 2. Sort by overall feed score
  const sorted = scored
    .sort((a, b) => b.feedScore - a.feedScore)
    .map(s => s.outfit);

  // 3. Inject diversity mapping
  return balanceDiversity(sorted, cfg.maxSameAesthetic);
}

// Real-time filters and search mapping
export function filterFeed(dataset: ExtendedFashionOutfit[], filters: FeedFilters): ExtendedFashionOutfit[] {
  let list = dataset;

  if (filters.gender && filters.gender !== 'all') {
    const genderQuery = filters.gender.toLowerCase();
    list = list.filter(o => o.gender === genderQuery || o.gender === 'unisex');
  }

  if (filters.aesthetics && filters.aesthetics.length > 0) {
    const aestheticsSet = new Set(filters.aesthetics);
    list = list.filter(o => aestheticsSet.has(o.aesthetic));
  }

  if (filters.season) {
    const seasonQuery = filters.season.toLowerCase();
    list = list.filter(o => o.season === 'all-season' || o.season.toLowerCase() === seasonQuery);
  }

  if (filters.minPopularity) {
    list = list.filter(o => o.popularityScore >= filters.minPopularity!);
  }

  if (filters.searchQuery) {
    const sq = filters.searchQuery.toLowerCase().trim();
    list = list.filter(o => 
      o.title.toLowerCase().includes(sq) ||
      o.vibe.toLowerCase().includes(sq) ||
      o.aesthetic.toLowerCase().includes(sq) ||
      o.genZTrendTags.some(t => t.toLowerCase().includes(sq))
    );
  }

  return list;
}

// Filtered and Sorted search matching
export function searchFeed(dataset: ExtendedFashionOutfit[], query: string, limit: number = 50): ExtendedFashionOutfit[] {
  return filterFeed(dataset, { searchQuery: query }).slice(0, limit);
}

// Paginated feed retrieval with ranking options
export function getFeedPage(
  dataset: ExtendedFashionOutfit[],
  page: number,
  filters?: FeedFilters,
  config?: Partial<FeedConfig>
): FeedPage {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  
  // 1. Apply active base filters
  let processed = dataset;
  const appliedFilters: string[] = [];

  if (filters) {
    processed = filterFeed(dataset, filters);
    
    if (filters.gender) appliedFilters.push(`gender:${filters.gender}`);
    if (filters.season) appliedFilters.push(`season:${filters.season}`);
    if (filters.aesthetics && filters.aesthetics.length > 0) {
      appliedFilters.push(`aesthetics:${filters.aesthetics.join(',')}`);
    }
    if (filters.searchQuery) appliedFilters.push(`query:${filters.searchQuery}`);

    // Sort accordingly
    if (filters.sortBy) {
      appliedFilters.push(`sort:${filters.sortBy}`);
      if (filters.sortBy === 'trending') {
        processed = [...processed].sort((a, b) => b.trendVelocity - a.trendVelocity);
      } else if (filters.sortBy === 'popular') {
        processed = [...processed].sort((a, b) => b.popularityScore - a.popularityScore);
      } else if (filters.sortBy === 'newest') {
        processed = [...processed].sort((a, b) => b.saveRate - a.saveRate); // saveRate acts as recent velocity
      }
    }
  }

  // 2. Diversity pass
  processed = balanceDiversity(processed, cfg.maxSameAesthetic);

  // 3. Paginate
  const totalAvailable = processed.length;
  const startIndex = (page - 1) * cfg.pageSize;
  const endIndex = startIndex + cfg.pageSize;
  const items = processed.slice(startIndex, endIndex);
  const hasMore = endIndex < totalAvailable;

  return {
    items,
    page,
    hasMore,
    totalAvailable,
    appliedFilters,
  };
}
