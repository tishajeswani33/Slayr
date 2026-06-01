import { Response, NextFunction } from 'express';
import { prisma } from '../config/db.js';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { AppError } from '../middleware/errorHandler.js';
import { analyzeOutfitWithGemini } from '../services/geminiService.js';
import { invalidateCache, buildCacheKey } from '../services/cacheService.js';
import { recalculateStyleDNA } from '../services/recommendationService.js';

export async function analyzeOutfit(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return next(new AppError('Please provide a valid Base64 encoded image string', 400));
    }

    const userId = req.user?.id || 'demo-user';

    const analysis = await analyzeOutfitWithGemini(imageBase64);

    const imageUrl = `https://images.unsplash.com/photo-1500000000000?w=800&q=80`;

    const outfit = await prisma.outfit.create({
      data: {
        userId,
        imageUrl,
        score: analysis.score,
        aesthetic: analysis.aesthetic,
        vibe: analysis.vibe,
        clothingItems: analysis.clothingItems,
        colorPalette: analysis.colorPalette,
        recommendations: analysis.recommendations,
        suggestedAccessories: analysis.suggestedAccessories,
        fashionTags: analysis.fashionTags,
        trendVelocity: 50 + Math.floor(Math.random() * 45),
        engagementScore: 70 + Math.floor(Math.random() * 25),
      },
    });

    await recalculateStyleDNA(userId);

    const cacheKey = buildCacheKey('feed', userId);
    await invalidateCache(cacheKey);

    res.status(201).json({
      status: 'success',
      data: { outfit },
    });
  } catch (error) {
    next(error);
  }
}

export async function getUserOutfits(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId || req.user?.id;

    if (!userId) {
      return next(new AppError('User identifier not provided', 400));
    }

    const outfits = await prisma.outfit.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      status: 'success',
      results: outfits.length,
      data: { outfits },
    });
  } catch (error) {
    next(error);
  }
}

export async function getOutfitById(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const outfit = await prisma.outfit.findUnique({
      where: { id: req.params.id },
      include: { user: true },
    });

    if (!outfit) {
      return next(new AppError('No outfit analysis found with this ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { outfit },
    });
  } catch (error) {
    next(error);
  }
}
