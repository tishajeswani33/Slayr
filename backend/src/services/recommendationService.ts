import { prisma } from '../config/db.js';

const COMPATIBLE_AESTHETICS: Record<string, string[]> = {
  'Minimal Luxury': ['Quiet Luxury', 'Scandinavian Minimal', 'Old Money', 'Monochrome Minimal'],
  'Streetwear': ['Techwear', 'Korean Casual', 'Y2K', 'TikTok Viral'],
  'Korean Casual': ['Streetwear', 'Y2K', 'Clean Girl'],
  'Old Money': ['Minimal Luxury', 'Quiet Luxury', 'Dark Academia'],
  'Scandinavian Minimal': ['Minimal Luxury', 'Old Money', 'Monochrome Minimal'],
  'Dark Academia': ['Old Money', 'Scandinavian Minimal'],
  'Clean Girl': ['Minimal Luxury', 'Quiet Luxury', 'Scandinavian Minimal'],
  'Techwear': ['Streetwear', 'Cyber Minimal', 'Futuristic Editorial'],
  'Coquette': ['Soft Girl', 'Clean Girl'],
  'Soft Girl': ['Coquette', 'Clean Girl', 'Korean Casual'],
  'Y2K': ['Streetwear', 'TikTok Viral'],
  'Futuristic Editorial': ['Techwear', 'Cyber Minimal'],
  'Cyber Minimal': ['Techwear', 'Futuristic Editorial'],
  'Quiet Luxury': ['Minimal Luxury', 'Old Money', 'Scandinavian Minimal'],
  'Pinterest Core': ['Clean Girl', 'Coquette'],
  'TikTok Viral': ['Streetwear', 'Y2K'],
  'Monochrome Minimal': ['Minimal Luxury', 'Scandinavian Minimal', 'Cyber Minimal'],
};

export interface UserPreferences {
  dominantAesthetic: string;
  preferredColors: string[];
  vibeWeights: Record<string, number>;
}

export async function generatePersonalizedFeed(
  userId: string,
  limit: number = 20,
  offset: number = 0
) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { stylePreferences: true },
  });

  if (!user) {
    return await prisma.outfit.findMany({
      orderBy: [
        { engagementScore: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit,
      skip: offset,
      include: { user: true },
    });
  }

  const dna = user.stylePreferences;
  const dominant = user.dominantAesthetic || 'Minimal Luxury';
  const compatibles = COMPATIBLE_AESTHETICS[dominant] || [dominant];

  const outfits = await prisma.outfit.findMany({
    include: { user: true },
    take: limit * 2,
  });

  const ranked = outfits.map((outfit) => {
    let score = 0;

    if (outfit.aesthetic === dominant) {
      score += 50;
    } else if (compatibles.includes(outfit.aesthetic)) {
      score += 30;
    }

    if (dna) {
      try {
        const affinities = dna.colorAffinities as Array<{ color: string; affinity: number }>;
        const outfitColors = (outfit.colorPalette as Array<{ hex: string }>).map((c) => c.hex);
        
        affinities.forEach((aff) => {
          if (outfitColors.includes(aff.color)) {
            score += aff.affinity * 10;
          }
        });
      } catch {}
    }

    score += outfit.score * 0.2;
    score += outfit.engagementScore * 5;
    score += outfit.likesCount * 0.1;

    return { outfit, rankScore: score };
  });

  return ranked
    .sort((a, b) => b.rankScore - a.rankScore)
    .slice(offset, offset + limit)
    .map((r) => r.outfit);
}

export async function recalculateStyleDNA(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { outfits: true },
  });

  if (!user || user.outfits.length === 0) return null;

  const outfits = user.outfits;
  const aestheticCounts: Record<string, number> = {};
  const colorCounts: Record<string, number> = {};

  outfits.forEach((outfit) => {
    aestheticCounts[outfit.aesthetic] = (aestheticCounts[outfit.aesthetic] || 0) + 1;

    try {
      const colors = outfit.colorPalette as Array<{ hex: string }>;
      colors.forEach((c) => {
        colorCounts[c.hex] = (colorCounts[c.hex] || 0) + 1;
      });
    } catch {}
  });

  const totalOutfits = outfits.length;
  const percentages = Object.entries(aestheticCounts).map(([aesthetic, count]) => ({
    aesthetic,
    percentage: Math.round((count / totalOutfits) * 100),
  })).sort((a, b) => b.percentage - a.percentage);

  const dominantAesthetic = percentages[0]?.aesthetic || 'Minimal Luxury';

  const colorAffinities = Object.entries(colorCounts).map(([color, count]) => ({
    color,
    affinity: Math.min(10, Math.round((count / totalOutfits) * 100)),
  })).sort((a, b) => b.affinity - a.affinity).slice(0, 5);

  const radarDimensions = [
    { dimension: 'Minimal', value: aestheticCounts['Minimal Luxury'] || aestheticCounts['Quiet Luxury'] || aestheticCounts['Scandinavian Minimal'] ? 80 : 40 },
    { dimension: 'Bold', value: aestheticCounts['Streetwear'] || aestheticCounts['Y2K'] ? 85 : 45 },
    { dimension: 'Classic', value: aestheticCounts['Old Money'] || aestheticCounts['Dark Academia'] ? 90 : 50 },
    { dimension: 'Trendy', value: aestheticCounts['TikTok Viral'] || aestheticCounts['Pinterest Core'] ? 75 : 55 },
    { dimension: 'Edgy', value: aestheticCounts['Techwear'] || aestheticCounts['Cyber Minimal'] || aestheticCounts['Futuristic Editorial'] ? 85 : 35 },
    { dimension: 'Romantic', value: aestheticCounts['Coquette'] || aestheticCounts['Soft Girl'] ? 80 : 40 },
  ];

  await prisma.user.update({
    where: { id: userId },
    data: { dominantAesthetic },
  });

  const updatedDNA = await prisma.styleDNA.upsert({
    where: { userId },
    create: {
      userId,
      radarDimensions,
      aestheticPercentages: percentages,
      colorAffinities,
      fashionPersonalityScore: 70 + Math.floor(Math.random() * 25),
      trendCompatibility: 80 + Math.floor(Math.random() * 18),
    },
    update: {
      radarDimensions,
      aestheticPercentages: percentages,
      colorAffinities,
    },
  });

  return updatedDNA;
}
