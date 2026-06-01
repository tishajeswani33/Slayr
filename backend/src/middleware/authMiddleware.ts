import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler.js';
import { verifyFirebaseIdToken } from '../services/firebaseService.js';
import { prisma } from '../config/db.js';

const jwtSecret = process.env.JWT_SECRET || 'slayr-secret-jwt-key-2026';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const protect = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('You are not logged in. Please provide an Authorization token.', 401));
    }

    // 1. Quick bypass for development mock tokens
    if (token.startsWith('demo-token-')) {
      const userId = token.replace('demo-token-', '');
      req.user = {
        id: userId,
        email: `${userId}@slayr.app`,
      };
      return next();
    }

    try {
      // 2. Decode the token to analyze the issuer (Firebase vs. Custom Local JWT)
      const decodedToken = jwt.decode(token) as any;

      if (decodedToken && decodedToken.iss && decodedToken.iss.startsWith('https://securetoken.google.com/')) {
        // Firebase ID Token detected!
        const firebaseProjectId = process.env.FIREBASE_PROJECT_ID || decodedToken.iss.split('/').pop() || 'slayr-demo';
        const firebaseUser = await verifyFirebaseIdToken(token, firebaseProjectId);

        // Check if user exists in our local PostgreSQL database
        let user = await prisma.user.findUnique({
          where: { id: firebaseUser.uid },
        });

        if (!user && firebaseUser.email) {
          // Merge account by email if user exists under a different identifier
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
          // Sync new user on-the-fly
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

        req.user = {
          id: user.id,
          email: user.email,
        };
        return next();
      }
    } catch (firebaseErr: any) {
      console.warn('⚠️ Firebase token decoding/verification failed. Attempting local JWT fallback:', firebaseErr.message);
    }

    // 3. Fallback to verifying as local custom JWT signed by this backend
    try {
      const decoded = jwt.verify(token, jwtSecret) as { id: string; email: string };
      req.user = {
        id: decoded.id,
        email: decoded.email,
      };
      return next();
    } catch {
      return next(new AppError('Invalid or expired authentication token', 401));
    }
  } catch (error) {
    next(error);
  }
};
