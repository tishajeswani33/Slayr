import { Response, NextFunction } from 'express';
import { prisma } from '../config/db.js';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { AppError } from '../middleware/errorHandler.js';
import { getCachedData, setCachedData, invalidateCache, buildCacheKey } from '../services/cacheService.js';
import { generatePersonalizedFeed } from '../services/recommendationService.js';

export async function getPersonalizedUserFeed(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?.id || 'demo-user';
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;

    const cacheKey = buildCacheKey(`feed:${limit}:${offset}`, userId);

    const cached = await getCachedData<any[]>(cacheKey);
    if (cached) {
      return res.status(200).json({
        status: 'success',
        results: cached.length,
        source: 'cache',
        data: { feed: cached },
      });
    }

    const feed = await generatePersonalizedFeed(userId, limit, offset);

    await setCachedData(cacheKey, feed, 180);

    res.status(200).json({
      status: 'success',
      results: feed.length,
      source: 'database',
      data: { feed },
    });
  } catch (error) {
    next(error);
  }
}

export async function saveOutfitToFavorites(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { outfitId } = req.body;
    const userId = req.user?.id;

    if (!outfitId || !userId) {
      return next(new AppError('Missing outfit ID or user authentication', 400));
    }

    const outfit = await prisma.outfit.update({
      where: { id: outfitId },
      data: {
        savesCount: { increment: 1 },
        engagementScore: { increment: 2.5 },
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: {
        savedCount: { increment: 1 },
      },
    });

    const cacheKey = buildCacheKey('feed', userId);
    await invalidateCache(cacheKey);

    res.status(200).json({
      status: 'success',
      message: 'Outfit successfully saved to favorites',
      data: { outfit },
    });
  } catch (error) {
    next(error);
  }
}
