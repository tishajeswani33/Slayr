import { ExtendedFashionOutfit, AestheticStyle, Gender } from '../types/fashion';
import { generateMaleDataset } from '../data/genzMaleFashionDataset';
import { generateFemaleDataset } from '../data/genzFemaleFashionDataset';

export interface DatasetFilters {
  aesthetics?: AestheticStyle[];
  gender?: Gender;
  season?: string;
  budgetTier?: string;
  searchQuery?: string;
}

// Memory Cache with TTL
const datasetCache = new Map<string, { data: ExtendedFashionOutfit[]; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCachedData<T>(key: string, generator: () => T[]): T[] {
  const cached = datasetCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T[];
  }

  const generated = generator();
  datasetCache.set(key, { data: generated as any, timestamp: Date.now() });
  return generated;
}

export function clearDatasetCache(): void {
  datasetCache.clear();
}

// Generate/Retrieve Male dataset
export function getMaleDataset(count: number = 50000): ExtendedFashionOutfit[] {
  return getCachedData(`male_${count}`, () => generateMaleDataset(count));
}

// Generate/Retrieve Female dataset
export function getFemaleDataset(count: number = 50000): ExtendedFashionOutfit[] {
  return getCachedData(`female_${count}`, () => generateFemaleDataset(count));
}

// Get full 100K+ combined dataset
export function getFullDataset(count: number = 100000): ExtendedFashionOutfit[] {
  const halfCount = Math.floor(count / 2);
  return getCachedData(`full_${count}`, () => {
    const male = getMaleDataset(halfCount);
    const female = getFemaleDataset(halfCount);
    return [...male, ...female];
  });
}

// Filter dataset by gender
export function getDatasetByGender(gender: Gender, count: number = 50000): ExtendedFashionOutfit[] {
  if (gender === 'male') return getMaleDataset(count);
  if (gender === 'female') return getFemaleDataset(count);
  return getFullDataset(count).filter(o => o.gender === 'unisex');
}

// Filter dataset by aesthetic
export function getDatasetByAesthetic(aesthetic: AestheticStyle, count: number = 10000): ExtendedFashionOutfit[] {
  const full = getFullDataset(100000);
  return full.filter(o => o.aesthetic === aesthetic).slice(0, count);
}

// Basic query search across title, vibe, tags and aesthetic
export function searchDataset(query: string, limit: number = 50): ExtendedFashionOutfit[] {
  const full = getFullDataset(50000); // search over a representative 50k subset for performance
  const cleanQuery = query.toLowerCase().trim();
  
  if (!cleanQuery) return full.slice(0, limit);

  return full
    .filter(o => 
      o.title.toLowerCase().includes(cleanQuery) ||
      o.vibe.toLowerCase().includes(cleanQuery) ||
      o.aesthetic.toLowerCase().includes(cleanQuery) ||
      o.clothingItems.some(i => i.toLowerCase().includes(cleanQuery)) ||
      o.genZTrendTags.some(t => t.toLowerCase().includes(cleanQuery))
    )
    .slice(0, limit);
}

// Get paginated dataset with optional multi-factor filters
export function getDatasetPage(
  page: number,
  pageSize: number,
  filters?: DatasetFilters
): { data: ExtendedFashionOutfit[]; total: number; hasMore: boolean } {
  let list = getFullDataset(50000); // paginated subset for responsive browser interactions
  
  if (filters) {
    if (filters.gender) {
      list = list.filter(o => o.gender === filters.gender || o.gender === 'unisex');
    }
    if (filters.aesthetics && filters.aesthetics.length > 0) {
      const aestheticSet = new Set(filters.aesthetics);
      list = list.filter(o => aestheticSet.has(o.aesthetic));
    }
    if (filters.season) {
      const cleanSeason = filters.season.toLowerCase();
      list = list.filter(o => o.season === 'all-season' || o.season.toLowerCase() === cleanSeason);
    }
    if (filters.budgetTier) {
      list = list.filter(o => o.personalizationMeta?.budgetTier === filters.budgetTier);
    }
    if (filters.searchQuery) {
      const cleanSearch = filters.searchQuery.toLowerCase().trim();
      list = list.filter(o => 
        o.title.toLowerCase().includes(cleanSearch) ||
        o.vibe.toLowerCase().includes(cleanSearch) ||
        o.aesthetic.toLowerCase().includes(cleanSearch) ||
        o.genZTrendTags.some(t => t.toLowerCase().includes(cleanSearch))
      );
    }
  }

  const total = list.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const data = list.slice(startIndex, endIndex);
  const hasMore = endIndex < total;

  return {
    data,
    total,
    hasMore
  };
}
