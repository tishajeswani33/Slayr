import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db.js';
import { getCachedData, setCachedData } from '../services/cacheService.js';

export async function getTrendingAesthetics(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cacheKey = 'slayr:trends:aesthetics';

    const cached = await getCachedData<any[]>(cacheKey);
    if (cached) {
      return res.status(200).json({
        status: 'success',
        source: 'cache',
        data: { trends: cached },
      });
    }

    let trends = await prisma.trendSignal.findMany({
      orderBy: { currentVelocity: 'desc' },
    });

    if (trends.length === 0) {
      await seedTrendSignals();
      trends = await prisma.trendSignal.findMany({
        orderBy: { currentVelocity: 'desc' },
      });
    }

    await setCachedData(cacheKey, trends, 600);

    res.status(200).json({
      status: 'success',
      source: 'database',
      data: { trends },
    });
  } catch (error) {
    next(error);
  }
}

export async function getTrendingCreators(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cacheKey = 'slayr:trends:creators';

    const cached = await getCachedData<any[]>(cacheKey);
    if (cached) {
      return res.status(200).json({
        status: 'success',
        source: 'cache',
        data: { creators: cached },
      });
    }

    let creators = await prisma.creator.findMany({
      orderBy: { followers: 'desc' },
      take: 10,
    });

    if (creators.length === 0) {
      await seedCreators();
      creators = await prisma.creator.findMany({
        orderBy: { followers: 'desc' },
        take: 10,
      });
    }

    await setCachedData(cacheKey, creators, 600);

    res.status(200).json({
      status: 'success',
      source: 'database',
      data: { creators },
    });
  } catch (error) {
    next(error);
  }
}

async function seedTrendSignals() {
  const initialTrends = [
    {
      aesthetic: 'Quiet Luxury',
      currentVelocity: 94.5,
      weeklyGrowth: 12.4,
      monthlyGrowth: 45.2,
      status: 'trending',
      viralScore: 92.0,
      engagementAvg: 8.4,
      saveRateAvg: 6.8,
      trendingColors: ['#F5F5F5', '#C9B896', '#2C2C2C'],
      relatedStyles: ['Minimal Luxury', 'Old Money'],
    },
    {
      aesthetic: 'Clean Girl',
      currentVelocity: 89.2,
      weeklyGrowth: 8.5,
      monthlyGrowth: 32.1,
      status: 'peak',
      viralScore: 87.5,
      engagementAvg: 7.9,
      saveRateAvg: 5.9,
      trendingColors: ['#FFFFFF', '#D4B5A0', '#F8F8F8'],
      relatedStyles: ['Minimal Luxury', 'Scandinavian Minimal'],
    },
    {
      aesthetic: 'Cyber Minimal',
      currentVelocity: 78.4,
      weeklyGrowth: 18.2,
      monthlyGrowth: 54.0,
      status: 'emerging',
      viralScore: 82.3,
      engagementAvg: 9.1,
      saveRateAvg: 7.2,
      trendingColors: ['#000000', '#00FF00', '#FFFFFF'],
      relatedStyles: ['Techwear', 'Futuristic Editorial'],
    },
    {
      aesthetic: 'Y2K',
      currentVelocity: 42.1,
      weeklyGrowth: -4.5,
      monthlyGrowth: -15.2,
      status: 'declining',
      viralScore: 35.0,
      engagementAvg: 4.2,
      saveRateAvg: 2.8,
      trendingColors: ['#FF1493', '#00FFFF', '#FFFFFF'],
      relatedStyles: ['Streetwear', 'TikTok Viral'],
    },
  ];

  for (const t of initialTrends) {
    await prisma.trendSignal.upsert({
      where: { aesthetic: t.aesthetic },
      update: {},
      create: t,
    });
  }
}

async function seedCreators() {
  const initialCreators = [
    {
      name: 'Sophia Rose',
      username: 'sophiarose',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      aesthetic: 'Minimal Luxury',
      followers: 12400,
      outfitCount: 42,
      vibeScore: 8.9,
      isVerified: true,
    },
    {
      name: 'Alex Kim',
      username: 'alexkim',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      aesthetic: 'Streetwear',
      followers: 8920,
      outfitCount: 28,
      vibeScore: 8.4,
      isVerified: false,
    },
    {
      name: 'Emily Charlotte',
      username: 'emilycharlotte',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      aesthetic: 'Old Money',
      followers: 15600,
      outfitCount: 56,
      vibeScore: 9.3,
      isVerified: true,
    },
  ];

  for (const c of initialCreators) {
    await prisma.creator.upsert({
      where: { username: c.username },
      update: {},
      create: c,
    });
  }
}
