import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/db.js';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { AppError } from '../middleware/errorHandler.js';
import { loginSchema, signupSchema, profileSchema } from '../validation/authSchemas.js';
import { recalculateStyleDNA } from '../services/recommendationService.js';
import { verifyFirebaseIdToken } from '../services/firebaseService.js';

const jwtSecret = process.env.JWT_SECRET || 'slayr-secret-jwt-key-2026';

function generateToken(userId: string, email: string): string {
  return jwt.sign({ id: userId, email }, jwtSecret, {
    expiresIn: '30d',
  });
}

export async function login(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const validated = loginSchema.safeParse(req.body);
    if (!validated.success) {
      return next(new AppError(validated.error.issues[0].message, 400));
    }

    const { email } = validated.data;

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      const username = email.split('@')[0] + Math.floor(Math.random() * 100);
      user = await prisma.user.create({
        data: {
          id: 'usr-' + Date.now(),
          email,
          username,
          displayName: username.charAt(0).toUpperCase() + username.slice(1),
          dominantAesthetic: 'Minimal Luxury',
        },
      });

      await prisma.styleDNA.create({
        data: {
          userId: user.id,
          radarDimensions: [
            { dimension: 'Minimal', value: 70 },
            { dimension: 'Bold', value: 50 },
            { dimension: 'Classic', value: 65 },
            { dimension: 'Trendy', value: 60 },
            { dimension: 'Edgy', value: 40 },
            { dimension: 'Romantic', value: 55 },
          ],
          aestheticPercentages: [{ aesthetic: 'Minimal Luxury', percentage: 100 }],
          colorAffinities: [{ color: '#000000', affinity: 8 }, { color: '#FFFFFF', affinity: 7 }],
        },
      });
    }

    const token = generateToken(user.id, user.email);

    res.status(200).json({
      status: 'success',
      token,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
}

export async function signup(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const validated = signupSchema.safeParse(req.body);
    if (!validated.success) {
      return next(new AppError(validated.error.issues[0].message, 400));
    }

    const { email, displayName } = validated.data;

    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return next(new AppError('A user with this email address already exists', 400));
    }

    const username = email.split('@')[0] + Math.floor(Math.random() * 100);
    const user = await prisma.user.create({
      data: {
        id: 'usr-' + Date.now(),
        email,
        username,
        displayName,
        dominantAesthetic: 'Minimal Luxury',
      },
    });

    await prisma.styleDNA.create({
      data: {
        userId: user.id,
        radarDimensions: [
          { dimension: 'Minimal', value: 50 },
          { dimension: 'Bold', value: 50 },
          { dimension: 'Classic', value: 50 },
          { dimension: 'Trendy', value: 50 },
          { dimension: 'Edgy', value: 50 },
          { dimension: 'Romantic', value: 50 },
        ],
        aestheticPercentages: [{ aesthetic: 'Minimal Luxury', percentage: 100 }],
        colorAffinities: [],
      },
    });

    const token = generateToken(user.id, user.email);

    res.status(201).json({
      status: 'success',
      token,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
}

export async function getProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) return next(new AppError('Unauthorized', 401));

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { stylePreferences: true },
    });

    if (!user) {
      return next(new AppError('User profile not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) return next(new AppError('Unauthorized', 401));

    const validated = profileSchema.safeParse(req.body);
    if (!validated.success) {
      return next(new AppError(validated.error.issues[0].message, 400));
    }

    const { username, bio } = validated.data;

    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername && existingUsername.id !== req.user.id) {
      return next(new AppError('This username is already taken', 400));
    }

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        username,
        bio: bio || null,
      },
    });

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
}

export async function getStyleDNA(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) return next(new AppError('Unauthorized', 401));

    await recalculateStyleDNA(req.user.id);

    const dna = await prisma.styleDNA.findUnique({
      where: { userId: req.user.id },
    });

    if (!dna) {
      return next(new AppError('Style DNA report not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { dna },
    });
  } catch (error) {
    next(error);
  }
}

export async function firebaseLogin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { token } = req.body;
    if (!token) {
      return next(new AppError('Firebase ID token is required', 400));
    }

    const firebaseProjectId = process.env.FIREBASE_PROJECT_ID || 'slayr-demo';
    
    // 1. Verify the ID token using our public certificate service
    const firebaseUser = await verifyFirebaseIdToken(token, firebaseProjectId);

    // 2. Fetch or create the user in our PostgreSQL database
    let user = await prisma.user.findUnique({
      where: { id: firebaseUser.uid },
    });

    if (!user && firebaseUser.email) {
      // Fallback search to check if a mock user or old email already exists, then link them
      user = await prisma.user.findUnique({
        where: { email: firebaseUser.email },
      });

      if (user) {
        user = await prisma.user.update({
          where: { email: firebaseUser.email },
          data: { id: firebaseUser.uid },
        });
      }
    }

    if (!user) {
      // Create user on-the-fly
      const email = firebaseUser.email || `${firebaseUser.uid}@slayr.app`;
      const baseUsername = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
      const username = `${baseUsername}${Math.floor(100 + Math.random() * 900)}`;
      const displayName = firebaseUser.name || baseUsername.charAt(0).toUpperCase() + baseUsername.slice(1);

      user = await prisma.user.create({
        data: {
          id: firebaseUser.uid,
          email,
          username,
          displayName,
          avatarUrl: firebaseUser.picture || null,
          dominantAesthetic: 'Minimal Luxury',
        },
      });

      // Create default StyleDNA
      await prisma.styleDNA.create({
        data: {
          userId: user.id,
          radarDimensions: [
            { dimension: 'Minimal', value: 70 },
            { dimension: 'Bold', value: 50 },
            { dimension: 'Classic', value: 65 },
            { dimension: 'Trendy', value: 60 },
            { dimension: 'Edgy', value: 40 },
            { dimension: 'Romantic', value: 55 },
          ],
          aestheticPercentages: [{ aesthetic: 'Minimal Luxury', percentage: 100 }],
          colorAffinities: [{ color: '#000000', affinity: 8 }, { color: '#FFFFFF', affinity: 7 }],
        },
      });
    }

    res.status(200).json({
      status: 'success',
      token,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
}
