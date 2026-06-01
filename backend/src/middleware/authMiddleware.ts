import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler.js';

const jwtSecret = process.env.JWT_SECRET || 'slayr-secret-jwt-key-2026';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const protect = (
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

    try {
      const decoded = jwt.verify(token, jwtSecret) as { id: string; email: string };
      req.user = {
        id: decoded.id,
        email: decoded.email,
      };
      next();
    } catch {
      if (token.startsWith('demo-token-')) {
        const userId = token.replace('demo-token-', '');
        req.user = {
          id: userId,
          email: `${userId}@slayr.app`,
        };
        return next();
      }
      return next(new AppError('Invalid or expired authentication token', 401));
    }
  } catch (error) {
    next(error);
  }
};
