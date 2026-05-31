import { ExtendedFashionOutfit, AestheticStyle } from '../types/fashion';

// ─── Interfaces ─────────────────────────────────────────────────────

export interface AestheticCluster {
  id: number;
  name: string;
  aesthetic: AestheticStyle;
  centroid: number[];
  outfitCount: number;
  avgPopularity: number;
  avgTrendVelocity: number;
  topColors: string[];
  topVibes: string[];
  relatedClusters: number[];
}

// ─── Constants ──────────────────────────────────────────────────────

const ALL_AESTHETICS: AestheticStyle[] = [
  'Minimal Luxury', 'Streetwear', 'Korean Casual', 'Old Money', 'Scandinavian Minimal',
  'Dark Academia', 'Clean Girl', 'Techwear', 'Coquette', 'Soft Girl', 'Y2K',
  'Futuristic Editorial', 'Cyber Minimal', 'Quiet Luxury', 'Pinterest Core',
  'TikTok Viral', 'Monochrome Minimal',
];

const AESTHETIC_INDEX: Record<string, number> = {};
ALL_AESTHETICS.forEach((a, i) => { AESTHETIC_INDEX[a] = i; });

const CLUSTER_RELATIONS: Record<string, string[]> = {
  'Minimal Luxury': ['Quiet Luxury', 'Scandinavian Minimal', 'Old Money', 'Monochrome Minimal'],
  'Streetwear': ['Techwear', 'Korean Casual', 'Y2K', 'TikTok Viral'],
  'Korean Casual': ['Streetwear', 'Clean Girl', 'Soft Girl', 'Y2K'],
  'Old Money': ['Minimal Luxury', 'Quiet Luxury', 'Dark Academia'],
  'Scandinavian Minimal': ['Minimal Luxury', 'Monochrome Minimal', 'Quiet Luxury'],
  'Dark Academia': ['Old Money', 'Coquette'],
  'Clean Girl': ['Soft Girl', 'Coquette', 'Pinterest Core', 'Minimal Luxury'],
  'Techwear': ['Streetwear', 'Cyber Minimal', 'Futuristic Editorial'],
  'Coquette': ['Soft Girl', 'Clean Girl', 'Pinterest Core'],
  'Soft Girl': ['Coquette', 'Clean Girl', 'Korean Casual'],
  'Y2K': ['Streetwear', 'Korean Casual', 'TikTok Viral'],
  'Futuristic Editorial': ['Techwear', 'Cyber Minimal'],
  'Cyber Minimal': ['Techwear', 'Futuristic Editorial', 'Monochrome Minimal'],
  'Quiet Luxury': ['Minimal Luxury', 'Old Money', 'Scandinavian Minimal'],
  'Pinterest Core': ['Clean Girl', 'Coquette', 'Soft Girl'],
  'TikTok Viral': ['Streetwear', 'Y2K', 'Korean Casual'],
  'Monochrome Minimal': ['Minimal Luxury', 'Scandinavian Minimal', 'Cyber Minimal'],
};

const ALL_COLORS = [
  '#FFFFFF', '#000000', '#F5F5F5', '#2C2C2C', '#1A1A1A', '#E8E8E8', '#808080',
  '#FF6B6B', '#FFB6C1', '#FFC0CB', '#FFE4E1', '#F8F8F8', '#E8D5C4', '#9B6B6B',
  '#F0F0F0', '#4A4A4A', '#C9B896', '#D4B5A0', '#1C1C1C', '#2F4F4F', '#8B4513',
  '#D4A574', '#3D3D3D', '#00FF00', '#FF00FF', '#FF1493', '#00FFFF', '#FFF5EE',
  '#0A0A0A',
];
const COLOR_INDEX: Record<string, number> = {};
ALL_COLORS.forEach((c, i) => { COLOR_INDEX[c] = i; });

const ALL_VIBES = [
  'Sophisticated', 'Timeless', 'Refined', 'Professional', 'Elegant', 'Chic',
  'Urban', 'Bold', 'Edgy', 'Trendy', 'Cool', 'Confident',
  'Cute', 'Youthful', 'Layered', 'Modern', 'Relaxed',
  'Classic', 'Understated', 'Natural', 'Fresh', 'Minimal', 'Effortless',
  'Functional', 'Futuristic', 'Athletic', 'Technical',
  'Feminine', 'Romantic', 'Delicate', 'Sweet', 'Soft', 'Premium', 'Elevated',
];
const VIBE_INDEX: Record<string, number> = {};
ALL_VIBES.forEach((v, i) => { VIBE_INDEX[v] = i; });

// ─── Feature Vector ─────────────────────────────────────────────────

export function outfitToFeatureVector(outfit: ExtendedFashionOutfit): number[] {
  const vector: number[] = [];

  // Aesthetic one-hot encoding (17 dimensions)
  const aestheticVec = new Array(ALL_AESTHETICS.length).fill(0);
  const aesIdx = AESTHETIC_INDEX[outfit.aesthetic];
  if (aesIdx !== undefined) aestheticVec[aesIdx] = 1;
  vector.push(...aestheticVec);

  // Color encoding (29 dimensions, multi-hot)
  const colorVec = new Array(ALL_COLORS.length).fill(0);
  for (const color of outfit.colors) {
    const cIdx = COLOR_INDEX[color];
    if (cIdx !== undefined) colorVec[cIdx] = 1;
  }
  vector.push(...colorVec);

  // Vibe encoding (34 dimensions)
  const vibeVec = new Array(ALL_VIBES.length).fill(0);
  const vibeIdx = VIBE_INDEX[outfit.vibe];
  if (vibeIdx !== undefined) vibeVec[vibeIdx] = 1;
  // Also encode mood tags that match vibes
  for (const tag of outfit.moodTags) {
    const tagIdx = VIBE_INDEX[tag.charAt(0).toUpperCase() + tag.slice(1)];
    if (tagIdx !== undefined) vibeVec[tagIdx] = 0.5;
  }
  vector.push(...vibeVec);

  // Numeric features (6 dimensions, normalized 0-1)
  vector.push(outfit.popularityScore / 100);
  vector.push(outfit.trendVelocity / 100);
  vector.push(outfit.engagementScore / 100);
  vector.push(outfit.saveRate);
  vector.push(outfit.recommendationWeight);
  vector.push(outfit.personalizationMeta?.styleComplexity ?? 5);

  // Gender encoding (3 dimensions)
  vector.push(outfit.gender === 'male' ? 1 : 0);
  vector.push(outfit.gender === 'female' ? 1 : 0);
  vector.push(outfit.gender === 'unisex' ? 1 : 0);

  // Season encoding (5 dimensions)
  const seasons = ['spring', 'summer', 'fall', 'winter', 'all-season'];
  for (const s of seasons) {
    vector.push(outfit.season === s ? 1 : 0);
  }

  return vector;
}

// ─── Cosine Similarity ──────────────────────────────────────────────

export function cosineSimilarity(a: number[], b: number[]): number {
  const len = Math.min(a.length, b.length);
  let dotProduct = 0;
  let magA = 0;
  let magB = 0;

  for (let i = 0; i < len; i++) {
    dotProduct += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }

  const magnitude = Math.sqrt(magA) * Math.sqrt(magB);
  return magnitude > 0 ? dotProduct / magnitude : 0;
}

// ─── Cluster Outfits ────────────────────────────────────────────────

export function clusterOutfits(outfits: ExtendedFashionOutfit[]): AestheticCluster[] {
  // Group outfits by aesthetic to form natural clusters
  const groups: Record<string, ExtendedFashionOutfit[]> = {};
  for (const outfit of outfits) {
    const key = outfit.aesthetic;
    if (!groups[key]) groups[key] = [];
    groups[key].push(outfit);
  }

  const clusters: AestheticCluster[] = [];
  let clusterId = 0;

  for (const [aesthetic, groupOutfits] of Object.entries(groups)) {
    // Compute centroid by averaging feature vectors
    const vectors = groupOutfits.map(outfitToFeatureVector);
    const dims = vectors[0].length;
    const centroid = new Array(dims).fill(0);
    for (const v of vectors) {
      for (let d = 0; d < dims; d++) {
        centroid[d] += v[d];
      }
    }
    for (let d = 0; d < dims; d++) {
      centroid[d] /= vectors.length;
    }

    // Aggregate metrics
    const avgPopularity = groupOutfits.reduce((s, o) => s + o.popularityScore, 0) / groupOutfits.length;
    const avgTrendVelocity = groupOutfits.reduce((s, o) => s + o.trendVelocity, 0) / groupOutfits.length;

    // Top colors by frequency
    const colorFreq: Record<string, number> = {};
    for (const o of groupOutfits) {
      for (const c of o.colors) {
        colorFreq[c] = (colorFreq[c] || 0) + 1;
      }
    }
    const topColors = Object.entries(colorFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([color]) => color);

    // Top vibes by frequency
    const vibeFreq: Record<string, number> = {};
    for (const o of groupOutfits) {
      vibeFreq[o.vibe] = (vibeFreq[o.vibe] || 0) + 1;
      for (const tag of o.moodTags) {
        vibeFreq[tag] = (vibeFreq[tag] || 0) + 0.5;
      }
    }
    const topVibes = Object.entries(vibeFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([vibe]) => vibe);

    // Related clusters from known relations
    const relatedAesthetics = CLUSTER_RELATIONS[aesthetic] || [];
    const relatedClusterIds: number[] = [];
    for (const ra of relatedAesthetics) {
      const relIdx = Object.keys(groups).indexOf(ra);
      if (relIdx >= 0) relatedClusterIds.push(relIdx);
    }

    clusters.push({
      id: clusterId,
      name: `${aesthetic} Cluster`,
      aesthetic: aesthetic as AestheticStyle,
      centroid,
      outfitCount: groupOutfits.length,
      avgPopularity,
      avgTrendVelocity,
      topColors,
      topVibes,
      relatedClusters: relatedClusterIds,
    });

    clusterId++;
  }

  return clusters;
}

// ─── Find Similar Outfits ───────────────────────────────────────────

export function findSimilarOutfits(
  outfit: ExtendedFashionOutfit,
  dataset: ExtendedFashionOutfit[],
  count: number = 10
): ExtendedFashionOutfit[] {
  const targetVector = outfitToFeatureVector(outfit);

  const scored = dataset
    .filter(o => o.id !== outfit.id)
    .map(candidate => {
      const candidateVector = outfitToFeatureVector(candidate);
      const similarity = cosineSimilarity(targetVector, candidateVector);
      return { outfit: candidate, similarity };
    });

  return scored
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, count)
    .map(s => s.outfit);
}

// ─── Get Cluster Recommendations ────────────────────────────────────

export function getClusterRecommendations(
  clusterId: number,
  dataset: ExtendedFashionOutfit[],
  count: number = 15
): ExtendedFashionOutfit[] {
  // Build clusters to find target cluster
  const clusters = clusterOutfits(dataset);
  const targetCluster = clusters.find(c => c.id === clusterId);

  if (!targetCluster) return dataset.slice(0, count);

  // Filter outfits in this cluster and rank by engagement + trend velocity
  return dataset
    .filter(o => o.aesthetic === targetCluster.aesthetic)
    .sort((a, b) => {
      const scoreA = a.engagementScore * 0.5 + a.trendVelocity * 0.3 + a.popularityScore * 0.2;
      const scoreB = b.engagementScore * 0.5 + b.trendVelocity * 0.3 + b.popularityScore * 0.2;
      return scoreB - scoreA;
    })
    .slice(0, count);
}

// ─── Cross-Cluster Exploration ──────────────────────────────────────

export function exploreCrossCluster(
  currentCluster: number,
  dataset: ExtendedFashionOutfit[],
  count: number = 10
): ExtendedFashionOutfit[] {
  const clusters = clusterOutfits(dataset);
  const current = clusters.find(c => c.id === currentCluster);

  if (!current) return dataset.slice(0, count);

  // Get related cluster aesthetics
  const relatedAesthetics = new Set<AestheticStyle>();
  for (const relatedId of current.relatedClusters) {
    const related = clusters.find(c => c.id === relatedId);
    if (related) relatedAesthetics.add(related.aesthetic);
  }

  // Fallback: use CLUSTER_RELATIONS
  if (relatedAesthetics.size === 0) {
    const relations = CLUSTER_RELATIONS[current.aesthetic] || [];
    for (const r of relations) {
      relatedAesthetics.add(r as AestheticStyle);
    }
  }

  // Get top outfits from related clusters, excluding current aesthetic
  const crossClusterOutfits = dataset
    .filter(o => relatedAesthetics.has(o.aesthetic) && o.aesthetic !== current.aesthetic)
    .sort((a, b) => {
      // Rank by similarity to current cluster centroid + popularity
      const aVec = outfitToFeatureVector(a);
      const bVec = outfitToFeatureVector(b);
      const aSim = cosineSimilarity(current.centroid, aVec);
      const bSim = cosineSimilarity(current.centroid, bVec);
      const aScore = aSim * 0.6 + (a.popularityScore / 100) * 0.4;
      const bScore = bSim * 0.6 + (b.popularityScore / 100) * 0.4;
      return bScore - aScore;
    })
    .slice(0, count);

  // Ensure aesthetic diversity in cross-cluster results
  const seenAesthetics: Record<string, number> = {};
  const diversified: ExtendedFashionOutfit[] = [];
  const maxPerAesthetic = Math.ceil(count / Math.max(1, relatedAesthetics.size));

  for (const outfit of crossClusterOutfits) {
    const aes = outfit.aesthetic;
    const seen = seenAesthetics[aes] || 0;
    if (seen >= maxPerAesthetic) continue;
    seenAesthetics[aes] = seen + 1;
    diversified.push(outfit);
    if (diversified.length >= count) break;
  }

  return diversified;
}
