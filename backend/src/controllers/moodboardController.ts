import { Response, NextFunction } from 'express';
import { prisma } from '../config/db.js';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { AppError } from '../middleware/errorHandler.js';

export async function createMoodboard(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { title, imageUrl, aesthetic, vibe, colorPalette, tags } = req.body;
    const userId = req.user?.id;

    if (!title || !imageUrl || !aesthetic || !vibe || !userId) {
      return next(new AppError('Please provide all mandatory moodboard attributes', 400));
    }

    const moodboard = await prisma.moodboard.create({
      data: {
        userId,
        title,
        imageUrl,
        aesthetic,
        vibe,
        colorPalette: colorPalette || [],
        tags: tags || [],
      },
    });

    res.status(201).json({
      status: 'success',
      data: { moodboard },
    });
  } catch (error) {
    next(error);
  }
}

export async function getMoodboards(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const aesthetic = req.query.aesthetic as string;
    const limit = parseInt(req.query.limit as string) || 20;

    let filter: any = {};
    if (aesthetic && aesthetic !== 'All') {
      filter.aesthetic = aesthetic;
    }

    const moodboards = await prisma.moodboard.findMany({
      where: filter,
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    if (moodboards.length === 0) {
      await seedMoodboards();
      return res.status(200).json({
        status: 'success',
        results: 3,
        data: {
          moodboards: await prisma.moodboard.findMany({
            where: filter,
            orderBy: { createdAt: 'desc' },
            take: limit,
          }),
        },
      });
    }

    res.status(200).json({
      status: 'success',
      results: moodboards.length,
      data: { moodboards },
    });
  } catch (error) {
    next(error);
  }
}

export async function getMoodboardById(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const moodboard = await prisma.moodboard.findUnique({
      where: { id: req.params.id },
      include: { user: true },
    });

    if (!moodboard) {
      return next(new AppError('No moodboard curated under this ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { moodboard },
    });
  } catch (error) {
    next(error);
  }
}

async function seedMoodboards() {
  const initialMoodboards = [
    {
      userId: 'usr-demo-seed',
      title: 'Minimalist Elegance',
      imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
      aesthetic: 'Minimal Luxury',
      vibe: 'Clean lines, neutral tones, timeless sophistication',
      colorPalette: ['#F5F5F5', '#2C2C2C', '#FFFFFF'],
      tags: ['minimal', 'luxury', 'timeless'],
      savedCount: 1247,
      relatedAesthetics: ['Scandinavian Minimal', 'Old Money', 'Clean Girl'],
    },
    {
      userId: 'usr-demo-seed',
      title: 'Urban Edge',
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
      aesthetic: 'Streetwear',
      vibe: 'Bold graphics, oversized fits, urban energy',
      colorPalette: ['#000000', '#FF6B6B', '#FFFFFF'],
      tags: ['streetwear', 'urban', 'bold'],
      savedCount: 2134,
      relatedAesthetics: ['Techwear', 'Y2K', 'Cyber Minimal'],
    },
    {
      userId: 'usr-demo-seed',
      title: 'Seoul Aesthetics',
      imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800',
      aesthetic: 'Korean Casual',
      vibe: 'Layered, trendy, effortlessly cool K-fashion',
      colorPalette: ['#E8D5C4', '#9B6B6B', '#F0F0F0'],
      tags: ['korean', 'trendy', 'casual'],
      savedCount: 1892,
      relatedAesthetics: ['Clean Girl', 'Minimal Luxury'],
    },
  ];

  await prisma.user.upsert({
    where: { id: 'usr-demo-seed' },
    update: {},
    create: {
      id: 'usr-demo-seed',
      email: 'demo@slayr.app',
      username: 'demostylist',
      displayName: 'Demo Stylist',
      dominantAesthetic: 'Minimal Luxury',
    },
  });

  for (const m of initialMoodboards) {
    await prisma.moodboard.create({
      data: m,
    });
  }
}
