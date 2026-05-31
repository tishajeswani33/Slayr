import { FashionOutfit, ExtendedFashionOutfit, AestheticStyle, Season } from '../types/fashion';
import { TrendRadarData } from '../types/aiTypes';

// ─── Interfaces ─────────────────────────────────────────────────────

export interface TrendSignal {
  aesthetic: AestheticStyle;
  trendVelocity: number;
  currentPopularity: number;
  projectedGrowth: number;
  viralScore: number;
  engagementRate: number;
  saveRate: number;
  isRising: boolean;
  weekOverWeekChange: number;
  seasonalFactor: number;
  platformBreakdown: { platform: string; score: number }[];
}

export interface TrendPrediction {
  aesthetic: AestheticStyle;
  status: 'emerging' | 'trending' | 'peak' | 'declining';
  confidence: number;
  timeToPeak: string;
  relatedTrends: AestheticStyle[];
  riskLevel: 'low' | 'medium' | 'high';
  investmentScore: number;
}

// ─── Constants ──────────────────────────────────────────────────────

const AESTHETIC_RELATIONS: Record<string, AestheticStyle[]> = {
  'Minimal Luxury': ['Scandinavian Minimal', 'Old Money', 'Clean Girl', 'Quiet Luxury', 'Monochrome Minimal'],
  'Streetwear': ['Techwear', 'Korean Casual', 'Y2K', 'TikTok Viral'],
  'Clean Girl': ['Minimal Luxury', 'Coquette', 'Soft Girl', 'Pinterest Core'],
  'Korean Casual': ['Streetwear', 'Y2K', 'Clean Girl', 'Soft Girl'],
  'Coquette': ['Soft Girl', 'Clean Girl', 'Dark Academia', 'Pinterest Core'],
  'Old Money': ['Minimal Luxury', 'Quiet Luxury', 'Scandinavian Minimal', 'Dark Academia'],
  'Dark Academia': ['Old Money', 'Coquette', 'Scandinavian Minimal'],
  'Y2K': ['Streetwear', 'Korean Casual', 'TikTok Viral', 'Coquette'],
  'Techwear': ['Streetwear', 'Cyber Minimal', 'Futuristic Editorial'],
  'Scandinavian Minimal': ['Minimal Luxury', 'Old Money', 'Monochrome Minimal', 'Quiet Luxury'],
  'Soft Girl': ['Coquette', 'Clean Girl', 'Korean Casual', 'Pinterest Core'],
  'Futuristic Editorial': ['Techwear', 'Cyber Minimal', 'Monochrome Minimal'],
  'Cyber Minimal': ['Techwear', 'Futuristic Editorial', 'Monochrome Minimal'],
  'Quiet Luxury': ['Minimal Luxury', 'Old Money', 'Scandinavian Minimal'],
  'Pinterest Core': ['Clean Girl', 'Coquette', 'Soft Girl', 'Quiet Luxury'],
  'TikTok Viral': ['Streetwear', 'Y2K', 'Korean Casual', 'Coquette'],
  'Monochrome Minimal': ['Minimal Luxury', 'Scandinavian Minimal', 'Cyber Minimal', 'Quiet Luxury'],
};

const SEASONAL_BOOST: Record<string, Record<string, number>> = {
  spring: {
    'Clean Girl': 1.3, 'Coquette': 1.25, 'Soft Girl': 1.2,
    'Korean Casual': 1.1, 'Pinterest Core': 1.2, 'Old Money': 1.0,
  },
  summer: {
    'Clean Girl': 1.4, 'Streetwear': 1.15, 'Y2K': 1.3,
    'Coquette': 1.2, 'TikTok Viral': 1.3, 'Soft Girl': 1.1,
  },
  fall: {
    'Dark Academia': 1.4, 'Old Money': 1.3, 'Korean Casual': 1.2,
    'Quiet Luxury': 1.25, 'Minimal Luxury': 1.15, 'Scandinavian Minimal': 1.1,
  },
  winter: {
    'Scandinavian Minimal': 1.3, 'Dark Academia': 1.25, 'Techwear': 1.2,
    'Old Money': 1.2, 'Quiet Luxury': 1.3, 'Monochrome Minimal': 1.15,
  },
};

const PLATFORM_WEIGHTS: Record<string, Record<string, number>> = {
  'Streetwear': { TikTok: 0.9, Instagram: 0.7, Pinterest: 0.4, YouTube: 0.6 },
  'Clean Girl': { TikTok: 0.85, Instagram: 0.9, Pinterest: 0.8, YouTube: 0.5 },
  'Coquette': { TikTok: 0.95, Instagram: 0.7, Pinterest: 0.85, YouTube: 0.4 },
  'Old Money': { TikTok: 0.7, Instagram: 0.85, Pinterest: 0.75, YouTube: 0.65 },
  'Korean Casual': { TikTok: 0.8, Instagram: 0.75, Pinterest: 0.6, YouTube: 0.7 },
  'Dark Academia': { TikTok: 0.6, Instagram: 0.7, Pinterest: 0.9, YouTube: 0.5 },
  'Y2K': { TikTok: 0.9, Instagram: 0.65, Pinterest: 0.7, YouTube: 0.55 },
  'Techwear': { TikTok: 0.5, Instagram: 0.6, Pinterest: 0.4, YouTube: 0.8 },
  'Minimal Luxury': { TikTok: 0.5, Instagram: 0.9, Pinterest: 0.7, YouTube: 0.6 },
  'Scandinavian Minimal': { TikTok: 0.4, Instagram: 0.8, Pinterest: 0.85, YouTube: 0.5 },
  'Soft Girl': { TikTok: 0.85, Instagram: 0.75, Pinterest: 0.8, YouTube: 0.4 },
  'Futuristic Editorial': { TikTok: 0.5, Instagram: 0.85, Pinterest: 0.6, YouTube: 0.7 },
  'Cyber Minimal': { TikTok: 0.55, Instagram: 0.7, Pinterest: 0.5, YouTube: 0.65 },
  'Quiet Luxury': { TikTok: 0.65, Instagram: 0.9, Pinterest: 0.8, YouTube: 0.55 },
  'Pinterest Core': { TikTok: 0.6, Instagram: 0.8, Pinterest: 0.95, YouTube: 0.4 },
  'TikTok Viral': { TikTok: 0.98, Instagram: 0.6, Pinterest: 0.5, YouTube: 0.7 },
  'Monochrome Minimal': { TikTok: 0.5, Instagram: 0.85, Pinterest: 0.75, YouTube: 0.5 },
};

// ─── Helper: seeded pseudo-random for deterministic scores ──────────
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// ─── Helper: get current season ─────────────────────────────────────
function getCurrentSeason(): string {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  return 'winter';
}

// ─── Core: group outfits by aesthetic ───────────────────────────────
function groupByAesthetic(dataset: (FashionOutfit | ExtendedFashionOutfit)[]): Record<string, (FashionOutfit | ExtendedFashionOutfit)[]> {
  return dataset.reduce((groups, outfit) => {
    const key = outfit.aesthetic;
    if (!groups[key]) groups[key] = [];
    groups[key].push(outfit);
    return groups;
  }, {} as Record<string, (FashionOutfit | ExtendedFashionOutfit)[]>);
}

// ─── Extract extended metrics safely ────────────────────────────────
function getExtendedMetrics(outfit: FashionOutfit | ExtendedFashionOutfit) {
  const ext = outfit as Partial<ExtendedFashionOutfit>;
  return {
    trendVelocity: ext.trendVelocity ?? outfit.popularityScore * 0.8,
    engagementScore: ext.engagementScore ?? outfit.popularityScore * 0.7,
    saveRate: ext.saveRate ?? outfit.recommendationWeight * 0.6,
  };
}

// ─── Calculate Trend Velocity ───────────────────────────────────────

export function calculateTrendVelocity(
  currentPopularity: number,
  previousPopularity: number,
  timeframe: number = 7
): number {
  const change = currentPopularity - previousPopularity;
  const velocity = (change / timeframe) * 100;
  return Math.max(0, Math.min(100, velocity + 50));
}

// ─── Detect Trending Aesthetics ─────────────────────────────────────

export function detectTrendingAesthetics(dataset: (FashionOutfit | ExtendedFashionOutfit)[]): TrendSignal[] {
  const aestheticGroups = groupByAesthetic(dataset);
  const signals: TrendSignal[] = [];
  const currentSeason = getCurrentSeason();

  for (const [aesthetic, outfits] of Object.entries(aestheticGroups)) {
    const avgPopularity = outfits.reduce((sum, o) => sum + o.popularityScore, 0) / outfits.length;

    // Aggregate extended metrics
    const extMetrics = outfits.map(getExtendedMetrics);
    const avgTrendVelocity = extMetrics.reduce((s, m) => s + m.trendVelocity, 0) / extMetrics.length;
    const avgEngagement = extMetrics.reduce((s, m) => s + m.engagementScore, 0) / extMetrics.length;
    const avgSaveRate = extMetrics.reduce((s, m) => s + m.saveRate, 0) / extMetrics.length;

    // Viral tag counting
    const viralCount = outfits.filter(o =>
      o.moodTags.some(tag => ['viral', 'tiktok-approved', 'trending'].includes(tag))
    ).length;
    const viralScore = Math.min(100, (viralCount / outfits.length) * 100 + avgPopularity * 0.2);

    // Compute trend velocity blending extended data with popularity
    const normalizedVelocity = Math.min(100, avgTrendVelocity * 0.6 + avgPopularity * 0.4);

    // Seasonal factor
    const seasonBoosts = SEASONAL_BOOST[currentSeason] || {};
    const seasonalFactor = seasonBoosts[aesthetic] ?? 1.0;

    // Week-over-week simulated from deterministic seed
    const seed = aesthetic.charCodeAt(0) + aesthetic.charCodeAt(aesthetic.length - 1);
    const weekOverWeekChange = (seededRandom(seed) * 30 - 10) * seasonalFactor;

    // Platform breakdown
    const platformWeights = PLATFORM_WEIGHTS[aesthetic] || { TikTok: 0.5, Instagram: 0.5, Pinterest: 0.5, YouTube: 0.5 };
    const platformBreakdown = Object.entries(platformWeights).map(([platform, baseScore]) => ({
      platform,
      score: Math.min(100, baseScore * avgPopularity * seasonalFactor),
    }));

    // Engagement rate normalized 0-1
    const engagementRate = Math.min(1, avgEngagement / 100);
    const saveRate = Math.min(1, avgSaveRate);

    // Projected growth based on velocity, virality, and season
    const projectedGrowth = normalizedVelocity > 70
      ? (seededRandom(seed + 1) * 25 + 15) * seasonalFactor
      : (seededRandom(seed + 2) * 15 + 5) * seasonalFactor;

    signals.push({
      aesthetic: aesthetic as AestheticStyle,
      trendVelocity: normalizedVelocity,
      currentPopularity: avgPopularity,
      projectedGrowth,
      viralScore,
      engagementRate,
      saveRate,
      isRising: normalizedVelocity > 55 && weekOverWeekChange > 0,
      weekOverWeekChange,
      seasonalFactor,
      platformBreakdown,
    });
  }

  return signals.sort((a, b) => b.trendVelocity - a.trendVelocity);
}

// ─── Predict Trend Status ───────────────────────────────────────────

export function predictTrendStatus(signal: TrendSignal): TrendPrediction {
  let status: TrendPrediction['status'];
  let timeToPeak: string;
  let riskLevel: TrendPrediction['riskLevel'];

  if (signal.trendVelocity > 80 && signal.currentPopularity < 55) {
    status = 'emerging';
    timeToPeak = '2-4 weeks';
    riskLevel = 'high';
  } else if (signal.trendVelocity > 60 && signal.currentPopularity >= 55 && signal.currentPopularity < 80) {
    status = 'trending';
    timeToPeak = '1-2 weeks';
    riskLevel = 'low';
  } else if (signal.currentPopularity >= 80 && signal.trendVelocity > 40) {
    status = 'peak';
    timeToPeak = 'now';
    riskLevel = 'medium';
  } else {
    status = 'declining';
    timeToPeak = 'past peak';
    riskLevel = 'high';
  }

  // Confidence blends velocity, popularity, virality, and engagement
  const rawConfidence =
    signal.viralScore * 0.25 +
    signal.trendVelocity * 0.3 +
    signal.currentPopularity * 0.25 +
    signal.engagementRate * 20;
  const confidence = Math.min(98, Math.max(15, rawConfidence));

  // Investment score: how safe is it to invest in this aesthetic now
  const stabilityPenalty = status === 'declining' ? 0.4 : status === 'peak' ? 0.7 : 1.0;
  const investmentScore = Math.min(100, (confidence * 0.6 + signal.projectedGrowth * 0.4) * stabilityPenalty);

  const relatedTrends = AESTHETIC_RELATIONS[signal.aesthetic] || [];

  return {
    aesthetic: signal.aesthetic,
    status,
    confidence,
    timeToPeak,
    relatedTrends,
    riskLevel,
    investmentScore,
  };
}

// ─── Get Rising Trends ──────────────────────────────────────────────

export function getRisingTrends(signals: TrendSignal[]): TrendSignal[] {
  return signals
    .filter(s => s.isRising && s.currentPopularity < 75)
    .sort((a, b) => b.trendVelocity - a.trendVelocity)
    .slice(0, 5);
}

// ─── Get Viral Aesthetics ───────────────────────────────────────────

export function getViralAesthetics(signals: TrendSignal[]): TrendSignal[] {
  return signals
    .filter(s => s.viralScore > 50 && s.engagementRate > 0.4)
    .sort((a, b) => b.viralScore - a.viralScore)
    .slice(0, 10);
}

// ─── Generate Trend Radar Data ──────────────────────────────────────

export function generateTrendRadarData(dataset: ExtendedFashionOutfit[]): TrendRadarData[] {
  const signals = detectTrendingAesthetics(dataset);

  return signals.map(signal => {
    const prediction = predictTrendStatus(signal);

    return {
      aesthetic: signal.aesthetic,
      velocity: signal.trendVelocity,
      popularity: signal.currentPopularity,
      growth: signal.weekOverWeekChange,
      status: prediction.status,
      viralScore: signal.viralScore,
      engagementRate: signal.engagementRate,
      saveRate: signal.saveRate,
      confidence: 85 + Math.floor(Math.random() * 10),
      relatedTrends: (prediction.relatedTrends || []).map(t => String(t)),
      trendingColors: ['#FFFFFF', '#000000', '#C9B896'],
      topOutfits: dataset.filter(o => o.aesthetic === signal.aesthetic).slice(0, 3),
    };
  });
}

// ─── Cross-Aesthetic Correlation ────────────────────────────────────

export function crossAestheticCorrelation(
  aestheticA: AestheticStyle,
  aestheticB: AestheticStyle
): number {
  if (aestheticA === aestheticB) return 1.0;

  const relatedA = AESTHETIC_RELATIONS[aestheticA] || [];
  const relatedB = AESTHETIC_RELATIONS[aestheticB] || [];

  // Direct relation check
  const directlyRelated = relatedA.includes(aestheticB) || relatedB.includes(aestheticA);
  if (directlyRelated) {
    // Weighted by position in relation list (earlier = stronger)
    const posInA = relatedA.indexOf(aestheticB);
    const posInB = relatedB.indexOf(aestheticA);
    const bestPos = posInA >= 0 && posInB >= 0 ? Math.min(posInA, posInB) : Math.max(posInA, posInB);
    return Math.max(0.4, 0.9 - bestPos * 0.1);
  }

  // Indirect relation: shared neighbors
  const sharedNeighbors = relatedA.filter(a => relatedB.includes(a));
  if (sharedNeighbors.length > 0) {
    return Math.min(0.5, sharedNeighbors.length * 0.12);
  }

  // Platform similarity fallback
  const platformA = PLATFORM_WEIGHTS[aestheticA] || {};
  const platformB = PLATFORM_WEIGHTS[aestheticB] || {};
  const platforms = new Set([...Object.keys(platformA), ...Object.keys(platformB)]);
  let dotProduct = 0;
  let magA = 0;
  let magB = 0;
  for (const p of platforms) {
    const a = platformA[p] ?? 0;
    const b = platformB[p] ?? 0;
    dotProduct += a * b;
    magA += a * a;
    magB += b * b;
  }

  const mag = Math.sqrt(magA) * Math.sqrt(magB);
  return mag > 0 ? dotProduct / mag * 0.4 : 0.05;
}

// ─── Get Seasonal Trends ────────────────────────────────────────────

export function getSeasonalTrends(season: string): TrendSignal[] {
  const boosts = SEASONAL_BOOST[season.toLowerCase()] || {};
  const allAesthetics = Object.keys(AESTHETIC_RELATIONS) as AestheticStyle[];

  return allAesthetics
    .map(aesthetic => {
      const seasonalFactor = boosts[aesthetic] ?? 1.0;
      const seed = aesthetic.charCodeAt(0) + season.charCodeAt(0);
      const basePopularity = seededRandom(seed) * 40 + 40;
      const velocity = seededRandom(seed + 10) * 50 + 25;
      const boostedVelocity = velocity * seasonalFactor;

      const platformWeights = PLATFORM_WEIGHTS[aesthetic] || {};
      const platformBreakdown = Object.entries(platformWeights).map(([platform, score]) => ({
        platform,
        score: Math.min(100, score * basePopularity * seasonalFactor),
      }));

      return {
        aesthetic,
        trendVelocity: Math.min(100, boostedVelocity),
        currentPopularity: basePopularity * seasonalFactor,
        projectedGrowth: (seededRandom(seed + 20) * 20 + 5) * seasonalFactor,
        viralScore: seededRandom(seed + 30) * 60 + 20,
        engagementRate: Math.min(1, seededRandom(seed + 40) * 0.5 + 0.3),
        saveRate: Math.min(1, seededRandom(seed + 50) * 0.4 + 0.2),
        isRising: boostedVelocity > 55,
        weekOverWeekChange: (seededRandom(seed + 60) * 20 - 5) * seasonalFactor,
        seasonalFactor,
        platformBreakdown,
      } as TrendSignal;
    })
    .sort((a, b) => b.trendVelocity - a.trendVelocity);
}

// ─── Get Trend Timeline ─────────────────────────────────────────────

export function getTrendTimeline(aesthetic: AestheticStyle): { week: string; score: number }[] {
  const timeline: { week: string; score: number }[] = [];
  const seed = aesthetic.split('').reduce((s, c) => s + c.charCodeAt(0), 0);
  const seasons: Season[] = ['spring', 'summer', 'fall', 'winter'];

  // Generate 12-week timeline
  for (let w = 0; w < 12; w++) {
    const weekDate = new Date();
    weekDate.setDate(weekDate.getDate() - (11 - w) * 7);

    const seasonIndex = Math.floor(((weekDate.getMonth() + 10) % 12) / 3);
    const currentSeason = seasons[seasonIndex];
    const seasonBoosts = SEASONAL_BOOST[currentSeason] || {};
    const seasonalMultiplier = seasonBoosts[aesthetic] ?? 1.0;

    // Base trend curve: sine wave with growth
    const baseScore = 50 + Math.sin((w + seed % 6) * 0.6) * 20;
    const growthTrend = w * 1.5;
    const noise = seededRandom(seed + w * 7) * 10 - 5;

    const score = Math.max(10, Math.min(100, (baseScore + growthTrend + noise) * seasonalMultiplier));

    const weekLabel = `W${w + 1} (${weekDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`;
    timeline.push({ week: weekLabel, score: Math.round(score * 10) / 10 });
  }

  return timeline;
}
